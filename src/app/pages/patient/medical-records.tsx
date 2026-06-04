import { useState, type ReactNode } from "react";
import { ClipboardList, FileText, FlaskConical, MessageCircle, Pill, Stethoscope } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type MedicalRecord = {
  id: string;
  title: string;
  date: string;
  doctor: string;
  diagnosis: string;
  summary: string;
  status: "Mới" | "Đã xem" | "Cần xem";
  symptoms: string[];
  prescriptions: string[];
  tests: { name: string; result: string }[];
  advice: string;
};

type ConsultationSession = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  price: string;
  summary: string;
};

const defaultConsultations: ConsultationSession[] = [
  {
    id: "consult-demo-1",
    doctor: "BS. Trần Thị B",
    specialty: "Tiêu hóa",
    date: "20/05/2026",
    price: "220.000 VND",
    summary: "Tư vấn chuyên sâu về đau dạ dày, ợ chua và chế độ ăn.",
  },
  {
    id: "consult-demo-2",
    doctor: "BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    date: "12/05/2026",
    price: "250.000 VND",
    summary: "Tư vấn theo dõi huyết áp, nhịp tim và dấu hiệu cần đi khám.",
  },
];

const records: MedicalRecord[] = [
  {
    id: "mr001",
    title: "Phiếu khám MR001",
    date: "15/05/2026",
    doctor: "BS. Nguyễn Văn A",
    diagnosis: "Viêm họng cấp",
    summary: "Viêm họng cấp, kê thuốc và tái khám nếu không giảm sau 5 ngày.",
    status: "Mới",
    symptoms: ["Đau họng", "Sốt nhẹ", "Ho khan về đêm"],
    prescriptions: ["Amoxicillin 500mg - uống sau ăn, ngày 3 lần", "Paracetamol 500mg - uống khi sốt trên 38.5°C"],
    tests: [
      { name: "Test nhanh Cúm A/B", result: "Âm tính" },
      { name: "Test nhanh Covid-19", result: "Âm tính" },
    ],
    advice: "Uống nhiều nước ấm, súc họng nước muối, nghỉ ngơi và tái khám nếu sốt cao hoặc khó thở.",
  },
  {
    id: "mr002",
    title: "Phiếu khám MR002",
    date: "20/04/2026",
    doctor: "BS. Trần Thị B",
    diagnosis: "Đau dạ dày",
    summary: "Đau dạ dày, dùng Omeprazole 20mg và điều chỉnh chế độ ăn.",
    status: "Đã xem",
    symptoms: ["Đau vùng thượng vị", "Ợ chua sau ăn", "Đầy bụng buổi tối"],
    prescriptions: ["Omeprazole 20mg - uống trước ăn sáng 30 phút", "Gaviscon - uống sau bữa ăn khi ợ nóng"],
    tests: [
      { name: "Nội soi dạ dày", result: "Viêm sung huyết nhẹ" },
      { name: "H. pylori", result: "Âm tính" },
    ],
    advice: "Tránh đồ cay, cà phê, rượu bia; chia nhỏ bữa ăn và không nằm ngay sau ăn.",
  },
  {
    id: "mr003",
    title: "Xét nghiệm máu",
    date: "02/04/2026",
    doctor: "BS. Lê Minh C",
    diagnosis: "Theo dõi chỉ số chuyển hóa",
    summary: "Kết quả xét nghiệm đã sẵn sàng, cần bác sĩ giải thích thêm.",
    status: "Cần xem",
    symptoms: ["Mệt mỏi kéo dài", "Khó ngủ", "Ăn uống thất thường"],
    prescriptions: ["Chưa kê thuốc mới", "Bổ sung nước và ăn đủ bữa trong thời gian theo dõi"],
    tests: [
      { name: "Đường huyết đói", result: "5.8 mmol/L" },
      { name: "Men gan ALT", result: "42 U/L" },
      { name: "Cholesterol toàn phần", result: "5.4 mmol/L" },
    ],
    advice: "Đặt lịch tư vấn để bác sĩ đọc kết quả và đánh giá thêm chế độ ăn, vận động.",
  },
];

export default function PatientMedicalRecords() {
  const [selectedId, setSelectedId] = useState(records[0].id);
  const [consultations] = useState<ConsultationSession[]>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("patient-consultation-history") ?? "[]") as ConsultationSession[];
      return [...saved, ...defaultConsultations];
    } catch {
      return defaultConsultations;
    }
  });
  const selectedRecord = records.find((record) => record.id === selectedId) ?? records[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hồ sơ khám bệnh"
        description="Xem lại chẩn đoán, đơn thuốc, ghi chú của bác sĩ và kết quả xét nghiệm."
      />

      <SectionCard title="Lịch sử khám">
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className={`flex flex-col gap-4 rounded-[18px] border p-4 transition sm:flex-row sm:items-center ${
                selectedId === record.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-[#1E293B]">{record.title}</h3>
                  <StatusBadge tone={getStatusTone(record.status)}>{record.status}</StatusBadge>
                </div>
                <p className="mt-1 text-sm font-bold text-[#2D4A86]">
                  {record.date} · {record.doctor}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">{record.summary}</p>
              </div>
              <ActionButton variant="secondary" onClick={() => setSelectedId(record.id)}>
                Chi tiết
              </ActionButton>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Lịch sử tư vấn">
        <div className="grid gap-3 md:grid-cols-2">
          {consultations.map((session) => (
            <div key={session.id} className="rounded-[18px] border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-[#1E293B]">{session.doctor}</h3>
                    <StatusBadge tone="violet">Tư vấn trả phí</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#2D4A86]">
                    {session.specialty} · {session.date} · {session.price}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{session.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Chi tiết hồ sơ khám">
        <div className="grid gap-4 md:grid-cols-3">
          <Info icon={<ClipboardList className="h-5 w-5" />} label="Mã phiếu" value={selectedRecord.title} />
          <Info icon={<Stethoscope className="h-5 w-5" />} label="Chẩn đoán" value={selectedRecord.diagnosis} />
          <Info icon={<FileText className="h-5 w-5" />} label="Bác sĩ" value={`${selectedRecord.doctor} · ${selectedRecord.date}`} />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <DetailList title="Triệu chứng ghi nhận" icon={<ClipboardList className="h-5 w-5" />} items={selectedRecord.symptoms} />
          <DetailList title="Đơn thuốc" icon={<Pill className="h-5 w-5" />} items={selectedRecord.prescriptions} />
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#E2E8F0]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-[#F7FAFC] text-[#1E293B]">
              <tr>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">STT</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Loại xét nghiệm</th>
                <th className="border-b border-[#E2E8F0] px-4 py-3 font-extrabold">Kết quả</th>
              </tr>
            </thead>
            <tbody>
              {selectedRecord.tests.map((test, index) => (
                <tr key={test.name} className="border-b border-[#E2E8F0] last:border-b-0">
                  <td className="px-4 py-3 font-medium text-[#475569]">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-[#475569]">{test.name}</td>
                  <td className="px-4 py-3 font-extrabold text-[#2D4A86]">{test.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-2xl border border-[#CFE3FF] bg-[#F7FAFC] p-4">
          <p className="text-sm font-extrabold text-[#1E293B]">Lời dặn của bác sĩ</p>
          <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedRecord.advice}</p>
        </div>
      </SectionCard>
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

function DetailList({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <h3 className="flex items-center gap-2 font-extrabold text-[#1E293B]">
        <span className="text-[#2F80ED]">{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-6 text-[#64748B]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function getStatusTone(status: MedicalRecord["status"]) {
  if (status === "Mới") return "blue";
  if (status === "Cần xem") return "amber";
  return "green";
}
