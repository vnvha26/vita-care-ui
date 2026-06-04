import { useMemo, useState } from "react";
import { Archive, Inbox, Search, Send, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { cn } from "../../lib/utils";

type ConversationStatus = "active" | "unread" | "archived";
type ConversationFilter = "all" | "unread" | "archived";

type ChatMessage = {
  sender: "manager" | "contact";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  code?: string;
  role: string;
  preview: string;
  status: ConversationStatus;
  lastAt: string;
  messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
  {
    id: "c1",
    name: "Nguyễn Khám Bệnh",
    code: "KH001",
    role: "Bệnh nhân",
    preview: "Dạo này nắng nóng, em hay bị choáng váng.",
    status: "unread",
    lastAt: "10:32",
    messages: [
      { sender: "contact", text: "Dạo này thời tiết nắng nóng, em hay bị choáng váng và chóng mặt.", time: "10:32" },
      { sender: "manager", text: "Bạn nên hạn chế ra ngoài giờ cao điểm và uống nhiều nước. Phòng khám còn lịch tổng quát sáng mai.", time: "10:35" },
      { sender: "contact", text: "Vậy cho em đặt lịch 09:00 sáng mai được không ạ?", time: "10:36" },
    ],
  },
  {
    id: "c2",
    name: "BS. Nguyễn Văn A",
    role: "Bác sĩ",
    preview: "Cần đổi lịch chiều nay sang phòng 203.",
    status: "active",
    lastAt: "09:15",
    messages: [
      { sender: "contact", text: "Quản lý ơi, lịch 14:00 chiều nay cần chuyển sang phòng 203.", time: "09:15" },
      { sender: "manager", text: "Mình đã cập nhật phòng khám và báo lại cho lễ tân.", time: "09:18" },
    ],
  },
  {
    id: "c3",
    name: "Trần Hay Hỏi",
    code: "KH002",
    role: "Bệnh nhân",
    preview: "Em muốn hỏi lịch xét nghiệm sốt xuất huyết.",
    status: "active",
    lastAt: "Hôm qua",
    messages: [
      { sender: "contact", text: "Em muốn hỏi lịch xét nghiệm sốt xuất huyết còn không ạ?", time: "Hôm qua" },
      { sender: "manager", text: "Hiện còn slot 15:30 hôm nay. Bạn có muốn đặt lịch không?", time: "Hôm qua" },
    ],
  },
  {
    id: "c4",
    name: "Thánh Bùng Lịch",
    code: "KH003",
    role: "Bệnh nhân",
    preview: "Đã xử lý đổi lịch, lưu lại để đối soát.",
    status: "archived",
    lastAt: "28/05",
    messages: [
      { sender: "contact", text: "Em cần đổi lịch khám răng sang thứ sáu.", time: "28/05" },
      { sender: "manager", text: "Phòng khám còn lịch 14:00 thứ sáu, mình đã đổi lịch cho bạn.", time: "28/05" },
    ],
  },
];

const filterLabels: Record<ConversationFilter, string> = {
  all: "Tất cả",
  unread: "Chưa xem",
  archived: "Lưu trữ",
};

export default function ManagerChat() {
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);
  const [draft, setDraft] = useState("");

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
              messages: [...item.messages, { sender: "manager", text, time }],
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

  return (
    <div className="min-w-0 overflow-hidden">
      <PageHeader
        title="Tin nhắn"
        description="Trao đổi với bệnh nhân, bác sĩ và các yêu cầu điều phối theo từng cuộc trò chuyện."
      />

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
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Tìm theo tên hoặc mã khách" />
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
                    {contact.code && <span className="text-xs font-semibold text-[#64748B]">{contact.code}</span>}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#64748B]">{contact.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={selectedConversation.name}
          description={`${selectedConversation.role}${selectedConversation.code ? ` · ${selectedConversation.code}` : ""}`}
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
              <div key={`${message.time}-${index}`} className={cn("flex", message.sender === "manager" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                    message.sender === "manager" ? "rounded-tr-sm bg-[#2F80ED] text-white" : "rounded-tl-sm bg-white text-[#1E293B]"
                  )}
                >
                  <p>{message.text}</p>
                  <p className={cn("mt-2 text-xs font-bold", message.sender === "manager" ? "text-white/75" : "text-[#94A3B8]")}>{message.time}</p>
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
