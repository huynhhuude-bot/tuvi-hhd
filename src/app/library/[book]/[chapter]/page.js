import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BOOKS_DATA, BOOKS_VI_META } from '../../../../data/encyclopediaData';

export async function generateStaticParams() {
  const params = [];
  for (const b of BOOKS_DATA) {
    for (let idx = 0; idx < b.chapters.length; idx++) {
      params.push({ book: b.slug, chapter: String(idx) });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { book: bookSlug, chapter: chapterIdxStr } = await params;
  const book = BOOKS_DATA.find((b) => b.slug === bookSlug);
  const idx = parseInt(chapterIdxStr, 10);
  const ch = book?.chapters?.[idx];
  if (!book || !ch) return { title: 'Không tìm thấy · HHD Tàng Kinh Các' };
  const vi = BOOKS_VI_META[book.slug] || {};
  return {
    title: `${ch.title} · ${vi.titleVi || book.title} | HHD Tàng Kinh Các`,
    description: ch.subtitle,
  };
}

export default async function ChapterPage({ params }) {
  const { book: bookSlug, chapter: chapterIdxStr } = await params;
  const book = BOOKS_DATA.find((b) => b.slug === bookSlug);
  const idx = parseInt(chapterIdxStr, 10);
  const ch = book?.chapters?.[idx];
  if (!book || !ch) notFound();
  const vi = BOOKS_VI_META[book.slug] || {};

  const prevIdx = idx > 0 ? idx - 1 : null;
  const nextIdx = idx < book.chapters.length - 1 ? idx + 1 : null;

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
          href={`/library/${book.slug}`}
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          ← Mục lục {vi.titleVi || book.title}
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}
        >
          TÀNG KINH CÁC HHD - NGUYÊN BẢN HÁN VĂN
        </div>
        <Link
          href="/library"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          Thư viện →
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.18em',
              marginBottom: '8px',
            }}
          >
            {(vi.titleVi || book.title).toUpperCase()} · CHƯƠNG {idx + 1}
          </div>
          <h1
            style={{
              fontSize: 'clamp(24px, 3.5vw, 34px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            {ch.title}
          </h1>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--tx-2)',
              letterSpacing: '0.06em',
            }}
          >
            {ch.subtitle}
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '14px',
            border: '1px solid rgba(184,146,42,0.2)',
            padding: '32px 28px',
          }}
        >
          {ch.paragraphs.map((p, pIdx) => (
            <div
              key={p.id}
              id={p.id}
              style={{
                marginBottom:
                  pIdx < ch.paragraphs.length - 1 ? '20px' : '0',
                paddingBottom:
                  pIdx < ch.paragraphs.length - 1 ? '20px' : '0',
                borderBottom:
                  pIdx < ch.paragraphs.length - 1
                    ? '1px dashed rgba(184,146,42,0.15)'
                    : 'none',
                scrollMarginTop: '80px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--ac)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    minWidth: '24px',
                  }}
                >
                  {String(p.idx || pIdx + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    flex: 1,
                    fontSize: '16px',
                    color: 'var(--tx-0)',
                    lineHeight: 2,
                    letterSpacing: '0.04em',
                    fontFamily:
                      '"Noto Serif SC", "PingFang SC", "Hiragino Sans GB", serif',
                    margin: 0,
                  }}
                >
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          {prevIdx !== null ? (
            <Link
              href={`/library/${book.slug}/${prevIdx}`}
              style={{
                fontSize: '13px',
                color: 'var(--ac)',
                textDecoration: 'none',
              }}
            >
              ← Chương {prevIdx + 1}: {book.chapters[prevIdx].title}
            </Link>
          ) : (
            <span />
          )}
          {nextIdx !== null ? (
            <Link
              href={`/library/${book.slug}/${nextIdx}`}
              style={{
                fontSize: '13px',
                color: 'var(--ac)',
                textDecoration: 'none',
              }}
            >
              Chương {nextIdx + 1}: {book.chapters[nextIdx].title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
    </div>
  );
}
