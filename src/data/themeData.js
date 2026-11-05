// ============================================================================
// HỆ THỐNG 4 BẢNG MÀU GIAO DIỆN PHONG THỦY HHD — K94 MEDIA
// ============================================================================

export const HHD_THEME_STORAGE_KEY = 'hhd_color_theme_v1';

export const HHD_COLOR_THEMES = [
  {
    id: 'huyen-vu',
    icon: '🌌',
    name: 'Huyền Vũ Hoàng Kim',
    shortName: 'Huyền Vũ',
    elementBadge: 'Thủy · Kim (Mặc định)',
    desc: 'Đen Huyền Không & Vàng Đế Vương — Sang trọng, huyền bí, nổi bật quảng cáo.',
    baseMode: 'dark',
    previewColors: ['#0B0C10', '#151824', '#C9A84C', '#F4E3B2'],
    shellBg: '#0B0C10',
    wingBg: 'linear-gradient(180deg, rgba(12,14,20,0.98) 0%, rgba(9,10,15,0.98) 100%)',
    cardBg: 'rgba(17, 19, 28, 0.94)',
    dockBg: 'rgba(13, 15, 22, 0.96)',
    footerBg: 'linear-gradient(180deg, #090B10 0%, #06070B 100%)',
    accent: '#c9a84c',
    textMain: '#F4E3B2'
  },
  {
    id: 'chu-sa',
    icon: '🏮',
    name: 'Tử Cấm Thành Chu Sa',
    shortName: 'Chu Sa',
    elementBadge: 'Hỏa · Thổ (Vượng Tài Lộc)',
    desc: 'Đỏ Rượu Vang Trầm & Vàng Kim — Cát tường, hỷ sự, kích hoạt cung Tài Lộc.',
    baseMode: 'dark',
    previewColors: ['#1C0808', '#2E1111', '#FFD54F', '#FF5252'],
    shellBg: '#190707',
    wingBg: 'linear-gradient(180deg, rgba(40,11,11,0.98) 0%, rgba(24,6,6,0.98) 100%)',
    cardBg: 'rgba(46, 14, 14, 0.94)',
    dockBg: 'rgba(36, 10, 10, 0.96)',
    footerBg: 'linear-gradient(180deg, #220909 0%, #140505 100%)',
    accent: '#FFD54F',
    textMain: '#FFF0C2'
  },
  {
    id: 'giay-do',
    icon: '📜',
    name: 'Cổ Thư Giấy Dó',
    shortName: 'Giấy Dó',
    elementBadge: 'Thổ · Mộc (Nền Sáng Dễ Đọc)',
    desc: 'Vàng Giấy Dó Cổ Điển & Đỏ Ấn Triện — Rõ nét ban ngày, cực kỳ dịu mắt cho người lớn tuổi.',
    baseMode: 'light',
    previewColors: ['#F7F1E1', '#FFFDF7', '#B71C1C', '#9A6B16'],
    shellBg: '#F4EBDC',
    wingBg: 'linear-gradient(180deg, rgba(242,232,212,0.98) 0%, rgba(232,219,193,0.98) 100%)',
    cardBg: 'rgba(255, 253, 247, 0.96)',
    dockBg: 'rgba(38, 26, 18, 0.96)',
    footerBg: 'linear-gradient(180deg, #231811 0%, #170F0A 100%)',
    accent: '#9A6B16',
    textMain: '#2B1E16'
  },
  {
    id: 'ngoc-bich',
    icon: '🐉',
    name: 'Ngọc Bích Phỉ Thúy',
    shortName: 'Ngọc Bích',
    elementBadge: 'Thủy · Mộc (Thanh Tịnh)',
    desc: 'Xanh Ngọc Lục Bảo Trầm & Vàng Ánh Kim — Tĩnh tâm, trí tuệ, uy tín.',
    baseMode: 'dark',
    previewColors: ['#061714', '#0F2E28', '#E0C168', '#4DB6AC'],
    shellBg: '#061714',
    wingBg: 'linear-gradient(180deg, rgba(9,34,29,0.98) 0%, rgba(5,20,17,0.98) 100%)',
    cardBg: 'rgba(12, 40, 34, 0.94)',
    dockBg: 'rgba(8, 30, 25, 0.96)',
    footerBg: 'linear-gradient(180deg, #08201B 0%, #04120F 100%)',
    accent: '#E0C168',
    textMain: '#E8F5E9'
  }
];

export function getSavedHhdThemeId() {
  if (typeof window === 'undefined') return 'huyen-vu';
  try {
    const saved = localStorage.getItem(HHD_THEME_STORAGE_KEY);
    if (saved && HHD_COLOR_THEMES.some((t) => t.id === saved)) {
      return saved;
    }
  } catch {}
  return 'huyen-vu';
}

export function getHhdThemeById(themeId) {
  return HHD_COLOR_THEMES.find((t) => t.id === themeId) || HHD_COLOR_THEMES[0];
}

export function applyHhdTheme(themeId) {
  if (typeof window === 'undefined') return;
  const theme = getHhdThemeById(themeId);
  try {
    localStorage.setItem(HHD_THEME_STORAGE_KEY, theme.id);
    localStorage.setItem('ziwei-theme', theme.baseMode);
    document.documentElement.setAttribute('data-hhd-theme', theme.id);
    document.documentElement.setAttribute('data-theme', theme.baseMode);
    window.dispatchEvent(new CustomEvent('hhd-theme-changed', { detail: theme.id }));
  } catch (e) {
    console.error(e);
  }
}
