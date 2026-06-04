import { useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, Bot, Save, Send, User } from "lucide-react";

type Message = {
  role: "bot" | "user";
  content: string;
};

const quickReplies = ["Đau đầu", "Sốt", "Ho, đau họng", "Đau bụng"];

export default function PatientConsultation() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Xin chào Tuấn, bạn đang gặp triệu chứng gì? Hãy mô tả thời gian xuất hiện, mức độ và các dấu hiệu đi kèm.",
    },
  ]);

  const generateReply = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("đau đầu")) {
      return "Bạn bị đau đầu ở vị trí nào? Mức độ đau từ 1 đến 10 là bao nhiêu? Bạn có sốt, nhìn mờ, nôn nhiều hoặc yếu tay chân không?";
    }

    if (lower.includes("sốt")) {
      return "Bạn sốt bao nhiêu độ và kéo dài bao lâu? Nếu sốt trên 38.5°C, khó thở, lừ đừ hoặc đau ngực, bạn nên đi khám sớm.";
    }

    if (lower.includes("ho") || lower.includes("đau họng")) {
      return "Bạn ho khan hay có đờm? Có sốt, khó thở hoặc đau tức ngực không? Nếu triệu chứng kéo dài trên 3 ngày, nên đặt lịch khám.";
    }

    if (lower.includes("đau bụng")) {
      return "Bạn đau bụng ở vị trí nào? Có nôn, tiêu chảy, sốt hoặc đau tăng dần không? Nếu đau dữ dội, nên đi khám ngay.";
    }

    return "Cảm ơn bạn đã chia sẻ. Bạn có thể mô tả rõ hơn về triệu chứng, thời gian xuất hiện, mức độ nặng nhẹ và tiền sử bệnh nền không?";
  };

  const handleSend = (value = input) => {
    if (!value.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: generateReply(value) }]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tư vấn sức khỏe với chatbot</h1>
          <p className="mt-1 text-gray-600">
            Nhập triệu chứng, chatbot sẽ hỏi thêm thông tin và gợi ý bước tiếp theo.
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          Đang tư vấn
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="flex h-[calc(100vh-220px)] min-h-[560px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Chatbot AI y tế</h2>
                <p className="text-sm text-gray-500">Tư vấn ban đầu, không thay thế bác sĩ.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[78%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user" ? "bg-gray-200 text-gray-700" : "bg-indigo-100 text-indigo-700"
                  }`}>
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-tr-sm bg-gray-900 text-white"
                      : "rounded-tl-sm bg-indigo-50 text-indigo-900"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Nhập triệu chứng hoặc câu hỏi sức khỏe..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleSend()}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Send className="h-4 w-4" />
                Gửi
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-gray-900">Thông tin đã thu thập</h3>
            <p className="mt-1 text-sm text-gray-500">Dữ liệu từ cuộc trò chuyện hiện tại.</p>
            <div className="mt-4 space-y-3">
              {[
                ["Triệu chứng", "Đau đầu, buồn nôn, mệt mỏi"],
                ["Thời gian", "Từ sáng nay"],
                ["Mức độ", "6/10"],
                ["Dấu hiệu nguy hiểm", "Chưa ghi nhận"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-slate-50 p-3">
                  <div className="text-xs font-bold text-gray-900">{label}</div>
                  <div className="mt-1 text-xs text-gray-600">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold">Nguy cơ trung bình</h3>
            </div>
            <p className="mt-2 text-sm text-amber-800">
              Chatbot chỉ hỗ trợ tư vấn ban đầu. Nếu triệu chứng nặng hơn, bạn nên đi khám.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-gray-900">Gợi ý tiếp theo</h3>
            <p className="mt-2 text-sm text-gray-600">
              Nghỉ ngơi, uống đủ nước, theo dõi trong 24 giờ. Nếu đau tăng hoặc có dấu hiệu bất thường, hãy đặt lịch khám.
            </p>
            <Link
              to="/patient/book"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Đặt lịch khám
            </Link>
            <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <Save className="h-4 w-4" />
              Lưu lịch sử tư vấn
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}