'use client';

import Link from 'next/link';
import { BOOKS_DATA, BOOKS_VI_META } from '../../data/encyclopediaData';
import { LibrarySearch } from '../../lib/turbopackShim';

export default function LibraryPage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          borderBottom: '1px solid rgba(184,146,42,0.15)',
          background: 'var(--bg-page)',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          ← Trang chủ
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          TÀNG KINH CÁC HHD - NGUYÊN BẢN HÁN VĂN
        </div>
        <Link
          href="/chart"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Lập lá số →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ac)',
              letterSpacing: '0.28em',
              marginBottom: '8px',
            }}
          >
            CỔ THƯ ĐẨU SỐ ĐỜI MINH · HỆ THỐNG HHD
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}
          >
            Tàng Kinh Các HHD
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--tx-2)',
              lineHeight: 1.75,
              maxWidth: '580px',
              margin: '0 auto 24px',
            }}
          >
            Lưu trữ nguyên bản Hán văn 3 bộ kinh điển Tử Vi Đẩu Số đời Minh phục
            vụ tra cứu học thuật và đối chiếu phú quyết gốc.
          </p>
          <div className="max-w-xl mx-auto">
            <LibrarySearch />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-10">
          {BOOKS_DATA.map((book) => {
            const vi = BOOKS_VI_META[book.slug] || {};
            const totalParas = book.chapters.reduce(
              (acc, c) => acc + c.paragraphs.length,
              0
            );
            return (
              <Link
                key={book.slug}
                href={`/library/${book.slug}`}
                style={{
                  display: 'block',
                  padding: '24px 28px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.22)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--ac)',
                        letterSpacing: '0.18em',
                        fontWeight: 600,
                      }}
                    >
                      {vi.eraVi || book.dynasty} · {book.chapters.length} CHƯƠNG
                      MỤC ({totalParas} ĐOẠN)
                    </span>
                    <h2
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--tx-0)',
                        marginTop: '4px',
                      }}
                    >
                      {vi.titleVi || book.title}{' '}
                      <span
                        style={{
                          fontSize: '16px',
                          color: 'var(--tx-3)',
                          fontWeight: 500,
                        }}
                      >
                        ({book.title})
                      </span>
                    </h2>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--ac)',
                      fontWeight: 600,
                    }}
                  >
                    Đọc nguyên bản →
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--tx-2)',
                    lineHeight: 1.75,
                    marginBottom: '14px',
                  }}
                >
                  {vi.summaryVi || book.intro}
                </p>
                <div className="flex flex-wrap gap-2">
                  {book.chapters.map((ch, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: 'rgba(184,146,42,0.08)',
                        border: '1px solid rgba(184,146,42,0.18)',
                        color: 'var(--tx-1)',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}. {ch.title}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '18px 22px',
            background: 'rgba(184,146,42,0.05)',
            border: '1px dashed rgba(184,146,42,0.25)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.15em',
              marginBottom: '6px',
            }}
          >
            BÁCH KHOA LUẬN GIẢI TIẾNG VIỆT · HHD
          </div>
          <Link
            href="/knowledge"
            style={{
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ✦ Xem 182 Chuyên đề Luận giải 14 Chính Tinh &amp; 24 Bộ Song Tinh
            Đồng Cung →
          </Link>
        </div>
      </div>
    </div>
  );
}
