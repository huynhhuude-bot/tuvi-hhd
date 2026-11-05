'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { calculateBatTrachGua } from '../../data/metaphysicsData';

const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const BUDDHA_GUARDIANS = [
  { branch: 'Tý', buddha: 'Thiên Thủ Thiên Nhãn Bồ Tát', icon: '🪷', blessing: 'Trí tuệ viên thông, hóa giải tai ương, quý nhân vây quanh.' },
  { branch: 'Sửu', buddha: 'Hư Không Tạng Bồ Tát', icon: '☸', blessing: 'Kho tàng phúc đức mở rộng, tài lộc bền vững, tâm trí sáng suốt.' },
  { branch: 'Dần', buddha: 'Hư Không Tạng Bồ Tát', icon: '☸', blessing: 'Uy dũng kiên cường, chiêu tài tụ bảo, vạn sự hanh thông.' },
  { branch: 'Mão', buddha: 'Văn Thù Bồ Tát', icon: '🗡', blessing: 'Trí tuệ siêu việt, học nghiệp và công danh rạng rỡ.' },
  { branch: 'Thìn', buddha: 'Phổ Hiền Bồ Tát', icon: '🐘', blessing: 'Hạnh nguyện rộng lớn, công thành danh toại, phúc lộc thọ toàn.' },
  { branch: 'Tỵ', buddha: 'Phổ Hiền Bồ Tát', icon: '🐘', blessing: 'Mưu lược sâu sắc, tài vận hưng thịnh, gia đạo an khang.' },
  { branch: 'Ngọ', buddha: 'Đại Thế Chí Bồ Tát', icon: '☀', blessing: 'Ánh sáng trí tuệ soi đường, cát tường phú quý, bách chiến bách thắng.' },
  { branch: 'Mùi', buddha: 'Như Lai Đại Nhật', icon: '🌞', blessing: 'Quang minh chiếu rọi bốn phương, tiêu trừ chướng ngại, đón phúc lành.' },
  { branch: 'Thân', buddha: 'Như Lai Đại Nhật', icon: '🌞', blessing: 'Thông minh lanh lợi, quý nhân trợ mệnh, cơ nghiệp hưng long.' },
  { branch: 'Dậu', buddha: 'Bất Động Minh Vương', icon: '🔥', blessing: 'Trấn trạch trừ tà, giữ vững bản lĩnh và tài sản trước mọi sóng gió.' },
  { branch: 'Tuất', buddha: 'Phật A Di Đà', icon: '🙏', blessing: 'Từ bi vô lượng, bình an trường thọ, hậu vận viên mãn.' },
  { branch: 'Hợi', buddha: 'Phật A Di Đà', icon: '🙏', blessing: 'Phúc trạch sâu dày, cuộc đời sung túc, an nhiên tự tại.' }
];

const FIVE_FREQUENCIES = [
  { el: 'Kim', hz: 741, title: 'Chuông Đồng Hành Kim (741 Hz)', desc: 'Thanh lọc tâm trí, tăng sự quyết đoán và minh mẫn.' },
  { el: 'Mộc', hz: 528, title: 'Tần Số Hành Mộc (528 Hz)', desc: 'Tần số sinh trưởng, chữa lành và khơi nguồn sáng tạo.' },
  { el: 'Thủy', hz: 432, title: 'Tần Số Hành Thủy (432 Hz)', desc: 'Hòa hợp tự nhiên, tĩnh tâm sâu sắc và nuôi dưỡng trí tuệ.' },
  { el: 'Hỏa', hz: 639, title: 'Tần Số Hành Hỏa (639 Hz)', desc: 'Lan tỏa năng lượng ấm áp, nhân duyên và nhiệt huyết.' },
  { el: 'Thổ', hz: 396, title: 'Tần Số Hành Thổ (396 Hz)', desc: 'An định nội tâm, vững chãi như bàn thạch.' }
];

export default function TheHoMenhPage() {
  const [fullName, setFullName] = useState('Huỳnh Hữu Đệ');
  const [birthYear, setBirthYear] = useState(1994);
  const [gender, setGender] = useState('male');
  const [wishMotto, setWishMotto] = useState('Tâm An Vạn Sự Lý · Đức Trọng Quỷ Thần Kinh');
  const [exporting, setExporting] = useState(false);
  const [playingHz, setPlayingHz] = useState(null);
  const cardRef = useRef(null);

  const profile = useMemo(() => {
    const y = Number(birthYear) || 1994;
    const stemIdx = ((y - 4) % 10 + 10) % 10;
    const branchIdx = ((y - 4) % 12 + 12) % 12;
    const canChi = `${STEMS[stemIdx]} ${BRANCHES[branchIdx]}`;
    const guardian = BUDDHA_GUARDIANS[branchIdx];
    const gua = calculateBatTrachGua(y, gender);
    return {
      year: y,
      canChi,
      guardian,
      gua
    };
  }, [birthYear, gender]);

  const playSingingBowl = (hz) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(hz, now);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(hz * 1.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.3);
      osc2.stop(now + 4.3);

      setPlayingHz(hz);
      setTimeout(() => setPlayingHz(null), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadCardPng = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#0B0C10' });
      const link = document.createElement('a');
      link.download = `Kim-Bai-Ho-Menh-HHD-K94-${fullName.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Kim Bài Hộ Mệnh & Thiền Âm K94</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/sim-phong-thuy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📱 Chấm Điểm Sim</Link>
            <Link href="/calligraphy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🖌 Xin Chữ Ông Đồ</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Phật Bản Mệnh · Kim Bài Phong Thủy · Chuông Thiền Ngũ Hành
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Khởi Tạo Kim Bài Hộ Mệnh Cá Nhân & Chuông Thiền HHD
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Tra cứu Vị Phật Bản Mệnh độ mạng 12 con giáp, xuất ảnh Kim Bài Hộ Mệnh K94 làm hình nền điện thoại và lắng nghe chuông thiền tần số Ngũ Hành.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, marginBottom: 32, alignItems: 'start' }}>
          {/* Left: Form + Five Element Sound Bowls */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, display: 'grid', gap: 14 }}>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700 }}>1. THÔNG TIN CHỦ NHÂN KIM BÀI</div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Họ và Tên</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 15, fontWeight: 700 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Năm Sinh</label>
                  <input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 15, fontWeight: 700 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Giới Tính</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 14, fontWeight: 600 }}>
                    <option value="male">Nam Mạng</option>
                    <option value="female">Nữ Mạng</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Khẩu Quyết / Tâm Nguyện Khắc Trên Thẻ</label>
                <input type="text" value={wishMotto} onChange={(e) => setWishMotto(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 13.5 }} />
              </div>
              <button
                onClick={downloadCardPng}
                disabled={exporting}
                style={{
                  marginTop: 6,
                  padding: '13px 20px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #e0c168, #b88928)',
                  color: '#0B0C10',
                  fontWeight: 800,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {exporting ? 'Đang kết xuất ảnh Kim Bài...' : '📥 Tải Ảnh Kim Bài Hộ Mệnh (PNG)'}
              </button>
            </div>

            {/* Five Element Singing Bowls */}
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, marginBottom: 10 }}>
                🔔 2. THỈNH CHUÔNG THIỀN TẦN SỐ NGŨ HÀNH (BẤM ĐỂ NGHE)
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {FIVE_FREQUENCIES.map((f) => (
                  <button
                    key={f.hz}
                    onClick={() => playSingingBowl(f.hz)}
                    style={{
                      textAlign: 'left',
                      padding: '11px 14px',
                      borderRadius: 12,
                      border: playingHz === f.hz ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.1)',
                      background: playingHz === f.hz ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.03)',
                      color: '#E2E4E9',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 13.5 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: '#9DA3B4' }}>{f.desc}</div>
                    </div>
                    <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700 }}>
                      {playingHz === f.hz ? '🔊 Đang ngân...' : '▶ Thỉnh chuông'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: The Luxury Gold Kim Bài VIP Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              ref={cardRef}
              style={{
                width: '100%',
                maxWidth: 420,
                background: 'linear-gradient(165deg, #1F1810 0%, #0D0F17 55%, #1A140B 100%)',
                border: '2px solid #c9a84c',
                borderRadius: 26,
                padding: 28,
                boxShadow: '0 24px 64px rgba(0,0,0,0.85), inset 0 0 32px rgba(201,168,76,0.18)',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: 11, color: '#c9a84c', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                ✦ KIM BÀI HỘ MỆNH CÁT TƯỜNG HHD ✦
              </div>

              <div
                style={{
                  width: 88,
                  height: 88,
                  margin: '10px auto 14px',
                  borderRadius: '50%',
                  border: '2px dashed rgba(201,168,76,0.6)',
                  background: 'radial-gradient(circle, rgba(201,168,76,0.25), transparent 70%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44
                }}
              >
                {profile.guardian.icon}
              </div>

              <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700 }}>PHẬT BẢN MỆNH ĐỘ MẠNG</div>
              <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, fontWeight: 800, color: '#F4E3B2', margin: '4px 0 12px' }}>
                {profile.guardian.buddha}
              </div>

              <div style={{ padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.3)', marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F4E3B2', fontFamily: 'var(--font-serif, serif)' }}>
                  {fullName}
                </div>
                <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600, marginTop: 4 }}>
                  Tuổi {profile.canChi} ({profile.year}) · Cung {profile.gua.name} ({profile.gua.element})
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left', fontSize: 12.5, marginBottom: 16 }}>
                <div style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ color: '#8C93A8', fontSize: 11 }}>Hướng Sinh Khí Đại Cát</div>
                  <div style={{ color: '#81C784', fontWeight: 700, marginTop: 2 }}>{profile.gua.good[0].dir}</div>
                </div>
                <div style={{ padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ color: '#8C93A8', fontSize: 11 }}>Số & Màu Hộ Mệnh</div>
                  <div style={{ color: '#F4E3B2', fontWeight: 700, marginTop: 2 }}>Số {profile.gua.luckyNums}</div>
                </div>
              </div>

              <div style={{ fontSize: 12.5, color: '#D5DAE5', fontStyle: 'italic', lineHeight: 1.55, marginBottom: 18, padding: '0 8px' }}>
                “{wishMotto}”
              </div>

              <div
                style={{
                  borderTop: '1px dashed rgba(201,168,76,0.35)',
                  paddingTop: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 6,
                    background: '#991B1B',
                    color: '#FEF3C7',
                    fontSize: 10.5,
                    fontWeight: 800,
                    letterSpacing: 1.2
                  }}
                >
                  ẤN CHƯƠNG HHD · CÔNG TY TRUYỀN THÔNG K94
                </span>
                <span style={{ fontSize: 11.5, color: '#c9a84c', fontWeight: 700 }}>
                  Hotline / Zalo: 0983.339.397 · huynhhuude-bot.github.io/tuvi-hhd
                </span>
              </div>
            </div>

            {/* Physical Gold-Plated Metal Card Order CTA */}
            <div style={{ marginTop: 18, width: '100%', maxWidth: 420, background: 'rgba(20,22,30,0.92)', border: '1px solid #c9a84c', borderRadius: 18, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11.5, color: '#FFD54F', fontWeight: 800, marginBottom: 4 }}>
                🪪 ĐẶT KHẮC KIM BÀI HỢP KIM MẠ VÀNG THẬT BỎ VÍ / ỐP LƯNG
              </div>
              <div style={{ fontSize: 12.5, color: '#D0D5E0', marginBottom: 10, lineHeight: 1.5 }}>
                Khắc laser tên riêng <strong>{fullName}</strong> & Đức Phật <strong>{profile.guardian.buddha}</strong> lên phôi kim loại mạ vàng cao cấp giao tận nơi.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                <a
                  href="https://zalo.me/0983339397"
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: '9px 16px', borderRadius: 99, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, fontSize: 12.5, textDecoration: 'none' }}
                >
                  💬 Đặt Khắc Kim Bài Zalo K94: 0983.339.397
                </a>
                <Link
                  href="/vat-pham-phong-thuy"
                  style={{ padding: '9px 14px', borderRadius: 99, border: '1px solid #c9a84c', color: '#F4E3B2', fontWeight: 700, fontSize: 12, textDecoration: 'none' }}
                >
                  🛍️ Thỉnh Dây Chuyền Phật Bản Mệnh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
