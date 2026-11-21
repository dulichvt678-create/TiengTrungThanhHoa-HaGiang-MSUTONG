/*
 * Tiếng Anh lớp 7 – bám theo chủ đề 12 Unit của sách Tiếng Anh 7 Global Success.
 * Từ vựng, câu mẫu, câu hỏi và bài đọc do app tự biên soạn.
 *
 * words / sents / gram: giống lop4.js
 * phon:   "w[o]rd w[o]rd w[o]rd w[o]rd|k"  phần trong [] là phần gạch chân, k = vị trí (0–3) của từ phát âm khác
 * stress: "word word word word|k"  k = vị trí từ có trọng âm khác
 * errs:   câu có 4 phần trong {} (A, B, C, D)|k  k = vị trí phần sai
 * rew:    "câu gốc|câu gần nghĩa nhất|sai|sai|sai"
 * readings kind "cloze": chỗ trống ghi (1) ___ … ; qs: "(1)|đúng|sai|sai|sai"
 */
window.EN_GRADES = window.EN_GRADES || {};
window.EN_GRADES.lop7 = {
  key: "lop7", grade: 7, name: "Lớp 7", book: "Tiếng Anh 7 · Global Success",
  terms: [
    { key: "gk1", name: "Giữa học kì 1", units: [1, 3] },
    { key: "ck1", name: "Cuối học kì 1", units: [1, 6] },
    { key: "gk2", name: "Giữa học kì 2", units: [7, 9] },
    { key: "ck2", name: "Cuối học kì 2", units: [7, 12] }
  ],
  units: [
    {
      n: 1, t: "Hobbies", vi: "Sở thích",
      words: `
hobby|sở thích
collect|sưu tầm
gardening|làm vườn
horse riding|cưỡi ngựa
making models|làm mô hình
building dollhouses|làm nhà búp bê
jogging|chạy bộ
arranging flowers|cắm hoa
painting|vẽ tranh
unusual|khác thường
patient|kiên nhẫn
creative|sáng tạo
take up|bắt đầu (một sở thích)
share|chia sẻ
stamp|con tem`,
      sents: `
What's your hobby?
My hobby is collecting stamps.
I enjoy gardening with my grandmother.
She loves arranging flowers.
Building dollhouses is an unusual hobby.
Making models helps me become more patient.`,
      gram: `
My brother likes ___ models in his free time.|making|make|makes|made#Sau like / love / enjoy / hate dùng V-ing.
I hate ___ up early on Sundays.|getting|get|gets|got#Sau "hate" dùng V-ing.
She ___ horse riding every weekend.|goes|go|going|is go#Thì hiện tại đơn, chủ ngữ số ít → goes.
How often ___ he do gardening?|does|do|is|are
Arranging flowers needs a lot of ___.|patience|patient|patiently|patients#Sau "a lot of" cần danh từ: patience (sự kiên nhẫn).
Mai is very ___. She can make beautiful things from old paper.|creative|lazy|boring|unusual
When did you ___ up painting? – Two years ago.|take|took|taking|takes#Sau "did" dùng động từ nguyên mẫu.
Jack ___ playing computer games. He thinks they are boring.|doesn't like|likes|enjoys|loves`,
      phon: `
f[ir]st b[ir]d n[ur]se c[ar]|3
h[o]bby c[o]llect d[o]llhouse b[o]x|1
c[oo]king b[oo]k l[oo]k f[oo]d|3
m[a]king t[a]ke p[a]tient h[a]bit|3`,
      stress: `
hobby collect garden picture|1`,
      errs: `
My sister {enjoys} {to collect} {stamps} {in} her free time.|1
He {doesn't} {like} {play} football {on} rainy days.|2`,
      rew: `
I enjoy reading books.|I like reading books.|I hate reading books.|I don't read books.|I never read books.
My hobby is collecting coins.|I like collecting coins.|I don't collect coins.|Collecting coins is boring.|My brother collects coins.`
    },
    {
      n: 2, t: "Healthy living", vi: "Lối sống lành mạnh",
      words: `
healthy|khoẻ mạnh, lành mạnh
junk food|đồ ăn vặt, đồ ăn nhanh
soft drink|nước ngọt có ga
exercise|tập thể dục
fit|cân đối, khoẻ
acne|mụn trứng cá
sunburn|cháy nắng
chapped lips|môi nứt nẻ
skin|làn da
lip balm|son dưỡng môi
vegetables|rau củ
tofu|đậu phụ
spots|mụn nhọt
sleep|ngủ
outdoor activities|hoạt động ngoài trời`,
      sents: `
You should eat more vegetables.
Drink a lot of water to keep your skin healthy.
Don't eat too much junk food.
I do exercise every morning.
Wear a hat to avoid sunburn.
He uses lip balm for his chapped lips.`,
      gram: `
You should ___ enough sleep every night.|get|gets|getting|to get#Sau "should" dùng động từ nguyên mẫu.
We ___ eat too much junk food.|shouldn't|should|don't should|not should
Wash your face twice a day to avoid ___.|acne|sunburn|chapped lips|tofu
Wear a sun hat when you go out to avoid ___.|sunburn|acne|chapped lips|spots
Doing exercise ___ us stay fit.|helps|help|helping|to help#Chủ ngữ là V-ing (Doing exercise) → động từ chia số ít.
My mother cooks healthy food. She ___ cooks fried food.|rarely|always|usually|often
Which sentence is a simple sentence?|I drink a lot of water.|I drink water, and I eat fruit.|I eat fruit because it's healthy.|Although I'm tired, I do exercise.#Câu đơn chỉ có một mệnh đề (một chủ ngữ và một động từ chính).
Eat more fruit ___ vegetables to stay healthy.|and|but|or|so`,
      phon: `
[f]it [f]ace o[f] [f]ood|2
h[ea]lthy br[ea]d h[ea]d m[ea]t|3
s[u]nburn l[u]nch j[u]nk p[u]t|3
sk[i]n l[i]p d[i]nner r[i]ce|3`,
      stress: `
healthy sunburn avoid tofu|2`,
      errs: `
You {should} {eats} more {vegetables} {to stay} healthy.|1
{Doing} exercise {make} our bodies {stronger} and {healthier}.|1`,
      rew: `
It's good for you to do exercise every day.|You should do exercise every day.|You shouldn't do exercise every day.|You can't do exercise every day.|Doing exercise every day is bad.
Don't eat too much fast food.|You shouldn't eat too much fast food.|You should eat a lot of fast food.|Fast food is good for you.|You must eat fast food.`
    },
    {
      n: 3, t: "Community service", vi: "Hoạt động vì cộng đồng",
      words: `
community service|hoạt động vì cộng đồng
volunteer|tình nguyện viên
donate|quyên góp
homeless people|người vô gia cư
elderly people|người cao tuổi
tutor|dạy kèm
clean up|dọn dẹp
plant trees|trồng cây
recycle|tái chế
charity|từ thiện
raise money|gây quỹ
environment|môi trường
neighbourhood|khu phố
blood|máu`,
      sents: `
We volunteered at a nursing home last summer.
They donated books to children in the countryside.
Did you plant trees in your neighbourhood?
Our club raised money for homeless people.
We cleaned up the beach last Sunday.
I tutored young children in Maths.`,
      gram: `
Last summer, we ___ trees in the park.|planted|plant|plants|planting#"Last summer" → thì quá khứ đơn: V-ed.
___ you donate your old clothes last month?|Did|Do|Were|Are
They ___ to the countryside to help farmers yesterday.|went|go|goes|gone#go → went (động từ bất quy tắc).
She didn't ___ at the charity event last week.|volunteer|volunteered|volunteers|volunteering#Sau "didn't" dùng động từ nguyên mẫu.
We collect plastic bottles to ___ them.|recycle|donate|tutor|plant
Our class raised money ___ the flood victims.|for|to|with|on
A person who works without pay to help others is a ___.|volunteer|tutor|worker|teacher
We ___ the street near our school last weekend.|cleaned up|clean up|cleans up|are cleaning up`,
      phon: `
help[ed] watch[ed] clean[ed] wash[ed]|2
donat[ed] visit[ed] plant[ed] recycl[ed]|3
play[ed] cook[ed] stay[ed] clean[ed]|1
collect[ed] need[ed] rais[ed] provid[ed]|2`,
      stress: `
about people village garbage|0`,
      errs: `
Last summer we {plant} {trees} {in} our {neighbourhood}.|0
{Did} you {went} to the {charity} concert {yesterday}?|1`,
      rew: `
We gave our old books to poor children.|We donated our old books to poor children.|We sold our old books to poor children.|We bought old books for poor children.|We read old books with poor children.
I helped young children with their homework.|I tutored young children.|Young children helped me with homework.|I didn't help young children.|I gave homework to young children.`
    },
    {
      n: 4, t: "Music and arts", vi: "Âm nhạc và nghệ thuật",
      words: `
musical instrument|nhạc cụ
concert|buổi hoà nhạc
art gallery|phòng trưng bày nghệ thuật
painter|hoạ sĩ
musician|nhạc công, nhạc sĩ
compose|sáng tác (nhạc)
composer|nhà soạn nhạc
perform|biểu diễn
puppet show|buổi diễn múa rối
water puppetry|múa rối nước
photography|nhiếp ảnh
exhibition|triển lãm
talented|có tài
classical music|nhạc cổ điển`,
      sents: `
My taste in music is different from my sister's.
Water puppetry is as interesting as a puppet show.
Pop music is not as relaxing as classical music.
We went to an art gallery last weekend.
She can play three musical instruments.
Trinh Cong Son was a famous composer.`,
      gram: `
My painting is different ___ yours.|from|with|to|as#different from: khác với.
This song is as beautiful ___ that one.|as|than|like|from#So sánh bằng: as + tính từ + as.
Rock music is not as ___ as classical music.|relaxing|more relaxing|most relaxing|relaxed
My hobby is ___ yours. We both like drawing.|like|different from|not as|as
She is a talented ___. She plays the violin in an orchestra.|musician|painter|composer|photographer
A person who writes music is a ___.|composer|painter|singer|actor
Which is a musical instrument?|violin|painting|sculpture|exhibition
There is a photo ___ at the city museum this week.|exhibition|concert|instrument|composer`,
      phon: `
[sh]ow musi[ci]an televi[si]on [sh]op|2
plea[s]ure mea[s]ure u[s]ual [s]ugar|3
c[o]ncert c[o]mpose r[o]ck h[o]t|1
p[u]ppet dr[u]m f[u]n m[u]sic|3`,
      stress: `
music concert perform painting|2`,
      errs: `
My hobby {is} {different} {with} {yours}.|2
My bike is {as} {old} {than} {my} brother's.|2`,
      rew: `
My sister and I like the same kind of music.|My taste in music is like my sister's.|My taste in music is different from my sister's.|My sister doesn't like music.|I don't like my sister's music.
The drawing is not as expensive as the painting.|The painting is more expensive than the drawing.|The drawing is more expensive than the painting.|The painting is as cheap as the drawing.|The drawing and the painting cost the same.`
    },
    {
      n: 5, t: "Food and drink", vi: "Đồ ăn và thức uống",
      words: `
pancake|bánh kếp
omelette|trứng tráng
spring rolls|nem rán
beef noodle soup|phở bò
eel soup|súp lươn
ingredient|nguyên liệu
flour|bột mì
butter|bơ
sauce|nước sốt
sugar|đường
salt|muối
pepper|hạt tiêu
teaspoon|thìa cà phê
tablespoon|thìa canh
pork|thịt lợn
shrimp|con tôm
mineral water|nước khoáng`,
      sents: `
How much flour do we need?
We need two cups of flour.
How many eggs are there in the fridge?
There are some eggs in the fridge.
Beef noodle soup is a popular dish in Viet Nam.
Add a teaspoon of salt and some pepper.`,
      gram: `
How ___ milk do you drink every day?|much|many|a lot|some#"milk" là danh từ không đếm được → How much.
How ___ eggs do we need?|many|much|lot|any#"eggs" là danh từ đếm được số nhiều → How many.
There is ___ butter in the fridge.|some|many|a|an
We need a ___ of sugar for this cake.|teaspoon|bar|slice|loaf
She eats ___ of vegetables every day.|lots|much|many|any#lots of = a lot of: nhiều.
Would you like ___ lemonade?|some|many|a few|an#Dùng "some" trong câu mời.
Pho is a famous Vietnamese ___.|dish|drink|ingredient|sauce
I'd like a ___ of mineral water, please.|bottle|loaf|bar|slice`,
      phon: `
p[o]rk f[o]rk h[o]t sh[o]rt|2
s[au]ce s[a]lt w[a]ter b[a]con|3
s[ou]p gr[ou]p fl[ou]r y[ou]th|2
[o]melette b[o]ttle l[o]t s[o]da|3`,
      stress: `
pancake butter sugar prepare|3`,
      errs: `
How {many} {milk} {do} we {need}?|0
We need {some} {flour} and {two} {egg}.|3`,
      rew: `
There isn't much sugar in the jar.|There is only a little sugar in the jar.|There is a lot of sugar in the jar.|There are many sugars in the jar.|The jar is full of sugar.
How much is a bowl of pho?|What is the price of a bowl of pho?|How many bowls of pho are there?|Do you like pho?|Where can I buy pho?`
    },
    {
      n: 6, t: "A visit to a school", vi: "Chuyến thăm trường học",
      words: `
gifted|có năng khiếu
facilities|cơ sở vật chất
project|dự án
entrance exam|kì thi đầu vào
school yard|sân trường
lab|phòng thí nghiệm
well-known|nổi tiếng
take part in|tham gia
midterm|giữa kì
lower secondary school|trường trung học cơ sở
equipment|thiết bị
canteen|căng tin`,
      sents: `
Our school is famous for its modern facilities.
Students take part in many outdoor activities.
The lab is on the second floor.
We visited a gifted school last month.
There is a canteen behind the library.
The school opened in 1995.`,
      gram: `
Our class has English ___ Monday morning.|on|in|at|to#Dùng "on" với ngày, và buổi của một ngày cụ thể.
The lab is ___ the second floor.|on|in|at|under#Tầng nhà dùng "on": on the second floor.
School starts ___ 7 a.m.|at|in|on|by#Giờ cụ thể dùng "at".
The school was founded ___ 1995.|in|on|at|for#Năm dùng "in".
Students ___ part in many clubs after school.|take|make|do|have#take part in: tham gia.
It is a ___ school for students who are very good at Maths.|gifted|noisy|busy|lazy
Our school has modern ___ like a gym and a computer room.|facilities|subjects|projects|exams
We have to pass an ___ exam to study at this school.|entrance|exit|enter|entry`,
      phon: `
[ch]air tea[ch]er [ch]emistry lun[ch]|2
[g]ym [g]ifted pa[g]e lar[g]e|1
l[i]brary g[i]fted l[i]ke wr[i]te|1
y[ar]d p[ar]k c[ar]d w[ar]m|3`,
      stress: `
project science subject success|3`,
      errs: `
Our school {has} {a} big library {at} the {second} floor.|2
We have English lessons {in} Monday {and} {on} Friday {mornings}.|0`,
      rew: `
The library is next to the canteen.|The canteen is next to the library.|The library is far from the canteen.|The canteen is behind the library.|There is no canteen near the library.
Our school has a big school yard.|There is a big school yard in our school.|Our school doesn't have a school yard.|The school yard is very small.|There are many school yards in our school.`
    },
    {
      n: 7, t: "Traffic", vi: "Giao thông",
      words: `
traffic jam|tắc đường
road sign|biển báo giao thông
cycle lane|làn đường xe đạp
zebra crossing|vạch kẻ sang đường
pavement|vỉa hè
seat belt|dây an toàn
helmet|mũ bảo hiểm
obey|tuân theo
traffic rule|luật giao thông
traffic light|đèn giao thông
passenger|hành khách
pedestrian|người đi bộ
safely|một cách an toàn
distance|khoảng cách`,
      sents: `
It is about two kilometres from my house to school.
You should wear a helmet when you ride a motorbike.
Pedestrians should walk on the pavement.
We must obey traffic rules.
Always wear your seat belt in a car.
There is a traffic jam on this road every morning.`,
      gram: `
___ is about 3 kilometres from my house to the market.|It|This|That|There#Dùng "It" để nói về khoảng cách: It is + khoảng cách + from A to B.
How ___ is it from your house to school?|far|long|much|many#Hỏi khoảng cách: How far is it from A to B?
You ___ cross the road at the zebra crossing.|should|shouldn't|mustn't|don't
Cyclists should ride in the ___.|cycle lane|pavement|zebra crossing|seat belt
When the traffic light is red, you must ___.|stop|go|turn left|run
Passengers should ___ seat belts in a car.|wear|ride|drive|obey
A ___ is a person who walks in the street.|pedestrian|passenger|driver|cyclist
Children ___ play on the street. It's dangerous.|shouldn't|should|can|must`,
      phon: `
s[i]gn l[i]ght b[i]ke c[i]ty|3
s[a]fely l[a]ne pl[a]ne tr[a]ffic|3
r[oa]d b[oa]t b[oa]rd c[oa]t|2
dr[i]ve r[i]de dr[i]ver r[i]ver|3`,
      stress: `
traffic helmet obey careful|2`,
      errs: `
It {is} {about} 2 kilometres {to} my house {to} the school.|2
You {should} {to wear} a helmet {when} you {ride} a motorbike.|1`,
      rew: `
My house is 2 km from the school.|It is 2 km from my house to the school.|It takes 2 hours to go to school.|The school is 2 km from the market.|My house is next to the school.
It's not a good idea to ride your bike too fast.|You shouldn't ride your bike too fast.|You should ride your bike fast.|You must ride your bike fast.|Riding fast is safe.`
    },
    {
      n: 8, t: "Films", vi: "Phim ảnh",
      words: `
comedy|phim hài
horror film|phim kinh dị
science fiction film|phim khoa học viễn tưởng
documentary|phim tài liệu
animated film|phim hoạt hình
fantasy|phim giả tưởng
boring|nhàm chán
confusing|khó hiểu
gripping|hấp dẫn, lôi cuốn
moving|cảm động
shocking|gây sốc
frightening|đáng sợ
director|đạo diễn
review|bài nhận xét, đánh giá`,
      sents: `
Although the film was long, we enjoyed it.
It's a gripping science fiction film.
I don't like horror films because they are frightening.
The film was boring; however, the acting was good.
Who is the director of this film?
We watched an animated film last night.`,
      gram: `
___ the film was boring, we watched it until the end.|Although|However|Because|So#"Although" + mệnh đề: nối hai ý trái ngược trong cùng một câu.
The film was moving; ___, it was too long.|however|although|because|but#"; however," đứng giữa hai mệnh đề, sau dấu chấm phẩy.
I couldn't stop watching. The film was really ___.|gripping|boring|confusing|bored
A ___ is a film that makes people laugh.|comedy|horror film|documentary|fantasy
The ending was ___. I didn't understand it.|confusing|moving|gripping|funny
My sister cried at the end. The film was very ___.|moving|boring|frightening|confused
I was ___ when I watched that horror film.|frightened|frightening|fright|frighten#Đuôi -ed chỉ cảm xúc của người; đuôi -ing chỉ tính chất của sự vật.
A ___ film gives facts about real life.|documentary|fantasy|animated|science fiction`,
      phon: `
[th]is [th]at [th]in mo[th]er|2
[th]riller [th]ink [th]ree [th]ey|3
m[o]ving m[o]vie d[o] c[o]medy|3
sh[o]cking b[o]ring h[o]rror d[o]cumentary|1`,
      stress: `
director character comedy cinema|0`,
      errs: `
{Although} the film was long, {but} we {enjoyed} {it}.|1
The film {was} so {bored} that I {fell} {asleep}.|1`,
      rew: `
Although the film was long, it was interesting.|The film was long; however, it was interesting.|The film was long, so it was interesting.|The film was long because it was interesting.|The film was short and interesting.
I found the film boring.|The film was boring to me.|The film was exciting to me.|I didn't watch the film.|I made the film.`
    },
    {
      n: 9, t: "Festivals around the world", vi: "Lễ hội khắp thế giới",
      words: `
festival|lễ hội
Easter|lễ Phục sinh
Christmas|lễ Giáng sinh
Thanksgiving|lễ Tạ ơn
Diwali|lễ hội ánh sáng Diwali
Halloween|lễ hội Halloween
Mid-Autumn Festival|Tết Trung thu
lantern|đèn lồng
fireworks|pháo hoa
decorate|trang trí
parade|cuộc diễu hành
costume|trang phục hoá trang
turkey|gà tây
celebrate|tổ chức, kỉ niệm
carve|khắc, chạm
feast|bữa tiệc lớn`,
      sents: `
Do you celebrate the Mid-Autumn Festival?
Yes, we do.
People carve pumpkins at Halloween.
Children carry lanterns at the Mid-Autumn Festival.
Americans eat turkey at Thanksgiving.
Diwali is the festival of lights.`,
      gram: `
___ you watch the fireworks last Tet? – Yes, I did.|Did|Do|Were|Are
People ___ their houses with lights at Christmas.|decorate|decorates|decorating|decoration
Children wear ___ at Halloween.|costumes|turkeys|lanterns|fireworks
___ do people celebrate Thanksgiving? – In November.|When|Where|What|Who
Is Diwali a festival of lights? – Yes, it ___.|is|does|was not|isn't
Easter is usually ___ spring.|in|on|at|to
We had a big ___ with lots of food.|feast|parade|lantern|costume
There was a ___ with music and dancers in the street.|parade|feast|turkey|lantern`,
      phon: `
[Ch]ristmas [ch]ocolate [ch]urch [ch]eese|0
l[a]ntern c[a]ndle f[a]mily p[a]rade|3
decorat[ed] celebrat[ed] watch[ed] want[ed]|2`,
      stress: `
festival celebrate decorate important|3`,
      errs: `
{Does} people {celebrate} Easter {in} {spring}?|0
{Did} you {watched} the parade {on} {Sunday}?|1`,
      rew: `
When does the festival take place?|When is the festival held?|Where is the festival held?|Why is the festival held?|Who holds the festival?
Christmas is my favourite festival.|I like Christmas best.|I don't like Christmas.|Christmas is not a festival.|I like all festivals the same.`
    },
    {
      n: 10, t: "Energy sources", vi: "Các nguồn năng lượng",
      words: `
energy|năng lượng
renewable|có thể tái tạo
non-renewable|không thể tái tạo
solar energy|năng lượng mặt trời
wind energy|năng lượng gió
hydro energy|thuỷ năng
coal|than đá
oil|dầu mỏ
natural gas|khí tự nhiên
nuclear energy|năng lượng hạt nhân
electricity|điện
pollution|sự ô nhiễm
solar panel|tấm pin mặt trời
plentiful|dồi dào
limited|có hạn
save|tiết kiệm`,
      sents: `
We are using solar energy to heat water.
Wind energy is renewable and clean.
Coal and oil are non-renewable energy sources.
Turn off the lights to save electricity.
There are solar panels on the roof of my house.
Burning coal causes air pollution.`,
      gram: `
Look! They ___ solar panels on the roof.|are putting|put|puts|putting#"Look!" → thì hiện tại tiếp diễn: am/is/are + V-ing.
At the moment, we ___ less electricity than last year.|are using|use|used|uses#"At the moment" → thì hiện tại tiếp diễn.
Solar energy is ___ because it never runs out.|renewable|non-renewable|limited|expensive
Coal is a ___ energy source.|non-renewable|renewable|plentiful|clean
___ off the lights when you leave the room.|Turn|Take|Put|Go
Burning oil causes air ___.|pollution|polluted|pollute|polluting#Sau "air" cần danh từ: pollution.
Energy from the sun is called ___ energy.|solar|wind|hydro|nuclear
Is she ___ the lights now? – Yes, she is.|turning off|turn off|turns off|turned off`,
      phon: `
s[o]lar h[o]me c[o]ld h[o]t|3
c[oa]l b[oa]t r[oa]d br[oa]d|3
w[i]nd l[i]mited pr[i]ce l[i]st|2`,
      stress: `
solar power panel supply|3
energy plentiful pollution limited|2`,
      errs: `
Look! The workers {are} {install} solar panels {on} the {roof}.|1
We {are} {use} too much {electricity} {at the moment}.|1`,
      rew: `
We use electricity from the sun.|We use solar energy.|We use wind energy.|We use nuclear energy.|We don't use electricity.
Coal will run out one day.|Coal is a non-renewable energy source.|Coal is a renewable energy source.|There will always be enough coal.|Coal is a clean energy source.`
    },
    {
      n: 11, t: "Travelling in the future", vi: "Phương tiện đi lại trong tương lai",
      words: `
driverless car|ô tô không người lái
flying car|ô tô bay
hyperloop|tàu siêu tốc hyperloop
skyTran|tàu điện trên không skyTran
solar-powered ship|tàu chạy bằng năng lượng mặt trời
bamboo-copter|chong chóng tre
teleporter|máy dịch chuyển tức thời
eco-friendly|thân thiện với môi trường
fuel|nhiên liệu
pilot|phi công
convenient|thuận tiện
autopilot|chế độ lái tự động
future|tương lai
travel|đi lại, du lịch`,
      sents: `
People will travel by flying cars in the future.
Driverless cars will be safe and convenient.
Solar-powered ships are eco-friendly.
This bike is mine, and that one is yours.
Will we use teleporters one day?
The hyperloop will be very fast.`,
      gram: `
In the future, people ___ travel by flying cars.|will|are|did|do#Thì tương lai đơn: will + động từ nguyên mẫu.
This flying car is ___. It belongs to me.|mine|my|me|I#Đại từ sở hữu: mine, yours, his, hers, ours, theirs.
Is that bamboo-copter your sister's? – Yes, it's ___.|hers|her|she|herself
Solar-powered ships are ___ because they don't cause pollution.|eco-friendly|expensive|dangerous|slow
___ people travel to Mars in 2050? – Maybe.|Will|Do|Did|Are
Driverless cars ___ need a driver.|won't|will|aren't|doesn't
A ___ flies a plane.|pilot|driver|passenger|sailor
In the future, many cars will run on ___ instead of petrol.|electricity|water|coal|sand`,
      phon: `
f[u]ture f[u]el r[u]n c[u]te|2
fl[y]ing sk[y] c[y]cle cit[y]|3
dr[i]verless p[i]lot b[i]cycle f[i]sh|3`,
      stress: `
future rocket pilot machine|3`,
      errs: `
In the future, people {will} {travels} {by} flying {cars}.|1
This {flying} car {is} {my}, not {yours}.|2`,
      rew: `
This is my bike.|This bike is mine.|This bike is yours.|This is your bike.|I don't have a bike.
I think flying cars will be popular in the future.|In my opinion, many people will use flying cars in the future.|Flying cars are popular now.|No one will use flying cars.|I don't like flying cars.`
    },
    {
      n: 12, t: "English-speaking countries", vi: "Các nước nói tiếng Anh",
      words: `
native speaker|người bản ngữ
capital|thủ đô
symbol|biểu tượng
kangaroo|con chuột túi
Scotland|nước Xcốt-len
Canada|nước Ca-na-đa
New Zealand|nước Niu Di-lân
the USA|nước Mỹ
the UK|Vương quốc Anh
castle|lâu đài
landscape|phong cảnh
tower|toà tháp
museum|bảo tàng
official language|ngôn ngữ chính thức
tourist|khách du lịch`,
      sents: `
English is the official language in many countries.
The capital of Australia is Canberra.
The kangaroo is a symbol of Australia.
Scotland is famous for its castles.
Canada has beautiful landscapes.
Many tourists visit London every year.`,
      gram: `
London is ___ capital of the UK.|the|a|an|(không dùng mạo từ)#Dùng "the" với danh từ đã xác định, duy nhất.
Canada is ___ English-speaking country.|an|a|the|some#"English" bắt đầu bằng nguyên âm → "an".
The ___ is a symbol of Australia.|kangaroo|panda|elephant|tiger
People in the USA speak English as their ___ language.|first|second|foreign|last
Big Ben is a famous clock ___ in London.|tower|castle|museum|bridge
Ottawa is the capital ___ Canada.|of|in|on|at
Edinburgh is famous ___ its castle.|for|of|with|at#be famous for: nổi tiếng về.
Many ___ come to visit the Sydney Opera House.|tourists|natives|capitals|symbols`,
      phon: `
c[a]pital l[a]ndscape f[a]mily c[a]stle|3
[c]ity [c]apital [c]ountry [c]astle|0
t[ow]er d[ow]n n[ow] kn[ow]|3`,
      stress: `
Canada capital beautiful museum|3`,
      errs: `
Sydney {is} famous {for} {it's} {beautiful} Opera House.|2
{An} Statue of Liberty is {in} New York {in} {the} USA.|0`,
      rew: `
English is spoken in Australia.|People in Australia speak English.|People in Australia don't speak English.|English isn't spoken in Australia.|Australians speak French.
Canberra is the capital of Australia.|The capital of Australia is Canberra.|Sydney is the capital of Australia.|Canberra is a city in Canada.|Australia has no capital.`
    }
  ],
  readings: [
    {
      units: [1, 1], kind: "read", title: "Ha's unusual hobby",
      text: "My name is Ha. I have an unusual hobby: building dollhouses. I took it up three years ago when my aunt gave me a small dollhouse for my birthday. I use cardboard, glue, paint and old pieces of cloth to make the rooms and furniture. It takes me about a month to finish one house. Building dollhouses makes me more patient and creative. In the future, I want to share my hobby with other children by opening a small class at the weekend.",
      qs: `
What is Ha's hobby?|Building dollhouses|Collecting dolls|Making cakes|Gardening
When did Ha take up her hobby?|Three years ago|Last month|When she was a baby|Last year
Ha uses old pieces of cloth to make her dollhouses.|T
It takes Ha a week to finish a dollhouse.|F
Her hobby makes her ___.|patient and creative|lazy and bored|tired and sad|rich and famous`
    },
    {
      units: [2, 3], kind: "read", title: "The Green Club",
      text: "Last summer, Nam joined the Green Club in his neighbourhood. Every Sunday morning, the members cleaned up the park and planted trees along the streets. They also collected old clothes and books and donated them to children in a mountain village. Nam says volunteering is good for his health, too. He walks and works outdoors a lot, so he feels fit and sleeps well. He also eats more vegetables and drinks fewer soft drinks now.",
      qs: `
What did the club members do every Sunday morning?|They cleaned up the park and planted trees.|They played football.|They went to the mountain village.|They sold old clothes.
They donated old clothes and books to children in a mountain village.|T
Nam joined the Green Club last winter.|F
Why does Nam feel fit?|Because he walks and works outdoors a lot.|Because he drinks soft drinks.|Because he sleeps late.|Because he eats junk food.`
    },
    {
      units: [4, 5], kind: "read", title: "Water puppetry",
      text: "Water puppetry is a traditional art form of Viet Nam. It started in villages in the Red River Delta about a thousand years ago. The puppets are made of wood and painted in bright colours. The puppeteers stand behind a bamboo screen and move the puppets on the water. During the show, there is traditional music with drums and flutes. After the show, many tourists like to try Vietnamese food such as spring rolls and beef noodle soup.",
      qs: `
Water puppetry started in the Red River Delta.|T
The puppets are made of plastic.|F
Where do the puppeteers stand?|Behind a bamboo screen|In front of the audience|On the roof|In the village market
Which musical instruments are mentioned?|Drums and flutes|Guitars and pianos|Violins|Trumpets
What food do tourists like to try?|Spring rolls and beef noodle soup|Pizza and pasta|Pancakes|Omelettes`
    },
    {
      units: [6, 6], kind: "read", title: "A visit to a gifted school",
      text: "Last week, our class visited Tran Phu Gifted School. It is one of the most well-known schools in our province. The school has modern facilities: a large library, three science labs and a big gym. Students there study hard to pass the entrance exam. Besides lessons, they take part in many clubs, such as the robotics club and the English club. We had lunch at the school canteen and then joined an outdoor activity in the school yard.",
      qs: `
The school has three science labs.|T
Students don't need to take an entrance exam.|F
Which club is mentioned?|The robotics club|The music club|The chess club|The art club
Where did the class have lunch?|At the school canteen|In the library|In the gym|At home`
    },
    {
      units: [7, 8], kind: "read", title: "Lan's week",
      text: "Lan lives about five kilometres from her school. She usually goes to school by bike. She always rides in the cycle lane and wears a helmet. In the morning, there are often traffic jams on the main road, so she takes a quieter road. Last Saturday, Lan and her friends went to the cinema. They watched a science fiction film. Although it was a bit confusing, Lan found it gripping. Her friend Mai didn't like it; she thought it was boring.",
      qs: `
How far is it from Lan's house to her school?|About five kilometres|About two kilometres|About ten kilometres|About one kilometre
Lan rides on the pavement.|F
What kind of film did they watch?|A science fiction film|A horror film|A comedy|A documentary
Mai thought the film was gripping.|F`
    },
    {
      units: [9, 9], kind: "read", title: "Thanksgiving",
      text: "Thanksgiving is an important festival in the USA. It is on the fourth Thursday of November. On this day, families get together to have a big feast. The main dish is roast turkey, and there is also pumpkin pie. People give thanks for the good things in their lives. In New York, there is a famous parade with big balloons, bands and dancers. Many people watch it on TV.",
      qs: `
Thanksgiving is in November.|T
What is the main dish at Thanksgiving?|Roast turkey|Mooncakes|Fried chicken|Spring rolls
People give thanks for the good things in their lives.|T
Nobody watches the parade on TV.|F`
    },
    {
      units: [10, 11], kind: "read", title: "Energy and transport",
      text: "Energy is very important in our daily life. Today, most of our electricity comes from coal, oil and natural gas. These sources are non-renewable and they cause pollution. In the future, we will use more renewable sources like solar, wind and hydro energy. Some people believe that cars will run on electricity from solar panels. Ships will use solar power too, so they will be more eco-friendly. Maybe one day we will even travel by hyperloop, which will be very fast.",
      qs: `
Most of our electricity today comes from coal, oil and natural gas.|T
Non-renewable sources are clean.|F
Which is a renewable energy source?|Wind|Coal|Oil|Natural gas
Why will solar-powered ships be eco-friendly?|Because they use solar power.|Because they are fast.|Because they are big.|Because they use oil.`
    },
    {
      units: [12, 12], kind: "read", title: "Australia",
      text: "Australia is an English-speaking country. Its capital is Canberra, but its biggest city is Sydney. Australia is famous for its beautiful beaches and unique animals such as kangaroos and koalas. The kangaroo is a symbol of the country. Every year, millions of tourists visit the Sydney Opera House. Australia has a population of about 26 million people, and most of them live near the coast.",
      qs: `
What is the capital of Australia?|Canberra|Sydney|Melbourne|Perth
Sydney is the biggest city in Australia.|T
Which animal is a symbol of Australia?|The kangaroo|The panda|The tiger|The elephant
Most Australians live in the middle of the country.|F`
    },
    {
      units: [1, 2], kind: "cloze", title: "My grandfather",
      text: "My grandfather has a healthy lifestyle. He gets up early and goes (1) ___ in the park every morning. He loves (2) ___ in his small garden, too. He grows vegetables (3) ___ his family. He doesn't eat (4) ___ junk food, and he drinks lots of water. He says gardening makes him (5) ___ and relaxed.",
      qs: `
(1)|jogging|jog|jogs|to jogging
(2)|working|work|works|worked
(3)|for|to|with|at
(4)|much|many|a few|a
(5)|happy|happily|happiness|to happy`
    },
    {
      units: [3, 3], kind: "cloze", title: "A community project",
      text: "Last month, my class (1) ___ part in a community project. We (2) ___ old books and clothes from students in our school. Then we (3) ___ them to children in a village in Ha Giang. We also helped the children (4) ___ their homework. It was a great experience, and we felt very (5) ___.",
      qs: `
(1)|took|take|takes|taking
(2)|collected|collect|collects|collecting
(3)|donated|donate|donating|donates
(4)|with|for|on|at
(5)|happy|happily|happiness|happiest`
    },
    {
      units: [5, 6], kind: "cloze", title: "Our school canteen",
      text: "Our school canteen is (1) ___ the ground floor, next to the library. It is open (2) ___ 11 a.m. to 1 p.m. The cooks make delicious food every day. My favourite dish is beef noodle soup. They put a lot of beef, some onions and a little (3) ___ in it. There is also fruit, but there isn't (4) ___ sugar in the drinks. How (5) ___ does a meal cost? Only 25,000 dong.",
      qs: `
(1)|on|in|at|under
(2)|from|at|in|since
(3)|pepper|eggs|apples|onions
(4)|much|many|a few|few
(5)|much|many|long|often`
    },
    {
      units: [7, 7], kind: "cloze", title: "Road safety",
      text: "Road safety is very important. When you ride a bike, you should always (1) ___ a helmet. You (2) ___ ride too fast or ride on the pavement. Pedestrians should cross the road at the (3) ___ crossing. When the traffic light turns (4) ___, all vehicles must stop. It is about two kilometres (5) ___ my house to school, so I always remember these rules.",
      qs: `
(1)|wear|wears|wearing|to wear
(2)|shouldn't|should|must|can
(3)|zebra|tiger|lion|horse
(4)|red|green|blue|pink
(5)|from|to|at|on`
    },
    {
      units: [8, 9], kind: "cloze", title: "A festival film",
      text: "Last night, my family watched a film about the Mid-Autumn Festival. (1) ___ it was an animated film, my parents enjoyed it a lot. In the film, children (2) ___ colourful lanterns and watched a lion dance. The story was very (3) ___, and my little sister cried at the end. (4) ___, the film was a bit long. I think it is a great film to watch (5) ___ the festival.",
      qs: `
(1)|Although|However|Because|So
(2)|carried|carry|carries|carrying
(3)|moving|moved|move|movement
(4)|However|Although|Because|And
(5)|before|between|under|across`
    },
    {
      units: [10, 12], kind: "cloze", title: "Clean energy",
      text: "In the future, people (1) ___ use more renewable energy. Solar energy and wind energy are clean, (2) ___ they don't cause pollution. Many families (3) ___ putting solar panels on their roofs now. Some scientists say that flying cars will run on electricity, so they will be more (4) ___. In English-speaking countries like Australia, (5) ___ sun shines for many hours a day, so solar energy is very popular.",
      qs: `
(1)|will|did|are|was
(2)|and|but|although|or
(3)|are|is|do|does
(4)|eco-friendly|dangerous|polluted|expensive
(5)|the|a|an|(không dùng mạo từ)`
    }
  ]
};
