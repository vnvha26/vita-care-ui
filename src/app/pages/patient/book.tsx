import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Hospital, Search, Stethoscope, UserRound } from "lucide-react";
import { ActionButton, SectionCard, StatusBadge } from "../../components/layout/role-page";

const specialties = [
  {
    id: "general",
    name: "Nội tổng quát",
    keywords: "sốt đau đầu mệt mỏi ho đau họng",
    description: "Phù hợp với triệu chứng phổ biến, cần khám tổng quát ban đầu.",
  },
  {
    id: "digestive",
    name: "Tiêu hóa",
    keywords: "đau bụng buồn nôn dạ dày tiêu chảy",
    description: "Dành cho vấn đề dạ dày, ruột, gan mật và đau bụng kéo dài.",
  },
  {
    id: "cardiology",
    name: "Tim mạch",
    keywords: "đau ngực hồi hộp huyết áp tim mạch",
    description: "Ưu tiên khi có đau ngực, hồi hộp, tăng huyết áp.",
  },
  {
    id: "dermatology",
    name: "Da liễu",
    keywords: "dị ứng ngứa phát ban mẩn đỏ da",
    description: "Dành cho dị ứng, phát ban, nổi mẩn, ngứa da.",
  },
];

const clinics = [
  {
    id: "vc-central",
    name: "VitaCare Trung tâm",
    address: "Q.1, TP.HCM",
    specialties: ["general", "digestive", "cardiology"],
  },
  {
    id: "vc-family",
    name: "VitaCare Gia đình",
    address: "Q.7, TP.HCM",
    specialties: ["general", "dermatology"],
  },
  {
    id: "vc-digital",
    name: "VitaCare Online",
    address: "Khám từ xa",
    specialties: ["general", "digestive", "dermatology"],
  },
];

const doctors = [
  { id: "d1", name: "Nguyễn Văn B", specialty: "general", clinic: "vc-central", price: "350.000 VND", rating: "4.8" },
  { id: "d2", name: "Nguyễn Văn E", specialty: "digestive", clinic: "vc-central", price: "380.000 VND", rating: "4.7" },
  { id: "d3", name: "Nguyễn Văn F", specialty: "cardiology", clinic: "vc-central", price: "450.000 VND", rating: "4.9" },
  { id: "d4", name: "Nguyễn Văn G", specialty: "dermatology", clinic: "vc-family", price: "320.000 VND", rating: "4.6" },
  { id: "d5", name: "Nguyễn Văn H", specialty: "general", clinic: "vc-digital", price: "250.000 VND", rating: "4.8" },
];

const timeSlots = ["08:30", "09:30", "10:30", "14:00", "15:30", "16:30"];

export default function PatientBook() {
  const [symptom, setSymptom] = useState("");
  const [specialtyQuery, setSpecialtyQuery] = useState("");
  const [clinicQuery, setClinicQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0]);
  const [selectedClinic, setSelectedClinic] = useState(clinics[0]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("d1");
  const [selectedDate, setSelectedDate] = useState("2026-06-04");
  const [selectedTime, setSelectedTime] = useState("09:30");
  const [visitType, setVisitType] = useState<"clinic" | "online">("clinic");

  const suggestedSpecialties = useMemo(() => {
    const query = `${specialtyQuery} ${symptom}`.trim().toLowerCase();
    if (!query) return specialties;

    return specialties.filter((specialty) => {
      const haystack = `${specialty.name} ${specialty.keywords} ${specialty.description}`.toLowerCase();
      return query.split(/\s+/).some((word) => haystack.includes(word));
    });
  }, [specialtyQuery, symptom]);

  const suggestedClinics = useMemo(() => {
    const query = clinicQuery.trim().toLowerCase();
    return clinics.filter((clinic) => {
      const matchSpecialty = clinic.specialties.includes(selectedSpecialty.id);
      const matchQuery = !query || `${clinic.name} ${clinic.address}`.toLowerCase().includes(query);
      return matchSpecialty && matchQuery;
    });
  }, [clinicQuery, selectedSpecialty]);

  const suggestedDoctors = useMemo(() => {
    return doctors.filter((doctor) => doctor.specialty === selectedSpecialty.id && doctor.clinic === selectedClinic.id);
  }, [selectedClinic, selectedSpecialty]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId) ?? suggestedDoctors[0] ?? doctors[0];

  const selectSpecialty = (specialty: (typeof specialties)[number]) => {
    setSelectedSpecialty(specialty);
    setSpecialtyQuery(specialty.name);
    const nextClinic = clinics.find((clinic) => clinic.specialties.includes(specialty.id)) ?? clinics[0];
    setSelectedClinic(nextClinic);
    setClinicQuery(nextClinic.name);
    const nextDoctor = doctors.find((doctor) => doctor.specialty === specialty.id && doctor.clinic === nextClinic.id);
    if (nextDoctor) setSelectedDoctorId(nextDoctor.id);
  };

  const selectClinic = (clinic: (typeof clinics)[number]) => {
    setSelectedClinic(clinic);
    setClinicQuery(clinic.name);
    const nextDoctor = doctors.find((doctor) => doctor.specialty === selectedSpecialty.id && doctor.clinic === clinic.id);
    if (nextDoctor) setSelectedDoctorId(nextDoctor.id);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1E293B]">Đặt lịch khám</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
          Nhập triệu chứng hoặc chọn chuyên khoa, hệ thống sẽ gợi ý phòng khám, bác sĩ và khung giờ phù hợp.
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard title="Thông tin đặt lịch" description="Bạn có thể gõ một phần thông tin, các lựa chọn phù hợp sẽ hiện bên dưới.">
          <div className="space-y-6">
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Triệu chứng hoặc lý do khám</span>
              <textarea
                value={symptom}
                onChange={(event) => setSymptom(event.target.value)}
                placeholder="Ví dụ: sốt, đau họng, đau bụng, nổi mẩn..."
                className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>

            <div>
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Chuyên khoa</span>
                <div className="relative mt-2">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    value={specialtyQuery}
                    onChange={(event) => setSpecialtyQuery(event.target.value)}
                    placeholder="Gõ chuyên khoa hoặc triệu chứng..."
                    className="h-12 w-full rounded-full border border-[#E2E8F0] pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>
              </label>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {(suggestedSpecialties.length ? suggestedSpecialties : specialties).map((specialty) => (
                  <button
                    key={specialty.id}
                    type="button"
                    onClick={() => selectSpecialty(specialty)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedSpecialty.id === specialty.id
                        ? "border-[#2F80ED] bg-[#EAF3FF]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-extrabold text-[#1E293B]">
                      <Stethoscope className="h-4 w-4 text-[#2F80ED]" />
                      {specialty.name}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#64748B]">{specialty.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Bệnh viện / phòng khám</span>
                <div className="relative mt-2">
                  <Hospital className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    value={clinicQuery}
                    onChange={(event) => setClinicQuery(event.target.value)}
                    placeholder="Gõ tên phòng khám hoặc khu vực..."
                    className="h-12 w-full rounded-full border border-[#E2E8F0] pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>
              </label>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {(suggestedClinics.length ? suggestedClinics : clinics.filter((clinic) => clinic.specialties.includes(selectedSpecialty.id))).map((clinic) => (
                  <button
                    key={clinic.id}
                    type="button"
                    onClick={() => selectClinic(clinic)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedClinic.id === clinic.id
                        ? "border-[#27C3A2] bg-[#E8FFF9]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
                    }`}
                  >
                    <div className="font-extrabold text-[#1E293B]">{clinic.name}</div>
                    <p className="mt-1 text-sm text-[#64748B]">{clinic.address}</p>
                    <p className="mt-2 text-xs font-bold text-[#148E77]">Có lịch cho {selectedSpecialty.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-[#1E293B]">Bác sĩ phù hợp</div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {(suggestedDoctors.length ? suggestedDoctors : doctors.filter((doctor) => doctor.specialty === selectedSpecialty.id)).map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setSelectedDoctorId(doctor.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedDoctorId === doctor.id
                        ? "border-[#2F80ED] bg-[#EAF3FF]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F7FAFC]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-extrabold text-[#1E293B]">{doctor.name}</div>
                      <StatusBadge tone="green">{doctor.rating} ★</StatusBadge>
                    </div>
                    <p className="mt-1 text-sm text-[#64748B]">{doctor.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Ngày khám</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="mt-2 h-12 w-full rounded-full border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </label>
              <div>
                <span className="text-sm font-bold text-[#1E293B]">Hình thức khám</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    ["clinic", "Tại phòng khám"],
                    ["online", "Tư vấn online"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setVisitType(value as "clinic" | "online")}
                      className={`h-12 rounded-full border text-sm font-bold ${
                        visitType === value ? "border-[#2F80ED] bg-[#EAF3FF] text-[#1C64D1]" : "border-[#E2E8F0] text-[#64748B]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-[#1E293B]">Khung giờ còn trống</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold ${
                      selectedTime === slot ? "border-[#2F80ED] bg-[#2F80ED] text-white" : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F7FAFC]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <aside className="space-y-5">
          <SectionCard title="Tóm tắt lịch hẹn">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Stethoscope className="mt-1 h-5 w-5 text-[#2F80ED]" />
                <div>
                  <p className="font-extrabold text-[#1E293B]">{selectedSpecialty.name}</p>
                  <p className="text-[#64748B]">{selectedSpecialty.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hospital className="mt-1 h-5 w-5 text-[#27C3A2]" />
                <div>
                  <p className="font-extrabold text-[#1E293B]">{selectedClinic.name}</p>
                  <p className="text-[#64748B]">{selectedClinic.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserRound className="mt-1 h-5 w-5 text-[#8B7CF6]" />
                <div>
                  <p className="font-extrabold text-[#1E293B]">{selectedDoctor.name}</p>
                  <p className="text-[#64748B]">Phí khám: {selectedDoctor.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-1 h-5 w-5 text-[#F59E0B]" />
                <div>
                  <p className="font-extrabold text-[#1E293B]">{selectedDate}</p>
                  <p className="text-[#64748B]">Hình thức: {visitType === "clinic" ? "Tại phòng khám" : "Tư vấn online"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 text-[#EF4444]" />
                <div>
                  <p className="font-extrabold text-[#1E293B]">{selectedTime}</p>
                  <p className="text-[#64748B]">Trạng thái: còn lịch</p>
                </div>
              </div>
            </div>
            <ActionButton className="mt-5 w-full" icon={<CheckCircle2 className="h-4 w-4" />}>
              Gửi yêu cầu đặt lịch
            </ActionButton>
          </SectionCard>

          <SectionCard title="Gợi ý nhanh">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setSymptom("Sốt, đau họng, ho nhẹ");
                  selectSpecialty(specialties[0]);
                }}
                className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-4 text-left text-sm hover:bg-[#F7FAFC]"
              >
                <p className="font-extrabold text-[#1E293B]">Sốt, đau họng, ho nhẹ</p>
                <p className="mt-1 text-[#64748B]">Gợi ý: Nội tổng quát</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSymptom("Đau bụng, buồn nôn");
                  selectSpecialty(specialties[1]);
                }}
                className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-4 text-left text-sm hover:bg-[#F7FAFC]"
              >
                <p className="font-extrabold text-[#1E293B]">Đau bụng, buồn nôn</p>
                <p className="mt-1 text-[#64748B]">Gợi ý: Tiêu hóa</p>
              </button>
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
