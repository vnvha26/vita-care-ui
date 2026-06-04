import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Xin chào! Tôi là trợ lý ảo ClinicPro được trang bị AI. Tôi có thể giúp bạn quản lý phòng khám, tra cứu thông tin bệnh nhân, hay thống kê doanh thu. Bạn cần hỗ trợ gì hôm nay?",
    isBot: true,
    timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  },
];

const suggestedQuestions = [
  "Số lượng bệnh nhân hôm nay?",
  "Báo cáo lịch khám ngày mai",
  "Thống kê ca bệnh khẩn cấp",
  "Tình trạng các phòng khám",
];

export default function ManagerChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = inputMessage) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (inputMessage === text) setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Tôi đã nhận được yêu cầu "${text}". Đây là phiên bản thử nghiệm. Trong tương lai, tôi sẽ kết nối với cơ sở dữ liệu để trả lời chính xác thông tin này!`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-100px)] w-full -mt-2">
      {/* Decorative animated gradient blobs for glassmorphism background */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[30%] w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Welcome Logo (Optional since we removed the header) */}
          <div className="flex flex-col items-center justify-center pt-8 pb-12 opacity-80">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Bạn cần hỗ trợ gì?
            </h2>
          </div>

          {messages.length === 1 && (
            <div className="w-full flex justify-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-5 py-4 bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl text-sm font-medium text-gray-700 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <span className="text-blue-500 group-hover:text-blue-600 mr-2 text-lg leading-none">→</span>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${message.isBot ? "" : "flex-row-reverse"}`}>
                <Avatar className="h-10 w-10 shrink-0 shadow-md">
                  <AvatarFallback className={message.isBot ? "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600" : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"}>
                    {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${message.isBot ? "items-start" : "items-end"}`}>
                  <div
                    className={`rounded-2xl px-5 py-4 shadow-sm backdrop-blur-md ${
                      message.isBot
                        ? "bg-white/70 border border-white/60 text-gray-800 rounded-tl-sm"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/30"
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 px-1 opacity-70">
                    {message.isBot && <Clock className="h-3 w-3 text-gray-500" />}
                    <span className="text-xs font-medium text-gray-500">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="flex gap-4 max-w-[85%]">
                <Avatar className="h-10 w-10 shrink-0 shadow-md">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl px-5 py-5 bg-white/70 backdrop-blur-md border border-white/60 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="relative z-20 pb-4 pt-2 px-4 w-full">
        <div className="relative flex items-center w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Nhập yêu cầu cho AI..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend(inputMessage)}
            className="w-full pl-6 pr-14 py-4 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-[15px] placeholder:text-gray-500 transition-all"
          />
          <button 
            onClick={() => handleSend(inputMessage)}
            disabled={!inputMessage.trim()}
            className="absolute right-2 p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shadow-md"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-500 mt-3 font-medium">
          AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
        </p>
      </div>
    </div>
  );
}
