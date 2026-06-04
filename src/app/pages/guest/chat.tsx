import { useState } from "react";
import { Link } from "react-router";
import { Bot, Calendar, ClipboardList, Database, LayoutDashboard, Lock, LogIn, Mic, Paperclip, Send, ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import { LoginModal } from "../../components/auth/login-modal";

type Message = {
  role: "bot" | "user";
  content: string;
  time: string;
};

const quickSymptoms = ["Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau họng", "Ho"];

const lockedItems = [
  { title: "Trang chủ", icon: LayoutDashboard },
  { title: "Lịch khám", icon: Calendar },
  { title: "Lịch sử khám", icon: ClipboardList },
  { title: "Dữ liệu y tế", icon: Database },
];

const symptomResponses: Record<string, { ai: string; followUp: string; urgency: "thap" | "trungbinh" | "cao" }> = {
  "sốt": {
    ai: "Tôi đã ghi nhận triệu chứng sốt. Để đánh giá chính xác hơn, bạn cho tôi biết: Bạn sốt bao lâu rồi, nhiệt độ bao nhiêu, và có triệu chứng kèm theo như đau đầu, đau họng, ho hay không?",
    followUp: "Sốt kéo dài trên 3 ngày hoặc kèm khó thở, co giật cần đi khám ngay.",
    urgency: "trungbinh",
  },
  "đau đầu": {
    ai: "Đau đầu có nhiều nguyên nhân khác nhau. Bạn cho biết: Đau đầu ở vị trí nào (trán, thái dương, sau gáy), mức độ đau như thế nào (âm ỉ, dữ dội, từng cơn), và có kèm buồn nôn, chóng mặt hay không?",
    followUp: "Đau đầu dữ dội kèm nôn ói, mất ý thức hoặc sốt cao cần đi khám ngay.",
    urgency: "trungbinh",
  },
  "buồn nôn": {
    ai: "Buồn nôn có thể do nhiều nguyên nhân: tiêu hóa, thần kinh, hoặc tác dụng phụ của thuốc. Bạn cho biết: Buồn nôn có kèm đau bụng, đau đầu, hoặc sốt không, và triệu chứng xuất hiện sau khi ăn hay không?",
    followUp: "Nôn ói dữ dội kèm đau bụng dữ dội hoặc không uống được nước cần đi khám.",
    urgency: "thap",
  },
  "chóng mặt": {
    ai: "Chóng mặt thường liên quan đến huyết áp, tai trong hoặc thiếu nước. Bạn cho biết: Chóng mặt có kèm ù tai, mất thăng bằng, hoặc nhìn đôi không, và có đang dùng thuốc huyết áp hay thuốc an thần không?",
    followUp: "Chóng mặt đột ngột kèm tê bì, mất ý thức hoặc đau ngực cần cấp cứu ngay.",
    urgency: "cao",
  },
  "đau họng": {
    ai: "Đau họng rất thường gặp, có thể do viêm họng virus hoặc vi khuẩn. Bạn cho biết: Đau họng có kèm ho, sốt, nuốt khó, hoặc amidan sưng đỏ không, và triệu chứng kéo dài bao lâu rồi?",
    followUp: "Đau họng kéo dài trên 7 ngày, khó nuốt, sốt cao hoặc có mủ trắng cần đi khám.",
    urgency: "thap",
  },
  "ho": {
    ai: "Ho có thể do cảm lạnh, dị ứng, hoặc các bệnh đường hô hấp. Bạn cho biết: Ho khan hay có đờm, màu đờm gì (trắng, vàng, xanh), có kèm khó thở, đau ngực, hoặc sốt không?",
    followUp: "Ho kéo dài trên 2 tuần, ho ra máu, hoặc khó thở cần đi khám chuyên khoa hô hấp.",
    urgency: "trungbinh",
  },
};

const generalResponses = [
  "Tôi đã ghi nhận. Bạn có thể mô tả chi tiết hơn về triệu chứng — khi nào bắt đầu, mức độ nặng nhẹ thế nào, có triệu chứng kèm theo không?",
  "Cảm ơn bạn. Để tư vấn chính xác hơn, bạn cho biết thêm: triệu chứng xuất hiện bao lâu rồi và có dùng thuốc gì không?",
  "Tôi hiểu rồi. Bạn có thể cho tôi biết thêm về tần suất và thời điểm triệu chứng xuất hiện không?",
];

function getTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function getAiResponse(userText: string): { text: string; urgency: "thap" | "trungbinh" | "cao" } {
  const lower = userText.toLowerCase();
  for (const [key, data] of Object.entries(symptomResponses)) {
    if (lower.includes(key)) {
      return { text: data.ai, urgency: data.urgency };
    }
  }
  return { text: generalResponses[Math.floor(Math.random() * generalResponses.length)], urgency: "thap" };
}

const urgencyConfig = {
  thap: { label: "Theo dõi tại nhà", color: "bg-[#E8FFF9] border-[#BEF4E7] text-[#148E77]", icon: "🩹" },
  trungbinh: { label: "Nên đặt lịch khám", color: "bg-[#FFF7E8] border-[#FDE7B8] text-[#C77805]", icon: "⏰" },
  cao: { label: "Nên đi khám sớm", color: "bg-[#FFECEC] border-[#FBD0D0] text-[#D42D2D]", icon: "🚨" },
};

export default function GuestChat() {
  const [input, setInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Chào bạn, tôi là Trợ lý sức khỏe AI của VitaCare. Bạn đang gặp vấn đề gì về sức khỏe? Hãy mô tả triệu chứng hoặc chọn nhanh bên dưới nhé.", time: getTime() },
  ]);
  const [currentUrgency, setCurrentUrgency] = useState<"thap" | "trungbinh" | "cao">("thap");

  const sendMessage = (value = input) => {
    if (!value.trim()) return;
    const userMsg: Message = { role: "user", content: value.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const { text: aiText, urgency } = getAiResponse(value);
    setCurrentUrgency(urgency);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: aiText, time: getTime() }]);
    }, 400);
  };

  const currentData = symptomResponses[Object.keys(symptomResponses).find((k) => messages[messages.length - 1]?.content.toLowerCase().includes(k)) ?? ""] ?? null;
  const urgencyInfo = urgencyConfig[currentUrgency];

  return (
    <div className="flex min-h-screen bg-[#F7FAFC] font-sans text-[#1E293B]">
      <aside className="hidden min-h-screen w-[260px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white/90 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] backdrop-blur md:flex">
        <Link to="/" className="flex h-16 items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold">VitaCare AI</h1>
          </div>
        </Link>

        <nav className="mt-8 flex-1 space-y-2">
          <div className="flex h-[46px] items-center gap-3 rounded-[14px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] px-[14px] text-sm font-bold text-[#1C64D1]">
            <Bot className="h-5 w-5" />
            Tư vấn sức khỏe
          </div>
          {lockedItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex h-[46px] items-center justify-between rounded-[14px] px-[14px] text-sm font-semibold text-[#94A3B8]">
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {item.title}
                </span>
                <Lock className="h-3.5 w-3.5" />
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setShowLogin(true)}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#2F80ED] text-sm font-extrabold text-white hover:bg-[#1C64D1]"
        >
          <LogIn className="h-4 w-4" />
          Đăng nhập
        </button>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col p-5">
        <header className="flex h-[72px] items-center justify-between rounded-[22px] border border-[#E2E8F0] bg-white/90 px-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur">
          <div className="min-w-0">
            <Link to="/" className="rounded-full bg-[#F2F7FB] px-4 py-2 text-sm font-semibold text-[#64748B]">
              Trang chủ
            </Link>
            <span className="ml-2 hidden text-sm font-bold text-[#1C64D1] sm:inline">/ Tư vấn sức khỏe</span>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="flex min-h-[620px] flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="border-b border-[#E2E8F0] p-5">
              <h1 className="text-xl font-extrabold">Cuộc trò chuyện mới</h1>
              <p className="mt-1 text-sm text-[#64748B]">Phản hồi tự động bởi Trợ lý AI · {messages.length - 1} tin nhắn</p>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.role === "user"
                      ? "rounded-[18px] rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] text-white"
                      : "rounded-[18px] rounded-bl-md bg-[#F2F7FB]"
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E2E8F0] bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickSymptoms.map((symptom) => (
                  <button key={symptom} type="button" onClick={() => sendMessage(symptom)} className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-sm font-semibold text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B] transition">
                    {symptom}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#64748B]">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                  placeholder="Nhập tình trạng sức khỏe của bạn tại đây..."
                  className="h-12 flex-1 rounded-full border border-[#E2E8F0] px-5 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
                <button className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#64748B] sm:flex">
                  <Mic className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => sendMessage()} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2F80ED] text-white hover:bg-[#1C64D1] transition">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-extrabold">Phân tích triệu chứng</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className={`rounded-2xl border p-4 ${urgencyInfo.color}`}>
                  <div className="flex items-center gap-2 font-bold">
                    <span>{urgencyInfo.icon}</span>
                    {urgencyInfo.label}
                  </div>
                  <div className="mt-2 text-xs leading-relaxed opacity-80">
                    {currentUrgency === "cao"
                      ? "Triệu chứng của bạn có thể liên quan đến vấn đề nghiêm trọng. Hãy đặt lịch khám sớm."
                      : currentUrgency === "trungbinh"
                      ? "Nên theo dõi và đặt lịch khám nếu triệu chứng kéo dài."
                      : "Triệu chứng nhẹ, có thể theo dõi tại nhà trước."}
                  </div>
                </div>

                {messages.length > 1 && (
                  <div className="rounded-2xl bg-[#F2F7FB] p-4">
                    <div className="flex items-center gap-2 font-bold">
                      <Clock className="h-4 w-4 text-[#64748B]" />
                      Triệu chứng ghi nhận
                    </div>
                    <div className="mt-2 space-y-1.5 text-[#64748B]">
                      {quickSymptoms.filter((s) => messages.some((m) => m.content.toLowerCase().includes(s.toLowerCase()))).map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2F80ED]" />
                          {s}
                        </div>
                      ))}
                      {messages.length === 2 && <div className="text-xs text-[#94A3B8]">Đang khai thác thêm thông tin...</div>}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-[#BEF4E7] bg-[#E8FFF9] p-4">
                  <div className="font-bold text-[#148E77]">Khuyến nghị chăm sóc tại nhà</div>
                  <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed text-[#148E77]">
                    <li>Nghỉ ngơi đầy đủ, tránh làm việc quá sức.</li>
                    <li>Uống đủ nước (1.5–2 lít/ngày).</li>
                    <li>Ăn uống lành mạnh, tránh thức ăn cay nóng, nhiều dầu mỡ.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#FBD0D0] bg-[#FFECEC] p-4 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-[#D42D2D]" />
                  <p className="text-xs leading-relaxed text-[#D42D2D]">
                    Kết quả tư vấn AI chỉ mang tính tham khảo, <strong>không thay thế</strong> chẩn đoán và đơn thuốc của bác sĩ.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-sm font-extrabold">Hỗ trợ tiếp theo</h2>
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="flex h-11 w-full items-center justify-center rounded-full border border-[#2F80ED] text-sm font-bold text-[#1C64D1] hover:bg-[#EAF3FF] transition"
                >
                  Đặt lịch khám
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#2F80ED] text-sm font-bold text-white hover:bg-[#1C64D1] transition"
                >
                  Kết nối bác sĩ
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
