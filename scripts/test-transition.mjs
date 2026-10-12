import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\KV_GOLD2\\KvGold\\scratch\\chrome_test_transition2';

async function testTransition() {
  const debugPort = 9556;
  const cp = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    '--disable-gpu',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    `--user-data-dir=${userDataDir}`,
    'http://localhost:5173'
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

  // Wait for video to be ready
  const ready = await sendSession('Runtime.evaluate', {
    awaitPromise: true,
    expression: `(new Promise((resolve) => {
      const v = document.querySelector('.cinematic-intro-video');
      if (!v) return resolve('no video');
      if (v.readyState >= 2) return resolve({ duration: v.duration, readyState: v.readyState });
      v.addEventListener('loadedmetadata', () => resolve({ duration: v.duration, readyState: v.readyState }), { once: true });
      setTimeout(() => resolve({ duration: v.duration, readyState: v.readyState }), 4000);
    }))`
  });
  console.log('Video ready state:', ready.result.value);

  // Trigger video completion by setting currentTime = 9.9 and firing ended
  await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const v = document.querySelector('.cinematic-intro-video');
      if (v) {
        v.currentTime = 9.9;
        v.dispatchEvent(new Event('ended'));
      }
    })()`
  });

  // Wait 1.5s for exit transition to finish
  await new Promise(r => setTimeout(r, 1500));

  const stateAfter = await sendSession('Runtime.evaluate', {
    expression: `JSON.stringify({
      hasIntro: !!document.querySelector('.cinematic-intro-root'),
      bodyOverflow: document.body.style.overflow,
      hasHero: !!document.querySelector('main')
    })`
  });
  console.log('State After Completion:', stateAfter.result.value);

  ws.close();
  cp.kill();
  console.log('Done!');
}

testTransition().catch(console.error);
