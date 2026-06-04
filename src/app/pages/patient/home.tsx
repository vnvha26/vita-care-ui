import { useState } from "react";
import { Link } from "react-router";

export default function PatientHome() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    {
      role: "bot",
      content: "Xin chào! Tôi là trợ lý tư vấn sức khỏe. Bạn có thể mô tả triệu chứng của mình để tôi tư vấn ban đầu.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    }, 1000);

    setInputValue("");
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("đau đầu") || lowerMessage.includes("nhức đầu")) {
      return "Dựa trên dữ liệu các ca khám tương tự, đau đầu có thể do stress, thiếu ngủ, hoặc thay đổi thời tiết. Bạn nên nghỉ ngơi, uống đủ nước. Nếu đau kéo dài, hãy đặt lịch qua phòng khám để bác sĩ trực tiếp kiểm tra nhé.";
    } else if (lowerMessage.includes("sốt") || lowerMessage.includes("nóng")) {
      return "Với triệu chứng sốt, hệ thống ghi nhận đây là dấu hiệu cơ thể đang chống lại nhiễm trùng. Nếu sốt > 38.5°C, bạn nên đặt lịch khám ngay tại phòng khám. Trong khi chờ, hãy uống nhiều nước và chườm mát.";
    } else if (lowerMessage.includes("ho") || lowerMessage.includes("khò") || lowerMessage.includes("viêm họng")) {
      return "Triệu chứng ho kéo dài thường gặp trong các hồ sơ bệnh án về viêm đường hô hấp. Bạn nên hạn chế nước đá. Nếu ho có đờm, vui lòng đặt lịch hẹn để bác sĩ của phòng khám chẩn đoán chính xác và kê đơn thuốc phù hợp.";
    } else if (lowerMessage.includes("đau bụng") || lowerMessage.includes("ợ chua") || lowerMessage.includes("chua")) {
      return "Dựa trên hàng trăm ca khám có triệu chứng tương tự, bạn có thể đang gặp vấn đề về trào ngược dạ dày (GERD). Bạn nên kiêng đồ chua cay, không nằm ngay sau khi ăn và đặt lịch nội soi tại phòng khám để kiểm tra kỹ hơn.";
    }
    return "Cảm ơn bạn đã chia sẻ. Để tôi có thể phân tích chính xác dựa trên lịch sử dữ liệu y tế, bạn có thể mô tả rõ hơn về triệu chứng, hoặc đăng ký tài khoản để đặt lịch khám trực tiếp với bác sĩ của phòng khám chúng tôi.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏥</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ClinicPro</h1>
              <p className="text-xs text-gray-500">Phòng khám thông minh</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/patient/login"
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              to="/patient/register"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tư vấn sức khỏe trực tuyến
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Trợ lý AI của ClinicPro được huấn luyện dựa trên hàng ngàn hồ sơ bệnh án thực tế, giúp giải đáp triệu chứng và hỗ trợ đặt lịch khám nhanh chóng.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/60 p-4 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">👨‍⚕️</div>
                <div className="text-2xl font-bold text-gray-900">Giàu KQ</div>
                <div className="text-sm text-gray-600">Đội ngũ bác sĩ</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-white/60 p-4 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-2xl font-bold text-gray-900">AI</div>
                <div className="text-sm text-gray-600">Tư vấn 24/7</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-white/60 p-4 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Đánh giá</div>
              </div>
              <div className="bg-white/60 backdrop-blur-md border border-white/60 p-4 rounded-xl shadow-sm">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Hỗ trợ</div>
              </div>
            </div>
            <Link
              to="/patient/book"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Đặt lịch khám ngay
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hỏi đáp triệu chứng</h3>
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-thin">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm leading-relaxed text-[13px] ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-white/80 border border-white/60 text-gray-900 rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Mô tả triệu chứng của bạn..."
                  className="flex-1 px-4 py-2.5 bg-white/70 border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-all"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
