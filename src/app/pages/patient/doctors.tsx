import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CalendarPlus,
  CreditCard,
  Filter,
  Hospital,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { addTemporaryPatientConversation, type PatientConversation } from "../../lib/patient-conversations";
import { cn } from "../../lib/utils";

type DoctorStatus = "Có lịch" | "Gợi ý" | "Hết lịch";
type DoctorFilter = "Tất cả" | DoctorStatus;

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  experience: string;
  rating: string;
  price: string;
  nextSlot: string;
  status: DoctorStatus;
  about: string;
  strengths: string[];
};

const doctors: Doctor[] = [
  {
    id: "d001",
    name: "BS. Nguyễn Văn B",
    specialty: "Nội tổng quát",
    clinic: "VitaCare Trung tâm",
    experience: "15 năm kinh nghiệm",
    rating: "4.8",
    price: "250.000 VND",
    nextSlot: "Ngày mai · 09:00",
    status: "Có lịch",
    about: "Phù hợp với lịch tái khám hiện tại của bệnh nhân, theo dõi đau thượng vị, ợ chua và chỉ số sức khỏe tổng quát.",
    strengths: ["Theo dõi bệnh mạn tính", "Tư vấn kiểm soát huyết áp", "Đọc kết quả xét nghiệm cơ bản"],
  },
  {
    id: "d002",
    name: "BS. Trần Thị B",
    specialty: "Tiêu hóa",
    clinic: "Phòng khám Đa khoa TW1",
    experience: "12 năm kinh nghiệm",
    rating: "4.9",
    price: "220.000 VND",
    nextSlot: "Gợi ý theo hồ sơ",
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
    nextSlot: "Chưa có lịch trống",
    status: "Hết lịch",
    about: "Tư vấn đau đầu, chóng mặt, mất ngủ, tê bì tay chân và các dấu hiệu thần kinh cần theo dõi.",
    strengths: ["Đánh giá đau đầu", "Tư vấn mất ngủ", "Theo dõi chóng mặt"],
  },
  {
    id: "d004",
    name: "BS. Phạm Minh D",
    specialty: "Tim mạch",
    clinic: "VitaCare Online",
    experience: "10 năm kinh nghiệm",
    rating: "4.6",
    price: "280.000 VND",
    nextSlot: "Ngày mai · 14:00",
    status: "Có lịch",
    about: "Tư vấn hồi hộp, đau ngực nhẹ, chỉ số nhịp tim và các yếu tố nguy cơ tim mạch cần kiểm soát.",
    strengths: ["Theo dõi nhịp tim", "Tư vấn vận động", "Đánh giá nguy cơ tim mạch"],
  },
  {
    id: "d005",
    name: "BS. Hoàng Anh E",
    specialty: "Hô hấp",
    clinic: "VitaCare Trung tâm",
    experience: "11 năm kinh nghiệm",
    rating: "4.8",
    price: "240.000 VND",
    nextSlot: "Ngày mai · 10:30",
    status: "Có lịch",
    about: "Tư vấn ho kéo dài, khó thở nhẹ, viêm mũi dị ứng và theo dõi chức năng hô hấp cho bệnh nhân cần tái khám.",
    strengths: ["Theo dõi hen phế quản", "Tư vấn ho kéo dài", "Đánh giá khó thở"],
  },
  {
    id: "d006",
    name: "BS. Đỗ Thị Hương F",
    specialty: "Da liễu",
    clinic: "Phòng khám Đa khoa TW3",
    experience: "9 năm kinh nghiệm",
    rating: "4.7",
    price: "210.000 VND",
    nextSlot: "Gợi ý theo hồ sơ",
    status: "Gợi ý",
    about: "Phù hợp với các vấn đề mẩn ngứa, viêm da, dị ứng thời tiết và chăm sóc da khi cần tối ưu lịch tái khám.",
    strengths: ["Tư vấn dị ứng da", "Theo dõi viêm da", "Chăm sóc da theo lịch điều trị"],
  },
];

const filterOptions: DoctorFilter[] = ["Tất cả", "Có lịch", "Gợi ý", "Hết lịch"];

export default function PatientDoctors() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(doctors[0].id);
  const [filter, setFilter] = useState<DoctorFilter>("Tất cả");
  const [showFilter, setShowFilter] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const filteredDoctors = useMemo(() => {
    if (filter === "Tất cả") return doctors;
    return doctors.filter((doctor) => doctor.status === filter);
  }, [filter]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedId) ?? doctors[0];

  const handlePay = () => {
    const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const conversationId = `doctor-${selectedDoctor.id}`;
    const consultationConversation: PatientConversation = {
      id: conversationId,
      name: selectedDoctor.name,
      role: "doctor",
      roleName: `Bác sĩ chuyên khoa ${selectedDoctor.specialty}`,
      preview: `Phiên tư vấn chuyên sâu với ${selectedDoctor.name} đã sẵn sàng. Bạn có thể gửi triệu chứng hoặc câu hỏi cần bác sĩ hỗ trợ.`,
      status: "active",
      lastAt: time,
      messages: [
        {
          sender: "contact",
          text: `Chào anh Nguyễn Văn A, tôi là ${selectedDoctor.name}. Tôi đã nhận phiên tư vấn chuyên sâu về ${selectedDoctor.specialty}. Anh có thể mô tả triệu chứng hiện tại hoặc gửi câu hỏi cần tôi hỗ trợ.`,
          time,
        },
      ],
    };
    addTemporaryPatientConversation(consultationConversation);
    setShowPayment(false);
    navigate(`/patient/chat?conversation=${encodeURIComponent(conversationId)}`, {
      state: { conversation: consultationConversation },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tìm bác sĩ"
        description="Chọn bác sĩ phù hợp theo chuyên khoa, trạng thái lịch trống và nhu cầu tư vấn của bạn."
        actions={
          <div className="flex flex-wrap justify-end gap-2">
            <div className="relative">
              <ActionButton variant="secondary" icon={<Filter className="h-4 w-4" />} onClick={() => setShowFilter((current) => !current)}>
                Lọc bác sĩ
              </ActionButton>
              {showFilter && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFilter(option);
                        setShowFilter(false);
                      }}
                      className="flex h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold text-[#1E293B] hover:bg-[#F2F7FB]"
                    >
                      <span>{option}</span>
                      <span className={cn("flex h-5 w-5 items-center justify-center rounded-md border text-[11px]", filter === option ? "border-[#2F80ED] bg-[#2F80ED] text-white" : "border-[#CBD5E1] text-transparent")}>✓</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ActionButton icon={<CalendarPlus className="h-4 w-4" />} onClick={() => navigate("/patient/book")}>
              Đặt lịch khám mới
            </ActionButton>
          </div>
        }
      />

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <SectionCard title="Danh sách bác sĩ">
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => setSelectedId(doctor.id)}
                  className={cn(
                    "rounded-[22px] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
                    selectedDoctor.id === doctor.id ? "border-[#2F80ED] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-extrabold text-[#10233F]">{doctor.name}</h3>
                        <p className="mt-1 text-sm font-bold text-[#2D4A86]">{doctor.specialty}</p>
                      </div>
                    </div>
                    <StatusBadge tone={getStatusTone(doctor.status)}>{doctor.status}</StatusBadge>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm font-semibold text-[#64748B]">
                    <span className="inline-flex items-center gap-2"><Hospital className="h-4 w-4 text-[#2F80ED]" />{doctor.clinic}</span>
                    <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#27C3A2]" />{doctor.experience}</span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarPlus className={cn("h-4 w-4", doctor.status === "Có lịch" ? "text-[#F59E0B]" : doctor.status === "Gợi ý" ? "text-[#2F80ED]" : "text-[#EF4444]")} />
                      {doctor.nextSlot}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-600">★ {doctor.rating}</span>
                    <span className="text-sm font-extrabold text-[#10233F]">{doctor.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-5">
          <SectionCard title="Thông tin bác sĩ">
            <div className="rounded-2xl border border-[#CFE3FF] bg-gradient-to-br from-[#F7FAFC] to-[#EAF3FF] p-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2F80ED] shadow-sm">
                <UserRound className="h-7 w-7" />
              </div>
              <h2 className="mt-2 text-lg font-extrabold text-[#10233F]">{selectedDoctor.name}</h2>
              <p className="mt-1 text-sm font-bold text-[#64748B]">{selectedDoctor.specialty}</p>
              <div className="mt-2 flex justify-center gap-2">
                <StatusBadge tone="amber">★ {selectedDoctor.rating}</StatusBadge>
                <StatusBadge tone={getStatusTone(selectedDoctor.status)}>{selectedDoctor.status}</StatusBadge>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Info icon={<ShieldCheck className="h-5 w-5" />} label="Kinh nghiệm" value={selectedDoctor.experience} />
              <Info icon={<Hospital className="h-5 w-5" />} label="Phòng khám" value={selectedDoctor.clinic} />
              <Info icon={<CalendarPlus className="h-5 w-5" />} label={selectedDoctor.status === "Có lịch" ? "Lịch gần nhất" : "Trạng thái lịch"} value={selectedDoctor.nextSlot} />
              <Info icon={<CreditCard className="h-5 w-5" />} label="Chi phí tư vấn" value={selectedDoctor.price} />
            </div>

            <div className="mt-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm font-extrabold text-[#1E293B]">Giới thiệu</p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedDoctor.about}</p>
            </div>

            <div className="mt-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <p className="text-sm font-extrabold text-[#1E293B]">Thế mạnh tư vấn</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedDoctor.strengths.map((item) => (
                  <span key={item} className="rounded-full bg-[#F2F7FB] px-3 py-1.5 text-xs font-bold text-[#64748B]">{item}</span>
                ))}
              </div>
            </div>

            <ActionButton className="mt-4 w-full" icon={<MessageCircle className="h-4 w-4" />} onClick={() => setShowPayment(true)}>
              Tư vấn chuyên sâu
            </ActionButton>
          </SectionCard>
        </aside>
      </div>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <h2 className="text-xl font-extrabold text-[#1E293B]">Thanh toán tư vấn chuyên sâu</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Phiên tư vấn với <b>{selectedDoctor.name}</b> sẽ mở cuộc trò chuyện trực tiếp với bác sĩ sau khi thanh toán.
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

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <div className="mt-0.5 text-[#2F80ED]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
        <p className="mt-1 text-sm font-extrabold leading-6 text-[#1E293B]">{value}</p>
      </div>
    </div>
  );
}

function getStatusTone(status: Doctor["status"]) {
  if (status === "Có lịch") return "green";
  if (status === "Gợi ý") return "blue";
  return "rose";
}
