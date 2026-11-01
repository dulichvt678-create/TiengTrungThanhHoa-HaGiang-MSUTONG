/*
 * Khoá Msutong 1: từ vựng 10 bài theo bảng 生词表 cuối giáo trình 速通汉语 初级 1.
 * Chỉ lấy chữ Hán + pinyin + số bài; nghĩa tiếng Việt, tên chủ đề và câu ví dụ do trung tâm tự viết.
 * Mỗi dòng: chữ Hán | pinyin (cách âm tiết bằng dấu cách, thanh nhẹ không dấu) | nghĩa tiếng Việt
 * names: tên riêng (địa danh, họ) của bài.
 * Câu ví dụ: [chữ Hán, pinyin, nghĩa]
 */
window.MSUTONG = {
  title: "Msutong 1",
  lessons: [
    {
      id: 1, title: "Chào hỏi", zh: "问候",
      words: `
你|nǐ|bạn, anh, chị (ngôi thứ hai)
好|hǎo|tốt, khỏe, được
你们|nǐ men|các bạn, các anh chị
您|nín|ông, bà, ngài (cách nói kính trọng của 你)
老师|lǎo shī|thầy giáo, cô giáo`,
      names: `
王|Wáng|họ Vương`,
      sentences: [
        ["你好！", "Nǐ hǎo!", "Chào bạn!"],
        ["老师，您好！", "Lǎoshī, nín hǎo!", "Em chào thầy (cô) ạ!"],
        ["你们好！", "Nǐmen hǎo!", "Chào các bạn!"]
      ]
    },
    {
      id: 2, title: "Tên và quốc tịch", zh: "名字和国籍",
      words: `
我|wǒ|tôi, mình
他|tā|anh ấy, ông ấy
是|shì|là
叫|jiào|gọi; tên là
什么|shén me|gì, cái gì
名字|míng zi|tên
哪|nǎ|nào
国|guó|nước, quốc gia
人|rén|người
呢|ne|còn… thì sao? (trợ từ hỏi)`,
      names: `
中国|Zhōng guó|Trung Quốc
美国|Měi guó|nước Mỹ
南非|Nán fēi|Nam Phi`,
      sentences: [
        ["你叫什么名字？", "Nǐ jiào shénme míngzi?", "Bạn tên là gì?"],
        ["我是越南人，你呢？", "Wǒ shì Yuènán rén, nǐ ne?", "Mình là người Việt Nam, còn bạn?"],
        ["他是哪国人？", "Tā shì nǎ guó rén?", "Anh ấy là người nước nào?"]
      ]
    },
    {
      id: 3, title: "Làm quen", zh: "认识",
      words: `
请问|qǐng wèn|xin hỏi
问|wèn|hỏi
贵姓|guì xìng|quý danh, họ gì (hỏi lịch sự)
贵|guì|quý (kính trọng); đắt
姓|xìng|họ; mang họ
先生|xiān sheng|ông, ngài; chồng
认识|rèn shi|quen, quen biết
很|hěn|rất
高兴|gāo xìng|vui, vui mừng
也|yě|cũng
吗|ma|không? (trợ từ hỏi cuối câu)
不|bù|không
这|zhè|đây, này
的|de|của (trợ từ sở hữu)
名片|míng piàn|danh thiếp
有|yǒu|có
没有|méi yǒu|không có
对不起|duì bu qǐ|xin lỗi
没关系|méi guān xi|không sao, không có gì`,
      names: `
马|Mǎ|họ Mã
英国|Yīng guó|nước Anh`,
      sentences: [
        ["请问，您贵姓？", "Qǐngwèn, nín guìxìng?", "Xin hỏi, ông (bà) họ gì ạ?"],
        ["认识你很高兴。", "Rènshi nǐ hěn gāoxìng.", "Rất vui được làm quen với bạn."],
        ["对不起，我没有名片。——没关系。", "Duìbuqǐ, wǒ méiyǒu míngpiàn. — Méi guānxi.", "Xin lỗi, tôi không có danh thiếp. — Không sao."]
      ]
    },
    {
      id: 4, title: "Đi taxi, trả tiền", zh: "打车",
      words: `
去|qù|đi (đến đâu)
哪儿|nǎr|đâu, chỗ nào
哪里|nǎ li|đâu, chỗ nào (cách nói của miền Nam)
师傅|shī fu|bác tài; thầy (gọi người lao động có tay nghề)
小姐|xiǎo jiě|cô, chị (gọi phụ nữ trẻ)
人民|rén mín|nhân dân
广场|guǎng chǎng|quảng trường
到|dào|đến, tới
了|le|rồi (trợ từ chỉ việc đã xảy ra, thay đổi)
远|yuǎn|xa
近|jìn|gần
知道|zhī dào|biết
多少|duō shao|bao nhiêu
钱|qián|tiền
块|kuài|đồng (đơn vị tiền, khẩu ngữ)
谢谢|xiè xie|cảm ơn
不客气|bú kè qi|không có gì, đừng khách sáo
客气|kè qi|khách sáo, lịch sự
再|zài|lại, nữa
再见|zài jiàn|tạm biệt`,
      names: `
人民广场|Rén mín Guǎng chǎng|Quảng trường Nhân Dân`,
      sentences: [
        ["你去哪儿？", "Nǐ qù nǎr?", "Bạn đi đâu?"],
        ["到了，多少钱？", "Dào le, duōshao qián?", "Đến rồi, bao nhiêu tiền?"],
        ["谢谢！——不客气，再见！", "Xièxie! — Bú kèqi, zàijiàn!", "Cảm ơn! — Không có gì, tạm biệt!"]
      ]
    },
    {
      id: 5, title: "Gọi đồ ăn uống", zh: "点餐",
      words: `
饿|è|đói
吃|chī|ăn
喝|hē|uống
要|yào|muốn; cần
还|hái|còn, vẫn
还是|hái shi|hay là (dùng trong câu hỏi lựa chọn)
茶|chá|trà
奶茶|nǎi chá|trà sữa
咖啡|kā fēi|cà phê
杯|bēi|cốc, ly
碗|wǎn|bát, tô
个|gè|cái, chiếc (lượng từ chung)
大|dà|to, lớn
小|xiǎo|nhỏ, bé
两|liǎng|hai (dùng trước lượng từ)
米饭|mǐ fàn|cơm (gạo)
牛肉|niú ròu|thịt bò
青菜|qīng cài|rau xanh
一点儿|yì diǎnr|một chút, một ít
一共|yí gòng|tổng cộng
快|kuài|nhanh, mau`,
      names: ``,
      sentences: [
        ["你喝茶还是咖啡？", "Nǐ hē chá háishi kāfēi?", "Bạn uống trà hay cà phê?"],
        ["我要一杯大奶茶。", "Wǒ yào yì bēi dà nǎichá.", "Tôi muốn một cốc trà sữa cỡ lớn."],
        ["两碗米饭，一共多少钱？", "Liǎng wǎn mǐfàn, yígòng duōshao qián?", "Hai bát cơm, tổng cộng bao nhiêu tiền?"]
      ]
    },
    {
      id: 6, title: "Nghề nghiệp và học tập", zh: "工作和学习",
      words: `
做|zuò|làm
工作|gōng zuò|công việc; làm việc
公司|gōng sī|công ty
在|zài|ở, tại
这儿|zhèr|ở đây, chỗ này
这里|zhè li|ở đây, chỗ này
学|xué|học
学习|xué xí|học tập
学生|xué shēng|học sinh, sinh viên
留学生|liú xué shēng|du học sinh
大学|dà xué|trường đại học
中学|zhōng xué|trường trung học
教|jiāo|dạy
汉语|Hàn yǔ|tiếng Hán, tiếng Trung
英语|Yīng yǔ|tiếng Anh
对|duì|đúng
她|tā|cô ấy, chị ấy
朋友|péng you|bạn bè
男|nán|nam, đàn ông
女|nǚ|nữ, phụ nữ
男朋友|nán péng you|bạn trai, người yêu (nam)
女朋友|nǚ péng you|bạn gái, người yêu (nữ)
苹果|píng guǒ|quả táo`,
      names: `
北京|Běi jīng|Bắc Kinh
上海|Shàng hǎi|Thượng Hải`,
      sentences: [
        ["你做什么工作？", "Nǐ zuò shénme gōngzuò?", "Bạn làm nghề gì?"],
        ["我是留学生，在大学学习汉语。", "Wǒ shì liúxuéshēng, zài dàxué xuéxí Hànyǔ.", "Mình là du học sinh, học tiếng Trung ở trường đại học."],
        ["她是我的女朋友，她教英语。", "Tā shì wǒ de nǚpéngyou, tā jiāo Yīngyǔ.", "Cô ấy là bạn gái mình, cô ấy dạy tiếng Anh."]
      ]
    },
    {
      id: 7, title: "Hỏi đường", zh: "问路",
      words: `
银行|yín háng|ngân hàng
超市|chāo shì|siêu thị
书店|shū diàn|hiệu sách
饭店|fàn diàn|nhà hàng; khách sạn
家|jiā|nhà; (lượng từ cho cửa hàng, công ty)
附近|fù jìn|gần đây, lân cận
对面|duì miàn|đối diện
前|qián|trước, phía trước
左|zuǒ|trái
右|yòu|phải
面|miàn|phía, bên (đi sau từ chỉ hướng)
从|cóng|từ (nơi nào)
往|wǎng|về phía, hướng về
走|zǒu|đi, đi bộ
拐|guǎi|rẽ
然后|rán hòu|sau đó
就|jiù|ngay, chính là; thì`,
      names: `
中国银行|Zhōng guó Yín háng|Ngân hàng Trung Quốc
北京银行|Běi jīng Yín háng|Ngân hàng Bắc Kinh
四川饭店|Sì chuān Fàn diàn|Nhà hàng Tứ Xuyên`,
      sentences: [
        ["请问，附近有银行吗？", "Qǐngwèn, fùjìn yǒu yínháng ma?", "Xin hỏi, gần đây có ngân hàng không?"],
        ["往前走，然后往左拐。", "Wǎng qián zǒu, ránhòu wǎng zuǒ guǎi.", "Đi thẳng về phía trước, sau đó rẽ trái."],
        ["书店就在超市对面。", "Shūdiàn jiù zài chāoshì duìmiàn.", "Hiệu sách ở ngay đối diện siêu thị."]
      ]
    },
    {
      id: 8, title: "Ngày tháng và hẹn gặp", zh: "日期和约会",
      words: `
今天|jīn tiān|hôm nay
几|jǐ|mấy
月|yuè|tháng
号|hào|ngày (trong tháng); số
星期|xīng qī|tuần, thứ
星期五|xīng qī wǔ|thứ Sáu
生日|shēng rì|sinh nhật
快乐|kuài lè|vui vẻ
晚上|wǎn shang|buổi tối
晚饭|wǎn fàn|bữa tối
空儿|kòngr|thời gian rảnh
有空儿|yǒu kòngr|rảnh, có thời gian
事|shì|việc, chuyện
想|xiǎng|muốn; nhớ, nghĩ
请|qǐng|mời; xin, vui lòng
看|kàn|xem, nhìn
电影|diàn yǐng|phim, điện ảnh
学校|xué xiào|trường học
见|jiàn|gặp
那|nà|vậy thì; kia, đó
为什么|wèi shén me|tại sao
真|zhēn|thật, thật là
漂亮|piào liang|đẹp, xinh
太…了|tài … le|quá, … lắm`,
      names: ``,
      sentences: [
        ["今天几月几号？", "Jīntiān jǐ yuè jǐ hào?", "Hôm nay là ngày mấy tháng mấy?"],
        ["星期五晚上你有空儿吗？我想请你看电影。", "Xīngqīwǔ wǎnshang nǐ yǒu kòngr ma? Wǒ xiǎng qǐng nǐ kàn diànyǐng.", "Tối thứ Sáu bạn rảnh không? Mình muốn mời bạn đi xem phim."],
        ["生日快乐！你今天真漂亮！", "Shēngrì kuàilè! Nǐ jīntiān zhēn piàoliang!", "Chúc mừng sinh nhật! Hôm nay bạn đẹp thật!"]
      ]
    },
    {
      id: 9, title: "Sở thích và đi lại", zh: "爱好和交通",
      words: `
喜欢|xǐ huan|thích
电影院|diàn yǐng yuàn|rạp chiếu phim
明天|míng tiān|ngày mai
那儿|nàr|ở đó, chỗ kia
那里|nà li|ở đó, chỗ kia
怎么|zěn me|thế nào, làm sao (hỏi cách thức)
怎么样|zěn me yàng|thế nào, ra sao
坐|zuò|ngồi; đi (xe, tàu)
出租车|chū zū chē|xe taxi
公交车|gōng jiāo chē|xe buýt
地铁|dì tiě|tàu điện ngầm
走路|zǒu lù|đi bộ
吧|ba|nhé, đi (trợ từ đề nghị)
都|dōu|đều
菜|cài|món ăn; rau
好吃|hǎo chī|ngon
便宜|pián yi|rẻ
非常|fēi cháng|vô cùng, rất
有名|yǒu míng|nổi tiếng
又|yòu|lại (lặp lại)
又…又…|yòu … yòu …|vừa… vừa…`,
      names: `
韩国|Hán guó|Hàn Quốc`,
      sentences: [
        ["你喜欢中国电影还是韩国电影？", "Nǐ xǐhuan Zhōngguó diànyǐng háishi Hánguó diànyǐng?", "Bạn thích phim Trung Quốc hay phim Hàn Quốc?"],
        ["我们坐地铁去吧，不远。", "Wǒmen zuò dìtiě qù ba, bù yuǎn.", "Chúng ta đi tàu điện ngầm nhé, không xa đâu."],
        ["这儿的菜又便宜又好吃。", "Zhèr de cài yòu piányi yòu hǎochī.", "Món ăn ở đây vừa rẻ vừa ngon."]
      ]
    },
    {
      id: 10, title: "Gia đình", zh: "家庭",
      words: `
家人|jiā rén|người nhà
爸爸|bà ba|bố
妈妈|mā ma|mẹ
哥哥|gē ge|anh trai
姐姐|jiě jie|chị gái
弟弟|dì di|em trai
妹妹|mèi mei|em gái
和|hé|và, với
口|kǒu|miệng; (lượng từ đếm người trong nhà)
谁|shéi|ai
他们|tā men|họ, bọn họ
们|men|(hậu tố số nhiều chỉ người)
今年|jīn nián|năm nay
多大|duō dà|bao nhiêu tuổi
岁|suì|tuổi
医生|yī shēng|bác sĩ
律师|lǜ shī|luật sư
照片|zhào piàn|ảnh, tấm ảnh
狗|gǒu|con chó
只|zhī|con (lượng từ cho động vật)
可爱|kě ài|đáng yêu, dễ thương`,
      names: ``,
      sentences: [
        ["你家有几口人？", "Nǐ jiā yǒu jǐ kǒu rén?", "Nhà bạn có mấy người?"],
        ["我有一个哥哥和两个妹妹。", "Wǒ yǒu yí ge gēge hé liǎng ge mèimei.", "Mình có một anh trai và hai em gái."],
        ["这是谁的狗？真可爱！", "Zhè shì shéi de gǒu? Zhēn kě'ài!", "Đây là chó của ai vậy? Dễ thương thật!"]
      ]
    }
  ]
};
