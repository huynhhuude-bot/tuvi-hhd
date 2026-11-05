import Link from 'next/link';
import {
  STARS_LIST,
  TOPICS_LIST,
  DUAL_COMBOS,
} from '../../data/encyclopediaData';

export const metadata = {
  title: 'Bách Khoa 14 Chính Tinh · HHD Tử Vi Đẩu Số',
  description:
    '14 Chính Tinh × 13 Chủ đề = 182 chuyên đề luận giải chuyên sâu & 24 bộ Song Tinh Đồng Cung. Biên soạn từ Hệ thống HHD & Cổ thư Đẩu Số Toàn Thư.',
};

export default function KnowledgePage() {
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
          BÁCH KHOA 14 CHÍNH TINH · HHD
        </div>
        <Link
          href="/library"
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Tàng Kinh Các →
        </Link>
      </div>

      <div className="text-center px-6 py-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            style={{
              height: '1px',
              width: '48px',
              background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.4))',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              color: 'var(--ac)',
              letterSpacing: '0.3em',
            }}
          >
            BÁCH KHOA TOÀN THƯ · HHD
          </span>
          <div
            style={{
              height: '1px',
              width: '48px',
              background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.4))',
            }}
          />
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
          Bách Khoa Tử Vi Đẩu Số HHD
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--tx-2)',
            letterSpacing: '0.03em',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          14 Chính Tinh × 13 Chủ đề ={' '}
          <strong style={{ color: 'var(--ac)' }}>182</strong> chuyên đề luận giải
          chuyên sâu
          <br />
          Biên soạn từ Hệ thống HHD &amp; Cổ thư Đẩu Số Toàn Thư
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div
          style={{
            fontSize: '11px',
            color: 'var(--tx-3)',
            letterSpacing: '0.2em',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          MƯỜI BỐN CHÍNH TINH
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {STARS_LIST.map((star) => (
            <Link
              key={star.slug}
              href={`/knowledge/${star.slug}`}
              className="hover:shadow-md hover:border-amber-400"
              style={{
                display: 'block',
                padding: '14px 10px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.2)',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--tx-0)',
                  letterSpacing: '0.04em',
                }}
              >
                {star.name}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--tx-3)',
                  marginTop: '4px',
                }}
              >
                {star.element}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 space-y-4">
          {STARS_LIST.map((star) => (
            <div
              key={star.slug}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.18)',
                borderRadius: '12px',
                padding: '18px 22px',
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <div className="flex items-baseline gap-3">
                  <Link
                    href={`/knowledge/${star.slug}`}
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--tx-0)',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                    }}
                  >
                    Sao {star.name}
                  </Link>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--tx-3)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {star.keywords}
                  </span>
                </div>
                <Link
                  href={`/knowledge/${star.slug}`}
                  style={{
                    fontSize: '12px',
                    color: 'var(--ac)',
                    textDecoration: 'none',
                  }}
                >
                  Hồ sơ 13 cung →
                </Link>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--tx-2)',
                  lineHeight: 1.75,
                  marginBottom: '12px',
                }}
              >
                {star.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {TOPICS_LIST.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/knowledge/${star.slug}/${topic.slug}`}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      background: 'rgba(184,146,42,0.06)',
                      border: '1px solid rgba(184,146,42,0.15)',
                      borderRadius: '999px',
                      color: 'var(--tx-2)',
                      textDecoration: 'none',
                    }}
                  >
                    Cung {topic.palace} · {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div
            style={{
              fontSize: '11px',
              color: 'var(--tx-3)',
              letterSpacing: '0.2em',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            PHỐI TINH CỔ ĐIỂN
          </div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--tx-0)',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            24 Bộ Song Tinh Đồng Cung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DUAL_COMBOS.map((combo) => (
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
        </div>
      </div>
    </div>
  );
}
