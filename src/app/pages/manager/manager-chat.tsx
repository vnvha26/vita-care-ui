import { useState } from "react";
import { Search, Phone, Video, Info, Send, UserCircle, Check, CheckCircle2, Bot, CalendarPlus } from "lucide-react";

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar?: string;
}

const mockContacts: ChatContact[] = [
  { id: "1", name: "Nguyễn Khám Bệnh", lastMessage: "Dạo này nắng nóng tia cực tím cao quá...", time: "10:32", unread: 2, online: true },
  { id: "2", name: "Trần Hay Hỏi", lastMessage: "Bác sĩ ơi đợt dịch sốt xuất huyết này căng quá...", time: "09:15", unread: 0, online: false },
  { id: "3", name: "Lê Googler", lastMessage: "Em tra thông tin y tế trên mạng thấy...", time: "Hôm qua", unread: 0, online: true },
  { id: "4", name: "Thánh Bùng Lịch", lastMessage: "Bão số 3 vào nên em xin dời lịch nhé.", time: "Hôm qua", unread: 1, online: false },
  { id: "5", name: "Trùm Trả Giá", lastMessage: "Nhổ răng khôn bớt em 200k nha phòng khám.", time: "T2", unread: 0, online: false },
];

export default function ManagerChat() {
  const [activeContact, setActiveContact] = useState<ChatContact>(mockContacts[0]);
  const [message, setMessage] = useState("");
  const [isAddedToSchedule, setIsAddedToSchedule] = useState(false);

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500 pb-2">
      
      {/* Left Sidebar - Contact List */}
      <div className="w-80 flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden shrink-0">
        <div className="p-5 border-b border-white/60 bg-white/40">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tin nhắn</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm bệnh nhân..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-white/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          {mockContacts.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
                activeContact.id === contact.id 
                  ? "bg-blue-50/40 border-blue-600" 
                  : "border-transparent hover:bg-white/40"
              }`}
            >
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {contact.name.charAt(0)}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-semibold text-gray-900 truncate pr-2">{contact.name}</h3>
                  <span className={`text-xs ${contact.unread > 0 ? "text-blue-600 font-bold" : "text-gray-400"}`}>
                    {contact.time}
                  </span>
                </div>
                <p className={`text-sm truncate ${contact.unread > 0 ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {contact.lastMessage}
                </p>
              </div>
              {contact.unread > 0 && (
                <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {contact.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Area - Chat Window */}
      <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden relative">
        
        {/* Subtle decorative background inside chat */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

        {/* Chat Header */}
        <div className="absolute top-0 left-0 right-0 h-20 px-6 border-b border-white/60 bg-white/40 backdrop-blur-xl flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                {activeContact.name.charAt(0)}
              </div>
              {activeContact.online && (
                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{activeContact.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                {activeContact.online ? (
                  <><span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span> Đang hoạt động</>
                ) : (
                  "Ngoại tuyến"
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-white/60 rounded-full transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-white/60 rounded-full transition-colors">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-white/60 rounded-full transition-colors">
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto pt-24 px-6 pb-6 space-y-6 z-10 bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex justify-center">
            <span className="text-xs font-medium text-gray-400 bg-white/60 border border-white/60 px-3 py-1 rounded-full">Hôm nay</span>
          </div>

          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shrink-0 mt-1">
                <UserCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="bg-white/80 border border-white/60 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                  <p className="text-[14px]">Bác sĩ ơi, dạo này thời tiết nắng nóng gay gắt, tia cực tím (UV) ngoài đường cao quá làm em hay bị choáng váng, say nắng chóng mặt liên tục.</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-1">10:30</p>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="h-8 w-8 rounded-full shrink-0 mt-1 opacity-0"></div> {/* Spacer for alignment */}
              <div>
                <div className="bg-white/80 border border-white/60 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                  <p className="text-[14px]">Đài báo đang có đợt nắng nóng kỷ lục, em muốn đặt lịch qua phòng khám kiểm tra sức khỏe tổng quát và nội thần kinh cho an tâm ạ.</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-1">10:32</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-3 max-w-[75%] flex-row-reverse">
              <div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md shadow-blue-500/20 leading-relaxed">
                  <p className="text-[14px]">Chào bạn, thời tiết hiện tại đúng là rất khắc nghiệt. Bạn nên hạn chế ra ngoài vào giờ cao điểm từ 11h - 15h và uống nhiều nước nhé. Phòng khám sẽ sắp xếp lịch kiểm tra tổng quát cho bạn vào đầu giờ sáng ngày mai để tránh nắng gắt.</p>
                </div>
                <div className="flex justify-end items-center gap-1 mt-1 mr-1">
                  <p className="text-xs text-gray-400">10:35</p>
                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="h-8 w-8 rounded-full shrink-0 mt-1 opacity-0"></div> {/* Spacer for alignment */}
              <div>
                <div className="bg-white/80 border border-white/60 text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm space-y-3 leading-relaxed">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Bot className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Trợ lý AI ClinicPro</span>
                  </div>
                  <p className="text-[14px] text-gray-600">Bệnh nhân vừa cung cấp thông tin đặt lịch hẹn:</p>
                  <div className="bg-white/50 p-3 rounded-xl border border-white/60 text-sm space-y-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                    <p><span className="font-medium text-gray-500">Người đặt:</span> Nguyễn Khám Bệnh</p>
                    <p><span className="font-medium text-gray-500">SĐT:</span> 0901 234 567</p>
                    <p><span className="font-medium text-gray-500">Ngày khám:</span> Ngày mai, 09:00</p>
                    <p><span className="font-medium text-gray-500">Lý do:</span> Khám lại dạ dày</p>
                  </div>
                  <button 
                    onClick={() => setIsAddedToSchedule(true)}
                    className={`w-full py-2.5 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                      isAddedToSchedule 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    }`}
                  >
                    {isAddedToSchedule ? (
                      <><Check className="h-4 w-4" /> Đã thêm vào lịch hẹn</>
                    ) : (
                      <><CalendarPlus className="h-4 w-4" /> Thêm vào lịch khám</>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-1">10:36</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white/40 backdrop-blur-md border-t border-white/60 z-10">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-5 pr-4 py-3.5 bg-white/70 border border-white/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-[15px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
            <button 
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all ${
                message.trim() 
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:-translate-y-0.5" 
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Send className="h-5 w-5 ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
