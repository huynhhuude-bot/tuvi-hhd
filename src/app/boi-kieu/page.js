'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { BOI_KIEU_VERSES } from '../../data/phase3MetaphysicsData';

export default function BoiKieuPage() {
  const [topic, setTopic] = useState('Công Danh & Tài Lộc');
  const [verse, setVerse] = useState(BOI_KIEU_VERSES[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);

  const handleDrawKieu = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * BOI_KIEU_VERSES.length);
      setVerse(BOI_KIEU_VERSES[randomIdx]);
      setIsDrawing(false);
    }, 350);
  };

  const handleDownloadKieuCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 1200;

    // Background Imperial Crimson & Gold
    const grad = ctx.createLinearGradient(0, 0, 0, 1200);
    grad.addColorStop(0, '#3B0A0A');
    grad.addColorStop(0.5, '#1F0808');
    grad.addColorStop(1, '#100505');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 1200);

    // Double Gold Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 840, 1140);
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, 808, 1108);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 26px serif';
    ctx.textAlign = 'center';
    ctx.fillText('LẨY KIỀU CỔ TRUYỀN · ĐẠI THI HÀO NGUYỄN DU', 450, 120);

    ctx.fillStyle = '#FFD54F';
    ctx.font = 'bold 30px serif';
    ctx.fillText(`Quẻ Số ${verse.id} — ${verse.omen}`, 450, 185);

    ctx.fillStyle = '#FFF8E1';
    ctx.font = 'italic bold 42px serif';
    ctx.fillText(`"${verse.couple1}"`, 450, 340);
    ctx.fillText(`"${verse.couple2}"`, 450, 410);

    ctx.fillStyle = '#E8D5A3';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Sở cầu: ${topic}`, 450, 500);

    // Wrap interpretation
    ctx.fillStyle = '#F4E3B2';
    ctx.font = '25px serif';
    const words = `${verse.general} Lời khuyên: ${verse.advice}`.split(' ');
    let line = '';
    let y = 610;
    words.forEach((w) => {
      const test = line + w + ' ';
      if (ctx.measureText(test).width > 720) {
        ctx.fillText(line, 450, y);
        line = w + ' ';
        y += 42;
      } else {
        line = test;
      }
    });
    ctx.fillText(line, 450, y);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('HHD TỬ VI ĐẨU SỐ · CÔNG TY TRUYỀN THÔNG K94 (Zalo: 0983.339.397)', 450, 1100);

    const link = document.createElement('a');
    link.download = `que-kieu-hhd-k94-${verse.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Lẩy Kiều & Bói Kiều Nguyễn Du</span>
          </Link>
          <a href="https://zalo.me/0983339397" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, textDecoration: 'none' }}>
            🖼️ Đặt In Tranh Lụa Thơ Kiều K94: 0983.339.397
          </a>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Tinh Hoa Văn Học Cổ Điển Việt Nam · Lẩy Kiều Luận Vận Thời
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px' }}>
            Bói Kiều Cổ Truyền · Mở Trang Truyện Kiều Luận Giải Sở Cầu
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            Thành tâm chọn lĩnh vực sở cầu, tĩnh tâm niệm nguyện và bấm mở sách Truyện Kiều để đón nhận cặp câu lục bát ứng nghiệm cho bạn.
          </p>
        </div>

        {/* Topic Selection + Draw Button */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 20, padding: 22, marginBottom: 26, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            {['Công Danh & Tài Lộc', 'Kinh Doanh Khởi Sự', 'Tình Duyên & Gia Đạo', 'Xuất Hành & Hợp Tác', 'Vận Thời Tổng Quát'].map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 99,
                  border: topic === t ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                  background: topic === t ? 'rgba(201,168,76,0.22)' : '#141722',
                  color: topic === t ? '#F4E3B2' : '#9DA3B4',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handleDrawKieu}
            style={{
              padding: '13px 28px',
              borderRadius: 99,
              background: 'linear-gradient(135deg, #e0c168, #b88928)',
              color: '#0B0C10',
              fontWeight: 900,
              fontSize: 15,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(201,168,76,0.35)'
            }}
          >
            {isDrawing ? '📖 Đang Lật Trang Truyện Kiều...' : '📖 Thành Tâm Lẩy Một Quẻ Kiều Mới'}
          </button>
        </div>

        {/* Verse Result Card */}
        <div style={{ background: 'linear-gradient(160deg, #270C0C 0%, #140D12 100%)', border: '2px solid #c9a84c', borderRadius: 24, padding: 30, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 99, background: 'rgba(201,168,76,0.2)', color: '#FFD54F', fontSize: 12.5, fontWeight: 800, marginBottom: 12 }}>
            QUẺ KIỀU SỐ {verse.id} · {verse.omen}
          </div>

          <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: '#FFF8E1', fontStyle: 'italic', lineHeight: 1.6, margin: '10px 0 8px' }}>
            “{verse.couple1}
            <br />
            {verse.couple2}”
          </div>
          <div style={{ fontSize: 13, color: '#c9a84c', marginBottom: 22 }}>
            — Điển tích Truyện Kiều: {verse.context} —
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, textAlign: 'left', marginBottom: 24 }}>
            <div style={{ background: 'rgba(0,0,0,0.38)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11.5, color: '#FFD54F', fontWeight: 800, marginBottom: 6 }}>✦ TỔNG LUẬN THỜI VẬN</div>
              <div style={{ fontSize: 13.5, color: '#E2E4E9', lineHeight: 1.6 }}>{verse.general}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.38)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11.5, color: '#81C784', fontWeight: 800, marginBottom: 6 }}>💼 CÔNG DANH & TÀI LỘC</div>
              <div style={{ fontSize: 13.5, color: '#E2E4E9', lineHeight: 1.6 }}>{verse.career}</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.38)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11.5, color: '#F48FB1', fontWeight: 800, marginBottom: 6 }}>🌸 TÌNH DUYÊN & LỜI KHUYÊN</div>
              <div style={{ fontSize: 13.5, color: '#E2E4E9', lineHeight: 1.6 }}>{verse.love} {verse.advice}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadKieuCard}
              style={{ padding: '11px 20px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer' }}
            >
              📥 Tải Thẻ Thơ Kiều Thư Pháp (PNG)
            </button>
            <a
              href="https://zalo.me/0983339397"
              target="_blank"
              rel="noreferrer"
              style={{ padding: '11px 20px', borderRadius: 99, border: '1px solid #c9a84c', background: 'rgba(201,168,76,0.16)', color: '#F4E3B2', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
            >
              🖼️ Đặt In Tranh Thư Pháp Đóng Khung Qua Zalo K94
            </a>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </main>
    </div>
  );
}
