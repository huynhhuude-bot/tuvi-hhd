'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BRAND_FENG_SHUI_BY_ELEMENT } from '../../data/phase3MetaphysicsData';

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

export default function PhongThuyThuongHieuPage() {
  const [birthYear, setBirthYear] = useState(1994);
  const [brandName, setBrandName] = useState('TRUYỀN THÔNG K94');
  const [slogan, setSlogan] = useState('Kiến Tạo Thương Hiệu · Vượng Khí Sinh Tài');

  const element = useMemo(() => getYearElement(birthYear), [birthYear]);
  const blueprint = BRAND_FENG_SHUI_BY_ELEMENT[element] || BRAND_FENG_SHUI_BY_ELEMENT.Kim;

  const bgHex = blueprint.primaryColors[1]?.hex || '#0F172A';
  const mainHex = blueprint.primaryColors[0]?.hex || '#D4AF37';
  const accentHex = blueprint.accentColors[0]?.hex || '#FACC15';

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Phong Thủy Thương Hiệu & Biển Hiệu K94</span>
          </Link>
          <a href="https://zalo.me/0983339397" target="_blank" rel="noreferrer" style={{ padding: '7px 14px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontSize: 12.5, fontWeight: 800, textDecoration: 'none' }}>
            🎨 Đặt Thiết Kế Logo & Biển Hiệu K94: 0983.339.397
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Cố Vấn Nhận Diện Thương Hiệu Hợp Bản Mệnh · Công Ty Truyền Thông K94
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Chọn Màu Logo, Biển Hiệu Quảng Cáo & Ngành Nghề Kinh Doanh Hợp Mệnh
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Nhập năm sinh chủ doanh nghiệp và tên thương hiệu để xem bản phối màu Logo, hình khối biểu trưng, mô phỏng biển hiệu quảng cáo tương sinh và gợi ý ngành nghề đại vượng.
          </p>
        </div>

        {/* Input Form */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 20, padding: 22, marginBottom: 26, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>NĂM SINH CHỦ THƯƠNG HIỆU</label>
            <input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 800 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>TÊN CÔNG TY / CỬA HÀNG DỰ KIẾN</label>
            <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>SLOGAN / LĨNH VỰC HOẠT ĐỘNG</label>
            <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#E2E4E9' }} />
          </div>
        </div>

        {/* Live Signboard & Logo Mockup */}
        <div style={{ background: 'rgba(18,20,28,0.95)', border: '1.5px solid #c9a84c', borderRadius: 22, padding: 26, marginBottom: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800 }}>
              ✦ MÔ PHỎNG BIỂN HIỆU & LOGO HỢP MỆNH {blueprint.element.toUpperCase()} ({birthYear}) — QUY TẮC TƯƠNG SINH: {blueprint.generatingElement.toUpperCase()}
            </span>
            <Link href="/thuoc-lo-ban" style={{ fontSize: 12, color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>
              📏 Đo Kích Thước Đỏ Lỗ Ban Cho Biển Hiệu →
            </Link>
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, #0D1017 0%, ${bgHex} 100%)`,
              border: `3px solid ${mainHex}`,
              borderRadius: 18,
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 18px 40px rgba(0,0,0,0.65)',
              marginBottom: 18
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 12px',
                borderRadius: element === 'Kim' || element === 'Thủy' ? '50%' : element === 'Thổ' ? 12 : 16,
                background: mainHex,
                color: '#0B0C10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif, serif)',
                fontSize: 28,
                fontWeight: 900,
                boxShadow: `0 0 24px ${mainHex}66`
              }}
            >
              {(brandName || 'K').trim().charAt(0).toUpperCase()}
            </div>
            <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(24px, 3.6vw, 36px)', fontWeight: 900, color: mainHex, letterSpacing: 2, textTransform: 'uppercase' }}>
              {brandName || 'THƯƠNG HIỆU CỦA BẠN'}
            </div>
            <div style={{ fontSize: 14, color: '#FFF', opacity: 0.9, marginTop: 6, letterSpacing: 1 }}>
              {slogan}
            </div>
            <div style={{ marginTop: 12, display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: accentHex, color: '#0B0C10', fontSize: 11.5, fontWeight: 800 }}>
              HOTLINE / ZALO: 0983.339.397 · THIẾT KẾ BỞI K94 MEDIA
            </div>
          </div>

          {/* Color Swatches */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: 12 }}>
            {[...blueprint.primaryColors, ...blueprint.accentColors].map((c) => (
              <div key={c.name} style={{ background: '#11131C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 8, background: c.hex, border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F4E3B2' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#9DA3B4' }}>Mã Hex: {c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Blueprint Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 18, padding: 22 }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 19, color: '#FFD54F', margin: '0 0 10px' }}>
              📐 Hình Khối Logo & Kiểu Chữ Hợp Mệnh {blueprint.element}
            </h3>
            <p style={{ fontSize: 13.5, color: '#E2E4E9', lineHeight: 1.6, marginBottom: 10 }}>
              <strong>Hình khối chủ đạo:</strong> {blueprint.logoShapes}
            </p>
            <p style={{ fontSize: 13.5, color: '#E2E4E9', lineHeight: 1.6, marginBottom: 10 }}>
              <strong>Phong cách Font chữ:</strong> {blueprint.typographyStyle}
            </p>
            <p style={{ fontSize: 13, color: '#FF8A80', margin: 0 }}>
              <strong>Màu nên hạn chế:</strong> {blueprint.avoidColors}
            </p>
          </div>

          <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 18, padding: 22 }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 19, color: '#81C784', margin: '0 0 10px' }}>
              🚀 Top Ngành Nghề Kinh Doanh Đại Vượng
            </h3>
            <ul style={{ margin: '0 0 14px', paddingLeft: 18, color: '#E2E4E9', fontSize: 13.5, lineHeight: 1.7 }}>
              {blueprint.bestIndustries.map((ind) => (
                <li key={ind}>{ind}</li>
              ))}
            </ul>
            <div style={{ fontSize: 12.5, color: '#c9a84c', lineHeight: 1.55 }}>
              <strong>Bí quyết làm biển hiệu:</strong> {blueprint.signboardAdvice}
            </div>
          </div>
        </div>

        {/* B2B K94 Media CTA Box */}
        <div style={{ marginTop: 26, background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(20,22,32,0.96))', border: '1.5px solid #c9a84c', borderRadius: 20, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#FFD54F', fontWeight: 800 }}>DỊCH VỤ TRỌN GÓI CHO CHỦ DOANH NGHIỆP & CỬA HÀNG</div>
            <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 21, fontWeight: 700, color: '#F4E3B2', margin: '4px 0' }}>
              Thiết Kế Logo Phong Thủy, Biển Hiệu Lỗ Ban & Quay Dựng Video Khai Trương K94 Media
            </div>
            <div style={{ fontSize: 13, color: '#D0D5E0' }}>
              Đội ngũ Công ty Truyền thông K94 tư vấn trực tiếp 1-1, bàn giao bộ nhận diện chuẩn phong thủy giúp thương hiệu bứt phá doanh thu.
            </div>
          </div>
          <a
            href="https://zalo.me/0983339397"
            target="_blank"
            rel="noreferrer"
            style={{ padding: '12px 22px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 900, fontSize: 14, textDecoration: 'none' }}
          >
            💬 Nhắn Zalo K94: 0983.339.397
          </a>
        </div>
      </main>
    </div>
  );
}
