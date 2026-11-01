# Tiếng Trung Thanh Hoa-Hà Giang - Msutong

Web học tiếng Trung tĩnh (HTML/CSS/JS thuần, không cần build) cho khoá Msutong 1 và Msutong 2.

## Đưa lên mạng
Kéo cả thư mục này thả vào https://app.netlify.com/drop là xong.

## Sửa nội dung
- `data/msutong1.js`: từ vựng 10 bài lấy theo bảng 生词表 cuối sách 速通汉语 初级 1 (chữ Hán, pinyin, số bài). Nghĩa tiếng Việt, tên chủ đề và câu ví dụ do trung tâm tự viết. Phần `names` là tên riêng (địa danh, họ).
- `data/msutong2.js`: từ vựng 10 bài của sách 速通汉语 初级 2, cùng cách làm như trên.
- Trang "Tra từ" tìm từ theo chữ Hán, pinyin hoặc nghĩa trong cả hai khoá và hiện tiến độ từng bài.
- `data/pinyin.js`: chữ mẫu luyện thanh điệu, cặp âm dễ nhầm, bảng thanh mẫu/vận mẫu.
- `data/hsk3-noi.js`: đề luyện nói HSK 3 (8 chủ đề đối thoại × 5 câu hỏi, 30 cấu trúc đặt câu, 12 chủ đề nói, kèm câu/bài mẫu). Thêm đề mới bằng cách chép một mục có sẵn rồi sửa.

## Luyện và thi nói HSK 3 (`hsk3.html`)
- **Thi thử**: 3 phần liền nhau — Đối thoại (对话, 30 điểm), Đặt câu (造句, 30 điểm), Nói theo chủ đề (话题表达, 40 điểm). Chọn tổng thời gian nói **3 phút** (4 câu + 4 câu + chủ đề ≥ 60 giây) hoặc **4 phút** (5 + 5 + chủ đề ≥ 90 giây). Thời gian chuẩn bị không tính; thời gian còn dư được cộng cho phần chủ đề. Máy tự đọc câu hỏi, đếm giờ chuẩn bị và tự bật micro. Đạt từ 60/100.
- **Luyện từng phần**: tự bấm micro, xem điểm ngay sau mỗi câu, nói lại được.
- **Chấm điểm** theo chữ trình duyệt nghe được, 5 tiêu chí: nội dung, ngữ pháp/mạch lạc, từ vựng (có cộng từ HSK 3), độ dài/lưu loát (chữ/phút), độ rõ phát âm (độ tin cậy nhận dạng). Mỗi câu có nhận xét lỗi, câu mẫu đọc to và bản ghi âm để nghe lại. Điểm chỉ để tham khảo khi tự luyện.
- Trình duyệt không nhận được giọng nói thì vẫn gõ chữ Hán để chấm thử (không chấm phát âm).

Mỗi dòng từ vựng: `chữ Hán|pinyin cách âm tiết|nghĩa`, ví dụ `老师|lǎo shī|thầy giáo, cô giáo`.

## Ghi chú
- Đọc to dùng giọng tiếng Trung có sẵn của trình duyệt; nếu máy chưa có giọng zh-CN thì cài thêm trong cài đặt ngôn ngữ của hệ điều hành.
- Thi nói/luyện nói cần Chrome hoặc Edge và cho phép micro, trang phải chạy qua https (Netlify có sẵn).
- Tiến độ flashcard, điểm thi và bộ từ tự nhập được lưu trên trình duyệt của từng người học (tách riêng với site HSK 1 cũ).
