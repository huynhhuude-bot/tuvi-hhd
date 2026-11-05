import Link from 'next/link';

export const metadata = {
  title: 'Điều khoản dịch vụ · HHD Tử Vi Đẩu Số',
};

export default function TermsPage() {
  return (
    <main
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 24px 80px',
        color: 'var(--tx-1)',
        lineHeight: 1.8,
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <Link
          href="/"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            textDecoration: 'none',
            letterSpacing: '0.12em',
          }}
        >
          ← Quay lại Trang chủ HHD
        </Link>
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
        Điều khoản dịch vụ HHD
      </h1>
      <p
        style={{
          fontSize: '12px',
          color: 'var(--tx-3)',
          marginBottom: '32px',
        }}
      >
        Cập nhật lần cuối: Tháng 11 năm 2026 · Hệ thống HHD Đẩu Số
      </p>

      <h2
        style={{
          fontSize: '18px',
          marginTop: '32px',
          marginBottom: '12px',
        }}
      >
        1. Tổng quan dịch vụ
      </h2>
      <p>
        Hệ thống Tử Vi Đẩu Số <strong>HHD</strong> cung cấp công cụ an sao, tra
        cứu bách khoa 14 Chính Tinh, Tàng Kinh Các và luận giải Tử Vi Đẩu Số dựa
        trên kinh điển truyền thống kết hợp hệ thống HHD. Toàn bộ nội dung mệnh
        lý chỉ mang tính chất tham khảo học thuật và chiêm nghiệm văn hóa phương
        Đông, <strong>không cấu thành</strong> tư vấn y tế, pháp lý, tài chính
        hay quyết định đầu tư.
      </p>

      <h2
        style={{
          fontSize: '18px',
          marginTop: '32px',
          marginBottom: '12px',
        }}
      >
        2. Nguyên tắc sử dụng
      </h2>
      <p>
        Theo tinh thần <em>&ldquo;Tử Vi vi môn · Thiên Địa Nhân vi lộ · Tri hành hợp nhất&rdquo;</em> của HHD,
        lá số là tấm bản đồ tham khảo ưu nhược điểm tiên thiên để mỗi cá nhân chủ
        động tu dưỡng đạo đức, trau dồi tri thức và nỗ lực hành động thực tế
        (Nhân mệnh).
      </p>
    </main>
  );
}
