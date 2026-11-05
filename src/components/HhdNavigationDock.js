'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HHD_FEATURES = [
  {
    href: '/',
    icon: '✦',
    shortLabel: 'Lá Số Tử Vi',
    title: 'Tử Vi Đẩu Số HHD',
    subtitle: 'Lập lá số Chân Thái Dương Thời, AI Luận Giải 4 tầng & Hợp Hôn',
    badge: 'Chính Tông'
  },
  {
    href: '/sim-phong-thuy',
    icon: '📱',
    shortLabel: 'Chấm Điểm Sim',
    title: 'Chấm Điểm Sim & Biển Số Xe',
    subtitle: 'Phân tích Bát Cực Linh Số, 64 Quẻ Dịch, Ngũ Hành Sim, Biển số & STK',
    badge: 'Mới · Hot'
  },
  {
    href: '/thuoc-lo-ban',
    icon: '📏',
    shortLabel: 'Thước Lỗ Ban',
    title: 'Thước Lỗ Ban 3 Chuẩn',
    subtitle: 'Đo kích thước Đỏ (Đại Cát) 52.2cm, 42.9cm, 38.8cm cho cửa, bàn thờ, biển hiệu',
    badge: '3 Thước'
  },
  {
    href: '/sao-han',
    icon: '🏮',
    shortLabel: 'Sao Hạn & Văn Khấn',
    title: 'Sao Hạn Cửu Diệu & Văn Khấn',
    subtitle: 'Xem Sao Chiếu Mệnh, Tam Tai, Kim Lâu, Hoang Ốc & Văn Khấn Cổ Truyền',
    badge: 'Giải Hạn'
  },
  {
    href: '/hop-tuoi',
    icon: '🤝',
    shortLabel: 'Hợp Tuổi Làm Ăn',
    title: 'Hợp Tuổi Làm Ăn & Xông Đất',
    subtitle: 'Chấm điểm đối tác kinh doanh, người mở hàng khai trương & xông đất',
    badge: 'Kinh Doanh'
  },
  {
    href: '/nhan-tuong',
    icon: '✋',
    shortLabel: 'Nhân Tướng & Chỉ Tay',
    title: 'Nhân Tướng Học & Chỉ Tay',
    subtitle: 'Xem tướng mặt Tam Đình Ngũ Quan (Ma Y Thần Tướng) & 5 đường chỉ tay',
    badge: 'Tướng Pháp'
  },
  {
    href: '/the-ho-menh',
    icon: '🪪',
    shortLabel: 'Kim Bài Hộ Mệnh',
    title: 'Kim Bài Hộ Mệnh & Chuông Thiền',
    subtitle: 'Tạo thẻ Phật Bản Mệnh K94 tải PNG & Chuông thiền tần số Ngũ Hành',
    badge: 'VIP Card'
  },
  {
    href: '/divination',
    icon: '☯',
    shortLabel: 'Gieo Quẻ Dịch',
    title: 'Khai Quẻ Kinh Dịch',
    subtitle: 'Lục Hào 3 Đồng Xu Cổ & Mai Hoa Dịch Số 64 Quẻ Chu Dịch',
    badge: 'Bói Quẻ'
  },
  {
    href: '/calligraphy',
    icon: '🖌',
    shortLabel: 'Xin Chữ Ông Đồ',
    title: 'Xin Chữ Ông Đồ HHD',
    subtitle: 'Thư Pháp Khai Bút Đầu Xuân, Câu Đối Đỏ & Tải Tranh PNG',
    badge: 'Thư Pháp'
  },
  {
    href: '/fortune-sticks',
    icon: '🎋',
    shortLabel: 'Lắc Xăm Cổ',
    title: 'Lắc Ống Xăm Linh Thiêng',
    subtitle: '100 Quẻ Xăm Quan Âm & Tả Tướng Quân · Thơ Lục Bát & Điển Tích',
    badge: '100 Quẻ'
  },
  {
    href: '/almanac',
    icon: '📅',
    shortLabel: 'Lịch Vạn Niên',
    title: 'Trạch Nhật Vạn Niên',
    subtitle: 'Xem Ngày Tốt Xấu, 12 Trực Kiến Trừ & Khung Giờ Hoàng Đạo',
    badge: 'Trạch Nhật'
  },
  {
    href: '/naming',
    icon: '📜',
    shortLabel: 'Chấm Điểm Tên',
    title: 'Danh Tính Học HHD',
    subtitle: 'Chấm Điểm Họ Tên 81 Linh Số, Ngũ Cách Tam Tài & Đặt Tên Hợp Mệnh',
    badge: 'Ngũ Cách'
  },
  {
    href: '/compass',
    icon: '🧭',
    shortLabel: 'La Bàn Phong Thủy',
    title: 'La Bàn Bát Trạch 24 Sơn',
    subtitle: 'Định Cung Phi Đông/Tây Tứ Mệnh & 4 Hướng Đại Cát Nhà Cửa',
    badge: 'Bát Trạch'
  }
];

export default function HhdNavigationDock() {
  const rawPathname = usePathname() || '/';
  const pathname = rawPathname.length > 1 && rawPathname.endsWith('/') ? rawPathname.slice(0, -1) : rawPathname;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Global K94 Media Contact Footer Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(11,12,16,0.96) 0%, #07080C 100%)',
          borderTop: '1px solid rgba(201,168,76,0.32)',
          padding: '28px 20px 96px',
          textAlign: 'center',
          color: '#E2E4E9',
          fontFamily: 'var(--font-sans, sans-serif)'
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 16px',
              borderRadius: 999,
              background: 'rgba(201,168,76,0.14)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#F4E3B2',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              marginBottom: 10
            }}
          >
            <span>✦ ĐƠN VỊ PHÁT TRIỂN & BẢN QUYỀN: CÔNG TY TRUYỀN THÔNG K94 ✦</span>
          </div>

          <div style={{ fontSize: 18, fontWeight: 700, color: '#F4E3B2', marginBottom: 6 }}>
            Hệ Thống Tử Vi & 12 Pháp Khí Huyền Học HHD — Công ty Truyền thông K94
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
            <a
              href="tel:0983339397"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 20px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, #e0c168, #b88928)',
                color: '#0B0C10',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(201,168,76,0.35)'
              }}
            >
              <span>📞 Hotline / Zalo: 0983.339.397 (0983339397)</span>
            </a>
            <span
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: '1px solid rgba(102,187,106,0.4)',
                background: 'rgba(67,160,71,0.14)',
                color: '#81C784',
                fontSize: 13,
                fontWeight: 700
              }}
            >
              ✓ Miễn Phí 100% · Mở Trực Tiếp Không Cần Mật Khẩu
            </span>
          </div>
        </div>
      </div>

      {/* Modal Drawer showcasing all 12+ HHD Metaphysics Features */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(6, 7, 11, 0.84)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 1040,
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, #161822, #0D0F16)',
              border: '1px solid rgba(201,168,76,0.45)',
              borderRadius: 24,
              padding: 28,
              boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
              color: '#E2E4E9'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  CÔNG TY TRUYỀN THÔNG K94 · HOTLINE: 0983.339.397 · MIỄN PHÍ 100%
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 26, color: '#F4E3B2', margin: '4px 0 0 0' }}>
                  Trọn Bộ 12 Pháp Khí Phong Thủy, Tử Vi & Bói Toán HHD
                </h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 99,
                  border: '1px solid rgba(201,168,76,0.35)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#F4E3B2',
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12 }}>
              {HHD_FEATURES.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      textDecoration: 'none',
                      padding: 16,
                      borderRadius: 16,
                      border: isActive ? '1px solid #c9a84c' : '1px solid rgba(201,168,76,0.22)',
                      background: isActive ? 'rgba(201,168,76,0.16)' : 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 8
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 24 }}>{item.icon}</span>
                        <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#c9a84c', fontWeight: 700 }}>
                          {item.badge}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#F4E3B2', marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 12, color: '#9DA3B4', lineHeight: 1.45 }}>
                        {item.subtitle}
                      </div>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#c9a84c', fontWeight: 700 }}>
                      Mở tính năng →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Bottom Navigation Dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9990,
          maxWidth: '96vw',
          background: 'rgba(13, 15, 22, 0.94)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(201, 168, 76, 0.45)',
          borderRadius: 999,
          padding: '6px 10px',
          boxShadow: '0 10px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(201, 168, 76, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          overflowX: 'auto'
        }}
      >
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          title="Mở bảng toàn bộ 12 tính năng Huyền Học HHD"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 12px',
            borderRadius: 999,
            border: '1px solid #c9a84c',
            background: 'rgba(201,168,76,0.22)',
            color: '#F4E3B2',
            fontSize: 12,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <span>✨ 12 Tính Năng</span>
        </button>

        {HHD_FEATURES.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '7px 10px',
                borderRadius: 999,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontSize: 11.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#0B0C10' : '#E8D5A3',
                background: isActive ? 'linear-gradient(135deg, #e0c168, #c9a84c)' : 'transparent'
              }}
            >
              <span style={{ fontSize: 13 }}>{item.icon}</span>
              <span>{item.shortLabel}</span>
            </Link>
          );
        })}

        <a
          href="tel:0983339397"
          title="Công ty Truyền thông K94 - ĐT: 0983339397"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 11px',
            borderRadius: 999,
            border: '1px solid rgba(102,187,106,0.45)',
            background: 'rgba(67,160,71,0.18)',
            color: '#81C784',
            fontSize: 11.5,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textDecoration: 'none'
          }}
        >
          <span>📞 K94: 0983.339.397</span>
        </a>
      </div>
    </>
  );
}
