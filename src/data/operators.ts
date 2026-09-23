import { Zap, Radar, HeartPulse, Wrench, type LucideIcon } from "lucide-react";

export type RoleKey = "assault" | "recon" | "support" | "engineer";

export type Role = {
  key: RoleKey;
  name: string;
  en: string;
  icon: LucideIcon;
  fantasy: string;
  job: string[];
  weapons: string;
  mistakes: string;
  examples: { name: string; note: string }[];
  difficulty: 1 | 2 | 3;
};

/**
 * Tên operator và kỹ năng có thể thay đổi theo mùa — luôn đọc mô tả kỹ năng trong game.
 */
export const ROLES: Role[] = [
  {
    key: "assault",
    name: "Tấn công",
    en: "Assault",
    icon: Zap,
    fantasy: "Người mở cửa. Lao lên đầu, tạo áp lực, kết thúc giao tranh nhanh.",
    job: ["Mở giao tranh khi đội đã sẵn sàng", "Cơ động để đánh bọc sườn", "Dọn phòng, dọn góc"],
    weapons: "Súng trường tấn công, tiểu liên",
    mistakes: "Lao lên một mình khi đồng đội còn ở xa.",
    examples: [
      { name: "D-Wolf", note: "Cơ động cao, lướt nhanh vào tầm gần" },
      { name: "Vyron", note: "Xông pha, chịu đòn tốt để mở đường" },
    ],
    difficulty: 2,
  },
  {
    key: "recon",
    name: "Trinh sát",
    en: "Recon",
    icon: Radar,
    fantasy: "Đôi mắt của đội. Biết địch ở đâu trước khi địch biết mình ở đâu.",
    job: ["Dò và đánh dấu vị trí địch", "Callout sớm, chính xác", "Giữ tầm xa, yểm trợ đội"],
    weapons: "Súng trường thiện xạ, súng bắn tỉa, súng trường tấn công",
    mistakes: "Ham bắn tỉa mà quên báo vị trí cho đội.",
    examples: [
      { name: "Luna", note: "Công cụ phát hiện, lộ vị trí địch" },
      { name: "Hackclaw", note: "Gây nhiễu, vô hiệu thiết bị địch" },
    ],
    difficulty: 3,
  },
  {
    key: "support",
    name: "Hỗ trợ",
    en: "Support",
    icon: HeartPulse,
    fantasy: "Giữ đội sống. Hồi máu, cứu người, che chắn khi rút lui.",
    job: ["Hồi máu và cứu đồng đội", "Tạo màn khói, che đường rút", "Giữ nhịp an toàn cho cả đội"],
    weapons: "Súng trường tấn công, súng máy nhẹ",
    mistakes: "Lao vào cứu khi địch vẫn đang ngắm chỗ đồng đội ngã.",
    examples: [
      { name: "Stinger", note: "Hồi máu đồng đội, hợp người mới" },
      { name: "Toxik", note: "Hỗ trợ, gây khó chịu cho địch" },
    ],
    difficulty: 1,
  },
  {
    key: "engineer",
    name: "Kỹ sư",
    en: "Engineer",
    icon: Wrench,
    fantasy: "Kiểm soát khu vực. Chống xe, dựng phòng thủ, khóa đường đi của địch.",
    job: ["Chống xe tăng, xe bọc thép (Warfare)", "Đặt bẫy, dựng chướng ngại", "Giữ vị trí khi đội loot"],
    weapons: "Súng trường, súng máy, vũ khí chống tăng",
    mistakes: "Đặt bẫy ở chỗ đội mình sẽ đi qua.",
    examples: [
      { name: "Shepherd", note: "Bẫy âm thanh, giữ vị trí" },
      { name: "Uluru", note: "Phá công sự, dựng chướng ngại" },
    ],
    difficulty: 2,
  },
];

/** Trắc nghiệm chọn vai: mỗi đáp án cộng điểm cho một vai. */
export const ROLE_QUIZ: { q: string; a: { t: string; role: RoleKey }[] }[] = [
  {
    q: "Vào trận, bạn muốn làm gì đầu tiên?",
    a: [
      { t: "Lao tới chỗ có tiếng súng", role: "assault" },
      { t: "Tìm chỗ cao để quan sát", role: "recon" },
      { t: "Đi theo đồng đội, xem ai cần gì", role: "support" },
      { t: "Chiếm một vị trí rồi giữ nó", role: "engineer" },
    ],
  },
  {
    q: "Khoảnh khắc làm bạn sướng nhất?",
    a: [
      { t: "Hạ liên tiếp 3 người trong vài giây", role: "assault" },
      { t: "Báo đúng vị trí, cả đội hạ địch", role: "recon" },
      { t: "Cứu đồng đội đúng lúc nguy cấp", role: "support" },
      { t: "Bắn nổ xe tăng địch", role: "engineer" },
    ],
  },
  {
    q: "Khi đội đang thua, bạn sẽ…",
    a: [
      { t: "Đánh bọc sườn để đảo ngược thế trận", role: "assault" },
      { t: "Tìm xem địch đến từ đâu", role: "recon" },
      { t: "Thả khói, kéo mọi người rút về", role: "support" },
      { t: "Dựng phòng tuyến để giữ chân địch", role: "engineer" },
    ],
  },
  {
    q: "Bạn tự tin nhất ở kỹ năng nào?",
    a: [
      { t: "Phản xạ, bắn gần", role: "assault" },
      { t: "Ngắm xa, kiên nhẫn", role: "recon" },
      { t: "Quan sát đồng đội, bình tĩnh", role: "support" },
      { t: "Tính trước, chơi chiến thuật", role: "engineer" },
    ],
  },
];
