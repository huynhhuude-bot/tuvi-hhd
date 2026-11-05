'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ICHING_64_HEXAGRAMS, BAGUA } from '../../data/metaphysicsData';

// Bát Cực Linh Số (64 pairs of digits)
const BAT_CUC_PAIRS = {
  sinhKhi: {
    name: 'Sinh Khí (Thượng Cát ★)',
    type: 'good',
    score: 96,
    pairs: ['14', '41', '67', '76', '39', '93', '28', '82'],
    desc: 'Quý nhân phù trợ, tài lộc dồi dào, sinh cơ bừng sáng, vạn sự hanh thông.'
  },
  thienY: {
    name: 'Thiên Y (Đại Cát Tài Lộc ★)',
    type: 'good',
    score: 98,
    pairs: ['13', '31', '68', '86', '49', '94', '27', '72'],
    desc: 'Chủ về chính tài vượng phát, lương duyên tốt đẹp, sức khỏe và phúc lộc viên mãn.'
  },
  dienNien: {
    name: 'Diên Niên (Thượng Cát Sự Nghiệp ★)',
    type: 'good',
    score: 95,
    pairs: ['19', '91', '78', '87', '34', '43', '26', '62'],
    desc: 'Bản lĩnh lãnh đạo, uy tín vững vàng, giữ tiền giỏi, gia đạo hòa thuận bền lâu.'
  },
  phucVi: {
    name: 'Phục Vị (Bình Hòa Kiên Định ★)',
    type: 'good',
    score: 88,
    pairs: ['11', '22', '33', '44', '66', '77', '88', '99', '00', '55'],
    desc: 'Tâm tính trầm ổn, tích lũy bền bỉ, hậu vận vững chắc, giữ vững thành quả.'
  },
  hoaHai: {
    name: 'Họa Hại (Khẩu Tài / Cần Khéo Léo)',
    type: 'neutral',
    score: 72,
    pairs: ['17', '71', '89', '98', '46', '64', '23', '32'],
    desc: 'Hợp người làm nghề ăn nói, truyền thông, luật sư, bán hàng; cần giữ lời nói ôn hòa.'
  },
  lucSat: {
    name: 'Lục Sát (Đào Hoa / Nghệ Thuật)',
    type: 'neutral',
    score: 70,
    pairs: ['16', '61', '47', '74', '38', '83', '29', '92'],
    desc: 'Giàu thẩm mỹ, ngoại giao khéo, hợp dịch vụ - làm đẹp - nghệ thuật.'
  },
  nguQuy: {
    name: 'Ngũ Quỷ (Biến Hóa / Tư Duy Sáng Tạo)',
    type: 'warn',
    score: 65,
    pairs: ['18', '81', '79', '97', '36', '63', '24', '42'],
    desc: 'Tư duy đột phá, nhạy bén thời cuộc; trong dân gian 79-97 còn là cặp Thần Tài Lớn.'
  },
  tuyetMenh: {
    name: 'Tuyệt Mệnh (Quyết Đoán Mạnh)',
    type: 'warn',
    score: 62,
    pairs: ['12', '21', '69', '96', '48', '84', '37', '73'],
    desc: 'Tính cách quyết liệt, dám nghĩ dám làm; cần đi kèm Sinh Khí hoặc Thiên Y ở cuối dãy số để chế hóa.'
  }
};

const SPECIAL_AUSP_PATTERNS = [
  { regex: /333/, title: 'Tam Hoa Tam Tài (333)', desc: 'Biểu tượng Thiên - Địa - Nhân hợp nhất, tài lộc vững như kiềng ba chân.' },
  { regex: /999|888|666/, title: 'Tam Hoa Phú Quý', desc: 'Đại cát đại lợi, vượng khí hội tụ, danh tiếng vang xa.' },
  { regex: /39|79/, title: 'Thần Tài Hộ Mệnh (39 / 79)', desc: 'Cặp số Thần Tài nhỏ (39) và Thần Tài lớn (79) chiêu tài tiến bảo.' },
  { regex: /68|86/, title: 'Lộc Phát Trường Cửu (68 / 86)', desc: 'Lộc phát sinh sôi, kinh doanh thuận buồm xuôi gió.' },
  { regex: /97$/, title: 'Đuôi Cửu Thất Đắc Quyền (97)', desc: 'Hỏa Kim luyện bảo, hậu vận hiển đạt, nắm bắt cơ hội lớn.' },
  { regex: /0983339397/, title: 'Kim Số Đại Cát K94 Media (0983.339.397)', desc: 'Dãy số hội tụ Cửu Tử (9), Phát Lộc (8), Tam Tài (333) và Thần Tài Cửu Thất (39-97) đại cát tường!' }
];

const DIGIT_ELEMENT = {
  '1': 'Thủy', '6': 'Thủy',
  '2': 'Thổ', '8': 'Thổ', '5': 'Thổ', '0': 'Thổ',
  '3': 'Mộc', '4': 'Mộc',
  '7': 'Kim', '9': 'Hỏa'
};

const GENERATES = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };

function getYearElement(year) {
  const stemIdx = (year - 4) % 10;
  const branchIdx = (year - 4) % 12;
  let jiazi = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIdx && i % 12 === branchIdx) {
      jiazi = i;
      break;
    }
  }
  const elements = [
    'Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim', 'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc',
    'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy', 'Kim', 'Hỏa', 'Mộc', 'Thổ', 'Kim',
    'Hỏa', 'Thủy', 'Thổ', 'Kim', 'Mộc', 'Thủy', 'Thổ', 'Hỏa', 'Mộc', 'Thủy'
  ];
  return elements[Math.floor(jiazi / 2)];
}

function classifyPair(pairStr) {
  for (const key of Object.keys(BAT_CUC_PAIRS)) {
    const group = BAT_CUC_PAIRS[key];
    if (group.pairs.includes(pairStr)) {
      return group;
    }
  }
  return BAT_CUC_PAIRS.phucVi;
}

export default function SimPhongThuyPage() {
  const [mode, setMode] = useState('sim'); // 'sim' | 'plate' | 'bank'
  const [inputNumber, setInputNumber] = useState('0983339397');
  const [birthYear, setBirthYear] = useState(1994);

  const analysis = useMemo(() => {
    const digits = inputNumber.replace(/\D/g, '');
    if (digits.length < 3) return null;

    // 1. Yin-Yang balance
    let evenCount = 0;
    let oddCount = 0;
    const elemCounts = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };

    for (const ch of digits) {
      const n = parseInt(ch, 10);
      if (n % 2 === 0) evenCount++;
      else oddCount++;
      const el = DIGIT_ELEMENT[ch] || 'Thổ';
      elemCounts[el] = (elemCounts[el] || 0) + 1;
    }

    const ratioDiff = Math.abs(evenCount - oddCount) / digits.length;
    const yinYangScore = ratioDiff <= 0.2 ? 96 : ratioDiff <= 0.4 ? 88 : 78;
    const yinYangComment =
      ratioDiff <= 0.25
        ? 'Âm Dương cân bằng hoàn hảo (Vượng khí hài hòa)'
        : evenCount > oddCount
        ? 'Vượng Âm (Trầm ổn, giữ tài sản bền vững)'
        : 'Vượng Dương (Năng động, bứt phá, quyết đoán mở đường)';

    // 2. Dominant element of number sequence
    const sortedElems = Object.entries(elemCounts).sort((a, b) => b[1] - a[1]);
    const dominantElem = sortedElems[0][0];
    const userElem = getYearElement(Number(birthYear) || 1994);

    let elemCompatibility = 'Tương Hòa / Bình Hòa';
    let elemScore = 86;
    if (GENERATES[dominantElem] === userElem || dominantElem === userElem) {
      elemCompatibility = `Đại Cát (Hành dãy số ${dominantElem} trợ vượng Bản mệnh ${userElem})`;
      elemScore = 96;
    } else if (GENERATES[userElem] === dominantElem) {
      elemCompatibility = `Cát Lợi (Bản mệnh ${userElem} sinh xuất phát tài cùng hành ${dominantElem})`;
      elemScore = 90;
    }

    // 3. I Ching Hexagram from first half and second half of digits
    const half = Math.floor(digits.length / 2);
    const upperSum = digits.slice(0, half).split('').reduce((a, b) => a + parseInt(b, 10), 0);
    const lowerSum = digits.slice(half).split('').reduce((a, b) => a + parseInt(b, 10), 0);
    const totalSum = upperSum + lowerSum;

    const baguaOrder = ['qian', 'dui', 'li', 'zhen', 'xun', 'kan', 'gen', 'kun'];
    const baguaBinary = {
      qian: '111', dui: '011', li: '101', zhen: '001',
      xun: '110', kan: '010', gen: '100', kun: '000'
    };
    const upperKey = baguaOrder[(upperSum || 1) % 8];
    const lowerKey = baguaOrder[(lowerSum || 2) % 8];
    const hexBinary = `${baguaBinary[lowerKey]}${baguaBinary[upperKey]}`;
    const hexagram = ICHING_64_HEXAGRAMS[hexBinary] || Object.values(ICHING_64_HEXAGRAMS)[0];

    // 4. Bát Cực Linh Số pairs
    const pairList = [];
    for (let i = 0; i < digits.length - 1; i++) {
      const p = digits.slice(i, i + 2);
      if (p.includes('0') || p.includes('5')) continue;
      pairList.push({ pair: p, info: classifyPair(p) });
    }
    const specialMatches = SPECIAL_AUSP_PATTERNS.filter((sp) => sp.regex.test(digits));

    // 5. Compute final score (out of 100) & 80-spirit remainder for plates/last 4 digits
    const last4 = parseInt(digits.slice(-4), 10) || 0;
    const mod80 = ((last4 % 80) || 80);

    const basePairScore =
      pairList.length > 0
        ? pairList.reduce((acc, item) => acc + item.info.score, 0) / pairList.length
        : 85;
    const bonus = specialMatches.length * 4 + (hexagram.rank?.includes('Thượng') ? 5 : 2);
    const finalScore = Math.min(99, Math.max(72, Math.round(basePairScore * 0.45 + yinYangScore * 0.25 + elemScore * 0.3 + bonus)));

    return {
      digits,
      evenCount,
      oddCount,
      yinYangComment,
      elemCounts,
      dominantElem,
      userElem,
      elemCompatibility,
      hexagram,
      totalSum,
      mod80,
      pairList,
      specialMatches,
      finalScore
    };
  }, [inputNumber, birthYear]);

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Chấm Điểm Sim & Biển Số K94</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/thuoc-lo-ban" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📏 Thước Lỗ Ban</Link>
            <Link href="/sao-han" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🏮 Sao Hạn & Tam Tai</Link>
            <Link href="/hop-tuoi" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🤝 Hợp Tuổi Làm Ăn</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Bát Cực Linh Số · 64 Quẻ Chu Dịch · Ngũ Hành Bản Mệnh
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Chấm Điểm Phong Thủy Sim, Biển Số Xe & Số Tài Khoản
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Phân tích chuyên sâu theo Âm Dương Tương Phối, Quẻ Kinh Dịch, Bát Cực Linh Số (Thiên Y, Sinh Khí, Diên Niên) và độ hợp Mệnh năm sinh.
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { id: 'sim', label: '📱 Sim Điện Thoại', sample: '0983339397' },
            { id: 'plate', label: '🚗 Biển Số Xe (5 số)', sample: '51K-939.79' },
            { id: 'bank', label: '🏦 Số Tài Khoản Ngân Hàng', sample: '999983339397' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setInputNumber(m.sample);
              }}
              style={{
                padding: '10px 20px',
                borderRadius: 999,
                border: mode === m.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                background: mode === m.id ? 'rgba(201,168,76,0.22)' : '#141722',
                color: mode === m.id ? '#F4E3B2' : '#A3A8B8',
                fontWeight: 700,
                fontSize: 13.5,
                cursor: 'pointer'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.32)', borderRadius: 20, padding: 24, marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              {mode === 'sim' ? 'Nhập Số Điện Thoại Cần Chấm Điểm' : mode === 'plate' ? 'Nhập Biển Số Xe (VD: 51K-939.79)' : 'Nhập Số Tài Khoản / CCCD'}
            </label>
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="VD: 0983339397"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #c9a84c', background: '#11131A', color: '#F4E3B2', fontSize: 18, fontWeight: 700, letterSpacing: 1.2 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Năm Sinh Chủ Nhân (Tính Ngũ Hành Bản Mệnh)
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              min={1930}
              max={2035}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 18, fontWeight: 700 }}
            />
          </div>
        </div>

        {analysis && (
          <>
            {/* Top Score & Hexagram Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 24, marginBottom: 28 }}>
              <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.18), rgba(16,18,26,0.95))', border: '1px solid rgba(201,168,76,0.45)', borderRadius: 22, padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
                  Điểm Linh Số Phong Thủy HHD
                </div>
                <div style={{ fontSize: 72, fontWeight: 800, fontFamily: 'var(--font-serif, serif)', color: '#F4E3B2', lineHeight: 1 }}>
                  {(analysis.finalScore / 10).toFixed(1)}<span style={{ fontSize: 28, color: '#c9a84c' }}>/10</span>
                </div>
                <div style={{ marginTop: 10, display: 'inline-block', padding: '5px 16px', borderRadius: 999, background: 'rgba(67,160,71,0.22)', color: '#81C784', fontSize: 13, fontWeight: 700 }}>
                  {analysis.finalScore >= 92 ? '★ Thượng Hạng Đại Cát · Chiêu Tài Tiến Bảo' : '★ Số Cát Tường · Vững Bền Hưng Vượng'}
                </div>

                <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left', fontSize: 13 }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 10 }}>
                    <div style={{ color: '#8C93A8', fontSize: 11 }}>Tổng Nút / Linh Số 80</div>
                    <div style={{ color: '#F4E3B2', fontWeight: 700, marginTop: 2 }}>
                      Tổng {analysis.totalSum} ({analysis.totalSum % 10 || 10} nút) · Linh số {analysis.mod80}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 10 }}>
                    <div style={{ color: '#8C93A8', fontSize: 11 }}>Âm Dương ({analysis.evenCount} Chẵn / {analysis.oddCount} Lẻ)</div>
                    <div style={{ color: '#81C784', fontWeight: 600, marginTop: 2, fontSize: 12 }}>
                      {analysis.yinYangComment}
                    </div>
                  </div>
                </div>
              </div>

              {/* I Ching Hexagram & Five Elements */}
              <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.28)', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700, letterSpacing: 1 }}>QUẺ KINH DỊCH CHỦ ĐẠO</span>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 99, background: 'rgba(201,168,76,0.18)', color: '#F4E3B2', fontWeight: 700 }}>
                      Quẻ số {analysis.hexagram.number} · {analysis.hexagram.rank}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 24, color: '#F4E3B2', margin: '0 0 6px 0' }}>
                    {analysis.hexagram.name} ({analysis.hexagram.zh})
                  </h2>
                  <p style={{ fontSize: 13.5, color: '#D0D5E2', margin: '0 0 10px 0', lineHeight: 1.55 }}>
                    <strong>Thoán từ:</strong> {analysis.hexagram.judgment}
                  </p>
                  <p style={{ fontSize: 13, color: '#9DA3B4', margin: 0, lineHeight: 1.55 }}>
                    <strong>Ứng dụng:</strong> {analysis.hexagram.advice}
                  </p>
                </div>

                <div style={{ padding: 14, borderRadius: 12, background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #c9a84c', fontSize: 13 }}>
                  <div>• Ngũ hành vượng nhất trong dãy số: <strong style={{ color: '#F4E3B2' }}>Hành {analysis.dominantElem}</strong></div>
                  <div style={{ marginTop: 4 }}>• Bản mệnh chủ nhân ({birthYear}): <strong style={{ color: '#c9a84c' }}>Hành {analysis.userElem}</strong> → <strong>{analysis.elemCompatibility}</strong></div>
                </div>
              </div>
            </div>

            {/* Special Auspicious Combinations */}
            {analysis.specialMatches.length > 0 && (
              <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(102,187,106,0.35)', borderRadius: 20, padding: 24, marginBottom: 28 }}>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#81C784', margin: '0 0 14px 0' }}>
                  ✦ Cách Cục Số Đặc Biệt Xuất Hiện Trong Dãy Số
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                  {analysis.specialMatches.map((sp) => (
                    <div key={sp.title} style={{ padding: 14, borderRadius: 12, background: 'rgba(67,160,71,0.1)', border: '1px solid rgba(102,187,106,0.28)' }}>
                      <div style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 15, marginBottom: 4 }}>{sp.title}</div>
                      <div style={{ fontSize: 13, color: '#C5C9D6', lineHeight: 1.5 }}>{sp.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bát Cực Linh Số Pair Breakdown */}
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#F4E3B2', margin: '0 0 14px 0' }}>
                Giải Mã Từng Cặp Từ Trường Bát Cực Linh Số
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {analysis.pairList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      background: item.info.type === 'good' ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                      border: item.info.type === 'good' ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: '#c9a84c' }}>Cặp {item.pair}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: item.info.type === 'good' ? '#81C784' : '#F4E3B2' }}>
                        {item.info.name}
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, color: '#B0B6C6', lineHeight: 1.5 }}>{item.info.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
