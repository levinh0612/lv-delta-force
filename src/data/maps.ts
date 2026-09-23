export type MapInfo = {
  id: string;
  name: string;
  vibe: string;
  newbie: 1 | 2 | 3 | 4 | 5; // 5 = rất hợp người mới
  range: string;
  summary: string;
  learnFirst: string[];
  tips: string[];
};

/**
 * Nội dung mô tả ở mức tổng quan, có thể thay đổi theo mùa.
 * Luôn đối chiếu bản đồ trong game trước khi đi raid.
 */
export const MAPS: MapInfo[] = [
  {
    id: "zero-dam",
    name: "Zero Dam",
    vibe: "Đập thủy điện, núi, thung lũng",
    newbie: 5,
    range: "Tầm trung",
    summary: "Bản đồ nhập môn: bố cục dễ đọc, nhiều đường vòng an toàn. Nơi nên học Operations trong tuần đầu.",
    learnFirst: ["Toàn bộ điểm di tản và điều kiện mở", "Một tuyến loot ven rìa, tránh khu trung tâm đập", "Vài tòa nhà nhỏ có đồ vừa phải"],
    tips: ["Khu đập chính đông người — chỉ tới khi đã quen", "Nghe tiếng súng để biết đội nào đang đánh nhau, đi vòng tránh"],
  },
  {
    id: "layali-grove",
    name: "Layali Grove",
    vibe: "Đồng quê, nông trại, địa hình mở",
    newbie: 4,
    range: "Trung – xa",
    summary: "Rộng và thoáng hơn Zero Dam, nhiều khoảng đất trống. Cần súng bắn xa ổn định và biết băng qua chỗ trống.",
    learnFirst: ["Chỗ nấp giữa các cụm nhà", "Đường đi men theo địa hình, tránh đồng trống", "Điểm di tản gần chỗ xuất phát"],
    tips: ["Đừng chạy thẳng qua đồng trống — đi theo gờ đất, hàng cây", "Mang ống ngắm 2–4x nếu tay đã vững"],
  },
  {
    id: "space-city",
    name: "Space City",
    vibe: "Căn cứ hàng không vũ trụ, nhiều khu trong nhà",
    newbie: 3,
    range: "Cận – trung",
    summary: "Nhiều hành lang, tầng lầu, cửa. Giao tranh cận chiến, âm thanh cực kỳ quan trọng.",
    learnFirst: ["Lối lên xuống giữa các tầng", "Các cửa hay có người phục", "Đường thoát nhanh ra ngoài trời"],
    tips: ["Súng tiểu liên / shotgun lợi thế ở đây", "Đi bộ chậm trong nhà, dừng lại nghe trước mỗi góc"],
  },
  {
    id: "brakkesh",
    name: "Brakkesh",
    vibe: "Thành phố Trung Đông, ngõ hẹp, mái nhà",
    newbie: 2,
    range: "Hỗn hợp",
    summary: "Đô thị dày đặc: ngõ hẹp, mái nhà, cửa sổ khắp nơi. Nguy cơ bị bắn từ trên cao và bị kẹp hai đầu.",
    learnFirst: ["Tuyến đường ít cửa sổ nhìn xuống", "Lối lên mái nhà", "Các ngã tư nguy hiểm"],
    tips: ["Luôn nhìn lên cao khi băng qua ngã tư", "Đi theo đội, một người canh phía sau"],
  },
  {
    id: "tide-prison",
    name: "Tide Prison",
    vibe: "Nhà tù trên đảo, khu vực kín",
    newbie: 1,
    range: "Cận – trung",
    summary: "Bản đồ rủi ro cao, đồ giá trị cao, đối thủ mạnh. Để dành khi đã thoát đều ở các bản đồ khác.",
    learnFirst: ["Cửa vào/ra từng khu", "Điểm di tản và thời điểm mở", "Nơi AI mạnh đứng gác"],
    tips: ["Chỉ vào khi có đội và loadout đủ tốt", "Chuẩn bị đạn xuyên giáp cao"],
  },
];
