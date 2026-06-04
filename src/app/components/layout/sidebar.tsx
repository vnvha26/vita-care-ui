import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  MessageCircle,
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
  HeartPulse
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
  { title: "Chat & yêu cầu", href: "/expert/chat", icon: MessageCircle },
  { title: "Báo cáo thống kê", href: "/expert/reports", icon: BarChart3 },
  { title: "Hồ sơ cá nhân", href: "/expert/profile", icon: Settings },
];

const managerNav: NavItem[] = [
  { title: "Chatbot Hỗ trợ", href: "/manager", icon: Bot },
  { title: "Quản lý phòng khám", href: "/manager/clinics", icon: Building2 },
  { title: "Quản lý chuyên khoa", href: "/manager/specialties", icon: FileText },
  { title: "Quản lý thông tin bác sĩ", href: "/manager/doctors", icon: Users },
  { title: "Chat", href: "/manager/chat", icon: MessageCircle },
  { title: "Quản lý ca bệnh", href: "/manager/cases", icon: ClipboardList },
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

const roleNavMap = {
  doctor: doctorNav,
  expert: expertNav,
  manager: managerNav,
  patient: patientNav,
};

interface SidebarProps {
  role: "doctor" | "expert" | "manager" | "patient";
}

export function Sidebar({ role }: SidebarProps) {
  const location = useLocation();
  const navItems = roleNavMap[role];

  const roleLabels = {
    doctor: "Bác sĩ",
    expert: "Chuyên gia",
    manager: "Quản lý",
    patient: "Bệnh nhân",
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">nhóm 4</h1>
            <p className="text-xs text-gray-500">{roleLabels[role]}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-500")} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
