import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { CalendarClock, Clock, MapPin, Stethoscope, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Appointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  clinic: string;
  address: string;
  status: "Chờ khám" | "Đã xác nhận" | "Đã đổi lịch";
  reason: string;
  note: string;
};

const appointments: Appointment[] = [
  {
    id: "a001",
    title: "Tái khám nội tổng quát",
    date: "07/06/2026",
    time: "09:00 - 09:30",
    doctor: "BS. Nguyễn Văn A",
    specialty: "Nội tổng quát",
    clinic: "VitaCare AI Clinic",
    address: "Tầng 2, 25 Nguyễn Trãi, Hà Nội",
    status: "Chờ khám",
    reason: "Theo dõi đau thượng vị và tình trạng ợ chua sau ăn.",
    note: "Mang theo đơn thuốc cũ, đến trước giờ khám 15 phút để xác nhận thông tin.",
  },
  {
    id: "a002",
    title: "Khám tiêu hóa",
    date: "12/06/2026",
    time: "14:00 - 14:30",
    doctor: "BS. Trần Thị B",
    specialty: "Tiêu hóa",
    clinic: "Phòng khám Chuyên khoa Tiêu hóa",
    address: "105 Lý Thường Kiệt, Hà Nội",
    status: "Đã xác nhận",
    reason: "Đánh giá đau dạ dày, trào ngược và chế độ ăn.",
    note: "Không dùng cà phê trước buổi khám, ghi lại các món ăn dễ làm đau bụng.",
  },
  {
    id: "a003",
    title: "Tư vấn kết quả xét nghiệm",
    date: "18/06/2026",
    time: "10:00 - 10:20",
    doctor: "BS. Lê Minh C",
    specialty: "Nội tổng quát",
    clinic: "Tư vấn trực tuyến",
    address: "Cuộc gọi video trong ứng dụng",
    status: "Đã đổi lịch",
    reason: "Bác sĩ giải thích kết quả xét nghiệm máu và chỉ số men gan.",
    note: "Kiểm tra kết nối mạng trước 5 phút, chuẩn bị câu hỏi cần tư vấn.",
  },
];

export default function PatientAppointments() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lịch khám của tôi"
        description="Quản lý lịch hẹn đã đặt, trạng thái xác nhận và các thay đổi cần xử lý."
        actions={
          <Link to="/patient/book">
            <ActionButton>Đặt lịch mới</ActionButton>
          </Link>
        }
      />

      <SectionCard title="Danh sách lịch khám">
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`rounded-[18px] border p-4 transition ${
                expandedId === appointment.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-[#1E293B]">{appointment.title}</h3>
                    <StatusBadge tone={getStatusTone(appointment.status)}>{appointment.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#2D4A86]">
                    {appointment.time} · {appointment.date} · {appointment.doctor}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#64748B]">{appointment.reason}</p>
                </div>
                <ActionButton variant="secondary" onClick={() => setExpandedId((current) => (current === appointment.id ? null : appointment.id))}>
                  {expandedId === appointment.id ? "Ẩn chi tiết" : "Chi tiết"}
                </ActionButton>
              </div>

              {expandedId === appointment.id && <AppointmentDetail appointment={appointment} />}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function AppointmentDetail({ appointment }: { appointment: Appointment }) {
  return (
    <div className="mt-4 rounded-2xl border border-[#CFE3FF] bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Info icon={<Clock className="h-5 w-5" />} label="Thời gian" value={`${appointment.time} · ${appointment.date}`} />
        <Info icon={<Stethoscope className="h-5 w-5" />} label="Bác sĩ" value={appointment.doctor} />
        <Info icon={<UserRound className="h-5 w-5" />} label="Chuyên khoa" value={appointment.specialty} />
        <Info icon={<MapPin className="h-5 w-5" />} label="Địa điểm" value={appointment.clinic} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-4">
          <p className="text-sm font-extrabold text-[#1E293B]">Địa chỉ</p>
          <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{appointment.address}</p>
        </div>
        <div className="rounded-2xl border border-[#CFE3FF] bg-white p-4">
          <p className="text-sm font-extrabold text-[#1E293B]">Lưu ý trước khám</p>
          <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{appointment.note}</p>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <div className="text-[#2F80ED]">{icon}</div>
      <p className="mt-3 text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-extrabold leading-6 text-[#1E293B]">{value}</p>
    </div>
  );
}

function getStatusTone(status: Appointment["status"]) {
  if (status === "Chờ khám") return "amber";
  if (status === "Đã đổi lịch") return "violet";
  return "green";
}
