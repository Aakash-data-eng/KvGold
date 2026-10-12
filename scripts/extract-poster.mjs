import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const debugPort = 9222;

  // Start local server to serve the video and html
  const server = http.createServer((req, res) => {
    if (req.url === '/video') {
      const videoPath = path.resolve('public/videos/kv-gold-intro-final.mp4');
      const stat = fs.statSync(videoPath);
      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': stat.size,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(videoPath).pipe(res);
      return;
    }
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<!DOCTYPE html>
<html>
<head><style>body{margin:0;background:#000;}</style></head>
<body>
<video id="v" src="/video" crossOrigin="anonymous" playsinline muted preload="auto"></video>
<canvas id="c" width="720" height="1280"></canvas>
</body>
</html>`);
      return;
    }
    res.writeHead(404);
    res.end();
  });

  await new Promise(resolve => server.listen(8999, resolve));
  console.log('Local server listening on 8999');

  // Spawn headless chrome
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=./scratch/chrome-profile'
  ]);

  // Wait for debug port
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const list = await fetch(`http://127.0.0.1:${debugPort}/json/version`).then(r => r.json());
      wsUrl = list.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Could not get wsUrl');
    chrome.kill();
    server.close();
    return;
  }

  console.log('Connected to Chrome via WS:', wsUrl);
  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let idCounter = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = idCounter++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const { targetId } = await send('Target.createTarget', { url: 'http://127.0.0.1:8999/' });
  
  // Attach to target
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  console.log('Attached session:', sessionId);

  const sendSession = (method, params = {}) => new Promise((resolve) => {
    const id = idCounter++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, sessionId, method, params }));
  });

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');

  // Wait for page load
  await new Promise(r => setTimeout(r, 1000));

  // Run script to seek video and grab frames at 0.5s, 1.0s, 3.0s, 5.0s
  const extractFrame = async (time) => {
    const res = await sendSession('Runtime.evaluate', {
      awaitPromise: true,
      expression: `(new Promise((resolve, reject) => {
        const v = document.getElementById('v');
        const c = document.getElementById('c');
        v.currentTime = ${time};
        v.onseeked = () => {
          const ctx = c.getContext('2d');
          ctx.drawImage(v, 0, 0, c.width, c.height);
          const data = c.toDataURL('image/jpeg', 0.95);
          resolve(data);
        };
        v.onerror = (e) => reject(v.error?.message || 'Error loading video');
      }))`
    });
    return res?.result?.value;
  };

  for (const t of [0.5, 1.5, 3.0, 5.0, 7.0]) {
    try {
      console.log(`Extracting frame at ${t}s...`);
      const dataUrl = await extractFrame(t);
      if (dataUrl && dataUrl.startsWith('data:image/jpeg;base64,')) {
        const base64 = dataUrl.split(',')[1];
        const buf = Buffer.from(base64, 'base64');
        const outPath = `public/videos/kv-gold-intro-poster-${t}s.jpg`;
        fs.writeFileSync(outPath, buf);
        console.log(`Saved ${outPath} (${buf.length} bytes)`);
        if (t === 1.5 || t === 0.5) {
          fs.writeFileSync('public/videos/kv-gold-intro-poster.jpg', buf);
          console.log(`Updated public/videos/kv-gold-intro-poster.jpg`);
        }
      }
    } catch (err) {
      console.error(`Error at ${t}s:`, err);
    }
  }

  ws.close();
  chrome.kill();
  server.close();
  console.log('Done extraction!');
}

run().catch(console.error);
