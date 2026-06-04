import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, UserCircle, Clock, X } from "lucide-react";
import { Button } from "../../components/ui/button";

const weekDays = [
  { name: "Thứ 2", date: "15/05", isToday: true },
  { name: "Thứ 3", date: "16/05", isToday: false },
  { name: "Thứ 4", date: "17/05", isToday: false },
  { name: "Thứ 5", date: "18/05", isToday: false },
  { name: "Thứ 6", date: "19/05", isToday: false },
  { name: "Thứ 7", date: "20/05", isToday: false },
  { name: "Chủ nhật", date: "21/05", isToday: false },
];

const initialShifts = {
  morning: [
    { doctor: "BS. Nguyễn Khám Bệnh", specialty: "Nội khoa", time: "08:00 - 12:00" },
    { doctor: "BS. Trần Hay Hỏi", specialty: "Nhi khoa", time: "08:00 - 12:00" }
  ],
  afternoon: [
    { doctor: "BS. Lê Googler", specialty: "Tim mạch", time: "13:30 - 17:30" }
  ],
  evening: [
    { doctor: "BS. Thánh Bùng Lịch", specialty: "Răng Hàm Mặt", time: "18:00 - 20:00" }
  ]
};

export default function ManagerSchedule() {
  const [shifts, setShifts] = useState(initialShifts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({ session: "morning", doctor: "BS. Nguyễn Văn A", specialty: "Nội tổng hợp", time: "08:00 - 12:00" });

  const handleAddShift = () => {
    setShifts(prev => ({
      ...prev,
      [newShift.session]: [...(prev as any)[newShift.session], {
        doctor: newShift.doctor,
        specialty: newShift.specialty,
        time: newShift.time
      }]
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Thiết lập khung giờ làm việc</h1>
          <p className="text-gray-500 mt-1">Phân bổ ca trực và thời gian làm việc của bác sĩ</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-gray-200">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            15/05 - 21/05, 2026
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20">
            <Plus className="h-4 w-4 mr-2" />
            Thêm ca trực
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="font-semibold text-gray-800 text-lg">Tuần này</h2>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">Ca Sáng</div>
            <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">Ca Chiều</div>
            <div className="flex items-center gap-1.5 text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg">Ca Tối</div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 min-w-[800px] overflow-x-auto">
          {weekDays.map((day, idx) => (
            <div key={idx} className={`border-r border-gray-100 last:border-0 ${day.isToday ? 'bg-blue-50/30' : ''}`}>
              {/* Day Header */}
              <div className={`p-4 border-b border-gray-100 text-center ${day.isToday ? 'border-blue-200' : ''}`}>
                <p className={`text-sm font-medium ${day.isToday ? 'text-blue-600' : 'text-gray-500'}`}>{day.name}</p>
                <p className={`text-xl font-bold mt-1 ${day.isToday ? 'text-blue-700' : 'text-gray-900'}`}>
                  {day.isToday && <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2 mb-1"></span>}
                  {day.date.split('/')[0]}
                </p>
              </div>

              {/* Shifts Body */}
              <div className="p-3 space-y-4 min-h-[400px]">
                {/* Morning */}
                <div className="space-y-2">
                  {idx !== 6 && shifts.morning.map((shift, sIdx) => (
                    <div key={sIdx} className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 rounded-l-xl"></div>
                      <p className="text-xs font-semibold text-blue-600 mb-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {shift.time}
                      </p>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{shift.doctor}</p>
                      <p className="text-xs text-gray-500 mt-1">{shift.specialty}</p>
                    </div>
                  ))}
                  {idx !== 6 && (
                    <div 
                      onClick={() => { setNewShift({ ...newShift, session: "morning", time: "08:00 - 12:00" }); setIsModalOpen(true); }}
                      className="h-10 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 flex items-center justify-center text-blue-500 text-xs font-medium cursor-pointer hover:bg-blue-50 transition-colors opacity-0 hover:opacity-100"
                    >
                      + Thêm ca sáng
                    </div>
                  )}
                  {idx === 6 && (
                    <div className="h-20 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs">Nghỉ</div>
                  )}
                </div>

                {/* Afternoon */}
                <div className="space-y-2 pt-2 border-t border-gray-50">
                  {idx !== 6 && shifts.afternoon.map((shift, sIdx) => (
                    <div key={sIdx} className="bg-white border border-orange-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer">
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-400 rounded-l-xl"></div>
                      <p className="text-xs font-semibold text-orange-600 mb-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {shift.time}
                      </p>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{shift.doctor}</p>
                      <p className="text-xs text-gray-500 mt-1">{shift.specialty}</p>
                    </div>
                  ))}
                  {idx !== 6 && (
                    <div 
                      onClick={() => { setNewShift({ ...newShift, session: "afternoon", time: "13:30 - 17:30" }); setIsModalOpen(true); }}
                      className="h-10 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 flex items-center justify-center text-orange-500 text-xs font-medium cursor-pointer hover:bg-orange-50 transition-colors opacity-0 hover:opacity-100"
                    >
                      + Thêm ca chiều
                    </div>
                  )}
                </div>

                {/* Evening */}
                <div className="space-y-2 pt-2 border-t border-gray-50">
                  {(idx === 0 || idx === 2 || idx === 4) && shifts.evening.map((shift, sIdx) => (
                    <div key={sIdx} className="bg-white border border-purple-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer">
                      <div className="absolute top-0 left-0 w-1 h-full bg-purple-400 rounded-l-xl"></div>
                      <p className="text-xs font-semibold text-purple-600 mb-1.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {shift.time}
                      </p>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{shift.doctor}</p>
                      <p className="text-xs text-gray-500 mt-1">{shift.specialty}</p>
                    </div>
                  ))}
                  {(idx === 0 || idx === 2 || idx === 4) && (
                    <div 
                      onClick={() => { setNewShift({ ...newShift, session: "evening", time: "18:00 - 20:00" }); setIsModalOpen(true); }}
                      className="h-10 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/30 flex items-center justify-center text-purple-500 text-xs font-medium cursor-pointer hover:bg-purple-50 transition-colors opacity-0 hover:opacity-100"
                    >
                      + Thêm ca tối
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Add Shift */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
              <h3 className="font-bold text-xl text-gray-900">Phân công ca trực</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ phụ trách</label>
                <select 
                  value={newShift.doctor} onChange={e => setNewShift({...newShift, doctor: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="BS. Nguyễn Văn A">BS. Nguyễn Văn A</option>
                  <option value="BS. Lê Thị B">BS. Lê Thị B</option>
                  <option value="BS. Trần Minh C">BS. Trần Minh C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                <input 
                  type="text" value={newShift.specialty} onChange={e => setNewShift({...newShift, specialty: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buổi trực</label>
                  <select 
                    value={newShift.session} 
                    onChange={e => {
                      const session = e.target.value;
                      const time = session === "morning" ? "08:00 - 12:00" : session === "afternoon" ? "13:30 - 17:30" : "18:00 - 20:00";
                      setNewShift({...newShift, session, time});
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="morning">Ca Sáng</option>
                    <option value="afternoon">Ca Chiều</option>
                    <option value="evening">Ca Tối</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                  <input 
                    type="text" value={newShift.time} onChange={e => setNewShift({...newShift, time: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="rounded-xl">Hủy</Button>
              <Button onClick={handleAddShift} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Lưu ca trực</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
