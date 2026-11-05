'use client';

import Link from 'next/link';
import { HomePage } from '../lib/turbopackShim';

const TWELVE_METAPHYSICS_CARDS = [
  {
    href: '/vat-pham-phong-thuy',
    icon: '🛍️',
    tag: 'Shopee · TikTok Shop · Hợp Ngũ Hành',
    title: 'Vật Phẩm Phong Thủy Hộ Mệnh (Affiliate)',
    desc: 'Gợi ý vòng đá phong thủy, Tỳ Hưu, Thiềm Thừ, Phật Bản Mệnh, Chuông Đồng và Sim Số Đẹp tự động lọc theo Năm Sinh & Ngũ Hành Bản Mệnh.'
  },
  {
    href: '/bat-tu-can-xuong',
    icon: '⚖️',
    tag: 'Viên Thiên Cang · Tứ Trụ Tử Bình',
    title: 'Cân Xương Tính Số & Bát Tự Khuyết Hành',
    desc: 'Tính trọng lượng xương cốt (mấy lượng mấy chỉ) theo đại sư Viên Thiên Cang, lập Tứ Trụ 8 chữ Can Chi và tìm hành bị khuyết để bổ sung Dụng Thần.'
  },
  {
    href: '/phong-thuy-thuong-hieu',
    icon: '🎨',
    tag: 'Màu Logo · Biển Hiệu · B2B K94 Media',
    title: 'Phong Thủy Thương Hiệu, Logo & Biển Hiệu',
    desc: 'Tư vấn màu sắc nhận diện thương hiệu, hình khối thiết kế Logo, mô phỏng biển hiệu quảng cáo tương sinh và gợi ý ngành nghề kinh doanh đại vượng.'
  },
  {
    href: '/phong-thuy-ban-lam-viec',
    icon: '🪴',
    tag: 'Cửu Cung Bát Quái · Cây Cảnh Hợp Mệnh',
    title: 'Bố Trí Bàn Làm Việc & Cây Cảnh Phong Thủy',
    desc: 'Sơ đồ 9 cung Bát Quái trên mặt bàn làm việc kích hoạt cung Tài Lộc & Quan Lộc, kèm gợi ý Top cây cảnh để bàn & tranh treo hợp tuổi.'
  },
  {
    href: '/van-trinh-ngay',
    icon: '🐉',
    tag: 'Tử Vi Hàng Ngày · Màu Sắc & Giờ Tốt',
    title: 'Vận Trình 12 Con Giáp Hôm Nay',
    desc: 'Tra cứu chỉ số Tài Lộc - Công Danh - Nhân Duyên hôm nay của 12 con giáp, màu trang phục may mắn, hướng Tài Thần và tuổi quý nhân hợp tác.'
  },
  {
    href: '/giai-mong',
    icon: '💤',
    tag: 'Chu Công Giải Mộng · Điềm Báo Tâm Linh',
    title: 'Giải Mã Giấc Mơ Cổ Truyền (Chu Công)',
    desc: 'Tra cứu ý nghĩa điềm báo các giấc mơ phổ biến (mơ thấy rắn, nước lớn, vàng bạc, Phật, bay lên trời...) và lời khuyên hành xử cát tường.'
  },
  {
    href: '/boi-kieu',
    icon: '📖',
    tag: 'Đại Thi Hào Nguyễn Du · Xuất Thẻ Thơ PNG',
    title: 'Lẩy Kiều & Bói Kiều Cổ Truyền',
    desc: 'Thành tâm mở trang Truyện Kiều đón nhận cặp câu lục bát ứng nghiệm cho Công danh, Tài lộc, Tình duyên và tải thẻ thơ thư pháp K94.'
  },
  {
    href: '/tinh-tam',
    icon: '📿',
    tag: 'Mõ Gỗ Cổ Tự · Chuông Thiền 528Hz',
    title: 'Không Gian Tĩnh Tâm · Gõ Mõ & Lần Chuỗi 108 Hạt',
    desc: 'Chạm gõ mõ gỗ hoặc lần chuỗi Trầm Hương 108 hạt tương tác với âm thanh thiền định chân thực giúp xả stress và tích tạo phước lành.'
  },
  {
    href: '/sim-phong-thuy',
    icon: '📱',
    tag: 'Bát Cực Linh Số · 64 Quẻ Dịch',
    title: 'Chấm Điểm Sim, Biển Số Xe & STK',
    desc: 'Phân tích số điện thoại (VD: 0983.339.397), biển số xe 5 số và số tài khoản ngân hàng theo Âm Dương, Ngũ Hành Bản Mệnh, Quẻ Dịch & Bát Cực Linh Số.'
  },
  {
    href: '/thuoc-lo-ban',
    icon: '📏',
    tag: '52.2cm · 42.9cm · 38.8cm',
    title: 'Thước Lỗ Ban 3 Chuẩn Trực Tuyến',
    desc: 'Đo kích thước Đỏ (Đại Cát) thông thủy, dương trạch và đồ thờ cho cửa chính, bàn làm việc, bàn thờ và biển hiệu quảng cáo K94 Media.'
  },
  {
    href: '/sao-han',
    icon: '🏮',
    tag: 'Cửu Diệu · Tam Tai · Văn Khấn',
    title: 'Xem Sao Hạn, Tuổi Làm Nhà & Văn Khấn',
    desc: 'Tra cứu Sao Chiếu Mệnh Cửu Diệu, Hạn Niên, kiểm tra Tam Tai - Kim Lâu - Hoang Ốc và tạo bài Văn Khấn Cúng Sao, Khai Trương chuẩn cổ truyền.'
  },
  {
    href: '/hop-tuoi',
    icon: '🤝',
    tag: 'Tam Hợp · Ngũ Hành · Cung Phi',
    title: 'Xem Tuổi Hợp Làm Ăn & Xông Đất',
    desc: 'Đối chiếu 4 tầng Ngũ Hành Nạp Âm, Thiên Can, Địa Chi, Cung Phi giữa Gia chủ và Đối tác kinh doanh, lọc Top 6 tuổi mở hàng đại cát.'
  },
  {
    href: '/nhan-tuong',
    icon: '✋',
    tag: 'Ma Y Thần Tướng · Thủ Tướng',
    title: 'Nhân Tướng Học & Xem Chỉ Tay',
    desc: 'Luận giải tướng mặt Tam Đình Ngũ Quan (Trán, Mắt, Mũi, Miệng, Tai) và sơ đồ bàn tay tương tác 5 đường chỉ tay chính (Tâm, Trí, Sinh, Sự Nghiệp, Tài Vận).'
  },
  {
    href: '/the-ho-menh',
    icon: '🪪',
    tag: 'Phật Bản Mệnh · Chuông Thiền Hz',
    title: 'Kim Bài Hộ Mệnh K94 & Thiền Âm',
    desc: 'Tra cứu Phật Bản Mệnh 12 con giáp, xuất ảnh Kim Bài Hộ Mệnh Phong Thủy PNG cài hình nền điện thoại và thỉnh chuông thiền tần số Ngũ Hành.'
  },
  {
    href: '/divination',
    icon: '☯',
    tag: 'Chu Dịch · Lục Hào & Mai Hoa',
    title: 'Khai Quẻ Kinh Dịch 64 Quẻ',
    desc: 'Gieo 3 đồng xu Càn Long Thông Bảo qua 6 hào hoặc bấm quẻ Mai Hoa Dịch Số theo thời khắc để luận giải cát hung, hào động & quẻ biến.'
  },
  {
    href: '/calligraphy',
    icon: '🖌',
    tag: 'Thư Pháp Khai Bút · Xuất Tranh PNG',
    title: 'Xin Chữ Ông Đồ HHD · K94',
    desc: 'Chọn sở cầu (Tài Lộc, Công Danh, Gia Đạo, Trí Tuệ), nhận đại tự Hán–Việt hợp Ngũ Hành, câu đối cổ và tải bức trướng thư pháp đỏ viền kim.'
  },
  {
    href: '/fortune-sticks',
    icon: '🎋',
    tag: '100 Quẻ Xăm Cổ · Thơ Lục Bát',
    title: 'Lắc Ống Xăm Linh Thiêng',
    desc: 'Thành tâm lắc ống xăm tre, rút quẻ Quan Âm Linh Xăm & Tả Tướng Quân kèm thơ Hán Việt, dịch thơ Lục Bát, điển tích cổ và lời bàn 5 phương diện.'
  },
  {
    href: '/almanac',
    icon: '📅',
    tag: 'Âm Dương Lịch · 12 Trực Kiến Trừ',
    title: 'Trạch Nhật Vạn Niên & Giờ Hoàng Đạo',
    desc: 'Tra cứu lịch Bloc Âm Dương, Tứ Trụ Can Chi, Ngũ Hành Nạp Âm, 12 khung giờ Hoàng Đạo và lọc ngày tốt cho Khai trương, Cưới hỏi, Nhập trạch.'
  },
  {
    href: '/naming',
    icon: '📜',
    tag: '81 Linh Số · Ngũ Cách Tam Tài',
    title: 'Danh Tính Học & Đặt Tên Hợp Mệnh',
    desc: 'Chấm điểm Họ Tên theo Thiên - Nhân - Địa - Ngoại - Tổng Cách, phân tích Tam Tài Ngũ Hành và gợi ý tên đẹp Đại Cát theo Bản Mệnh.'
  },
  {
    href: '/compass',
    icon: '🧭',
    tag: 'La Kinh 24 Sơn · Đông/Tây Tứ Mệnh',
    title: 'La Bàn Phong Thủy Bát Trạch',
    desc: 'Xoay La Kinh 24 sơn hướng tương tác, định Cung Phi Bát Trạch và 4 hướng Đại Cát (Sinh Khí, Thiên Y, Diên Niên, Phục Vị) cho nhà cửa & bàn làm việc.'
  }
];

export default function Page() {
  return (
    <div style={{ paddingBottom: 32 }}>
      <HomePage />

      {/* Section showcasing all 12 Eastern Metaphysics & Cultural Features */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0B0C10 0%, #11131C 100%)',
          borderTop: '1px solid rgba(201,168,76,0.25)',
          padding: '64px 20px 64px'
        }}
      >
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '5px 16px',
                borderRadius: 999,
                border: '1px solid rgba(201,168,76,0.4)',
                background: 'rgba(201,168,76,0.1)',
                color: '#c9a84c',
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 12
              }}
            >
              Không Gian Văn Hóa & Huyền Học Phương Đông HHD · Cty Truyền Thông K94 (0983.339.397)
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: 'clamp(26px, 3.6vw, 38px)',
                color: '#F4E3B2',
                margin: '0 0 10px 0'
              }}
            >
              Thập Nhị Đại Pháp Khí · Phong Thủy, Bói Quẻ, Sim Số & Văn Khấn HHD
            </h2>
            <p style={{ color: '#9DA3B4', maxWidth: 720, margin: '0 auto', fontSize: 15, lineHeight: 1.6 }}>
              Hệ sinh thái 12 công cụ huyền học phương Đông miễn phí 100% do <strong>Công ty Truyền thông K94 (Hotline/Zalo: 0983.339.397)</strong> phát triển, giúp bạn chấm điểm Sim/Biển số, đo Thước Lỗ Ban, xem Sao Hạn, Hợp Tuổi Làm Ăn, Gieo Quẻ Dịch và Xin Chữ Ông Đồ.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: 20
            }}
          >
            {TWELVE_METAPHYSICS_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(20, 22, 32, 0.88)',
                  border: '1px solid rgba(201, 168, 76, 0.28)',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 14,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: 'rgba(201,168,76,0.14)',
                        border: '1px solid rgba(201,168,76,0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24
                      }}
                    >
                      {card.icon}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#c9a84c',
                        background: 'rgba(201,168,76,0.12)',
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontWeight: 600
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif, serif)',
                      fontSize: 20,
                      color: '#F4E3B2',
                      margin: '0 0 8px 0'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#A3A8B8', margin: 0, lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#c9a84c',
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 4
                  }}
                >
                  <span>Khám phá ngay</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
