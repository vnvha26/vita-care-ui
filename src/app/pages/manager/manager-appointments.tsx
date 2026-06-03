import { CalendarDays, ChevronLeft, ChevronRight, Filter, Plus, Phone } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type AppointmentTone = "amber" | "blue" | "green";
type Appointment = {
  time: string;
  patient: string;
  phone: string;
  reason: string;
  type: string;
  tone: AppointmentTone;
};

const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00"];
const appointments: Appointment[] = [
  { time: "08:00", patient: "Lê Văn Hùng", phone: "0901 234 567", reason: "Đau rát họng kéo dài", type: "Khám mới", tone: "amber" },
  { time: "08:00", patient: "Phạm Thị Lan", phone: "0987 654 321", reason: "Tái khám nội soi dạ dày", type: "Tái khám", tone: "blue" },
  { time: "08:00", patient: "Trịnh Quang Thái", phone: "0912 333 444", reason: "Nhổ răng khôn", type: "Khám mới", tone: "green" },
  { time: "09:00", patient: "Nguyễn Khám Bệnh", phone: "0911 233 344", reason: "Đau đầu, chóng mặt", type: "Khám mới", tone: "green" },
  { time: "09:00", patient: "Trần Minh Tuấn", phone: "0933 445 566", reason: "Lấy kết quả xét nghiệm máu", type: "Tái khám", tone: "blue" },
  { time: "10:00", patient: "Lý Thị Bình", phone: "0966 778 899", reason: "Khám tổng quát", type: "Khám mới", tone: "amber" },
  { time: "14:00", patient: "Võ Thị Sáu", phone: "0909 222 111", reason: "Tư vấn tim mạch", type: "Khám mới", tone: "amber" },
];

export default function ManagerAppointments() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tiếp nhận lịch hẹn"
        description="Lịch trình khám bệnh trong ngày, gồm lịch AI đề xuất và lịch đã xác nhận."
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Legend color="bg-[#F59E0B]" label="Chờ xác nhận" />
            <Legend color="bg-[#2F80ED]" label="Đã xác nhận" />
            <Legend color="bg-[#27C3A2]" label="Đã hoàn thành" />
            <ActionButton icon={<Plus className="h-4 w-4" />}>Tạo lịch mới</ActionButton>
          </div>
        }
      />

      <SectionCard
        title="Hôm nay, 15/05/2026"
        actions={<ActionButton variant="secondary" icon={<Filter className="h-4 w-4" />}>Lọc & Tìm kiếm</ActionButton>}
      >
        <div className="mb-4 flex items-center gap-3">
          <button className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F2F7FB]"><ChevronLeft className="h-4 w-4" /></button>
          <CalendarDays className="h-5 w-5 text-[#2F80ED]" />
          <button className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F2F7FB]"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="space-y-1">
          {hours.map((hour) => {
            const items = appointments.filter((appointment) => appointment.time === hour);

            return (
              <div key={hour} className="grid min-h-28 gap-4 border-t border-[#E2E8F0] py-5 lg:grid-cols-[90px_1fr]">
                <div className="text-xl font-extrabold text-[#1E293B]">{hour}</div>
                {items.length ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    {items.map((appointment) => (
                      <AppointmentCard key={`${appointment.time}-${appointment.patient}`} appointment={appointment} />
                    ))}
                  </div>
                ) : (
                  <button className="text-left text-sm font-bold italic text-[#93C5FD]">+ Bấm để thêm lịch hẹn</button>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const toneClass = {
    amber: "border-[#F59E0B] bg-[#FFF7D6] text-[#7C3F00]",
    blue: "border-[#93C5FD] bg-[#EAF3FF] text-[#1C64D1]",
    green: "border-[#86EFAC] bg-[#E8FFF0] text-[#166534]",
  }[appointment.tone];

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${toneClass}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-extrabold">{appointment.patient}</h3>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-extrabold uppercase">{appointment.type}</span>
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm font-bold">
        <Phone className="h-4 w-4" />
        {appointment.phone}
      </p>
      <p className="mt-2 text-sm font-medium">{appointment.reason}</p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-[#1E293B]">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </div>
  );
}
