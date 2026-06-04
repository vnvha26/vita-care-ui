import { useState } from "react";
import { Bot, CalendarDays, Hospital, Send, Users } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

const quickPrompts = [
  "Số lượng bệnh nhân hôm nay?",
  "Báo cáo lịch khám ngày mai",
  "Thống kê ca bệnh khẩn cấp",
  "Tình trạng các phòng khám",
];

type Message = {
  role: "assistant" | "manager";
  content: string;
  time: string;
};

export default function ManagerChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý quản lý VitaCare AI. Tôi có thể giúp bạn tra cứu lịch khám, tình trạng phòng khám, dữ liệu bệnh nhân và báo cáo vận hành.",
      time: "17:26",
    },
  ]);

  const askAssistant = (value = input) => {
    const question = value.trim();
    if (!question) return;

    setMessages((current) => [...current, { role: "manager", content: question, time: "17:27" }]);
    setInput("");

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Tôi đã ghi nhận yêu cầu. Hiện có 19 lịch hẹn trong ngày, 4 bác sĩ đang trực và 2 lịch cần xác nhận lại trước 10:00.",
          time: "17:28",
        },
      ]);
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-112px)]">
      <PageHeader
        title="Trang chủ quản lý"
        description="Trợ lý AI hỗ trợ điều phối lịch khám, bác sĩ, dữ liệu vận hành và báo cáo phòng khám."
      />

      <section className="relative overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#CFE3FF_0,transparent_34%),radial-gradient(circle_at_78%_24%,#F1EFFF_0,transparent_30%),radial-gradient(circle_at_80%_85%,#E8D7FF_0,transparent_34%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-4xl flex-col px-5 py-10">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#2F80ED] shadow-sm ring-1 ring-[#CFE3FF]">
              <Bot className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-3xl font-extrabold text-[#1E293B]">Bạn cần hỗ trợ gì?</h1>
            <p className="mt-2 text-sm font-medium text-[#64748B]">Chọn gợi ý nhanh hoặc nhập yêu cầu quản lý phòng khám.</p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askAssistant(prompt)}
                className="rounded-2xl border border-white/70 bg-white/80 px-5 py-4 text-left text-sm font-bold text-[#1E293B] shadow-sm backdrop-blur hover:bg-white"
              >
                <span className="mr-2 text-[#2F80ED]">→</span>
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-8 flex-1 space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={`flex ${message.role === "manager" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] rounded-2xl px-5 py-4 text-sm leading-6 shadow-sm ${
                    message.role === "manager" ? "rounded-tr-sm bg-[#2F80ED] text-white" : "rounded-tl-sm bg-white text-[#1E293B]"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`mt-2 text-xs font-bold ${message.role === "manager" ? "text-white/75" : "text-[#94A3B8]"}`}>{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 w-full max-w-3xl rounded-full border border-[#E2E8F0] bg-white p-2 shadow-sm">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && askAssistant()}
                placeholder="Nhập yêu cầu cho AI..."
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
              />
              <ActionButton icon={<Send className="h-4 w-4" />} onClick={() => askAssistant()}>
                Gửi
              </ActionButton>
            </div>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-[#64748B]">AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.</p>
        </div>
      </section>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <SectionCard>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#2F80ED]" />
            <div>
              <p className="text-sm font-bold text-[#64748B]">Bệnh nhân hôm nay</p>
              <p className="mt-1 text-2xl font-extrabold text-[#1E293B]">125</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[#27C3A2]" />
            <div>
              <p className="text-sm font-bold text-[#64748B]">Lịch cần xác nhận</p>
              <p className="mt-1 text-2xl font-extrabold text-[#1E293B]">7</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard>
          <div className="flex items-center gap-3">
            <Hospital className="h-5 w-5 text-[#8B7CF6]" />
            <div>
              <p className="text-sm font-bold text-[#64748B]">Trạng thái phòng khám</p>
              <div className="mt-1"><StatusBadge tone="green">Ổn định</StatusBadge></div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
