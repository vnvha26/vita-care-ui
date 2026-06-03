import { useState } from "react";
import { Bot, CalendarPlus, FileText, FolderOpen, Image, Mic, Paperclip, Send, Stethoscope } from "lucide-react";
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
const attachmentOptions = [
  { label: "Ảnh", icon: Image },
  { label: "Tệp", icon: FileText },
  { label: "Thư mục", icon: FolderOpen },
];

const legacyAiHistories = [
  ["AI Health Assistant", "Phân tích ho, đau họng và sốt nhẹ", "Hôm nay"],
  ["AI Health Assistant", "Tư vấn đau bụng sau ăn", "20/05/2026"],
];

const initialAiSessions: ChatSession[] = [
  {
    id: "ai-current",
    name: "AI Health Assistant",
    topic: "Phi\u00ean t\u01b0 v\u1ea5n nhanh v\u1edbi tr\u1ee3 l\u00fd AI",
    date: "H\u00f4m nay",
    messages: [
      {
        role: "bot",
        content: "Ch\u00e0o Nguy\u1ec5n V\u0103n A, t\u00f4i l\u00e0 tr\u1ee3 l\u00fd s\u1ee9c kh\u1ecfe AI. B\u1ea1n \u0111ang g\u1eb7p v\u1ea5n \u0111\u1ec1 g\u00ec v\u1ec1 s\u1ee9c kh\u1ecfe?",
      },
    ],
  },
  {
    id: "ai-old-1",
    name: "AI Health Assistant",
    topic: "Ph\u00e2n t\u00edch ho, \u0111au h\u1ecdng v\u00e0 s\u1ed1t nh\u1eb9",
    date: "25/05/2026",
    messages: [
      { role: "user", content: "T\u00f4i b\u1ecb ho khan, \u0111au h\u1ecdng v\u00e0 s\u1ed1t nh\u1eb9 t\u1eeb h\u00f4m qua." },
      {
        role: "bot",
        content: "Tri\u1ec7u ch\u1ee9ng c\u00f3 th\u1ec3 li\u00ean quan vi\u00eam h\u1ecdng ho\u1eb7c nhi\u1ec5m virus nh\u1eb9. B\u1ea1n n\u00ean u\u1ed1ng nhi\u1ec1u n\u01b0\u1edbc, ngh\u1ec9 ng\u01a1i v\u00e0 theo d\u00f5i nhi\u1ec7t \u0111\u1ed9.",
      },
      {
        role: "bot",
        content: "N\u1ebfu s\u1ed1t tr\u00ean 38.5\u00b0C, kh\u00f3 th\u1edf, \u0111au ng\u1ef1c ho\u1eb7c tri\u1ec7u ch\u1ee9ng k\u00e9o d\u00e0i qu\u00e1 3 ng\u00e0y, b\u1ea1n n\u00ean \u0111\u1eb7t l\u1ecbch kh\u00e1m.",
      },
    ],
  },
  {
    id: "ai-old-2",
    name: "AI Health Assistant",
    topic: "T\u01b0 v\u1ea5n \u0111au b\u1ee5ng sau \u0103n",
    date: legacyAiHistories[1][2],
    messages: [
      { role: "user", content: "Sau khi \u0103n t\u1ed1i t\u00f4i hay \u0111au \u00e2m \u1ec9 v\u00f9ng b\u1ee5ng tr\u00ean v\u00e0 h\u01a1i bu\u1ed3n n\u00f4n." },
      {
        role: "bot",
        content: "B\u1ea1n n\u00ean theo d\u00f5i m\u00f3n \u0103n g\u00e2y kh\u00f3 ch\u1ecbu, tr\u00e1nh \u0103n qu\u00e1 no v\u00e0 h\u1ea1n ch\u1ebf \u0111\u1ed3 cay, chua, nhi\u1ec1u d\u1ea7u m\u1ee1.",
      },
      {
        role: "bot",
        content: "N\u1ebfu \u0111au t\u0103ng, n\u00f4n nhi\u1ec1u, \u0111i ngo\u00e0i ph\u00e2n \u0111en ho\u1eb7c s\u00fat c\u00e2n, b\u1ea1n c\u1ea7n kh\u00e1m tr\u1ef1c ti\u1ebfp s\u1edbm.",
      },
    ],
  },
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
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedAiSessionId, setSelectedAiSessionId] = useState(initialAiSessions[0].id);
  const [aiSessions, setAiSessions] = useState<ChatSession[]>(initialAiSessions);
  const [selectedDoctorSessionId, setSelectedDoctorSessionId] = useState(initialDoctorSessions[0].id);
  const [doctorSessions, setDoctorSessions] = useState<ChatSession[]>(initialDoctorSessions);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Chào Nguyễn Văn A, tôi là trợ lý sức khỏe AI. Bạn đang gặp vấn đề gì về sức khỏe?",
    },
  ]);

  const selectedAiSession = aiSessions.find((session) => session.id === selectedAiSessionId) ?? aiSessions[0];
  const selectedDoctorSession = doctorSessions.find((session) => session.id === selectedDoctorSessionId) ?? doctorSessions[0];
  const currentMessages = mode === "ai" ? selectedAiSession.messages : selectedDoctorSession.messages;
  const currentInput = mode === "ai" ? aiInput : doctorInput;
  const setCurrentInput = mode === "ai" ? setAiInput : setDoctorInput;

  const sendAiMessage = (value = aiInput) => {
    if (!value.trim()) return;

    setAiSessions((sessions) =>
      sessions.map((session) =>
        session.id === selectedAiSessionId ? { ...session, messages: [...session.messages, { role: "user", content: value }] } : session
      )
    );
    setAiInput("");
    const aiAutoReply =
      "T\u00f4i \u0111\u00e3 ghi nh\u1eadn tri\u1ec7u ch\u1ee9ng. B\u1ea1n c\u00f3 th\u1ec3 cho bi\u1ebft tri\u1ec7u ch\u1ee9ng b\u1eaft \u0111\u1ea7u t\u1eeb khi n\u00e0o, m\u1ee9c \u0111\u1ed9 n\u1eb7ng nh\u1eb9 v\u00e0 c\u00f3 s\u1ed1t cao, kh\u00f3 th\u1edf ho\u1eb7c \u0111au ng\u1ef1c kh\u00f4ng?";

    setTimeout(() => {
      setAiSessions((sessions) =>
        sessions.map((session) =>
          session.id === selectedAiSessionId
            ? {
                ...session,
                messages: [...session.messages, { role: "bot", content: aiAutoReply }],
              }
            : session
        )
      );
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
                {mode === "ai" ? selectedAiSession.topic : selectedDoctorSession.topic}
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
            <div className="relative">
              {showAttachMenu && (
                <div className="absolute bottom-14 left-0 z-20 w-44 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_14px_40px_rgba(15,23,42,0.12)]">
                  {attachmentOptions.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setShowAttachMenu(false)}
                      className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-[#1E293B] hover:bg-[#F2F7FB]"
                    >
                      <Icon className="h-4 w-4 text-[#2F80ED]" />
                      {label}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowAttachMenu((current) => !current)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#64748B] hover:bg-[#EAF3FF] hover:text-[#2F80ED]"
              >
                <Paperclip className="h-5 w-5" />
              </button>
            </div>
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
                ? aiSessions.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setSelectedAiSessionId(session.id)}
                      className={`block w-full rounded-2xl border p-4 text-left transition ${
                        selectedAiSessionId === session.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
                      }`}
                    >
                      <p className="text-sm font-extrabold leading-6 text-[#1E293B]">{session.topic}</p>
                      <p className="mt-2 text-xs font-bold text-[#94A3B8]">{session.date}</p>
                    </button>
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
                {(mode === "ai" ? selectedAiSession.messages : selectedDoctorSession.messages).some((message) => message.role === "user") ? "Đã có mô tả ban đầu" : "Chưa có triệu chứng"}
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
