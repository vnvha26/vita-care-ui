import { useState } from "react";
import { CalendarClock, CheckCircle2, MessageSquare, UserRound, Users } from "lucide-react";
import { ActionButton, DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";
import { patientRecords } from "./patient-data";

const todayAppointments = [
  { time: "09:00 - 10:00", patientId: "p001", symptoms: "Đau bụng vùng thượng vị, ợ chua sau ăn" },
  { time: "10:30 - 11:30", patientId: "p002", symptoms: "Tái khám đường huyết, cần xem chỉ số sau ăn" },
  { time: "14:00 - 15:00", patientId: "p003", symptoms: "Theo dõi huyết áp và đau đầu buổi sáng" },
];

export default function DoctorDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState(todayAppointments[0].patientId);
  const selectedPatient = patientRecords.find((patient) => patient.id === selectedPatientId) ?? patientRecords[0];

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
        <div className="space-y-5">
          <SectionCard title="Timeline lịch khám hôm nay">
            <div className="space-y-3">
              {todayAppointments.map((appointment) => {
                const patient = patientRecords.find((item) => item.id === appointment.patientId) ?? patientRecords[0];

                return (
                  <DataRow
                    key={appointment.time}
                    active={selectedPatientId === appointment.patientId}
                    title={`${appointment.time} - ${patient.name}`}
                    description={`Triệu chứng: ${appointment.symptoms}`}
                    icon={<CalendarClock className="h-5 w-5" />}
                    actions={
                      <>
                        <ActionButton variant="secondary" onClick={() => setSelectedPatientId(appointment.patientId)}>
                          Xem hồ sơ
                        </ActionButton>
                        <ActionButton>Bắt đầu khám</ActionButton>
                      </>
                    }
                  />
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Thông tin hồ sơ bệnh nhân">
            <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-5 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F4D5EB] text-[#D33C87]">
                  <UserRound className="h-9 w-9" />
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-[#2D4A86]">{selectedPatient.name}</h2>
                <p className="mt-1 text-sm font-bold text-[#94A3B8]">Mã: {selectedPatient.code}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Info label="Ngày sinh" value={selectedPatient.birthDate} />
                <Info label="Giới tính" value={selectedPatient.gender} />
                <Info label="Số điện thoại" value={selectedPatient.phone} />
                <Info label="Email" value={selectedPatient.email} />
                <Info label="BMI" value={selectedPatient.bmi} />
                <Info label="Nhóm máu" value={selectedPatient.bloodType} />
                <div className="md:col-span-2">
                  <p className="text-sm font-extrabold text-[#1E293B]">Ghi chú</p>
                  <p className="mt-1 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#64748B]">
                    {selectedPatient.notes}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
      <p className="mt-1 text-sm font-extrabold text-[#1E293B]">{value}</p>
    </div>
  );
}
