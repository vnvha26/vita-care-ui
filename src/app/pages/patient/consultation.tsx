import { useMemo, useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Bot, Send, ShieldCheck, Sparkles, ChevronDown, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { getPatientConversations, type PatientConversation } from "../../lib/patient-conversations";

interface Clinic {
  id: string;
  name: string;
  specialty: string;
  rating: string;
  image: string;
  address: string;
  isPremium: boolean;
}

const mockClinics: Clinic[] = [
  {
    id: "c1",
    name: "Phòng khám Đa khoa Quốc tế VitaCare",
    specialty: "Đa khoa, Nội nhi",
    rating: "4.8 ⭐ (85 đánh giá)",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop&q=60",
    address: "12 Cầu Giấy, Cầu Giấy, Hà Nội",
    isPremium: false,
  },
  {
    id: "c2",
    name: "Nha khoa Thẩm mỹ Công nghệ cao Paris",
    specialty: "Răng Hàm Mặt",
    rating: "4.7 ⭐ (96 đánh giá)",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=60",
    address: "30 Triệu Việt Vương, Hai Bà Trưng, Hà Nội",
    isPremium: false,
  },
  {
    id: "c3",
    name: "Bệnh viện Đa khoa Quốc tế Vinmec",
    specialty: "Đa khoa chuyên sâu (VIP)",
    rating: "4.95 ⭐ (Premium)",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&auto=format&fit=crop&q=60",
    address: "Times City, Minh Khai, Hai Bà Trưng, Hà Nội",
    isPremium: true,
  },
  {
    id: "c4",
    name: "Phòng khám Chuyên khoa Da liễu VIP",
    specialty: "Da liễu, Thẩm mỹ công nghệ cao",
    rating: "4.92 ⭐ (Premium)",
    image: "https://images.unsplash.com/photo-1584515906247-4b4c407f368e?w=400&auto=format&fit=crop&q=60",
    address: "18 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
    isPremium: true,
  },
];

interface ChatMessage {
  from: "ai" | "user";
  text: string;
  clinics?: Clinic[];
  showUpgradeBtn?: boolean;
  showChatLink?: boolean;
}

export default function PatientConsultation() {
  const [searchParams] = useSearchParams();
  const initialSymptom = searchParams.get("symptom")?.trim() ?? "";
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const welcomeMessage: ChatMessage = {
      from: "ai",
      text: "Xin chào Nguyễn Văn A! Tôi là trợ lý sức khỏe AI của VitaCare. Tôi có thể hỗ trợ giải đáp các thắc mắc về sức khỏe của bạn hoặc gợi ý danh sách phòng khám liên kết phù hợp. Bạn đang gặp triệu chứng gì hay cần tìm thông tin gì hôm nay?",
    };

    if (!initialSymptom) return [welcomeMessage];

    return [
      welcomeMessage,
      { from: "user", text: initialSymptom },
      {
        from: "ai",
        text: "Tôi đã nhận triệu chứng bạn nhập từ dashboard. Bạn vui lòng cho biết triệu chứng bắt đầu từ khi nào, mức độ nặng nhẹ ra sao, và có kèm sốt cao, khó thở hoặc đau ngực không?",
      },
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatbotHistory = useMemo(
    () => getPatientConversations().filter((item) => item.role === "bot" && item.status !== "archived"),
    []
  );

  const quickReplies = [
    "Tôi cần tìm phòng khám",
    "Tôi bị đau đầu và sốt",
    "Tư vấn đau bụng âm ỉ",
    "Chế độ ăn cho người dạ dày",
  ];

  const aiResponses = [
    "Tôi ghi nhận thông tin. Để hỗ trợ tốt nhất, bạn vui lòng mô tả kỹ hơn: triệu chứng kéo dài bao lâu, có kèm sốt cao, khó thở hay triệu chứng nào khác không?",
    "Thông tin hữu ích. Triệu chứng này có thể là biểu hiện ban đầu của viêm họng hoặc mệt mỏi thông thường. Bạn nên uống nhiều nước ấm, nghỉ ngơi và theo dõi thêm.",
    "Dựa trên các triệu chứng bạn mô tả, bạn nên đặt lịch thăm khám trực tiếp để được chẩn đoán chính xác nhất. Tôi có thể gợi ý một số phòng khám uy tín gần bạn, bạn có muốn xem không?",
  ];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: text.trim() }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const normalizedText = text.toLowerCase();
      if (
        normalizedText.includes("phòng khám") ||
        normalizedText.includes("phong kham") ||
        normalizedText.includes("tìm phòng") ||
        normalizedText.includes("tim phong")
      ) {
        setChatMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: "Dưới đây là danh sách các phòng khám nổi bật liên kết với hệ thống của chúng tôi. Bạn có thể nhấn đặt lịch khám trực tiếp ở bên dưới:",
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

  const handleBookClinic = (clinic: Clinic) => {
    setChatMessages((prev) => [
      ...prev,
      { from: "user", text: `Tôi muốn đăng ký đặt lịch khám tại ${clinic.name}` },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      if (clinic.isPremium) {
        setChatMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: `Để đặt lịch khám tại phòng khám cao cấp ${clinic.name}, tài khoản của bạn cần được nâng cấp lên hạng thành viên Premium/Vàng. Vui lòng bấm nâng cấp tài khoản dưới đây để mở khóa dịch vụ VIP này.`,
            showUpgradeBtn: true,
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            from: "ai",
            text: `Yêu cầu đặt lịch khám tại ${clinic.name} đã được ghi nhận vào hệ thống. Bạn có thể nhắn tin trực tiếp với bộ phận chăm sóc khách hàng của phòng khám này ở trang Tin nhắn để chọn giờ khám và hoàn tất thủ tục khám bệnh.`,
            showChatLink: true,
          },
        ]);
      }
      setIsTyping(false);
    }, 800);
  };

  const handleUpgradeAccount = () => {
    toast.success("Yêu cầu nâng cấp tài khoản Premium đã được gửi đi thành công! Đội ngũ CSKH của VitaCare sẽ liên hệ hỗ trợ bạn trong ít phút.");
    setChatMessages((prev) => [
      ...prev,
      {
        from: "ai",
        text: "Hệ thống đã ghi nhận yêu cầu nâng cấp tài khoản Premium của bạn. Nhân viên tư vấn đang xử lý hồ sơ và sẽ gọi điện hỗ trợ bạn sớm nhất.",
      },
    ]);
  };

  const openChatbotHistory = (history: PatientConversation) => {
    setSelectedHistoryId(history.id);
    setChatMessages(
      history.messages.map((message) => ({
        from: message.sender === "patient" ? "user" : "ai",
        text: message.text,
      }))
    );
  };

  return (
    <div className="mx-auto grid w-full max-w-[1280px] gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="h-[calc(100vh-140px)] min-h-[500px]">
      <div className="relative flex flex-col h-full w-full rounded-[30px] border border-white/60 bg-white/70 shadow-[0_24px_70px_rgba(63,78,111,0.18)] backdrop-blur-xl overflow-hidden">
        
        {/* Chat header - Glassmorphic overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 border-b border-white/30 bg-white/35 backdrop-blur-xl px-6 py-4 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#27C3A2] text-white shadow-md shadow-blue-500/10">
            <Bot className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <p className="font-black text-slate-800 text-base">Trợ lý AI</p>
            <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              AI tư vấn trực tuyến 24/7
            </p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 rounded-xl bg-white/40 px-3 py-1.5 border border-white/40 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span className="text-[11px] font-bold text-slate-600">Bảo mật thông tin mã hóa</span>
          </div>
        </div>

        {/* Chat messages - Scrolls behind header/input */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain pt-[84px] pb-[88px] px-6 py-6 space-y-4 min-h-0 custom-scrollbar"
        >
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-[22px] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.from === "user"
                  ? "rounded-br-none bg-gradient-to-r from-[#2563eb] to-[#27C3A2] text-white font-semibold"
                  : "rounded-bl-none bg-white/80 border border-white/50 text-slate-700 font-medium backdrop-blur-sm"
              }`}>
                <p>{msg.text}</p>

                {/* Structured Clinics Cards */}
                {msg.clinics && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-2 max-w-full">
                    {msg.clinics.map((clinic) => (
                      <div
                        key={clinic.id}
                        className="flex flex-col justify-between rounded-2xl border border-slate-200/50 bg-white/60 p-4 shadow-sm backdrop-blur-sm relative overflow-hidden"
                      >
                        {/* Premium Tag */}
                        {clinic.isPremium && (
                          <div className="absolute top-2 right-2 z-10 rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5" /> VIP
                          </div>
                        )}

                        <div className="flex gap-3 items-start">
                          {/* Clinic Image */}
                          <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                            <img
                              src={clinic.image}
                              alt={clinic.name}
                              className={`h-full w-full object-cover transition-all duration-300 ${
                                clinic.isPremium ? "blur-md select-none pointer-events-none scale-105" : ""
                              }`}
                            />
                            {clinic.isPremium && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white font-black text-xs select-none">
                                VIP
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 text-xs truncate">{clinic.name}</h4>
                            <p className="text-[10px] text-slate-500 font-bold mt-0.5">{clinic.specialty}</p>
                            
                            {/* Blurred Address for VIP clinics */}
                            <p className={`text-[10px] text-slate-400 mt-1 font-medium leading-4 flex items-center gap-1 ${
                              clinic.isPremium ? "blur-[3.5px] select-none pointer-events-none" : ""
                            }`}>
                              📍 {clinic.address}
                            </p>
                            
                            <p className="text-[10px] text-amber-500 font-bold mt-1.5 flex items-center gap-1">
                              {clinic.rating}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleBookClinic(clinic)}
                          className={`mt-4 flex h-8 w-full items-center justify-center rounded-xl text-[11px] font-bold text-white shadow-sm transition-all duration-300 cursor-pointer ${
                            clinic.isPremium
                              ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/10"
                              : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
                          }`}
                        >
                          {clinic.isPremium ? "Đặt lịch VIP (Premium)" : "Đặt lịch khám"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upgrade Button for VIP clinics */}
                {msg.showUpgradeBtn && (
                  <button
                    type="button"
                    onClick={handleUpgradeAccount}
                    className="mt-3 flex h-10 w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 text-xs font-extrabold text-white shadow-md hover:scale-[1.01] hover:shadow-lg transition cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" /> Nâng cấp tài khoản ngay
                  </button>
                )}

                {/* Chat Redirect Link */}
                {msg.showChatLink && (
                  <Link
                    to="/patient/chat"
                    className="mt-3 inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#27C3A2] px-5 text-xs font-extrabold text-white shadow-md hover:scale-[1.01] hover:shadow-lg transition cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" /> Nhắn tin với phòng khám
                  </Link>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-[22px] rounded-bl-none bg-white/85 border border-white/50 px-5 py-3.5 backdrop-blur-sm">
                <div className="flex gap-1.5 items-center h-4">
                  <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: "0ms" }} />
                  <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-500" style={{ animationDelay: "160ms" }} />
                  <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-500" style={{ animationDelay: "320ms" }} />
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
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage(chatInput);
            }}
            placeholder="Mô tả triệu chứng hoặc hỏi thông tin tại đây..."
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
      </div>

      <aside className="rounded-[30px] border border-[#CFE3FF] bg-gradient-to-br from-[#F7FBFF] to-[#E8FFF9] p-5 shadow-[0_18px_50px_rgba(47,128,237,0.08)] xl:h-[calc(100vh-140px)] xl:min-h-[500px]">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2F80ED] shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1E293B]">Lịch sử chatbot</h2>
              <p className="text-sm font-semibold text-[#64748B]">{chatbotHistory.length} phiên tư vấn AI</p>
            </div>
          </div>
          <span className="rounded-full border border-[#CFE3FF] bg-[#EAF3FF] px-4 py-2 text-sm font-black text-[#1C64D1]">AI</span>
        </div>

        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar xl:max-h-[calc(100vh-250px)]">
          {chatbotHistory.map((history) => (
            <button
              key={history.id}
              type="button"
              onClick={() => openChatbotHistory(history)}
              className={`flex w-full items-start gap-4 rounded-[22px] border p-4 text-left transition cursor-pointer ${
                selectedHistoryId === history.id
                  ? "border-[#9CC8FF] bg-white shadow-sm ring-2 ring-[#CFE3FF]"
                  : "border-white/70 bg-white/55 hover:bg-white hover:shadow-sm"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-black text-[#1E293B]">{history.name}</p>
                  <span className="shrink-0 text-xs font-bold text-[#64748B]">{history.lastAt}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-[#64748B]">{history.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
