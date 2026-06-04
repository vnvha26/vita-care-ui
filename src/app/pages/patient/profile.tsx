import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  ClipboardCheck,
  HeartPulse,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Pill,
  Save,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { ActionButton, SectionCard, StatusBadge } from "../../components/layout/role-page";

type MedicalData = {
  fullName: string;
  patientCode: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  height: string;
  weight: string;
  bmi: string;
  allergies: string;
  chronicDiseases: string;
  currentMedications: string;
  emergencyContact: string;
  insuranceId: string;
  primaryDoctor: string;
  lastVisit: string;
  note: string;
};

const storageKey = "vitacare_patient_profile_demo";

const defaultData: MedicalData = {
  fullName: "Nguyễn Văn A",
  patientCode: "BN-2026-001",
  birthDate: "1992-08-18",
  gender: "Nam",
  phone: "0901 234 567",
  email: "nguyenvana@email.com",
  address: "Quận 7, TP.HCM",
  bloodType: "O",
  height: "170 cm",
  weight: "62 kg",
  bmi: "21.5",
  allergies: "Dị ứng nhẹ với hải sản; chưa ghi nhận dị ứng thuốc.",
  chronicDiseases: "Viêm dạ dày nhẹ, đang theo dõi huyết áp định kỳ.",
  currentMedications: "Omeprazole 20mg khi đau dạ dày; bổ sung vitamin D theo tuần.",
  emergencyContact: "Nguyễn Thị B - 0909 888 777 - Chị gái",
  insuranceId: "HSK-8842-2026",
  primaryDoctor: "BS. Nguyễn Văn B - Nội tổng quát",
  lastVisit: "15/05/2026",
  note: "Ưu tiên lịch khám buổi sáng. Cần nhắc mang theo đơn thuốc cũ khi tái khám.",
};

const overviewStats = [
  { label: "Nhóm máu", field: "bloodType", icon: HeartPulse, tone: "text-rose-500 bg-rose-50" },
  { label: "Chiều cao", field: "height", icon: Activity, tone: "text-blue-500 bg-blue-50" },
  { label: "Cân nặng", field: "weight", icon: ShieldCheck, tone: "text-emerald-500 bg-emerald-50" },
  { label: "BMI", field: "bmi", icon: ClipboardCheck, tone: "text-violet-500 bg-violet-50" },
] as const;

export default function PatientProfile() {
  const [profile, setProfile] = useState<MedicalData>(defaultData);
  const [draft, setDraft] = useState<MedicalData>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [savedAt, setSavedAt] = useState("Dữ liệu mẫu");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { data: MedicalData; savedAt: string };
      const nextProfile = { ...defaultData, ...parsed.data };
      setProfile(nextProfile);
      setDraft(nextProfile);
      setSavedAt(parsed.savedAt);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  const updateField = (field: keyof MedicalData, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const startEditing = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  const saveProfile = () => {
    const nextSavedAt = new Date().toLocaleString("vi-VN");
    setProfile(draft);
    setSavedAt(nextSavedAt);
    setIsEditing(false);
    localStorage.setItem(storageKey, JSON.stringify({ data: draft, savedAt: nextSavedAt }));
  };

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[28px] border border-[#DCEBFF] bg-gradient-to-br from-[#EAF3FF] via-white to-[#E8FFF9] p-6 shadow-[0_18px_50px_rgba(47,128,237,0.10)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#2F80ED] text-2xl font-extrabold text-white shadow-[0_14px_30px_rgba(47,128,237,0.24)]">
              NVA
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold text-[#10233F]">{profile.fullName}</h1>
                <StatusBadge tone="green">Hồ sơ đã xác thực</StatusBadge>
              </div>
              <p className="mt-2 text-sm font-bold text-[#64748B]">{profile.patientCode} · {profile.gender} · Sinh ngày {formatDate(profile.birthDate)}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-[#64748B]">
                <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-[#2F80ED]" />{profile.phone}</span>
                <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4 text-[#2F80ED]" />{profile.email}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#2F80ED]" />{profile.address}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {isEditing ? (
              <>
                <ActionButton variant="secondary" icon={<X className="h-4 w-4" />} onClick={cancelEditing}>Hủy</ActionButton>
                <ActionButton icon={<Save className="h-4 w-4" />} onClick={saveProfile}>Lưu thay đổi</ActionButton>
              </>
            ) : (
              <ActionButton icon={<Pencil className="h-4 w-4" />} onClick={startEditing}>Chỉnh sửa thông tin</ActionButton>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#64748B]">{item.label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#10233F]">{profile[item.field]}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {isEditing ? (
        <SectionCard title="Chỉnh sửa thông tin demo" description="Các thay đổi được lưu trên trình duyệt để mô phỏng thao tác cập nhật hồ sơ.">
          <ProfileForm data={draft} onChange={updateField} />
        </SectionCard>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-5">
            <SectionCard title="Thông tin cá nhân">
              <div className="grid gap-3 md:grid-cols-2">
                <InfoTile icon={<UserRound className="h-5 w-5" />} label="Họ và tên" value={profile.fullName} />
                <InfoTile icon={<CalendarDays className="h-5 w-5" />} label="Ngày sinh" value={formatDate(profile.birthDate)} />
                <InfoTile icon={<Phone className="h-5 w-5" />} label="Số điện thoại" value={profile.phone} />
                <InfoTile icon={<Mail className="h-5 w-5" />} label="Email" value={profile.email} />
                <InfoTile icon={<MapPin className="h-5 w-5" />} label="Địa chỉ" value={profile.address} />
                <InfoTile icon={<ShieldCheck className="h-5 w-5" />} label="Mã bảo hiểm" value={profile.insuranceId} />
              </div>
            </SectionCard>

            <SectionCard title="Thông tin y tế">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoBlock icon={<Activity className="h-5 w-5" />} label="Bệnh nền / đang theo dõi" value={profile.chronicDiseases} />
                <InfoBlock icon={<Pill className="h-5 w-5" />} label="Thuốc đang dùng" value={profile.currentMedications} />
                <InfoBlock icon={<ClipboardCheck className="h-5 w-5" />} label="Dị ứng" value={profile.allergies} />
                <InfoBlock icon={<Phone className="h-5 w-5" />} label="Liên hệ khẩn cấp" value={profile.emergencyContact} />
              </div>
            </SectionCard>
          </div>

          <aside className="space-y-5">
            <SectionCard title="Tóm tắt chăm sóc">
              <div className="space-y-4">
                <InfoRow icon={<Stethoscope className="h-5 w-5" />} label="Bác sĩ phụ trách" value={profile.primaryDoctor} />
                <InfoRow icon={<CalendarDays className="h-5 w-5" />} label="Lần khám gần nhất" value={profile.lastVisit} />
                <InfoRow icon={<ClipboardCheck className="h-5 w-5" />} label="Ghi chú" value={profile.note} />
              </div>
            </SectionCard>

            <SectionCard title="Trạng thái hồ sơ">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-[#F2F7FB] p-4">
                  <span className="font-bold text-[#64748B]">Cập nhật lần cuối</span>
                  <span className="font-extrabold text-[#10233F]">{savedAt}</span>
                </div>
                <div className="rounded-2xl border border-[#CFE3FF] bg-[#F7FAFC] p-4 leading-6 text-[#64748B]">
                  Đây là dữ liệu mẫu phục vụ demo. Khi bấm chỉnh sửa và lưu, thông tin sẽ đổi ngay trên giao diện.
                </div>
              </div>
            </SectionCard>
          </aside>
        </div>
      )}
    </div>
  );
}

function ProfileForm({ data, onChange }: { data: MedicalData; onChange: (field: keyof MedicalData, value: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Họ và tên" value={data.fullName} onChange={(value) => onChange("fullName", value)} />
      <Field label="Mã bệnh nhân" value={data.patientCode} onChange={(value) => onChange("patientCode", value)} />
      <Field label="Ngày sinh" type="date" value={data.birthDate} onChange={(value) => onChange("birthDate", value)} />
      <Field label="Giới tính" value={data.gender} onChange={(value) => onChange("gender", value)} />
      <Field label="Số điện thoại" value={data.phone} onChange={(value) => onChange("phone", value)} />
      <Field label="Email" value={data.email} onChange={(value) => onChange("email", value)} />
      <Field label="Địa chỉ" value={data.address} onChange={(value) => onChange("address", value)} />
      <Field label="Nhóm máu" value={data.bloodType} onChange={(value) => onChange("bloodType", value)} />
      <Field label="Chiều cao" value={data.height} onChange={(value) => onChange("height", value)} />
      <Field label="Cân nặng" value={data.weight} onChange={(value) => onChange("weight", value)} />
      <Field label="BMI" value={data.bmi} onChange={(value) => onChange("bmi", value)} />
      <Field label="Mã bảo hiểm" value={data.insuranceId} onChange={(value) => onChange("insuranceId", value)} />
      <Field label="Bác sĩ phụ trách" value={data.primaryDoctor} onChange={(value) => onChange("primaryDoctor", value)} />
      <Field label="Lần khám gần nhất" value={data.lastVisit} onChange={(value) => onChange("lastVisit", value)} />
      <TextField label="Dị ứng" value={data.allergies} onChange={(value) => onChange("allergies", value)} />
      <TextField label="Bệnh nền / đang theo dõi" value={data.chronicDiseases} onChange={(value) => onChange("chronicDiseases", value)} />
      <TextField label="Thuốc đang dùng" value={data.currentMedications} onChange={(value) => onChange("currentMedications", value)} />
      <TextField label="Liên hệ khẩn cấp" value={data.emergencyContact} onChange={(value) => onChange("emergencyContact", value)} />
      <div className="md:col-span-2">
        <TextField label="Ghi chú" value={data.note} onChange={(value) => onChange("note", value)} />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#1E293B]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
      />
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#1E293B]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-[#2F80ED]"
      />
    </label>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FBFF] p-4">
      <div className="mt-0.5 text-[#2F80ED]">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-[#94A3B8]">{label}</p>
        <p className="mt-1 break-words text-sm font-extrabold leading-6 text-[#1E293B]">{value}</p>
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
      <div className="text-[#2F80ED]">{icon}</div>
      <p className="mt-3 text-sm font-extrabold text-[#1E293B]">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{value}</p>
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

function formatDate(value: string) {
  if (!value) return "Chưa cập nhật";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("vi-VN");
}
