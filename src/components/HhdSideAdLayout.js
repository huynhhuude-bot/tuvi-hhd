'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_MONETIZATION_CONFIG,
  loadMonetizationConfig,
  isAdminAuthenticated
} from '../data/monetizationData';

export default function HhdSideAdLayout({ children }) {
  const rawPathname = usePathname() || '/';
  const pathname =
    rawPathname.length > 1 && rawPathname.endsWith('/')
      ? rawPathname.slice(0, -1)
      : rawPathname;

  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [isAdmin, setIsAdmin] = useState(false);
  const [panelsCollapsed, setPanelsCollapsed] = useState(false);

  useEffect(() => {
    setConfig(loadMonetizationConfig());
    setIsAdmin(isAdminAuthenticated());
    const onUpdate = () => setConfig(loadMonetizationConfig());
    const onAuth = () => setIsAdmin(isAdminAuthenticated());
    window.addEventListener('hhd-monetization-updated', onUpdate);
    window.addEventListener('hhd-admin-auth-changed', onAuth);
    return () => {
      window.removeEventListener('hhd-monetization-updated', onUpdate);
      window.removeEventListener('hhd-admin-auth-changed', onAuth);
    };
  }, []);

  // Do not show side ad panels on the Admin security page itself
  if (pathname === '/quan-ly-kiem-tien') {
    return <>{children}</>;
  }

  const leftSlots = config.sidePanels?.left || DEFAULT_MONETIZATION_CONFIG.sidePanels.left;
  const rightSlots = config.sidePanels?.right || DEFAULT_MONETIZATION_CONFIG.sidePanels.right;
  const topAffiliateProducts = (config.products || []).slice(0, 2);

  const renderAdCard = (slot, sideLabel) => (
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
        <a href={slot.ctaUrl} target="_blank" rel="noreferrer sponsored" style={{ display: 'block' }}>
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
        </a>
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

      <div
        style={{
          fontFamily: 'var(--font-serif, serif)',
          fontWeight: 700,
          fontSize: 14,
          color: '#F4E3B2',
          lineHeight: 1.38
        }}
      >
        {slot.title}
      </div>

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
            <a
              key={i}
              href={slot.ctaUrl}
              target="_blank"
              rel="noreferrer sponsored"
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
            </a>
          ))}
        </div>
      )}

      {/* Store Address & Direct Phone Highlight */}
      {slot.address && (
        <div
          style={{
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
        </div>
      )}

      <a
        href={slot.ctaUrl}
        target="_blank"
        rel="noreferrer sponsored"
        style={{
          display: 'block',
          padding: '8px 10px',
          borderRadius: 9,
          background: slot.isRentalSlot
            ? 'linear-gradient(135deg, #e0c168, #b88928)'
            : 'linear-gradient(135deg, #e0c168, #b88928)',
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
      </a>
    </div>
  );

  return (
    <div style={{ background: '#0B0C10', minHeight: '100vh', position: 'relative' }}>
      <style>{`
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
            background: #090B10;
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
              borderRight: '1px solid rgba(201, 168, 76, 0.18)',
              background: 'linear-gradient(180deg, rgba(12,14,20,0.98) 0%, rgba(9,10,15,0.98) 100%)'
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
              borderLeft: '1px solid rgba(201, 168, 76, 0.18)',
              background: 'linear-gradient(180deg, rgba(12,14,20,0.98) 0%, rgba(9,10,15,0.98) 100%)'
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
