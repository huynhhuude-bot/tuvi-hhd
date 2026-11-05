'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BRANCHES, analyzeCanXuongAndBatTu } from '../../data/phase3MetaphysicsData';

const ELEMENT_COLORS = {
  Kim: '#E2E8F0',
  Mộc: '#81C784',
  Thủy: '#64B5F6',
  Hỏa: '#FF8A65',
  Thổ: '#FFD54F'
};

export default function BatTuCanXuongPage() {
  const [year, setYear] = useState(1994);
  const [month, setMonth] = useState(6);
  const [day, setDay] = useState(15);
  const [hourIdx, setHourIdx] = useState(6); // Ngọ

  const analysis = useMemo(
    () => analyzeCanXuongAndBatTu({ year, month, day, hourIdx }),
    [year, month, day, hourIdx]
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Cân Xương Tính Số & Bát Tự Tứ Trụ</span>
          </Link>
          <a href="https://zalo.me/0983339397" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, textDecoration: 'none' }}>
            💬 Tư Vấn Bát Tự K94: 0983.339.397
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Thuật Viên Thiên Cang · Tứ Trụ Tử Bình · Bổ Khuyết Dụng Thần
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Cân Xương Tính Số Lượng Chỉ & Bát Tự Khuyết Ngũ Hành
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Nhập Năm, Tháng, Ngày (Âm lịch) và Giờ sinh để tính trọng lượng xương cốt theo đại sư Viên Thiên Cang và kiểm tra Tứ Trụ của bạn đang vượng hay khuyết hành nào.
          </p>
        </div>

        {/* Input Form */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>NĂM SINH</label>
            <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 800 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>THÁNG SINH (ÂM LỊCH 1-12)</label>
            <select value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>Tháng {m} Âm lịch</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>NGÀY SINH (ÂM LỊCH 1-30)</label>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>Mùng / Ngày {d}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>GIỜ SINH (12 CHI)</label>
            <select value={hourIdx} onChange={(e) => setHourIdx(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}>
              {BRANCHES.map((b, idx) => (
                <option key={b} value={idx}>Giờ {b} ({idx === 0 ? '23h-01h' : `${idx * 2 - 1}h-${idx * 2 + 1}h`})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cân Xương Result Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22, marginBottom: 26 }}>
          <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.16), rgba(16,18,28,0.95))', border: '1.5px solid #c9a84c', borderRadius: 22, padding: 26, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, letterSpacing: 1 }}>TRỌNG LƯỢNG CÂN XƯƠNG TÍNH SỐ</div>
            <div style={{ fontSize: 46, fontWeight: 900, color: '#FFD54F', fontFamily: 'var(--font-serif, serif)', margin: '8px 0' }}>
              ⚖️ {analysis.weightLabel}
            </div>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 99, background: 'rgba(102,187,106,0.2)', border: '1px solid #66BB6A', color: '#81C784', fontSize: 13, fontWeight: 800, marginBottom: 16 }}>
              {analysis.rankTitle}
            </div>
            <pre style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 15.5, color: '#F4E3B2', lineHeight: 1.75, background: 'rgba(0,0,0,0.35)', padding: 16, borderRadius: 14, border: '1px dashed rgba(201,168,76,0.35)', whiteSpace: 'pre-wrap', margin: '0 0 14px' }}>
              {analysis.poem}
            </pre>
            <p style={{ fontSize: 13.5, color: '#D0D5E0', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              {analysis.destinyDetail}
            </p>
          </div>

          {/* 4 Pillars & Missing Elements */}
          <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800, marginBottom: 12 }}>
                BẢNG TỨ TRỤ BÁT TỰ (8 CHỮ CAN CHI) & TỶ LỆ NGŨ HÀNH
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
                {analysis.pillars.map((p) => (
                  <div key={p.label} style={{ background: '#12151F', border: '1px solid rgba(201,168,76,0.28)', borderRadius: 12, padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 10.5, color: '#9DA3B4', marginBottom: 4 }}>{p.label.split(' ')[1]}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: ELEMENT_COLORS[p.stemEl] }}>{p.stem}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: ELEMENT_COLORS[p.branchEl] }}>{p.branch}</div>
                    <div style={{ fontSize: 10, color: '#c9a84c', marginTop: 4 }}>{p.weight}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                {Object.entries(analysis.elementCounts).map(([el, count]) => (
                  <div key={el} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 65, fontSize: 12.5, fontWeight: 700, color: ELEMENT_COLORS[el] }}>Hành {el}:</span>
                    <div style={{ flex: 1, height: 10, borderRadius: 99, background: '#141722', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.max(8, (count / 8) * 100)}%`, height: '100%', background: ELEMENT_COLORS[el] }} />
                    </div>
                    <span style={{ width: 55, fontSize: 12, color: count === 0 ? '#FF8A80' : '#E2E4E9', fontWeight: 700, textAlign: 'right' }}>
                      {count === 0 ? 'Khuyết!' : `${count}/8 chữ`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid #c9a84c', borderRadius: 14, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#FFD54F', marginBottom: 4 }}>
                💡 Pháp Khí Bổ Khuyết Dụng Thần Cho Bạn:
              </div>
              <div style={{ fontSize: 12.5, color: '#E2E4E9', lineHeight: 1.55, marginBottom: 10 }}>
                Trong Bát Tự của bạn, hành đang thiếu hoặc yếu nhất là <strong style={{ color: ELEMENT_COLORS[analysis.weakestElement] }}>Hành {analysis.weakestElement}</strong>. Bạn nên mang theo Vòng Đá Phong Thủy, Kim Bài hoặc chọn Sim Số Đẹp thuộc hành <strong>{analysis.weakestElement}</strong> để cân bằng âm dương ngũ hành.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/vat-pham-phong-thuy"
                  style={{ padding: '8px 14px', borderRadius: 8, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 12, textDecoration: 'none' }}
                >
                  🛍️ Thỉnh Vật Phẩm Bổ Khuyết Hành {analysis.weakestElement} →
                </Link>
                <Link
                  href="/sim-phong-thuy"
                  style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #c9a84c', color: '#F4E3B2', fontWeight: 700, fontSize: 12, textDecoration: 'none' }}
                >
                  📱 Chọn Sim Bổ Khuyết Hành {analysis.weakestElement}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
