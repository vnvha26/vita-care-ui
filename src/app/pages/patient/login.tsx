import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, BrainCircuit, Building2, ShieldCheck, Stethoscope, UserRound } from "lucide-react";

type LoginRole = "patient" | "doctor" | "manager" | "expert";

const roles: Record<
  LoginRole,
  {
    label: string;
    title: string;
    description: string;
    email: string;
    route: string;
    icon: typeof UserRound;
    accent: string;
  }
> = {
  patient: {
    label: "Bệnh nhân",
    title: "Theo dõi sức khỏe cá nhân",
    description: "Đặt lịch khám, xem hồ sơ y tế và tiếp tục tư vấn triệu chứng với AI.",
    email: "patient@vitacare.vn",
    route: "/patient/dashboard",
    icon: UserRound,
    accent: "from-blue-500 to-indigo-500",
  },
  doctor: {
    label: "Bác sĩ",
    title: "Không gian khám bệnh",
    description: "Quản lý bệnh nhân, lịch khám, hội thoại và phản hồi chuyên môn.",
    email: "doctor@vitacare.vn",
    route: "/doctor",
    icon: Stethoscope,
    accent: "from-cyan-500 to-blue-500",
  },
  manager: {
    label: "Quản lý",
    title: "Điều phối phòng khám",
    description: "Quản lý bác sĩ, lịch, ca khám, dữ liệu AI và báo cáo vận hành.",
    email: "manager@vitacare.vn",
    route: "/manager",
    icon: Building2,
    accent: "from-violet-500 to-indigo-500",
  },
  expert: {
    label: "Chuyên gia",
    title: "Kiểm duyệt tri thức AI",
    description: "Theo dõi ca tư vấn, dữ liệu kiến thức và chất lượng phản hồi AI.",
    email: "expert@vitacare.vn",
    route: "/expert",
    icon: BrainCircuit,
    accent: "from-fuchsia-500 to-violet-500",
  },
};

export default function PatientLogin() {
  const [role, setRole] = useState<LoginRole>("patient");
  const current = roles[role];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_16%,rgba(121,177,255,0.36)_0,transparent_34%),radial-gradient(circle_at_86%_72%,rgba(107,87,255,0.25)_0,transparent_39%),linear-gradient(135deg,#dfeeff_0%,#eef4ff_42%,#dbe3ff_100%)] px-5 py-8 font-sans text-slate-700">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED] shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-[30px] font-extrabold leading-none tracking-tight text-[#2761f1]">VitaCare AI</h1>
              <p className="mt-2 text-sm font-bold text-slate-500">Hệ thống Y tế Thông minh</p>
            </div>
          </Link>
          <Link to="/" className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/60 px-5 py-3 text-sm font-extrabold text-slate-600 shadow-sm backdrop-blur hover:bg-white/80 sm:flex">
            <ArrowLeft className="h-4 w-4" />
            Trang đầu
          </Link>
        </header>

        <main className="mt-12 grid overflow-hidden rounded-[34px] border border-white/70 bg-white/70 shadow-[0_28px_90px_rgba(44,71,146,0.20)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative overflow-hidden bg-gradient-to-br from-[#eef5ff] via-[#e8efff] to-[#dfe4ff] p-7 sm:p-9">
            <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-blue-300/35 blur-2xl" />
            <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-violet-400/25 blur-2xl" />
            <div className="relative">
              <p className="inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-extrabold text-blue-600">Đăng nhập theo vai trò</p>
              <h2 className="mt-5 max-w-md text-4xl font-extrabold leading-tight text-slate-800">Một cổng truy cập cho toàn bộ hệ thống VitaCare AI.</h2>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
                Giao diện được đồng bộ với trang đầu: nhẹ, rõ vai trò và ưu tiên luồng tư vấn AI trước khi vào hệ thống.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {(Object.keys(roles) as LoginRole[]).map((item) => {
                  const RoleIcon = roles[item].icon;
                  const isActive = role === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRole(item)}
                      className={`rounded-[22px] border p-4 text-left transition ${
                        isActive ? "border-blue-300 bg-white/80 shadow-[0_14px_34px_rgba(37,99,235,0.16)]" : "border-white/70 bg-white/38 hover:bg-white/62"
                      }`}
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r ${roles[item].accent} text-white`}>
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 text-sm font-extrabold text-slate-800">{roles[item].label}</div>
                      <div className="mt-1 text-xs font-semibold leading-5 text-slate-500">{roles[item].title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="p-7 sm:p-9">
            <div className={`flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-r ${current.accent} text-white shadow-[0_16px_34px_rgba(37,99,235,0.22)]`}>
              <CurrentIcon className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-800">{current.label}</h2>
            <p className="mt-2 text-base leading-7 text-slate-500">{current.description}</p>

            <div className="mt-7 rounded-[26px] border border-slate-200 bg-white/82 p-5 shadow-sm">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">Email tài khoản</span>
                <input readOnly value={current.email} className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none" />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-700">Mật khẩu</span>
                <input readOnly value="123456" type="password" className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none" />
              </label>

              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 font-semibold text-slate-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" className="font-extrabold text-blue-600 hover:text-indigo-600">
                  Quên mật khẩu?
                </a>
              </div>

              <Link to={current.route} className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${current.accent} text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:translate-y-[-1px]`}>
                Đăng nhập
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/46 p-4 text-sm font-semibold text-slate-500">
              <span>Chưa có tài khoản bệnh nhân?</span>
              <Link to="/patient/register" className="font-extrabold text-blue-600 hover:text-indigo-600">
                Đăng ký ngay
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm font-bold text-slate-500">
              <ShieldCheck className="h-5 w-5 text-blue-500" />
              Tài khoản mẫu chỉ dùng cho prototype giao diện.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
