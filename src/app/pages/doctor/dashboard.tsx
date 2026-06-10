import { Link } from "react-router";
import { Calendar, ClipboardList, Stethoscope, BarChart3, Video, MessageSquare, AlertTriangle, ShieldAlert, ChevronRight, Activity, Users, Clock } from "lucide-react";
import { SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

export default function DoctorDashboard() {
  const urgentNotifications = [
    {
      id: "n1",
      type: "overload",
      title: "Cảnh báo quá tải chi nhánh",
      message: "Chi nhánh VitaCare Ba Đình hiện vượt quá 92% công suất phòng khám.",
      time: "Vừa xong",
      actionLink: "/doctor/operational",
      actionText: "Điều phối ngay"
    },
    {
      id: "n2",
      type: "vitals",
      title: "Cảnh báo sinh hiệu khẩn cấp",
      message: "Bệnh nhân Đỗ Minh Tú (P001) tự khai sốt cao 38.9 °C và huyết áp 145/95 mmHg.",
      time: "5 phút trước",
      actionLink: "/doctor/patients",
      actionText: "Xem hồ sơ"
    }
  ];

  const sitemapModules = [
    {
      title: "Quản lý lịch hẹn",
      description: "Xem lịch hẹn trong ngày, lọc bệnh nhân thân thiết & cảnh báo thói quen tự mua thuốc.",
      icon: <Calendar className="h-6 w-6" />,
      href: "/doctor/appointments",
      badge: "5 lịch",
      color: "from-blue-500 to-indigo-500",
      bgSoft: "bg-blue-50/50"
    },
    {
      title: "Dữ liệu lâm sàng",
      description: "Hồ sơ sức khỏe điện tử tích hợp màu xanh dương, cảnh báo đỏ và kết quả xét nghiệm.",
      icon: <ClipboardList className="h-6 w-6" />,
      href: "/doctor/patients",
      badge: "Xem dữ liệu",
      color: "from-sky-500 to-blue-600",
      bgSoft: "bg-sky-50/50"
    },
    {
      title: "Khám bệnh & Kê đơn",
      description: "Hàng chờ ca khám hiện tại, kho đơn thuốc mẫu, kê đơn ký số và nhắc lịch tự động.",
      icon: <Stethoscope className="h-6 w-6" />,
      href: "/doctor/examination",
      badge: "3 chờ khám",
      color: "from-teal-500 to-[#27C3A2]",
      bgSoft: "bg-teal-50/50"
    },
    {
      title: "Giám sát & Điều phối",
      description: "Theo dõi hiệu suất vận hành thời gian thực, bản đồ bác sĩ và luân chuyển nhân sự thông minh.",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/doctor/operational",
      badge: "1 báo động",
      color: "from-violet-500 to-purple-600",
      bgSoft: "bg-violet-50/50"
    },
    {
      title: "Phòng khám trực tuyến",
      description: "Phê duyệt cuộc hẹn từ xa, bộ thẩm định dữ liệu đầu vào, video call tích hợp và ảnh tổn thương.",
      icon: <Video className="h-6 w-6" />,
      href: "/doctor/telemedicine",
      badge: "2 chờ duyệt",
      color: "from-pink-500 to-rose-500",
      bgSoft: "bg-pink-50/50"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <section className="relative rounded-[28px] bg-gradient-to-r from-[#1E293B] via-[#2D4A86] to-[#2563eb] p-8 text-white shadow-lg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-xl" />
        
        <div className="relative z-10 max-w-2xl">
          <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-black tracking-widest text-[#27C3A2] uppercase">
            Hệ thống VitaCare AI
          </span>
          <h1 className="mt-4 text-3xl font-black md:text-4xl leading-tight">
            Xin chào, BS. Nguyễn Văn B
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-350 leading-relaxed">
            Hệ thống phân tích AI ghi nhận lưu lượng phòng khám hôm nay tăng cao. Hãy điều hành các phân hệ thông qua bảng điều khiển bên dưới.
          </p>
        </div>
      </section>

      {/* Urgent Notifications Center */}
      {urgentNotifications.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-600">
            <ShieldAlert className="h-4 w-4 animate-pulse" />
            Thông báo khẩn cấp từ trung tâm điều hành
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {urgentNotifications.map((notif) => (
              <div 
                key={notif.id}
                className="flex items-start gap-3 rounded-2xl border border-rose-250 bg-rose-50/30 p-4 shadow-sm border-l-4 border-l-rose-600"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs text-rose-600 ring-1 ring-rose-100">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-rose-800 uppercase tracking-wide">{notif.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-600 leading-normal">{notif.message}</p>
                  <Link 
                    to={notif.actionLink}
                    className="mt-2.5 inline-flex items-center gap-1 text-xs font-black text-[#2D4A86] hover:underline"
                  >
                    {notif.actionText}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick stats grid */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng lịch hẹn hôm nay" value="8" helper="2 ca đã hoàn thành" tone="blue" icon={<Calendar className="h-5 w-5" />} />
        <StatCard label="Ca khám trực tuyến" value="2" helper="Chờ bác sĩ kết nối" tone="violet" icon={<Video className="h-5 w-5" />} />
        <StatCard label="Hiệu suất bác sĩ" value="98.5%" helper="Đạt chuẩn ISO y khoa" tone="green" icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Tin nhắn bệnh nhân" value="4 tin" helper="Chưa phản hồi" tone="amber" icon={<MessageSquare className="h-5 w-5" />} />
      </section>

      {/* Sitemap Modules Panel */}
      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide">Phân hệ chức năng sitemap</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sitemapModules.map((mod) => (
            <Link 
              key={mod.title}
              to={mod.href}
              className="group flex flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-350 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${mod.color} text-white shadow-sm transition group-hover:scale-105`}>
                  {mod.icon}
                </div>
                <h3 className="mt-4 text-sm font-black text-slate-800 flex items-center justify-between">
                  <span>{mod.title}</span>
                  <StatusBadge tone="slate">{mod.badge}</StatusBadge>
                </h3>
                <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed">
                  {mod.description}
                </p>
              </div>
              
              <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-black text-[#2D4A86]">
                <span>Mở phân hệ</span>
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Today schedule timeline preview */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard title="Dòng thời gian khám bệnh hôm nay">
          <div className="space-y-3">
            {[
              { time: "09:00 - 09:30", patient: "Đỗ Minh Tú (P001)", reason: "Đau thượng vị cấp, ợ chua nhiều", status: "Chờ khám" },
              { time: "10:30 - 11:00", patient: "Nguyễn Văn An (P002)", reason: "Kiểm tra đường huyết & HbA1c", status: "Tái khám" },
              { time: "14:30 - 15:00", patient: "Trần Thị Bình (P003)", reason: "Huyết áp dao động, nhức đầu", status: "Đã xác nhận" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-8.5 w-8.5 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850">{item.time} · {item.patient}</h4>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">{item.reason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge tone={item.status === "Chờ khám" ? "amber" : item.status === "Tái khám" ? "violet" : "green"}>
                    {item.status}
                  </StatusBadge>
                  <Link to="/doctor/examination">
                    <button className="text-xs font-black text-blue-600 hover:underline flex items-center">
                      Vào khám
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tin nhắn từ hệ thống y tế">
          <div className="space-y-3">
            {[
              { from: "Hệ thống AI", text: "Đã hoàn thành phân tích bộ lọc cảnh báo sử dụng thuốc tự phát của bệnh nhân thân thiết.", time: "10 phút trước" },
              { from: "Tổng đài viên", text: "Bệnh nhân Lê Minh Châu (P005) yêu cầu dời lịch hẹn khám từ xa từ 16h sang 16h30.", time: "1 tiếng trước" }
            ].map((msg, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400">
                  <span>{msg.from}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="mt-1.5 text-xs font-medium text-slate-650 leading-relaxed">
                  "{msg.text}"
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

    </div>
  );
}
