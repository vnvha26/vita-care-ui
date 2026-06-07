import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

export type LoginRole = "patient" | "doctor" | "manager" | "expert";

const roles: Record<
  LoginRole,
  {
    label: string;
    title: string;
    name: string;
    email: string;
    route: string;
    icon: typeof UserRound;
    accent: string;
  }
> = {
  patient: {
    label: "Bệnh nhân",
    title: "Theo dõi sức khỏe cá nhân",
    name: "Nguyễn Văn A",
    email: "patient@vitacare.vn",
    route: "/patient/dashboard",
    icon: UserRound,
    accent: "from-blue-500 to-indigo-500",
  },
  doctor: {
    label: "Bác sĩ",
    title: "Quản lý lịch khám và hồ sơ",
    name: "Nguyễn Văn B",
    email: "doctor@vitacare.vn",
    route: "/doctor",
    icon: Stethoscope,
    accent: "from-cyan-500 to-blue-500",
  },
  manager: {
    label: "Quản lý",
    title: "Điều phối phòng khám",
    name: "Nguyễn Văn C",
    email: "manager@vitacare.vn",
    route: "/manager",
    icon: Building2,
    accent: "from-violet-500 to-indigo-500",
  },
  expert: {
    label: "Chuyên gia",
    title: "Huấn luyện dữ liệu y tế AI",
    name: "Nguyễn Văn D",
    email: "expert@vitacare.vn",
    route: "/expert",
    icon: BrainCircuit,
    accent: "from-fuchsia-500 to-violet-500",
  },
};

export function LoginModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<LoginRole>("patient");
  const current = roles[role];
  const CurrentIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/35 p-4 backdrop-blur-md overflow-y-auto lg:items-center">
      <div className="relative grid w-full max-w-[940px] rounded-[34px] border border-white/70 bg-white/90 shadow-[0_28px_90px_rgba(44,71,146,0.22)] lg:max-h-[96vh] lg:overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm hover:bg-slate-50"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#e8efff] to-[#dfe4ff] p-8 lg:block">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-blue-300/35 blur-2xl" />
          <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-violet-400/25 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-blue-600">
                  VitaCare AI
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Hệ thống Y tế Thông minh
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-[26px] border border-white/80 bg-white/65 p-5 shadow-[0_18px_45px_rgba(72,98,170,0.14)] backdrop-blur">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${current.accent} text-white shadow-lg`}
              >
                <CurrentIcon className="h-7 w-7" />
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.24em] text-blue-500">
                Đăng nhập theo vai trò
              </p>
              <h3 className="mt-2 text-3xl font-extrabold leading-tight text-slate-800">
                {current.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-500">
                Truy cập đúng không gian làm việc cho từng vai trò, đồng bộ với
                trợ lý AI ở trang đầu.
              </p>
            </div>
          </div>
        </section>

        <section className="p-5 sm:p-8 lg:min-h-0 lg:max-h-[82vh] lg:overflow-y-auto custom-scrollbar">
          <div className="pr-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-600">
              <Bot className="h-4 w-4" />
              VitaCare AI Access
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-800">
              Đăng nhập / Đăng ký
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Chọn vai trò, kiểm tra tài khoản mẫu và tiếp tục vào hệ thống.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {(Object.keys(roles) as LoginRole[]).map((item) => {
              const RoleIcon = roles[item].icon;
              const isActive = role === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`rounded-[20px] border p-3.5 sm:p-4 text-left transition ${
                    isActive
                      ? "border-blue-300 bg-blue-50 shadow-[0_12px_28px_rgba(37,99,235,0.14)]"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r ${roles[item].accent} text-white`}
                  >
                    <RoleIcon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-sm font-extrabold text-slate-800">
                    {roles[item].label}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs font-medium leading-4 text-slate-500">
                    {roles[item].title}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Email tài khoản
              </span>
              <input
                readOnly
                value={current.email}
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none"
              />
            </label>

            <label className="mt-3 block">
              <span className="text-sm font-bold text-slate-700">Mật khẩu</span>
              <input
                readOnly
                value="123456"
                type="password"
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none"
              />
            </label>

            <Link
              to={current.route}
              className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${current.accent} text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:translate-y-[-1px]`}
            >
              Vào hệ thống với vai trò {current.label}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 flex items-center justify-between gap-3 text-[13px] sm:text-sm">
              <span className="font-semibold text-slate-500">
                Mẫu: {current.name}
              </span>
              <Link
                to="/patient/register"
                className="font-extrabold text-blue-600 hover:text-indigo-600"
              >
                Đăng ký mới
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
