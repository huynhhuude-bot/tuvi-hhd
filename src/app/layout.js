import './globals.css';
import { ThemeProvider } from '../lib/turbopackShim';

export const metadata = {
  title: 'HHD · Tử Vi Đẩu Số Chính Tông | Lập Lá Số, Luận Giải AI & Bách Khoa 14 Chính Tinh',
  description:
    'Hệ thống Tử Vi Đẩu Số HHD chính tông: Lập lá số theo Chân thái dương thời 63 tỉnh thành Việt Nam (UTC+7), Bách khoa 14 Chính Tinh × 13 Chủ đề, 24 Bộ Song Tinh Đồng Cung, Tàng Kinh Các nguyên bản Hán văn & Trợ lý AI HHD luận giải chuyên sâu.',
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
            __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
