/* Tiếng Trung Thanh Hoa-Hà Giang - Msutong · ứng dụng một trang, không cần build. */
(function () {
  "use strict";

  /* ---------- Tiện ích ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("msut:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("msut:" + k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } }
  };
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }
  const ICON_SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  const spkBtn = (text, label) => `<button class="spk" data-say="${esc(text)}" aria-label="Nghe ${esc(label || text)}" title="Nghe">${ICON_SPK}</button>`;

  /* ---------- Dữ liệu ---------- */
  function parseWords(block, src, lesson) {
    return block.trim().split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
      const [h, p, v] = l.split("|").map((x) => (x || "").trim());
      return { h, p, v, src, lesson };
    });
  }
  const COURSES = [
    { key: "ms1", name: "Msutong 1", book: "速通汉语 初级 1", route: "bai", data: window.MSUTONG },
    { key: "ms2", name: "Msutong 2", book: "速通汉语 初级 2", route: "bai2", data: window.MSUTONG2 }
  ].map((c) => {
    const lessons = c.data.lessons.map((L) => {
      const vocab = parseWords(L.words, c.key, L.id);
      const names = parseWords(L.names || "", c.key, L.id).map((w) => ({ ...w, name: true }));
      return { ...L, vocab, names, words: vocab.concat(names) };
    });
    return { ...c, lessons, total: lessons.reduce((n, L) => n + L.words.length, 0) };
  });
  // "ms" là khoá cũ của bản chỉ có Msutong 1
  const courseOf = (key) => COURSES.find((c) => c.key === key) || COURSES[0];
  function customLessons() {
    return store.get("customLessons", []).map((L, i) => ({
      id: "u" + i, title: L.title, custom: true, words: parseWords(L.words, "tu", "u" + i)
    }));
  }
  const allWords = () => COURSES.flatMap((c) => c.lessons.flatMap((L) => L.words));
  const TOTAL = allWords().length;

  /* ---------- Pinyin ---------- */
  const MARKS = { "̄": 1, "́": 2, "̌": 3, "̀": 4 };
  const MARK_OF = { 1: "̄", 2: "́", 3: "̌", 4: "̀" };
  function toneOf(syl) {
    const d = syl.normalize("NFD");
    for (const ch of d) if (MARKS[ch]) return MARKS[ch];
    return 0;
  }
  function bare(syl) { return syl.normalize("NFD").replace(/[̀́̄̌]/g, "").normalize("NFC"); }
  function setTone(syl, t) {
    const b = bare(syl);
    if (!t) return b;
    const low = b.toLowerCase();
    let idx = low.indexOf("a");
    if (idx < 0) idx = low.indexOf("e");
    if (idx < 0 && low.includes("ou")) idx = low.indexOf("o");
    if (idx < 0) { for (let i = low.length - 1; i >= 0; i--) if ("iouü".includes(low[i])) { idx = i; break; } }
    if (idx < 0) return b;
    return (b.slice(0, idx + 1) + MARK_OF[t] + b.slice(idx + 1)).normalize("NFC");
  }
  const syls = (p) => p.split(/\s+/).filter(Boolean);
  const joinPy = (p) => syls(p).join("");
  function colorPy(p) {
    return syls(p).map((s) => `<span class="tone${toneOf(s)}">${esc(s)}</span>`).join(" ");
  }
  function pinyinDistractors(p, n) {
    const ss = syls(p), out = new Set([ss.join(" ")]);
    let guard = 0;
    while (out.size < n + 1 && guard++ < 60) {
      const copy = ss.slice();
      const i = Math.floor(Math.random() * copy.length);
      const cur = toneOf(copy[i]);
      const choices = [1, 2, 3, 4].filter((t) => t !== cur);
      copy[i] = setTone(copy[i], pick(choices));
      if (ss.length > 1 && Math.random() < .4) { const j = Math.floor(Math.random() * copy.length); copy[j] = setTone(copy[j], pick([1, 2, 3, 4])); }
      out.add(copy.join(" "));
    }
    out.delete(ss.join(" "));
    return Array.from(out).slice(0, n);
  }
  const TONE_NAMES = { 0: "nhẹ", 1: "1", 2: "2", 3: "3", 4: "4" };

  /* ---------- Đọc to (Web Speech) ---------- */
  let zhVoice = null;
  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    const vs = speechSynthesis.getVoices();
    zhVoice = vs.find((v) => /zh[-_]CN/i.test(v.lang)) || vs.find((v) => /^zh/i.test(v.lang)) || null;
  }
  if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function say(text, rate) {
    if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ đọc to."); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN"; if (zhVoice) u.voice = zhVoice;
    u.rate = rate || store.get("rate", 0.85);
    speechSynthesis.speak(u);
    if (!zhVoice && speechSynthesis.getVoices().length && !say.warned) { say.warned = true; toast("Máy chưa có giọng tiếng Trung, âm đọc có thể chưa chuẩn."); }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-say]");
    if (b) { e.preventDefault(); say(b.dataset.say); }
  });

  /* ---------- Nhận dạng giọng nói ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function listen() {
    return new Promise((resolve, reject) => {
      if (!SR) return reject(new Error("unsupported"));
      const r = new SR();
      r.lang = "zh-CN"; r.interimResults = false; r.maxAlternatives = 5;
      let done = false;
      r.onresult = (ev) => { done = true; resolve(Array.from(ev.results[0]).map((a) => a.transcript)); };
      r.onerror = (ev) => { done = true; reject(new Error(ev.error || "error")); };
      r.onend = () => { if (!done) resolve([]); };
      try { r.start(); } catch (err) { reject(err); }
    });
  }
  const cleanZh = (s) => s.replace(/[\s，。！？、,.!?…—\-]/g, "");
  function speechMessage(err) {
    if (err.message === "unsupported") return "Trình duyệt này chưa hỗ trợ nhận giọng nói. Hãy dùng Chrome hoặc Edge trên máy tính hoặc Android.";
    if (err.message === "not-allowed" || err.message === "service-not-allowed") return "Chưa được dùng micro. Hãy cho phép micro cho trang này rồi thử lại.";
    if (err.message === "no-speech") return "Không nghe thấy tiếng. Hãy nói gần micro hơn.";
    return "Không nhận được giọng nói (" + err.message + "). Thử lại nhé.";
  }

  /* ---------- Ghi nhớ (hộp Leitner) ---------- */
  const srs = {
    all() { return store.get("srs", {}); },
    box(h) { return (this.all()[h] || {}).b || 0; },
    set(h, b) { const a = this.all(); a[h] = { b, t: Date.now() }; store.set("srs", a); },
    learned() { return Object.values(this.all()).filter((x) => x.b >= 3).length; }
  };

  /* ---------- Định tuyến ---------- */
  const routes = {};
  const view = () => $("#view");
  let pending = null; // trạng thái chuyển giữa trang (vd. mở thi với bài đã chọn)
  function go(hash, state) { pending = state || null; if (location.hash === "#" + hash) render(); else location.hash = hash; }
  function render() {
    const h = (location.hash || "#trang-chu").slice(1);
    const [name, arg] = h.split(/-(?=\d+$)/);
    const fn = routes[name] || routes["trang-chu"];
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    view().innerHTML = "";
    fn(view(), arg);
    $$(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + name || (/^bai/.test(name) && a.getAttribute("href") === "#khoa-hoc")));
    $(".nav").classList.remove("open");
    pending = null;
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);

  /* ---------- Trang chủ ---------- */
  routes["trang-chu"] = (root) => {
    const words = allWords().filter((w) => !w.name);
    const day = Math.floor(Date.now() / 864e5);
    const w = words[day % words.length], wc = courseOf(w.src);
    root.innerHTML = `
      <div class="page">
        <section class="hero">
          <div class="page-head" style="gap:16px">
            <div class="eyebrow">Học tiếng Trung từ con số 0</div>
            <h1>Tiếng Trung <span>Thanh Hoa-Hà Giang</span> - Msutong</h1>
            <p class="lead">Học trọn ${TOTAL} từ của hai khoá Msutong 1 và Msutong 2 (theo giáo trình 速通汉语 初级 1–2), lật flashcard để nhớ lâu, luyện tai phân biệt thanh điệu và pinyin, rồi tự kiểm tra từng bài.</p>
            <div class="row">
              <a class="btn primary" href="#khoa-hoc">Bắt đầu học</a>
              <a class="btn" href="#phat-am">Luyện phát âm</a>
            </div>
            <div class="stats">
              ${COURSES.map((c) => `<div class="stat"><b>${c.total}</b><span>từ ${c.name}</span></div>`).join("")}
              <div class="stat"><b id="st-learned">${srs.learned()}</b><span>từ bạn đã thuộc</span></div>
            </div>
          </div>
          <div class="hero-word">
            <div class="eyebrow">Từ của hôm nay</div>
            <div class="big">${esc(w.h)}</div>
            <div class="py">${colorPy(w.p)}</div>
            <div>${esc(w.v)}</div>
            <div class="row" style="justify-content:center;margin-top:6px">
              <button class="btn small dark" data-say="${esc(w.h)}">${ICON_SPK.replace("<svg", '<svg width="16" height="16"')} Nghe đọc</button>
              <a class="btn small" href="#${wc.route}-${w.lesson}">${wc.name} · Bài ${w.lesson}</a>
            </div>
          </div>
        </section>

        <section class="page" style="gap:14px">
          <h2>Học gì ở đây</h2>
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr))">
            ${feature("#khoa-hoc", "Khoá Msutong 1 và 2", `${COURSES.reduce((n, c) => n + c.lessons.length, 0)} bài, ${TOTAL} từ, câu mẫu có pinyin và nghĩa tiếng Việt.`, "课程")}
            ${feature("#flashcard", "Flashcard ghi nhớ", "Lật thẻ, chấm “nhớ / chưa nhớ”, máy tự đưa từ khó lên trước.", "卡片")}
            ${feature("#phat-am", "Phát âm và pinyin", "Nghe 4 thanh, phân biệt zh/z, an/ang, u/ü…, luyện nói với micro.", "发音")}
            ${feature("#thi", "Kiểm tra", "Thi nhớ từ, nghe, thanh điệu và thi nói theo từng bài.", "考试")}
            ${feature("#tra-tu", "Tra từ và tiến độ", "Tìm nhanh từ theo chữ Hán, pinyin hoặc nghĩa; xem bài nào đã thuộc.", "词典")}
          </div>
        </section>

        <section class="panel">
          <h3>Bốn thanh điệu tô màu thế nào</h3>
          <p class="lead">Trên toàn trang, pinyin được tô theo thanh: <b class="tone1">thanh 1 (mā)</b>, <b class="tone2">thanh 2 (má)</b>, <b class="tone3">thanh 3 (mǎ)</b>, <b class="tone4">thanh 4 (mà)</b>, <b class="tone0">thanh nhẹ (ma)</b>. Nhìn màu là biết giọng lên hay xuống.</p>
        </section>
      </div>`;
  };
  function feature(href, title, desc, zh) {
    return `<a class="card" href="${href}"><span class="tag red han">${zh}</span><h3>${title}</h3><p class="meta">${desc}</p><span class="go">Vào học →</span></a>`;
  }

  /* ---------- Tra từ và tiến độ ---------- */
  const fold = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/ü/g, "v");
  routes["tra-tu"] = (root) => {
    const all = allWords();
    root.innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">查词典</div><h1>Tra từ và tiến độ học</h1>
      <p class="lead">Gõ chữ Hán, pinyin (có dấu hoặc không, ví dụ <code>xihuan</code>) hoặc nghĩa tiếng Việt để tìm trong cả hai khoá.</p></div>
      <div class="panel"><div class="row">
        <label class="field" style="flex:1 1 260px">Tìm từ<input type="search" id="tt-q" placeholder="Ví dụ: 喜欢, xihuan, thích" autocomplete="off"></label>
        <label class="field">Khoá<select id="tt-c"><option value="all">Cả hai khoá</option>${COURSES.map((c) => `<option value="${c.key}">${c.name}</option>`).join("")}</select></label>
      </div></div>
      <div id="tt-res"></div>
    </div>`;
    const q = $("#tt-q"), c = $("#tt-c"), res = $("#tt-res");
    const show = () => {
      const k = fold(q.value.trim()), kp = k.replace(/\s+/g, "");
      if (!k) { res.innerHTML = progressHtml(c.value); return; }
      const hits = all.filter((w) => (c.value === "all" || w.src === c.value) &&
        (w.h.includes(q.value.trim()) || fold(w.p).replace(/\s+/g, "").includes(kp) || fold(w.v).includes(k)));
      res.innerHTML = hits.length
        ? `<p class="meta">Tìm thấy ${hits.length} từ${hits.length > 80 ? ", hiện 80 từ đầu" : ""}.</p><div class="words">${hits.slice(0, 80).map((w) => {
            const wc = courseOf(w.src);
            return wordRow(w).replace('<div class="v">', `<div class="v"><a class="tag" href="#${wc.route}-${w.lesson}" style="margin-right:6px">${wc.name} · B${w.lesson}</a>`);
          }).join("")}</div>`
        : `<div class="note">Không tìm thấy từ nào khớp “${esc(q.value)}”.</div>`;
    };
    q.oninput = show; c.onchange = show; show(); q.focus();
  };
  function progressHtml(only) {
    const best = store.get("best", {});
    return COURSES.filter((c) => only === "all" || c.key === only).map((c) => {
      const rows = c.lessons.map((L) => {
        const learned = L.words.filter((w) => srs.box(w.h) >= 3).length, b = best[c.key + ":" + L.id];
        const pct = Math.round((learned / L.words.length) * 100);
        return `<tr><td><a href="#${c.route}-${L.id}">Bài ${L.id}: ${esc(L.title)}</a></td>
          <td style="min-width:140px"><div class="progress" title="${pct}%"><i style="width:${pct}%"></i></div></td>
          <td style="font-variant-numeric:tabular-nums">${learned}/${L.words.length}</td><td style="font-variant-numeric:tabular-nums">${b != null ? b + "%" : "–"}</td></tr>`;
      }).join("");
      const done = c.lessons.flatMap((L) => L.words).filter((w) => srs.box(w.h) >= 3).length;
      return `<section class="panel"><h3>${c.name}: đã thuộc ${done}/${c.total} từ</h3>
        <div class="table-wrap"><table><thead><tr><th>Bài</th><th>Tiến độ</th><th>Đã thuộc</th><th>Điểm thi cao nhất</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
    }).join("") + `<p class="meta">Một từ được tính là đã thuộc khi lên hộp 3 trong flashcard.</p>`;
  }

  /* ---------- Khoá học ---------- */
  routes["khoa-hoc"] = (root) => {
    const best = store.get("best", {});
    root.innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">速通汉语 初级</div><h1>Khoá học Msutong</h1>
      <p class="lead">${TOTAL} từ mới của hai khoá, lấy theo bảng từ vựng của giáo trình. Mỗi bài có danh sách từ đọc mẫu, câu ví dụ, flashcard và bài kiểm tra nhanh.</p>
      <div class="row">${COURSES.map((c) => `<a class="btn small" href="#khoa-hoc" data-jump="${c.key}">${c.name}</a>`).join("")}</div></div>
      ${COURSES.map((c) => `<section class="page" style="gap:14px" id="kh-${c.key}"><h2>${c.name} <span class="han meta">${c.book}</span></h2>
      <div class="grid">${c.lessons.map((L) => {
        const learned = L.words.filter((w) => srs.box(w.h) >= 3).length;
        const b = best[c.key + ":" + L.id];
        return `<a class="card" href="#${c.route}-${L.id}">
          <div class="row" style="justify-content:space-between"><span class="tag">Bài ${L.id}</span><span class="han meta">${esc(L.zh)}</span></div>
          <h3>${esc(L.title)}</h3>
          <p class="han" style="font-size:1.3rem">${L.words.slice(0, 5).map((w) => esc(w.h)).join(" · ")}</p>
          <p class="meta">${L.words.length} từ · đã thuộc ${learned}${b != null ? ` · điểm thi cao nhất ${b}%` : ""}</p>
        </a>`;
      }).join("")}</div></section>`).join("")}
    </div>`;
    $$("[data-jump]").forEach((a) => (a.onclick = (e) => { e.preventDefault(); $("#kh-" + a.dataset.jump).scrollIntoView({ behavior: "smooth" }); }));
  };
  function lessonPage(c) {
    return (root, arg) => {
      const L = c.lessons.find((x) => String(x.id) === String(arg)) || c.lessons[0];
      root.innerHTML = `<div class="page">
        <div class="page-head">
          <a href="#khoa-hoc" class="meta">← Tất cả bài</a>
          <div class="eyebrow">${c.name} · Bài ${L.id} · <span class="han">${esc(L.zh)}</span></div>
          <h1>${esc(L.title)}</h1>
          <div class="row">
            <button class="btn primary" id="b-fc">Học bằng flashcard</button>
            <button class="btn dark" id="b-quiz">Kiểm tra bài này</button>
            <button class="btn" id="b-say">Luyện nói bài này</button>
            <button class="btn" data-say="${esc(L.words.map((w) => w.h).join("，"))}">Nghe cả bài</button>
          </div>
        </div>
        <section class="page" style="gap:12px"><h2>Từ mới (${L.vocab.length})</h2>
          <div class="words">${L.vocab.map(wordRow).join("")}</div></section>
        ${L.names.length ? `<section class="page" style="gap:12px"><h2>Tên riêng (${L.names.length})</h2>
          <div class="words">${L.names.map(wordRow).join("")}</div></section>` : ""}
        ${L.sentences && L.sentences.length ? `<section class="panel"><h2>Câu mẫu</h2>
          ${L.sentences.map(([zh, py, vi]) => `<div class="sentence">${spkBtn(zh, "câu")}<div><div class="zh">${esc(zh)}</div><div>${esc(py)}</div><div class="vi">${esc(vi)}</div></div></div>`).join("")}
        </section>` : ""}
        <div class="row" style="justify-content:space-between">
          ${L.id > 1 ? `<a class="btn" href="#${c.route}-${L.id - 1}">← Bài ${L.id - 1}</a>` : "<span></span>"}
          ${L.id < c.lessons.length ? `<a class="btn" href="#${c.route}-${L.id + 1}">Bài ${L.id + 1} →</a>` : ""}
        </div>
      </div>`;
      $("#b-fc").onclick = () => go("flashcard", { src: c.key, lesson: String(L.id) });
      $("#b-quiz").onclick = () => go("thi", { src: c.key, lesson: String(L.id), autostart: true });
      $("#b-say").onclick = () => { store.set("spSel", { src: c.key, lesson: String(L.id) }); store.set("paTab", "noi"); go("phat-am"); };
    };
  }
  COURSES.forEach((c) => (routes[c.route] = lessonPage(c)));
  function wordRow(w) {
    return `<div class="word"><div class="h">${esc(w.h)}</div><div class="info"><div class="p">${colorPy(w.p)}</div><div class="v">${esc(w.v)}</div></div>${spkBtn(w.h)}</div>`;
  }

  /* ---------- Chọn bộ từ (dùng chung cho flashcard, phát âm và thi) ---------- */
  function deckPicker(prefix, sel) {
    const custom = customLessons();
    const src = sel.src === "tu" && custom.length ? "tu" : courseOf(sel.src).key;
    const lessonsFor = (s) => s === "tu"
      ? [["all", "Tất cả bộ tự nhập"]].concat(custom.map((L) => [String(L.id), "★ " + L.title]))
      : [["all", `Cả ${courseOf(s).lessons.length} bài`]].concat(courseOf(s).lessons.map((L) => [String(L.id), `Bài ${L.id}: ${L.title}`]));
    return {
      html: `<label class="field">Giáo trình<select id="${prefix}-src">
          ${COURSES.map((c) => `<option value="${c.key}"${src === c.key ? " selected" : ""}>${c.name}</option>`).join("")}
          ${custom.length ? `<option value="tu"${src === "tu" ? " selected" : ""}>Bộ tự nhập</option>` : ""}</select></label>
        <label class="field">Bài<select id="${prefix}-lesson"></select></label>`,
      bind(onChange) {
        const s = $("#" + prefix + "-src"), l = $("#" + prefix + "-lesson");
        const fill = (keep) => {
          l.innerHTML = lessonsFor(s.value).map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join("");
          if (keep && $$("option", l).some((o) => o.value === keep)) l.value = keep;
        };
        fill(sel.lesson);
        s.onchange = () => { fill(); onChange && onChange(); };
        l.onchange = () => onChange && onChange();
      },
      value() { return { src: $("#" + prefix + "-src").value, lesson: $("#" + prefix + "-lesson").value }; }
    };
  }
  function wordsFor({ src, lesson }) {
    const lessons = src === "tu" ? customLessons() : courseOf(src).lessons;
    const ls = lesson === "all" ? lessons : lessons.filter((L) => String(L.id) === String(lesson));
    return ls.flatMap((L) => L.words);
  }

  /* ---------- Flashcard ---------- */
  routes["flashcard"] = (root) => {
    const sel = pending || store.get("fcSel", { src: "ms1", lesson: "1" });
    const picker = deckPicker("fc", sel);
    root.innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">记忆卡片</div><h1>Flashcard ghi nhớ từ vựng</h1>
      <p class="lead">Chạm vào thẻ để lật. Chấm “Nhớ rồi” thì thẻ lên hộp cao hơn và ít gặp lại; “Chưa nhớ” thì thẻ quay về hộp 0 và gặp lại ngay trong lượt.</p></div>
      <div class="panel">
        <div class="row">${picker.html}
          <label class="field">Mặt trước<select id="fc-face">
            <option value="h">Chữ Hán</option><option value="v">Nghĩa tiếng Việt</option><option value="a">Nghe âm</option></select></label>
        </div>
      </div>
      <div class="fc-wrap" id="fc-area"></div>
    </div>`;
    $("#fc-face").value = store.get("fcFace", "h");
    let queue = [], cur = null, deck = [];
    const area = $("#fc-area");
    function start() {
      const v = picker.value(); store.set("fcSel", v);
      deck = wordsFor(v);
      // từ ở hộp thấp lên trước, trong cùng hộp thì xáo trộn
      queue = shuffle(deck).sort((a, b) => srs.box(a.h) - srs.box(b.h));
      next();
    }
    function boxes() {
      const c = [0, 0, 0, 0, 0, 0];
      deck.forEach((w) => c[Math.min(5, srs.box(w.h))]++);
      return `<div class="boxes">${c.map((n, i) => `<span>Hộp ${i}: ${n}</span>`).join("")}</div>`;
    }
    function next() {
      cur = queue.shift();
      if (!cur) {
        area.innerHTML = `<div class="panel" style="text-align:center;justify-items:center"><h2>Xong lượt này!</h2>
          <p class="lead">Bạn đã đi hết ${deck.length} thẻ. ${deck.filter((w) => srs.box(w.h) >= 3).length} từ đã ở hộp 3 trở lên.</p>
          ${boxes()}<div class="row"><button class="btn primary" id="fc-again">Học lại lượt mới</button><button class="btn" id="fc-test">Làm bài thi bộ này</button></div></div>`;
        $("#fc-again").onclick = start;
        $("#fc-test").onclick = () => go("thi", { ...picker.value(), autostart: true });
        return;
      }
      const face = $("#fc-face").value;
      const front = face === "v" ? `<div class="vi" style="font-size:1.6rem;font-weight:700">${esc(cur.v)}</div>`
        : face === "a" ? `<div class="big" aria-hidden="true">？</div><div class="hint">Nghe rồi đoán từ</div>`
        : `<div class="big">${esc(cur.h)}</div>`;
      area.innerHTML = `
        <div class="meta" style="font-variant-numeric:tabular-nums">Còn ${queue.length + 1} thẻ · hộp hiện tại ${srs.box(cur.h)}</div>
        <button class="fc" id="fc" aria-label="Lật thẻ">
          <div class="fc-in">
            <div class="fc-face">${front}<div class="hint">Chạm để lật</div></div>
            <div class="fc-face back"><div class="big">${esc(cur.h)}</div><div class="py">${colorPy(cur.p)}</div><div class="vi">${esc(cur.v)}</div></div>
          </div>
        </button>
        <div class="row" style="justify-content:center">
          ${spkBtn(cur.h)}
          <button class="btn" id="fc-no">Chưa nhớ</button>
          <button class="btn" id="fc-hard">Hơi khó</button>
          <button class="btn primary" id="fc-yes">Nhớ rồi</button>
        </div>
        ${boxes()}`;
      if (face === "a") say(cur.h);
      $("#fc").onclick = () => { const f = $("#fc"); f.classList.toggle("flip"); if (f.classList.contains("flip")) say(cur.h); };
      $("#fc-no").onclick = () => { srs.set(cur.h, 0); queue.splice(Math.min(3, queue.length), 0, cur); next(); };
      $("#fc-hard").onclick = () => { srs.set(cur.h, Math.max(1, srs.box(cur.h))); queue.push(cur); next(); };
      $("#fc-yes").onclick = () => { srs.set(cur.h, Math.min(5, srs.box(cur.h) + 1)); next(); };
    }
    picker.bind(start);
    $("#fc-face").onchange = () => { store.set("fcFace", $("#fc-face").value); if (cur) { queue.unshift(cur); next(); } };
    start();
  };

  /* ---------- Phát âm ---------- */
  routes["phat-am"] = (root) => {
    const tabs = [["thanh", "Bốn thanh điệu"], ["phan-biet", "Phân biệt pinyin"], ["theo-bai", "Pinyin theo bài"], ["ket-hop", "Kết hợp thanh"], ["bang", "Bảng thanh mẫu · vận mẫu"], ["noi", "Luyện nói"]];
    const active = store.get("paTab", "thanh");
    root.innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">发音练习</div><h1>Luyện phát âm và pinyin</h1>
      <p class="lead">Máy đọc bằng giọng tiếng Trung của trình duyệt. Hãy đeo tai nghe và nghe mỗi câu 2–3 lần trước khi chọn.</p>
      <div class="row"><label class="field" style="grid-auto-flow:column;align-items:center;gap:10px">Tốc độ đọc
        <input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${store.get("rate", 0.85)}"></label></div></div>
      <div class="tabs" role="tablist">${tabs.map(([k, t]) => `<button role="tab" data-tab="${k}" aria-selected="${k === active}">${t}</button>`).join("")}</div>
      <div id="pa"></div>
    </div>`;
    $("#rate").oninput = (e) => store.set("rate", parseFloat(e.target.value));
    const show = (k) => {
      store.set("paTab", k);
      $$("[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === k)));
      const pa = $("#pa"); pa.innerHTML = "";
      ({ thanh: paTones, "phan-biet": paPairs, "theo-bai": paLesson, "ket-hop": paCombo, bang: paChart, noi: paSpeak })[k](pa);
    };
    $$("[data-tab]").forEach((b) => (b.onclick = () => show(b.dataset.tab)));
    show(active);
  };
  const TONE_SHAPES = { 1: "M6 8 H58", 2: "M6 32 L58 8", 3: "M6 16 L26 34 L58 8", 4: "M6 8 L58 34" };
  function paTones(pa) {
    const s = window.PINYIN.toneSets[0];
    pa.innerHTML = `<div class="page">
      <div class="panel"><h3>Nghe mẫu: <span class="han">${s[1]} ${s[2]} ${s[3]} ${s[4]}</span></h3>
        <div class="tone-row">${[1, 2, 3, 4].map((t) => `
          <button class="card tone-card" data-say="${s[t]}" style="cursor:pointer">
            <svg viewBox="0 0 64 42" aria-hidden="true"><path d="${TONE_SHAPES[t]}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="tone${t}" style="stroke:var(--t${t})"/></svg>
            <div class="han">${s[t]}</div><b class="tone${t}">${setTone(s[0], t)}</b>
            <span class="meta">${["", "cao, đều (như không dấu, kéo dài)", "đi lên (gần dấu sắc)", "xuống rồi lên (gần dấu hỏi)", "rơi mạnh (gần dấu nặng)"][t]}</span>
          </button>`).join("")}</div>
      </div>
      <div class="panel"><h3>Nghe và chọn thanh</h3><div id="tq"></div></div>
    </div>`;
    miniQuiz($("#tq"), 10, () => {
      const set = pick(window.PINYIN.toneSets), t = 1 + Math.floor(Math.random() * 4);
      return {
        audio: set[t], prompt: `<div class="ask">Bấm loa để nghe lại</div>`,
        options: [1, 2, 3, 4].map((k) => ({ label: `<span class="tone${k}">${setTone(set[0], k)}</span>`, cls: "pin", ok: k === t })),
        reveal: `${set[t]} = ${setTone(set[0], t)} (thanh ${t})`
      };
    });
  }
  function paPairs(pa) {
    const groups = Array.from(new Set(window.PINYIN.pairs.map((p) => p[0])));
    pa.innerHTML = `<div class="page">
      <div class="panel"><div class="row"><label class="field">Nhóm âm dễ nhầm<select id="pg">
        <option value="all">Trộn tất cả</option>${groups.map((g) => `<option>${g}</option>`).join("")}</select></label></div>
        <div id="pq"></div></div>
      <div class="panel"><h3>Nghe so sánh từng cặp</h3><div class="chip-grid">${window.PINYIN.pairs.filter((_, i) => i % 2 === 0).map((p) =>
        `<button class="chip" data-say="${p[1]}"><span class="meta">${p[0]}</span><b>${p[2]}</b><span class="han">${p[1]}</span><small>khác với ${p[3]}</small></button>`).join("")}</div></div>
    </div>`;
    const run = () => {
      const g = $("#pg").value;
      const pool = window.PINYIN.pairs.filter((p) => g === "all" || p[0] === g);
      miniQuiz($("#pq"), 10, () => {
        const p = pick(pool);
        return {
          audio: p[1], prompt: `<div class="ask">Nhóm ${esc(p[0])} · bạn nghe thấy âm nào?</div>`,
          options: shuffle([{ label: p[2], cls: "pin", ok: true }, { label: p[3], cls: "pin", ok: false }]),
          reveal: `${p[1]} đọc là ${p[2]}`
        };
      });
    };
    $("#pg").onchange = run; run();
  }
  function paLesson(pa) {
    const picker = deckPicker("pl", store.get("plSel", { src: "ms2", lesson: "1" }));
    pa.innerHTML = `<div class="page">
      <div class="panel"><div class="row">${picker.html}</div>
        <p class="meta">Nghe từ của bài đã chọn rồi chọn pinyin viết đúng thanh điệu. Các đáp án sai chỉ khác nhau ở dấu thanh, nên phải nghe kỹ.</p>
        <div id="lq"></div></div></div>`;
    const run = () => {
      const v = picker.value(); store.set("plSel", v);
      const pool = wordsFor(v).filter((w) => /[\u0304\u0301\u030c\u0300]/.test(w.p.normalize("NFD")));
      if (!pool.length) { $("#lq").innerHTML = `<p class="meta">Bộ này chưa có từ để luyện.</p>`; return; }
      miniQuiz($("#lq"), 10, () => {
        const w = pick(pool), ds = pinyinDistractors(w.p, 3);
        return {
          audio: w.h, prompt: `<div class="ask">Nghe và chọn pinyin đúng</div><div class="meta">${esc(w.v)}</div>`,
          options: shuffle([{ label: esc(w.p), cls: "pin", ok: true }, ...ds.map((d) => ({ label: esc(d), cls: "pin", ok: false }))]),
          reveal: `${w.h} ${w.p} · ${w.v}`
        };
      });
    };
    picker.bind(run); run();
  }
  function paCombo(pa) {
    const pool = allWords().concat(customLessons().flatMap((L) => L.words)).filter((w) => syls(w.p).length === 2 && [...w.h].length === 2);
    const uniq = Array.from(new Map(pool.map((w) => [w.h, w])).values());
    const pat = (w) => syls(w.p).map(toneOf);
    const label = (p) => p.map((t) => `<span class="tone${t}">${TONE_NAMES[t]}</span>`).join(" + ");
    pa.innerHTML = `<div class="page">
      <div class="note jade"><b>Nhớ biến điệu:</b> hai thanh 3 đi liền thì thanh 3 đầu đọc thành thanh 2 (你好 nǐ hǎo đọc gần “ní hǎo”). Pinyin vẫn viết theo thanh gốc, nên ở đây đáp án là thanh gốc.</div>
      <div class="panel"><h3>Nghe từ hai âm tiết, chọn kiểu thanh</h3><div id="cq"></div></div>
    </div>`;
    miniQuiz($("#cq"), 10, () => {
      const w = pick(uniq), right = pat(w);
      const opts = new Map([[right.join(), right]]);
      let g = 0;
      while (opts.size < 4 && g++ < 50) { const p = [1 + Math.floor(Math.random() * 4), Math.random() < .2 ? 0 : 1 + Math.floor(Math.random() * 4)]; opts.set(p.join(), p); }
      return {
        audio: w.h, prompt: `<div class="ask">Từ này mang kiểu thanh nào?</div>`,
        options: shuffle(Array.from(opts.values()).map((p) => ({ label: label(p), cls: "pin", ok: p.join() === right.join() }))),
        reveal: `${w.h} ${w.p} · ${w.v}`
      };
    });
  }
  function paChart(pa) {
    const P = window.PINYIN;
    pa.innerHTML = `<div class="page">
      <div class="panel"><h3>Thanh mẫu (21)</h3><p class="meta">Bấm vào ô để nghe chữ mẫu. Mẹo đọc so với âm tiếng Việt chỉ là gần đúng.</p>
        <div class="chip-grid">${P.initials.map(([k, h, p, tip]) => `<button class="chip" data-say="${h}"><b>${k}</b><span class="han">${h} <span class="tone${toneOf(p)}">${p}</span></span><small>${esc(tip)}</small></button>`).join("")}</div></div>
      <div class="panel"><h3>Vận mẫu (${P.finals.length})</h3>
        <div class="chip-grid">${P.finals.map(([k, h, p]) => `<button class="chip" data-say="${h}"><b>${k}</b><span class="han">${h} <span class="tone${toneOf(p)}">${p}</span></span></button>`).join("")}</div></div>
      <div class="panel"><h3>Quy tắc viết dễ nhầm</h3>
        <div class="table-wrap"><table><thead><tr><th>Quy tắc</th><th>Ví dụ</th></tr></thead><tbody>
          <tr><td>j, q, x, y + ü thì bỏ hai chấm</td><td>ju (居), qu (去), xu (需), yu (鱼): vẫn đọc là ü</td></tr>
          <tr><td>n, l + ü thì giữ hai chấm</td><td>nǚ (女) khác nǔ (努), lǜ (绿) khác lù (路)</td></tr>
          <tr><td>iu, ui, un là dạng viết gọn</td><td>liù = l+iou, duì = d+uei, chūn = ch+uen</td></tr>
          <tr><td>i sau z c s zh ch sh r không đọc là “i”</td><td>sì (四), shì (是): lưỡi giữ nguyên, không đọc “xi”</td></tr>
          <tr><td>Dấu thanh đặt trên a, e trước; ou đặt trên o; còn lại đặt trên nguyên âm sau</td><td>hǎo, xiě, kǒu, liù, duì</td></tr>
        </tbody></table></div></div>
    </div>`;
  }
  function paSpeak(pa) {
    const sel = store.get("spSel", { src: "ms1", lesson: "1" });
    const picker = deckPicker("sp", sel);
    pa.innerHTML = `<div class="page">
      <div class="panel"><div class="row">${picker.html}</div>
        <p class="meta">Bấm micro rồi đọc từ hiển thị. Máy so chữ nhận được với từ cần đọc. Cần trình duyệt Chrome/Edge và cho phép dùng micro.</p></div>
      <div id="sq"></div></div>`;
    const run = () => { const v = picker.value(); store.set("spSel", v); speakDrill($("#sq"), shuffle(wordsFor(v)).slice(0, 10)); };
    picker.bind(run); run();
  }

  /* Bài trắc nghiệm nhỏ dùng trong phần phát âm */
  function miniQuiz(box, total, gen) {
    let n = 0, score = 0;
    const step = () => {
      if (n >= total) {
        box.innerHTML = `<div style="display:grid;gap:12px;justify-items:center;text-align:center"><div class="score-big">${score}/${total}</div>
          <p class="lead">${score >= total * .8 ? "Tai bạn rất tốt!" : "Nghe lại phần mẫu rồi thử lượt nữa nhé."}</p><button class="btn primary">Làm lượt mới</button></div>`;
        $("button", box).onclick = () => { n = 0; score = 0; step(); };
        return;
      }
      const q = gen();
      box.innerHTML = `<div class="quiz">
        <div class="q-top"><span>Câu ${n + 1}/${total}</span><span>Đúng ${score}</span></div>
        <div class="progress"><i style="width:${(n / total) * 100}%"></i></div>
        <div class="q-prompt"><button class="mic" style="background:var(--jade)" data-say="${esc(q.audio)}" aria-label="Nghe">${ICON_SPK}</button>${q.prompt}</div>
        <div class="opts">${q.options.map((o, i) => `<button class="opt ${o.cls || ""}" data-i="${i}">${o.label}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div></div>`;
      setTimeout(() => say(q.audio), 150);
      $$(".opt", box).forEach((b) => (b.onclick = () => {
        const o = q.options[+b.dataset.i];
        $$(".opt", box).forEach((x, i) => { x.disabled = true; if (q.options[i].ok) x.classList.add("right"); });
        if (o.ok) score++; else b.classList.add("wrong");
        const fb = $(".feedback", box);
        fb.className = "feedback " + (o.ok ? "ok" : "no");
        fb.textContent = (o.ok ? "Chính xác! " : "Chưa đúng. ") + q.reveal;
        n++; setTimeout(step, o.ok ? 1100 : 2000);
      }));
    };
    step();
  }

  /* Luyện nói: đọc từng từ vào micro */
  function speakDrill(box, words, onDone) {
    let i = 0, score = 0;
    const results = [];
    const step = () => {
      if (i >= words.length) {
        box.innerHTML = `<div class="panel" style="text-align:center;justify-items:center"><div class="score-big">${score}/${words.length}</div>
          <p class="lead">từ đọc được máy nhận đúng</p>
          <div class="words" style="width:100%;text-align:left">${results.filter((r) => !r.ok).map((r) => wordRow(r.w)).join("")}</div>
          <button class="btn primary">Luyện lượt mới</button></div>`;
        $("button.btn", box).onclick = () => { i = 0; score = 0; results.length = 0; words = shuffle(words); step(); };
        onDone && onDone(score, words.length, results);
        return;
      }
      const w = words[i];
      box.innerHTML = `<div class="quiz">
        <div class="q-top"><span>Từ ${i + 1}/${words.length}</span><span>Đúng ${score}</span></div>
        <div class="progress"><i style="width:${(i / words.length) * 100}%"></i></div>
        <div class="q-prompt"><div class="ask">Đọc to từ này</div><div class="big">${esc(w.h)}</div>
          <div class="mid">${colorPy(w.p)}</div><div class="meta">${esc(w.v)}</div>
          <div class="row" style="justify-content:center">${spkBtn(w.h)}<button class="mic" id="mic" aria-label="Bấm và nói">${ICON_MIC}</button></div></div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row" style="justify-content:center"><button class="btn small" id="self-ok">Tự chấm: tôi đọc đúng</button><button class="btn small" id="skip">Bỏ qua</button></div></div>`;
      const fb = $(".feedback", box);
      const finish = (ok, heard) => { results.push({ w, ok, heard }); if (ok) score++; i++; setTimeout(step, ok ? 1000 : 1800); };
      $("#mic").onclick = async () => {
        const m = $("#mic"); m.classList.add("on"); fb.className = "feedback"; fb.textContent = "Đang nghe…";
        try {
          const alts = await listen();
          m.classList.remove("on");
          if (!alts.length) { fb.textContent = "Không nghe thấy gì, bấm micro thử lại."; return; }
          const target = cleanZh(w.h);
          const ok = alts.some((a) => cleanZh(a).includes(target));
          fb.className = "feedback " + (ok ? "ok" : "no");
          fb.textContent = ok ? `Chuẩn! Máy nghe được “${alts[0]}”.` : `Máy nghe thành “${alts[0]}”. Nghe mẫu rồi thử lại, hoặc bỏ qua.`;
          if (ok) finish(true, alts[0]);
        } catch (err) { m.classList.remove("on"); fb.className = "feedback no"; fb.textContent = speechMessage(err); }
      };
      $("#self-ok").onclick = () => finish(true, "(tự chấm)");
      $("#skip").onclick = () => finish(false, "");
    };
    step();
  }

  /* ---------- Thi theo sách ---------- */
  const MODES = [
    ["tron", "Trộn các dạng"], ["nghia", "Nhìn chữ, chọn nghĩa"], ["chu", "Nhìn nghĩa, chọn chữ"],
    ["nghe", "Nghe, chọn chữ"], ["pinyin", "Chọn pinyin đúng thanh"], ["noi", "Thi nói (micro)"]
  ];
  routes["thi"] = (root) => {
    const sel = pending || store.get("thiSel", { src: "ms1", lesson: "1" });
    const auto = pending && pending.autostart;
    const picker = deckPicker("q", sel);
    root.innerHTML = `<div class="page">
      <div class="page-head"><div class="eyebrow">听说考试</div><h1>Thi nhớ từ vựng và phát âm</h1>
        <p class="lead">Thi theo từng bài của khoá Msutong 1, Msutong 2 hoặc cả khoá. Mỗi lượt gồm câu nhận mặt chữ, nghĩa, nghe, thanh điệu và thi nói.</p></div>
      <div class="panel">
        <div class="row">${picker.html}
          <label class="field">Dạng thi<select id="q-mode">${MODES.map(([k, t]) => `<option value="${k}">${t}</option>`).join("")}</select></label>
          <label class="field">Số câu<select id="q-n"><option>10</option><option>15</option><option>20</option><option value="0">Tất cả</option></select></label>
          <button class="btn primary" id="q-start" style="align-self:end">Bắt đầu thi</button>
        </div>
      </div>
      <div id="q-area"></div>
      <section class="panel"><h3>Lịch sử điểm</h3><div id="q-hist"></div></section>
      <section class="panel">
        <h3>Tự nhập từ của một bài</h3>
        <p class="meta">Mỗi dòng một từ: <code>chữ Hán | pinyin | nghĩa</code>. Pinyin viết cách từng âm tiết, ví dụ <code>老师 | lǎo shī | giáo viên</code>. Bộ từ lưu trên trình duyệt này và hiện trong danh sách bài với dấu ★.</p>
        <label class="field">Tên bài<input type="text" id="imp-title" placeholder="Ví dụ: Bài 7"></label>
        <label class="field">Danh sách từ<textarea id="imp-words" placeholder="你们 | nǐ men | các bạn&#10;学习 | xué xí | học tập"></textarea></label>
        <div class="row"><button class="btn dark" id="imp-save">Lưu bộ từ</button><span class="meta" id="imp-list"></span></div>
      </section>
    </div>`;
    $("#q-mode").value = store.get("thiMode", "tron");
    picker.bind();
    const start = () => {
      const v = picker.value(); store.set("thiSel", v); store.set("thiMode", $("#q-mode").value);
      const words = wordsFor(v);
      if (words.length < 4) { toast("Bộ này cần ít nhất 4 từ để thi."); return; }
      const n = +$("#q-n").value || words.length;
      runExam($("#q-area"), { ...v, mode: $("#q-mode").value, words: shuffle(words).slice(0, n) });
      $("#q-area").scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $("#q-start").onclick = start;
    renderHist();
    renderCustom();
    $("#imp-save").onclick = () => {
      const title = $("#imp-title").value.trim(), raw = $("#imp-words").value.trim();
      const lines = raw.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((x) => x[0] && x[1]);
      if (!title || lines.length < 4) { toast("Cần tên bài và ít nhất 4 dòng đúng dạng chữ | pinyin | nghĩa."); return; }
      const list = store.get("customLessons", []);
      list.push({ title, words: lines.map((x) => x.join("|")).join("\n") });
      store.set("customLessons", list);
      toast("Đã lưu " + lines.length + " từ vào “" + title + "”.");
      render();
    };
    if (auto) start();
  };
  function renderCustom() {
    const list = store.get("customLessons", []);
    const el = $("#imp-list");
    if (!list.length) { el.textContent = "Chưa có bộ tự nhập."; return; }
    el.innerHTML = list.map((L, i) => `${esc(L.title)} <button class="btn small" data-del="${i}">Xoá</button>`).join(" ");
    $$("[data-del]", el).forEach((b) => (b.onclick = () => {
      if (b.dataset.armed) { list.splice(+b.dataset.del, 1); store.set("customLessons", list); render(); }
      else { b.dataset.armed = "1"; b.textContent = "Bấm lần nữa để xoá"; }
    }));
  }
  function renderHist() {
    const h = store.get("history", []).slice(-8).reverse();
    $("#q-hist").innerHTML = h.length
      ? `<div class="table-wrap"><table><thead><tr><th>Ngày</th><th>Bộ từ</th><th>Dạng</th><th>Điểm</th></tr></thead><tbody>${h.map((r) =>
        `<tr><td>${new Date(r.t).toLocaleDateString("vi-VN")}</td><td>${esc(r.name)}</td><td>${esc(r.mode)}</td><td style="font-variant-numeric:tabular-nums"><b>${r.score}/${r.total}</b></td></tr>`).join("")}</tbody></table></div>`
      : `<p class="meta">Chưa có lượt thi nào. Kết quả mỗi lượt sẽ hiện ở đây.</p>`;
  }

  function makeQuestion(w, pool, mode) {
    const others = shuffle(pool.filter((x) => x.h !== w.h && x.v !== w.v)).slice(0, 3);
    const m = mode === "tron" ? pick(["nghia", "chu", "nghe", "pinyin"]) : mode;
    if (m === "nghia") return {
      prompt: `<div class="ask">Từ này nghĩa là gì?</div><div class="big">${esc(w.h)}</div>${spkBtn(w.h)}`,
      options: shuffle([w, ...others]).map((x) => ({ label: esc(x.v), ok: x === w }))
    };
    if (m === "chu") return {
      prompt: `<div class="ask">Chọn chữ Hán có nghĩa</div><div class="mid">${esc(w.v)}</div>`,
      options: shuffle([w, ...others]).map((x) => ({ label: esc(x.h), cls: "hanzi", ok: x === w }))
    };
    if (m === "nghe") return {
      audio: w.h,
      prompt: `<div class="ask">Nghe và chọn từ đúng</div><button class="mic" style="background:var(--jade)" data-say="${esc(w.h)}" aria-label="Nghe lại">${ICON_SPK}</button>`,
      options: shuffle([w, ...others]).map((x) => ({ label: esc(x.h), cls: "hanzi", ok: x === w }))
    };
    // pinyin: phân biệt thanh điệu
    const ds = pinyinDistractors(w.p, 3);
    while (ds.length < 3) { const o = others[ds.length]; ds.push(o ? o.p : w.p + "?"); }
    return {
      prompt: `<div class="ask">Chọn pinyin đúng thanh điệu</div><div class="big">${esc(w.h)}</div><div class="meta">${esc(w.v)}</div>`,
      options: shuffle([{ label: esc(w.p), cls: "pin", ok: true }, ...ds.map((d) => ({ label: esc(d), cls: "pin", ok: false }))])
    };
  }
  function examName(cfg) {
    if (cfg.src !== "tu") { const c = courseOf(cfg.src); return cfg.lesson === "all" ? `${c.name} · cả khoá` : `${c.name} · Bài ${cfg.lesson}`; }
    const L = customLessons().find((x) => String(x.id) === String(cfg.lesson));
    return "Tự nhập · " + (cfg.lesson === "all" ? "tất cả" : L ? L.title : cfg.lesson);
  }
  function saveResult(cfg, score, total) {
    const modeName = MODES.find((m) => m[0] === cfg.mode)[1];
    const h = store.get("history", []); h.push({ t: Date.now(), name: examName(cfg), mode: modeName, score, total });
    store.set("history", h.slice(-50));
    const best = store.get("best", {}), key = cfg.src + ":" + cfg.lesson, pct = Math.round((score / total) * 100);
    if (best[key] == null || pct > best[key]) { best[key] = pct; store.set("best", best); }
  }
  function examResult(area, cfg, score, total, wrong) {
    saveResult(cfg, score, total);
    wrong.forEach((w) => srs.set(w.h, 0));
    const pct = Math.round((score / total) * 100);
    area.innerHTML = `<div class="panel" style="text-align:center;justify-items:center">
      <div class="eyebrow">${esc(examName(cfg))}</div>
      <div class="score-big">${pct}%</div><p class="lead">Đúng ${score}/${total} câu. ${pct >= 90 ? "Xuất sắc!" : pct >= 70 ? "Khá lắm, ôn thêm các từ sai nhé." : "Hãy ôn lại bằng flashcard rồi thi lại."}</p>
      ${wrong.length ? `<h3>Từ cần ôn (đã đưa về hộp 0 của flashcard)</h3><div class="words" style="width:100%;text-align:left">${wrong.map(wordRow).join("")}</div>` : ""}
      <div class="row" style="justify-content:center"><button class="btn primary" id="q-again">Thi lại</button><button class="btn" id="q-fc">Ôn bằng flashcard</button></div>
    </div>`;
    $("#q-again").onclick = () => runExam(area, { ...cfg, words: shuffle(cfg.words) });
    $("#q-fc").onclick = () => go("flashcard", { src: cfg.src, lesson: cfg.lesson });
    renderHist();
  }
  function runExam(area, cfg) {
    const { words, mode } = cfg;
    if (mode === "noi") {
      speakDrill(area, words, (score, total, res) => examResult(area, cfg, score, total, res.filter((r) => !r.ok).map((r) => r.w)));
      return;
    }
    const pool = wordsFor({ src: cfg.src, lesson: "all" });
    let i = 0, score = 0; const wrong = [];
    const step = () => {
      if (i >= words.length) return examResult(area, cfg, score, words.length, wrong);
      const w = words[i], q = makeQuestion(w, pool, mode);
      area.innerHTML = `<div class="quiz">
        <div class="q-top"><span>Câu ${i + 1}/${words.length}</span><span>Đúng ${score}</span></div>
        <div class="progress"><i style="width:${(i / words.length) * 100}%"></i></div>
        <div class="q-prompt">${q.prompt}</div>
        <div class="opts">${q.options.map((o, k) => `<button class="opt ${o.cls || ""}" data-k="${k}">${o.label}</button>`).join("")}</div>
        <div class="feedback" aria-live="polite"></div></div>`;
      if (q.audio) setTimeout(() => say(q.audio), 150);
      $$(".opt", area).forEach((b) => (b.onclick = () => {
        const o = q.options[+b.dataset.k];
        $$(".opt", area).forEach((x, k) => { x.disabled = true; if (q.options[k].ok) x.classList.add("right"); });
        const fb = $(".feedback", area);
        if (o.ok) score++; else { b.classList.add("wrong"); wrong.push(w); }
        fb.className = "feedback " + (o.ok ? "ok" : "no");
        fb.innerHTML = `${o.ok ? "Chính xác!" : "Chưa đúng."} <span class="han">${esc(w.h)}</span> ${colorPy(w.p)} · ${esc(w.v)}`;
        say(w.h);
        i++; setTimeout(step, o.ok ? 1200 : 2200);
      }));
    };
    step();
  }

  /* ---------- Khởi động ---------- */
  $(".menu-btn").onclick = () => $(".nav").classList.toggle("open");
  render();
})();
