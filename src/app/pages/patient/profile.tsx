import { useEffect, useState } from "react";
import { Activity, ClipboardCheck, HeartPulse, Pill, Save, Trash2, UserRound } from "lucide-react";
import { ActionButton, SectionCard, StatusBadge } from "../../components/layout/role-page";

type MedicalData = {
  fullName: string;
  birthDate: string;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  chronicDiseases: string;
  currentMedications: string;
  emergencyContact: string;
  note: string;
};

const storageKey = "vitacare_patient_medical_data";

const defaultData: MedicalData = {
  fullName: "Nguyễn Văn A",
  birthDate: "",
  gender: "Nam",
  bloodType: "",
  height: "",
  weight: "",
  allergies: "",
  chronicDiseases: "",
  currentMedications: "",
  emergencyContact: "",
  note: "",
};

export default function PatientProfile() {
  const [formData, setFormData] = useState<MedicalData>(defaultData);
  const [savedData, setSavedData] = useState<MedicalData | null>(null);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { data: MedicalData; savedAt: string };
      setFormData({ ...defaultData, ...parsed.data });
      setSavedData({ ...defaultData, ...parsed.data });
      setSavedAt(parsed.savedAt);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  const updateField = (field: keyof MedicalData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const saveTemporary = () => {
    const nextSavedAt = new Date().toLocaleString("vi-VN");
    const payload = { data: formData, savedAt: nextSavedAt };
    localStorage.setItem(storageKey, JSON.stringify(payload));
    setSavedData(formData);
    setSavedAt(nextSavedAt);
  };

  const clearTemporary = () => {
    localStorage.removeItem(storageKey);
    setFormData(defaultData);
    setSavedData(null);
    setSavedAt("");
  };

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1E293B]">Dữ liệu y tế</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
          Nhập thông tin sức khỏe cá nhân để dùng cho tư vấn AI và đặt lịch khám. Dữ liệu hiện được lưu tạm trên trình duyệt của bạn.
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard title="Thông tin sức khỏe" description="Điền các trường cần thiết, sau đó bấm lưu tạm thời.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Họ và tên</span>
              <input
                value={formData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Ngày sinh</span>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(event) => updateField("birthDate", event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Giới tính</span>
              <select
                value={formData.gender}
                onChange={(event) => updateField("gender", event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              >
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Nhóm máu</span>
              <select
                value={formData.bloodType}
                onChange={(event) => updateField("bloodType", event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              >
                <option value="">Chưa rõ</option>
                <option>A</option>
                <option>B</option>
                <option>AB</option>
                <option>O</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Chiều cao</span>
              <input
                value={formData.height}
                onChange={(event) => updateField("height", event.target.value)}
                placeholder="Ví dụ: 170 cm"
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Cân nặng</span>
              <input
                value={formData.weight}
                onChange={(event) => updateField("weight", event.target.value)}
                placeholder="Ví dụ: 62 kg"
                className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Dị ứng</span>
              <textarea
                value={formData.allergies}
                onChange={(event) => updateField("allergies", event.target.value)}
                placeholder="Ví dụ: Penicillin, hải sản..."
                className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Bệnh mạn tính</span>
              <textarea
                value={formData.chronicDiseases}
                onChange={(event) => updateField("chronicDiseases", event.target.value)}
                placeholder="Ví dụ: hen suyễn, tiểu đường..."
                className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Thuốc đang dùng</span>
              <textarea
                value={formData.currentMedications}
                onChange={(event) => updateField("currentMedications", event.target.value)}
                placeholder="Tên thuốc, liều dùng, thời điểm dùng..."
                className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[#1E293B]">Liên hệ khẩn cấp</span>
              <textarea
                value={formData.emergencyContact}
                onChange={(event) => updateField("emergencyContact", event.target.value)}
                placeholder="Tên người liên hệ, số điện thoại..."
                className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-[#1E293B]">Ghi chú thêm</span>
            <textarea
              value={formData.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="Thông tin khác bạn muốn bác sĩ hoặc AI biết..."
              className="mt-2 min-h-24 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <ActionButton icon={<Save className="h-4 w-4" />} onClick={saveTemporary}>
              Lưu tạm thời
            </ActionButton>
            <ActionButton variant="secondary" icon={<Trash2 className="h-4 w-4" />} onClick={clearTemporary}>
              Xóa dữ liệu tạm
            </ActionButton>
          </div>
        </SectionCard>

        <aside className="space-y-5">
          <SectionCard title="Dữ liệu đã lưu tạm">
            {savedData ? (
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge tone="green">Đã lưu</StatusBadge>
                  <span className="text-xs font-semibold text-[#64748B]">{savedAt}</span>
                </div>
                <InfoRow icon={<UserRound className="h-5 w-5" />} label="Người dùng" value={`${savedData.fullName || "Chưa nhập"} · ${savedData.gender}`} />
                <InfoRow icon={<HeartPulse className="h-5 w-5" />} label="Chỉ số cơ bản" value={`${savedData.height || "Chưa có chiều cao"} · ${savedData.weight || "Chưa có cân nặng"} · Nhóm máu ${savedData.bloodType || "chưa rõ"}`} />
                <InfoRow icon={<Activity className="h-5 w-5" />} label="Bệnh mạn tính" value={savedData.chronicDiseases || "Chưa ghi nhận"} />
                <InfoRow icon={<Pill className="h-5 w-5" />} label="Thuốc đang dùng" value={savedData.currentMedications || "Chưa ghi nhận"} />
                <InfoRow icon={<ClipboardCheck className="h-5 w-5" />} label="Dị ứng / ghi chú" value={savedData.allergies || savedData.note || "Chưa ghi nhận"} />
              </div>
            ) : (
              <div className="rounded-2xl bg-[#F2F7FB] p-4 text-sm leading-6 text-[#64748B]">
                Chưa có dữ liệu lưu tạm. Sau khi điền form và bấm lưu, thông tin sẽ hiện ở đây.
              </div>
            )}
          </SectionCard>

          <SectionCard title="Lưu ý">
            <div className="rounded-2xl border border-[#FDE7B8] bg-[#FFF7E8] p-4 text-sm leading-6 text-[#C77805]">
              Dữ liệu này chỉ lưu tạm trên trình duyệt hiện tại. Đây chưa phải lưu trữ máy chủ thật.
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <div className="mt-0.5 text-[#2F80ED]">{icon}</div>
      <div>
        <p className="font-extrabold text-[#1E293B]">{label}</p>
        <p className="mt-1 leading-6 text-[#64748B]">{value}</p>
      </div>
    </div>
  );
}
