# Tiếng Trung Thanh Hoa-Hà Giang - tiếng Đài Loan

Web học tiếng Trung Đài Loan (chữ phồn thể 繁體字) dạng tĩnh, viết bằng HTML/CSS/JS thuần, không cần build. Giao diện và tính năng giống bản Msutong ở thư mục gốc:

- **Khoá học**: bài mở đầu (ngữ âm, chữ phồn thể), 15 bài, mỗi bài có từ mới (chữ phồn thể, pinyin tô màu theo thanh, từ loại, nghĩa tiếng Việt), ngữ pháp, hội thoại, mẫu câu mở rộng, nhiệm vụ nói và bài tập. Cuối trang có bảng 30 bộ thủ thường dùng.
- **Flashcard**: lật thẻ, chấm "Nhớ rồi / Hơi khó / Chưa nhớ" theo hộp Leitner. Từ khó được đưa lên trước.
- **Phát âm**: nghe 4 thanh, phân biệt cặp âm dễ nhầm (b/p, zh/z, an/ang, u/ü…), chọn pinyin theo bài, kết hợp thanh, bảng thanh mẫu/vận mẫu, luyện nói bằng micro.
- **Kiểm tra**: nhìn chữ chọn nghĩa, nhìn nghĩa chọn chữ, nghe chọn chữ, chọn pinyin đúng thanh, thi nói. Có lịch sử điểm và chỗ tự nhập bộ từ.
- **Tra từ**: tìm theo chữ phồn thể, pinyin (có dấu hoặc không) hoặc nghĩa tiếng Việt, kèm tiến độ từng bài.

## Đưa lên mạng
Kéo thư mục `dai-loan` vào https://app.netlify.com/drop là xong.

## Nội dung
- `data/dailoan.js`: 15 bài, 149 từ, ngữ pháp, hội thoại, câu mở rộng và bộ thủ, sinh tự động từ file Word "Giáo trình dạy tiếng Trung (Đài Loan) cơ bản cho người mới bắt đầu" của trung tâm. Chữ phồn thể, pinyin và nghĩa (dịch Trung sang Việt) giữ nguyên theo sách; pinyin của từ được tách theo âm tiết để tô màu thanh điệu.
- `data/pinyin.js`: chữ mẫu (phồn thể) để luyện thanh điệu, cặp âm dễ nhầm, bảng thanh mẫu/vận mẫu.
- Sửa giáo trình rồi muốn cập nhật web: chạy `tools/build_data.py` (hướng dẫn ở đầu file, cần `pandoc` và Python 3).

## Ghi chú
- Đọc to ưu tiên giọng Đài Loan (zh-TW) của trình duyệt; nếu máy chưa có thì dùng giọng phổ thông khác. Có thể cài thêm giọng "Tiếng Trung (Đài Loan)" trong cài đặt ngôn ngữ của hệ điều hành.
- Luyện nói/thi nói cần Chrome hoặc Edge và cho phép micro, trang phải chạy qua https (Netlify có sẵn).
- Tiến độ flashcard, điểm thi và bộ từ tự nhập lưu trên trình duyệt của từng người học, tách riêng với bản Msutong.
