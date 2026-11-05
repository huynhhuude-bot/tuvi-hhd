import { STAR_META } from '../../../data/encyclopediaData';

const BRANCHES_VI = {
  0: 'Tý', 1: 'Sửu', 2: 'Dần', 3: 'Mão', 4: 'Thìn', 5: 'Tỵ',
  6: 'Ngọ', 7: 'Mùi', 8: 'Thân', 9: 'Dậu', 10: 'Tuất', 11: 'Hợi',
};

const STAR_VI = {
  紫微: 'Tử Vi', 天机: 'Thiên Cơ', 太阳: 'Thái Dương', 武曲: 'Vũ Khúc',
  天同: 'Thiên Đồng', 廉贞: 'Liêm Trinh', 天府: 'Thiên Phủ', 太阴: 'Thái Âm',
  贪狼: 'Tham Lang', 巨门: 'Cự Môn', 天相: 'Thiên Tướng', 天梁: 'Thiên Lương',
  七杀: 'Thất Sát', 破军: 'Phá Quân',
};

function getPalaceMajorStars(chart, palaceNameZh) {
  const palaces = chart?.palaces || [];
  const p =
    palaces.find((x) => x.name === palaceNameZh || x.name.replace('宫', '') === palaceNameZh.replace('宫', '')) ||
    palaces[0];
  if (!p) return { branchVi: 'Tý', starsVi: 'Tử Vi', rawStars: ['紫微'] };
  const majors = (p.stars || []).filter((s) => s.type === 'major');
  if (majors.length > 0) {
    return {
      branchVi: BRANCHES_VI[p.branch] || '',
      starsVi: majors.map((s) => STAR_VI[s.name] || s.name).join(' · '),
      rawStars: majors.map((s) => s.name),
    };
  }
  const opp = palaces.find((x) => x.branch === (p.branch + 6) % 12);
  const oppMajors = (opp?.stars || []).filter((s) => s.type === 'major');
  return {
    branchVi: BRANCHES_VI[p.branch] || '',
    starsVi:
      oppMajors.length > 0
        ? `Vô Chính Diệu (mượn ${oppMajors.map((s) => STAR_VI[s.name] || s.name).join(' · ')})`
        : 'Vô Chính Diệu',
    rawStars: oppMajors.map((s) => s.name),
  };
}

export function buildHemingAnalysis(chartA, chartB, question) {
  const nameA = chartA?.birthInfo?.name || 'Đương số Giáp';
  const nameB = chartB?.birthInfo?.name || 'Đương số Ất';

  const mingA = getPalaceMajorStars(chartA, '命宫');
  const mingB = getPalaceMajorStars(chartB, '命宫');
  const fuqiA = getPalaceMajorStars(chartA, '夫妻');
  const fuqiB = getPalaceMajorStars(chartB, '夫妻');
  const caiboA = getPalaceMajorStars(chartA, '财帛');
  const caiboB = getPalaceMajorStars(chartB, '财帛');
  const guanA = getPalaceMajorStars(chartA, '官禄');
  const guanB = getPalaceMajorStars(chartB, '官禄');

  const metaA = STAR_META[mingA.rawStars[0]] || {};
  const metaB = STAR_META[mingB.rawStars[0]] || {};

  const crossMatchAtoB = mingA.rawStars.some((s) => fuqiB.rawStars.includes(s));
  const crossMatchBtoA = mingB.rawStars.some((s) => fuqiA.rawStars.includes(s));

  const syncNote =
    crossMatchAtoB || crossMatchBtoA
      ? `Đặc biệt, chính tinh Cung Mệnh của người này trùng khớp trực tiếp với tinh hệ Cung Phu Thê của người kia — đây là dấu hiệu **"Tinh hệ Phu Thê tương ứng"** rất có duyên nợ tiền định trong học thuyết Hợp Bàn HHD.`
      : `Hai mệnh bàn mang hai sắc thái bổ khuyết rõ rệt: một bên thiên về ${metaA.domain || 'điều phối đại cục'}, một bên thiên về ${metaB.domain || 'thực thi chuyên sâu'}, khi phối hợp biết nhường nhịn sẽ tạo thế cân bằng Âm Dương bền vững.`;

  const qSection = question
    ? `\nVề trọng tâm câu hỏi của bạn (*"${question}"*): Dựa trên tuyến Tài Bạch (${nameA}: **${caiboA.starsVi}** · ${nameB}: **${caiboB.starsVi}**) và Quan Lộc (${nameA}: **${guanA.starsVi}** · ${nameB}: **${guanB.starsVi}**), hai người nên phân định rõ vai trò thế mạnh của từng người, người giữ chiến lược đối ngoại, người quản trị hậu phương và dòng tiền để tối ưu hóa phúc lộc chung.`
    : '';

  return [
    `**【Định điệu cốt lõi】**`,
    `Bản hợp tham chiếu giữa **${nameA}** (Mệnh tọa **${mingA.branchVi}** · **${mingA.starsVi}**) và **${nameB}** (Mệnh tọa **${mingB.branchVi}** · **${mingB.starsVi}**) cho thấy mức độ tương giao sâu sắc giữa hai cấu trúc mệnh lý. ${syncNote}`,
    ``,
    `**【Tương tác Mệnh – Phu Thê & Khí chất】**`,
    `• **${nameA}**: Cung Mệnh có **${mingA.starsVi}** (${metaA.element || 'Ngũ hành cân bằng'}), cung Phu Thê an tại **${fuqiA.branchVi}** có **${fuqiA.starsVi}**. ${metaA.fuqiNote || ''}`,
    `• **${nameB}**: Cung Mệnh có **${mingB.starsVi}** (${metaB.element || 'Ngũ hành cân bằng'}), cung Phu Thê an tại **${fuqiB.branchVi}** có **${fuqiB.starsVi}**. ${metaB.fuqiNote || ''}`,
    qSection,
    ``,
    `**【Cộng hưởng Sự nghiệp & Tài chính】**`,
    `1. **Tuyến Tài Bạch**: **${nameA}** (${caiboA.starsVi}) kết hợp cùng **${nameB}** (${caiboB.starsVi}) giúp bổ sung góc nhìn quản trị rủi ro và nắm bắt cơ hội đầu tư dài hạn.`,
    `2. **Tuyến Quan Lộc**: **${nameA}** (${guanA.starsVi}) đồng hành cùng **${nameB}** (${guanB.starsVi}) tạo thành thế tương trợ trong công việc lẫn xây dựng cơ nghiệp gia đình.`,
    ``,
    `**【Lời khuyên đồng hành HHD】**`,
    `Theo nguyên lý **Hợp Bàn HHD**, không có lá số hoàn hảo tuyệt đối mà chỉ có hai người thấu hiểu khí chất của nhau để cùng chuyển hóa. Hãy lấy sự tôn trọng khác biệt cá tính làm nền tảng, lắng nghe nhau trong các giai đoạn Lưu Niên nhạy cảm để giữ trọn phúc khí lâu dài.`,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { chartA, chartB, question } = body;
    const fullText = buildHemingAnalysis(chartA, chartB, question);

    const encoder = new TextEncoder();
    const chunks = fullText.match(/.{1,18}(\s|$)/gs) || [fullText];

    const stream = new ReadableStream({
      async start(controller) {
        for (const piece of chunks) {
          const payload = JSON.stringify({ delta: { text: piece } });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          await new Promise((r) => setTimeout(r, 12));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Lỗi xử lý Hợp Bàn HHD' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
