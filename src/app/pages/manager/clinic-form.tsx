import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, Building2, MapPin, Phone, Mail, Stethoscope, Clock, ShieldCheck } from "lucide-react";

export default function ClinicForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    openTime: "07:00",
    closeTime: "20:00",
    type: "Phòng khám đa khoa",
    description: "",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/manager/clinic-profile");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Đăng ký thông tin phòng khám</h1>
          <p className="text-gray-500 mt-1">Hoàn thiện hồ sơ để kích hoạt đầy đủ tính năng của ClinicPro</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-4 px-2">
        <div className={`flex items-center gap-2 ${activeTab >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${activeTab >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>1</div>
          <span className="text-sm font-medium">Thông tin cơ bản</span>
        </div>
        <div className={`h-px w-16 ${activeTab >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center gap-2 ${activeTab >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${activeTab >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>2</div>
          <span className="text-sm font-medium">Liên hệ & Dịch vụ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        {/* Glassmorphism decorative backgrounds */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>

        <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-blue-900/5 rounded-3xl overflow-hidden p-8">
          
          {activeTab === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Cơ sở y tế</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Tên phòng khám <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="VD: Phòng khám Đa khoa Quốc tế"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Loại hình cơ sở</label>
                  <select
                    value={form.type}
                    onChange={(e) => set("type", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                  >
                    <option value="Phòng khám đa khoa">Phòng khám đa khoa</option>
                    <option value="Phòng khám chuyên khoa">Phòng khám chuyên khoa</option>
                    <option value="Phòng khám nha khoa">Phòng khám nha khoa</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Giấy phép hoạt động</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Số đăng ký GPKD..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Giới thiệu ngắn</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả về quy mô, trang thiết bị hoặc thế mạnh của phòng khám..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab(2)}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shadow-blue-600/20"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <MapPin className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Liên hệ & Dịch vụ</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Địa chỉ <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Số điện thoại CSKH <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="0123 456 789"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email công việc</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="contact@phongkham.vn"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2 mt-4 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <h3 className="font-medium text-gray-800">Thời gian làm việc</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Mở cửa</label>
                      <input
                        type="time"
                        value={form.openTime}
                        onChange={(e) => set("openTime", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Đóng cửa</label>
                      <input
                        type="time"
                        value={form.closeTime}
                        onChange={(e) => set("closeTime", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shadow-blue-600/20 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  {isSubmitting ? "Đang lưu..." : "Lưu hồ sơ"}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
