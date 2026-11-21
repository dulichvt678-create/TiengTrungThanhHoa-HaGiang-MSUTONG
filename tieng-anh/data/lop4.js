/*
 * Tiếng Anh lớp 4 – bám theo chủ đề 20 Unit của sách Tiếng Anh 4 Global Success.
 * Từ vựng, câu mẫu, câu hỏi và bài đọc do app tự biên soạn.
 *
 * words: mỗi dòng "tiếng Anh|nghĩa tiếng Việt"
 * sents: mỗi dòng một câu mẫu (dùng cho nghe, nói, sắp xếp câu)
 * gram:  "câu hỏi có ___|đáp án đúng|sai|sai|sai#giải thích (không bắt buộc)"
 * readings.qs: "câu|T" hoặc "câu|F" là câu Đúng/Sai; còn lại "câu hỏi|đúng|sai|sai|sai"
 */
window.EN_GRADES = window.EN_GRADES || {};
window.EN_GRADES.lop4 = {
  key: "lop4", grade: 4, name: "Lớp 4", book: "Tiếng Anh 4 · Global Success",
  terms: [
    { key: "gk1", name: "Giữa học kì 1", units: [1, 5] },
    { key: "ck1", name: "Cuối học kì 1", units: [1, 10] },
    { key: "gk2", name: "Giữa học kì 2", units: [11, 15] },
    { key: "ck2", name: "Cuối học kì 2", units: [11, 20] }
  ],
  units: [
    {
      n: 1, t: "My friends", vi: "Bạn bè của em",
      words: `
America|nước Mỹ
American|người Mỹ
Australia|nước Úc
Australian|người Úc
Britain|nước Anh
British|người Anh
Japan|nước Nhật Bản
Japanese|người Nhật Bản
Malaysia|nước Ma-lai-xi-a
Thailand|nước Thái Lan
Viet Nam|nước Việt Nam
friend|người bạn
nationality|quốc tịch`,
      sents: `
Where are you from?
I'm from Japan.
What nationality are you?
I'm Vietnamese.
She is my new friend.
He is from Australia.`,
      gram: `
Where ___ you from? – I'm from Malaysia.|are|is|am|do
I'm from Japan. I'm ___.|Japanese|Japan|America|Britain
What ___ are you? – I'm Australian.|nationality|country|name|from
He is from Britain. He is ___.|British|Britain|American|Thai
Mai and Nam ___ from Viet Nam.|are|is|am|be#Chủ ngữ số nhiều (Mai and Nam) đi với "are".
___ is Tom from? – He's from America.|Where|What|Who|How
What nationality is she? – She's ___.|Malaysian|Malaysia|Japan|America
Where's Akiko from? – She's from ___.|Japan|Japanese|American|British`
    },
    {
      n: 2, t: "Time and daily routines", vi: "Giờ giấc và sinh hoạt hằng ngày",
      words: `
get up|thức dậy
have breakfast|ăn sáng
go to school|đi học
have lunch|ăn trưa
go home|về nhà
have dinner|ăn tối
do homework|làm bài tập về nhà
go to bed|đi ngủ
o'clock|giờ đúng
fifteen|mười lăm
thirty|ba mươi
forty-five|bốn mươi lăm
morning|buổi sáng
evening|buổi tối`,
      sents: `
What time is it?
It's seven o'clock.
It's six forty-five.
What time do you get up?
I get up at six o'clock.
I go to bed at nine thirty.
She has dinner at seven o'clock.`,
      gram: `
What ___ is it? – It's nine o'clock.|time|day|name|colour
I get up ___ six o'clock.|at|in|on|to#Trước giờ cụ thể dùng "at".
What time ___ you have breakfast?|do|does|are|is
It's eight ___. (8:00)|o'clock|thirty|clock|time
My brother ___ to bed at ten o'clock.|goes|go|going|to go#Chủ ngữ số ít (My brother) → động từ thêm -s/-es.
I have lunch at eleven ___. (11:30)|thirty|fifteen|forty-five|o'clock
I ___ my homework at eight o'clock in the evening.|do|does|make|doing
What time does she get up? – She ___ up at six fifteen.|gets|get|getting|to get#Chủ ngữ "She" → động từ thêm -s.`
    },
    {
      n: 3, t: "My week", vi: "Tuần của em",
      words: `
Monday|thứ Hai
Tuesday|thứ Ba
Wednesday|thứ Tư
Thursday|thứ Năm
Friday|thứ Sáu
Saturday|thứ Bảy
Sunday|Chủ nhật
weekend|cuối tuần
today|hôm nay
help my parents|giúp bố mẹ
listen to music|nghe nhạc
watch TV|xem ti vi
study at school|học ở trường
visit my grandparents|thăm ông bà`,
      sents: `
What day is it today?
It's Wednesday.
What do you do on Saturdays?
I help my parents.
I listen to music at the weekend.
We study at school from Monday to Friday.`,
      gram: `
What ___ is it today? – It's Monday.|day|time|date|week
I visit my grandparents ___ Sundays.|on|in|at|to#Trước thứ trong tuần dùng "on".
What do you do ___ the weekend?|at|in|on|to#Người Anh nói "at the weekend".
What do you do on Fridays? – I ___ at school.|study|studies|studying|to study
The day after Monday is ___.|Tuesday|Sunday|Wednesday|Thursday
Saturday and Sunday are the ___.|weekend|weekday|week|today
We have English ___ Monday and Thursday.|on|in|at|for
What does your brother do on Sundays? – He ___ TV.|watches|watch|watching|to watch#He + động từ thêm -es: watch → watches.`
    },
    {
      n: 4, t: "My birthday party", vi: "Tiệc sinh nhật của em",
      words: `
January|tháng Một
February|tháng Hai
March|tháng Ba
April|tháng Tư
May|tháng Năm
June|tháng Sáu
July|tháng Bảy
August|tháng Tám
September|tháng Chín
October|tháng Mười
November|tháng Mười Một
December|tháng Mười Hai
birthday|sinh nhật
party|bữa tiệc
chips|khoai tây chiên
grapes|quả nho
jam|mứt
juice|nước ép
lemonade|nước chanh`,
      sents: `
When's your birthday?
It's in May.
What would you like to eat?
I'd like some grapes.
What would you like to drink?
I'd like some lemonade, please.`,
      gram: `
When's your ___? – It's in October.|birthday|party|name|age
My birthday is ___ June.|in|on|at|to#Trước tên tháng dùng "in".
What would you like to ___? – I'd like some juice.|drink|eat|play|do
I'd like ___ chips, please.|some|a|an|any
The first month of the year is ___.|January|December|March|June
Would you like some jam? – ___|Yes, please.|Yes, I am.|No, I don't.|Yes, I do.#Trả lời lời mời "Would you like...?": Yes, please. / No, thank you.
My birthday is in ___. It's the last month of the year.|December|January|May|August
What ___ you like to drink? – Some milk, please.|would|are|is|am`
    },
    {
      n: 5, t: "Things we can do", vi: "Những việc chúng em có thể làm",
      words: `
cook|nấu ăn
dance|nhảy, múa
draw|vẽ
sing|hát
swim|bơi
roller skate|trượt pa-tanh
ride a bike|đi xe đạp
ride a horse|cưỡi ngựa
play the piano|chơi đàn pi-a-nô
play the guitar|chơi đàn ghi-ta`,
      sents: `
What can you do?
I can play the piano.
Can you swim?
Yes, I can.
Can she ride a horse?
No, she can't.
My brother can roller skate very well.`,
      gram: `
Can you dance? – No, I ___.|can't|can|don't|am not
What ___ you do? – I can draw.|can|are|is|does
She can ___ the guitar.|play|plays|playing|to play#Sau "can" dùng động từ nguyên mẫu.
I can ride a ___.|bike|piano|guitar|song
Can he cook? – Yes, he ___.|can|can't|does|is
Can your sister swim? – No, she ___.|can't|can|isn't|doesn't
I can't ___ a horse, but I can ride a bike.|ride|rides|riding|to ride#Sau can / can't dùng động từ nguyên mẫu.`
    },
    {
      n: 6, t: "Our school facilities", vi: "Cơ sở vật chất trường em",
      words: `
school|trường học
village|làng
town|thị trấn
city|thành phố
mountains|vùng núi
building|toà nhà
classroom|lớp học
computer room|phòng máy tính
garden|vườn
gym|phòng thể dục
library|thư viện
playground|sân chơi
music room|phòng âm nhạc
art room|phòng mĩ thuật`,
      sents: `
Where's your school?
It's in the village.
Is there a library?
Yes, there is.
How many classrooms are there?
There are twenty classrooms.
My school has a big playground.`,
      gram: `
Where's your school? – It's ___ the city.|in|on|at|under
___ there a gym? – Yes, there is.|Is|Are|Do|Does
How many classrooms ___ there?|are|is|do|does
There ___ a big garden at my school.|is|are|am|be#"There is" + danh từ số ít.
There are two ___ in my school.|buildings|building|a building|an building
We read books in the ___.|library|gym|playground|computer room
Is there a music room in your school? – No, there ___.|isn't|aren't|is|not
My school is ___ the mountains.|in|on|at|under`
    },
    {
      n: 7, t: "Our timetables", vi: "Thời khoá biểu của chúng em",
      words: `
subject|môn học
timetable|thời khoá biểu
Art|môn Mĩ thuật
English|môn Tiếng Anh
IT|môn Tin học
Maths|môn Toán
Music|môn Âm nhạc
PE|môn Giáo dục thể chất
Science|môn Khoa học
Vietnamese|môn Tiếng Việt
History and Geography|môn Lịch sử và Địa lí
lesson|tiết học`,
      sents: `
What subjects do you have today?
I have Maths and English.
When do you have Science?
I have it on Tuesdays and Fridays.
How many lessons do you have today?
We have PE on Thursday.`,
      gram: `
What subjects ___ you have today?|do|does|are|is
When do you have IT? – I have ___ on Mondays.|it|them|they|its
We have Music ___ Wednesdays.|on|in|at|to
How many ___ do you have today? – Four.|lessons|lesson|subject|day
She ___ English on Tuesdays.|has|have|having|is have#Chủ ngữ "She" → have đổi thành "has".
What subject ___ you like? – I like Maths.|do|does|are|is
We have Science on Tuesdays ___ Fridays.|and|but|or|so`
    },
    {
      n: 8, t: "My favourite subjects", vi: "Môn học yêu thích của em",
      words: `
favourite|yêu thích nhất
teacher|giáo viên
singer|ca sĩ
writer|nhà văn
artist|hoạ sĩ
footballer|cầu thủ bóng đá
scientist|nhà khoa học
because|bởi vì
interesting|thú vị
draw pictures|vẽ tranh
count|đếm
story|câu chuyện`,
      sents: `
What's your favourite subject?
It's Music.
Why do you like Art?
Because I want to be an artist.
Who is your English teacher?
I like Maths because it is interesting.`,
      gram: `
What's your ___ subject? – It's Science.|favourite|favourites|favour|like
___ do you like English? – Because I like stories.|Why|What|Where|When
I want to be ___ artist.|an|a|the|some#"artist" bắt đầu bằng nguyên âm → dùng "an".
I like Music because I want to be a ___.|singer|footballer|scientist|writer
___ is your Maths teacher? – Mr Long.|Who|What|Where|How
Why do you like Maths? – ___ I like counting.|Because|But|And|So
I want to be a ___ because I like writing stories.|writer|singer|footballer|scientist`
    },
    {
      n: 9, t: "Our sports day", vi: "Ngày hội thể thao",
      words: `
sports day|ngày hội thể thao
basketball|bóng rổ
badminton|cầu lông
football|bóng đá
volleyball|bóng chuyền
table tennis|bóng bàn
running|chạy bộ
team|đội
win|thắng
cheer|cổ vũ
practise|luyện tập`,
      sents: `
When is sports day?
It's on Saturday.
What are they doing?
They are playing basketball.
Our class team wins the football match.
We cheer for our friends.
Let's practise for sports day.`,
      gram: `
When is sports day? – It's ___ Sunday.|on|in|at|to
They are ___ badminton now.|playing|play|plays|played#Thì hiện tại tiếp diễn: am/is/are + V-ing.
What ___ they doing? – They're running.|are|is|do|does
My favourite sport is ___ tennis.|table|desk|chair|ball
We ___ for our team.|cheer|cheers|cheering|to cheer
Our team ___ the match last Saturday.|won|win|wins|winning#"last Saturday" → quá khứ: win → won.
What are you doing? – I ___ volleyball.|am playing|play|playing|plays`
    },
    {
      n: 10, t: "Our summer holidays", vi: "Kì nghỉ hè của chúng em",
      words: `
summer holiday|kì nghỉ hè
beach|bãi biển
countryside|vùng quê
campsite|khu cắm trại
sea|biển
sandcastle|lâu đài cát
swam|đã bơi
built|đã xây
took photos|đã chụp ảnh
visited|đã đến thăm
last summer|mùa hè năm ngoái`,
      sents: `
Where were you last summer?
I was at the beach.
What did you do there?
I built sandcastles.
We took photos in the countryside.
They swam in the sea.`,
      gram: `
Where ___ you last summer? – I was in the countryside.|were|was|are|is
I ___ at the beach last summer.|was|were|am|is#"last summer" → quá khứ: I/he/she → was.
What ___ you do there? – I swam in the sea.|did|do|does|were
Yesterday we ___ our grandparents.|visited|visit|visits|visiting#"Yesterday" → thì quá khứ đơn.
We ___ a big sandcastle on the beach.|built|build|builds|building
Where were they last summer? – They ___ in the countryside.|were|was|are|is
Did you take photos? – Yes, I ___.|did|do|was|took`
    },
    {
      n: 11, t: "My home", vi: "Nhà của em",
      words: `
home|nhà, tổ ấm
street|đường phố
road|con đường
flat|căn hộ
house|ngôi nhà
quiet|yên tĩnh
busy|nhộn nhịp, đông đúc
noisy|ồn ào
beautiful|đẹp
address|địa chỉ
live|sống
near|gần
far|xa`,
      sents: `
Where do you live?
I live in a flat in Ha Noi.
What's your street like?
It's quiet and beautiful.
My house is near the park.
The road is very busy.`,
      gram: `
Where ___ you live? – I live in Le Loi Street.|do|does|are|is
What's your street ___? – It's busy.|like|look|liking|likes
She ___ in a big house.|lives|live|living|is live
The street is ___. There are many cars.|noisy|quiet|small|young
My school is ___ my house. I walk there.|near|far|big|on
___ is your house like? – It's big and beautiful.|What|Where|How|Who
I live ___ a small house in the village.|in|on|at|to`
    },
    {
      n: 12, t: "Jobs", vi: "Nghề nghiệp",
      words: `
job|nghề nghiệp
farmer|nông dân
nurse|y tá
doctor|bác sĩ
driver|tài xế
worker|công nhân
actor|diễn viên
farm|nông trại
factory|nhà máy
hospital|bệnh viện
office|văn phòng`,
      sents: `
What does your father do?
He's a farmer.
Where does he work?
He works on a farm.
My mother is a nurse.
She works in a hospital.`,
      gram: `
What ___ your mother do? – She's a teacher.|does|do|is|are
He is ___ actor.|an|a|the|some
Where does a worker work? – In a ___.|factory|farm|hospital|school
My father works ___ a farm.|on|in|at|to#Thường nói "on a farm", "in a hospital", "in a factory".
A ___ helps sick people in the hospital.|nurse|farmer|driver|worker
Where does your mother work? – She works ___ an office.|in|on|to|from
A ___ drives a bus or a taxi.|driver|farmer|nurse|actor`
    },
    {
      n: 13, t: "Appearance", vi: "Ngoại hình",
      words: `
appearance|ngoại hình
tall|cao
short|thấp
slim|mảnh khảnh
strong|khoẻ mạnh
young|trẻ
old|già
long hair|tóc dài
round face|khuôn mặt tròn
eyes|đôi mắt
handsome|đẹp trai
look like|trông như thế nào`,
      sents: `
What does she look like?
She's tall and slim.
What does your father look like?
He's strong.
My sister has long hair.
My grandmother is old but healthy.`,
      gram: `
What does he ___ like? – He's tall.|look|looks|looking|see
What ___ your sister look like?|does|do|is|are
My brother is very ___. He is 1.8 metres.|tall|short|young|old
She ___ long hair and big eyes.|has|have|is|are
My grandfather is ___. He is 80 years old.|old|young|slim|tall
What does your mother look like? – She ___ slim.|is|are|has|have
My father ___ short hair.|has|have|is|are`
    },
    {
      n: 14, t: "Daily activities", vi: "Hoạt động hằng ngày",
      words: `
clean the floor|lau nhà
wash the clothes|giặt quần áo
wash the dishes|rửa bát
water the flowers|tưới hoa
do housework|làm việc nhà
go shopping|đi mua sắm
make the bed|dọn giường
feed the dog|cho chó ăn
every day|hằng ngày
afternoon|buổi chiều`,
      sents: `
What do you do in the morning?
I make the bed.
What does your mother do in the afternoon?
She waters the flowers.
I wash the dishes after dinner.
My father cleans the floor every Sunday.`,
      gram: `
What does she do in the evening? – She ___ the dishes.|washes|wash|washing|to wash#Chủ ngữ "She" → wash thêm -es thành "washes".
I ___ the bed every morning.|make|makes|making|do
What ___ you do in the afternoon?|do|does|are|is
He ___ the floor every Saturday.|cleans|clean|cleaning|is clean
We do housework ___ the weekend.|at|on|to|by
She ___ the clothes on Saturday mornings.|washes|wash|washing|is wash
I ___ the flowers in the garden every evening.|water|waters|watering|to water`
    },
    {
      n: 15, t: "My family's weekends", vi: "Cuối tuần của gia đình em",
      words: `
cinema|rạp chiếu phim
shopping centre|trung tâm mua sắm
sports centre|trung tâm thể thao
swimming pool|bể bơi
bookshop|hiệu sách
supermarket|siêu thị
park|công viên
zoo|vườn thú
watch a film|xem phim
play tennis|chơi quần vợt
family|gia đình`,
      sents: `
Where is your father at the weekend?
He's at the sports centre.
What does he do there?
He plays tennis.
My family goes to the cinema on Sundays.
We buy food at the supermarket.`,
      gram: `
Where's your mother? – She's ___ the supermarket.|at|on|to|from
What does your brother do there? – He ___ films.|watches|watch|watching|to watch
We swim at the ___.|swimming pool|bookshop|cinema|supermarket
My parents ___ at the shopping centre now.|are|is|am|be
I buy books at the ___.|bookshop|zoo|park|sports centre
What does your father do at the sports centre? – He ___ tennis.|plays|play|playing|is play
We watch films at the ___.|cinema|bookshop|swimming pool|supermarket`
    },
    {
      n: 16, t: "Weather", vi: "Thời tiết",
      words: `
weather|thời tiết
sunny|nắng
rainy|có mưa
cloudy|nhiều mây
windy|có gió
stormy|có bão
snowy|có tuyết
hot|nóng
cold|lạnh
warm|ấm áp
cool|mát mẻ`,
      sents: `
What's the weather like today?
It's sunny and hot.
It's rainy in Ha Noi today.
Where do you want to go?
I want to go to the park.
It's cold in winter.`,
      gram: `
What's the weather ___ today? – It's windy.|like|likes|look|liking
It's ___ today. Let's go to the beach.|sunny|rainy|stormy|snowy
Take your raincoat. It's ___.|rainy|sunny|hot|warm
Where do you want ___ go?|to|for|at|on#want to + động từ nguyên mẫu.
It's very ___ today. Let's go swimming.|hot|cold|snowy|stormy
What's the weather ___ in Ha Giang today?|like|likes|is|as
It's ___. I can see many clouds in the sky.|cloudy|sunny|windy|snowy`
    },
    {
      n: 17, t: "In the city", vi: "Ở thành phố",
      words: `
bakery|tiệm bánh
bus stop|trạm xe buýt
pharmacy|hiệu thuốc
post office|bưu điện
next to|bên cạnh
opposite|đối diện
behind|phía sau
between|ở giữa
go straight|đi thẳng
turn left|rẽ trái
turn right|rẽ phải`,
      sents: `
Where's the bakery?
It's next to the post office.
How can I get to the pharmacy?
Go straight and turn left.
The bus stop is opposite the park.
The cinema is between the bakery and the bookshop.`,
      gram: `
Where's the pharmacy? – It's ___ to the bakery.|next|near|opposite|between
The post office is ___ the park and the zoo.|between|next|opposite to|behind to#between A and B: ở giữa A và B.
How ___ I get to the bus stop?|can|do|am|is
Go ___ and turn right.|straight|left|right|next
You can buy bread at the ___.|bakery|pharmacy|post office|bus stop
Turn ___ at the bus stop. The pharmacy is on your left.|left|right|straight|next
Where can I buy medicine? – At the ___.|pharmacy|bakery|bus stop|post office`
    },
    {
      n: 18, t: "At the shopping centre", vi: "Ở trung tâm mua sắm",
      words: `
T-shirt|áo phông
jacket|áo khoác
jeans|quần bò
shoes|giày
skirt|chân váy
sandals|dép xăng-đan
dress|váy liền
socks|tất
how much|bao nhiêu tiền
buy|mua
cheap|rẻ
expensive|đắt`,
      sents: `
How much is the jacket?
It's ninety thousand dong.
How much are the shoes?
They're two hundred thousand dong.
What do you want to buy?
I want to buy a new dress.`,
      gram: `
How much ___ the T-shirt?|is|are|do|does#T-shirt là số ít → "How much is...?"
How much are the jeans? – ___ 150,000 dong.|They're|It's|It|They
I want to ___ a pair of sandals.|buy|buys|buying|bought
These shoes are very ___. They're 900,000 dong.|expensive|cheap|small|short
How ___ are the socks? – They're 20,000 dong.|much|many|old|long
How much ___ these shoes?|are|is|do|does#"shoes" là số nhiều → How much are...?
I'd like this skirt. It's very ___. Only 50,000 dong.|cheap|expensive|big|old`
    },
    {
      n: 19, t: "The animal world", vi: "Thế giới động vật",
      words: `
animal|con vật
monkey|con khỉ
elephant|con voi
tiger|con hổ
crocodile|con cá sấu
giraffe|con hươu cao cổ
zebra|con ngựa vằn
kangaroo|con chuột túi
lion|con sư tử
bear|con gấu
hippo|con hà mã
climb|leo, trèo
swing|đu (cành cây)
roar|gầm`,
      sents: `
What animal do you want to see?
I want to see the elephants.
Why do you like monkeys?
Because they can climb trees.
Tigers can roar loudly.
Kangaroos can jump very high.`,
      gram: `
What animal ___ you want to see?|do|does|are|is
I like monkeys ___ they can swing.|because|but|and|or
Giraffes ___ very long necks.|have|has|are|is
A ___ has black and white stripes.|zebra|lion|bear|hippo
Look! The tiger ___ roaring.|is|are|am|do
Why do you like elephants? – Because they ___ big and friendly.|are|is|can|have
Kangaroos ___ jump very high.|can|are|is|do`
    },
    {
      n: 20, t: "At the summer camp", vi: "Ở trại hè",
      words: `
summer camp|trại hè
tent|cái lều
campfire|lửa trại
put up a tent|dựng lều
sing songs|hát các bài hát
dance around the campfire|nhảy quanh lửa trại
play tug of war|chơi kéo co
tell stories|kể chuyện
play games|chơi trò chơi
together|cùng nhau`,
      sents: `
What are you doing?
I'm putting up a tent.
What's he doing?
He's telling stories.
We are dancing around the campfire.
The girls are playing tug of war.`,
      gram: `
What are they doing? – They ___ songs.|are singing|sing|is singing|singing
What's she doing? – She's ___ a tent.|putting up|put up|puts up|to put up
I ___ playing games with my friends.|am|is|are|be
Look! The boys ___ tug of war.|are playing|is playing|play|plays
We tell stories around the ___.|campfire|tent|bakery|zoo
What ___ the children doing? – They're playing games.|are|is|do|does
He ___ telling stories to his friends now.|is|are|am|be`
    }
  ],
  readings: [
    {
      units: [1, 3], kind: "read", title: "Linda's week",
      text: "Hello. My name is Linda. I'm from Australia. I'm Australian. I'm in Class 4A at Nguyen Du Primary School in Ha Noi. I get up at six o'clock. I have breakfast at six thirty and go to school at seven o'clock. On Saturdays, I help my parents. On Sundays, I visit my grandparents.",
      qs: `
Linda is from Australia.|T
She is in Class 4B.|F
She gets up at six o'clock.|T
She goes to school at seven thirty.|F
What does Linda do on Sundays?|She visits her grandparents.|She helps her parents.|She goes to school.|She listens to music.`
    },
    {
      units: [4, 5], kind: "read", title: "Mai's birthday party",
      text: "Today is Mai's birthday. She is nine years old. Her birthday is in October. Her friends come to her party. They eat chips, grapes and cake. They drink juice and lemonade. At the party, Nam plays the guitar and Mai sings. Linda can't sing, but she can dance very well.",
      qs: `
Mai's birthday is in October.|T
They drink milk at the party.|F
Who plays the guitar?|Nam|Mai|Linda|Mai's mother
What can Linda do?|She can dance.|She can sing.|She can play the guitar.|She can swim.`
    },
    {
      units: [6, 8], kind: "read", title: "Phong's school",
      text: "My name is Phong. My school is in the town. It is big and beautiful. There are three buildings, a library, a computer room and a big playground. I am in Class 4C. Today is Tuesday. I have Maths, Vietnamese, English and Music. My favourite subject is English because I want to be an English teacher.",
      qs: `
Phong's school is in the village.|F
There is a computer room at his school.|T
How many buildings are there?|Three|Two|Four|Five
Why does Phong like English?|Because he wants to be an English teacher.|Because it is easy.|Because he likes songs.|Because his friend likes it.`
    },
    {
      units: [9, 10], kind: "read", title: "A trip to the beach",
      text: "Last summer, Hoa and her family were at Nha Trang beach. The weather was hot and sunny. In the morning, they swam in the sea. In the afternoon, Hoa and her brother built a big sandcastle. Her father took a lot of photos. In the evening, they ate seafood. Hoa loved the trip very much.",
      qs: `
Where were Hoa and her family last summer?|At Nha Trang beach|In the countryside|At a campsite|In the mountains
They swam in the sea in the afternoon.|F
Who took photos?|Her father|Her mother|Her brother|Hoa
The weather was hot and sunny.|T`
    },
    {
      units: [11, 13], kind: "read", title: "Lucy's family",
      text: "Hi, I'm Lucy. I live in a flat on Hoa Binh Street. The street is busy and noisy, but my flat is quiet. My father is a doctor. He works in a hospital. He is tall and strong. My mother is a teacher. She is slim and she has long hair. She works at a primary school near our flat.",
      qs: `
Lucy lives in a house.|F
The street is busy and noisy.|T
What does Lucy's father do?|He's a doctor.|He's a teacher.|He's a farmer.|He's a driver.
What does Lucy's mother look like?|She's slim and has long hair.|She's tall and strong.|She's short and old.|She has short hair.`
    },
    {
      units: [14, 15], kind: "read", title: "Ben's weekend",
      text: "Ben's family is busy at the weekend. On Saturday morning, his mother goes shopping at the supermarket and his father cleans the floor. Ben waters the flowers and makes his bed. On Sunday afternoon, they go to the sports centre. His father plays tennis and Ben swims in the swimming pool. In the evening, they watch a film at the cinema.",
      qs: `
Ben's mother goes shopping on Saturday morning.|T
Who cleans the floor?|Ben's father|Ben's mother|Ben|Ben's sister
Ben plays tennis at the sports centre.|F
Where do they watch a film?|At the cinema|At home|At the zoo|At the bookshop`
    },
    {
      units: [16, 17], kind: "read", title: "Going to the park",
      text: "Today is Sunday. It's sunny and warm, so Minh wants to go to the park. The park is in the city centre. To get there, Minh goes straight and turns left at the bakery. The park is opposite the post office and next to the pharmacy. There is a bus stop near the park, too.",
      qs: `
The weather is rainy today.|F
Minh wants to go to the park.|T
Where does Minh turn left?|At the bakery|At the post office|At the pharmacy|At the bus stop
The park is opposite the ___.|post office|pharmacy|bakery|supermarket`
    },
    {
      units: [18, 20], kind: "read", title: "Mia's summer camp",
      text: "Last month, Mia went to a summer camp with her class. Before the trip, she went to the shopping centre with her mum. She bought a jacket and a pair of shoes. The jacket was 200,000 dong. At the camp, the children put up tents, played tug of war and danced around the campfire. On the last day, they visited a zoo. Mia liked the monkeys because they can swing and climb.",
      qs: `
Mia went to the summer camp with her family.|F
How much was the jacket?|200,000 dong|100,000 dong|150,000 dong|250,000 dong
The children danced around the campfire.|T
Why did Mia like the monkeys?|Because they can swing and climb.|Because they are big.|Because they can roar.|Because they can swim.`
    },
    {
      units: [1, 5], kind: "read", title: "Kenji's day",
      text: "My name is Kenji. I'm from Japan. I'm nine years old. My birthday is in April. I get up at six thirty every day. I go to school from Monday to Friday. I can swim and play the piano, but I can't ride a horse. On Saturdays, I listen to music and help my parents.",
      qs: `
Kenji is from Japan.|T
His birthday is in August.|F
What time does Kenji get up?|At six thirty|At six o'clock|At seven o'clock|At seven thirty
What can't Kenji do?|Ride a horse|Swim|Play the piano|Listen to music`
    },
    {
      units: [6, 10], kind: "read", title: "Nam's school week",
      text: "Nam's school is in the city. It has a big library, a gym and a garden. Nam has English on Mondays, Wednesdays and Fridays. His favourite subject is Science because he wants to be a scientist. Last Saturday was sports day. Nam played badminton and his team won. After that, he and his friends took a lot of photos.",
      qs: `
There is a gym at Nam's school.|T
When does Nam have English?|On Mondays, Wednesdays and Fridays|On Tuesdays and Thursdays|Every day|On Saturdays
Why does Nam like Science?|Because he wants to be a scientist.|Because it is easy.|Because he likes his teacher.|Because he likes animals.
Nam's team lost the badminton match.|F`
    },
    {
      units: [11, 15], kind: "read", title: "Hoa's family",
      text: "Hoa lives in a house on Tran Hung Dao Street. The street is quiet and beautiful. Her father is a driver. He is tall and strong. Her mother is a nurse and she works in a hospital. At the weekend, Hoa's family is very busy. Her mother goes shopping at the supermarket, her father cleans the floor and Hoa waters the flowers. On Sunday evening, they watch a film at the cinema.",
      qs: `
Hoa's street is noisy.|F
What does Hoa's father do?|He's a driver.|He's a nurse.|He's a farmer.|He's a doctor.
Where does Hoa's mother work?|In a hospital|In a factory|In a school|On a farm
Hoa waters the flowers at the weekend.|T`
    },
    {
      units: [16, 20], kind: "read", title: "A day at the zoo",
      text: "Yesterday was sunny and warm, so Tom and his sister went to the zoo. The zoo is opposite the shopping centre. Before the trip, Tom bought a new T-shirt. It was 80,000 dong. At the zoo, they saw elephants, giraffes and monkeys. Tom likes monkeys because they can swing and climb. His sister likes giraffes because they have long necks.",
      qs: `
The weather was rainy yesterday.|F
Where is the zoo?|Opposite the shopping centre|Next to the bakery|Behind the cinema|Near the post office
How much was Tom's T-shirt?|80,000 dong|18,000 dong|8,000 dong|800,000 dong
Why does Tom's sister like giraffes?|Because they have long necks.|Because they can swing.|Because they can climb.|Because they are small.`
    }
  ]
};
