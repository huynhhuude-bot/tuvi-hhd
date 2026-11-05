export const MONETIZATION_STORAGE_KEY = 'hhd_k94_monetization_v1';

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
