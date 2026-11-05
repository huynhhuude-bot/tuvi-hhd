'use client';

import Link from 'next/link';
import { HomePage } from '../lib/turbopackShim';

const SIX_METAPHYSICS_CARDS = [
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
    title: 'Xin Chữ Ông Đồ HHD',
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
    <div style={{ paddingBottom: 72 }}>
      <HomePage />

      {/* Section showcasing the 6 new Eastern Metaphysics & Cultural Features */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0B0C10 0%, #11131C 100%)',
          borderTop: '1px solid rgba(201,168,76,0.25)',
          padding: '64px 20px 80px'
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
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
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                marginBottom: 12
              }}
            >
              Không Gian Văn Hóa & Huyền Học Phương Đông HHD
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: 'clamp(26px, 3.6vw, 38px)',
                color: '#F4E3B2',
                margin: '0 0 10px 0'
              }}
            >
              Lục Đại Pháp Khí · Bói Quẻ, Xin Chữ & Phong Thủy Cát Tường
            </h2>
            <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', fontSize: 15, lineHeight: 1.6 }}>
              Bên cạnh Lá Số Tử Vi Đẩu Số Chính Tông, hệ thống HHD tích hợp trọn bộ 6 pháp khí huyền học cổ truyền giúp bạn chiêm bốc thời vận, xin chữ khai xuân và định hướng phong thủy.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 20
            }}
          >
            {SIX_METAPHYSICS_CARDS.map((card) => (
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
