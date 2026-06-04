import { useState, useRef, useEffect } from "react";
import { Bot, FileText, MessageCircle, Paperclip, Send, Stethoscope, UserRound, Users, Clock } from "lucide-react";
import { toast } from "sonner";
import { DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type ThreadType = "user" | "doctor";

interface ChatMessage {
  from: "user" | "doctor" | "expert" | "ai";
  text: string;
  time: string;
}

interface Thread {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeTone: "amber" | "blue" | "green";
  initial: string;
  iconType: "user" | "doctor";
}

const userThreads: Thread[] = [
  { id: "T-001", name: "Nguyễn Văn A", subtitle: "Người dùng cần xác minh phản hồi AI", badge: "Cần phản hồi", badgeTone: "amber", initial: "A", iconType: "user" },
  { id: "T-002", name: "Nguyễn Văn C", subtitle: "Gắn với ca CASE-003", badge: "Đang theo dõi", badgeTone: "blue", initial: "C", iconType: "user" },
  { id: "T-003", name: "Nguyễn Văn D", subtitle: "Hỏi về dữ liệu thuốc", badge: "Mới", badgeTone: "green", initial: "D", iconType: "user" },
];

const doctorThreads: Thread[] = [
  { id: "D-001", name: "BS. Nguyễn Văn B", subtitle: "Cần góp ý chuyên môn", badge: "Ưu tiên", badgeTone: "amber", initial: "B", iconType: "doctor" },
  { id: "D-002", name: "BS. Nguyễn Văn C", subtitle: "Trao đổi kịch bản AI", badge: "Đang xử lý", badgeTone: "blue", initial: "C", iconType: "doctor" },
];

const initialMessages: Record<string, ChatMessage[]> = {
  "T-001": [
    { from: "doctor", text: "Ca CASE-001 đang có dấu hiệu sốt cao và đau họng. AI xếp mức trung bình, tôi muốn chuyên gia kiểm tra lại.", time: "08:35" },
    { from: "expert", text: "Tôi đã xem lịch sử hội thoại. Nên bổ sung câu hỏi về khó thở, SpO2 và thời gian sốt để xác định mức ưu tiên chính xác hơn.", time: "08:42" },
    { from: "doctor", text: "Nếu người dùng có khó thở thì có nên chuyển sang cảnh báo đi khám ngay không?", time: "08:44" },
  ],
  "T-002": [
    { from: "ai", text: "AI gợi ý đặt lịch khám hô hấp do người dùng ho kéo dài 5 ngày.", time: "09:30" },
    { from: "expert", text: "Đã xem. Luồng hỏi triệu chứng đúng, khuyến nghị đặt lịch phù hợp. Theo dõi thêm.", time: "09:45" },
  ],
  "T-003": [
    { from: "user", text: "Tôi muốn biết thuốc này có tương tác với thuốc huyết áp không?", time: "10:05" },
  ],
  "D-001": [
    { from: "doctor", text: "Ca CASE-001 nên điều chổi mức ưu tiên từ trung bình lên cao không? Người dùng sốt 3 ngày rồi.", time: "08:35" },
    { from: "expert", text: "Đúng rồi, sốt trên 3 ngày cần nâng ưu tiên. Tôi đã cập nhật CASE-001 lên mức Cao.", time: "08:50" },
    { from: "doctor", text: "Cảm ơn chuyên gia. Tôi sẽ theo dõi thêm.", time: "08:52" },
  ],
  "D-002": [
    { from: "doctor", text: "Câu hỏi khai thác triệu chứng cho nhánh tiêu hóa còn thiếu. Nên thêm câu hỏi về màu phân và tiêu chảy?", time: "11:20" },
  ],
};

const aiResponses = [
  "Tôi đã xem qua. Cần bổ sung thêm thông tin về thời gian và mức độ để đánh giá chính xác hơn.",
  "Theo dõi thêm 24h, nếu triệu chứng không giảm thì nên đặt lịch khám chuyên khoa.",
  "Đã cập nhật đánh giá. Mức ưu tiên phù hợp là trung bình.",
  "Luồng hỏi triệu chứng đúng rồi. Không cần điều chỉnh thêm.",
  "Gắn cờ ca này để theo dõi sau 2 ngày. Cảm ơn đã trao đổi.",
];

function getTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export default function ExpertChat() {
  const [activeTab, setActiveTab] = useState<ThreadType>("user");
  const [selectedId, setSelectedId] = useState<string>("T-001");
  const [message, setMessage] = useState("");
  const [threadMessages, setThreadMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const threads = activeTab === "user" ? userThreads : doctorThreads;
  const activeThread = threads.find((t) => t.id === selectedId) ?? threads[0];
  const activeMessages = threadMessages[selectedId] ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: ChatMessage = { from: "expert", text: message.trim(), time: getTime() };
    setThreadMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), newMsg] }));
    setMessage("");
    setIsTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = { from: activeTab === "user" ? "doctor" : "ai", text: aiResponses[Math.floor(Math.random() * aiResponses.length)], time: getTime() };
      setThreadMessages((prev) => ({ ...prev, [selectedId]: [...(prev[selectedId] ?? []), reply] }));
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const switchTab = (tab: ThreadType) => {
    setActiveTab(tab);
    const newThreads = tab === "user" ? userThreads : doctorThreads;
    setSelectedId(newThreads[0].id);
  };

  return (
    <div>
      <PageHeader
        title="Chat & yêu cầu"
        description="Trao đổi với người dùng, bác sĩ và đội vận hành về các ca cần kiểm duyệt phản hồi AI."
        actions={
          <button
            type="button"
            onClick={() => toast.info("Tính năng tạo ghi chú đang được phát triển")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1C64D1] transition"
          >
            <MessageCircle className="h-4 w-4" />
            Tạo ghi chú
          </button>
        }
      />

      <div className="grid min-h-[calc(100vh-190px)] gap-5 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
        {/* Thread list */}
        <SectionCard className="p-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            <button type="button" onClick={() => switchTab("user")} className={`rounded-xl px-3 py-2 text-sm font-bold transition ${activeTab === "user" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"}`}>Người dùng</button>
            <button type="button" onClick={() => switchTab("doctor")} className={`rounded-xl px-3 py-2 text-sm font-bold transition ${activeTab === "doctor" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"}`}>Bác sĩ</button>
          </div>

          <div className="mt-4 space-y-2">
            {threads.map((thread) => {
              const isSelected = thread.id === selectedId;
              const unread = isSelected ? 0 : Math.floor(Math.random() * 2);
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setSelectedId(thread.id)}
                  className={`w-full rounded-[18px] border p-3.5 text-left transition ${isSelected ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] font-bold text-sm">
                      {thread.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-bold text-[#1E293B] text-sm">{thread.name}</p>
                        <StatusBadge tone={thread.badgeTone}>{thread.badge}</StatusBadge>
                      </div>
                      <p className="mt-1 truncate text-xs text-[#64748B]">{thread.subtitle}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Chat panel */}
        <SectionCard
          title={activeThread.name}
          description={activeThread.subtitle}
          actions={<StatusBadge tone="amber">{activeThread.id}</StatusBadge>}
          className="flex min-h-[620px] flex-col"
        >
          <div className="flex-1 space-y-4 overflow-y-auto pr-1 py-2">
            {activeMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="h-10 w-10 text-[#E2E8F0] mb-3" />
                <p className="text-sm text-[#64748B]">Chưa có tin nhắn nào trong cuộc trò chuyện này.</p>
              </div>
            )}
            {activeMessages.map((msg, i) => {
              const isExpert = msg.from === "expert";
              const isAI = msg.from === "ai";
              return (
                <div key={i} className={`flex ${isExpert ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] rounded-[20px] px-4 py-3 text-sm leading-relaxed ${isExpert ? "rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] text-white" : "rounded-bl-md bg-[#F2F7FB] text-[#1E293B]"}`}>
                    <p>{msg.text}</p>
                    <div className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${isExpert ? "text-white/70" : "text-[#94A3B8]"}`}>
                      <Clock className="h-3 w-3" />
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-[20px] rounded-bl-md bg-[#F2F7FB] px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#94A3B8]" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#94A3B8]" style={{ animationDelay: "160ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#94A3B8]" style={{ animationDelay: "320ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-2">
            <button type="button" onClick={() => toast.info("Tính năng đính kèm đang được phát triển")} className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] hover:bg-white">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#94A3B8]"
              placeholder="Nhập phản hồi chuyên môn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !isTyping) handleSend(); }}
            />
            <button type="button" onClick={handleSend} disabled={isTyping || !message.trim()} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F80ED] text-white hover:bg-[#1C64D1] disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </SectionCard>

        {/* Right panel */}
        <div className="space-y-5">
          <SectionCard title="Ca liên quan" description="Thông tin đang được trao đổi.">
            <div className="space-y-3 text-sm">
              <DataRow
                title={activeThread.id}
                description={activeThread.subtitle}
                icon={<FileText className="h-5 w-5" />}
                meta={<StatusBadge tone="amber">Đang xem</StatusBadge>}
              />
              <div className="rounded-2xl bg-[#F2F7FB] p-4">
                <p className="font-bold text-[#1E293B]">Ghi chú chuyên gia</p>
                <p className="mt-2 leading-relaxed text-[#64748B]">
                  {activeTab === "user"
                    ? "Cần bổ sung câu hỏi loại trừ dấu hiệu nặng: khó thở, đau ngực, SpO2 thấp, sốt kéo dài trên 3 ngày."
                    : "Phối hợp với bác sĩ để cập nhật mức ưu tiên và khuyến nghị phù hợp cho người dùng."}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Yêu cầu đang mở">
            <div className="space-y-2">
              {[
                ["Bác sĩ cần xác nhận mức ưu tiên", "CASE-001"],
                ["Người dùng phản hồi AI chưa rõ", "CASE-003"],
                ["Cập nhật mẫu câu hỏi triệu chứng", "KB-012"],
              ].map(([title, code]) => (
                <DataRow key={code} title={title} description={code} icon={<Bot className="h-5 w-5" />} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Nhóm tham gia">
            <div className="flex items-center gap-3 rounded-2xl bg-[#E8FFF9] p-4 text-[#148E77]">
              <Users className="h-5 w-5" />
              <p className="text-sm font-bold">1 chuyên gia, 1 bác sĩ, 1 điều phối viên</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
