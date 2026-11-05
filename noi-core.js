/* Phần lõi dùng chung cho các trang luyện / thi nói:
 * tiện ích, đọc to (speechSynthesis), nhận giọng nói liên tục (SpeechRecognition), ghi âm để nghe lại.
 * Trang dùng: const { speak, capture, ... } = window.NOI;  đặt NOI.opts = { rate, record } theo cài đặt của trang. */
(function () {
  "use strict";
  const NOI = (window.NOI = { opts: { rate: 0.85, record: false } });
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const mmss = (s) => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const makeStore = (prefix) => ({
    get(k, d) { try { const v = localStorage.getItem(prefix + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(prefix + k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
  });
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }
  const ICON_SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  const ICON_STOP = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>';
  const spkBtn = (text, label) => `<button class="spk" data-say="${esc(text)}" aria-label="Nghe ${esc(label || "")}" title="Nghe">${ICON_SPK}</button>`;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* ---------- Đọc to ---------- */
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  let zhVoice = null;
  function loadVoices() {
    if (!synth) return;
    const vs = synth.getVoices();
    zhVoice = vs.find((v) => /zh[-_]CN/i.test(v.lang)) || vs.find((v) => /^zh/i.test(v.lang)) || null;
  }
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }
  function speak(text, rate) {
    return new Promise((resolve) => {
      if (!synth) return resolve(false);
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; if (zhVoice) u.voice = zhVoice;
      u.rate = rate || NOI.opts.rate;
      let done = false;
      const fin = () => { if (!done) { done = true; resolve(true); } };
      u.onend = fin; u.onerror = fin;
      setTimeout(fin, 1500 + (text.length * 420) / u.rate);
      synth.speak(u);
    });
  }
  const hush = () => { if (synth) synth.cancel(); };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-say]");
    if (b && !b.disabled) { e.preventDefault(); speak(b.dataset.say); }
  });

  /* ---------- Nhận dạng giọng nói (nghe liên tục tới khi hết giờ) ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function speechMessage(code) {
    if (code === "not-allowed" || code === "service-not-allowed") return "Chưa được dùng micro. Hãy cho phép micro cho trang này (biểu tượng ổ khoá trên thanh địa chỉ) rồi thử lại.";
    if (code === "audio-capture") return "Không tìm thấy micro. Hãy cắm hoặc bật micro rồi thử lại.";
    if (code === "network") return "Mất kết nối mạng: Chrome cần mạng để nhận giọng nói.";
    return "Không nhận được giọng nói (" + code + "). Thử lại nhé.";
  }
  function capture({ maxSec, onUpdate, onTick, autoStop }) {
    let active = true, ended = false, rec = null, quick = 0, fatal = null, stopAt = null, resolveFn;
    const done = []; let seg = [], interim = "", firstAt = null;
    const confs = []; let autoT = null;
    const t0 = performance.now(), el = () => (performance.now() - t0) / 1000;
    const promise = new Promise((r) => (resolveFn = r));
    const text = () => done.join("") + seg.join("") + interim;
    const commit = () => { done.push(seg.join("") + interim); seg = []; interim = ""; };
    function start() {
      rec = new SR();
      rec.lang = "zh-CN"; rec.continuous = true; rec.interimResults = true; rec.maxAlternatives = 1;
      const started = performance.now();
      rec.onresult = (ev) => {
        interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const r = ev.results[i], tr = r[0].transcript;
          if (r.isFinal) { if (seg[i] == null && r[0].confidence > 0) confs.push(r[0].confidence); seg[i] = tr; }
          else interim += tr;
        }
        if (firstAt == null && text().trim()) firstAt = el();
        if (onUpdate) onUpdate(text());
        if (autoStop && seg.some((x) => x) && active) { clearTimeout(autoT); autoT = setTimeout(stop, autoStop * 1000); }
      };
      rec.onerror = (ev) => {
        if (["not-allowed", "service-not-allowed", "audio-capture", "network"].includes(ev.error)) { fatal = ev.error; active = false; }
      };
      rec.onend = () => {
        commit();
        if (active && el() < maxSec) {
          // Chrome tự dừng khi im lặng lâu: mở lại để nghe tiếp cho tới hết giờ
          quick = performance.now() - started < 1000 ? quick + 1 : 0;
          if (quick > 4) { fatal = fatal || "restart"; finish(); return; }
          try { start(); } catch (e) { finish(); }
        } else finish();
      };
      try { rec.start(); } catch (e) { fatal = e.message || "start"; finish(); }
    }
    const tick = setInterval(() => { const e = el(); if (onTick) onTick(Math.min(e, maxSec)); if (e >= maxSec) stop(); }, 200);
    function stop() {
      if (!active) return;
      active = false; stopAt = el();
      try { if (rec) rec.stop(); } catch (e) { /* bỏ qua */ }
      setTimeout(finish, 2500);
    }
    function abort() { active = false; try { if (rec) rec.abort(); } catch (e) { /* bỏ qua */ } finish(); }
    function finish() {
      if (ended) return; ended = true; clearInterval(tick);
      const dur = Math.min(maxSec, stopAt != null ? stopAt : el());
      resolveFn({ text: text().trim(), confs, dur, firstAt, fatal, typed: false });
    }
    start();
    return { stop, abort, done: promise };
  }
  // Máy không có nhận dạng giọng nói: cho gõ chữ Hán để vẫn chấm thử được (không chấm phát âm)
  function typedCapture(box, { maxSec, onTick, placeholder }) {
    let ended = false, resolveFn;
    const t0 = performance.now(), el = () => (performance.now() - t0) / 1000;
    const promise = new Promise((r) => (resolveFn = r));
    box.innerHTML = `<label class="field">Gõ câu trả lời bằng chữ Hán<textarea id="hk-typed" style="min-height:90px" placeholder="${esc(placeholder || "Ví dụ: 我叫阿兰。")}"></textarea></label>`;
    const ta = $("#hk-typed", box); ta.focus();
    const tick = setInterval(() => { const e = el(); if (onTick) onTick(Math.min(e, maxSec)); if (e >= maxSec) stop(); }, 200);
    function stop() { if (ended) return; ended = true; clearInterval(tick); resolveFn({ text: ta.value.trim(), confs: [], dur: Math.min(maxSec, el()), firstAt: 0, fatal: null, typed: true }); }
    return { stop, abort: stop, done: promise };
  }

  /* ---------- Ghi âm để nghe lại ---------- */
  let micStream = null;
  async function startRecorder() {
    if (!NOI.opts.record || !window.MediaRecorder || !navigator.mediaDevices) return null;
    try {
      if (!micStream) micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(micStream), chunks = [];
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      mr.start();
      return {
        stop: () => new Promise((res) => {
          mr.onstop = () => res(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || "audio/webm" })) : null);
          try { mr.stop(); } catch (e) { res(null); }
        })
      };
    } catch (e) { return null; }
  }
  function releaseMic() { if (micStream) { micStream.getTracks().forEach((t) => t.stop()); micStream = null; } }

  Object.assign(NOI, { $, $$, esc, shuffle, pick, clamp, mmss, wait, makeStore, toast, ICON_SPK, ICON_MIC, ICON_STOP, spkBtn, isMobile,
    synth, speak, hush, SR, speechMessage, capture, typedCapture, startRecorder, releaseMic });
})();
