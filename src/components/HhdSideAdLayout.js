'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_MONETIZATION_CONFIG,
  loadMonetizationConfig,
  isAdminAuthenticated
} from '../data/monetizationData';
import {
  getSavedHhdThemeId,
  getHhdThemeById,
  applyHhdTheme
} from '../data/themeData';

export default function HhdSideAdLayout({ children }) {
  const rawPathname = usePathname() || '/';
  const pathname =
    rawPathname.length > 1 && rawPathname.endsWith('/')
      ? rawPathname.slice(0, -1)
      : rawPathname;

  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [isAdmin, setIsAdmin] = useState(false);
  const [panelsCollapsed, setPanelsCollapsed] = useState(false);
  const [themeId, setThemeId] = useState('huyen-vu');

  useEffect(() => {
    setConfig(loadMonetizationConfig());
    setIsAdmin(isAdminAuthenticated());
    const initialTheme = getSavedHhdThemeId();
    setThemeId(initialTheme);
    applyHhdTheme(initialTheme);

    const onUpdate = () => setConfig(loadMonetizationConfig());
    const onAuth = () => setIsAdmin(isAdminAuthenticated());
    const onTheme = (e) => {
      const nextId = e?.detail || getSavedHhdThemeId();
      setThemeId(nextId);
    };
    window.addEventListener('hhd-monetization-updated', onUpdate);
    window.addEventListener('hhd-admin-auth-changed', onAuth);
    window.addEventListener('hhd-theme-changed', onTheme);
    return () => {
      window.removeEventListener('hhd-monetization-updated', onUpdate);
      window.removeEventListener('hhd-admin-auth-changed', onAuth);
      window.removeEventListener('hhd-theme-changed', onTheme);
    };
  }, []);

  const activeTheme = getHhdThemeById(themeId);

  // Do not show side ad panels on the Admin security page itself
  if (pathname === '/quan-ly-kiem-tien') {
    return <>{children}</>;
  }

  const leftSlots = config.sidePanels?.left || DEFAULT_MONETIZATION_CONFIG.sidePanels.left;
  const rightSlots = config.sidePanels?.right || DEFAULT_MONETIZATION_CONFIG.sidePanels.right;
  const topAffiliateProducts = (config.products || []).slice(0, 2);

  const renderAdCard = (slot, sideLabel) => {
    const isInternalLink = Boolean(slot.ctaUrl && slot.ctaUrl.startsWith('/'));
    const CardLinkWrapper = ({ children: linkChildren, style }) =>
      isInternalLink ? (
        <Link href={slot.ctaUrl} style={style}>
          {linkChildren}
        </Link>
      ) : (
        <a href={slot.ctaUrl} target="_blank" rel="noreferrer sponsored" style={style}>
          {linkChildren}
        </a>
      );

    return (
      <div
        key={slot.id}
        style={{
          background: slot.isRentalSlot
            ? 'linear-gradient(160deg, rgba(201,168,76,0.14) 0%, rgba(15,17,26,0.96) 100%)'
            : 'rgba(17, 19, 28, 0.94)',
          border: slot.isRentalSlot
            ? '1.5px dashed rgba(201, 168, 76, 0.65)'
            : '1px solid rgba(201, 168, 76, 0.3)',
          borderRadius: 16,
          padding: 14,
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          gap: 9
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 99,
              background: slot.isRentalSlot ? 'rgba(229, 57, 53, 0.24)' : 'rgba(201, 168, 76, 0.2)',
              color: slot.isRentalSlot ? '#FF8A80' : '#c9a84c',
              fontWeight: 800,
              letterSpacing: 0.4
            }}
          >
            {slot.badge}
          </span>
          {slot.priceTag && (
            <span style={{ fontSize: 10, color: '#81C784', fontWeight: 700 }}>
              {slot.priceTag}
            </span>
          )}
        </div>

        {slot.imageUrl ? (
          <CardLinkWrapper style={{ display: 'block', textDecoration: 'none' }}>
            <img
              src={slot.imageUrl}
              alt={slot.title}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 10,
                border: '1px solid rgba(201,168,76,0.3)'
              }}
            />
          </CardLinkWrapper>
        ) : slot.isRentalSlot ? (
          <div
            style={{
              borderRadius: 10,
              border: '1px dashed rgba(201,168,76,0.4)',
              background: 'rgba(201,168,76,0.06)',
              padding: '12px 10px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 2 }}>📢</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#F4E3B2' }}>
              KHUNG BANNER {sideLabel}
            </div>
            <div style={{ fontSize: 10, color: '#c9a84c' }}>
              Kích thước chuẩn: 240 × 360 px
            </div>
          </div>
        ) : null}

        <CardLinkWrapper
          style={{
            fontFamily: 'var(--font-serif, serif)',
            fontWeight: 700,
            fontSize: 14,
            color: '#F4E3B2',
            lineHeight: 1.38,
            textDecoration: 'none'
          }}
        >
          {slot.title}
        </CardLinkWrapper>

        <div style={{ fontSize: 11.5, color: '#9DA3B4', lineHeight: 1.48 }}>
          {slot.desc}
        </div>

        {/* 2x2 Product Image Gallery (Máy Câu, Cần Câu, Mồi, Phao Chì) */}
        {Array.isArray(slot.galleryImages) && slot.galleryImages.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 6,
              marginTop: 2
            }}
          >
            {slot.galleryImages.map((g, i) => (
              <CardLinkWrapper
                key={i}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  background: '#090D16',
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid rgba(201,168,76,0.28)'
                }}
              >
                <img
                  src={g.img}
                  alt={g.label}
                  style={{ width: '100%', height: 74, objectFit: 'cover', display: 'block' }}
                />
              </CardLinkWrapper>
            ))}
          </div>
        )}

        {/* Store Address & Direct Phone Highlight */}
        {slot.address && (
          <CardLinkWrapper
            style={{
              display: 'block',
              textDecoration: 'none',
              padding: '7px 9px',
              borderRadius: 8,
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              fontSize: 11,
              color: '#E0F2FE',
              lineHeight: 1.45
            }}
          >
            <div>📍 <strong>Đ/c:</strong> {slot.address}</div>
            {slot.phone && (
              <div style={{ marginTop: 3, color: '#FDE047', fontWeight: 800 }}>
                📞 ĐT/Zalo: {slot.phone}
              </div>
            )}
          </CardLinkWrapper>
        )}

        <CardLinkWrapper
          style={{
            display: 'block',
            padding: '8px 10px',
            borderRadius: 9,
            background: 'linear-gradient(135deg, #e0c168, #b88928)',
            border: '1px solid #c9a84c',
            color: '#0B0C10',
            fontWeight: 800,
            fontSize: 11.5,
            textAlign: 'center',
            textDecoration: 'none',
            marginTop: 2
          }}
        >
          {slot.ctaText}
        </CardLinkWrapper>
      </div>
    );
  };

  return (
    <div style={{ background: activeTheme.shellBg, minHeight: '100vh', position: 'relative', transition: 'background 0.25s ease' }}>
      <style>{`
        /* ============================================================== */
        /* 4 BẢNG MÀU GIAO DIỆN PHONG THỦY HHD (CHU SA / GIẤY DÓ / NGỌC)  */
        /* ============================================================== */
        html[data-hhd-theme="chu-sa"] {
          --bg-0: #1A0707 !important;
          --bg-1: #280C0C !important;
          --bg-2: #3A1212 !important;
          --bg-card: rgba(58, 16, 16, 0.72) !important;
          --bg-page: #1A0707 !important;
          --tx-0: #FFF3D1 !important;
          --tx-1: #FCE8C5 !important;
          --tx-2: #E2B8A8 !important;
          --ac: #FFD54F !important;
          --ac-dim: #FF8A65 !important;
        }
        html[data-hhd-theme="chu-sa"] .hhd-center-stage > div,
        html[data-hhd-theme="chu-sa"] .hhd-center-stage section {
          background-color: #1C0808 !important;
          background-image: radial-gradient(circle at 50% 0%, rgba(229, 57, 53, 0.2), transparent 65%), linear-gradient(180deg, #1E0808 0%, #140505 100%) !important;
        }

        html[data-hhd-theme="ngoc-bich"] {
          --bg-0: #051714 !important;
          --bg-1: #0A2620 !important;
          --bg-2: #113830 !important;
          --bg-card: rgba(16, 54, 46, 0.72) !important;
          --bg-page: #051714 !important;
          --tx-0: #E8F5E9 !important;
          --tx-1: #D4EDE2 !important;
          --tx-2: #9AC4B5 !important;
          --ac: #E0C168 !important;
          --ac-dim: #4DB6AC !important;
        }
        html[data-hhd-theme="ngoc-bich"] .hhd-center-stage > div,
        html[data-hhd-theme="ngoc-bich"] .hhd-center-stage section {
          background-color: #061815 !important;
          background-image: radial-gradient(circle at 50% 0%, rgba(77, 182, 172, 0.18), transparent 65%), linear-gradient(180deg, #071D19 0%, #04110E 100%) !important;
        }

        html[data-hhd-theme="giay-do"] {
          --bg-0: #F7F0DF !important;
          --bg-1: #EFE5CC !important;
          --bg-2: #E4D6B5 !important;
          --bg-card: #FFFDF7 !important;
          --bg-page: #F7F0DF !important;
          --tx-0: #1F150E !important;
          --tx-1: #2E2118 !important;
          --tx-2: #5C4636 !important;
          --tx-3: #846A56 !important;
          --ac: #B71C1C !important;
          --ac-dim: #8D6E63 !important;
        }
        html[data-hhd-theme="giay-do"] .hhd-center-stage > div {
          filter: sepia(0.08);
        }

        .hhd-3col-shell {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
        }
        .hhd-side-wing {
          width: 248px;
          flex-shrink: 0;
          position: sticky;
          top: 12px;
          max-height: calc(100vh - 24px);
          overflow-y: auto;
          padding: 14px 12px 90px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 20;
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.35) transparent;
        }
        .hhd-side-wing::-webkit-scrollbar {
          width: 4px;
        }
        .hhd-side-wing::-webkit-scrollbar-thumb {
          background: rgba(201,168,76,0.35);
          border-radius: 4px;
        }
        .hhd-center-stage {
          flex: 1;
          min-width: 0;
        }
        .hhd-mobile-ad-wings {
          display: none;
        }
        @media (max-width: 1220px) {
          .hhd-side-wing {
            display: none !important;
          }
          .hhd-mobile-ad-wings {
            display: block;
            padding: 20px 16px 10px;
            background: ${activeTheme.shellBg};
            border-top: 1px solid rgba(201,168,76,0.25);
          }
        }
      `}</style>

      {/* Floating Toggle Button for Desktop Side Panels */}
      <button
        type="button"
        onClick={() => setPanelsCollapsed(!panelsCollapsed)}
        title={panelsCollapsed ? 'Hiển thị 2 Panel Quảng Cáo Trái/Phải' : 'Thu gọn 2 Panel Trái/Phải để xem toàn màn hình'}
        style={{
          position: 'fixed',
          bottom: 72,
          right: 16,
          zIndex: 9990,
          padding: '6px 12px',
          borderRadius: 999,
          background: 'rgba(17, 19, 28, 0.92)',
          border: '1px solid rgba(201, 168, 76, 0.45)',
          color: '#E8D5A3',
          fontSize: 11.5,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.6)'
        }}
      >
        {panelsCollapsed ? '◀ Hiện Panel 2 Bên ▶' : '✕ Ẩn Panel 2 Bên'}
      </button>

      <div className="hhd-3col-shell">
        {/* ================================================================ */}
        {/* LEFT AD PANEL (CÁNH TRÁI)                                        */}
        {/* ================================================================ */}
        {!panelsCollapsed && (
          <aside
            className="hhd-side-wing"
            style={{
              borderRight: '1px solid rgba(201, 168, 76, 0.22)',
              background: activeTheme.wingBg
            }}
          >
            <div
              style={{
                padding: '7px 10px',
                borderRadius: 10,
                background: 'rgba(201, 168, 76, 0.12)',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 800,
                color: '#F4E3B2',
                letterSpacing: 0.6
              }}
            >
              ✦ PANEL TÀI TRỢ CÁNH TRÁI
            </div>

            {leftSlots.map((slot) => renderAdCard(slot, 'CÁNH TRÁI'))}

            {/* Quick Tool Highlight in Left Wing */}
            <div
              style={{
                background: 'rgba(20, 24, 34, 0.9)',
                border: '1px solid rgba(100, 181, 246, 0.35)',
                borderRadius: 14,
                padding: 12,
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 11, color: '#64B5F6', fontWeight: 800, marginBottom: 4 }}>
                ⚡ TIỆN ÍCH HOT K94
              </div>
              <div style={{ fontSize: 12, color: '#E2E4E9', marginBottom: 8, lineHeight: 1.4 }}>
                Kiểm tra điểm Phong Thủy cho Số Điện Thoại & STK Ngân Hàng của bạn
              </div>
              <Link
                href="/sim-phong-thuy"
                style={{
                  display: 'block',
                  padding: '7px 10px',
                  borderRadius: 8,
                  background: 'rgba(100, 181, 246, 0.18)',
                  border: '1px solid #64B5F6',
                  color: '#90CAF9',
                  fontSize: 11.5,
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                📱 Chấm Điểm Sim Ngay →
              </Link>
            </div>

            {isAdmin && (
              <Link
                href="/quan-ly-kiem-tien"
                style={{
                  display: 'block',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(129,199,132,0.5)',
                  background: 'rgba(129,199,132,0.12)',
                  color: '#81C784',
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                ⚙️ Sửa Panel Trái (Admin)
              </Link>
            )}
          </aside>
        )}

        {/* ================================================================ */}
        {/* CENTER MAIN STAGE (12 FEATURES + CORE APP)                       */}
        {/* ================================================================ */}
        <div className="hhd-center-stage">{children}</div>

        {/* ================================================================ */}
        {/* RIGHT AD PANEL (CÁNH PHẢI)                                       */}
        {/* ================================================================ */}
        {!panelsCollapsed && (
          <aside
            className="hhd-side-wing"
            style={{
              borderLeft: '1px solid rgba(201, 168, 76, 0.22)',
              background: activeTheme.wingBg
            }}
          >
            <div
              style={{
                padding: '7px 10px',
                borderRadius: 10,
                background: 'rgba(201, 168, 76, 0.12)',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 800,
                color: '#F4E3B2',
                letterSpacing: 0.6
              }}
            >
              ✦ VẬT PHẨM & QUẢNG CÁO PHẢI
            </div>

            {/* Quick Affiliate Showcase in Right Wing */}
            <div
              style={{
                background: 'rgba(20, 22, 32, 0.95)',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                borderRadius: 16,
                padding: 13,
                display: 'grid',
                gap: 10
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#FFD54F' }}>
                  🛍️ PHÁP KHÍ HỘ MỆNH HOT
                </span>
                <Link
                  href="/vat-pham-phong-thuy"
                  style={{ fontSize: 10.5, color: '#c9a84c', textDecoration: 'none', fontWeight: 700 }}
                >
                  Tất cả →
                </Link>
              </div>

              {topAffiliateProducts.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(11, 12, 18, 0.85)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: 10
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F4E3B2', lineHeight: 1.35, marginBottom: 4 }}>
                    {item.icon} {item.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#FFD54F' }}>{item.price}</span>
                    <span style={{ fontSize: 10, color: '#8C93A8', textDecoration: 'line-through' }}>
                      {item.originalPrice}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                    <a
                      href={item.shopeeUrl}
                      target="_blank"
                      rel="noreferrer sponsored"
                      style={{
                        padding: '5px 6px',
                        borderRadius: 6,
                        background: '#EE4D2D',
                        color: '#FFF',
                        fontSize: 10.5,
                        fontWeight: 800,
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
                        padding: '5px 6px',
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.1)',
                        color: '#F4E3B2',
                        fontSize: 10.5,
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      🎵 TikTok
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {rightSlots.map((slot) => renderAdCard(slot, 'CÁNH PHẢI'))}

            {isAdmin && (
              <Link
                href="/quan-ly-kiem-tien"
                style={{
                  display: 'block',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid rgba(129,199,132,0.5)',
                  background: 'rgba(129,199,132,0.12)',
                  color: '#81C784',
                  fontSize: 11,
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                ⚙️ Sửa Panel Phải (Admin)
              </Link>
            )}
          </aside>
        )}
      </div>

      {/* Responsive Ad Grid for smaller tablets/screens (< 1220px) */}
      <div className="hhd-mobile-ad-wings">
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>
            ✦ ĐỐI TÁC QUẢNG CÁO & VỊ TRÍ CHO THUÊ BANNER K94 MEDIA (0983.339.397)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
            {[...leftSlots.slice(0, 2), ...rightSlots.slice(0, 2)].map((slot) =>
              renderAdCard(slot, 'ĐỐI TÁC')
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
