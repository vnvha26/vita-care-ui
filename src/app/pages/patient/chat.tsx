import { useMemo, useState, useEffect, useRef } from "react";
import { Archive, Inbox, MessageCircle, Search, Send, UserRound, Building2, Stethoscope, ChevronLeft } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { cn } from "../../lib/utils";

type ConversationStatus = "active" | "unread" | "archived";
type ConversationFilter = "all" | "unread" | "archived";

interface ChatMessage {
  sender: "patient" | "contact";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: "clinic" | "doctor";
  roleName: string;
  preview: string;
  status: ConversationStatus;
  lastAt: string;
  messages: ChatMessage[];
  image?: string;
}

const initialConversations: Conversation[] = [
  {
    id: "c1",
    name: "Phòng khám Đa khoa Quốc tế VitaCare",
    role: "clinic",
    roleName: "Phòng khám liên kết",
    preview: "Chào anh A, phòng khám đã nhận yêu cầu đặt lịch. Anh muốn khám ca sáng hay ca chiều ngày mai ạ?",
    status: "unread",
    lastAt: "14:15",
    messages: [
      { sender: "contact", text: "Chào anh Nguyễn Văn A, tôi là lễ tân tại Phòng khám VitaCare. Chúng tôi đã nhận được yêu cầu đặt lịch từ Trợ lý AI.", time: "14:10" },
      { sender: "contact", text: "Anh muốn đăng ký khám ca sáng hay ca chiều ngày mai ạ? Hiện tại các bác sĩ Nội khoa đều có lịch rảnh.", time: "14:15" },
    ],
  },
  {
    id: "c2",
    name: "Nha khoa Thẩm mỹ Công nghệ cao Paris",
    role: "clinic",
    roleName: "Phòng khám liên kết",
    preview: "Cảm ơn anh đã phản hồi. Hẹn gặp anh vào 9:00 sáng mai ạ.",
    status: "active",
    lastAt: "10:30",
    messages: [
      { sender: "patient", text: "Chào phòng khám, tôi muốn đặt lịch cạo vôi răng và kiểm tra định kỳ.", time: "10:20" },
      { sender: "contact", text: "Dạ vâng, nha khoa Paris có lịch trống lúc 9:00 sáng mai ạ. Anh có sắp xếp qua được giờ đó không?", time: "10:25" },
      { sender: "patient", text: "Được nhé, tôi sẽ qua đúng giờ.", time: "10:28" },
      { sender: "contact", text: "Cảm ơn anh đã phản hồi. Hẹn gặp anh vào 9:00 sáng mai ạ.", time: "10:30" },
    ],
  },
  {
    id: "d1",
    name: "BS. Nguyễn Khám Bệnh",
    role: "doctor",
    roleName: "Bác sĩ chuyên khoa Nội",
    preview: "Kết quả siêu âm của em bình thường, uống thuốc đúng liều nhé.",
    status: "active",
    lastAt: "Hôm qua",
    messages: [
      { sender: "patient", text: "Thưa bác sĩ, em đã uống hết đơn thuốc dạ dày 5 ngày rồi ạ.", time: "Hôm qua" },
      { sender: "contact", text: "Em còn cảm giác ợ chua hay đau tức ngực sau khi ăn không?", time: "Hôm qua" },
      { sender: "patient", text: "Dạ giảm nhiều rồi bác sĩ, chỉ còn hơi đầy bụng nhẹ thôi ạ.", time: "Hôm qua" },
      { sender: "contact", text: "Tốt lắm. Kết quả siêu âm dạ dày trước đó của em bình thường. Em uống hết số thuốc còn lại đúng liều nhé.", time: "Hôm qua" },
    ],
  },
  {
    id: "d2",
    name: "BS. Trần Hay Hỏi",
    role: "doctor",
    roleName: "Bác sĩ chuyên khoa Nhi",
    preview: "Nếu bé hết sốt và chơi ngoan thì yên tâm theo dõi tiếp được.",
    status: "archived",
    lastAt: "25/05",
    messages: [
      { sender: "patient", text: "Chào bác sĩ, bé nhà em sốt 38 độ từ tối qua, có ho húng hắng.", time: "25/05" },
      { sender: "contact", text: "Bé có bú tốt không em? Có bị nôn trớ hay phát ban gì không?", time: "25/05" },
      { sender: "patient", text: "Bé vẫn ăn chơi bình thường ạ, không bị nôn.", time: "25/05" },
      { sender: "contact", text: "Nếu bé hết sốt và chơi ngoan thì yên tâm theo dõi tiếp được. Cho bé uống nhiều nước và lau mát người nhé.", time: "25/05" },
    ],
  },
];

const filterLabels: Record<ConversationFilter, string> = {
  all: "Tất cả",
  unread: "Chưa xem",
  archived: "Lưu trữ",
};

export default function PatientChat() {
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string>(initialConversations[0].id);
  const [draft, setDraft] = useState("");
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = useMemo(() => {
    if (filter === "all") return conversations.filter((item) => item.status !== "archived");
    return conversations.filter((item) => item.status === filter);
  }, [conversations, filter]);

  const selectedConversation = conversations.find((item) => item.id === selectedId) ?? conversations[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation.messages]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setConversations((current) =>
      current.map((item) =>
        item.id === id && item.status === "unread" ? { ...item, status: "active" } : item
      )
    );
    setShowChatOnMobile(true);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    
    // Add user message
    setConversations((current) =>
      current.map((item) =>
        item.id === selectedConversation.id
          ? {
              ...item,
              preview: text,
              lastAt: time,
              status: item.status === "archived" ? "archived" : "active",
              messages: [...item.messages, { sender: "patient", text, time }],
            }
          : item
      )
    );
    setDraft("");

    // Simulate an interactive reply after 1.2s
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
      const mockReplyText = `Cảm ơn bạn đã nhắn tin. Yêu cầu của bạn ("${text}") đang được hệ thống chuyển tới nhân viên phụ trách để xử lý. Vui lòng đợi trong giây lát.`;
      
      setConversations((current) =>
        current.map((item) =>
          item.id === selectedConversation.id
            ? {
                ...item,
                preview: mockReplyText,
                lastAt: replyTime,
                messages: [...item.messages, { sender: "contact", text: mockReplyText, time: replyTime }],
              }
            : item
        )
      );
    }, 1200);
  };

  const toggleArchive = () => {
    setConversations((current) =>
      current.map((item) =>
        item.id === selectedConversation.id
          ? { ...item, status: item.status === "archived" ? "active" : "archived" }
          : item
      )
    );
  };

  return (
    <div className="min-w-0 overflow-hidden">
      <PageHeader
        title="Hộp thư tư vấn"
        description="Nhắn tin trò chuyện với các bác sĩ chuyên khoa hoặc các phòng khám liên kết."
      />

      <div className="grid h-[calc(100vh-230px)] min-h-[420px] lg:h-[calc(100vh-190px)] lg:min-h-[500px] min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* Left column - Conversations list */}
        <SectionCard
          title="Cuộc trò chuyện"
          className={cn("h-full flex flex-col min-w-0 overflow-hidden", showChatOnMobile ? "hidden lg:block" : "block")}
        >
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-[#F2F7FB] p-1">
            {(Object.keys(filterLabels) as ConversationFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "h-10 rounded-xl text-sm font-bold transition cursor-pointer",
                  filter === item ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
                )}
              >
                {filterLabels[item]}
              </button>
            ))}
          </div>

          <div className="mb-4 flex h-11 items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
            <Search className="h-4 w-4" />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Tìm kiếm bác sĩ hoặc phòng khám..."
            />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto min-h-0 pr-1 custom-scrollbar">
            {filteredConversations.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => handleSelect(contact.id)}
                className={cn(
                  "flex w-full gap-3 rounded-[18px] border p-4 text-left transition cursor-pointer",
                  selectedConversation.id === contact.id
                    ? "border-[#CFE3FF] bg-[#EAF3FF]"
                    : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  {contact.role === "clinic" ? (
                    <Building2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-bold text-[#1E293B] text-sm">{contact.name}</p>
                    <span className="shrink-0 text-xs font-bold text-[#64748B]">{contact.lastAt}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <StatusBadge
                      tone={
                        contact.status === "unread"
                          ? "rose"
                          : contact.role === "clinic"
                          ? "emerald"
                          : "blue"
                      }
                    >
                      {contact.status === "unread" ? "Chưa đọc" : contact.roleName}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#64748B]">{contact.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Right column - Messages area */}
        <SectionCard
          title={selectedConversation.name}
          description={selectedConversation.roleName}
          actions={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowChatOnMobile(false)}
                className="inline-flex lg:hidden items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-bold text-[#1E293B] hover:bg-[#F2F7FB] cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Quay lại
              </button>
              <ActionButton
                variant="secondary"
                icon={<Archive className="h-4 w-4" />}
                onClick={toggleArchive}
              >
                {selectedConversation.status === "archived" ? "Bỏ lưu trữ" : "Lưu trữ"}
              </ActionButton>
            </div>
          }
          className={cn("h-full flex min-w-0 flex-col", showChatOnMobile ? "block" : "hidden lg:block")}
        >
          <div className="flex-1 min-h-0 space-y-4 overflow-y-auto rounded-2xl bg-[#F7FAFC] p-5 custom-scrollbar">
            {selectedConversation.messages.map((message, index) => (
              <div
                key={`${message.time}-${index}`}
                className={cn("flex", message.sender === "patient" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
                    message.sender === "patient"
                      ? "rounded-tr-sm bg-[#2F80ED] text-white"
                      : "rounded-tl-sm bg-white text-[#1E293B]"
                  )}
                >
                  <p>{message.text}</p>
                  <p
                    className={cn(
                      "mt-2 text-[10px] font-bold text-right",
                      message.sender === "patient" ? "text-white/75" : "text-[#94A3B8]"
                    )}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="mt-4 border-t border-[#E2E8F0] bg-white pt-4">
            <div className="flex gap-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSend();
                }}
                placeholder={`Nhắn tin với ${selectedConversation.name}...`}
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
