import { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router";
import { Archive, Inbox, MessageCircle, Search, Send, UserRound, Building2, Stethoscope, ChevronLeft, Bot } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { getPatientConversations, patientConversations, type PatientConversation } from "../../lib/patient-conversations";
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
  role: "clinic" | "doctor" | "bot";
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
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const temporaryConversation = (location.state as { conversation?: PatientConversation } | null)?.conversation;
  const initialPatientConversations = useMemo(() => {
    const conversations = getPatientConversations();
    if (!temporaryConversation?.id) return conversations;
    return [temporaryConversation, ...conversations.filter((item) => item.id !== temporaryConversation.id)];
  }, [temporaryConversation]);
  const requestedConversationId = searchParams.get("conversation");
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<PatientConversation[]>(initialPatientConversations);
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (requestedConversationId && initialPatientConversations.some((item) => item.id === requestedConversationId)) {
      return requestedConversationId;
    }
    return initialPatientConversations[0].id;
  });
  const [draft, setDraft] = useState("");
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layoutWrapper = containerRef.current?.closest(".overflow-y-auto");
    const originalLayoutOverflow = layoutWrapper instanceof HTMLElement ? layoutWrapper.style.overflowY : "";
    if (layoutWrapper instanceof HTMLElement) {
      layoutWrapper.style.overflowY = "hidden";
    }

    const mainElement = containerRef.current?.closest("main");
    const originalMainHeight = mainElement instanceof HTMLElement ? mainElement.style.height : "";
    const originalMainDisplay = mainElement instanceof HTMLElement ? mainElement.style.display : "";
    const originalMainFlexDirection = mainElement instanceof HTMLElement ? mainElement.style.flexDirection : "";
    const originalMainMinHeight = mainElement instanceof HTMLElement ? mainElement.style.minHeight : "";

    if (mainElement instanceof HTMLElement) {
      mainElement.style.height = "100%";
      mainElement.style.display = "flex";
      mainElement.style.flexDirection = "column";
      mainElement.style.minHeight = "0";
    }

    return () => {
      if (layoutWrapper instanceof HTMLElement) {
        layoutWrapper.style.overflowY = originalLayoutOverflow;
      }
      if (mainElement instanceof HTMLElement) {
        mainElement.style.height = originalMainHeight;
        mainElement.style.display = originalMainDisplay;
        mainElement.style.flexDirection = originalMainFlexDirection;
        mainElement.style.minHeight = originalMainMinHeight;
      }
    };
  }, []);

  useEffect(() => {
    if (!requestedConversationId) return;

    const incomingConversation = initialPatientConversations.find((item) => item.id === requestedConversationId);
    if (!incomingConversation) return;

    setConversations((current) => {
      const merged = current.some((item) => item.id === incomingConversation.id)
        ? current
        : [incomingConversation, ...current];

      return merged.map((item) =>
        item.id === incomingConversation.id && item.status === "unread"
          ? { ...item, status: "active" }
          : item
      );
    });
    setSelectedId(incomingConversation.id);
    setFilter("all");
    setShowChatOnMobile(true);
  }, [initialPatientConversations, requestedConversationId]);

  const filteredConversations = useMemo(() => {
    const contactConversations = conversations.filter((item) => item.role !== "bot");
    const visibleByStatus =
      filter === "all"
        ? contactConversations.filter((item) => item.status !== "archived")
        : contactConversations.filter((item) => item.status === filter);
    const keyword = searchQuery.trim().toLowerCase();

    if (!keyword) return visibleByStatus;

    return visibleByStatus.filter((item) =>
      [item.name, item.roleName, item.preview, item.status, item.role]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [conversations, filter, searchQuery]);

  const chatbotHistory = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    const visibleHistory = conversations.filter((item) => item.role === "bot" && item.status !== "archived");

    if (!keyword) return visibleHistory;

    return visibleHistory.filter((item) =>
      [item.name, item.roleName, item.preview, item.status, item.role]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [conversations, searchQuery]);

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
    <div className="h-full flex flex-col min-h-0 min-w-0 overflow-hidden" ref={containerRef}>
      <PageHeader
        title="Hộp thư tư vấn"
        description="Nhắn tin trò chuyện với các bác sĩ chuyên khoa hoặc các phòng khám liên kết."
      />

      <div className="grid flex-1 min-h-0 min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* Left column - Conversations list */}
        <SectionCard
          title="Cuộc trò chuyện"
          className={cn("h-full flex flex-col min-w-0 overflow-hidden", showChatOnMobile ? "hidden lg:flex" : "flex")}
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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="Tìm kiếm chatbot, bác sĩ hoặc phòng khám..."
            />
          </div>

          <div className="mb-4 rounded-[20px] border border-[#CFE3FF] bg-gradient-to-br from-[#F7FBFF] to-[#E8FFF9] p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#2F80ED] shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#1E293B]">Lịch sử chatbot</p>
                  <p className="text-[11px] font-semibold text-[#64748B]">{chatbotHistory.length} phiên tư vấn AI</p>
                </div>
              </div>
              <StatusBadge tone="blue">AI</StatusBadge>
            </div>

            <div className="space-y-2">
              {chatbotHistory.slice(0, 4).map((history) => (
                <button
                  key={history.id}
                  type="button"
                  onClick={() => handleSelect(history.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition cursor-pointer",
                    selectedConversation.id === history.id
                      ? "border-[#9CC8FF] bg-white shadow-sm"
                      : "border-white/70 bg-white/55 hover:bg-white"
                  )}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#2F80ED]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-black text-[#1E293B]">{history.name}</p>
                      <span className="shrink-0 text-[10px] font-bold text-[#64748B]">{history.lastAt}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-[#64748B]">{history.preview}</p>
                  </div>
                </button>
              ))}

              {chatbotHistory.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#CFE3FF] bg-white/55 p-3 text-center text-xs font-bold text-[#64748B]">
                  Chưa có phiên chatbot phù hợp.
                </div>
              )}
            </div>
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
            {filteredConversations.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#CFE3FF] bg-[#F7FAFC] p-5 text-center text-sm font-bold text-[#64748B]">
                Không tìm thấy cuộc trò chuyện phù hợp.
              </div>
            )}
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
          className={cn("h-full flex min-w-0 flex-col overflow-hidden", showChatOnMobile ? "flex" : "hidden lg:flex")}
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
