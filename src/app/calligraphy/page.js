'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { CALLIGRAPHY_CHARS } from '../../data/metaphysicsData';

const PAPER_STYLES = [
  {
    id: 'crimson',
    label: 'Đỏ Chu Sa Cung Đình',
    bg: 'radial-gradient(circle at 50% 35%, #b91c1c 0%, #7f1d1d 65%, #450a0a 100%)',
    border: '#fbbf24',
    mainColor: '#fef08a',
    subColor: '#fde68a',
    sealBg: '#fbbf24',
    sealText: '#7f1d1d',
  },
  {
    id: 'gold',
    label: 'Giấy Tuyên Chỉ Hoàng Kim',
    bg: 'radial-gradient(circle at 50% 35%, #fef3c7 0%, #fde68a 65%, #f59e0b 100%)',
    border: '#92400e',
    mainColor: '#1c1917',
    subColor: '#451a03',
    sealBg: '#b91c1c',
    sealText: '#fef3c7',
  },
  {
    id: 'imperial',
    label: 'Huyền Mặc Đế Vương',
    bg: 'radial-gradient(circle at 50% 35%, #1e293b 0%, #0f172a 70%, #020617 100%)',
    border: '#d4a843',
    mainColor: '#ffe8a0',
    subColor: '#cbd5e1',
    sealBg: '#dc2626',
    sealText: '#fff',
  },
];

export default function CalligraphyPage() {
  const [selectedId, setSelectedId] = useState(CALLIGRAPHY_CHARS[0].id);
  const [recipientName, setRecipientName] = useState('');
  const [birthYear, setBirthYear] = useState('1990');
  const [wishText, setWishText] = useState('');
  const [paperId, setPaperId] = useState('crimson');
  const [exporting, setExporting] = useState(false);
  const scrollRef = useRef(null);

  const currentChar =
    CALLIGRAPHY_CHARS.find((c) => c.id === selectedId) || CALLIGRAPHY_CHARS[0];
  const paper =
    PAPER_STYLES.find((p) => p.id === paperId) || PAPER_STYLES[0];

  const autoPickByDestiny = () => {
    const y = parseInt(birthYear, 10) || 1990;
    const w = wishText.toLowerCase();
    if (w.includes('tiền') || w.includes('lộc') || w.includes('kinh doanh')) {
      setSelectedId('loc');
      return;
    }
    if (w.includes('bình an') || w.includes('gia đình')) {
      setSelectedId('an');
      return;
    }
    if (w.includes('thi') || w.includes('học') || w.includes('quan')) {
      setSelectedId('dat');
      return;
    }
    if (w.includes('sức khỏe') || w.includes('cha mẹ')) {
      setSelectedId('tho');
      return;
    }
    const idx = Math.abs(y) % CALLIGRAPHY_CHARS.length;
    setSelectedId(CALLIGRAPHY_CHARS[idx].id);
  };

  const downloadScrollPng = async () => {
    if (!scrollRef.current || exporting) return;
    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(scrollRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.download = `Thu-Phap-HHD-${currentChar.charVi}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
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
          href="/divination"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          ← Khai Quẻ Kinh Dịch
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          XIN CHỮ ÔNG ĐỒ HHD · THƯ PHÁP KHAI BÚT
        </div>
        <Link
          href="/fortune-sticks"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Rút Xăm Cổ →
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ac)',
              letterSpacing: '0.28em',
              marginBottom: '8px',
            }}
          >
            THƯ ĐẠO ĐÔNG PHƯƠNG · ẤN CHƯƠNG HHD
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              marginBottom: '10px',
            }}
          >
            Xin Chữ Ông Đồ HHD
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
            Chọn đại tự hợp mệnh hoặc nhập tâm nguyện để Ông Đồ HHD khai bút đề
            tặng bức liễn thư pháp kèm câu đối và ấn chương chu sa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột điều khiển bên trái */}
          <div
            className="lg:col-span-5 space-y-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(184,146,42,0.22)',
              borderRadius: '16px',
              padding: '22px',
            }}
          >
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
                1. Họ tên người nhận chữ (Đề lạc khoản):
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="VD: Gia chủ Nguyễn Văn A"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-page)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  color: 'var(--tx-0)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'var(--tx-2)',
                    marginBottom: '5px',
                  }}
                >
                  Năm sinh:
                </label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: '10px',
                    background: 'var(--bg-page)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    color: 'var(--tx-0)',
                    fontSize: '13px',
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: 'var(--tx-2)',
                    marginBottom: '5px',
                  }}
                >
                  Tâm nguyện cầu xin:
                </label>
                <input
                  type="text"
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Tài lộc, Bình an, Thi cử..."
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: 'var(--bg-page)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    color: 'var(--tx-0)',
                    fontSize: '13px',
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={autoPickByDestiny}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                background: 'rgba(184,146,42,0.14)',
                border: '1px solid rgba(184,146,42,0.4)',
                color: 'var(--ac)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              🖌️ Nhờ Ông Đồ HHD Chọn Chữ Hợp Tuổi &amp; Tâm Nguyện
            </button>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                2. Chọn Đại Tự Thư Pháp (12 Chữ Vàng):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {CALLIGRAPHY_CHARS.map((c) => {
                  const active = c.id === selectedId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '10px',
                        background: active
                          ? 'linear-gradient(135deg, #d4a843, #9a6b15)'
                          : 'var(--bg-page)',
                        border: active
                          ? '1px solid #ffe8a0'
                          : '1px solid rgba(184,146,42,0.2)',
                        color: active ? '#fff' : 'var(--tx-1)',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '18px', fontWeight: 700 }}>
                        {c.charZh}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        {c.charVi}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                3. Chọn màu giấy tuyên chỉ:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PAPER_STYLES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaperId(p.id)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background:
                        p.id === paperId
                          ? 'rgba(184,146,42,0.18)'
                          : 'var(--bg-page)',
                      border:
                        p.id === paperId
                          ? '1px solid var(--ac)'
                          : '1px solid rgba(184,146,42,0.2)',
                      color: 'var(--tx-1)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={downloadScrollPng}
              disabled={exporting}
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #d4a843 0%, #9a6b15 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {exporting ? 'Đang kết xuất bức trướng...' : '📥 Tải Tranh Thư Pháp HHD (PNG)'}
            </button>
          </div>

          {/* Bức Liễn Thư Pháp bên phải */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={scrollRef}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: paper.bg,
                border: `4px double ${paper.border}`,
                borderRadius: '18px',
                padding: '32px 26px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                position: 'relative',
                color: paper.mainColor,
              }}
            >
              {/* Tiêu đề bức liễn */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  color: paper.subColor,
                  marginBottom: '16px',
                  fontWeight: 700,
                }}
              >
                ✦ THƯ PHÁP KHAI BÚT · HỆ THỐNG HHD ĐẨU SỐ ✦
              </div>

              {/* Khung trung tâm: 2 câu đối dọc + Đại tự ở giữa */}
              <div className="grid grid-cols-12 gap-2 items-center my-4">
                {/* Thượng liên */}
                <div
                  className="col-span-2 flex flex-col items-center justify-center py-3 px-1 rounded-lg"
                  style={{
                    border: `1px solid ${paper.border}55`,
                    background: 'rgba(0,0,0,0.12)',
                  }}
                >
                  {currentChar.coupletLeft.split(' ').map((word, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: paper.subColor,
                        lineHeight: 1.55,
                        fontFamily: '"Noto Serif", Georgia, serif',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Đại tự trung tâm */}
                <div className="col-span-8 flex flex-col items-center justify-center text-center px-2">
                  <div
                    style={{
                      width: '185px',
                      height: '185px',
                      borderRadius: '50%',
                      border: `2px dashed ${paper.border}88`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.1)',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '92px',
                        fontWeight: 700,
                        lineHeight: 1,
                        fontFamily: '"Noto Serif SC", Georgia, serif',
                        color: paper.mainColor,
                        textShadow: '0 4px 16px rgba(0,0,0,0.35)',
                      }}
                    >
                      {currentChar.charZh}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '36px',
                      fontWeight: 700,
                      fontFamily: '"Noto Serif", Georgia, serif',
                      color: paper.mainColor,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {currentChar.charVi}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: paper.subColor,
                      letterSpacing: '0.18em',
                      marginTop: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {currentChar.pinyin} · Hành {currentChar.element}
                  </div>

                  {/* Ấn chương HHD */}
                  <div
                    style={{
                      marginTop: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      background: paper.sealBg,
                      color: paper.sealText,
                      fontWeight: 800,
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      border: `1px solid ${paper.sealText}`,
                    }}
                  >
                    ẤN CHƯƠNG HHD · CTY K94 · 0983.339.397
                  </div>
                </div>

                {/* Hạ liên */}
                <div
                  className="col-span-2 flex flex-col items-center justify-center py-3 px-1 rounded-lg"
                  style={{
                    border: `1px solid ${paper.border}55`,
                    background: 'rgba(0,0,0,0.12)',
                  }}
                >
                  {currentChar.coupletRight.split(' ').map((word, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: paper.subColor,
                        lineHeight: 1.55,
                        fontFamily: '"Noto Serif", Georgia, serif',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lời giảng & Lạc khoản */}
              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: `1px solid ${paper.border}55`,
                  textAlign: 'center',
                }}
              >
                {recipientName && (
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: paper.mainColor,
                      marginBottom: '6px',
                    }}
                  >
                    Kính tặng: {recipientName} ({birthYear})
                  </div>
                )}
                <p
                  style={{
                    fontSize: '13px',
                    color: paper.subColor,
                    lineHeight: 1.7,
                    margin: '0 0 8px 0',
                  }}
                >
                  {currentChar.meaning}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: paper.mainColor,
                    margin: 0,
                  }}
                >
                  &ldquo;{currentChar.blessing}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
