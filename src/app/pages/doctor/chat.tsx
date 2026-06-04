import { useMemo, useState } from "react";
import { Archive, BellRing, Inbox, MessageCircle, Search, Send, Sparkles, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { cn } from "../../lib/utils";

type ConversationStatus = "active" | "unread" | "archived";
type ConversationFilter = "all" | "unread" | "archived";

type ChatMessage = {
  sender: "doctor" | "contact";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  patientCode?: string;
  role: string;
  preview: string;
  status: ConversationStatus;
  lastAt: string;
  messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
  {
    id: "p001",
    name: "Đỗ Minh Tú",
    patientCode: "P001",
    role: "Bệnh nhân",
    preview: "Em vẫn còn đau vùng thượng vị sau ăn.",
    status: "unread",
    lastAt: "09:24",
    messages: [
      { sender: "contact", text: "Chào bác sĩ, em vẫn còn đau vùng thượng vị sau ăn.", time: "09:12" },
      { sender: "doctor", text: "Em cho bác sĩ biết cơn đau kéo dài bao lâu và có buồn nôn không?", time: "09:16" },
      { sender: "contact", text: "Khoảng 30 phút, ợ chua nhiều hơn sau bữa tối ạ.", time: "09:24" },
    ],
  },
  {
    id: "p002",
    name: "Nguyễn Văn An",
    patientCode: "P002",
    role: "Bệnh nhân",
    preview: "Bác sĩ ơi, em muốn hỏi về đơn thuốc.",
    status: "active",
    lastAt: "08:50",
    messages: [
      { sender: "contact", text: "Bác sĩ ơi, em uống thuốc trước ăn hay sau ăn ạ?", time: "08:41" },
      { sender: "doctor", text: "Omeprazole uống trước ăn sáng 30 phút, thuốc giảm đau uống sau ăn.", time: "08:50" },
    ],
  },
  {
    id: "expert001",
    name: "TS. Nguyễn Thị Lan",
    role: "Chuyên gia",
    preview: "Cần xem thêm xét nghiệm chức năng thận.",
    status: "active",
    lastAt: "Hôm qua",
    messages: [
      { sender: "contact", text: "Tôi đã xem hồ sơ, nên bổ sung creatinine và eGFR.", time: "Hôm qua" },
      { sender: "doctor", text: "Tôi sẽ chỉ định thêm xét nghiệm và gửi lại kết quả.", time: "Hôm qua" },
    ],
  },
  {
    id: "p003",
    name: "Trần Thị Bình",
    patientCode: "P003",
    role: "Bệnh nhân",
    preview: "Đã kết thúc tư vấn, lưu lại để theo dõi.",
    status: "archived",
    lastAt: "28/05",
    messages: [
      { sender: "contact", text: "Cảm ơn bác sĩ, huyết áp của em đã ổn hơn.", time: "28/05" },
      { sender: "doctor", text: "Em tiếp tục đo huyết áp mỗi sáng và tái khám đúng lịch.", time: "28/05" },
    ],
  },
];

const paidConsultationConversation: Conversation = {
  id: "consult-paid-001",
  name: "Nguyễn Minh Anh",
  patientCode: "P009",
  role: "Tư vấn chuyên sâu",
  preview: "Bệnh nhân đã chuyển từ Chatbot AI sang yêu cầu kết nối trực tiếp.",
  status: "unread",
  lastAt: "Vừa xong",
  messages: [
    { sender: "contact", text: "Chào bác sĩ, em vừa thanh toán tư vấn chuyên sâu. Em hay đau vùng thượng vị và bị ợ chua nhiều sau bữa tối.", time: "Vừa xong" },
    { sender: "doctor", text: "Chào bạn, bác sĩ đã nhận phiên tư vấn. Bạn cho bác sĩ biết triệu chứng kéo dài bao lâu và đã dùng thuốc gì chưa?", time: "Vừa xong" },
    { sender: "contact", text: "Khoảng một tuần, em mới dùng thuốc dạ dày mua ngoài nhưng chưa đỡ hẳn ạ.", time: "Vừa xong" },
  ],
};

const filterLabels: Record<ConversationFilter, string> = {
  all: "Tất cả",
  unread: "Chưa xem",
  archived: "Lưu trữ",
};

export default function DoctorChat() {
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);
  const [draft, setDraft] = useState("");
  const [consultAccepted, setConsultAccepted] = useState(false);

  const filteredConversations = useMemo(() => {
    if (filter === "all") return conversations.filter((item) => item.status !== "archived");
    return conversations.filter((item) => item.status === filter);
  }, [conversations, filter]);

  const selectedConversation = conversations.find((item) => item.id === selectedId) ?? conversations[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setConversations((current) => current.map((item) => (item.id === id && item.status === "unread" ? { ...item, status: "active" } : item)));
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    setConversations((current) =>
      current.map((item) =>
        item.id === selectedConversation.id
          ? {
              ...item,
              preview: text,
              lastAt: time,
              status: item.status === "archived" ? "archived" : "active",
              messages: [...item.messages, { sender: "doctor", text, time }],
            }
          : item
      )
    );
    setDraft("");
  };

  const toggleArchive = () => {
    setConversations((current) =>
      current.map((item) =>
        item.id === selectedConversation.id ? { ...item, status: item.status === "archived" ? "active" : "archived" } : item
      )
    );
  };

  const acceptPaidConsultation = () => {
    setConsultAccepted(true);
    setFilter("all");
    setConversations((current) => {
      if (current.some((item) => item.id === paidConsultationConversation.id)) return current;
      return [paidConsultationConversation, ...current];
    });
    setSelectedId(paidConsultationConversation.id);
  };

  return (
    <div className="min-w-0 overflow-hidden">
      <PageHeader
        title="Tin nhắn"
        description="Trao đổi với bệnh nhân, chuyên gia và đồng nghiệp theo từng cuộc trò chuyện."
      />

      {!consultAccepted && (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#CFE3FF] bg-[#EAF3FF] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D4A86] text-white">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1E293B]">Yêu cầu Tư vấn chuyên sâu (Trả phí)</h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-[#64748B]">
                Bệnh nhân Nguyễn Minh Anh đã chuyển từ Chatbot AI sang yêu cầu kết nối trực tiếp bác sĩ.
              </p>
            </div>
          </div>
          <ActionButton icon={<Sparkles className="h-4 w-4" />} onClick={acceptPaidConsultation}>
            Chấp nhận tư vấn
          </ActionButton>
        </div>
      )}

      <div className="grid min-h-[640px] min-w-0 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <SectionCard title="Cuộc trò chuyện" className="min-w-0 overflow-hidden">
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-[#F2F7FB] p-1">
            {(Object.keys(filterLabels) as ConversationFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "h-10 rounded-xl text-sm font-bold transition",
                  filter === item ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
                )}
              >
                {filterLabels[item]}
              </button>
            ))}
          </div>

          <div className="mb-4 flex h-11 items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
            <Search className="h-4 w-4" />
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Tìm theo tên hoặc mã bệnh nhân" />
          </div>

          <div className="space-y-3">
            {filteredConversations.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => handleSelect(contact.id)}
                className={cn(
                  "flex w-full gap-3 rounded-[18px] border p-4 text-left transition",
                  selectedConversation.id === contact.id
                    ? "border-[#CFE3FF] bg-[#EAF3FF]"
                    : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  {contact.status === "archived" ? <Archive className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-bold text-[#1E293B]">{contact.name}</p>
                    <span className="shrink-0 text-xs font-bold text-[#64748B]">{contact.lastAt}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <StatusBadge tone={contact.status === "unread" ? "rose" : contact.status === "archived" ? "slate" : "blue"}>
                      {contact.status === "unread" ? "Chưa xem" : contact.role}
                    </StatusBadge>
                    {contact.patientCode && <span className="text-xs font-semibold text-[#64748B]">{contact.patientCode}</span>}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#64748B]">{contact.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={selectedConversation.name}
          description={`${selectedConversation.role}${selectedConversation.patientCode ? ` · ${selectedConversation.patientCode}` : ""}`}
          actions={
            <ActionButton
              variant="secondary"
              icon={selectedConversation.status === "archived" ? <Inbox className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
              onClick={toggleArchive}
            >
              {selectedConversation.status === "archived" ? "Bỏ lưu trữ" : "Lưu trữ"}
            </ActionButton>
          }
          className="flex min-w-0 flex-col"
        >
          <div className="min-h-[420px] flex-1 space-y-4 overflow-y-auto rounded-2xl bg-[#F7FAFC] p-5">
            {selectedConversation.messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={cn("flex", message.sender === "doctor" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                    message.sender === "doctor" ? "rounded-tr-sm bg-[#2F80ED] text-white" : "rounded-tl-sm bg-white text-[#1E293B]"
                  )}
                >
                  <p>{message.text}</p>
                  <p className={cn("mt-2 text-xs font-bold", message.sender === "doctor" ? "text-white/75" : "text-[#94A3B8]")}>{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-[#E2E8F0] bg-white pt-4">
            <div className="flex gap-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend();
                }}
                placeholder="Nhập tin nhắn..."
                className="min-w-0 flex-1 rounded-full border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
              <ActionButton icon={<Send className="h-4 w-4" />} onClick={handleSend}>
                Gửi
              </ActionButton>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
