# Tiếng Trung Thanh Hoa-Hà Giang - Msutong

Web học tiếng Trung tĩnh (HTML/CSS/JS thuần, không cần build) cho khoá Msutong 1 và Msutong 2.

## Đưa lên mạng
Kéo cả thư mục này thả vào https://app.netlify.com/drop là xong.

## Sửa nội dung
- `data/msutong1.js`: từ vựng 10 bài lấy theo bảng 生词表 cuối sách 速通汉语 初级 1 (chữ Hán, pinyin, số bài). Nghĩa tiếng Việt, tên chủ đề và câu ví dụ do trung tâm tự viết. Phần `names` là tên riêng (địa danh, họ).
- `data/msutong2.js`: từ vựng 10 bài của sách 速通汉语 初级 2, cùng cách làm như trên.
- Trang "Tra từ" tìm từ theo chữ Hán, pinyin hoặc nghĩa trong cả hai khoá và hiện tiến độ từng bài.
- `data/pinyin.js`: chữ mẫu luyện thanh điệu, cặp âm dễ nhầm, bảng thanh mẫu/vận mẫu.

Mỗi dòng từ vựng: `chữ Hán|pinyin cách âm tiết|nghĩa`, ví dụ `老师|lǎo shī|thầy giáo, cô giáo`.

## Ghi chú
- Đọc to dùng giọng tiếng Trung có sẵn của trình duyệt; nếu máy chưa có giọng zh-CN thì cài thêm trong cài đặt ngôn ngữ của hệ điều hành.
- Thi nói/luyện nói cần Chrome hoặc Edge và cho phép micro, trang phải chạy qua https (Netlify có sẵn).
- Tiến độ flashcard, điểm thi và bộ từ tự nhập được lưu trên trình duyệt của từng người học (tách riêng với site HSK 1 cũ).

## App Tiếng Anh lớp 4 & lớp 7 (thư mục `tieng-anh/`)
Web tĩnh riêng, mở `tieng-anh/index.html` hoặc kéo thư mục `tieng-anh` thả vào Netlify Drop.

- **Gói học tập theo Unit**: 20 Unit lớp 4, 12 Unit lớp 7 theo chủ đề sách Global Success; thẻ từ có phát âm, đánh dấu từ đã thuộc, bài luyện tập chấm ngay có giải thích, luyện nói bằng micro.
- **Gói thi thử dạng IOE**: 30 câu, 20 phút, thang 300 điểm, chọn phạm vi Học kì 1 / Học kì 2 / Cả năm, bảng xếp hạng điểm của em, xem lại câu sai.
- **Gói đề kiểm tra**: giữa kì 1, cuối kì 1, giữa kì 2, cuối kì 2, mỗi kì 3 đề cố định, chấm thang 10, có đáp án và giải thích. Lớp 7 có phần phát âm, trọng âm, tìm lỗi sai, đọc điền từ, câu đồng nghĩa.
- **Kết quả**: lịch sử làm bài, sổ câu sai để ôn lại, chọn giọng đọc Anh – Anh hoặc Anh – Mỹ.

Sửa nội dung trong `tieng-anh/data/lop4.js` và `tieng-anh/data/lop7.js` (định dạng ghi ở đầu mỗi file). Câu hỏi, bài đọc và đề do app tự biên soạn; đây không phải trang chính thức của cuộc thi IOE.
