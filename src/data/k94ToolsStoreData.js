// ============================================================================
// CHỢ TOOL AI, APP & DỊCH VỤ SỐ — CÔNG TY TRUYỀN THÔNG K94 & ĐỐI TÁC
// Hotline / Zalo Tư Vấn & Cấp Bản Quyền: 0983.339.397 (0983339397)
// ============================================================================

export const K94_TOOLS_STORAGE_KEY = 'hhd_k94_tools_store_products_v1';

export const K94_STORE_INFO = {
  name: 'TRUNG TÂM TOOL AI, APP & DỊCH VỤ SỐ K94 MEDIA & ĐỐI TÁC',
  shortName: 'K94 DIGITAL STORE',
  tagline:
    'Chuyên Cung Cấp Phần Mềm Tự Động Hóa, Tool Dựng Video AI, App Bán Hàng, Thiết Kế Web & Dịch Vụ Truyền Thông Đa Kênh Do K94 Cùng Các Đối Tác Phát Triển',
  partnerUnit: 'Công ty Truyền thông K94 & Liên minh Đối tác Công nghệ',
  phone: '0983339397',
  phoneDisplay: '0983.339.397',
  zaloUrl: 'https://zalo.me/0983339397',
  supportPolicy:
    'Bàn giao Key bản quyền trong 5 phút · Hỗ trợ cài đặt 1-1 qua UltraViewer / AnyDesk · Bảo hành & cập nhật tính năng miễn phí 24/7!'
};

export const K94_STORE_CATEGORIES = [
  { id: 'ALL', label: '🚀 Tất Cả Tool, App & Dịch Vụ', countBadge: 'Trọn bộ' },
  { id: 'video-ai', label: '🎬 Tool Video AI & Đa Nền Tảng', countBadge: 'HHD CapCut / Reup' },
  { id: 'mkt-automation', label: '🤖 Tool Marketing & Tự Động Hóa', countBadge: 'Auto / Chatbot' },
  { id: 'app-web', label: '📱 App Mobile & Web Trọn Gói', countBadge: 'Chuẩn SEO / POS' },
  { id: 'media-service', label: '🎨 Dịch Vụ Truyền Thông & Ads K94', countBadge: 'Video / Biển Hiệu' },
  { id: 'ai-license', label: '⚡ Tài Khoản & API AI Đối Tác', countBadge: 'Giá Sỉ VIP' }
];

function makeTechProductSvg({ bg1, bg2, accent, secondary, iconType, badgeText, modelText }) {
  let illustration = '';
  if (iconType === 'video-editor') {
    illustration = `
      <rect x="48" y="42" width="204" height="114" rx="10" fill="#09101D" stroke="${accent}" stroke-width="3"/>
      <rect x="58" y="52" width="115" height="62" rx="6" fill="#111C2D" stroke="${secondary}" stroke-width="1.5"/>
      <polygon points="108,72 108,96 128,84" fill="${accent}"/>
      <rect x="180" y="52" width="62" height="62" rx="6" fill="#152238"/>
      <line x1="188" y1="66" x2="234" y2="66" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
      <line x1="188" y1="80" x2="226" y2="80" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
      <line x1="188" y1="94" x2="230" y2="94" stroke="${secondary}" stroke-width="3" stroke-linecap="round"/>
      <!-- Multi-layer Timeline -->
      <rect x="58" y="120" width="184" height="10" rx="4" fill="${accent}" opacity="0.85"/>
      <rect x="58" y="135" width="142" height="10" rx="4" fill="${secondary}" opacity="0.85"/>
      <line x1="135" y1="48" x2="135" y2="150" stroke="#EF4444" stroke-width="2.5"/>
    `;
  } else if (iconType === 'downloader') {
    illustration = `
      <circle cx="150" cy="98" r="48" fill="#0B1528" stroke="${accent}" stroke-width="3.5"/>
      <path d="M 150 68 L 150 112 M 132 96 L 150 115 L 168 96" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="126" y1="124" x2="174" y2="124" stroke="${secondary}" stroke-width="5" stroke-linecap="round"/>
      <rect x="50" y="58" width="44" height="26" rx="6" fill="#1E293B" stroke="${secondary}" stroke-width="2"/>
      <text x="72" y="75" font-family="sans-serif" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">4K NO</text>
      <rect x="206" y="58" width="44" height="26" rx="6" fill="#1E293B" stroke="${accent}" stroke-width="2"/>
      <text x="228" y="75" font-family="sans-serif" font-size="10" font-weight="900" fill="${accent}" text-anchor="middle">LOGO</text>
    `;
  } else if (iconType === 'ai-bot') {
    illustration = `
      <rect x="92" y="54" width="116" height="88" rx="20" fill="#0F172A" stroke="${accent}" stroke-width="3.5"/>
      <line x1="150" y1="36" x2="150" y2="54" stroke="${accent}" stroke-width="4"/>
      <circle cx="150" cy="34" r="6" fill="${secondary}"/>
      <circle cx="126" cy="90" r="11" fill="${secondary}"/>
      <circle cx="174" cy="90" r="11" fill="${secondary}"/>
      <path d="M 124 118 Q 150 132 176 118" fill="none" stroke="${accent}" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="76" y="82" width="14" height="28" rx="5" fill="${accent}"/>
      <rect x="210" y="82" width="14" height="28" rx="5" fill="${accent}"/>
    `;
  } else if (iconType === 'web-app') {
    illustration = `
      <rect x="46" y="44" width="154" height="104" rx="10" fill="#0B1324" stroke="${accent}" stroke-width="3"/>
      <line x1="46" y1="64" x2="200" y2="64" stroke="${accent}" stroke-width="2"/>
      <circle cx="60" cy="54" r="3.5" fill="#EF4444"/>
      <circle cx="72" cy="54" r="3.5" fill="#FACC15"/>
      <circle cx="84" cy="54" r="3.5" fill="#22C55E"/>
      <rect x="60" y="76" width="55" height="56" rx="6" fill="#1E293B" stroke="${secondary}" stroke-width="1.5"/>
      <rect x="124" y="76" width="62" height="24" rx="5" fill="${accent}" opacity="0.25"/>
      <rect x="124" y="108" width="62" height="24" rx="5" fill="${secondary}" opacity="0.25"/>
      <!-- Mobile Phone Overlay -->
      <rect x="192" y="56" width="60" height="100" rx="11" fill="#0F172A" stroke="${secondary}" stroke-width="3"/>
      <rect x="202" y="72" width="40" height="64" rx="4" fill="#1E293B"/>
      <circle cx="222" cy="146" r="4" fill="${accent}"/>
    `;
  } else if (iconType === 'media-ads') {
    illustration = `
      <path d="M 75 102 L 145 68 L 145 136 L 75 102 Z" fill="${accent}"/>
      <rect x="55" y="88" width="24" height="28" rx="5" fill="${secondary}"/>
      <path d="M 162 78 Q 185 102 162 126" fill="none" stroke="${secondary}" stroke-width="4" stroke-linecap="round"/>
      <path d="M 178 64 Q 212 102 178 140" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <rect x="198" y="54" width="54" height="90" rx="8" fill="#0F172A" stroke="${accent}" stroke-width="2.5"/>
      <polyline points="206,126 218,105 228,112 244,78" fill="none" stroke="#4ADE80" stroke-width="3.5" stroke-linecap="round"/>
    `;
  } else {
    illustration = `
      <polygon points="150,42 206,74 206,134 150,162 94,134 94,74" fill="#0B1528" stroke="${accent}" stroke-width="3.5"/>
      <circle cx="150" cy="102" r="24" fill="#1E293B" stroke="${secondary}" stroke-width="3"/>
      <text x="150" y="107" font-family="sans-serif" font-size="14" font-weight="900" fill="${accent}" text-anchor="middle">AI</text>
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
    <rect x="4" y="4" width="292" height="192" rx="11" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.7"/>
    <rect x="12" y="12" width="136" height="22" rx="11" fill="rgba(0,0,0,0.6)" stroke="${accent}" stroke-width="1"/>
    <text x="80" y="27" font-family="sans-serif" font-size="10" font-weight="800" fill="${accent}" text-anchor="middle">${badgeText}</text>
    ${illustration}
    <rect x="0" y="168" width="300" height="32" fill="rgba(5, 10, 20, 0.86)"/>
    <text x="150" y="189" font-family="sans-serif" font-size="11.5" font-weight="800" fill="#F8FAFC" text-anchor="middle">${modelText}</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export const DEFAULT_K94_TOOLS_PRODUCTS = [
  {
    id: 'hhd-capcut-pro-ai',
    name: 'Phần Mềm HHD CapCut Desktop — Dựng Video Đa Lớp Tích Hợp AI & Tải Video Đa Kênh',
    category: 'video-ai',
    categoryLabel: 'Tool Video AI & Đa Nền Tảng',
    price: 990000,
    priceDisplay: '990.000đ',
    originalPriceDisplay: '1.800.000đ',
    licenseType: 'Bản quyền 1 Năm / Vĩnh viễn',
    partnerName: 'K94 Media Lab',
    badge: 'Flagship #1 K94',
    specs: 'Tự động xóa khoảng lặng · Phụ đề AI Whisper · Lồng tiếng TTS Tiếng Việt · Tách nền RVM · Face Swap AI',
    desc: 'Bộ công cụ dựng video đa lớp chuyên nghiệp dành cho Creator, MMO & Agency: tải & quét kênh YouTube/TikTok/Douyin/Xiaohongshu, tự động lồng tiếng Re-dub và đóng dấu watermark thương hiệu hàng loạt.',
    image: makeTechProductSvg({
      bg1: '#0A0F24',
      bg2: '#1E1B4B',
      accent: '#FACC15',
      secondary: '#38BDF8',
      iconType: 'video-editor',
      badgeText: 'HHD CAPCUT AI PRO',
      modelText: 'DỰNG VIDEO ĐA LỚP · WHISPER · TTS · RVM'
    })
  },
  {
    id: 'hhd-edit-remotion-studio',
    name: 'Bộ Công Cụ HHD Edit (Remotion Studio) — Tự Động Sản Xuất Video Bản Tin, Intro & Shorts Hàng Loạt',
    category: 'video-ai',
    categoryLabel: 'Tool Video AI & Đa Nền Tảng',
    price: 1250000,
    priceDisplay: '1.250.000đ',
    originalPriceDisplay: '2.200.000đ',
    licenseType: 'Trọn bộ Source + Template',
    partnerName: 'K94 Studio × Remotion Partner',
    badge: 'Render Tự Động',
    specs: 'Xuất MP4 FullHD/4K bằng code · Kho Intro, Bản tin, TikTok/Reels, Lower Thirds, Sóng nhạc & Phụ đề',
    desc: 'Giải pháp dựng video lập trình hóa siêu tốc cho công ty truyền thông và hệ thống kênh tin tức, review, phong thủy.',
    image: makeTechProductSvg({
      bg1: '#140B29',
      bg2: '#091526',
      accent: '#A855F7',
      secondary: '#FACC15',
      iconType: 'video-editor',
      badgeText: 'HHD EDIT REMOTION',
      modelText: 'RENDER VIDEO TỰ ĐỘNG · INTRO & SHORTS'
    })
  },
  {
    id: 'tool-down-reup-multichannel',
    name: 'Tool Quét Kênh & Tải Video Không Logo Đa Nền Tảng (TikTok, Douyin, Xiaohongshu, YouTube, Reels)',
    category: 'video-ai',
    categoryLabel: 'Tool Video AI & Đa Nền Tảng',
    price: 490000,
    priceDisplay: '490.000đ',
    originalPriceDisplay: '850.000đ',
    licenseType: 'Key Bản Quyền 1 Năm',
    partnerName: 'K94 × Đối Tác MMO Tech',
    badge: 'Bán Chạy',
    specs: 'Quét toàn bộ video theo link kênh · Tải hàng loạt FullHD/4K · Tự động lách bản quyền cơ bản & đổi MD5',
    desc: 'Giúp nhà sáng tạo nội dung và chủ shop gom kho video nguyên liệu từ Douyin, Tiểu Hồng Thư, TikTok về chỉnh sửa chỉ với 1 cú nhấp chuột.',
    image: makeTechProductSvg({
      bg1: '#071E26',
      bg2: '#0F172A',
      accent: '#38BDF8',
      secondary: '#4ADE80',
      iconType: 'downloader',
      badgeText: 'MULTI-DOWNLOADER',
      modelText: 'TẢI & QUÉT KÊNH ĐA NỀN TẢNG 4K'
    })
  },
  {
    id: 'tool-chatbot-ai-chot-don',
    name: 'Hệ Thống Chatbot AI Tư Vấn & Chốt Đơn Tự Động 24/7 Đa Kênh (Fanpage, Zalo OA, Website)',
    category: 'mkt-automation',
    categoryLabel: 'Tool Marketing & Tự Động Hóa',
    price: 790000,
    priceDisplay: '790.000đ',
    originalPriceDisplay: '1.400.000đ',
    licenseType: 'Gói Cài Đặt & Huấn Luyện AI',
    partnerName: 'K94 AI Automation Partner',
    badge: 'Tăng 300% Đơn',
    specs: 'Huấn luyện theo dữ liệu sản phẩm riêng của Shop · Tự báo giá, xin SĐT/Địa chỉ và đẩy đơn về Zalo',
    desc: 'Trợ lý AI thông minh trực page ngày đêm, trả lời khách tự nhiên như nhân viên thật, chống cướp khách và ẩn bình luận chứa số điện thoại.',
    image: makeTechProductSvg({
      bg1: '#06241C',
      bg2: '#0B1324',
      accent: '#10B981',
      secondary: '#FACC15',
      iconType: 'ai-bot',
      badgeText: 'AI SALES AGENT 24/7',
      modelText: 'CHATBOT AI CHỐT ĐƠN ZALO & FANPAGE'
    })
  },
  {
    id: 'tool-auto-marketing-seeding',
    name: 'Phần Mềm Tự Động Hóa Nuôi Nick, Đăng Bài Đa Kênh & Seeding Livestream TikTok / Facebook',
    category: 'mkt-automation',
    categoryLabel: 'Tool Marketing & Tự Động Hóa',
    price: 650000,
    priceDisplay: '650.000đ',
    originalPriceDisplay: '1.100.000đ',
    licenseType: 'Key 6 Tháng / 1 Năm',
    partnerName: 'Đối Tác Phần Mềm MKT × K94',
    badge: 'Auto MKT',
    specs: 'Đặt lịch đăng Reels/Shorts tự động · Bình luận tạo hiệu ứng đám đông · Quản lý hàng trăm tài khoản',
    desc: 'Tiết kiệm 80% nhân sự đăng bài thủ công, phủ sóng thương hiệu và kéo tương tác tự nhiên trên mọi mặt trận mạng xã hội.',
    image: makeTechProductSvg({
      bg1: '#1E1409',
      bg2: '#0F172A',
      accent: '#F59E0B',
      secondary: '#38BDF8',
      iconType: 'ai-bot',
      badgeText: 'AUTO MARKETING PRO',
      modelText: 'ĐĂNG BÀI TỰ ĐỘNG & SEEDING ĐA KÊNH'
    })
  },
  {
    id: 'app-quan-ly-ban-hang-k94-pos',
    name: 'Phần Mềm / App Quản Lý Bán Hàng, Tồn Kho, Công Nợ & In Hóa Đơn VietQR K94 POS',
    category: 'app-web',
    categoryLabel: 'App Mobile & Web Trọn Gói',
    price: 890000,
    priceDisplay: '890.000đ',
    originalPriceDisplay: '1.500.000đ',
    licenseType: 'Trọn Đời Không Phí Tháng',
    partnerName: 'K94 Software & Đối Tác',
    badge: 'Không Phí Tháng',
    specs: 'Chạy trên Điện thoại, Máy tính & Máy POS · Tạo mã QR thanh toán từng đơn · Báo cáo lãi lỗ theo ngày',
    desc: 'Phù hợp cho cửa hàng dụng cụ câu cá, vật tư nông nghiệp, shop thời trang, tạp hóa, quán ăn và đại lý phân phối sỉ lẻ.',
    image: makeTechProductSvg({
      bg1: '#0B1D36',
      bg2: '#0F172A',
      accent: '#38BDF8',
      secondary: '#FACC15',
      iconType: 'web-app',
      badgeText: 'K94 POS & INVENTORY',
      modelText: 'APP QUẢN LÝ BÁN HÀNG & KHO VĨNH VIỄN'
    })
  },
  {
    id: 'thiet-ke-web-thuong-mai-tron-goi',
    name: 'Dịch Vụ Thiết Kế Website Bán Hàng, Bất Động Sản, Phong Thủy & Web App Theo Yêu Cầu',
    category: 'app-web',
    categoryLabel: 'App Mobile & Web Trọn Gói',
    price: 1990000,
    priceDisplay: '1.990.000đ',
    originalPriceDisplay: '3.500.000đ',
    licenseType: 'Bàn Giao Full Code + Tên Miền',
    partnerName: 'Công Ty Truyền Thông K94',
    badge: 'Chuẩn SEO & AI',
    specs: 'Tốc độ tải siêu nhanh · Tích hợp Giỏ hàng Zalo + VietQR + Panel Quảng cáo · Miễn phí Hosting trọn đời',
    desc: 'Thiết kế website đẳng cấp mang đậm dấu ấn thương hiệu riêng, tối ưu chuyển đổi đơn hàng trên cả điện thoại và máy tính.',
    image: makeTechProductSvg({
      bg1: '#18102E',
      bg2: '#09101E',
      accent: '#FACC15',
      secondary: '#A855F7',
      iconType: 'web-app',
      badgeText: 'WEB & APP K94 STUDIO',
      modelText: 'THIẾT KẾ WEBSITE & MINI APP TRỌN GÓI'
    })
  },
  {
    id: 'dich-vu-san-xuat-video-tvc-tiktok',
    name: 'Gói Sản Xuất Video Marketing, TVC Doanh Nghiệp & Xây Kênh TikTok / Reels Trọn Gói K94',
    category: 'media-service',
    categoryLabel: 'Dịch Vụ Truyền Thông & Ads K94',
    price: 1500000,
    priceDisplay: '1.500.000đ',
    originalPriceDisplay: '2.500.000đ',
    licenseType: 'Theo Video / Gói Tháng',
    partnerName: 'Công Ty Truyền Thông K94',
    badge: 'Dịch Vụ Chủ Lực',
    specs: 'Lên kịch bản xu hướng · Quay dựng chuyên nghiệp · Hiệu ứng VFX/Motion Graphics · Chuẩn thuật toán đề xuất',
    desc: 'Giúp doanh nghiệp và cửa hàng bứt phá doanh số nhờ chuỗi video ngắn triệu view và thước phim giới thiệu thương hiệu ấn tượng.',
    image: makeTechProductSvg({
      bg1: '#260C16',
      bg2: '#0F172A',
      accent: '#F43F5E',
      secondary: '#FACC15',
      iconType: 'media-ads',
      badgeText: 'K94 MEDIA PRODUCTION',
      modelText: 'SẢN XUẤT VIDEO MARKETING & XÂY KÊNH'
    })
  },
  {
    id: 'dich-vu-thiet-ke-logo-bien-hieu-lo-ban',
    name: 'Gói Thiết Kế Logo, Bộ Nhận Diện Thương Hiệu & Biển Hiệu Quảng Cáo Hợp Phong Thủy Lỗ Ban',
    category: 'media-service',
    categoryLabel: 'Dịch Vụ Truyền Thông & Ads K94',
    price: 850000,
    priceDisplay: '850.000đ',
    originalPriceDisplay: '1.500.000đ',
    licenseType: 'Bàn Giao File Gốc Vector In Ấn',
    partnerName: 'K94 Design & Phong Thủy',
    badge: 'Độc Quyền K94',
    specs: 'Phối màu tương sinh Ngũ Hành chủ doanh nghiệp · Đo kích thước chuẩn 3 Thước Lỗ Ban Đỏ Cát Tường',
    desc: 'Sự kết hợp hoàn hảo giữa Mỹ thuật hiện đại và Phong thủy chính tông giúp cửa hàng khai trương hồng phát, thu hút tài lộc.',
    image: makeTechProductSvg({
      bg1: '#1E1708',
      bg2: '#0B1324',
      accent: '#FACC15',
      secondary: '#38BDF8',
      iconType: 'media-ads',
      badgeText: 'BRANDING & LỖ BAN',
      modelText: 'LOGO & BIỂN HIỆU HỢP MỆNH GIA CHỦ'
    })
  },
  {
    id: 'dich-vu-chay-quang-cao-ads-da-kenh',
    name: 'Dịch Vụ Chạy Quảng Cáo Đa Kênh (Facebook Ads, TikTok Ads, Google Ads) & Thuê Banner Hệ Thống HHD',
    category: 'media-service',
    categoryLabel: 'Dịch Vụ Truyền Thông & Ads K94',
    price: 1200000,
    priceDisplay: '1.200.000đ',
    originalPriceDisplay: '2.000.000đ',
    licenseType: 'Gói Chiến Dịch / Tháng',
    partnerName: 'K94 Performance Ads',
    badge: 'Cam Kết Hiệu Quả',
    specs: 'Target chuẩn tệp khách hàng tiềm năng · Tối ưu chi phí trên mỗi tin nhắn · Báo cáo minh bạch hàng ngày',
    desc: 'Đội ngũ chuyên gia K94 trực tiếp thiết kế ấn phẩm, viết bài quảng cáo và tối ưu chiến dịch ra đơn thực tế cho cửa hàng của bạn.',
    image: makeTechProductSvg({
      bg1: '#071F29',
      bg2: '#111827',
      accent: '#38BDF8',
      secondary: '#4ADE80',
      iconType: 'media-ads',
      badgeText: 'K94 ADS PERFORMANCE',
      modelText: 'QUẢNG CÁO FACEBOOK · TIKTOK · GOOGLE'
    })
  },
  {
    id: '9router-ai-gateway-unlimited',
    name: 'Cổng AI Gateway 9Router Đa Model (Chat, Tạo Ảnh, Giọng Nói TTS, Dịch Phụ Đề, Embeddings)',
    category: 'ai-license',
    categoryLabel: 'Tài Khoản & API AI Đối Tác',
    price: 390000,
    priceDisplay: '390.000đ',
    originalPriceDisplay: '750.000đ',
    licenseType: 'Cài Đặt Trọn Bộ + Hướng Dẫn',
    partnerName: '9Router × K94 AI Partner',
    badge: 'Siêu Tiết Kiệm',
    specs: 'Gom chung OpenAI, Gemini, Claude, ElevenLabs, Whisper, Imagen qua 1 chuẩn API duy nhất · Tự động Fallback',
    desc: 'Giải pháp tối ưu chi phí API AI cho lập trình viên, người làm tool tự động hóa và sản xuất nội dung số quy mô lớn.',
    image: makeTechProductSvg({
      bg1: '#0F172A',
      bg2: '#1E1B4B',
      accent: '#38BDF8',
      secondary: '#FACC15',
      iconType: 'ai-chip',
      badgeText: '9ROUTER AI GATEWAY',
      modelText: 'API ĐA MODEL: CHAT · IMAGE · TTS · STT'
    })
  },
  {
    id: 'combo-tai-khoan-ai-design-vip',
    name: 'Combo Tài Khoản Bản Quyền Sáng Tạo Số: CapCut Pro, Canva Pro, ChatGPT Plus / Gemini Advanced',
    category: 'ai-license',
    categoryLabel: 'Tài Khoản & API AI Đối Tác',
    price: 250000,
    priceDisplay: '250.000đ',
    originalPriceDisplay: '590.000đ',
    licenseType: 'Bảo Hành 1 Đổi 1 Đủ Hạn',
    partnerName: 'Đối Tác Bản Quyền Số K94',
    badge: 'Giá Sỉ Đối Tác',
    specs: 'Nâng cấp chính chủ trên email của bạn · Mở khóa toàn bộ kho hiệu ứng Pro, Font chữ và AI Tạo Ảnh/Video',
    desc: 'Trang bị đầy đủ vũ khí bản quyền giá tiết kiệm nhất cho Designer, Editor và đội ngũ Marketing doanh nghiệp.',
    image: makeTechProductSvg({
      bg1: '#1D1128',
      bg2: '#0B1324',
      accent: '#FACC15',
      secondary: '#EC4899',
      iconType: 'ai-chip',
      badgeText: 'LICENSE VIP PARTNER',
      modelText: 'CAPCUT PRO · CANVA PRO · CHATGPT · GEMINI'
    })
  }
];

export function loadK94ToolsProducts() {
  if (typeof window === 'undefined') return DEFAULT_K94_TOOLS_PRODUCTS;
  try {
    const raw = localStorage.getItem(K94_TOOLS_STORAGE_KEY);
    if (!raw) return DEFAULT_K94_TOOLS_PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_K94_TOOLS_PRODUCTS;
  } catch {
    return DEFAULT_K94_TOOLS_PRODUCTS;
  }
}

export function saveK94ToolsProducts(list) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(K94_TOOLS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

export const K94_SOLUTION_ADVISOR = [
  {
    id: 'creator-mmo',
    title: '🎬 Nhà Sáng Tạo Nội Dung (TikTok / YouTube / Reels / Affiliate)',
    summary: 'Tự động tải video xu hướng, cắt ghép đa lớp, tạo phụ đề & lồng tiếng AI tiếng Việt nhanh gấp 10 lần.',
    recommendedIds: ['hhd-capcut-pro-ai', 'tool-down-reup-multichannel', 'combo-tai-khoan-ai-design-vip'],
    savingNote: 'Tiết kiệm 4–6 giờ dựng video mỗi ngày, nhân bản hệ thống 5–10 kênh dễ dàng.'
  },
  {
    id: 'shop-owner',
    title: '🏪 Chủ Cửa Hàng / Shop Bán Lẻ (Đồ Câu, Thời Trang, Vật Tư, Đặc Sản)',
    summary: 'Sở hữu Website bán hàng riêng, App quản lý kho VietQR và Chatbot AI trực chốt đơn 24/7.',
    recommendedIds: ['thiet-ke-web-thuong-mai-tron-goi', 'app-quan-ly-ban-hang-k94-pos', 'tool-chatbot-ai-chot-don'],
    savingNote: 'Tự động hóa quy trình tiếp khách & lên đơn, không lo sót khách ban đêm.'
  },
  {
    id: 'enterprise-b2b',
    title: '🏢 Doanh Nghiệp / Thương Hiệu Cần Bứt Phá Doanh Số',
    summary: 'Thiết kế bộ nhận diện & biển hiệu chuẩn Lỗ Ban, sản xuất TVC chuyên nghiệp và chạy Ads đa kênh.',
    recommendedIds: ['dich-vu-thiet-ke-logo-bien-hieu-lo-ban', 'dich-vu-san-xuat-video-tvc-tiktok', 'dich-vu-chay-quang-cao-ads-da-kenh'],
    savingNote: 'Được đội ngũ K94 Media đồng hành trọn gói từ hình ảnh thương hiệu đến chiến dịch ra đơn.'
  }
];
