'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// Traditional Hán-Việt stroke dictionary for common Vietnamese surnames, middle names, and given names
const HAN_VIET_STROKES = {
  // Surnames
  'nguyễn': 12, 'trần': 16, 'lê': 15, 'phạm': 15, 'huỳnh': 12, 'hoàng': 12, 'phan': 15, 'vũ': 8, 'võ': 8,
  'đặng': 19, 'bùi': 14, 'đỗ': 7, 'hồ': 9, 'ngô': 7, 'dương': 13, 'lý': 7, 'trương': 11, 'đinh': 2,
  'lâm': 8, 'đoàn': 9, 'vương': 4, 'trịnh': 19, 'đào': 11, 'lương': 11, 'mai': 11, 'cao': 10, 'tô': 20,
  'hà': 7, 'tăng': 12, 'châu': 8, 'tạ': 17, 'phùng': 12, 'thái': 15, 'lưu': 15,
  // Common Middle & Given Names
  'văn': 4, 'thị': 4, 'hữu': 6, 'đức': 15, 'minh': 8, 'quang': 6, 'anh': 11, 'tuấn': 9, 'hùng': 12,
  'dũng': 9, 'nam': 9, 'hải': 10, 'sơn': 3, 'phong': 9, 'long': 16, 'khánh': 15, 'bảo': 20, 'gia': 10,
  'phúc': 14, 'lộc': 13, 'thọ': 14, 'tâm': 4, 'trí': 12, 'tín': 9, 'nhân': 4, 'nghĩa': 13, 'lễ': 18,
  'thành': 7, 'đạt': 16, 'phát': 12, 'tài': 3, 'vinh': 14, 'hoa': 10, 'phú': 12, 'quý': 12, 'khang': 11,
  'an': 6, 'bình': 5, 'hòa': 8, 'như': 6, 'ý': 13, 'ngọc': 5, 'châu': 9, 'bích': 14, 'kim': 8, 'ngân': 14,
  'hà': 9, 'giang': 6, 'thủy': 4, 'băng': 6, 'tuyết': 11, 'sương': 17, 'vân': 12, 'vũ': 8, 'lâm': 8,
  'tùng': 8, 'bách': 9, 'trúc': 6, 'mai': 11, 'lan': 21, 'cúc': 12, 'hương': 9, 'thảo': 10, 'diệp': 13,
  'nhật': 4, 'nguyệt': 4, 'tinh': 9, 'hồng': 9, 'đan': 4, 'huyền': 5, 'thanh': 11, 'lam': 17,
  'thiên': 4, 'địa': 6, 'huyền': 5, 'hoàng': 12, 'vũ': 8, 'trụ': 8, 'khôi': 14, 'nguyên': 10,
  'kiệt': 12, 'hào': 14, 'quân': 7, 'vương': 4, 'đế': 9, 'triều': 12, 'đình': 7, 'quốc': 11,
  'việt': 12, 'tường': 11, 'cát': 6, 'vượng': 8, 'thịnh': 12, 'hưng': 15, 'thái': 10, 'duy': 11,
  'khải': 12, 'đăng': 12, 'khoa': 9, 'bảng': 14, 'nhã': 12, 'trang': 13, 'hiền': 15, 'thục': 11,
  'trinh': 9, 'dung': 10, 'hạnh': 8, 'duyên': 15, 'my': 9, 'linh': 24, 'vy': 13, 'nhi': 8, 'yến': 16,
  'oanh': 21, 'phượng': 14, 'quyên': 10, 'điệp': 15, 'liên': 17, 'sen': 17, 'quỳnh': 20, 'trâm': 15
};

function stripAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function getWordStrokes(word) {
  const clean = word.trim().toLowerCase();
  if (!clean) return 0;
  if (HAN_VIET_STROKES[clean]) return HAN_VIET_STROKES[clean];
  const ascii = stripAccents(clean);
  let sum = 0;
  for (let i = 0; i < ascii.length; i++) {
    sum += (ascii.charCodeAt(i) % 5) + 1;
  }
  return Math.max(3, Math.min(22, sum));
}

function getElementFromNumber(num) {
  const last = num % 10;
  if (last === 1 || last === 2) return 'Mộc';
  if (last === 3 || last === 4) return 'Hỏa';
  if (last === 5 || last === 6) return 'Thổ';
  if (last === 7 || last === 8) return 'Kim';
  return 'Thủy';
}

const ELEMENT_COLORS = {
  'Kim': '#E2E8F0',
  'Mộc': '#81C784',
  'Thủy': '#64B5F6',
  'Hỏa': '#FF8A65',
  'Thổ': '#FFD54F'
};

// Auspicious numbers in 81 Linh Số
const DAI_CAT_NUMBERS = new Set([1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68, 81]);
const TRUNG_CAT_NUMBERS = new Set([26, 27, 30, 38, 40, 42, 49, 51, 55, 58, 71, 73, 75]);

function evaluateLinhSo(num) {
  const n = ((num - 1) % 81) + 1;
  if (DAI_CAT_NUMBERS.has(n)) {
    return { number: n, rank: 'Đại Cát', score: 95, desc: 'Số đại cát tường, vạn sự hanh thông, quý nhân phù trợ, công danh tài lộc song toàn.' };
  }
  if (TRUNG_CAT_NUMBERS.has(n)) {
    return { number: n, rank: 'Trung Cát', score: 80, desc: 'Số cát trung bình, tiền vận nỗ lực, hậu vận bền vững, giữ vững tâm đức ắt thành đại sự.' };
  }
  return { number: n, rank: 'Bình / Cần Cẩn Trọng', score: 66, desc: 'Số cần rèn luyện nghị lực, lấy đức chế mệnh, kiên trì vượt thử thách để chuyển dữ hóa lành.' };
}

const GENERATES = { 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc' };
const OVERCOMES = { 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc' };

function checkRelation(e1, e2) {
  if (e1 === e2) return { type: 'Tương Hòa (Bình Hòa)', bonus: 8 };
  if (GENERATES[e1] === e2 || GENERATES[e2] === e1) return { type: 'Tương Sinh (Đại Cát)', bonus: 15 };
  if (OVERCOMES[e1] === e2 || OVERCOMES[e2] === e1) return { type: 'Tương Khắc (Cần Trung Hòa)', bonus: -6 };
  return { type: 'Bình Thường', bonus: 0 };
}

const SUGGESTED_NAMES_BY_ELEMENT = {
  'Kim': [
    { name: 'Minh Khôi', meaning: 'Khôi ngô, sáng suốt, đứng đầu bảng vàng' },
    { name: 'Bảo Khánh', meaning: 'Tiếng chuông quý báo điềm lành cát tường' },
    { name: 'Tuấn Kiệt', meaning: 'Người tài năng xuất chúng, bản lĩnh kiên cường' },
    { name: 'Kim Ngân', meaning: 'Phú quý sung túc, cuộc đời vàng bạc đủ đầy' },
    { name: 'Bích Châu', meaning: 'Viên ngọc bích trân quý, trong sáng thuần khiết' },
    { name: 'Khánh Vy', meaning: 'Niềm vui dịu dàng, thanh nhã và thông tuệ' }
  ],
  'Mộc': [
    { name: 'Bách Tùng', meaning: 'Cây tùng cây bách hiên ngang giữa trời đất' },
    { name: 'Khôi Nguyên', meaning: 'Đỗ đầu khoa bảng, khởi đầu rạng rỡ' },
    { name: 'Gia Lâm', meaning: 'Rừng lớn hưng thịnh, phúc trạch gia môn' },
    { name: 'Thanh Trúc', meaning: 'Trúc xanh thanh cao, ngay thẳng và kiên định' },
    { name: 'Phương Thảo', meaning: 'Cỏ thơm dịu dàng, mang sức sống mãnh liệt' },
    { name: 'Bảo Lan', meaning: 'Hoa lan quý phái, cốt cách thanh tao' }
  ],
  'Thủy': [
    { name: 'Hải Đăng', meaning: 'Ngọn đèn biển dẫn lối giữa đại dương' },
    { name: 'Trường Giang', meaning: 'Dòng sông lớn chảy dài, tài lộc bất tận' },
    { name: 'Phúc Hải', meaning: 'Phúc đức mênh mông như biển cả' },
    { name: 'Thanh Hà', meaning: 'Dòng sông trong xanh, êm đềm và bình an' },
    { name: 'Băng Tâm', meaning: 'Tâm hồn trong sáng như băng tuyết' },
    { name: 'Khánh Vân', meaning: 'Đám mây lành mang tin vui và may mắn' }
  ],
  'Hỏa': [
    { name: 'Nhật Minh', meaning: 'Ánh mặt trời rực rỡ chiếu sáng muôn nơi' },
    { name: 'Quang Đăng', meaning: 'Ánh sáng trí tuệ soi đường dẫn lối' },
    { name: 'Đức Thịnh', meaning: 'Đức độ hưng thịnh, danh tiếng vang xa' },
    { name: 'Đan Thanh', meaning: 'Nét vẽ rực rỡ, tài hoa và duyên dáng' },
    { name: 'Hồng Ánh', meaning: 'Tia sáng hồng ấm áp, tràn đầy năng lượng' },
    { name: 'Minh Châu', meaning: 'Viên ngọc sáng chiếu rạng ngời' }
  ],
  'Thổ': [
    { name: 'Thái Sơn', meaning: 'Ngọn núi lớn vững chãi, chỗ dựa kiên cố' },
    { name: 'Gia Bảo', meaning: 'Báu vật vô giá của gia đình và dòng tộc' },
    { name: 'Thành Đạt', meaning: 'Công thành danh toại, sự nghiệp vững bền' },
    { name: 'Ngọc Bích', meaning: 'Ngọc quý trong đất trời, bền bỉ và cao sang' },
    { name: 'An Nhiên', meaning: 'Bình an, tự tại, vững vàng trước sóng gió' },
    { name: 'Hoàng Yến', meaning: 'Chim yến vàng cao quý, mang mùa xuân ấm áp' }
  ]
};

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

export default function NamingPage() {
  const [fullName, setFullName] = useState('Huỳnh Hữu Đệ');
  const [birthYear, setBirthYear] = useState(1995);
  const [activeTabElement, setActiveTabElement] = useState('Kim');

  const analysis = useMemo(() => {
    const words = fullName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return null;

    const strokes = words.map((w) => ({ word: w, count: getWordStrokes(w) }));
    const surnameStrokes = strokes[0].count;
    const givenStrokes = strokes[strokes.length - 1].count;
    const middleStrokes = strokes.length > 2
      ? strokes.slice(1, -1).reduce((acc, s) => acc + s.count, 0)
      : 0;

    // Five Grids (Ngũ Cách)
    const thienCach = surnameStrokes + 1;
    const nhanCach = surnameStrokes + (strokes.length > 1 ? strokes[1].count : 1);
    const diaCach = middleStrokes + givenStrokes + (strokes.length === 2 ? 1 : 0);
    const tongCach = strokes.reduce((a, b) => a + b.count, 0);
    const ngoaiCach = Math.max(2, tongCach - nhanCach + 1);

    const grids = [
      { key: 'Thiên Cách (Tiền Vận & Tổ Nghiệp)', val: thienCach, element: getElementFromNumber(thienCach), eval: evaluateLinhSo(thienCach) },
      { key: 'Nhân Cách (Chủ Vận & Tính Cách)', val: nhanCach, element: getElementFromNumber(nhanCach), eval: evaluateLinhSo(nhanCach) },
      { key: 'Địa Cách (Nội Tâm & Gia Đạo)', val: diaCach, element: getElementFromNumber(diaCach), eval: evaluateLinhSo(diaCach) },
      { key: 'Ngoại Cách (Quan Hệ & Quý Nhân)', val: ngoaiCach, element: getElementFromNumber(ngoaiCach), eval: evaluateLinhSo(ngoaiCach) },
      { key: 'Tổng Cách (Hậu Vận & Thành Tựu)', val: tongCach, element: getElementFromNumber(tongCach), eval: evaluateLinhSo(tongCach) }
    ];

    const tamTai = [grids[0].element, grids[1].element, grids[2].element];
    const rel1 = checkRelation(tamTai[0], tamTai[1]);
    const rel2 = checkRelation(tamTai[1], tamTai[2]);

    const yearElement = getYearElement(Number(birthYear) || 1995);
    const dominantNameElement = grids[1].element; // Nhân cách & Tổng cách
    const destinyRel = checkRelation(yearElement, dominantNameElement);

    const avgGridScore = grids.reduce((acc, g) => acc + g.eval.score, 0) / grids.length;
    const rawTotal = Math.round(avgGridScore + (rel1.bonus + rel2.bonus + destinyRel.bonus) * 0.4);
    const finalScore = Math.max(62, Math.min(99, rawTotal));

    return {
      strokes,
      grids,
      tamTai,
      rel1,
      rel2,
      yearElement,
      dominantNameElement,
      destinyRel,
      finalScore
    };
  }, [fullName, birthYear]);

  const applySuggestedName = (givenName) => {
    const words = fullName.trim().split(/\s+/).filter(Boolean);
    const surname = words.length > 0 ? words[0] : 'Nguyễn';
    setFullName(`${surname} ${givenName}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 96 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Danh Tính Học</span>
          </Link>
          <nav style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <Link href="/divination" style={{ color: '#A3A8B8', textDecoration: 'none' }}>☯ Gieo Quẻ Dịch</Link>
            <Link href="/calligraphy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🖌 Xin Chữ Ông Đồ</Link>
            <Link href="/fortune-sticks" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🎋 Lắc Xăm Cổ</Link>
            <Link href="/almanac" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📅 Lịch Vạn Niên</Link>
            <Link href="/compass" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🧭 La Bàn Bát Trạch</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Ngũ Cách Linh Số · Tam Tài Ngũ Hành · Đặt Tên Hợp Mệnh
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Chấm Điểm Họ Tên & Đặt Tên Hợp Mệnh HHD
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            Phân tích 81 Linh Số Hán-Việt, cấu trúc Tam Tài (Thiên - Nhân - Địa), Ngũ Cách và độ tương hợp với Bản Mệnh năm sinh.
          </p>
        </div>

        {/* Input Form */}
        <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Họ và Tên Đầy Đủ
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên (VD: Huỳnh Hữu Đệ)"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 600 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>
              Năm Sinh Dương Lịch (Tính Bản Mệnh)
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              min={1920}
              max={2040}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 600 }}
            />
          </div>
        </div>

        {analysis && (
          <>
            {/* Score Summary Card */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 28 }}>
              <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.16), rgba(18,20,28,0.95))', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 20, padding: 28, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
                  Tổng Điểm Cát Tường Danh Tính
                </div>
                <div style={{ fontSize: 72, fontWeight: 800, fontFamily: 'var(--font-serif, serif)', color: '#F4E3B2', lineHeight: 1 }}>
                  {analysis.finalScore}<span style={{ fontSize: 28, color: '#c9a84c' }}>/100</span>
                </div>
                <div style={{ marginTop: 10, padding: '5px 16px', borderRadius: 999, background: 'rgba(67,160,71,0.2)', color: '#81C784', fontSize: 13, fontWeight: 700 }}>
                  {analysis.finalScore >= 90 ? 'Danh Chấn Thiên Hạ · Đại Cát Tường' : analysis.finalScore >= 80 ? 'Cát Danh Thiện Mỹ · Vững Bền Hanh Thông' : 'Danh Tính Trung Hòa · Lấy Đức Bồi Phúc'}
                </div>

                {/* Stroke pills */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
                  {analysis.strokes.map((s, idx) => (
                    <div key={idx} style={{ padding: '6px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.25)', fontSize: 13 }}>
                      <strong style={{ color: '#F4E3B2' }}>{s.word}</strong>: <span style={{ color: '#c9a84c' }}>{s.count} nét</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tam Tài & Bản Mệnh Card */}
              <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
                <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700, letterSpacing: 1 }}>
                  CẤU TRÚC TAM TÀI & BẢN MỆNH NĂM SINH ({birthYear})
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 14 }}>
                  {['Thiên', 'Nhân', 'Địa'].map((label, idx) => {
                    const el = analysis.tamTai[idx];
                    return (
                      <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#8C93A8' }}>{label} Tài</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: ELEMENT_COLORS[el], marginTop: 4 }}>{el}</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'grid', gap: 10, fontSize: 13 }}>
                  <div style={{ padding: 11, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    • Thiên - Nhân: <strong style={{ color: '#F4E3B2' }}>{analysis.rel1.type}</strong> · Nhân - Địa: <strong style={{ color: '#F4E3B2' }}>{analysis.rel2.type}</strong>
                  </div>
                  <div style={{ padding: 11, borderRadius: 10, background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #c9a84c' }}>
                    • Bản Mệnh năm <strong>{birthYear}</strong> thuộc hành <strong style={{ color: ELEMENT_COLORS[analysis.yearElement] }}>{analysis.yearElement}</strong>, Chủ Vận Họ Tên thuộc hành <strong style={{ color: ELEMENT_COLORS[analysis.dominantNameElement] }}>{analysis.dominantNameElement}</strong> → <strong>{analysis.destinyRel.type}</strong>.
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Grids (Ngũ Cách) Detailed Cards */}
            <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 16px 0' }}>
                Luận Giải Chi Tiết Ngũ Cách & 81 Linh Số
              </h2>
              <div style={{ display: 'grid', gap: 14 }}>
                {analysis.grids.map((g) => (
                  <div key={g.key} style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ flex: '1 1 380px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 15 }}>{g.key}</span>
                        <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 99, background: 'rgba(201,168,76,0.18)', color: ELEMENT_COLORS[g.element], fontWeight: 600 }}>
                          Hành {g.element} · Linh số {g.eval.number}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: '#B0B6C6', lineHeight: 1.5 }}>{g.eval.desc}</div>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: 999, background: g.eval.rank === 'Đại Cát' ? 'rgba(67,160,71,0.2)' : 'rgba(201,168,76,0.18)', color: g.eval.rank === 'Đại Cát' ? '#81C784' : '#F4E3B2', fontWeight: 700, fontSize: 13 }}>
                      {g.eval.rank}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Curated Name Suggestions by Element */}
        <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 4px 0' }}>
                Kho Tên Đẹp Hợp Ngũ Hành (Bấm Để Thử Ngay)
              </h2>
              <p style={{ fontSize: 13, color: '#9DA3B4', margin: 0 }}>
                Gợi ý các tên đệm + tên chính mang Linh Số Đại Cát theo từng hành:
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].map((el) => (
                <button
                  key={el}
                  onClick={() => setActiveTabElement(el)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    border: activeTabElement === el ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    background: activeTabElement === el ? 'rgba(201,168,76,0.22)' : 'transparent',
                    color: ELEMENT_COLORS[el],
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Hành {el}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {SUGGESTED_NAMES_BY_ELEMENT[activeTabElement].map((item) => (
              <div
                key={item.name}
                onClick={() => applySuggestedName(item.name)}
                style={{
                  padding: 16,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,168,76,0.22)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 16 }}>{item.name}</span>
                  <span style={{ fontSize: 11, color: '#c9a84c', border: '1px solid rgba(201,168,76,0.35)', padding: '2px 8px', borderRadius: 99 }}>
                    Thử tên →
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#9DA3B4', lineHeight: 1.5 }}>{item.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
