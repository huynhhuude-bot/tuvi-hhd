'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DESK_NINE_GRID, PLANTS_AND_ART_BY_ELEMENT } from '../../data/phase3MetaphysicsData';

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

export default function PhongThuyBanLamViecPage() {
  const [birthYear, setBirthYear] = useState(1994);
  const [selectedCell, setSelectedCell] = useState(DESK_NINE_GRID[0]);

  const element = useMemo(() => getYearElement(birthYear), [birthYear]);
  const plantData = PLANTS_AND_ART_BY_ELEMENT[element] || PLANTS_AND_ART_BY_ELEMENT.Kim;

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Phong Thủy Bàn Làm Việc & Cây Cảnh Hợp Mệnh</span>
          </Link>
          <Link href="/compass" style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, textDecoration: 'none' }}>
            🧭 Mở La Bàn Bát Trạch 24 Sơn →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Sơ Đồ Cửu Cung Bát Quái Trên Mặt Bàn · Kích Hoạt Cung Tài Lộc & Quan Lộc
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Bố Trí Bàn Làm Việc Chuẩn Phong Thủy & Chọn Cây Cảnh Hợp Tuổi
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: '#9DA3B4' }}>Năm sinh của bạn:</span>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              style={{ width: 100, padding: '8px 12px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontWeight: 800, fontSize: 15 }}
            />
            <span style={{ padding: '6px 12px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#FFD54F', fontSize: 12.5, fontWeight: 800 }}>
              Bản mệnh: Hành {element}
            </span>
          </div>
        </div>

        {/* Interactive 3x3 Desk Nine-Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22, marginBottom: 28 }}>
          <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 22, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>
              🖱️ BẤM VÀO TỪNG Ô TRÊN MẶT BÀN ĐỂ XEM VẬT PHẨM NÊN ĐẶT
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {DESK_NINE_GRID.map((cell) => {
                const active = selectedCell.pos === cell.pos;
                return (
                  <button
                    key={cell.pos}
                    onClick={() => setSelectedCell(cell)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 14,
                      background: active ? 'rgba(201,168,76,0.24)' : '#12151F',
                      border: active ? '2px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                      color: '#F4E3B2',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{cell.icon}</div>
                    <div style={{ fontSize: 11, color: cell.color, fontWeight: 800 }}>{cell.pos.split(' ')[0]}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{cell.title}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: 11.5, color: '#9DA3B4', marginTop: 10 }}>
              ▲ Phía người ngồi nhìn vào màn hình máy tính ▲
            </div>
          </div>

          {/* Selected Zone Detail */}
          <div style={{ background: 'linear-gradient(155deg, rgba(22,25,36,0.96), rgba(14,16,24,0.98))', border: '1.5px solid #c9a84c', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: 'rgba(201,168,76,0.18)', color: selectedCell.color, fontSize: 12, fontWeight: 800, marginBottom: 10 }}>
                {selectedCell.pos} · {selectedCell.title}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 12px' }}>
                {selectedCell.icon} {selectedCell.item}
              </h2>
              <p style={{ fontSize: 14, color: '#D0D5E0', lineHeight: 1.65, margin: '0 0 16px' }}>
                {selectedCell.desc}
              </p>
              <div style={{ background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #c9a84c', padding: 12, borderRadius: 8, fontSize: 13, color: '#F4E3B2' }}>
                🖼️ <strong>Tranh treo tường văn phòng hợp mệnh {element} ({birthYear}):</strong> {plantData.paintings}
              </div>
            </div>

            <Link
              href="/vat-pham-phong-thuy"
              style={{ display: 'inline-block', textAlign: 'center', padding: '11px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}
            >
              🛍️ Xem Bộ Vật Phẩm Để Bàn Hợp Mệnh {element} →
            </Link>
          </div>
        </div>

        {/* Recommended Feng Shui Plants for User's Element */}
        <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 16px' }}>
          🪴 Top 3 Cây Cảnh Để Bàn Làm Việc Đại Cát Cho Người Mệnh {element} ({birthYear})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {plantData.plants.map((plant) => (
            <div key={plant.name} style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(102,187,106,0.35)', borderRadius: 18, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 24 }}>🪴</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#FFD54F' }}>{plant.price}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#F4E3B2', marginBottom: 6 }}>{plant.name}</div>
                <div style={{ fontSize: 13, color: '#9DA3B4', lineHeight: 1.55 }}>{plant.desc}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <a
                  href={`https://shopee.vn/search?keyword=${plant.keyword}`}
                  target="_blank"
                  rel="noreferrer sponsored"
                  style={{ padding: '9px 10px', borderRadius: 8, background: '#EE4D2D', color: '#FFF', fontWeight: 800, fontSize: 12, textAlign: 'center', textDecoration: 'none' }}
                >
                  🛒 Mua Shopee
                </a>
                <a
                  href={`https://www.tiktok.com/search?q=${plant.keyword}`}
                  target="_blank"
                  rel="noreferrer sponsored"
                  style={{ padding: '9px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.35)', color: '#F4E3B2', fontWeight: 700, fontSize: 12, textAlign: 'center', textDecoration: 'none' }}
                >
                  🎵 TikTok Shop
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
