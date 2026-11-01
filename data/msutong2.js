/*
 * Khoá Msutong 2: từ vựng 10 bài theo bảng 生词表 cuối giáo trình 速通汉语 初级 2.
 * Chỉ lấy chữ Hán + pinyin + số bài; nghĩa tiếng Việt, tên chủ đề và câu ví dụ do trung tâm tự viết.
 * Mỗi dòng: chữ Hán | pinyin (cách âm tiết bằng dấu cách, thanh nhẹ không dấu) | nghĩa tiếng Việt
 * Từ sách ghi ở hai bài (对 7/9, 号码 3/4, 行 1/7) được xếp vào bài đầu tiên xuất hiện.
 */
window.MSUTONG2 = {
  title: "Msutong 2",
  lessons: [
    {
      id: 1, title: "Sở thích và cuối tuần", zh: "爱好",
      words: `
平时|píng shí|ngày thường
周末|zhōu mò|cuối tuần
常|cháng|thường
常常|cháng cháng|thường thường, hay
在|zài|đang (làm gì)
正|zhèng|đang, đúng lúc
正在|zhèng zài|đang (làm gì)
唱|chàng|hát
歌|gē|bài hát
唱歌|chàng gē|hát, ca hát
跳|tiào|nhảy
舞|wǔ|điệu múa, điệu nhảy
跳舞|tiào wǔ|nhảy múa, khiêu vũ
街舞|jiē wǔ|nhảy đường phố (hip-hop)
听|tīng|nghe
音乐|yīn yuè|âm nhạc
好听|hǎo tīng|hay, dễ nghe
电视|diàn shì|ti vi, truyền hình
打|dǎ|đánh, chơi (bóng)
球|qiú|quả bóng
打球|dǎ qiú|chơi bóng
篮球|lán qiú|bóng rổ
一边…一边…|yì biān … yì biān …|vừa… vừa… (hai việc cùng lúc)
一起|yì qǐ|cùng nhau
别人|bié rén|người khác
次|cì|lần
下次|xià cì|lần sau
下个|xià ge|… tới, … sau (下个星期: tuần sau)
只|zhǐ|chỉ
行|xíng|được, ổn`,
      sentences: [["周末你常常做什么？", "Zhōumò nǐ chángcháng zuò shénme?", "Cuối tuần bạn thường làm gì?"], ["我喜欢一边听音乐一边跑步。", "Wǒ xǐhuan yìbiān tīng yīnyuè yìbiān pǎobù.", "Mình thích vừa nghe nhạc vừa chạy bộ."]]
    },
    {
      id: 2, title: "Giờ giấc mỗi ngày", zh: "作息时间",
      words: `
现在|xiàn zài|bây giờ
点|diǎn|giờ
点钟|diǎn zhōng|giờ (đúng)
分|fēn|phút
刻|kè|mười lăm phút
半|bàn|rưỡi, một nửa
左右|zuǒ yòu|khoảng, chừng
早|zǎo|sớm; chào buổi sáng
中午|zhōng wǔ|buổi trưa
晚|wǎn|muộn, trễ
每天|měi tiān|mỗi ngày
有时|yǒu shí|có lúc
有时候|yǒu shí hou|có lúc, đôi khi
起床|qǐ chuáng|ngủ dậy
睡|shuì|ngủ
睡觉|shuì jiào|đi ngủ
上课|shàng kè|vào học, lên lớp
下课|xià kè|tan học
课|kè|bài học, tiết học
学校|xué xiào|trường học
门口|mén kǒu|cổng, cửa ra vào
这么|zhè me|như thế này, sao mà… thế
因为|yīn wèi|vì, bởi vì
或者|huò zhě|hoặc, hoặc là`,
      sentences: [["你每天几点起床？", "Nǐ měi tiān jǐ diǎn qǐchuáng?", "Mỗi ngày bạn mấy giờ ngủ dậy?"], ["我七点半左右去学校。", "Wǒ qī diǎn bàn zuǒyòu qù xuéxiào.", "Mình đi học khoảng bảy giờ rưỡi."]]
    },
    {
      id: 3, title: "Điện thoại và đồ dùng", zh: "电话和用品",
      words: `
电|diàn|điện
电话|diàn huà|điện thoại
打电话|dǎ diàn huà|gọi điện thoại
手机|shǒu jī|điện thoại di động
号|hào|số
号码|hào mǎ|số (điện thoại, phòng…)
电脑|diàn nǎo|máy tính
笔|bǐ|cái bút
支|zhī|cây, chiếc (lượng từ cho bút)
借|jiè|mượn; cho mượn
用|yòng|dùng, sử dụng
给|gěi|cho; đưa
找|zhǎo|tìm
等|děng|đợi, chờ
一下|yí xià|một chút, thử (làm gì) một lát
说|shuō|nói
写|xiě|viết
慢|màn|chậm
遍|biàn|lượt, lần (từ đầu đến cuối)
可以|kě yǐ|có thể, được phép
可是|kě shì|nhưng mà
没问题|méi wèn tí|không vấn đề gì
对了|duì le|à phải rồi (khi chợt nhớ ra)`,
      sentences: [["我可以用一下你的手机吗？", "Wǒ kěyǐ yòng yíxià nǐ de shǒujī ma?", "Mình dùng điện thoại của bạn một chút được không?"], ["请你慢一点儿说。", "Qǐng nǐ màn yìdiǎnr shuō.", "Bạn nói chậm một chút nhé."]]
    },
    {
      id: 4, title: "Mua quần áo", zh: "买衣服",
      words: `
买|mǎi|mua
衣服|yī fu|quần áo
件|jiàn|chiếc, cái (lượng từ cho áo, việc)
衬衫|chèn shān|áo sơ mi
鞋|xié|giày
双|shuāng|đôi
穿|chuān|mặc, đi (giày)
试|shì|thử
颜色|yán sè|màu sắc
色|sè|màu
红|hóng|đỏ
黑|hēi|đen
蓝|lán|xanh lam
大小|dà xiǎo|kích cỡ
合适|hé shì|vừa, phù hợp
贵|guì|đắt
不错|bú cuò|khá tốt, không tệ
不太|bú tài|không… lắm
觉得|jué de|cảm thấy, thấy rằng`,
      sentences: [["这件衬衫的颜色不错，我可以试试吗？", "Zhè jiàn chènshān de yánsè búcuò, wǒ kěyǐ shìshi ma?", "Màu chiếc áo sơ mi này đẹp đấy, tôi mặc thử được không?"], ["这双鞋大小很合适。", "Zhè shuāng xié dàxiǎo hěn héshì.", "Đôi giày này cỡ rất vừa."]]
    },
    {
      id: 5, title: "Bận rộn và lịch hẹn", zh: "忙",
      words: `
忙|máng|bận
上午|shàng wǔ|buổi sáng
下午|xià wǔ|buổi chiều
昨天|zuó tiān|hôm qua
时候|shí hou|lúc, khi
考试|kǎo shì|thi, kỳ thi
难|nán|khó
准备|zhǔn bèi|chuẩn bị
图书馆|tú shū guǎn|thư viện
参加|cān jiā|tham gia
比赛|bǐ sài|cuộc thi đấu, trận đấu
旅行|lǚ xíng|du lịch
帮|bāng|giúp
东西|dōng xi|đồ, đồ vật
位|wèi|vị (lượng từ lịch sự chỉ người)
喂|wèi|a lô
跟|gēn|với, cùng
有点儿|yǒu diǎnr|hơi, có chút (thường ý không hài lòng)
不好意思|bù hǎo yì si|ngại quá, xin lỗi`,
      sentences: [["你这几天忙不忙？", "Nǐ zhè jǐ tiān máng bu máng?", "Mấy hôm nay bạn có bận không?"], ["下午我要去图书馆准备考试。", "Xiàwǔ wǒ yào qù túshūguǎn zhǔnbèi kǎoshì.", "Chiều nay mình phải lên thư viện ôn thi."]]
    },
    {
      id: 6, title: "Tham quan thành phố", zh: "参观",
      words: `
参观|cān guān|tham quan
博物馆|bó wù guǎn|bảo tàng
公园|gōng yuán|công viên
门票|mén piào|vé vào cửa
票|piào|vé
拍|pāi|chụp (ảnh)
风景|fēng jǐng|phong cảnh
美|měi|đẹp
空气|kōng qì|không khí
里|li|trong, bên trong
本|běn|cuốn, quyển (lượng từ cho sách)
上个|shàng ge|… trước (上个月: tháng trước)
一些|yì xiē|một vài, một số
爱|ài|yêu, thích
真|zhēn|thật, thật là
非常|fēi cháng|vô cùng, rất
好玩儿|hǎo wánr|vui, thú vị (để chơi)
看上去|kàn shàng qù|trông có vẻ
累|lèi|mệt
了|le|rồi (trợ từ cuối câu chỉ sự thay đổi)`,
      sentences: [["公园里的风景真美！", "Gōngyuán li de fēngjǐng zhēn měi!", "Phong cảnh trong công viên đẹp thật!"], ["博物馆的门票贵吗？", "Bówùguǎn de ménpiào guì ma?", "Vé vào bảo tàng có đắt không?"]]
    },
    {
      id: 7, title: "Đi lại và liên lạc", zh: "出行",
      words: `
骑|qí|đi, cưỡi (xe đạp, xe máy)
自行车|zì xíng chē|xe đạp
多长|duō cháng|bao lâu; dài bao nhiêu
时间|shí jiān|thời gian
小时|xiǎo shí|tiếng, giờ đồng hồ
年|nián|năm
去年|qù nián|năm ngoái
最近|zuì jìn|gần đây, dạo này
自己|zì jǐ|tự mình, bản thân
法国|Fǎ guó|nước Pháp
张|zhāng|tờ, tấm (lượng từ cho vật phẳng)
微信|wēi xìn|WeChat (ứng dụng nhắn tin)
告诉|gào su|nói cho biết, bảo
忘|wàng|quên
听说|tīng shuō|nghe nói
当然|dāng rán|đương nhiên
对|duì|đúng; đối với
玩儿|wánr|chơi
好看|hǎo kàn|đẹp, hay (để xem)
有意思|yǒu yì si|thú vị, hay
哈哈|hā hā|ha ha (tiếng cười)`,
      sentences: [["你每天骑自行车上班吗？", "Nǐ měi tiān qí zìxíngchē shàngbān ma?", "Ngày nào bạn cũng đạp xe đi làm à?"], ["别忘了告诉我你的微信。", "Bié wàng le gàosu wǒ nǐ de Wēixìn.", "Đừng quên cho mình WeChat của bạn nhé."]]
    },
    {
      id: 8, title: "Ẩm thực và ngoại ngữ", zh: "美食和外语",
      words: `
会|huì|biết (làm gì nhờ học); sẽ
外语|wài yǔ|ngoại ngữ
法语|Fǎ yǔ|tiếng Pháp
日语|Rì yǔ|tiếng Nhật
除了…以外|chú le … yǐ wài|ngoài… ra
聪明|cōng ming|thông minh
真的|zhēn de|thật sự, thật à
哪里|nǎ lǐ|đâu có (khiêm tốn khi được khen)
做菜|zuò cài|nấu ăn
尝|cháng|nếm, ăn thử
好喝|hǎo hē|ngon (đồ uống)
水果|shuǐ guǒ|hoa quả
沙拉|shā lā|món salad
酒|jiǔ|rượu
瓶|píng|chai, bình
回|huí|về
回来|huí lái|trở về, quay lại`,
      sentences: [["除了汉语以外，你还会说什么外语？", "Chúle Hànyǔ yǐwài, nǐ hái huì shuō shénme wàiyǔ?", "Ngoài tiếng Trung ra, bạn còn biết nói ngoại ngữ nào?"], ["你尝尝我做的菜。", "Nǐ chángchang wǒ zuò de cài.", "Bạn nếm thử món mình nấu đi."]]
    },
    {
      id: 9, title: "Kế hoạch đi chơi", zh: "计划",
      words: `
打算|dǎ suàn|dự định
建议|jiàn yì|đề nghị, gợi ý
约会|yuē huì|hẹn hò, cuộc hẹn
地方|dì fang|nơi, chỗ
市中心|shì zhōng xīn|trung tâm thành phố
郊区|jiāo qū|ngoại ô
动物|dòng wù|động vật
动物园|dòng wù yuán|vườn thú
熊猫|xióng māo|gấu trúc
兴趣|xìng qù|hứng thú, sở thích
感|gǎn|cảm thấy
对…感兴趣|duì … gǎn xìng qù|có hứng thú với…
感谢|gǎn xiè|cảm ơn, cảm tạ
的话|de huà|nếu… thì (đặt cuối vế điều kiện)
已经|yǐ jīng|đã, rồi
过|guo|đã từng (trợ từ kinh nghiệm)
遗憾|yí hàn|tiếc, đáng tiếc
肚子|dù zi|bụng
烤鸭|kǎo yā|vịt quay
味道|wèi dao|mùi vị
…极了|… jí le|… cực kỳ, … vô cùng`,
      sentences: [["周末你打算去哪儿？", "Zhōumò nǐ dǎsuàn qù nǎr?", "Cuối tuần bạn định đi đâu?"], ["我对熊猫很感兴趣，我们去动物园吧。", "Wǒ duì xióngmāo hěn gǎn xìngqù, wǒmen qù dòngwùyuán ba.", "Mình rất thích gấu trúc, chúng mình đi vườn thú nhé."]]
    },
    {
      id: 10, title: "Làm khách", zh: "做客",
      words: `
做客|zuò kè|đến chơi nhà, làm khách
敲门|qiāo mén|gõ cửa
欢迎|huān yíng|chào mừng, hoan nghênh
出去|chū qù|đi ra ngoài
爱人|ài ren|vợ, chồng
儿子|ér zi|con trai
女儿|nǚ ér|con gái
孩子|hái zi|con cái, đứa trẻ
饭|fàn|cơm, bữa ăn
麻婆豆腐|má pó dòu fu|đậu phụ Tứ Xuyên (đậu phụ Ma Bà)
糖醋鱼|táng cù yú|cá sốt chua ngọt
酸|suān|chua
甜|tián|ngọt
辣|là|cay
添|tiān|thêm
麻烦|má fan|phiền phức; làm phiền
添麻烦|tiān má fan|gây phiền, làm phiền
客气|kè qi|khách sáo
别|bié|đừng
怕|pà|sợ
辛苦|xīn kǔ|vất vả`,
      sentences: [["欢迎欢迎，快请进！", "Huānyíng huānyíng, kuài qǐng jìn!", "Chào mừng, mời vào nhanh lên!"], ["给你们添麻烦了。——别客气！", "Gěi nǐmen tiān máfan le. — Bié kèqi!", "Làm phiền mọi người quá. — Đừng khách sáo!"]]
    }
  ]
};
