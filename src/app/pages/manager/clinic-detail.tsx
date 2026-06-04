import type { ReactNode } from "react";
import { Camera, Clock, Edit3, Hospital, Mail, MapPin, Phone, Star, Stethoscope, Users } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

const specialties = ["Nội tổng quát", "Tim mạch", "Nhi khoa", "Tai Mũi Họng", "Da liễu"];

export default function ClinicDetail() {
  return (
    <div className="min-w-0 space-y-6 overflow-hidden">
      <PageHeader
        title="Thông tin phòng khám"
        description="Tổng hợp hồ sơ phòng khám, năng lực tiếp nhận và trạng thái vận hành."
      />

      <section className="min-w-0 overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="relative h-48 bg-gradient-to-r from-[#2F80ED] via-[#6D5FE5] to-[#A855F7]">
          <button className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-2xl bg-white/18 px-4 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/25">
            <Camera className="h-4 w-4" />
            Đổi ảnh bìa
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex min-w-0 flex-col gap-5 border-b border-[#E2E8F0] pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[20px] border border-[#E2E8F0] bg-[#F7FAFC] text-[#2F80ED] shadow-sm">
                <Hospital className="h-12 w-12" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge tone="green">Đã xác thực</StatusBadge>
                  <span className="text-sm font-bold text-[#64748B]">Phòng khám đa khoa</span>
                </div>
                <h1 className="mt-2 text-3xl font-extrabold text-[#1E293B]">Phòng khám Đa khoa Quốc tế VitaCare</h1>
              </div>
            </div>
            <ActionButton icon={<Edit3 className="h-4 w-4" />}>Chỉnh sửa hồ sơ</ActionButton>
          </div>

          <div className="grid gap-4 pt-5 md:grid-cols-2 xl:grid-cols-4">
            <ClinicMetric label="Bác sĩ đang trực" value="12" helper="Đủ ca" />
            <ClinicMetric label="Bệnh nhân tháng này" value="1250" helper="+12%" />
            <ClinicMetric label="Chuyên khoa" value="5" />
            <ClinicMetric label="Đánh giá trung bình" value="4.8" helper="★" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <SectionCard title="Thông tin liên hệ">
            <div className="space-y-4">
              <ContactItem icon={<MapPin className="h-5 w-5" />} label="Địa chỉ chính" value="123 Đường Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM" />
              <ContactItem icon={<Phone className="h-5 w-5" />} label="Hotline CSKH" value="1900 1234" />
              <ContactItem icon={<Mail className="h-5 w-5" />} label="Email hỗ trợ" value="contact@vitacare.vn" />
            </div>
          </SectionCard>

          <SectionCard title="Thời gian hoạt động">
            <div className="space-y-3 text-sm">
              <HourRow label="Thứ 2 - Thứ 6" value="07:00 - 20:00" />
              <HourRow label="Thứ 7" value="08:00 - 17:00" />
              <HourRow label="Chủ nhật" value="Nghỉ" />
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Giới thiệu chung">
          <p className="text-sm font-medium leading-7 text-[#64748B]">
            Phòng khám được trang bị thiết bị y tế hiện đại, đội ngũ bác sĩ đa chuyên khoa và hệ thống trợ lý AI hỗ trợ điều phối, nhắc lịch và tổng hợp dữ liệu khám bệnh.
          </p>

          <h3 className="mt-7 text-base font-extrabold text-[#1E293B]">Các chuyên khoa nổi bật</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF] text-[#2F80ED]">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <p className="font-extrabold text-[#1E293B]">{specialty}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-[#CFE3FF] bg-[#F7FAFC] p-5">
            <h3 className="font-extrabold text-[#1E293B]">Năng lực tiếp nhận</h3>
            <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">
              Tối đa 42 lịch/ngày, có hỗ trợ khám trực tuyến, nhắc lịch tự động và phân luồng ca khẩn cấp.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ClinicMetric({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="border-b border-[#E2E8F0] pb-4 md:border-b-0 md:border-r md:pr-4 last:border-r-0">
      <p className="text-sm font-bold text-[#64748B]">{label}</p>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-2xl font-extrabold text-[#1E293B]">{value}</p>
        {helper && <StatusBadge tone={helper.includes("+") || helper === "Đủ ca" ? "green" : "amber"}>{helper}</StatusBadge>}
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#2F80ED]">{icon}</div>
      <div>
        <p className="text-sm font-bold text-[#94A3B8]">{label}</p>
        <p className="mt-1 text-sm font-extrabold leading-6 text-[#1E293B]">{value}</p>
      </div>
    </div>
  );
}

function HourRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#E2E8F0] py-3 last:border-b-0">
      <span className="font-medium text-[#64748B]">{label}</span>
      <span className="font-extrabold text-[#1E293B]">{value}</span>
    </div>
  );
}
