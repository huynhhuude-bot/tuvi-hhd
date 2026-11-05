# HHD · Tử Vi Đẩu Số Chính Tông

Hệ thống lập lá số, tra cứu Bách Khoa 14 Chính Tinh, Tàng Kinh Các và luận giải AI Tử Vi Đẩu Số theo chuẩn **Chân thái dương thời** 63 tỉnh thành Việt Nam.

## Tính năng nổi bật

- **An Sao Chuẩn Chân Thái Dương Thời (`/chart`)**: Hiệu chỉnh kinh độ thực tế 63 tỉnh thành Việt Nam (hỗ trợ mốc giờ mùa hè miền Nam trước 1975 UTC+8 và các thành phố quốc tế), an đủ 108 sao, 10 công tắc Lưu Phái, Đại hạn 10 năm, Lưu niên Tứ Hóa, tự động nhận diện hơn 30 Cách Cục Cổ Điển và xuất ảnh PNG.
- **Hợp Bàn Đôi Lứa & Đối Tác (`/heming`)**: Đối sánh 2 lá số và phân tích tương tác Mệnh – Thân, Phu Thê, Tài Bạch, Quan Lộc.
- **Bách Khoa 14 Chính Tinh × 13 Chủ Đề (`/knowledge`)**: 182 chuyên đề độc bản theo cấu trúc 4 tầng (*Định điệu cốt lõi*, *Luận đoán trọng tâm*, *Căn cứ mệnh bàn*, *Xuất xứ kinh điển*) cùng 24 bộ Song Tinh Đồng Cung.
- **Tàng Kinh Các (`/library`)**: Nguyên bản Hán văn 3 bộ kinh điển đời Minh (*Tử Vi Đẩu Số Cốt Tủy Phú*, *Tử Vi Đẩu Số Toàn Tập*, *Tử Vi Đẩu Số Toàn Thư*) gồm 21 chương mục và công cụ tra cứu.
- **Luận Giải AI Streaming SSE (`/api/interpret`, `/api/heming`)**: Phản hồi trực tiếp theo luồng `text/event-stream` cấu trúc 4 tầng của Hệ thống HHD.

## Cài đặt & Chạy cục bộ

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:3005`.
