/* Luyện và thi nói HSK 3 · Tiếng Trung Thanh Hoa-Hà Giang - Msutong
 * Ba phần: Đối thoại (对话) · Đặt câu (造句) · Nói theo chủ đề (话题表达).
 * Tổng thời gian nói giới hạn 3 hoặc 4 phút. Máy nghe bằng Web Speech API rồi chấm điểm theo chữ nhận được. */
(function () {
  "use strict";
  const D = window.HSK3_SPEAK;

  /* ---------- Tiện ích ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const mmss = (s) => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("msut:hsk3:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("msut:hsk3:" + k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
  };
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

  /* ---------- Cấu hình bài thi ---------- */
  const PARTS = {
    dialog: { no: 1, name: "Đối thoại", zh: "对话", max: 30, w: { content: .4, grammar: .15, vocab: .15, fluency: .15, pron: .15 } },
    sentence: { no: 2, name: "Đặt câu", zh: "造句", max: 30, w: { content: .3, grammar: .3, vocab: .1, fluency: .15, pron: .15 } },
    topic: { no: 3, name: "Nói theo chủ đề", zh: "话题表达", max: 40, w: { content: .3, grammar: .15, vocab: .15, fluency: .25, pron: .15 } }
  };
  const CRIT = { content: "Nội dung, đúng yêu cầu", grammar: "Ngữ pháp, mạch lạc", vocab: "Từ vựng", fluency: "Độ dài, lưu loát", pron: "Phát âm rõ (máy nghe được)" };
  // Tổng thời gian NÓI của bài thi; thời gian chuẩn bị không tính vào.
  const PLANS = {
    3: { dialog: 4, sentence: 4, cap: 15, topic: 60, total: 180 },
    4: { dialog: 5, sentence: 5, cap: 15, topic: 90, total: 240 }
  };
  const PREP = { dialog: 2, sentence: 8, topic: 30 };
  const HSK3 = D.hsk3.split(/\s+/).filter(Boolean);
  const settings = Object.assign({ minutes: 3, showText: true, record: !isMobile, rate: 0.85 }, store.get("settings", {}));
  const saveSettings = () => store.set("settings", settings);

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
      u.rate = rate || settings.rate;
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
  function capture({ maxSec, onUpdate, onTick }) {
    let active = true, ended = false, rec = null, quick = 0, fatal = null, stopAt = null, resolveFn;
    const done = []; let seg = [], interim = "", firstAt = null;
    const confs = [];
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
  function typedCapture(box, { maxSec, onTick }) {
    let ended = false, resolveFn;
    const t0 = performance.now(), el = () => (performance.now() - t0) / 1000;
    const promise = new Promise((r) => (resolveFn = r));
    box.innerHTML = `<label class="field">Gõ câu trả lời bằng chữ Hán<textarea id="hk-typed" style="min-height:90px" placeholder="Ví dụ: 我周末一般在家看书。"></textarea></label>`;
    const ta = $("#hk-typed", box); ta.focus();
    const tick = setInterval(() => { const e = el(); if (onTick) onTick(Math.min(e, maxSec)); if (e >= maxSec) stop(); }, 200);
    function stop() { if (ended) return; ended = true; clearInterval(tick); resolveFn({ text: ta.value.trim(), confs: [], dur: Math.min(maxSec, el()), firstAt: 0, fatal: null, typed: true }); }
    return { stop, abort: stop, done: promise };
  }

  /* ---------- Ghi âm để nghe lại ---------- */
  let micStream = null;
  async function startRecorder() {
    if (!settings.record || !window.MediaRecorder || !navigator.mediaDevices) return null;
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

  /* ---------- Chấm điểm ---------- */
  const units = (s) => (String(s).match(/[一-鿿]|\d/g) || []).length; // số chữ đã nói (chữ Hán + chữ số)
  const hanSet = (s) => new Set(String(s).match(/[一-鿿]/g) || []);
  const hskUsed = (t) => HSK3.filter((w) => t.includes(w));
  function pronOf(res) {
    if (res.typed) return null;
    if (!res.confs.length) return 0.7;
    const avg = res.confs.reduce((a, b) => a + b, 0) / res.confs.length;
    return clamp((avg - 0.5) / 0.4, 0.2, 1);
  }
  function finalize(part, crit, extra) {
    const w = PARTS[part].w;
    let sum = 0, wsum = 0;
    Object.keys(w).forEach((k) => { if (crit[k] != null) { sum += w[k] * crit[k]; wsum += w[k]; } });
    // gate < 1: câu lạc đề, không dùng đúng cấu trúc hoặc nói quá ngắn thì điểm các tiêu chí khác cũng bị kéo xuống
    const gate = extra.gate == null ? 1 : extra.gate;
    return { score: Math.round((sum / wsum) * gate * 100) / 10, crit, ...extra };
  }
  const emptyScore = (part, res) => ({
    score: 0, crit: { content: 0, grammar: 0, vocab: 0, fluency: 0, pron: res.typed ? null : 0 }, n: 0, hsk: [], marks: [],
    issues: ["Máy không nhận được câu trả lời nào. Hãy nói to, rõ và gần micro hơn."], good: []
  });

  function scoreDialog(q, res) {
    const t = res.text, n = units(t);
    if (!n) return emptyScore("dialog", res);
    const issues = [], good = [];
    const groups = q.kw.map((k) => new RegExp(k));
    const matched = groups.filter((r) => r.test(t)).length;
    let content = matched ? 0.3 + (0.7 * matched) / groups.length : 0.1;
    const qh = hanSet(q.q), ah = Array.from(String(t).match(/[一-鿿]/g) || []);
    const overlap = ah.length ? ah.filter((c) => qh.has(c)).length / ah.length : 0;
    if (overlap > 0.85 && ah.length <= q.q.length) { content = Math.min(content, 0.25); issues.push("Câu trả lời gần như lặp lại câu hỏi. Hãy trả lời bằng thông tin của chính bạn."); }
    if (!matched) issues.push("Câu trả lời chưa đúng trọng tâm câu hỏi (hoặc máy nghe chưa rõ các từ chính).");
    else if (matched < groups.length) issues.push("Đã trả lời được ý chính, nên nói thêm chi tiết cho đầy đủ.");
    else good.push("Trả lời đúng trọng tâm câu hỏi.");
    const grammar = n >= 8 ? 1 : n >= 5 ? 0.75 : n >= 3 ? 0.45 : 0.2;
    if (n < 6) issues.push(`Câu trả lời ngắn (${n} chữ). Hãy trả lời thành câu đầy đủ có chủ ngữ, khoảng 8–15 chữ.`);
    else if (n >= 12) good.push(`Câu trả lời đầy đủ (${n} chữ).`);
    const hsk = hskUsed(t);
    const vocab = clamp(hanSet(t).size / 10) * 0.75 + clamp(hsk.length) * 0.25;
    let fluency = clamp(n / 10);
    if (res.firstAt != null && res.firstAt > 6) { fluency *= 0.8; issues.push(`Bạn bắt đầu nói sau ${Math.round(res.firstAt)} giây. Hãy tập trả lời ngay sau khi nghe câu hỏi.`); }
    const marks = q.kw.flatMap((k) => k.split("|")).filter((w) => !/[\\[\]().*+?]/.test(w));
    return finalize("dialog", { content, grammar, vocab, fluency, pron: pronOf(res) }, { n, hsk, issues, good, marks, gate: content < 0.3 ? 0.6 : 1 });
  }

  function scoreSentence(p, res) {
    const t = res.text, n = units(t);
    if (!n) return emptyScore("sentence", res);
    const issues = [], good = [];
    const has = p.must.every((m) => t.includes(m));
    const struct = new RegExp(p.re).test(t);
    const content = struct ? 1 : has && p.must.length ? 0.5 : 0;
    let grammar = struct ? 1 : has ? 0.35 : 0;
    if (!has && p.must.length) issues.push(`Máy không nghe thấy “${p.must.join("…")}” trong câu. Hãy dùng đúng từ / cấu trúc được cho (hoặc đọc rõ hơn).`);
    else if (!struct) issues.push(`Câu chưa đúng cấu trúc: ${p.form}.`);
    else good.push(`Dùng đúng cấu trúc “${p.w}”.`);
    if (n < 5) { grammar *= 0.7; issues.push(`Câu quá ngắn (${n} chữ). Hãy đặt một câu hoàn chỉnh, khoảng 8–15 chữ.`); }
    else if (n >= 10) good.push(`Câu đủ dài (${n} chữ).`);
    const hsk = hskUsed(t);
    const vocab = clamp(hanSet(t).size / 8) * 0.7 + clamp(hsk.length) * 0.3;
    const fluency = clamp(n / 9);
    const marks = p.must.length ? p.must : [];
    return finalize("sentence", { content, grammar, vocab, fluency, pron: pronOf(res) }, { n, hsk, issues, good, marks, gate: struct ? 1 : has ? 0.8 : 0.6 });
  }

  function scoreTopic(tp, res, base) {
    const t = res.text, n = units(t);
    if (!n) return emptyScore("topic", res);
    const issues = [], good = [];
    const kws = tp.kw.split("|"), hit = kws.filter((k) => t.includes(k));
    const content = clamp(hit.length / 6);
    if (hit.length < 3) issues.push("Nội dung chưa bám sát chủ đề. Hãy dựa vào các câu gợi ý để nói.");
    else good.push(`Bám sát chủ đề (dùng ${hit.length} từ liên quan).`);
    const conns = D.connectors.filter((c) => t.includes(c));
    const grammar = clamp(conns.length / 3) * 0.7 + clamp(n / 80) * 0.3;
    if (conns.length < 2) issues.push("Thiếu từ nối. Dùng 首先、然后、因为……所以……、但是、最后 để bài nói mạch lạc.");
    else good.push("Có dùng từ nối: " + conns.slice(0, 6).join("、") + ".");
    const hsk = hskUsed(t);
    const vocab = clamp(hanSet(t).size / 45) * 0.5 + clamp(hsk.length / 5) * 0.5;
    if (hsk.length < 3) issues.push("Dùng thêm từ vựng HSK 3 (ví dụ: 打算、锻炼、习惯、关心、终于、比较…).");
    const cpm = n / (Math.max(res.dur, 5) / 60), want = Math.round(base * 1.4);
    const fluency = 0.45 * clamp(cpm / 90) + 0.55 * clamp(n / want);
    if (n < want * 0.7) issues.push(`Bài nói còn ngắn: ${n} chữ. Với ${base} giây nên nói khoảng ${want} chữ trở lên.`);
    else good.push(`Độ dài tốt: ${n} chữ.`);
    if (cpm < 60) issues.push(`Tốc độ nói chậm hoặc ngắt quãng nhiều (khoảng ${Math.round(cpm)} chữ/phút). Mục tiêu HSK 3: 90 chữ/phút trở lên.`);
    const gate = clamp(0.4 + (0.6 * n) / (want * 0.8)) * (hit.length < 3 ? 0.6 : 1);
    return finalize("topic", { content, grammar, vocab, fluency, pron: pronOf(res) }, { n, hsk, issues, good, marks: hit.concat(conns), cpm: Math.round(cpm), gate });
  }
  function scoreItem(it, res) {
    if (it.part === "dialog") return scoreDialog(it.data, res);
    if (it.part === "sentence") return scoreSentence(it.data, res);
    return scoreTopic(it.data, res, it.base);
  }
  function highlight(text, words) {
    const ws = Array.from(new Set(words.filter(Boolean))).sort((a, b) => b.length - a.length);
    if (!ws.length) return esc(text);
    const re = new RegExp("(" + ws.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "g");
    return esc(text).replace(re, "<mark>$1</mark>");
  }
  function level(total) {
    if (total >= 85) return ["Giỏi", "Nói tự nhiên, đúng yêu cầu. Bạn đã sẵn sàng cho phần thi nói trình độ HSK 3."];
    if (total >= 70) return ["Khá", "Nói khá tốt. Luyện thêm phần còn yếu bên dưới để chắc điểm cao."];
    if (total >= 60) return ["Đạt", "Đạt yêu cầu tối thiểu (60/100). Cần nói dài hơn, dùng nhiều cấu trúc HSK 3 hơn."];
    return ["Chưa đạt", "Dưới 60/100. Hãy luyện từng phần ở chế độ Luyện tập rồi thi lại."];
  }
  const ADVICE = {
    content: "Nghe kỹ câu hỏi và trả lời đúng trọng tâm. Mẹo: dùng lại từ khoá của câu hỏi khi trả lời (你周末做什么？→ 我周末一般……).",
    grammar: "Ôn các cấu trúc HSK 3 (把、被、比、越来越、一边……一边……、虽然……但是……) và dùng từ nối (首先、然后、所以) khi nói dài.",
    vocab: "Dùng thêm từ vựng HSK 3 thay vì chỉ từ HSK 1–2, tránh lặp đi lặp lại vài từ quen thuộc.",
    fluency: "Nói thành câu dài hơn, ít ngắt quãng. Mỗi ngày tự nói 1 phút về một chủ đề và cố nói đủ 90–120 chữ.",
    pron: "Máy nhận nhầm khá nhiều chữ: luyện thanh điệu ở mục Phát âm, nói chậm, rõ từng âm tiết và để micro gần miệng."
  };

  /* ---------- Trạng thái ---------- */
  const app = () => $("#app");
  let S = null;        // phiên đang làm
  let token = 0;       // tăng mỗi khi thoát/chuyển màn để huỷ các bước chạy dở
  let live = null;     // phiên ghi âm đang chạy
  function stopAll() {
    token++; hush();
    if (live) { live.abort(); live = null; }
  }

  /* ---------- Trang đầu ---------- */
  function home() {
    stopAll(); releaseMic(); S = null;
    const plan = PLANS[settings.minutes];
    const hist = store.get("history", []).slice(-10).reverse();
    app().innerHTML = `<div class="page">
      <div class="page-head">
        <div class="eyebrow">HSK 3 · 口语练习与考试</div>
        <h1>Luyện và thi nói HSK 3</h1>
        <p class="lead">Ba phần thi nói: <b>đối thoại</b> với giám khảo, <b>đặt câu</b> với từ và cấu trúc HSK 3, <b>nói theo chủ đề</b>. Tổng thời gian nói giới hạn 3 hoặc 4 phút. Nói xong máy chấm điểm từng câu, chỉ ra lỗi và cho câu trả lời mẫu.</p>
      </div>
      ${SR ? "" : `<div class="note">Trình duyệt này chưa hỗ trợ nhận giọng nói. Hãy mở trang bằng <b>Chrome</b> hoặc <b>Edge</b> (máy tính hoặc Android). Tạm thời bạn vẫn có thể gõ câu trả lời bằng chữ Hán để chấm thử, nhưng không chấm được phát âm.</div>`}

      <section class="panel hk-exam">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div style="display:grid;gap:6px"><span class="tag red">Thi thử</span><h2>Bài thi nói HSK 3</h2>
          <p class="meta">Làm liền 3 phần như thi thật, máy tự đọc câu hỏi và tự bật micro. Chấm điểm sau khi thi xong.</p></div>
        </div>
        <div class="row">
          <div class="hk-seg" role="radiogroup" aria-label="Thời gian nói">
            ${[3, 4].map((m) => `<button role="radio" aria-checked="${settings.minutes === m}" class="${settings.minutes === m ? "on" : ""}" data-min="${m}">${m} phút</button>`).join("")}
          </div>
          <label class="hk-check"><input type="checkbox" id="st-text" ${settings.showText ? "checked" : ""}> Hiện chữ câu hỏi</label>
          <label class="hk-check"><input type="checkbox" id="st-rec" ${settings.record ? "checked" : ""}> Ghi âm để nghe lại</label>
          <label class="field" style="grid-auto-flow:column;align-items:center;gap:8px">Tốc độ đọc<select id="st-rate">
            ${[[0.7, "Chậm"], [0.85, "Vừa"], [1, "Bình thường"]].map(([v, t]) => `<option value="${v}" ${settings.rate === v ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        </div>
        <div class="table-wrap"><table class="hk-plan"><thead><tr><th>Phần</th><th>Nội dung</th><th>Thời gian nói</th><th>Điểm</th></tr></thead><tbody>
          <tr><td><b>1. Đối thoại</b> <span class="han">对话</span></td><td>Giám khảo hỏi ${plan.dialog} câu về một chủ đề, nghe xong trả lời ngay bằng câu hoàn chỉnh.</td><td>${plan.dialog} × ${plan.cap} giây</td><td>30</td></tr>
          <tr><td><b>2. Đặt câu</b> <span class="han">造句</span></td><td>${plan.sentence} từ / cấu trúc HSK 3, mỗi câu ${PREP.sentence} giây suy nghĩ rồi nói một câu có dùng từ đó.</td><td>${plan.sentence} × ${plan.cap} giây</td><td>30</td></tr>
          <tr><td><b>3. Nói theo chủ đề</b> <span class="han">话题表达</span></td><td>${PREP.topic} giây chuẩn bị (có gợi ý), sau đó nói liên tục về chủ đề.</td><td>ít nhất ${plan.topic} giây + thời gian còn dư</td><td>40</td></tr>
          <tr><td colspan="2"><b>Tổng</b> · đạt từ 60 điểm</td><td><b>tối đa ${settings.minutes} phút nói</b></td><td><b>100</b></td></tr>
        </tbody></table></div>
        <div class="row">
          <button class="btn primary" id="go-exam">Bắt đầu thi ${settings.minutes} phút</button>
          <button class="btn" id="mic-test">${ICON_MIC.replace("<svg", '<svg width="16" height="16"')} Thử micro</button>
          <span class="meta" id="mic-out"></span>
        </div>
      </section>

      <section class="page" style="gap:14px">
        <h2>Luyện từng phần</h2>
        <p class="lead">Không bị tính giờ tổng. Nói xong mỗi câu xem ngay điểm, lỗi, câu mẫu và được nói lại.</p>
        <div class="grid">
          <div class="card"><span class="tag red han">对话</span><h3>Đối thoại</h3>
            <p class="meta">5 câu hỏi liên tiếp của giám khảo về cùng một chủ đề.</p>
            <label class="field">Chủ đề<select id="pr-dlg"><option value="">Ngẫu nhiên</option>${D.dialogs.map((d) => `<option value="${d.id}">${esc(d.title)} · ${d.zh}</option>`).join("")}</select></label>
            <button class="btn dark" id="pr-dlg-go">Luyện đối thoại</button></div>
          <div class="card"><span class="tag red han">造句</span><h3>Đặt câu</h3>
            <p class="meta">${D.patterns.length} từ và cấu trúc ngữ pháp trọng tâm HSK 3.</p>
            <label class="field">Cấu trúc<select id="pr-pat"><option value="">5 cấu trúc ngẫu nhiên</option>${D.patterns.map((p, i) => `<option value="${i}">${esc(p.w)} · ${esc(p.vi)}</option>`).join("")}</select></label>
            <button class="btn dark" id="pr-pat-go">Luyện đặt câu</button></div>
          <div class="card"><span class="tag red han">话题</span><h3>Nói theo chủ đề</h3>
            <p class="meta">${D.topics.length} chủ đề quen thuộc, có gợi ý ý nói và bài mẫu.</p>
            <label class="field">Chủ đề<select id="pr-tp"><option value="">Ngẫu nhiên</option>${D.topics.map((t, i) => `<option value="${i}">${esc(t.zh)} · ${esc(t.vi)}</option>`).join("")}</select></label>
            <label class="field">Thời gian nói<select id="pr-tp-sec">${[[60, "1 phút"], [90, "1 phút 30 giây"], [120, "2 phút"], [180, "3 phút"], [240, "4 phút"]].map(([v, t]) => `<option value="${v}" ${v === 90 ? "selected" : ""}>${t}</option>`).join("")}</select></label>
            <button class="btn dark" id="pr-tp-go">Luyện nói chủ đề</button></div>
        </div>
      </section>

      <section class="panel">
        <h3>Máy chấm điểm thế nào</h3>
        <div class="table-wrap"><table><thead><tr><th>Tiêu chí</th><th>Máy xem xét</th></tr></thead><tbody>
          <tr><td><b>${CRIT.content}</b></td><td>Đối thoại: có trả lời đúng điều được hỏi không. Đặt câu: có dùng từ/cấu trúc được cho. Chủ đề: có nói đúng chủ đề.</td></tr>
          <tr><td><b>${CRIT.grammar}</b></td><td>Câu hoàn chỉnh; đúng khung cấu trúc (把、比、虽然……但是……); bài nói dài có từ nối (首先、然后、所以…).</td></tr>
          <tr><td><b>${CRIT.vocab}</b></td><td>Số chữ khác nhau đã dùng và số từ cấp HSK 3 xuất hiện trong câu.</td></tr>
          <tr><td><b>${CRIT.fluency}</b></td><td>Số chữ nói được, tốc độ (chữ/phút) và việc có bắt đầu nói ngay hay không.</td></tr>
          <tr><td><b>${CRIT.pron}</b></td><td>Độ tin cậy mà bộ nhận giọng nói của trình duyệt trả về: phát âm càng chuẩn, máy nghe càng đúng.</td></tr>
        </tbody></table></div>
        <p class="meta">Điểm do máy chấm dựa trên chữ mà trình duyệt nghe được, chỉ để tham khảo khi tự luyện; giáo viên vẫn nên nghe lại bản ghi âm. Nói rõ, đủ to, ở nơi yên tĩnh để máy nghe chính xác.</p>
      </section>

      <section class="panel"><h3>Lịch sử điểm</h3>
        ${hist.length ? `<div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Bài</th><th>Điểm</th><th>Kết quả</th></tr></thead><tbody>${hist.map((h) =>
          `<tr><td>${new Date(h.t).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</td><td>${esc(h.name)}</td><td style="font-variant-numeric:tabular-nums"><b>${h.score}</b>/${h.max}</td><td>${esc(h.level || "")}</td></tr>`).join("")}</tbody></table></div>`
          : `<p class="meta">Chưa có lượt nào. Điểm mỗi lượt thi và luyện sẽ hiện ở đây.</p>`}
      </section>
    </div>`;

    $$(".hk-seg button").forEach((b) => (b.onclick = () => { settings.minutes = +b.dataset.min; saveSettings(); home(); }));
    $("#st-text").onchange = (e) => { settings.showText = e.target.checked; saveSettings(); };
    $("#st-rec").onchange = (e) => { settings.record = e.target.checked; saveSettings(); };
    $("#st-rate").onchange = (e) => { settings.rate = +e.target.value; saveSettings(); };
    $("#go-exam").onclick = startExam;
    $("#mic-test").onclick = micTest;
    $("#pr-dlg-go").onclick = () => {
      const d = D.dialogs.find((x) => x.id === $("#pr-dlg").value) || pick(D.dialogs);
      startSession("practice", `Luyện đối thoại · ${d.title}`, d.qs.map((q) => ({ part: "dialog", data: q, topic: d, cap: 20, prep: 0 })));
    };
    $("#pr-pat-go").onclick = () => {
      const v = $("#pr-pat").value;
      const ps = v === "" ? shuffle(D.patterns).slice(0, 5) : [D.patterns[+v]];
      startSession("practice", v === "" ? "Luyện đặt câu · 5 cấu trúc" : `Luyện đặt câu · ${D.patterns[+v].w}`, ps.map((p) => ({ part: "sentence", data: p, cap: 20, prep: 0 })));
    };
    $("#pr-tp-go").onclick = () => {
      const v = $("#pr-tp").value, tp = v === "" ? pick(D.topics) : D.topics[+v], sec = +$("#pr-tp-sec").value;
      startSession("practice", `Luyện chủ đề · ${tp.zh}`, [{ part: "topic", data: tp, cap: sec, base: sec, prep: 0 }]);
    };
    window.scrollTo(0, 0);
  }

  async function micTest() {
    const out = $("#mic-out"), btn = $("#mic-test");
    if (!SR) { out.textContent = "Trình duyệt chưa hỗ trợ nhận giọng nói (dùng Chrome hoặc Edge)."; return; }
    btn.disabled = true; out.textContent = "Hãy nói: 你好，我叫……（5 giây）";
    const my = ++token;
    const c = capture({ maxSec: 5, onUpdate: (t) => { if (my === token) out.textContent = "Đang nghe: " + t; } });
    live = c;
    const r = await c.done; live = null;
    if (my !== token) return;
    btn.disabled = false;
    if (r.fatal && r.fatal !== "restart") out.textContent = speechMessage(r.fatal);
    else if (!r.text) out.textContent = "Không nghe thấy gì. Kiểm tra micro rồi thử lại.";
    else out.textContent = `Máy nghe được: “${r.text}”${r.confs.length ? ` · độ rõ ${Math.round((r.confs.reduce((a, b) => a + b, 0) / r.confs.length) * 100)}%` : ""}. Micro hoạt động tốt!`;
  }

  /* ---------- Tạo đề thi ---------- */
  function startExam() {
    const plan = PLANS[settings.minutes];
    const d = pick(D.dialogs);
    const items = [
      ...d.qs.slice(0, plan.dialog).map((q) => ({ part: "dialog", data: q, topic: d, cap: plan.cap, prep: PREP.dialog })),
      ...shuffle(D.patterns).slice(0, plan.sentence).map((p) => ({ part: "sentence", data: p, cap: plan.cap, prep: PREP.sentence })),
      { part: "topic", data: pick(D.topics), cap: plan.topic, base: plan.topic, prep: PREP.topic }
    ];
    startSession("exam", `Thi thử ${settings.minutes} phút`, items, plan.total);
  }
  function startSession(mode, title, items, budget) {
    stopAll();
    S = { mode, title, items, idx: 0, results: [], used: 0, budget: budget || 0, intro: {}, started: Date.now() };
    if (!synth && mode === "exam") settings.showText = true;
    showItem();
  }
  const isExam = () => S && S.mode === "exam";
  function capOf(it) {
    if (!isExam() || it.part !== "topic") return it.cap;
    const left = S.budget - S.used;
    return Math.round(Math.min(it.base + 60, Math.max(it.base, left)));
  }

  /* ---------- Màn giới thiệu từng phần ---------- */
  function partIntro(it) {
    const P = PARTS[it.part], n = S.items.filter((x) => x.part === it.part).length;
    const text = {
      dialog: () => `Giám khảo sẽ hỏi ${n} câu về chủ đề <b>${esc(it.topic.title)}</b> (<span class="han">${esc(it.topic.zh)}</span>). Nghe câu hỏi rồi trả lời ngay bằng một câu hoàn chỉnh. Mỗi câu nói tối đa ${it.cap} giây; nói xong bấm <b>Nói xong</b> để sang câu tiếp.`,
      sentence: () => `Mỗi câu cho một từ hoặc cấu trúc ngữ pháp HSK 3. Bạn có ${PREP.sentence} giây suy nghĩ, sau đó nói <b>một câu hoàn chỉnh</b> có dùng từ đó (tối đa ${it.cap} giây).`,
      topic: () => `Bạn có ${PREP.topic} giây chuẩn bị với các câu gợi ý, sau đó nói liên tục về chủ đề. Thời gian nói: <b>${mmss(capOf(it))}</b> (gồm cả thời gian còn dư của phần trước, tổng không quá ${settings.minutes} phút).`
    }[it.part]();
    app().innerHTML = `<div class="quiz">
      ${topBar()}
      <div class="panel hk-intro">
        <div class="eyebrow">Phần ${P.no} · ${P.max} điểm</div>
        <h2>${P.name} <span class="han">${P.zh}</span></h2>
        <p>${text}</p>
        <div class="row"><button class="btn primary" id="hk-begin">Bắt đầu phần ${P.no}</button><button class="btn small" id="hk-quit">Thoát bài thi</button></div>
      </div></div>`;
    $("#hk-begin").onclick = () => { S.intro[it.part] = true; showItem(); };
    $("#hk-quit").onclick = quit;
    $("#hk-begin").focus();
  }
  function topBar() {
    const it = S.items[S.idx], P = PARTS[it.part];
    const inPart = S.items.filter((x) => x.part === it.part), k = inPart.indexOf(it) + 1;
    const right = isExam() ? `<span class="hk-budget" id="hk-budget">Thời gian nói còn <b>${mmss(S.budget - S.used)}</b></span>` : `<span>${esc(S.title)}</span>`;
    return `<div class="q-top"><span>Phần ${P.no} · ${P.name} · Câu ${k}/${inPart.length}</span>${right}</div>
      <div class="progress"><i style="width:${(S.idx / S.items.length) * 100}%"></i></div>`;
  }

  /* ---------- Màn một câu ---------- */
  function promptHtml(it) {
    const exam = isExam();
    if (it.part === "dialog") {
      const q = it.data, show = !exam || settings.showText;
      return `<div class="ask">考官 · Giám khảo hỏi</div>
        <div class="hk-q han">${show ? esc(q.q) : "（请听问题 · Nghe câu hỏi）"}</div>
        ${show ? `<div class="meta">${esc(q.py)}</div>` : ""}
        ${exam ? "" : `<details class="hk-vi"><summary>Xem nghĩa</summary>${esc(q.vi)}</details>`}
        <button class="btn small" id="hk-replay">${ICON_SPK.replace("<svg", '<svg width="16" height="16"')} Nghe lại câu hỏi</button>`;
    }
    if (it.part === "sentence") {
      const p = it.data;
      return `<div class="ask">Dùng từ / cấu trúc sau để nói một câu hoàn chỉnh</div>
        <div class="big han">${esc(p.w)}</div>
        <div class="mid">${esc(p.py)}</div><div>${esc(p.vi)}</div>
        <div class="meta">Khung câu: ${esc(p.form)}</div>`;
    }
    const tp = it.data;
    return `<div class="ask">Nói theo chủ đề</div>
      <div class="hk-topic han">${esc(tp.zh)}</div>
      <div class="mid">${esc(tp.py)}</div><div>${esc(tp.vi)}</div>
      <ul class="hk-hints">${tp.hints.map(([z, v]) => `<li><span class="han">${esc(z)}</span> <small>${esc(v)}</small></li>`).join("")}</ul>`;
  }
  function showItem() {
    stopAll();
    if (S.idx >= S.items.length) return finish();
    const it = S.items[S.idx];
    if (isExam() && !S.intro[it.part]) return partIntro(it);
    const cap = capOf(it);
    app().innerHTML = `<div class="quiz">
      ${topBar()}
      <div class="q-prompt hk-prompt">${promptHtml(it)}</div>
      <div class="hk-rec">
        <div class="hk-ring" id="hk-ring" style="--p:0"><button class="mic" id="hk-mic" aria-label="Bắt đầu nói">${ICON_MIC}</button></div>
        <div class="hk-time" id="hk-time">${mmss(cap)}</div>
        <div class="hk-status" id="hk-status" aria-live="polite">${isExam() ? "Chuẩn bị…" : "Bấm micro rồi nói. Bấm lần nữa khi nói xong."}</div>
        <div class="hk-live han" id="hk-live"></div>
        <div class="row" style="justify-content:center">
          <button class="btn primary small" id="hk-now" hidden>Nói ngay</button>
          <button class="btn dark small" id="hk-done" hidden>Nói xong</button>
          <button class="btn small" id="hk-skip">Bỏ qua câu này</button>
        </div>
      </div>
      <div id="hk-fb"></div>
      <div class="row"><button class="btn small" id="hk-quit">← ${isExam() ? "Thoát bài thi" : "Về trang luyện"}</button>
        ${!isExam() && S.results.length ? `<button class="btn small" id="hk-end">Kết thúc, xem tổng kết</button>` : ""}</div>
    </div>`;
    $("#hk-quit").onclick = quit;
    if ($("#hk-end")) $("#hk-end").onclick = finish;
    const replay = $("#hk-replay");
    if (replay) replay.onclick = () => { if (!live) speak(it.data.q); };
    $("#hk-skip").onclick = () => {
      stopAll();
      save(it, { text: "", confs: [], dur: 0, firstAt: null, typed: !SR, skipped: true });
      S.idx++; showItem();
    };
    if (isExam()) runExamItem(it, cap); else setupPractice(it, cap);
  }
  function quit() {
    if (isExam() && S.results.length && !quit.armed) {
      quit.armed = true; toast("Bấm thoát lần nữa để bỏ bài thi (kết quả sẽ không được lưu).");
      setTimeout(() => (quit.armed = false), 3000); return;
    }
    quit.armed = false; home();
  }

  /* Ghi âm một câu trả lời */
  async function record(it, cap) {
    const my = token;
    const mic = $("#hk-mic"), ring = $("#hk-ring"), tm = $("#hk-time"), st = $("#hk-status"), lv = $("#hk-live"), done = $("#hk-done");
    hush();
    mic.classList.add("on"); mic.innerHTML = ICON_STOP; mic.setAttribute("aria-label", "Nói xong");
    done.hidden = false; $("#hk-now").hidden = true; $("#hk-skip").hidden = isExam();
    if ($("#hk-replay")) $("#hk-replay").disabled = true;
    st.textContent = SR ? "Đang nghe… hãy nói bằng tiếng Trung" : "Gõ câu trả lời rồi bấm Nói xong";
    // Ghi âm chạy song song, không bắt nhận giọng nói phải chờ (hộp xin quyền micro có thể đang mở)
    let rec = null, late = false;
    if (SR) startRecorder().then((r) => { if (!r) return; if (late) r.stop(); else rec = r; });
    const onTick = (e) => {
      ring.style.setProperty("--p", (e / cap).toFixed(3));
      tm.textContent = mmss(cap - e);
      tm.classList.toggle("warn", cap - e <= 5);
      const b = $("#hk-budget"); if (b) b.innerHTML = `Thời gian nói còn <b>${mmss(S.budget - S.used - e)}</b>`;
    };
    const c = SR ? capture({ maxSec: cap, onTick, onUpdate: (t) => { lv.textContent = t; } }) : typedCapture(lv, { maxSec: cap, onTick });
    live = c;
    mic.onclick = () => c.stop(); done.onclick = () => c.stop();
    const res = await c.done;
    if (live === c) live = null;
    late = true;
    res.audio = rec ? await rec.stop() : null;
    if (my !== token) return null;
    mic.classList.remove("on"); mic.innerHTML = ICON_MIC; mic.setAttribute("aria-label", "Bắt đầu nói");
    done.hidden = true; $("#hk-skip").hidden = false;
    if ($("#hk-replay")) $("#hk-replay").disabled = false;
    if (res.fatal && res.fatal !== "restart") { st.textContent = speechMessage(res.fatal); return Object.assign(res, { failed: true }); }
    st.textContent = res.text ? "Đã ghi lại câu trả lời." : "Không nghe thấy gì.";
    return res;
  }
  function save(it, res) {
    const sc = scoreItem(it, res);
    S.results[S.idx] = { it, res, sc };
    if (isExam()) S.used = Math.min(S.budget, S.used + (res.dur || 0));
    return sc;
  }

  /* Thi thử: tự đọc câu hỏi, đếm giờ chuẩn bị, tự bật micro */
  async function runExamItem(it, cap) {
    const my = token, st = $("#hk-status");
    if (it.part === "dialog") {
      st.textContent = "Giám khảo đang hỏi…";
      await wait(300);
      if (my !== token) return;
      await speak(it.data.q);
      if (my !== token) return;
    }
    // Đếm giờ chuẩn bị (không tính vào thời gian nói)
    const now = $("#hk-now"), mic = $("#hk-mic");
    let skip = false;
    now.hidden = false; now.onclick = () => (skip = true); mic.onclick = () => (skip = true);
    for (let s = it.prep; s > 0 && !skip; s -= 0.25) {
      st.textContent = `Chuẩn bị: còn ${Math.ceil(s)} giây`;
      await wait(250);
      if (my !== token) return;
    }
    now.hidden = true;
    const res = await record(it, cap);
    if (!res || my !== token) return;
    if (res.failed) {
      // Lỗi micro: cho bấm micro thử lại câu này
      mic.onclick = () => { if (!live) runAgain(); };
      const runAgain = async () => { const r2 = await record(it, cap); if (r2 && !r2.failed && token === my) { save(it, r2); S.idx++; showItem(); } };
      return;
    }
    save(it, res);
    await wait(700);
    if (my !== token) return;
    S.idx++; showItem();
  }

  /* Luyện tập: tự bấm micro, xem điểm ngay, được nói lại */
  function setupPractice(it, cap) {
    const my = token;
    if (it.part === "dialog") setTimeout(() => { if (my === token && !live) speak(it.data.q); }, 300);
    $("#hk-mic").onclick = async () => {
      if (live) return;
      $("#hk-fb").innerHTML = ""; $("#hk-live").textContent = "";
      const res = await record(it, cap);
      if (!res || res.failed || my !== token) return;
      const sc = save(it, res);
      $("#hk-fb").innerHTML = itemCard(S.results[S.idx], true);
      const next = S.idx + 1 < S.items.length;
      $("#hk-fb").insertAdjacentHTML("beforeend", `<div class="row" style="justify-content:center;margin-top:12px">
        <button class="btn" id="hk-again">Nói lại câu này</button>
        <button class="btn primary" id="hk-next">${next ? "Câu tiếp →" : "Xem tổng kết"}</button></div>`);
      $("#hk-again").onclick = () => showItem();
      $("#hk-next").onclick = () => { S.idx++; showItem(); };
      $("#hk-status").textContent = `Điểm câu này: ${sc.score}/10`;
      $("#hk-fb").scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  /* ---------- Kết quả ---------- */
  function itemCard(r, open) {
    const { it, res, sc } = r, P = PARTS[it.part];
    let head = "", sample = "";
    if (it.part === "dialog") {
      head = `<span class="han">${esc(it.data.q)}</span> <small class="meta">${esc(it.data.vi)}</small>`;
      sample = `<div class="hk-sample">${spkBtn(it.data.a, "câu mẫu")}<div><div class="han">${esc(it.data.a)}</div><div class="meta">${esc(it.data.av)}</div></div></div>`;
    } else if (it.part === "sentence") {
      head = `<span class="han">${esc(it.data.w)}</span> <small class="meta">${esc(it.data.vi)}</small>`;
      sample = `<div class="hk-sample">${spkBtn(it.data.s, "câu mẫu")}<div><div class="han">${esc(it.data.s)}</div><div>${esc(it.data.sp)}</div><div class="meta">${esc(it.data.sv)}</div></div></div>`;
    } else {
      head = `<span class="han">${esc(it.data.zh)}</span> <small class="meta">${esc(it.data.vi)}</small>`;
      sample = `<div class="hk-sample">${spkBtn(it.data.s, "bài mẫu")}<div><div class="han">${esc(it.data.s)}</div><div class="meta">${esc(it.data.sv)}</div></div></div>`;
    }
    const pct = sc.score * 10, cls = pct >= 75 ? "ok" : pct >= 50 ? "mid" : "no";
    const crit = Object.keys(CRIT).filter((k) => sc.crit[k] != null).map((k) =>
      `<div class="hk-crit"><span>${CRIT[k]}</span><div class="progress"><i style="width:${Math.round(sc.crit[k] * 100)}%"></i></div><b>${Math.round(sc.crit[k] * 100)}</b></div>`).join("");
    return `<details class="hk-item ${cls}" ${open ? "open" : ""}>
      <summary><span class="hk-pill ${cls}">${sc.score}/10</span><span class="hk-item-h">${head}</span></summary>
      <div class="hk-item-b">
        <div><div class="ask">Bạn nói${res.typed ? " (gõ chữ)" : ""}${res.dur ? ` · ${Math.round(res.dur)} giây` : ""}${sc.n ? ` · ${sc.n} chữ` : ""}${sc.cpm ? ` · ${sc.cpm} chữ/phút` : ""}</div>
          <div class="hk-said han">${res.skipped ? "<i class='meta'>(bỏ qua)</i>" : res.text ? highlight(res.text, (sc.marks || []).concat(sc.hsk || [])) : "<i class='meta'>(không nghe được)</i>"}</div>
          ${res.audio ? `<audio controls src="${res.audio}" preload="none"></audio>` : ""}</div>
        <div class="hk-crits">${crit}</div>
        ${sc.good.length ? `<ul class="hk-good">${sc.good.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : ""}
        ${sc.issues.length ? `<ul class="hk-bad">${sc.issues.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : ""}
        ${sc.hsk && sc.hsk.length ? `<p class="meta">Từ HSK 3 đã dùng: <span class="han">${sc.hsk.map(esc).join("、")}</span></p>` : ""}
        ${res.typed ? `<p class="meta">Gõ chữ nên không chấm phát âm.</p>` : res.text && !res.confs.length ? `<p class="meta">Trình duyệt không trả về độ rõ phát âm, máy tạm cho mức trung bình.</p>` : ""}
        <div><div class="ask">${P.no === 3 ? "Bài nói mẫu" : "Câu mẫu"}</div>${sample}</div>
      </div></details>`;
  }
  function finish() {
    stopAll();
    const rs = S.results.filter(Boolean);
    if (!rs.length) { home(); return; }
    const parts = Object.keys(PARTS).map((k) => {
      const list = rs.filter((r) => r.it.part === k);
      if (!list.length) return null;
      const avg = list.reduce((a, r) => a + r.sc.score, 0) / list.length; // trên thang 10
      return { k, P: PARTS[k], list, avg, pts: Math.round((avg / 10) * PARTS[k].max * 10) / 10 };
    }).filter(Boolean);
    const exam = isExam();
    const max = 100;
    const total = exam ? Math.round(parts.reduce((a, p) => a + p.pts, 0)) : Math.round((rs.reduce((a, r) => a + r.sc.score, 0) / rs.length) * 10);
    const crit = {};
    Object.keys(CRIT).forEach((k) => { const v = rs.map((r) => r.sc.crit[k]).filter((x) => x != null); if (v.length) crit[k] = v.reduce((a, b) => a + b, 0) / v.length; });
    const weak = Object.keys(crit).sort((a, b) => crit[a] - crit[b]).filter((k) => crit[k] < 0.75).slice(0, 2);
    const [lv, lvText] = level(total);
    const spoken = rs.reduce((a, r) => a + (r.res.dur || 0), 0);
    const h = store.get("history", []);
    h.push({ t: Date.now(), name: S.title, score: total, max, level: lv });
    store.set("history", h.slice(-40));
    app().innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">${exam ? "Kết quả thi nói HSK 3" : "Tổng kết buổi luyện"} · ${esc(S.title)}</div>
        <h1>${exam ? "Điểm bài thi" : "Điểm luyện tập"}: ${total}/100</h1></div>
      <section class="panel hk-result">
        <div class="hk-score"><div class="score-big">${total}</div><div><span class="hk-pill ${total >= 75 ? "ok" : total >= 60 ? "mid" : "no"}">${lv}</span><p class="lead">${lvText}</p>
          <p class="meta">Đã nói ${mmss(spoken)}${exam ? ` trên tối đa ${mmss(S.budget)}` : ""} · ${rs.length} câu.</p></div></div>
        ${exam || parts.length > 1 ? `<div class="hk-parts">${parts.map((p) => `<div class="hk-part"><div class="row" style="justify-content:space-between"><b>Phần ${p.P.no}. ${p.P.name} <span class="han meta">${p.P.zh}</span></b><b>${exam ? `${p.pts}/${p.P.max}` : `${Math.round(p.avg * 10)}/100`}</b></div>
          <div class="progress"><i style="width:${(p.avg / 10) * 100}%"></i></div></div>`).join("")}</div>` : ""}
        <h3>Theo tiêu chí</h3>
        <div class="hk-crits">${Object.keys(crit).map((k) => `<div class="hk-crit"><span>${CRIT[k]}</span><div class="progress"><i style="width:${Math.round(crit[k] * 100)}%"></i></div><b>${Math.round(crit[k] * 100)}</b></div>`).join("")}</div>
        ${weak.length ? `<div class="note"><b>Cần cải thiện:</b><ul>${weak.map((k) => `<li>${ADVICE[k]}</li>`).join("")}</ul></div>` : `<div class="note jade">Các tiêu chí đều tốt. Hãy thử bài thi 4 phút hoặc chủ đề mới!</div>`}
        <div class="row">
          <button class="btn primary" id="hk-retry">${exam ? "Thi đề mới" : "Luyện lại"}</button>
          <button class="btn" id="hk-home">Về trang đầu</button>
        </div>
      </section>
      ${parts.map((p) => `<section class="page" style="gap:10px"><h2>Phần ${p.P.no}. ${p.P.name} <span class="han meta">${p.P.zh}</span></h2>
        ${p.list.map((r) => itemCard(r, false)).join("")}</section>`).join("")}
    </div>`;
    const again = S;
    $("#hk-retry").onclick = () => {
      if (again.mode === "exam") startExam();
      else startSession("practice", again.title, again.items.map((x) => ({ ...x })));
    };
    $("#hk-home").onclick = home;
    window.scrollTo(0, 0);
  }

  /* ---------- Khởi động ---------- */
  const mb = $(".menu-btn"); if (mb) mb.onclick = () => $(".nav").classList.toggle("open");
  window.addEventListener("beforeunload", () => { stopAll(); releaseMic(); });
  // Cho phép kiểm thử: window.HSK3_TEST.score(...)
  window.HSK3_TEST = { scoreDialog, scoreSentence, scoreTopic };
  home();
})();
