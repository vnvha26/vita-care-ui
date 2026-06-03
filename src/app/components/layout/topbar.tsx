import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

type Role = "doctor" | "expert" | "manager" | "patient";

interface TopbarProps {
  role: Role;
  userName: string;
  userRole: string;
  notifications?: number;
}

const HOME_LABEL = "Trang ch\u1ee7";

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

const doctorPageLabels: Record<string, string> = {
  "/doctor": HOME_LABEL,
  "/doctor/patients": "H\u1ed3 s\u01a1 b\u1ec7nh nh\u00e2n",
  "/doctor/examination": "Qu\u1ea3n l\u00fd l\u1ecbch kh\u00e1m",
  "/doctor/appointments": "Qu\u1ea3n l\u00fd l\u1ecbch h\u1eb9n",
  "/doctor/chat": "Tin nh\u1eafn",
  "/doctor/feedback": "Tra c\u1ee9u thu\u1ed1c",
  "/doctor/profile": "H\u1ed3 s\u01a1 b\u00e1c s\u0129",
};

const managerPageLabels: Record<string, string> = {
  "/manager": HOME_LABEL,
  "/manager/clinic-profile": "Th\u00f4ng tin ph\u00f2ng kh\u00e1m",
  "/manager/clinic-registration": "C\u1eadp nh\u1eadt ph\u00f2ng kh\u00e1m",
  "/manager/doctors": "Qu\u1ea3n l\u00fd b\u00e1c s\u0129",
  "/manager/doctors/new": "Th\u00eam b\u00e1c s\u0129",
  "/manager/appointments": "Ti\u1ebfp nh\u1eadn l\u1ecbch h\u1eb9n",
  "/manager/schedule": "Gi\u1edd l\u00e0m vi\u1ec7c",
  "/manager/chat": "Tin nh\u1eafn",
  "/manager/ai-data": "Qu\u1ea3n l\u00fd d\u1eef li\u1ec7u AI",
  "/manager/reports": "B\u00e1o c\u00e1o t\u1ed5ng h\u1ee3p",
};

const expertPageLabels: Record<string, string> = {
  "/expert": HOME_LABEL,
  "/expert/cases": "Ca c\u1ea7n \u0111\u00e1nh gi\u00e1",
  "/expert/chat": "Tr\u00f2 chuy\u1ec7n AI",
  "/expert/conversations": "H\u1ed9i tho\u1ea1i",
  "/expert/knowledge": "Kho tri th\u1ee9c",
  "/expert/patients": "B\u1ec7nh nh\u00e2n",
  "/expert/reports": "B\u00e1o c\u00e1o",
  "/expert/profile": "H\u1ed3 s\u01a1 chuy\u00ean gia",
};

function getCurrentPageLabel(role: Role, pathname: string) {
  if (role === "patient") return patientPageLabels[pathname] ?? HOME_LABEL;
  if (role === "doctor") {
    if (pathname.startsWith("/doctor/patients/")) return "Chi ti\u1ebft b\u1ec7nh nh\u00e2n";
    return doctorPageLabels[pathname] ?? HOME_LABEL;
  }
  if (role === "manager") {
    if (pathname.startsWith("/manager/doctors/") && pathname.endsWith("/edit")) return "Ch\u1ec9nh s\u1eeda b\u00e1c s\u0129";
    if (pathname.startsWith("/manager/doctors/")) return "Chi ti\u1ebft b\u00e1c s\u0129";
    return managerPageLabels[pathname] ?? HOME_LABEL;
  }
  if (role === "expert") {
    if (pathname.startsWith("/expert/cases/")) return "Chi ti\u1ebft ca \u0111\u00e1nh gi\u00e1";
    return expertPageLabels[pathname] ?? HOME_LABEL;
  }
  return HOME_LABEL;
}

export function Topbar({ role, userName, userRole, notifications = 0 }: TopbarProps) {
  const location = useLocation();
  const currentPageLabel = getCurrentPageLabel(role, location.pathname);
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
