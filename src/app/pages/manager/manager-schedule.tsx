import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { ActionButton, PageHeader, SectionCard } from "../../components/layout/role-page";

type ShiftTone = "blue" | "amber" | "violet";
type Shift = {
  time: string;
  doctor: string;
  specialty: string;
  tone: ShiftTone;
};

const days = [
  { label: "Thứ 2", date: "15", shifts: ["morning-a", "morning-b", "afternoon", "evening"] },
  { label: "Thứ 3", date: "16", shifts: ["morning-a", "morning-b", "afternoon"] },
  { label: "Thứ 4", date: "17", shifts: ["morning-a", "morning-b", "afternoon", "evening"] },
  { label: "Thứ 5", date: "18", shifts: ["morning-a", "morning-b", "afternoon"] },
  { label: "Thứ 6", date: "19", shifts: ["morning-a", "morning-b", "afternoon", "evening"] },
  { label: "Thứ 7", date: "20", shifts: ["morning-a", "morning-b", "afternoon"] },
  { label: "Chủ nhật", date: "21", shifts: [] },
];

const shiftMap: Record<string, Shift> = {
  "morning-a": { time: "08:00 - 12:00", doctor: "BS. Nguyễn Khám Bệnh", specialty: "Nội khoa", tone: "blue" },
  "morning-b": { time: "08:00 - 12:00", doctor: "BS. Trần Hay Hỏi", specialty: "Nhi khoa", tone: "blue" },
  afternoon: { time: "13:30 - 17:30", doctor: "BS. Lê Googler", specialty: "Tim mạch", tone: "amber" },
  evening: { time: "18:00 - 20:00", doctor: "BS. Thánh Bùng Lịch", specialty: "Răng Hàm Mặt", tone: "violet" },
};

export default function ManagerSchedule() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Thiết lập khung giờ làm việc"
        description="Phân bổ ca trực và thời gian làm việc của bác sĩ."
        actions={
          <>
            <ActionButton variant="secondary" icon={<CalendarDays className="h-4 w-4" />}>15/05 - 21/05, 2026</ActionButton>
            <ActionButton icon={<Plus className="h-4 w-4" />}>Thêm ca trực</ActionButton>
          </>
        }
      />

      <SectionCard
        title="Tuần này"
        actions={
          <div className="flex flex-wrap gap-2">
            <ActionButton variant="ghost">Ca Sáng</ActionButton>
            <ActionButton variant="ghost">Ca Chiều</ActionButton>
            <ActionButton variant="ghost">Ca Tối</ActionButton>
          </div>
        }
      >
        <div className="mb-4 flex items-center gap-3">
          <button className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F2F7FB]"><ChevronLeft className="h-4 w-4" /></button>
          <button className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B] hover:bg-[#F2F7FB]"><ChevronRight className="h-4 w-4" /></button>
        </div>

        <div className="grid min-w-[980px] overflow-hidden rounded-2xl border border-[#E2E8F0] xl:min-w-0 xl:grid-cols-7">
          {days.map((day) => (
            <div key={day.date} className="min-h-[520px] border-r border-[#E2E8F0] bg-white last:border-r-0">
              <div className="border-b border-[#E2E8F0] p-4 text-center">
                <p className="text-sm font-bold text-[#64748B]">{day.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-[#1E293B]">{day.date}</p>
              </div>

              <div className="space-y-3 p-3">
                {day.shifts.length ? (
                  day.shifts.map((shiftId) => <ShiftCard key={`${day.date}-${shiftId}`} shift={shiftMap[shiftId]} />)
                ) : (
                  <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-[#E2E8F0] text-sm font-bold text-[#94A3B8]">
                    Nghỉ
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function ShiftCard({ shift }: { shift: Shift }) {
  const tone = {
    blue: "border-[#93C5FD] border-l-[#2F80ED] text-[#1C64D1]",
    amber: "border-[#FDE7B8] border-l-[#F59E0B] text-[#C77805]",
    violet: "border-[#DDD7FF] border-l-[#8B7CF6] text-[#6D5FE5]",
  }[shift.tone];

  return (
    <div className={`rounded-2xl border border-l-4 bg-white p-3 shadow-sm ${tone}`}>
      <p className="flex items-center gap-1 text-xs font-extrabold">
        <Clock className="h-3.5 w-3.5" />
        {shift.time}
      </p>
      <p className="mt-2 text-sm font-extrabold text-[#1E293B]">{shift.doctor}</p>
      <p className="mt-1 text-xs font-medium text-[#64748B]">{shift.specialty}</p>
    </div>
  );
}
