import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
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
    content: "Xin chào! Tôi là trợ lý ảo ClinicPro. Tôi có thể giúp bạn quản lý phòng khám, tra cứu thông tin bệnh nhân, xem báo cáo và nhiều hơn nữa. Bạn cần hỗ trợ gì?",
    isBot: true,
    timestamp: "09:00",
  },
];

const suggestedQuestions = [
  "Số lượng bệnh nhân hôm nay?",
  "Hiển thị báo cáo tháng này",
  "Danh sách bác sĩ đang hoạt động",
  "Thống kê ca bệnh khẩn cấp",
  "Tình trạng các phòng khám",
];

export default function ManagerChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Tôi đã nhận được yêu cầu "${inputMessage}". Đây là phản hồi mẫu từ chatbot. Trong phiên bản thực tế, tôi sẽ xử lý và cung cấp thông tin chi tiết dựa trên câu hỏi của bạn.`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Chatbot Hỗ trợ</h1>
        <p className="text-gray-500 mt-1">Trợ lý ảo thông minh hỗ trợ quản lý phòng khám</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex flex-col h-[calc(100vh-280px)]">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>ClinicPro Assistant</CardTitle>
                <p className="text-sm text-gray-500">Trợ lý ảo luôn sẵn sàng</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.isBot ? "" : "flex-row-reverse"}`}>
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className={message.isBot ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                      {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.isBot
                          ? "bg-white border border-gray-200"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">{message.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập câu hỏi hoặc yêu cầu..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Câu hỏi gợi ý</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full text-left text-sm p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tính năng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                <p>Tra cứu thông tin nhanh chóng</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                <p>Tạo báo cáo tự động</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                <p>Phân tích dữ liệu thông minh</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                <p>Gợi ý tối ưu hóa</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
