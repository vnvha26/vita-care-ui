import { useState } from "react";
import { Link } from "react-router";
import { Bot, Calendar, ClipboardList, Database, LayoutDashboard, Lock, LogIn, Mic, Paperclip, Send, ShieldCheck } from "lucide-react";
import { LoginModal } from "../../components/auth/login-modal";

type Message = {
  role: "bot" | "user";
  content: string;
};

const quickSymptoms = ["Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau họng", "Ho"];

const lockedItems = [
  { title: "Trang chủ", icon: LayoutDashboard },
  { title: "Lịch khám", icon: Calendar },
  { title: "Lịch sử khám", icon: ClipboardList },
  { title: "Dữ liệu y tế", icon: Database },
];

export default function GuestChat() {
  const [input, setInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Chào bạn, tôi là Trợ lý sức khỏe AI. Bạn đang gặp vấn đề gì về sức khỏe?" },
  ]);

  const sendMessage = (value = input) => {
    if (!value.trim()) return;
    setMessages((previous) => [...previous, { role: "user", content: value }]);
    setInput("");
    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          content:
            "Tôi đã ghi nhận triệu chứng. Bạn có thể cho biết triệu chứng bắt đầu từ khi nào, mức độ nặng nhẹ và có sốt, khó thở hoặc đau ngực không?",
        },
      ]);
    }, 400);
  };

  return (
    <div className="flex min-h-screen bg-[#F7FAFC] font-sans text-[#1E293B]">
      <aside className="hidden min-h-screen w-[260px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white/90 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] backdrop-blur md:flex">
        <Link to="/" className="flex h-16 items-center gap-3 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold">VitaCare AI</h1>
            <p className="text-xs font-semibold text-[#64748B]">Khách vãng lai</p>
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
          <div className="rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1C64D1]">Khách vãng lai</div>
        </header>

        <div className="grid min-h-0 flex-1 gap-5 pt-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="flex min-h-[620px] flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="border-b border-[#E2E8F0] p-5">
              <h1 className="text-xl font-extrabold">Cuộc trò chuyện mới</h1>
              <p className="mt-1 text-sm text-[#64748B]">Phản hồi tự động bởi Trợ lý AI</p>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[72%] px-4 py-3 text-sm leading-6 shadow-sm ${message.role === "user" ? "rounded-[18px] rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] text-white" : "rounded-[18px] rounded-bl-md bg-[#F2F7FB]"}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E2E8F0] bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickSymptoms.map((symptom) => (
                  <button key={symptom} type="button" onClick={() => sendMessage(symptom)} className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-sm font-semibold text-[#64748B] hover:bg-[#F2F7FB]">
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
                <button type="button" onClick={() => sendMessage()} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2F80ED] text-white hover:bg-[#1C64D1]">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-lg font-extrabold">Patient Insight</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl bg-[#F2F7FB] p-4">
                  <div className="font-bold">Triệu chứng ghi nhận</div>
                  <div className="mt-1 text-[#64748B]">{messages.length > 1 ? "Đã có mô tả ban đầu" : "Chưa có triệu chứng"}</div>
                </div>
                <div className="rounded-2xl bg-[#FFF7E8] p-4 text-[#C77805]">
                  <div className="font-bold">Mức độ ưu tiên</div>
                  <div className="mt-1">Trung bình, theo dõi thêm 24h.</div>
                </div>
                <div className="rounded-2xl border border-[#BEF4E7] bg-[#E8FFF9] p-4 text-[#148E77]">
                  <div className="font-bold">Khuyến nghị chăm sóc tại nhà</div>
                  <ul className="mt-2 list-disc space-y-2 pl-5 leading-6">
                    <li>Nghỉ ngơi, tránh làm việc quá sức.</li>
                    <li>Uống đủ nước trong ngày.</li>
                    <li>Ăn thức ăn mềm, dễ tiêu.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#FBD0D0] bg-[#FFECEC] p-4 text-[#D42D2D]">
                  Kết quả tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ.
                </div>
              </div>
            </section>
            <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-sm font-extrabold">Hỗ trợ tiếp theo</h2>
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="flex h-11 w-full items-center justify-center rounded-full border border-[#2F80ED] text-sm font-bold text-[#1C64D1] hover:bg-[#EAF3FF]"
                >
                  Đặt lịch khám
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#2F80ED] text-sm font-bold text-white hover:bg-[#1C64D1]"
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
