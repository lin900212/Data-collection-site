(() => {
  'use strict';

  const GAS_BRIDGE_URL = 'https://script.google.com/macros/s/AKfycbyhnV-8OJxQehl_I-21Hnvi1wTbN_gu6NdDlzOHvvEsXasfEzUDMQ3JSRY7SIPhfiEL0w/exec?bridge=1';
  const GOOGLE_BRIDGE_HOSTS = new Set(['script.google.com', 'script.googleusercontent.com']);
  const pending = new Map();
  let bridgeOrigin = '';
  let bridgeWindow = null;
  let serial = 0;
  function createChannel() {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  let readyTimer;
  let resolveReady;
  let rejectReady;

  const frame = document.createElement('iframe');
  const channel = createChannel();
  frame.title = '研究工作台安全連線';
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  frame.style.cssText = 'position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;visibility:hidden';

  const ready = new Promise((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
    readyTimer = window.setTimeout(() => reject(new Error('Google 後端連線逾時，請重新整理頁面。')), 30000);
  });

  window.addEventListener('message', event => {
    let origin;
    try { origin = new URL(event.origin).origin; } catch (_) { return; }
    let hostname;
    try { hostname = new URL(origin).hostname; } catch (_) { return; }
    if (!GOOGLE_BRIDGE_HOSTS.has(hostname)) return;

    const message = event.data;
    if (!message || typeof message !== 'object' || message.channel !== channel) return;
    if (message.type === 'research-desk:ready') {
      if (bridgeWindow && event.source !== bridgeWindow) return;
      bridgeWindow = event.source;
      bridgeOrigin = origin;
      window.clearTimeout(readyTimer);
      resolveReady();
      return;
    }
    if (event.source !== bridgeWindow || origin !== bridgeOrigin || message.type !== 'research-desk:result' || typeof message.id !== 'string') return;
    const request = pending.get(message.id);
    if (!request || origin !== bridgeOrigin) return;
    pending.delete(message.id);
    window.clearTimeout(request.timer);
    if (message.ok) request.resolve(message.value);
    else request.reject(new Error(message.error || 'Google 後端操作失敗。'));
  });

  const bridgeUrl = new URL(GAS_BRIDGE_URL);
  bridgeUrl.searchParams.set('parentOrigin', window.location.origin);
  bridgeUrl.searchParams.set('channel', channel);
  frame.src = bridgeUrl.toString();
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(frame), {once: true});

  window.gasBridge = Object.freeze({
    async call(method, args) {
      await ready;
      if (!bridgeOrigin || !bridgeWindow) throw new Error('Google 後端尚未建立連線。');
      const id = `rpc-${Date.now()}-${++serial}`;
      return new Promise((resolve, reject) => {
        const timer = window.setTimeout(() => {
          pending.delete(id);
          reject(new Error('後端沒有在期限內回覆，請確認連線後再試。'));
        }, 90000);
        pending.set(id, {resolve, reject, timer});
        bridgeWindow.postMessage({type: 'research-desk:rpc', id, method, args, channel}, bridgeOrigin);
      });
    }
  });
})();
