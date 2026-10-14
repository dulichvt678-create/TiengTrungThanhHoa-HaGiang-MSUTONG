# Tiếng Trung Thanh Hoa-Hà Giang - Msutong

Web học tiếng Trung tĩnh (HTML/CSS/JS thuần, không cần build) cho khoá Msutong 1 và Msutong 2.

Bản **tiếng Đài Loan** (chữ phồn thể, 15 bài) nằm trong thư mục [`dai-loan/`](dai-loan/README.md) và đưa lên mạng riêng.

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
