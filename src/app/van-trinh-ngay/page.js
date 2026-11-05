'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getDailyZodiacHoroscope } from '../../data/phase3MetaphysicsData';

export default function VanTrinhNgayPage() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [selectedBranch, setSelectedBranch] = useState('Ngọ');

  const dailyData = useMemo(() => getDailyZodiacHoroscope(selectedDate), [selectedDate]);
  const currentAnimal =
    dailyData.results.find((r) => r.branch === selectedBranch) || dailyData.results[0];

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Vận Trình 12 Con Giáp Hàng Ngày</span>
          </Link>
          <span style={{ fontSize: 13, color: '#FFD54F', fontWeight: 700 }}>
            📅 {dailyData.dateFormatted} · {dailyData.dayCanChi}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Năng Lượng Can Chi Hàng Ngày · Màu Sắc & Giờ Xuất Hành Đại Cát
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Xem Vận Trình Tài Lộc & Quý Nhân 12 Con Giáp Hôm Nay
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: '#9DA3B4' }}>Chọn ngày xem:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}
            />
          </div>
        </div>

        {/* 12 Zodiac Selector Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: 10, marginBottom: 26 }}>
          {dailyData.results.map((item) => {
            const active = item.branch === selectedBranch;
            return (
              <button
                key={item.branch}
                onClick={() => setSelectedBranch(item.branch)}
                style={{
                  padding: '12px 10px',
                  borderRadius: 14,
                  background: active ? 'rgba(201,168,76,0.22)' : 'rgba(20,22,30,0.88)',
                  border: active ? '1.5px solid #c9a84c' : '1px solid rgba(255,255,255,0.08)',
                  color: '#F4E3B2',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{item.name}</div>
                <div style={{ fontSize: 10.5, color: item.statusColor, fontWeight: 700, marginTop: 2 }}>
                  {item.relation}
                </div>
              </button>
            );
          })}
        </div>

        {/* Highlighted Zodiac Card */}
        {currentAnimal && (
          <div style={{ background: 'linear-gradient(155deg, rgba(22,25,36,0.96), rgba(13,15,22,0.98))', border: '1.5px solid #c9a84c', borderRadius: 24, padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 44 }}>{currentAnimal.icon}</span>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 26, color: '#F4E3B2', margin: 0 }}>
                    {currentAnimal.name} — {dailyData.dayCanChi}
                  </h2>
                  <div style={{ fontSize: 13, color: currentAnimal.statusColor, fontWeight: 800, marginTop: 4 }}>
                    ✦ Cục diện hôm nay: {currentAnimal.relation} ({currentAnimal.statusBadge})
                  </div>
                </div>
              </div>
              <Link
                href="/vat-pham-phong-thuy"
                style={{ padding: '9px 16px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 12.5, textDecoration: 'none' }}
              >
                🛍️ Vật Phẩm Kích Lộc Tuổi {currentAnimal.branch} →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#11131C', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 11.5, color: '#9DA3B4' }}>CHỈ SỐ TÀI LỘC</div>
                <div style={{ fontSize: 20, color: '#FFD54F', letterSpacing: 2 }}>{renderStars(currentAnimal.wealthStars)}</div>
              </div>
              <div style={{ background: '#11131C', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 11.5, color: '#9DA3B4' }}>CÔNG DANH SỰ NGHIỆP</div>
                <div style={{ fontSize: 20, color: '#81C784', letterSpacing: 2 }}>{renderStars(currentAnimal.careerStars)}</div>
              </div>
              <div style={{ background: '#11131C', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 11.5, color: '#9DA3B4' }}>NHÂN DUYÊN & GIA ĐẠO</div>
                <div style={{ fontSize: 20, color: '#F48FB1', letterSpacing: 2 }}>{renderStars(currentAnimal.loveStars)}</div>
              </div>
            </div>

            <p style={{ fontSize: 15, color: '#E2E4E9', lineHeight: 1.7, background: 'rgba(201,168,76,0.08)', padding: 16, borderRadius: 14, borderLeft: '3px solid #c9a84c', margin: '0 0 18px' }}>
              {currentAnimal.summary}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              <div style={{ background: '#11131C', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 800 }}>👕 MÀU TRANG PHỤC MAY MẮN HÔM NAY</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: currentAnimal.luckyHex, marginTop: 4 }}>{currentAnimal.luckyColors}</div>
              </div>
              <div style={{ background: '#11131C', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 800 }}>🤝 CON GIÁP QUÝ NHÂN HỢP TÁC</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#81C784', marginTop: 4 }}>Tuổi {currentAnimal.noblePartners}</div>
              </div>
              <div style={{ background: '#11131C', borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 800 }}>🧭 HƯỚNG TÀI THẦN & GIỜ TỐT</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F4E3B2', marginTop: 4 }}>{currentAnimal.luckyDirection} · {currentAnimal.luckyHours}</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
