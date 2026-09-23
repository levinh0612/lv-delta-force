export type Difficulty = "easy" | "normal" | "hard";

export const DIFFICULTY_LABEL: Record<Difficulty, { label: string; cls: "low" | "mid" | "high" }> = {
  easy: { label: "Easy", cls: "low" },
  normal: { label: "Normal", cls: "mid" },
  hard: { label: "Hard", cls: "high" },
};

export type MapInfo = {
  id: string;
  name: string;
  /** Difficulty modes available in Operations (per deltaforcemaps.com index). */
  difficulties: Difficulty[];
  /** Special map events besides the default state. */
  events?: string[];
  /** Season changes worth knowing, e.g. new areas or reworks. */
  seasonNote?: string;
  /** Community interactive map with exact extract / loot positions. */
  detailUrl: string;
  requirement?: string;
  vibe: string;
  newbie: 1 | 2 | 3 | 4 | 5; // 5 = rất hợp người mới
  range: string;
  summary: string;
  learnFirst: string[];
  tips: string[];
};

/**
 * Danh sách bản đồ và độ khó theo index công khai của deltaforcemaps.com (nay chuyển sang TrueMapper);
 * ghi chú mùa theo patch notes S11. Mô tả là tổng quan, luôn đối chiếu bản đồ trong game.
 */
export const MAP_SOURCE = { name: "Delta Force Maps (UnclePez) · TrueMapper", url: "https://www.deltaforcemaps.com" };

export const MAPS: MapInfo[] = [
  {
    id: "zero-dam",
    name: "Zero Dam",
    difficulties: ["easy", "normal"],
    seasonNote: "Được làm lại (rework) từ mùa Echo — nếu xem hướng dẫn cũ, kiểm tra lại vị trí trước khi tin.",
    detailUrl: "https://www.truemapper.com/maps/HB3LmLogRNT",
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
    difficulties: ["easy", "normal"],
    events: ["Máy bay rơi (Plane Crash)"],
    seasonNote: "Layali Grove 2.0 (S11): thêm khu vực mới — đi một trận dạo lại dù đã thuộc bản cũ.",
    detailUrl: "https://www.truemapper.com/maps/lqKZ-QkSF0Y",
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
    difficulties: ["normal", "hard"],
    events: ["Cầu gãy (Broken Bridge)"],
    seasonNote: "S11: điểm di tản dạng công tắc ngẫu nhiên ở Black Chamber và Buoyancy Lab, thêm tuyến thang máy ở Central Garden.",
    detailUrl: "https://www.truemapper.com/maps/YF-1_yyBE15",
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
    difficulties: ["normal", "hard"],
    detailUrl: "https://www.truemapper.com/maps/Ds5msamRvR-",
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
    difficulties: ["hard"],
    detailUrl: "https://www.truemapper.com/maps/FrtUzui3sfZ",
    vibe: "Nhà tù trên đảo, khu vực kín",
    newbie: 1,
    range: "Cận – trung",
    summary: "Chỉ có độ khó Hard. Rủi ro cao, đồ giá trị cao, đối thủ mạnh — để dành khi đã thoát đều ở các bản đồ khác.",
    learnFirst: ["Cửa vào/ra từng khu", "Điểm di tản và thời điểm mở", "Nơi AI mạnh đứng gác"],
    tips: ["Chỉ vào khi có đội và loadout đủ tốt", "Chuẩn bị đạn xuyên giáp cao"],
  },
  {
    id: "az3",
    name: "AZ3",
    difficulties: ["easy", "normal"],
    vibe: "Bản đồ mới nhất",
    newbie: 2,
    range: "Hỗn hợp",
    requirement: "AZ3 – Normal cần Operations cấp 14 và phí vào cửa",
    seasonNote: "S11: AZ3 – Normal mở vĩnh viễn (trước đây chỉ mở theo lượt xoay vòng).",
    summary: "Bản đồ mới, yêu cầu cấp Operations cao và có phí vào cửa. Chưa phải chỗ cho tuần đầu — để dành khi đã có kinh tế ổn định.",
    learnFirst: ["Điểm di tản và điều kiện", "Khu vực an toàn gần chỗ xuất phát", "Đường rút khi bị đánh úp"],
    tips: ["Tính phí vào cửa vào \"vé vào cửa\" của loadout", "Đi dạo 1 trận trước khi loot, như ngày 3"],
    detailUrl: "https://www.truemapper.com/maps/wQq37EbxY7q",
  },
];
