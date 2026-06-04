import { Bell, Search } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

type Role = "doctor" | "expert" | "manager" | "patient";

interface TopbarProps {
  role: Role;
  userName: string;
  userRole: string;
  notifications?: number;
}

const searchPlaceholders: Record<Role, string> = {
  patient: "Tìm dịch bệnh, bác sĩ, lịch hẹn...",
  doctor: "Tìm bệnh nhân, thuốc, lịch khám...",
  manager: "Tìm bệnh nhân, bác sĩ, báo cáo...",
  expert: "Tìm ca đánh giá, bệnh nhân, hội thoại, tài liệu...",
};

const roleHome: Record<Role, string> = {
  patient: "/patient/dashboard",
  doctor: "/doctor",
  manager: "/manager",
  expert: "/expert",
};

export function Topbar({ role, userName, userRole, notifications = 0 }: TopbarProps) {
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-[72px] items-center justify-between rounded-[22px] border border-[#E2E8F0] bg-white/90 px-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        <Link to={roleHome[role]} className="rounded-full bg-[#F2F7FB] px-4 py-2 text-sm font-semibold text-[#64748B]">
          Trang chủ
        </Link>
        <span className="hidden text-sm font-bold text-[#1C64D1] sm:inline">/ Trang chủ</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-[min(430px,36vw)] md:block">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <Input
            placeholder={searchPlaceholders[role]}
            className="h-11 rounded-full border-0 bg-[#F2F7FB] pl-11 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus-visible:ring-[#2F80ED]"
          />
        </div>

        <Link
          to={role === "patient" ? "/patient/notifications" : roleHome[role]}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F7FB] text-[#64748B] hover:bg-[#EAF3FF] hover:text-[#1C64D1]"
          aria-label="Thông báo"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-[#EF4444] px-1 text-[10px] text-white">
              {notifications}
            </Badge>
          )}
        </Link>

        <div className="hidden text-right lg:block">
          <p className="text-sm font-bold text-[#1E293B]">{userName}</p>
          <p className="text-xs font-medium text-[#64748B]">{userRole}</p>
        </div>

        <Avatar>
          <AvatarFallback className="bg-[#EAF3FF] text-sm font-bold text-[#2F80ED]">{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
