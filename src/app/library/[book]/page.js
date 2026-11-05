import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BOOKS_DATA, BOOKS_VI_META } from '../../../data/encyclopediaData';

export async function generateMetadata({ params }) {
  const { book: bookSlug } = await params;
  const book = BOOKS_DATA.find((b) => b.slug === bookSlug);
  if (!book) return { title: 'Không tìm thấy · HHD Tàng Kinh Các' };
  const vi = BOOKS_VI_META[book.slug] || {};
  return {
    title: `${vi.titleVi || book.title} · Tàng Kinh Các HHD`,
    description: vi.summaryVi || book.intro,
  };
}

export default async function BookTocPage({ params }) {
  const { book: bookSlug } = await params;
  const book = BOOKS_DATA.find((b) => b.slug === bookSlug);
  if (!book) notFound();
  const vi = BOOKS_VI_META[book.slug] || {};

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
          href="/library"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          ← Tàng Kinh Các
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}
        >
          {(vi.titleVi || book.title).toUpperCase()} (NGUYÊN BẢN HÁN VĂN)
        </div>
        <Link
          href="/"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Trang chủ →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            TÀNG KINH CÁC HHD - NGUYÊN BẢN HÁN VĂN · {vi.eraVi || book.dynasty}
          </div>
          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            {vi.titleVi || book.title}
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--tx-2)',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Nguyên bản Hán văn phục vụ tra cứu học thuật ({book.chapters.length}{' '}
            chương mục)
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '14px',
            border: '1px solid rgba(184,146,42,0.2)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(184,146,42,0.15)',
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.2em',
              fontWeight: 600,
            }}
          >
            MỤC LỤC CHƯƠNG HỒI (NGUYÊN BẢN HÁN VĂN)
          </div>
          {book.chapters.map((ch, idx) => (
            <Link
              key={idx}
              href={`/library/${book.slug}/${idx}`}
              className="hover:bg-amber-50/10"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                padding: '14px 20px',
                borderBottom:
                  idx < book.chapters.length - 1
                    ? '1px dashed rgba(184,146,42,0.15)'
                    : 'none',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--ac)',
                  fontWeight: 600,
                  minWidth: '40px',
                  letterSpacing: '0.1em',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '15px',
                    color: 'var(--tx-0)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    marginBottom: '2px',
                  }}
                >
                  {ch.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--tx-3)' }}>
                  {ch.subtitle}
                </div>
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--tx-3)',
                  letterSpacing: '0.06em',
                }}
              >
                {ch.paragraphs.length} đoạn
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ac)' }}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
