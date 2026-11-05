import {
  STAR_ARTICLES,
  DUAL_COMBOS,
  STAR_META,
  PALACE_KEY_MAP,
  parseArticleSections,
} from '../../../data/encyclopediaData';

const STEMS_VI = {
  0: 'Giáp', 1: 'Ất', 2: 'Bính', 3: 'Đinh', 4: 'Mậu',
  5: 'Kỷ', 6: 'Canh', 7: 'Tân', 8: 'Nhâm', 9: 'Quý',
};

const BRANCHES_VI = {
  0: 'Tý', 1: 'Sửu', 2: 'Dần', 3: 'Mão', 4: 'Thìn', 5: 'Tỵ',
  6: 'Ngọ', 7: 'Mùi', 8: 'Thân', 9: 'Dậu', 10: 'Tuất', 11: 'Hợi',
};

const PALACE_VI = {
  命宫: 'Mệnh', 兄弟: 'Huynh Đệ', 夫妻: 'Phu Thê', 子女: 'Tử Nữ',
  财帛: 'Tài Bạch', 疾厄: 'Tật Ách', 迁移: 'Thiên Di', 交友: 'Nô Bộc',
  官禄: 'Quan Lộc', 田宅: 'Điền Trạch', 福德: 'Phúc Đức', 父母: 'Phụ Mẫu',
};

const STAR_VI = {
  紫微: 'Tử Vi', 天机: 'Thiên Cơ', 太阳: 'Thái Dương', 武曲: 'Vũ Khúc',
  天同: 'Thiên Đồng', 廉贞: 'Liêm Trinh', 天府: 'Thiên Phủ', 太阴: 'Thái Âm',
  贪狼: 'Tham Lang', 巨门: 'Cự Môn', 天相: 'Thiên Tướng', 天梁: 'Thiên Lương',
  七杀: 'Thất Sát', 破军: 'Phá Quân', 文昌: 'Văn Xương', 文曲: 'Văn Khúc',
  左辅: 'Tả Phụ', 右弼: 'Hữu Bật', 天魁: 'Thiên Khôi', 天钺: 'Thiên Việt',
  禄存: 'Lộc Tồn', 天马: 'Thiên Mã', 擎羊: 'Kình Dương', 陀罗: 'Đà La',
  火星: 'Hỏa Tinh', 铃星: 'Linh Tinh', 地空: 'Địa Không', 地劫: 'Địa Kiếp',
  红鸾: 'Hồng Loan', 天喜: 'Thiên Hỷ', 天刑: 'Thiên Hình', 天姚: 'Thiên Diêu',
};

const SIHUA_VI = { 禄: 'Lộc', 权: 'Quyền', 科: 'Khoa', 忌: 'Kỵ' };
const BRIGHT_VI = {
  庙: 'Miếu', 旺: 'Vượng', 得: 'Đắc', 利: 'Lợi',
  平: 'Bình', 不: 'Bất', 闲: 'Nhàn', 陷: 'Hãm', 地: 'Địa',
};

const TOPIC_TO_PALACE = {
  overview: '命宫',
  mingGong: '命宫',
  personality: '命宫',
  guanLu: '官禄',
  caiBo: '财帛',
  fuQi: '夫妻',
  jiE: '疾厄',
  qianYi: '迁移',
  jiaoYou: '交友',
  tianZhai: '田宅',
  fuDe: '福德',
  ziNv: '子女',
  xiongDi: '兄弟',
  fuMu: '父母',
};

function starNameVi(zh) {
  return STAR_VI[zh] || zh;
}

function formatStarList(stars = []) {
  if (!stars.length) return 'không có';
  return stars
    .map((s) => {
      const name = starNameVi(s.name);
      const b = s.brightnessRaw ? ` (${BRIGHT_VI[s.brightnessRaw] || s.brightnessRaw})` : '';
      const sh = s.siHua ? ` [Hóa ${SIHUA_VI[s.siHua.replace('化', '')] || s.siHua}]` : '';
      return `${name}${b}${sh}`;
    })
    .join(', ');
}

function detectTopicFromText(msg) {
  const m = msg.toLowerCase();
  if (m.includes('[topic:')) {
    const match = msg.match(/\[TOPIC:([a-zA-Z]+)\]/);
    if (match) return { mode: 'topic', key: match[1] === 'overview' ? 'mingGong' : match[1] };
  }
  if (m.includes('[palace:')) {
    const match = msg.match(/\[PALACE:([^\]]+)\]/);
    if (match) {
      const pName = match[1];
      const topicKey = PALACE_KEY_MAP[pName] || PALACE_KEY_MAP[pName.replace('宫', '')] || 'mingGong';
      return { mode: 'palace', palaceZh: pName, key: topicKey };
    }
  }
  if (m.includes('[sihua:')) {
    const match = msg.match(/\[SIHUA:([^:]+):([^:]+):([^\]]+)\]/);
    if (match) {
      return { mode: 'sihua', starZh: match[1], siHua: match[2], view: match[3] };
    }
  }
  if (m.includes('tài') || m.includes('tiền') || m.includes('giàu') || m.includes('đầu tư')) {
    return { mode: 'question', key: 'caiBo', question: msg };
  }
  if (m.includes('sự nghiệp') || m.includes('công việc') || m.includes('nghề') || m.includes('quan lộc')) {
    return { mode: 'question', key: 'guanLu', question: msg };
  }
  if (m.includes('tình') || m.includes('hôn nhân') || m.includes('vợ') || m.includes('chồng') || m.includes('duyên')) {
    return { mode: 'question', key: 'fuQi', question: msg };
  }
  if (m.includes('sức khỏe') || m.includes('bệnh') || m.includes('tật')) {
    return { mode: 'question', key: 'jiE', question: msg };
  }
  if (m.includes('nhà') || m.includes('đất') || m.includes('điền')) {
    return { mode: 'question', key: 'tianZhai', question: msg };
  }
  if (m.includes('con') || m.includes('tử nữ')) {
    return { mode: 'question', key: 'ziNv', question: msg };
  }
  if (m.includes('xuất ngoại') || m.includes('xa') || m.includes('thiên di')) {
    return { mode: 'question', key: 'qianYi', question: msg };
  }
  if (m.includes('bạn') || m.includes('đối tác') || m.includes('nô bộc')) {
    return { mode: 'question', key: 'jiaoYou', question: msg };
  }
  if (m.includes('phúc') || m.includes('tinh thần')) {
    return { mode: 'question', key: 'fuDe', question: msg };
  }
  if (m.includes('cha mẹ') || m.includes('phụ mẫu')) {
    return { mode: 'question', key: 'fuMu', question: msg };
  }
  if (m.includes('anh em') || m.includes('huynh đệ')) {
    return { mode: 'question', key: 'xiongDi', question: msg };
  }
  return { mode: 'question', key: 'mingGong', question: msg };
}

export function buildInterpretation(chart, userMsg) {
  const palaces = chart?.palaces || [];
  const parsed = detectTopicFromText(userMsg || '[TOPIC:overview]');

  if (parsed.mode === 'sihua') {
    const starVi = starNameVi(parsed.starZh);
    const shClean = parsed.siHua.replace('化', '');
    const shVi = SIHUA_VI[shClean] || parsed.siHua;
    const scopeVi = parsed.view === 'daxian' ? 'Đại hạn 10 năm' : 'Lưu niên';
    const targetPalace = palaces.find((p) =>
      p.stars?.some((s) => s.name === parsed.starZh)
    );
    const pVi = targetPalace ? PALACE_VI[targetPalace.name] || targetPalace.name : 'Bản cung';
    const brVi = targetPalace ? BRANCHES_VI[targetPalace.branch] : '';
    const sihuaMeaning = {
      Lộc: 'khởi phát cơ hội mới, dòng tiền hanh thông, nhân duyên thuận lợi và tài nguyên hội tụ',
      Quyền: 'tăng cường quyền tự chủ, sức bật quyết đoán, vị thế quản trị và năng lực nắm quyền thực thi',
      Khoa: 'quý nhân phù trợ, danh tiếng học thuật, giải trừ thị phi và xử lý êm đẹp các vướng mắc',
      Kỵ: 'áp lực tập trung cao, đòi hỏi sự cẩn trọng giấy tờ, quản trị cảm xúc và kiên nhẫn tháo gỡ nút thắt',
    }[shVi] || 'chuyển hóa khí số quan trọng';

    return [
      `**【Định điệu cốt lõi】**`,
      `Trong vận trình **${scopeVi}**, hiện tượng phi hóa **${starVi} Hóa ${shVi}** tác động trực tiếp vào **Cung ${pVi}** (tại chi **${brVi}**), báo hiệu giai đoạn ${sihuaMeaning}.`,
      ``,
      `**【Luận đoán trọng tâm】**`,
      `Theo nguyên lý Tứ Hóa của **Hệ thống HHD**, Tứ Hóa là "dụng thần" kích hoạt nguyên bàn chuyển động. Khi **${starVi}** đắc **Hóa ${shVi}** tại cung **${pVi}**, năng lượng của cung vị này trở thành tâm điểm thu hút sự chú ý và nguồn lực của đương số trong suốt ${scopeVi.toLowerCase()}.`,
      shVi === 'Kỵ'
        ? `Vì là Hóa Kỵ nhập cung ${pVi}, đương số không nên nóng vội hay đầu cơ mạo hiểm ở lĩnh vực này; thay vào đó hãy lấy chữ **Nhẫn** và quy trình minh bạch để biến áp lực thành kinh nghiệm thực chiến.`
        : `Đương số nên chủ động nắm bắt thời cơ tại cung ${pVi}, phát huy tối đa ưu thế của sao **${starVi}** để mở rộng thành tựu và tích lũy nền tảng vững chắc.`,
      ``,
      `**【Căn cứ mệnh bàn】**`,
      `1. Bản cung chịu tác động: **Cung ${pVi}** (${STEMS_VI[targetPalace?.stem] || ''} ${brVi}) có ${formatStarList(targetPalace?.stars?.filter((s) => s.type === 'major'))}.`,
      `2. Tuyến xung chiếu: Đối cung tại **${BRANCHES_VI[(targetPalace?.branch + 6) % 12] || ''}** đồng thời nhận xung lực phi hóa của **${starVi} Hóa ${shVi}**, cần kết hợp quan sát toàn tuyến Tam Phương Tứ Chính.`,
      ``,
      `**【Xuất xứ kinh điển & Lời khuyên HHD】**`,
      `*Tử Vi Đẩu Số Toàn Thư* khẳng định: "Tứ Hóa tinh vi chư tinh chi biến, minh kỳ lý tắc cát hung lập hiện". Hệ thống **HHD** khuyên bạn thuận theo nhịp vận ${scopeVi.toLowerCase()}, hành động có kế hoạch và giữ tâm thế chủ động.`,
    ].join('\n');
  }

  const targetPalaceZh = parsed.palaceZh || TOPIC_TO_PALACE[parsed.key] || '命宫';
  const palace =
    palaces.find((p) => p.name === targetPalaceZh || p.name.replace('宫', '') === targetPalaceZh.replace('宫', '')) ||
    palaces.find((p) => p.isMingGong) ||
    palaces[0];

  const palaceVi = PALACE_VI[palace?.name] || PALACE_VI[`${palace?.name}宫`] || 'Mệnh';
  const stemVi = STEMS_VI[palace?.stem] || '';
  const branchVi = BRANCHES_VI[palace?.branch] || '';

  const majorStars = (palace?.stars || []).filter((s) => s.type === 'major');
  const luckyStars = (palace?.stars || []).filter((s) => s.type === 'lucky');
  const shaStars = (palace?.stars || []).filter((s) => s.type === 'sha');

  const oppBranch = ((palace?.branch ?? 0) + 6) % 12;
  const oppPalace = palaces.find((p) => p.branch === oppBranch);
  const effectiveMajorNames =
    majorStars.length > 0
      ? majorStars.map((s) => s.name)
      : oppPalace
      ? oppPalace.stars.filter((s) => s.type === 'major').map((s) => s.name)
      : ['紫微'];

  const primaryStarZh = effectiveMajorNames[0] || '紫微';
  const secondaryStarZh = effectiveMajorNames[1] || null;
  const articleRaw =
    STAR_ARTICLES[primaryStarZh]?.[parsed.key] ||
    STAR_ARTICLES[primaryStarZh]?.mingGong ||
    '';
  const sections = parseArticleSections(articleRaw);

  const dualCombo =
    secondaryStarZh &&
    DUAL_COMBOS.find(
      (c) =>
        (c.stars[0] === primaryStarZh && c.stars[1] === secondaryStarZh) ||
        (c.stars[0] === secondaryStarZh && c.stars[1] === primaryStarZh)
    );

  const emptyNote =
    majorStars.length === 0
      ? `Cung **${palaceVi}** tại **${stemVi} ${branchVi}** thuộc cách **Vô Chính Diệu**, mượn bộ chính tinh **${effectiveMajorNames.map(starNameVi).join(' · ')}** từ đối cung (**Cung ${PALACE_VI[oppPalace?.name] || 'Thiên Di'}** tại **${BRANCHES_VI[oppBranch]}**) chiếu sang. Điều này mang lại sự linh hoạt, khả năng thích nghi cao với môi trường bên ngoài. `
      : `Tại cung **${palaceVi}** (${stemVi} ${branchVi}), bộ chính tinh tọa thủ là **${formatStarList(majorStars)}**. `;

  const questionPrefix =
    parsed.mode === 'question'
      ? `Về câu hỏi của bạn (*"${parsed.question}"*), hệ thống **HHD** đối chiếu trực tiếp **Cung ${palaceVi}** trên mệnh bàn: `
      : '';

  return [
    `**【Định điệu cốt lõi】**`,
    `${questionPrefix}${emptyNote}${sections.core}`,
    ``,
    `**【Luận đoán trọng tâm】**`,
    sections.main,
    dualCombo
      ? `\nĐặc biệt, sự kết hợp **${dualCombo.titleVi}** mang ý nghĩa: ${dualCombo.summary} ${dualCombo.analysis}`
      : '',
    ``,
    `**【Căn cứ mệnh bàn】**`,
    `1. **Bản cung (${palaceVi} tại ${stemVi} ${branchVi})**: Chính tinh: ${majorStars.length ? formatStarList(majorStars) : `Vô Chính Diệu (mượn ${effectiveMajorNames.map(starNameVi).join(', ')})`} · Cát tinh/Phụ tá: ${formatStarList(luckyStars)} · Sát/Hình tinh: ${formatStarList(shaStars)}.`,
    `2. **Đối cung xung chiếu (${PALACE_VI[oppPalace?.name] || 'Đối cung'} tại ${BRANCHES_VI[oppBranch]})**: Tọa thủ bởi ${formatStarList((oppPalace?.stars || []).filter((s) => s.type === 'major'))}.`,
    `3. ${sections.basis.replace(/\n/g, ' ')}`,
    ``,
    `**【Xuất xứ kinh điển】**`,
    `${sections.source} Triết lý **HHD** nhấn mạnh: *"Tử Vi vi môn · Thiên Địa Nhân vi lộ · Tri hành hợp nhất"* — hiểu rõ mệnh bàn để chủ động nắm bắt thời cơ và tu dưỡng bản lĩnh thực tế.`,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { chart, messages = [] } = body;
    const lastUserMsg =
      [...messages].reverse().find((m) => m.role === 'user')?.content ||
      '[TOPIC:overview]';

    const fullText = buildInterpretation(chart, lastUserMsg);

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
      JSON.stringify({ error: err.message || 'Lỗi xử lý luận giải HHD' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
