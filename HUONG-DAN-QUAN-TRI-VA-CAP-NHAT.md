# CẨM NANG QUẢN TRỊ, CHỈNH SỬA & NÂNG CẤP WEB HHD TỬ VI · CÔNG TY TRUYỀN THÔNG K94
**Hotline / Zalo:** `0983.339.397` (`0983339397`)
**Link Web Công Khai:** https://huynhhuude-bot.github.io/tuvi-hhd/
**Kho Mã Nguồn GitHub:** https://github.com/huynhhuude-bot/tuvi-hhd
**Thư Mục Mã Nguồn Trên Máy:** `C:\Users\Admin\.gemini\antigravity\scratch\hhd-tuvi`

---

## 1. Khi Cần Thay Link Bán Hàng Affiliate, Sửa Quảng Cáo Hoặc Đổi Số Tài Khoản QR
Bạn **không cần sửa code**, chỉ cần làm trực tiếp trên trình duyệt:
1. Mở trang Quản trị bảo mật:
   👉 https://huynhhuude-bot.github.io/tuvi-hhd/quan-ly-kiem-tien/
   *(Hoặc bấm vào biểu tượng `🔒 Admin` nhỏ ở dưới cùng chân trang)*
2. Đăng nhập bảo mật 2 lớp:
   - **Mật khẩu Quản trị mặc định:** `K94@0983339397`
   - **Mã PIN 6 số mặc định:** `339397`
3. Chỉnh sửa trong 5 Tab:
   - **Tab 1:** Thêm sản phẩm mới, dán link rút gọn Shopee Affiliate / TikTok Shop.
   - **Tab 2:** Chỉnh sửa **6 Panel Quảng Cáo Cho Thuê 2 Bên Trái / Phải** (dán link ảnh Banner 240x360px, đổi tiêu đề, link đích của khách thuê).
   - **Tab 3:** Chỉnh sửa **3 Banner Ngang Chân Trang K94 Media**.
   - **Tab 4:** Chọn Ngân hàng & nhập Số Tài Khoản nhận tiền qua mã **VietQR Gieo Duyên**.
   - **Tab 5:** Đổi Mật khẩu / Mã PIN mới và Tải file sao lưu cấu hình `.JSON`.

---

## 2. Khi Cần Thêm Tính Năng Mới Hoặc Chuyển Sang Tên Miền Riêng (Nhanh Nhất)
Bạn chỉ cần mở lại **Antigravity** và nhắn yêu cầu bằng tiếng Việt, ví dụ:
- *"Trong dự án `hhd-tuvi`, hãy thêm tính năng [Tên tính năng] và cập nhật lên GitHub Pages cho tôi."*
- *"Tôi vừa mua tên miền `tuvihhd.com`, hãy gắn tên miền này vào web cho tôi."*
- *"Hãy cập nhật danh sách link Affiliate cố định này vào file `src/data/monetizationData.js` rồi đẩy lên GitHub để mọi khách truy cập trên điện thoại khác đều thấy."*

---

## 3. Các File Quan Trọng Trong Bộ Code (Nếu Bạn Muốn Tự Sửa Trực Tiếp)
- `src/data/monetizationData.js`: Chứa cấu hình mặc định của toàn bộ Sản phẩm Affiliate, 6 Panel Quảng cáo Trái/Phải, 3 Banner K94, Số điện thoại `0983339397` và Tài khoản Ngân hàng VietQR.
- `src/components/HhdSideAdLayout.js`: Giao diện 2 cột Panel Quảng cáo Trái & Phải.
- `src/components/HhdNavigationDock.js`: Thanh điều hướng 20 tính năng, Dải sản phẩm Affiliate và Hộp thoại QR Gieo Duyên.
- `deploy-k94.ps1`: Kịch bản tự động đóng gói và đẩy toàn bộ thay đổi lên GitHub Pages chỉ bằng 1 lệnh.
