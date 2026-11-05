export const MONETIZATION_STORAGE_KEY = 'hhd_k94_monetization_v3';

// High-detail SVG Data URIs for Đức Hải Fishing (100% instant load, never broken offline/online)
export const DUC_HAI_FISHING_BANNER_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" width="480" height="260">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071A2C"/>
      <stop offset="55%" stop-color="#0D2E46"/>
      <stop offset="100%" stop-color="#061320"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF0A8"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8A640F"/>
    </linearGradient>
  </defs>
  <rect width="480" height="260" rx="16" fill="url(#bg)"/>
  <rect x="6" y="6" width="468" height="248" rx="12" fill="none" stroke="url(#gold)" stroke-width="2.5"/>
  <!-- River Waves -->
  <path d="M 10 215 Q 70 200 130 215 T 250 215 T 370 215 T 470 215" fill="none" stroke="#38BDF8" stroke-width="2" opacity="0.45"/>
  <path d="M 10 232 Q 70 218 130 232 T 250 232 T 370 232 T 470 232" fill="none" stroke="#0284C7" stroke-width="2" opacity="0.35"/>
  <!-- Carbon Fishing Rod Arching Across -->
  <path d="M 28 228 Q 165 65 425 42" fill="none" stroke="url(#gold)" stroke-width="6" stroke-linecap="round"/>
  <path d="M 28 228 Q 165 65 425 42" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-dasharray="10,6"/>
  <!-- Fishing Line & Float + Hook -->
  <line x1="425" y1="42" x2="425" y2="195" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="3,2"/>
  <ellipse cx="425" cy="145" rx="7" ry="20" fill="#EF4444" stroke="#FACC15" stroke-width="2"/>
  <line x1="425" y1="112" x2="425" y2="125" stroke="#4ADE80" stroke-width="3"/>
  <path d="M 425 195 L 425 212 Q 425 224 414 222 Q 406 220 412 211" fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>
  <!-- Detailed Spinning Fishing Reel (Máy Câu Đứng) -->
  <g transform="translate(115, 132)">
    <circle cx="0" cy="0" r="42" fill="#0F172A" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
    <rect x="-16" y="-48" width="32" height="22" rx="4" fill="url(#gold)" stroke="#0F172A" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="10" fill="url(#gold)"/>
    <path d="M 0 0 L 38 26 L 48 16" fill="none" stroke="url(#gold)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="50" cy="14" r="8" fill="#EF4444" stroke="url(#gold)" stroke-width="2"/>
  </g>
  <!-- Title Text -->
  <text x="275" y="96" font-family="serif" font-size="23" font-weight="900" fill="#FFD54F" text-anchor="middle">ĐỨC HẢI FISHING</text>
  <text x="275" y="122" font-family="sans-serif" font-size="13" font-weight="800" fill="#E0F2FE" text-anchor="middle">CẦN CÂU · MÁY CÂU · MỒI · PHAO · LƯỠI · CHÌ</text>
  <rect x="175" y="136" width="200" height="26" rx="13" fill="#DC2626" stroke="#FACC15" stroke-width="1.5"/>
  <text x="275" y="153" font-family="sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">ĐT / ZALO: 0983.339.397</text>
  <text x="275" y="182" font-family="sans-serif" font-size="11.5" font-weight="700" fill="#93C5FD" text-anchor="middle">📍 Ấp Cái Cui, Xã Hòa Hiệp, Vĩnh Long</text>
</svg>`);

export const DUC_HAI_GALLERY = [
  {
    label: 'Máy Câu Kim Loại VIP',
    img:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" rx="12" fill="#0B192C"/>
        <rect x="3" y="3" width="194" height="144" rx="10" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
        <circle cx="92" cy="72" r="36" fill="#1E293B" stroke="#FACC15" stroke-width="4"/>
        <circle cx="92" cy="72" r="22" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
        <rect x="74" y="24" width="36" height="22" rx="4" fill="#D4AF37"/>
        <path d="M 92 72 L 138 96 L 150 80" fill="none" stroke="#FACC15" stroke-width="5" stroke-linecap="round"/>
        <circle cx="152" cy="78" r="8" fill="#EF4444" stroke="#FACC15" stroke-width="2"/>
        <circle cx="92" cy="72" r="8" fill="#FACC15"/>
        <text x="100" y="136" font-family="sans-serif" font-size="12" font-weight="800" fill="#FDE047" text-anchor="middle">⚙️ Máy Câu Đứng &amp; Ngang</text>
      </svg>`)
  },
  {
    label: 'Cần Câu Carbon Siêu Bền',
    img:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" rx="12" fill="#0B192C"/>
        <rect x="3" y="3" width="194" height="144" rx="10" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
        <line x1="22" y1="112" x2="178" y2="24" stroke="#FACC15" stroke-width="6" stroke-linecap="round"/>
        <line x1="22" y1="112" x2="70" y2="85" stroke="#DC2626" stroke-width="9" stroke-linecap="round"/>
        <circle cx="95" cy="75" r="5" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
        <circle cx="130" cy="55" r="4" fill="none" stroke="#38BDF8" stroke-width="2"/>
        <circle cx="162" cy="36" r="3.5" fill="none" stroke="#38BDF8" stroke-width="2"/>
        <line x1="30" y1="118" x2="182" y2="42" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
        <text x="100" y="136" font-family="sans-serif" font-size="12" font-weight="800" fill="#FDE047" text-anchor="middle">🎣 Cần Câu Carbon &amp; Lure</text>
      </svg>`)
  },
  {
    label: 'Mồi Câu & Cá Giả Nhạy',
    img:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" rx="12" fill="#0B192C"/>
        <rect x="3" y="3" width="194" height="144" rx="10" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
        <path d="M 45 68 Q 95 36 148 68 Q 95 100 45 68 Z" fill="#10B981" stroke="#FACC15" stroke-width="3"/>
        <path d="M 145 68 L 168 50 L 162 68 L 168 86 Z" fill="#EF4444"/>
        <circle cx="66" cy="63" r="5" fill="#FFF"/>
        <circle cx="65" cy="63" r="2.5" fill="#000"/>
        <path d="M 95 82 L 95 102 Q 95 112 85 108" fill="none" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
        <text x="100" y="136" font-family="sans-serif" font-size="12" font-weight="800" fill="#FDE047" text-anchor="middle">🐟 Mồi Câu, Nhái Hơi, Cám</text>
      </svg>`)
  },
  {
    label: 'Phao Đèn, Lưỡi & Chì Câu',
    img:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" rx="12" fill="#0B192C"/>
        <rect x="3" y="3" width="194" height="144" rx="10" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Float -->
        <line x1="65" y1="18" x2="65" y2="112" stroke="#4ADE80" stroke-width="3"/>
        <ellipse cx="65" cy="68" rx="11" ry="26" fill="#EF4444" stroke="#FACC15" stroke-width="2.5"/>
        <!-- Hook -->
        <circle cx="132" cy="34" r="5" fill="none" stroke="#FACC15" stroke-width="3"/>
        <path d="M 132 39 L 132 82 Q 132 104 112 100 Q 100 96 108 80" fill="none" stroke="#FACC15" stroke-width="4" stroke-linecap="round"/>
        <!-- Sinker Lead -->
        <ellipse cx="158" cy="72" rx="9" ry="14" fill="#94A3B8" stroke="#E2E8F0" stroke-width="1.5"/>
        <text x="100" y="136" font-family="sans-serif" font-size="12" font-weight="800" fill="#FDE047" text-anchor="middle">🪝 Phao, Lưỡi Câu &amp; Chì</text>
      </svg>`)
  }
];

export const VIETQR_BANKS = [
  { code: 'MB', name: 'MBBank (Ngân hàng Quân Đội)' },
  { code: 'VCB', name: 'Vietcombank' },
  { code: 'TCB', name: 'Techcombank' },
  { code: 'ICB', name: 'VietinBank' },
  { code: 'BIDV', name: 'BIDV' },
  { code: 'ACB', name: 'ACB (Á Châu)' },
  { code: 'VPB', name: 'VPBank' },
  { code: 'TPB', name: 'TPBank' },
  { code: 'STB', name: 'Sacombank' },
  { code: 'VBA', name: 'Agribank' }
];

export const DEFAULT_MONETIZATION_CONFIG = {
  brandName: 'Công ty Truyền thông K94',
  hotline: '0983339397',
  hotlineDisplay: '0983.339.397',
  zaloUrl: 'https://zalo.me/0983339397',
  globalShopeeAffTag: 'hhd_k94',
  donation: {
    enabled: true,
    bankCode: 'MB',
    accountNo: '0983339397',
    accountName: 'CONG TY TRUYEN THONG K94',
    defaultAmount: 68000,
    message: 'Gieo duyen loc phat HHD K94',
    note: 'Cảm ơn quý hữu đã gieo duyên lành ủng hộ đội ngũ HHD · Công ty Truyền thông K94 duy trì máy chủ miễn phí 24/7!'
  },
  banners: [
    {
      id: 'k94-media',
      badge: 'DỊCH VỤ CHỦ LỰC K94 MEDIA',
      title: 'Công Ty Truyền Thông K94 — Thiết Kế, Quảng Cáo & Xây Dựng Thương Hiệu Hợp Phong Thủy',
      desc: 'Chuyên sản xuất Video Marketing, Thiết kế Logo - Biển hiệu chuẩn kích thước Đỏ Lỗ Ban, Truyền thông sự kiện & Giải pháp số toàn diện.',
      ctaText: '💬 Nhắn Zalo Tư Vấn Ngay (0983.339.397)',
      ctaUrl: 'https://zalo.me/0983339397',
      highlightColor: '#c9a84c'
    },
    {
      id: 'vip-consult',
      badge: 'TƯ VẤN CHUYÊN SÂU 1-1',
      title: 'Đặt Lịch Luận Giải Lá Số Tử Vi, Chọn Ngày Đại Sự & Sim Phong Thủy Cùng Chuyên Gia HHD',
      desc: 'Xem chi tiết vận hạn 10 năm, chọn ngày khai trương - động thổ - cưới hỏi, chấm sim số đẹp và bố trí phong thủy văn phòng.',
      ctaText: '📞 Liên Hệ Hotline/Zalo: 0983.339.397',
      ctaUrl: 'https://zalo.me/0983339397',
      highlightColor: '#66BB6A'
    },
    {
      id: 'ad-rent',
      badge: 'HỢP TÁC QUẢNG CÁO',
      title: 'Tài Trợ & Đặt Banner Quảng Cáo Thương Hiệu Trên Hệ Thống Tử Vi HHD',
      desc: 'Tiếp cận hàng chục ngàn độc giả quan tâm Phong Thủy, Bất Động Sản, Tài Chính, Trang Sức Đá Quý & Đồ Thờ Cúng mỗi tháng.',
      ctaText: '📢 Liên Hệ Đặt Quảng Cáo: 0983.339.397',
      ctaUrl: 'https://zalo.me/0983339397',
      highlightColor: '#64B5F6'
    }
  ],
  sidePanels: {
    left: [
      {
        id: 'left-slot-1',
        badge: '🎣 ĐỨC HẢI FISHING · VĨNH LONG',
        title: 'Cửa Hàng Dụng Cụ Câu Cá ĐỨC HẢI FISHING — Cần Câu, Máy Câu, Mồi, Phao, Lưỡi, Chì',
        desc: 'Chuyên mua bán dụng cụ câu cá, mồi câu, cần câu, máy câu, lưỡi câu, phao chì chính hãng, uy tín, giá tốt nhất.',
        address: 'Ấp Cái Cui, xã Hòa Hiệp, Tỉnh Vĩnh Long',
        phone: '0983339397',
        priceTag: 'Bấm Xem Shop →',
        imageUrl: DUC_HAI_FISHING_BANNER_SVG,
        galleryImages: DUC_HAI_GALLERY,
        ctaText: '🎣 Mở Trang Web Đồ Câu Đức Hải →',
        ctaUrl: '/duc-hai-fishing',
        isRentalSlot: false
      },
      {
        id: 'left-slot-2',
        badge: '👑 TRUYỀN THÔNG K94',
        title: 'Thiết Kế Web, Quay Dựng Video & Quảng Cáo Đa Kênh K94 Media',
        desc: 'Sản xuất TVC, TikTok/Reels, Thiết kế Logo - Biển hiệu chuẩn kích thước Đỏ Lỗ Ban & Chạy Ads trọn gói.',
        priceTag: 'Ưu đãi Doanh Nghiệp',
        imageUrl: '',
        ctaText: '💬 Zalo K94: 0983.339.397',
        ctaUrl: 'https://zalo.me/0983339397',
        isRentalSlot: false
      },
      {
        id: 'left-slot-3',
        badge: '📢 CHO THUÊ BANNER TRÁI',
        title: 'Vị Trí Quảng Cáo Cho Thuê Cánh Trái (240×360px)',
        desc: 'Hiển thị cố định xuyên suốt 20 tính năng. Phù hợp: Shop Đá Phong Thủy, Trầm Hương, BĐS, Nội Thất, Trang Sức.',
        priceTag: 'Liên hệ báo giá tháng',
        imageUrl: '',
        ctaText: '📞 Đặt Thuê Ngay: 0983.339.397',
        ctaUrl: 'https://zalo.me/0983339397',
        isRentalSlot: true
      }
    ],
    right: [
      {
        id: 'right-slot-1',
        badge: '🖼️ ẤN PHẨM PHONG THỦY',
        title: 'Đặt In Tranh Thư Pháp Ông Đồ, Kim Bài Mạ Vàng & Lịch Tết K94',
        desc: 'Chuyển chữ Thư Pháp & Kim Bài Hộ Mệnh vừa tạo trên web thành Tranh Lụa đóng khung hoặc Thẻ Kim Loại khắc laser giao tận nhà.',
        priceTag: 'Quà tặng Cát Tường',
        imageUrl: '',
        ctaText: '🎁 Đặt In Ấn Phẩm Zalo K94',
        ctaUrl: 'https://zalo.me/0983339397',
        isRentalSlot: false
      },
      {
        id: 'right-slot-2',
        badge: '🏗️ THIẾT KẾ CHUẨN LỖ BAN',
        title: 'Tư Vấn Thiết Kế Biển Hiệu Quảng Cáo & Nội Thất Hợp Mệnh Gia Chủ',
        desc: 'Đo đạc chuẩn 3 Thước Lỗ Ban 52.2cm - 42.9cm - 38.8cm, phối màu bảng hiệu tương sinh Ngũ Hành giúp cửa hàng đại vượng.',
        priceTag: 'B2B K94 Media',
        imageUrl: '',
        ctaText: '📐 Nhận Báo Giá Thiết Kế →',
        ctaUrl: 'https://zalo.me/0983339397',
        isRentalSlot: false
      },
      {
        id: 'right-slot-3',
        badge: '📢 CHO THUÊ BANNER PHẢI',
        title: 'Vị Trí Quảng Cáo Cho Thuê Cánh Phải (240×360px)',
        desc: 'Tăng nhận diện thương hiệu tới hàng ngàn khách tra cứu Tử Vi & Phong Thủy mỗi ngày. Miễn phí thiết kế Banner tại K94.',
        priceTag: 'Vị trí VIP Cánh Phải',
        imageUrl: '',
        ctaText: '💬 Liên Hệ Thuê: 0983.339.397',
        ctaUrl: 'https://zalo.me/0983339397',
        isRentalSlot: true
      }
    ]
  },
  products: [
    {
      id: 'tram-huong-108',
      name: 'Vòng Tay Trầm Hương Tự Nhiên 108 Hạt Tụ Khí Bình An',
      element: 'Mộc',
      targetElements: ['Mộc', 'Hỏa', 'Thủy'],
      price: '389.000đ',
      originalPrice: '650.000đ',
      commissionBadge: 'Bán chạy #1',
      icon: '📿',
      benefit: 'Tịnh tâm an thần, xua đuổi tà khí, chiêu quý nhân và kích hoạt cung Phúc Đức - Tài Bạch.',
      shopeeUrl: 'https://shopee.vn/search?keyword=vong%20tay%20tram%20huong%20108%20hat%20phong%20thuy',
      tiktokUrl: 'https://www.tiktok.com/search?q=vong%20tram%20huong%20108%20hat'
    },
    {
      id: 'phat-ban-menh',
      name: 'Mặt Dây Chuyền Phật Bản Mệnh 12 Con Giáp Đá Tự Nhiên Hộ Thân',
      element: 'Thổ',
      targetElements: ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'],
      price: '299.000đ',
      originalPrice: '520.000đ',
      commissionBadge: 'Độ mạng 12 giáp',
      icon: '🪷',
      benefit: 'Đức Phật độ mạng theo năm sinh, hóa giải sao hạn La Hầu, Kế Đô, Thái Bạch và Tam Tai.',
      shopeeUrl: 'https://shopee.vn/search?keyword=day%20chuyen%20phat%20ban%20menh%2012%20con%20giap',
      tiktokUrl: 'https://www.tiktok.com/search?q=phat%20ban%20menh%2012%20con%20giap'
    },
    {
      id: 'thach-anh-kim',
      name: 'Vòng Đá Thạch Anh Tóc Vàng (Hợp Mệnh Kim & Mệnh Thổ)',
      element: 'Kim',
      targetElements: ['Kim', 'Thổ', 'Thủy'],
      price: '450.000đ',
      originalPrice: '790.000đ',
      commissionBadge: 'Chiêu Chính Tài',
      icon: '✨',
      benefit: 'Tăng cường năng lượng Vũ Khúc - Lộc Tồn, thu hút vận may tài chính và quyết đoán trong kinh doanh.',
      shopeeUrl: 'https://shopee.vn/search?keyword=vong%20thach%20anh%20toc%20vang%20phong%20thuy',
      tiktokUrl: 'https://www.tiktok.com/search?q=vong%20thach%20anh%20toc%20vang'
    },
    {
      id: 'ty-huu-chieu-tai',
      name: 'Tượng Tỳ Hưu & Thiềm Thừ Chiêu Tài Đặt Bàn Làm Việc / Két Sắt',
      element: 'Thổ',
      targetElements: ['Thổ', 'Kim', 'Hỏa'],
      price: '420.000đ',
      originalPrice: '750.000đ',
      commissionBadge: 'Tụ Lộc Khố',
      icon: '🦁',
      benefit: 'Trấn giữ cung Tài Bạch và bàn thu ngân, chỉ thu tiền vào mà không thất thoát.',
      shopeeUrl: 'https://shopee.vn/search?keyword=ty%20huu%20phong%20thuy%20de%20ban%20lam%20viec',
      tiktokUrl: 'https://www.tiktok.com/search?q=ty%20huu%20phong%20thuy'
    },
    {
      id: 'dong-xu-kinh-dich',
      name: 'Bộ 3 Đồng Xu Cổ Càn Long Thông Bảo & Dây Đỏ Gieo Quẻ Chiêu Tài',
      element: 'Kim',
      targetElements: ['Kim', 'Thủy', 'Thổ'],
      price: '68.000đ',
      originalPrice: '150.000đ',
      commissionBadge: 'Pháp khí Dịch Học',
      icon: '🪙',
      benefit: 'Dùng gieo quẻ Lục Hào Kinh Dịch chuẩn xác hoặc bỏ ví tiền, dán sổ thu ngân kích tài lộc.',
      shopeeUrl: 'https://shopee.vn/search?keyword=dong%20xu%20can%20long%20thong%20bao%20phong%20thuy',
      tiktokUrl: 'https://www.tiktok.com/search?q=dong%20xu%20phong%20thuy'
    },
    {
      id: 'thach-anh-thuy',
      name: 'Vòng Đá Aquamarine & Thạch Anh Đen (Hợp Mệnh Thủy & Mộc)',
      element: 'Thủy',
      targetElements: ['Thủy', 'Mộc'],
      price: '360.000đ',
      originalPrice: '620.000đ',
      commissionBadge: 'Vượng Thủy Mộc',
      icon: '💧',
      benefit: 'Khai mở trí tuệ Văn Xương - Thiên Cơ, thuận lợi giao thương, đàm phán và đi xa lập nghiệp.',
      shopeeUrl: 'https://shopee.vn/search?keyword=vong%20da%20aquamarine%20menh%20thuy%20moc',
      tiktokUrl: 'https://www.tiktok.com/search?q=vong%20da%20menh%20thuy'
    },
    {
      id: 'thach-anh-hoa',
      name: 'Vòng Đá Mã Não Đỏ & Thạch Anh Tím (Hợp Mệnh Hỏa & Thổ)',
      element: 'Hỏa',
      targetElements: ['Hỏa', 'Thổ'],
      price: '350.000đ',
      originalPrice: '590.000đ',
      commissionBadge: 'Vượng Hỏa Thổ',
      icon: '🔥',
      benefit: 'Bồi đắp dương khí Thái Dương, tăng sức hút thương hiệu, danh vọng và nhân duyên.',
      shopeeUrl: 'https://shopee.vn/search?keyword=vong%20thach%20anh%20tim%20menh%20hoa%20tho',
      tiktokUrl: 'https://www.tiktok.com/search?q=vong%20da%20menh%20hoa'
    },
    {
      id: 'sach-kinh-dich-tu-vi',
      name: 'Bộ Sách Kinh Dịch Đạo Của Người Quân Tử & Tử Vi Đẩu Số Tân Biên',
      element: 'Mộc',
      targetElements: ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'],
      price: '245.000đ',
      originalPrice: '390.000đ',
      commissionBadge: 'Tàng Kinh Các',
      icon: '📚',
      benefit: 'Sách gối đầu giường cho người nghiên cứu mệnh lý, bói quẻ Chu Dịch và quản trị nhân sự.',
      shopeeUrl: 'https://shopee.vn/search?keyword=sach%20kinh%20dich%20tu%20vi%20dau%20so%20tan%20bien',
      tiktokUrl: 'https://www.tiktok.com/search?q=sach%20tu%20vi%20dau%20so'
    },
    {
      id: 'la-kinh-lo-ban',
      name: 'Thước Lỗ Ban Phong Thủy Cuộn Thép 5m/7.5m & La Kinh Bát Trạch',
      element: 'Kim',
      targetElements: ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'],
      price: '125.000đ',
      originalPrice: '220.000đ',
      commissionBadge: 'Chuẩn Kiến Trúc',
      icon: '🧭',
      benefit: 'Dụng cụ thực hành đo đạc kích thước cửa, bàn thờ, biển hiệu và phân kim hướng nhà thực tế.',
      shopeeUrl: 'https://shopee.vn/search?keyword=thuoc%20lo%20ban%20phong%20thuy%207.5m',
      tiktokUrl: 'https://www.tiktok.com/search?q=thuoc%20lo%20ban%20phong%20thuy'
    }
  ]
};

export function loadMonetizationConfig() {
  if (typeof window === 'undefined') return DEFAULT_MONETIZATION_CONFIG;
  try {
    const raw = localStorage.getItem(MONETIZATION_STORAGE_KEY);
    if (!raw) return DEFAULT_MONETIZATION_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_MONETIZATION_CONFIG,
      ...parsed,
      donation: { ...DEFAULT_MONETIZATION_CONFIG.donation, ...(parsed.donation || {}) },
      banners: Array.isArray(parsed.banners) && parsed.banners.length > 0 ? parsed.banners : DEFAULT_MONETIZATION_CONFIG.banners,
      sidePanels: {
        left:
          Array.isArray(parsed.sidePanels?.left) && parsed.sidePanels.left.length > 0
            ? parsed.sidePanels.left
            : DEFAULT_MONETIZATION_CONFIG.sidePanels.left,
        right:
          Array.isArray(parsed.sidePanels?.right) && parsed.sidePanels.right.length > 0
            ? parsed.sidePanels.right
            : DEFAULT_MONETIZATION_CONFIG.sidePanels.right
      },
      products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : DEFAULT_MONETIZATION_CONFIG.products
    };
  } catch {
    return DEFAULT_MONETIZATION_CONFIG;
  }
}

export function saveMonetizationConfig(cfg) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MONETIZATION_STORAGE_KEY, JSON.stringify(cfg));
    window.dispatchEvent(new Event('hhd-monetization-updated'));
  } catch (e) {
    console.error(e);
  }
}

export function buildVietQrUrl(donation, customAmount) {
  const bank = donation?.bankCode || 'MB';
  const acc = donation?.accountNo || '0983339397';
  const amount = customAmount || donation?.defaultAmount || 68000;
  const info = encodeURIComponent(donation?.message || 'Gieo duyen HHD K94');
  const accName = encodeURIComponent(donation?.accountName || 'CONG TY TRUYEN THONG K94');
  return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${accName}`;
}

// ============================================================================
// ADMIN SECURITY & AUTHENTICATION (2-Factor: Password + 6-Digit PIN, SHA-256)
// ============================================================================
const ADMIN_AUTH_STORAGE_KEY = 'hhd_k94_admin_credentials_v1';
const ADMIN_SESSION_STORAGE_KEY = 'hhd_k94_admin_session_v1';
const ADMIN_LOCKOUT_STORAGE_KEY = 'hhd_k94_admin_lockout_v1';

// Default SHA-256 hashes (Password: K94@0983339397 | PIN: 339397)
const DEFAULT_ADMIN_PASS_HASH = 'ed7854df9bfce7c803994edbe9a0d8dc423326ccb5fee589fb7ceb67b6171c9b';
const DEFAULT_ADMIN_PIN_HASH = 'd6840b46ba685849fe2f6f2ea98401400948fb7858a0121f8867ae65cc312a76';
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Pure JS SHA-256 implementation (works in both HTTPS and non-HTTPS contexts)
export function sha256Hex(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';
  const words = [];
  const utf8 = unescape(encodeURIComponent(String(ascii)));
  const asciiBitLength = utf8[lengthProperty] * 8;

  let hash = [];
  const k = [];
  let primeCounter = 0;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  let str = utf8 + '\x80';
  while ((str[lengthProperty] % 64) - 56) str += '\x00';
  for (i = 0; i < str[lengthProperty]; i++) {
    j = str.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15],
        w2 = w[i - 2];

      const a = hash[0],
        e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

function getStoredHashes() {
  if (typeof window === 'undefined') {
    return { passHash: DEFAULT_ADMIN_PASS_HASH, pinHash: DEFAULT_ADMIN_PIN_HASH };
  }
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
    if (!raw) return { passHash: DEFAULT_ADMIN_PASS_HASH, pinHash: DEFAULT_ADMIN_PIN_HASH };
    const parsed = JSON.parse(raw);
    return {
      passHash: parsed.passHash || DEFAULT_ADMIN_PASS_HASH,
      pinHash: parsed.pinHash || DEFAULT_ADMIN_PIN_HASH
    };
  } catch {
    return { passHash: DEFAULT_ADMIN_PASS_HASH, pinHash: DEFAULT_ADMIN_PIN_HASH };
  }
}

export function getLockoutState() {
  if (typeof window === 'undefined') return { failedAttempts: 0, lockedUntil: 0, remainingSeconds: 0 };
  try {
    const raw = localStorage.getItem(ADMIN_LOCKOUT_STORAGE_KEY);
    if (!raw) return { failedAttempts: 0, lockedUntil: 0, remainingSeconds: 0 };
    const parsed = JSON.parse(raw);
    const now = Date.now();
    if (parsed.lockedUntil && parsed.lockedUntil > now) {
      return {
        failedAttempts: parsed.failedAttempts || MAX_FAILED_ATTEMPTS,
        lockedUntil: parsed.lockedUntil,
        remainingSeconds: Math.ceil((parsed.lockedUntil - now) / 1000)
      };
    }
    if (parsed.lockedUntil && parsed.lockedUntil <= now) {
      localStorage.removeItem(ADMIN_LOCKOUT_STORAGE_KEY);
      return { failedAttempts: 0, lockedUntil: 0, remainingSeconds: 0 };
    }
    return {
      failedAttempts: parsed.failedAttempts || 0,
      lockedUntil: 0,
      remainingSeconds: 0
    };
  } catch {
    return { failedAttempts: 0, lockedUntil: 0, remainingSeconds: 0 };
  }
}

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const { passHash, pinHash } = getStoredHashes();
    const expectedToken = sha256Hex(`${passHash}:${pinHash}:k94-session`);
    if (parsed.token !== expectedToken) return false;
    if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function verifyAndLoginAdmin(password, pin) {
  if (typeof window === 'undefined') return { ok: false, error: 'Môi trường không hợp lệ.' };
  const lockout = getLockoutState();
  if (lockout.remainingSeconds > 0) {
    return {
      ok: false,
      error: `Tài khoản đang tạm khóa chống dò mật khẩu. Vui lòng thử lại sau ${lockout.remainingSeconds} giây.`
    };
  }

  const { passHash, pinHash } = getStoredHashes();
  const inputPassHash = sha256Hex(String(password || '').trim());
  const inputPinHash = sha256Hex(String(pin || '').trim());

  if (inputPassHash === passHash && inputPinHash === pinHash) {
    localStorage.removeItem(ADMIN_LOCKOUT_STORAGE_KEY);
    const token = sha256Hex(`${passHash}:${pinHash}:k94-session`);
    sessionStorage.setItem(
      ADMIN_SESSION_STORAGE_KEY,
      JSON.stringify({
        token,
        expiresAt: Date.now() + SESSION_DURATION_MS
      })
    );
    window.dispatchEvent(new Event('hhd-admin-auth-changed'));
    return { ok: true };
  }

  const nextAttempts = (lockout.failedAttempts || 0) + 1;
  const isNowLocked = nextAttempts >= MAX_FAILED_ATTEMPTS;
  const lockedUntil = isNowLocked ? Date.now() + LOCKOUT_DURATION_MS : 0;
  localStorage.setItem(
    ADMIN_LOCKOUT_STORAGE_KEY,
    JSON.stringify({
      failedAttempts: nextAttempts,
      lockedUntil
    })
  );

  if (isNowLocked) {
    return {
      ok: false,
      error: 'Nhập sai quá 5 lần! Hệ thống đã tự động khóa bảo vệ trong 5 phút.'
    };
  }

  return {
    ok: false,
    error: `Mật khẩu Quản trị hoặc Mã PIN 6 số không đúng! (Còn ${MAX_FAILED_ATTEMPTS - nextAttempts} lần thử)`
  };
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  window.dispatchEvent(new Event('hhd-admin-auth-changed'));
}

export function changeAdminCredentials(currentPassword, newPassword, newPin) {
  if (typeof window === 'undefined') return { ok: false, error: 'Lỗi môi trường.' };
  const { passHash } = getStoredHashes();
  if (sha256Hex(String(currentPassword || '').trim()) !== passHash) {
    return { ok: false, error: 'Mật khẩu hiện tại không chính xác!' };
  }
  const cleanPass = String(newPassword || '').trim();
  const cleanPin = String(newPin || '').trim();
  if (cleanPass.length < 6) {
    return { ok: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự!' };
  }
  if (!/^\d{6}$/.test(cleanPin)) {
    return { ok: false, error: 'Mã PIN bảo mật phải gồm đúng 6 chữ số!' };
  }
  const nextPassHash = sha256Hex(cleanPass);
  const nextPinHash = sha256Hex(cleanPin);
  localStorage.setItem(
    ADMIN_AUTH_STORAGE_KEY,
    JSON.stringify({
      passHash: nextPassHash,
      pinHash: nextPinHash,
      updatedAt: new Date().toISOString()
    })
  );
  const token = sha256Hex(`${nextPassHash}:${nextPinHash}:k94-session`);
  sessionStorage.setItem(
    ADMIN_SESSION_STORAGE_KEY,
    JSON.stringify({
      token,
      expiresAt: Date.now() + SESSION_DURATION_MS
    })
  );
  window.dispatchEvent(new Event('hhd-admin-auth-changed'));
  return { ok: true };
}

