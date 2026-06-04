import { Link } from "react-router";
import {
  Activity,
  Bot,
  CalendarClock,
  CheckCircle2,
  Droplets,
  HeartPulse,
  Moon,
  Search,
  ShieldCheck,
  Stethoscope,
  Thermometer,
} from "lucide-react";

const healthMetrics = [
  { label: "Nhịp tim", value: "76", unit: "bpm", helper: "Bình thường", icon: HeartPulse, tone: "text-rose-500 bg-rose-50" },
  { label: "Nhiệt độ", value: "36.8", unit: "°C", helper: "Ổn định", icon: Thermometer, tone: "text-orange-500 bg-orange-50" },
  { label: "Nước uống", value: "1.8", unit: "L", helper: "Đạt 72% mục tiêu", icon: Droplets, tone: "text-sky-500 bg-sky-50" },
  { label: "Giấc ngủ", value: "7.2", unit: "giờ", helper: "Tốt", icon: Moon, tone: "text-indigo-500 bg-indigo-50" },
];

const carePlan = [
  "Cập nhật triệu chứng nếu có sốt, đau ngực hoặc khó thở.",
  "Uống đủ nước và theo dõi nhiệt độ trong ngày.",
  "Duy trì lịch khám sắp tới với bác sĩ nội tổng quát.",
];

const recentActivities = [
  { title: "Tư vấn sức khỏe AI", description: "Đã ghi nhận đau họng, mệt mỏi nhẹ và khuyến nghị theo dõi thêm.", time: "Hôm nay, 14:56", icon: Bot },
  { title: "Đặt lịch khám", description: "Bác sĩ Nguyễn Văn B · Nội tổng quát · Chờ xác nhận.", time: "Ngày mai, 09:00", icon: CalendarClock },
  { title: "Hồ sơ sức khỏe", description: "Cập nhật chỉ số theo dõi sức khỏe định kỳ.", time: "2 ngày trước", icon: ShieldCheck },
];

const diseaseInsights = [
  { name: "Viêm họng", level: "Trung bình", description: "Đau rát họng, ho khan, khó nuốt.", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "Cúm mùa", level: "Thấp", description: "Sốt nhẹ, ho, mệt mỏi toàn thân.", color: "bg-slate-50 text-slate-600 border-slate-200" },
  { name: "Sốt xuất huyết", level: "Cần chú ý", description: "Sốt cao đột ngột, đau đầu, phát ban.", color: "bg-rose-50 text-rose-700 border-rose-200" },
];

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#e8f4ff] via-[#eff8ff] to-[#e8fff7] p-7 shadow-[0_18px_50px_rgba(47,128,237,0.10)]">
          <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-blue-300/25 blur-2xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#2F80ED]">Tổng quan sức khỏe</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#10233F] md:text-4xl">Chào Nguyễn Văn A</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#64748B]">
              Hôm nay hệ thống ghi nhận sức khỏe ổn định. Nếu có triệu chứng mới, hãy mô tả nhanh để AI hỗ trợ đánh giá ban đầu trước khi đặt lịch khám.
            </p>
            <div className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <input className="h-12 min-w-0 flex-1 rounded-full border border-white bg-white/85 px-5 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Nhập triệu chứng nhanh..." />
              <Link to="/patient/consultation" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(47,128,237,0.24)] hover:bg-[#1C64D1]">
                <Search className="h-4 w-4" />
                Hỏi AI ngay
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#64748B]">Điểm theo dõi</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-[#10233F]">82</span>
                <span className="pb-1 text-lg font-bold text-[#64748B]">/100</span>
              </div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
              <HeartPulse className="h-7 w-7" />
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#EEF2F7]">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#2F80ED] to-[#2FD6A2]" />
          </div>
          <p className="mt-4 text-sm leading-6 text-[#64748B]">Ổn định. Nên cập nhật triệu chứng nếu có thay đổi trong 24 giờ tới.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.label} className="rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#64748B]">{metric.label}</p>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-[#10233F]">{metric.value}</span>
                    <span className="pb-1 text-sm font-bold text-[#64748B]">{metric.unit}</span>
                  </div>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${metric.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#64748B]">{metric.helper}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <h2 className="text-xl font-extrabold text-[#10233F]">Hoạt động gần đây</h2>
              <Link to="/patient/medical-records" className="text-sm font-extrabold text-[#1C64D1] hover:text-[#2F80ED]">
                Xem hồ sơ
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex gap-4 rounded-[20px] border border-[#E2E8F0] bg-[#F8FBFF] p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-extrabold text-[#10233F]">{activity.title}</h3>
                        <span className="text-xs font-bold text-[#94A3B8]">{activity.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-[#64748B]">{activity.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#2F80ED]">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-[#10233F]">Lịch hẹn sắp tới</h2>
                <p className="text-sm font-semibold text-[#64748B]">Ngày mai · 09:00 - 10:00</p>
              </div>
            </div>
            <div className="mt-5 rounded-[22px] bg-[#EAF3FF] p-5">
              <h3 className="font-extrabold text-[#10233F]">Nguyễn Văn B</h3>
              <p className="mt-1 text-sm font-semibold text-[#64748B]">Nội tổng quát · 350.000 VND</p>
              <div className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-600">Chờ xác nhận</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h2 className="font-extrabold text-[#10233F]">Kế hoạch chăm sóc</h2>
            </div>
            <div className="mt-5 space-y-3">
              {carePlan.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-[#64748B]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2F80ED]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                <Activity className="h-5 w-5" />
              </div>
              <h2 className="font-extrabold text-[#10233F]">Thông tin cần chú ý</h2>
            </div>
            <div className="mt-5 space-y-3">
              {diseaseInsights.map((item) => (
                <div key={item.name} className="rounded-[18px] border border-[#E2E8F0] bg-[#F8FBFF] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-[#10233F]">{item.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#64748B]">{item.description}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-extrabold ${item.color}`}>{item.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/patient/doctors" className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#2F80ED] bg-white text-sm font-extrabold text-[#1C64D1] hover:bg-[#EAF3FF]">
            <Stethoscope className="h-4 w-4" />
            Tìm bác sĩ phù hợp
          </Link>
        </aside>
      </section>
    </div>
  );
}
