/* Dữ liệu luyện phát âm (chữ phồn thể): chữ mẫu để máy đọc (máy đọc chữ Hán chuẩn hơn đọc ký tự pinyin).
   Chú âm (注音符號) của thanh mẫu/vận mẫu do app.js tự đổi từ pinyin. */
window.PINYIN = {
  // Bộ 4 thanh: [âm tiết không dấu, chữ thanh 1, 2, 3, 4]
  toneSets: [
    ["ma", "媽", "麻", "馬", "罵"],
    ["yi", "一", "姨", "椅", "意"],
    ["wu", "屋", "無", "五", "霧"],
    ["ba", "八", "拔", "把", "爸"],
    ["shi", "詩", "十", "使", "是"],
    ["tang", "湯", "糖", "躺", "燙"],
    ["tong", "通", "同", "統", "痛"],
    ["guo", "鍋", "國", "果", "過"],
    ["xi", "西", "習", "洗", "細"],
    ["qi", "七", "騎", "起", "氣"],
    ["di", "低", "敵", "底", "地"],
    ["tu", "突", "圖", "土", "兔"]
  ],

  // Cặp dễ nhầm: nhóm, chữ, pinyin đúng, pinyin gây nhiễu
  pairs: [
    ["b / p", "不", "bù", "pù"], ["b / p", "白", "bái", "pái"], ["b / p", "怕", "pà", "bà"], ["b / p", "皮", "pí", "bí"],
    ["d / t", "大", "dà", "tà"], ["d / t", "他", "tā", "dā"], ["d / t", "弟", "dì", "tì"], ["d / t", "天", "tiān", "diān"],
    ["g / k", "哥", "gē", "kē"], ["g / k", "看", "kàn", "gàn"], ["g / k", "狗", "gǒu", "kǒu"], ["g / k", "口", "kǒu", "gǒu"],
    ["z / zh", "在", "zài", "zhài"], ["z / zh", "這", "zhè", "zè"], ["z / zh", "早", "zǎo", "zhǎo"], ["z / zh", "找", "zhǎo", "zǎo"],
    ["c / ch", "菜", "cài", "chài"], ["c / ch", "吃", "chī", "cī"], ["c / ch", "草", "cǎo", "chǎo"], ["c / ch", "茶", "chá", "cá"],
    ["s / sh", "四", "sì", "shì"], ["s / sh", "是", "shì", "sì"], ["s / sh", "三", "sān", "shān"], ["s / sh", "山", "shān", "sān"],
    ["j / q / x", "雞", "jī", "qī"], ["j / q / x", "七", "qī", "jī"], ["j / q / x", "西", "xī", "qī"], ["j / q / x", "家", "jiā", "xiā"],
    ["n / l", "你", "nǐ", "lǐ"], ["n / l", "裡", "lǐ", "nǐ"], ["n / l", "男", "nán", "lán"], ["n / l", "藍", "lán", "nán"],
    ["an / ang", "半", "bàn", "bàng"], ["an / ang", "幫", "bāng", "bān"], ["an / ang", "山", "shān", "shāng"], ["an / ang", "上", "shàng", "shàn"],
    ["en / eng", "門", "mén", "méng"], ["en / eng", "冷", "lěng", "lěn"], ["en / eng", "人", "rén", "réng"], ["en / eng", "風", "fēng", "fēn"],
    ["in / ing", "今", "jīn", "jīng"], ["in / ing", "京", "jīng", "jīn"], ["in / ing", "新", "xīn", "xīng"], ["in / ing", "星", "xīng", "xīn"],
    ["u / ü", "路", "lù", "lǜ"], ["u / ü", "綠", "lǜ", "lù"], ["u / ü", "女", "nǚ", "nǔ"], ["u / ü", "努", "nǔ", "nǚ"]
  ],

  // Thanh mẫu: [ký hiệu, chữ mẫu, pinyin chữ mẫu, mẹo đọc cho người Việt]
  initials: [
    ["b", "八", "bā", "gần “p” tiếng Việt, không bật hơi"], ["p", "爬", "pá", "như “p” nhưng bật mạnh hơi"],
    ["m", "媽", "mā", "như “m”"], ["f", "發", "fā", "như “ph”"],
    ["d", "大", "dà", "gần “t”, không bật hơi"], ["t", "他", "tā", "như “th”, bật hơi"],
    ["n", "你", "nǐ", "như “n”"], ["l", "拉", "lā", "như “l”"],
    ["g", "哥", "gē", "gần “c/k”, không bật hơi"], ["k", "可", "kě", "như “kh” nhẹ, bật hơi"],
    ["h", "喝", "hē", "như “h” xát ở cuống họng"],
    ["j", "雞", "jī", "gần “ch”, mặt lưỡi chạm lợi"], ["q", "七", "qī", "như j nhưng bật hơi"], ["x", "西", "xī", "gần “x”, mặt lưỡi"],
    ["zh", "知", "zhī", "uốn lưỡi, không bật hơi"], ["ch", "吃", "chī", "uốn lưỡi, bật hơi"],
    ["sh", "是", "shì", "uốn lưỡi, như “s” nặng"], ["r", "日", "rì", "uốn lưỡi, gần “r” rung nhẹ"],
    ["z", "在", "zài", "đầu lưỡi thẳng, như “ch” nhẹ"], ["c", "菜", "cài", "như z nhưng bật hơi"], ["s", "四", "sì", "như “x” tiếng Việt"]
  ],

  // Vận mẫu: [ký hiệu, chữ mẫu, pinyin]
  finals: [
    ["a", "啊", "ā"], ["o", "我", "wǒ"], ["e", "餓", "è"], ["i", "一", "yī"], ["u", "五", "wǔ"], ["ü", "魚", "yú"],
    ["ai", "愛", "ài"], ["ei", "飛", "fēi"], ["ao", "好", "hǎo"], ["ou", "口", "kǒu"],
    ["an", "安", "ān"], ["en", "門", "mén"], ["ang", "忙", "máng"], ["eng", "冷", "lěng"], ["ong", "東", "dōng"],
    ["ia", "家", "jiā"], ["ie", "寫", "xiě"], ["iao", "小", "xiǎo"], ["iu", "六", "liù"],
    ["ian", "天", "tiān"], ["in", "今", "jīn"], ["iang", "想", "xiǎng"], ["ing", "聽", "tīng"], ["iong", "熊", "xióng"],
    ["ua", "花", "huā"], ["uo", "國", "guó"], ["uai", "快", "kuài"], ["ui", "對", "duì"],
    ["uan", "晚", "wǎn"], ["un", "春", "chūn"], ["uang", "床", "chuáng"],
    ["üe", "學", "xué"], ["üan", "遠", "yuǎn"], ["ün", "雲", "yún"], ["er", "二", "èr"]
  ]
};
