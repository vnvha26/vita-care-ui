import { useState } from "react";
import { Activity, BarChart3, Bot, Calendar, CheckCircle2, ClipboardList, FileText, Send, User, Users } from "lucide-react";
import { ActionButton, DataRow, PageHeader, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

type Tone = "blue" | "green" | "amber" | "rose" | "violet" | "slate";

type Stat = {
  label: string;
  value: string;
  helper?: string;
  tone?: Tone;
};

type Row = {
  title: string;
  description: string;
  badge?: string;
  tone?: Tone;
};

const statIcons = [Calendar, ClipboardList, Users, BarChart3];

export function DashboardPage({
  title,
  description,
  stats,
  primaryTitle,
  primaryRows,
  sideTitle,
  sideRows,
}: {
  title: string;
  description: string;
  stats: Stat[];
  primaryTitle: string;
  primaryRows: Row[];
  sideTitle: string;
  sideRows: Row[];
}) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return <StatCard key={stat.label} {...stat} icon={<Icon className="h-5 w-5" />} />;
        })}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <SectionCard title={primaryTitle}>
          <div className="space-y-3">
            {primaryRows.map((row) => (
              <DataRow
                key={row.title}
                title={row.title}
                description={row.description}
                icon={<ClipboardList className="h-5 w-5" />}
                meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined}
              />
            ))}
          </div>
        </SectionCard>
        <SectionCard title={sideTitle}>
          <div className="space-y-3">
            {sideRows.map((row) => (
              <DataRow
                key={row.title}
                title={row.title}
                description={row.description}
                icon={<Activity className="h-5 w-5" />}
                meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function ListPage({ title, description, rows, actionLabel }: { title: string; description: string; rows: Row[]; actionLabel?: string }) {
  return (
    <div>
      <PageHeader title={title} description={description} actions={actionLabel ? <ActionButton>{actionLabel}</ActionButton> : undefined} />
      <SectionCard>
        <div className="space-y-3">
          {rows.map((row) => (
            <DataRow
              key={row.title}
              title={row.title}
              description={row.description}
              icon={<FileText className="h-5 w-5" />}
              meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined}
              actions={<ActionButton variant="secondary">Chi tiết</ActionButton>}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

export function ChatPage({
  title,
  description,
  contacts,
  currentName,
  messages,
}: {
  title: string;
  description: string;
  contacts: Row[];
  currentName: string;
  messages: Row[];
}) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="grid h-[calc(100vh-220px)] min-h-[560px] gap-6 xl:grid-cols-[340px_1fr]">
        <SectionCard title="Cuộc trò chuyện" className="overflow-hidden">
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <DataRow
                key={contact.title}
                active={index === 0}
                title={contact.title}
                description={contact.description}
                icon={<User className="h-5 w-5" />}
                meta={contact.badge ? <StatusBadge tone={contact.tone}>{contact.badge}</StatusBadge> : undefined}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title={currentName} description="Trao đổi tập trung, rõ ngữ cảnh và có thể chuyển thành tác vụ." className="flex flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#F7FAFC] p-5">
            {messages.map((item, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    index % 2 === 0 ? "rounded-tl-sm bg-white text-[#1E293B] shadow-sm" : "rounded-tr-sm bg-[#2F80ED] text-white"
                  }`}
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 opacity-90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E2E8F0] bg-white p-4">
            <div className="flex gap-3">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 rounded-full border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
              <ActionButton icon={<Send className="h-4 w-4" />}>Gửi</ActionButton>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function FormPage({
  title,
  description,
  fields,
  sideTitle = "Thông tin hỗ trợ",
  sideRows = [],
}: {
  title: string;
  description: string;
  fields: string[];
  sideTitle?: string;
  sideRows?: Row[];
}) {
  return (
    <div>
      <PageHeader title={title} description={description} actions={<ActionButton>Lưu thay đổi</ActionButton>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <SectionCard title="Biểu mẫu">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field}>
                <label className="text-sm font-semibold text-[#1E293B]">{field}</label>
                <input className="mt-2 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" />
              </div>
            ))}
          </div>
          <textarea className="mt-4 min-h-28 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Ghi chú" />
        </SectionCard>
        <SectionCard title={sideTitle}>
          <div className="space-y-3">
            {sideRows.map((row) => (
              <DataRow
                key={row.title}
                title={row.title}
                description={row.description}
                icon={<CheckCircle2 className="h-5 w-5" />}
                meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export function ReportPage({ title, description, rows }: { title: string; description: string; rows: Row[] }) {
  return (
    <div>
      <PageHeader title={title} description={description} actions={<ActionButton>Xuất báo cáo</ActionButton>} />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Hoàn thành" value="86%" helper="Tăng 12% so với tuần trước" tone="green" icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard label="Đang xử lý" value="24" helper="Cần theo dõi trong hôm nay" tone="amber" icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Cảnh báo" value="3" helper="Ưu tiên kiểm tra" tone="rose" icon={<Bot className="h-5 w-5" />} />
      </div>
      <div className="mt-6">
        <SectionCard title="Phân tích chính">
          <div className="space-y-3">
            {rows.map((row) => (
              <DataRow key={row.title} title={row.title} description={row.description} icon={<BarChart3 className="h-5 w-5" />} meta={row.badge ? <StatusBadge tone={row.tone}>{row.badge}</StatusBadge> : undefined} />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export const commonRows = {
  care: [
    { title: "Đau đầu, buồn nôn", description: "Đã ghi nhận triệu chứng, chatbot đánh giá nguy cơ trung bình.", badge: "Theo dõi", tone: "amber" as Tone },
    { title: "Ho, đau họng", description: "Triệu chứng nhẹ, gợi ý chăm sóc tại nhà.", badge: "Ổn định", tone: "green" as Tone },
    { title: "Mệt mỏi kéo dài", description: "Cần bổ sung thông tin giấc ngủ và bệnh nền.", badge: "Bổ sung", tone: "rose" as Tone },
  ],
  operations: [
    { title: "Lịch hẹn sáng nay", description: "12 lịch đã xác nhận, 2 lịch cần điều phối lại.", badge: "Hôm nay", tone: "blue" as Tone },
    { title: "Dữ liệu AI", description: "18 câu hỏi mới được đưa vào hàng chờ kiểm duyệt.", badge: "Mới", tone: "violet" as Tone },
    { title: "Phản hồi người dùng", description: "Điểm hài lòng trung bình đạt 4.8/5.", badge: "Tốt", tone: "green" as Tone },
  ],
  clinical: [
    { title: "Nguyễn Văn A", description: "Tái khám đường huyết, cần xem chỉ số sau ăn.", badge: "Ưu tiên", tone: "amber" as Tone },
    { title: "Nguyễn Minh A", description: "Khám mới cao huyết áp, cần đánh giá nguy cơ tim mạch.", badge: "Mới", tone: "blue" as Tone },
    { title: "Nguyễn Minh B", description: "Đau ngực cấp, đã chuyển chuyên gia đánh giá.", badge: "Khẩn", tone: "rose" as Tone },
  ],
};
