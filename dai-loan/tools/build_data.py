"""Đọc giáo trình (đã đổi sang text bằng pandoc) và sinh data/dailoan.js.

Cách dùng (chạy trong thư mục dai-loan):
    pandoc -t plain --wrap=none giao_trinh.docx -o giao_trinh.txt
    python3 tools/build_data.py giao_trinh.txt data/dailoan.js
"""
import json, re, sys, unicodedata

src, out = sys.argv[1], sys.argv[2]
text = open(src, encoding="utf-8").read()
lines = text.split("\n")

# ---------- tách pinyin liền thành âm tiết ----------
INITS = ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "r", "z", "c", "s", "y", "w", ""]
FINALS = ["a", "o", "e", "i", "u", "v", "ai", "ei", "ao", "ou", "an", "en", "ang", "eng", "ong", "er",
          "ia", "ie", "iao", "iu", "ian", "in", "iang", "ing", "iong", "ua", "uo", "uai", "ui", "uan", "un", "uang", "ue", "ve", "van", "vn",
          "ueng"]
VALID = set()
for i in INITS:
    for f in FINALS:
        VALID.add(i + f)

VALID.add("r")  # đuôi nhi hoá: nǎ + r


def strip(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = s.replace("̈", "v")  # ü -> uv ... xử lý dưới
    s = re.sub(r"[̀-ͯ]", "", s)
    return s.replace("uv", "v")


def seg_word(w):
    """Tách một từ pinyin không dấu cách thành các âm tiết (giữ dấu thanh)."""
    parts = []
    for chunk in re.split(r"['’]", w):
        if not chunk:
            continue
        b = strip(chunk)
        # map vị trí: mỗi ký tự NFC của chunk tương ứng 1 ký tự của b
        nfc = unicodedata.normalize("NFC", chunk)
        assert len(nfc) == len(b), (chunk, b)
        n = len(b)
        best = [None] * (n + 1)
        best[0] = []
        for i in range(n):
            if best[i] is None:
                continue
            for j in range(i + 1, min(n, i + 6) + 1):
                piece = b[i:j]
                if piece not in VALID:
                    continue
                # âm tiết bắt đầu bằng nguyên âm chỉ đứng đầu (giữa từ phải có dấu ')
                if i > 0 and piece[0] in "aeiouv":
                    continue
                if piece == "r" and j != n:
                    continue
                if best[j] is None or len(best[j]) > len(best[i]) + 1:
                    best[j] = best[i] + [(i, j)]
        if best[n] is None:
            raise ValueError("Không tách được pinyin: " + w)
        parts += [nfc[i:j] for i, j in best[n]]
    # gộp đuôi nhi hoá "r" vào âm tiết trước
    merged = []
    for p in parts:
        if p == "r" and merged:
            merged[-1] += "r"
        else:
            merged.append(p)
    return merged


def seg_pinyin(p):
    return " ".join(s for w in p.split() for s in seg_word(w))


# ---------- đọc từng bài ----------
def clean(s):
    return re.sub(r"\s+", " ", s).strip()


lesson_starts = [i for i, l in enumerate(lines) if re.match(r"^BÀI \d+:", l)]
appendix = next(i for i, l in enumerate(lines) if l.startswith("PHỤ LỤC 1"))
bounds = lesson_starts + [appendix]

SENT = re.compile(r"^(.+?)\s*\[(.+?)\]\s*[—-]\s*(.+)$")
DIAL = re.compile(r"^([A-ZĐ]):\s*(.+?)\s*\[(.+?)\]\s*(.+)$")
EXTRA = re.compile(r"^◆\s*(.+?)\s+([A-Z].*?)\s+—\s+(.+)$")

lessons = []
for k in range(len(lesson_starts)):
    block = lines[bounds[k]:bounds[k + 1]]
    head = block[0]
    lid = int(re.match(r"^BÀI (\d+):", head).group(1))
    zh_title = head.split(":", 1)[1].strip()
    sub = next(l for l in block[1:] if "—" in l)
    py_title, vi_title = [clean(x) for x in sub.split("—", 1)]

    lesson = {"id": lid, "zh": zh_title, "py": py_title, "title": vi_title,
              "words": [], "grammar": [], "dialogue": [], "extra": [], "task": "", "exercises": []}
    sec = None
    gram = None
    for raw in block[1:]:
        l = raw.strip()
        if not l:
            continue
        if l.startswith("I. Từ vựng"):
            sec = "vocab"; continue
        if l.startswith("II. Ngữ pháp"):
            sec = "grammar"; continue
        if l.startswith("III. Hội thoại"):
            sec = "dialogue"; continue
        if l.startswith("IV. Bài tập"):
            sec = "ex"; continue
        if l.startswith("MỞ RỘNG GIAO TIẾP"):
            sec = "extra"; continue
        if l.startswith("V. Luyện viết"):
            sec = "write"; continue
        if sec == "vocab":
            if set(l) <= set("- ") or l.startswith("Phồn thể"):
                continue
            cols = re.split(r"\s{2,}", l)
            if len(cols) != 4:
                raise ValueError(f"Bài {lid}: dòng từ vựng lạ: {l!r}")
            h, p, t, v = cols
            lesson["words"].append({"h": h, "p": seg_pinyin(p), "t": t, "v": v})
        elif sec == "grammar":
            m = re.match(r"^\d+\.\s+(.+)$", l)
            if m:
                gram = {"title": m.group(1), "note": "", "ex": []}
                lesson["grammar"].append(gram); continue
            if l.startswith("•"):
                m = SENT.match(l[1:].strip())
                gram["ex"].append([clean(m.group(1)), clean(m.group(2)), clean(m.group(3))]); continue
            gram["note"] = clean((gram["note"] + " " + l))
        elif sec == "dialogue":
            m = DIAL.match(l)
            if m:
                lesson["dialogue"].append([m.group(1), clean(m.group(2)), clean(m.group(3)), clean(m.group(4))])
        elif sec == "ex":
            m = re.match(r"^\d+\.\s+(.+)$", l)
            if m:
                lesson["exercises"].append(clean(m.group(1)))
        elif sec == "extra":
            if l.startswith("◆"):
                m = EXTRA.match(l)
                if not m:
                    raise ValueError(f"Bài {lid}: câu mở rộng lạ: {l!r}")
                lesson["extra"].append([clean(m.group(1)), clean(m.group(2)), clean(m.group(3))])
            elif l.startswith("🎯"):
                lesson["task"] = clean(l.split(":", 1)[1])
    for key in ("words", "grammar", "dialogue"):
        if not lesson[key]:
            raise ValueError(f"Bài {lid} thiếu {key}")
    lessons.append(lesson)

# ---------- bộ thủ (phụ lục 2) ----------
radicals = []
start = next(i for i, l in enumerate(lines) if l.startswith("PHỤ LỤC 2"))
for l in lines[start:]:
    l = l.strip()
    cols = re.split(r"\s{2,}", l)
    if len(cols) == 6 and not l.startswith("Bộ thủ"):
        r, rp, rv, ex, ep, ev = cols
        radicals.append([r, rp, rv, ex, ep, ev])

# ---------- kiểm tra số âm tiết so với số chữ ----------
warn = 0
for L in lessons:
    for w in L["words"]:
        nch = len([c for c in w["h"] if "一" <= c <= "鿿"])
        nsy = len(w["p"].split())
        er = w["h"].endswith("兒") and w["p"].endswith("r")
        if nch != nsy and not (er and nch == nsy + 1):
            print("Lệch âm tiết:", L["id"], w, file=sys.stderr); warn += 1

data = {"title": "Tiếng Đài Loan cơ bản", "lessons": lessons, "radicals": radicals}
js = ("/*\n * Khoá Tiếng Đài Loan cơ bản: 15 bài theo giáo trình \"Giáo trình dạy tiếng Trung (Đài Loan) cơ bản cho người mới bắt đầu\"\n"
      " * của Tiếng Trung Thanh Hoa - Hà Giang (清華老師). Chữ phồn thể, pinyin và nghĩa tiếng Việt lấy theo sách.\n"
      " * File này được sinh tự động từ giáo trình; pinyin của từ đã tách theo âm tiết để tô màu thanh điệu.\n"
      " * Mỗi từ: h = chữ phồn thể, p = pinyin, t = từ loại, v = nghĩa tiếng Việt.\n */\n"
      "window.DAILOAN = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
open(out, "w", encoding="utf-8").write(js)
print(f"{len(lessons)} bài, {sum(len(L['words']) for L in lessons)} từ, {len(radicals)} bộ thủ, cảnh báo {warn}")
