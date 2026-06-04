import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  Settings,
  Activity,
  Calendar,
  Building2,
  Shield,
  BarChart3,
  Bot,
  Database,
  Search,
  Bell,
  HeartPulse,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const doctorNav: NavItem[] = [
  { title: "Dashboard", href: "/doctor", icon: LayoutDashboard },
  { title: "Danh sách bệnh nhân", href: "/doctor/patients", icon: Users },
  { title: "Nhập liệu khám bệnh", href: "/doctor/examination", icon: ClipboardList },
  { title: "Chat & Tư vấn", href: "/doctor/chat", icon: MessageCircle },
  { title: "Xem phản hồi", href: "/doctor/feedback", icon: FileText },
  { title: "Hồ sơ cá nhân", href: "/doctor/profile", icon: Settings },
];

const expertNav: NavItem[] = [
  { title: "Dashboard", href: "/expert", icon: LayoutDashboard },
  { title: "Danh sách ca đánh giá", href: "/expert/cases", icon: ClipboardList },
  { title: "Chat trao đổi", href: "/expert/chat", icon: MessageCircle },
  { title: "Báo cáo thống kê", href: "/expert/reports", icon: BarChart3 },
  { title: "Hồ sơ cá nhân", href: "/expert/profile", icon: Settings },
];

const managerNav: NavItem[] = [
  { title: "Trang chủ", href: "/manager", icon: Bot },
  { title: "Thông tin phòng khám", href: "/manager/clinic-profile", icon: Building2 },
  { title: "Quản lý bác sĩ", href: "/manager/doctors", icon: Users },
  { title: "Messenger", href: "/manager/chat", icon: MessageCircle },
  { title: "Tiếp nhận lịch hẹn", href: "/manager/appointments", icon: ClipboardList },
  { title: "Giờ làm việc", href: "/manager/schedule", icon: Calendar },
  { title: "Quản lý dữ liệu AI", href: "/manager/ai-data", icon: Database },
  { title: "Báo cáo tổng hợp", href: "/manager/reports", icon: BarChart3 },
];

const patientNav: NavItem[] = [
  { title: "Tổng quan", href: "/patient/dashboard", icon: LayoutDashboard },
  { title: "Lịch khám", href: "/patient/appointments", icon: Calendar },
  { title: "Hồ sơ khám bệnh", href: "/patient/medical-records", icon: ClipboardList },
  { title: "Tìm bác sĩ", href: "/patient/doctors", icon: Search },
  { title: "Thông báo", href: "/patient/notifications", icon: Bell },
  { title: "Hồ sơ cá nhân", href: "/patient/profile", icon: Settings },
];

const consultantNav: NavItem[] = [
  { title: "Tư vấn mới", href: "/consultant/consultation", icon: Bot },
  { title: "Lịch sử tư vấn", href: "/consultant/history", icon: FileText },
  { title: "Hồ sơ sức khỏe", href: "/consultant/health-profile", icon: HeartPulse },
  { title: "Theo dõi triệu chứng", href: "/consultant/symptom-tracking", icon: Activity },
  { title: "Đặt lịch khám", href: "/consultant/appointment", icon: Calendar },
  { title: "Cài đặt", href: "/consultant/health-profile", icon: Settings },
];

const roleNavMap = {
  doctor: doctorNav,
  expert: expertNav,
  manager: managerNav,
  patient: patientNav,
  consultant: consultantNav,
};

interface SidebarProps {
  role: "doctor" | "expert" | "manager" | "patient" | "consultant";
}

export function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navItems = roleNavMap[role];

  const roleLabels = {
    doctor: "Bác sĩ",
    expert: "Chuyên gia",
    manager: "Quản lý",
    patient: "Bệnh nhân",
    consultant: "Người cần tư vấn",
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-white/60 bg-white/60 backdrop-blur-xl transition-all duration-300 relative z-[45]",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={cn("flex h-16 items-center border-b border-white/60", isCollapsed ? "justify-center px-0" : "px-6")}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-semibold text-gray-900">nhóm 4</h1>
              <p className="text-xs text-gray-500">{roleLabels[role]}</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              title={isCollapsed ? item.title : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2 transition-colors",
                isCollapsed ? "justify-center px-0" : "px-3",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-700" : "text-gray-500")} />
              {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
