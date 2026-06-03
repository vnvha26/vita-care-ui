import { Link } from "react-router";
import { FileText, Search, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { patientRecords } from "./patient-data";

export default function DoctorPatients() {
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
              {patientRecords.map((patient) => (
                <tr key={patient.id} className="border-t border-[#E2E8F0] align-middle">
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
                    <Link to={`/doctor/patients/${patient.id}`}>
                      <ActionButton variant="secondary" icon={<FileText className="h-4 w-4" />}>
                        Chi tiết
                      </ActionButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
