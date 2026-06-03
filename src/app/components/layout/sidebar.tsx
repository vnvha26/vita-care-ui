import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Database,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  MessageSquareText,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "../../lib/utils";

type Role = "doctor" | "expert" | "manager" | "patient";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const patientNav: NavItem[] = [
  { title: "Trang chủ", href: "/patient/dashboard", icon: LayoutDashboard },
  { title: "Tư vấn sức khỏe", href: "/patient/consultation", icon: Bot },
  { title: "Lịch khám", href: "/patient/appointments", icon: Calendar },
  { title: "Lịch sử khám", href: "/patient/medical-records", icon: ClipboardList },
  { title: "Dữ liệu y tế", href: "/patient/profile", icon: Database },
];

const doctorNav: NavItem[] = [
  { title: "Trang chủ", href: "/doctor", icon: LayoutDashboard },
  { title: "Lịch khám", href: "/doctor/examination", icon: Calendar },
  { title: "Quản lý lịch hẹn", href: "/doctor/patients", icon: ClipboardList },
  { title: "Tin nhắn", href: "/doctor/chat", icon: MessageCircle },
  { title: "Hồ sơ bệnh án", href: "/doctor/patients", icon: FileText },
  { title: "Tra cứu thuốc", href: "/doctor/feedback", icon: Pill },
];

const managerNav: NavItem[] = [
  { title: "Trang chủ", href: "/manager", icon: LayoutDashboard },
  { title: "Thông tin phòng khám", href: "/manager/clinic-profile", icon: Users },
  { title: "Quản lý bác sĩ", href: "/manager/doctors", icon: Stethoscope },
  { title: "Tin nhắn", href: "/manager/chat", icon: MessageCircle },
  { title: "Tiếp nhận lịch hẹn", href: "/manager/appointments", icon: Calendar },
  { title: "Giờ làm việc", href: "/manager/schedule", icon: Bell },
  { title: "Quản lý dữ liệu AI", href: "/manager/ai-data", icon: Database },
  { title: "Báo cáo tổng hợp", href: "/manager/reports", icon: BarChart3 },
];

const expertNav: NavItem[] = [
  { title: "Trang chủ", href: "/expert", icon: LayoutDashboard },
  { title: "Ca đánh giá", href: "/expert/cases", icon: ClipboardCheck },
  { title: "Chat & yêu cầu", href: "/expert/chat", icon: MessageCircle },
  { title: "Quản lý hội thoại", href: "/expert/conversations", icon: MessageSquareText },
  { title: "Quản lý tri thức", href: "/expert/knowledge", icon: BookOpen },
  { title: "Quản lý bệnh nhân", href: "/expert/patients", icon: UserRound },
  { title: "Báo cáo & phân tích", href: "/expert/reports", icon: BarChart3 },
  { title: "Hồ sơ cá nhân", href: "/expert/profile", icon: ShieldCheck },
];

const roleNavMap: Record<Role, NavItem[]> = {
  patient: patientNav,
  doctor: doctorNav,
  manager: managerNav,
  expert: expertNav,
};

const roleLabels: Record<Role, string> = {
  patient: "Bệnh nhân",
  doctor: "Bác sĩ",
  manager: "Quản lý",
  expert: "Chuyên gia",
};

interface SidebarProps {
  role: Role;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navItems = roleNavMap[role];

  return (
    <aside
      className={cn(
        "relative z-40 flex min-h-screen shrink-0 flex-col border-r border-[#E2E8F0] bg-white/90 px-4 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] backdrop-blur transition-all duration-300",
        isCollapsed ? "w-20" : "w-[260px]"
      )}
    >
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm hover:bg-[#F2F7FB]"
        aria-label={isCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <Link to="/" className={cn("flex h-16 items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED] shadow-sm">
          <ShieldCheck className="h-7 w-7" />
        </div>
        {!isCollapsed && (
          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold text-[#1E293B]">VitaCare AI</h1>
            <p className="truncate text-xs font-semibold text-[#64748B]">{roleLabels[role]}</p>
          </div>
        )}
      </Link>

      <nav className="mt-8 flex-1 space-y-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href || (item.href !== `/${role}` && location.pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={`${item.href}-${item.title}`}
              to={item.href}
              title={isCollapsed ? item.title : undefined}
              className={cn(
                "flex h-[46px] items-center gap-3 rounded-[14px] text-sm font-semibold transition-colors",
                isCollapsed ? "justify-center px-0" : "px-[14px]",
                isActive
                  ? "bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] text-[#1C64D1] shadow-sm"
                  : "text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B]"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="border-t border-[#E2E8F0] pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F2F7FB] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3FF] text-sm font-bold text-[#2F80ED]">
              {userName
                .split(" ")
                .slice(-1)[0]
                .slice(0, 1)
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#1E293B]">{userName}</p>
              <p className="truncate text-xs font-medium text-[#64748B]">{roleLabels[role]}</p>
            </div>
          </div>
          <Link
            to="/"
            className="mt-3 flex h-11 items-center gap-2 rounded-[14px] px-3 text-sm font-bold text-[#64748B] hover:bg-[#F2F7FB] hover:text-[#1E293B]"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Link>
        </div>
      )}
    </aside>
  );
}
