import { useState } from "react";
import { CalendarClock, CheckCircle2, MessageSquare, UserRound, Users } from "lucide-react";
import { ActionButton, DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";
import { patientRecords, type PatientRecord } from "./patient-data";

const todayAppointments = [
  { time: "09:00 - 10:00", patientId: "p001", symptoms: "Đau bụng vùng thượng vị, ợ chua sau ăn" },
  { time: "10:30 - 11:30", patientId: "p002", symptoms: "Tái khám đường huyết, cần xem chỉ số sau ăn" },
  { time: "11:45 - 12:15", patientId: "p001", symptoms: "Kiểm tra kết quả nội soi và đơn thuốc" },
  { time: "14:00 - 15:00", patientId: "p003", symptoms: "Theo dõi huyết áp và đau đầu buổi sáng" },
  { time: "15:30 - 16:00", patientId: "p002", symptoms: "Tư vấn chế độ ăn cho đường huyết cao" },
  { time: "16:30 - 17:00", patientId: "p003", symptoms: "Đo huyết áp tại phòng khám và tạo lịch tái khám" },
];

export default function DoctorDashboard() {
  const [expandedAppointmentTime, setExpandedAppointmentTime] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold">Xin chào, Nguyễn Văn B</h1>
        <p className="mt-2 text-sm font-medium text-[#64748B]">Lịch làm việc hôm nay của bạn.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Lịch khám hôm nay" value="6" helper="Xem trực hôm nay" tone="blue" icon={<CalendarClock className="h-5 w-5" />} />
        <StatCard label="Lịch hẹn cần duyệt" value="5" helper="Duyệt ngay" tone="amber" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Tin nhắn mới" value="4" helper="Trả lời bệnh nhân" tone="violet" icon={<MessageSquare className="h-5 w-5" />} />
        <StatCard label="Tỉ lệ hoàn thành" value="86%" helper="So với tuần trước" tone="green" icon={<Users className="h-5 w-5" />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <SectionCard title="Timeline lịch khám hôm nay">
          <div className="space-y-3">
            {todayAppointments.map((appointment) => {
              const patient = patientRecords.find((item) => item.id === appointment.patientId) ?? patientRecords[0];
              const isExpanded = expandedAppointmentTime === appointment.time;

              return (
                <div key={appointment.time} className="space-y-3">
                  <DataRow
                    active={isExpanded}
                    title={`${appointment.time} - ${patient.name}`}
                    description={`Triệu chứng: ${appointment.symptoms}`}
                    icon={<CalendarClock className="h-5 w-5" />}
                    actions={
                      <>
                        <ActionButton
                          variant="secondary"
                          onClick={() => setExpandedAppointmentTime((current) => (current === appointment.time ? null : appointment.time))}
                        >
                          {isExpanded ? "Ẩn hồ sơ" : "Xem hồ sơ"}
                        </ActionButton>
                        <ActionButton>Bắt đầu khám</ActionButton>
                      </>
                    }
                  />
                  {isExpanded && <PatientSummary patient={patient} />}
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Tin nhắn mới">
          <div className="space-y-3">
            {[
              ["Đỗ Minh Tú", "Đau vùng thượng vị sau ăn", "08:15"],
              ["Nguyễn Văn An", "Hỏi về đơn thuốc", "10:05"],
              ["Trần Thị Bình", "Gửi chỉ số huyết áp mới", "18:01"],
            ].map(([name, message, time]) => (
              <DataRow
                key={name}
                title={name}
                description={message}
                meta={<StatusBadge tone="blue">{time}</StatusBadge>}
                icon={<MessageSquare className="h-5 w-5" />}
              />
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}

function PatientSummary({ patient }: { patient: PatientRecord }) {
  return (
    <div className="rounded-[20px] border border-[#CFE3FF] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4D5EB] text-[#D33C87]">
            <UserRound className="h-9 w-9" />
          </div>
          <h2 className="mt-4 text-lg font-extrabold text-[#2D4A86]">{patient.name}</h2>
          <p className="mt-1 text-sm font-bold text-[#94A3B8]">Mã: {patient.code}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Info label="Ngày sinh" value={patient.birthDate} />
          <Info label="Giới tính" value={patient.gender} />
          <Info label="Số điện thoại" value={patient.phone} />
          <Info label="Email" value={patient.email} />
          <Info label="BMI" value={patient.bmi} />
          <Info label="Nhóm máu" value={patient.bloodType} />
          <div className="md:col-span-2">
            <p className="text-sm font-extrabold text-[#1E293B]">Ghi chú</p>
            <p className="mt-1 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 py-3 text-sm font-medium leading-6 text-[#64748B]">
              {patient.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-[#1E293B]">{value}</p>
    </div>
  );
}
