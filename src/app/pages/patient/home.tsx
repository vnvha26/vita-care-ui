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
      return "Đau đầu có thể do nhiều nguyên nhân như stress, thiếu ngủ, hoặc tăng huyết áp. Bạn nên: 1) Nghỉ ngơi trong phòng tối, 2) Uống đủ nước, 3) Nếu đau kéo dài > 2 ngày, nên đặt lịch khám với bác sĩ thần kinh.";
    } else if (lowerMessage.includes("sốt") || lowerMessage.includes("nóng")) {
      return "Sốt thường là dấu hiệu cơ thể đang chống lại nhiễm trùng. Nếu sốt > 38.5°C hoặc kéo dài > 3 ngày, bạn nên đặt lịch khám ngay. Trong khi đó, hãy uống nhiều nước và nghỉ ngơi.";
    } else if (lowerMessage.includes("ho") || lowerMessage.includes("khò")) {
      return "Ho có thể do cảm lạnh, viêm họng hoặc dị ứng. Nếu ho có đờm màu vàng/xanh, khó thở, hoặc kéo dài > 1 tuần, bạn nên khám với bác sĩ nội tổng quát hoặc hô hấp.";
    } else if (lowerMessage.includes("đau bụng")) {
      return "Đau bụng có nhiều nguyên nhân từ nhẹ đến nghiêm trọng. Nếu đau dữ dội, nôn mửa, hoặc đi ngoài ra máu, hãy đến cơ sở y tế ngay. Nếu đau nhẹ, có thể do ăn uống, bạn nên khám với bác sĩ tiêu hóa.";
    }
    return "Cảm ơn bạn đã chia sẻ. Để được tư vấn chính xác hơn, tôi khuyên bạn nên đăng ký tài khoản và đặt lịch khám với bác sĩ chuyên khoa phù hợp. Bạn có thể tìm kiếm bác sĩ theo triệu chứng của mình.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏥</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthCare</h1>
              <p className="text-xs text-gray-500">Hệ thống quản lý sức khỏe</p>
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
              Hỏi đáp về triệu chứng, tìm bác sĩ phù hợp và đặt lịch khám dễ dàng. Chúng tôi
              kết nối bạn với hơn 100+ bác sĩ chuyên khoa hàng đầu.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">👨‍⚕️</div>
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Bác sĩ</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🏥</div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Phòng khám</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Đánh giá</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Hỗ trợ</div>
              </div>
            </div>
            <Link
              to="/patient/doctors"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Tìm bác sĩ ngay
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

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hỏi đáp triệu chứng</h3>
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
