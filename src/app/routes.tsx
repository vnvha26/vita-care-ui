import { useState } from "react";
import { createBrowserRouter, Link } from "react-router";
import { ArrowRight, Bot, CalendarCheck, HeartPulse, ShieldCheck, Stethoscope, X } from "lucide-react";
import { Layout } from "./components/layout/layout";

import GuestChat from "./pages/guest/chat";
import DoctorChat from "./pages/doctor/chat";
import DoctorDashboard from "./pages/doctor/dashboard";
import DoctorExamination from "./pages/doctor/examination";
import DoctorFeedback from "./pages/doctor/feedback";
import PatientDetail from "./pages/doctor/patient-detail";
import DoctorPatients from "./pages/doctor/patients";
import DoctorProfile from "./pages/doctor/profile";
import ExpertCaseDetail from "./pages/expert/case-detail";
import ExpertCases from "./pages/expert/cases";
import ExpertChat from "./pages/expert/chat";
import ExpertConversations from "./pages/expert/conversations";
import ExpertDashboard from "./pages/expert/dashboard";
import ExpertKnowledge from "./pages/expert/knowledge";
import ExpertPatients from "./pages/expert/patients";
import ExpertProfile from "./pages/expert/profile";
import ExpertReports from "./pages/expert/reports";
import ManagerAIData from "./pages/manager/ai-data";
import ManagerChatbot from "./pages/manager/chatbot";
import ClinicDetail from "./pages/manager/clinic-detail";
import ClinicForm from "./pages/manager/clinic-form";
import DoctorDetail from "./pages/manager/doctor-detail";
import DoctorForm from "./pages/manager/doctor-form";
import ManagerDoctors from "./pages/manager/doctors";
import ManagerAppointments from "./pages/manager/manager-appointments";
import ManagerChat from "./pages/manager/manager-chat";
import ManagerSchedule from "./pages/manager/manager-schedule";
import ManagerReports from "./pages/manager/reports";
import PatientAppointments from "./pages/patient/appointments";
import PatientBook from "./pages/patient/book";
import PatientConsultation from "./pages/patient/consultation";
import PatientDashboard from "./pages/patient/dashboard";
import PatientDoctors from "./pages/patient/doctors";
import PatientHome from "./pages/patient/home";
import PatientLogin from "./pages/patient/login";
import PatientMedicalRecords from "./pages/patient/medical-records";
import PatientNotifications from "./pages/patient/notifications";
import PatientProfile from "./pages/patient/profile";
import PatientRegister from "./pages/patient/register";

const BRAND_NAME = "VitaCare AI";

type LoginRole = "patient" | "doctor" | "manager" | "expert";

const loginRoles: Record<LoginRole, { label: string; name: string; email: string; route: string }> = {
  patient: { label: "Bệnh nhân", name: "Nguyễn Văn A", email: "patient@vitacare.vn", route: "/patient/dashboard" },
  doctor: { label: "Bác sĩ", name: "Nguyễn Văn B", email: "doctor@vitacare.vn", route: "/doctor" },
  manager: { label: "Quản lý", name: "Nguyễn Văn C", email: "manager@vitacare.vn", route: "/manager" },
  expert: { label: "Chuyên gia", name: "Nguyễn Văn D", email: "expert@vitacare.vn", route: "/expert" },
};

function LoginModal({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<LoginRole>("patient");
  const current = loginRoles[role];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md">
      <div className="grid w-full max-w-[860px] overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-gradient-to-br from-[#2F80ED] to-[#27C3A2] p-8 text-white lg:block">
          <Bot className="h-12 w-12" />
          <h2 className="mt-10 text-3xl font-extrabold">{BRAND_NAME}</h2>
          <p className="mt-4 text-sm leading-7 text-white/85">
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
          <h2 className="pr-8 text-2xl font-extrabold text-[#1E293B]">Đăng nhập vào {BRAND_NAME}</h2>
          <p className="mt-2 text-sm text-[#64748B]">Vui lòng chọn vai trò để tiếp tục.</p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            {(Object.keys(loginRoles) as LoginRole[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  role === item ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"
                }`}
              >
                {loginRoles[item].label}
              </button>
            ))}
          </div>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-[#1E293B]">Email tài khoản</span>
            <input readOnly value={current.email} className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-bold text-[#1E293B]">Mật khẩu</span>
            <input readOnly value="123456" type="password" className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] px-4 text-sm" />
          </label>

          <Link to={current.route} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#2F80ED] text-sm font-extrabold text-white hover:bg-[#1C64D1]">
            Đăng nhập ngay
          </Link>

          <div className="mt-5 rounded-2xl border border-dashed border-[#CFE3FF] bg-[#F7FAFC] p-4">
            <p className="text-center text-sm font-bold text-[#64748B]">Tài khoản mẫu</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(loginRoles) as LoginRole[]).map((item) => (
                <Link key={item} to={loginRoles[item].route} className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-center text-sm font-bold text-[#1C64D1] hover:bg-[#EAF3FF]">
                  {loginRoles[item].name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans text-[#1E293B]">
      <header className="sticky top-4 z-40 mx-auto mt-4 flex h-16 w-[min(1180px,calc(100%_-_48px))] items-center justify-between rounded-full border border-[#E2E8F0] bg-white/85 px-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-lg font-extrabold">{BRAND_NAME}</span>
        </Link>
        <nav className="hidden">
          <a href="#intro">Giới thiệu</a>
          <a href="#services">Dịch vụ</a>
          <Link to="/guest/chat">Trải nghiệm AI</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowLogin(true)} className="rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-bold hover:bg-[#F2F7FB]">
            Đăng nhập
          </button>
          <Link to="/patient/register" className="hidden rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1C64D1] sm:inline-flex">
            Đăng ký
          </Link>
        </div>
      </header>

      <main id="intro" className="bg-[radial-gradient(circle_at_top_left,#EAF3FF_0,transparent_35%),radial-gradient(circle_at_top_right,#E8FFF9_0,transparent_32%)]">
        <section className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_480px] lg:py-28">
          <div>
            <span className="inline-flex rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-extrabold text-[#1C64D1]">Tư vấn y tế AI 24/7</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-tight lg:text-[56px]">
              Chăm sóc sức khỏe thông minh, kết nối AI và bác sĩ chuyên khoa
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#64748B]">
              {BRAND_NAME} hỗ trợ người dùng mô tả triệu chứng, nhận phân tích ban đầu từ AI, đặt lịch khám và theo dõi dữ liệu sức khỏe cá nhân trên cùng một nền tảng.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/guest/chat" className="inline-flex items-center gap-2 rounded-full bg-[#2F80ED] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#1C64D1]">
                Bắt đầu tư vấn miễn phí
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" onClick={() => setShowLogin(true)} className="rounded-full border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-extrabold hover:bg-[#F2F7FB]">
                Đặt lịch với bác sĩ
              </button>
            </div>
          </div>

          <section className="rounded-[28px] border border-[#CFE3FF] bg-white shadow-[0_24px_80px_rgba(47,128,237,0.14)]">
            <div className="rounded-t-[28px] bg-[#2F80ED] p-5 text-white">
              <p className="text-sm font-extrabold">AI Health Assistant</p>
              <p className="text-xs text-white/80">Online now</p>
            </div>
            <div className="space-y-4 p-5">
              <p className="max-w-[86%] rounded-[18px] rounded-bl-md bg-[#F2F7FB] p-4 text-sm leading-6">Xin chào, bạn đang gặp vấn đề sức khỏe gì?</p>
              <p className="ml-auto max-w-[82%] rounded-[18px] rounded-br-md bg-gradient-to-r from-[#2F80ED] to-[#27C3A2] p-4 text-sm leading-6 text-white">Tôi bị sốt và đau họng.</p>
              <p className="max-w-[88%] rounded-[18px] rounded-bl-md bg-[#F2F7FB] p-4 text-sm leading-6">Tôi đã ghi nhận triệu chứng. Bạn có ho hoặc mệt mỏi không?</p>
              <div className="rounded-2xl bg-[#E8FFF9] p-4 text-sm text-[#148E77]">
                <p className="font-extrabold">Mức độ ưu tiên: Trung bình</p>
                <p className="mt-1">Theo dõi thêm và đặt lịch nếu triệu chứng kéo dài.</p>
              </div>
            </div>
          </section>
        </section>
      </main>

      <section className="bg-[#1E293B] px-6 py-10 text-white">
        <div className="mx-auto grid max-w-5xl gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["15,000+", "Bệnh nhân tin dùng"],
            ["50+", "Bác sĩ chuyên khoa"],
            ["99.8%", "Phản hồi AI hữu ích"],
            ["24/7", "Tư vấn ban đầu"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-4xl font-extrabold text-[#CFE3FF]">{value}</div>
              <div className="mt-2 text-sm font-semibold text-white/75">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/guest/chat", element: <GuestChat /> },
  { path: "/patient/home", element: <PatientHome /> },
  { path: "/patient/login", element: <PatientLogin /> },
  { path: "/patient/register", element: <PatientRegister /> },
  {
    path: "/patient",
    element: <Layout role="patient" userName="Nguyễn Văn A" userRole="Bệnh nhân" />,
    children: [
      { index: true, element: <PatientDashboard /> },
      { path: "dashboard", element: <PatientDashboard /> },
      { path: "consultation", element: <PatientConsultation /> },
      { path: "doctors", element: <PatientDoctors /> },
      { path: "appointments", element: <PatientAppointments /> },
      { path: "book", element: <PatientBook /> },
      { path: "medical-records", element: <PatientMedicalRecords /> },
      { path: "notifications", element: <PatientNotifications /> },
      { path: "profile", element: <PatientProfile /> },
    ],
  },
  {
    path: "/doctor",
    element: <Layout role="doctor" userName="Nguyễn Văn B" userRole="Bác sĩ" />,
    children: [
      { index: true, element: <DoctorDashboard /> },
      { path: "patients", element: <DoctorPatients /> },
      { path: "patients/:id", element: <PatientDetail /> },
      { path: "examination", element: <DoctorExamination /> },
      { path: "chat", element: <DoctorChat /> },
      { path: "feedback", element: <DoctorFeedback /> },
      { path: "profile", element: <DoctorProfile /> },
    ],
  },
  {
    path: "/manager",
    element: <Layout role="manager" userName="Nguyễn Văn C" userRole="Quản lý phòng khám" />,
    children: [
      { index: true, element: <ManagerChatbot /> },
      { path: "clinic-profile", element: <ClinicDetail /> },
      { path: "clinic-registration", element: <ClinicForm /> },
      { path: "doctors", element: <ManagerDoctors /> },
      { path: "doctors/new", element: <DoctorForm /> },
      { path: "doctors/:id", element: <DoctorDetail /> },
      { path: "doctors/:id/edit", element: <DoctorForm /> },
      { path: "appointments", element: <ManagerAppointments /> },
      { path: "schedule", element: <ManagerSchedule /> },
      { path: "chat", element: <ManagerChat /> },
      { path: "ai-data", element: <ManagerAIData /> },
      { path: "reports", element: <ManagerReports /> },
    ],
  },
  {
    path: "/expert",
    element: <Layout role="expert" userName="Nguyễn Văn D" userRole="Chuyên gia y tế" />,
    children: [
      { index: true, element: <ExpertDashboard /> },
      { path: "cases", element: <ExpertCases /> },
      { path: "cases/:id", element: <ExpertCaseDetail /> },
      { path: "chat", element: <ExpertChat /> },
      { path: "conversations", element: <ExpertConversations /> },
      { path: "knowledge", element: <ExpertKnowledge /> },
      { path: "patients", element: <ExpertPatients /> },
      { path: "reports", element: <ExpertReports /> },
      { path: "profile", element: <ExpertProfile /> },
    ],
  },
]);
