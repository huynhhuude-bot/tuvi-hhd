'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const CUU_DIEU_STARS = {
  'Thái Dương': {
    type: 'Cát Tinh (Thượng Cát ★)',
    isGood: true,
    dayWorship: 'Ngày 27 Âm lịch hàng tháng (tốt nhất tháng Giêng, tháng 6)',
    direction: 'Chính Đông',
    candles: '12 ngọn nến',
    desc: 'Mặt trời rực rỡ chiếu sáng bốn phương. Năm nay công danh thăng tiến, kinh doanh phát đạt, đi xa đắc lộc, gặp hung hóa cát.'
  },
  'Thái Âm': {
    type: 'Cát Tinh (Thượng Cát Tài Điền ★)',
    isGood: true,
    dayWorship: 'Ngày 26 Âm lịch hàng tháng (đặc biệt tháng 9 Âm lịch)',
    direction: 'Chính Tây',
    candles: '7 ngọn nến',
    desc: 'Ánh trăng hiền hòa chủ về điền sản, nhà đất, hỷ sự và tài lộc dồi dào, quý nhân nữ giới trợ lực.'
  },
  'Mộc Đức': {
    type: 'Cát Tinh (Phúc Lộc Viên Mãn ★)',
    isGood: true,
    dayWorship: 'Ngày 25 Âm lịch hàng tháng (tháng 10 và tháng Chạp đại cát)',
    direction: 'Chính Đông',
    candles: '20 ngọn nến',
    desc: 'Triều nguyên tinh chiếu mệnh, thuận lợi thăng quan tiến chức, cưới hỏi, mở rộng cơ nghiệp; lưu ý giữ gìn mắt và huyết áp.'
  },
  'Thủy Diệu': {
    type: 'Cát Tinh (Tài Lộc & Hỷ Tín ★)',
    isGood: true,
    dayWorship: 'Ngày 21 Âm lịch hàng tháng (tháng 4 và tháng 8 đại lợi)',
    direction: 'Chính Bắc',
    candles: '7 ngọn nến',
    desc: 'Phúc lộc tinh chủ về tài lộc thương mại, đi xa có lộc lớn; chỉ cần cẩn trọng lời ăn tiếng nói và sông nước tháng 4, tháng 8.'
  },
  'Thổ Tú': {
    type: 'Trung Tinh (Thử Thách Nhẹ)',
    isGood: false,
    dayWorship: 'Ngày 19 Âm lịch hàng tháng',
    direction: 'Chính Tây',
    candles: '5 ngọn nến',
    desc: 'Năm cần giữ tâm bình hòa, tránh nghe lời gièm pha thị phi, kiên định với công việc chính thì cuối năm thu thành quả ổn định.'
  },
  'Vân Hán': {
    type: 'Trung Tinh (Phòng Khẩu Thiệt)',
    isGood: false,
    dayWorship: 'Ngày 29 Âm lịch hàng tháng',
    direction: 'Chính Nam',
    candles: '15 ngọn nến',
    desc: 'Công việc ở mức trung bình, cần giữ gìn giấy tờ pháp lý rõ ràng, phòng nóng trong người và tránh tranh cãi tháng 2, tháng 8.'
  },
  'La Hầu': {
    type: 'Hung Tinh (Cần Dâng Sao Giải Hạn)',
    isGood: false,
    dayWorship: 'Ngày mùng 8 Âm lịch hàng tháng (quan trọng nhất mùng 8 tháng Giêng)',
    direction: 'Chính Bắc',
    candles: '9 ngọn nến',
    desc: 'Khẩu thiệt tinh: cần giữ lời nói ôn hòa, tránh kiện tụng, giữ gìn sức khỏe tai mắt và tránh đầu tư mạo hiểm tháng Giêng, tháng 7.'
  },
  'Kế Đô': {
    type: 'Hung Tinh (Lấy Tĩnh Chế Động)',
    isGood: false,
    dayWorship: 'Ngày 18 Âm lịch hàng tháng (mùng 18 tháng Giêng & tháng 3, tháng 9)',
    direction: 'Chính Tây',
    candles: '21 ngọn nến',
    desc: 'Dễ lo âu nội tâm hoặc gặp thị phi; song người đi xa làm ăn hoặc làm việc thiện tích đức sẽ chuyển hung thành cát, tài lộc bất ngờ.'
  },
  'Thái Bạch': {
    type: 'Hung Tinh (Cẩn Trọng Tài Chính)',
    isGood: false,
    dayWorship: 'Ngày 15 (Rằm) Âm lịch hàng tháng',
    direction: 'Chính Tây',
    candles: '8 ngọn nến',
    desc: 'Kim tinh thử thách tiền bạc: nên chủ động mua sắm tài sản lớn, làm từ thiện hoặc đầu tư dài hạn để "tán tài chủ động" hóa giải hao hụt.'
  }
};

const MALE_STAR_CYCLE = ['Mộc Đức', 'La Hầu', 'Thổ Tú', 'Thủy Diệu', 'Thái Bạch', 'Thái Dương', 'Vân Hán', 'Kế Đô', 'Thái Âm'];
const FEMALE_STAR_CYCLE = ['Thủy Diệu', 'Kế Đô', 'Vân Hán', 'Mộc Đức', 'Thái Âm', 'Thổ Tú', 'La Hầu', 'Thái Dương', 'Thái Bạch'];

const EIGHT_HAN = [
  { name: 'Huỳnh Tuyền', desc: 'Chú ý nghỉ ngơi điều độ, phòng chứng đau đầu, huyết áp và tránh làm việc quá sức.' },
  { name: 'Tam Kheo', desc: 'Lưu ý bảo vệ mắt và xương khớp tay chân, cẩn thận khi tham gia giao thông.' },
  { name: 'Ngũ Mộ', desc: 'Cẩn trọng tiền bạc, mua bán hàng hóa cần hóa đơn chứng từ rõ ràng, không cho vay mượn mạo hiểm.' },
  { name: 'Thiên Tinh', desc: 'Giữ gìn vệ sinh ăn uống tiêu hóa và cẩn trọng lời nói, hợp đồng pháp lý.' },
  { name: 'Tán Tận', desc: 'Phòng hao tài bất ngờ, hạn chế mang nhiều tài sản quý khi đi đường xa.' },
  { name: 'Thiên La', desc: 'Giữ tâm an định, vợ chồng nhẫn nhịn thấu hiểu nhau để gia đạo êm ấm.' },
  { name: 'Địa Võng', desc: 'Không nên đi khuya một mình hoặc nghe lời thị phi, sống ngay thẳng ắt bình an.' },
  { name: 'Diêm Vương', desc: 'Người khỏe mạnh làm ăn rất phát đạt về tài lộc; chỉ cần chú ý chăm sóc sức khỏe người già và thai sản.' }
];

const HOANG_OC_6 = [
  { name: 'Nhất Cát (Tốt ★)', isGood: true, desc: 'Làm nhà, mở văn phòng sẽ có chốn an cư tốt đẹp, mọi việc hanh thông.' },
  { name: 'Nhị Nghi (Đại Cát ★)', isGood: true, desc: 'Làm nhà hưng vượng, giàu có thêm lộc, gia đạo phát đạt.' },
  { name: 'Tam Địa Sát (Phạm Xấu)', isGood: false, desc: 'Phạm Tam Địa Sát: Nếu động thổ làm nhà nên mượn tuổi người hợp mệnh.' },
  { name: 'Tứ Tấn Tài (Đại Cát ★)', isGood: true, desc: 'Phúc lộc tới tấp, làm nhà hay khai trương đều đại cát đại lợi.' },
  { name: 'Ngũ Thọ Tử (Phạm Xấu)', isGood: false, desc: 'Phạm Ngũ Thọ Tử: Tránh tự đứng tên động thổ xây nhà mới, nên mượn tuổi.' },
  { name: 'Lục Hoang Ốc (Phạm Xấu)', isGood: false, desc: 'Phạm Lục Hoang Ốc: Nên mượn tuổi đẹp khi khởi công xây dựng.' }
];

function getCanChiYear(y) {
  const stem = STEMS[(y - 4) % 10];
  const branch = BRANCHES[(y - 4) % 12];
  return { stem, branch, full: `${stem} ${branch}`, branchIdx: (y - 4) % 12 };
}

export default function SaoHanPage() {
  const [fullName, setFullName] = useState('Gia Chủ HHD - K94');
  const [birthYear, setBirthYear] = useState(1994);
  const [gender, setGender] = useState('male');
  const [targetYear, setTargetYear] = useState(2026);
  const [activePrayerTab, setActivePrayerTab] = useState('cungSao');
  const [copied, setCopied] = useState(false);

  const info = useMemo(() => {
    const bYear = Number(birthYear) || 1994;
    const tYear = Number(targetYear) || 2026;
    const tuoiMu = Math.max(1, tYear - bYear + 1);

    const birthCanChi = getCanChiYear(bYear);
    const targetCanChi = getCanChiYear(tYear);

    // 1. Cửu Diệu Star
    const mod9 = tuoiMu % 9;
    const starName = gender === 'male' ? MALE_STAR_CYCLE[mod9] : FEMALE_STAR_CYCLE[mod9];
    const starInfo = CUU_DIEU_STARS[starName];

    // 2. Hạn Niên (8 Hạn)
    const tens = Math.floor(tuoiMu / 10);
    const units = tuoiMu % 10;
    const baseHanIdx = gender === 'male'
      ? (tens + units - 2 + 80) % 8
      : (80 - (tens + units - 2)) % 8;
    const hanInfo = EIGHT_HAN[baseHanIdx];

    // 3. Tam Tai check
    // Thân(8)-Tý(0)-Thìn(4) -> Tam tai tại Dần(2), Mão(3), Thìn(4)
    // Dần(2)-Ngọ(6)-Tuất(10) -> Tam tai tại Thân(8), Dậu(9), Tuất(10)
    // Tỵ(5)-Dậu(9)-Sửu(1) -> Tam tai tại Hợi(11), Tý(0), Sửu(1)
    // Hợi(11)-Mão(3)-Mùi(7) -> Tam tai tại Tỵ(5), Ngọ(6), Mùi(7)
    const bIdx = birthCanChi.branchIdx;
    const tIdx = targetCanChi.branchIdx;
    let tamTaiBranches = [];
    if ([8, 0, 4].includes(bIdx)) tamTaiBranches = [2, 3, 4];
    else if ([2, 6, 10].includes(bIdx)) tamTaiBranches = [8, 9, 10];
    else if ([5, 9, 1].includes(bIdx)) tamTaiBranches = [11, 0, 1];
    else tamTaiBranches = [5, 6, 7];

    const isTamTai = tamTaiBranches.includes(tIdx);
    const tamTaiText = isTamTai
      ? `Phạm Tam Tai năm ${targetCanChi.full} (Năm Tam Tai: ${tamTaiBranches.map((i) => BRANCHES[i]).join(', ')})`
      : `Không phạm Tam Tai (Các năm Tam Tai của tuổi ${birthCanChi.branch}: ${tamTaiBranches.map((i) => BRANCHES[i]).join(', ')})`;

    // 4. Kim Lâu check
    const kimLauRem = tuoiMu % 9;
    const kimLauMap = {
      1: 'Phạm Kim Lâu Thân (Kỵ bản thân gia chủ đứng tuổi xây nhà)',
      3: 'Phạm Kim Lâu Thê (Kỵ cho người phối ngẫu khi xây nhà)',
      6: 'Phạm Kim Lâu Tử (Kỵ cho con cái khi xây nhà)',
      8: 'Phạm Kim Lâu Súc (Ảnh hưởng chăn nuôi / kinh tế phụ)'
    };
    const isKimLau = Boolean(kimLauMap[kimLauRem]);
    const kimLauText = kimLauMap[kimLauRem] || 'Không phạm Kim Lâu (Tuổi đẹp làm nhà, cưới hỏi)';

    // 5. Hoang Ốc check
    const hoangOcIdx = ((Math.floor(tuoiMu / 10) + (tuoiMu % 10) - 1) % 6 + 6) % 6;
    const hoangOcInfo = HOANG_OC_6[hoangOcIdx];

    return {
      tuoiMu,
      birthCanChi,
      targetCanChi,
      starName,
      starInfo,
      hanInfo,
      isTamTai,
      tamTaiText,
      isKimLau,
      kimLauText,
      hoangOcInfo
    };
  }, [birthYear, gender, targetYear]);

  const prayers = useMemo(() => ({
    cungSao: `NAM MÔ A DI ĐÀ PHẬT! (3 lần)
Con kính lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.
Con kính lạy Đức Trung Thiên Tinh Chúa Bắc Cực Tử Vi Trường Sinh Đại Đế.
Con kính lạy Đức Tả Nam Tào Lục Ty Duyên Thọ Tinh Quân, Đức Hữu Bắc Đẩu Cửu Hàm Giải Ách Tinh Quân.
Con kính lạy Đức Thượng Thanh Bản Mệnh Tinh Quân: Sao ${info.starName} Tinh Quân.

Tín chủ con là: ${fullName} — Sinh năm: ${birthYear} (${info.birthCanChi.full}), hưởng dương ${info.tuoiMu} tuổi âm.
Hôm nay nhân tiết đầu xuân / ngày lành tháng tốt năm ${targetYear} (${info.targetCanChi.full}), tín chủ con thành tâm sắm sửa hương hoa lễ vật, thắp ${info.starInfo.candles}, hướng về phương ${info.starInfo.direction} cúi xin Chư Vị Tinh Quân soi xét:
Cầu xin giải trừ hạn ${info.hanInfo.name}, chuyển hung hóa cát, ban phúc diên sinh, gia đạo bình an, công danh tài lộc hanh thông vạn sự như ý!
Nam Mô A Di Đà Phật! (3 lần)`,
    khaiTruong: `NAM MÔ A DI ĐÀ PHẬT! (3 lần)
Con kính lạy Quan Đương Niên Hành Khiển Thái Tuế Chí Đức Tôn Thần năm ${info.targetCanChi.full}.
Con kính lạy các Ngài Bản Cảnh Thành Hoàng Chư Vị Đại Vương, Ngài Bản Xứ Thần Linh Thổ Địa, Ngài Định Phúc Táo Quân và Ngũ Phương Ngũ Thổ Long Mạch Tài Thần.

Tín chủ con là: ${fullName} — Sinh năm: ${birthYear} (${info.birthCanChi.full}).
Hôm nay ngày lành tháng tốt năm ${targetYear}, tín chủ con thành tâm bày biện hương hoa lễ phẩm, kính cẩn làm lễ KHAI TRƯƠNG mở hàng khởi sự kinh doanh.
Cúi xin Chư Vị Tôn Thần phù hộ độ trì cho công việc kinh doanh buôn bán thuận buồm xuôi gió, khách hàng tấp nập, lộc tài vượng tiến, quý nhân giúp đỡ, vạn sự đại cát đại lợi!
Nam Mô A Di Đà Phật! (3 lần)`,
    ramMung1: `NAM MÔ A DI ĐÀ PHẬT! (3 lần)
Con kính lạy Hoàng Thiên Hậu Thổ Chư Vị Tôn Thần.
Con kính lạy Ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân, Ngài Bản Gia Thổ Địa Long Mạch Tôn Thần, các Ngài Ngũ Phương Ngũ Thổ Phúc Đức Tài Thần cùng Gia Tiên Nội Ngoại.

Tín chủ con là: ${fullName} (Tuổi ${info.birthCanChi.full} - ${birthYear}).
Hôm nay nhân ngày Mùng 1 / Ngày Rằm năm ${info.targetCanChi.full} (${targetYear}), tín chủ con thành tâm dâng hương hoa trà quả, kính mời Chư Vị Tôn Thần và Gia Tiên chứng giám, phù hộ độ trì cho toàn gia mạnh khỏe bình an, tâm trí sáng suốt, lộc tài sung túc, gia đạo hưng long!
Nam Mô A Di Đà Phật! (3 lần)`
  }), [fullName, birthYear, targetYear, info]);

  const copyPrayer = () => {
    navigator.clipboard.writeText(prayers[activePrayerTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Sao Hạn & Văn Khấn K94</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/sim-phong-thuy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📱 Chấm Điểm Sim</Link>
            <Link href="/thuoc-lo-ban" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📏 Thước Lỗ Ban</Link>
            <Link href="/hop-tuoi" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🤝 Hợp Tuổi Làm Ăn</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Cửu Diệu Tinh Quân · Tam Tai · Kim Lâu · Hoang Ốc · Văn Khấn Cổ
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Xem Sao Hạn Hàng Năm, Tuổi Làm Nhà & Văn Khấn HHD
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Tra cứu chính xác Sao Chiếu Mệnh Cửu Diệu, Hạn Niên, kiểm tra Tam Tai - Kim Lâu - Hoang Ốc và tạo bài Văn Khấn chuẩn cổ truyền.
          </p>
        </div>

        {/* Inputs */}
        <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, marginBottom: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>Họ Tên Tín Chủ (Điền Văn Khấn)</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 15, fontWeight: 600 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>Năm Sinh</label>
            <input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 15, fontWeight: 700 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>Giới Tính</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ id: 'male', label: 'Nam Mạng' }, { id: 'female', label: 'Nữ Mạng' }].map((g) => (
                <button key={g.id} onClick={() => setGender(g.id)} style={{ flex: 1, padding: '11px 10px', borderRadius: 10, border: gender === g.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)', background: gender === g.id ? 'rgba(201,168,76,0.22)' : '#11131A', color: gender === g.id ? '#F4E3B2' : '#9DA3B4', fontWeight: 700, cursor: 'pointer' }}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', textTransform: 'uppercase', marginBottom: 6 }}>Năm Xem Hạn</label>
            <input type="number" value={targetYear} onChange={(e) => setTargetYear(Number(e.target.value))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 15, fontWeight: 700 }} />
          </div>
        </div>

        {/* Cửu Diệu Star & 8-Hạn Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 28 }}>
          <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.16), rgba(16,18,26,0.95))', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 22, padding: 26 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700 }}>SAO CHIẾU MỆNH NĂM {targetYear} ({info.targetCanChi.full})</span>
              <span style={{ padding: '3px 10px', borderRadius: 99, background: info.starInfo.isGood ? 'rgba(67,160,71,0.2)' : 'rgba(229,57,53,0.2)', color: info.starInfo.isGood ? '#81C784' : '#EF9A9A', fontSize: 12, fontWeight: 700 }}>
                {info.starInfo.type}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 32, color: '#F4E3B2', margin: '0 0 8px 0' }}>
              Sao {info.starName} ({info.tuoiMu} Tuổi Âm)
            </h2>
            <p style={{ fontSize: 14, color: '#D5DAE5', lineHeight: 1.6, marginBottom: 14 }}>{info.starInfo.desc}</p>
            <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)', fontSize: 13, lineHeight: 1.6 }}>
              <div>• <strong>Ngày nghinh sao / giải hạn:</strong> {info.starInfo.dayWorship}</div>
              <div>• <strong>Hướng lạy & Số đèn nến:</strong> Hướng {info.starInfo.direction} · {info.starInfo.candles}</div>
              <div>• <strong>Hạn niên đi kèm:</strong> <strong style={{ color: '#c9a84c' }}>Hạn {info.hanInfo.name}</strong> — {info.hanInfo.desc}</div>
            </div>
          </div>

          {/* Tam Tai, Kim Lâu, Hoang Ốc Check */}
          <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.28)', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: 0 }}>
              Kiểm Tra Tuổi Làm Nhà, Mở Hàng & Đại Sự ({targetYear})
            </h3>
            <div style={{ padding: 14, borderRadius: 12, background: info.isTamTai ? 'rgba(229,57,53,0.1)' : 'rgba(67,160,71,0.1)', borderLeft: `3px solid ${info.isTamTai ? '#EF5350' : '#66BB6A'}` }}>
              <div style={{ fontWeight: 700, color: info.isTamTai ? '#EF9A9A' : '#81C784', fontSize: 14 }}>1. Hạn Tam Tai:</div>
              <div style={{ fontSize: 13, color: '#E2E4E9', marginTop: 3 }}>{info.tamTaiText}</div>
            </div>
            <div style={{ padding: 14, borderRadius: 12, background: info.isKimLau ? 'rgba(229,57,53,0.1)' : 'rgba(67,160,71,0.1)', borderLeft: `3px solid ${info.isKimLau ? '#EF5350' : '#66BB6A'}` }}>
              <div style={{ fontWeight: 700, color: info.isKimLau ? '#EF9A9A' : '#81C784', fontSize: 14 }}>2. Hạn Kim Lâu:</div>
              <div style={{ fontSize: 13, color: '#E2E4E9', marginTop: 3 }}>{info.kimLauText}</div>
            </div>
            <div style={{ padding: 14, borderRadius: 12, background: info.hoangOcInfo.isGood ? 'rgba(67,160,71,0.1)' : 'rgba(229,57,53,0.1)', borderLeft: `3px solid ${info.hoangOcInfo.isGood ? '#66BB6A' : '#EF5350'}` }}>
              <div style={{ fontWeight: 700, color: info.hoangOcInfo.isGood ? '#81C784' : '#EF9A9A', fontSize: 14 }}>3. Cung Hoang Ốc: {info.hoangOcInfo.name}</div>
              <div style={{ fontSize: 13, color: '#E2E4E9', marginTop: 3 }}>{info.hoangOcInfo.desc}</div>
            </div>
          </div>
        </div>

        {/* Traditional Prayer Generator */}
        <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 22, padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 4px 0' }}>
                📜 Tàng Thư Văn Khấn Cổ Truyền Tự Động Điền Tên & Sao Hạn
              </h3>
              <p style={{ fontSize: 13, color: '#9DA3B4', margin: 0 }}>
                Bài văn khấn đã tự động khớp tên <strong>{fullName}</strong>, tuổi <strong>{info.birthCanChi.full}</strong> và sao <strong>{info.starName}</strong>:
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'cungSao', label: 'Văn Khấn Dâng Sao Giải Hạn' },
                { id: 'khaiTruong', label: 'Văn Khấn Khai Trương K94' },
                { id: 'ramMung1', label: 'Văn Khấn Rằm & Mùng 1' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActivePrayerTab(t.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    border: activePrayerTab === t.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                    background: activePrayerTab === t.id ? 'rgba(201,168,76,0.22)' : 'transparent',
                    color: activePrayerTab === t.id ? '#F4E3B2' : '#A3A8B8',
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-serif, serif)',
              fontSize: 15,
              lineHeight: 1.75,
              color: '#F4E3B2',
              background: '#11131A',
              border: '1px solid rgba(201,168,76,0.28)',
              borderRadius: 16,
              padding: 22,
              margin: '0 0 14px 0'
            }}
          >
            {prayers[activePrayerTab]}
          </pre>

          <button
            onClick={copyPrayer}
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              background: 'linear-gradient(135deg, #e0c168, #b88928)',
              color: '#0B0C10',
              fontWeight: 800,
              fontSize: 13.5,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {copied ? '✓ Đã sao chép bài Văn Khấn!' : '📋 Sao Chép Bài Văn Khấn Này'}
          </button>
        </div>
      </main>
    </div>
  );
}
