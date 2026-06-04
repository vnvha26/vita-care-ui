import { useState } from "react";
import { Link } from "react-router";
import { Bot, X } from "lucide-react";

type LoginRole = "patient" | "doctor" | "manager" | "expert";

const roles: Record<LoginRole, { label: string; name: string; email: string; route: string }> = {
  patient: { label: "Bệnh nhân", name: "Nguyễn Văn A", email: "patient@vitacare.vn", route: "/patient/dashboard" },
  doctor: { label: "Bác sĩ", name: "Nguyễn Văn B", email: "doctor@vitacare.vn", route: "/doctor" },
  manager: { label: "Quản lý", name: "Nguyễn Văn C", email: "manager@vitacare.vn", route: "/manager" },
  expert: { label: "Chuyên gia", name: "Nguyễn Văn D", email: "expert@vitacare.vn", route: "/expert" },
};

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<LoginRole>("patient");
  const current = roles[role];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md">
      <div className="grid w-full max-w-[860px] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-gradient-to-br from-[#5B7FF0] to-[#5FC8AA] p-8 text-white lg:block">
          <Bot className="h-12 w-12" />
          <h2 className="mt-10 text-3xl font-extrabold">VitaCare AI</h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/90">
            Tư vấn AI, đặt lịch khám và quản lý dữ liệu y tế theo từng vai trò.
          </p>
        </div>

        <div className="relative p-7 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F2F7FB]"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="pr-8 text-2xl font-extrabold text-[#1E293B]">Đăng nhập vào VitaCare AI</h2>
          <p className="mt-2 text-sm text-[#64748B]">Vui lòng chọn vai trò để tiếp tục.</p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            {(Object.keys(roles) as LoginRole[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                  role === item ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                {roles[item].label}
              </button>
            ))}
          </div>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-[#1E293B]">Email tài khoản</span>
            <input readOnly value={current.email} className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm text-[#1E293B]" />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-[#1E293B]">Mật khẩu</span>
            <input readOnly value="123456" type="password" className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm text-[#1E293B]" />
          </label>

          <Link to={current.route} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#5B7FF0] text-sm font-extrabold text-white hover:bg-[#1C64D1]">
            Đăng nhập ngay
          </Link>

          <div className="mt-5 rounded-2xl border border-dashed border-[#CFE3FF] bg-[#F7FAFC] p-4">
            <p className="text-center text-sm font-bold text-[#64748B]">Tài khoản mẫu</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(roles) as LoginRole[]).map((item) => (
                <Link key={item} to={roles[item].route} className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-center text-sm font-bold text-[#4F6FE5] hover:bg-[#EAF3FF]">
                  {roles[item].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
