import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus, Phone, X, Clock, User, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

type Appointment = {
  id: string;
  hour: string;
  patient: string;
  type: "Khám mới" | "Tái khám";
  status: "pending" | "confirmed" | "completed";
  phone: string;
  reason: string;
};

const initialAppointments: Appointment[] = [
  { id: "A1", hour: "08:00", patient: "Lê Văn Hùng", type: "Khám mới", status: "pending", phone: "0901 234 567", reason: "Đau rát họng kéo dài" },
  { id: "A2", hour: "08:00", patient: "Phạm Thị Lan", type: "Tái khám", status: "confirmed", phone: "0987 654 321", reason: "Tái khám nội soi dạ dày" },
  { id: "A3", hour: "08:00", patient: "Trịnh Quang Thái", type: "Khám mới", status: "completed", phone: "0912 333 444", reason: "Nhổ răng khôn" },
  { id: "A4", hour: "08:00", patient: "Đinh Xuân Mới", type: "Khám mới", status: "pending", phone: "0934 555 666", reason: "Khám tim mạch" },
  { id: "A5", hour: "09:00", patient: "Nguyễn Khám Bệnh", type: "Khám mới", status: "completed", phone: "0911 223 344", reason: "Đau đầu, chóng mặt" },
  { id: "A6", hour: "09:00", patient: "Trần Minh Tuấn", type: "Tái khám", status: "confirmed", phone: "0933 445 566", reason: "Lấy kết quả xét nghiệm máu" },
  { id: "A7", hour: "10:00", patient: "Lý Thị Bình", type: "Khám mới", status: "pending", phone: "0966 778 899", reason: "Khám tổng quát" },
  { id: "A8", hour: "14:00", patient: "Võ Thị Sáu", type: "Khám mới", status: "pending", phone: "0999 888 777", reason: "Sốt xuất huyết" },
  { id: "A9", hour: "15:00", patient: "Bùi Văn Nam", type: "Tái khám", status: "confirmed", phone: "0988 123 123", reason: "Tái khám vết mổ" },
];

const hours = [
  "07:00", "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

export default function ManagerAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createHour, setCreateHour] = useState("08:00");
  const [newApt, setNewApt] = useState<Partial<Appointment>>({ type: "Khám mới", status: "pending" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 border-amber-300 text-amber-900";
      case "confirmed": return "bg-blue-100 border-blue-300 text-blue-900";
      case "completed": return "bg-green-100 border-green-300 text-green-900";
      default: return "bg-gray-100 border-gray-300 text-gray-900";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500";
      case "confirmed": return "bg-blue-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xác nhận";
      case "confirmed": return "Đã xác nhận";
      case "completed": return "Đã hoàn thành";
      default: return "";
    }
  };

  const handleUpdateStatus = (id: string, newStatus: "pending" | "confirmed" | "completed") => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
    if (selectedApt) setSelectedApt({ ...selectedApt, status: newStatus });
  };

  const handleCreateApt = () => {
    if (!newApt.patient || !newApt.phone) return;
    
    const apt: Appointment = {
      id: "A" + Date.now(),
      hour: createHour,
      patient: newApt.patient || "",
      phone: newApt.phone || "",
      reason: newApt.reason || "",
      type: (newApt.type as any) || "Khám mới",
      status: "pending"
    };
    
    setAppointments([...appointments, apt]);
    setIsCreateModalOpen(false);
    setNewApt({ type: "Khám mới", status: "pending" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tiếp nhận lịch hẹn</h1>
          <p className="text-gray-500 mt-1">Lịch trình khám bệnh trong ngày</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-4 mr-4 text-sm font-medium">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Chờ xác nhận</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Đã xác nhận</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Đã hoàn thành</div>
          </div>
          <Button 
            onClick={() => { setCreateHour("08:00"); setIsCreateModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo lịch mới
          </Button>
        </div>
      </div>

      {/* Daily View Container */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden min-h-0">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 shadow-sm bg-white border border-gray-200">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="font-bold text-gray-800 text-xl flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
              Hôm nay, 15/05/2026
            </h2>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 shadow-sm bg-white border border-gray-200">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <Button variant="outline" className="bg-white border-gray-200 text-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Lọc & Tìm kiếm
          </Button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-auto bg-gray-50/30 p-6">
          <div className="space-y-6 max-w-7xl mx-auto">
            {hours.map((hour) => {
              const aptsForHour = appointments.filter(a => a.hour === hour);
              
              return (
                <div key={hour} className="flex gap-6">
                  {/* Time Label */}
                  <div className="w-24 shrink-0 pt-2 relative">
                    <span className="text-xl font-bold text-gray-900">{hour}</span>
                    <div className="absolute top-6 left-full w-[2000px] h-px bg-gray-200 z-0"></div>
                  </div>
                  
                  {/* Appointments Flex Wrap */}
                  <div className="flex-1 flex flex-wrap gap-4 relative z-10 pt-2 min-h-[80px]">
                    {aptsForHour.length === 0 && (
                      <div 
                        onClick={() => { setCreateHour(hour); setIsCreateModalOpen(true); }}
                        className="w-full flex items-center justify-start text-blue-400 text-sm italic opacity-50 pl-2 cursor-pointer hover:opacity-100 transition-opacity"
                      >
                        + Bấm để thêm lịch hẹn
                      </div>
                    )}
                    {aptsForHour.map(apt => (
                      <div 
                        key={apt.id} 
                        onClick={() => setSelectedApt(apt)}
                        className={`w-72 p-4 rounded-2xl border shadow-sm flex flex-col transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer relative overflow-hidden ${getStatusColor(apt.status)}`}
                      >
                        {/* Decorative side border */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getStatusDot(apt.status)}`}></div>
                        
                        <div className="flex justify-between items-start mb-2 pl-2">
                          <h4 className="font-bold text-base truncate pr-2">{apt.patient}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-md border border-white/40 shrink-0">
                            {apt.type}
                          </span>
                        </div>
                        <div className="flex items-center text-sm font-medium opacity-80 pl-2 mb-1">
                          <Phone className="h-3.5 w-3.5 mr-1.5 shrink-0" /> {apt.phone}
                        </div>
                        <div className="text-sm opacity-70 pl-2 truncate">
                          {apt.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Appointment Details & Status Change */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                Thông tin lịch hẹn
              </h3>
              <button 
                onClick={() => setSelectedApt(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedApt.patient}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Phone className="h-4 w-4" /> {selectedApt.phone}
                    </span>
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {selectedApt.hour}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-gray-500 font-medium">Trạng thái:</span>
                  <span className="col-span-2 font-bold flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusDot(selectedApt.status)}`}></span>
                    {getStatusText(selectedApt.status)}
                  </span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-gray-500 font-medium">Loại khám:</span>
                  <span className="col-span-2 font-medium text-gray-900">{selectedApt.type}</span>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <span className="text-gray-500 font-medium">Lý do:</span>
                  <span className="col-span-2 font-medium text-gray-900">{selectedApt.reason}</span>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-700 mb-3">Cập nhật trạng thái:</p>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => handleUpdateStatus(selectedApt.id, "pending")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedApt.status === "pending" ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm" : "border-gray-100 hover:border-amber-200 hover:bg-amber-50/50 text-gray-600"}`}
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-500 mb-2"></div>
                    <span className="text-xs font-bold text-center">Chờ xác nhận</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedApt.id, "confirmed")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedApt.status === "confirmed" ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 text-gray-600"}`}
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-500 mb-2"></div>
                    <span className="text-xs font-bold text-center">Xác nhận</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedApt.id, "completed")}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedApt.status === "completed" ? "border-green-500 bg-green-50 text-green-700 shadow-sm" : "border-gray-100 hover:border-green-200 hover:bg-green-50/50 text-gray-600"}`}
                  >
                    <CheckCircle2 className={`h-5 w-5 mb-1.5 ${selectedApt.status === "completed" ? "text-green-600" : "text-green-500"}`} />
                    <span className="text-xs font-bold text-center">Hoàn thành</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <Button onClick={() => setSelectedApt(null)} className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl">
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Create Appointment */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                Tạo lịch hẹn mới
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ khám</label>
                <select 
                  value={createHour}
                  onChange={(e) => setCreateHour(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {hours.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên bệnh nhân</label>
                <input 
                  type="text" autoFocus
                  value={newApt.patient || ""} onChange={e => setNewApt({...newApt, patient: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input 
                    type="text" 
                    value={newApt.phone || ""} onChange={e => setNewApt({...newApt, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại khám</label>
                  <select 
                    value={newApt.type} onChange={e => setNewApt({...newApt, type: e.target.value as any})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Khám mới">Khám mới</option>
                    <option value="Tái khám">Tái khám</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lý do khám / Triệu chứng</label>
                <textarea 
                  rows={3}
                  value={newApt.reason || ""} onChange={e => setNewApt({...newApt, reason: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <Button onClick={() => setIsCreateModalOpen(false)} variant="outline" className="rounded-xl">Hủy</Button>
              <Button onClick={handleCreateApt} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Lưu lịch hẹn</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
