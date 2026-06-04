import { useState } from "react";
import { Send, Search, Circle, Users as UsersIcon } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const conversations = {
  doctors: [
    { id: "1", name: "BS. Nguyễn Văn A", lastMessage: "Cảm ơn quản lý đã hỗ trợ", time: "10:30", unread: 0, online: true },
    { id: "2", name: "BS. Trần Văn B", lastMessage: "Em cần hỗ trợ về hệ thống", time: "Yesterday", unread: 2, online: false },
  ],
  experts: [
    { id: "3", name: "TS. Nguyễn Thị Lan", lastMessage: "Báo cáo tuần đã gửi", time: "09:15", unread: 0, online: true },
    { id: "4", name: "PGS. TS. Trần Văn Nam", lastMessage: "Cần trao đổi về quy trình", time: "2 days ago", unread: 1, online: false },
  ],
  users: [
    { id: "5", name: "Nguyễn Văn X", lastMessage: "Câu hỏi về lịch hẹn", time: "14:20", unread: 3, online: true },
    { id: "6", name: "Trần Thị Y", lastMessage: "Phản hồi dịch vụ", time: "Yesterday", unread: 0, online: false },
  ],
};

export default function ManagerChat() {
  const [message, setMessage] = useState("");
  const [selectedConv, setSelectedConv] = useState(conversations.doctors[0]);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Chat</h1>
        <p className="text-gray-500 mt-1">Trao đổi với bác sĩ, chuyên gia và người dùng</p>
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
              <TabsList className="w-full">
                <TabsTrigger value="doctors" className="flex-1">Bác sĩ</TabsTrigger>
                <TabsTrigger value="experts" className="flex-1">Chuyên gia</TabsTrigger>
                <TabsTrigger value="users" className="flex-1">Người dùng</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="doctors" className="flex-1 overflow-y-auto mt-0">
              {conversations.doctors.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 ${
                    selectedConv.id === conv.id ? "bg-blue-50" : ""
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

            <TabsContent value="experts" className="flex-1 overflow-y-auto mt-0">
              {conversations.experts.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 ${
                    selectedConv.id === conv.id ? "bg-blue-50" : ""
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

            <TabsContent value="users" className="flex-1 overflow-y-auto mt-0">
              {conversations.users.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`flex items-start gap-3 p-4 cursor-pointer border-b hover:bg-gray-50 ${
                    selectedConv.id === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{conv.name.split(" ")[2]?.charAt(0)}</AvatarFallback>
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
                <AvatarFallback>{selectedConv.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{selectedConv.name}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  {selectedConv.online && (
                    <>
                      <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                      Online
                    </>
                  )}
                  {!selectedConv.online && "Offline"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Xem hồ sơ</Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="text-center text-sm text-gray-500 mb-6">
              Bắt đầu cuộc trò chuyện với {selectedConv.name}
            </div>
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
