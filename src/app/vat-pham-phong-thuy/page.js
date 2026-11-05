'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  DEFAULT_MONETIZATION_CONFIG,
  loadMonetizationConfig
} from '../../data/monetizationData';

const ELEMENT_COLORS = {
  Kim: '#E2E8F0',
  Mộc: '#81C784',
  Thủy: '#64B5F6',
  Hỏa: '#FF8A65',
  Thổ: '#FFD54F'
};

function getYearElement(year) {
  const y = Number(year) || 1994;
  const stemIdx = ((y - 4) % 10 + 10) % 10;
  const branchIdx = ((y - 4) % 12 + 12) % 12;
  let jiazi = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) {
      jiazi = i;
      break;
    }
  }
  const elements = [
    'Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim', 'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc',
    'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy', 'Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim',
    'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy'
  ];
  return elements[Math.floor(jiazi / 2)];
}

export default function VatPhamPhongThuyPage() {
  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [birthYear, setBirthYear] = useState(1994);
  const [selectedElement, setSelectedElement] = useState('ALL');

  useEffect(() => {
    setConfig(loadMonetizationConfig());
    const onUpdate = () => setConfig(loadMonetizationConfig());
    window.addEventListener('hhd-monetization-updated', onUpdate);
    return () => window.removeEventListener('hhd-monetization-updated', onUpdate);
  }, []);

  const userElement = useMemo(() => getYearElement(birthYear), [birthYear]);

  const filteredProducts = useMemo(() => {
    if (selectedElement === 'ALL') return config.products;
    return config.products.filter(
      (p) => p.element === selectedElement || (p.targetElements || []).includes(selectedElement)
    );
  }, [config.products, selectedElement]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Pháp Khí & Vật Phẩm Hộ Mệnh K94</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/quan-ly-kiem-tien" style={{ padding: '6px 12px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.16)', color: '#F4E3B2', fontWeight: 700, textDecoration: 'none' }}>
              ⚙️ Cài Đặt Link Affiliate & Quảng Cáo
            </Link>
            <a href={config.zaloUrl} target="_blank" rel="noreferrer" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>
              💬 Zalo K94: {config.hotlineDisplay}
            </a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Pháp Khí Cát Tường · Bổ Khuyết Ngũ Hành · Chiêu Tài Tụ Lộc
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Thỉnh Vật Phẩm Phong Thủy Hợp Mệnh HHD · K94 Media
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Nhập năm sinh để hệ thống tự động chọn Vòng Trầm Hương, Đá Thạch Anh, Phật Bản Mệnh, Tỳ Hưu & Sách Cổ Tịch tương sinh với Bản Mệnh của bạn.
          </p>
        </div>

        {/* Destiny Matcher Bar */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 20, padding: 22, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700 }}>NĂM SINH CỦA BẠN:</span>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              style={{ width: 110, padding: '9px 12px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 800 }}
            />
            <button
              onClick={() => setSelectedElement(userElement)}
              style={{
                padding: '9px 16px',
                borderRadius: 99,
                border: '1px solid #c9a84c',
                background: 'linear-gradient(135deg, #e0c168, #b88928)',
                color: '#0B0C10',
                fontWeight: 800,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              ✦ Lọc Vật Phẩm Hợp Mệnh {userElement} ({birthYear})
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['ALL', 'Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].map((el) => (
              <button
                key={el}
                onClick={() => setSelectedElement(el)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: selectedElement === el ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  background: selectedElement === el ? 'rgba(201,168,76,0.22)' : '#141722',
                  color: el === 'ALL' ? '#F4E3B2' : ELEMENT_COLORS[el],
                  fontWeight: 700,
                  fontSize: 12.5,
                  cursor: 'pointer'
                }}
              >
                {el === 'ALL' ? 'Tất Cả Pháp Khí' : `Hành ${el}`}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 20, marginBottom: 36 }}>
          {filteredProducts.map((item) => {
            const isMatchUser = (item.targetElements || []).includes(userElement);
            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(20, 22, 32, 0.9)',
                  border: isMatchUser ? '1px solid rgba(201,168,76,0.55)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 14,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.4)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                      {item.icon || '📿'}
                    </span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'inline-block', fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(229,57,53,0.2)', color: '#FF8A80', fontWeight: 700 }}>
                        {item.commissionBadge || 'Pháp Khí Cát Tường'}
                      </span>
                      <div style={{ fontSize: 11.5, color: ELEMENT_COLORS[item.element] || '#c9a84c', fontWeight: 700, marginTop: 4 }}>
                        Hợp mệnh: {(item.targetElements || [item.element]).join(', ')}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18.5, color: '#F4E3B2', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: 13, color: '#A3A8B8', margin: '0 0 12px 0', lineHeight: 1.55 }}>
                    {item.benefit}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#FFD54F' }}>{item.price}</span>
                    {item.originalPrice && (
                      <span style={{ fontSize: 13, color: '#7D8498', textDecoration: 'line-through' }}>{item.originalPrice}</span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <a
                      href={item.shopeeUrl}
                      target="_blank"
                      rel="noreferrer sponsored"
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #EE4D2D, #D73211)',
                        color: '#FFF',
                        fontWeight: 800,
                        fontSize: 12.5,
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      🛒 Mua Trên Shopee
                    </a>
                    <a
                      href={item.tiktokUrl || item.shopeeUrl}
                      target="_blank"
                      rel="noreferrer sponsored"
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(201,168,76,0.35)',
                        color: '#F4E3B2',
                        fontWeight: 700,
                        fontSize: 12.5,
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      🎵 TikTok Shop
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* K94 Media Services & Ad Slots Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {config.banners.map((b) => (
            <div
              key={b.id}
              style={{
                background: 'linear-gradient(155deg, rgba(201,168,76,0.14), rgba(16,18,28,0.95))',
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14
              }}
            >
              <div>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#c9a84c', fontWeight: 800 }}>
                  {b.badge}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 19, color: '#F4E3B2', margin: '10px 0 8px' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 13, color: '#B0B6C6', margin: 0, lineHeight: 1.55 }}>{b.desc}</p>
              </div>
              <a
                href={b.ctaUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #e0c168, #b88928)',
                  color: '#0B0C10',
                  fontWeight: 800,
                  fontSize: 13,
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                {b.ctaText}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
