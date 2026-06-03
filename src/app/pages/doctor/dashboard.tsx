import { CalendarClock, CheckCircle2, MessageSquare, Users } from "lucide-react";
import { ActionButton, DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

export default function DoctorDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold">Xin chào, Nguyễn Văn B</h1>
        <p className="mt-2 text-sm font-medium text-[#64748B]">Lịch làm việc hôm nay của bạn.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Lịch khám hôm nay" value="3" helper="Xem trực hôm nay" tone="blue" icon={<CalendarClock className="h-5 w-5" />} />
        <StatCard label="Lịch hẹn cần duyệt" value="5" helper="Duyệt ngay" tone="amber" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Tin nhắn mới" value="4" helper="Trả lời bệnh nhân" tone="violet" icon={<MessageSquare className="h-5 w-5" />} />
        <StatCard label="Tỉ lệ hoàn thành" value="86%" helper="So với tuần trước" tone="green" icon={<Users className="h-5 w-5" />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <SectionCard title="Timeline lịch khám hôm nay">
          <div className="space-y-3">
            {[
              ["09:00 - 10:00", "Nguyễn Văn A", "Sốt nhẹ, đau họng"],
              ["10:30 - 11:30", "Nguyễn Minh A", "Đau bụng âm ỉ"],
              ["14:00 - 15:00", "Nguyễn Minh B", "Tái khám dạ dày"],
            ].map(([time, name, symptoms]) => (
              <DataRow
                key={time}
                title={`${time} - ${name}`}
                description={`Triệu chứng: ${symptoms}`}
                icon={<CalendarClock className="h-5 w-5" />}
                actions={
                  <>
                    <ActionButton variant="secondary">Xem hồ sơ</ActionButton>
                    <ActionButton>Bắt đầu khám</ActionButton>
                  </>
                }
              />
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Tin nhắn mới">
          <div className="space-y-3">
            {[
              ["Nguyễn Văn A", "Triệu chứng sốt, đau họng", "08:15"],
              ["Nguyễn Minh A", "Đau bụng âm ỉ không dứt", "10:05"],
              ["Nguyễn Minh B", "Đau, chảy nước mắt", "18:01"],
            ].map(([name, message, time]) => (
              <DataRow key={name} title={name} description={message} meta={<StatusBadge tone="blue">{time}</StatusBadge>} icon={<MessageSquare className="h-5 w-5" />} />
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
