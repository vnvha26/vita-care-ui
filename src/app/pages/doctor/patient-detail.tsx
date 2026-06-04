import { Link, useParams } from "react-router";
import { ArrowLeft, ClipboardPenLine, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard } from "../../components/layout/role-page";
import { patientRecords } from "./patient-data";

export default function PatientDetail() {
  const { id } = useParams();
  const patient = patientRecords.find((item) => item.id === id) ?? patientRecords[0];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Hồ sơ chi tiết bệnh nhân"
        actions={
          <Link to="/doctor/patients">
            <ActionButton variant="secondary" icon={<ArrowLeft className="h-4 w-4" />}>
              Quay lại
            </ActionButton>
          </Link>
        }
      />

      <SectionCard>
        <div className="grid gap-6 border-b border-[#E2E8F0] pb-6 xl:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center justify-center border-b border-[#E2E8F0] pb-5 text-center xl:border-b-0 xl:border-r xl:pb-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F4D5EB] text-[#D33C87]">
              <UserRound className="h-11 w-11" />
            </div>
            <h2 className="mt-4 text-lg font-extrabold text-[#2D4A86]">{patient.name}</h2>
            <p className="mt-1 text-sm font-bold text-[#94A3B8]">Mã: {patient.code}</p>
          </div>

          <dl className="grid gap-x-10 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            <InfoItem label="Ngày sinh" value={patient.birthDate} />
            <InfoItem label="Giới tính" value={patient.gender} />
            <InfoItem label="Số điện thoại" value={patient.phone} />
            <InfoItem label="Email" value={patient.email} />
            <InfoItem label="Bảo hiểm y tế" value={patient.insurance} />
            <InfoItem label="Địa chỉ" value={patient.address} />
          </dl>
        </div>

        <div className="mt-5 grid gap-5 border-b border-dashed border-[#E2E8F0] pb-5 md:grid-cols-2 xl:grid-cols-4">
          <MetricItem label="Nhóm máu" value={patient.bloodType} />
          <MetricItem label="Chiều cao" value={patient.height} />
          <MetricItem label="Cân nặng" value={patient.weight} />
          <MetricItem label="Chỉ số BMI" value={patient.bmi} emphasis />
        </div>

        <p className="mt-5 text-sm font-bold text-[#1E293B]">
          Ghi chú tiền sử & Dị ứng: <span className="text-[#EF6155]">{patient.notes}</span>
        </p>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div>
            <h3 className="text-base font-extrabold text-[#1E293B]">Triệu chứng lâm sàng</h3>
            <div className="mt-3 rounded-2xl border-l-4 border-[#4C83F1] bg-[#F7FAFC] px-5 py-4">
              <ul className="list-disc space-y-2 pl-4 text-sm font-medium leading-6 text-[#475569]">
                {patient.symptoms.map((symptom) => (
                  <li key={symptom}>{symptom}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-[#1E293B]">Kết quả xét nghiệm lâm sàng</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#E2E8F0]">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-white text-[#1E293B]">
                  <tr>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">STT</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Loại xét nghiệm</th>
                    <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.tests.map((test, index) => (
                    <tr key={test.name} className="border-b border-[#E2E8F0] last:border-b-0">
                      <td className="px-4 py-3 font-medium text-[#475569]">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-[#475569]">{test.name}</td>
                      <td className="px-4 py-3 font-extrabold text-[#49A95C]">{test.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Lịch sử khám & điều trị"
        actions={
          <Link to="/doctor/examination">
            <ActionButton icon={<ClipboardPenLine className="h-4 w-4" />}>Chẩn đoán và kê đơn</ActionButton>
          </Link>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-white text-[#1E293B]">
              <tr>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">STT</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Ngày khám</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Chẩn đoán bệnh</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Phác đồ điều trị / Kê đơn thuốc</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 text-right font-extrabold">Bác sĩ khám</th>
              </tr>
            </thead>
            <tbody>
              {patient.history.map((visit) => (
                <tr key={visit.id} className="border-b border-[#E2E8F0] last:border-b-0">
                  <td className="px-4 py-3 font-medium text-[#475569]">{visit.id}</td>
                  <td className="px-4 py-3 font-extrabold text-[#1E293B]">{visit.date}</td>
                  <td className="px-4 py-3 font-extrabold text-[#2D4A86]">{visit.diagnosis}</td>
                  <td className="px-4 py-3 font-medium text-[#64748B]">{visit.treatment}</td>
                  <td className="px-4 py-3 text-right font-medium text-[#475569]">{visit.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-extrabold text-[#1E293B]">{label}: <span className="font-bold text-[#94A3B8]">{value}</span></dt>
    </div>
  );
}

function MetricItem({ label, value, emphasis = false }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold text-[#94A3B8]">{label}</p>
      <p className={`mt-1 text-base font-extrabold ${emphasis ? "text-[#2D4A86]" : "text-[#1E293B]"}`}>{value}</p>
    </div>
  );
}
