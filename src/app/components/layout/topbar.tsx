import { Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router";
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

const HOME_LABEL = "Trang ch\u1ee7";

const searchPlaceholders: Record<Role, string> = {
  patient: "T\u00ecm d\u1ecbch b\u1ec7nh, b\u00e1c s\u0129, l\u1ecbch h\u1eb9n...",
  doctor: "T\u00ecm b\u1ec7nh nh\u00e2n, thu\u1ed1c, l\u1ecbch kh\u00e1m...",
  manager: "T\u00ecm b\u1ec7nh nh\u00e2n, b\u00e1c s\u0129, b\u00e1o c\u00e1o...",
  expert: "T\u00ecm ca \u0111\u00e1nh gi\u00e1, b\u1ec7nh nh\u00e2n, h\u1ed9i tho\u1ea1i, t\u00e0i li\u1ec7u...",
};

const roleHome: Record<Role, string> = {
  patient: "/patient/dashboard",
  doctor: "/doctor",
  manager: "/manager",
  expert: "/expert",
};

const patientPageLabels: Record<string, string> = {
  "/patient": HOME_LABEL,
  "/patient/dashboard": HOME_LABEL,
  "/patient/consultation": "T\u01b0 v\u1ea5n s\u1ee9c kh\u1ecfe",
  "/patient/doctors": "B\u00e1c s\u0129",
  "/patient/appointments": "L\u1ecbch kh\u00e1m",
  "/patient/book": "\u0110\u1eb7t l\u1ecbch kh\u00e1m",
  "/patient/medical-records": "L\u1ecbch s\u1eed kh\u00e1m",
  "/patient/notifications": "Th\u00f4ng b\u00e1o",
  "/patient/profile": "H\u1ed3 s\u01a1 c\u00e1 nh\u00e2n",
};

function getCurrentPageLabel(role: Role, pathname: string) {
  if (role === "patient") return patientPageLabels[pathname] ?? HOME_LABEL;
  return HOME_LABEL;
}

export function Topbar({ role, userName, userRole, notifications = 0 }: TopbarProps) {
  const location = useLocation();
  const currentPageLabel = getCurrentPageLabel(role, location.pathname);
  const showSearch = role !== "patient";
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
          {HOME_LABEL}
        </Link>
        <span className="hidden truncate text-sm font-bold text-[#1C64D1] sm:inline">/ {currentPageLabel}</span>
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative hidden w-[min(430px,36vw)] md:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              placeholder={searchPlaceholders[role]}
              className="h-11 rounded-full border-0 bg-[#F2F7FB] pl-11 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus-visible:ring-[#2F80ED]"
            />
          </div>
        )}

        <Link
          to={role === "patient" ? "/patient/notifications" : roleHome[role]}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F7FB] text-[#64748B] hover:bg-[#EAF3FF] hover:text-[#1C64D1]"
          aria-label="Th\u00f4ng b\u00e1o"
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
