import { Crosshair, Footprints, Headphones, Package, Coins, Users, Flag, SlidersHorizontal, type LucideIcon } from "lucide-react";

export type TipCat = "aim" | "move" | "audio" | "ops" | "eco" | "team" | "warfare" | "settings";
export type Level = 1 | 2 | 3;

export const TIP_CATS: { key: TipCat; label: string; icon: LucideIcon }[] = [
  { key: "aim", label: "Bắn & ngắm", icon: Crosshair },
  { key: "move", label: "Di chuyển", icon: Footprints },
  { key: "audio", label: "Âm thanh", icon: Headphones },
  { key: "ops", label: "Operations", icon: Package },
  { key: "eco", label: "Kinh tế", icon: Coins },
  { key: "team", label: "Đồng đội", icon: Users },
  { key: "warfare", label: "Warfare", icon: Flag },
  { key: "settings", label: "Cài đặt", icon: SlidersHorizontal },
];

export const LEVELS: Record<Level, { label: string; cls: "low" | "mid" | "high" }> = {
  1: { label: "Cơ bản", cls: "low" },
  2: { label: "Trung cấp", cls: "mid" },
  3: { label: "Nâng cao", cls: "high" },
};

export type Tip = { cat: TipCat; level: Level; t: string; d: string };

export const TIPS: Tip[] = [
  // Bắn & ngắm
  { cat: "aim", level: 1, t: "Đặt tâm ngắm ngang tầm đầu", d: "Khi di chuyển, giữ tâm ngắm ở độ cao đầu người và hướng về góc sắp mở ra. Gặp địch là chỉ cần chỉnh rất ít." },
  { cat: "aim", level: 1, t: "Bắn loạt ngắn ở tầm xa", d: "Xả cả băng ở 50m+ là phí đạn. Bắn 3–5 viên, dừng một nhịp cho tâm hồi về, rồi bắn tiếp." },
  { cat: "aim", level: 1, t: "Ngồi xuống giảm giật", d: "Ngồi hoặc nằm khi đấu súng tầm xa giúp súng ổn định hơn, và lộ ít thân hơn." },
  { cat: "aim", level: 2, t: "Ngắm đầu người mặc giáp tốt", d: "Nếu đạn của bạn yếu hơn giáp địch, bắn thân gần như vô ích. Nhắm đầu hoặc chân (tùy giáp) để hạ nhanh hơn." },
  { cat: "aim", level: 2, t: "Tỳ súng lên vật cản", d: "Tỳ súng vào tường, bậu cửa sổ, nắp xe để giảm mạnh độ giật khi giữ góc." },
  { cat: "aim", level: 3, t: "Học kiểu giật của 1 khẩu", d: "Ở sân tập, bắn cả băng vào tường và nhớ hình dạng vết đạn. Kéo chuột ngược đúng hình đó — tập 5 phút mỗi ngày trong 1 tuần." },
  { cat: "aim", level: 3, t: "Đổi súng phụ nhanh hơn thay đạn", d: "Hết đạn giữa giao tranh gần: đổi sang súng phụ thường nhanh hơn nạp băng mới." },

  // Di chuyển
  { cat: "move", level: 1, t: "Không chạy ở chỗ trống", d: "Băng qua bãi trống thì chạy nhanh từ chỗ nấp này sang chỗ nấp khác, không dừng giữa đường." },
  { cat: "move", level: 1, t: "Lùi lại sau khi bắn", d: "Hạ được một người, lùi về sau chỗ nấp và thay đạn — đồng đội của họ đang tới." },
  { cat: "move", level: 2, t: "Nghiêng người (lean) để peek", d: "Dùng nghiêng trái/phải để ló một phần nhỏ cơ thể thay vì bước cả người ra khỏi góc." },
  { cat: "move", level: 2, t: "Đừng peek cùng một chỗ hai lần", d: "Địch đã thấy bạn ở góc đó và đang chờ. Đổi vị trí hoặc đổi độ cao (đứng/ngồi) trước khi ló lại." },
  { cat: "move", level: 3, t: "Dùng đường vòng khi rotate", d: "Đường ngắn nhất giữa hai khu thường là đường đông người nhất. Đi vòng qua rìa bản đồ an toàn hơn." },

  // Âm thanh
  { cat: "audio", level: 1, t: "Đeo tai nghe, luôn luôn", d: "Loa ngoài không cho bạn biết tiếng bước chân từ trái hay phải, trên hay dưới." },
  { cat: "audio", level: 1, t: "Dừng lại để nghe", d: "Cứ vài chục giây, đứng yên 2–3 giây và nghe. Tiếng chạy của chính bạn che mất tiếng địch." },
  { cat: "audio", level: 2, t: "Đi bộ chậm khi địch gần", d: "Đi bộ (không chạy) phát ra ít tiếng hơn nhiều. Khi nghe thấy địch, họ cũng đang có thể nghe thấy bạn." },
  { cat: "audio", level: 2, t: "Đọc tiếng súng", d: "Tiếng súng xa, liên tục = hai đội đang đánh nhau. Đó là lúc tốt để loot khu khác hoặc di tản." },
  { cat: "audio", level: 3, t: "Giảm nhạc nền, tăng hiệu ứng", d: "Trong cài đặt âm thanh, giảm nhạc nền về thấp hoặc tắt để nghe rõ bước chân, tiếng mở cửa, tiếng thay đạn." },

  // Operations
  { cat: "ops", level: 1, t: "Xem điểm di tản trước khi loot", d: "Mở bản đồ ngay đầu trận, chọn điểm di tản chính và một điểm dự phòng." },
  { cat: "ops", level: 1, t: "Cất đồ đắt vào két an toàn", d: "Nhặt được món nhỏ giá trị cao? Cho vào két an toàn cá nhân ngay, đừng để trong balo." },
  { cat: "ops", level: 2, t: "Né khu nóng đầu trận", d: "5 phút đầu, các khu đồ tốt là nơi mọi đội cùng lao tới. Đến sau, khi họ đã đánh nhau xong và rời đi." },
  { cat: "ops", level: 2, t: "Loot nhanh, ưu tiên giá trị/ô", d: "Balo có hạn. Ưu tiên món nhỏ mà đắt thay vì đồ to chiếm chỗ." },
  { cat: "ops", level: 2, t: "Hạ AI trước khi loot", d: "Dọn sạch AI quanh khu trước khi mở rương. Một con bot bắn lén khi bạn đang loot là lý do chết rất phổ biến." },
  { cat: "ops", level: 3, t: "Đi di tản sớm khi đã lời", d: "Balo đầy một nửa là đã lời so với vé vào cửa. Người lời đều là người về sớm, không phải người loot nhiều nhất." },
  { cat: "ops", level: 3, t: "Canh thời gian cuối trận", d: "Gần hết giờ, nhiều người dồn về điểm di tản. Hoặc đi rất sớm, hoặc chọn điểm di tản ít người." },

  // Kinh tế
  { cat: "eco", level: 1, t: "Quy tắc mua lại 3 lần", d: "Tiền trong kho luôn đủ mua lại loadout chuẩn ít nhất 3 lần. Dưới mức đó, hạ loadout xuống." },
  { cat: "eco", level: 1, t: "Kiểm tra nhiệm vụ trước khi bán", d: "Nhiều món nộp nhiệm vụ cho phần thưởng lớn hơn bán ngay." },
  { cat: "eco", level: 2, t: "Mở rộng kho sớm", d: "Kho chật khiến bạn phải bán rẻ đồ tốt. Mở rộng kho là khoản đầu tư có lời nhất lúc đầu." },
  { cat: "eco", level: 2, t: "Đạn tốt trước, súng đẹp sau", d: "Súng rẻ + đạn xuyên giáp tốt thường hiệu quả hơn súng đắt + đạn rẻ." },
  { cat: "eco", level: 3, t: "Theo dõi lời/lỗ mỗi trận", d: "Ghi lại giá trị mang vào và mang ra. Sau 10 trận bạn biết chính xác loadout nào có lời." },

  // Đồng đội
  { cat: "team", level: 1, t: "Callout: hướng + khoảng cách + số lượng", d: "\"Hai, hướng 270, tòa nhà xám, gần\" — ngắn, rõ, đủ để đồng đội quay đúng hướng." },
  { cat: "team", level: 1, t: "Dùng đánh dấu (ping)", d: "Không có voice? Ping vị trí địch và đồ trên bản đồ. Nhanh hơn gõ chữ nhiều." },
  { cat: "team", level: 2, t: "Một người quyết định", d: "Thống nhất trước ai là người chỉ huy: lúc nào đánh, lúc nào rút, lúc nào di tản. Tránh cãi nhau giữa trận." },
  { cat: "team", level: 2, t: "Đừng đứng cùng một chỗ", d: "Cả đội đứng sát nhau dễ bị một quả lựu đạn hạ hết. Tản ra vài mét, đủ để yểm trợ nhau." },
  { cat: "team", level: 3, t: "Trade kill", d: "Đồng đội bị bắn, bạn phải ở vị trí bắn được ngay kẻ vừa bắn. Đi đội hình sao cho luôn có người \"trade\" được." },

  // Warfare
  { cat: "warfare", level: 1, t: "Chơi mục tiêu, không đi săn", d: "Điểm và chiến thắng đến từ chiếm/giữ mục tiêu. Đứng gần mục tiêu cũng là nơi địch tới — tự nhiên có kill." },
  { cat: "warfare", level: 2, t: "Biết cách đối phó xe", d: "Gặp xe tăng mà không có vũ khí chống tăng? Rút vào nhà. Chọn Kỹ sư khi phe địch dùng nhiều xe." },
  { cat: "warfare", level: 2, t: "Hồi sinh thông minh", d: "Hồi sinh ở gần đội hoặc điểm vừa chiếm để vào trận nhanh, thay vì điểm xa phía sau." },
  { cat: "warfare", level: 3, t: "Warfare là sân tập miễn phí", d: "Thử súng, bản độ, operator mới ở Warfare trước khi mang vào Operations." },

  // Cài đặt
  { cat: "settings", level: 1, t: "FPS ổn định > đồ họa đẹp", d: "Giảm bóng đổ, hậu kỳ, hiệu ứng trước. Khung hình đều quan trọng hơn khung hình cao nhưng giật." },
  { cat: "settings", level: 1, t: "Tắt Motion Blur", d: "Hiệu ứng nhòe chuyển động làm khó nhìn địch khi xoay camera." },
  { cat: "settings", level: 2, t: "Mobile: thử con quay hồi chuyển (gyro)", d: "Gyro cho phép kéo ghì giật bằng cách nghiêng máy, rất chính xác khi đã quen. Bật ở chế độ \"khi ngắm\" trước." },
  { cat: "settings", level: 2, t: "Mobile: bố cục 3–4 ngón", d: "Chơi 2 ngón cái sẽ không thể vừa di chuyển, vừa ngắm, vừa bắn. Tập bố cục có ngón trỏ bắn." },
  { cat: "settings", level: 3, t: "Giữ nguyên độ nhạy", d: "Chọn một độ nhạy và giữ nguyên ít nhất 2 tuần. Đổi liên tục khiến tay không bao giờ quen." },
  { cat: "settings", level: 3, t: "Tăng độ sáng hợp lý", d: "Tăng độ sáng/gamma một chút giúp nhìn địch trong góc tối, nhưng đừng quá mức làm cháy sáng ngoài trời." },
];
