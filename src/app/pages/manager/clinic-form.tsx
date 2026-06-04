import { Camera, ImagePlus, Save, ArrowLeft, Upload, Building, Mail, Phone, MapPin, CheckCircle2, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ActionButton, PageHeader, SectionCard, StatusBadge, DataRow } from "../../components/layout/role-page";

export default function ClinicForm() {
  const navigate = useNavigate();

  return (
    <div className="min-w-0 space-y-6 overflow-hidden">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F2F7FB]">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <PageHeader 
            title="Chỉnh sửa hồ sơ phòng khám" 
            description="Cập nhật thông tin nhận diện, liên hệ và hình ảnh cơ sở vật chất." 
            actions={<ActionButton icon={<Save className="h-4 w-4" />}>Lưu thay đổi</ActionButton>}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <SectionCard title="Thông tin cơ bản">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#1E293B]">Tên phòng khám</label>
                <input defaultValue="Phòng khám Đa khoa Quốc tế VitaCare" className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 py-3 text-sm font-medium text-[#1E293B] outline-none focus:border-[#2F80ED] focus:bg-white focus:ring-4 focus:ring-[#2F80ED]/10 transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#1E293B]">Giới thiệu ngắn</label>
                <textarea defaultValue="Phòng khám được trang bị thiết bị y tế hiện đại, đội ngũ bác sĩ đa chuyên khoa và hệ thống trợ lý AI hỗ trợ điều phối, nhắc lịch và tổng hợp dữ liệu khám bệnh." rows={3} className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 py-3 text-sm font-medium text-[#1E293B] outline-none focus:border-[#2F80ED] focus:bg-white focus:ring-4 focus:ring-[#2F80ED]/10 transition-all" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Thông tin liên hệ">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#1E293B]">Địa chỉ chính</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
                  <input defaultValue="123 Đường Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM" className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] py-3 pl-11 pr-4 text-sm font-medium text-[#1E293B] outline-none focus:border-[#2F80ED] focus:bg-white focus:ring-4 focus:ring-[#2F80ED]/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1E293B]">Hotline CSKH</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
                  <input defaultValue="1900 1234" className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] py-3 pl-11 pr-4 text-sm font-medium text-[#1E293B] outline-none focus:border-[#2F80ED] focus:bg-white focus:ring-4 focus:ring-[#2F80ED]/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1E293B]">Email hỗ trợ</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
                  <input defaultValue="contact@vitacare.vn" className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] py-3 pl-11 pr-4 text-sm font-medium text-[#1E293B] outline-none focus:border-[#2F80ED] focus:bg-white focus:ring-4 focus:ring-[#2F80ED]/10 transition-all" />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Hình ảnh & Nhận diện">
            <div className="space-y-5">
              <div>
                <label className="mb-3 block text-sm font-semibold text-[#1E293B]">Ảnh bìa (Cover Image)</label>
                <div className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CFE3FF] bg-[#F2F7FB] transition-colors hover:bg-[#EAF3FF]">
                  <ImagePlus className="mb-2 h-8 w-8 text-[#2F80ED]" />
                  <p className="text-sm font-bold text-[#1C64D1]">Nhấn để tải lên ảnh bìa mới</p>
                  <p className="mt-1 text-xs text-[#64748B]">PNG, JPG, GIF lên đến 5MB</p>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-[#1E293B]">Thư viện ảnh (Gallery)</label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1538108149393-cebb47cbdc17?q=80&w=600&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=600&auto=format&fit=crop"
                  ].map((src, idx) => (
                    <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E2E8F0]">
                      <img src={src} className="h-full w-full object-cover" alt="" />
                      <button className="absolute right-2 top-2 rounded-full bg-rose-500 p-1.5 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-rose-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F7FAFC] hover:border-[#CFE3FF] hover:bg-[#F2F7FB] transition-colors">
                    <Upload className="mb-2 h-5 w-5 text-[#64748B]" />
                    <span className="text-xs font-bold text-[#64748B]">Thêm ảnh</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Trạng thái hồ sơ">
            <div className="space-y-4">
              <DataRow title="Tiến độ hoàn thiện" description="Bạn đã điền 85% thông tin cần thiết." meta={<StatusBadge tone="blue">Khá tốt</StatusBadge>} icon={<CheckCircle2 className="h-5 w-5" />} />
              <div className="w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div className="h-2 w-[85%] rounded-full bg-[#2F80ED]" />
              </div>
            </div>
            
            <div className="mt-6 rounded-2xl bg-[#FFF1F2] p-4 border border-[#FFE4E6]">
              <p className="text-sm font-bold text-[#E11D48]">Cần cập nhật</p>
              <p className="mt-1 text-xs leading-5 text-[#BE123C]">Giấy phép hoạt động y tế của bạn sẽ hết hạn vào tháng tới. Vui lòng tải lên bản sao mới nhất.</p>
              <button className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#E11D48] shadow-sm hover:bg-gray-50 border border-[#FFE4E6] transition-colors">Cập nhật giấy phép</button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
