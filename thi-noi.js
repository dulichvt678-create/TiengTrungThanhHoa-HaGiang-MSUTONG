/* Thi nói tiếng Trung theo giáo trình 汉语初级强化教程 · 听说课本 I (bài 1–12), trình độ tương đương HSK 1.
 * 4 phần thi: 1. Đọc từ và câu · 2. Đặt câu · 3. Nói theo chủ đề · 4. Trả lời câu hỏi theo phản xạ
 * 2 kiểu thi: thường xuyên (theo một bài) và định kỳ (một khoảng bài). Mỗi phần 2–3 phút nói. Thang điểm 100. */
(function () {
  "use strict";
  const N = window.NOI, D = window.DE_THI;
  const { $, $$, esc, shuffle, pick, clamp, mmss, wait, toast, ICON_SPK, ICON_MIC, ICON_STOP, spkBtn, isMobile,
    synth, speak, hush, SR, speechMessage, capture, typedCapture, startRecorder, releaseMic } = N;
  const store = N.makeStore("ttth:thinoi:");
  const settings = Object.assign({
    type: "tx", lesson: 1, preset: "dk1", from: 1, to: 5, timing: "p2",
    showPy: false, showText: false, instant: false, record: !isMobile, rate: 0.85, name: "", lop: ""
  }, store.get("settings", {}));
  const saveSettings = () => store.set("settings", settings);
  N.opts = settings; // tốc độ đọc, bật/tắt ghi âm dùng chung với phần lõi

  /* ---------- Dữ liệu ---------- */
  const parse = (block) => (block || "").trim().split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [h, p, v] = l.split("|").map((x) => (x || "").trim());
    return { h, p, v };
  });
  const UNITS = D.units.map((u) => ({ ...u, vocab: parse(u.words) }));
  const unitById = (id) => UNITS.find((u) => u.id === +id);
  const PRESETS = {
    dk1: [1, 5, "Định kỳ 1 (giữa kỳ)"],
    dk2: [6, 10, "Định kỳ 2"],
    ck: [1, 12, "Cuối kỳ"],
    tuy: [null, null, "Tuỳ chọn"]
  };
  const TIMINGS = { p2: [120, "2 phút mỗi phần"], p3: [180, "3 phút mỗi phần"], w2: [30, "Cả bài 2 phút"], w3: [45, "Cả bài 3 phút"] };
  // Bài ôn tập lấy đề của các bài trong khoảng ôn
  const contentOf = (u) => (u.review ? UNITS.filter((x) => x.id >= u.review[0] && x.id <= u.review[1]) : [u]);

  /* ---------- So khớp chữ theo âm đọc ---------- */
  // Bảng chữ → pinyin lấy từ danh sách từ; chấp nhận chữ đồng âm (他/她, 在/再…) khi máy nghe ra chữ khác cùng âm.
  const PY = new Map();
  const isHan = (c) => /[一-鿿]/.test(c);
  function addPy(h, p) {
    const cs = Array.from(h).filter(isHan);
    const ss = String(p).toLowerCase().normalize("NFC").split(/[\s']+/).filter(Boolean);
    if (cs.length - 1 === ss.length && cs[cs.length - 1] === "儿") { cs.pop(); ss[ss.length - 1] = ss[ss.length - 1].replace(/r$/, ""); }
    if (cs.length !== ss.length) return;
    cs.forEach((c, i) => { if (!PY.has(c)) PY.set(c, new Set()); PY.get(c).add(ss[i]); });
  }
  UNITS.forEach((u) => u.vocab.forEach((w) => addPy(w.h, w.p)));
  (D.extraPy || "").split("|").forEach((x) => { const [c, p] = x.split(" "); if (c && p) addPy(c, p); });
  function eq(a, b) {
    if (a === b) return true;
    if ((a === "两" && b === "二") || (a === "二" && b === "两")) return true;
    const pa = PY.get(a), pb = PY.get(b);
    if (!pa || !pb) return false;
    for (const x of pa) if (pb.has(x)) return true;
    return false;
  }
  const DIG = "零一二三四五六七八九";
  function numHan(n) {
    if (n < 10) return DIG[n];
    if (n < 20) return "十" + (n % 10 ? DIG[n % 10] : "");
    if (n < 100) return DIG[Math.floor(n / 10)] + "十" + (n % 10 ? DIG[n % 10] : "");
    if (n < 1000) { const r = n % 100; return DIG[Math.floor(n / 100)] + "百" + (r === 0 ? "" : r < 10 ? "零" + DIG[r] : (r < 20 ? "一" : "") + numHan(r)); }
    if (n < 10000) { const r = n % 1000; return DIG[Math.floor(n / 1000)] + "千" + (r === 0 ? "" : r < 100 ? "零" + numHan(r) : numHan(r)); }
    return String(n).split("").map((d) => DIG[d]).join("");
  }
  // Chuẩn hoá: chữ số → chữ Hán (máy hay viết 20 thay cho 二十), bỏ dấu câu và khoảng trắng
  const clean = (s) => String(s || "").replace(/\d+/g, (m) => (m.length > 4 ? m.split("").map((d) => DIG[d]).join("") : numHan(+m))).replace(/[^一-鿿]/g, "");
  // Ghép chữ cần đọc với chữ máy nghe được (dãy con chung dài nhất), trả về chữ nào đọc đúng
  function align(target, heard) {
    const t = Array.from(target), h = Array.from(heard), n = t.length, m = h.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      dp[i][j] = eq(t[i], h[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const ok = new Array(n).fill(false);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (eq(t[i], h[j]) && dp[i][j] === dp[i + 1][j + 1] + 1) { ok[i] = true; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    return ok;
  }
  const contains = (heard, w) => { const t = clean(w); return !t || align(t, heard).every(Boolean); };

  /* ---------- Chấm điểm ---------- */
  const W = {
    word: { content: 0.8, pron: 0.2 },
    sent: { content: 0.6, fluency: 0.2, pron: 0.2 },
    make: { content: 0.35, grammar: 0.25, vocab: 0.1, fluency: 0.15, pron: 0.15 },
    topic: { content: 0.3, grammar: 0.15, vocab: 0.15, fluency: 0.25, pron: 0.15 },
    qa: { content: 0.45, grammar: 0.15, vocab: 0.1, fluency: 0.2, pron: 0.1 }
  };
  const CRIT = { content: "Nội dung, đọc đúng", grammar: "Ngữ pháp, mạch lạc", vocab: "Từ vựng", fluency: "Lưu loát, phản xạ", pron: "Phát âm rõ (máy nghe được)" };
  const ALLWORDS = UNITS.flatMap((u) => u.vocab).map((w) => w.h).filter((h) => h.length >= 2);
  const usedWords = (t) => Array.from(new Set(ALLWORDS.filter((w) => t.includes(w))));
  function pronOf(res) {
    if (res.typed) return null;
    if (!res.confs.length) return 0.7;
    const avg = res.confs.reduce((a, b) => a + b, 0) / res.confs.length;
    return clamp((avg - 0.5) / 0.4, 0.2, 1);
  }
  function finalize(kind, crit, extra) {
    const w = W[kind];
    let sum = 0, wsum = 0;
    Object.keys(w).forEach((k) => { if (crit[k] != null) { sum += w[k] * crit[k]; wsum += w[k]; } });
    const gate = extra.gate == null ? 1 : extra.gate;
    return { score: Math.round((sum / wsum) * gate * 100) / 10, crit, issues: [], good: [], marks: [], used: [], ...extra };
  }
  function emptyScore(kind, res) {
    const crit = {}; Object.keys(W[kind]).forEach((k) => (crit[k] = k === "pron" && res.typed ? null : 0));
    return { score: 0, crit, n: 0, used: [], marks: [], good: [],
      issues: [res.timeout ? "Hết thời gian của phần thi nên chưa làm câu này." : res.skipped ? "Bỏ qua câu này." : "Máy không nhận được câu trả lời. Hãy nói to, rõ và gần micro hơn."] };
  }

  function scoreWord(w, res) {
    const t = clean(w.h), h = clean(res.text);
    if (!h) return emptyScore("word", res);
    const ok = align(t, h), m = ok.filter(Boolean).length;
    const content = m === t.length ? 1 : (m / t.length) * 0.5;
    const sc = finalize("word", { content, pron: pronOf(res) }, { n: h.length, ok, gate: m ? 1 : 0 });
    if (m === t.length) sc.good.push("Đọc đúng.");
    else sc.issues.push(`Máy nghe thành “${res.text}”. Âm đúng: ${w.p}. Kiểm tra lại thanh mẫu, vận mẫu và thanh điệu.`);
    return sc;
  }
  function scoreSent(item, res, cap) {
    const t = clean(item.zh), h = clean(res.text);
    if (!h) return emptyScore("sent", res);
    const ok = align(t, h), m = ok.filter(Boolean).length, acc = m / t.length;
    const cpm = m / (Math.max(res.dur, 2) / 60);
    // đọc thiếu chữ bị trừ nhiều hơn tỉ lệ thuận; tốc độ chỉ tính trên phần đọc đúng
    const sc = finalize("sent", { content: Math.pow(acc, 1.5), fluency: clamp(cpm / 60) * acc, pron: pronOf(res) }, { n: h.length, ok, cpm: Math.round(cpm), gate: acc < 0.5 ? 0.6 : 1 });
    const missed = Array.from(t).filter((c, i) => !ok[i]);
    if (acc >= 0.95) sc.good.push("Đọc đúng cả câu.");
    else if (missed.length) sc.issues.push(`Đọc đúng ${m}/${t.length} chữ. Chữ máy chưa nghe đúng được tô đỏ: ${missed.slice(0, 12).join("、")}${missed.length > 12 ? "…" : ""}.`);
    if (acc < 0.6 && cap && res.dur >= cap - 1) sc.issues.push("Chưa đọc hết câu trong thời gian cho phép.");
    if (cpm < 40) sc.issues.push(`Đọc chậm (khoảng ${Math.round(cpm)} chữ/phút). Mục tiêu: từ 60 chữ/phút.`);
    return sc;
  }
  function scoreMake(p, res) {
    const raw = String(res.text), h = clean(raw), n = h.length;
    if (!n) return emptyScore("make", res);
    const issues = [], good = [];
    const has = p.must.every((m) => contains(h, m));
    const struct = p.re ? new RegExp(p.re).test(h) || new RegExp(p.re).test(raw) : has;
    const want = Math.min(6, clean(p.s).length);
    let content = has && struct ? 1 : has ? 0.5 : 0;
    let grammar = struct && has ? (n >= want ? 1 : 0.7) : has ? 0.4 : 0;
    const onlyWord = n <= clean(p.w).length && h !== clean(p.s); // chỉ đọc lại đúng từ được cho
    if (!has) issues.push(`Máy không nghe thấy “${p.must.join("…")}” trong câu. Hãy dùng đúng từ được cho (hoặc đọc rõ hơn).`);
    else if (onlyWord) { grammar = 0.2; content = 0.4; issues.push("Bạn mới đọc từ được cho, chưa đặt thành câu hoàn chỉnh."); }
    else if (!struct) issues.push("Câu chưa đúng cách dùng của từ này. Xem câu mẫu bên dưới.");
    else good.push(`Dùng đúng “${p.w}” trong câu.`);
    if (has && !onlyWord && n < want) issues.push(`Câu hơi ngắn (${n} chữ). Hãy nói câu đầy đủ, khoảng ${want}–12 chữ.`);
    const used = usedWords(h);
    const vocab = clamp(new Set(h).size / 6) * 0.6 + clamp(used.length / 2) * 0.4;
    return finalize("make", { content, grammar, vocab, fluency: clamp(n / want), pron: pronOf(res) },
      { n, used, issues, good, marks: p.must, gate: has && struct && !onlyWord ? 1 : has ? 0.8 : 0.5 });
  }
  function scoreTopic(tp, res, base, factor) {
    const raw = String(res.text), h = clean(raw), n = h.length;
    if (!n) return emptyScore("topic", res);
    const issues = [], good = [];
    const hit = tp.kw.split("|").filter((k) => h.includes(k));
    const content = clamp(hit.length / 6);
    if (hit.length < 3) issues.push("Nội dung chưa bám sát chủ đề. Hãy dựa vào các câu gợi ý để nói.");
    else good.push(`Bám sát chủ đề (dùng ${hit.length} từ liên quan).`);
    const conns = D.connectors.filter((c) => h.includes(c));
    const grammar = clamp(conns.length / 3) * 0.6 + clamp(n / 40) * 0.4;
    if (conns.length < 2) issues.push("Nối các câu bằng 也、还、都、和、很… để bài nói liền mạch.");
    const used = usedWords(h);
    const vocab = clamp(new Set(h).size / 30) * 0.5 + clamp(used.length / 8) * 0.5;
    if (used.length < 4) issues.push("Dùng thêm từ đã học trong các bài của sách.");
    const cpm = n / (Math.max(res.dur, 5) / 60), want = Math.max(12, Math.round(base * factor));
    const fluency = 0.45 * clamp(cpm / 50) + 0.55 * clamp(n / want);
    if (n < want * 0.7) issues.push(`Bài nói còn ngắn: ${n} chữ. Với ${mmss(base)} nên nói khoảng ${want} chữ trở lên.`);
    else good.push(`Độ dài tốt: ${n} chữ.`);
    if (cpm < 30) issues.push(`Nói chậm hoặc ngắt quãng nhiều (khoảng ${Math.round(cpm)} chữ/phút).`);
    const gate = clamp(0.4 + (0.6 * n) / (want * 0.8)) * (hit.length < 3 ? 0.6 : 1);
    return finalize("topic", { content, grammar, vocab, fluency, pron: pronOf(res) }, { n, used, issues, good, marks: hit.concat(conns), cpm: Math.round(cpm), gate });
  }
  // Phản xạ: nghe câu hỏi xong phải trả lời ngay
  function scoreQA(q, res) {
    const raw = String(res.text), h = clean(raw), n = h.length;
    if (!n) return emptyScore("qa", res);
    const issues = [], good = [];
    const groups = q.kw.map((k) => new RegExp(k));
    const matched = groups.filter((r) => r.test(h) || r.test(raw)).length;
    let content = matched ? 0.3 + (0.7 * matched) / groups.length : 0.1;
    const qh = new Set(clean(q.q)), echo = Array.from(h).filter((c) => qh.has(c)).length / n;
    if (echo > 0.85 && n <= clean(q.q).length && clean(q.a) !== h && !/[好见]$/.test(h)) { content = Math.min(content, 0.25); issues.push("Câu trả lời gần như lặp lại câu hỏi. Hãy trả lời bằng thông tin của bạn."); }
    if (!matched) issues.push("Câu trả lời chưa đúng điều giám khảo hỏi (hoặc máy nghe chưa rõ các từ chính).");
    else if (matched < groups.length) issues.push("Đã trả lời được ý chính, nên nói đủ câu hơn.");
    else good.push("Trả lời đúng câu hỏi.");
    const grammar = n >= 5 ? 1 : n >= 3 ? 0.75 : n >= 2 ? 0.5 : 0.25;
    if (n < 3) issues.push(`Câu trả lời ngắn (${n} chữ). Có thể trả lời đầy đủ hơn, ví dụ: ${q.a}`);
    const used = usedWords(h);
    const vocab = clamp(new Set(h).size / 5) * 0.7 + clamp(used.length) * 0.3;
    let fluency = clamp(n / 5), slow = 1;
    if (res.firstAt != null && !res.typed) {
      if (res.firstAt > 6) { fluency *= 0.5; slow = 0.75; issues.push(`Phản xạ chậm: ${Math.round(res.firstAt)} giây sau mới bắt đầu trả lời. Hãy trả lời ngay sau khi nghe câu hỏi.`); }
      else if (res.firstAt > 3) { fluency *= 0.75; slow = 0.9; issues.push(`Phản xạ hơi chậm (${Math.round(res.firstAt)} giây). Cố gắng trả lời trong 2–3 giây.`); }
      else good.push(`Phản xạ nhanh (${res.firstAt.toFixed(1)} giây).`);
    }
    const marks = q.kw.flatMap((k) => k.split("|")).filter((w) => !/[\\[\]().*+?]/.test(w));
    return finalize("qa", { content, grammar, vocab, fluency, pron: pronOf(res) }, { n, used, issues, good, marks, gate: (content < 0.3 ? 0.6 : 1) * slow });
  }
  function scoreItem(it, res) {
    if (it.kind === "word") return scoreWord(it.data, res);
    if (it.kind === "sent") return scoreSent(it.data, res, it.cap);
    if (it.kind === "make") return scoreMake(it.data, res);
    if (it.kind === "qa") return scoreQA(it.data, res);
    return scoreTopic(it.data, res, it.base, it.factor);
  }
  function level(total) {
    if (total >= 90) return ["Xuất sắc", "Phát âm rõ, nói đúng và đủ ý, phản xạ nhanh."];
    if (total >= 80) return ["Giỏi", "Nói tốt. Luyện thêm phần còn yếu để đạt điểm tối đa."];
    if (total >= 65) return ["Khá", "Làm được phần lớn yêu cầu. Cần nói đầy đủ câu và phát âm rõ hơn."];
    if (total >= 50) return ["Trung bình", "Đạt yêu cầu tối thiểu. Ôn lại từ và câu mẫu của các bài rồi thi lại."];
    return ["Chưa đạt", "Dưới 50/100. Học lại từ, câu mẫu trong sách, luyện phát âm rồi thi lại."];
  }
  const ADVICE = {
    content: "Đọc đúng từng chữ, dùng đúng từ được cho, nói đúng chủ đề và trả lời đúng điều giám khảo hỏi.",
    grammar: "Nói thành câu đầy đủ (chủ ngữ + động từ + tân ngữ), học thuộc câu mẫu của từng bài.",
    vocab: "Dùng thêm các từ đã học trong sách thay vì lặp lại vài từ quen.",
    fluency: "Luyện phản xạ: nghe câu hỏi là trả lời ngay; nói liền mạch, ít ngắt quãng.",
    pron: "Máy nhận nhầm khá nhiều chữ: luyện thanh điệu, nói chậm và rõ từng âm tiết, để micro gần miệng."
  };

  /* ---------- Trạng thái ---------- */
  const app = () => $("#app");
  let S = null, token = 0, live = null;
  function stopAll() { token++; hush(); if (live) { live.abort(); live = null; } }
  const partSec = () => TIMINGS[settings.timing][0];
  const whole = () => settings.timing[0] === "w";

  /* ---------- Trang đầu ---------- */
  function planRows() {
    const B = partSec(), tx = settings.type === "tx";
    return [
      ["Đọc từ và câu", "认读词语和句子", `Đọc to khoảng ${plan(B).nW} từ, sau đó ${plan(B).nS} câu ${tx ? "của bài" : "trong phạm vi các bài thi"}.`],
      ["Đặt câu", "造句", `${plan(B).nM} từ, mỗi từ 5 giây suy nghĩ rồi nói một câu có dùng từ đó.`],
      ["Nói theo chủ đề", "话题表达", `${plan(B).prepT} giây chuẩn bị (có gợi ý), sau đó nói liên tục về một chủ đề${tx ? " của bài" : ""}.`],
      ["Trả lời câu hỏi theo phản xạ", "快速问答", `Giám khảo hỏi ${plan(B).nQ} câu, nghe xong trả lời ngay (tối đa 10 giây mỗi câu).`]
    ];
  }
  function plan(B) {
    return {
      nW: Math.max(2, Math.round((B * 0.5) / 6)), nS: Math.max(1, Math.round((B * 0.4) / 12)),
      nM: Math.max(1, Math.round(B / 20)), nQ: Math.max(2, Math.round(B / 12)),
      prepT: B >= 120 ? (settings.type === "tx" ? 20 : 30) : 10
    };
  }
  const unitOpts = (sel) => UNITS.map((u) => `<option value="${u.id}" ${+sel === u.id ? "selected" : ""}>第${u.id}课 ${esc(u.zh)} · ${esc(u.title)}</option>`).join("");
  function home() {
    stopAll(); releaseMic(); S = null;
    const hist = store.get("history", []).slice(-15).reverse();
    const tx = settings.type === "tx", rows = planRows(), B = partSec();
    app().innerHTML = `<div class="page">
      <div class="page-head">
        <div class="eyebrow">${esc(D.book)} · 口语考试</div>
        <h1>Thi nói tiếng Trung</h1>
        <p class="lead">Kiểm tra nói trình độ tương đương <b>HSK 1</b> theo giáo trình <span class="han">${esc(D.book)}</span>, bài 1–12. Bài thi gồm 4 phần: đọc từ và câu, đặt câu, nói theo chủ đề, trả lời câu hỏi theo phản xạ. Máy chấm theo <b>thang điểm 100</b>.</p>
      </div>
      ${SR ? "" : `<div class="note">Trình duyệt này chưa hỗ trợ nhận giọng nói. Hãy mở trang bằng <b>Chrome</b> hoặc <b>Edge</b> (máy tính hoặc Android). Tạm thời vẫn gõ chữ Hán để chấm thử được, nhưng không chấm phát âm.</div>`}

      <section class="panel hk-exam">
        <h2>Thông tin thí sinh</h2>
        <div class="row">
          <label class="field" style="flex:1 1 260px">Họ và tên<input type="text" id="st-name" value="${esc(settings.name)}" placeholder="Ví dụ: Nguyễn Thị Lan" autocomplete="name"></label>
          <label class="field" style="flex:0 1 180px">Lớp<input type="text" id="st-lop" value="${esc(settings.lop)}" placeholder="Ví dụ: HSK1-K12"></label>
        </div>
        <h2>Kiểu thi</h2>
        <div class="hk-seg hk-seg-big" role="radiogroup" aria-label="Kiểu thi">
          <button role="radio" aria-checked="${tx}" class="${tx ? "on" : ""}" data-type="tx">Thi thường xuyên</button>
          <button role="radio" aria-checked="${!tx}" class="${!tx ? "on" : ""}" data-type="dk">Thi định kỳ</button>
        </div>
        <p class="meta">${tx ? "Kiểm tra sau mỗi bài học. Đề lấy từ bài đang học, thiếu thì lấy thêm các bài trước. Bài ôn tập (第5课, 第10课) lấy đề của các bài được ôn." : "Kiểm tra giữa kỳ, cuối kỳ. Đề lấy ngẫu nhiên trong khoảng bài đã chọn, câu đọc dài hơn, chủ đề nói khó hơn."}</p>
        <div class="row">
          ${tx ? `<label class="field" style="flex:1 1 320px">Bài thi<select id="st-lesson">${unitOpts(settings.lesson)}</select></label>` : `
            <label class="field">Kỳ thi<select id="st-preset">${Object.entries(PRESETS).map(([k, v]) => `<option value="${k}" ${settings.preset === k ? "selected" : ""}>${v[2]}${v[0] ? ` · Bài ${v[0]}–${v[1]}` : ""}</option>`).join("")}</select></label>
            <label class="field">Từ bài<select id="st-from" ${settings.preset !== "tuy" ? "disabled" : ""}>${UNITS.map((u) => `<option ${u.id === settings.from ? "selected" : ""}>${u.id}</option>`).join("")}</select></label>
            <label class="field">Đến bài<select id="st-to" ${settings.preset !== "tuy" ? "disabled" : ""}>${UNITS.map((u) => `<option ${u.id === settings.to ? "selected" : ""}>${u.id}</option>`).join("")}</select></label>`}
          <label class="field">Thời gian thi<select id="st-timing">${Object.entries(TIMINGS).map(([k, v]) => `<option value="${k}" ${settings.timing === k ? "selected" : ""}>${v[1]}</option>`).join("")}</select></label>
        </div>
        <div class="table-wrap"><table class="hk-plan"><thead><tr><th>Phần</th><th>Nội dung</th><th>Thời gian nói</th><th>Điểm</th></tr></thead><tbody>
          ${rows.map((r, i) => `<tr><td><b>${i + 1}. ${r[0]}</b> <span class="han">${r[1]}</span></td><td>${r[2]}</td><td>tối đa ${mmss(B)}</td><td>25</td></tr>`).join("")}
          <tr><td colspan="2"><b>Tổng</b> · đạt từ 50 điểm</td><td><b>tối đa ${mmss(B * 4)}</b></td><td><b>100</b></td></tr>
        </tbody></table></div>
        <details class="hk-opts"><summary>Tuỳ chọn thêm</summary>
          <div class="row">
            <label class="hk-check"><input type="checkbox" id="st-py" ${settings.showPy ? "checked" : ""}> Hiện pinyin khi đọc</label>
            <label class="hk-check"><input type="checkbox" id="st-text" ${settings.showText ? "checked" : ""}> Hiện chữ câu hỏi của giám khảo</label>
            <label class="hk-check"><input type="checkbox" id="st-instant" ${settings.instant ? "checked" : ""}> Chế độ luyện tập: xem điểm sau mỗi câu</label>
            <label class="hk-check"><input type="checkbox" id="st-rec" ${settings.record ? "checked" : ""}> Ghi âm để nghe lại</label>
            <label class="field" style="grid-auto-flow:column;align-items:center;gap:8px">Giọng đọc<select id="st-rate">
              ${[[0.7, "Chậm"], [0.85, "Vừa"], [1, "Bình thường"]].map(([v, t]) => `<option value="${v}" ${settings.rate === v ? "selected" : ""}>${t}</option>`).join("")}</select></label>
          </div>
          <p class="meta">Thi thật nên để tắt pinyin, tắt chữ câu hỏi (chỉ nghe) và tắt chế độ luyện tập.</p>
        </details>
        <div class="row">
          <button class="btn primary" id="go-exam">Vào phòng thi</button>
          <button class="btn" id="mic-test">${ICON_MIC.replace("<svg", '<svg width="16" height="16"')} Thử micro</button>
          <span class="meta" id="mic-out"></span>
        </div>
      </section>

      <section class="panel">
        <h3>Cách chấm điểm</h3>
        <div class="table-wrap"><table><thead><tr><th>Phần (25 điểm)</th><th>Máy xem xét</th></tr></thead><tbody>
          <tr><td><b>Đọc từ và câu</b></td><td>So từng chữ máy nghe được với chữ cần đọc (chữ đồng âm như 他/她 vẫn tính đúng), tốc độ đọc câu, độ rõ phát âm. Chữ đọc sai được tô đỏ.</td></tr>
          <tr><td><b>Đặt câu</b></td><td>Có dùng đúng từ được cho, câu đúng cách dùng của từ, câu đủ dài, có dùng từ đã học.</td></tr>
          <tr><td><b>Nói theo chủ đề</b></td><td>Bám sát chủ đề, số chữ nói được, tốc độ, từ nối, từ vựng đã học.</td></tr>
          <tr><td><b>Trả lời theo phản xạ</b></td><td>Trả lời đúng điều được hỏi, câu đầy đủ, và <b>tốc độ phản xạ</b>: bắt đầu trả lời trong 3 giây được điểm cao nhất.</td></tr>
        </tbody></table></div>
        <p class="meta">Mỗi câu chấm trên thang 10, quy đổi ra 25 điểm cho mỗi phần, cộng lại thành điểm 100. Câu chưa làm vì hết giờ tính 0 điểm. Xếp loại: Xuất sắc ≥ 90 · Giỏi ≥ 80 · Khá ≥ 65 · Trung bình ≥ 50 · Chưa đạt &lt; 50. Điểm do máy chấm dựa trên chữ trình duyệt nghe được, chỉ để tham khảo; giáo viên nên nghe lại bản ghi âm khi cần.</p>
      </section>

      <section class="panel"><h3>Lịch sử điểm (trên máy này)</h3>
        ${hist.length ? `<div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Thí sinh</th><th>Lớp</th><th>Bài thi</th><th>Điểm</th><th>Xếp loại</th></tr></thead><tbody>${hist.map((h) =>
          `<tr><td>${new Date(h.t).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" })}</td><td>${esc(h.name || "–")}</td><td>${esc(h.lop || "–")}</td><td>${esc(h.title)}</td><td style="font-variant-numeric:tabular-nums"><b>${h.score}</b>/100</td><td>${esc(h.level)}</td></tr>`).join("")}</tbody></table></div>`
          : `<p class="meta">Chưa có lượt thi nào.</p>`}
      </section>
    </div>`;

    const set = (k, v, rerender) => { settings[k] = v; saveSettings(); if (rerender) home(); };
    $("#st-name").oninput = (e) => set("name", e.target.value.trim());
    $("#st-lop").oninput = (e) => set("lop", e.target.value.trim());
    $$("[data-type]").forEach((b) => (b.onclick = () => set("type", b.dataset.type, true)));
    $("#st-timing").onchange = (e) => set("timing", e.target.value, true);
    if (tx) $("#st-lesson").onchange = (e) => set("lesson", +e.target.value);
    else {
      $("#st-preset").onchange = (e) => {
        const p = PRESETS[e.target.value];
        settings.preset = e.target.value; if (p[0]) { settings.from = p[0]; settings.to = p[1]; }
        saveSettings(); home();
      };
      $("#st-from").onchange = (e) => { settings.from = +e.target.value; if (settings.to < settings.from) settings.to = settings.from; saveSettings(); home(); };
      $("#st-to").onchange = (e) => { settings.to = +e.target.value; if (settings.from > settings.to) settings.from = settings.to; saveSettings(); home(); };
    }
    $("#st-py").onchange = (e) => set("showPy", e.target.checked);
    $("#st-text").onchange = (e) => set("showText", e.target.checked);
    $("#st-instant").onchange = (e) => set("instant", e.target.checked);
    $("#st-rec").onchange = (e) => set("record", e.target.checked);
    $("#st-rate").onchange = (e) => set("rate", +e.target.value);
    $("#go-exam").onclick = () => {
      if (!settings.name) { $("#st-name").focus(); toast("Hãy nhập họ tên thí sinh."); return; }
      startExam();
    };
    $("#mic-test").onclick = micTest;
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
    else out.textContent = `Máy nghe được: “${r.text}”. Micro hoạt động tốt!`;
  }

  /* ---------- Tạo đề ---------- */
  const uniqBy = (arr, key) => { const seen = new Set(); return arr.filter((x) => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
  // Ưu tiên nội dung của bài đang thi, thiếu thì lấy thêm từ các bài trước
  const fill = (cur, prev, n, key) => uniqBy(shuffle(cur).concat(shuffle(prev)), key).slice(0, n);
  function splitRead(r, from) {
    const zs = r.zh.split(/(?<=[。！？])/).map((s) => s.trim()).filter(Boolean);
    const ps = r.py.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
    return zs.map((zh, i) => ({ zh, py: zs.length === ps.length ? ps[i] : "", vi: "", from }));
  }
  const sentsOf = (us) => us.flatMap((u) => u.make.map((m) => ({ zh: m.s, py: m.sp, vi: m.sv, from: u.id })).concat(splitRead(u.read, u.id)))
    .filter((s) => clean(s.zh).length >= 3);
  function startExam() {
    const B = partSec(), pl = plan(B), tx = settings.type === "tx";
    let cur, prev, title, factor;
    if (tx) {
      const u = unitById(settings.lesson);
      cur = contentOf(u); const firstId = cur[0].id;
      prev = UNITS.filter((x) => x.id < firstId && !x.review);
      title = `Thi thường xuyên · 第${u.id}课 ${u.zh}`;
      factor = 0.35; // số chữ cần nói ≈ số giây × hệ số (2 phút ≈ 42 chữ, 3 phút ≈ 63 chữ)
    } else {
      cur = UNITS.filter((x) => x.id >= settings.from && x.id <= settings.to && !x.review);
      if (!cur.length) cur = UNITS.filter((x) => x.id <= settings.to && !x.review);
      prev = [];
      const pr = PRESETS[settings.preset];
      title = `Thi định kỳ · ${pr[0] ? pr[2] : "Tuỳ chọn"} · Bài ${settings.from}–${settings.to}`;
      factor = 0.5; // định kỳ: 2 phút ≈ 60 chữ, 3 phút ≈ 90 chữ
    }
    const maxId = Math.max(...cur.map((u) => u.id));
    // Câu đọc: thi định kỳ ưu tiên câu dài hơn
    let sents = fill(sentsOf(cur), sentsOf(prev), 99, (s) => s.zh);
    if (!tx) sents = sents.filter((s) => clean(s.zh).length >= 6).concat(sents.filter((s) => clean(s.zh).length < 6));
    const words = fill(cur.flatMap((u) => u.vocab), prev.flatMap((u) => u.vocab), pl.nW, (w) => w.h);
    // Chủ đề: thường xuyên lấy chủ đề gần nhất với bài; định kỳ lấy ngẫu nhiên trong khoảng bài
    let tps = D.topics.filter((t) => t.from <= maxId);
    if (!tps.length) tps = [D.topics[0]];
    const topFrom = Math.max(...tps.map((t) => t.from));
    const minId = Math.min(...cur.map((u) => u.id));
    const tp = tx ? pick(tps.filter((t) => t.from === topFrom)) : pick(tps.filter((t) => t.from >= minId).length ? tps.filter((t) => t.from >= minId) : tps);
    const parts = [
      { key: "doc", name: "Đọc từ và câu", zh: "认读词语和句子", max: 25,
        items: words.map((w) => ({ kind: "word", data: w, cap: 6, prep: 0 })).concat(sents.slice(0, pl.nS).map((s) => ({ kind: "sent", data: s, cap: 12, prep: 1 }))) },
      { key: "dat-cau", name: "Đặt câu", zh: "造句", max: 25,
        items: fill(cur.flatMap((u) => u.make), prev.flatMap((u) => u.make), pl.nM, (m) => m.w).map((p) => ({ kind: "make", data: p, cap: 20, prep: 5 })) },
      { key: "chu-de", name: "Nói theo chủ đề", zh: "话题表达", max: 25,
        items: [{ kind: "topic", data: tp, cap: B, base: B, factor, prep: pl.prepT }] },
      { key: "phan-xa", name: "Trả lời câu hỏi theo phản xạ", zh: "快速问答", max: 25,
        items: fill(cur.flatMap((u) => u.qa), prev.flatMap((u) => u.qa), pl.nQ, (q) => q.q).map((q) => ({ kind: "qa", data: q, cap: 10, prep: 0 })) }
    ];
    parts.forEach((P) => { P.budget = B; P.used = 0; });
    stopAll();
    S = { title, type: settings.type, parts, pi: 0, ii: 0, intro: {}, started: Date.now(), name: settings.name, lop: settings.lop,
      code: String(Math.floor(1000 + Math.random() * 9000)), timing: TIMINGS[settings.timing][1] };
    if (!synth) settings.showText = true;
    countdown();
  }
  // Màn chờ trước giờ thi
  async function countdown() {
    const my = token;
    app().innerHTML = `<div class="quiz"><div class="panel hk-intro ms-gate">
      <div class="eyebrow">Phòng thi nói · Đề số ${S.code}</div>
      <h2>${esc(S.name)}${S.lop ? ` <small class="meta">· Lớp ${esc(S.lop)}</small>` : ""}</h2>
      <p>${esc(S.title)} · ${esc(S.timing)}</p>
      <ul class="ms-rules">
        <li>Bài thi có 4 phần, mỗi phần 25 điểm. Trước mỗi phần có hướng dẫn ngắn.</li>
        <li>Micro tự bật sau khi giám khảo đọc câu hỏi hoặc hết giờ chuẩn bị. Nói to, rõ, gần micro.</li>
        <li>Nói xong bấm <b>Nói xong</b> để sang câu tiếp. Hết thời gian của phần, các câu còn lại tính 0 điểm.</li>
        <li>Không tải lại trang trong lúc thi. Kết quả và phiếu điểm hiện sau khi thi xong.</li>
      </ul>
      <div class="ms-count" id="ms-count" aria-live="assertive"></div>
      <div class="row"><button class="btn primary" id="ms-go">Bắt đầu làm bài</button><button class="btn small" id="hk-quit">Huỷ</button></div>
    </div></div>`;
    $("#hk-quit").onclick = home;
    $("#ms-go").onclick = async () => {
      $("#ms-go").disabled = true;
      for (let s = 3; s > 0; s--) { $("#ms-count").textContent = s; await wait(800); if (my !== token) return; }
      showItem();
    };
    $("#ms-go").focus();
  }

  /* ---------- Giới thiệu từng phần ---------- */
  function partText(P) {
    const n = P.items.length, m = mmss(P.budget);
    switch (P.key) {
      case "doc": {
        const nw = P.items.filter((x) => x.kind === "word").length, ns = n - nw;
        return `Màn hình hiện lần lượt ${nw} từ rồi ${ns} câu. Đọc to ngay khi hiện ra: mỗi từ tối đa 6 giây (máy nghe xong tự sang từ tiếp), mỗi câu tối đa 12 giây. Tổng thời gian phần này: <b>${m}</b>.`;
      }
      case "dat-cau": return `Có ${n} từ. Mỗi từ có 5 giây suy nghĩ, sau đó nói <b>một câu hoàn chỉnh</b> có dùng từ đó (tối đa 20 giây). Tổng thời gian: <b>${m}</b>.`;
      case "chu-de": return `Bạn có ${P.items[0].prep} giây chuẩn bị với các câu gợi ý, sau đó nói liên tục về chủ đề trong tối đa <b>${m}</b>. Nói xong bấm <b>Nói xong</b>.`;
      default: return `Giám khảo hỏi ${n} câu. Nghe xong <b>trả lời ngay</b>, không có thời gian chuẩn bị (tối đa 10 giây mỗi câu). Trả lời càng nhanh, đúng, đủ câu càng được điểm cao. Tổng thời gian: <b>${m}</b>.`;
    }
  }
  function partIntro(P) {
    app().innerHTML = `<div class="quiz">
      ${topBar(P, null)}
      <div class="panel hk-intro">
        <div class="eyebrow">Phần ${S.pi + 1}/${S.parts.length} · ${P.max} điểm</div>
        <h2>${P.name} <span class="han">${P.zh}</span></h2>
        <p>${partText(P)}</p>
        ${P.items.length ? "" : `<p class="note">Bài đã chọn chưa có đề cho phần này, phần này sẽ được bỏ qua.</p>`}
        <div class="row"><button class="btn primary" id="hk-begin">Bắt đầu phần ${S.pi + 1}</button><button class="btn small" id="hk-quit">Thoát bài thi</button></div>
      </div></div>`;
    $("#hk-begin").onclick = () => { S.intro[S.pi] = true; showItem(); };
    $("#hk-quit").onclick = quit;
    $("#hk-begin").focus();
  }
  function topBar(P, it) {
    const k = it ? P.items.indexOf(it) + 1 : 0;
    const done = S.parts.slice(0, S.pi).reduce((a, x) => a + x.items.length, 0) + Math.max(0, k - 1);
    const total = S.parts.reduce((a, x) => a + x.items.length, 0) || 1;
    return `<div class="q-top"><span>Đề ${S.code} · Phần ${S.pi + 1}/${S.parts.length} · ${P.name}${it ? ` · Câu ${k}/${P.items.length}` : ""}</span>
      <span class="hk-budget" id="hk-budget">Thời gian phần này còn <b>${mmss(P.budget - P.used)}</b></span></div>
      <div class="progress"><i style="width:${(done / total) * 100}%"></i></div>`;
  }

  /* ---------- Màn một câu ---------- */
  const pyLine = (p) => (settings.showPy && p ? `<div class="mid">${esc(p)}</div>` : "");
  function promptHtml(it) {
    const d = it.data;
    if (it.kind === "word") return `<div class="ask">Đọc to từ này</div><div class="big han">${esc(d.h)}</div>${pyLine(d.p)}`;
    if (it.kind === "sent") return `<div class="ask">Đọc to câu này</div>
      <div class="ms-read han">${esc(d.zh)}</div>${settings.showPy && d.py ? `<div class="meta ms-read-py">${esc(d.py)}</div>` : ""}`;
    if (it.kind === "make") return `<div class="ask">Dùng từ sau để nói một câu hoàn chỉnh</div><div class="big han">${esc(d.w)}</div>
      <div class="mid">${esc(d.py)}</div><div>${esc(d.vi)}</div>`;
    if (it.kind === "qa") {
      const show = settings.showText;
      return `<div class="ask">考官 · Giám khảo hỏi</div>
        <div class="hk-q han">${show ? esc(d.q) : "（请听问题 · Nghe câu hỏi）"}</div>
        ${show && settings.showPy ? `<div class="meta">${esc(d.py)}</div>` : ""}
        <button class="btn small" id="hk-replay">${ICON_SPK.replace("<svg", '<svg width="16" height="16"')} Nghe lại câu hỏi</button>`;
    }
    return `<div class="ask">Nói theo chủ đề</div>
      <div class="hk-topic han">${esc(d.zh)}</div><div class="mid">${esc(d.py)}</div><div>${esc(d.vi)}</div>
      <ul class="hk-hints">${d.hints.map(([z, v]) => `<li><span class="han">${esc(z)}</span> <small>${esc(v)}</small></li>`).join("")}</ul>`;
  }
  const curPart = () => S.parts[S.pi];
  function showItem() {
    stopAll();
    const P = curPart();
    if (!P) return finish();
    if (!S.intro[S.pi]) return partIntro(P);
    const it = P.items[S.ii];
    if (!it) { S.pi++; S.ii = 0; return showItem(); }
    const left = P.budget - P.used;
    if (left < 2) {
      // Hết giờ của phần: các câu còn lại tính 0 điểm
      P.items.slice(S.ii).forEach((x) => { x.r = { res: { text: "", confs: [], dur: 0, timeout: true, skipped: true }, sc: emptyScore(x.kind, { timeout: true }) }; });
      toast(`Hết thời gian phần ${S.pi + 1}.`);
      S.pi++; S.ii = 0; return showItem();
    }
    const cap = Math.min(it.cap, Math.floor(left));
    const isRead = it.kind === "word" || it.kind === "sent";
    app().innerHTML = `<div class="quiz">
      ${topBar(P, it)}
      <div class="q-prompt hk-prompt">${promptHtml(it)}</div>
      <div class="hk-rec">
        <div class="hk-ring" id="hk-ring" style="--p:0"><button class="mic" id="hk-mic" aria-label="Bắt đầu nói">${ICON_MIC}</button></div>
        <div class="hk-time" id="hk-time">${mmss(cap)}</div>
        <div class="hk-status" id="hk-status" aria-live="polite">Chuẩn bị…</div>
        <div class="hk-live han" id="hk-live"></div>
        <div class="row" style="justify-content:center">
          <button class="btn primary small" id="hk-now" hidden>${isRead ? "Đọc ngay" : "Nói ngay"}</button>
          <button class="btn dark small" id="hk-done" hidden>${isRead ? "Đọc xong" : "Nói xong"}</button>
          <button class="btn small" id="hk-skip">Bỏ qua câu này</button>
        </div>
      </div>
      <div id="hk-fb"></div>
      <div class="row"><button class="btn small" id="hk-quit">← Thoát bài thi</button></div>
    </div>`;
    $("#hk-quit").onclick = quit;
    const replay = $("#hk-replay");
    if (replay) replay.onclick = () => { if (!live) speak(it.data.q); };
    $("#hk-skip").onclick = () => { stopAll(); save(it, { text: "", confs: [], dur: 0, firstAt: null, typed: !SR, skipped: true }); next(); };
    runItem(it, cap);
  }
  function next() { S.ii++; showItem(); }
  function quit() {
    if (S && !quit.armed) { quit.armed = true; toast("Bấm thoát lần nữa để bỏ bài thi (kết quả không được lưu)."); setTimeout(() => (quit.armed = false), 3000); return; }
    quit.armed = false; home();
  }
  function save(it, res) {
    const sc = scoreItem(it, res);
    it.r = { res, sc };
    const P = curPart(); P.used = Math.min(P.budget, P.used + (res.dur || 0));
    return sc;
  }

  async function record(it, cap) {
    const my = token, P = curPart();
    const mic = $("#hk-mic"), ring = $("#hk-ring"), tm = $("#hk-time"), st = $("#hk-status"), lv = $("#hk-live"), done = $("#hk-done");
    hush();
    mic.classList.add("on"); mic.innerHTML = ICON_STOP; mic.setAttribute("aria-label", "Nói xong");
    done.hidden = false; $("#hk-now").hidden = true; $("#hk-skip").hidden = true;
    if ($("#hk-replay")) $("#hk-replay").disabled = true;
    st.textContent = SR ? (it.kind === "word" || it.kind === "sent" ? "Đang nghe… hãy đọc to" : "Đang nghe… hãy nói bằng tiếng Trung") : "Gõ câu trả lời rồi bấm Nói xong";
    let rec = null, late = false;
    if (SR) startRecorder().then((r) => { if (!r) return; if (late) r.stop(); else rec = r; });
    const used0 = P.used;
    const onTick = (e) => {
      ring.style.setProperty("--p", (e / cap).toFixed(3));
      tm.textContent = mmss(cap - e); tm.classList.toggle("warn", cap - e <= 3);
      const b = $("#hk-budget"); if (b) b.innerHTML = `Thời gian phần này còn <b>${mmss(P.budget - used0 - e)}</b>`;
    };
    const c = SR ? capture({ maxSec: cap, onTick, onUpdate: (t) => { lv.textContent = t; }, autoStop: it.kind === "word" ? 0.6 : 0 })
      : typedCapture(lv, { maxSec: cap, onTick, placeholder: it.kind === "word" ? it.data.h : "Ví dụ: 我叫阿兰。" });
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
    if (res.fatal && res.fatal !== "restart") { st.textContent = speechMessage(res.fatal) + " Bấm micro để thử lại."; return Object.assign(res, { failed: true }); }
    st.textContent = res.text ? "Đã ghi lại." : "Không nghe thấy gì.";
    return res;
  }
  async function runItem(it, cap) {
    const my = token, st = $("#hk-status"), mic = $("#hk-mic"), now = $("#hk-now");
    if (it.kind === "qa") {
      st.textContent = "Giám khảo đang hỏi…";
      await wait(300); if (my !== token) return;
      await speak(it.data.q); if (my !== token) return;
    }
    let skip = false;
    if (it.prep > 0) {
      now.hidden = false; now.onclick = () => (skip = true); mic.onclick = () => (skip = true);
      for (let s = it.prep; s > 0 && !skip; s -= 0.25) {
        st.textContent = `Chuẩn bị: còn ${Math.ceil(s)} giây`;
        await wait(250); if (my !== token) return;
      }
      now.hidden = true;
    } else if (it.kind !== "qa") { await wait(350); if (my !== token) return; }
    const go = async () => {
      const res = await record(it, cap);
      if (!res || my !== token) return;
      if (res.failed) { mic.onclick = () => { if (!live) go(); }; return; }
      const sc = save(it, res);
      if (settings.instant) {
        $("#hk-fb").innerHTML = itemCard(it, true) + `<div class="row" style="justify-content:center;margin-top:12px">
          <button class="btn" id="hk-again">Làm lại câu này</button><button class="btn primary" id="hk-next">Câu tiếp →</button></div>`;
        $("#hk-status").textContent = `Điểm câu này: ${sc.score}/10`;
        $("#hk-again").onclick = () => { const P = curPart(); P.used = Math.max(0, P.used - (res.dur || 0)); it.r = null; showItem(); };
        $("#hk-next").onclick = next;
        $("#hk-next").focus();
        return;
      }
      await wait(it.kind === "word" ? 250 : 600);
      if (my === token) next();
    };
    go();
  }

  /* ---------- Kết quả ---------- */
  function markTarget(target, ok) {
    let k = 0;
    return Array.from(target).map((c) => {
      if (!isHan(c)) return esc(c);
      return `<span class="${ok[k++] ? "ms-ok" : "ms-miss"}">${esc(c)}</span>`;
    }).join("");
  }
  function highlight(text, words) {
    const ws = Array.from(new Set(words.filter(Boolean))).sort((a, b) => b.length - a.length);
    if (!ws.length) return esc(text);
    const re = new RegExp("(" + ws.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "g");
    return esc(text).replace(re, "<mark>$1</mark>");
  }
  function itemCard(it, open) {
    const { res, sc } = it.r, d = it.data;
    let head = "", sample = "";
    if (it.kind === "word") { head = `<span class="han">${esc(d.h)}</span> <small class="meta">${esc(d.p)} · ${esc(d.v)}</small>`; sample = `<div class="hk-sample">${spkBtn(d.h, "từ")}<div><div class="han">${sc.ok ? markTarget(d.h, sc.ok) : esc(d.h)}</div><div>${esc(d.p)}</div></div></div>`; }
    else if (it.kind === "sent") { head = `<span class="han">${esc(d.zh.length > 22 ? d.zh.slice(0, 20) + "…" : d.zh)}</span>`; sample = `<div class="hk-sample">${spkBtn(d.zh, "câu")}<div><div class="han ms-read-r">${sc.ok ? markTarget(d.zh, sc.ok) : esc(d.zh)}</div>${d.py ? `<div>${esc(d.py)}</div>` : ""}${d.vi ? `<div class="meta">${esc(d.vi)}</div>` : ""}</div></div>`; }
    else if (it.kind === "make") { head = `<span class="han">${esc(d.w)}</span> <small class="meta">${esc(d.vi)}</small>`; sample = `<div class="hk-sample">${spkBtn(d.s, "câu mẫu")}<div><div class="han">${esc(d.s)}</div><div>${esc(d.sp)}</div><div class="meta">${esc(d.sv)}</div></div></div>`; }
    else if (it.kind === "qa") { head = `<span class="han">${esc(d.q)}</span> <small class="meta">${esc(d.vi)}</small>`; sample = `<div class="hk-sample">${spkBtn(d.a, "câu mẫu")}<div><div class="han">${esc(d.a)}</div><div class="meta">${esc(d.av)}</div></div></div>`; }
    else { head = `<span class="han">${esc(d.zh)}</span> <small class="meta">${esc(d.vi)}</small>`; sample = `<div class="hk-sample">${spkBtn(d.s, "bài mẫu")}<div><div class="han">${esc(d.s)}</div><div class="meta">${esc(d.sv)}</div></div></div>`; }
    const pct = sc.score * 10, cls = pct >= 75 ? "ok" : pct >= 50 ? "mid" : "no";
    const crit = Object.keys(CRIT).filter((k) => sc.crit[k] != null && W[it.kind][k] != null).map((k) =>
      `<div class="hk-crit"><span>${CRIT[k]}</span><div class="progress"><i style="width:${Math.round(sc.crit[k] * 100)}%"></i></div><b>${Math.round(sc.crit[k] * 100)}</b></div>`).join("");
    const isRead = it.kind === "word" || it.kind === "sent";
    const sampleTitle = isRead ? "Cần đọc (chữ xanh: đọc đúng · chữ đỏ: máy chưa nghe đúng)" : it.kind === "topic" ? "Bài nói mẫu" : "Câu mẫu";
    return `<details class="hk-item ${cls}" ${open ? "open" : ""}>
      <summary><span class="hk-pill ${cls}">${sc.score}/10</span><span class="hk-item-h">${head}</span></summary>
      <div class="hk-item-b">
        <div><div class="ask">Bạn ${isRead ? "đọc" : "nói"}${res.typed ? " (gõ chữ)" : ""}${res.dur ? ` · ${Math.round(res.dur)} giây` : ""}${sc.n ? ` · ${sc.n} chữ` : ""}${sc.cpm ? ` · ${sc.cpm} chữ/phút` : ""}</div>
          <div class="hk-said han">${res.timeout ? "<i class='meta'>(hết giờ)</i>" : res.skipped ? "<i class='meta'>(bỏ qua)</i>" : res.text ? highlight(res.text, (sc.marks || []).concat(sc.used || [])) : "<i class='meta'>(không nghe được)</i>"}</div>
          ${res.audio ? `<audio controls src="${res.audio}" preload="none"></audio>` : ""}</div>
        ${crit ? `<div class="hk-crits">${crit}</div>` : ""}
        ${sc.good.length ? `<ul class="hk-good">${sc.good.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : ""}
        ${sc.issues.length ? `<ul class="hk-bad">${sc.issues.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : ""}
        <div><div class="ask">${sampleTitle}</div>${sample}</div>
      </div></details>`;
  }
  function finish() {
    stopAll();
    const parts = S.parts.filter((P) => P.items.length).map((P) => {
      P.items.forEach((it) => { if (!it.r) it.r = { res: { text: "", confs: [], dur: 0, skipped: true }, sc: emptyScore(it.kind, { skipped: true }) }; });
      const avg = P.items.reduce((a, it) => a + it.r.sc.score, 0) / P.items.length;
      return { P, avg, pts: Math.round((avg / 10) * P.max * 10) / 10 };
    });
    // phần không có đề thì chia lại điểm cho các phần còn lại
    const maxSum = parts.reduce((a, p) => a + p.P.max, 0) || 100;
    const total = Math.round((parts.reduce((a, p) => a + p.pts, 0) / maxSum) * 100);
    const all = parts.flatMap((p) => p.P.items);
    const crit = {};
    Object.keys(CRIT).forEach((k) => { const v = all.map((it) => it.r.sc.crit[k]).filter((x) => x != null); if (v.length) crit[k] = v.reduce((a, b) => a + b, 0) / v.length; });
    const weak = Object.keys(crit).sort((a, b) => crit[a] - crit[b]).filter((k) => crit[k] < 0.75).slice(0, 2);
    const [lv, lvText] = level(total);
    const spoken = parts.reduce((a, p) => a + p.P.used, 0);
    const wrongWords = all.filter((it) => it.kind === "word" && it.r.sc.score < 10).map((it) => it.data);
    const h = store.get("history", []);
    h.push({ t: Date.now(), name: S.name, lop: S.lop, title: S.title, score: total, level: lv });
    store.set("history", h.slice(-100));
    const date = new Date().toLocaleString("vi-VN", { dateStyle: "full", timeStyle: "short" });
    app().innerHTML = `<div class="page">
      <section class="panel hk-result ms-sheet">
        <div class="ms-sheet-head">
          <div><div class="eyebrow">Phiếu kết quả thi nói · 口语考试成绩单</div>
            <h1>${total}<small>/100 điểm</small></h1></div>
          <span class="hk-pill ${total >= 80 ? "ok" : total >= 50 ? "mid" : "no"} ms-level">${lv}</span>
        </div>
        <dl class="ms-info">
          <div><dt>Thí sinh</dt><dd><b>${esc(S.name)}</b></dd></div>
          <div><dt>Lớp</dt><dd>${esc(S.lop || "–")}</dd></div>
          <div><dt>Bài thi</dt><dd>${esc(S.title)}</dd></div>
          <div><dt>Đề số</dt><dd>${S.code}</dd></div>
          <div><dt>Giáo trình</dt><dd class="han">${esc(D.book)}</dd></div>
          <div><dt>Thời gian</dt><dd>${esc(S.timing)} · đã nói ${mmss(spoken)}</dd></div>
          <div><dt>Ngày thi</dt><dd>${date}</dd></div>
          <div><dt>Quy đổi thang 10</dt><dd><b>${(total / 10).toFixed(1)}</b></dd></div>
        </dl>
        <p class="lead">${lvText}</p>
        <div class="table-wrap"><table class="ms-scores"><thead><tr><th>Phần thi</th><th>Số câu</th><th>Điểm</th><th></th></tr></thead><tbody>
          ${parts.map((p, i) => `<tr><td><b>${i + 1}. ${p.P.name}</b> <span class="han meta">${p.P.zh}</span></td><td>${p.P.items.length}</td><td style="font-variant-numeric:tabular-nums"><b>${p.pts}</b>/${p.P.max}</td>
            <td style="min-width:120px"><div class="progress"><i style="width:${(p.avg / 10) * 100}%"></i></div></td></tr>`).join("")}
          <tr><td colspan="2"><b>Tổng điểm</b></td><td><b>${total}</b>/100</td><td></td></tr>
        </tbody></table></div>
        <h3>Theo tiêu chí</h3>
        <div class="hk-crits">${Object.keys(crit).map((k) => `<div class="hk-crit"><span>${CRIT[k]}</span><div class="progress"><i style="width:${Math.round(crit[k] * 100)}%"></i></div><b>${Math.round(crit[k] * 100)}</b></div>`).join("")}</div>
        ${weak.length ? `<div class="note"><b>Cần cải thiện:</b><ul>${weak.map((k) => `<li>${ADVICE[k]}</li>`).join("")}</ul></div>` : `<div class="note jade">Các tiêu chí đều tốt. Hãy thử bài thi tiếp theo!</div>`}
        ${wrongWords.length ? `<div><h3>Từ cần luyện đọc lại</h3><div class="ms-words">${wrongWords.map((w) => `<button class="chip" data-say="${esc(w.h)}"><b class="han">${esc(w.h)}</b><small>${esc(w.p)} · ${esc(w.v)}</small></button>`).join("")}</div></div>` : ""}
        <div class="ms-sign"><div>Giáo viên chấm<br><small>(ký, ghi rõ họ tên)</small></div><div>Thí sinh<br><small>(ký)</small></div></div>
        <div class="row hk-noprint">
          <button class="btn primary" id="hk-retry">Thi đề mới</button>
          <button class="btn" id="hk-print">In / lưu PDF phiếu điểm</button>
          <button class="btn" id="hk-home">Về trang đầu</button>
        </div>
      </section>
      ${parts.map((p, i) => `<section class="page" style="gap:10px"><h2>Phần ${i + 1}. ${p.P.name} <span class="han meta">${p.P.zh}</span> <small class="meta">${p.pts}/${p.P.max} điểm</small></h2>
        ${p.P.items.map((it) => itemCard(it, false)).join("")}</section>`).join("")}
    </div>`;
    $("#hk-retry").onclick = startExam;
    $("#hk-home").onclick = home;
    $("#hk-print").onclick = () => { $$("details.hk-item").forEach((d) => (d.open = true)); window.print(); };
    window.scrollTo(0, 0);
  }

  /* ---------- Khởi động ---------- */
  window.addEventListener("beforeunload", () => { stopAll(); releaseMic(); });
  window.THI_TEST = { scoreWord, scoreSent, scoreMake, scoreQA, scoreTopic, clean, align, eq, numHan };
  home();
})();
