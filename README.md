# Thi nói tiếng Trung · Tiếng Trung Thanh Hoa-Hà Giang

App thi nói tiếng Trung trình độ tương đương **HSK 1**, theo giáo trình **汉语初级强化教程 · 听说课本 I** (Intensive Elementary Chinese Course · Listening and Speaking I, 肖奚强、朱敏 主编, NXB Đại học Bắc Kinh), bài 1–12. Web tĩnh (HTML/CSS/JS thuần, không cần build).

## Đưa lên mạng
Kéo cả thư mục này (hoặc file zip có `index.html` nằm ngay ở gốc) thả vào https://app.netlify.com/drop.

## Bài thi
**4 phần, mỗi phần 25 điểm, tổng 100 điểm:**

| Phần | Cách thi |
|---|---|
| 1. Đọc từ và câu 认读词语和句子 | Đọc to từng từ (tối đa 6 giây/từ), sau đó đọc từng câu (tối đa 12 giây/câu) |
| 2. Đặt câu 造句 | 5 giây suy nghĩ, nói một câu có dùng từ cho sẵn (tối đa 20 giây) |
| 3. Nói theo chủ đề 话题表达 | Chuẩn bị 20–30 giây với câu gợi ý, rồi nói liên tục |
| 4. Trả lời câu hỏi theo phản xạ 快速问答 | Giám khảo hỏi, trả lời ngay, không có thời gian chuẩn bị (tối đa 10 giây/câu) |

**2 kiểu thi:**
- **Thi thường xuyên**: chọn một bài (第1课 … 第12课). Đề lấy từ bài đó, thiếu thì lấy thêm bài trước. Bài ôn tập 第5课, 第10课 lấy đề của các bài được ôn.
- **Thi định kỳ**: Định kỳ 1 (bài 1–5), Định kỳ 2 (bài 6–10), Cuối kỳ (bài 1–12) hoặc tự chọn khoảng bài. Câu đọc dài hơn, độ dài bài nói yêu cầu cao hơn.

**Thời gian:** 2 phút hoặc 3 phút cho mỗi phần, hoặc cả bài 2 phút / 3 phút (chia đều cho 4 phần). Hết thời gian của phần, các câu còn lại tính 0 điểm.

Xếp loại: Xuất sắc ≥ 90 · Giỏi ≥ 80 · Khá ≥ 65 · Trung bình ≥ 50 · Chưa đạt < 50. Thi xong có phiếu kết quả (họ tên, lớp, đề số, điểm từng phần, quy đổi thang 10) in hoặc lưu PDF được, kèm nhận xét từng câu, câu mẫu và bản ghi âm.

## Sửa đề
Toàn bộ đề nằm trong `data/de-thi.js`, chia theo 12 bài (tên bài theo mục lục sách):
- `words`: từ cho phần Đọc từ, mỗi dòng `chữ Hán|pin yin cách âm tiết|nghĩa`, ví dụ `老师|lǎo shī|thầy giáo`.
- `make`: từ cho phần Đặt câu, kèm câu mẫu (câu mẫu cũng dùng cho phần Đọc câu).
- `qa`: câu hỏi phản xạ và các từ khoá câu trả lời nên có.
- `read`: đoạn văn ngắn của bài, được tách thành từng câu cho phần Đọc câu.
- `topics`: chủ đề nói, `from` = học xong bài nào thì dùng được.

Từ vựng hiện tại do trung tâm soạn theo chủ đề từng bài; muốn khớp đúng bảng 生词 của sách thì sửa `words` của bài đó.

## Các file
- `index.html`, `style.css`, `noi.css`: giao diện.
- `thi-noi.js`: tạo đề, luồng thi, chấm điểm, phiếu kết quả.
- `noi-core.js`: đọc to (giọng tiếng Trung của trình duyệt), nhận giọng nói, ghi âm.
- `data/de-thi.js`: đề thi.

## Ghi chú
- Cần **Chrome hoặc Edge**, cho phép micro, trang chạy qua https (Netlify có sẵn).
- Điểm do máy chấm dựa trên chữ trình duyệt nghe được, chỉ để tham khảo; giáo viên nên nghe lại bản ghi âm khi cần.
- Lịch sử điểm lưu trên trình duyệt của từng máy.
