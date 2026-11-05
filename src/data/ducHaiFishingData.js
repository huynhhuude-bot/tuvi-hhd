// ============================================================================
// CỬA HÀNG DỤNG CỤ CÂU CÁ ĐỨC HẢI FISHING — DỮ LIỆU SẢN PHẨM & LỊCH CÂU CÁ
// Địa chỉ: Ấp Cái Cui, xã Hòa Hiệp, Tỉnh Vĩnh Long
// Điện thoại / Zalo: 0983.339.397 (0983339397)
// ============================================================================

export const DUC_HAI_STORAGE_KEY = 'hhd_duc_hai_fishing_products_v1';

export const DUC_HAI_STORE_INFO = {
  name: 'Cửa Hàng Dụng Cụ Câu Cá ĐỨC HẢI FISHING',
  shortName: 'ĐỨC HẢI FISHING',
  tagline: 'Chuyên Mua Bán Sỉ & Lẻ Dụng Cụ Câu Cá · Mồi Câu · Cần Câu · Máy Câu · Lưỡi Câu · Phao Chì',
  address: 'Ấp Cái Cui, xã Hòa Hiệp, Tỉnh Vĩnh Long',
  phone: '0983339397',
  phoneDisplay: '0983.339.397',
  zaloUrl: 'https://zalo.me/0983339397',
  shippingPolicy: 'Giao hàng nhanh toàn quốc (Ship COD) — Kiểm tra hàng đúng mẫu, thử cần trước khi thanh toán!'
};

export const FISHING_CATEGORIES = [
  { id: 'ALL', label: '🎣 Tất Cả Đồ Câu', countBadge: 'Đầy đủ' },
  { id: 'can-cau', label: '🎋 Cần Câu Cá', countBadge: 'Carbon / Lure / Đài' },
  { id: 'may-cau', label: '⚙️ Máy Câu Cá', countBadge: 'Máy Đứng & Ngang' },
  { id: 'moi-cau', label: '🐟 Mồi Câu & Tinh Mùi', countBadge: 'Nhái Hơi / Cám' },
  { id: 'luoi-day', label: '🪝 Lưỡi Câu & Dây Dù PE', countBadge: 'Siêu Bén / Tải Cao' },
  { id: 'phao-chi', label: '🏮 Phao Câu & Chì Câu', countBadge: 'Phao Đèn / Nano' },
  { id: 'phu-kien', label: '🎒 Phụ Kiện Đi Câu', countBadge: 'Bao Cần / Ghế / Vợt' }
];

function makeProductSvg({ bg1, bg2, accent, iconType, badgeText, modelText }) {
  let illustration = '';
  if (iconType === 'reel-spin') {
    illustration = `
      <circle cx="150" cy="105" r="52" fill="#0F172A" stroke="${accent}" stroke-width="5"/>
      <circle cx="150" cy="105" r="34" fill="#1E293B" stroke="#38BDF8" stroke-width="2.5"/>
      <rect x="128" y="38" width="44" height="28" rx="5" fill="${accent}" stroke="#0F172A" stroke-width="2"/>
      <path d="M 150 105 L 212 135 L 228 112" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="231" cy="109" r="11" fill="#EF4444" stroke="${accent}" stroke-width="2.5"/>
      <circle cx="150" cy="105" r="11" fill="${accent}"/>
    `;
  } else if (iconType === 'reel-bait') {
    illustration = `
      <ellipse cx="150" cy="105" rx="58" ry="38" fill="#1E293B" stroke="${accent}" stroke-width="4.5"/>
      <rect x="118" y="82" width="64" height="46" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
      <path d="M 195 72 Q 220 105 195 138" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="195" cy="70" r="9" fill="#EF4444" stroke="#FFF" stroke-width="2"/>
      <circle cx="195" cy="140" r="9" fill="#EF4444" stroke="#FFF" stroke-width="2"/>
    `;
  } else if (iconType === 'rod') {
    illustration = `
      <line x1="35" y1="155" x2="265" y2="35" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <line x1="35" y1="155" x2="105" y2="118" stroke="#DC2626" stroke-width="12" stroke-linecap="round"/>
      <circle cx="138" cy="108" r="7" fill="none" stroke="#38BDF8" stroke-width="3"/>
      <circle cx="188" cy="82" r="5.5" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
      <circle cx="235" cy="56" r="4.5" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
      <line x1="55" y1="165" x2="270" y2="62" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'lure') {
    illustration = `
      <path d="M 65 102 Q 150 52 230 102 Q 150 152 65 102 Z" fill="#10B981" stroke="${accent}" stroke-width="4"/>
      <path d="M 225 102 L 258 78 L 248 102 L 258 126 Z" fill="#EF4444"/>
      <circle cx="96" cy="96" r="8" fill="#FFF"/>
      <circle cx="95" cy="96" r="4" fill="#000"/>
      <path d="M 150 124 L 150 152 Q 150 165 135 160" fill="none" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 205 120 L 205 148 Q 205 160 190 155" fill="none" stroke="#E2E8F0" stroke-width="3.5" stroke-linecap="round"/>
    `;
  } else if (iconType === 'hook-line') {
    illustration = `
      <circle cx="105" cy="52" r="8" fill="none" stroke="${accent}" stroke-width="4"/>
      <path d="M 105 60 L 105 125 Q 105 156 76 150 Q 58 145 72 120 L 82 132" fill="none" stroke="${accent}" stroke-width="5.5" stroke-linecap="round"/>
      <circle cx="195" cy="105" r="42" fill="#0F172A" stroke="#38BDF8" stroke-width="4"/>
      <circle cx="195" cy="105" r="24" fill="#1E293B" stroke="${accent}" stroke-width="2.5"/>
      <text x="195" y="110" font-family="sans-serif" font-size="13" font-weight="900" fill="#FACC15" text-anchor="middle">PE X8</text>
    `;
  } else if (iconType === 'float-sinker') {
    illustration = `
      <line x1="100" y1="28" x2="100" y2="172" stroke="#4ADE80" stroke-width="4"/>
      <line x1="100" y1="28" x2="100" y2="55" stroke="#EF4444" stroke-width="5"/>
      <ellipse cx="100" cy="105" rx="16" ry="38" fill="#DC2626" stroke="${accent}" stroke-width="3"/>
      <ellipse cx="195" cy="108" rx="22" ry="32" fill="#64748B" stroke="#E2E8F0" stroke-width="2.5"/>
      <circle cx="195" cy="70" r="6" fill="none" stroke="${accent}" stroke-width="3"/>
      <text x="195" y="113" font-family="sans-serif" font-size="12" font-weight="800" fill="#FFF" text-anchor="middle">CHÌ</text>
    `;
  } else {
    illustration = `
      <rect x="75" y="55" width="150" height="95" rx="14" fill="#1E293B" stroke="${accent}" stroke-width="3.5"/>
      <path d="M 115 55 L 115 38 L 185 38 L 185 55" fill="none" stroke="${accent}" stroke-width="4"/>
      <line x1="75" y1="98" x2="225" y2="98" stroke="#38BDF8" stroke-width="2.5"/>
      <rect x="135" y="88" width="30" height="20" rx="4" fill="${accent}"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="300" height="200" rx="14" fill="url(#g)"/>
    <rect x="4" y="4" width="292" height="192" rx="11" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.65"/>
    <rect x="12" y="12" width="118" height="22" rx="11" fill="rgba(0,0,0,0.55)" stroke="${accent}" stroke-width="1"/>
    <text x="71" y="27" font-family="sans-serif" font-size="10.5" font-weight="800" fill="${accent}" text-anchor="middle">${badgeText}</text>
    ${illustration}
    <rect x="0" y="168" width="300" height="32" fill="rgba(6, 12, 22, 0.82)"/>
    <text x="150" y="189" font-family="sans-serif" font-size="12" font-weight="800" fill="#F8FAFC" text-anchor="middle">${modelText}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export const DEFAULT_FISHING_PRODUCTS = [
  {
    id: 'may-cau-dung-shimano-dh01',
    name: 'Máy Câu Đứng Kim Loại Cối Nông & Sâu Size 3000 - 6000 (Quay Siêu Mượt)',
    category: 'may-cau',
    categoryLabel: 'Máy Câu Cá',
    price: 385000,
    priceDisplay: '385.000đ',
    originalPriceDisplay: '550.000đ',
    badge: 'Bán Chạy #1',
    specs: 'Vòng tua 5.2:1 · Lực kéo Drag 12kg · Cối hợp kim nhôm CNC chống rỉ',
    desc: 'Máy câu đứng chuyên trị cá tra, cá chép, cá lóc bông sông lớn. Bạc đạn thép không gỉ thu dây cực êm, quăng xa chuẩn xác.',
    image: makeProductSvg({
      bg1: '#07192E',
      bg2: '#0F3456',
      accent: '#FACC15',
      iconType: 'reel-spin',
      badgeText: 'ĐỨC HẢI FISHING',
      modelText: 'MÁY ĐỨNG KIM LOẠI SIZE 3000-6000'
    })
  },
  {
    id: 'may-cau-ngang-lure-dh02',
    name: 'Máy Câu Ngang Lure Cá Lóc Phanh Từ 12 Nấc Chống Rối Dây Cao Cấp',
    category: 'may-cau',
    categoryLabel: 'Máy Câu Cá',
    price: 450000,
    priceDisplay: '450.000đ',
    originalPriceDisplay: '680.000đ',
    badge: 'Chuyên Lure',
    specs: 'Vòng tua 7.2:1 · Drag 8kg · Tay trái / Tay phải đủ mẫu',
    desc: 'Dòng máy ngang chuyên rê cá lóc, cá chẽm với hệ thống phanh từ chống rối dây hiệu quả cho cả người mới lẫn cần thủ lâu năm.',
    image: makeProductSvg({
      bg1: '#1A102B',
      bg2: '#0F172A',
      accent: '#38BDF8',
      iconType: 'reel-bait',
      badgeText: 'LURE PRO 7.2:1',
      modelText: 'MÁY NGANG LURE CHỐNG RỐI DÂY'
    })
  },
  {
    id: 'can-cau-lure-carbon-dh03',
    name: 'Cần Câu Lure 2 Khúc Carbon Xoắn X Toàn Thân (Đọt M / MH · Dài 1m8 - 2m4)',
    category: 'can-cau',
    categoryLabel: 'Cần Câu Cá',
    price: 420000,
    priceDisplay: '420.000đ',
    originalPriceDisplay: '620.000đ',
    badge: 'Siêu Nhẹ & Dẻo',
    specs: 'Dài 1m8 / 2m1 / 2m4 · Khoen Fuji chống xoắn · Tải cá 6-12kg',
    desc: 'Phôi cần Carbon xoắn X chịu lực cực cao, độ nảy tốt giúp ném mồi nhái hơi, cá sắt đi xa và cảm nhận tín hiệu cá táp nhạy bén.',
    image: makeProductSvg({
      bg1: '#091E26',
      bg2: '#133B4A',
      accent: '#FACC15',
      iconType: 'rod',
      badgeText: 'CARBON XOẮN X',
      modelText: 'CẦN LURE 2 KHÚC 1M8 - 2M1 - 2M4'
    })
  },
  {
    id: 'can-cau-dai-tay-dh04',
    name: 'Cần Câu Tay / Câu Đài Carbon Siêu Nhẹ Độ Cứng 5H - 6H (3m6 - 4m5 - 5m4)',
    category: 'can-cau',
    categoryLabel: 'Cần Câu Cá',
    price: 350000,
    priceDisplay: '350.000đ',
    originalPriceDisplay: '510.000đ',
    badge: 'Săn Hàng',
    specs: 'Độ cứng 5H / 6H · Đủ size 3m6, 4m5, 5m4, 6m3 · Tặng kèm ngọn phụ',
    desc: 'Cần câu đài săn chép, rô phi, cá mè cầm nhẹ tay cả ngày không mỏi, phân bổ lực đều giúp bo cá lớn an toàn không sợ nổ lóng.',
    image: makeProductSvg({
      bg1: '#1E160B',
      bg2: '#0F172A',
      accent: '#F59E0B',
      iconType: 'rod',
      badgeText: 'CẦN ĐÀI 5H - 6H',
      modelText: 'CẦN CÂU TAY CARBON SĂN HÀNG'
    })
  },
  {
    id: 'can-cau-song-2-khuc-dh05',
    name: 'Cần Câu Sông / Câu Cá Tra 2 Khúc Đặc Ruột Siêu Bạo Lực (2m1 - 2m4 - 2m7)',
    category: 'can-cau',
    categoryLabel: 'Cần Câu Cá',
    price: 320000,
    priceDisplay: '320.000đ',
    originalPriceDisplay: '480.000đ',
    badge: 'Siêu Bạo Lực',
    specs: 'Tải mồi 100-300g · Tải cá 15-25kg · Cán mút EVA êm tay',
    desc: 'Chuyên trị sông lớn miền Tây, câu cá tra sông, cá bông lau, cá lăng cực khỏe.',
    image: makeProductSvg({
      bg1: '#230D13',
      bg2: '#0F172A',
      accent: '#EF4444',
      iconType: 'rod',
      badgeText: 'TẢI CÁ 25KG',
      modelText: 'CẦN SÔNG 2 KHÚC BẠO LỰC'
    })
  },
  {
    id: 'moi-nhai-hoi-lure-dh06',
    name: 'Combo Mồi Giả Nhái Hơi & Cá Sắt Lure Cá Lóc Chống Vướng Cỏ (Đủ Trọng Lượng)',
    category: 'moi-cau',
    categoryLabel: 'Mồi Câu & Tinh Mùi',
    price: 115000,
    priceDisplay: '115.000đ',
    originalPriceDisplay: '175.000đ',
    badge: 'Nhạy Cá Lóc',
    specs: 'Cao su non siêu mềm · Lưỡi đôi ôm sát body chống vướng · Thìa xoay tạo sóng',
    desc: 'Action bơi tự nhiên, lưỡi thép sắc bén đóng cá cực dính ngay từ cú táp đầu tiên.',
    image: makeProductSvg({
      bg1: '#06261E',
      bg2: '#0D1B2A',
      accent: '#10B981',
      iconType: 'lure',
      badgeText: 'MỒI LURE NHÁI HƠI',
      modelText: 'NHÁI HƠI & CÁ SẮT LURE CÁ LÓC'
    })
  },
  {
    id: 'moi-cam-tinh-mui-dh07',
    name: 'Bộ Mồi Cám Câu Cá Tra, Cá Chép, Rô Phi & Tinh Mùi Dụ Cá Đậm Đặc Đức Hải',
    category: 'moi-cau',
    categoryLabel: 'Mồi Câu & Tinh Mùi',
    price: 85000,
    priceDisplay: '85.000đ',
    originalPriceDisplay: '130.000đ',
    badge: 'Công Thức Nhậy',
    specs: 'Hương Dâu / Trứng Sữa / Tanh Gan / Cốt Bơ · Tan đều giữ ổ lâu',
    desc: 'Phối trộn chuẩn vị sông hồ miền Tây Vĩnh Long, tỏa hương xa thu hút cá vào ổ nhanh.',
    image: makeProductSvg({
      bg1: '#241807',
      bg2: '#111827',
      accent: '#FACC15',
      iconType: 'lure',
      badgeText: 'MỒI CÁM ĐỨC HẢI',
      modelText: 'CÁM CÂU & TINH MÙI DỤ CÁ'
    })
  },
  {
    id: 'luoi-cau-thep-nhat-dh08',
    name: 'Hộp 100 Lưỡi Câu Thép Carbon Nhật Bản Siêu Bén (Đủ Số Câu Đơn, Câu Đài, Câu Cá Tra)',
    category: 'luoi-day',
    categoryLabel: 'Lưỡi Câu & Dây Câu',
    price: 65000,
    priceDisplay: '65.000đ',
    originalPriceDisplay: '110.000đ',
    badge: 'Thép Carbon',
    specs: 'Mũi lưỡi mài hóa học sắc bén · Ngạnh giữ cá chắc · Chống oằn gãy',
    desc: 'Đầy đủ kích cỡ từ lưỡi câu cá rô, cá trê, cá chép đến lưỡi săn hàng cá tra sông lớn.',
    image: makeProductSvg({
      bg1: '#0F172A',
      bg2: '#1E293B',
      accent: '#FACC15',
      iconType: 'hook-line',
      badgeText: 'THÉP CARBON NHẬT',
      modelText: 'LƯỠI CÂU SIÊU BÉN ĐỦ KÍCH CỠ'
    })
  },
  {
    id: 'day-du-pe-x8-dh09',
    name: 'Cuộn Dây Dù Câu Cá PE X8 Bện 8 Sợi Siêu Bền Chống Xù (100m - 150m · Đủ Số Chấm)',
    category: 'luoi-day',
    categoryLabel: 'Lưỡi Câu & Dây Câu',
    price: 125000,
    priceDisplay: '125.000đ',
    originalPriceDisplay: '190.000đ',
    badge: 'Dù PE X8',
    specs: 'Số 1.0 đến 8.0 · Cắt nước nhanh · Chịu tải cao chống mài mòn đá ngầm',
    desc: 'Sợi dù tròn mịn ra dây mượt, không thấm nước, độ bền kéo vượt trội cho cả câu Lure và câu ngâm sông.',
    image: makeProductSvg({
      bg1: '#082032',
      bg2: '#1B263B',
      accent: '#38BDF8',
      iconType: 'hook-line',
      badgeText: 'SIÊU TẢI PE X8',
      modelText: 'DÂY DÙ PE X8 & CƯỚC TÀNG HÌNH'
    })
  },
  {
    id: 'phao-den-led-nano-dh10',
    name: 'Combo Phao Câu Ngày Đêm Nano & Phao Đèn LED Đổi Màu Báo Cá Cực Nhạy (Kèm Pin)',
    category: 'phao-chi',
    categoryLabel: 'Phao Câu & Chì Câu',
    price: 75000,
    priceDisplay: '75.000đ',
    originalPriceDisplay: '120.000đ',
    badge: 'Báo Cá Nhạy',
    specs: 'Bầu phao Nano siêu nổi · Tăm phao quang học đổi màu khi cá rỉa mồi',
    desc: 'Giúp cần thủ nhìn rõ từng nhịp cá nhấp mồi cả ban ngày lẫn câu đêm.',
    image: makeProductSvg({
      bg1: '#1F0C1D',
      bg2: '#0B132B',
      accent: '#4ADE80',
      iconType: 'float-sinker',
      badgeText: 'PHAO NANO & LED',
      modelText: 'PHAO CÂU NGÀY ĐÊM SIÊU NHẠY'
    })
  },
  {
    id: 'bo-chi-khoa-linh-dh11',
    name: 'Hộp Phụ Kiện Chì Lá, Chì Viên, Hạt Chặn, Chân Cắm Phao & Khóa Linh Maní Chịu Lực',
    category: 'phao-chi',
    categoryLabel: 'Phao Câu & Chì Câu',
    price: 55000,
    priceDisplay: '55.000đ',
    originalPriceDisplay: '95.000đ',
    badge: 'Trọn Bộ Phụ Kiện',
    specs: 'Chì mềm chuẩn gram · Hạt chặn cao su ôm khít · Maní xoay chống xoắn dây',
    desc: 'Hộp tổng hợp đầy đủ chì câu, hạt chặn, khóa số 8 tiện lợi mang theo mọi chuyến đi câu.',
    image: makeProductSvg({
      bg1: '#111827',
      bg2: '#1F2937',
      accent: '#FACC15',
      iconType: 'float-sinker',
      badgeText: 'PHAO · CHÌ · MANÍ',
      modelText: 'TRỌN BỘ CHÌ LÁ, CHÌ VIÊN & KHÓA LINH'
    })
  },
  {
    id: 'bao-dung-can-vot-dh12',
    name: 'Bao Đựng Cần Câu Chống Thấm 2-3 Ngăn & Vợt Xúc Cá Khung Hợp Kim Gấp Gọn',
    category: 'phu-kien',
    categoryLabel: 'Phụ Kiện Đi Câu',
    price: 260000,
    priceDisplay: '260.000đ',
    originalPriceDisplay: '390.000đ',
    badge: 'Bền Đẹp',
    specs: 'Dài 1m25 · Vải Oxford chống nước · Đựng vừa 4-6 bộ cần và phụ kiện',
    desc: 'Bảo vệ cần câu và máy câu khỏi va đập, mưa nắng, có quai đeo vai và xách tay cực kỳ gọn gàng.',
    image: makeProductSvg({
      bg1: '#0F1E19',
      bg2: '#111827',
      accent: '#FACC15',
      iconType: 'box',
      badgeText: 'PHỤ KIỆN ĐI CÂU',
      modelText: 'BAO ĐỰNG CẦN, VỢT CÁ & HỘP ĐỒ CÂU'
    })
  }
];

export function loadFishingProducts() {
  if (typeof window === 'undefined') return DEFAULT_FISHING_PRODUCTS;
  try {
    const raw = localStorage.getItem(DUC_HAI_STORAGE_KEY);
    if (!raw) return DEFAULT_FISHING_PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FISHING_PRODUCTS;
  } catch {
    return DEFAULT_FISHING_PRODUCTS;
  }
}

export function saveFishingProducts(list) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DUC_HAI_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

// Solunar & Mekong River Tide Fishing Forecast
export function getTodayFishingForecast() {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const lunarApprox = ((dayOfMonth + 18) % 30) + 1;

  let tideStatus = 'Con nước rong — Nước chảy mạnh, cá tra & cá lăng đi ăn mồi đáy rất sung';
  let rating = '9.2 / 10 (Ngày Đại Cát Đi Câu)';
  if (lunarApprox >= 7 && lunarApprox <= 11) {
    tideStatus = 'Con nước kém (Nước êm) — Rất hợp câu đài, câu Lure cá lóc và câu cá chép, rô phi';
    rating = '9.5 / 10 (Nước Êm Cá Táp Mạnh)';
  } else if (lunarApprox >= 22 && lunarApprox <= 26) {
    tideStatus = 'Nước đứng — Thích hợp dùng mồi thơm nhạy và phao nhỏ câu sát bờ';
    rating = '8.8 / 10 (Thời Tiết Thuận Lợi)';
  }

  return {
    dateStr: now.toLocaleDateString('vi-VN'),
    lunarDay: `Nhằm khoảng ngày ${lunarApprox} Âm lịch`,
    tideStatus,
    rating,
    bestHours: [
      '🌅 Khung giờ Vàng Sáng: 05h30 – 09h00 (Cá đi ăn mồi sớm)',
      '🌇 Khung giờ Vàng Chiều: 16h00 – 18h30 (Con nước lên chiều mát)',
      '🌙 Khung giờ Câu Đêm: 20h00 – 23h00 (Săn hàng cá lớn bằng phao đèn LED)'
    ]
  };
}
