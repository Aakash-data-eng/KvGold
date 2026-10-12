import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\KV_GOLD2\\KvGold\\scratch\\chrome_test_lifecycle';

async function testLifecycle() {
  const debugPort = 9666;
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

  await sendSession('Runtime.enable');
  await sendSession('Page.enable');

  // Listen to browser console logs
  ws.addEventListener('message', (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map(a => a.value || a.description).join(' ');
      if (text.includes('[KV INTRO]')) {
        console.log('BROWSER LOG:', text);
      }
    }
  });

  // Wait 3 seconds for intro to load and play
  await new Promise(r => setTimeout(r, 3000));

  // Trigger video completion
  await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const v = document.querySelector('.cinematic-intro-video');
      console.log('[KV INTRO] Triggering video ended event in test.');
      v?.dispatchEvent(new Event('ended'));
    })()`
  });

  // Wait 2 seconds for transition
  await new Promise(r => setTimeout(r, 2000));

  const check = await sendSession('Runtime.evaluate', {
    expression: `JSON.stringify({
      introElementExists: !!document.querySelector('.cinematic-intro-root'),
      bodyOverflow: document.body.style.overflow,
      isMainVisible: !!document.querySelector('.kv-gold-app')
    })`
  });
  console.log('FINAL LIFECYCLE CHECK:', check.result.value);

  ws.close();
  cp.kill();
}

testLifecycle().catch(console.error);
