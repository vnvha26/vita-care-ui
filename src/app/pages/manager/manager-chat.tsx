import { useState } from "react";
import { Bot, CalendarPlus, MoreHorizontal, Search, Send, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  messages: { from: "patient" | "manager" | "ai"; text: string; time: string }[];
};

const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Nguyễn Khám Bệnh",
    preview: "Dạo này nắng nóng tia cực tím...",
    time: "10:32",
    unread: 2,
    messages: [
      { from: "patient", text: "Bác sĩ ơi, dạo này thời tiết nắng nóng, em hay bị choáng váng và chóng mặt.", time: "10:32" },
      { from: "manager", text: "Bạn nên hạn chế ra ngoài giờ cao điểm, uống nhiều nước. Phòng khám sẽ sắp xếp lịch kiểm tra tổng quát cho bạn vào sáng mai.", time: "10:35" },
      { from: "ai", text: "Bệnh nhân vừa cung cấp thông tin đặt lịch hẹn: Nguyễn Khám Bệnh, SĐT 0901 234 567, ngày mai 09:00, lý do khám lại dạ dày.", time: "10:36" },
    ],
  },
  {
    id: "c2",
    name: "Trần Hay Hỏi",
    preview: "Bác sĩ ơi đợt dịch sốt xuất huyết này...",
    time: "09:15",
    messages: [
      { from: "patient", text: "Em muốn hỏi lịch xét nghiệm sốt xuất huyết còn không ạ?", time: "09:15" },
      { from: "manager", text: "Hiện còn slot 15:30 hôm nay. Bạn có muốn đặt lịch không?", time: "09:18" },
    ],
  },
  {
    id: "c3",
    name: "Thánh Bùng Lịch",
    preview: "Báo số 3 vào nền em xin đổi lịch",
    time: "Hôm qua",
    unread: 1,
    messages: [
      { from: "patient", text: "Em cần đổi lịch khám răng sang thứ sáu.", time: "Hôm qua" },
      { from: "manager", text: "Phòng khám còn lịch 14:00 thứ sáu, em xác nhận giúp nhé.", time: "Hôm qua" },
    ],
  },
];

export default function ManagerChat() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [draft, setDraft] = useState("");
  const [localConversations, setLocalConversations] = useState(conversations);
  const current = localConversations.find((item) => item.id === selectedId) ?? localConversations[0];

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setLocalConversations((items) =>
      items.map((item) =>
        item.id === current.id ? { ...item, preview: text, messages: [...item.messages, { from: "manager", text, time: "Bây giờ" }] } : item
      )
    );
    setDraft("");
  };

  return (
    <div>
      <PageHeader title="Messenger" description="Trao đổi với bệnh nhân và chuyển yêu cầu thành lịch khám khi cần." />

      <div className="grid min-h-[680px] gap-6 xl:grid-cols-[360px_1fr]">
        <SectionCard title="Tin nhắn" className="p-0">
          <div className="border-b border-[#E2E8F0] p-5">
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
              <Search className="h-4 w-4" />
              <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Tìm kiếm bệnh nhân..." />
            </div>
          </div>

          <div className="space-y-1 p-3">
            {localConversations.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`flex w-full gap-3 rounded-2xl p-4 text-left transition ${
                  current.id === item.id ? "bg-[#EAF3FF] text-[#1E293B]" : "hover:bg-[#F2F7FB]"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  <UserRound className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-extrabold">{item.name}</p>
                    <span className="text-xs font-bold text-[#64748B]">{item.time}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-[#64748B]">{item.preview}</p>
                </div>
                {item.unread && <StatusBadge tone="blue">{item.unread}</StatusBadge>}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={current.name}
          description="Đang hoạt động"
          actions={
            <div className="flex gap-2">
              <ActionButton variant="ghost" icon={<MoreHorizontal className="h-4 w-4" />}>Tùy chọn</ActionButton>
            </div>
          }
          className="flex flex-col p-0"
        >
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#F7FAFC] p-5">
            <div className="text-center text-xs font-bold text-[#94A3B8]">Hôm nay</div>
            {current.messages.map((message, index) => {
              if (message.from === "ai") {
                return (
                  <div key={index} className="max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-[#1C64D1]">
                      <Bot className="h-4 w-4" />
                      Trợ lý AI VitaCare
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#64748B]">{message.text}</p>
                    <ActionButton className="mt-4 w-full" icon={<CalendarPlus className="h-4 w-4" />}>
                      Thêm vào lịch khám
                    </ActionButton>
                    <p className="mt-2 text-xs font-bold text-[#94A3B8]">{message.time}</p>
                  </div>
                );
              }

              return (
                <div key={index} className={`flex ${message.from === "manager" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[76%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.from === "manager" ? "rounded-tr-sm bg-[#2F80ED] text-white" : "rounded-tl-sm bg-white text-[#1E293B]"}`}>
                    {message.text}
                    <p className={`mt-2 text-xs font-bold ${message.from === "manager" ? "text-white/75" : "text-[#94A3B8]"}`}>{message.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#E2E8F0] bg-white p-4">
            <div className="flex gap-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                placeholder="Nhập tin nhắn..."
                className="min-w-0 flex-1 rounded-full border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
              <ActionButton icon={<Send className="h-4 w-4" />} onClick={sendMessage}>Gửi</ActionButton>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
