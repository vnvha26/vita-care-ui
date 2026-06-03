import { useMemo, useState, type ReactNode } from "react";
import { CalendarDays, Clock, FileText, MapPin, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Appointment = {
  id: string;
  date: string;
  time: string;
  patientName: string;
  patientCode: string;
  reason: string;
  status: "Chờ khám" | "Đã xác nhận" | "Tái khám";
  room: string;
  phone: string;
  note: string;
};

type BadgeTone = "blue" | "green" | "amber" | "rose" | "violet" | "slate";

const appointments: Appointment[] = [
  {
    id: "a001",
    date: "2026-06-03",
    time: "09:00 - 09:30",
    patientName: "Đỗ Minh Tú",
    patientCode: "P001",
    reason: "Đau bụng vùng thượng vị, ợ chua sau ăn",
    status: "Chờ khám",
    room: "Phòng 201",
    phone: "0987654321",
    note: "Bệnh nhân có tiền sử dị ứng Penicillin, cần hỏi kỹ thuốc đang dùng.",
  },
  {
    id: "a002",
    date: "2026-06-03",
    time: "10:30 - 11:00",
    patientName: "Nguyễn Văn An",
    patientCode: "P002",
    reason: "Tái khám đường huyết sau ăn",
    status: "Tái khám",
    room: "Phòng 201",
    phone: "0901234567",
    note: "Mang theo sổ đo đường huyết 7 ngày gần nhất.",
  },
  {
    id: "a003",
    date: "2026-06-05",
    time: "14:00 - 14:30",
    patientName: "Trần Thị Bình",
    patientCode: "P003",
    reason: "Theo dõi huyết áp và đau đầu buổi sáng",
    status: "Đã xác nhận",
    room: "Phòng 203",
    phone: "0909876543",
    note: "Kiểm tra chỉ số huyết áp tại nhà và cân nhắc xét nghiệm chức năng thận.",
  },
  {
    id: "a004",
    date: "2026-06-12",
    time: "08:30 - 09:00",
    patientName: "Lê Minh Châu",
    patientCode: "P004",
    reason: "Khám mới đau họng kéo dài",
    status: "Đã xác nhận",
    room: "Phòng 201",
    phone: "0912345678",
    note: "Ưu tiên khai thác sốt, ho, dị ứng thuốc và tiếp xúc gần.",
  },
];

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

export default function DoctorExamination() {
  const [selectedDate, setSelectedDate] = useState("2026-06-03");
  const dayAppointments = useMemo(() => appointments.filter((item) => item.date === selectedDate), [selectedDate]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("a001");
  const selectedAppointment = dayAppointments.find((item) => item.id === selectedAppointmentId) ?? dayAppointments[0];

  const handleSelectDate = (day: number) => {
    const nextDate = `2026-06-${String(day).padStart(2, "0")}`;
    const firstAppointment = appointments.find((item) => item.date === nextDate);
    setSelectedDate(nextDate);
    setSelectedAppointmentId(firstAppointment?.id ?? "");
  };

  return (
    <div>
      <PageHeader
        title="Lịch khám"
        description="Theo dõi danh sách lịch khám theo ngày và xem nhanh thông tin chi tiết từng lịch hẹn."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <SectionCard title="Danh sách lịch khám" description={`Ngày ${formatDate(selectedDate)}`}>
            {dayAppointments.length > 0 ? (
              <div className="space-y-3">
                {dayAppointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    type="button"
                    onClick={() => setSelectedAppointmentId(appointment.id)}
                    className={`flex w-full flex-col gap-4 rounded-[18px] border p-4 text-left transition sm:flex-row sm:items-center ${
                      selectedAppointment?.id === appointment.id
                        ? "border-[#CFE3FF] bg-[#EAF3FF]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-[#1E293B]">{appointment.time}</h3>
                        <StatusBadge tone={getStatusTone(appointment.status)}>{appointment.status}</StatusBadge>
                      </div>
                      <p className="mt-1 text-sm font-bold text-[#2D4A86]">
                        {appointment.patientName} · {appointment.patientCode}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#64748B]">{appointment.reason}</p>
                    </div>
                    <ActionButton variant="secondary">Chi tiết</ActionButton>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#CFE3FF] bg-[#F7FAFC] p-6 text-center text-sm font-bold text-[#64748B]">
                Chưa có lịch khám trong ngày này.
              </div>
            )}
          </SectionCard>

          <SectionCard title="Thông tin chi tiết lịch khám">
            {selectedAppointment ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Info icon={<UserRound className="h-5 w-5" />} label="Bệnh nhân" value={`${selectedAppointment.patientName} · ${selectedAppointment.patientCode}`} />
                  <Info icon={<Clock className="h-5 w-5" />} label="Thời gian" value={`${formatDate(selectedAppointment.date)} · ${selectedAppointment.time}`} />
                  <Info icon={<MapPin className="h-5 w-5" />} label="Phòng khám" value={selectedAppointment.room} />
                  <Info icon={<FileText className="h-5 w-5" />} label="Liên hệ" value={selectedAppointment.phone} />
                </div>

                <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-4">
                  <p className="text-sm font-extrabold text-[#1E293B]">Lý do khám</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedAppointment.reason}</p>
                </div>

                <div className="mt-4 rounded-2xl border border-[#CFE3FF] bg-white p-4">
                  <p className="text-sm font-extrabold text-[#1E293B]">Ghi chú trước khám</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedAppointment.note}</p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#CFE3FF] bg-[#F7FAFC] p-6 text-center text-sm font-bold text-[#64748B]">
                Chọn ngày có lịch khám để xem thông tin chi tiết.
              </div>
            )}
          </SectionCard>
        </div>

        <SectionCard title="Lịch tháng 06/2026" description="Chọn ngày để xem lịch khám bên trái.">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-[#94A3B8]">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              const date = `2026-06-${String(day).padStart(2, "0")}`;
              const count = appointments.filter((item) => item.date === date).length;
              const isSelected = selectedDate === date;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={`min-h-16 rounded-2xl border p-2 text-left transition ${
                    isSelected
                      ? "border-[#2F80ED] bg-[#EAF3FF] text-[#1C64D1]"
                      : count > 0
                        ? "border-[#CFE3FF] bg-white text-[#1E293B] hover:bg-[#F2F7FB]"
                        : "border-[#E2E8F0] bg-white text-[#94A3B8] hover:bg-[#F7FAFC]"
                  }`}
                >
                  <span className="text-sm font-extrabold">{day}</span>
                  {count > 0 && <p className="mt-2 rounded-full bg-[#E8FFF9] px-2 py-1 text-center text-[11px] font-extrabold text-[#148E77]">{count} lịch</p>}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-4">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#1E293B]">
              <CalendarDays className="h-5 w-5 text-[#2F80ED]" />
              Tổng quan ngày chọn
            </div>
            <p className="mt-2 text-sm font-medium text-[#64748B]">
              {dayAppointments.length > 0
                ? `${dayAppointments.length} lịch khám trong ngày ${formatDate(selectedDate)}.`
                : `Không có lịch khám trong ngày ${formatDate(selectedDate)}.`}
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <div className="flex items-center gap-2 text-[#2F80ED]">{icon}</div>
      <p className="mt-3 text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-[#1E293B]">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function getStatusTone(status: Appointment["status"]): BadgeTone {
  if (status === "Chờ khám") return "amber";
  if (status === "Tái khám") return "violet";
  return "green";
}
