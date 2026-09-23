export type QuizItem = { q: string; options: string[]; answer: number; why: string };

export const QUIZ: QuizItem[] = [
  {
    q: "Chế độ nào chết là mất đồ?",
    options: ["Warfare", "Operations", "Black Hawk Down", "Cả ba"],
    answer: 1,
    why: "Operations là chế độ extraction: chết mất phần lớn đồ mang vào và đồ nhặt được.",
  },
  {
    q: "Tân binh nên học độ giật súng ở đâu trước?",
    options: ["Operations độ khó cao", "Warfare và sân tập", "Chỉ xem video", "Không cần học"],
    answer: 1,
    why: "Warfare chết thì hồi sinh, không mất gì — là chỗ học súng rẻ nhất.",
  },
  {
    q: "Tên nhân vật đúng format team là…",
    options: ["WP-Khoa", "wp | Khoa", "WP | Khoa", "WP|Khoa"],
    answer: 2,
    why: "Chữ WP in hoa, có dấu | và khoảng trắng hai bên.",
  },
  {
    q: "Quy tắc tiền trong kho so với loadout chuẩn?",
    options: ["Đủ mua lại 1 lần", "Đủ mua lại ít nhất 3 lần", "Không quan trọng", "Tiêu hết cho skin"],
    answer: 1,
    why: "Kho đủ mua lại loadout ít nhất 3 lần thì vài trận thua liên tiếp cũng không phá sản.",
  },
  {
    q: "Balo đã đầy và máu còn một nửa. Bạn nên…",
    options: ["Loot thêm một khu nữa", "Đi thẳng tới điểm di tản", "Tìm boss", "Chạy về chỗ có tiếng súng"],
    answer: 1,
    why: "Biết lúc về: tham thêm một món là cách mất tất cả.",
  },
  {
    q: "Callout chuẩn gồm những gì?",
    options: ["Tên người chơi địch", "Hướng + khoảng cách + số lượng", "Súng địch đang cầm", "Cảm xúc của bạn"],
    answer: 1,
    why: "Ngắn, đủ thông tin để đồng đội quay đúng hướng: hướng, khoảng cách, số lượng.",
  },
  {
    q: "Đồng đội vừa bị hạ ngay giữa đường. Việc đầu tiên?",
    options: ["Lao ra cứu ngay", "Báo vị trí địch, cứu khi đã an toàn", "Loot đồ của đồng đội", "Thoát game"],
    answer: 1,
    why: "Địch vẫn đang ngắm chỗ đó. Xử lý mối đe dọa trước, cứu sau.",
  },
  {
    q: "Havoc Coins nên ưu tiên tiêu vào…",
    options: ["Skin súng", "Độ súng, mở rộng kho, đồ tiêu hao", "Không tiêu gì cả", "Mua đồ đắt nhất có thể"],
    answer: 1,
    why: "Skin không giúp bắn trúng hơn; độ súng, kho và đồ tiêu hao thì có.",
  },
  {
    q: "Két an toàn (safe box) dùng để…",
    options: ["Chứa súng chính", "Giữ đồ nhỏ giá trị, chết không mất", "Tăng máu", "Mở điểm di tản"],
    answer: 1,
    why: "Đồ trong két an toàn không mất khi bạn chết — cất món đắt nhất nhặt được vào đó.",
  },
  {
    q: "Khi nào nên lên độ khó cao hơn?",
    options: ["Ngay ngày đầu", "Khi thoát được khoảng một nửa số trận ở độ khó thấp", "Khi có skin mới", "Khi thua liên tục"],
    answer: 1,
    why: "Chưa thoát đều ở độ khó thấp thì lên cao chỉ mất đồ nhanh hơn.",
  },
  {
    q: "Súng xịn nhưng đạn cấp thấp gặp địch giáp tốt thì…",
    options: ["Vẫn hạ nhanh", "Rất khó hạ vì đạn không xuyên giáp", "Không ảnh hưởng", "Bắn thân là đủ"],
    answer: 1,
    why: "Xuyên giáp phụ thuộc chủ yếu vào đạn. Đạn tốt quan trọng ngang súng.",
  },
  {
    q: "Ở Operations, điểm di tản là…",
    options: ["Chỗ an toàn nhất", "Nơi hay bị phục kích, nên chờ ở chỗ khuất gần đó", "Chỗ loot đồ tốt nhất", "Không quan trọng"],
    answer: 1,
    why: "Người khác biết bạn phải đi qua đó — đừng đứng giữa điểm di tản khi chờ.",
  },
];
