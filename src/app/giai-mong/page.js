'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DREAM_DICTIONARY } from '../../data/phase3MetaphysicsData';

const CATEGORIES = [
  'Tất cả',
  'Động Vật Linh Thú',
  'Thiên Nhiên & Ngũ Hành',
  'Tài Lộc & Phú Quý',
  'Tâm Linh & Phúc Đức',
  'Cơ Thể & Sức Khỏe',
  'Công Việc & Khát Vọng'
];

export default function GiaiMongPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [selectedDream, setSelectedDream] = useState(DREAM_DICTIONARY[0]);

  const filteredDreams = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DREAM_DICTIONARY.filter((d) => {
      const matchCat = category === 'Tất cả' || d.category === category;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.meaning.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, category]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Chu Công Giải Mộng · Giải Mã Giấc Mơ</span>
          </Link>
          <Link href="/vat-pham-phong-thuy" style={{ fontSize: 13, color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>
            📿 Thỉnh Vòng Trầm Hương An Thần Ngủ Ngon →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Cổ Thư Chu Công · Điềm Báo Tâm Linh & Phong Thủy Đời Sống
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Tra Cứu & Giải Mã Điềm Báo Giấc Mơ Cổ Truyền
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Nhập hình ảnh bạn vừa nhìn thấy trong giấc mơ (VD: rắn, nước lớn, nhặt vàng, Phật, bay lên trời, xây nhà...) để xem lời luận giải chuẩn sách Chu Công Giải Mộng.
          </p>
        </div>

        {/* Search & Category Bar */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 20, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="🔍 Nhập giấc mơ của bạn (VD: mơ thấy rắn vàng, mơ thấy nước, mơ thấy vàng, rụng răng...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', borderRadius: 12, border: '1px solid rgba(201,168,76,0.45)', background: '#11131A', color: '#F4E3B2', fontSize: 15, marginBottom: 14 }}
          />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 99,
                  border: category === c ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  background: category === c ? 'rgba(201,168,76,0.22)' : '#141722',
                  color: category === c ? '#F4E3B2' : '#9DA3B4',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 22 }}>
          {/* List of Dream Symbols */}
          <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            {filteredDreams.map((item) => {
              const isSelected = selectedDream?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedDream(item)}
                  style={{
                    textAlign: 'left',
                    padding: 16,
                    borderRadius: 16,
                    background: isSelected ? 'rgba(201,168,76,0.18)' : 'rgba(20,22,30,0.88)',
                    border: isSelected ? '1.5px solid #c9a84c' : '1px solid rgba(201,168,76,0.22)',
                    color: '#E2E4E9',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>{item.category}</span>
                    <span style={{ fontSize: 11, color: item.omenColor, fontWeight: 800 }}>{item.omen.split('·')[0]}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F4E3B2' }}>💤 {item.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Dream Interpretation Panel */}
          {selectedDream && (
            <div style={{ background: 'linear-gradient(155deg, rgba(20,22,32,0.96), rgba(14,16,24,0.98))', border: '1.5px solid #c9a84c', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
              <div>
                <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: 'rgba(102,187,106,0.18)', border: `1px solid ${selectedDream.omenColor}`, color: selectedDream.omenColor, fontSize: 12, fontWeight: 800, marginBottom: 10 }}>
                  ✦ {selectedDream.omen}
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 24, color: '#F4E3B2', margin: '0 0 12px' }}>
                  {selectedDream.title}
                </h2>

                <div style={{ background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #c9a84c', padding: '12px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13.5, color: '#F4E3B2', fontStyle: 'italic', lineHeight: 1.6 }}>
                  📜 {selectedDream.chuCongText}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, marginBottom: 4 }}>LUẬN GIẢI CHI TIẾT THEO PHONG THỦY & ĐỜI SỐNG:</div>
                  <p style={{ fontSize: 14, color: '#D0D5E0', lineHeight: 1.65, margin: 0 }}>{selectedDream.meaning}</p>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#81C784', fontWeight: 800, marginBottom: 4 }}>LỜI KHUYÊN HÀNH XỬ TRONG 3 NGÀY TỚI:</div>
                  <p style={{ fontSize: 14, color: '#E2E4E9', lineHeight: 1.65, margin: 0 }}>{selectedDream.advice}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(201,168,76,0.3)', paddingTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/vat-pham-phong-thuy"
                  style={{ padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 12.5, textDecoration: 'none' }}
                >
                  📿 Thỉnh Vòng Trầm Hương An Thần Ngủ Ngon (Hành {selectedDream.recommendedElement})
                </Link>
                <Link
                  href="/tinh-tam"
                  style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #c9a84c', color: '#F4E3B2', fontWeight: 700, fontSize: 12.5, textDecoration: 'none' }}
                >
                  🕯️ Vào Phòng Gõ Mõ & Chuông Thiền Tịnh Tâm
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
