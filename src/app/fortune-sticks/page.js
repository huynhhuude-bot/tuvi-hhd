'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FORTUNE_STICKS_100 } from '../../data/metaphysicsData';

export default function FortuneSticksPage() {
  const [shaking, setShaking] = useState(false);
  const [drawnStick, setDrawnStick] = useState(FORTUNE_STICKS_100[0]);
  const [prayer, setPrayer] = useState('');
  const [manualNumber, setManualNumber] = useState('1');

  const shakeCylinder = () => {
    if (shaking) return;
    setShaking(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * FORTUNE_STICKS_100.length);
      setDrawnStick(FORTUNE_STICKS_100[idx]);
      setManualNumber(String(FORTUNE_STICKS_100[idx].number));
      setShaking(false);
    }, 650);
  };

  const selectByNumber = (numStr) => {
    setManualNumber(numStr);
    const n = parseInt(numStr, 10);
    if (n >= 1 && n <= 100) {
      setDrawnStick(FORTUNE_STICKS_100[n - 1]);
    }
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '90px' }}>
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          borderBottom: '1px solid rgba(184,146,42,0.15)',
          background: 'var(--bg-page)',
        }}
      >
        <Link
          href="/calligraphy"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          ← Xin Chữ Ông Đồ
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          GIEO QUẺ XĂM CỔ LINH THIÊNG · 100 QUẺ
        </div>
        <Link
          href="/almanac"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Lịch Vạn Niên →
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ac)',
              letterSpacing: '0.28em',
              marginBottom: '8px',
            }}
          >
            BÁCH QUÁI LINH XĂM · CỔ TÍCH THánh HIỀN
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              marginBottom: '10px',
            }}
          >
            Xin Xăm Cổ Linh Thiêng HHD
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--tx-2)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Thành tâm khấn nguyện và lắc ống xăm tre để nhận 1 trong 100 quẻ xăm
            cổ truyền kèm thơ Lục Bát, điển tích xưa và lời bàn 5 phương diện.
          </p>
        </div>

        {/* Khu vực Ống xăm tre & Nút lắc */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(184,146,42,0.22)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Hình Ống Xăm SVG */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div
                style={{
                  transform: shaking
                    ? 'rotate(-10deg) translateY(-8px)'
                    : 'rotate(0deg)',
                  transition: 'transform 0.15s ease-in-out',
                }}
              >
                <svg width="130" height="175" viewBox="0 0 130 175">
                  {/* Các thẻ xăm nhô lên */}
                  <rect x="36" y="10" width="8" height="65" rx="3" fill="#fde68a" stroke="#92400e" />
                  <rect x="48" y="4" width="8" height="65" rx="3" fill="#fef08a" stroke="#92400e" />
                  <rect x="61" y="0" width="9" height="72" rx="3" fill="#fca5a5" stroke="#991b1b" />
                  <rect x="74" y="6" width="8" height="65" rx="3" fill="#fde68a" stroke="#92400e" />
                  <rect x="86" y="12" width="8" height="65" rx="3" fill="#fef08a" stroke="#92400e" />
                  {/* Thân ống xăm */}
                  <rect
                    x="26"
                    y="52"
                    width="78"
                    height="112"
                    rx="12"
                    fill="#7c2d12"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  <line x1="26" y1="74" x2="104" y2="74" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="26" y1="142" x2="104" y2="142" stroke="#f59e0b" strokeWidth="2" />
                  <text
                    x="65"
                    y="105"
                    textAnchor="middle"
                    fill="#fde68a"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    靈籤
                  </text>
                  <text
                    x="65"
                    y="126"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    HHD
                  </text>
                </svg>
              </div>
            </div>

            {/* Khấn nguyện & Rút xăm */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'var(--ac)',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  ✦ Lời khấn nguyện trong tâm:
                </label>
                <input
                  type="text"
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  placeholder="Nhập điều bạn đang cầu nguyện (Bình an, Công danh, Tài lộc, Tình duyên...)"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-page)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    color: 'var(--tx-0)',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={shakeCylinder}
                  disabled={shaking}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '999px',
                    background:
                      'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: '1px solid #fca5a5',
                    cursor: 'pointer',
                  }}
                >
                  {shaking ? '🎋 Đang lắc ống xăm...' : '🎋 Chắp Tay Lắc Ống Xăm'}
                </button>

                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '12px', color: 'var(--tx-2)' }}>
                    Hoặc chọn quẻ số (1–100):
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={manualNumber}
                    onChange={(e) => selectByNumber(e.target.value)}
                    style={{
                      width: '72px',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: 'var(--bg-page)',
                      border: '1px solid rgba(184,146,42,0.3)',
                      color: 'var(--tx-0)',
                      fontSize: '13px',
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thẻ Quẻ Xăm Kết Quả */}
        {drawnStick && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid rgba(184,146,42,0.35)',
              borderRadius: '18px',
              padding: '28px',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6" style={{ borderBottom: '1px dashed rgba(184,146,42,0.25)' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--ac)', letterSpacing: '0.2em', fontWeight: 700 }}>
                  LINH XĂM CỔ TRUYỀN · ĐIỂN TÍCH XƯA
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--tx-0)', marginTop: '4px' }}>
                  {drawnStick.numLabel} · {drawnStick.story}
                </h2>
              </div>
              <span
                style={{
                  fontSize: '13px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: `${drawnStick.color}20`,
                  border: `1px solid ${drawnStick.color}`,
                  color: drawnStick.color,
                  fontWeight: 700,
                }}
              >
                {drawnStick.rank}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(184,146,42,0.06)',
                  border: '1px solid rgba(184,146,42,0.18)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--ac)', fontWeight: 700, marginBottom: '6px' }}>
                  NGUYÊN BẢN HÁN VĂN
                </div>
                <pre
                  style={{
                    fontSize: '16px',
                    color: 'var(--tx-0)',
                    fontFamily: '"Noto Serif SC", serif',
                    lineHeight: 1.9,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {drawnStick.poemZh}
                </pre>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(184,146,42,0.06)',
                  border: '1px solid rgba(184,146,42,0.18)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--ac)', fontWeight: 700, marginBottom: '6px' }}>
                  PHIÊN ÂM HÁN VIỆT
                </div>
                <pre
                  style={{
                    fontSize: '13px',
                    color: 'var(--tx-1)',
                    fontFamily: '"Noto Serif", serif',
                    lineHeight: 1.9,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {drawnStick.poemHv}
                </pre>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(184,146,42,0.1)',
                  border: '1px solid rgba(184,146,42,0.28)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--ac)', fontWeight: 700, marginBottom: '6px' }}>
                  THƠ DỊCH TRUYỀN THỐNG
                </div>
                <pre
                  style={{
                    fontSize: '14px',
                    color: 'var(--tx-0)',
                    fontWeight: 600,
                    fontFamily: '"Noto Serif", serif',
                    lineHeight: 1.9,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {drawnStick.poemVi}
                </pre>
              </div>
            </div>

            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(184,146,42,0.08)',
                borderLeft: '3px solid var(--ac)',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--ac)', fontWeight: 700, marginBottom: '4px' }}>
                TỔNG LUẬN QUẺ XĂM HHD
              </div>
              <p style={{ fontSize: '14px', color: 'var(--tx-0)', lineHeight: 1.8, margin: 0 }}>
                {drawnStick.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ['Công danh & Sự nghiệp', drawnStick.aspects.congDanh],
                ['Tài lộc & Kinh doanh', drawnStick.aspects.taiLoc],
                ['Tình duyên & Gia đạo', drawnStick.aspects.tinhDuyen],
                ['Xuất hành & Sức khỏe', `${drawnStick.aspects.xuatHanh} ${drawnStick.aspects.sucKhoe}`],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'var(--bg-page)',
                    border: '1px solid rgba(184,146,42,0.16)',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ac)', marginBottom: '4px' }}>
                    ✦ {title}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--tx-1)', lineHeight: 1.7, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
