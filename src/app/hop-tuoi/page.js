'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculateBatTrachGua } from '../../data/metaphysicsData';

const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const GENERATES = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
const OVERCOMES = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };

const NAP_AM_30 = [
  { name: 'Hải Trung Kim', el: 'Kim' }, { name: 'Lư Trung Hỏa', el: 'Hỏa' }, { name: 'Đại Lâm Mộc', el: 'Mộc' },
  { name: 'Lộ Bàng Thổ', el: 'Thổ' }, { name: 'Kiếm Phong Kim', el: 'Kim' }, { name: 'Sơn Đầu Hỏa', el: 'Hỏa' },
  { name: 'Giản Hạ Thủy', el: 'Thủy' }, { name: 'Thành Đầu Thổ', el: 'Thổ' }, { name: 'Bạch Lạp Kim', el: 'Kim' },
  { name: 'Dương Liễu Mộc', el: 'Mộc' }, { name: 'Tuyền Trung Thủy', el: 'Thủy' }, { name: 'Ốc Thượng Thổ', el: 'Thổ' },
  { name: 'Tích Lịch Hỏa', el: 'Hỏa' }, { name: 'Tùng Bách Mộc', el: 'Mộc' }, { name: 'Trường Lưu Thủy', el: 'Thủy' },
  { name: 'Sa Trung Kim', el: 'Kim' }, { name: 'Sơn Hạ Hỏa', el: 'Hỏa' }, { name: 'Bình Địa Mộc', el: 'Mộc' },
  { name: 'Bích Thượng Thổ', el: 'Thổ' }, { name: 'Kim Bạch Kim', el: 'Kim' }, { name: 'Phú Đăng Hỏa', el: 'Hỏa' },
  { name: 'Thiên Hà Thủy', el: 'Thủy' }, { name: 'Đại Dịch Thổ', el: 'Thổ' }, { name: 'Thoa Xuyến Kim', el: 'Kim' },
  { name: 'Tang Đố Mộc', el: 'Mộc' }, { name: 'Đại Khê Thủy', el: 'Thủy' }, { name: 'Sa Trung Thổ', el: 'Thổ' },
  { name: 'Thiên Thượng Hỏa', el: 'Hỏa' }, { name: 'Thạch Lựu Mộc', el: 'Mộc' }, { name: 'Đại Hải Thủy', el: 'Thủy' }
];

function getYearProfile(year, gender = 'male') {
  const y = Number(year) || 1994;
  const stemIdx = ((y - 4) % 10 + 10) % 10;
  const branchIdx = ((y - 4) % 12 + 12) % 12;
  let jiazi = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) {
      jiazi = i;
      break;
    }
  }
  const napAm = NAP_AM_30[Math.floor(jiazi / 2)];
  const gua = calculateBatTrachGua(y, gender);
  return {
    year: y,
    stemIdx,
    branchIdx,
    canChi: `${STEMS[stemIdx]} ${BRANCHES[branchIdx]}`,
    napAm: napAm.name,
    element: napAm.el,
    gua
  };
}

function evaluateCompatibility(p1, p2) {
  let score = 60;
  const details = [];

  // 1. Ngũ Hành Bản Mệnh
  if (GENERATES[p1.element] === p2.element || GENERATES[p2.element] === p1.element) {
    score += 16;
    details.push({ title: 'Ngũ Hành Bản Mệnh', status: 'Tương Sinh (Đại Cát +16đ)', isGood: true, desc: `${p1.napAm} (${p1.element}) và ${p2.napAm} (${p2.element}) tương sinh trợ lực mạnh mẽ về tài vận.` });
  } else if (p1.element === p2.element) {
    score += 12;
    details.push({ title: 'Ngũ Hành Bản Mệnh', status: 'Tương Hòa (Cát Lợi +12đ)', isGood: true, desc: `Cùng hành ${p1.element}, đồng tâm hiệp lực, dễ thống nhất quan điểm kinh doanh.` });
  } else if (OVERCOMES[p1.element] === p2.element || OVERCOMES[p2.element] === p1.element) {
    score -= 6;
    details.push({ title: 'Ngũ Hành Bản Mệnh', status: 'Tương Khắc (Cần Trung Hòa)', isGood: false, desc: `Hành ${p1.element} và ${p2.element} có nét khắc chế, nên phân công rõ mảng phụ trách riêng.` });
  }

  // 2. Thiên Can
  const stemDiff = Math.abs(p1.stemIdx - p2.stemIdx);
  if (stemDiff === 5) {
    score += 10;
    details.push({ title: 'Thiên Can Hợp Hóa', status: 'Thiên Can Ngũ Hợp (+10đ)', isGood: true, desc: `Can ${STEMS[p1.stemIdx]} và ${STEMS[p2.stemIdx]} thuộc bộ Ngũ Hợp, thiên thời ủng hộ khi hợp tác.` });
  } else {
    score += 5;
    details.push({ title: 'Thiên Can Hợp Hóa', status: 'Thiên Can Bình Hòa (+5đ)', isGood: true, desc: `Can ${STEMS[p1.stemIdx]} và ${STEMS[p2.stemIdx]} bình hòa, không xung đột.` });
  }

  // 3. Địa Chi (Tam Hợp / Lục Hợp / Tứ Hành Xung)
  const bDiff = Math.abs(p1.branchIdx - p2.branchIdx);
  const lucHopPairs = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  const isLucHop = lucHopPairs.some(([a, b]) => (p1.branchIdx === a && p2.branchIdx === b) || (p1.branchIdx === b && p2.branchIdx === a));
  const isTamHop = bDiff === 4 || bDiff === 8;
  const isLucXung = bDiff === 6;

  if (isTamHop) {
    score += 12;
    details.push({ title: 'Địa Chi Tuổi', status: 'Tam Hợp Quý Nhân (+12đ)', isGood: true, desc: `Tuổi ${BRANCHES[p1.branchIdx]} và ${BRANCHES[p2.branchIdx]} nằm trong vòng Tam Hợp, càng làm chung càng phát đạt.` });
  } else if (isLucHop) {
    score += 12;
    details.push({ title: 'Địa Chi Tuổi', status: 'Lục Hợp Quý Nhân (+12đ)', isGood: true, desc: `Tuổi ${BRANCHES[p1.branchIdx]} và ${BRANCHES[p2.branchIdx]} là cặp Lục Hợp gắn kết bền chặt.` });
  } else if (isLucXung) {
    score -= 8;
    details.push({ title: 'Địa Chi Tuổi', status: 'Lục Xung (Cần Nhường Nhịn)', isGood: false, desc: `Tuổi ${BRANCHES[p1.branchIdx]} và ${BRANCHES[p2.branchIdx]} đối xung, cần minh bạch sổ sách và tôn trọng nhau.` });
  } else {
    score += 6;
    details.push({ title: 'Địa Chi Tuổi', status: 'Địa Chi Bình Hòa (+6đ)', isGood: true, desc: `Tuổi ${BRANCHES[p1.branchIdx]} và ${BRANCHES[p2.branchIdx]} bình ổn, phối hợp nhịp nhàng.` });
  }

  // 4. Cung Phi Bát Trạch
  if (p1.gua.group === p2.gua.group) {
    score += 10;
    details.push({ title: 'Cung Phi Bát Trạch', status: `Đồng Nhóm ${p1.gua.group} (+10đ)`, isGood: true, desc: `Cung ${p1.gua.name} và Cung ${p2.gua.name} cùng thuộc ${p1.gua.group}, đón chung luồng sinh khí cát tường.` });
  } else {
    score += 2;
    details.push({ title: 'Cung Phi Bát Trạch', status: 'Khác Nhóm Đông/Tây Tứ Mệnh', isGood: false, desc: `Cung ${p1.gua.name} (${p1.gua.group}) và Cung ${p2.gua.name} (${p2.gua.group}) nên ngồi hướng bàn làm việc riêng phù hợp từng người.` });
  }

  return {
    score: Math.min(99, Math.max(55, score)),
    details
  };
}

export default function HopTuoiPage() {
  const [hostYear, setHostYear] = useState(1994);
  const [hostGender, setHostGender] = useState('male');
  const [partnerYear, setPartnerYear] = useState(1995);
  const [partnerGender, setPartnerGender] = useState('male');

  const hostProfile = useMemo(() => getYearProfile(hostYear, hostGender), [hostYear, hostGender]);
  const partnerProfile = useMemo(() => getYearProfile(partnerYear, partnerGender), [partnerYear, partnerGender]);
  const compatibility = useMemo(() => evaluateCompatibility(hostProfile, partnerProfile), [hostProfile, partnerProfile]);

  // Top 6 Best Years for Business / Xông Đất for this Host
  const bestMatches = useMemo(() => {
    const list = [];
    for (let y = 1965; y <= 2006; y++) {
      if (y === Number(hostYear)) continue;
      const p = getYearProfile(y, 'male');
      const comp = evaluateCompatibility(hostProfile, p);
      if (comp.score >= 88) {
        list.push({ year: y, profile: p, score: comp.score });
      }
    }
    return list.sort((a, b) => b.score - a.score).slice(0, 6);
  }, [hostProfile, hostYear]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Hợp Tuổi Kinh Doanh & Xông Đất</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/sim-phong-thuy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📱 Chấm Điểm Sim</Link>
            <Link href="/sao-han" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🏮 Sao Hạn & Tam Tai</Link>
            <Link href="/the-ho-menh" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🪪 Thẻ Hộ Mệnh K94</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Tam Hợp Quý Nhân · Thiên Can Ngũ Hợp · Cung Phi Bát Trạch
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Xem Tuổi Hợp Làm Ăn, Mở Hàng & Xông Đất Đầu Năm
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Đối chiếu 4 tầng Ngũ Hành Nạp Âm, Thiên Can, Địa Chi và Cung Phi giữa Gia chủ và Đối tác / Người mở hàng khai trương.
          </p>
        </div>

        {/* Dual Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.32)', borderRadius: 20, padding: 22 }}>
            <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, marginBottom: 12 }}>👤 TUỔI GIA CHỦ / CHỦ DOANH NGHIỆP</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type="number" value={hostYear} onChange={(e) => setHostYear(Number(e.target.value))} style={{ padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 700 }} />
              <select value={hostGender} onChange={(e) => setHostGender(e.target.value)} style={{ padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 14, fontWeight: 600 }}>
                <option value="male">Nam Mạng</option>
                <option value="female">Nữ Mạng</option>
              </select>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: '#C5C9D6' }}>
              Tuổi <strong>{hostProfile.canChi}</strong> · {hostProfile.napAm} ({hostProfile.element}) · Cung <strong>{hostProfile.gua.name}</strong>
            </div>
          </div>

          <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.32)', borderRadius: 20, padding: 22 }}>
            <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, marginBottom: 12 }}>🤝 TUỔI ĐỐI TÁC / NGƯỜI XÔNG ĐẤT MỞ HÀNG</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input type="number" value={partnerYear} onChange={(e) => setPartnerYear(Number(e.target.value))} style={{ padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 700 }} />
              <select value={partnerGender} onChange={(e) => setPartnerGender(e.target.value)} style={{ padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 14, fontWeight: 600 }}>
                <option value="male">Nam Mạng</option>
                <option value="female">Nữ Mạng</option>
              </select>
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: '#C5C9D6' }}>
              Tuổi <strong>{partnerProfile.canChi}</strong> · {partnerProfile.napAm} ({partnerProfile.element}) · Cung <strong>{partnerProfile.gua.name}</strong>
            </div>
          </div>
        </div>

        {/* Score & 4-Layer Breakdown */}
        <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.16), rgba(16,18,26,0.95))', border: '1px solid rgba(201,168,76,0.42)', borderRadius: 22, padding: 28, marginBottom: 28 }}>
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div style={{ fontSize: 12, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase' }}>Độ Tương Hợp Kinh Doanh & Mở Hàng</div>
            <div style={{ fontSize: 64, fontWeight: 800, fontFamily: 'var(--font-serif, serif)', color: '#F4E3B2', lineHeight: 1.1 }}>
              {compatibility.score}<span style={{ fontSize: 26, color: '#c9a84c' }}>/100</span>
            </div>
            <div style={{ display: 'inline-block', marginTop: 6, padding: '4px 16px', borderRadius: 99, background: compatibility.score >= 85 ? 'rgba(67,160,71,0.22)' : 'rgba(201,168,76,0.2)', color: compatibility.score >= 85 ? '#81C784' : '#F4E3B2', fontWeight: 700, fontSize: 13 }}>
              {compatibility.score >= 90 ? '★ Đại Cát Tường · Song Kiếm Hợp Bích' : compatibility.score >= 80 ? '✦ Tương Hợp Tốt Lành · Thuận Lợi Hợp Tác' : '• Trung Bình · Cần Bổ Khuyết Phong Thủy'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
            {compatibility.details.map((d) => (
              <div key={d.title} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: d.isGood ? '1px solid rgba(102,187,106,0.35)' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700 }}>{d.title}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: d.isGood ? '#81C784' : '#F4E3B2', margin: '4px 0 6px' }}>{d.status}</div>
                <div style={{ fontSize: 12.5, color: '#C5C9D6', lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 6 Recommended Partner/Guest Years */}
        <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.28)', borderRadius: 20, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#F4E3B2', margin: '0 0 6px 0' }}>
            ★ Top 6 Tuổi Đại Cát Hợp Xông Đất, Mở Hàng & Hùn Vốn Với Gia Chủ {hostProfile.canChi} ({hostYear})
          </h3>
          <p style={{ fontSize: 13, color: '#9DA3B4', margin: '0 0 16px 0' }}>
            Bấm vào bất kỳ năm sinh nào dưới đây để xem chi tiết phân tích tương hợp:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {bestMatches.map((m) => (
              <div
                key={m.year}
                onClick={() => setPartnerYear(m.year)}
                style={{
                  padding: 14,
                  borderRadius: 14,
                  background: Number(partnerYear) === m.year ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.03)',
                  border: Number(partnerYear) === m.year ? '1px solid #c9a84c' : '1px solid rgba(201,168,76,0.22)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <strong style={{ color: '#F4E3B2', fontSize: 15 }}>Sinh năm {m.year} ({m.profile.canChi})</strong>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, background: 'rgba(67,160,71,0.22)', color: '#81C784', fontWeight: 700 }}>{m.score} điểm</span>
                </div>
                <div style={{ fontSize: 12, color: '#9DA3B4' }}>{m.profile.napAm} · Cung {m.profile.gua.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
