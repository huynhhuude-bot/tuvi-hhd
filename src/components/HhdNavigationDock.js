'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_MONETIZATION_CONFIG,
  loadMonetizationConfig,
  buildVietQrUrl,
  isAdminAuthenticated
} from '../data/monetizationData';

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
    href: '/vat-pham-phong-thuy',
    icon: '🛍',
    shortLabel: 'Vật Phẩm Hợp Mệnh',
    title: 'Cửa Hàng Pháp Khí & Vật Phẩm',
    subtitle: 'Thỉnh Vòng Trầm Hương, Thạch Anh, Phật Bản Mệnh, Tỳ Hưu theo Ngũ Hành',
    badge: 'Affiliate'
  },
  {
    href: '/bat-tu-can-xuong',
    icon: '⚖️',
    shortLabel: 'Cân Xương & Bát Tự',
    title: 'Cân Xương Tính Số & Bát Tự',
    subtitle: 'Tính mấy lượng mấy chỉ (Viên Thiên Cang) & kiểm tra Bát Tự khuyết hành',
    badge: 'Mới · Hot'
  },
  {
    href: '/phong-thuy-thuong-hieu',
    icon: '🎨',
    shortLabel: 'Màu Logo & Biển Hiệu',
    title: 'Phong Thủy Thương Hiệu K94',
    subtitle: 'Chọn màu Logo, hình khối biểu trưng, biển hiệu quảng cáo & ngành nghề',
    badge: 'B2B K94'
  },
  {
    href: '/phong-thuy-ban-lam-viec',
    icon: '🪴',
    shortLabel: 'Bàn Làm Việc & Cây',
    title: 'Phong Thủy Bàn Làm Việc & Cây',
    subtitle: 'Sơ đồ 9 cung Bát Quái trên bàn làm việc & Top cây cảnh để bàn hợp mệnh',
    badge: 'Tài Lộc'
  },
  {
    href: '/van-trinh-ngay',
    icon: '🐉',
    shortLabel: 'Vận Trình Hôm Nay',
    title: 'Vận Trình 12 Con Giáp Ngày',
    subtitle: 'Xem sao Tài Lộc hôm nay, màu áo may mắn, hướng Tài Thần & Quý Nhân',
    badge: 'Hàng Ngày'
  },
  {
    href: '/giai-mong',
    icon: '💤',
    shortLabel: 'Giải Mã Giấc Mơ',
    title: 'Chu Công Giải Mộng Cổ Truyền',
    subtitle: 'Giải mã điềm báo giấc mơ thấy rắn, nước, vàng bạc, Phật & lời khuyên',
    badge: 'Giải Mộng'
  },
  {
    href: '/boi-kieu',
    icon: '📖',
    shortLabel: 'Lẩy Kiều Nguyễn Du',
    title: 'Bói Kiều & Lẩy Kiều Cổ Truyền',
    subtitle: 'Rút quẻ thơ Truyện Kiều luận Công danh, Tình duyên & xuất thẻ thơ PNG',
    badge: 'Văn Hóa'
  },
  {
    href: '/tinh-tam',
    icon: '📿',
    shortLabel: 'Gõ Mõ & Chuỗi 108',
    title: 'Gõ Mõ & Lần Chuỗi 108 Hạt',
    subtitle: 'Không gian tĩnh tâm gõ mõ gỗ, chuông thiền 528Hz & chuỗi trầm 108 hạt',
    badge: 'Tĩnh Tâm'
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

const LUCKY_AMOUNTS = [
  { val: 39000, label: '39.000đ (Thần Tài Nhỏ)' },
  { val: 68000, label: '68.000đ (Lộc Phát)' },
  { val: 79000, label: '79.000đ (Thần Tài Lớn)' },
  { val: 168000, label: '168.000đ (Nhất Lộc Phát)' }
];

export default function HhdNavigationDock() {
  const rawPathname = usePathname() || '/';
  const pathname = rawPathname.length > 1 && rawPathname.endsWith('/') ? rawPathname.slice(0, -1) : rawPathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [selectedAmount, setSelectedAmount] = useState(68000);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loaded = loadMonetizationConfig();
    setConfig(loaded);
    setSelectedAmount(loaded.donation?.defaultAmount || 68000);
    setIsAdmin(isAdminAuthenticated());
    const onUpdate = () => {
      const next = loadMonetizationConfig();
      setConfig(next);
    };
    const onAuthChange = () => setIsAdmin(isAdminAuthenticated());
    window.addEventListener('hhd-monetization-updated', onUpdate);
    window.addEventListener('hhd-admin-auth-changed', onAuthChange);
    return () => {
      window.removeEventListener('hhd-monetization-updated', onUpdate);
      window.removeEventListener('hhd-admin-auth-changed', onAuthChange);
    };
  }, []);

  const featuredProducts = (config.products || []).slice(0, 4);

  return (
    <>
      {/* Global Affiliate Showcase + K94 Media Ad Banners + Contact Footer */}
      <div
        style={{
          background: 'linear-gradient(180deg, #090B10 0%, #06070B 100%)',
          borderTop: '1px solid rgba(201,168,76,0.32)',
          padding: '44px 20px 104px',
          color: '#E2E4E9',
          fontFamily: 'var(--font-sans, sans-serif)'
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          {/* Contextual Affiliate Strip */}
          {pathname !== '/vat-pham-phong-thuy' && pathname !== '/quan-ly-kiem-tien' && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: 11, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700 }}>
                    ✦ PHÁP KHÍ BỔ KHUYẾT NGŨ HÀNH & CHIÊU TÀI TỤ LỘC
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '4px 0 0 0' }}>
                    Gợi Ý Vật Phẩm Phong Thủy Hộ Mệnh Hợp Tuổi Của Bạn
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link
                    href="/vat-pham-phong-thuy"
                    style={{
                      padding: '8px 16px',
                      borderRadius: 99,
                      border: '1px solid #c9a84c',
                      background: 'rgba(201,168,76,0.18)',
                      color: '#F4E3B2',
                      fontSize: 12.5,
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    🛍 Xem Tất Cả Vật Phẩm Hợp Mệnh →
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/quan-ly-kiem-tien"
                      style={{
                        padding: '8px 14px',
                        borderRadius: 99,
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#9DA3B4',
                        fontSize: 12,
                        textDecoration: 'none'
                      }}
                    >
                      ⚙️ Sửa Link Affiliate (Admin)
                    </Link>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))', gap: 14 }}>
                {featuredProducts.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'rgba(20, 22, 32, 0.9)',
                      border: '1px solid rgba(201,168,76,0.28)',
                      borderRadius: 16,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 10
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 22 }}>{item.icon}</span>
                        <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 99, background: 'rgba(229,57,53,0.2)', color: '#FF8A80', fontWeight: 700 }}>
                          {item.commissionBadge}
                        </span>
                      </div>
                      <div style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 14.5, lineHeight: 1.4, marginBottom: 4 }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#9DA3B4', lineHeight: 1.45 }}>{item.benefit}</div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 17, fontWeight: 800, color: '#FFD54F' }}>{item.price}</span>
                        <span style={{ fontSize: 11.5, color: '#8C93A8', textDecoration: 'line-through' }}>{item.originalPrice}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <a
                          href={item.shopeeUrl}
                          target="_blank"
                          rel="noreferrer sponsored"
                          style={{
                            padding: '8px 8px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #EE4D2D, #D73211)',
                            color: '#FFF',
                            fontWeight: 800,
                            fontSize: 11.5,
                            textAlign: 'center',
                            textDecoration: 'none'
                          }}
                        >
                          🛒 Shopee
                        </a>
                        <a
                          href={item.tiktokUrl || item.shopeeUrl}
                          target="_blank"
                          rel="noreferrer sponsored"
                          style={{
                            padding: '8px 8px',
                            borderRadius: 8,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(201,168,76,0.35)',
                            color: '#F4E3B2',
                            fontWeight: 700,
                            fontSize: 11.5,
                            textAlign: 'center',
                            textDecoration: 'none'
                          }}
                        >
                          🎵 TikTok
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* K94 Media Advertising Banner Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 30 }}>
            {(config.banners || []).slice(0, 3).map((b) => (
              <div
                key={b.id}
                style={{
                  background: 'linear-gradient(155deg, rgba(201,168,76,0.12), rgba(16,18,28,0.92))',
                  border: '1px solid rgba(201,168,76,0.35)',
                  borderRadius: 16,
                  padding: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 10
                }}
              >
                <div>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#c9a84c', fontWeight: 800 }}>
                    {b.badge}
                  </span>
                  <div style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 15, margin: '6px 0 4px' }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: '#A3A8B8', lineHeight: 1.5 }}>{b.desc}</div>
                </div>
                <a
                  href={b.ctaUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(201,168,76,0.2)',
                    border: '1px solid #c9a84c',
                    color: '#F4E3B2',
                    fontWeight: 700,
                    fontSize: 12,
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                >
                  {b.ctaText}
                </a>
              </div>
            ))}
          </div>

          {/* K94 Media Identity & Quick Action Buttons */}
          <div style={{ textAlign: 'center', borderTop: '1px dashed rgba(201,168,76,0.25)', paddingTop: 22 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#F4E3B2', marginBottom: 10 }}>
              Hệ Thống Tử Vi & 13 Pháp Khí Huyền Học HHD — Bản quyền: Công ty Truyền thông K94
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={`tel:${config.hotline}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '9px 18px',
                  borderRadius: 999,
                  background: 'linear-gradient(135deg, #e0c168, #b88928)',
                  color: '#0B0C10',
                  fontWeight: 800,
                  fontSize: 13.5,
                  textDecoration: 'none'
                }}
              >
                <span>📞 Hotline K94: {config.hotlineDisplay}</span>
              </a>

              <a
                href={config.zaloUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '9px 18px',
                  borderRadius: 999,
                  background: 'rgba(30, 136, 229, 0.22)',
                  border: '1px solid #42A5F5',
                  color: '#90CAF9',
                  fontWeight: 800,
                  fontSize: 13.5,
                  textDecoration: 'none'
                }}
              >
                <span>💬 Nhắn Zalo Tư Vấn & Đặt Quảng Cáo</span>
              </a>

              <button
                onClick={() => setQrModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '9px 18px',
                  borderRadius: 999,
                  background: 'rgba(211, 47, 47, 0.24)',
                  border: '1px solid #EF5350',
                  color: '#FFCDD2',
                  fontWeight: 800,
                  fontSize: 13.5,
                  cursor: 'pointer'
                }}
              >
                <span>🧧 Gieo Duyên Nhận Lộc / Mời Trà Ông Đồ (QR)</span>
              </button>

              {isAdmin ? (
                <Link
                  href="/quan-ly-kiem-tien"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 16px',
                    borderRadius: 999,
                    border: '1px solid rgba(129,199,132,0.5)',
                    background: 'rgba(129,199,132,0.14)',
                    color: '#81C784',
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: 'none'
                  }}
                >
                  <span>🔓 Quản Trị Admin K94 (Đang Mở)</span>
                </Link>
              ) : (
                <Link
                  href="/quan-ly-kiem-tien"
                  title="Cổng Quản Trị Nội Bộ K94 Media (Yêu cầu Mật khẩu & Mã PIN)"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '6px 10px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    color: '#5C6479',
                    fontSize: 11,
                    textDecoration: 'none'
                  }}
                >
                  <span>🔒 Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: VietQR Gieo Duyên / Mời Trà Ông Đồ K94 */}
      {qrModalOpen && (
        <div
          onClick={() => setQrModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(6, 7, 11, 0.85)',
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
              maxWidth: 460,
              background: 'linear-gradient(160deg, #1A1412, #0E1018)',
              border: '2px solid #c9a84c',
              borderRadius: 24,
              padding: 26,
              textAlign: 'center',
              color: '#E2E4E9',
              boxShadow: '0 24px 80px rgba(0,0,0,0.9)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, letterSpacing: 1 }}>
                🧧 HÒM CÔNG ĐỨC & GIEO DUYÊN LÀNH K94
              </span>
              <button
                onClick={() => setQrModalOpen(false)}
                style={{ width: 32, height: 32, borderRadius: 99, border: '1px solid rgba(201,168,76,0.4)', background: 'transparent', color: '#F4E3B2', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 8px 0' }}>
              Mời Trà Ông Đồ & Gieo Duyên HHD
            </h3>
            <p style={{ fontSize: 13, color: '#B0B6C6', margin: '0 0 14px 0', lineHeight: 1.5 }}>
              {config.donation?.note}
            </p>

            {/* Lucky Amount Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              {LUCKY_AMOUNTS.map((a) => (
                <button
                  key={a.val}
                  onClick={() => setSelectedAmount(a.val)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 10,
                    border: selectedAmount === a.val ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    background: selectedAmount === a.val ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.03)',
                    color: selectedAmount === a.val ? '#FFD54F' : '#C5C9D6',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <img
              src={buildVietQrUrl(config.donation, selectedAmount)}
              alt="VietQR Gieo Duyên HHD K94"
              style={{ width: 240, height: 'auto', borderRadius: 16, border: '2px solid #c9a84c', background: '#FFF', padding: 8, margin: '0 auto 12px' }}
            />

            <div style={{ fontSize: 14, fontWeight: 800, color: '#F4E3B2' }}>
              Ngân hàng {config.donation?.bankCode} · STK: {config.donation?.accountNo}
            </div>
            <div style={{ fontSize: 12.5, color: '#c9a84c', fontWeight: 700, marginBottom: 14 }}>
              Chủ TK: {config.donation?.accountName}
            </div>

            <Link
              href="/quan-ly-kiem-tien"
              onClick={() => setQrModalOpen(false)}
              style={{ fontSize: 12, color: '#9DA3B4', textDecoration: 'underline' }}
            >
              ⚙️ Đổi số tài khoản ngân hàng nhận QR tại đây
            </Link>
          </div>
        </div>
      )}

      {/* Modal Drawer showcasing all HHD Features */}
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
                  CÔNG TY TRUYỀN THÔNG K94 · HOTLINE/ZALO: 0983.339.397
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 26, color: '#F4E3B2', margin: '4px 0 0 0' }}>
                  Trọn Bộ Pháp Khí Phong Thủy, Tử Vi, Bói Toán & Vật Phẩm HHD
                </h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ width: 36, height: 36, borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', background: 'rgba(255,255,255,0.05)', color: '#F4E3B2', fontSize: 16, cursor: 'pointer' }}
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
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#F4E3B2', marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: '#9DA3B4', lineHeight: 1.45 }}>{item.subtitle}</div>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#c9a84c', fontWeight: 700 }}>Mở tính năng →</div>
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
          background: 'rgba(13, 15, 22, 0.95)',
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
          <span>✨ Menu HHD</span>
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

        <button
          onClick={() => setQrModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 11px',
            borderRadius: 999,
            border: '1px solid rgba(239,83,80,0.55)',
            background: 'rgba(211,47,47,0.22)',
            color: '#FFCDD2',
            fontSize: 11.5,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <span>🧧 Gieo Duyên QR</span>
        </button>

        <a
          href={config.zaloUrl}
          target="_blank"
          rel="noreferrer"
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
          <span>💬 Zalo K94: {config.hotlineDisplay}</span>
        </a>
      </div>
    </>
  );
}
