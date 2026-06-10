import { Link } from "react-router";
import { useState } from "react";
import {
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
import { getLatestTemporaryPatientAppointment, getUpcomingPatientAppointment } from "../../lib/patient-appointments";

const healthMetrics = [
  {
    label: "Nhịp tim",
    value: "76",
    unit: "bpm",
    change: "3%",
    changePrefix: "▲",
    helper: "so với hôm qua",
    icon: HeartPulse,
    tone: "text-rose-500 bg-rose-50",
    changeTone: "text-emerald-500",
    sparkline: "M2 30 L10 30 L16 26 L24 31 L32 21 L40 27 L48 23 L56 28 L64 18 L72 24",
  },
  {
    label: "Nhiệt độ",
    value: "36.8",
    unit: "°C",
    change: "",
    changePrefix: "−",
    helper: "Ổn định",
    icon: Thermometer,
    tone: "text-orange-500 bg-orange-50",
    changeTone: "text-[#64748B]",
    sparkline: "M2 29 L10 29 L18 20 L26 30 L34 18 L42 24 L50 22 L58 30 L66 21 L72 27",
  },
  {
    label: "Nước uống",
    value: "1.8",
    unit: "L",
    change: "200ml",
    changePrefix: "▲",
    helper: "so với hôm qua",
    icon: Droplets,
    tone: "text-sky-500 bg-sky-50",
    changeTone: "text-emerald-500",
    sparkline: "M2 29 L10 25 L18 30 L26 20 L34 28 L42 16 L50 25 L58 17 L66 24 L72 19",
  },
  {
    label: "Giấc ngủ",
    value: "7.2",
    unit: "giờ",
    change: "0.5 giờ",
    changePrefix: "▼",
    helper: "so với hôm qua",
    icon: Moon,
    tone: "text-indigo-500 bg-indigo-50",
    changeTone: "text-rose-500",
    sparkline: "M2 31 L10 27 L18 29 L26 18 L34 24 L42 17 L50 22 L58 15 L66 21 L72 20",
  },
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

export default function PatientDashboard() {
  const [symptomQuery, setSymptomQuery] = useState("");
  const upcomingAppointment = getUpcomingPatientAppointment();
  const latestTemporaryAppointment = getLatestTemporaryPatientAppointment();
  const latestAppointmentActivity = latestTemporaryAppointment
    ? {
        title: "Đặt lịch khám",
        description: `${latestTemporaryAppointment.doctor} · ${latestTemporaryAppointment.specialty} · ${latestTemporaryAppointment.status}.`,
        time: "Vừa xong",
        icon: CalendarClock,
      }
    : null;
  const appointmentActivity = upcomingAppointment
    ? {
        title: "Đặt lịch khám",
        description: `${upcomingAppointment.doctor} · ${upcomingAppointment.specialty} · ${upcomingAppointment.status}.`,
        time: `${upcomingAppointment.date}, ${upcomingAppointment.time}`,
        icon: CalendarClock,
      }
    : recentActivities[1];
  const dashboardActivities = latestAppointmentActivity
    ? [latestAppointmentActivity, recentActivities[0], recentActivities[2]]
    : [recentActivities[0], appointmentActivity, recentActivities[2]];
  const consultationPath = symptomQuery.trim()
    ? `/patient/consultation?symptom=${encodeURIComponent(symptomQuery.trim())}`
    : "/patient/consultation";

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#e8f4ff] via-[#eff8ff] to-[#e8fff7] p-6 shadow-[0_18px_50px_rgba(47,128,237,0.10)]">
          <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-blue-300/25 blur-2xl" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#2F80ED]">Tổng quan sức khỏe</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10233F]">Chào Nguyễn Văn A</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Hôm nay hệ thống ghi nhận sức khỏe ổn định. Nếu có triệu chứng mới, hãy mô tả nhanh để AI hỗ trợ đánh giá ban đầu trước khi đặt lịch khám.
            </p>
            <div className="mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <input
                value={symptomQuery}
                onChange={(event) => setSymptomQuery(event.target.value)}
                className="h-11 min-w-0 flex-1 rounded-full border border-white bg-white/85 px-5 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]"
                placeholder="Nhập triệu chứng nhanh..."
              />
              <Link to={consultationPath} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(47,128,237,0.24)] hover:bg-[#1C64D1]">
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

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {healthMetrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div key={metric.label} className="relative min-h-[138px] overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold text-[#64748B]">{metric.label}</p>
                      <div className="mt-3 flex items-end gap-1">
                        <span className="text-3xl font-extrabold leading-none text-[#10233F]">{metric.value}</span>
                        <span className="pb-1 text-sm font-bold text-[#64748B]">{metric.unit}</span>
                      </div>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${metric.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-end justify-start gap-2">
                    <p className="min-w-0 text-[11px] font-bold text-[#64748B]">
                      <span className={metric.changeTone}>{metric.changePrefix} {metric.change}</span>
                      {metric.change ? " " : ""}
                      {metric.helper}
                    </p>
                    <svg className={`h-9 w-[64px] shrink-0 ${metric.tone.split(" ")[0]}`} viewBox="0 0 74 36" aria-hidden="true">
                      <path d={metric.sparkline} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </section>

          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <h2 className="text-xl font-extrabold text-[#10233F]">Hoạt động gần đây</h2>
              <Link to="/patient/medical-records" className="text-sm font-extrabold text-[#1C64D1] hover:text-[#2F80ED]">
                Xem hồ sơ
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {dashboardActivities.map((activity) => {
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
                <p className="text-sm font-semibold text-[#64748B]">
                  {upcomingAppointment ? `${upcomingAppointment.date} · ${upcomingAppointment.time}` : "Chưa có lịch sắp tới"}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-[22px] bg-[#EAF3FF] p-5">
              <h3 className="font-extrabold text-[#10233F]">{upcomingAppointment?.doctor ?? "Chưa có lịch khám"}</h3>
              <p className="mt-1 text-sm font-semibold text-[#64748B]">
                {upcomingAppointment
                  ? `${upcomingAppointment.specialty} · ${upcomingAppointment.price ?? upcomingAppointment.clinic}`
                  : "Đặt lịch mới để theo dõi tại đây"}
              </p>
              {upcomingAppointment && (
                <div className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-600">
                  {upcomingAppointment.status}
                </div>
              )}
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

          <Link to="/patient/doctors" className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#2F80ED] text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(47,128,237,0.24)] hover:bg-[#1C64D1]">
            <Stethoscope className="h-4 w-4" />
            Chọn bác sĩ tư vấn
          </Link>

        </aside>
      </section>
    </div>
  );
}
