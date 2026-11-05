'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ICHING_64_HEXAGRAMS } from '../../data/metaphysicsData';

const LINE_NAMES = ['Hào Sơ (Hào 1)', 'Hào Nhị (Hào 2)', 'Hào Tam (Hào 3)', 'Hào Tứ (Hào 4)', 'Hào Ngũ (Hào 5)', 'Hào Thượng (Hào 6)'];

const QUESTION_TOPICS = [
  { id: 'all', label: 'Tổng quát vận trình' },
  { id: 'career', label: 'Công danh & Sự nghiệp' },
  { id: 'wealth', label: 'Tài lộc & Kinh doanh' },
  { id: 'love', label: 'Tình duyên & Gia đạo' },
  { id: 'travel', label: 'Xuất hành & Di chuyển' },
  { id: 'project', label: 'Mưu sự & Khởi nghiệp' },
];

function tossThreeCoins() {
  // 1 = Ngửa (Yang=3), 0 = Sấp (Yin=2)
  const coins = [
    Math.random() < 0.5 ? 1 : 0,
    Math.random() < 0.5 ? 1 : 0,
    Math.random() < 0.5 ? 1 : 0,
  ];
  const sum = coins.reduce((a, b) => a + (b ? 3 : 2), 0);
  // 6 = Lão Âm (0, moving -> 1), 7 = Thiếu Dương (1, static), 8 = Thiếu Âm (0, static), 9 = Lão Dương (1, moving -> 0)
  return {
    coins,
    sum,
    bit: sum === 7 || sum === 9 ? '1' : '0',
    changedBit: sum === 9 ? '0' : sum === 6 ? '1' : sum === 7 ? '1' : '0',
    moving: sum === 6 || sum === 9,
    label:
      sum === 9
        ? 'Lão Dương (O · Hào Động)'
        : sum === 6
        ? 'Lão Âm (X · Hào Động)'
        : sum === 7
        ? 'Thiếu Dương (—)'
        : 'Thiếu Âm (- -)',
  };
}

export default function DivinationPage() {
  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('all');
  const [lines, setLines] = useState([]);
  const [isCasting, setIsCasting] = useState(false);
  const [lastCoins, setLastCoins] = useState([1, 0, 1]);

  const castSingleLine = () => {
    if (lines.length >= 6 || isCasting) return;
    setIsCasting(true);
    setTimeout(() => {
      const res = tossThreeCoins();
      setLastCoins(res.coins);
      setLines((prev) => [...prev, res]);
      setIsCasting(false);
    }, 260);
  };

  const castAllSixLines = async () => {
    if (isCasting) return;
    setLines([]);
    setIsCasting(true);
    const nextLines = [];
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 180));
      const res = tossThreeCoins();
      nextLines.push(res);
      setLastCoins(res.coins);
      setLines([...nextLines]);
    }
    setIsCasting(false);
  };

  const castMaiHoaTime = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const upperIdx = (y + m + d) % 8;
    const lowerIdx = (y + m + d + h) % 8;
    const movingIdx = (y + m + d + h) % 6;
    const trigrams = ['111', '011', '101', '001', '110', '010', '100', '000'];
    const baseBin = trigrams[lowerIdx] + trigrams[upperIdx];
    const generated = baseBin.split('').map((bit, idx) => {
      const isMov = idx === movingIdx;
      return {
        coins: bit === '1' ? [1, 1, 0] : [0, 0, 1],
        sum: isMov ? (bit === '1' ? 9 : 6) : bit === '1' ? 7 : 8,
        bit,
        changedBit: isMov ? (bit === '1' ? '0' : '1') : bit,
        moving: isMov,
        label: isMov
          ? bit === '1'
            ? 'Lão Dương (O · Hào Động)'
            : 'Lão Âm (X · Hào Động)'
          : bit === '1'
          ? 'Thiếu Dương (—)'
          : 'Thiếu Âm (- -)',
      };
    });
    setLines(generated);
  };

  const resetHexagram = () => {
    setLines([]);
  };

  const isComplete = lines.length === 6;
  const primaryBin = isComplete ? lines.map((l) => l.bit).join('') : '';
  const changedBin = isComplete ? lines.map((l) => l.changedBit).join('') : '';
  const hasMoving = lines.some((l) => l.moving);

  const primaryHex = isComplete
    ? ICHING_64_HEXAGRAMS[primaryBin] || ICHING_64_HEXAGRAMS['111111']
    : null;
  const changedHex =
    isComplete && hasMoving
      ? ICHING_64_HEXAGRAMS[changedBin] || ICHING_64_HEXAGRAMS['000000']
      : null;

  const selectedTopicObj =
    QUESTION_TOPICS.find((t) => t.id === topic) || QUESTION_TOPICS[0];

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
          href="/"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          ← Trang chủ HHD
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          KHAI QUẺ KINH DỊCH · LỤC HÀO &amp; MAI HOA
        </div>
        <Link
          href="/calligraphy"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Xin Chữ Ông Đồ →
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
            CHU DỊCH LỤC THẬP TỨ QUÁI · HỆ THỐNG HHD
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              marginBottom: '10px',
            }}
          >
            Gieo Quẻ Kinh Dịch Vấn Sự
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
            Tĩnh tâm niệm việc cần hỏi, gieo 3 đồng xu cổ Càn Long Thông Bảo đủ 6
            hào (hoặc lập quẻ Mai Hoa theo giờ động tâm) để thấu tỏ Bản Quẻ, Biến
            Quẻ và thời cơ hành động.
          </p>
        </div>

        {/* Khung nhập tâm nguyện & gieo xu */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(184,146,42,0.22)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '28px',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="md:col-span-2">
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                ✦ Việc bạn đang muốn thỉnh quẻ hỏi (Tùy chọn):
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="VD: Tháng này đầu tư mở rộng kinh doanh có thuận lợi không?"
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
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                ✦ Lĩnh vực:
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-page)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  color: 'var(--tx-0)',
                  fontSize: '14px',
                }}
              >
                {QUESTION_TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3 Đồng xu cổ SVG */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex items-center gap-6 mb-5">
              {lastCoins.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 30% 30%, #ffe8a0, #d4a843 65%, #8a5a10)',
                    border: '3px solid #f5d073',
                    boxShadow: isCasting
                      ? '0 0 24px rgba(212,168,67,0.75)'
                      : '0 6px 16px rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                     position: 'relative',
                    transform: isCasting ? 'rotateY(180deg) scale(1.08)' : 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Lỗ vuông giữa đồng xu cổ */}
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      background: 'var(--bg-card)',
                      border: '2px solid #8a5a10',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'var(--ac)',
                    }}
                  >
                    {c === 1 ? 'DƯƠNG' : 'ÂM'}
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: '5px',
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#3b2304',
                    }}
                  >
                    乾
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#3b2304',
                    }}
                  >
                    隆
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {lines.length < 6 && (
                <button
                  type="button"
                  onClick={castSingleLine}
                  disabled={isCasting}
                  style={{
                    padding: '11px 22px',
                    borderRadius: '999px',
                    background:
                      'linear-gradient(135deg, #d4a843 0%, #9a6b15 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                  }}
                >
                  🪙 Gieo Hào Thứ {lines.length + 1} / 6
                </button>
              )}
              <button
                type="button"
                onClick={castAllSixLines}
                disabled={isCasting}
                style={{
                  padding: '11px 22px',
                  borderRadius: '999px',
                  background: 'rgba(184,146,42,0.14)',
                  color: 'var(--ac)',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: '1px solid rgba(184,146,42,0.4)',
                  cursor: 'pointer',
                }}
              >
                ⚡ Gieo Trọn 6 Hào Lục Hào
              </button>
              <button
                type="button"
                onClick={castMaiHoaTime}
                disabled={isCasting}
                style={{
                  padding: '11px 20px',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: 'var(--tx-1)',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: '1px solid rgba(184,146,42,0.28)',
                  cursor: 'pointer',
                }}
              >
                🌸 Khai Quẻ Mai Hoa Theo Giờ Hiện Tại
              </button>
              {lines.length > 0 && (
                <button
                  type="button"
                  onClick={resetHexagram}
                  style={{
                    padding: '11px 16px',
                    borderRadius: '999px',
                    background: 'transparent',
                    color: 'var(--tx-3)',
                    fontSize: '12px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Gieo lại ↺
                </button>
              )}
            </div>
          </div>

          {/* Tiến trình 6 Hào từ dưới lên trên */}
          {lines.length > 0 && (
            <div
              style={{
                marginTop: '18px',
                paddingTop: '18px',
                borderTop: '1px dashed rgba(184,146,42,0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--tx-3)',
                  textAlign: 'center',
                  marginBottom: '12px',
                  letterSpacing: '0.12em',
                }}
              >
                ĐỒ HÌNH LỤC HÀO (XẾP TỪ HÀO 1 DƯỚI CÙNG LÊN HÀO 6 TRÊN CÙNG)
              </div>
              <div className="max-w-md mx-auto flex flex-col-reverse gap-2.5">
                {lines.map((l, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 px-3 py-2 rounded-lg"
                    style={{
                      background: l.moving
                        ? 'rgba(212,168,67,0.12)'
                        : 'rgba(184,146,42,0.04)',
                      border: l.moving
                        ? '1px solid rgba(212,168,67,0.4)'
                        : '1px solid rgba(184,146,42,0.12)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--tx-2)',
                        minWidth: '115px',
                      }}
                    >
                      {LINE_NAMES[idx]}
                    </span>
                    <div className="flex-1 flex items-center justify-center">
                      {l.bit === '1' ? (
                        <div
                          style={{
                            width: '120px',
                            height: '10px',
                            borderRadius: '3px',
                            background: l.moving ? '#f59e0b' : 'var(--ac)',
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-between" style={{ width: '120px' }}>
                          <div
                            style={{
                              width: '50px',
                              height: '10px',
                              borderRadius: '3px',
                              background: l.moving ? '#f59e0b' : 'var(--tx-1)',
                            }}
                          />
                          <div
                            style={{
                              width: '50px',
                              height: '10px',
                              borderRadius: '3px',
                              background: l.moving ? '#f59e0b' : 'var(--tx-1)',
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: l.moving ? 700 : 500,
                        color: l.moving ? '#f59e0b' : 'var(--tx-3)',
                        minWidth: '130px',
                        textAlign: 'right',
                      }}
                    >
                      {l.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Luận giải Bản Quẻ & Biến Quẻ */}
        {primaryHex && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bản Quẻ */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--ac)',
                      letterSpacing: '0.18em',
                      fontWeight: 700,
                    }}
                  >
                    BẢN QUẺ (HIỆN TẠI · QUẺ SỐ {primaryHex.number}/64)
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      background: 'rgba(184,146,42,0.15)',
                      color: 'var(--ac)',
                      fontWeight: 700,
                    }}
                  >
                    {primaryHex.rank}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: '26px',
                    fontWeight: 700,
                    color: 'var(--tx-0)',
                    marginBottom: '6px',
                  }}
                >
                  Quẻ {primaryHex.name}{' '}
                  <span style={{ fontSize: '18px', color: 'var(--tx-3)' }}>
                    ({primaryHex.zh})
                  </span>
                </h2>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--tx-2)',
                    marginBottom: '14px',
                  }}
                >
                  Thượng quái: <strong>{primaryHex.upper?.name}</strong> (
                  {primaryHex.upper?.nature}) · Hạ quái:{' '}
                  <strong>{primaryHex.lower?.name}</strong> (
                  {primaryHex.lower?.nature})
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(184,146,42,0.08)',
                    borderLeft: '3px solid var(--ac)',
                    borderRadius: '0 8px 8px 0',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--ac)',
                      fontWeight: 700,
                      marginBottom: '4px',
                    }}
                  >
                    THOÁN TỪ &amp; ĐẠI TƯỢNG
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--tx-0)',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {primaryHex.judgment} {primaryHex.image}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--tx-1)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {primaryHex.advice}
                </p>
              </div>

              {/* Biến Quẻ */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.22)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                {changedHex ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#60a5fa',
                          letterSpacing: '0.18em',
                          fontWeight: 700,
                        }}
                      >
                        BIẾN QUẺ (XU HƯỚNG KẾT CỤC · QUẺ SỐ {changedHex.number}
                        /64)
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: 'rgba(96,165,250,0.15)',
                          color: '#60a5fa',
                          fontWeight: 700,
                        }}
                      >
                        {changedHex.rank}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontSize: '26px',
                        fontWeight: 700,
                        color: 'var(--tx-0)',
                        marginBottom: '6px',
                      }}
                    >
                      Quẻ {changedHex.name}{' '}
                      <span style={{ fontSize: '18px', color: 'var(--tx-3)' }}>
                        ({changedHex.zh})
                      </span>
                    </h2>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--tx-2)',
                        marginBottom: '14px',
                      }}
                    >
                      Thượng quái: <strong>{changedHex.upper?.name}</strong> (
                      {changedHex.upper?.nature}) · Hạ quái:{' '}
                      <strong>{changedHex.lower?.name}</strong> (
                      {changedHex.lower?.nature})
                    </div>
                    <div
                      style={{
                        padding: '12px 16px',
                        background: 'rgba(96,165,250,0.08)',
                        borderLeft: '3px solid #60a5fa',
                        borderRadius: '0 8px 8px 0',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#60a5fa',
                          fontWeight: 700,
                          marginBottom: '4px',
                        }}
                      >
                        CHUYỂN HÓA TỪ HÀO ĐỘNG
                      </div>
                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--tx-0)',
                          margin: 0,
                          lineHeight: 1.7,
                        }}
                      >
                        {changedHex.judgment}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--tx-1)',
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {changedHex.advice}
                    </p>
                  </>
                ) : (
                  <div className="h-full flex flex-col justify-center">
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--ac)',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        marginBottom: '8px',
                      }}
                    >
                      LỤC HÀO TĨNH (KHÔNG CÓ HÀO ĐỘNG)
                    </div>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'var(--tx-2)',
                        lineHeight: 1.8,
                      }}
                    >
                      Cả 6 hào đều ở trạng thái Tĩnh, nghĩa là cục diện sự việc
                      đang rất ổn định, chưa có biến số đột ngột. Đương số chỉ
                      cần căn cứ hoàn toàn vào lời đoán của{' '}
                      <strong>Bản Quẻ ({primaryHex.name})</strong> để định liệu.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Lời bàn HHD ứng nghiệm theo câu hỏi */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.25)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  marginBottom: '10px',
                }}
              >
                ✦ LỜI ĐOÁN ỨNG NGHIỆM HHD ({selectedTopicObj.label.toUpperCase()})
              </div>
              {question && (
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--tx-0)',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}
                >
                  Câu hỏi: &ldquo;{question}&rdquo;
                </p>
              )}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--tx-1)',
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                Với Bản Quẻ <strong>{primaryHex.name}</strong> ({primaryHex.rank})
                {changedHex ? ` biến sang Quẻ ${changedHex.name} (${changedHex.rank})` : ''}, Hệ thống{' '}
                <strong>HHD</strong> khuyên bạn: Trong lĩnh vực{' '}
                <strong>{selectedTopicObj.label}</strong>, giai đoạn đầu hãy lấy
                đức tính <em>{primaryHex.lower?.attr?.toLowerCase()}</em> của nội
                quái <strong>{primaryHex.lower?.name}</strong> làm gốc, kết hợp
                với phong thái <em>{primaryHex.upper?.attr?.toLowerCase()}</em>{' '}
                của ngoại quái <strong>{primaryHex.upper?.name}</strong> khi giao
                tiếp bên ngoài.{' '}
                {changedHex
                  ? `Về hậu vận và kết quả cuối cùng sẽ chuyển sang khí tượng của quẻ ${changedHex.name}: ${changedHex.advice}`
                  : primaryHex.advice}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
