'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const FACE_FEATURES = {
  forehead: {
    label: '1. Thượng Đình (Vầng Trán — Tiền Vận & Trí Tuệ)',
    options: [
      { id: 'high_wide', name: 'Trán cao rộng, phẳng đầy đặn', score: 96, desc: 'Thượng đình sáng sủa: Trí tuệ mẫn tiệp, tầm nhìn xa trông rộng, sớm thành danh từ tiền vận và được tổ nghiệp, quý nhân nâng đỡ.' },
      { id: 'square', name: 'Trán phương vức (Trán vuông chữ Điền)', score: 94, desc: 'Tư duy logic, kỷ luật, thực tế và đáng tin cậy; rất hợp làm quản lý, kỹ thuật, tài chính hoặc điều hành doanh nghiệp.' },
      { id: 'round', name: 'Trán tròn trịa, mềm mại', score: 90, desc: 'Giàu cảm xúc nghệ thuật, ngoại giao khéo léo, nhân duyên tốt đẹp và cuộc sống êm đềm.' }
    ]
  },
  eyes: {
    label: '2. Giám Sát Quan (Đôi Mắt — Thần Khí & Quý Tinh)',
    options: [
      { id: 'phoenix', name: 'Mắt Phượng / Mắt dài sáng có thần', score: 98, desc: 'Quý tướng bậc nhất trong Ma Y Thần Tướng: Tinh anh nội tàng, có tài lãnh đạo, danh vị hiển hách và trực giác sắc bén.' },
      { id: 'big_bright', name: 'Mắt to tròn, đen trắng phân minh', score: 92, desc: 'Tính tình chính trực, cởi mở, giàu lòng nhân ái, đi tới đâu cũng được mọi người yêu mến tin tưởng.' },
      { id: 'deep_calm', name: 'Mắt sâu trầm tĩnh, ánh nhìn kiên định', score: 94, desc: 'Nội tâm sâu sắc, giỏi mưu lược đường dài, không dễ bị dao động trước sóng gió thương trường.' }
    ]
  },
  nose: {
    label: '3. Thẩm Biện Quan (Mũi — Cung Tài Bạch & Trung Vận)',
    options: [
      { id: 'lion_bag', name: 'Mũi túi mật treo / Mũi Lân (Chuẩn đầu tròn đầy, cánh mũi dày)', score: 98, desc: 'Đại phú cách: Kho tiền đầy đặn, giỏi cả kiếm tiền lẫn giữ của, trung vận (31-50 tuổi) sản nghiệp bùng nổ mạnh mẽ.' },
      { id: 'straight_high', name: 'Sống mũi cao thẳng (Thông thiên tỵ)', score: 95, desc: 'Quý khí vượng, tự trọng cao, có uy tín lớn trong xã hội, công danh và thương hiệu cá nhân phát triển rực rỡ.' },
      { id: 'fleshy', name: 'Mũi vừa vặn, sơn căn liền mạch, lỗ mũi kín', score: 91, desc: 'Tài chính ổn định, quản lý chi tiêu khôn ngoan, tích tiểu thành đại bền vững.' }
    ]
  },
  mouthChin: {
    label: '4. Xuất Nạp Quan & Địa Các (Miệng & Cằm — Hậu Vận & Điền Sản)',
    options: [
      { id: 'bow_full', name: 'Miệng chữ Tứ / Cánh cung, cằm tròn đầy (Địa các phương viên)', score: 97, desc: 'Lời nói có trọng lượng, lộc ăn nói dồi dào; hậu vận ngoài 50 tuổi điền sản sung túc, con cháu sum vầy hiếu thuận.' },
      { id: 'smile_up', name: 'Khóe miệng hướng lên (Ngưỡng nguyệt khẩu)', score: 93, desc: 'Tinh thần lạc quan, luôn thu hút hỷ sự và vận may, nhân duyên và hợp tác kinh doanh rất thuận lợi.' }
    ]
  },
  ears: {
    label: '5. Thái Thính Quan (Đôi Tai — Phúc Thọ & Quý Nhân)',
    options: [
      { id: 'long_lobe', name: 'Tai dày, vành tai rõ, dái tai dài (Thùy châu triều khẩu)', score: 98, desc: 'Phúc đức sâu dày, trường thọ, thông tuệ và luôn gặp hung hóa cát nhờ quý nhân hộ trì.' },
      { id: 'high_ear', name: 'Tai cao quá lông mày (Đề nhĩ)', score: 95, desc: 'Thông minh xuất chúng, nhạy bén thời cuộc, dễ nổi danh từ sớm.' }
    ]
  }
};

const PALM_LINES = [
  {
    id: 'heart',
    name: '1. Đường Tâm Đạo (Thiên Văn)',
    color: '#EF5350',
    path: 'M 95 160 Q 170 155 245 120',
    meaning: 'Chủ về tình cảm, nhân duyên, lòng nhân ái và sức khỏe tim mạch.',
    goodSign: 'Đường Tâm Đạo đậm rõ, uốn cong nhẹ hướng về giữa ngón trỏ và ngón giữa: Người sống trọng tình nghĩa, chân thành, hôn nhân viên mãn và gia đạo ấm êm.'
  },
  {
    id: 'head',
    name: '2. Đường Trí Đạo (Nhân Văn)',
    color: '#42A5F5',
    path: 'M 92 185 Q 175 185 250 215',
    meaning: 'Chủ về trí tuệ, tư duy chiến lược, bản lĩnh quyết đoán và tài năng chuyên môn.',
    goodSign: 'Đường Trí Đạo dài, rõ nét hoặc phân nhánh đuôi cá: Tư duy sáng tạo kết hợp thực tế, giỏi nắm bắt cơ hội kinh doanh và quản trị tài chính.'
  },
  {
    id: 'life',
    name: '3. Đường Sinh Đạo (Địa Văn)',
    color: '#66BB6A',
    path: 'M 92 185 Q 150 225 145 305',
    meaning: 'Chủ về sinh lực, tuổi thọ, sức đề kháng và nền tảng phúc đức gia đình.',
    goodSign: 'Đường Sinh Đạo ôm vòng rộng quanh Gò Kim Tinh: Sinh lực dồi dào, ý chí kiên cường, hậu vận an khang trường thọ.'
  },
  {
    id: 'fate',
    name: '4. Đường Sự Nghiệp (Đường Ngọc Trụ)',
    color: '#FFD54F',
    path: 'M 175 300 L 170 135',
    meaning: 'Chủ về công danh, sự nghiệp, uy tín xã hội và quý nhân trợ lực.',
    goodSign: 'Đường Ngọc Trụ vươn thẳng từ cổ tay lên Gò Thổ Tinh (ngón giữa): Tự lực lập nên đại nghiệp, càng về trung và hậu vận càng nắm giữ vị thế cao.'
  },
  {
    id: 'sun',
    name: '5. Đường Thái Dương (Đường Tài Vận & Danh Tiếng)',
    color: '#FFAB40',
    path: 'M 210 250 L 210 140',
    meaning: 'Chủ về tài lộc bất ngờ, danh tiếng thương hiệu và quý nhân tài chính.',
    goodSign: 'Có đường Thái Dương dưới ngón áp út: Có duyên lớn với thương mại, truyền thông, nghệ thuật và tích lũy tài sản lớn.'
  }
];

export default function NhanTuongPage() {
  const [activeTab, setActiveTab] = useState('face'); // 'face' | 'palm'
  const [selections, setSelections] = useState({
    forehead: 'high_wide',
    eyes: 'phoenix',
    nose: 'lion_bag',
    mouthChin: 'bow_full',
    ears: 'long_lobe'
  });
  const [selectedPalmId, setSelectedPalmId] = useState('fate');

  const faceReport = useMemo(() => {
    const picked = Object.keys(FACE_FEATURES).map((k) => {
      const group = FACE_FEATURES[k];
      const item = group.options.find((o) => o.id === selections[k]) || group.options[0];
      return { key: k, label: group.label, ...item };
    });
    const avg = Math.round(picked.reduce((a, b) => a + b.score, 0) / picked.length);
    return { picked, avg };
  }, [selections]);

  const currentPalmLine = PALM_LINES.find((l) => l.id === selectedPalmId) || PALM_LINES[0];

  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 60 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Nhân Tướng & Chỉ Tay</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, fontSize: 13, alignItems: 'center' }}>
            <Link href="/sim-phong-thuy" style={{ color: '#A3A8B8', textDecoration: 'none' }}>📱 Chấm Điểm Sim</Link>
            <Link href="/the-ho-menh" style={{ color: '#A3A8B8', textDecoration: 'none' }}>🪪 Thẻ Hộ Mệnh K94</Link>
            <a href="tel:0983339397" style={{ color: '#81C784', fontWeight: 700, textDecoration: 'none' }}>📞 K94: 0983.339.397</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Ma Y Thần Tướng · Thủy Kính Tập · Thủ Tướng Ngũ Hành
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(28px, 4vw, 42px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Nhân Tướng Học Tam Đình Ngũ Quan & Xem Chỉ Tay Đông Phương
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            Chiêm nghiệm khí sắc diện tướng và đường nét chỉ tay theo cổ học phương Đông để thấu hiểu thiên tư và tu dưỡng tâm tướng.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          {[
            { id: 'face', label: '😊 Xem Tướng Mặt (Tam Đình & Ngũ Quan)' },
            { id: 'palm', label: '✋ Xem Chỉ Tay (Tam Đại Đường & Gò Bàn Tay)' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '11px 22px',
                borderRadius: 999,
                border: activeTab === t.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                background: activeTab === t.id ? 'rgba(201,168,76,0.22)' : '#141722',
                color: activeTab === t.id ? '#F4E3B2' : '#A3A8B8',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'face' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {/* Feature Selectors */}
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, display: 'grid', gap: 16 }}>
              {Object.keys(FACE_FEATURES).map((k) => {
                const group = FACE_FEATURES[k];
                return (
                  <div key={k}>
                    <label style={{ display: 'block', fontSize: 12.5, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>
                      {group.label}
                    </label>
                    <select
                      value={selections[k]}
                      onChange={(e) => setSelections((prev) => ({ ...prev, [k]: e.target.value }))}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2', fontSize: 13.5, fontWeight: 600 }}
                    >
                      {group.options.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Face Reading Summary */}
            <div style={{ background: 'linear-gradient(155deg, rgba(201,168,76,0.16), rgba(16,18,26,0.95))', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 20, padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700, letterSpacing: 1 }}>TỔNG LUẬN NHÂN TƯỚNG HHD</span>
                <span style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(67,160,71,0.22)', color: '#81C784', fontWeight: 800, fontSize: 13 }}>
                  Chỉ số Quý Tướng: {faceReport.avg}/100
                </span>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                {faceReport.picked.map((item) => (
                  <div key={item.key} style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid #c9a84c' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#F4E3B2', marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 12.5, color: '#C5C9D6', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, alignItems: 'center' }}>
            {/* Interactive SVG Palm Diagram */}
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 22, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#c9a84c', marginBottom: 10 }}>CHẠM VÀO TỪNG ĐƯỜNG CHỈ TAY ĐỂ XEM LUẬN GIẢI</div>
              <svg viewBox="0 0 340 360" style={{ width: '100%', maxWidth: 320, height: 'auto', margin: '0 auto' }}>
                {/* Stylized Palm Outline */}
                <path
                  d="M 85 330 L 80 190 Q 60 150 65 110 Q 75 95 90 135 L 98 70 Q 112 45 126 70 L 135 125 L 148 45 Q 165 25 182 45 L 185 125 L 200 55 Q 216 38 230 58 L 225 135 L 245 85 Q 262 72 270 92 L 255 210 Q 250 285 215 330 Z"
                  fill="#171A24"
                  stroke="rgba(201,168,76,0.45)"
                  strokeWidth="2"
                />
                {/* Mount Labels */}
                <text x="122" y="142" fill="#c9a84c" fontSize="9" textAnchor="middle">Mộc Tinh</text>
                <text x="168" y="132" fill="#c9a84c" fontSize="9" textAnchor="middle">Thổ Tinh</text>
                <text x="208" y="138" fill="#c9a84c" fontSize="9" textAnchor="middle">Thái Dương</text>
                <text x="242" y="152" fill="#c9a84c" fontSize="9" textAnchor="middle">Thủy Tinh</text>
                <text x="118" y="265" fill="#c9a84c" fontSize="10" textAnchor="middle">Gò Kim Tinh</text>
                <text x="225" y="265" fill="#c9a84c" fontSize="10" textAnchor="middle">Gò Thái Âm</text>

                {/* 5 Interactive Palm Lines */}
                {PALM_LINES.map((line) => {
                  const isSel = line.id === selectedPalmId;
                  return (
                    <path
                      key={line.id}
                      d={line.path}
                      fill="none"
                      stroke={line.color}
                      strokeWidth={isSel ? 5 : 3}
                      strokeLinecap="round"
                      style={{ cursor: 'pointer', filter: isSel ? `drop-shadow(0 0 8px ${line.color})` : 'none' }}
                      onClick={() => setSelectedPalmId(line.id)}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Palm Line Details */}
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 22, padding: 26 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {PALM_LINES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedPalmId(l.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 99,
                      border: selectedPalmId === l.id ? `1px solid ${l.color}` : '1px solid rgba(255,255,255,0.12)',
                      background: selectedPalmId === l.id ? 'rgba(201,168,76,0.18)' : '#11131A',
                      color: selectedPalmId === l.id ? '#F4E3B2' : '#9DA3B4',
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {l.name}
                  </button>
                ))}
              </div>

              <div style={{ padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', borderLeft: `4px solid ${currentPalmLine.color}` }}>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 22, color: '#F4E3B2', margin: '0 0 8px 0' }}>
                  {currentPalmLine.name}
                </h3>
                <p style={{ fontSize: 14, color: '#c9a84c', fontWeight: 600, marginBottom: 10 }}>
                  {currentPalmLine.meaning}
                </p>
                <p style={{ fontSize: 13.5, color: '#D5DAE5', lineHeight: 1.65, margin: 0 }}>
                  <strong>Cát tướng chỉ tay:</strong> {currentPalmLine.goodSign}
                </p>
              </div>

              <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: 'rgba(201,168,76,0.08)', fontSize: 12.5, color: '#B0B6C6', lineHeight: 1.55 }}>
                💡 <strong>Cổ nhân dạy:</strong> <em>“Hữu tâm vô tướng, tướng tự tâm sinh; hữu tướng vô tâm, tướng tùy tâm diệt.”</em> Giữ tâm thiện lành, hiếu kính và chính trực thì sắc diện và đường chỉ tay tự khắc chuyển sang cát tướng.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
