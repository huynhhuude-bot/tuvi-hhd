'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateBatTrachGua } from '../../data/metaphysicsData';

const COMPASS_SECTORS = [
  { label: 'Bắc', full: 'Chính Bắc', angle: 0, trigram: 'Khảm ☵', mountains: ['Nhâm', 'Tý', 'Quý'] },
  { label: 'ĐB', full: 'Đông Bắc', angle: 45, trigram: 'Cấn ☶', mountains: ['Sửu', 'Cấn', 'Dần'] },
  { label: 'Đông', full: 'Chính Đông', angle: 90, trigram: 'Chấn ☳', mountains: ['Giáp', 'Mão', 'Ất'] },
  { label: 'ĐN', full: 'Đông Nam', angle: 135, trigram: 'Tốn ☴', mountains: ['Thìn', 'Tốn', 'Tỵ'] },
  { label: 'Nam', full: 'Chính Nam', angle: 180, trigram: 'Ly ☲', mountains: ['Bính', 'Ngọ', 'Đinh'] },
  { label: 'TN', full: 'Tây Nam', angle: 225, trigram: 'Khôn ☷', mountains: ['Mùi', 'Khôn', 'Thân'] },
  { label: 'Tây', full: 'Chính Tây', angle: 270, trigram: 'Đoài ☱', mountains: ['Canh', 'Dậu', 'Tân'] },
  { label: 'TB', full: 'Tây Bắc', angle: 315, trigram: 'Càn ☰', mountains: ['Tuất', 'Càn', 'Hợi'] },
];

export default function CompassPage() {
  const [birthYear, setBirthYear] = useState(1995);
  const [gender, setGender] = useState('male');
  const [rotation, setRotation] = useState(0);

  const guaInfo = useMemo(() => calculateBatTrachGua(birthYear, gender), [birthYear, gender]);

  // Map each of the 8 directions to whether it is Auspicious or Inauspicious for this user
  const directionStatusMap = useMemo(() => {
    const map = {};
    guaInfo.good.forEach((g) => {
      const key = g.dir.split(' (')[0];
      map[key] = { isGood: true, ...g };
    });
    guaInfo.bad.forEach((b) => {
      const key = b.dir.split(' (')[0];
      map[key] = { isGood: false, ...b };
    });
    return map;
  }, [guaInfo]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 96 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD La Bàn Bát Trạch</span>
          </Link>
          <nav style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <Link href="/divination" style={{ color: '#A3A8B8', textDecoration: 'none' }}>☯ Gieo Quẻ Dịch</Link>
            <Link href="/calligraphy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🖌 Xin Chữ Ông Đồ</Link>
            <Link href="/fortune-sticks" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🎋 Lắc Xăm Cổ</Link>
            <Link href="/almanac" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📅 Lịch Vạn Niên</Link>
            <Link href="/naming" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📜 Chấm Điểm Tên</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            La Kinh 24 Sơn Hướng · Đông Tứ Mệnh & Tây Tứ Mệnh
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            La Bàn Phong Thủy Bát Trạch & Hướng Hợp Tuổi HHD
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            Nhập năm sinh và giới tính để định Cung Phi Bát Trạch, tra 4 hướng Đại Cát (Sinh Khí, Thiên Y, Diên Niên, Phục Vị) cho nhà cửa, bàn làm việc và phòng ngủ.
          </p>
        </div>

        {/* Controls */}
        <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Năm Sinh Âm/Dương Lịch
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              min={1920}
              max={2040}
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 600 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Giới Tính (Tính Cung Phi)
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { id: 'male', label: 'Nam Mạng' },
                { id: 'female', label: 'Nữ Mạng' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGender(g.id)}
                  style={{
                    flex: 1,
                    padding: '11px 14px',
                    borderRadius: 10,
                    border: gender === g.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    background: gender === g.id ? 'rgba(201,168,76,0.22)' : '#11131A',
                    color: gender === g.id ? '#F4E3B2' : '#9DA3B4',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Xoay La Kinh ({rotation}°)
            </label>
            <input
              type="range"
              min={0}
              max={359}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#c9a84c', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Main Compass + Kua Profile Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, marginBottom: 32, alignItems: 'center' }}>
          {/* Interactive SVG 24-Mountain Compass */}
          <div style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(16,18,26,0.95) 75%)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: '#c9a84c', letterSpacing: 1.5, marginBottom: 10 }}>
              ▲ HƯỚNG TRƯỚC MẶT ({rotation}°)
            </div>
            <svg
              viewBox="0 0 380 380"
              style={{
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                transform: `rotate(${-rotation}deg)`,
                transition: 'transform 0.25s ease-out'
              }}
            >
              {/* Outer Brass Ring */}
              <circle cx="190" cy="190" r="180" fill="#10121A" stroke="#c9a84c" strokeWidth="2.5" />
              <circle cx="190" cy="190" r="145" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" />
              <circle cx="190" cy="190" r="105" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" />
              <circle cx="190" cy="190" r="52" fill="#181B26" stroke="#c9a84c" strokeWidth="1.8" />

              {/* 8 Direction Wedges & Labels */}
              {COMPASS_SECTORS.map((sec) => {
                const st = directionStatusMap[sec.full];
                const isGood = st?.isGood;
                const rad = ((sec.angle - 90) * Math.PI) / 180;
                const xOuter = 190 + 162 * Math.cos(rad);
                const yOuter = 190 + 162 * Math.sin(rad);
                const xMid = 190 + 125 * Math.cos(rad);
                const yMid = 190 + 125 * Math.sin(rad);
                const xInner = 190 + 78 * Math.cos(rad);
                const yInner = 190 + 78 * Math.sin(rad);

                return (
                  <g key={sec.label}>
                    <line
                      x1="190"
                      y1="190"
                      x2={190 + 180 * Math.cos(((sec.angle - 67.5) * Math.PI) / 180)}
                      y2={190 + 180 * Math.sin(((sec.angle - 67.5) * Math.PI) / 180)}
                      stroke="rgba(201,168,76,0.22)"
                      strokeWidth="1"
                    />
                    <text
                      x={xOuter}
                      y={yOuter}
                      fill={isGood ? '#81C784' : '#EF9A9A'}
                      fontSize="12"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {sec.label}
                    </text>
                    <text
                      x={xMid}
                      y={yMid}
                      fill={isGood ? '#F4E3B2' : '#9DA3B4'}
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {st ? st.star : ''}
                    </text>
                    <text
                      x={xInner}
                      y={yInner}
                      fill="#c9a84c"
                      fontSize="10"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {sec.trigram}
                    </text>
                  </g>
                );
              })}

              {/* Center Taiji / Kua Symbol */}
              <text x="190" y="182" fill="#F4E3B2" fontSize="22" fontWeight="700" textAnchor="middle">
                {guaInfo.symbol} {guaInfo.name}
              </text>
              <text x="190" y="204" fill="#c9a84c" fontSize="10" fontWeight="600" textAnchor="middle">
                {guaInfo.group}
              </text>
            </svg>
            <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12 }}>
              <span style={{ color: '#81C784' }}>● 4 Hướng Cát (Sinh Khí, Thiên Y, Diên Niên, Phục Vị)</span>
              <span style={{ color: '#EF9A9A' }}>● 4 Hướng Hung (Cần Tránh/Hóa Giải)</span>
            </div>
          </div>

          {/* Kua Summary Profile */}
          <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 24, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                HỒ SƠ BÁT TRẠCH BẢN MỆNH
              </span>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(201,168,76,0.2)', color: '#F4E3B2', fontSize: 13, fontWeight: 700 }}>
                Quái số {guaInfo.guaNumber} · {guaInfo.group}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 32, color: '#F4E3B2', margin: '0 0 12px 0' }}>
              Cung {guaInfo.name} ({guaInfo.zh}) — Hành {guaInfo.element}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div style={{ fontSize: 11, color: '#8C93A8' }}>Màu Sắc Hợp Mệnh</div>
                <div style={{ fontSize: 14, color: '#F4E3B2', fontWeight: 600, marginTop: 4 }}>{guaInfo.colors}</div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div style={{ fontSize: 11, color: '#8C93A8' }}>Con Số May Mắn</div>
                <div style={{ fontSize: 14, color: '#c9a84c', fontWeight: 700, marginTop: 4 }}>{guaInfo.luckyNums}</div>
              </div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: 'rgba(201,168,76,0.08)', borderLeft: '3px solid #c9a84c', fontSize: 13.5, color: '#D5DAE5', lineHeight: 1.6 }}>
              <strong>Bí quyết bố trí Phong Thủy cho người mệnh {guaInfo.name}:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 18 }}>
                <li><strong>Cửa chính & Bàn làm việc:</strong> Ưu tiên quay về hướng <strong>{guaInfo.good[0].dir} ({guaInfo.good[0].star})</strong> hoặc <strong>{guaInfo.good[2].dir} ({guaInfo.good[2].star})</strong>.</li>
                <li><strong>Giường ngủ & Phòng thờ:</strong> Đại cát khi đặt tại hướng <strong>{guaInfo.good[1].dir} ({guaInfo.good[1].star})</strong> hoặc <strong>{guaInfo.good[3].dir} ({guaInfo.good[3].star})</strong>.</li>
                <li><strong>Bếp nấu (Tọa hung hướng cát):</strong> Đặt tại cung xấu ({guaInfo.bad[0].dir}) và nhìn về hướng tốt ({guaInfo.good[0].dir}) để chấn hướng hung.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Good vs 4 Bad Directions Detailed Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(102,187,106,0.35)', borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#81C784', margin: '0 0 16px 0' }}>
              ★ 4 Hướng Đại Cát Đón Tài Lộc & Quý Nhân
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {guaInfo.good.map((g) => (
                <div key={g.dir} style={{ padding: 14, borderRadius: 12, background: 'rgba(67,160,71,0.08)', border: '1px solid rgba(102,187,106,0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ color: '#F4E3B2', fontSize: 15 }}>{g.dir} — {g.star}</strong>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'rgba(67,160,71,0.25)', color: '#81C784', fontWeight: 700 }}>{g.rank}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#C5C9D6', lineHeight: 1.5 }}>{g.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(239,83,80,0.35)', borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#EF9A9A', margin: '0 0 16px 0' }}>
              ✕ 4 Hướng Hung Khí Cần Hóa Giải
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {guaInfo.bad.map((b) => (
                <div key={b.dir} style={{ padding: 14, borderRadius: 12, background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(239,83,80,0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ color: '#F4E3B2', fontSize: 15 }}>{b.dir} — {b.star}</strong>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'rgba(229,57,53,0.22)', color: '#EF9A9A', fontWeight: 700 }}>Hóa giải</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#C5C9D6', lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
