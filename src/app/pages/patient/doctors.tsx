import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { CreditCard, MessageCircle, ShieldCheck, Star, Stethoscope, UserRound } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  experience: string;
  rating: string;
  price: string;
  status: "Có lịch" | "Gợi ý" | "Hết lịch";
  about: string;
  strengths: string[];
};

const doctors: Doctor[] = [
  {
    id: "d001",
    name: "BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    clinic: "Phòng khám Đa khoa TW1",
    experience: "15 năm kinh nghiệm",
    rating: "4.8",
    price: "250.000 VND",
    status: "Có lịch",
    about: "Chuyên tư vấn tăng huyết áp, đau ngực, rối loạn nhịp tim và theo dõi nguy cơ tim mạch.",
    strengths: ["Đọc kết quả điện tim", "Tư vấn kiểm soát huyết áp", "Theo dõi bệnh mạn tính"],
  },
  {
    id: "d002",
    name: "BS. Trần Thị B",
    specialty: "Tiêu hóa",
    clinic: "Phòng khám Đa khoa TW1",
    experience: "12 năm kinh nghiệm",
    rating: "4.9",
    price: "220.000 VND",
    status: "Gợi ý",
    about: "Phù hợp với các triệu chứng đau thượng vị, trào ngược, đầy bụng, buồn nôn và rối loạn tiêu hóa.",
    strengths: ["Tư vấn đau dạ dày", "Đọc kết quả nội soi", "Lập phác đồ ăn uống"],
  },
  {
    id: "d003",
    name: "BS. Lê Văn C",
    specialty: "Thần kinh",
    clinic: "Phòng khám Đa khoa TW2",
    experience: "20 năm kinh nghiệm",
    rating: "4.7",
    price: "300.000 VND",
    status: "Hết lịch",
    about: "Tư vấn đau đầu, chóng mặt, mất ngủ, tê bì tay chân và các dấu hiệu thần kinh cần theo dõi.",
    strengths: ["Đánh giá đau đầu", "Tư vấn mất ngủ", "Theo dõi chóng mặt"],
  },
];

export default function PatientDoctors() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(doctors[0].id);
  const [showPayment, setShowPayment] = useState(false);
  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedId) ?? doctors[0];

  const handlePay = () => {
    const paidSession = {
      id: `consult-${Date.now()}`,
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: new Date().toLocaleDateString("vi-VN"),
      price: selectedDoctor.price,
      summary: `Tư vấn chuyên sâu với ${selectedDoctor.name} về ${selectedDoctor.specialty}.`,
    };

    const current = JSON.parse(window.localStorage.getItem("patient-consultation-history") ?? "[]") as typeof paidSession[];
    window.localStorage.setItem("patient-consultation-history", JSON.stringify([paidSession, ...current]));
    setShowPayment(false);
    navigate("/patient/consultation?mode=doctor#doctor-chat");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tìm bác sĩ"
        description="Tìm kiếm bác sĩ theo chuyên khoa, phòng khám, chi phí và trạng thái lịch trống."
        actions={<ActionButton variant="secondary">Lọc bác sĩ</ActionButton>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <SectionCard title="Danh sách bác sĩ">
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`flex flex-col gap-4 rounded-[18px] border p-4 transition sm:flex-row sm:items-center ${
                  selectedId === doctor.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-[#1E293B]">{doctor.name}</h3>
                    <StatusBadge tone={getStatusTone(doctor.status)}>{doctor.status}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#2D4A86]">
                    {doctor.specialty} · {doctor.experience} · {doctor.clinic}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#64748B]">Tư vấn chuyên sâu: {doctor.price}</p>
                </div>
                <ActionButton variant="secondary" onClick={() => setSelectedId(doctor.id)}>
                  Chi tiết
                </ActionButton>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Thông tin bác sĩ">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-5 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2F80ED]">
              <UserRound className="h-10 w-10" />
            </div>
            <h2 className="mt-4 text-xl font-extrabold text-[#1E293B]">{selectedDoctor.name}</h2>
            <p className="mt-1 text-sm font-bold text-[#64748B]">{selectedDoctor.specialty}</p>
            <div className="mt-3 flex justify-center gap-2">
              <StatusBadge tone="amber">★ {selectedDoctor.rating}</StatusBadge>
              <StatusBadge tone={getStatusTone(selectedDoctor.status)}>{selectedDoctor.status}</StatusBadge>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Info icon={<ShieldCheck className="h-5 w-5" />} label="Kinh nghiệm" value={selectedDoctor.experience} />
            <Info icon={<Stethoscope className="h-5 w-5" />} label="Phòng khám" value={selectedDoctor.clinic} />
            <Info icon={<CreditCard className="h-5 w-5" />} label="Chi phí tư vấn" value={selectedDoctor.price} />
          </div>

          <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm font-extrabold text-[#1E293B]">Giới thiệu</p>
            <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedDoctor.about}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-4">
            <p className="text-sm font-extrabold text-[#1E293B]">Thế mạnh tư vấn</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-6 text-[#64748B]">
              {selectedDoctor.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ActionButton className="mt-5 w-full" icon={<MessageCircle className="h-4 w-4" />} onClick={() => setShowPayment(true)}>
            Tư vấn chuyên sâu
          </ActionButton>
        </SectionCard>
      </div>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <h2 className="text-xl font-extrabold text-[#1E293B]">Thanh toán tư vấn chuyên sâu</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Phiên tư vấn với <b>{selectedDoctor.name}</b> sẽ chuyển về trang tư vấn sức khỏe sau khi thanh toán.
            </p>
            <div className="mt-5 rounded-2xl border border-[#CFE3FF] bg-[#F7FAFC] p-4">
              <p className="text-sm font-bold text-[#64748B]">Chi phí</p>
              <p className="mt-1 text-3xl font-extrabold text-[#1E293B]">{selectedDoctor.price}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <ActionButton variant="secondary" className="flex-1" onClick={() => setShowPayment(false)}>Hủy</ActionButton>
              <ActionButton className="flex-1" icon={<CreditCard className="h-4 w-4" />} onClick={handlePay}>Thanh toán</ActionButton>
            </div>
          </div>
        </div>
      )}
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

function getStatusTone(status: Doctor["status"]) {
  if (status === "Có lịch") return "green";
  if (status === "Gợi ý") return "blue";
  return "rose";
}
