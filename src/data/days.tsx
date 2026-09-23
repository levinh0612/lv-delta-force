import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { NameTag } from "../components/NameTag";
import { PlatformTabs } from "../components/PlatformTabs";

export type Step = {
  id: string;
  title: string;
  time: string;
  body: ReactNode;
  tip?: ReactNode;
};

export type Day = {
  title: string;
  short: string;
  goal: string;
  intro: string;
  hours: string;
  steps: Step[];
};

export const DAYS: Day[] = [
  {
    title: "Làm quen",
    short: "Làm quen",
    goal: "Thoát được 1 trận Operations",
    hours: "~3 tiếng",
    intro: "Mục tiêu không phải là thắng, mà là hiểu game vận hành thế nào trước khi mạo hiểm đồ đạc.",
    steps: [
      {
        id: "acc",
        title: "Tạo tài khoản và đặt tên",
        time: "10 phút",
        body: (
          <>
            <p>
              Game dùng tài khoản Level Infinite, chung với nhiều game Tencent khác. Dùng <b>cùng một tài khoản</b> trên PC và điện thoại để giữ chung tiến trình.
            </p>
            <NameTag />
            <ul>
              <li>Đặt mật khẩu riêng, bật xác thực hai lớp nếu có.</li>
              <li>Không đăng nhập qua link "tặng skin", "nhận quà" lạ — tài khoản game này hay bị lừa đảo nhắm tới.</li>
            </ul>
          </>
        ),
        tip: <>Thêm ngay vài anh em <code>WP | ...</code> vào danh sách bạn bè để hôm sau dễ rủ đi chung.</>,
      },
      {
        id: "set",
        title: "Chỉnh cài đặt trước khi vào trận",
        time: "15 phút",
        body: (
          <PlatformTabs
            tabs={[
              {
                key: "pc",
                label: "PC",
                content: (
                  <ul>
                    <li>Tắt <b>Motion Blur</b>, bật <b>Fullscreen</b>, tắt <b>V-Sync</b> — game mượt hơn ngay.</li>
                    <li>Ưu tiên FPS ổn định hơn đồ họa đẹp; giảm bóng đổ và hậu kỳ trước.</li>
                    <li>Chỉnh độ nhạy chuột sao cho một lần kéo hết lót chuột xoay được khoảng 180–360°.</li>
                    <li>Nên đeo tai nghe để nghe rõ bước chân.</li>
                  </ul>
                ),
              },
              {
                key: "mb",
                label: "Mobile",
                content: (
                  <ul>
                    <li>Chọn mức đồ họa sao cho khung hình ổn định, máy không nóng quá nhanh.</li>
                    <li>Vào phần bố cục nút, kéo nút bắn, ngắm, ngồi, nhảy về chỗ ngón tay chạm tự nhiên.</li>
                    <li>Thử bắn tự động ở đầu, tắt khi đã quen để kiểm soát tốt hơn.</li>
                    <li>Chỉnh độ nhạy camera và độ nhạy khi ngắm riêng; test ở sân tập.</li>
                  </ul>
                ),
              },
            ]}
          />
        ),
        tip: (
          <>
            Xem thêm phần <Link to="/tips?cat=settings">cài đặt nâng cao</Link> — đặc biệt là con quay hồi chuyển (gyro) trên mobile.
          </>
        ),
      },
      {
        id: "range",
        title: "Ra sân tập bắn",
        time: "15 phút",
        body: (
          <p>
            Chọn 1–2 khẩu súng trường tấn công và tập kéo ghì độ giật khi xả đạn liên tục. Thử gắn nòng, báng, băng đạn khác nhau để thấy chúng đổi cảm giác bắn ra sao.
          </p>
        ),
        tip: <>Bắn 5–7 viên một loạt (burst) vào bia ~50m, nhìn vết đạn trên tường để biết súng giật lên hay lệch sang bên nào.</>,
      },
      {
        id: "bhd",
        title: "Chơi thử Black Hawk Down (tùy chọn)",
        time: "30 phút",
        body: <p>Chiến dịch cốt truyện, không có người chơi đối thủ. Nơi an toàn để quen di chuyển, nấp, ném lựu đạn và dùng trang bị.</p>,
      },
      {
        id: "war",
        title: "Đánh 4–5 trận Warfare",
        time: "1–1,5 tiếng",
        body: (
          <>
            <p>Chết thì hồi sinh, không mất gì. Đây là chỗ học súng và bản đồ rẻ nhất.</p>
            <ul>
              <li>Đi theo đồng đội, bám mục tiêu thay vì đi săn một mình.</li>
              <li>Thử cả 4 nhóm nhân vật: Tấn công, Trinh sát, Hỗ trợ, Kỹ sư.</li>
              <li>Để ý xe tăng, trực thăng; biết chỗ nấp khi chúng xuất hiện.</li>
            </ul>
          </>
        ),
        tip: <>Hồi sinh ở gần đồng đội hoặc điểm đã chiếm thay vì điểm xa nhất — ít thời gian chạy bộ, nhiều thời gian luyện bắn.</>,
      },
      {
        id: "ops",
        title: "Vào Operations lần đầu, đồ rẻ",
        time: "45 phút",
        body: (
          <>
            <p>Chọn bản đồ dễ nhất (Zero Dam), độ khó thấp. Mang súng trường đơn giản và giáp nhẹ — thứ mà mất cũng không tiếc.</p>
            <ul>
              <li>Mục tiêu duy nhất: <b>sống và thoát ra</b>.</li>
              <li>Tránh các điểm nóng ngay đầu trận.</li>
              <li>Xem trước vị trí điểm di tản trên bản đồ trước khi đi loot.</li>
            </ul>
          </>
        ),
        tip: (
          <>
            Mở <Link to="/tools#checklist">checklist trước raid</Link> và tích từng mục trước khi bấm vào trận.
          </>
        ),
      },
      {
        id: "review",
        title: "Dọn kho và xem nhiệm vụ",
        time: "10 phút",
        body: <p>Trước khi bán đồ, mở bảng nhiệm vụ: một số món cần để nộp nhiệm vụ mùa. Giữ Havoc Coins cho việc độ súng, mở rộng kho và đồ tiêu hao.</p>,
        tip: (
          <>
            Ghi trận đầu vào <Link to="/tools#raidlog">nhật ký raid</Link> — sang ngày 6 bạn sẽ cần số liệu này.
          </>
        ),
      },
    ],
  },
  {
    title: "Chọn vai và súng chính",
    short: "Vai trò",
    goal: "Có 1 operator và 1 khẩu súng chính",
    hours: "~2,5 tiếng",
    intro: "Hôm qua thử hết, hôm nay chọn lấy một hướng để tập trung. Người mới tiến bộ nhanh nhất khi chỉ luyện một vài thứ.",
    steps: [
      {
        id: "warm",
        title: "Khởi động ở sân tập",
        time: "10 phút",
        body: <p>Bắn bia xa gần với khẩu súng hôm qua thấy dễ nhất. Việc này nên làm đầu mỗi buổi từ giờ trở đi.</p>,
      },
      {
        id: "role",
        title: "Chọn 1 operator chính",
        time: "Trong trận",
        body: (
          <>
            <p>Dựa vào cảm giác hôm qua, chọn một nhóm để gắn bó cả tuần:</p>
            <ul>
              <li><b>Tấn công</b>: thích lao lên, mở giao tranh.</li>
              <li><b>Trinh sát</b>: thích dò vị trí địch, báo cho đội.</li>
              <li><b>Hỗ trợ</b>: thích cứu, hồi máu đồng đội.</li>
              <li><b>Kỹ sư</b>: thích xử lý xe cộ, phòng thủ.</li>
            </ul>
            <p>Đọc kỹ mô tả kỹ năng của operator đó trong game.</p>
          </>
        ),
        tip: (
          <>
            Chưa biết chọn gì? Làm bài <Link to="/operators#pick">trắc nghiệm chọn vai</Link> 30 giây.
          </>
        ),
      },
      {
        id: "gun",
        title: "Độ khẩu súng đầu tiên",
        time: "20 phút",
        body: (
          <>
            <p>
              Chọn 1 khẩu súng trường tấn công làm súng chính. Vào phần độ súng, ưu tiên giảm độ giật và tăng độ ổn định trước, rồi mới tới tốc độ ngắm hay băng đạn lớn.
            </p>
            <p>Lưu lại bản độ này để dùng lại.</p>
          </>
        ),
        tip: <>Thứ tự ưu tiên cho người mới: <b>độ giật dọc → độ ổn định → tốc độ ngắm → băng đạn</b>. Bỏ qua ống ngắm phóng đại cao lúc này.</>,
      },
      {
        id: "war2",
        title: "4–5 trận Warfare với vai đã chọn",
        time: "1–1,5 tiếng",
        body: (
          <ul>
            <li>Chỉ dùng operator và súng đã chọn.</li>
            <li>Cuối mỗi trận nhìn bảng điểm: mình chết vì bị bắn từ đâu nhiều nhất?</li>
          </ul>
        ),
      },
      {
        id: "ops2",
        title: "2 trận Operations, Zero Dam",
        time: "40 phút",
        body: (
          <p>
            Vẫn đồ rẻ. Hôm nay tập trung ghi nhớ <b>tất cả điểm di tản</b> của bản đồ và đường đi từ chỗ xuất phát tới chúng.
          </p>
        ),
        tip: <>Để ý điểm di tản nào có điều kiện (trả phí, cần vật phẩm, giới hạn thời gian) — không phải cửa nào cũng mở miễn phí.</>,
      },
    ],
  },
  {
    title: "Thuộc bản đồ đầu tiên",
    short: "Bản đồ",
    goal: "Tự đi Zero Dam không cần mở bản đồ",
    hours: "~2 tiếng",
    intro: "Ở Operations, biết đường là sống. Hôm nay chơi chậm lại để học bản đồ, chưa cần loot nhiều.",
    steps: [
      { id: "warm3", title: "Khởi động sân tập", time: "10 phút", body: <p>Bắn thử khẩu súng đã độ ở ngày 2.</p> },
      {
        id: "scout",
        title: "1 trận chỉ để đi dạo bản đồ",
        time: "20 phút",
        body: (
          <>
            <p>Mang đồ rẻ nhất có thể. Đi một vòng quanh bản đồ, không cần đánh nhau. Ghi nhớ:</p>
            <ul>
              <li>Các tòa nhà có nhiều đồ nhưng ít người qua lại.</li>
              <li>Chỗ nấp dọc đường tới điểm di tản.</li>
              <li>Hướng người chơi khác thường kéo tới.</li>
            </ul>
          </>
        ),
        tip: (
          <>
            Xem <Link to="/maps">trang bản đồ</Link> để biết Zero Dam nên học khu nào trước.
          </>
        ),
      },
      {
        id: "route",
        title: "Chọn 1 lộ trình loot cố định",
        time: "10 phút",
        body: <p>Chọn một tuyến đường từ chỗ xuất phát → 2–3 điểm loot vừa phải → điểm di tản gần nhất. Đi đi lại lại tuyến này cho quen.</p>,
        tip: <>Chụp màn hình bản đồ, vẽ tuyến đường lên đó và gửi vào nhóm WP để anh em góp ý.</>,
      },
      {
        id: "ops3",
        title: "3 trận Operations theo lộ trình",
        time: "1 tiếng",
        body: (
          <ul>
            <li>Đi đúng lộ trình, không bị kéo đi xa vì tiếng súng.</li>
            <li>Đếm số trận thoát được. Mục tiêu: 2/3.</li>
          </ul>
        ),
      },
      {
        id: "war3",
        title: "Warfare thả lỏng (tùy chọn)",
        time: "30 phút",
        body: <p>Nếu Operations quá căng, đánh vài trận Warfare để luyện bắn cho thoải mái.</p>,
      },
    ],
  },
  {
    title: "Kinh tế và kho đồ",
    short: "Kinh tế",
    goal: "Có 1 bộ loadout rẻ mua lại được mỗi trận",
    hours: "~2 tiếng",
    intro: "Người chơi mạnh không phải lúc nào cũng mang đồ tốt nhất, mà biết mang đồ vừa đủ để lời sau mỗi trận.",
    steps: [
      {
        id: "stash",
        title: "Dọn kho",
        time: "15 phút",
        body: (
          <ul>
            <li>Sắp xếp đồ theo nhóm: súng, giáp, đồ hồi máu, vật phẩm nhiệm vụ, đồ để bán.</li>
            <li>Kiểm tra bảng nhiệm vụ trước khi bán bất cứ thứ gì hiếm.</li>
            <li>Bán bớt đồ trùng, giữ lại đủ cho vài trận.</li>
          </ul>
        ),
      },
      {
        id: "kit",
        title: "Lập loadout chuẩn giá rẻ",
        time: "15 phút",
        body: (
          <>
            <p>
              Một bộ gồm súng chính đã độ, giáp vừa phải, balo, đủ đạn và đồ hồi máu. Tính tổng giá trị bộ này — đó là "vé vào cửa" mỗi trận.
            </p>
            <p>Quy tắc: tiền trong kho luôn đủ mua lại bộ này ít nhất 3 lần.</p>
          </>
        ),
        tip: (
          <>
            Dùng <Link to="/tools#loadout">máy tính loadout</Link> để biết bạn mua lại được mấy lần.
          </>
        ),
      },
      {
        id: "ops4",
        title: "4 trận Operations với loadout chuẩn",
        time: "1,5 tiếng",
        body: (
          <ul>
            <li>Ghi lại sau mỗi trận: thoát hay chết, lời hay lỗ.</li>
            <li>Nếu thoát được là đã có lời, đừng tham ở lại lâu.</li>
          </ul>
        ),
        tip: (
          <>
            Ghi vào <Link to="/tools#raidlog">nhật ký raid</Link> — nó tự tính tỉ lệ thoát và lời/lỗ.
          </>
        ),
      },
      {
        id: "coins",
        title: "Kiểm tra Havoc Coins",
        time: "5 phút",
        body: <p>Chưa mua skin. Tiền dùng cho: độ súng, mở rộng kho, đồ tiêu hao.</p>,
      },
    ],
  },
  {
    title: "Đánh theo đội",
    short: "Đồng đội",
    goal: "Đi 3 trận Operations cùng anh em WP",
    hours: "~2 tiếng",
    intro: "Operations được thiết kế cho đội 3 người. Hôm nay hẹn lịch với anh em trong team để đi chung.",
    steps: [
      {
        id: "squad",
        title: "Hẹn đội 3 người trong team",
        time: "Trước buổi chơi",
        body: (
          <p>
            Kết bạn trong game với các thành viên có tên <code>WP | ...</code>. Thống nhất giờ chơi và kênh voice.
          </p>
        ),
      },
      {
        id: "roles",
        title: "Chia vai trong đội",
        time: "5 phút",
        body: (
          <p>
            Mỗi người một vai khác nhau nếu được: một người mở giao tranh, một người trinh sát, một người hỗ trợ. Thống nhất ai là người dẫn đường và ai quyết định lúc nào di tản.
          </p>
        ),
      },
      {
        id: "calls",
        title: "Tập báo vị trí (callout)",
        time: "Trong trận",
        body: (
          <p>
            Nói ngắn: <b>hướng + khoảng cách + số lượng</b>. Ví dụ: "Hai thằng, hướng đông, tòa nhà đỏ, gần." Không nói dài dòng lúc đang bắn nhau.
          </p>
        ),
        tip: <>Dùng la bàn trên màn hình: "hai-bảy-lăm" (275°) chính xác hơn "bên trái" vì mỗi người đang nhìn một hướng khác nhau.</>,
      },
      {
        id: "ops5",
        title: "3 trận Operations theo đội",
        time: "1,5 tiếng",
        body: (
          <ul>
            <li>Đi gần nhau, không tách lẻ.</li>
            <li>Đồng đội ngã: báo vị trí địch trước, cứu sau khi an toàn.</li>
            <li>Chia loot công bằng, ưu tiên đồ nhiệm vụ cho người cần.</li>
          </ul>
        ),
      },
      {
        id: "debrief",
        title: "Rút kinh nghiệm cả đội",
        time: "10 phút",
        body: <p>Sau buổi chơi, mỗi người nói một điều đội làm tốt và một điều cần sửa.</p>,
      },
    ],
  },
  {
    title: "Nâng độ khó",
    short: "Lên cấp",
    goal: "Thử độ khó cao hơn hoặc bản đồ mới",
    hours: "~2 tiếng",
    intro: "Chỉ lên khi tỉ lệ thoát ở độ khó thấp đã ổn. Nếu chưa, cứ lặp lại ngày 3–5, không có gì phải vội.",
    steps: [
      {
        id: "check",
        title: "Tự kiểm tra",
        time: "5 phút",
        body: (
          <>
            <p>
              Trong các trận Operations ngày 4–5, bạn thoát được khoảng một nửa trở lên chưa? Kho đủ mua lại loadout chuẩn ít nhất 3 lần chưa?
            </p>
            <p>
              Nếu <b>chưa</b>: bỏ qua ngày này, chơi lại theo ngày 4.
            </p>
          </>
        ),
        tip: (
          <>
            <Link to="/tools#raidlog">Nhật ký raid</Link> sẽ cho bạn câu trả lời "sẵn sàng lên cấp" dựa trên 10 trận gần nhất.
          </>
        ),
      },
      {
        id: "up",
        title: "Chọn một hướng để thử",
        time: "5 phút",
        body: (
          <>
            <ul>
              <li>Cùng bản đồ quen, độ khó cao hơn: nhiều đồ tốt hơn, AI và người chơi cũng mạnh hơn.</li>
              <li>Hoặc một bản đồ khác đã mở, độ khó thấp.</li>
            </ul>
            <p>
              Chỉ đổi <b>một</b> thứ, đừng đổi cả hai cùng lúc.
            </p>
          </>
        ),
      },
      {
        id: "kit6",
        title: "Nâng loadout một bậc",
        time: "10 phút",
        body: <p>Mang giáp tốt hơn một bậc, thêm đồ hồi máu. Vẫn giữ quy tắc: đồ mang vào là đồ dám mất.</p>,
        tip: <>Ở độ khó cao, đạn quan trọng hơn súng: đạn cấp thấp gần như không xuyên nổi giáp cấp cao.</>,
      },
      {
        id: "ops6",
        title: "3 trận thử sức",
        time: "1,5 tiếng",
        body: <p>Nếu bản đồ mới: dành trận đầu chỉ để đi dạo và học điểm di tản như ngày 3.</p>,
      },
    ],
  },
  {
    title: "Tổng kết tuần",
    short: "Tổng kết",
    goal: "Biết mình mạnh yếu ở đâu và tuần sau luyện gì",
    hours: "~1,5 tiếng",
    intro: "Hết tuần đầu. Hôm nay chơi nhẹ nhàng và nhìn lại.",
    steps: [
      { id: "fun", title: "Chơi chế độ mình thích nhất", time: "1 tiếng", body: <p>Không bài tập gì cả, chỉ chơi cho vui với anh em.</p> },
      {
        id: "self",
        title: "Tự trả lời 3 câu",
        time: "10 phút",
        body: (
          <ul>
            <li>Mình hay chết vì lý do gì nhất: bắn thua, bị đánh úp, hay tham loot?</li>
            <li>Mình thích Warfare hay Operations hơn?</li>
            <li>Operator và súng nào hợp tay nhất?</li>
          </ul>
        ),
        tip: (
          <>
            Làm <Link to="/quiz">bài kiểm tra tân binh</Link> để xem còn lỗ hổng kiến thức nào.
          </>
        ),
      },
      {
        id: "plan",
        title: "Đặt 1 mục tiêu cho tuần 2",
        time: "5 phút",
        body: <p>Một mục tiêu cụ thể thôi, ví dụ: thuộc bản đồ thứ hai, hoặc thoát 7/10 trận, hoặc thử một vai mới.</p>,
        tip: <>Kéo xuống cuối trang xem gợi ý lộ trình tuần 2–4.</>,
      },
      {
        id: "share",
        title: "Báo cáo trong nhóm team WP",
        time: "5 phút",
        body: <p>Chia sẻ tiến độ và mục tiêu tuần 2 trong nhóm để anh em biết ai cần kèm thêm, ai sẵn sàng đi đội độ khó cao.</p>,
        tip: <>Bấm nút "Sao chép báo cáo" ở cuối ngày 7 để dán thẳng vào nhóm chat.</>,
      },
    ],
  },
];

export const TOTAL_STEPS = DAYS.reduce((n, d) => n + d.steps.length, 0);
export const stepKey = (day: number, stepId: string) => `d${day + 1}-${stepId}`;

export const ROADMAP = [
  {
    title: "Tuần 2 — Bản đồ thứ hai",
    body: "Học thêm một bản đồ theo đúng cách ngày 3: một trận đi dạo, một lộ trình cố định, sau đó mới loot. Mục tiêu tỉ lệ thoát ≥ 60% ở độ khó thấp.",
  },
  {
    title: "Tuần 3 — Kinh tế & nhiệm vụ",
    body: "Theo chuỗi nhiệm vụ mùa, ưu tiên nhiệm vụ mở khóa đồ/kho. Tập nhận biết món nhỏ giá trị cao để cất vào két an toàn.",
  },
  {
    title: "Tuần 4 — Độ khó cao theo đội",
    body: "Đi đội 3 người cố định, luyện callout và kỷ luật di tản. Thử độ khó cao với loadout nâng một bậc, vẫn giữ quy tắc mua lại 3 lần.",
  },
  {
    title: "Sau đó — Chuyên môn hóa",
    body: "Chọn 1–2 vai sở trường, luyện thêm khẩu súng thứ hai cho tầm xa hoặc cận chiến, và bắt đầu kèm tân binh mới của team.",
  },
];
