import { useState, useRef, useEffect } from "react";
import { Bell, Search, AlertCircle, MessageCircle, X, Send, Bot, Check, CalendarPlus } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface TopbarProps {
  userName: string;
  userRole: string;
  notifications?: number;
}

const mockContacts = [
  { id: "1", name: "Nguyễn Khám Bệnh", lastMessage: "Dạo này nắng nóng tia cực tím cao quá...", time: "10:32", unread: 2, online: true },
  { id: "2", name: "Trần Hay Hỏi", lastMessage: "Bác sĩ ơi đợt dịch sốt xuất huyết này căng quá...", time: "09:15", unread: 0, online: false },
  { id: "3", name: "Lê Googler", lastMessage: "Em tra thông tin y tế trên mạng thấy...", time: "Hôm qua", unread: 0, online: true },
];

export function Topbar({ userName, userRole, notifications = 0 }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessengerDrop, setShowMessengerDrop] = useState(false);
  const [activeMiniChat, setActiveMiniChat] = useState<any>(null);
  const [isAddedToSchedule, setIsAddedToSchedule] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const messengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messengerRef.current && !messengerRef.current.contains(event.target as Node)) {
        setShowMessengerDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleOpenMiniChat = (contact: any) => {
    setActiveMiniChat(contact);
    setShowMessengerDrop(false);
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-white/60 bg-white/60 backdrop-blur-xl px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bệnh nhân, hồ sơ..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        {/* Messenger Dropdown Button */}
        <div className="relative" ref={messengerRef}>
          <button 
            onClick={() => setShowMessengerDrop(!showMessengerDrop)}
            className={`relative rounded-full p-2 transition-colors ${showMessengerDrop ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <MessageCircle className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-blue-600 text-white border-2 border-white"
            >
              2
            </Badge>
          </button>

          {showMessengerDrop && (
            <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="px-4 py-3 border-b border-white/40 bg-white/50 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Tin nhắn</span>
                <Link to="/manager/chat" className="text-xs text-blue-600 hover:underline" onClick={() => setShowMessengerDrop(false)}>Xem tất cả trong Messenger</Link>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {mockContacts.map(contact => (
                  <div 
                    key={contact.id}
                    onClick={() => handleOpenMiniChat(contact)}
                    className="flex gap-3 p-3 hover:bg-white/60 cursor-pointer transition-colors border-b border-white/40 last:border-0"
                  >
                    <div className="relative shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {contact.name.charAt(0)}
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className={`text-sm truncate pr-2 ${contact.unread > 0 ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}>
                          {contact.name}
                        </h4>
                        <span className={`text-[10px] ${contact.unread > 0 ? "text-blue-600 font-bold" : "text-gray-400"}`}>{contact.time}</span>
                      </div>
                      <p className={`text-xs truncate ${contact.unread > 0 ? "font-medium text-gray-800" : "text-gray-500"}`}>
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {(notifications > 0 || userRole === "Quản lý hệ thống") && (
              <Badge 
                variant="destructive" 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-2 border-white"
              >
                {notifications + (userRole === "Quản lý hệ thống" ? 1 : 0)}
              </Badge>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-2xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/40 bg-white/50 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Thông báo</span>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">Đánh dấu đã đọc</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {userRole === "Quản lý hệ thống" && (
                  <Link 
                    to="/manager/clinic-registration"
                    onClick={() => setShowNotifications(false)}
                    className="flex gap-3 p-4 hover:bg-white/60 transition-colors border-l-4 border-red-500 bg-red-50/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Chưa đăng ký thông tin phòng khám</p>
                      <p className="text-xs text-gray-500 mt-1">Vui lòng cập nhật thông tin phòng khám để hệ thống có thể hoạt động đầy đủ tính năng.</p>
                      <p className="text-[10px] text-gray-400 mt-2">Vừa xong</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>
      </div>
      
      {/* Global Mini Chat Popup */}
      {activeMiniChat && (
        <div className="fixed bottom-0 right-16 w-80 bg-white/80 backdrop-blur-3xl rounded-t-xl shadow-[0_0_40px_rgba(0,0,0,0.15)] z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-blue-600/90 backdrop-blur-md px-3 py-2.5 flex items-center justify-between shadow-sm cursor-pointer" onClick={() => setActiveMiniChat(null)}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                  {activeMiniChat.name.charAt(0)}
                </div>
                {activeMiniChat.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-600 rounded-full"></div>
                )}
              </div>
              <div className="text-white">
                <h4 className="font-semibold text-sm leading-tight">{activeMiniChat.name}</h4>
                <p className="text-[10px] opacity-80">{activeMiniChat.online ? "Đang hoạt động" : "Ngoại tuyến"}</p>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveMiniChat(null); }}
              className="text-white/80 hover:text-white hover:bg-blue-700 p-1.5 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="h-96 bg-gray-50/40 p-3 overflow-y-auto flex flex-col gap-3 scrollbar-thin">
            <div className="text-center text-[10px] text-gray-400 my-1">10:30 Hôm nay</div>
            <div className="self-start max-w-[85%]">
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 p-2.5 rounded-2xl rounded-tl-sm text-[13px] text-gray-800 shadow-sm leading-relaxed">
                Bác sĩ ơi, dạo này thời tiết nắng nóng gay gắt, tia cực tím (UV) ngoài đường cao quá làm em hay bị choáng váng, say nắng chóng mặt liên tục. Đài báo đang có đợt nắng nóng kỷ lục, em muốn đặt lịch qua phòng khám kiểm tra sức khỏe tổng quát và nội thần kinh cho an tâm ạ.
              </div>
            </div>
            
            <div className="self-end max-w-[85%]">
              <div className="bg-blue-600 text-white p-2.5 rounded-2xl rounded-tr-sm text-[13px] shadow-sm leading-relaxed">
                Chào bạn, thời tiết hiện tại đúng là rất khắc nghiệt. Bạn nên hạn chế ra ngoài vào giờ cao điểm. Phòng khám sẽ sắp xếp lịch kiểm tra tổng quát cho bạn vào đầu giờ sáng ngày mai để tránh nắng gắt nhé.
              </div>
            </div>

            {/* AI Booking Card */}
            <div className="self-start max-w-[95%] w-full mt-2">
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 p-3 rounded-2xl rounded-tl-sm shadow-sm space-y-2.5">
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Trợ lý AI ClinicPro</span>
                </div>
                <div className="bg-white/50 p-2.5 rounded-xl border border-white/60 text-xs space-y-1.5">
                  <p><span className="font-medium text-gray-500">Tên:</span> {activeMiniChat.name}</p>
                  <p><span className="font-medium text-gray-500">SĐT:</span> 0901 234 567</p>
                  <p><span className="font-medium text-gray-500">Ngày:</span> Sáng ngày mai (08:00)</p>
                  <p><span className="font-medium text-gray-500">Lý do:</span> Khám tổng quát (say nắng)</p>
                </div>
                <button 
                  onClick={() => setIsAddedToSchedule(true)}
                  className={`w-full py-2 rounded-xl font-medium transition-all text-xs flex items-center justify-center gap-1.5 ${
                    isAddedToSchedule 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                  }`}
                >
                  {isAddedToSchedule ? (
                    <><Check className="h-3.5 w-3.5" /> Đã thêm vào lịch</>
                  ) : (
                    <><CalendarPlus className="h-3.5 w-3.5" /> Thêm vào lịch khám</>
                  )}
                </button>
              </div>
            </div>

          </div>
          
          <div className="p-3 bg-white/60 backdrop-blur-md border-t border-white/60 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Nhập tin nhắn..." 
              className="flex-1 bg-white/70 border border-white/80 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
            <button className="text-blue-600 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
