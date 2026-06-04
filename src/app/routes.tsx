import { useState, useEffect, useRef } from "react";
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

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "ai", text: "Xin chào! Tôi là trợ lý sức khỏe AI của VitaCare. Bạn đang gặp vấn đề gì? Hãy mô tả triệu chứng hoặc chọn bên dưới nhé." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Tôi bị đau đầu kéo dài",
    "Tôi bị sốt và đau họng",
    "Con tôi ho nhiều ngày",
    "Tôi bị đau bụng âm ỉ",
  ];

  const aiResponses = [
    "Cảm ơn bạn đã chia sẻ. Để tư vấn chính xác, bạn cho biết thêm: triệu chứng bắt đầu từ khi nào, mức độ nặng nhẹ ra sao, và có dùng thuốc gì đang điều trị không?",
    "Tôi hiểu rồi. Bạn có thể cho tôi biết thêm về thời gian xuất hiện và các triệu chứng kèm theo để tôi đánh giá mức độ ưu tiên chính xác hơn?",
    "Dựa trên thông tin bạn cung cấp, tôi ghi nhận triệu chứng. Bạn nên theo dõi tại nhà, nghỉ ngơi đầy đủ. Nếu kéo dài trên 3 ngày, hãy đặt lịch khám bác sĩ nhé.",
    "Tôi đã phân tích. Với triệu chứng này, bạn nên ưu tiên đặt lịch khám trong 24-48 giờ. Hệ thống sẽ kết nối bạn với bác sĩ chuyên khoa phù hợp.",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatMessages((prev) => [...prev, { from: "ai", text: reply }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const certifications = [
    { name: "ISO 27001" },
    { name: "Bảo mật SSL" },
    { name: "Mã hóa E2E" },
  ];

  const testimonials = [
    { name: "Nguyễn Thị Lan", role: "Bệnh nhân", avatar: "NT", rating: 5, text: "Tư vấn nhanh, bác sĩ rất tận tâm. Tôi đặt lịch khám chỉ trong 2 phút." },
    { name: "Trần Văn Hùng", role: "Bệnh nhân", avatar: "TV", rating: 5, text: "AI phân tích triệu chứng rất chính xác, giúp tôi biết nên khám chuyên khoa nào." },
    { name: "Lê Minh Châu", role: "Bệnh nhân", avatar: "LM", rating: 5, text: "Tiết kiệm thời gian, không cần xếp hàng. Khám và nhận tư vấn ngay tại nhà." },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#dfe9ff] font-sans text-slate-700">
      <header className="relative z-20 shrink-0 border-t-4 border-slate-900 border-b border-slate-200/80 bg-white/78 shadow-[0_2px_14px_rgba(42,64,104,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-6 sm:px-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED] shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-[26px] font-extrabold leading-none tracking-tight text-[#2761f1]">{BRAND_NAME}</h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500 backdrop-blur">
                  ✓ {cert.name}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setShowLogin(true)} className="rounded-[14px] bg-gradient-to-r from-[#2563eb] to-[#4f35f5] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(61,79,226,0.22)] transition hover:translate-y-[-1px]">
              Đăng nhập / Đăng ký
            </button>
          </div>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col overflow-y-auto bg-[radial-gradient(circle_at_8%_12%,rgba(121,177,255,0.36)_0,transparent_34%),radial-gradient(circle_at_84%_58%,rgba(107,87,255,0.24)_0,transparent_39%),linear-gradient(135deg,#dfeeff_0%,#eef4ff_40%,#dbe3ff_100%)]">
        <section className="mx-auto flex w-full max-w-[900px] flex-col px-5 pb-10 pt-10 sm:px-8">

          {/* Big headline */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-700 md:text-[36px]">
              Trợ lý sức khỏe AI — tư vấn ngay trong 30 giây
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-base text-slate-500">
              Mô tả triệu chứng của bạn, AI sẽ phân tích và đưa ra khuyến nghị phù hợp. Nếu cần, kết nối bác sĩ chuyên khoa ngay.
            </p>
          </div>

          {/* Interactive AI Chat - the hero element */}
          <div className="mb-8 rounded-[24px] border border-white/60 bg-white/80 shadow-[0_24px_60px_rgba(63,78,111,0.14)] backdrop-blur">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-slate-200/60 px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#27C3A2] text-white shadow-md">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-extrabold text-slate-700">VitaCare AI</p>
                <p className="text-xs text-slate-400">Trợ lý sức khỏe · Trực tuyến</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-green-600">Sẵn sàng</span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="min-h-[280px] max-h-[320px] space-y-4 overflow-y-auto px-6 py-5">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-[18px] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.from === "user"
                      ? "rounded-br-md bg-gradient-to-r from-[#2563eb] to-[#27C3A2] text-white"
                      : "rounded-bl-md bg-slate-100 text-slate-700"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-[18px] rounded-bl-md bg-slate-100 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "160ms" }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "320ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 px-6 pb-4">
              {quickReplies.map((q) => (
                <button key={q} type="button" onClick={() => sendMessage(q)} className="rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 text-xs font-semibold text-slate-600 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-800 hover:shadow-md">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 border-t border-slate-200/60 px-6 py-4">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(chatInput); }}
                placeholder="Mô tả triệu chứng của bạn..."
                className="h-11 flex-1 rounded-full border border-slate-200/80 bg-slate-50/60 px-5 text-sm outline-none placeholder:text-slate-400 backdrop-blur focus:ring-2 focus:ring-[#2563eb]/30"
              />
              <Link
                to="/guest/chat"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#27C3A2] text-white shadow-md transition hover:shadow-lg hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Trust + CTA row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              { icon: "🛡️", text: "Dữ liệu được mã hóa & bảo mật" },
              { icon: "✅", text: "Không thay thế chẩn đoán bác sĩ" },
              { icon: "⚡", text: "Phản hồi trong 30 giây" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2 text-slate-500">
                <span>{t.icon}</span>
                <span className="font-medium">{t.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mx-auto mt-10 w-full max-w-[900px]">
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-[20px] border border-white/60 bg-white/50 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dce9ff] to-[#e8fff9] text-sm font-bold text-[#2563eb]">{t.avatar}</div>
                    <div>
                      <p className="font-bold text-slate-700">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>
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
    element: (
      <Layout role="patient" userName="Nguyễn Văn A" userRole="Bệnh nhân" />
    ),
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
    element: (
      <Layout
        role="manager"
        userName="Nguyễn Văn C"
        userRole="Quản lý phòng khám"
      />
    ),
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
    element: (
      <Layout
        role="expert"
        userName="Nguyễn Văn D"
        userRole="Chuyên gia y tế"
      />
    ),
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
