'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const MERIT_PHRASES = [
  '+1 Tâm An',
  '+1 Phước Báu',
  '+1 Trí Tuệ Sáng',
  '+1 Tịnh Niệm',
  '+1 Hỷ Lạc',
  '+1 Bình An Gia Đạo'
];

export default function TinhTamPage() {
  const [beadCount, setBeadCount] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [soundMode, setSoundMode] = useState('mo'); // 'mo' | 'chuong'
  const [autoMode, setAutoMode] = useState(false);
  const [floatingText, setFloatingText] = useState('');
  const [tapScale, setTapScale] = useState(false);
  const audioCtxRef = useRef(null);

  const playMeditationSound = (mode) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (mode === 'mo') {
        // Warm hollow wooden fish sound (Mõ gỗ cổ tự)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.09);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else {
        // Resonant Tibetan / Zen Bell (Chuông đồng 528Hz)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, now);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.85);
      }
    } catch {
      // Ignore audio errors
    }
  };

  const handleTap = () => {
    playMeditationSound(soundMode);
    setTapScale(true);
    setTimeout(() => setTapScale(false), 120);

    const phrase = MERIT_PHRASES[Math.floor(Math.random() * MERIT_PHRASES.length)];
    setFloatingText(phrase);

    setBeadCount((prev) => {
      const next = prev + 1;
      if (next >= 108) {
        setRoundCount((r) => r + 1);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (!autoMode) return;
    const interval = setInterval(() => {
      handleTap();
    }, 1200);
    return () => clearInterval(interval);
  }, [autoMode, soundMode]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Không Gian Tĩnh Tâm · Gõ Mõ & Lần Chuỗi 108 Hạt</span>
          </Link>
          <Link href="/vat-pham-phong-thuy" style={{ fontSize: 13, color: '#FFD54F', fontWeight: 700, textDecoration: 'none' }}>
            📿 Thỉnh Chuỗi Trầm Hương 108 Hạt Thật →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
          Thiền Định Giữa Đời Thường · Buông Bỏ Âu Lo · Tích Tạo Phước Lành
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
          Gõ Mõ Tĩnh Tâm & Lần Chuỗi Trầm Hương 108 Hạt
        </h1>
        <p style={{ color: '#9DA3B4', maxWidth: 640, margin: '0 auto 24px', lineHeight: 1.6 }}>
          Chạm vào Mõ Gỗ hoặc Chuỗi Trầm Hương để lắng nghe âm thanh mộc mạc giúp giải tỏa căng thẳng, định tâm sáng trí.
        </p>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          <button
            onClick={() => setSoundMode('mo')}
            style={{
              padding: '9px 18px',
              borderRadius: 99,
              border: soundMode === 'mo' ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
              background: soundMode === 'mo' ? 'rgba(201,168,76,0.22)' : '#141722',
              color: '#F4E3B2',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🪵 Tiếng Mõ Gỗ Cổ Tự
          </button>
          <button
            onClick={() => setSoundMode('chuong')}
            style={{
              padding: '9px 18px',
              borderRadius: 99,
              border: soundMode === 'chuong' ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
              background: soundMode === 'chuong' ? 'rgba(201,168,76,0.22)' : '#141722',
              color: '#F4E3B2',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🔔 Tiếng Chuông Thiền 528Hz
          </button>
          <button
            onClick={() => setAutoMode(!autoMode)}
            style={{
              padding: '9px 18px',
              borderRadius: 99,
              border: autoMode ? '1px solid #66BB6A' : '1px solid rgba(255,255,255,0.12)',
              background: autoMode ? 'rgba(102,187,106,0.22)' : '#141722',
              color: autoMode ? '#81C784' : '#9DA3B4',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {autoMode ? '⏸ Đang Tự Động Gõ Nhịp Thiền' : '▶ Bật Tự Động Gõ Nhịp Thiền'}
          </button>
        </div>

        {/* Interactive Wooden Fish & 108 Mala Ring */}
        <div style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.14) 0%, rgba(16,18,26,0.96) 70%)', border: '1.5px solid rgba(201,168,76,0.4)', borderRadius: 28, padding: '36px 20px', maxWidth: 640, margin: '0 auto 28px' }}>
          <div style={{ height: 28, fontSize: 16, fontWeight: 800, color: '#FFD54F', marginBottom: 8 }}>
            {floatingText || '✨ Chạm vào tâm vòng chuỗi để bắt đầu tĩnh tâm'}
          </div>

          <div style={{ position: 'relative', width: 260, height: 260, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 36 visual beads representing the 108 Mala circle */}
            {Array.from({ length: 36 }).map((_, idx) => {
              const angle = (idx / 36) * Math.PI * 2 - Math.PI / 2;
              const r = 112;
              const x = 130 + r * Math.cos(angle);
              const y = 130 + r * Math.sin(angle);
              const passed = idx <= Math.floor((beadCount / 108) * 36);
              return (
                <span
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: x - 6,
                    top: y - 6,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: passed ? 'radial-gradient(circle, #FFD54F, #B8860B)' : '#3E2723',
                    border: '1px solid rgba(201,168,76,0.5)',
                    boxShadow: passed ? '0 0 8px rgba(255,213,79,0.6)' : 'none'
                  }}
                />
              );
            })}

            <button
              onClick={handleTap}
              style={{
                width: 156,
                height: 156,
                borderRadius: '50%',
                border: '2px solid #c9a84c',
                background: 'linear-gradient(145deg, #2D1E14, #17100B)',
                color: '#F4E3B2',
                cursor: 'pointer',
                transform: tapScale ? 'scale(0.93)' : 'scale(1)',
                transition: 'transform 0.1s ease',
                boxShadow: '0 14px 36px rgba(0,0,0,0.75)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
              }}
            >
              <span style={{ fontSize: 44 }}>{soundMode === 'mo' ? '📿' : '🔔'}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFD54F' }}>CHẠM TĨNH TÂM</span>
              <span style={{ fontSize: 11, color: '#9DA3B4' }}>{beadCount} / 108 hạt</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 14 }}>
            <div>
              Hạt hiện tại: <strong style={{ color: '#FFD54F', fontSize: 18 }}>{beadCount} / 108</strong>
            </div>
            <div>
              Số vòng viên mãn (108 hạt): <strong style={{ color: '#81C784', fontSize: 18 }}>{roundCount} vòng</strong>
            </div>
          </div>
        </div>

        {/* Affiliate CTA for Real 108 Agarwood Bracelet */}
        <div style={{ background: 'rgba(20,22,30,0.92)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 20, padding: 22, maxWidth: 640, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, textAlign: 'left' }}>
          <div>
            <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 800 }}>PHÁP KHÍ HỘ THÂN & AN THẦN THẬT</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#F4E3B2', margin: '4px 0' }}>
              📿 Thỉnh Vòng Tay Trầm Hương Tự Nhiên 108 Hạt Đeo Tay Hộ Mệnh
            </div>
            <div style={{ fontSize: 12.5, color: '#9DA3B4' }}>
              Hương trầm tự nhiên giúp giảm căng thẳng, ngủ sâu giấc và chiêu quý nhân tài lộc.
            </div>
          </div>
          <Link
            href="/vat-pham-phong-thuy"
            style={{ padding: '10px 18px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}
          >
            🛒 Xem Giá Ưu Đãi →
          </Link>
        </div>
      </main>
    </div>
  );
}
