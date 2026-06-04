import { useState } from "react";
import { createBrowserRouter, Link } from "react-router";
import { Bot, Send, ShieldCheck } from "lucide-react";
import { LoginModal } from "./components/auth/login-modal";
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

const quickPrompts = ["Tôi bị đau đầu kéo dài", "Tư vấn triệu chứng sốt", "Ho và đau họng", "Đau dạ dày, ợ chua"];

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#dfe9ff] font-sans text-slate-700">
      <header className="relative z-20 border-t-4 border-slate-900 border-b border-slate-200/80 bg-white/78 shadow-[0_2px_14px_rgba(42,64,104,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex h-[100px] max-w-[1480px] items-center justify-between px-8 sm:px-10">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED] shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-[30px] font-extrabold leading-none tracking-tight text-[#2761f1]">{BRAND_NAME}</h1>
              <p className="mt-2 text-sm font-bold text-slate-500">Hệ thống Y tế Thông minh</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="rounded-[16px] bg-gradient-to-r from-[#2563eb] to-[#4f35f5] px-8 py-4 text-lg font-extrabold text-white shadow-[0_16px_34px_rgba(61,79,226,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_38px_rgba(61,79,226,0.30)]"
          >
            Đăng nhập / Đăng ký
          </button>
        </div>
      </header>

      <main className="relative min-h-[calc(100vh-104px)] bg-[radial-gradient(circle_at_8%_12%,rgba(121,177,255,0.36)_0,transparent_34%),radial-gradient(circle_at_84%_58%,rgba(107,87,255,0.24)_0,transparent_39%),linear-gradient(135deg,#dfeeff_0%,#eef4ff_40%,#dbe3ff_100%)]">
        <section className="mx-auto flex max-w-[1180px] flex-col px-5 pb-8 pt-16 sm:px-8 lg:pt-[66px]">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-700 md:text-[40px]">Chào mừng đến với {BRAND_NAME}</h2>
            <p className="mx-auto mt-5 max-w-[720px] text-xl leading-8 text-slate-500">
              Hệ thống tư vấn sức khỏe ứng dụng AI giúp chẩn đoán sơ bộ dựa trên triệu chứng. Hãy bắt đầu bằng cách mô tả tình trạng của bạn.
            </p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-[840px] gap-4 md:grid-cols-2">
            {quickPrompts.map((prompt) => (
              <Link
                key={prompt}
                to={`/guest/chat?prompt=${encodeURIComponent(prompt)}`}
                className="group flex h-[68px] items-center rounded-[18px] border border-white/60 bg-white/42 px-7 text-left text-base font-extrabold text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/66 hover:text-slate-700"
              >
                <span className="mr-4 text-xl font-bold text-[#4a87ff] transition group-hover:translate-x-0.5">→</span>
                {prompt}
              </Link>
            ))}
          </div>

          <section className="mx-auto mt-[56px] w-full max-w-[1080px]">
            <div className="flex items-start gap-5">
              <div className="mt-[2px] flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#dce9ff] text-[#2467ff] shadow-[0_8px_18px_rgba(79,112,177,0.18)]">
                <Bot className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="max-w-[746px] rounded-[18px] border border-slate-200/70 bg-white/72 px-6 py-5 text-xl leading-8 text-slate-700 shadow-[0_14px_28px_rgba(63,78,111,0.13)] backdrop-blur">
                  Xin chào! Tôi là trợ lý ảo y tế của {BRAND_NAME}. Bạn có thể mô tả triệu chứng của mình để tôi hỗ trợ tư vấn sơ bộ, hoặc đăng nhập để đặt lịch khám với các bác sĩ chuyên khoa.
                </div>
                <div className="mt-2 flex items-center gap-1.5 pl-1 text-sm font-semibold text-slate-400">
                  <span className="inline-block h-3 w-3 rounded-full border border-slate-400" />
                  14:56
                </div>
              </div>
            </div>

            <div className="mt-[62px] flex items-center gap-3 rounded-[18px] border border-white/75 bg-white/54 p-2 shadow-[0_18px_42px_rgba(70,87,129,0.16)] backdrop-blur">
              <input
                aria-label="Mô tả triệu chứng"
                placeholder="Mô tả triệu chứng hoặc câu hỏi của bạn..."
                className="h-12 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-700 outline-none placeholder:text-slate-500"
              />
              <Link
                to="/guest/chat"
                aria-label="Gửi câu hỏi"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#7da0ff] text-white shadow-[0_10px_22px_rgba(71,111,231,0.26)] hover:bg-[#5d83f0]"
              >
                <Send className="h-6 w-6" />
              </Link>
            </div>
          </section>
        </section>
      </main>

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
      { path: "appointments", element: <DoctorExamination /> },
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
