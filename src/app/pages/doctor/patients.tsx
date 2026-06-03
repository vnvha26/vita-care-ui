import { Fragment, useState } from "react";
import { FileText, Search, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { patientRecords, type PatientRecord } from "./patient-data";

export default function DoctorPatients() {
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Hồ sơ bệnh án"
        description="Tra cứu hồ sơ, chỉ số cơ thể, triệu chứng và lịch sử khám điều trị của bệnh nhân."
      />

      <SectionCard
        title="Danh sách hồ sơ"
        actions={
          <div className="flex h-11 min-w-[280px] items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
            <Search className="h-4 w-4" />
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Tìm mã hoặc tên bệnh nhân" />
          </div>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="bg-[#F7FAFC] text-[#64748B]">
              <tr>
                <th className="px-4 py-3 font-bold">Bệnh nhân</th>
                <th className="px-4 py-3 font-bold">Liên hệ</th>
                <th className="px-4 py-3 font-bold">Chẩn đoán gần nhất</th>
                <th className="px-4 py-3 font-bold">Chỉ số BMI</th>
                <th className="px-4 py-3 text-right font-bold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map((patient) => {
                const isExpanded = expandedPatientId === patient.id;

                return (
                  <Fragment key={patient.id}>
                    <tr className="border-t border-[#E2E8F0] align-middle">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
                            <UserRound className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-extrabold text-[#1E293B]">{patient.name}</p>
                            <p className="mt-1 text-xs font-bold text-[#94A3B8]">Mã: {patient.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#64748B]">
                        <p className="font-semibold">{patient.phone}</p>
                        <p className="mt-1">{patient.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-[#2D4A86]">{patient.history[0]?.diagnosis}</p>
                        <p className="mt-1 text-[#64748B]">{patient.history[0]?.date}</p>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge tone="green">{patient.bmi}</StatusBadge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <ActionButton
                          variant="secondary"
                          icon={<FileText className="h-4 w-4" />}
                          onClick={() => setExpandedPatientId((current) => (current === patient.id ? null : patient.id))}
                        >
                          {isExpanded ? "Ẩn chi tiết" : "Chi tiết"}
                        </ActionButton>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="border-t border-[#E2E8F0]">
                        <td colSpan={5} className="bg-[#F7FAFC] px-4 py-5">
                          <PatientInlineDetail patient={patient} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function PatientInlineDetail({ patient }: { patient: PatientRecord }) {
  return (
    <div className="rounded-[20px] border border-[#CFE3FF] bg-white p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Info label="Ngày sinh" value={patient.birthDate} />
        <Info label="Giới tính" value={patient.gender} />
        <Info label="Số điện thoại" value={patient.phone} />
        <Info label="Bảo hiểm y tế" value={patient.insurance} />
        <Info label="Nhóm máu" value={patient.bloodType} />
        <Info label="Chiều cao" value={patient.height} />
        <Info label="Cân nặng" value={patient.weight} />
        <Info label="BMI" value={patient.bmi} />
      </div>

      <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-4">
        <p className="text-sm font-extrabold text-[#1E293B]">Ghi chú tiền sử & dị ứng</p>
        <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{patient.notes}</p>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <div>
          <h3 className="text-sm font-extrabold text-[#1E293B]">Triệu chứng lâm sàng</h3>
          <ul className="mt-3 list-disc space-y-2 rounded-2xl border-l-4 border-[#4C83F1] bg-[#F7FAFC] px-6 py-4 text-sm leading-6 text-[#475569]">
            {patient.symptoms.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-[#1E293B]">Kết quả xét nghiệm</h3>
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#E2E8F0]">
            {patient.tests.map((test) => (
              <div key={test.name} className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-3 text-sm last:border-b-0">
                <span className="font-medium text-[#475569]">{test.name}</span>
                <span className="font-extrabold text-[#49A95C]">{test.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-extrabold text-[#1E293B]">Lịch sử khám & điều trị</h3>
        <div className="mt-3 space-y-3">
          {patient.history.map((visit) => (
            <div key={visit.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-extrabold text-[#2D4A86]">{visit.diagnosis}</p>
                <StatusBadge tone="blue">{visit.date}</StatusBadge>
              </div>
              <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{visit.treatment}</p>
              <p className="mt-2 text-xs font-bold text-[#94A3B8]">Bác sĩ khám: {visit.doctor}</p>
            </div>
          ))}
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
