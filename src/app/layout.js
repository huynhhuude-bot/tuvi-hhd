import './globals.css';
import { ThemeProvider } from '../lib/turbopackShim';
import HhdNavigationDock from '../components/HhdNavigationDock';
import HhdSideAdLayout from '../components/HhdSideAdLayout';

export const metadata = {
  title: 'HHD · Tử Vi Đẩu Số Chính Tông | Công ty Truyền thông K94 - 0983.339.397',
  description:
    'Hệ thống Tử Vi Đẩu Số & Huyền Học HHD (Công ty Truyền thông K94 - ĐT: 0983339397): Lập lá số theo Chân thái dương thời 63 tỉnh thành Việt Nam, Khai Quẻ Kinh Dịch, Xin Chữ Ông Đồ, Lắc Xăm Cổ, Lịch Vạn Niên, Chấm Điểm Tên & La Bàn Bát Trạch miễn phí 100%.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'HHD · Tử Vi Đẩu Số Chính Tông',
    description:
      'Tử Vi vi môn · Thiên Địa Nhân vi lộ · Tri hành hợp nhất. An sao chuẩn Chân thái dương thời 63 tỉnh thành Việt Nam.',
    images: ['/og-cover.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@500;600;700;800&family=Noto+Serif+SC:wght@500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var ht=localStorage.getItem('hhd_color_theme_v1')||'huyen-vu';document.documentElement.setAttribute('data-hhd-theme',ht);var t=ht==='giay-do'?'light':(localStorage.getItem('ziwei-theme')||'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <HhdSideAdLayout>{children}</HhdSideAdLayout>
          <HhdNavigationDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
