/* English 4·7 – học và thi thử Tiếng Anh lớp 4, lớp 7. Ứng dụng một trang, không cần build. */
(function () {
  "use strict";

  /* ---------- Tiện ích ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lines = (s) => String(s || "").split("\n").map((x) => x.trim()).filter(Boolean);
  function seeded(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const shuffle = (a, r = Math.random) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = (s) => String(s == null ? "" : s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, " ").trim().replace(/[.?!]+$/, "").trim();
  const fmtTime = (sec) => { sec = Math.max(0, Math.round(sec)); const m = Math.floor(sec / 60), s = sec % 60; return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0"); };
  const fmtDate = (t) => { const d = new Date(t); return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }); };
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ta47:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ta47:" + k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } },
    del(k) { try { localStorage.removeItem("ta47:" + k); } catch (e) { /* bỏ qua */ } }
  };
  function toast(msg) {
    $$(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }

  /* ---------- Biểu tượng ---------- */
  const I = {
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/></svg>'
  };
  const ILL = {
    book: '<svg class="ill" viewBox="0 0 220 150" aria-hidden="true"><ellipse class="i-shadow" cx="110" cy="138" rx="80" ry="8"/><path class="i-blue-soft" d="M110 40c-22-16-52-18-78-10v94c26-8 56-6 78 10z"/><path class="i-red-soft" d="M110 40c22-16 52-18 78-10v94c-26-8-56-6-78 10z"/><path class="i-line" d="M50 58h40M50 74h44M50 90h34M130 58h40M130 74h36M130 90h40"/><text x="116" y="122" font-size="22" class="i-ink">ABC</text><path class="i-star" d="m172 6 5 10 11 2-8 7 2 11-10-5-10 5 2-11-8-7 11-2z"/><path class="i-star" d="m36 4 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/><circle class="i-blue" cx="64" cy="20" r="5"/></svg>',
    timer: '<svg class="ill" viewBox="0 0 220 150" aria-hidden="true"><ellipse class="i-shadow" cx="110" cy="138" rx="80" ry="8"/><rect class="i-card" x="22" y="34" width="80" height="96" rx="10"/><path class="i-line" d="M38 56h30M38 76h40M38 96h34M38 116h24"/><circle class="i-blue" cx="86" cy="56" r="6"/><circle class="i-red" cx="86" cy="96" r="6"/><circle class="i-red-soft" cx="148" cy="82" r="50"/><circle class="i-card" cx="148" cy="82" r="38"/><rect class="i-red" x="138" y="18" width="20" height="12" rx="4"/><path class="i-line" d="M148 82V58M148 82l16 10" style="stroke:var(--ink);stroke-width:5"/><circle class="i-ink" cx="148" cy="82" r="5"/><path class="i-star" d="m200 14 4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/></svg>',
    paper: '<svg class="ill" viewBox="0 0 220 150" aria-hidden="true"><ellipse class="i-shadow" cx="110" cy="138" rx="80" ry="8"/><rect class="i-blue-soft" x="70" y="10" width="104" height="124" rx="10" transform="rotate(6 122 72)"/><rect class="i-card" x="56" y="12" width="104" height="124" rx="10"/><path class="i-line" d="M72 40h56M72 58h70M72 76h50M72 94h64M72 112h40"/><circle class="i-red-soft" cx="160" cy="104" r="30"/><text x="140" y="116" font-size="34" class="i-red" style="fill:var(--red)">10</text><path class="i-star" d="m40 20 4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/></svg>'
  };
  const spkBtn = (text, big) => `<button type="button" class="icon-btn${big ? " big" : ""}" data-say="${esc(text)}" aria-label="Nghe đọc" title="Nghe đọc">${I.spk}</button>`;
  const starsHTML = (n) => `<span class="stars" aria-label="${n} sao">${"<i>★</i>".repeat(n)}${"★".repeat(3 - n)}</span>`;

  /* ---------- Giao diện sáng / tối (mặc định sáng) ---------- */
  const themePref = () => { const t = store.get("theme", "light"); return ["light", "dark", "auto"].includes(t) ? t : "light"; };
  const isDark = () => { const t = themePref(); return t === "dark" || (t === "auto" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches); };
  function applyTheme() {
    const t = themePref();
    if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t);
    const b = document.getElementById("theme-btn");
    if (b) { const dark = isDark(); b.innerHTML = dark ? I.sun : I.moon; b.title = dark ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"; b.setAttribute("aria-label", b.title); }
  }

  /* ---------- Giọng đọc (đọc to bằng giọng có sẵn của trình duyệt) ---------- */
  const TTS = { voices: [] };
  const accent = () => store.get("accent", "en-GB");
  function loadVoices() { try { TTS.voices = window.speechSynthesis.getVoices() || []; } catch (e) { TTS.voices = []; } }
  if ("speechSynthesis" in window) { loadVoices(); try { window.speechSynthesis.onvoiceschanged = loadVoices; } catch (e) { /* bỏ qua */ } }
  function utter(text, rate) {
    const u = new SpeechSynthesisUtterance(text);
    const want = accent().toLowerCase();
    const vs = TTS.voices;
    const v = vs.find((x) => x.lang && x.lang.toLowerCase().replace("_", "-") === want) || vs.find((x) => /^en[-_](gb|us)/i.test(x.lang)) || vs.find((x) => /^en/i.test(x.lang));
    if (v) u.voice = v;
    u.lang = v ? v.lang : accent();
    u.rate = rate || 0.9;
    return u;
  }
  let sayListId = 0;
  function say(text, rate) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ đọc to."); return; }
    sayListId++;
    try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(utter(text, rate)); } catch (e) { toast("Không phát được âm thanh."); }
  }
  // Đọc lần lượt nhiều từ, gọi onWord(i) khi bắt đầu đọc từ thứ i, onWord(-1) khi xong
  function sayList(texts, onWord) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ đọc to."); return; }
    const id = ++sayListId;
    try { window.speechSynthesis.cancel(); } catch (e) { /* bỏ qua */ }
    const next = (i) => {
      if (id !== sayListId) return;
      if (i >= texts.length) { onWord(-1); return; }
      onWord(i);
      const u = utter(texts[i], 0.85);
      u.onend = () => setTimeout(() => next(i + 1), 700);
      u.onerror = () => { if (id === sayListId) onWord(-1); };
      try { window.speechSynthesis.speak(u); } catch (e) { onWord(-1); }
    };
    next(0);
  }
  function stopSay() { sayListId++; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* bỏ qua */ } }

  /* ---------- Nhận giọng nói (luyện nói) ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let activeRec = null;
  function listenOnce(onDone) {
    if (!SR) { onDone({ error: "unsupported" }); return; }
    let finished = false;
    const done = (r) => { if (!finished) { finished = true; activeRec = null; onDone(r); } };
    try {
      if (activeRec) activeRec.abort();
      const rec = new SR();
      rec.lang = accent(); rec.interimResults = false; rec.maxAlternatives = 4; rec.continuous = false;
      rec.onresult = (e) => { const alts = Array.from(e.results[0] || []).map((a) => a.transcript); done({ alts }); };
      rec.onerror = (e) => done({ error: e.error || "error" });
      rec.onend = () => done({ error: "no-speech" });
      activeRec = rec; rec.start();
    } catch (e) { done({ error: "start" }); }
  }
  const toWords = (s) => norm(s).replace(/[^a-z0-9' ]+/g, " ").split(" ").filter(Boolean);
  function speechMatch(target, heard) {
    const t = toWords(target), h = toWords(heard);
    const dp = Array.from({ length: t.length + 1 }, () => new Array(h.length + 1).fill(0));
    for (let i = t.length - 1; i >= 0; i--) for (let j = h.length - 1; j >= 0; j--) dp[i][j] = t[i] === h[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Array(t.length).fill(false);
    let i = 0, j = 0;
    while (i < t.length && j < h.length) { if (t[i] === h[j]) { hit[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
    const score = t.length ? Math.round((dp[0][0] / Math.max(t.length, h.length)) * 100) : 0;
    return { score, words: t, hit };
  }
  const SR_ERR = {
    unsupported: "Trình duyệt này chưa nhận được giọng nói. Hãy mở bằng Chrome, Edge hoặc Safari bản mới.",
    "not-allowed": "Chưa được phép dùng micro. Hãy cho phép micro trong cài đặt trình duyệt rồi thử lại.",
    "service-not-allowed": "Chưa được phép dùng micro. Hãy cho phép micro trong cài đặt trình duyệt rồi thử lại.",
    "no-speech": "Máy chưa nghe thấy gì. Em nói to và rõ hơn rồi thử lại nhé.",
    "audio-capture": "Không tìm thấy micro trên máy.",
    network: "Nhận giọng nói cần kết nối mạng. Em kiểm tra mạng rồi thử lại."
  };

  /* ---------- Dữ liệu ---------- */
  function parseMC(l) {
    const [body, ex] = l.split("#");
    const parts = body.split("|").map((x) => x.trim());
    return { q: parts[0], ok: parts[1], wrong: parts.slice(2), ex: (ex || "").trim() };
  }
  function parseKeyed(l) { const i = l.lastIndexOf("|"); return { raw: l.slice(0, i).trim(), k: +l.slice(i + 1) }; }
  const GRADES = {};
  Object.keys(window.EN_GRADES || {}).forEach((key) => {
    const D = window.EN_GRADES[key];
    const units = D.units.map((u) => ({
      n: u.n, t: u.t, vi: u.vi,
      words: lines(u.words).map((l) => { const [en, vi] = l.split("|"); return { en: en.trim(), vi: (vi || "").trim(), u: u.n }; }),
      sents: lines(u.sents).map((s) => ({ s, u: u.n })),
      gram: lines(u.gram).map((l) => Object.assign(parseMC(l), { u: u.n })),
      phon: lines(u.phon).map((l) => Object.assign(parseKeyed(l), { u: u.n })),
      stress: lines(u.stress).map((l) => Object.assign(parseKeyed(l), { u: u.n })),
      errs: lines(u.errs).map((l) => Object.assign(parseKeyed(l), { u: u.n })),
      rew: lines(u.rew).map((l) => Object.assign(parseMC(l), { u: u.n }))
    }));
    const readings = (D.readings || []).map((R) => ({
      units: R.units, kind: R.kind || "read", title: R.title, text: R.text,
      qs: lines(R.qs).map((l) => { const p = l.split("|").map((x) => x.trim()); return p.length === 2 && /^[TF]$/.test(p[1]) ? { q: p[0], tf: p[1] === "T" } : { q: p[0], ok: p[1], wrong: p.slice(2) }; })
    }));
    GRADES[key] = Object.assign({}, D, {
      units, readings,
      words: units.flatMap((u) => u.words),
      sents: units.flatMap((u) => u.sents),
      halves: [D.terms[1].units, D.terms[3].units]
    });
  });
  const GRADE_KEYS = Object.keys(GRADES);
  const curGradeKey = () => { const k = store.get("grade", "lop4"); return GRADES[k] ? k : GRADE_KEYS[0]; };

  function poolOf(G, lo, hi) {
    const us = G.units.filter((u) => u.n >= lo && u.n <= hi);
    const cat = (k) => us.flatMap((u) => u[k]);
    return {
      words: cat("words"), sents: cat("sents"), gram: cat("gram"), phon: cat("phon"), stress: cat("stress"), errs: cat("errs"), rew: cat("rew"),
      readings: G.readings.filter((R) => R.units[0] >= lo && R.units[1] <= hi)
    };
  }

  /* ---------- Sinh câu hỏi ---------- */
  const LETTERS = "ABCD";
  const blankify = (s) => s.replace(/_{3,}/g, '<span class="blank"></span>');
  function mkMC(o) {
    const all = [o.ok].concat(o.wrong);
    const opts = o.keep ? all : shuffle(all, o.r);
    return { type: "mc", tag: o.tag, p: o.p, opts, a: opts.indexOf(o.ok), ex: o.ex || "", say: o.say || "", hear: !!o.hear, passage: o.passage || null };
  }
  // Lấy n phương án nhiễu khác đáp án, ưu tiên cùng Unit
  function distract(w, G, field, n, r) {
    const seen = new Set([w[field].toLowerCase(), w.en.toLowerCase()]);
    const skipVi = w.vi;
    const out = [];
    const same = shuffle(G.words.filter((x) => x.u === w.u), r);
    const rest = shuffle(G.words.filter((x) => x.u !== w.u), r);
    for (const x of same.concat(rest)) {
      const k = x[field].toLowerCase();
      if (seen.has(k) || seen.has(x.en.toLowerCase()) || x.vi === skipVi) continue;
      seen.add(k); seen.add(x.en.toLowerCase()); out.push(x[field]);
      if (out.length === n) break;
    }
    return out;
  }
  const Q = {
    meaning(w, G, r) {
      return mkMC({ tag: "Từ vựng", p: `Chọn nghĩa đúng của từ <b class="en">${esc(w.en)}</b>`, ok: esc(w.vi), wrong: distract(w, G, "vi", 3, r).map(esc), say: w.en, hear: true, r });
    },
    viEn(w, G, r) {
      return mkMC({ tag: "Từ vựng", p: `Từ nào có nghĩa là <b>“${esc(w.vi)}”</b>?`, ok: esc(w.en), wrong: distract(w, G, "en", 3, r).map(esc), say: w.en, r });
    },
    listen(w, G, r) {
      return mkMC({ tag: "Nghe", p: "Nghe và chọn từ em nghe được", ok: esc(w.en), wrong: distract(w, G, "en", 3, r).map(esc), say: w.en, hear: true, r });
    },
    letter(w, G, r, k) {
      const ch = Array.from(w.en);
      const pos = ch.map((c, i) => (/[a-z]/i.test(c) ? i : -1)).filter((i) => i >= 0);
      k = Math.max(1, Math.min(k || 1, pos.length - 2));
      const hide = shuffle(pos, r).slice(0, k).sort((a, b) => a - b);
      const disp = ch.map((c, i) => (hide.includes(i) ? '<span class="gap"></span>' : c === " " ? '<span class="sp"></span>' : esc(c))).join("");
      const ans = hide.map((i) => ch[i]).join("").toLowerCase();
      return { type: "text", tag: "Điền chữ", p: `Điền ${k} chữ cái còn thiếu <span class="hint">(${esc(w.vi)})</span>`, disp, acc: [ans, norm(w.en)], show: w.en, say: w.en, hear: false, ex: "" };
    },
    spell(w) {
      return { type: "text", tag: "Nghe – viết", p: `Nghe và viết lại từ <span class="hint">(${esc(w.vi)})</span>`, disp: "", acc: [norm(w.en)], show: w.en, say: w.en, hear: true, ex: "" };
    },
    gram(g, G, r) {
      return mkMC({ tag: "Ngữ pháp", p: blankify(esc(g.q)), ok: esc(g.ok), wrong: g.wrong.map(esc), ex: g.ex, r });
    },
    order(s, G, r) {
      const m = s.s.match(/[.?!]$/);
      const end = m ? m[0] : "";
      const body = end ? s.s.slice(0, -1) : s.s;
      const toks = body.split(/\s+/);
      if (toks.length < 4) return null;
      let idx = toks.map((_, i) => i);
      for (let t = 0; t < 12; t++) { idx = shuffle(idx, r); if (idx.some((v, i) => v !== i) && toks.join(" ") !== idx.map((i) => toks[i]).join(" ")) break; }
      return { type: "order", tag: "Sắp xếp câu", p: "Sắp xếp các từ sau thành câu đúng", toks: idx.map((i) => toks[i]), end, ans: body, say: s.s, hear: false, ex: "" };
    },
    lsent(s, G, r) {
      const seen = new Set([norm(s.s)]);
      const same = shuffle(G.sents.filter((x) => x.u === s.u), r);
      const near = shuffle(G.sents.filter((x) => x.u !== s.u && Math.abs(x.u - s.u) <= 3), r);
      const wrong = [];
      for (const x of same.concat(near)) { if (!seen.has(norm(x.s))) { seen.add(norm(x.s)); wrong.push(esc(x.s)); } if (wrong.length === 3) break; }
      return mkMC({ tag: "Nghe", p: "Nghe và chọn câu em nghe được", ok: esc(s.s), wrong, say: s.s, hear: true, r });
    },
    phon(item) {
      const opts = item.raw.split(/\s+/).map((w) => esc(w).replace(/\[(.+?)\]/, "<u>$1</u>"));
      return { type: "mc", tag: "Phát âm", p: "Chọn từ có phần gạch chân được phát âm khác với các từ còn lại", opts, a: item.k, ex: "", say: item.raw.replace(/[[\]]/g, "").split(/\s+/).join(", "), hear: false };
    },
    stress(item) {
      const opts = item.raw.split(/\s+/).map(esc);
      return { type: "mc", tag: "Trọng âm", p: "Chọn từ có trọng âm chính khác với các từ còn lại", opts, a: item.k, ex: "", say: item.raw.split(/\s+/).join(", "), hear: false };
    },
    err(item) {
      const parts = []; let n = 0;
      const p = esc(item.raw).replace(/\{(.+?)\}/g, (m, x) => { parts.push(x); return `<u>${x}</u><sub>${LETTERS[n++]}</sub>`; });
      return { type: "mc", tag: "Tìm lỗi sai", p: `Tìm phần gạch chân cần sửa: <br><span class="en" style="font-weight:600">${p}</span>`, opts: parts, a: item.k, ex: "", say: "", hear: false };
    },
    rew(g, G, r) {
      return mkMC({ tag: "Câu đồng nghĩa", p: `Chọn câu gần nghĩa nhất với câu: <b>“${esc(g.q)}”</b>`, ok: esc(g.ok), wrong: g.wrong.map(esc), ex: g.ex, r });
    },
    reading(R, r) {
      const passage = { title: R.title, text: R.text, kind: R.kind };
      return R.qs.map((x) => {
        if (x.tf !== undefined) return { type: "mc", tag: "Đọc hiểu", p: `Đúng hay sai: <b>${esc(x.q)}</b>`, opts: ["True (Đúng)", "False (Sai)"], a: x.tf ? 0 : 1, ex: "", say: "", hear: false, passage };
        return mkMC({ tag: R.kind === "cloze" ? "Đọc điền từ" : "Đọc hiểu", p: R.kind === "cloze" ? `Chọn từ thích hợp cho chỗ trống <b>${esc(x.q)}</b>` : blankify(esc(x.q)), ok: esc(x.ok), wrong: x.wrong.map(esc), passage, r });
      });
    }
  };
  const wordsOnly = (w) => w.en.replace(/[^a-z]/gi, "");
  const KIND = {
    meaning: ["words", Q.meaning], viEn: ["words", Q.viEn], listen: ["words", Q.listen],
    letter: ["words", (w, G, r) => Q.letter(w, G, r, 1), (w) => wordsOnly(w).length >= 3],
    letter2: ["words", (w, G, r) => Q.letter(w, G, r, 2), (w) => wordsOnly(w).length >= 5],
    spell: ["words", Q.spell, (w) => w.en.length <= 14 && !/[A-Z]/.test(w.en.slice(1))],
    gram: ["gram", Q.gram], phon: ["phon", Q.phon], stress: ["stress", Q.stress], err: ["errs", Q.err], rew: ["rew", Q.rew],
    order: ["sents", Q.order, (s) => { const n = s.s.split(/\s+/).length; return n >= 4 && n <= 11; }],
    lsent: ["sents", Q.lsent]
  };
  function drawer(P, r) {
    const decks = {}; ["words", "sents", "gram", "phon", "stress", "errs", "rew"].forEach((k) => { decks[k] = shuffle(P[k] || [], r); });
    const used = new Set();
    const keyOf = (deck, x) => deck + ":" + (x.en ? x.en.toLowerCase() : x.s || x.q || x.raw);
    return function draw(deck, test) {
      for (const x of decks[deck]) { const k = keyOf(deck, x); if (used.has(k) || (test && !test(x))) continue; used.add(k); return x; }
      return null;
    };
  }
  function fromRecipe(recipe, draw, G, r) {
    const out = [];
    recipe.forEach(([kind, n]) => {
      const [deck, mk, test] = KIND[kind];
      for (let i = 0; i < n; i++) { const x = draw(deck, test); if (!x) break; const q = mk(x, G, r); if (q) out.push(q); }
    });
    return out;
  }
  const RECIPE = {
    practice: {
      4: [["meaning", 2], ["viEn", 2], ["listen", 2], ["letter", 2], ["gram", 3], ["lsent", 1], ["order", 2]],
      7: [["meaning", 2], ["viEn", 1], ["listen", 1], ["letter2", 1], ["spell", 1], ["gram", 4], ["phon", 1], ["stress", 1], ["err", 1], ["rew", 1], ["order", 1]]
    },
    ioe: {
      4: [["meaning", 3], ["viEn", 3], ["listen", 5], ["letter", 6], ["gram", 8], ["order", 5]],
      7: [["meaning", 2], ["viEn", 2], ["listen", 3], ["letter2", 5], ["gram", 8], ["phon", 3], ["stress", 2], ["err", 2], ["order", 3]]
    },
    paper: {
      4: [
        { h: "Listen and choose", vi: "Nghe và chọn đáp án đúng.", r: [["listen", 3], ["lsent", 2]] },
        { h: "Vocabulary", vi: "Chọn nghĩa đúng hoặc từ đúng.", r: [["meaning", 3], ["viEn", 2]] },
        { h: "Fill in the missing letter", vi: "Điền chữ cái còn thiếu.", r: [["letter", 5]] },
        { h: "Choose the correct answer", vi: "Chọn đáp án đúng A, B, C hoặc D.", r: [["gram", 7]] },
        { h: "Read and answer", vi: "Đọc đoạn văn rồi trả lời câu hỏi.", reading: "read" },
        { h: "Reorder the words", vi: "Sắp xếp các từ thành câu đúng.", r: [["order", 4]] }
      ],
      7: [
        { h: "Listening", vi: "Nghe và chọn câu em nghe được.", r: [["lsent", 4]] },
        { h: "Pronunciation", vi: "Chọn từ có phần gạch chân phát âm khác.", r: [["phon", 3]] },
        { h: "Stress", vi: "Chọn từ có trọng âm chính khác.", r: [["stress", 2]] },
        { h: "Vocabulary and grammar", vi: "Chọn đáp án đúng A, B, C hoặc D.", r: [["gram", 10]] },
        { h: "Error identification", vi: "Tìm phần gạch chân cần sửa.", r: [["err", 3]] },
        { h: "Cloze reading", vi: "Đọc đoạn văn và chọn từ điền vào chỗ trống.", reading: "cloze" },
        { h: "Reading comprehension", vi: "Đọc đoạn văn rồi trả lời câu hỏi.", reading: "read" },
        { h: "Sentence transformation", vi: "Chọn câu gần nghĩa nhất với câu đã cho.", r: [["rew", 3]] },
        { h: "Sentence building", vi: "Sắp xếp các từ thành câu đúng.", r: [["order", 3]] }
      ]
    }
  };
  const PAPER_MIN = { 4: 35, 7: 45 };
  const IOE_MIN = 20;
  const DE_PER_TERM = 6;

  function buildPractice(G, n) {
    const P = poolOf(G, n, n), r = Math.random;
    return fromRecipe(RECIPE.practice[G.grade], drawer(P, r), G, r);
  }
  function buildIOE(G, lo, hi) {
    const P = poolOf(G, lo, hi), r = Math.random;
    return fromRecipe(RECIPE.ioe[G.grade], drawer(P, r), G, r);
  }
  function buildPaper(G, term, k) {
    const r = seeded(hashStr(`${G.key}-${term.key}-${k}`));
    const P = poolOf(G, term.units[0], term.units[1]);
    const draw = drawer(P, r);
    const secs = [], qs = [];
    RECIPE.paper[G.grade].forEach((S) => {
      let list;
      if (S.reading) {
        const rs = P.readings.filter((R) => R.kind === S.reading);
        if (!rs.length) return;
        list = Q.reading(rs[(k - 1 + term.units[0]) % rs.length], r); // xoay vòng để các đề dùng đều các bài đọc
      } else list = fromRecipe(S.r, draw, G, r);
      if (!list.length) return;
      secs.push({ h: S.h, vi: S.vi, start: qs.length, n: list.length });
      list.forEach((q) => qs.push(q));
    });
    return { qs, secs };
  }

  /* ---------- Chấm ---------- */
  function isRight(q, a) {
    if (a == null) return false;
    if (q.type === "mc") return a === q.a;
    if (q.type === "text") { const v = norm(a).replace(/\s+/g, ""); return q.acc.some((x) => x.replace(/\s+/g, "") === v); }
    if (q.type === "order") return a.length === q.toks.length && norm(a.map((i) => q.toks[i]).join(" ")) === norm(q.ans);
    return false;
  }
  const answered = (q, a) => (q.type === "order" ? !!(a && a.length === q.toks.length) : q.type === "text" ? !!(a && String(a).trim()) : a != null);
  function rightText(q) {
    if (q.type === "mc") return `${LETTERS[q.a]}. ${q.opts[q.a]}`;
    if (q.type === "text") return esc(q.show);
    return esc(q.ans + q.end);
  }

  /* ---------- Lưu kết quả ---------- */
  const hist = () => store.get("hist", []);
  const best = () => store.get("best", {});
  const known = (gk) => store.get("known:" + gk, {});
  const wrongBook = () => store.get("wrong", []);
  const qKey = (q) => q.type + "|" + q.p + "|" + (q.say || "") + "|" + (q.opts || q.toks || []).join("~");
  function starsOf(pct) { return pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0; }

  /* ---------- Trạng thái ---------- */
  let RUN = null;
  let timerId = null;
  const UI = { unitKey: "", tab: "learn", fc: 0, flip: false, fcOrder: null, fcOnlyNew: false, fcFront: "en", ioeScope: 2, confirm: false, resetAsk: false };

  function startRun(o) {
    RUN = Object.assign({ ans: new Array(o.qs.length).fill(null), checked: new Array(o.qs.length).fill(false), idx: 0, t0: Date.now(), done: false, result: null }, o);
    UI.confirm = false;
    if (location.hash === "#lam-bai") route(); else location.hash = "lam-bai";
  }
  function startPractice(G, n) {
    const U = G.units.find((u) => u.n === n);
    startRun({ kind: "practice", G, title: `Luyện tập Unit ${n}: ${U.t}`, sub: G.name, qs: buildPractice(G, n), back: `#${G.key}-u${n}`, bestKey: `p:${G.key}:${n}`, remake: () => startPractice(G, n) });
  }
  function startIOE(G, scope) {
    const [lo, hi] = scope === 0 ? G.halves[0] : scope === 1 ? G.halves[1] : [1, G.units.length];
    const label = ["Học kì 1", "Học kì 2", "Cả năm"][scope];
    startRun({ kind: "ioe", G, title: `Thi thử dạng IOE · ${label}`, sub: `${G.name} · Unit ${lo}–${hi}`, qs: buildIOE(G, lo, hi), limit: IOE_MIN * 60, back: `#${G.key}-ioe`, bestKey: `i:${G.key}:${scope}`, scope, remake: () => startIOE(G, scope) });
  }
  function startPaper(G, termKey, k) {
    const term = G.terms.find((t) => t.key === termKey);
    const { qs, secs } = buildPaper(G, term, k);
    startRun({ kind: "paper", G, title: `Đề ${k} · ${term.name}`, sub: `${G.name} · Unit ${term.units[0]}–${term.units[1]}`, qs, secs, limit: PAPER_MIN[G.grade] * 60, back: `#${G.key}-de`, bestKey: `e:${G.key}:${termKey}:${k}`, remake: () => startPaper(G, termKey, k) });
  }
  function startRedo(gk) {
    const list = wrongBook().filter((q) => !gk || q.g === gk).slice(0, 20);
    if (!list.length) { toast("Sổ câu sai đang trống."); return; }
    const G = GRADES[gk || list[0].g] || GRADES[curGradeKey()];
    startRun({ kind: "redo", G, title: "Ôn lại câu sai", sub: gk ? GRADES[gk].name : "Cả hai lớp", qs: list.map((q) => Object.assign({}, q)), back: "#ket-qua", remake: () => startRedo(gk) });
  }

  function finish() {
    if (!RUN || RUN.done) return;
    stopTimer();
    const r = RUN, n = r.qs.length;
    const rightArr = r.qs.map((q, i) => isRight(q, r.ans[i]));
    const c = rightArr.filter(Boolean).length;
    const dur = Math.round((Date.now() - r.t0) / 1000);
    let score, max;
    if (r.kind === "ioe") { score = c * 10; max = n * 10; }
    else if (r.kind === "paper") { score = n ? Math.round((c / n) * 100) / 10 : 0; max = 10; }
    else { score = c; max = n; }
    const pct = n ? Math.round((c / n) * 100) : 0;
    r.done = true; r.result = { c, n, score, max, pct, dur, rightArr };
    // lịch sử
    const h = hist();
    h.unshift({ g: r.G.key, kind: r.kind, title: r.title, score, max, c, n, pct, t: Date.now(), dur, scope: r.scope });
    store.set("hist", h.slice(0, 150));
    // điểm cao nhất
    if (r.bestKey) { const b = best(); if (b[r.bestKey] == null || pct > b[r.bestKey]) { b[r.bestKey] = pct; store.set("best", b); } }
    // sổ câu sai
    let wb = wrongBook();
    if (r.kind === "redo") {
      const fixed = new Set(r.qs.filter((q, i) => rightArr[i]).map(qKey));
      wb = wb.filter((q) => !fixed.has(qKey(q)));
    } else {
      const have = new Set(wb.map(qKey));
      r.qs.forEach((q, i) => { if (!rightArr[i] && !have.has(qKey(q))) { wb.unshift(Object.assign({}, q, { g: r.G.key })); have.add(qKey(q)); } });
    }
    store.set("wrong", wb.slice(0, 120));
    renderRun();
    window.scrollTo(0, 0);
  }

  /* ---------- Đồng hồ ---------- */
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function startTimer() {
    stopTimer();
    if (!RUN || RUN.done) return;
    const tick = () => {
      if (!RUN || RUN.done) { stopTimer(); return; }
      const el = $("#timer-v");
      const used = (Date.now() - RUN.t0) / 1000;
      if (RUN.limit) {
        const left = RUN.limit - used;
        if (el) { el.textContent = fmtTime(left); el.parentElement.classList.toggle("low", left <= 60); }
        if (left <= 0) { toast("Hết giờ! Bài đã được nộp."); finish(); }
      } else if (el) el.textContent = fmtTime(used);
    };
    tick(); timerId = setInterval(tick, 1000);
  }

  /* ---------- Thanh điều hướng ---------- */
  function renderNav(active) {
    const gk = curGradeKey();
    const links = [
      [`#${gk}`, "Gói học", "grade"],
      [`#${gk}-ioe`, "Thi thử IOE", "ioe"],
      [`#${gk}-de`, "Đề kiểm tra", "de"],
      ["#ket-qua", "Kết quả", "kq"]
    ];
    $("#nav").innerHTML = links.map(([h, t, k]) => `<a href="${h}" class="${k === active ? "on" : ""}">${t}</a>`).join("");
    $("#grade-switch").innerHTML = `<span>Khối lớp</span>` + GRADE_KEYS.map((k) => `<a href="#${k}" class="${k === gk ? "on" : ""}" data-grade="${k}">${GRADES[k].grade}</a>`).join("");
  }

  /* ---------- Trang chủ ---------- */
  function renderHome(view) {
    const b = best(), h = hist();
    const unitsDone = Object.keys(b).filter((k) => k.startsWith("p:")).length;
    const ioeBest = Math.max(0, ...h.filter((x) => x.kind === "ioe").map((x) => x.score));
    const papers = h.filter((x) => x.kind === "paper").length;
    const knownN = GRADE_KEYS.reduce((s, k) => s + Object.keys(known(k)).length, 0);
    view.innerHTML = `
    <section class="hero"><div class="wrap hero-in">
      <div>
        <p class="eyebrow">Theo sách Global Success</p>
        <h1>Học và thi thử Tiếng Anh <span>lớp 4</span> và <span>lớp 7</span></h1>
        <p class="lead">Học từ vựng có phát âm, luyện tập theo từng Unit, luyện nói với micro, thi thử dạng IOE có tính giờ và làm đề kiểm tra giữa kì, cuối kì. Tất cả miễn phí.</p>
      </div>
      <div class="grade-pick">
        ${GRADE_KEYS.map((k) => { const G = GRADES[k]; return `<a class="grade-tile" href="#${k}" data-grade="${k}"><span class="gt-num">${G.grade}</span><span class="gt-name">${G.name}</span><span class="gt-meta">${G.units.length} Unit · ${G.words.length} từ vựng · ${G.terms.length * DE_PER_TERM} đề kiểm tra</span><span class="gt-go">Vào học →</span></a>`; }).join("")}
      </div>
    </div></section>
    <section class="wrap">
      <div class="stats">
        <div class="stat"><b>${unitsDone}</b><span>Unit đã luyện tập</span></div>
        <div class="stat"><b>${knownN}</b><span>từ đã đánh dấu thuộc</span></div>
        <div class="stat"><b>${ioeBest || "–"}</b><span>điểm thi thử IOE cao nhất</span></div>
        <div class="stat"><b>${papers}</b><span>lượt làm đề kiểm tra</span></div>
      </div>
      <ol class="steps-how">
        <li><div><b>Chọn khối lớp</b><span>Lớp 4 có 20 Unit, lớp 7 có 12 Unit, đúng thứ tự trong sách.</span></div></li>
        <li><div><b>Chọn gói học</b><span>Học theo Unit, Thi thử dạng IOE hoặc Đề kiểm tra giữa kì, cuối kì.</span></div></li>
        <li><div><b>Làm bài và xem lại</b><span>Máy chấm ngay, giải thích câu sai và lưu vào sổ để em ôn lại.</span></div></li>
      </ol>
    </section>`;
  }

  /* ---------- Trang khối lớp (chọn gói) ---------- */
  function perks(list) { return `<ul class="perks">${list.map((t) => `<li>${I.star}<span>${t}</span></li>`).join("")}</ul>`; }
  function renderGrade(view, G) {
    const b = best(), kn = known(G.key);
    const unitCard = (u) => {
      const pct = b[`p:${G.key}:${u.n}`];
      const k = u.words.filter((w) => kn[w.en]).length;
      return `<a class="unit" href="#${G.key}-u${u.n}"><span class="u-n">Unit ${u.n}</span><b>${esc(u.t)}</b><span class="u-vi">${esc(u.vi)}</span>
        <span class="u-foot"><span>${k}/${u.words.length} từ đã thuộc</span>${starsHTML(pct == null ? 0 : starsOf(pct))}</span></a>`;
    };
    view.innerHTML = `<div class="wrap">
      <ol class="stepper" aria-label="Các bước">
        <li class="done"><b>1</b><span>Chọn lớp</span></li><li class="dash" aria-hidden="true"></li>
        <li class="on"><b>2</b><span>Chọn gói học</span></li><li class="dash" aria-hidden="true"></li>
        <li><b>3</b><span>Làm bài</span></li>
      </ol>
      <div class="note-row">
        <div class="note"><b>Lưu ý:</b><ul>
          <li>Mỗi học sinh có thể học cả lớp 4 và lớp 7. Tiến độ và điểm được lưu riêng từng lớp trên trình duyệt của máy này.</li>
          <li>Các gói đều miễn phí, không cần tài khoản.</li></ul>
          <a href="#ket-qua">Xem kết quả và sổ câu sai</a></div>
        <a class="btn btn-line" href="#${G.key}-de">Làm đề kiểm tra</a>
      </div>
      <div class="pk-head"><h1>Gói học Tiếng Anh ${G.grade}</h1>
        <p>Nội dung bám theo chủ đề từng Unit của sách ${esc(G.book)}, giúp em nắm chắc từ vựng, mẫu câu và ngữ pháp.</p>
        <p class="valid">Dùng được trong cả năm học 2026–2027: <b>Học kì 1 (Unit ${G.halves[0][0]}–${G.halves[0][1]})</b> và <b>Học kì 2 (Unit ${G.halves[1][0]}–${G.halves[1][1]})</b>.</p></div>
      <div class="sel-grade"><label for="grade-select">Chọn theo khối lớp:</label>
        <select id="grade-select">${GRADE_KEYS.map((k) => `<option value="${k}" ${k === G.key ? "selected" : ""}>${GRADES[k].name}</option>`).join("")}</select></div>
      <div class="packs">
        <article class="pack"><span class="badge">Đề xuất</span>${ILL.book}
          <h3>Gói học tập theo Unit</h3><p class="desc">Dành cho em cần hệ thống kiến thức và luyện tập theo từng bài trong sách.</p>
          <div class="perks-h">4 quyền lợi</div>
          ${perks(["Từ vựng có phát âm, thẻ ghi nhớ và đánh dấu từ đã thuộc", "Bài luyện tập có chấm điểm và giải thích ngay từng câu", "Luyện nói: máy nghe em đọc và chấm độ chính xác", "Sao thành tích cho từng Unit"])}
          <div class="price">0 <small>VNĐ</small></div><div class="price-note">Miễn phí trọn năm học</div>
          <div class="pack-btns"><a class="btn btn-red" href="#${G.key}-u1">Học ngay</a><a class="btn btn-line" href="#units" data-scroll="units">Xem các Unit</a></div></article>
        <article class="pack">${ILL.timer}
          <h3>Gói thi thử dạng IOE</h3><p class="desc">Dành cho em muốn làm quen dạng đề thi và rèn phản xạ nhanh.</p>
          <div class="perks-h">3 quyền lợi</div>
          ${perks(["Thi thử không giới hạn: 30 câu, 20 phút, mỗi lần một đề mới", "Chấm điểm thang 300 và bảng xếp hạng điểm của em", "Xem lại đáp án các câu trả lời sai"])}
          <div class="price">0 <small>VNĐ</small></div><div class="price-note">Miễn phí, thi bao nhiêu lần cũng được</div>
          <div class="pack-btns"><a class="btn btn-red" href="#${G.key}-ioe">Thi ngay</a><a class="btn btn-line" href="#ket-qua">Bảng điểm</a></div></article>
        <article class="pack">${ILL.paper}
          <h3>Gói đề kiểm tra</h3><p class="desc">Dành cho em chuẩn bị bài kiểm tra giữa kì và cuối kì trên lớp.</p>
          <div class="perks-h">3 quyền lợi</div>
          ${perks([`${G.terms.length} kì kiểm tra × ${DE_PER_TERM} đề (${G.terms.length * DE_PER_TERM} đề), chấm thang điểm 10`, `Đủ phần nghe, ${G.grade === 7 ? "phát âm, " : ""}từ vựng, ngữ pháp, đọc hiểu và viết câu`, "Câu sai được lưu vào sổ để ôn lại"])}
          <div class="price">0 <small>VNĐ</small></div><div class="price-note">Miễn phí, có đáp án và giải thích</div>
          <div class="pack-btns"><a class="btn btn-red" href="#${G.key}-de">Làm đề</a><button type="button" class="btn btn-line" data-redo="${G.key}">Ôn câu sai</button></div></article>
      </div>
      <div class="section-h" id="units"><h2>Học theo Unit</h2><span class="muted">${G.units.length} Unit · ${G.words.length} từ vựng</span></div>
      <div class="term-h">Học kì 1</div>
      <div class="units">${G.units.filter((u) => u.n <= G.halves[0][1]).map(unitCard).join("")}</div>
      <div class="term-h">Học kì 2</div>
      <div class="units">${G.units.filter((u) => u.n >= G.halves[1][0]).map(unitCard).join("")}</div>
    </div>`;
  }

  /* ---------- Trang Unit ---------- */
  function renderUnit(view, G, n) {
    const U = G.units.find((u) => u.n === n);
    if (!U) { location.hash = G.key; return; }
    const key = G.key + ":" + n;
    if (UI.unitKey !== key) { UI.unitKey = key; UI.tab = "learn"; UI.fc = 0; UI.flip = false; UI.fcOrder = null; UI.fcOnlyNew = false; }
    const kn = known(G.key);
    const knownN = U.words.filter((x) => kn[x.en]).length;
    const prev = G.units.find((u) => u.n === n - 1), next = G.units.find((u) => u.n === n + 1);
    const tabs = [["learn", "Học từ"], ["flash", "Flashcard"], ["practice", "Luyện tập"], ["speak", "Luyện nói"]];
    let body = "";
    if (UI.tab === "learn") {
      body = `<div class="learn-head">
          <p class="muted">Bấm loa để nghe từng từ, hoặc bấm <b>Nghe cả bài</b> để máy đọc lần lượt. Thuộc từ nào thì bấm dấu tích ở góc thẻ.</p>
          <div class="learn-tools"><span class="pill">${knownN}/${U.words.length} từ đã thuộc</span>
            <button type="button" class="btn btn-blue btn-sm" data-say-all>${I.spk}<span>Nghe cả bài</span></button></div>
        </div>
        <div class="wcards">${U.words.map((x, i) => `<div class="wcard ${kn[x.en] ? "is-known" : ""}" data-wi="${i}">
            <div class="wc-top">${spkBtn(x.en)}<button type="button" class="chk ${kn[x.en] ? "on" : ""}" data-known="${esc(x.en)}" aria-label="Đánh dấu đã thuộc ${esc(x.en)}" aria-pressed="${kn[x.en] ? "true" : "false"}">${I.check}</button></div>
            <div class="wc-en">${esc(x.en)}</div><div class="wc-vi">${esc(x.vi)}</div></div>`).join("")}</div>
        <div class="panel" style="margin-top:20px"><h3>Mẫu câu</h3><ul class="sents">${U.sents.map((s) => `<li>${spkBtn(s.s)}<span>${esc(s.s)}</span></li>`).join("")}</ul></div>
        <div class="next-step"><span>Học xong rồi? Ôn lại cho nhớ lâu:</span>
          <button type="button" class="btn btn-red btn-sm" data-tab="flash">Ôn bằng Flashcard</button>
          <button type="button" class="btn btn-line btn-sm" data-tab="practice">Làm bài luyện tập</button></div>`;
    } else if (UI.tab === "flash") {
      const deck = fcDeck(U, kn);
      if (!deck.length) {
        body = `<div class="empty"><b>Em đã thuộc hết ${U.words.length} từ của Unit này!</b><br>Bấm bên dưới để ôn lại tất cả các thẻ.<br><br>
          <button type="button" class="btn btn-red btn-sm" data-fc-only>Ôn lại tất cả</button></div>`;
      } else {
        if (UI.fc >= deck.length) UI.fc = 0;
        const w = U.words[deck[UI.fc]];
        const viFront = UI.fcFront === "vi";
        const front = viFront ? `<span class="fc-vi fc-vi-front">${esc(w.vi)}</span>` : `<span class="fc-en">${esc(w.en)}</span>`;
        const back = viFront ? `<span class="fc-en fc-en-back">${esc(w.en)}</span><span class="muted">${esc(w.vi)}</span>` : `<span class="fc-vi">${esc(w.vi)}</span><span class="muted">${esc(w.en)}</span>`;
        body = `<div class="flash">
          <div class="fc-opts">
            <button type="button" class="chip-opt ${UI.fcOrder ? "on" : ""}" data-fc-shuffle aria-pressed="${!!UI.fcOrder}">Trộn thẻ</button>
            <button type="button" class="chip-opt ${UI.fcOnlyNew ? "on" : ""}" data-fc-only aria-pressed="${!!UI.fcOnlyNew}">Chỉ ôn từ chưa thuộc</button>
            <button type="button" class="chip-opt" data-fc-front>Mặt trước: ${viFront ? "Tiếng Việt" : "Tiếng Anh"}</button>
          </div>
          <div class="bar" aria-hidden="true"><i style="width:${Math.round(((UI.fc + 1) / deck.length) * 100)}%"></i></div>
          <button type="button" class="fc ${UI.flip ? "flip" : ""}" data-fc-flip data-word="${esc(w.en)}" aria-label="Lật thẻ"><span class="fc-inner">
            <span class="fc-face fc-front">${front}<span class="fc-tip">Chạm để lật thẻ</span></span>
            <span class="fc-face fc-back">${back}${kn[w.en] ? '<span class="pill ok">✓ Đã thuộc</span>' : ""}</span>
          </span></button>
          <div class="fc-ctrl">
            <button type="button" class="btn btn-ghost btn-sm" data-fc="-1" aria-label="Thẻ trước">←</button>
            ${spkBtn(w.en)}
            <span class="count">Thẻ ${UI.fc + 1}/${deck.length}</span>
            <button type="button" class="btn btn-ghost btn-sm" data-fc="1" aria-label="Thẻ sau">→</button>
          </div>
          <div class="fc-mark">
            <button type="button" class="btn btn-line" data-fc-mark="again">Chưa thuộc</button>
            <button type="button" class="btn btn-red" data-fc-mark="known">Đã thuộc ✓</button>
          </div>
          <p class="muted fc-help">Đã thuộc ${knownN}/${U.words.length} từ. Trên máy tính: phím cách để lật thẻ, mũi tên trái/phải để chuyển thẻ.</p>
        </div>`;
      }
    } else if (UI.tab === "practice") {
      const pct = best()[`p:${G.key}:${n}`];
      const types = G.grade === 7 ? "nghĩa của từ, nghe, điền chữ, nghe – viết, ngữ pháp, phát âm, trọng âm, tìm lỗi sai, câu đồng nghĩa, sắp xếp câu" : "nghĩa của từ, nghe và chọn, điền chữ cái còn thiếu, ngữ pháp, nghe câu, sắp xếp câu";
      body = `<div class="panel practice-card">${ILL.book}<div>
        <h3>Bài luyện tập Unit ${n}</h3>
        <ul><li>Khoảng ${G.grade === 7 ? 15 : 14} câu, mỗi lần làm là một bộ câu mới.</li><li>Dạng câu: ${types}.</li><li>Trả lời xong máy chấm ngay, câu sai có đáp án và giải thích.</li></ul>
        <p>${pct == null ? "Em chưa làm bài này." : `Kết quả tốt nhất: <b>${pct}%</b> ${starsHTML(starsOf(pct))}`}</p>
        <button type="button" class="btn btn-red" data-practice="${n}">Bắt đầu luyện tập</button></div></div>`;
    } else {
      body = `<p class="muted">Bấm loa để nghe mẫu, sau đó bấm <b>Nói</b> và đọc to. Máy sẽ so sánh với câu mẫu và tô xanh các từ em đọc đúng.${SR ? "" : " <b>Trình duyệt này chưa nhận giọng nói, em vẫn có thể nghe và đọc theo.</b>"}</p>
        <h3 style="margin:16px 0 10px">Mẫu câu</h3>
        <div class="sp-list">${U.sents.map((s) => speakRow(s.s)).join("")}</div>
        <h3 style="margin:22px 0 10px">Từ vựng</h3>
        <div class="sp-list">${U.words.map((w) => speakRow(w.en, w.vi)).join("")}</div>`;
    }
    view.innerHTML = `<div class="wrap">
      <div class="crumb"><a href="#${G.key}">${G.name}</a> › Unit ${n}</div>
      <div class="unit-head"><div><h1>Unit ${n}: ${esc(U.t)}</h1><p>${esc(U.vi)} · ${U.words.length} từ vựng · ${U.sents.length} mẫu câu</p></div>
        <div class="pack-btns">${prev ? `<a class="btn btn-ghost btn-sm" href="#${G.key}-u${prev.n}">← Unit ${prev.n}</a>` : ""}${next ? `<a class="btn btn-ghost btn-sm" href="#${G.key}-u${next.n}">Unit ${next.n} →</a>` : ""}</div></div>
      <div class="tabs" role="tablist">${tabs.map(([k, t]) => `<button type="button" role="tab" class="tab ${UI.tab === k ? "on" : ""}" aria-selected="${UI.tab === k}" data-tab="${k}">${t}</button>`).join("")}</div>
      ${body}
    </div>`;
  }
  function fcDeck(U, kn) {
    let idx = UI.fcOrder && UI.fcOrder.length === U.words.length ? UI.fcOrder : U.words.map((_, i) => i);
    if (UI.fcOnlyNew) idx = idx.filter((i) => !kn[U.words[i].en]);
    return idx;
  }
  const curUnit = () => { const [gk, n] = UI.unitKey.split(":"); const G = GRADES[gk]; return { G, U: G && G.units.find((u) => u.n === +n) }; };
  function fcMove(step) {
    const { G, U } = curUnit(); if (!U) return;
    const deck = fcDeck(U, known(G.key)); if (!deck.length) return;
    UI.fc = (UI.fc + step + deck.length) % deck.length; UI.flip = false; route(true);
  }
  function speakRow(text, vi) {
    return `<div class="sp-row" data-target="${esc(text)}"><div class="sp-text">${esc(text)}${vi ? ` <span class="muted" style="font-weight:400">· ${esc(vi)}</span>` : ""}</div>
      <div class="sp-btns">${spkBtn(text)}<button type="button" class="mic" data-mic>${I.mic}<span>Nói</span></button></div><div class="sp-res" aria-live="polite"></div></div>`;
  }

  /* ---------- Trang thi thử IOE ---------- */
  function renderIOE(view, G) {
    const scope = UI.ioeScope;
    const labels = ["Học kì 1", "Học kì 2", "Cả năm"];
    const ranges = [G.halves[0], G.halves[1], [1, G.units.length]];
    const mine = hist().filter((x) => x.kind === "ioe" && x.g === G.key && x.scope === scope).sort((a, b) => b.score - a.score || a.dur - b.dur).slice(0, 10);
    view.innerHTML = `<div class="wrap">
      <ol class="stepper"><li class="done"><b>1</b><span>Chọn lớp</span></li><li class="dash" aria-hidden="true"></li><li class="done"><b>2</b><span>Gói thi thử IOE</span></li><li class="dash" aria-hidden="true"></li><li class="on"><b>3</b><span>Làm bài</span></li></ol>
      <div class="practice-card">${ILL.timer}<div><h1>Thi thử dạng IOE · ${G.name}</h1>
        <p class="muted">Đề trộn ngẫu nhiên từ ngân hàng câu hỏi theo Unit đã học. Làm giống vòng thi tự luyện: không biết đúng sai cho tới khi nộp bài.</p></div></div>
      <div class="rules"><div><b>30</b><span>câu hỏi</span></div><div><b>${IOE_MIN}'</b><span>thời gian làm bài</span></div><div><b>10</b><span>điểm mỗi câu đúng</span></div><div><b>300</b><span>điểm tối đa</span></div></div>
      <h3>Chọn phạm vi kiến thức</h3>
      <div class="chips" role="radiogroup">${labels.map((l, i) => `<button type="button" class="chip-opt ${i === scope ? "on" : ""}" role="radio" aria-checked="${i === scope}" data-scope="${i}">${l} · Unit ${ranges[i][0]}–${ranges[i][1]}</button>`).join("")}</div>
      <button type="button" class="btn btn-red" data-ioe>Bắt đầu thi</button>
      <div class="section-h"><h2>Bảng xếp hạng của em</h2><span class="muted">${labels[scope]} · 10 lần điểm cao nhất</span></div>
      ${mine.length ? `<div class="table-wrap"><table><thead><tr><th>Hạng</th><th>Điểm</th><th>Số câu đúng</th><th>Thời gian</th><th>Ngày thi</th></tr></thead><tbody>
        ${mine.map((x, i) => `<tr><td>${i + 1}</td><td><b>${x.score}</b>/${x.max}</td><td>${x.c}/${x.n}</td><td>${fmtTime(x.dur)}</td><td>${fmtDate(x.t)}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty">Chưa có lượt thi nào ở phạm vi này. Bấm <b>Bắt đầu thi</b> để có điểm đầu tiên.</div>`}
    </div>`;
  }

  /* ---------- Trang đề kiểm tra ---------- */
  function renderExams(view, G) {
    const b = best();
    view.innerHTML = `<div class="wrap">
      <ol class="stepper"><li class="done"><b>1</b><span>Chọn lớp</span></li><li class="dash" aria-hidden="true"></li><li class="done"><b>2</b><span>Gói đề kiểm tra</span></li><li class="dash" aria-hidden="true"></li><li class="on"><b>3</b><span>Chọn đề</span></li></ol>
      <div class="practice-card">${ILL.paper}<div><h1>Đề kiểm tra · ${G.name}</h1>
        <p class="muted">Mỗi đề ${G.grade === 7 ? "khoảng 38 câu, 45 phút" : "khoảng 30 câu, 35 phút"}, trình bày theo từng phần như đề trên lớp. Mỗi kì có ${DE_PER_TERM} đề, tổng cộng ${G.terms.length * DE_PER_TERM} đề. Nộp bài xong em xem điểm thang 10, đáp án và giải thích. Mỗi đề luôn giữ nguyên câu hỏi để em làm lại và so sánh.</p></div></div>
      <div class="terms" style="margin-top:20px">
        ${G.terms.map((t) => `<div class="term"><h3>${t.name}</h3><p>Unit ${t.units[0]}–${t.units[1]}</p><div class="de-list">
          ${Array.from({ length: DE_PER_TERM }, (_, i) => i + 1).map((k) => { const p = b[`e:${G.key}:${t.key}:${k}`]; return `<button type="button" class="de" data-exam="${t.key}:${k}"><b>Đề ${k}</b><span class="${p == null ? "" : "has"}">${p == null ? "Chưa làm" : "Cao nhất " + (p / 10).toFixed(1).replace(".", ",") + " điểm"}</span></button>`; }).join("")}
        </div></div>`).join("")}
      </div>
    </div>`;
  }

  /* ---------- Trang kết quả ---------- */
  function renderResults(view) {
    const h = hist(), wb = wrongBook();
    const KN = { practice: "Luyện tập", ioe: "Thi thử IOE", paper: "Đề kiểm tra", redo: "Ôn câu sai" };
    const showScore = (x) => x.kind === "paper" ? `${String(x.score).replace(".", ",")}/10` : `${x.score}/${x.max}`;
    view.innerHTML = `<div class="wrap">
      <h1>Kết quả học tập</h1>
      <p class="muted">Dữ liệu được lưu trên trình duyệt của máy này. Đổi máy hoặc xoá dữ liệu duyệt web thì kết quả sẽ mất.</p>
      <div class="section-h"><h2>Sổ câu sai</h2><span class="muted">${wb.length} câu</span></div>
      ${wb.length ? `<div class="pack-btns" style="justify-content:flex-start">
          ${GRADE_KEYS.map((k) => { const c = wb.filter((q) => q.g === k).length; return c ? `<button type="button" class="btn btn-red" data-redo="${k}">Ôn ${Math.min(c, 20)} câu sai ${GRADES[k].name}</button>` : ""; }).join("")}
        </div><p class="muted">Mỗi lượt ôn tối đa 20 câu. Câu nào làm đúng sẽ được xoá khỏi sổ.</p>`
        : `<div class="empty">Sổ câu sai đang trống. Câu em làm sai trong bài luyện, thi thử và đề kiểm tra sẽ được lưu ở đây.</div>`}
      <div class="section-h"><h2>Lịch sử làm bài</h2><span class="muted">${h.length} lượt</span></div>
      ${h.length ? `<div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Lớp</th><th>Loại</th><th>Bài</th><th>Điểm</th><th>Đúng</th><th>Thời gian</th></tr></thead><tbody>
        ${h.slice(0, 40).map((x) => `<tr><td>${fmtDate(x.t)}</td><td>${GRADES[x.g] ? GRADES[x.g].grade : ""}</td><td>${KN[x.kind] || ""}</td><td>${esc(x.title)}</td><td><b>${showScore(x)}</b></td><td>${x.c}/${x.n}</td><td>${fmtTime(x.dur)}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty">Chưa có lượt làm bài nào.</div>`}
      <div class="section-h"><h2>Cài đặt</h2></div>
      <div class="panel">
        <div class="kv"><label for="theme">Màu giao diện:</label>
          <select id="theme"><option value="light" ${themePref() === "light" ? "selected" : ""}>Nền sáng</option><option value="dark" ${themePref() === "dark" ? "selected" : ""}>Nền tối</option><option value="auto" ${themePref() === "auto" ? "selected" : ""}>Theo cài đặt của máy</option></select></div>
        <div class="kv"><label for="accent">Giọng đọc mẫu:</label>
          <select id="accent"><option value="en-GB" ${accent() === "en-GB" ? "selected" : ""}>Anh – Anh (en-GB)</option><option value="en-US" ${accent() === "en-US" ? "selected" : ""}>Anh – Mỹ (en-US)</option></select>
          ${spkBtn("Hello! Welcome to English class.")}</div>
        <div class="kv">${UI.resetAsk
          ? `<span>Xoá toàn bộ điểm, lịch sử, sổ câu sai và từ đã thuộc?</span><button type="button" class="btn btn-red btn-sm" data-reset="yes">Xoá hết</button><button type="button" class="btn btn-ghost btn-sm" data-reset="no">Giữ lại</button>`
          : `<button type="button" class="btn btn-ghost btn-sm" data-reset="ask">Xoá dữ liệu học tập</button>`}</div>
      </div>
    </div>`;
  }

  /* ---------- Hiển thị câu hỏi ---------- */
  function passageHTML(p, open) {
    const text = esc(p.text).replace(/\((\d)\) ?_{3,}/g, '<b class="cz">($1)</b> <span class="blank"></span>');
    return `<details class="passage" ${open ? "open" : ""}><summary>${p.kind === "cloze" ? "Đoạn văn điền từ" : "Bài đọc"}: ${esc(p.title)}</summary><p>${text}</p></details>`;
  }
  function qHTML(q, i, o) {
    const a = RUN.ans[i];
    const rev = o.reveal;
    const ok = rev ? isRight(q, a) : null;
    let body = "";
    if (q.type === "mc") {
      const long = q.opts.some((x) => String(x).replace(/<[^>]+>/g, "").length > 30);
      body = `<div class="opts ${long ? "col" : ""}">` + q.opts.map((x, k) => {
        let c = "opt";
        if (a === k) c += " sel";
        if (rev) { if (k === q.a) c += " right"; else if (a === k) c += " wrong"; }
        return `<button type="button" class="${c}" data-opt="${k}" ${rev ? "disabled" : ""}><span class="opt-k">${LETTERS[k]}</span><span class="opt-t">${x}</span></button>`;
      }).join("") + "</div>";
    } else if (q.type === "text") {
      body = (q.disp ? `<div class="fill-word" aria-label="Từ cần điền">${q.disp}</div>` : "") +
        `<input class="fill-in ${rev ? (ok ? "right" : "wrong") : ""}" data-text id="in-${i}" value="${esc(a || "")}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Câu trả lời" placeholder="${q.disp ? "Gõ chữ cái còn thiếu" : "Gõ từ em nghe được"}" ${rev ? "disabled" : ""}>`;
    } else if (q.type === "order") {
      const used = a || [];
      const built = used.map((k, pos) => `<button type="button" class="chip" data-chip="b:${pos}" ${rev ? "disabled" : ""}>${esc(q.toks[k])}</button>`).join("");
      const pool = q.toks.map((t, k) => (used.includes(k) ? "" : `<button type="button" class="chip" data-chip="p:${k}" ${rev ? "disabled" : ""}>${esc(t)}</button>`)).join("");
      body = `<div class="built ${rev ? (ok ? "right" : "wrong") : ""}">${built || '<span class="ph">Chạm vào từng từ bên dưới theo đúng thứ tự</span>'}${built ? `<span class="end">${esc(q.end)}</span>` : ""}</div><div class="pool">${pool}</div>`;
    }
    const showSay = q.say && (q.hear || rev);
    const bigListen = q.hear && q.tag === "Nghe" && !rev;
    let fb = "";
    if (rev) {
      const none = !answered(q, a);
      fb = `<div class="fb ${ok ? "ok" : "bad"}"><b>${ok ? "Chính xác!" : none ? "Em chưa trả lời." : "Chưa đúng."}</b>${ok ? "" : ` Đáp án đúng: <b>${rightText(q)}</b>`}${q.ex ? `<div class="ex">${esc(q.ex)}</div>` : ""}</div>`;
    }
    return `<div class="q" data-i="${i}" id="q-${i}">
      ${o.passage && q.passage ? passageHTML(q.passage, true) : ""}
      <div class="q-head"><span class="q-num">Câu ${i + 1}</span><span class="q-tag">${q.tag}</span>${showSay && !bigListen ? spkBtn(q.say) : ""}</div>
      <div class="q-prompt">${q.p}</div>
      ${bigListen ? `<div class="listen-big">${spkBtn(q.say, true)}</div>` : ""}
      ${body}${fb}
    </div>`;
  }

  /* ---------- Màn làm bài ---------- */
  function renderRun() {
    const view = $("#view");
    if (!RUN) { location.hash = curGradeKey(); return; }
    if (RUN.done) return renderResult(view);
    if (RUN.kind === "paper") renderPaper(view); else renderSingle(view);
    startTimer();
  }
  function runTop() {
    const r = RUN;
    const used = (Date.now() - r.t0) / 1000;
    const left = r.limit ? r.limit - used : 0;
    return `<div class="run-top"><a class="btn btn-ghost btn-sm" href="${r.back}">← Thoát</a>
      <div class="run-title">${esc(r.title)}<small>${esc(r.sub || "")}</small></div>
      <div class="timer ${r.limit && left <= 60 ? "low" : ""}">${I.clock}<span id="timer-v">${fmtTime(r.limit ? left : used)}</span></div></div>`;
  }
  function renderSingle(view) {
    const r = RUN, i = r.idx, q = r.qs[i], n = r.qs.length;
    if (!q) { view.innerHTML = `<div class="wrap run"><div class="empty">Chưa đủ câu hỏi cho bài này.</div></div>`; return; }
    const instant = r.kind === "practice" || r.kind === "redo";
    const checked = instant && r.checked[i];
    const doneCount = r.ans.filter((a, k) => answered(r.qs[k], a)).length;
    let actions;
    if (instant) {
      const needCheck = !checked && q.type !== "mc";
      actions = `<div class="run-actions"><span class="muted">Câu ${i + 1}/${n}</span><span class="spacer"></span>
        ${needCheck ? `<button type="button" class="btn btn-blue" data-check>Kiểm tra</button>` : ""}
        ${checked ? `<button type="button" class="btn btn-red" data-next>${i === n - 1 ? "Xem kết quả" : "Câu tiếp →"}</button>` : ""}</div>`;
    } else {
      actions = `<div class="run-actions">
        <button type="button" class="btn btn-ghost" data-prev ${i === 0 ? "disabled" : ""}>← Câu trước</button><span class="spacer"></span>
        ${i < n - 1 ? `<button type="button" class="btn btn-blue" data-next>Câu sau →</button>` : ""}
        <button type="button" class="btn btn-red" data-submit>Nộp bài</button></div>
        ${UI.confirm ? confirmHTML(n - doneCount) : ""}`;
    }
    view.innerHTML = `<div class="wrap run">${runTop()}
      <div class="bar" aria-hidden="true"><i style="width:${Math.round(((instant ? r.checked.filter(Boolean).length : doneCount) / n) * 100)}%"></i></div>
      ${!instant ? `<div class="navgrid" aria-label="Chuyển nhanh tới câu">${r.qs.map((qq, k) => `<button type="button" class="${answered(qq, r.ans[k]) ? "done" : ""} ${k === i ? "cur" : ""}" data-goto="${k}" aria-label="Câu ${k + 1}">${k + 1}</button>`).join("")}</div>` : ""}
      ${qHTML(q, i, { reveal: checked, passage: true })}
      ${actions}
    </div>`;
    if (q.hear && q.say && !checked && !r["heard" + i]) { r["heard" + i] = true; setTimeout(() => say(q.say), 250); }
    if (q.type === "text" && !checked) { const inp = $("#in-" + i); if (inp && window.matchMedia("(pointer: fine)").matches) inp.focus(); }
  }
  function confirmHTML(left) {
    return `<div class="confirm" role="alert"><p>${left > 0 ? `Em còn <b>${left}</b> câu chưa làm. Vẫn nộp bài?` : "Em đã làm hết các câu. Nộp bài để xem điểm?"}</p>
      <button type="button" class="btn btn-red btn-sm" data-confirm>Nộp bài</button><button type="button" class="btn btn-ghost btn-sm" data-cancel>Làm tiếp</button></div>`;
  }
  function renderPaper(view) {
    const r = RUN;
    let html = "", lastP = "";
    r.secs.forEach((S, si) => {
      html += `<div class="sec-h"><h3>${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][si]}. ${esc(S.h)}</h3><p>${esc(S.vi)}</p></div>`;
      for (let i = S.start; i < S.start + S.n; i++) {
        const q = r.qs[i];
        if (q.passage && q.passage.title !== lastP) { html += passageHTML(q.passage, true); lastP = q.passage.title; }
        html += qHTML(q, i, { reveal: false, passage: false });
      }
    });
    const doneCount = r.ans.filter((a, k) => answered(r.qs[k], a)).length;
    view.innerHTML = `<div class="wrap run paper">${runTop()}
      <p class="muted">Có ${r.qs.length} câu. Em làm lần lượt từng phần, xong bấm <b>Nộp bài</b> ở cuối trang. Hết giờ máy tự nộp.</p>
      ${html}
      <div class="run-actions"><span class="muted" id="paper-count">Đã làm ${doneCount}/${r.qs.length} câu</span><span class="spacer"></span><button type="button" class="btn btn-red" data-submit>Nộp bài</button></div>
      <div id="confirm-slot">${UI.confirm ? confirmHTML(r.qs.length - doneCount) : ""}</div>
    </div>`;
  }
  function refreshQ(i) {
    const el = $("#q-" + i);
    if (!el || !RUN) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = qHTML(RUN.qs[i], i, { reveal: false, passage: false });
    el.replaceWith(wrap.firstElementChild);
    const c = $("#paper-count");
    if (c) c.textContent = `Đã làm ${RUN.ans.filter((a, k) => answered(RUN.qs[k], a)).length}/${RUN.qs.length} câu`;
  }

  function renderResult(view) {
    const r = RUN, R = r.result;
    let big, msg;
    if (r.kind === "paper") { big = `${String(R.score).replace(".", ",")}<small> /10</small>`; }
    else if (r.kind === "ioe") { big = `${R.score}<small> /${R.max}</small>`; }
    else { big = `${R.c}<small> /${R.n}</small>`; }
    msg = R.pct >= 90 ? "Xuất sắc!" : R.pct >= 70 ? "Làm tốt lắm!" : R.pct >= 50 ? "Khá rồi, cố thêm chút nữa nhé!" : "Em ôn lại rồi làm lần nữa nhé!";
    let rank = "";
    if (r.kind === "ioe") {
      const mine = hist().filter((x) => x.kind === "ioe" && x.g === r.G.key && x.scope === r.scope).sort((a, b) => b.score - a.score || a.dur - b.dur);
      const me = mine.findIndex((x) => x.t === hist()[0].t);
      rank = `<p class="res-meta">Xếp hạng ${me + 1}/${mine.length} trong các lần em thi phạm vi này.</p>`;
    }
    const wrongIdx = R.rightArr.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    const reviewAll = r.kind === "paper";
    const list = reviewAll ? r.qs.map((_, i) => i) : wrongIdx;
    let lastP = "";
    const review = list.map((i) => {
      const q = r.qs[i];
      let pre = "";
      if (reviewAll && q.passage && q.passage.title !== lastP) { pre = passageHTML(q.passage, false); lastP = q.passage.title; }
      return pre + qHTML(q, i, { reveal: true, passage: !reviewAll });
    }).join("");
    view.innerHTML = `<div class="wrap run ${reviewAll ? "paper" : ""}">
      <div class="res">
        <div class="res-score">${big}</div>
        <div class="res-msg">${msg}</div>
        ${starsHTML(starsOf(R.pct))}
        <p class="res-meta">Đúng ${R.c}/${R.n} câu · ${R.pct}% · Thời gian ${fmtTime(R.dur)}</p>
        ${rank}
        <div class="res-btns">
          <button type="button" class="btn btn-red" data-again>${r.kind === "paper" ? "Làm lại đề này" : r.kind === "redo" ? "Ôn tiếp" : "Làm bộ câu mới"}</button>
          <a class="btn btn-line" href="${r.back}">Quay lại</a>
          ${wrongIdx.length && r.kind !== "redo" ? `<button type="button" class="btn btn-ghost" data-redo="${r.G.key}">Ôn câu sai</button>` : ""}
        </div>
      </div>
      <div class="section-h"><h2>${reviewAll ? "Đáp án và giải thích" : wrongIdx.length ? "Xem lại các câu trả lời sai" : "Em làm đúng tất cả!"}</h2>${!reviewAll && wrongIdx.length ? `<span class="muted">${wrongIdx.length} câu</span>` : ""}</div>
      <div class="review">${review}</div>
    </div>`;
  }

  /* ---------- Xử lý trả lời ---------- */
  const instantMode = () => RUN && (RUN.kind === "practice" || RUN.kind === "redo");
  function rerender(i) { if (RUN.kind === "paper") refreshQ(i); else renderSingle($("#view")); }
  function onOpt(i, k) {
    if (!RUN || RUN.done) return;
    if (instantMode()) { if (RUN.checked[i]) return; RUN.ans[i] = k; RUN.checked[i] = true; renderSingle($("#view")); return; }
    RUN.ans[i] = k; UI.confirm = false;
    rerender(i);
  }
  function onChip(i, spec) {
    if (!RUN || RUN.done || (instantMode() && RUN.checked[i])) return;
    const [where, v] = spec.split(":"); const k = +v;
    const a = (RUN.ans[i] || []).slice();
    if (where === "p") { if (!a.includes(k)) a.push(k); } else a.splice(k, 1);
    RUN.ans[i] = a.length ? a : null;
    rerender(i);
  }
  function onCheck() {
    const i = RUN.idx, q = RUN.qs[i];
    if (q.type === "text") { const inp = $("#in-" + i); if (inp) RUN.ans[i] = inp.value; }
    if (!answered(q, RUN.ans[i])) { toast(q.type === "order" ? "Em hãy xếp hết các từ trước khi kiểm tra." : "Em hãy nhập câu trả lời trước."); return; }
    RUN.checked[i] = true;
    renderSingle($("#view"));
  }
  function go(i) {
    if (!RUN) return;
    const q = RUN.qs[RUN.idx];
    if (q && q.type === "text") { const inp = $("#in-" + RUN.idx); if (inp && !inp.disabled) RUN.ans[RUN.idx] = inp.value; }
    RUN.idx = Math.max(0, Math.min(RUN.qs.length - 1, i));
    UI.confirm = false;
    renderSingle($("#view"));
  }

  /* ---------- Sự kiện ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    const d = t.dataset;
    if (d.themeToggle != null) { store.set("theme", isDark() ? "light" : "dark"); applyTheme(); const sel = document.getElementById("theme"); if (sel) sel.value = themePref(); return; }
    if (d.say != null) { e.preventDefault(); say(d.say); return; }
    if (d.mic != null) { e.preventDefault(); onMic(t); return; }
    if (d.grade) { store.set("grade", d.grade); }
    if (d.scroll) { e.preventDefault(); const el = document.getElementById(d.scroll); if (el) el.scrollIntoView({ behavior: "smooth" }); return; }
    const qEl = t.closest(".q");
    if (d.opt != null && qEl) { onOpt(+qEl.dataset.i, +d.opt); return; }
    if (d.chip && qEl) { onChip(+qEl.dataset.i, d.chip); return; }
    if (d.check != null) { onCheck(); return; }
    if (d.next != null) {
      if (instantMode() && RUN.idx === RUN.qs.length - 1) { finish(); return; }
      go(RUN.idx + 1); return;
    }
    if (d.prev != null) { go(RUN.idx - 1); return; }
    if (d.goto != null) { go(+d.goto); return; }
    if (d.submit != null) {
      if (RUN.kind !== "paper") { const q = RUN.qs[RUN.idx]; if (q.type === "text") { const inp = $("#in-" + RUN.idx); if (inp) RUN.ans[RUN.idx] = inp.value; } }
      UI.confirm = true;
      if (RUN.kind === "paper") { const left = RUN.qs.length - RUN.ans.filter((a, k) => answered(RUN.qs[k], a)).length; $("#confirm-slot").innerHTML = confirmHTML(left); $("#confirm-slot").scrollIntoView({ block: "center" }); }
      else renderSingle($("#view"));
      return;
    }
    if (d.confirm != null) { UI.confirm = false; finish(); return; }
    if (d.cancel != null) { UI.confirm = false; if (RUN.kind === "paper") $("#confirm-slot").innerHTML = ""; else renderSingle($("#view")); return; }
    if (d.again != null) { RUN.remake(); return; }
    if (d.tab) { stopSay(); UI.tab = d.tab; UI.flip = false; route(true); if (t.closest(".next-step")) window.scrollTo(0, 0); return; }
    if (d.fcFlip != null) { UI.flip = !UI.flip; t.classList.toggle("flip", UI.flip); say(d.word); return; }
    if (d.fc) { fcMove(+d.fc); return; }
    if (d.fcMark) {
      const { G, U } = curUnit(); if (!U) return;
      const kn = known(G.key);
      const deck = fcDeck(U, kn); const w = U.words[deck[UI.fc]]; if (!w) return;
      if (d.fcMark === "known") kn[w.en] = 1; else kn[w.en] = 0;
      if (!kn[w.en]) kn[w.en] = undefined;
      store.set("known:" + G.key, kn);
      // Ở chế độ "chỉ ôn từ chưa thuộc", thẻ vừa thuộc rời khỏi bộ nên giữ nguyên vị trí
      if (!(UI.fcOnlyNew && d.fcMark === "known")) UI.fc = UI.fc + 1;
      const left = fcDeck(U, known(G.key)).length;
      if (UI.fc >= left) { UI.fc = 0; if (left) toast("Hết một vòng thẻ! Bắt đầu lại từ thẻ đầu."); }
      UI.flip = false; route(true); return;
    }
    if (d.fcShuffle != null) { const { U } = curUnit(); UI.fcOrder = UI.fcOrder ? null : shuffle(U.words.map((_, i) => i)); UI.fc = 0; UI.flip = false; route(true); return; }
    if (d.fcOnly != null) { UI.fcOnlyNew = !UI.fcOnlyNew; UI.fc = 0; UI.flip = false; route(true); return; }
    if (d.fcFront != null) { UI.fcFront = UI.fcFront === "vi" ? "en" : "vi"; UI.flip = false; route(true); return; }
    if (d.sayAll != null) {
      const { U } = curUnit(); if (!U) return;
      const label = (txt) => { const sp = t.querySelector("span"); if (sp) sp.textContent = txt; };
      if (t.classList.contains("playing")) { stopSay(); t.classList.remove("playing"); label("Nghe cả bài"); $$(".wcard.now").forEach((c) => c.classList.remove("now")); return; }
      t.classList.add("playing"); label("Dừng đọc");
      sayList(U.words.map((w) => w.en), (i) => {
        $$(".wcard.now").forEach((c) => c.classList.remove("now"));
        if (i < 0) { t.classList.remove("playing"); label("Nghe cả bài"); return; }
        const c = document.querySelector(`.wcard[data-wi="${i}"]`); if (c) { c.classList.add("now"); c.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
      });
      return;
    }
    if (d.known) { const gk = UI.unitKey.split(":")[0]; const kn = known(gk); if (kn[d.known]) delete kn[d.known]; else kn[d.known] = 1; store.set("known:" + gk, kn); route(true); return; }
    if (d.practice) { startPractice(GRADES[curGradeKey()], +d.practice); return; }
    if (d.scope != null) { UI.ioeScope = +d.scope; route(true); return; }
    if (d.ioe != null) { startIOE(GRADES[curGradeKey()], UI.ioeScope); return; }
    if (d.exam) { const [tk, k] = d.exam.split(":"); startPaper(GRADES[curGradeKey()], tk, +k); return; }
    if (d.redo) { startRedo(d.redo); return; }
    if (d.reset) {
      if (d.reset === "ask") UI.resetAsk = true;
      else if (d.reset === "yes") { ["hist", "best", "wrong"].concat(GRADE_KEYS.map((k) => "known:" + k)).forEach(store.del); UI.resetAsk = false; toast("Đã xoá dữ liệu học tập."); }
      else UI.resetAsk = false;
      route(true); return;
    }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.matches("[data-text]") && RUN && !RUN.done) {
      const i = +t.closest(".q").dataset.i;
      RUN.ans[i] = t.value;
      if (RUN.kind === "paper") { const c = $("#paper-count"); if (c) c.textContent = `Đã làm ${RUN.ans.filter((a, k) => answered(RUN.qs[k], a)).length}/${RUN.qs.length} câu`; }
    }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "grade-select") { store.set("grade", t.value); location.hash = t.value; }
    if (t.id === "theme") { store.set("theme", t.value); applyTheme(); toast(t.value === "light" ? "Đã chuyển sang nền sáng." : t.value === "dark" ? "Đã chuyển sang nền tối." : "Giao diện sẽ theo cài đặt của máy."); }
    if (t.id === "accent") { store.set("accent", t.value); toast(t.value === "en-GB" ? "Đã chọn giọng Anh – Anh." : "Đã chọn giọng Anh – Mỹ."); }
  });
  document.addEventListener("keydown", (e) => {
    if (/^#lop\d-u\d+$/.test(location.hash) && UI.tab === "flash" && !e.target.matches("input, textarea, select") && !e.ctrlKey && !e.metaKey && !e.altKey) {
      if (e.key === " " || e.key === "Enter") { const c = $(".fc"); if (c && (e.target === document.body || e.target === c)) { e.preventDefault(); c.click(); } }
      else if (e.key === "ArrowRight") { e.preventDefault(); fcMove(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); fcMove(-1); }
      return;
    }
    if (!RUN || RUN.done || location.hash !== "#lam-bai" || RUN.kind === "paper") return;
    const inInput = e.target.matches("input, textarea, select");
    if (e.key === "Enter") {
      if (instantMode()) { if (RUN.checked[RUN.idx]) { e.preventDefault(); if (RUN.idx === RUN.qs.length - 1) finish(); else go(RUN.idx + 1); } else if (RUN.qs[RUN.idx].type !== "mc") { e.preventDefault(); onCheck(); } }
      else if (inInput) { e.preventDefault(); go(RUN.idx + 1); }
      return;
    }
    if (inInput || e.ctrlKey || e.metaKey || e.altKey) return;
    const q = RUN.qs[RUN.idx];
    const k = "abcd".indexOf(e.key.toLowerCase()) >= 0 ? "abcd".indexOf(e.key.toLowerCase()) : "1234".indexOf(e.key);
    if (q.type === "mc" && k >= 0 && k < q.opts.length) onOpt(RUN.idx, k);
  });

  function onMic(btn) {
    const row = btn.closest(".sp-row");
    const res = row.querySelector(".sp-res");
    const target = row.dataset.target;
    $$(".mic.rec").forEach((b) => { b.classList.remove("rec"); b.querySelector("span").textContent = "Nói"; });
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* bỏ qua */ }
    btn.classList.add("rec"); btn.querySelector("span").textContent = "Đang nghe…";
    res.innerHTML = '<span class="muted">Em đọc to: <b>' + esc(target) + "</b></span>";
    listenOnce((r) => {
      btn.classList.remove("rec"); btn.querySelector("span").textContent = "Nói";
      if (r.error) { res.innerHTML = `<span class="muted">${esc(SR_ERR[r.error] || "Không nhận được giọng nói. Em thử lại nhé.")}</span>`; return; }
      let bestM = null, heard = "";
      r.alts.forEach((h) => { const m = speechMatch(target, h); if (!bestM || m.score > bestM.score) { bestM = m; heard = h; } });
      const s = bestM.score;
      const cls = s >= 85 ? "good" : s >= 60 ? "mid" : "low";
      const words = target.split(/\s+/);
      let wi = 0;
      const colored = words.map((w) => { const clean = toWords(w); if (!clean.length) return esc(w); const ok = bestM.hit[wi]; wi += clean.length; return `<span class="${ok ? "w-ok" : "w-miss"}">${esc(w)}</span>`; }).join(" ");
      res.innerHTML = `<span class="sp-score ${cls}">${s}%</span><b>${s >= 85 ? "Rất tốt!" : s >= 60 ? "Khá tốt, đọc rõ hơn các từ gạch đỏ nhé." : "Em nghe mẫu rồi thử lại nhé."}</b>
        <div>${colored}</div><div class="muted">Máy nghe được: “${esc(heard)}”</div>`;
    });
  }

  /* ---------- Định tuyến ---------- */
  function route(keepScroll) {
    stopTimer();
    if (activeRec) { try { activeRec.abort(); } catch (e) { /* bỏ qua */ } }
    const h = decodeURIComponent(location.hash.slice(1)) || "trang-chu";
    const view = $("#view");
    let m, active = "";
    if (h !== "lam-bai" && !keepScroll) stopSay();
    if ((m = h.match(/^(lop\d)(?:-(u(\d+)|ioe|de))?$/)) && GRADES[m[1]]) {
      store.set("grade", m[1]);
      const G = GRADES[m[1]];
      if (!m[2]) { renderGrade(view, G); active = "grade"; }
      else if (m[3]) { renderUnit(view, G, +m[3]); active = "grade"; }
      else if (m[2] === "ioe") { renderIOE(view, G); active = "ioe"; }
      else { renderExams(view, G); active = "de"; }
      document.title = `${G.name} · English 4·7`;
    } else if (h === "lam-bai") {
      renderRun(); active = RUN ? ({ ioe: "ioe", paper: "de", redo: "kq" }[RUN.kind] || "grade") : "";
      document.title = RUN ? `${RUN.title} · English 4·7` : "English 4·7";
    } else if (h === "ket-qua") {
      renderResults(view); active = "kq"; document.title = "Kết quả · English 4·7";
    } else {
      renderHome(view); document.title = "English 4·7";
    }
    renderNav(active);
    if (!keepScroll) window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", () => route());
  try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme); } catch (e) { /* bỏ qua */ }
  applyTheme();
  route();
})();
