import { useState, useEffect, useRef } from "react";
import { createBrowserRouter, Link } from "react-router";
import { Bot, Send, ShieldCheck, ChevronDown } from "lucide-react";
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
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{
    from: "ai" | "user";
    text: string;
    clinics?: Array<{ id: string; name: string; specialty: string; rating: string; image: string }>;
    showLoginBtn?: boolean;
  }>>([
    { from: "ai", text: "Xin chào! Tôi là trợ lý sức khỏe AI của VitaCare. Bạn đang gặp vấn đề gì? Hãy mô tả triệu chứng hoặc chọn bên dưới nhé." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const scrollToChat = () => {
    setShowChat(true);
    setTimeout(() => {
      chatSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

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
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatMessages]);

  const mockClinics = [
    { id: "c1", name: "Phòng khám Đa khoa Quốc tế VitaCare", specialty: "Đa khoa, Nội nhi", rating: "4.9 ⭐ (120 đánh giá)", image: "🏥" },
    { id: "c2", name: "Phòng khám Chuyên khoa Tim mạch Hà Nội", specialty: "Tim mạch, Nội tiết", rating: "4.8 ⭐ (85 đánh giá)", image: "❤️" },
    { id: "c3", name: "Nha khoa Thẩm mỹ Công nghệ cao Paris", specialty: "Răng Hàm Mặt", rating: "4.7 ⭐ (96 đánh giá)", image: "🦷" },
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      const normalizedText = text.toLowerCase();
      if (normalizedText.includes("phòng khám") || normalizedText.includes("phong kham")) {
        setChatMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "Dưới đây là danh sách các phòng khám nổi bật liên kết với hệ thống của chúng tôi. Bạn có thể bấm đặt lịch trực tiếp:",
            clinics: mockClinics,
          },
        ]);
      } else {
        const reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setChatMessages((prev) => [...prev, { from: "ai", text: reply }]);
      }
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleBookClinic = (clinicName: string) => {
    setChatMessages((prev) => [...prev, { from: "user", text: `Tôi muốn đặt lịch khám tại ${clinicName}` }]);
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "Để đặt lịch khám trực tuyến tại phòng khám này, quý khách vui lòng đăng nhập vào tài khoản bệnh nhân của VitaCare.",
          showLoginBtn: true,
        },
      ]);
      setIsTyping(false);
    }, 800);
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
      <main className="relative flex flex-1 flex-col overflow-y-auto bg-[radial-gradient(circle_at_8%_12%,rgba(121,177,255,0.36)_0,transparent_34%),radial-gradient(circle_at_84%_58%,rgba(107,87,255,0.24)_0,transparent_39%),linear-gradient(135deg,#dfeeff_0%,#eef4ff_40%,#dbe3ff_100%)]">
        <section className="mx-auto flex w-full max-w-[940px] flex-col px-5 pb-12 pt-16 sm:px-8">
          
          {/* Brand Logo Floating */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2.5 rounded-full border border-white/60 bg-white/40 px-5 py-2 backdrop-blur shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#27C3A2] text-white">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-slate-800">{BRAND_NAME}</span>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Hero Content Area */}
          <div className="mb-12 text-center">
            {/* Main Headline */}
            <h1 className="text-4xl font-black tracking-tight text-slate-850 md:text-[52px] leading-[1.15]">
              Trợ lý sức khỏe AI
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                tư vấn chính xác trong 10 giây
              </span>
            </h1>
            
            {/* Description */}
            <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-relaxed text-slate-600 font-medium">
              Giải pháp tầm soát triệu chứng ban đầu ứng dụng trí tuệ nhân tạo thế hệ mới. Tuyệt đối bảo mật, kết nối bác sĩ chuyên khoa ngay lập tức.
            </p>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-4 py-1.5 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
                <span className="text-sm">🛡️</span> Đạt chuẩn ISO 27001
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/70 px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
                <span className="text-sm">🏥</span> Bộ Y Tế chứng nhận cấp phép
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur">
                <span className="text-sm">🔒</span> Mã hóa E2E & Bảo mật SSL
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/70 px-4 py-1.5 text-xs font-bold text-purple-700 shadow-sm backdrop-blur">
                <span className="text-sm">📋</span> Tiêu chuẩn bảo mật HIPAA
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToChat}
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#27C3A2] px-8 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)] transition-all hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(37,99,235,0.32)] active:scale-95 cursor-pointer animate-pulse-subtle"
              >
                Tư vấn ngay
                <ChevronDown className="h-5 w-5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
              </button>
              
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-8 text-base font-extrabold text-slate-800 shadow-sm hover:bg-white hover:text-blue-600 transition-all hover:border-blue-200 cursor-pointer"
              >
                Đăng nhập / Đăng ký
              </button>
            </div>
          </div>

          {/* Interactive AI Chat - the hero element */}
          {showChat && (
            <div
              ref={chatSectionRef}
              className="relative mb-8 flex flex-col h-[calc(100vh-48px)] md:h-[calc(100vh-64px)] rounded-[30px] border border-white/60 bg-white/70 shadow-[0_24px_70px_rgba(63,78,111,0.18)] backdrop-blur-xl scroll-mt-6 animate-in fade-in slide-in-from-bottom-12 duration-500 overflow-hidden"
            >
              {/* Chat header - Glassmorphic overlay */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 border-b border-white/30 bg-white/35 backdrop-blur-xl px-6 py-4 shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#27C3A2] text-white shadow-md shadow-blue-500/10">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-base">VitaCare AI Assistant</p>
                  <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Hệ thống đang hoạt động
                  </p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2 rounded-xl bg-white/40 px-3 py-1.5 border border-white/40 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <span className="text-[11px] font-bold text-slate-600">Được mã hóa bảo mật</span>
                </div>
              </div>

              {/* Chat messages - Scrolls behind header/input */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overscroll-contain pt-[84px] pb-[88px] px-6 py-6 space-y-4 min-h-0 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-[22px] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.from === "user"
                        ? "rounded-br-none bg-gradient-to-r from-[#2563eb] to-[#27C3A2] text-white font-semibold"
                        : "rounded-bl-none bg-white/80 border border-white/50 text-slate-700 font-medium backdrop-blur-sm"
                    }`}>
                      <p>{msg.text}</p>

                      {/* Structured Clinics Demo */}
                      {msg.clinics && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-full">
                          {msg.clinics.map((clinic) => (
                            <div key={clinic.id} className="flex flex-col justify-between rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4 shadow-sm backdrop-blur-sm">
                              <div>
                                <div className="text-2xl mb-2">{clinic.image}</div>
                                <h4 className="font-extrabold text-slate-800 text-xs line-clamp-2">{clinic.name}</h4>
                                <p className="text-[10px] text-slate-500 font-bold mt-1">{clinic.specialty}</p>
                                <p className="text-[10px] text-slate-400 mt-1 font-semibold">{clinic.rating}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleBookClinic(clinic.name)}
                                className="mt-3 flex h-8 w-full items-center justify-center rounded-xl bg-blue-600 text-[10px] font-extrabold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-colors cursor-pointer"
                              >
                                Đặt lịch ngay
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Login CTA button inside chat bubble */}
                      {msg.showLoginBtn && (
                        <button
                          type="button"
                          onClick={() => setShowLogin(true)}
                          className="mt-3 flex h-9 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-xs font-extrabold text-white shadow-md hover:scale-[1.01] hover:shadow-lg transition cursor-pointer"
                        >
                          Đăng nhập ngay
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="rounded-[22px] rounded-bl-none bg-white/85 border border-white/50 px-5 py-3.5 backdrop-blur-sm">
                      <div className="flex gap-1.5 items-center h-4">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: "0ms" }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "160ms" }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" style={{ animationDelay: "320ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                {chatMessages.length === 1 && !isTyping && (
                  <div className="flex flex-wrap gap-2 pl-12 pt-1 animate-in fade-in duration-300">
                    {quickReplies.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 transition duration-300 shadow-sm cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input - Glassmorphic overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-3 bg-white/35 backdrop-blur-xl border-t border-white/30 px-6 py-4 shrink-0">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(chatInput); }}
                  placeholder="Mô tả triệu chứng hoặc câu hỏi của bạn tại đây..."
                  className="h-12 flex-1 rounded-full border border-white/85 bg-white/60 px-5 text-sm font-semibold outline-none placeholder:text-slate-400 backdrop-blur-lg focus:bg-white/90 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 text-slate-800 transition-all duration-300 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(chatInput)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#27C3A2] text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition hover:scale-105 hover:rotate-6 active:scale-95 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

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
