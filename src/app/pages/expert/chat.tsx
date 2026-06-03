import { useState } from "react";
import { Bot, FileText, MessageCircle, Paperclip, Send, Stethoscope, UserRound, Users } from "lucide-react";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type ThreadType = "user" | "doctor";

const userThreads = [
  {
    id: "T-001",
    name: "Nguyễn Văn A",
    subtitle: "Người dùng cần xác minh phản hồi AI",
    last: "Tôi vẫn còn sốt và đau họng sau 2 ngày.",
    time: "08:15",
    badge: "Cần phản hồi",
  },
  {
    id: "T-002",
    name: "Nguyễn Văn C",
    subtitle: "Gắn với ca CASE-003",
    last: "AI có gợi ý đặt lịch khám hô hấp.",
    time: "09:40",
    badge: "Đang theo dõi",
  },
  {
    id: "T-003",
    name: "Nguyễn Văn D",
    subtitle: "Hỏi về dữ liệu thuốc",
    last: "Tôi muốn biết thuốc này có tương tác không.",
    time: "10:05",
    badge: "Mới",
  },
];

const doctorThreads = [
  {
    id: "D-001",
    name: "BS. Nguyễn Văn B",
    subtitle: "Cần góp ý chuyên môn",
    last: "Ca CASE-001 nên điều chỉnh mức ưu tiên?",
    time: "08:35",
    badge: "Ưu tiên",
  },
  {
    id: "D-002",
    name: "BS. Nguyễn Văn C",
    subtitle: "Trao đổi kịch bản AI",
    last: "Câu hỏi khai thác triệu chứng còn thiếu.",
    time: "11:20",
    badge: "Đang xử lý",
  },
];

const messages = [
  {
    from: "doctor",
    text: "Ca CASE-001 đang có dấu hiệu sốt cao và đau họng. AI xếp mức trung bình, tôi muốn chuyên gia kiểm tra lại.",
    time: "08:35",
  },
  {
    from: "expert",
    text: "Tôi đã xem lịch sử hội thoại. Nên bổ sung câu hỏi về khó thở, SpO2 và thời gian sốt để xác định mức ưu tiên chính xác hơn.",
    time: "08:42",
  },
  {
    from: "doctor",
    text: "Nếu người dùng có khó thở thì có nên chuyển sang cảnh báo đi khám ngay không?",
    time: "08:44",
  },
];

export default function ExpertChat() {
  const [activeTab, setActiveTab] = useState<ThreadType>("user");
  const threads = activeTab === "user" ? userThreads : doctorThreads;

  return (
    <div>
      <PageHeader
        title="Chat & yêu cầu"
        description="Trao đổi với người dùng, bác sĩ và đội vận hành về các ca cần kiểm duyệt phản hồi AI."
        actions={<ActionButton icon={<MessageCircle className="h-4 w-4" />}>Tạo ghi chú</ActionButton>}
      />

      <div className="grid min-h-[calc(100vh-190px)] gap-5 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
        <SectionCard className="p-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("user")}
              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                activeTab === "user" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"
              }`}
            >
              Người dùng
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("doctor")}
              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                activeTab === "doctor" ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"
              }`}
            >
              Bác sĩ
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {threads.map((thread, index) => (
              <button
                key={thread.id}
                type="button"
                className={`w-full rounded-[18px] border p-4 text-left transition ${
                  index === 0 ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED]">
                    {activeTab === "user" ? <UserRound className="h-5 w-5" /> : <Stethoscope className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-bold text-[#1E293B]">{thread.name}</p>
                      <span className="text-xs font-semibold text-[#94A3B8]">{thread.time}</span>
                    </div>
                    <p className="mt-1 truncate text-xs font-semibold text-[#64748B]">{thread.subtitle}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#64748B]">{thread.last}</p>
                    <div className="mt-3">
                      <StatusBadge tone={index === 0 ? "amber" : "blue"}>{thread.badge}</StatusBadge>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={activeTab === "user" ? "Nguyễn Văn A" : "BS. Nguyễn Văn B"}
          description={activeTab === "user" ? "Hội thoại người dùng cần kiểm duyệt AI" : "Trao đổi chuyên môn với bác sĩ"}
          actions={<StatusBadge tone="amber">CASE-001</StatusBadge>}
          className="flex min-h-[620px] flex-col"
        >
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message) => {
              const isExpert = message.from === "expert";
              return (
                <div key={`${message.time}-${message.text}`} className={`flex ${isExpert ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-[20px] px-4 py-3 text-sm leading-6 ${
                      isExpert
                        ? "rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] text-white"
                        : "rounded-bl-md bg-[#F2F7FB] text-[#1E293B]"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`mt-2 text-xs font-semibold ${isExpert ? "text-white/75" : "text-[#94A3B8]"}`}>{message.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-2">
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] hover:bg-white">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-[#94A3B8]"
              placeholder="Nhập phản hồi chuyên môn..."
            />
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F80ED] text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </SectionCard>

        <div className="space-y-5">
          <SectionCard title="Ca liên quan" description="Thông tin đang được trao đổi.">
            <div className="space-y-3 text-sm">
              <DataRow
                title="CASE-001"
                description="Sốt cao, đau họng, mệt mỏi. AI đề xuất theo dõi và đặt lịch nếu kéo dài."
                icon={<FileText className="h-5 w-5" />}
                meta={<StatusBadge tone="amber">Ưu tiên cao</StatusBadge>}
              />
              <div className="rounded-2xl bg-[#F2F7FB] p-4">
                <p className="font-bold text-[#1E293B]">Ghi chú chuyên gia</p>
                <p className="mt-2 leading-6 text-[#64748B]">
                  Cần bổ sung câu hỏi loại trừ dấu hiệu nặng: khó thở, đau ngực, SpO2 thấp, sốt kéo dài trên 3 ngày.
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Yêu cầu đang mở">
            <div className="space-y-3">
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
