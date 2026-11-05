'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Solar } from 'lunar-javascript';

const STEMS_VN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const BRANCHES_VN = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const ZODIAC_ANIMALS_VN = ['Chuột (Tý)', 'Trâu (Sửu)', 'Hổ (Dần)', 'Mèo (Mão)', 'Rồng (Thìn)', 'Rắn (Tỵ)', 'Ngựa (Ngọ)', 'Dê (Mùi)', 'Khỉ (Thân)', 'Gà (Dậu)', 'Chó (Tuất)', 'Lợn (Hợi)'];
const FIVE_ELEMENTS_VN = { 'Giáp': 'Mộc', 'Ất': 'Mộc', 'Bính': 'Hỏa', 'Đinh': 'Hỏa', 'Mậu': 'Thổ', 'Kỷ': 'Thổ', 'Canh': 'Kim', 'Tân': 'Kim', 'Nhâm': 'Thủy', 'Quý': 'Thủy' };

const TWELVE_TRUC = [
  { name: 'Kiến', status: 'Bình', good: 'Xuất hành, nhậm chức, thượng lương, cầu tài', bad: 'Động thổ, đào giếng, mở kho, an táng' },
  { name: 'Trừ', status: 'Hoàng Đạo (Tốt)', good: 'Trừ phục, giải hạn, cúng tế, dọn dẹp, chữa bệnh, giao dịch', bad: 'Cưới hỏi, đi xa, ký kết lớn' },
  { name: 'Mãn', status: 'Hoàng Đạo (Tốt)', good: 'Khai trương, cầu tài,祭 tự, xuất hành, sửa chữa kho tàng', bad: 'Kiện tụng, nhậm chức, uống thuốc' },
  { name: 'Bình', status: 'Bình', good: 'Tu tạo, sửa đường, đắp đê, nhập kho, an máy', bad: 'Đào mương, trồng cây, khai nghiệp lớn' },
  { name: 'Định', status: 'Hoàng Đạo (Tốt)', good: 'Cưới hỏi, giao dịch, ký hợp đồng, nhập học, làm chuồng trại', bad: 'Thưa kiện, xuất hành đường thủy, chữa bệnh' },
  { name: 'Chấp', status: 'Bình', good: 'Xây dựng, tu sửa, lập khế ước, tế tự, tuyển dụng', bad: 'Mở kho, xuất tiền của, dời nhà đi xa' },
  { name: 'Phá', status: 'Hắc Đạo (Xấu)', good: 'Phá dỡ nhà cũ, chữa bệnh ung nhọt, giải trừ tai ách', bad: 'Khai trương, cưới hỏi, ký hợp đồng, mua xe, nhập trạch' },
  { name: 'Nguy', status: 'Hắc Đạo (Xấu)', good: 'An sàng, tế tự, cầu phúc, tịnh tâm tu dưỡng', bad: 'Leo cao, đi thuyền, xuất hành xa, động thổ, cưới gả' },
  { name: 'Thành', status: 'Hoàng Đạo (Đại Cát)', good: 'Khai trương, cưới hỏi, nhập học, ký hợp đồng, nhập trạch, cầu tài', bad: 'Kiện tụng, tranh chấp' },
  { name: 'Thu', status: 'Bình', good: 'Thu hoạch, nạp tài, mua bất động sản, cất giữ tài sản, tuyển người', bad: 'An táng, khởi công lớn, khám chữa bệnh' },
  { name: 'Khai', status: 'Hoàng Đạo (Đại Cát)', good: 'Khai trương, động thổ, nhập trạch, cưới hỏi, xuất hành, nhậm chức', bad: 'An táng, động đất phần âm' },
  { name: 'Bế', status: 'Hắc Đạo (Xấu)', good: 'Đắp đê, lấp lỗ, tu bổ tường rào, lập bia', bad: 'Khai trương, xuất hành, cưới hỏi, phẫu thuật, cầu tài' }
];

// Hoàng đạo hours lookup by Day Branch index (0..11)
// In traditional Vietnamese almanac, each day branch has 6 auspicious hours (Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh)
const HOANG_DAO_HOURS_BY_DAY_BRANCH = {
  0: [0, 1, 3, 6, 8, 9],   // Tý, Ngọ
  6: [0, 1, 3, 6, 8, 9],
  1: [2, 3, 5, 8, 10, 11], // Sửu, Mùi
  7: [2, 3, 5, 8, 10, 11],
  2: [0, 1, 4, 5, 7, 10],  // Dần, Thân
  8: [0, 1, 4, 5, 7, 10],
  3: [0, 2, 3, 6, 7, 9],   // Mão, Dậu
  9: [0, 2, 3, 6, 7, 9],
  4: [2, 4, 5, 8, 9, 11],  // Thìn, Tuất
  10: [2, 4, 5, 8, 9, 11],
  5: [1, 4, 6, 7, 10, 11], // Tỵ, Hợi
  11: [1, 4, 6, 7, 10, 11],
};

const HOUR_RANGES = [
  '23:00 - 01:00', '01:00 - 03:00', '03:00 - 05:00', '05:00 - 07:00',
  '07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00',
  '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00'
];

const NAP_AM_60 = [
  'Hải Trung Kim (Vàng trong biển)', 'Lư Trung Hỏa (Lửa trong lò)', 'Đại Lâm Mộc (Gỗ rừng già)', 'Lộ Bàng Thổ (Đất ven đường)', 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Sơn Đầu Hỏa (Lửa đầu núi)', 'Giản Hạ Thủy (Nước dưới khe)', 'Thành Đầu Thổ (Đất đầu thành)', 'Bạch Lạp Kim (Vàng chân đèn)', 'Dương Liễu Mộc (Gỗ cây liễu)',
  'Tuyền Trung Thủy (Nước trong suối)', 'Ốc Thượng Thổ (Đất mái nhà)', 'Tích Lịch Hỏa (Lửa sấm sét)', 'Tùng Bách Mộc (Gỗ tùng bách)', 'Trường Lưu Thủy (Nước chảy dài)',
  'Sa Trung Kim (Vàng trong cát)', 'Sơn Hạ Hỏa (Lửa dưới núi)', 'Bình Địa Mộc (Gỗ đồng bằng)', 'Bích Thượng Thổ (Đất tò vò)', 'Kim Bạch Kim (Vàng pha bạc)',
  'Phú Đăng Hỏa (Lửa đèn chụp)', 'Thiên Hà Thủy (Nước trên trời)', 'Đại Dịch Thổ (Đất nền lớn)', 'Thoa Xuyến Kim (Vàng trang sức)', 'Tang Đố Mộc (Gỗ cây dâu)',
  'Đại Khê Thủy (Nước khe lớn)', 'Sa Trung Thổ (Đất pha cát)', 'Thiên Thượng Hỏa (Lửa trên trời)', 'Thạch Lựu Mộc (Gỗ cây lựu)', 'Đại Hải Thủy (Nước biển lớn)'
];

function computeDayAlmanac(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const solar = Solar.fromYmd(y, m, d);
  const lunar = solar.getLunar();

  const yearStemIdx = lunar.getYearGanIndex();
  const yearBranchIdx = lunar.getYearZhiIndex();
  const monthStemIdx = lunar.getMonthGanIndex();
  const monthBranchIdx = lunar.getMonthZhiIndex();
  const dayStemIdx = lunar.getDayGanIndex();
  const dayBranchIdx = lunar.getDayZhiIndex();

  const yearCanChi = `${STEMS_VN[yearStemIdx]} ${BRANCHES_VN[yearBranchIdx]}`;
  const monthCanChi = `${STEMS_VN[monthStemIdx]} ${BRANCHES_VN[monthBranchIdx]}`;
  const dayCanChi = `${STEMS_VN[dayStemIdx]} ${BRANCHES_VN[dayBranchIdx]}`;

  // 60 Jiazi index for Day
  let jiaziIdx = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 10 === dayStemIdx && i % 12 === dayBranchIdx) {
      jiaziIdx = i;
      break;
    }
  }
  const napAm = NAP_AM_60[Math.floor(jiaziIdx / 2)];

  // Trực index: (dayBranchIdx - monthBranchIdx + 12) % 12
  const trucIdx = (dayBranchIdx - monthBranchIdx + 12) % 12;
  const truc = TWELVE_TRUC[trucIdx];

  // Hourly Can Chi & Hoàng Đạo
  const hoangDaoIndices = HOANG_DAO_HOURS_BY_DAY_BRANCH[dayBranchIdx] || [];
  const firstHourStemIdx = (dayStemIdx % 5) * 2;
  const hours = BRANCHES_VN.map((branch, idx) => {
    const hStem = STEMS_VN[(firstHourStemIdx + idx) % 10];
    const isHoangDao = hoangDaoIndices.includes(idx);
    return {
      branch,
      canChi: `${hStem} ${branch}`,
      range: HOUR_RANGES[idx],
      isHoangDao,
    };
  });

  // Conflicting age (Tuổi xung)
  const clashBranchIdx = (dayBranchIdx + 6) % 12;
  const clashStemIdx = (dayStemIdx + 6) % 10;
  const tuoiXung = `${STEMS_VN[clashStemIdx]} ${BRANCHES_VN[clashBranchIdx]} (${ZODIAC_ANIMALS_VN[clashBranchIdx]})`;

  // Auspicious travel directions (Hướng xuất hành)
  const hyThanDirections = ['Đông Bắc', 'Tây Bắc', 'Tây Nam', 'Chính Nam', 'Đông Nam', 'Đông Bắc', 'Tây Bắc', 'Tây Nam', 'Chính Nam', 'Đông Nam'];
  const taiThanDirections = ['Đông Nam', 'Đông Nam', 'Chính Đông', 'Chính Đông', 'Chính Bắc', 'Chính Nam', 'Tây Nam', 'Tây Nam', 'Chính Bắc', 'Chính Nam'];

  const isHoangDaoDay = truc.status.includes('Hoàng Đạo');
  const isHacDaoDay = truc.status.includes('Hắc Đạo');

  return {
    solar: { year: y, month: m, day: d, dayOfWeek: solar.getWeek() },
    lunar: {
      day: lunar.getDay(),
      month: Math.abs(lunar.getMonth()),
      isLeap: lunar.getMonth() < 0,
      year: lunar.getYear(),
      zodiac: ZODIAC_ANIMALS_VN[yearBranchIdx],
    },
    canChi: { year: yearCanChi, month: monthCanChi, day: dayCanChi },
    element: FIVE_ELEMENTS_VN[STEMS_VN[dayStemIdx]],
    napAm,
    truc,
    hours,
    tuoiXung,
    hyThan: hyThanDirections[dayStemIdx],
    taiThan: taiThanDirections[dayStemIdx],
    dayQuality: isHoangDaoDay ? 'Ngày Hoàng Đạo (Đại Cát)' : isHacDaoDay ? 'Ngày Hắc Đạo (Kỵ Việc Lớn)' : 'Ngày Bình Thường (Chấp Trung)',
    score: isHoangDaoDay ? 90 : isHacDaoDay ? 42 : 70,
  };
}

const WEEKDAYS_VN = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

export default function AlmanacPage() {
  const todayStr = useMemo(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [purposeFilter, setPurposeFilter] = useState('Khai trương');

  const data = useMemo(() => computeDayAlmanac(selectedDate), [selectedDate]);

  // Compute best days in the selected month for the chosen purpose
  const monthlyGoodDays = useMemo(() => {
    const [y, m] = selectedDate.split('-').map(Number);
    const daysInMonth = new Date(y, m, 0).getDate();
    const list = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const info = computeDayAlmanac(ds);
      const matchesPurpose = info.truc.good.toLowerCase().includes(purposeFilter.toLowerCase()) || info.score >= 85;
      if (matchesPurpose && info.score >= 70) {
        list.push({ dateStr: ds, day: d, info });
      }
    }
    return list;
  }, [selectedDate, purposeFilter]);

  const shiftDays = (delta) => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const dt = new Date(y, m - 1, d + delta);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 96 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Trạch Nhật Vạn Niên</span>
          </Link>
          <nav style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <Link href="/divination" style={{ color: '#A3A8B8', textDecoration: 'none' }}>☯ Gieo Quẻ Dịch</Link>
            <Link href="/calligraphy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🖌 Xin Chữ Ông Đồ</Link>
            <Link href="/fortune-sticks" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🎋 Lắc Xăm Cổ</Link>
            <Link href="/naming" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📜 Chấm Điểm Tên</Link>
            <Link href="/compass" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🧭 La Bàn Bát Trạch</Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Âm Dương Lịch · Thập Nhị Kiến Trừ · Giờ Hoàng Đạo
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Lịch Vạn Niên & Trạch Nhật Cát Tường HHD
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            Tra cứu ngày Âm - Dương, Tứ Trụ Can Chi, Ngũ Hành Nạp Âm, 12 Trực Kiến Trừ và chọn ngày lành tháng tốt cho đại sự.
          </p>
        </div>

        {/* Date Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          <button onClick={() => shiftDays(-1)} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.3)', background: '#141720', color: '#E8D5A3', cursor: 'pointer' }}>
            ← Hôm trước
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            style={{ padding: '10px 18px', borderRadius: 10, border: '1px solid #c9a84c', background: '#141720', color: '#F4E3B2', fontSize: 15, fontWeight: 600 }}
          />
          <button onClick={() => setSelectedDate(todayStr)} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.14)', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>
            Hôm nay
          </button>
          <button onClick={() => shiftDays(1)} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.3)', background: '#141720', color: '#E8D5A3', cursor: 'pointer' }}>
            Hôm sau →
          </button>
        </div>

        {/* Main Bloc Calendar Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
          {/* Left: Classical Bloc Tear-off Card */}
          <div style={{ background: 'linear-gradient(160deg, #1b1716, #11131a)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 20, padding: 28, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 13, color: '#c9a84c', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
              Dương Lịch · Tháng {data.solar.month} Năm {data.solar.year}
            </div>
            <div style={{ fontSize: 18, color: '#E8D5A3', fontWeight: 600, marginBottom: 8 }}>
              {WEEKDAYS_VN[data.solar.dayOfWeek]}
            </div>
            <div style={{ fontSize: 84, fontWeight: 800, fontFamily: 'var(--font-serif, serif)', color: '#F4E3B2', lineHeight: 1, margin: '8px 0 14px 0', textShadow: '0 6px 24px rgba(201,168,76,0.3)' }}>
              {data.solar.day}
            </div>

            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: data.score >= 85 ? 'rgba(67,160,71,0.2)' : data.score <= 50 ? 'rgba(229,57,53,0.2)' : 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)', color: data.score >= 85 ? '#81C784' : data.score <= 50 ? '#EF9A9A' : '#F4E3B2', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
              {data.dayQuality}
            </div>

            <div style={{ borderTop: '1px dashed rgba(201,168,76,0.25)', paddingTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: '#8C93A8', textTransform: 'uppercase' }}>Âm Lịch</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#c9a84c', marginTop: 4 }}>
                  {data.lunar.day}/{data.lunar.month}{data.lunar.isLeap ? ' (Nhuận)' : ''}
                </div>
                <div style={{ fontSize: 12, color: '#B0B6C6' }}>Năm {data.canChi.year}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: '#8C93A8', textTransform: 'uppercase' }}>Tứ Trụ Can Chi</div>
                <div style={{ fontSize: 13, color: '#E8D5A3', marginTop: 4, lineHeight: 1.5 }}>
                  <div>Ngày: <strong>{data.canChi.day}</strong></div>
                  <div>Tháng: <strong>{data.canChi.month}</strong></div>
                  <div>Năm: <strong>{data.canChi.year}</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Almanac Attributes */}
          <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600, letterSpacing: 1 }}>THÔNG TIN TRẠCH NHẬT</span>
                <span style={{ fontSize: 13, color: '#F4E3B2', background: 'rgba(201,168,76,0.14)', padding: '4px 12px', borderRadius: 999 }}>
                  Trực: {data.truc.name} ({data.truc.status})
                </span>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                  <span style={{ color: '#8C93A8', fontSize: 13 }}>Ngũ Hành Nạp Âm: </span>
                  <strong style={{ color: '#F4E3B2', fontSize: 14 }}>{data.napAm}</strong>
                </div>
                <div style={{ padding: 12, borderRadius: 10, background: 'rgba(67,160,71,0.1)', borderLeft: '3px solid #66BB6A' }}>
                  <div style={{ fontSize: 12, color: '#81C784', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>✓ Việc Nên Làm (Nghi)</div>
                  <div style={{ fontSize: 14, color: '#E2E4E9', lineHeight: 1.5 }}>{data.truc.good}</div>
                </div>
                <div style={{ padding: 12, borderRadius: 10, background: 'rgba(229,57,53,0.1)', borderLeft: '3px solid #EF5350' }}>
                  <div style={{ fontSize: 12, color: '#EF9A9A', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>✕ Việc Kiêng Kỵ (Kỵ)</div>
                  <div style={{ fontSize: 14, color: '#E2E4E9', lineHeight: 1.5 }}>{data.truc.bad}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontSize: 11, color: '#8C93A8' }}>Tuổi Xung Khắc Ngày</div>
                    <div style={{ fontSize: 13, color: '#EF9A9A', fontWeight: 600, marginTop: 4 }}>{data.tuoiXung}</div>
                  </div>
                  <div style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontSize: 11, color: '#8C93A8' }}>Hướng Xuất Hành Tốt</div>
                    <div style={{ fontSize: 13, color: '#F4E3B2', fontWeight: 600, marginTop: 4 }}>
                      Hỷ: {data.hyThan} · Tài: {data.taiThan}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 12 Hourly Hoàng Đạo / Hắc Đạo Grid */}
        <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26, marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 6px 0' }}>
            12 Khung Giờ Hoàng Đạo & Hắc Đạo Trong Ngày ({data.canChi.day})
          </h2>
          <p style={{ fontSize: 13, color: '#9DA3B4', margin: '0 0 18px 0' }}>
            Khung giờ viền vàng kim là <strong>Giờ Hoàng Đạo (Tốt)</strong> thích hợp khởi sự, xuất hành, mở hàng, ký kết.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {data.hours.map((h) => (
              <div
                key={h.branch}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: h.isHoangDao ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(255,255,255,0.08)',
                  background: h.isHoangDao ? 'linear-gradient(145deg, rgba(201,168,76,0.16), rgba(20,22,30,0.9))' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: h.isHoangDao ? '#F4E3B2' : '#9DA3B4', fontSize: 14 }}>Giờ {h.branch}</span>
                  <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 99, background: h.isHoangDao ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)', color: h.isHoangDao ? '#c9a84c' : '#7D8498' }}>
                    {h.isHoangDao ? '★ Hoàng Đạo' : 'Hắc Đạo'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#C5C9D6' }}>{h.range}</div>
                <div style={{ fontSize: 11, color: '#8C93A8', marginTop: 2 }}>Can chi: {h.canChi}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Auspicious Day Finder */}
        <div style={{ background: 'rgba(20,22,30,0.85)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 4px 0' }}>
                Tầm Ngày Hoàng Đạo Trong Tháng {data.solar.month}/{data.solar.year}
              </h2>
              <p style={{ fontSize: 13, color: '#9DA3B4', margin: 0 }}>
                Chọn mục đích công việc để lọc các ngày cát tường nhất trong tháng hiện tại:
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Nhập trạch', 'Cầu tài', 'Ký hợp đồng'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPurposeFilter(p)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 999,
                    border: purposeFilter === p ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    background: purposeFilter === p ? 'rgba(201,168,76,0.22)' : 'transparent',
                    color: purposeFilter === p ? '#F4E3B2' : '#A3A8B8',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {monthlyGoodDays.map((item) => (
              <div
                key={item.dateStr}
                onClick={() => setSelectedDate(item.dateStr)}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: item.dateStr === selectedDate ? '1px solid #c9a84c' : '1px solid rgba(201,168,76,0.2)',
                  background: item.dateStr === selectedDate ? 'rgba(201,168,76,0.16)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: '#F4E3B2', fontSize: 15 }}>
                    Dương: {item.day}/{data.solar.month}
                  </span>
                  <span style={{ fontSize: 11, color: '#81C784', background: 'rgba(67,160,71,0.18)', padding: '2px 8px', borderRadius: 99 }}>
                    Trực {item.info.truc.name}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#c9a84c', marginBottom: 4 }}>
                  Âm lịch: {item.info.lunar.day}/{item.info.lunar.month} ({item.info.canChi.day})
                </div>
                <div style={{ fontSize: 11, color: '#9DA3B4' }}>
                  {item.info.napAm}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
