'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// 1. Thước Lỗ Ban 52.2 cm (522 mm) — Thông thủy (Cửa đi, cửa sổ, giếng trời)
const RULER_522 = [
  { name: 'Quý Nhân', isGood: true, sub: ['Quyền Lộc', 'Trung Tín', 'Tác Quan', 'Phát Đạt', 'Thông Minh'], desc: 'Gia cảnh hưng vượng, gặp quý nhân trợ giúp, làm ăn phát đạt, con cái thông minh.' },
  { name: 'Hiểm Họa', isGood: false, sub: ['Án Thành', 'Hỗn Nhân', 'Thất Hiếu', 'Tai Họa', 'Thường Bệnh'], desc: 'Cung xấu: Dễ hao tán tiền tài, gia đạo bất an, cần tránh khi làm cửa.' },
  { name: 'Thiên Tai', isGood: false, sub: ['Hoàn Tử', 'Quan Tài', 'Thân Tàn', 'Thất Tài', 'Hệ Quả'], desc: 'Cung xấu: Chủ về ốm đau, hao tài tốn của, bất lợi cho gia chủ.' },
  { name: 'Thiên Tài', isGood: true, sub: ['Thi Thơ', 'Văn Học', 'Thanh Quý', 'Tác Lộc', 'Thiên Lộc'], desc: 'Đại cát: Chủ về văn chương khoa bảng, tài lộc dồi dào, con cháu hiếu thảo.' },
  { name: 'Nhân Lộc', isGood: true, sub: ['Trí Tồn', 'Phú Quý', 'Tiến Bửu', 'Thập Thiện', 'Văn Chương'], desc: 'Đại cát: Phú quý vinh hiển, gia nghiệp thịnh vượng, đắc nhân tâm.' },
  { name: 'Cô Độc', isGood: false, sub: ['Bạc Nghịch', 'Vô Vọng', 'Ly Tán', 'Tửu Thục', 'Dâm Dục'], desc: 'Cung xấu: Dễ gây chia rẽ, hao người tốn của.' },
  { name: 'Thiên Tắc', isGood: false, sub: ['Phong Bệnh', 'Chiêu Ôn', 'Ôn Tài', 'Ngục Tù', 'Quang Tài'], desc: 'Cung xấu: Cẩn trọng thị phi, bệnh tật, kiện tụng.' },
  { name: 'Tể Tướng', isGood: true, sub: ['Đại Tài', 'Thi Thơ', 'Hoạch Tài', 'Hiếu Tử', 'Quý Nhân'], desc: 'Đại cát: Hanh thông mọi mặt, sinh quý tử, tài lộc bất ngờ, quý nhân phù trợ.' }
];

// 2. Thước Lỗ Ban 42.9 cm (429 mm) — Dương trạch (Bàn làm việc, bệ bếp, giường, bậc tam cấp, biển quảng cáo)
const RULER_429 = [
  { name: 'Tài (Tài Lộc)', isGood: true, sub: ['Tài Đức', 'Báo Khố', 'Lục Hợp', 'Nghinh Phúc'], desc: 'Đại cát: Tiền tài sung túc, đón phúc vào nhà, lục hợp hanh thông.' },
  { name: 'Bệnh', isGood: false, sub: ['Thoát Tài', 'Công Sự', 'Lao Chấp', 'Cô Quả'], desc: 'Cung xấu: Hao tài, vướng bận thị phi hoặc sức khỏe suy giảm.' },
  { name: 'Ly', isGood: false, sub: ['Trưởng Khố', 'Kiếp Tài', 'Quan Quỷ', 'Thất Thoát'], desc: 'Cung xấu: Chủ về thất thoát tiền bạc, xa cách.' },
  { name: 'Nghĩa', isGood: true, sub: ['Thêm Đinh', 'Ích Lợi', 'Quý Tử', 'Đại Cát'], desc: 'Đại cát: Thêm phúc thêm lộc, sinh quý tử, thuận lợi kinh doanh.' },
  { name: 'Quan', isGood: true, sub: ['Thuận Khoa', 'Hoành Tài', 'Tiến Ích', 'Phú Quý'], desc: 'Đại cát: Công danh thăng tiến, thi cử đỗ đạt, tài lộc bất ngờ.' },
  { name: 'Kiếp', isGood: false, sub: ['Tử Biệt', 'Thoái Khẩu', 'Ly Hương', 'Tài Thất'], desc: 'Cung xấu: Bất lợi về tài chính và nhân đinh.' },
  { name: 'Hại', isGood: false, sub: ['Tai Chí', 'Tử Tuyệt', 'Bệnh Lâm', 'Khẩu Thiệt'], desc: 'Cung xấu: Dễ sinh tranh cãi, khẩu thiệt thị phi.' },
  { name: 'Bản (Bản Mệnh)', isGood: true, sub: ['Tài Chí', 'Đăng Khoa', 'Tiến Bảo', 'Hưng Vượng'], desc: 'Đại cát: Cơ nghiệp hưng vượng, tiền tài tìm đến, khoa bảng rạng danh.' }
];

// 3. Thước Lỗ Ban 38.8 cm (388 mm) — Âm phần / Đồ thờ (Bàn thờ, tủ thờ, khung tranh)
const RULER_388 = [
  { name: 'Đinh', isGood: true, sub: ['Phúc Tinh', 'Đỗ Đạt', 'Tài Vượng', 'Đăng Khoa'], desc: 'Đại cát: Phúc tinh chiếu mệnh, tài vượng, con cháu đăng khoa.' },
  { name: 'Hại', isGood: false, sub: ['Khẩu Thiệt', 'Lâm Bệnh', 'Tử Tuyệt', 'Tai Chí'], desc: 'Cung xấu: Tránh dùng cho kích thước bàn thờ.' },
  { name: 'Vượng', isGood: true, sub: ['Thiên Đức', 'Hỷ Sự', 'Tiến Bảo', 'Thêm Phúc'], desc: 'Đại cát: Thiên đức hộ trì, hỷ sự lâm môn, gia đạo thêm phúc.' },
  { name: 'Khổ', isGood: false, sub: ['Thất Thoát', 'Quan Quỷ', 'Kiếp Tài', 'Vô Tự'], desc: 'Cung xấu: Hao hụt tài lộc, không cát lợi.' },
  { name: 'Nghĩa', isGood: true, sub: ['Đại Cát', 'Tài Vượng', 'Ích Lợi', 'Thiên Khố'], desc: 'Đại cát: Kho trời ban lộc, đại cát đại lợi, gia môn hưng thịnh.' },
  { name: 'Quan', isGood: true, sub: ['Phú Quý', 'Tiến Bảo', 'Ho横 Tài', 'Thuận Khoa'], desc: 'Đại cát: Phú quý vinh hoa, công danh thuận lợi.' },
  { name: 'Tử', isGood: false, sub: ['Ly Hương', 'Tử Biệt', 'Thoái Đinh', 'Thất Tài'], desc: 'Cung xấu: Kỵ dùng cho đồ thờ cúng.' },
  { name: 'Hưng', isGood: true, sub: ['Đăng Khoa', 'Quý Tử', 'Thêm Đinh', 'Hưng Vượng'], desc: 'Đại cát: Gia tộc hưng vượng, con cháu hiếu thảo thành đạt.' },
  { name: 'Thất', isGood: false, sub: ['Cô Quả', 'Lao Chấp', 'Công Sự', 'Thoát Tài'], desc: 'Cung xấu: Dễ hao tài, cô lập.' },
  { name: 'Tài', isGood: true, sub: ['Nghinh Phúc', 'Lục Hợp', 'Tiến Bảo', 'Tài Đức'], desc: 'Đại cát: Nghinh đón phúc đức, tiền của dồi dào.' }
];

function evaluateOnRuler(mm, cycleMm, sectors) {
  const pos = ((mm % cycleMm) + cycleMm) % cycleMm;
  const sectorWidth = cycleMm / sectors.length;
  const sectorIdx = Math.min(sectors.length - 1, Math.floor(pos / sectorWidth));
  const sector = sectors[sectorIdx];
  const subPos = pos - sectorIdx * sectorWidth;
  const subWidth = sectorWidth / sector.sub.length;
  const subIdx = Math.min(sector.sub.length - 1, Math.floor(subPos / subWidth));
  return {
    sectorName: sector.name,
    subName: sector.sub[subIdx],
    isGood: sector.isGood,
    desc: sector.desc,
    percentInCycle: Math.round((pos / cycleMm) * 100)
  };
}

const PRESETS = [
  { label: 'Cửa chính / Cửa phòng (81 cm)', mm: 810 },
  { label: 'Bàn thờ / Bàn làm việc (107 cm)', mm: 1070 },
  { label: 'Bàn thờ / Cửa lớn (127 cm)', mm: 1270 },
  { label: 'Biển hiệu / Tủ lớn (168 cm)', mm: 1680 },
  { label: 'Bàn thờ Đại Cát (197 cm)', mm: 1970 },
  { label: 'Cửa 2 cánh chuẩn (212 cm)', mm: 2120 }
];

export default function ThuocLoBanPage() {
  const [mmValue, setMmValue] = useState(810); // 81.0 cm = Tam hợp đại cát!

  const results = useMemo(() => {
    const r522 = evaluateOnRuler(mmValue, 522, RULER_522);
    const r429 = evaluateOnRuler(mmValue, 429, RULER_429);
    const r388 = evaluateOnRuler(mmValue, 388, RULER_388);
    const goodCount = [r522.isGood, r429.isGood, r388.isGood].filter(Boolean).length;
    return { r522, r429, r388, goodCount };
  }, [mmValue]);

  // Find nearest dimensions where ALL 3 rulers are RED (Tam Hợp Cát Kích)
  const nearestTripleGood = useMemo(() => {
    const matches = [];
    const start = Math.max(10, mmValue - 250);
    const end = mmValue + 250;
    for (let m = start; m <= end; m += 5) {
      const a = evaluateOnRuler(m, 522, RULER_522).isGood;
      const b = evaluateOnRuler(m, 429, RULER_429).isGood;
      const c = evaluateOnRuler(m, 388, RULER_388).isGood;
      if (a && b && c) {
        matches.push(m);
      }
    }
    // Group contiguous ranges and pick representative centers
    const picks = [];
    for (const m of matches) {
      if (picks.length === 0 || m - picks[picks.length - 1] >= 25) {
        picks.push(m);
      }
      if (picks.length >= 8) break;
    }
    return picks;
  }, [mmValue]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Thước Lỗ Ban 3 Chuẩn</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/sim-phong-thuy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📱 Chấm Điểm Sim</Link>
            <Link href="/sao-han" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🏮 Sao Hạn & Tam Tai</Link>
            <Link href="/compass" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🧭 La Bàn Bát Trạch</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            52.2 cm Thông Thủy · 42.9 cm Dương Trạch · 38.8 cm Âm Phần
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Thước Lỗ Ban Phong Thủy Trực Tuyến Chuẩn Xác
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Tra cứu kích thước Đỏ (Đại Cát) cho cửa chính, bàn làm việc, tủ bếp, bàn thờ và biển hiệu quảng cáo Công ty Truyền thông K94.
          </p>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
          {PRESETS.map((p) => (
            <button
              key={p.mm}
              onClick={() => setMmValue(p.mm)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: mmValue === p.mm ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                background: mmValue === p.mm ? 'rgba(201,168,76,0.22)' : '#141722',
                color: mmValue === p.mm ? '#F4E3B2' : '#A3A8B8',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Interactive Measurement Controls */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 22, padding: 26, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, alignItems: 'center', marginBottom: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
                Nhập Kích Thước (Milimet - mm)
              </label>
              <input
                type="number"
                value={mmValue}
                onChange={(e) => setMmValue(Math.max(1, Number(e.target.value)))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontSize: 20, fontWeight: 800 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
                Quy Đổi Centimet (cm)
              </label>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)', fontSize: 20, fontWeight: 800, color: '#c9a84c' }}>
                {(mmValue / 10).toFixed(1)} cm ({(mmValue / 1000).toFixed(3)} m)
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#8C93A8', textTransform: 'uppercase', marginBottom: 6 }}>Đánh Giá Tổng Hợp 3 Thước</div>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: results.goodCount === 3 ? 'rgba(229,57,53,0.22)' : results.goodCount >= 2 ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
                  border: results.goodCount === 3 ? '1px solid #EF5350' : '1px solid rgba(201,168,76,0.35)',
                  color: results.goodCount === 3 ? '#FF8A80' : '#F4E3B2',
                  fontWeight: 800,
                  fontSize: 14
                }}
              >
                {results.goodCount === 3
                  ? '★ ĐỎ CẢ 3 THƯỚC (TAM HỢP ĐẠI CÁT)'
                  : results.goodCount === 2
                  ? '✦ Tốt Trên 2/3 Thước Lỗ Ban'
                  : results.goodCount === 1
                  ? '• Tốt Trên 1/3 Thước (Chọn đúng mục đích)'
                  : '✕ Đang rơi vào cung Đen (Nên dịch chuyển)'}
              </div>
            </div>
          </div>

          <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 6 }}>
            Kéo thanh trượt để dò từng milimet ({mmValue} mm):
          </label>
          <input
            type="range"
            min={100}
            max={3000}
            step={1}
            value={mmValue}
            onChange={(e) => setMmValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#EF5350', cursor: 'pointer' }}
          />
        </div>

        {/* 3 Lỗ Ban Rulers Visual Comparison */}
        <div style={{ display: 'grid', gap: 18, marginBottom: 28 }}>
          {[
            {
              title: '1. Thước Lỗ Ban 52.2 cm (522 mm) — Đo Thông Thủy (Cửa chính, cửa sổ, ô thoáng)',
              data: results.r522,
              sectors: RULER_522
            },
            {
              title: '2. Thước Lỗ Ban 42.9 cm (429 mm) — Đo Dương Trạch (Bàn làm việc, bếp, giường, biển hiệu K94)',
              data: results.r429,
              sectors: RULER_429
            },
            {
              title: '3. Thước Lỗ Ban 38.8 cm (388 mm) — Đo Âm Phần & Đồ Thờ (Bàn thờ, tủ thờ, khung tranh)',
              data: results.r388,
              sectors: RULER_388
            }
          ].map((ruler, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(20,22,30,0.88)',
                border: ruler.data.isGood ? '1px solid rgba(239,83,80,0.55)' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: 18,
                padding: 22
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 15 }}>{ruler.title}</div>
                <span
                  style={{
                    padding: '4px 14px',
                    borderRadius: 999,
                    background: ruler.data.isGood ? 'linear-gradient(135deg, #d32f2f, #b71c1c)' : 'rgba(255,255,255,0.08)',
                    color: ruler.data.isGood ? '#FFF' : '#9DA3B4',
                    fontWeight: 800,
                    fontSize: 12.5
                  }}
                >
                  {ruler.data.isGood ? `★ CUNG ĐỎ (TỐT): ${ruler.data.sectorName} · ${ruler.data.subName}` : `✕ CUNG ĐEN (XẤU): ${ruler.data.sectorName} · ${ruler.data.subName}`}
                </span>
              </div>

              {/* Visual Ruler Strip */}
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${ruler.sectors.length}, 1fr)`, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(201,168,76,0.35)', marginBottom: 12 }}>
                {ruler.sectors.map((s) => (
                  <div
                    key={s.name}
                    style={{
                      padding: '10px 4px',
                      textAlign: 'center',
                      background: s.isGood ? 'rgba(198, 40, 40, 0.78)' : '#1A1D26',
                      color: s.isGood ? '#FFF' : '#8C93A8',
                      fontSize: 11.5,
                      fontWeight: 700,
                      borderRight: '1px solid rgba(255,255,255,0.12)'
                    }}
                  >
                    {s.name}
                  </div>
                ))}
                {/* Pointer Marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${ruler.data.percentInCycle}%`,
                    width: 4,
                    background: '#FFD54F',
                    boxShadow: '0 0 12px #FFD54F'
                  }}
                />
              </div>

              <div style={{ fontSize: 13, color: '#C5C9D6' }}>
                <strong>Ý nghĩa cung {ruler.data.sectorName} ({ruler.data.subName}):</strong> {ruler.data.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Nearest Triple-Red Finder */}
        <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#F4E3B2', margin: '0 0 6px 0' }}>
            ★ Gợi Ý Kích Thước Đỏ Cả 3 Thước Lỗ Ban Gần Nhất (Bấm Để Chọn)
          </h3>
          <p style={{ fontSize: 13, color: '#9DA3B4', margin: '0 0 14px 0' }}>
            Các mốc kích thước lân cận {mmValue} mm đạt <strong>Tam Hợp Cát Kích</strong> (đều rơi vào cung Đỏ tốt lành trên cả 3 thước 52.2cm, 42.9cm và 38.8cm):
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {nearestTripleGood.map((m) => (
              <button
                key={m}
                onClick={() => setMmValue(m)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(239,83,80,0.5)',
                  background: 'rgba(198,40,40,0.18)',
                  color: '#FFCDD2',
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: 'pointer'
                }}
              >
                {m} mm ({(m / 10).toFixed(1)} cm)
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
