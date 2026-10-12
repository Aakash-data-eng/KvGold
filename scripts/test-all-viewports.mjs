import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\KV_GOLD2\\KvGold\\scratch\\chrome_test_profile2';

fs.mkdirSync(userDataDir, { recursive: true });

const viewports = [
  { name: 'iphone_5_se', width: 320, height: 568, mobile: true },
  { name: 'android_compact', width: 360, height: 640, mobile: true },
  { name: 'galaxy_s20', width: 360, height: 800, mobile: true },
  { name: 'iphone_8_se2', width: 375, height: 667, mobile: true },
  { name: 'iphone_x_11pro', width: 375, height: 812, mobile: true },
  { name: 'iphone_14', width: 390, height: 844, mobile: true },
  { name: 'pixel_7', width: 412, height: 915, mobile: true },
  { name: 'iphone_14_pro_max', width: 430, height: 932, mobile: true },
  { name: 'android_tall', width: 440, height: 956, mobile: true },
  { name: 'compact_tall', width: 480, height: 960, mobile: true },
  { name: 'mobile_landscape', width: 844, height: 390, mobile: true },
  { name: 'tablet_portrait', width: 768, height: 1024, mobile: false },
  { name: 'tablet_landscape', width: 1024, height: 768, mobile: false },
  { name: 'desktop_720p', width: 1280, height: 720, mobile: false },
  { name: 'desktop_1080p', width: 1920, height: 1080, mobile: false }
];

async function main() {
  const debugPort = 9444;
  const cp = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`).then(r => r.json());
      wsUrl = res.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Failed to get WebSocket debugger URL');
    cp.kill();
    process.exit(1);
  }

  const ws = new WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  const send = (method, params = {}) => new Promise(resolve => {
    const id = msgId++;
    const handler = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:5173' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  const sendSession = (method, params = {}) => new Promise(resolve => {
    const id = msgId++;
    const handler = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, sessionId, method, params }));
  });

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');

  await new Promise(r => setTimeout(r, 1500));

  const results = [];

  for (const vp of viewports) {
    // Set device metrics
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.mobile
    });

    // Seek video to 8.5s
    const evalRes = await sendSession('Runtime.evaluate', {
      awaitPromise: true,
      expression: `(new Promise((resolve) => {
        const v = document.querySelector('.cinematic-intro-video');
        if (v) {
          v.pause();
          v.currentTime = 8.5;
          const check = () => {
            const vRect = v.getBoundingClientRect();
            resolve({
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight,
              videoRect: {
                x: Math.round(vRect.x * 10) / 10,
                y: Math.round(vRect.y * 10) / 10,
                width: Math.round(vRect.width * 10) / 10,
                height: Math.round(vRect.height * 10) / 10,
                right: Math.round((vRect.x + vRect.width) * 10) / 10,
                bottom: Math.round((vRect.y + vRect.height) * 10) / 10
              },
              ratio: Math.round((vRect.width / vRect.height) * 1000) / 1000
            });
          };
          if (v.readyState >= 2) {
            check();
          } else {
            v.onseeked = check;
          }
        } else {
          resolve({ error: 'no video' });
        }
      }))`
    });

    const data = evalRes?.result?.value;
    console.log(`Viewport ${vp.name} (${vp.width}x${vp.height}):`, data);

    const shot = await sendSession('Page.captureScreenshot', { format: 'png' });
    if (shot && shot.data) {
      const shotPath = `scratch/vp_${vp.width}x${vp.height}.png`;
      fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
    }

    results.push({ viewport: vp, metrics: data });
  }

  fs.writeFileSync('scratch/viewport_test_results.json', JSON.stringify(results, null, 2));
  console.log('Complete! All screenshots saved in scratch/');

  ws.close();
  cp.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
