import { useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { CalendarClock, CalendarPlus, Clock, MapPin, Stethoscope, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { getPatientAppointments, type PatientAppointment } from "../../lib/patient-appointments";

export default function PatientAppointments() {
  const location = useLocation();
  const visibleAppointments = useMemo(() => {
    const appointments = getPatientAppointments();
    const temporaryAppointment = (location.state as { appointment?: PatientAppointment } | null)?.appointment;
    if (!temporaryAppointment?.id) return appointments;

    return [temporaryAppointment, ...appointments.filter((appointment) => appointment.id !== temporaryAppointment.id)];
  }, [location.state]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lịch khám của tôi"
        description="Quản lý lịch hẹn đã đặt, trạng thái xác nhận và các thay đổi cần xử lý."
        actions={
          <Link to="/patient/book">
            <ActionButton icon={<CalendarPlus className="h-4 w-4" />}>Đặt lịch khám mới</ActionButton>
          </Link>
        }
      />

      <SectionCard title="Danh sách lịch khám">
        <div className="space-y-3">
          {visibleAppointments.map((appointment) => (
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
                    {appointment.isOverdue && <StatusBadge tone="rose">Quá hạn</StatusBadge>}
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

function AppointmentDetail({ appointment }: { appointment: PatientAppointment }) {
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

function getStatusTone(status: PatientAppointment["status"]) {
  if (status === "Chờ khám" || status === "Chờ xác nhận") return "amber";
  if (status === "Đã đổi lịch") return "violet";
  return "green";
}
