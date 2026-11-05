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
  const pathname = usePathname() || '/';
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Modal Drawer showcasing all HHD Metaphysics Features */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(6, 7, 11, 0.82)',
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
              maxWidth: 920,
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  HỆ SINH THÁI VĂN HÓA HUYỀN HỌC PHƯƠNG ĐÔNG
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 26, color: '#F4E3B2', margin: '4px 0 0 0' }}>
                  Trọn Bộ Pháp Khí Phong Thủy & Bói Toán HHD
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {HHD_FEATURES.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      textDecoration: 'none',
                      padding: 18,
                      borderRadius: 16,
                      border: isActive ? '1px solid #c9a84c' : '1px solid rgba(201,168,76,0.22)',
                      background: isActive ? 'rgba(201,168,76,0.16)' : 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 10,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 28 }}>{item.icon}</span>
                        <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#c9a84c', fontWeight: 700 }}>
                          {item.badge}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#F4E3B2', marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: '#9DA3B4', lineHeight: 1.5 }}>
                        {item.subtitle}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 600 }}>
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
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9990,
          maxWidth: '96vw',
          background: 'rgba(13, 15, 22, 0.92)',
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
        {HHD_FEATURES.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 12px',
                borderRadius: 999,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontSize: 12.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#0B0C10' : '#E8D5A3',
                background: isActive ? 'linear-gradient(135deg, #e0c168, #c9a84c)' : 'transparent',
                transition: 'all 0.18s ease'
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span>{item.shortLabel}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setDrawerOpen((v) => !v)}
          title="Mở bảng toàn bộ tính năng Huyền Học HHD"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 12px',
            borderRadius: 999,
            border: '1px solid rgba(201,168,76,0.45)',
            background: 'rgba(201,168,76,0.16)',
            color: '#F4E3B2',
            fontSize: 12,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <span>✨ Menu</span>
        </button>
      </div>
    </>
  );
}
