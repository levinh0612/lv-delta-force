export type Risk = "low" | "mid" | "high";

export const MODES: { name: string; style: string; death: string; risk: Risk; riskLabel: string; bestFor: string }[] = [
  {
    name: "Warfare",
    style: "Chiến trường lớn hai phe, giành mục tiêu, có xe cộ. Giống Battlefield.",
    death: "Hồi sinh, không mất gì",
    risk: "low",
    riskLabel: "Thấp",
    bestFor: "Học súng, độ giật, vai trò",
  },
  {
    name: "Operations",
    style: "Vào bản đồ nhặt đồ, đánh AI và người chơi khác, rồi di tản ra. Kiểu extraction như Tarkov.",
    death: "Mất phần lớn đồ mang vào và đồ nhặt được",
    risk: "high",
    riskLabel: "Cao",
    bestFor: "Kiếm tiền, đồ, làm nhiệm vụ",
  },
  {
    name: "Black Hawk Down",
    style: "Chiến dịch cốt truyện làm lại, nhiệm vụ điện ảnh.",
    death: "Chơi lại từ checkpoint",
    risk: "low",
    riskLabel: "Không có",
    bestFor: "Làm quen điều khiển, chơi cùng bạn",
  },
];

export const RULES = [
  { t: "Chỉ mang thứ dám mất", d: "Đồ xịn để dành khi đã thuộc bản đồ. Mất một bộ rẻ không sao, mất cả kho mới đau." },
  { t: "Âm thanh là radar", d: "Đứng yên nghe tiếng bước chân và tiếng súng xa. Chạy liên tục là tự báo vị trí." },
  { t: "Két sắt, máy tính là bẫy", d: "Chỗ có đồ giá trị luôn có người rình. Quan sát kỹ trước khi lao vào." },
  { t: "Đồng đội ngã thì lùi", d: "Nếu đồng đội bị hạ, cân nhắc rút tạm thay vì lao vào cứu một cách liều lĩnh." },
  { t: "Biết lúc về", d: "Balo đầy hoặc máu, đạn cạn thì đi thẳng tới điểm di tản. Tham thêm một món là cách mất tất cả." },
  { t: "Mang đủ hồi máu", d: "Luôn có băng gạc và đồ hồi máu. Đạn dư một băng tốt hơn thiếu một băng." },
  { t: "Két an toàn là bảo hiểm", d: "Món nhỏ mà đắt nhất nhặt được thì cất ngay vào két an toàn cá nhân — chết vẫn giữ được." },
  { t: "Nạp đạn sau mỗi pha bắn", d: "Hết giao tranh là nấp và thay băng ngay, đừng đợi hết sạch đạn giữa trận đấu súng tiếp theo." },
  { t: "Đừng đứng ở điểm di tản", d: "Chờ di tản ở chỗ khuất gần đó. Điểm di tản là nơi người khác phục kích nhiều nhất." },
];

export const DONTS = [
  {
    t: "Tiêu Havoc Coins vào skin ngay từ đầu.",
    d: "Về sau độ súng, mở kho, mua đồ tiêu hao đều cần rất nhiều tiền này. Skin không giúp bắn trúng hơn.",
    fix: "Chỉ tiêu cho: độ súng, mở rộng kho, đồ tiêu hao.",
  },
  {
    t: "Vào thẳng Operations khi chưa quen súng.",
    d: "Bị hạ liên tục, mất đồ, nản. Chơi Warfare trước để học độ giật.",
    fix: "Tối thiểu 4–5 trận Warfare trước trận Operations đầu tiên.",
  },
  {
    t: "Bỏ qua phần độ súng.",
    d: "Nòng, báng, băng đạn thay đổi hẳn cách súng hoạt động.",
    fix: "Ưu tiên giảm giật và ổn định trước, lưu bản độ để dùng lại.",
  },
  {
    t: "Bán đồ hiếm vội vàng.",
    d: "Kiểm tra bảng nhiệm vụ trước; nhiều món nộp nhiệm vụ lời hơn.",
    fix: "Bán đồ trùng trước, món hiếm thì hỏi anh em trong nhóm.",
  },
  {
    t: "Đi Operations một mình mãi.",
    d: "Chế độ được thiết kế cho đội 3 người. Rủ anh em WP đi cùng.",
    fix: "Hẹn giờ cố định trong tuần với 2 người cùng trình độ.",
  },
  {
    t: "Lên độ khó cao khi chưa thoát đều.",
    d: "Chưa thoát được khoảng một nửa số trận ở độ khó thấp thì chưa nên lên.",
    fix: "Dùng nhật ký raid để đo tỉ lệ thoát 10 trận gần nhất.",
  },
  {
    t: "Mang súng xịn với đạn rẻ.",
    d: "Đạn cấp thấp không xuyên được giáp tốt; súng đắt cũng thành vô dụng.",
    fix: "Chia ngân sách: đạn tốt quan trọng ngang (hoặc hơn) súng.",
  },
  {
    t: "Chạy theo tiếng súng.",
    d: "Tới nơi là gặp người thắng trận đó đang nấp chờ, hoặc bị kẹp giữa hai đội.",
    fix: "Chỉ lại gần khi có lợi thế vị trí và đủ máu, đạn.",
  },
];

export const GLOSSARY: { term: string; vi?: string; def: string }[] = [
  { term: "Extract", vi: "Di tản", def: "Điểm di tản. Chỉ khi tới đây và thoát ra thì đồ nhặt được mới thuộc về bạn." },
  { term: "Loot", vi: "Đồ nhặt", def: "Đồ nhặt được trong trận: vật phẩm, vũ khí, tiền." },
  { term: "Raid", def: "Một lượt vào bản đồ trong Operations." },
  { term: "Stash", vi: "Kho", def: "Kho đồ của bạn ngoài trận." },
  { term: "Loadout", def: "Bộ trang bị mang vào trận: súng, giáp, balo, đồ hồi máu." },
  { term: "Havoc Coins", def: "Tiền trong game kiếm từ Operations, dùng mua đồ, độ súng, mở rộng kho." },
  { term: "Operator", def: "Nhân vật bạn chọn, mỗi người có kỹ năng riêng theo nhóm Tấn công, Trinh sát, Hỗ trợ, Kỹ sư." },
  { term: "Hotspot", vi: "Điểm nóng", def: "Khu nhiều đồ giá trị, cũng là nơi đông người chơi và giao tranh nhất." },
  { term: "Callout", def: "Báo vị trí địch cho đồng đội, ngắn gọn: hướng, khoảng cách, số lượng." },
  { term: "Wipe", def: "Cả đội bị hạ hết." },
  { term: "Safe box", vi: "Két an toàn", def: "Ô chứa nhỏ mang theo người, đồ trong đó không mất khi bạn chết." },
  { term: "Armor class", vi: "Cấp giáp", def: "Giáp và mũ có nhiều cấp; cấp càng cao chặn được đạn càng mạnh." },
  { term: "Pen", vi: "Xuyên giáp", def: "Khả năng đạn xuyên qua giáp. Đạn cấp cao gây sát thương thật lên người giáp tốt." },
  { term: "PMC / Player", def: "Người chơi thật trong Operations — nguy hiểm hơn AI nhiều." },
  { term: "AI / Bot", def: "Lính do máy điều khiển. Bắn chuẩn ở độ khó cao, nhưng đoán trước được đường đi." },
  { term: "Boss", def: "AI đặc biệt, mạnh, mang đồ giá trị. Đừng đụng khi chưa có đội và đồ tốt." },
  { term: "Third party", vi: "Bên thứ ba", def: "Đội thứ ba lao vào khi hai đội khác vừa đánh nhau xong, hốt cả hai." },
  { term: "Peek", def: "Ló ra khỏi chỗ nấp để bắn/quan sát rồi rút lại ngay." },
  { term: "Rotate", def: "Di chuyển từ khu này sang khu khác trên bản đồ." },
  { term: "Knock / Down", vi: "Ngã", def: "Bị hạ nhưng chưa chết hẳn, đồng đội còn cứu được." },
  { term: "Revive", vi: "Cứu", def: "Đỡ đồng đội đang ngã dậy. Chỉ làm khi đã an toàn." },
  { term: "Recoil", vi: "Độ giật", def: "Súng nảy lên/lệch khi bắn. Kéo ghì ngược lại để giữ tâm." },
  { term: "TTK", def: "Time to kill — thời gian cần để hạ một đối thủ." },
  { term: "Meta", def: "Súng, build, chiến thuật đang mạnh nhất ở mùa hiện tại." },
];
