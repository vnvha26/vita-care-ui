import { useState } from "react";
import { Bot, CalendarPlus, Mic, Paperclip, Send, Stethoscope } from "lucide-react";
import { Link, useSearchParams } from "react-router";

type Mode = "ai" | "doctor";
type MessageRole = "bot" | "doctor" | "user";

type Message = {
  role: MessageRole;
  content: string;
};

type ChatSession = {
  id: string;
  name: string;
  topic: string;
  date: string;
  messages: Message[];
};

const quickSymptoms = ["Sốt", "Đau đầu", "Buồn nôn", "Chóng mặt", "Đau họng", "Ho"];

const aiHistories = [
  ["AI Health Assistant", "Phân tích ho, đau họng và sốt nhẹ", "Hôm nay"],
  ["AI Health Assistant", "Tư vấn đau bụng sau ăn", "20/05/2026"],
];

const initialDoctorSessions: ChatSession[] = [
  {
    id: "doctor-current",
    name: "BS. Trần Thị B",
    topic: "Tư vấn đau dạ dày và trào ngược",
    date: "Hôm nay",
    messages: [
      {
        role: "doctor",
        content: "Thanh toán đã được xác nhận. Bạn mô tả kỹ triệu chứng, thuốc đang dùng và kết quả khám gần nhất để bác sĩ tư vấn nhé.",
      },
      {
        role: "user",
        content: "Em hay đau vùng thượng vị sau ăn và bị ợ chua nhiều vào buổi tối.",
      },
      {
        role: "doctor",
        content: "Triệu chứng khá giống trào ngược dạ dày. Bạn nên tránh ăn sát giờ ngủ, giảm đồ chua cay và theo dõi thêm mức độ đau trong 3 ngày tới.",
      },
    ],
  },
  {
    id: "doctor-old-1",
    name: "BS. Nguyễn Văn A",
    topic: "Theo dõi huyết áp và nhịp tim",
    date: "12/05/2026",
    messages: [
      {
        role: "user",
        content: "Huyết áp buổi sáng của em khoảng 145/90, thỉnh thoảng hơi hồi hộp.",
      },
      {
        role: "doctor",
        content: "Bạn ghi lại huyết áp sáng và tối trong 7 ngày, hạn chế cà phê và tái khám nếu chỉ số vẫn trên 140/90.",
      },
    ],
  },
  {
    id: "doctor-old-2",
    name: "BS. Lê Minh C",
    topic: "Tư vấn đau đầu và mất ngủ",
    date: "02/05/2026",
    messages: [
      {
        role: "user",
        content: "Em mất ngủ gần một tuần, sáng dậy hay đau đầu.",
      },
      {
        role: "doctor",
        content: "Bạn thử cố định giờ ngủ, tránh màn hình trước khi ngủ 60 phút. Nếu đau đầu tăng hoặc nôn ói thì cần khám trực tiếp.",
      },
    ],
  },
];

export default function PatientConsultation() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>(() => (searchParams.get("mode") === "doctor" ? "doctor" : "ai"));
  const [aiInput, setAiInput] = useState("");
  const [doctorInput, setDoctorInput] = useState("");
  const [selectedDoctorSessionId, setSelectedDoctorSessionId] = useState(initialDoctorSessions[0].id);
  const [doctorSessions, setDoctorSessions] = useState<ChatSession[]>(initialDoctorSessions);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Chào Nguyễn Văn A, tôi là trợ lý sức khỏe AI. Bạn đang gặp vấn đề gì về sức khỏe?",
    },
  ]);

  const selectedDoctorSession = doctorSessions.find((session) => session.id === selectedDoctorSessionId) ?? doctorSessions[0];
  const currentMessages = mode === "ai" ? aiMessages : selectedDoctorSession.messages;
  const currentInput = mode === "ai" ? aiInput : doctorInput;
  const setCurrentInput = mode === "ai" ? setAiInput : setDoctorInput;

  const sendAiMessage = (value = aiInput) => {
    if (!value.trim()) return;

    setAiMessages((previous) => [...previous, { role: "user", content: value }]);
    setAiInput("");

    setTimeout(() => {
      setAiMessages((previous) => [
        ...previous,
        {
          role: "bot",
          content:
            "Tôi đã ghi nhận triệu chứng. Bạn có thể cho biết triệu chứng bắt đầu từ khi nào, mức độ nặng nhẹ và có sốt cao, khó thở hoặc đau ngực không?",
        },
      ]);
    }, 300);
  };

  const sendDoctorMessage = () => {
    const text = doctorInput.trim();
    if (!text) return;

    setDoctorSessions((sessions) =>
      sessions.map((session) =>
        session.id === selectedDoctorSessionId ? { ...session, messages: [...session.messages, { role: "user", content: text }] } : session
      )
    );
    setDoctorInput("");
  };

  const handleSend = (value?: string) => {
    if (mode === "ai") {
      sendAiMessage(value ?? aiInput);
      return;
    }

    sendDoctorMessage();
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section id="doctor-chat" className="flex h-[calc(100vh-150px)] min-h-[560px] max-h-[700px] scroll-mt-6 flex-col overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#E2E8F0] p-5">
          <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            <button
              type="button"
              onClick={() => setMode("ai")}
              className={`h-11 rounded-xl text-sm font-extrabold transition ${
                mode === "ai" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Tư vấn sức khỏe với AI
            </button>
            <button
              type="button"
              onClick={() => setMode("doctor")}
              className={`h-11 rounded-xl text-sm font-extrabold transition ${
                mode === "doctor" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Tư vấn chuyên sâu với bác sĩ
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
              {mode === "ai" ? <Bot className="h-6 w-6" /> : <Stethoscope className="h-6 w-6" />}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#1E293B]">
                {mode === "ai" ? "Tư vấn sức khỏe AI" : selectedDoctorSession.name}
              </h1>
              <p className="mt-1 text-sm text-[#64748B]">
                {mode === "ai" ? "Phiên tư vấn nhanh với trợ lý AI" : selectedDoctorSession.topic}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#F7FAFC] p-5">
          {currentMessages.map((message, index) => (
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
          {mode === "ai" && (
            <div className="mb-3 flex flex-wrap gap-2">
              {quickSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => sendAiMessage(symptom)}
                  className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-sm font-semibold text-[#64748B] hover:bg-[#F2F7FB]"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#64748B]">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              value={currentInput}
              onChange={(event) => setCurrentInput(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSend()}
              placeholder={mode === "ai" ? "Nhập tình trạng sức khỏe của bạn..." : "Nhập tin nhắn với bác sĩ..."}
              className="h-12 flex-1 rounded-full border border-[#E2E8F0] px-5 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED] disabled:bg-[#F7FAFC] disabled:text-[#94A3B8]"
            />
            <button className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#64748B] sm:flex">
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleSend()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2F80ED] text-white hover:bg-[#1C64D1] disabled:bg-[#CFE3FF]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-5">
        {mode === "ai" || mode === "doctor" ? (
          <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <h2 className="text-lg font-extrabold text-[#1E293B]">
              {mode === "ai" ? "Lịch sử chat với AI" : "Lịch sử chat với bác sĩ"}
            </h2>
            <div className="mt-4 space-y-3">
              {mode === "ai"
                ? aiHistories.map(([name, topic, date]) => (
                    <div key={`${name}-${date}`} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
                      <p className="font-extrabold text-[#1E293B]">{name}</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-[#64748B]">{topic}</p>
                      <p className="mt-2 text-xs font-bold text-[#94A3B8]">{date}</p>
                    </div>
                  ))
                : doctorSessions.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setSelectedDoctorSessionId(session.id)}
                      className={`block w-full rounded-2xl border p-4 text-left transition ${
                        selectedDoctorSessionId === session.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
                      }`}
                    >
                      <p className="font-extrabold text-[#1E293B]">{session.name}</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-[#64748B]">{session.topic}</p>
                      <p className="mt-2 text-xs font-bold text-[#94A3B8]">{session.date}</p>
                    </button>
                  ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <h2 className="text-lg font-extrabold text-[#1E293B]">Tóm tắt thông tin</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="rounded-2xl bg-[#F2F7FB] p-4">
              <div className="font-bold text-[#1E293B]">Triệu chứng ghi nhận</div>
              <div className="mt-1 text-[#64748B]">
                {(mode === "ai" ? aiMessages : selectedDoctorSession.messages).some((message) => message.role === "user") ? "Đã có mô tả ban đầu" : "Chưa có triệu chứng"}
              </div>
            </div>
            <div className="rounded-2xl bg-[#FFF7E8] p-4 text-[#C77805]">
              <div className="font-bold">Mức độ ưu tiên</div>
              <div className="mt-1">{mode === "ai" ? "Trung bình, tiếp tục theo dõi thêm." : "Bác sĩ đang theo dõi phiên tư vấn."}</div>
            </div>
            <div className="rounded-2xl border border-[#BEF4E7] bg-[#E8FFF9] p-4 text-[#148E77]">
              <div className="font-bold">Khuyến nghị chăm sóc</div>
              <ul className="mt-2 list-disc space-y-2 pl-5 leading-6">
                <li>Nghỉ ngơi, tránh làm việc quá sức.</li>
                <li>Uống đủ nước trong ngày.</li>
                <li>Theo dõi dấu hiệu nặng hơn để liên hệ bác sĩ.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FBD0D0] bg-[#FFECEC] p-4 text-[#D42D2D]">
              {mode === "ai"
                ? "Kết quả tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ."
                : "Phiên tư vấn chuyên sâu được lưu vào lịch sử tư vấn của bạn."}
            </div>
          </div>
        </section>

        {mode === "ai" ? (
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
        ) : null}
      </aside>
    </div>
  );
}
