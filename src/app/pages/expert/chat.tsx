import { useState } from "react";
import { Send, Search, Circle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";

const conversations = {
  doctors: [
    { id: "1", name: "BS. Nguyễn Văn A", lastMessage: "Cảm ơn chuyên gia đã tư vấn", time: "10:30", unread: 1, online: true },
    { id: "2", name: "BS. Trần Văn B", lastMessage: "Em sẽ thử phương pháp này", time: "Yesterday", unread: 0, online: false },
    { id: "3", name: "BS. Lê Thị C", lastMessage: "Xin hỏi thêm về liều lượng", time: "2 days ago", unread: 3, online: true },
  ],
  patients: [
    { id: "4", name: "Nguyễn Văn An", lastMessage: "Chuyên gia ơi, em hỏi về kết quả xét nghiệm", time: "14:15", unread: 2, online: true },
    { id: "5", name: "Trần Thị Bình", lastMessage: "Em cảm ơn chuyên gia rất nhiều", time: "11:45", unread: 0, online: false },
    { id: "6", name: "Lê Minh Châu", lastMessage: "Chỉ số này có nghĩa là gì ạ?", time: "Yesterday", unread: 1, online: true },
  ],
};

const doctorMessages = [
  { id: "1", senderId: "1", senderName: "BS. Nguyễn Văn A", content: "Chào chuyên gia, em có ca bệnh nhân tiểu đường cần tư vấn", timestamp: "10:15", isCurrentUser: false },
  { id: "2", senderId: "expert", senderName: "Chuyên gia", content: "Chào bác sĩ, vui lòng gửi hồ sơ bệnh án cho tôi xem", timestamp: "10:18", isCurrentUser: true },
  { id: "3", senderId: "1", senderName: "BS. Nguyễn Văn A", content: "Đã gửi file qua hệ thống ạ", timestamp: "10:20", isCurrentUser: false },
  { id: "4", senderId: "expert", senderName: "Chuyên gia", content: "Tôi khuyên nên tăng liều insulin và theo dõi đường huyết sát hơn", timestamp: "10:30", isCurrentUser: true },
];

const patientMessages = [
  { id: "P1", senderId: "4", senderName: "Nguyễn Văn An", content: "Chào chuyên gia, em muốn hỏi về kết quả xét nghiệm của em ạ", timestamp: "14:15", isCurrentUser: false },
  { id: "P2", senderId: "expert", senderName: "Chuyên gia", content: "Chào anh An, kết quả xét nghiệm của anh cho thấy đường huyết đang được kiểm soát tốt", timestamp: "14:17", isCurrentUser: true },
  { id: "P3", senderId: "4", senderName: "Nguyễn Văn An", content: "Vậy em có cần điều chỉnh liều thuốc không ạ?", timestamp: "14:18", isCurrentUser: false },
  { id: "P4", senderId: "expert", senderName: "Chuyên gia", content: "Hiện tại chưa cần thiết. Anh tiếp tục duy trì như hiện tại và tái khám sau 2 tuần nhé", timestamp: "14:20", isCurrentUser: true },
];

export default function ExpertChat() {
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations.doctors[0]);
  const [currentMessages, setCurrentMessages] = useState(doctorMessages);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleSelectConversation = (conv: any, type: string) => {
    setSelectedConversation(conv);
    if (type === "patients") {
      setCurrentMessages(patientMessages);
    } else {
      setCurrentMessages(doctorMessages);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Chat trao đổi</h1>
        <p className="text-gray-500 mt-1">Tư vấn và hỗ trợ bác sĩ và bệnh nhân</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <Card className="col-span-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Tìm kiếm..." className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="doctors" className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
                <TabsTrigger value="patients">Bệnh nhân</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="doctors" className="flex-1 overflow-y-auto mt-0">
              {conversations.doctors.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv, "doctors")}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{conv.name.split(" ")[1]?.charAt(0) || conv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conv.online && <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="patients" className="flex-1 overflow-y-auto mt-0">
              {conversations.patients.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv, "patients")}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {conv.name.split(" ")[2]?.charAt(0) || conv.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="col-span-2 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{selectedConversation.name.split(" ")[1]?.charAt(0) || selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{selectedConversation.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {selectedConversation.online && (
                    <>
                      <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                      Online
                    </>
                  )}
                  {!selectedConversation.online && "Offline"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Xem hồ sơ</Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[70%] ${msg.isCurrentUser ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{msg.senderName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.isCurrentUser
                          ? "bg-green-600 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
