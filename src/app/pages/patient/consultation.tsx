import { useState } from "react";
import { Bot, CalendarPlus, Mic, Paperclip, Send, Stethoscope } from "lucide-react";
import { Link } from "react-router";

type Message = {
  role: "bot" | "user";
  content: string;
};

const quickSymptoms = ["Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau họng", "Ho"];

export default function PatientConsultation() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Chào Nguyễn Văn A, tôi là Trợ lý sức khỏe AI. Bạn đang gặp vấn đề gì về sức khỏe?",
    },
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
            "Tôi đã ghi nhận triệu chứng. Bạn có thể cho biết triệu chứng bắt đầu từ khi nào, mức độ nặng nhẹ và có sốt cao, khó thở hoặc đau ngực không?",
        },
      ]);
    }, 400);
  };

  return (
    <div className="grid min-h-[calc(100vh-112px)] gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="flex min-h-[640px] flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#E2E8F0] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#1E293B]">Tư vấn sức khỏe AI</h1>
              <p className="mt-1 text-sm text-[#64748B]">Phiên tư vấn dành cho bệnh nhân đã đăng nhập</p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#F7FAFC] p-5">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[72%] px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === "user"
                    ? "rounded-[18px] rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] text-white"
                    : "rounded-[18px] rounded-bl-md bg-white text-[#1E293B]"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E2E8F0] bg-white p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickSymptoms.map((symptom) => (
              <button
                key={symptom}
                type="button"
                onClick={() => sendMessage(symptom)}
                className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-sm font-semibold text-[#64748B] hover:bg-[#F2F7FB]"
              >
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
          <h2 className="text-lg font-extrabold text-[#1E293B]">Tóm tắt thông tin</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="rounded-2xl bg-[#F2F7FB] p-4">
              <div className="font-bold text-[#1E293B]">Triệu chứng ghi nhận</div>
              <div className="mt-1 text-[#64748B]">{messages.length > 1 ? "Đã có mô tả ban đầu" : "Chưa có triệu chứng"}</div>
            </div>
            <div className="rounded-2xl bg-[#FFF7E8] p-4 text-[#C77805]">
              <div className="font-bold">Mức độ ưu tiên</div>
              <div className="mt-1">Trung bình, tiếp tục theo dõi thêm.</div>
            </div>
            <div className="rounded-2xl border border-[#BEF4E7] bg-[#E8FFF9] p-4 text-[#148E77]">
              <div className="font-bold">Khuyến nghị chăm sóc</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 leading-6">
                <li>Nghỉ ngơi, tránh làm việc quá sức.</li>
                <li>Uống đủ nước trong ngày.</li>
                <li>Liên hệ bác sĩ nếu triệu chứng nặng hơn.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FBD0D0] bg-[#FFECEC] p-4 text-[#D42D2D]">
              Kết quả tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ.
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <h2 className="text-sm font-extrabold text-[#1E293B]">Hỗ trợ tiếp theo</h2>
          <div className="mt-4 space-y-3">
            <Link to="/patient/book" className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#2F80ED] text-sm font-bold text-[#1C64D1] hover:bg-[#EAF3FF]">
              <CalendarPlus className="h-4 w-4" />
              Đặt lịch khám
            </Link>
            <Link to="/patient/doctors" className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#2F80ED] text-sm font-bold text-white hover:bg-[#1C64D1]">
              <Stethoscope className="h-4 w-4" />
              Kết nối bác sĩ
            </Link>
          </div>
        </section>
      </aside>
    </div>
  );
}
