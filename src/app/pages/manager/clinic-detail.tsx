import { useNavigate } from "react-router";
import { Edit, MapPin, Phone, Mail, Clock, Users, ShieldCheck, Building2, Star, Image as ImageIcon, Camera, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function ClinicDetail() {
  const navigate = useNavigate();

  // Mock data for the single clinic
  const clinic = {
    name: "Phòng khám Đa khoa Quốc tế ClinicPro",
    address: "123 Đường Nguyễn Văn Linh, Phường Tân Phú, Quận 7, TP.HCM",
    phone: "1900 1234",
    email: "contact@clinicpro.vn",
    status: "active",
    type: "Phòng khám đa khoa",
    license: "GP-2023-8899",
    description: "Phòng khám được trang bị đầy đủ thiết bị y tế hiện đại nhập khẩu từ Châu Âu. Đội ngũ y bác sĩ đầu ngành với hơn 15 năm kinh nghiệm, tận tâm vì sức khỏe người bệnh.",
    stats: {
      doctors: 12,
      patients: 1250,
      rating: 4.8,
      specialties: 5
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Banner & Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
        {/* Cover Image Placeholder */}
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <ImageIcon className="h-4 w-4" /> Đổi ảnh bìa
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-12 mb-6">
            <div className="h-32 w-32 rounded-2xl bg-white p-2 shadow-lg border border-gray-100 flex-shrink-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600">
                <Building2 className="h-12 w-12" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-2 py-0.5 text-xs font-semibold">
                  <ShieldCheck className="h-3 w-3 mr-1 inline" /> Đã xác thực
                </Badge>
                <span className="text-sm font-medium text-gray-500">{clinic.type}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{clinic.name}</h1>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/manager/clinic-registration")}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors shadow-sm"
              >
                <Edit className="h-4 w-4" />
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-gray-100">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Bác sĩ đang trực</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{clinic.stats.doctors}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Đủ ca</span>
              </div>
            </div>
            <div className="flex flex-col border-l border-gray-100 pl-4">
              <span className="text-sm text-gray-500 mb-1">Bệnh nhân tháng này</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{clinic.stats.patients}</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">+12%</span>
              </div>
            </div>
            <div className="flex flex-col border-l border-gray-100 pl-4">
              <span className="text-sm text-gray-500 mb-1">Chuyên khoa</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{clinic.stats.specialties}</span>
              </div>
            </div>
            <div className="flex flex-col border-l border-gray-100 pl-4">
              <span className="text-sm text-gray-500 mb-1">Đánh giá trung bình</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{clinic.stats.rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact & Info */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Địa chỉ chính</p>
                  <p className="text-gray-900 font-medium">{clinic.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-50 rounded-lg text-green-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Hotline CSKH</p>
                  <p className="text-gray-900 font-medium">{clinic.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email hỗ trợ</p>
                  <p className="text-gray-900 font-medium">{clinic.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-lg">Thời gian hoạt động</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 border-dashed">
                <span className="text-gray-600">Thứ 2 - Thứ 6</span>
                <span className="font-semibold text-gray-900">07:00 - 20:00</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100 border-dashed">
                <span className="text-gray-600">Thứ 7</span>
                <span className="font-semibold text-gray-900">07:00 - 17:00</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-gray-600">Chủ nhật</span>
                <span className="font-semibold text-red-500">Nghỉ</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Description & Specialties */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
              <CardTitle className="text-lg">Giới thiệu chung</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {clinic.description}
              </p>
              
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Các chuyên khoa nổi bật</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Nội tổng quát", "Tim mạch", "Nhi khoa", "Tai Mũi Họng", "Da liễu"].map((sp) => (
                    <div key={sp} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Giấy phép hoạt động: {clinic.license}</p>
                  <p className="text-xs text-gray-500 mt-1">Được cấp bởi Sở Y tế Thành phố Hồ Chí Minh. Có giá trị lưu hành toàn quốc.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Section */}
          <Card className="border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5 text-gray-500" />
                Thư viện hình ảnh
              </CardTitle>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                <Plus className="h-4 w-4" /> Thêm ảnh
              </button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" alt="Clinic Interior" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Sảnh lễ tân</span>
                  </div>
                </div>
                <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=600&auto=format&fit=crop" alt="Equipment" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Phòng xét nghiệm</span>
                  </div>
                </div>
                <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=600&auto=format&fit=crop" alt="Doctor Room" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Phòng khám bệnh</span>
                  </div>
                </div>
                <div className="aspect-square rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 hover:border-gray-300 transition-all cursor-pointer">
                  <Camera className="h-8 w-8 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Tải ảnh lên</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
