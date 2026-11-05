import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  STARS_LIST,
  TOPICS_LIST,
  STAR_ARTICLES,
  DUAL_COMBOS,
  parseArticleSections,
} from '../../../data/encyclopediaData';

export async function generateMetadata({ params }) {
  const { star: starSlug } = await params;
  const star = STARS_LIST.find((s) => s.slug === starSlug);
  if (!star) return { title: 'Không tìm thấy · HHD Tử Vi' };
  return {
    title: `Sao ${star.name} · Hồ Sơ 13 Cung Vị | HHD Tử Vi Đẩu Số`,
    description: star.desc,
  };
}

export default async function StarHubPage({ params }) {
  const { star: starSlug } = await params;
  const star = STARS_LIST.find((s) => s.slug === starSlug);
  if (!star) notFound();

  const starArticles = STAR_ARTICLES[star.zh] || {};
  const dualCombos = DUAL_COMBOS.filter((c) => c.stars.includes(star.zh));
  const otherStars = STARS_LIST.filter((s) => s.slug !== star.slug);

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
          href="/knowledge"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          ← Bách khoa 14 Sao
        </Link>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--tx-3)',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          HỒ SƠ CHÍNH TINH · SAO {star.name.toUpperCase()}
        </div>
        <Link
          href="/chart"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          Lập lá số →
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <nav
          style={{
            fontSize: '11px',
            color: 'var(--tx-3)',
            letterSpacing: '0.06em',
            marginBottom: '16px',
          }}
        >
          <Link href="/" style={{ color: 'var(--tx-3)', textDecoration: 'none' }}>
            Trang chủ
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link
            href="/knowledge"
            style={{ color: 'var(--tx-3)', textDecoration: 'none' }}
          >
            Bách khoa Tử Vi
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--ac)' }}>Sao {star.name}</span>
        </nav>

        <header
          style={{
            padding: '24px 28px',
            background: 'var(--bg-card)',
            border: '1px solid rgba(184,146,42,0.22)',
            borderRadius: '14px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ac)',
              letterSpacing: '0.2em',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}
          >
            CHÍNH TINH ĐẨU SỐ · HỆ THỐNG HHD &amp; TOÀN THƯ
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              letterSpacing: '0.04em',
              marginBottom: '12px',
            }}
          >
            Sao {star.name}
          </h1>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(184,146,42,0.1)',
                color: 'var(--ac)',
                fontWeight: 600,
              }}
            >
              Ngũ hành &amp; Hóa khí: {star.element}
            </span>
            <span
              style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(184,146,42,0.06)',
                color: 'var(--tx-1)',
              }}
            >
              Đặc trưng: {star.keywords}
            </span>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--tx-1)',
              lineHeight: 1.8,
              marginBottom: '10px',
            }}
          >
            {star.desc}
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--tx-2)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {star.nature}
          </p>
        </header>

        <section style={{ marginBottom: '40px' }}>
          <h2
            style={{
              fontSize: '14px',
              color: 'var(--ac)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            ✦ 13 Chuyên đề luận giải sao {star.name} tại các cung vị
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOPICS_LIST.map((topic) => {
              const raw = starArticles[topic.key] || '';
              const { core } = parseArticleSections(raw);
              return (
                <Link
                  key={topic.slug}
                  href={`/knowledge/${star.slug}/${topic.slug}`}
                  style={{
                    display: 'block',
                    padding: '18px 20px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(184,146,42,0.18)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--tx-0)',
                      }}
                    >
                      Cung {topic.palace} · {topic.title}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--ac)' }}>
                      Xem chi tiết →
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--tx-2)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {core}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {dualCombos.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                fontSize: '14px',
                color: 'var(--ac)',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              ✦ Các bộ Song Tinh Đồng Cung có sao {star.name}
            </h2>
            <div className="space-y-3">
              {dualCombos.map((combo) => (
                <div
                  key={combo.pairKey}
                  style={{
                    padding: '18px 22px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(184,146,42,0.2)',
                    borderRadius: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--tx-0)',
                      marginBottom: '4px',
                    }}
                  >
                    {combo.titleVi}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--ac)',
                      marginBottom: '6px',
                    }}
                  >
                    {combo.summary}
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--tx-2)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {combo.analysis}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2
            style={{
              fontSize: '13px',
              color: 'var(--tx-3)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Tra cứu 13 Chính Tinh khác
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherStars.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge/${s.slug}`}
                style={{
                  fontSize: '12px',
                  padding: '6px 14px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  borderRadius: '999px',
                  color: 'var(--tx-1)',
                  textDecoration: 'none',
                }}
              >
                Sao {s.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
