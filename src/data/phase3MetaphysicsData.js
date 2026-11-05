// ============================================================================
// PHASE 3 METAPHYSICS DATA & ALGORITHMS — HHD · CÔNG TY TRUYỀN THÔNG K94
// 1. Cân Xương Tính Số (Viên Thiên Cang) & Bát Tự Khuyết Ngũ Hành
// 2. Chu Công Giải Mộng (Từ Điển Giải Mã Giấc Mơ Cổ Truyền)
// 3. Vận Trình 12 Con Giáp Hàng Ngày
// 4. Bói Kiều Nguyễn Du (Lẩy Kiều Cổ Truyền 36 Quẻ)
// 5. Phong Thủy Thương Hiệu (Màu Logo, Biển Hiệu, Hình Khối & Ngành Nghề)
// 6. Phong Thủy Bàn Làm Việc (Cửu Cung Bát Quái, Cây Cảnh & Tranh Phong Thủy)
// ============================================================================

export const STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const ZODIAC_ANIMALS = [
  { branch: 'Tý', name: 'Tuổi Tý (Chuột)', icon: '🐭', element: 'Thủy' },
  { branch: 'Sửu', name: 'Tuổi Sửu (Trâu)', icon: '🐮', element: 'Thổ' },
  { branch: 'Dần', name: 'Tuổi Dần (Hổ)', icon: '🐯', element: 'Mộc' },
  { branch: 'Mão', name: 'Tuổi Mão (Mèo)', icon: '🐱', element: 'Mộc' },
  { branch: 'Thìn', name: 'Tuổi Thìn (Rồng)', icon: '🐲', element: 'Thổ' },
  { branch: 'Tỵ', name: 'Tuổi Tỵ (Rắn)', icon: '🐍', element: 'Hỏa' },
  { branch: 'Ngọ', name: 'Tuổi Ngọ (Ngựa)', icon: '🐴', element: 'Hỏa' },
  { branch: 'Mùi', name: 'Tuổi Mùi (Dê)', icon: '🐐', element: 'Thổ' },
  { branch: 'Thân', name: 'Tuổi Thân (Khỉ)', icon: '🐵', element: 'Kim' },
  { branch: 'Dậu', name: 'Tuổi Dậu (Gà)', icon: '🐔', element: 'Kim' },
  { branch: 'Tuất', name: 'Tuổi Tuất (Chó)', icon: '🐶', element: 'Thổ' },
  { branch: 'Hợi', name: 'Tuổi Hợi (Hợi)', icon: '🐷', element: 'Thủy' }
];

export const STEM_ELEMENTS = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy'
};

export const BRANCH_ELEMENTS = {
  Tý: 'Thủy', Sửu: 'Thổ', Dần: 'Mộc', Mão: 'Mộc',
  Thìn: 'Thổ', Tỵ: 'Hỏa', Ngọ: 'Hỏa', Mùi: 'Thổ',
  Thân: 'Kim', Dậu: 'Kim', Tuất: 'Thổ', Hợi: 'Thủy'
};

// ----------------------------------------------------------------------------
// 1. CÂN XƯƠNG TÍNH SỐ (VIÊN THIÊN CANG) & BÁT TỰ KHUYẾT NGŨ HÀNH
// Weights are stored in "chỉ" (10 chỉ = 1 lượng)
// ----------------------------------------------------------------------------
const YEAR_WEIGHTS_60 = [
  12, 9, 6, 7, 12, 5, 9, 8, 7, 8,     // Giáp Tý -> Quý Dậu
  15, 9, 16, 8, 8, 19, 12, 6, 8, 7,   // Giáp Tuất -> Quý Mùi
  15, 6, 9, 12, 5, 7, 15, 6, 5, 14,   // Giáp Thân -> Quý Tỵ
  14, 9, 7, 6, 9, 12, 8, 7, 13, 5,    // Giáp Ngọ -> Quý Mão
  14, 5, 9, 17, 5, 7, 12, 8, 8, 6,    // Giáp Thìn -> Quý Sửu
  12, 16, 10, 7, 12, 6, 7, 6, 10, 7   // Giáp Dần -> Quý Hợi
];

const MONTH_WEIGHTS = [6, 7, 18, 9, 5, 16, 9, 15, 18, 8, 9, 5]; // Tháng 1 -> 12 ÂL

const DAY_WEIGHTS = [
  5, 10, 8, 15, 16, 15, 8, 16, 8, 16,
  9, 17, 8, 17, 10, 8, 9, 18, 5, 15,
  10, 9, 8, 9, 15, 18, 7, 8, 16, 6
]; // Ngày 1 -> 30 ÂL

const HOUR_WEIGHTS = [16, 6, 7, 10, 9, 16, 10, 8, 8, 9, 6, 6]; // Tý -> Hợi

export function analyzeCanXuongAndBatTu({ year = 1994, month = 6, day = 15, hourIdx = 6 }) {
  const y = Number(year) || 1994;
  const m = Math.min(12, Math.max(1, Number(month) || 6));
  const d = Math.min(30, Math.max(1, Number(day) || 15));
  const h = Math.min(11, Math.max(0, Number(hourIdx) || 0));

  const yearStemIdx = ((y - 4) % 10 + 10) % 10;
  const yearBranchIdx = ((y - 4) % 12 + 12) % 12;
  let jiaziIdx = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 10 === yearStemIdx && i % 12 === yearBranchIdx) {
      jiaziIdx = i;
      break;
    }
  }

  const wYear = YEAR_WEIGHTS_60[jiaziIdx] || 12;
  const wMonth = MONTH_WEIGHTS[m - 1] || 9;
  const wDay = DAY_WEIGHTS[d - 1] || 10;
  const wHour = HOUR_WEIGHTS[h] || 10;
  const totalChi = wYear + wMonth + wDay + wHour;
  const luong = Math.floor(totalChi / 10);
  const chi = totalChi % 10;

  // Build 4 Pillars (Tứ Trụ Can Chi)
  const yearStem = STEMS[yearStemIdx];
  const yearBranch = BRANCHES[yearBranchIdx];

  const monthStemIdx = ((yearStemIdx % 5) * 2 + m + 1) % 10;
  const monthBranchIdx = (m + 1) % 12;
  const monthStem = STEMS[monthStemIdx];
  const monthBranch = BRANCHES[monthBranchIdx];

  const dayOffset = Math.floor((y - 1900) * 365.2425 + m * 30.44 + d);
  const dayStemIdx = ((dayOffset % 10) + 10) % 10;
  const dayBranchIdx = ((dayOffset % 12) + 12) % 12;
  const dayStem = STEMS[dayStemIdx];
  const dayBranch = BRANCHES[dayBranchIdx];

  const hourStemIdx = ((dayStemIdx % 5) * 2 + h) % 10;
  const hourBranch = BRANCHES[h];
  const hourStem = STEMS[hourStemIdx];

  const pillars = [
    { label: 'Trụ Năm (Niên Trụ)', stem: yearStem, branch: yearBranch, stemEl: STEM_ELEMENTS[yearStem], branchEl: BRANCH_ELEMENTS[yearBranch], weight: `${Math.floor(wYear / 10)} lượng ${wYear % 10} chỉ` },
    { label: 'Trụ Tháng (Nguyệt Trụ)', stem: monthStem, branch: monthBranch, stemEl: STEM_ELEMENTS[monthStem], branchEl: BRANCH_ELEMENTS[monthBranch], weight: `${Math.floor(wMonth / 10)} lượng ${wMonth % 10} chỉ` },
    { label: 'Trụ Ngày (Nhật Chủ)', stem: dayStem, branch: dayBranch, stemEl: STEM_ELEMENTS[dayStem], branchEl: BRANCH_ELEMENTS[dayBranch], weight: `${Math.floor(wDay / 10)} lượng ${wDay % 10} chỉ` },
    { label: 'Trụ Giờ (Thời Trụ)', stem: hourStem, branch: hourBranch, stemEl: STEM_ELEMENTS[hourStem], branchEl: BRANCH_ELEMENTS[hourBranch], weight: `${Math.floor(wHour / 10)} lượng ${wHour % 10} chỉ` }
  ];

  const elementCounts = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
  pillars.forEach((p) => {
    elementCounts[p.stemEl] = (elementCounts[p.stemEl] || 0) + 1;
    elementCounts[p.branchEl] = (elementCounts[p.branchEl] || 0) + 1;
  });

  const sortedEls = Object.entries(elementCounts).sort((a, b) => a[1] - b[1]);
  const weakestElement = sortedEls[0][0];
  const secondWeakestElement = sortedEls[1][0];
  const strongestElement = sortedEls[sortedEls.length - 1][0];
  const missingElements = sortedEls.filter(([, count]) => count === 0).map(([el]) => el);

  let poem = '';
  let rankTitle = '';
  let destinyDetail = '';

  if (totalChi <= 28) {
    rankTitle = 'Mệnh Tự Lập Kiên Cường · Tiên Khổ Hậu Cam';
    poem = 'Bôn ba thuở nhỏ chí kiên cường,\nVượt thác qua ghềnh rạng bốn phương.\nTrung vận từ tâm năng tích đức,\nTuổi già an hưởng phúc miên trường.';
    destinyDetail = 'Lá số báo hiệu tiền vận cần tự thân lập nghiệp, ít nhờ cậy họ hàng. Tuy nhiên nhờ ý chí sắc đá, từ sau tuổi 36 vận khí chuyển mình mạnh mẽ, tích lũy tài sản bền vững.';
  } else if (totalChi <= 37) {
    rankTitle = 'Mệnh Tài Hoa Thực Lực · Trung Vận Khởi Phát';
    poem = 'Cây tùng đứng vững giữa sương phong,\nTrí sáng tâm minh việc dễ thông.\nQua buổi giao thời mây rẽ lối,\nCông thành danh toại rạng cơ đồ.';
    destinyDetail = 'Bạn là người thông tuệ, nhạy bén và có quý nhân ngầm nâng đỡ. Tiền vận có đôi lần đổi nghề hoặc di chuyển chỗ ở, nhưng từ 32–40 tuổi sự nghiệp vững vàng, tài lộc dồi dào.';
  } else if (totalChi <= 48) {
    rankTitle = 'Phúc Lộc Song Toàn · Quý Nhân Phù Trợ';
    poem = 'Phúc lộc trời ban tự thuở đầu,\nThông minh cơ trí vượt hơn người.\nKinh doanh quan lộc đều hanh vượng,\nGia đạo vinh hoa trọn cuộc đời.';
    destinyDetail = 'Số Cân Xương từ 3 lượng 8 chỉ đến 4 lượng 8 chỉ thuộc hàng Thượng Cát. Bản mệnh có tài lãnh đạo, làm ăn buôn bán hay công chức đều có lộc lớn, hậu vận con cháu hiếu thảo vinh hiển.';
  } else {
    rankTitle = 'Đại Phú Đại Quý · Cát Tinh Chiếu Mệnh';
    poem = 'Kỳ tài xuất chúng mệnh vinh hoa,\nBốn bể danh thơm rạng cửa nhà.\nTài lộc dồi dào như nước chảy,\nTrọn đời phú quý hưởng âu ca.';
    destinyDetail = 'Trọng lượng xương cốt cực vượng (trên 4 lượng 9 chỉ). Bản mệnh hội tụ phúc khí lớn, có tầm nhìn chiến lược, dễ làm chủ doanh nghiệp lớn hoặc giữ trọng trách cao trong xã hội.';
  }

  return {
    totalChi,
    luong,
    chi,
    weightLabel: `${luong} Lượng ${chi} Chỉ`,
    rankTitle,
    poem,
    destinyDetail,
    pillars,
    dayMaster: `${dayStem} (${STEM_ELEMENTS[dayStem]})`,
    elementCounts,
    weakestElement,
    secondWeakestElement,
    strongestElement,
    missingElements
  };
}

// ----------------------------------------------------------------------------
// 2. CHU CÔNG GIẢI MỘNG — TỪ ĐIỂN GIẢI MÃ GIẤC MƠ CỔ TRUYỀN
// ----------------------------------------------------------------------------
export const DREAM_DICTIONARY = [
  {
    id: 'mo-thay-ran',
    title: 'Mơ thấy Rắn (Bạch Xà, Thanh Xà, Rắn Vàng)',
    category: 'Động Vật Linh Thú',
    keywords: ['rắn', 'bạch xà', 'rắn cắn', 'rắn vàng', 'rắn bò vào nhà'],
    omen: 'Đại Cát · Báo Hiệu Tài Lộc & Quyền Lực',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Xà nhập hoài trung sinh quý tử, xà hành thủy thượng đắc đại tài" — Mơ thấy rắn bơi trên nước hoặc bò vào nhà là điềm quý nhân và tài lộc sắp tới.',
    meaning: 'Trong văn hóa phương Đông, rắn là biểu tượng của Long Xà và Thần Tài Thổ Địa. Mơ thấy rắn vàng hoặc rắn trắng báo hiệu vận may tài chính bất ngờ hoặc cơ hội thăng tiến.',
    advice: 'Trong 3 ngày tới nên giữ tâm thế chủ động nắm bắt cơ hội kinh doanh, kiêng sát sinh và nên đeo vật phẩm trầm hương hoặc thạch anh để tụ khí lành.',
    recommendedElement: 'Hỏa'
  },
  {
    id: 'mo-thay-nuoc',
    title: 'Mơ thấy Nước Lớn, Sông Suối Trong Xanh',
    category: 'Thiên Nhiên & Ngũ Hành',
    keywords: ['nước', 'sông', 'biển', 'nước lũ', 'nước trong', 'mưa lớn'],
    omen: 'Thượng Cát · Thủy Quản Tài Lộc',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Giang hải trướng mãn gia nghiệp hưng" — Mơ thấy nước sông biển dâng đầy trong vắt là điềm gia nghiệp hưng thịnh, tiền bạc chảy vào nhà.',
    meaning: 'Phong thủy có câu "Sơn quản nhân đinh, Thủy quản tài". Giấc mơ thấy nước trong chảy hiền hòa là dấu hiệu dòng tiền chuẩn bị khai thông mạnh mẽ.',
    advice: 'Rất thích hợp để ký kết hợp đồng, mở tài khoản ngân hàng số đẹp hoặc khai trương dự án mới. Nếu mơ nước đục thì nên cẩn trọng lời ăn tiếng nói.',
    recommendedElement: 'Thủy'
  },
  {
    id: 'mo-thay-vang-bac',
    title: 'Mơ thấy Nhặt Được Vàng, Kim Cương, Tiền Bạc',
    category: 'Tài Lộc & Phú Quý',
    keywords: ['vàng', 'nhẫn vàng', 'tiền', 'bạc', 'châu báu', 'nhặt được tiền'],
    omen: 'Cát Tường · Khai Mở Trí Tuệ & Cơ Hội',
    omenColor: '#FFD54F',
    chuCongText: 'Chu Công viết: "Đắc kim ngọc nhẫn hoàn, chủ sinh quý tử hoặc đắc hoạch ngoại tài" — Mơ thấy vàng ngọc là điềm có hỷ sự hoặc lộc ngoài dự kiến.',
    meaning: 'Vàng thuộc hành Kim, đại diện cho sự tinh anh và thành quả lao động. Giấc mơ này cho thấy công sức bạn gieo trồng thời gian qua sắp đến ngày gặt hái.',
    advice: 'Hãy kiểm tra lại các khoản đầu tư hoặc dự án đang dang dở; rất dễ có khách hàng cũ quay lại hợp tác lớn.',
    recommendedElement: 'Kim'
  },
  {
    id: 'mo-thay-rung-rang',
    title: 'Mơ thấy Rụng Răng, Gãy Răng',
    category: 'Cơ Thể & Sức Khỏe',
    keywords: ['rụng răng', 'gãy răng', 'chảy máu răng', 'nhổ răng'],
    omen: 'Nhắc Nhở · Cần Chăm Sóc Sức Khỏe & Gia Đạo',
    omenColor: '#FFA726',
    chuCongText: 'Chu Công viết: "Nha sỉ tự lạc, chủ phụ mẫu huynh đệ tu phòng ưu sự" — Răng gắn liền với cốt khí và tình thân trong gia đình.',
    meaning: 'Về mặt y học và tâm lý, mơ rụng răng thường xuất hiện khi cơ thể bạn đang căng thẳng, thiếu ngủ hoặc đang lo lắng trước một sự thay đổi lớn trong cuộc sống.',
    advice: 'Nên gọi điện hỏi thăm sức khỏe ông bà, cha mẹ; dành thời gian nghỉ ngơi, nghe chuông thiền hoặc đeo vòng trầm hương để an thần định khí.',
    recommendedElement: 'Thổ'
  },
  {
    id: 'mo-thay-phat-chua',
    title: 'Mơ thấy Đức Phật, Bồ Tát, Ngôi Chùa Cổ',
    category: 'Tâm Linh & Phúc Đức',
    keywords: ['phật', 'quan âm', 'bồ tát', 'đi chùa', 'tượng phật', 'thắp hương'],
    omen: 'Đại Phúc · Hộ Thân Bình An & Hóa Giải Tai Ách',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Chư Phật Bồ Tát hiện thân, bách sự giai cát, tai tiêu bệnh giảm" — Mơ thấy Phật là điềm lành bậc nhất, mọi hung hiểm đều hóa giải.',
    meaning: 'Tâm hồn bạn đang hướng thiện và có căn lành sâu dày. Mọi muộn phiền, tiểu nhân hay trắc trở hiện tại đều sẽ sớm qua đi nhờ phúc đức tổ tiên.',
    advice: 'Nên làm việc thiện, gieo duyên lành, giữ tâm thanh tịnh và mang theo Phật Bản Mệnh bên mình để gia tăng trường năng lượng hộ thân.',
    recommendedElement: 'Mộc'
  },
  {
    id: 'mo-thay-lua-chay',
    title: 'Mơ thấy Lửa Cháy Rực Rỡ (Hỏa Quang)',
    category: 'Thiên Nhiên & Ngũ Hành',
    keywords: ['lửa', 'cháy nhà', 'ngọn lửa', 'lửa đỏ', 'bếp lửa'],
    omen: 'Đại Vượng · Hồng Phát Công Danh',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Hỏa quang xung thiên, chủ gia đạo đại vượng, danh tiếng vang xa" — Lửa cháy càng sáng rực càng báo hiệu vận thế bùng nổ.',
    meaning: 'Hành Hỏa tượng trưng cho lễ nghĩa, danh tiếng và sự nhiệt huyết. Mơ thấy lửa sáng mà không có khói đen là điềm công việc kinh doanh, truyền thông phát đạt.',
    advice: 'Thời điểm tuyệt vời để đẩy mạnh quảng cáo thương hiệu, ra mắt sản phẩm mới hoặc mở rộng cửa hàng.',
    recommendedElement: 'Hỏa'
  },
  {
    id: 'mo-thay-ca-chep-rong',
    title: 'Mơ thấy Cá Chép Hóa Rồng, Bắt Được Cá Lớn',
    category: 'Động Vật Linh Thú',
    keywords: ['cá', 'cá chép', 'rồng', 'bắt cá', 'cá vàng'],
    omen: 'Thượng Cát · Khoa Bảng & Thăng Quan Tiến Chức',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Lý ngư nhảy vọt Vũ Môn, công danh đỗ đạt, lộc tài song thu".',
    meaning: 'Cá chép và Rồng là biểu tượng của sự vượt ngưỡng và quyền uy. Người đang thi cử, xin việc hoặc chờ duyệt dự án mơ giấc mơ này ắt thành công mỹ mãn.',
    advice: 'Tự tin triển khai kế hoạch lớn, hướng bàn làm việc về cung Đông Nam hoặc Chính Bắc để kích hoạt cung Quan Lộc.',
    recommendedElement: 'Thủy'
  },
  {
    id: 'mo-thay-bay-len-troi',
    title: 'Mơ thấy Bay Lên Trời Cao, Đứng Trên Đỉnh Núi',
    category: 'Công Việc & Khát Vọng',
    keywords: ['bay', 'bay lên trời', 'đỉnh núi', 'mây trắng'],
    omen: 'Cát Tường · Vượt Thoát Áp Lực & Thăng Tiến',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Phi thăng cửu tiêu, quý nhân đề bạt, hoạn lộ hanh thông".',
    meaning: 'Biểu thị khát vọng vươn lên và giải phóng khỏi những ràng buộc cũ. Năng lượng sáng tạo của bạn đang ở mức đỉnh cao.',
    advice: 'Hãy mạnh dạn đề xuất ý tưởng mới với cấp trên hoặc đối tác, bạn sẽ nhận được sự ủng hộ bất ngờ.',
    recommendedElement: 'Mộc'
  },
  {
    id: 'mo-thay-nguoi-than-da-khuat',
    title: 'Mơ thấy Ông Bà, Người Thân Đã Khuất Về Thăm',
    category: 'Tâm Linh & Phúc Đức',
    keywords: ['ông bà', 'người đã khuất', 'tổ tiên', 'người thân'],
    omen: 'Bình An · Tổ Tiên Nhắc Nhở & Phù Hộ',
    omenColor: '#FFD54F',
    chuCongText: 'Chu Công viết: "Tổ tiên hiện diện tươi cười, con cháu đắc phúc bình an".',
    meaning: 'Nếu người thân trong mơ có vẻ mặt hiền từ, tươi tỉnh thì đó là điềm báo gia đình sắp có tin vui hoặc được bề trên che chở qua cơn sóng gió.',
    advice: 'Nên thắp nén nhang thơm lên bàn thờ gia tiên, dọn dẹp không gian thờ tự trang nghiêm ấm cúng.',
    recommendedElement: 'Thổ'
  },
  {
    id: 'mo-thay-xay-nha-moi',
    title: 'Mơ thấy Xây Nhà Mới, Mua Đất, Chuyển Vào Biệt Thự',
    category: 'Tài Lộc & Phú Quý',
    keywords: ['xây nhà', 'mua nhà', 'mua đất', 'nhà mới', 'động thổ'],
    omen: 'Đại Cát · An Cư Lạc Nghiệp & Bền Vững',
    omenColor: '#66BB6A',
    chuCongText: 'Chu Công viết: "Khởi tạo tân trạch, điền sản gia tăng, bách sự thuận thành".',
    meaning: 'Điềm báo nền tảng tài chính và gia đạo của bạn đang bước vào giai đoạn ổn định, tích lũy tài sản lớn (bất động sản, cửa hàng mới).',
    advice: 'Có thể tra cứu thêm Thước Lỗ Ban và Lịch Vạn Niên trên web HHD để chuẩn bị cho các kế hoạch kiến thiết trong năm.',
    recommendedElement: 'Thổ'
  }
];

// ----------------------------------------------------------------------------
// 3. VẬN TRÌNH 12 CON GIÁP HÔM NAY (DAILY HOROSCOPE BY ZODIAC)
// ----------------------------------------------------------------------------
const LUCKY_COLORS_BY_EL = {
  Kim: { colors: 'Trắng, Vàng Kim, Nâu Đất', hex: '#F4E3B2', direction: 'Tây & Tây Bắc' },
  Mộc: { colors: 'Xanh Ngọc, Xanh Lá, Đen Thủy', hex: '#81C784', direction: 'Đông & Đông Nam' },
  Thủy: { colors: 'Xanh Dương, Đen, Trắng Bạc', hex: '#64B5F6', direction: 'Chính Bắc & Tây' },
  Hỏa: { colors: 'Đỏ Son, Cam, Xanh Lá', hex: '#FF8A65', direction: 'Chính Nam & Đông' },
  Thổ: { colors: 'Vàng Hoàng Kim, Đỏ, Nâu', hex: '#FFD54F', direction: 'Đông Bắc & Tây Nam' }
};

export function getDailyZodiacHoroscope(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  const totalDays = Math.floor((d.getTime() - new Date(1900, 0, 1).getTime()) / 86400000);
  const dayStemIdx = ((totalDays % 10) + 10) % 10;
  const dayBranchIdx = ((totalDays % 12) + 12) % 12;
  const dayStem = STEMS[dayStemIdx];
  const dayBranch = BRANCHES[dayBranchIdx];
  const dayElement = STEM_ELEMENTS[dayStem];

  const results = ZODIAC_ANIMALS.map((zodiac, idx) => {
    const diff = (idx - dayBranchIdx + 12) % 12;
    let relation = 'Bình Hòa';
    let wealthStars = 4;
    let careerStars = 4;
    let loveStars = 4;
    let statusBadge = 'Cát Tường';
    let statusColor = '#FFD54F';
    let summary = '';

    if (diff === 4 || diff === 8) {
      relation = 'Tam Hợp Quý Nhân';
      wealthStars = 5;
      careerStars = 5;
      loveStars = 5;
      statusBadge = 'Đại Cát · Vượng Lộc';
      statusColor = '#66BB6A';
      summary = 'Hôm nay cục diện Tam Hợp chiếu mệnh, làm việc gì cũng có quý nhân nâng đỡ, ký kết hợp đồng và buôn bán cực kỳ thuận lợi.';
    } else if ((idx + dayBranchIdx === 1) || (idx + dayBranchIdx === 13)) {
      relation = 'Lục Hợp Đại Cát';
      wealthStars = 5;
      careerStars = 4;
      loveStars = 5;
      statusBadge = 'Nhân Duyên & Tài Lộc Vượng';
      statusColor = '#66BB6A';
      summary = 'Ngày Lục Hợp mang lại nguồn năng lượng hài hòa, đàm phán suôn sẻ, tình cảm gia đạo ấm êm và có lộc bất ngờ từ đối tác.';
    } else if (diff === 6) {
      relation = 'Tương Xung Ngày';
      wealthStars = 3;
      careerStars = 3;
      loveStars = 3;
      statusBadge = 'Nên Thận Trọng · Giữ Hòa Khí';
      statusColor = '#FFA726';
      summary = 'Địa chi ngày có phần xung động nhẹ với bản mệnh. Hôm nay nên ưu tiên làm việc chắc chắn, tránh tranh luận nóng vội và giữ tâm bình an.';
    } else if (diff === 0) {
      relation = 'Trực Thái Tuế Ngày';
      wealthStars = 4;
      careerStars = 5;
      loveStars = 4;
      statusBadge = 'Chủ Động Bứt Phá';
      statusColor = '#64B5F6';
      summary = 'Ngày trùng địa chi tuổi giúp bạn phát huy tối đa năng lực tự chủ. Rất tốt để hoàn thành dứt điểm các công việc quan trọng.';
    } else {
      relation = 'Tương Sinh / Bình Hòa';
      wealthStars = 4;
      careerStars = 4;
      loveStars = 4;
      statusBadge = 'Ổn Định · Thuận Lợi';
      statusColor = '#FFD54F';
      summary = 'Vận trình trong ngày êm đẹp, công việc tiến triển đúng kế hoạch, tài chính thu chi cân đối và tinh thần minh mẫn.';
    }

    const nobleIdx1 = (idx + 4) % 12;
    const nobleIdx2 = (idx + 8) % 12;
    const luckyInfo = LUCKY_COLORS_BY_EL[zodiac.element] || LUCKY_COLORS_BY_EL.Kim;

    return {
      ...zodiac,
      relation,
      wealthStars,
      careerStars,
      loveStars,
      statusBadge,
      statusColor,
      summary,
      luckyColors: luckyInfo.colors,
      luckyHex: luckyInfo.hex,
      luckyDirection: luckyInfo.direction,
      noblePartners: `${BRANCHES[nobleIdx1]}, ${BRANCHES[nobleIdx2]}`,
      luckyHours: 'Giờ Thìn (07h-09h), Giờ Tỵ (09h-11h), Giờ Thân (15h-17h)'
    };
  });

  return {
    dateFormatted: `${String(day).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`,
    dayCanChi: `Ngày ${dayStem} ${dayBranch} (Hành ${dayElement})`,
    results
  };
}

// ----------------------------------------------------------------------------
// 4. BÓI KIỀU NGUYỄN DU — LẨY KIỀU CỔ TRUYỀN
// ----------------------------------------------------------------------------
export const BOI_KIEU_VERSES = [
  {
    id: 1,
    omen: 'Thượng Thượng Cát · Khai Hoa Kết Trái',
    couple1: 'Sen tàn cúc lại nở hoa,',
    couple2: 'Sầu dài ngày ngắn đông đà sang xuân.',
    context: 'Khúc chuyển mình từ gian truân sang mùa xuân tươi sáng rực rỡ.',
    general: 'Mọi khó khăn, bế tắc của giai đoạn trước đã khép lại. Thời vận mới đang mở ra như mùa xuân tới, mang theo sinh khí và niềm vui.',
    career: 'Dự án mới hoặc công việc kinh doanh bắt đầu thu hoạch lợi nhuận tốt, được khách hàng và cấp trên tín nhiệm.',
    love: 'Tình cảm gắn kết bền chặt, gia đạo đón tin vui đoàn viên.',
    advice: 'Hãy mạnh dạn khởi sự và mở rộng quy mô, thời cơ vàng đã điểm.'
  },
  {
    id: 2,
    omen: 'Đại Cát · Quý Nhân Tương Trợ',
    couple1: 'Mây mưa đánh đổ đá vàng,',
    couple2: 'Quá chiều nên đã chán chường yến anh.',
    context: 'Lời nhắc giữ vững chữ Tín và bản lĩnh kiên định giữa ngoại cảnh.',
    general: 'Quẻ báo bạn là người có tài năng và trọng chữ tín. Chỉ cần kiên định mục tiêu cốt lõi, không bị lời bàn tán làm xao động thì ắt thành đại sự.',
    career: 'Tập trung vào chuyên môn chính, tránh đầu tư dàn trải để bảo toàn lợi nhuận cao nhất.',
    love: 'Chân thành thấu hiểu sẽ hóa giải mọi hiểu lầm nhỏ.',
    advice: 'Giữ tâm vững như bàn thạch, quý nhân sẽ xuất hiện đúng lúc.'
  },
  {
    id: 3,
    omen: 'Thượng Cát · Tài Lộc Hanh Thông',
    couple1: 'Cửa ngoài vội rủ rèm the,',
    couple2: 'Xăm xăm băng lối vườn khuya một mình.',
    context: 'Thúy Kiều chủ động bước tới tìm Kim Trọng — Biểu tượng của sự quyết đoán.',
    general: 'Quẻ Kiều khích lệ sự chủ động, dám nghĩ dám làm. Cơ hội đang ở rất gần, ai nhanh nhạy nắm bắt trước sẽ giành chiến thắng.',
    career: 'Chủ động liên hệ khách hàng, ra mắt sản phẩm hoặc chốt hợp đồng ngay trong tuần này.',
    love: 'Tình duyên nồng ấm, người độc thân dễ gặp ý trung nhân tâm đầu ý hợp.',
    advice: 'Chủ động tiến bước, đừng chần chừ kẻo lỡ thời cơ đẹp.'
  },
  {
    id: 4,
    omen: 'Đại Cát · Công Thành Danh Toại',
    couple1: 'Râu hùm hàm én mày ngài,',
    couple2: 'Vai năm tấc rộng thân mười thước cao.',
    context: 'Hình tượng anh hùng Từ Hải — Khí phách hiên ngang, làm chủ vận mệnh.',
    general: 'Quẻ đại diện cho uy quyền, vị thế lãnh đạo và tầm vóc lớn. Công việc bạn đang mưu cầu có quy mô lớn và hoàn toàn nằm trong tầm tay.',
    career: 'Thăng tiến vượt bậc, thương hiệu cá nhân hoặc doanh nghiệp vang danh trên thị trường.',
    love: 'Gặp được người bạn đời hoặc đối tác vững chãi, đáng tin cậy.',
    advice: 'Phát huy bản lĩnh dẫn đầu và mở rộng tầm nhìn chiến lược.'
  },
  {
    id: 5,
    omen: 'Thượng Cát · Tâm Đức Sinh Phúc Lộc',
    couple1: 'Thiện căn ở tại lòng ta,',
    couple2: 'Chữ Tâm kia mới bằng ba chữ Tài.',
    context: 'Lời tổng kết bất hủ của Đại thi hào Nguyễn Du về gốc rễ của phúc lộc.',
    general: 'Lấy chữ Tâm làm gốc trong kinh doanh và đối nhân xử thế thì tài lộc tự khắc tìm đến bền lâu, vững chắc qua năm tháng.',
    career: 'Uy tín thương hiệu và chất lượng dịch vụ tận tâm sẽ mang về lượng khách hàng trung thành lớn.',
    love: 'Gia đạo bình an, trên thuận dưới hòa, phúc ấm con cháu.',
    advice: 'Làm việc bằng cả cái Tâm sáng, mọi mong cầu đều viên mãn.'
  },
  {
    id: 6,
    omen: 'Cát Tường · Tương Phùng Hội Ngộ',
    couple1: 'Người quốc sắc kẻ thiên tài,',
    couple2: 'Tình trong như đã mặt ngoài còn e.',
    context: 'Cuộc hội ngộ định mệnh giữa Kim Trọng và Thúy Kiều trong tiết Thanh Minh.',
    general: 'Quẻ báo hiệu sự hợp tác tuyệt đẹp giữa hai bên cùng có thực lực (người tài gặp đối tác xứng tầm).',
    career: 'Đàm phán thương mại, ký kết hợp tác hoặc tìm người đồng hành khởi nghiệp vô cùng ăn ý.',
    love: 'Nhân duyên tiền định, tình cảm thăng hoa ngọt ngào.',
    advice: 'Hãy mở lời kết nối, đối tác cũng đang rất thiện chí chờ bạn.'
  },
  {
    id: 7,
    omen: 'Trung Cát · Kiên Nhẫn Đợi Thời',
    couple1: 'Ngoài hiên thỏ đã non đoài,',
    couple2: 'Khói hương đã lạnh người ngoài chưaêm.',
    context: 'Sự tĩnh lặng chuẩn bị cho bước chuyển mình sắp tới.',
    general: 'Việc bạn đang mong đợi cần thêm một chút thời gian để chín muồi. Không nên thúc ép vội vàng mà hãy chuẩn bị nội lực thật kỹ.',
    career: 'Rà soát kỹ quy trình, củng cố nền tảng tài chính trước khi tung chiến dịch lớn.',
    love: 'Lắng nghe và chia sẻ nhẹ nhàng để gắn kết tâm giao.',
    advice: 'Lùi một bước để tiến ba bước, thành quả phía trước rất xứng đáng.'
  },
  {
    id: 8,
    omen: 'Đại Cát · Vinh Quy Bái Tổ',
    couple1: 'Trời còn để có hôm nay,',
    couple2: 'Tan sương đầu ngõ vén mây giữa trời.',
    context: 'Ngày đoàn tụ vinh hiển sau bao nỗ lực bền bỉ.',
    general: 'Mây mù tan biến, bầu trời quang đãng hiện ra. Mọi công sức bền bỉ của bạn sắp được đền đáp xứng đáng bằng cả danh tiếng và tiền bạc.',
    career: 'Thu hồi công nợ thuận lợi, doanh số tăng trưởng mạnh và gặt hái thành tựu rực rỡ.',
    love: 'Hạnh phúc viên mãn, tin vui từ phương xa báo về.',
    advice: 'Tự tin đón nhận thành quả và chia sẻ niềm vui cùng gia đình.'
  }
];

// ----------------------------------------------------------------------------
// 5. PHONG THỦY THƯƠNG HIỆU — MÀU LOGO, BIỂN HIỆU & NGÀNH NGHỀ HỢP MỆNH
// ----------------------------------------------------------------------------
export const BRAND_FENG_SHUI_BY_ELEMENT = {
  Kim: {
    element: 'Kim',
    generatingElement: 'Thổ (Thổ sinh Kim)',
    primaryColors: [
      { name: 'Vàng Hoàng Kim (Thổ/Kim)', hex: '#D4AF37' },
      { name: 'Trắng Bạch Kim (Bản Mệnh)', hex: '#F8FAFC' },
      { name: 'Nâu Đất Ánh Đồng (Tương Sinh)', hex: '#A16207' }
    ],
    accentColors: [
      { name: 'Xanh Dương Đậm (Thủy)', hex: '#1E3A8A' },
      { name: 'Xám Ghi Sang Trọng', hex: '#64748B' }
    ],
    avoidColors: 'Đỏ tươi, Hồng đậm, Tím hồng (Hỏa khắc Kim)',
    logoShapes: 'Hình tròn, hình vòm cung, hình elip, biểu tượng đồng tiền cổ, khiên kim loại hoặc đường nét bo tròn tinh tế.',
    typographyStyle: 'Font chữ Serif sang trọng, sắc nét, cân đối (tạo cảm giác uy quyền, chuẩn xác, cao cấp).',
    bestIndustries: [
      'Tài chính, Ngân hàng, Đầu tư, Kế toán',
      'Vàng bạc, Trang sức đá quý, Đồng hồ cao cấp',
      'Công nghệ, Điện tử, Viễn thông, Sim số đẹp',
      'Cơ khí, Ô tô, Thiết bị thông minh, Kiến trúc hiện đại'
    ],
    signboardAdvice: 'Biển hiệu nên dùng nền Tối/Nâu đồng hoặc Trắng kem kết hợp chữ nổi Inox Vàng Gương hoặc Alu Vàng Kim, kích thước đo theo cung Tài Vượng trên Thước Lỗ Ban 52.2cm.'
  },
  Mộc: {
    element: 'Mộc',
    generatingElement: 'Thủy (Thủy sinh Mộc)',
    primaryColors: [
      { name: 'Xanh Ngọc Lục Bảo (Bản Mệnh)', hex: '#10B981' },
      { name: 'Xanh Navy / Đen Thủy (Tương Sinh)', hex: '#0F172A' },
      { name: 'Xanh Dương Biển Sâu', hex: '#0284C7' }
    ],
    accentColors: [
      { name: 'Vàng Nắng Ấm', hex: '#F59E0B' },
      { name: 'Trắng Kem Tự Nhiên', hex: '#F1F5F9' }
    ],
    avoidColors: 'Trắng ánh bạc sắc nhọn quá nhiều (Kim khắc Mộc)',
    logoShapes: 'Hình chữ nhật đứng vươn cao, hình trụ, tán cây, mầm lộc, cuốn sách mở hoặc đường lượn sóng mềm mại.',
    typographyStyle: 'Font chữ vươn cao, thanh thoát hoặc thư pháp nghệ thuật biểu trưng cho sự sinh trưởng không ngừng.',
    bestIndustries: [
      'Giáo dục, Đào tạo, Sách & Văn hóa phẩm',
      'Nông sản sạch, Trà đạo, Cà phê, Dược liệu, Trầm hương',
      'Nội thất gỗ, Kiến trúc xanh, Cây cảnh phong thủy',
      'Thời trang, Mỹ phẩm thiên nhiên, Truyền thông sáng tạo'
    ],
    signboardAdvice: 'Biển hiệu rất hợp nền Xanh Rừng Sâu hoặc Xanh Đen kết hợp đèn LED ấm, tạo cảm giác sinh khí vượng phát và thân thiện.'
  },
  Thủy: {
    element: 'Thủy',
    generatingElement: 'Kim (Kim sinh Thủy)',
    primaryColors: [
      { name: 'Xanh Dương Hoàng Gia (Bản Mệnh)', hex: '#2563EB' },
      { name: 'Đen Huyền Bí (Bản Mệnh)', hex: '#090D16' },
      { name: 'Trắng Bạc / Vàng Kim (Tương Sinh)', hex: '#E2E8F0' }
    ],
    accentColors: [
      { name: 'Xanh Ngọc Bích (Thủy sinh Mộc)', hex: '#14B8A6' },
      { name: 'Vàng Ánh Kim', hex: '#EAB308' }
    ],
    avoidColors: 'Nâu đất đậm, Vàng đất sẫm (Thổ chế Thủy)',
    logoShapes: 'Hình lượn sóng, giọt nước, dòng chảy uốn lượn kết hợp vòng tròn đồng tâm tạo thế "Kim sinh Thủy - Thủy tụ Tài".',
    typographyStyle: 'Font chữ hiện đại, linh hoạt, bo góc mềm mại tạo cảm giác lưu thông thuận lợi.',
    bestIndustries: [
      'Thương mại điện tử, Xuất nhập khẩu, Logistics, Vận tải',
      'Du lịch, Khách sạn, Nhà hàng, Đồ uống, Thủy hải sản',
      'Truyền thông, Quảng cáo đa kênh, Marketing kỹ thuật số',
      'Tài chính dòng tiền, Dịch vụ tư vấn, Spa làm đẹp'
    ],
    signboardAdvice: 'Biển hiệu nền Xanh Dương Đậm hoặc Đen Obsidian phối chữ nổi Trắng Sáng & Vàng Kim giúp thu hút dòng khách hàng tấp nập như nước chảy về nguồn.'
  },
  Hỏa: {
    element: 'Hỏa',
    generatingElement: 'Mộc (Mộc sinh Hỏa)',
    primaryColors: [
      { name: 'Đỏ Chu Sa Đại Cát (Bản Mệnh)', hex: '#DC2626' },
      { name: 'Cam Hổ Phách Năng Lượng', hex: '#EA580C' },
      { name: 'Xanh Lá Ngọc (Tương Sinh)', hex: '#16A34A' }
    ],
    accentColors: [
      { name: 'Vàng Hoàng Kim (Hỏa sinh Thổ)', hex: '#FACC15' },
      { name: 'Tím Hoàng Gia', hex: '#9333EA' }
    ],
    avoidColors: 'Đen tuyền, Xanh nước biển sẫm (Thủy khắc Hỏa)',
    logoShapes: 'Hình tam giác hướng lên, ngôi sao, ngọn đuốc, cánh chim phượng hoàng hoặc đường nét vươn chéo đầy năng lượng.',
    typographyStyle: 'Font chữ mạnh mẽ, ấn tượng, có điểm nhấn sắc sảo thể hiện vị thế tiên phong.',
    bestIndustries: [
      'Truyền thông, Giải trí, Sản xuất Video, Tổ chức sự kiện',
      'Ẩm thực, Nhà hàng, Chuỗi F&B, Năng lượng',
      'Công nghệ AI, Khởi nghiệp đổi mới sáng tạo',
      'Thời trang, Thẩm mỹ viện, Studio nghệ thuật'
    ],
    signboardAdvice: 'Biển hiệu nên có sắc Đỏ Chu Sa hoặc Cam Vàng kết hợp hệ thống đèn chiếu sáng rực rỡ vào buổi tối để kích hoạt Hỏa khí danh vọng.'
  },
  Thổ: {
    element: 'Thổ',
    generatingElement: 'Hỏa (Hỏa sinh Thổ)',
    primaryColors: [
      { name: 'Vàng Hoàng Gia (Bản Mệnh)', hex: '#CA8A04' },
      { name: 'Nâu Trầm Đĩnh Đạc (Bản Mệnh)', hex: '#78350F' },
      { name: 'Đỏ Đô / Cam Đất (Tương Sinh)', hex: '#B91C1C' }
    ],
    accentColors: [
      { name: 'Trắng Kem Sang Trọng', hex: '#FEF3C7' },
      { name: 'Vàng Đồng Cổ Điển', hex: '#D97706' }
    ],
    avoidColors: 'Xanh lá cây chói (Mộc khắc Thổ)',
    logoShapes: 'Hình vuông vức, hình thoi cân xứng, biểu tượng tòa tháp, ngọn núi vững chãi hoặc ấn triện cổ phương Đông.',
    typographyStyle: 'Font chữ dày dặn, chân phương, vững chắc tạo niềm tin tuyệt đối cho khách hàng và đối tác.',
    bestIndustries: [
      'Bất động sản, Xây dựng, Kiến trúc, Vật liệu nội thất',
      'Đá quý phong thủy, Gốm sứ, Đồ thờ cúng, Vật phẩm tâm linh',
      'Quản lý tài sản, Kho bãi, Bảo hiểm, Luật sư',
      'Nông nghiệp công nghệ cao, Thực phẩm truyền thống'
    ],
    signboardAdvice: 'Biển hiệu hình chữ nhật vững chãi, viền khung Vàng Đồng kết hợp nền Đỏ Đô hoặc Nâu Đen giúp tụ tài giữ lộc cực kỳ bền vững.'
  }
};

// ----------------------------------------------------------------------------
// 6. PHONG THỦY BÀN LÀM VIỆC — CỬU CUNG BÁT QUÁI, CÂY CẢNH & TRANH TREO
// ----------------------------------------------------------------------------
export const DESK_NINE_GRID = [
  {
    pos: 'Đông Nam (Cung Tốn)',
    title: 'Cung Tài Lộc',
    icon: '🪴',
    color: '#66BB6A',
    item: 'Đặt Chậu Cây Phong Thủy Hợp Mệnh, Thiềm Thừ hoặc Hộp Đựng Tiền/Tài Liệu Kinh Doanh',
    desc: 'Góc bên trái phía xa của bàn làm việc là cung Tài Lộc. Đặt một chậu cây xanh tươi tốt hoặc vật phẩm chiêu tài giúp kích hoạt dòng tiền suôn sẻ.'
  },
  {
    pos: 'Chính Nam (Cung Ly)',
    title: 'Cung Danh Vọng & Uy Tín',
    icon: '💡',
    color: '#FF8A65',
    item: 'Đặt Đèn Bàn Chiếu Sáng, Kỷ Niệm Chương hoặc Biểu Tượng Thương Hiệu',
    desc: 'Vị trí giữa phía trước mặt đại diện cho danh tiếng và tầm nhìn. Giữ vùng này sáng sủa giúp công danh thăng tiến, thương hiệu vang xa.'
  },
  {
    pos: 'Tây Nam (Cung Khôn)',
    title: 'Cung Nhân Duyên & Hòa Khí',
    icon: '🌸',
    color: '#F48FB1',
    item: 'Đặt Quả Cầu Đá Thạch Anh Hồng, Lịch Để Bàn hoặc Ảnh Gia Đình',
    desc: 'Góc phải phía xa giúp điều hòa mối quan hệ với khách hàng, đồng nghiệp và gia đình luôn êm ấm.'
  },
  {
    pos: 'Chính Đông (Cung Chấn)',
    title: 'Cung Sức Khỏe & Sinh Khí',
    icon: '🍵',
    color: '#81C784',
    item: 'Đặt Ly Nước Ấm, Bình Trà Đạo hoặc Lư Xông Trầm Hương Nhỏ',
    desc: 'Bên trái tay ngồi là phương Thanh Long (Động). Đặt tách trà hoặc trầm hương giúp tinh thần sảng khoái, dồi dào năng lượng.'
  },
  {
    pos: 'Trung Cung (Chính Giữa)',
    title: 'Cung Thái Cực · Minh Đường',
    icon: '💻',
    color: '#FFD54F',
    item: 'Đặt Máy Tính / Laptop Chính & Giữ Khoảng Trống Thoáng Đãng',
    desc: 'Trung tâm bàn làm việc phải luôn gọn gàng, sạch sẽ để khí trường lưu thông, giúp đầu óc ra quyết định minh mẫn.'
  },
  {
    pos: 'Chính Tây (Cung Đoài)',
    title: 'Cung Sáng Tạo & Ý Tưởng',
    icon: '🖋️',
    color: '#E2E8F0',
    item: 'Đặt Ống Bút Kim Loại, Sổ Tay Ý Tưởng hoặc Chuông Đồng Nhỏ',
    desc: 'Bên phải tay ngồi là phương Bạch Hổ (Tĩnh), nên đặt đồ vật thấp gọn, hỗ trợ tư duy sáng tạo và hoàn thành kế hoạch.'
  },
  {
    pos: 'Đông Bắc (Cung Cấn)',
    title: 'Cung Trí Tuệ & Học Vấn',
    icon: '📚',
    color: '#FFD54F',
    item: 'Đặt Sách Chuyên Môn, Tháp Văn Xương hoặc Quả Cầu Thạch Anh',
    desc: 'Góc trái gần người ngồi chủ về trí tuệ, nghiên cứu và hoạch định chiến lược dài hạn.'
  },
  {
    pos: 'Chính Bắc (Cung Khảm)',
    title: 'Cung Sự Nghiệp & Quan Lộc',
    icon: '🪑',
    color: '#64B5F6',
    item: 'Vị Trí Ghế Ngồi Của Bạn (Sau Lưng Cần Có Điểm Tựa Vững Chãi)',
    desc: 'Sau lưng ghế ngồi nên là tường vững hoặc tủ sách (Thế Tọa Sơn) để có quý nhân hậu thuẫn vững chắc.'
  },
  {
    pos: 'Tây Bắc (Cung Càn)',
    title: 'Cung Quý Nhân & Lãnh Đạo',
    icon: '📱',
    color: '#90CAF9',
    item: 'Đặt Điện Thoại Liên Lạc, Hộp Danh Thiếp Đối Tác hoặc Kim Bài Hộ Mệnh',
    desc: 'Góc phải gần tay cầm chuột nhất. Đặt điện thoại với số Sim đẹp và danh thiếp tại đây giúp đón nhận nhiều cuộc gọi hợp đồng giá trị.'
  }
];

export const PLANTS_AND_ART_BY_ELEMENT = {
  Kim: {
    plants: [
      { name: 'Cây Kim Tiền (Phát Tài)', desc: 'Lá xanh bóng vươn cao, chiêu tài lộc cực mạnh cho người mệnh Kim & Thổ.', price: '165.000đ', keyword: 'cay%20kim%20tien%20de%20ban%20phong%20thuy' },
      { name: 'Cây Lưỡi Hổ Viền Vàng', desc: 'Trấn trạch, lọc không khí và mang sắc vàng kim tương hợp bản mệnh.', price: '129.000đ', keyword: 'cay%20luoi%20ho%20vien%20vang%20de%20ban' },
      { name: 'Cây Bạch Mã Hoàng Tử / Ngọc Ngân', desc: 'Sắc trắng xanh thanh lịch giúp công việc thăng tiến thuận buồm xuôi gió.', price: '145.000đ', keyword: 'cay%20bach%20ma%20hoang%20tu%20de%20ban' }
    ],
    paintings: 'Tranh Tùng Hạc Diên Niên, Tranh Phượng Hoàng Ánh Kim, Tranh Sơn Thủy Núi Vàng.'
  },
  Mộc: {
    plants: [
      { name: 'Cây Kim Ngân (Money Tree)', desc: 'Thân xoắn vững chãi, 5 lá đại diện Ngũ Hành hội tụ, giữ tiền tài bền vững.', price: '175.000đ', keyword: 'cay%20kim%20ngan%20de%20ban%20phong%20thuy' },
      { name: 'Cây Trường Sinh / Trầu Bà Đế Vương Xanh', desc: 'Biểu tượng của sức sống mãnh liệt và quyền uy lãnh đạo.', price: '139.000đ', keyword: 'cay%20trau%20ba%20de%20vuong%20xanh%20de%20ban' },
      { name: 'Cây Tùng Bồng Lai Để Bàn', desc: 'Cốt cách quân tử, thu hút vượng khí và tài lộc lâu dài.', price: '220.000đ', keyword: 'cay%20tung%20bong%20lai%20de%20ban' }
    ],
    paintings: 'Tranh Thuận Buồm Xuôi Gió, Tranh Tứ Quý (Tùng - Cúc - Trúc - Mai), Tranh Rừng Cây Xanh Mát.'
  },
  Thủy: {
    plants: [
      { name: 'Cây Phát Lộc Thủy Sinh (Phú Quý Thủy Sinh)', desc: 'Trồng trong bình thủy tinh chứa nước giúp kích hoạt Thủy khí sinh đại tài.', price: '149.000đ', keyword: 'cay%20phat%20loc%20thuy%20sinh%20de%20ban' },
      { name: 'Cây Kim Tiền / Tùng La Hán Thủy Sinh', desc: 'Vừa thanh lọc không gian vừa thu hút quý nhân trợ giúp.', price: '185.000đ', keyword: 'cay%20thuy%20sinh%20de%20ban%20phong%20thuy' },
      { name: 'Cây Lan Ý (Huệ Hòa Bình)', desc: 'Hoa trắng tinh khôi (Kim sinh Thủy), cân bằng trường năng lượng văn phòng.', price: '155.000đ', keyword: 'cay%20lan%20y%20de%20ban' }
    ],
    paintings: 'Tranh Cửu Ngư Quần Hội (9 Cá Chép Hoa Sen), Tranh Thuận Buồm Xuôi Gió, Tranh Thác Nước Phong Thủy.'
  },
  Hỏa: {
    plants: [
      { name: 'Cây Phú Quý (Viền Lá Đỏ Hồng)', desc: 'Mộc sinh Hỏa, sắc đỏ hồng mang lại may mắn, giàu sang và danh vọng.', price: '135.000đ', keyword: 'cay%20phu%20quy%20de%20ban%20phong%20thuy' },
      { name: 'Cây Hồng Môn Đỏ Đại Cát', desc: 'Hoa đỏ hình trái tim rực rỡ, kích hoạt cung Danh Vọng và Nhân Duyên.', price: '169.000đ', keyword: 'cay%20hong%20mon%20de%20ban' },
      { name: 'Cây Vạn Lộc Đỏ', desc: 'Lá đốm hồng đỏ rực rỡ như tên gọi: Vạn điều may mắn, tài lộc đầy nhà.', price: '145.000đ', keyword: 'cay%20van%20loc%20de%20ban%20phong%20thuy' }
    ],
    paintings: 'Tranh Mã Đáo Thành Công (Bát Mã Truy Phong), Tranh Nhật Xuất Đông Sơn (Mặt Trời Mọc Trên Đỉnh Núi).'
  },
  Thổ: {
    plants: [
      { name: 'Cây Sen Đá Nâu / Sen Đá Phật Bà', desc: 'Biểu tượng của sự kiên định, tài lộc tích tụ và bình an vững chãi.', price: '95.000đ', keyword: 'cay%20sen%20da%20phong%20thuy%20de%20ban' },
      { name: 'Cây Lưỡi Hổ Vàng / Thiết Mộc Lan', desc: 'Mang lại vượng khí, thăng tiến và bảo vệ gia chủ khỏi tiểu nhân.', price: '149.000đ', keyword: 'cay%20thiet%20moc%20lan%20de%20ban' },
      { name: 'Cây Vạn Niên Thanh Vàng', desc: 'Cát tường như ý, tài vận bền bỉ quanh năm.', price: '139.000đ', keyword: 'cay%20van%20nien%20thanh%20de%20ban' }
    ],
    paintings: 'Tranh Vạn Lý Trường Thành, Tranh Làng Quê Mùa Lúa Chín Vàng, Tranh Thư Pháp Chữ Phúc - Lộc - Đức.'
  }
};
