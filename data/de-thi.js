/*
 * Đề thi nói theo giáo trình 汉语初级强化教程 · 听说课本 I (Intensive Elementary Chinese Course · Listening and Speaking I,
 * 肖奚强、朱敏 主编, NXB Đại học Bắc Kinh), bài 1–12, trình độ tương đương HSK 1.
 * Tên bài lấy theo mục lục của sách. Từ vựng, câu và đoạn văn do trung tâm soạn theo chủ đề từng bài:
 * muốn khớp đúng bảng 生词 của sách thì sửa danh sách "words" của bài đó.
 *
 *   words : từ cho phần Đọc từ. Mỗi dòng: chữ Hán|pinyin (cách từng âm tiết)|nghĩa
 *   make  : Đặt câu. w = từ cho sẵn, must = chữ bắt buộc có trong câu, re = khung câu (tuỳ chọn), s/sp/sv = câu mẫu.
 *           Câu mẫu cũng được dùng cho phần Đọc câu.
 *   qa    : Trả lời câu hỏi theo phản xạ. q = câu hỏi, kw = các nhóm từ câu trả lời nên có, a/av = câu trả lời mẫu.
 *   read  : đoạn văn ngắn của bài, được tách thành từng câu cho phần Đọc câu.
 *   review: bài ôn tập (复习), lấy đề của các bài trong khoảng [từ, đến].
 * topics : Nói theo chủ đề. from = học xong bài này mới dùng được chủ đề.
 */
window.DE_THI = {
  book: "汉语初级强化教程 · 听说课本 I",
  units: [
    {
      id: 1, title: "Xin chào", zh: "你好！",
      words: `
你|nǐ|bạn, anh, chị
好|hǎo|tốt, khoẻ
你好|nǐ hǎo|xin chào
您|nín|ông, bà, thầy, cô (kính trọng)
你们|nǐ men|các bạn
老师|lǎo shī|thầy giáo, cô giáo
谢谢|xiè xie|cảm ơn
不客气|bú kè qi|không có gì
再见|zài jiàn|tạm biệt
对不起|duì bu qǐ|xin lỗi
没关系|méi guān xi|không sao
一|yī|một
二|èr|hai
三|sān|ba
四|sì|bốn
五|wǔ|năm
六|liù|sáu
七|qī|bảy
八|bā|tám
九|jiǔ|chín
十|shí|mười`,
      make: [
        { w: "你好", py: "nǐ hǎo", vi: "xin chào", must: ["好"], s: "老师，你好！", sp: "Lǎoshī, nǐ hǎo!", sv: "Em chào thầy ạ!" },
        { w: "您", py: "nín", vi: "ông, bà, thầy, cô (kính trọng)", must: ["您"], s: "王老师，您好！", sp: "Wáng lǎoshī, nín hǎo!", sv: "Em chào thầy Vương ạ!" },
        { w: "你们", py: "nǐmen", vi: "các bạn", must: ["你们"], s: "你们好！", sp: "Nǐmen hǎo!", sv: "Chào các bạn!" },
        { w: "谢谢", py: "xièxie", vi: "cảm ơn", must: ["谢谢"], s: "谢谢老师！", sp: "Xièxie lǎoshī!", sv: "Em cảm ơn thầy ạ!" },
        { w: "再见", py: "zàijiàn", vi: "tạm biệt", must: ["再见"], s: "老师，再见！", sp: "Lǎoshī, zàijiàn!", sv: "Em chào thầy, tạm biệt ạ!" },
        { w: "对不起", py: "duìbuqǐ", vi: "xin lỗi", must: ["对不起"], s: "对不起，老师！", sp: "Duìbuqǐ, lǎoshī!", sv: "Em xin lỗi thầy ạ!" }
      ],
      qa: [
        { q: "你好！", py: "Nǐ hǎo!", vi: "Chào em!", kw: ["好"], a: "老师好！", av: "Em chào thầy ạ!" },
        { q: "你们好！", py: "Nǐmen hǎo!", vi: "Chào các em!", kw: ["好"], a: "老师，您好！", av: "Em chào thầy ạ!" },
        { q: "谢谢你！", py: "Xièxie nǐ!", vi: "Cảm ơn em!", kw: ["不客气|客气|没关系"], a: "不客气！", av: "Không có gì ạ!" },
        { q: "对不起！", py: "Duìbuqǐ!", vi: "Xin lỗi!", kw: ["没关系|没事|不客气"], a: "没关系。", av: "Không sao ạ." },
        { q: "再见！", py: "Zàijiàn!", vi: "Tạm biệt!", kw: ["再见|明天见"], a: "老师再见！", av: "Em chào thầy, tạm biệt ạ!" }
      ],
      read: { zh: "你好！老师，您好！你们好！谢谢！不客气。对不起！没关系。再见！", py: "Nǐ hǎo! Lǎoshī, nín hǎo! Nǐmen hǎo! Xièxie! Bú kèqi. Duìbuqǐ! Méi guānxi. Zàijiàn!", vi: "Chào bạn! Em chào thầy ạ! Chào các bạn! Cảm ơn! Không có gì. Xin lỗi! Không sao. Tạm biệt!" }
    },
    {
      id: 2, title: "Bạn có bận không?", zh: "你忙吗？",
      words: `
忙|máng|bận
很|hěn|rất
吗|ma|… không? (trợ từ hỏi)
我|wǒ|tôi
他|tā|anh ấy
她|tā|cô ấy
我们|wǒ men|chúng tôi
也|yě|cũng
都|dōu|đều
不|bù|không
太|tài|quá, lắm
累|lèi|mệt
呢|ne|còn … thì sao?
爸爸|bà ba|bố
妈妈|mā ma|mẹ
哥哥|gē ge|anh trai
身体|shēn tǐ|sức khoẻ, cơ thể
工作|gōng zuò|công việc, làm việc
学习|xué xí|học
汉语|Hàn yǔ|tiếng Hán
难|nán|khó`,
      make: [
        { w: "忙", py: "máng", vi: "bận", must: ["忙"], s: "我很忙。", sp: "Wǒ hěn máng.", sv: "Tôi rất bận." },
        { w: "……吗？", py: "ma", vi: "… không? (câu hỏi)", must: ["吗"], re: ".+吗", s: "你累吗？", sp: "Nǐ lèi ma?", sv: "Bạn có mệt không?" },
        { w: "也", py: "yě", vi: "cũng", must: ["也"], re: ".也.+", s: "我也很忙。", sp: "Wǒ yě hěn máng.", sv: "Tôi cũng rất bận." },
        { w: "都", py: "dōu", vi: "đều", must: ["都"], re: ".都.+", s: "我们都很好。", sp: "Wǒmen dōu hěn hǎo.", sv: "Chúng tôi đều khoẻ." },
        { w: "不太", py: "bú tài", vi: "không … lắm", must: ["不太"], re: "不太.+", s: "汉语不太难。", sp: "Hànyǔ bú tài nán.", sv: "Tiếng Trung không khó lắm." },
        { w: "……呢？", py: "ne", vi: "còn … thì sao?", must: ["呢"], re: ".+呢", s: "我很好，你呢？", sp: "Wǒ hěn hǎo, nǐ ne?", sv: "Tôi khoẻ, còn bạn?" },
        { w: "身体", py: "shēntǐ", vi: "sức khoẻ", must: ["身体"], s: "我爸爸妈妈身体都很好。", sp: "Wǒ bàba māma shēntǐ dōu hěn hǎo.", sv: "Bố mẹ tôi đều khoẻ." }
      ],
      qa: [
        { q: "你忙吗？", py: "Nǐ máng ma?", vi: "Em có bận không?", kw: ["忙"], a: "我很忙。", av: "Em rất bận." },
        { q: "你累吗？", py: "Nǐ lèi ma?", vi: "Em có mệt không?", kw: ["累"], a: "我不累。", av: "Em không mệt." },
        { q: "我很好，你呢？", py: "Wǒ hěn hǎo, nǐ ne?", vi: "Tôi khoẻ, còn em?", kw: ["好|忙|累|不错"], a: "我也很好。", av: "Em cũng khoẻ." },
        { q: "你爸爸妈妈身体好吗？", py: "Nǐ bàba māma shēntǐ hǎo ma?", vi: "Bố mẹ em có khoẻ không?", kw: ["好|不错|还可以|不太好"], a: "他们身体都很好。", av: "Bố mẹ em đều khoẻ." },
        { q: "汉语难吗？", py: "Hànyǔ nán ma?", vi: "Tiếng Trung có khó không?", kw: ["难|容易"], a: "汉语不太难。", av: "Tiếng Trung không khó lắm." },
        { q: "你哥哥工作忙吗？", py: "Nǐ gēge gōngzuò máng ma?", vi: "Anh trai em làm việc có bận không?", kw: ["忙"], a: "他工作很忙。", av: "Anh ấy làm việc rất bận." }
      ],
      read: { zh: "你好！你忙吗？我很忙，你呢？我不太忙。你累吗？我不累。你爸爸妈妈身体好吗？他们身体都很好，谢谢！汉语难吗？汉语不太难。", py: "Nǐ hǎo! Nǐ máng ma? Wǒ hěn máng, nǐ ne? Wǒ bú tài máng. Nǐ lèi ma? Wǒ bú lèi. Nǐ bàba māma shēntǐ hǎo ma? Tāmen shēntǐ dōu hěn hǎo, xièxie! Hànyǔ nán ma? Hànyǔ bú tài nán.", vi: "Chào bạn! Bạn có bận không? Tôi rất bận, còn bạn? Tôi không bận lắm. Bạn có mệt không? Tôi không mệt. Bố mẹ bạn có khoẻ không? Bố mẹ tôi đều khoẻ, cảm ơn! Tiếng Trung có khó không? Tiếng Trung không khó lắm." }
    },
    {
      id: 3, title: "Hôm nay là thứ mấy?", zh: "今天星期几？",
      words: `
今天|jīn tiān|hôm nay
明天|míng tiān|ngày mai
昨天|zuó tiān|hôm qua
星期|xīng qī|tuần, thứ
星期一|xīng qī yī|thứ Hai
星期天|xīng qī tiān|Chủ nhật
几|jǐ|mấy
月|yuè|tháng
号|hào|ngày
年|nián|năm
生日|shēng rì|sinh nhật
上午|shàng wǔ|buổi sáng
下午|xià wǔ|buổi chiều
晚上|wǎn shang|buổi tối
有|yǒu|có
没有|méi yǒu|không có
课|kè|bài học, tiết học
上课|shàng kè|lên lớp
去|qù|đi
学校|xué xiào|trường học`,
      make: [
        { w: "星期几", py: "xīngqī jǐ", vi: "thứ mấy", must: ["星期"], s: "明天星期几？", sp: "Míngtiān xīngqī jǐ?", sv: "Ngày mai là thứ mấy?" },
        { w: "几月几号", py: "jǐ yuè jǐ hào", vi: "ngày mấy tháng mấy", must: ["月", "号"], s: "今天几月几号？", sp: "Jīntiān jǐ yuè jǐ hào?", sv: "Hôm nay là ngày mấy tháng mấy?" },
        { w: "生日", py: "shēngrì", vi: "sinh nhật", must: ["生日"], s: "我的生日是五月八号。", sp: "Wǒ de shēngrì shì wǔ yuè bā hào.", sv: "Sinh nhật tôi là ngày 8 tháng 5." },
        { w: "昨天", py: "zuótiān", vi: "hôm qua", must: ["昨天"], s: "昨天是星期天。", sp: "Zuótiān shì xīngqītiān.", sv: "Hôm qua là Chủ nhật." },
        { w: "上课", py: "shàngkè", vi: "lên lớp", must: ["上课"], s: "我们上午上课。", sp: "Wǒmen shàngwǔ shàngkè.", sv: "Chúng tôi lên lớp vào buổi sáng." },
        { w: "没有", py: "méiyǒu", vi: "không có", must: ["没有"], re: "没有.+", s: "今天下午我没有课。", sp: "Jīntiān xiàwǔ wǒ méiyǒu kè.", sv: "Chiều nay tôi không có tiết học." }
      ],
      qa: [
        { q: "今天星期几？", py: "Jīntiān xīngqī jǐ?", vi: "Hôm nay là thứ mấy?", kw: ["星期|礼拜|周"], a: "今天星期三。", av: "Hôm nay là thứ Tư." },
        { q: "明天星期几？", py: "Míngtiān xīngqī jǐ?", vi: "Ngày mai là thứ mấy?", kw: ["星期|礼拜|周"], a: "明天星期四。", av: "Ngày mai là thứ Năm." },
        { q: "今天几月几号？", py: "Jīntiān jǐ yuè jǐ hào?", vi: "Hôm nay là ngày mấy tháng mấy?", kw: ["月", "号|日"], a: "今天十一月五号。", av: "Hôm nay là ngày 5 tháng 11." },
        { q: "你的生日是几月几号？", py: "Nǐ de shēngrì shì jǐ yuè jǐ hào?", vi: "Sinh nhật em là ngày mấy tháng mấy?", kw: ["月", "号|日"], a: "我的生日是三月八号。", av: "Sinh nhật em là ngày 8 tháng 3." },
        { q: "你今天有课吗？", py: "Nǐ jīntiān yǒu kè ma?", vi: "Hôm nay em có tiết học không?", kw: ["有|没有"], a: "今天上午有课，下午没有课。", av: "Sáng nay có tiết, chiều không có." },
        { q: "你星期几去学校？", py: "Nǐ xīngqī jǐ qù xuéxiào?", vi: "Em đến trường vào thứ mấy?", kw: ["星期|每天|天天"], a: "我星期一去学校。", av: "Em đến trường vào thứ Hai." }
      ],
      read: { zh: "今天九月一号，星期一。昨天星期天，明天星期二。今天上午我有课，下午没有课。我的生日是五月八号，你的生日是几月几号？", py: "Jīntiān jiǔ yuè yī hào, xīngqīyī. Zuótiān xīngqītiān, míngtiān xīngqī'èr. Jīntiān shàngwǔ wǒ yǒu kè, xiàwǔ méiyǒu kè. Wǒ de shēngrì shì wǔ yuè bā hào, nǐ de shēngrì shì jǐ yuè jǐ hào?", vi: "Hôm nay là ngày 1 tháng 9, thứ Hai. Hôm qua là Chủ nhật, ngày mai là thứ Ba. Sáng nay tôi có tiết học, chiều không có. Sinh nhật tôi là ngày 8 tháng 5, sinh nhật bạn là ngày mấy tháng mấy?" }
    },
    {
      id: 4, title: "Đây là cái gì?", zh: "这是什么？",
      words: `
这|zhè|đây, này
那|nà|kia, đó
是|shì|là
什么|shén me|gì, cái gì
书|shū|sách
本子|běn zi|vở
笔|bǐ|bút
词典|cí diǎn|từ điển
杂志|zá zhì|tạp chí
手机|shǒu jī|điện thoại di động
电脑|diàn nǎo|máy tính
谁|shéi|ai
的|de|của
中文|Zhōng wén|tiếng Trung
英文|Yīng wén|tiếng Anh
朋友|péng you|bạn bè
同学|tóng xué|bạn học`,
      make: [
        { w: "这", py: "zhè", vi: "đây, này", must: ["这"], re: "这.+", s: "这是我的书。", sp: "Zhè shì wǒ de shū.", sv: "Đây là sách của tôi." },
        { w: "那", py: "nà", vi: "kia, đó", must: ["那"], re: "那.+", s: "那是什么？", sp: "Nà shì shénme?", sv: "Kia là cái gì?" },
        { w: "什么", py: "shénme", vi: "gì, cái gì", must: ["什么"], s: "这是什么杂志？", sp: "Zhè shì shénme zázhì?", sv: "Đây là tạp chí gì?" },
        { w: "谁", py: "shéi", vi: "ai", must: ["谁"], s: "他是谁？", sp: "Tā shì shéi?", sv: "Anh ấy là ai?" },
        { w: "的", py: "de", vi: "của", must: ["的"], re: ".+的.+", s: "这是老师的词典。", sp: "Zhè shì lǎoshī de cídiǎn.", sv: "Đây là từ điển của thầy giáo." },
        { w: "是……吗？", py: "shì … ma", vi: "có phải là … không?", must: ["是", "吗"], re: "是.+吗", s: "这是你的手机吗？", sp: "Zhè shì nǐ de shǒujī ma?", sv: "Đây là điện thoại của bạn phải không?" }
      ],
      qa: [
        { q: "这是你的书吗？", py: "Zhè shì nǐ de shū ma?", vi: "Đây là sách của em phải không?", kw: ["是|不是|对"], a: "是，这是我的书。", av: "Vâng, đây là sách của em." },
        { q: "那是谁的手机？", py: "Nà shì shéi de shǒujī?", vi: "Kia là điện thoại của ai?", kw: ["的|我|他|她", "我|他|她|老师|朋友|同学|哥哥|爸爸|妈妈"], a: "那是我朋友的手机。", av: "Đó là điện thoại của bạn em." },
        { q: "这是什么书？", py: "Zhè shì shénme shū?", vi: "Đây là sách gì?", kw: ["书|中文|英文|汉语|英语"], a: "这是中文书。", av: "Đây là sách tiếng Trung." },
        { q: "你有中文词典吗？", py: "Nǐ yǒu Zhōngwén cídiǎn ma?", vi: "Em có từ điển tiếng Trung không?", kw: ["有|没有"], a: "我有中文词典。", av: "Em có từ điển tiếng Trung." },
        { q: "他是谁？", py: "Tā shì shéi?", vi: "Anh ấy là ai?", kw: ["是", "老师|朋友|同学|哥哥|爸爸|弟弟|他|我"], a: "他是我的同学。", av: "Anh ấy là bạn học của em." }
      ],
      read: { zh: "这是什么？这是书。这是什么书？这是中文书。那是谁的词典？那是王老师的词典。这是你的手机吗？不是，这是我朋友的手机。", py: "Zhè shì shénme? Zhè shì shū. Zhè shì shénme shū? Zhè shì Zhōngwén shū. Nà shì shéi de cídiǎn? Nà shì Wáng lǎoshī de cídiǎn. Zhè shì nǐ de shǒujī ma? Bú shì, zhè shì wǒ péngyou de shǒujī.", vi: "Đây là cái gì? Đây là sách. Đây là sách gì? Đây là sách tiếng Trung. Kia là từ điển của ai? Đó là từ điển của thầy Vương. Đây là điện thoại của bạn phải không? Không phải, đây là điện thoại của bạn tôi." }
    },
    {
      id: 5, title: "Ôn tập (1)", zh: "复习（一）", review: [1, 4],
      words: ``, make: [], qa: [],
      read: { zh: "老师，您好！你忙吗？我不太忙。今天星期几？今天星期五。这是什么？这是我的中文书。那是谁的手机？那是我同学的手机。谢谢老师，再见！", py: "Lǎoshī, nín hǎo! Nǐ máng ma? Wǒ bú tài máng. Jīntiān xīngqī jǐ? Jīntiān xīngqīwǔ. Zhè shì shénme? Zhè shì wǒ de Zhōngwén shū. Nà shì shéi de shǒujī? Nà shì wǒ tóngxué de shǒujī. Xièxie lǎoshī, zàijiàn!", vi: "Em chào thầy ạ! Em có bận không? Em không bận lắm. Hôm nay là thứ mấy? Hôm nay là thứ Sáu. Đây là cái gì? Đây là sách tiếng Trung của em. Kia là điện thoại của ai? Đó là điện thoại của bạn học em. Em cảm ơn thầy, chào thầy ạ!" }
    },
    {
      id: 6, title: "Chào các bạn buổi sáng!", zh: "同学们，早上好！",
      words: `
同学们|tóng xué men|các bạn học
早上|zǎo shang|buổi sáng
早上好|zǎo shang hǎo|chào buổi sáng
请|qǐng|mời, xin
进|jìn|vào
坐|zuò|ngồi
叫|jiào|tên là, gọi
名字|míng zi|tên
姓|xìng|họ
贵姓|guì xìng|quý danh (hỏi họ lịch sự)
请问|qǐng wèn|xin hỏi
国|guó|nước
人|rén|người
哪|nǎ|nào
中国|Zhōng guó|Trung Quốc
越南|Yuè nán|Việt Nam
认识|rèn shi|quen biết
高兴|gāo xìng|vui
欢迎|huān yíng|chào mừng`,
      make: [
        { w: "叫", py: "jiào", vi: "tên là", must: ["叫"], re: "叫.+", s: "我叫阿兰。", sp: "Wǒ jiào Ālán.", sv: "Tôi tên là Lan." },
        { w: "姓", py: "xìng", vi: "họ", must: ["姓"], re: "姓.+", s: "我姓阮。", sp: "Wǒ xìng Ruǎn.", sv: "Tôi họ Nguyễn." },
        { w: "哪国人", py: "nǎ guó rén", vi: "người nước nào", must: ["哪", "国"], s: "他是哪国人？", sp: "Tā shì nǎ guó rén?", sv: "Anh ấy là người nước nào?" },
        { w: "认识", py: "rènshi", vi: "quen biết", must: ["认识"], s: "认识你很高兴。", sp: "Rènshi nǐ hěn gāoxìng.", sv: "Rất vui được làm quen với bạn." },
        { w: "请", py: "qǐng", vi: "mời", must: ["请"], re: "请.+", s: "请进！请坐！", sp: "Qǐng jìn! Qǐng zuò!", sv: "Mời vào! Mời ngồi!" },
        { w: "欢迎", py: "huānyíng", vi: "chào mừng", must: ["欢迎"], s: "欢迎你们！", sp: "Huānyíng nǐmen!", sv: "Chào mừng các bạn!" },
        { w: "越南人", py: "Yuènán rén", vi: "người Việt Nam", must: ["越南"], s: "我也是越南人。", sp: "Wǒ yě shì Yuènán rén.", sv: "Tôi cũng là người Việt Nam." }
      ],
      qa: [
        { q: "同学们，早上好！", py: "Tóngxuémen, zǎoshang hǎo!", vi: "Chào các em buổi sáng!", kw: ["好"], a: "老师，早上好！", av: "Em chào thầy buổi sáng ạ!" },
        { q: "你叫什么名字？", py: "Nǐ jiào shénme míngzi?", vi: "Em tên là gì?", kw: ["叫|是|名字"], a: "我叫阿兰。", av: "Em tên là Lan." },
        { q: "请问，您贵姓？", py: "Qǐngwèn, nín guìxìng?", vi: "Xin hỏi, em họ gì?", kw: ["姓"], a: "我姓阮。", av: "Em họ Nguyễn." },
        { q: "你是哪国人？", py: "Nǐ shì nǎ guó rén?", vi: "Em là người nước nào?", kw: ["越南|中国|美国|韩国|日本|英国|法国", "人"], a: "我是越南人。", av: "Em là người Việt Nam." },
        { q: "认识你很高兴。", py: "Rènshi nǐ hěn gāoxìng.", vi: "Rất vui được làm quen với em.", kw: ["高兴|认识", "也|很"], a: "认识您，我也很高兴。", av: "Em cũng rất vui được làm quen với thầy." },
        { q: "你的老师是哪国人？", py: "Nǐ de lǎoshī shì nǎ guó rén?", vi: "Thầy (cô) giáo em là người nước nào?", kw: ["人"], a: "我的老师是中国人。", av: "Thầy giáo em là người Trung Quốc." }
      ],
      read: { zh: "同学们，早上好！老师，早上好！请进，请坐。我姓王，叫王明，是你们的汉语老师。请问，你叫什么名字？我叫阿兰，我是越南人。认识你很高兴！欢迎你！", py: "Tóngxuémen, zǎoshang hǎo! Lǎoshī, zǎoshang hǎo! Qǐng jìn, qǐng zuò. Wǒ xìng Wáng, jiào Wáng Míng, shì nǐmen de Hànyǔ lǎoshī. Qǐngwèn, nǐ jiào shénme míngzi? Wǒ jiào Ālán, wǒ shì Yuènán rén. Rènshi nǐ hěn gāoxìng! Huānyíng nǐ!", vi: "Chào các em buổi sáng! Em chào thầy buổi sáng ạ! Mời vào, mời ngồi. Tôi họ Vương, tên là Vương Minh, là thầy giáo tiếng Trung của các em. Xin hỏi, em tên là gì? Em tên là Lan, em là người Việt Nam. Rất vui được làm quen với em! Chào mừng em!" }
    },
    {
      id: 7, title: "Nhà bạn có mấy người?", zh: "你家有几口人？",
      words: `
家|jiā|nhà, gia đình
口|kǒu|(lượng từ đếm người trong nhà)
和|hé|và
姐姐|jiě jie|chị gái
弟弟|dì di|em trai
妹妹|mèi mei|em gái
工作|gōng zuò|công việc, làm việc
医生|yī shēng|bác sĩ
律师|lǜ shī|luật sư
大学生|dà xué shēng|sinh viên
今年|jīn nián|năm nay
多大|duō dà|bao nhiêu tuổi
岁|suì|tuổi
狗|gǒu|chó
只|zhī|con (lượng từ cho con vật)
可爱|kě ài|đáng yêu`,
      make: [
        { w: "口", py: "kǒu", vi: "(lượng từ đếm người trong nhà)", must: ["口"], s: "我家有四口人。", sp: "Wǒ jiā yǒu sì kǒu rén.", sv: "Nhà tôi có bốn người." },
        { w: "和", py: "hé", vi: "và", must: ["和"], re: ".+和.+", s: "我有一个哥哥和一个妹妹。", sp: "Wǒ yǒu yí ge gēge hé yí ge mèimei.", sv: "Tôi có một anh trai và một em gái." },
        { w: "多大", py: "duō dà", vi: "bao nhiêu tuổi", must: ["多大"], s: "你今年多大？", sp: "Nǐ jīnnián duō dà?", sv: "Năm nay bạn bao nhiêu tuổi?" },
        { w: "岁", py: "suì", vi: "tuổi", must: ["岁"], s: "我今年二十岁。", sp: "Wǒ jīnnián èrshí suì.", sv: "Năm nay tôi hai mươi tuổi." },
        { w: "医生", py: "yīshēng", vi: "bác sĩ", must: ["医生"], s: "我爸爸是医生。", sp: "Wǒ bàba shì yīshēng.", sv: "Bố tôi là bác sĩ." },
        { w: "只", py: "zhī", vi: "con (lượng từ cho con vật)", must: ["只"], re: "只.+", s: "我家有一只狗。", sp: "Wǒ jiā yǒu yì zhī gǒu.", sv: "Nhà tôi có một con chó." },
        { w: "可爱", py: "kě'ài", vi: "đáng yêu", must: ["可爱"], s: "你的狗真可爱！", sp: "Nǐ de gǒu zhēn kě'ài!", sv: "Con chó của bạn đáng yêu thật!" }
      ],
      qa: [
        { q: "你家有几口人？", py: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà em có mấy người?", kw: ["口|个", "[一二两三四五六七八九十]|\\d"], a: "我家有四口人。", av: "Nhà em có bốn người." },
        { q: "你家有什么人？", py: "Nǐ jiā yǒu shénme rén?", vi: "Nhà em có những ai?", kw: ["爸爸|妈妈|哥哥|姐姐|弟弟|妹妹|爷爷|奶奶", "和|还有|我"], a: "爸爸、妈妈、妹妹和我。", av: "Bố, mẹ, em gái và em." },
        { q: "你今年多大？", py: "Nǐ jīnnián duō dà?", vi: "Năm nay em bao nhiêu tuổi?", kw: ["岁|[一二两三四五六七八九十]|\\d"], a: "我今年二十岁。", av: "Năm nay em hai mươi tuổi." },
        { q: "你爸爸做什么工作？", py: "Nǐ bàba zuò shénme gōngzuò?", vi: "Bố em làm nghề gì?", kw: ["医生|律师|老师|公司|工作|司机|农民|银行|商店"], a: "我爸爸是医生。", av: "Bố em là bác sĩ." },
        { q: "你有哥哥吗？", py: "Nǐ yǒu gēge ma?", vi: "Em có anh trai không?", kw: ["有|没有"], a: "我没有哥哥，我有一个姐姐。", av: "Em không có anh trai, em có một chị gái." },
        { q: "你家有狗吗？", py: "Nǐ jiā yǒu gǒu ma?", vi: "Nhà em có nuôi chó không?", kw: ["有|没有"], a: "有，我家有一只狗，非常可爱。", av: "Có, nhà em có một con chó, rất đáng yêu." }
      ],
      read: { zh: "我家有五口人：爸爸、妈妈、哥哥、妹妹和我。我爸爸是医生，妈妈是老师。哥哥今年二十五岁，他是律师。妹妹是大学生。我家还有一只狗，非常可爱。", py: "Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, gēge, mèimei hé wǒ. Wǒ bàba shì yīshēng, māma shì lǎoshī. Gēge jīnnián èrshíwǔ suì, tā shì lǜshī. Mèimei shì dàxuéshēng. Wǒ jiā hái yǒu yì zhī gǒu, fēicháng kě'ài.", vi: "Nhà tôi có năm người: bố, mẹ, anh trai, em gái và tôi. Bố tôi là bác sĩ, mẹ là giáo viên. Anh trai năm nay 25 tuổi, anh ấy là luật sư. Em gái là sinh viên. Nhà tôi còn có một con chó, rất đáng yêu." }
    },
    {
      id: 8, title: "Xin hỏi, toà văn phòng ở đâu?", zh: "请问，办公楼在哪儿？",
      words: `
办公楼|bàn gōng lóu|toà nhà văn phòng
在|zài|ở, tại
哪儿|nǎr|ở đâu
这儿|zhèr|ở đây
那儿|nàr|ở đó
前边|qián bian|phía trước
后边|hòu bian|phía sau
左边|zuǒ bian|bên trái
右边|yòu bian|bên phải
旁边|páng biān|bên cạnh
对面|duì miàn|đối diện
图书馆|tú shū guǎn|thư viện
食堂|shí táng|nhà ăn
宿舍|sù shè|ký túc xá
教室|jiào shì|phòng học
银行|yín háng|ngân hàng
往|wǎng|về phía
走|zǒu|đi
就|jiù|ngay, chính là`,
      make: [
        { w: "在", py: "zài", vi: "ở, tại", must: ["在"], re: "在.+", s: "图书馆在食堂对面。", sp: "Túshūguǎn zài shítáng duìmiàn.", sv: "Thư viện ở đối diện nhà ăn." },
        { w: "哪儿", py: "nǎr", vi: "ở đâu", must: ["哪"], s: "办公楼在哪儿？", sp: "Bàngōnglóu zài nǎr?", sv: "Toà văn phòng ở đâu?" },
        { w: "旁边", py: "pángbiān", vi: "bên cạnh", must: ["旁边"], s: "食堂在宿舍旁边。", sp: "Shítáng zài sùshè pángbiān.", sv: "Nhà ăn ở bên cạnh ký túc xá." },
        { w: "对面", py: "duìmiàn", vi: "đối diện", must: ["对面"], s: "银行在学校对面。", sp: "Yínháng zài xuéxiào duìmiàn.", sv: "Ngân hàng ở đối diện trường." },
        { w: "往", py: "wǎng", vi: "về phía", must: ["往"], re: "往.+", s: "往前走。", sp: "Wǎng qián zǒu.", sv: "Đi thẳng về phía trước." },
        { w: "就", py: "jiù", vi: "ngay, chính là", must: ["就"], s: "教室就在前边。", sp: "Jiàoshì jiù zài qiánbian.", sv: "Phòng học ở ngay phía trước." },
        { w: "后边", py: "hòubian", vi: "phía sau", must: ["后边"], s: "宿舍在食堂后边。", sp: "Sùshè zài shítáng hòubian.", sv: "Ký túc xá ở phía sau nhà ăn." }
      ],
      qa: [
        { q: "请问，办公楼在哪儿？", py: "Qǐngwèn, bàngōnglóu zài nǎr?", vi: "Xin hỏi, toà văn phòng ở đâu?", kw: ["在|往|走", "前|后|左|右|旁边|对面|边|这儿|那儿"], a: "办公楼在图书馆对面。", av: "Toà văn phòng ở đối diện thư viện." },
        { q: "图书馆在哪儿？", py: "Túshūguǎn zài nǎr?", vi: "Thư viện ở đâu?", kw: ["在|往|走", "前|后|左|右|旁边|对面|边|这儿|那儿"], a: "往前走，图书馆就在前边。", av: "Đi thẳng, thư viện ở ngay phía trước." },
        { q: "你的宿舍在哪儿？", py: "Nǐ de sùshè zài nǎr?", vi: "Ký túc xá của em ở đâu?", kw: ["在", "前|后|左|右|旁边|对面|边|这儿|那儿|学校"], a: "我的宿舍在食堂后边。", av: "Ký túc xá của em ở phía sau nhà ăn." },
        { q: "食堂在图书馆旁边吗？", py: "Shítáng zài túshūguǎn pángbiān ma?", vi: "Nhà ăn ở bên cạnh thư viện phải không?", kw: ["是|不是|在|不在|对"], a: "对，食堂在图书馆旁边。", av: "Đúng, nhà ăn ở bên cạnh thư viện." },
        { q: "你们的教室在哪儿？", py: "Nǐmen de jiàoshì zài nǎr?", vi: "Phòng học của các em ở đâu?", kw: ["在", "前|后|左|右|旁边|对面|边|这儿|那儿|楼"], a: "我们的教室在办公楼旁边。", av: "Phòng học của chúng em ở bên cạnh toà văn phòng." },
        { q: "你家在哪儿？", py: "Nǐ jiā zài nǎr?", vi: "Nhà em ở đâu?", kw: ["在"], a: "我家在河江。", av: "Nhà em ở Hà Giang." }
      ],
      read: { zh: "请问，办公楼在哪儿？办公楼在图书馆对面。图书馆在哪儿？往前走，图书馆就在前边。食堂在图书馆旁边，我们的宿舍在食堂后边。谢谢你！不客气。", py: "Qǐngwèn, bàngōnglóu zài nǎr? Bàngōnglóu zài túshūguǎn duìmiàn. Túshūguǎn zài nǎr? Wǎng qián zǒu, túshūguǎn jiù zài qiánbian. Shítáng zài túshūguǎn pángbiān, wǒmen de sùshè zài shítáng hòubian. Xièxie nǐ! Bú kèqi.", vi: "Xin hỏi, toà văn phòng ở đâu? Toà văn phòng ở đối diện thư viện. Thư viện ở đâu? Đi thẳng, thư viện ở ngay phía trước. Nhà ăn ở bên cạnh thư viện, ký túc xá của chúng tôi ở phía sau nhà ăn. Cảm ơn bạn! Không có gì." }
    },
    {
      id: 9, title: "Trường bạn có bao nhiêu học sinh?", zh: "你们学校有多少个学生？",
      words: `
学校|xué xiào|trường học
多少|duō shao|bao nhiêu
个|gè|cái, người (lượng từ)
学生|xué sheng|học sinh, sinh viên
留学生|liú xué shēng|du học sinh
大学|dà xué|đại học
班|bān|lớp
外国|wài guó|nước ngoài
多|duō|nhiều
少|shǎo|ít
百|bǎi|trăm
千|qiān|nghìn
两|liǎng|hai
韩国|Hán guó|Hàn Quốc
教|jiāo|dạy`,
      make: [
        { w: "多少", py: "duōshao", vi: "bao nhiêu", must: ["多少"], s: "你们学校有多少个学生？", sp: "Nǐmen xuéxiào yǒu duōshao ge xuésheng?", sv: "Trường các bạn có bao nhiêu học sinh?" },
        { w: "个", py: "gè", vi: "cái, người (lượng từ)", must: ["个"], re: "[一二两三四五六七八九十几百千多]个.+", s: "我们班有十个学生。", sp: "Wǒmen bān yǒu shí ge xuésheng.", sv: "Lớp chúng tôi có mười học sinh." },
        { w: "有", py: "yǒu", vi: "có", must: ["有"], re: "有.+", s: "我们学校有很多留学生。", sp: "Wǒmen xuéxiào yǒu hěn duō liúxuéshēng.", sv: "Trường chúng tôi có rất nhiều du học sinh." },
        { w: "几", py: "jǐ", vi: "mấy", must: ["几"], s: "你们班有几个老师？", sp: "Nǐmen bān yǒu jǐ ge lǎoshī?", sv: "Lớp các bạn có mấy giáo viên?" },
        { w: "百", py: "bǎi", vi: "trăm", must: ["百"], s: "我们学校有八百个学生。", sp: "Wǒmen xuéxiào yǒu bābǎi ge xuésheng.", sv: "Trường chúng tôi có tám trăm học sinh." },
        { w: "两", py: "liǎng", vi: "hai (+ lượng từ)", must: ["两"], re: "两.+", s: "我们有两个汉语老师。", sp: "Wǒmen yǒu liǎng ge Hànyǔ lǎoshī.", sv: "Chúng tôi có hai giáo viên tiếng Trung." },
        { w: "教", py: "jiāo", vi: "dạy", must: ["教"], re: "教.+", s: "王老师教我们汉语。", sp: "Wáng lǎoshī jiāo wǒmen Hànyǔ.", sv: "Thầy Vương dạy chúng tôi tiếng Trung." }
      ],
      qa: [
        { q: "你们学校有多少个学生？", py: "Nǐmen xuéxiào yǒu duōshao ge xuésheng?", vi: "Trường các em có bao nhiêu học sinh?", kw: ["百|千|万|很多|多|[一二两三四五六七八九十]|\\d"], a: "我们学校有两千多个学生。", av: "Trường chúng em có hơn hai nghìn học sinh." },
        { q: "你们班有几个学生？", py: "Nǐmen bān yǒu jǐ ge xuésheng?", vi: "Lớp các em có mấy học sinh?", kw: ["个|人", "[一二两三四五六七八九十]|\\d"], a: "我们班有十五个学生。", av: "Lớp chúng em có mười lăm học sinh." },
        { q: "你们学校有留学生吗？", py: "Nǐmen xuéxiào yǒu liúxuéshēng ma?", vi: "Trường các em có du học sinh không?", kw: ["有|没有"], a: "有，我们学校有很多留学生。", av: "Có, trường chúng em có nhiều du học sinh." },
        { q: "你们有几个汉语老师？", py: "Nǐmen yǒu jǐ ge Hànyǔ lǎoshī?", vi: "Các em có mấy giáo viên tiếng Trung?", kw: ["个|位", "[一二两三四五六七八九十]|\\d"], a: "我们有两个汉语老师。", av: "Chúng em có hai giáo viên tiếng Trung." },
        { q: "谁教你们汉语？", py: "Shéi jiāo nǐmen Hànyǔ?", vi: "Ai dạy các em tiếng Trung?", kw: ["老师|教"], a: "王老师教我们汉语。", av: "Thầy Vương dạy chúng em tiếng Trung." },
        { q: "你们班有外国学生吗？", py: "Nǐmen bān yǒu wàiguó xuésheng ma?", vi: "Lớp các em có học sinh nước ngoài không?", kw: ["有|没有"], a: "有，我们班有两个韩国学生。", av: "Có, lớp chúng em có hai học sinh Hàn Quốc." }
      ],
      read: { zh: "我们学校很大，有两千多个学生，也有很多留学生。我们班有十五个学生，有越南人，也有韩国人。我们有两个汉语老师，他们都是中国人。王老师教我们汉语。", py: "Wǒmen xuéxiào hěn dà, yǒu liǎngqiān duō ge xuésheng, yě yǒu hěn duō liúxuéshēng. Wǒmen bān yǒu shíwǔ ge xuésheng, yǒu Yuènán rén, yě yǒu Hánguó rén. Wǒmen yǒu liǎng ge Hànyǔ lǎoshī, tāmen dōu shì Zhōngguó rén. Wáng lǎoshī jiāo wǒmen Hànyǔ.", vi: "Trường chúng tôi rất lớn, có hơn hai nghìn học sinh, cũng có nhiều du học sinh. Lớp chúng tôi có mười lăm học sinh, có người Việt Nam, cũng có người Hàn Quốc. Chúng tôi có hai giáo viên tiếng Trung, họ đều là người Trung Quốc. Thầy Vương dạy chúng tôi tiếng Trung." }
    },
    {
      id: 10, title: "Ôn tập (2)", zh: "复习（二）", review: [6, 9],
      words: ``, make: [], qa: [],
      read: { zh: "同学们好！我叫阿兰，我是越南人。我家有四口人：爸爸、妈妈、哥哥和我。我们学校有两千多个学生。图书馆在办公楼对面，食堂在图书馆旁边。欢迎你们！", py: "Tóngxuémen hǎo! Wǒ jiào Ālán, wǒ shì Yuènán rén. Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ. Wǒmen xuéxiào yǒu liǎngqiān duō ge xuésheng. Túshūguǎn zài bàngōnglóu duìmiàn, shítáng zài túshūguǎn pángbiān. Huānyíng nǐmen!", vi: "Chào các bạn! Tôi tên là Lan, tôi là người Việt Nam. Nhà tôi có bốn người: bố, mẹ, anh trai và tôi. Trường chúng tôi có hơn hai nghìn học sinh. Thư viện ở đối diện toà văn phòng, nhà ăn ở bên cạnh thư viện. Chào mừng các bạn!" }
    },
    {
      id: 11, title: "Bạn muốn loại này hay loại kia?", zh: "你要这种还是要那种？",
      words: `
要|yào|muốn, cần
种|zhǒng|loại
这种|zhè zhǒng|loại này
那种|nà zhǒng|loại kia
还是|hái shi|hay là
买|mǎi|mua
水果|shuǐ guǒ|hoa quả
苹果|píng guǒ|táo
香蕉|xiāng jiāo|chuối
斤|jīn|cân (nửa ki-lô-gam)
块|kuài|đồng (tệ)
钱|qián|tiền
一共|yí gòng|tổng cộng
贵|guì|đắt
便宜|pián yi|rẻ
别的|bié de|cái khác
茶|chá|trà
咖啡|kā fēi|cà phê`,
      make: [
        { w: "还是", py: "háishi", vi: "hay là (câu hỏi lựa chọn)", must: ["还是"], re: ".+还是.+", s: "你要这种还是要那种？", sp: "Nǐ yào zhè zhǒng háishi yào nà zhǒng?", sv: "Bạn muốn loại này hay loại kia?" },
        { w: "要", py: "yào", vi: "muốn, cần", must: ["要"], re: "要.+", s: "我要两斤苹果。", sp: "Wǒ yào liǎng jīn píngguǒ.", sv: "Tôi muốn hai cân táo." },
        { w: "一共", py: "yígòng", vi: "tổng cộng", must: ["一共"], s: "一共多少钱？", sp: "Yígòng duōshao qián?", sv: "Tổng cộng bao nhiêu tiền?" },
        { w: "贵", py: "guì", vi: "đắt", must: ["贵"], s: "这种苹果太贵了。", sp: "Zhè zhǒng píngguǒ tài guì le.", sv: "Loại táo này đắt quá." },
        { w: "便宜", py: "piányi", vi: "rẻ", must: ["便宜"], s: "那种香蕉很便宜。", sp: "Nà zhǒng xiāngjiāo hěn piányi.", sv: "Loại chuối kia rất rẻ." },
        { w: "买", py: "mǎi", vi: "mua", must: ["买"], re: "买.+", s: "我去买水果。", sp: "Wǒ qù mǎi shuǐguǒ.", sv: "Tôi đi mua hoa quả." },
        { w: "多少钱一斤", py: "duōshao qián yì jīn", vi: "bao nhiêu tiền một cân", must: ["多少", "斤"], s: "苹果多少钱一斤？", sp: "Píngguǒ duōshao qián yì jīn?", sv: "Táo bao nhiêu tiền một cân?" }
      ],
      qa: [
        { q: "你要这种还是要那种？", py: "Nǐ yào zhè zhǒng háishi yào nà zhǒng?", vi: "Em muốn loại này hay loại kia?", kw: ["这种|那种|这个|那个|都"], a: "我要这种。", av: "Em lấy loại này." },
        { q: "苹果多少钱一斤？", py: "Píngguǒ duōshao qián yì jīn?", vi: "Táo bao nhiêu tiền một cân?", kw: ["块|钱|元|毛", "[一二两三四五六七八九十]|\\d"], a: "五块一斤。", av: "Năm tệ một cân." },
        { q: "你要几斤？", py: "Nǐ yào jǐ jīn?", vi: "Em muốn mấy cân?", kw: ["斤|个", "[一二两三四五六七八九十]|\\d"], a: "我要两斤。", av: "Em muốn hai cân." },
        { q: "还要别的吗？", py: "Hái yào bié de ma?", vi: "Còn muốn thứ gì khác không?", kw: ["要|不要|还|够了|没有"], a: "还要一斤香蕉。", av: "Cho thêm một cân chuối." },
        { q: "你喝茶还是喝咖啡？", py: "Nǐ hē chá háishi hē kāfēi?", vi: "Em uống trà hay uống cà phê?", kw: ["茶|咖啡|都"], a: "我喝茶。", av: "Em uống trà." },
        { q: "你想买什么？", py: "Nǐ xiǎng mǎi shénme?", vi: "Em muốn mua gì?", kw: ["买|要", "水果|苹果|香蕉|书|本子|笔|手机|茶|咖啡|东西|词典"], a: "我想买水果。", av: "Em muốn mua hoa quả." }
      ],
      read: { zh: "你好，苹果多少钱一斤？这种五块一斤，那种三块一斤。你要这种还是要那种？我要这种，要两斤。还要别的吗？还要一斤香蕉。香蕉三块一斤。一共十三块。", py: "Nǐ hǎo, píngguǒ duōshao qián yì jīn? Zhè zhǒng wǔ kuài yì jīn, nà zhǒng sān kuài yì jīn. Nǐ yào zhè zhǒng háishi yào nà zhǒng? Wǒ yào zhè zhǒng, yào liǎng jīn. Hái yào bié de ma? Hái yào yì jīn xiāngjiāo. Xiāngjiāo sān kuài yì jīn. Yígòng shísān kuài.", vi: "Chào chị, táo bao nhiêu tiền một cân? Loại này năm tệ một cân, loại kia ba tệ một cân. Em muốn loại này hay loại kia? Em lấy loại này, hai cân. Còn muốn thứ gì khác không? Cho thêm một cân chuối. Chuối ba tệ một cân. Tổng cộng mười ba tệ." }
    },
    {
      id: 12, title: "Ngày mai là ngày Nhà giáo Trung Quốc", zh: "明天是中国的教师节",
      words: `
教师节|jiào shī jié|ngày Nhà giáo
节日|jié rì|ngày lễ
春节|chūn jié|Tết Nguyên đán
送|sòng|tặng
花|huā|hoa
礼物|lǐ wù|quà
给|gěi|cho, đưa cho
祝|zhù|chúc
快乐|kuài lè|vui vẻ
一起|yì qǐ|cùng nhau
每年|měi nián|mỗi năm
九月|jiǔ yuè|tháng Chín
想|xiǎng|muốn`,
      make: [
        { w: "送", py: "sòng", vi: "tặng", must: ["送"], re: "送.+", s: "我们送老师花。", sp: "Wǒmen sòng lǎoshī huā.", sv: "Chúng tôi tặng hoa cho thầy cô." },
        { w: "祝", py: "zhù", vi: "chúc", must: ["祝"], re: "祝.+", s: "祝老师节日快乐！", sp: "Zhù lǎoshī jiérì kuàilè!", sv: "Chúc thầy cô ngày lễ vui vẻ!" },
        { w: "礼物", py: "lǐwù", vi: "quà", must: ["礼物"], s: "这是给你的礼物。", sp: "Zhè shì gěi nǐ de lǐwù.", sv: "Đây là quà tặng bạn." },
        { w: "一起", py: "yìqǐ", vi: "cùng nhau", must: ["一起"], s: "我们一起去买花。", sp: "Wǒmen yìqǐ qù mǎi huā.", sv: "Chúng ta cùng đi mua hoa." },
        { w: "给", py: "gěi", vi: "cho, tặng cho", must: ["给"], re: "给.+", s: "我给妈妈买礼物。", sp: "Wǒ gěi māma mǎi lǐwù.", sv: "Tôi mua quà cho mẹ." },
        { w: "每年", py: "měi nián", vi: "mỗi năm", must: ["每年"], s: "每年九月十号是中国的教师节。", sp: "Měi nián jiǔ yuè shí hào shì Zhōngguó de Jiàoshī Jié.", sv: "Ngày 10 tháng 9 hằng năm là ngày Nhà giáo Trung Quốc." },
        { w: "想", py: "xiǎng", vi: "muốn", must: ["想"], re: "想.+", s: "我想送老师一本书。", sp: "Wǒ xiǎng sòng lǎoshī yì běn shū.", sv: "Tôi muốn tặng thầy một cuốn sách." }
      ],
      qa: [
        { q: "中国的教师节是几月几号？", py: "Zhōngguó de Jiàoshī Jié shì jǐ yuè jǐ hào?", vi: "Ngày Nhà giáo Trung Quốc là ngày mấy tháng mấy?", kw: ["月", "号|日"], a: "九月十号。", av: "Ngày 10 tháng 9." },
        { q: "越南的教师节是几月几号？", py: "Yuènán de Jiàoshī Jié shì jǐ yuè jǐ hào?", vi: "Ngày Nhà giáo Việt Nam là ngày mấy tháng mấy?", kw: ["月", "号|日"], a: "十一月二十号。", av: "Ngày 20 tháng 11." },
        { q: "教师节你送老师什么？", py: "Jiàoshī Jié nǐ sòng lǎoshī shénme?", vi: "Ngày Nhà giáo em tặng thầy cô gì?", kw: ["送|买|给", "花|礼物|书|东西|卡"], a: "我送老师花。", av: "Em tặng thầy cô hoa." },
        { q: "你想对老师说什么？", py: "Nǐ xiǎng duì lǎoshī shuō shénme?", vi: "Em muốn nói gì với thầy cô?", kw: ["祝|快乐|谢谢|节日"], a: "祝老师节日快乐！", av: "Chúc thầy cô ngày lễ vui vẻ!" },
        { q: "你喜欢什么节日？", py: "Nǐ xǐhuan shénme jiérì?", vi: "Em thích ngày lễ nào?", kw: ["节|生日"], a: "我喜欢春节。", av: "Em thích Tết Nguyên đán." },
        { q: "生日的时候你想要什么礼物？", py: "Shēngrì de shíhou nǐ xiǎng yào shénme lǐwù?", vi: "Sinh nhật em muốn quà gì?", kw: ["要|想", "礼物|书|手机|花|电脑|本子|笔|词典"], a: "我想要一本中文书。", av: "Em muốn một cuốn sách tiếng Trung." }
      ],
      read: { zh: "明天是九月十号，是中国的教师节。我和同学们一起去买花，送给我们的老师。我们对老师说：祝老师节日快乐！越南的教师节是十一月二十号。", py: "Míngtiān shì jiǔ yuè shí hào, shì Zhōngguó de Jiàoshī Jié. Wǒ hé tóngxuémen yìqǐ qù mǎi huā, sòng gěi wǒmen de lǎoshī. Wǒmen duì lǎoshī shuō: Zhù lǎoshī jiérì kuàilè! Yuènán de Jiàoshī Jié shì shíyī yuè èrshí hào.", vi: "Ngày mai là ngày 10 tháng 9, là ngày Nhà giáo Trung Quốc. Tôi và các bạn cùng đi mua hoa tặng thầy cô. Chúng tôi nói với thầy cô: Chúc thầy cô ngày lễ vui vẻ! Ngày Nhà giáo Việt Nam là ngày 20 tháng 11." }
    }
  ],

  topics: [
    { from: 1, zh: "打招呼", py: "Dǎ zhāohu", vi: "Chào hỏi",
      hints: [["见到老师说什么？", "Gặp thầy cô thì nói gì?"], ["见到同学们说什么？", "Gặp các bạn thì nói gì?"], ["怎么说谢谢、对不起？", "Cảm ơn, xin lỗi thế nào?"], ["怎么说再见？", "Chào tạm biệt thế nào?"]],
      kw: "你好|您好|老师|你们|好|谢谢|再见|不客气|对不起|没关系",
      s: "老师，您好！你们好！谢谢老师！不客气。对不起！没关系。老师，再见！你们再见！", sv: "Em chào thầy ạ! Chào các bạn! Em cảm ơn thầy! Không có gì. Xin lỗi! Không sao. Em chào thầy, tạm biệt ạ! Tạm biệt các bạn!" },
    { from: 2, zh: "我很忙", py: "Wǒ hěn máng", vi: "Tôi rất bận",
      hints: [["你忙吗？累吗？", "Em có bận, có mệt không?"], ["汉语难吗？", "Tiếng Trung có khó không?"], ["爸爸妈妈身体好吗？", "Bố mẹ có khoẻ không?"], ["他们工作忙吗？", "Bố mẹ làm việc có bận không?"]],
      kw: "忙|累|很|不|太|也|都|学习|工作|汉语|难|身体|爸爸|妈妈|哥哥|好",
      s: "我很忙，我学习汉语。汉语不太难。我不太累。我爸爸妈妈身体都很好，他们工作也很忙。我哥哥也很忙。你呢？你忙吗？你累吗？", sv: "Tôi rất bận, tôi học tiếng Trung. Tiếng Trung không khó lắm. Tôi không mệt lắm. Bố mẹ tôi đều khoẻ, công việc của bố mẹ cũng rất bận. Anh trai tôi cũng rất bận. Còn bạn? Bạn có bận không? Bạn có mệt không?" },
    { from: 3, zh: "今天和明天", py: "Jīntiān hé míngtiān", vi: "Hôm nay và ngày mai",
      hints: [["今天几月几号？星期几？", "Hôm nay ngày mấy, thứ mấy?"], ["今天你有课吗？", "Hôm nay em có tiết học không?"], ["明天星期几？你去哪儿？", "Ngày mai thứ mấy, em đi đâu?"], ["你的生日是几月几号？", "Sinh nhật em ngày nào?"]],
      kw: "今天|明天|昨天|星期|月|号|上午|下午|晚上|课|上课|有|没有|学校|去|生日",
      s: "今天九月一号，星期一。今天上午我有课，下午没有课。明天星期二，明天上午我去学校上课，下午也有课。我的生日是十月八号。", sv: "Hôm nay là ngày 1 tháng 9, thứ Hai. Sáng nay tôi có tiết học, chiều không có. Ngày mai là thứ Ba, sáng mai tôi đến trường học, chiều cũng có tiết. Sinh nhật tôi là ngày 8 tháng 10." },
    { from: 4, zh: "这是我的东西", py: "Zhè shì wǒ de dōngxi", vi: "Đồ dùng của tôi",
      hints: [["这是什么？那是什么？", "Đây là gì, kia là gì?"], ["这是什么书？", "Đây là sách gì?"], ["这是谁的？", "Đây là của ai?"], ["你有词典吗？有电脑吗？", "Em có từ điển, máy tính không?"]],
      kw: "这|那|是|什么|书|本子|笔|词典|杂志|手机|电脑|的|我|朋友|中文|英文|有|没有",
      s: "这是我的书，那是我的本子。这是中文书，那是英文杂志。这是我的手机，那是我朋友的手机。我有一本中文词典，我没有电脑。", sv: "Đây là sách của tôi, kia là vở của tôi. Đây là sách tiếng Trung, kia là tạp chí tiếng Anh. Đây là điện thoại của tôi, kia là điện thoại của bạn tôi. Tôi có một cuốn từ điển tiếng Trung, tôi không có máy tính." },
    { from: 6, zh: "自我介绍", py: "Zìwǒ jièshào", vi: "Giới thiệu bản thân",
      hints: [["你叫什么名字？你姓什么？", "Tên, họ của em"], ["你是哪国人？", "Em là người nước nào?"], ["你的老师是谁？", "Thầy cô của em là ai?"], ["认识大家你高兴吗？", "Lời chào kết thúc"]],
      kw: "我|叫|姓|名字|是|人|越南|学生|学习|汉语|认识|高兴|老师|欢迎|早上好|同学们",
      s: "同学们，早上好！我姓阮，叫阮阿兰。我是越南人。我是学生，我学习汉语。我的汉语老师姓王，他是中国人。认识你们，我很高兴！", sv: "Chào các bạn buổi sáng! Tôi họ Nguyễn, tên là Nguyễn Lan. Tôi là người Việt Nam. Tôi là học sinh, tôi học tiếng Trung. Thầy giáo tiếng Trung của tôi họ Vương, là người Trung Quốc. Rất vui được làm quen với các bạn!" },
    { from: 7, zh: "我的家", py: "Wǒ de jiā", vi: "Gia đình tôi",
      hints: [["你家有几口人？", "Nhà em có mấy người?"], ["他们是谁？", "Gồm những ai?"], ["他们做什么工作？多大？", "Họ làm nghề gì, bao nhiêu tuổi?"], ["你家有狗吗？", "Nhà em có nuôi con vật nào không?"]],
      kw: "家|口|人|爸爸|妈妈|哥哥|姐姐|弟弟|妹妹|和|医生|律师|老师|工作|岁|狗|可爱|今年|学生",
      s: "我家有四口人：爸爸、妈妈、姐姐和我。我爸爸是医生，我妈妈是老师。我姐姐今年二十二岁，她是大学生。我也是学生。我家还有一只狗，它非常可爱。", sv: "Nhà tôi có bốn người: bố, mẹ, chị gái và tôi. Bố tôi là bác sĩ, mẹ tôi là giáo viên. Chị tôi năm nay 22 tuổi, là sinh viên. Tôi cũng là học sinh. Nhà tôi còn có một con chó, rất đáng yêu." },
    { from: 8, zh: "我的学校", py: "Wǒ de xuéxiào", vi: "Trường của tôi",
      hints: [["办公楼在哪儿？", "Toà văn phòng ở đâu?"], ["图书馆、食堂在哪儿？", "Thư viện, nhà ăn ở đâu?"], ["你的宿舍在哪儿？", "Ký túc xá của em ở đâu?"], ["你们的教室在哪儿？", "Phòng học ở đâu?"]],
      kw: "学校|办公楼|图书馆|食堂|宿舍|教室|在|前边|后边|左边|右边|旁边|对面|银行|这儿|那儿|往|走",
      s: "这是我们学校。办公楼在学校前边，图书馆在办公楼对面。食堂在图书馆旁边，我们的宿舍在食堂后边。我们的教室在办公楼右边。银行在学校对面。", sv: "Đây là trường chúng tôi. Toà văn phòng ở phía trước trường, thư viện ở đối diện toà văn phòng. Nhà ăn ở bên cạnh thư viện, ký túc xá của chúng tôi ở phía sau nhà ăn. Phòng học của chúng tôi ở bên phải toà văn phòng. Ngân hàng ở đối diện trường." },
    { from: 9, zh: "我们班", py: "Wǒmen bān", vi: "Lớp của chúng tôi",
      hints: [["你们学校有多少个学生？", "Trường em có bao nhiêu học sinh?"], ["你们班有几个学生？", "Lớp em có mấy học sinh?"], ["你们班有外国学生吗？", "Lớp em có học sinh nước ngoài không?"], ["谁教你们汉语？", "Ai dạy các em tiếng Trung?"]],
      kw: "学校|班|学生|留学生|个|多少|几|老师|有|越南|韩国|中国|教|汉语|百|千|多",
      s: "我们学校很大，有两千多个学生。我们班有十二个学生，有八个越南人，四个韩国人。我们有两个汉语老师，他们都是中国人。王老师教我们汉语，他很好。", sv: "Trường chúng tôi rất lớn, có hơn hai nghìn học sinh. Lớp chúng tôi có mười hai học sinh, tám người Việt Nam, bốn người Hàn Quốc. Chúng tôi có hai giáo viên tiếng Trung, đều là người Trung Quốc. Thầy Vương dạy chúng tôi tiếng Trung, thầy rất tốt." },
    { from: 11, zh: "我去买水果", py: "Wǒ qù mǎi shuǐguǒ", vi: "Tôi đi mua hoa quả",
      hints: [["你想买什么？", "Em muốn mua gì?"], ["多少钱一斤？", "Bao nhiêu tiền một cân?"], ["你要这种还是那种？", "Em lấy loại này hay loại kia?"], ["一共多少钱？", "Tổng cộng bao nhiêu tiền?"]],
      kw: "买|水果|苹果|香蕉|斤|块|钱|多少|一共|这种|那种|还是|要|贵|便宜|别的",
      s: "今天我去买水果。苹果五块一斤，不太贵。香蕉三块一斤，很便宜。我要两斤苹果，还要一斤香蕉。一共十三块钱。", sv: "Hôm nay tôi đi mua hoa quả. Táo năm tệ một cân, không đắt lắm. Chuối ba tệ một cân, rất rẻ. Tôi mua hai cân táo, thêm một cân chuối. Tổng cộng mười ba tệ." },
    { from: 12, zh: "教师节", py: "Jiàoshī Jié", vi: "Ngày Nhà giáo",
      hints: [["越南的教师节是几月几号？", "Ngày Nhà giáo Việt Nam là ngày nào?"], ["中国的教师节呢？", "Còn của Trung Quốc?"], ["你送老师什么？", "Em tặng thầy cô gì?"], ["你对老师说什么？", "Em nói gì với thầy cô?"]],
      kw: "教师节|节日|月|号|老师|送|花|礼物|给|祝|快乐|一起|同学|买|谢谢",
      s: "越南的教师节是十一月二十号，中国的教师节是九月十号。每年教师节，我和同学们一起去买花，送给我们的老师。我们对老师说：祝老师节日快乐！谢谢老师！", sv: "Ngày Nhà giáo Việt Nam là ngày 20 tháng 11, ngày Nhà giáo Trung Quốc là ngày 10 tháng 9. Mỗi năm vào ngày Nhà giáo, tôi và các bạn cùng đi mua hoa tặng thầy cô. Chúng tôi nói: Chúc thầy cô ngày lễ vui vẻ! Cảm ơn thầy cô!" }
  ],

  // từ nối dùng để chấm độ mạch lạc khi nói theo chủ đề
  connectors: ["也", "还", "都", "和", "然后", "但是", "可是", "因为", "所以", "还有", "那", "就", "一起", "很"],

  // Bổ sung âm đọc cho chữ hay gặp (để chấp nhận chữ đồng âm khi chấm phần đọc)
  extraPy: "零 líng|一 yī|二 èr|三 sān|四 sì|五 wǔ|六 liù|七 qī|八 bā|九 jiǔ|十 shí|百 bǎi|千 qiān|两 liǎng|它 tā|她 tā|他 tā|吗 ma|嘛 ma|呢 ne|号 hào|岁 suì|块 kuài|快 kuài|们 men|再 zài|在 zài|的 de|得 de|地 de|哪 nǎ|那 nà"
};
