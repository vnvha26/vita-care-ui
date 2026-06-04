import { useState } from "react";
import { Send, Search, Circle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { mockMessages } from "../../lib/mock-data";

const conversations = {
  experts: [
    { id: "1", name: "TS. Nguyễn Thị Lan", lastMessage: "Tôi nghĩ nên tăng liều...", time: "09:20", unread: 2, online: true },
    { id: "2", name: "PGS. TS. Trần Văn Nam", lastMessage: "Cần làm thêm xét nghiệm...", time: "Yesterday", unread: 0, online: false },
  ],
  colleagues: [
    { id: "3", name: "BS. Lê Thị C", lastMessage: "Cảm ơn anh đã tư vấn", time: "2 days ago", unread: 0, online: true },
    { id: "4", name: "BS. Trần Văn B", lastMessage: "Case này em cần ý kiến", time: "3 days ago", unread: 1, online: false },
  ],
  patients: [
    { id: "5", name: "Nguyễn Văn An", lastMessage: "Bác sĩ ơi, em có hỏi về đơn thuốc", time: "10:15", unread: 3, online: true },
    { id: "6", name: "Trần Thị Bình", lastMessage: "Cảm ơn bác sĩ đã tư vấn", time: "11:30", unread: 0, online: true },
    { id: "7", name: "Lê Minh Châu", lastMessage: "Khi nào em nên tái khám ạ?", time: "Yesterday", unread: 1, online: false },
    { id: "8", name: "Phạm Đức Duy", lastMessage: "Em đang theo dõi đường huyết", time: "2 days ago", unread: 0, online: false },
  ],
};

const patientMessages = [
  { id: "PM1", senderId: "5", senderName: "Nguyễn Văn An", content: "Chào bác sĩ, em muốn hỏi về đơn thuốc ạ", timestamp: "10:15", isCurrentUser: false },
  { id: "PM2", senderId: "doctor", senderName: "Bác sĩ", content: "Chào anh An, anh cần hỏi gì về đơn thuốc?", timestamp: "10:17", isCurrentUser: true },
  { id: "PM3", senderId: "5", senderName: "Nguyễn Văn An", content: "Em uống thuốc vào lúc nào là tốt nhất ạ? Trước hay sau bữa ăn?", timestamp: "10:18", isCurrentUser: false },
  { id: "PM4", senderId: "doctor", senderName: "Bác sĩ", content: "Thuốc huyết áp anh uống vào buổi sáng sau bữa ăn 30 phút. Còn thuốc tiểu đường uống trước bữa ăn 15-20 phút nhé.", timestamp: "10:20", isCurrentUser: true },
];

export default function DoctorChat() {
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations.experts[0]);
  const [currentMessages, setCurrentMessages] = useState(mockMessages);

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
      setCurrentMessages(mockMessages);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Chat & Tư vấn</h1>
        <p className="text-gray-500 mt-1">Trao đổi với chuyên gia, đồng nghiệp và bệnh nhân</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <Card className="col-span-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Tìm kiếm cuộc trò chuyện..." className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="experts" className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="experts">Chuyên gia</TabsTrigger>
                <TabsTrigger value="colleagues">Đồng nghiệp</TabsTrigger>
                <TabsTrigger value="patients">Bệnh nhân</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="experts" className="flex-1 overflow-y-auto mt-0">
              {conversations.experts.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv, "experts")}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
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

            <TabsContent value="colleagues" className="flex-1 overflow-y-auto mt-0">
              {conversations.colleagues.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv, "colleagues")}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{conv.name.split(" ")[1]?.charAt(0)}</AvatarFallback>
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
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
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
                          ? "bg-blue-600 text-white"
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
