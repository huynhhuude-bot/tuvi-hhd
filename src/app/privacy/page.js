import Link from 'next/link';

export const metadata = {
  title: 'Chính sách bảo mật · HHD Tử Vi Đẩu Số',
};

export default function PrivacyPage() {
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
        Chính sách bảo mật HHD
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
        1. Dữ liệu xử lý
      </h2>
      <p>
        Để phục vụ việc lập lá số và luận giải Tử Vi Đẩu Số trên hệ thống{' '}
        <strong>HHD</strong>, ứng dụng xử lý các thông tin ngày giờ sinh và tỉnh
        thành do bạn nhập trực tiếp. Lịch sử lá số được lưu cục bộ trên trình
        duyệt của bạn (<code>localStorage</code>) và bạn có thể xóa bất cứ lúc
        nào.
      </p>

      <h2
        style={{
          fontSize: '18px',
          marginTop: '32px',
          marginBottom: '12px',
        }}
      >
        2. Cam kết bảo mật
      </h2>
      <p>
        Hệ thống HHD không thu thập, mua bán hoặc chia sẻ thông tin cá nhân của
        người dùng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo thương mại.
      </p>
    </main>
  );
}
