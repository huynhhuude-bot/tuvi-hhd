import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  STARS_LIST,
  TOPICS_LIST,
  STAR_ARTICLES,
  parseArticleSections,
} from '../../../../data/encyclopediaData';

export async function generateMetadata({ params }) {
  const { star: starSlug, topic: topicSlug } = await params;
  const star = STARS_LIST.find((s) => s.slug === starSlug);
  const topic = TOPICS_LIST.find((t) => t.slug === topicSlug);
  if (!star || !topic) return { title: 'Không tìm thấy · HHD Tử Vi' };
  const raw = STAR_ARTICLES[star.zh]?.[topic.key] || '';
  const { core } = parseArticleSections(raw);
  return {
    title: `Sao ${star.name} tọa cung ${topic.palace} · ${topic.title} | HHD Tử Vi`,
    description: core || star.desc,
  };
}

export default async function StarTopicArticlePage({ params }) {
  const { star: starSlug, topic: topicSlug } = await params;
  const star = STARS_LIST.find((s) => s.slug === starSlug);
  const topic = TOPICS_LIST.find((t) => t.slug === topicSlug);
  if (!star || !topic) notFound();

  const raw = STAR_ARTICLES[star.zh]?.[topic.key] || '';
  const { core, main, basis, source } = parseArticleSections(raw);
  const otherTopics = TOPICS_LIST.filter((t) => t.slug !== topic.slug);
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
          SAO {star.name.toUpperCase()} · CUNG {topic.palace.toUpperCase()}
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

      <article className="max-w-3xl mx-auto px-6 py-12">
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
            Bách khoa
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link
            href={`/knowledge/${star.slug}`}
            style={{ color: 'var(--tx-3)', textDecoration: 'none' }}
          >
            Sao {star.name}
          </Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <span style={{ color: 'var(--ac)' }}>Cung {topic.palace}</span>
        </nav>

        <header style={{ marginBottom: '36px' }}>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.18em',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}
          >
            {topic.title} · Hệ thống HHD &amp; Cổ thư Đẩu Số
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 700,
              color: 'var(--tx-0)',
              letterSpacing: '0.04em',
              lineHeight: 1.25,
            }}
          >
            Sao {star.name} tọa cung {topic.palace}
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--tx-2)',
              marginTop: '14px',
              lineHeight: 1.8,
            }}
          >
            {star.desc}
          </p>
        </header>

        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Định điệu cốt lõi
          </h2>
          <div
            style={{
              padding: '18px 22px',
              background:
                'linear-gradient(135deg, rgba(184,146,42,0.12) 0%, rgba(184,146,42,0.03) 100%)',
              borderLeft: '3px solid var(--ac)',
              borderRadius: '0 10px 10px 0',
            }}
          >
            <p
              style={{
                fontSize: '16px',
                color: 'var(--tx-0)',
                lineHeight: 1.85,
                fontWeight: 500,
                margin: 0,
              }}
            >
              {core}
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Luận đoán trọng tâm
          </h2>
          <div
            style={{
              padding: '20px 24px',
              background: 'var(--bg-card)',
              border: '1px solid rgba(184,146,42,0.15)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                color: 'var(--tx-0)',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
              }}
            >
              {main}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Căn cứ mệnh bàn
          </h2>
          <div
            style={{
              padding: '20px 24px',
              background: 'var(--bg-card)',
              border: '1px solid rgba(184,146,42,0.15)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: 'var(--tx-0)',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
              }}
            >
              {basis}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Xuất xứ kinh điển
          </h2>
          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(184,146,42,0.05)',
              border: '1px dashed rgba(184,146,42,0.28)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--tx-1)',
              lineHeight: 1.85,
            }}
          >
            {source}
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Chuyên đề khác của sao {star.name}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/knowledge/${star.slug}/${t.slug}`}
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  borderRadius: '999px',
                  color: 'var(--tx-2)',
                  textDecoration: 'none',
                }}
              >
                {star.name} · Cung {t.palace}
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '14px',
                background: 'var(--ac)',
                borderRadius: '2px',
              }}
            />
            Các Chính Tinh khác tại cung {topic.palace}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherStars.map((s) => (
              <Link
                key={s.slug}
                href={`/knowledge/${s.slug}/${topic.slug}`}
                style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  borderRadius: '999px',
                  color: 'var(--tx-2)',
                  textDecoration: 'none',
                }}
              >
                {s.name} · Cung {topic.palace}
              </Link>
            ))}
          </div>
        </section>

        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            background: 'rgba(184,146,42,0.04)',
            border: '1px dashed rgba(184,146,42,0.25)',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ac-dim)',
              letterSpacing: '0.12em',
              marginBottom: '6px',
            }}
          >
            ĐỐI CHIẾU CỔ THƯ ĐỜI MINH · HHD
          </div>
          <Link
            href="/library"
            style={{
              fontSize: '13px',
              color: 'var(--ac)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            📜 Tra cứu Tàng Kinh Các (Nguyên bản Hán văn: Đẩu Số Toàn Tập / Toàn
            Thư / Cốt Tủy Phú) →
          </Link>
        </div>
      </article>
    </div>
  );
}
