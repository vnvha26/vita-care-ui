import { useState } from "react";
import { Calendar, Clock, AlertTriangle, Filter, Ban, RefreshCw, Star, Info, Search, CheckCircle } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { toast } from "sonner";

type Appointment = {
  id: string;
  time: string;
  patientName: string;
  patientCode: string;
  isLoyal: boolean;
  reason: string;
  status: "Chờ khám" | "Đã xác nhận" | "Tái khám" | "Đã hủy" | "Đã đổi lịch";
  phone: string;
  selfMedHistory?: { date: string; drug: string; note: string }[];
  selfMedWarning?: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "a001",
    time: "09:00 - 09:30",
    patientName: "Đỗ Minh Tú",
    patientCode: "P001",
    isLoyal: true,
    reason: "Đau thượng vị cấp, ợ chua liên tục",
    status: "Chờ khám",
    phone: "0987654321",
    selfMedHistory: [
      { date: "15-05-2026", drug: "Nexium (Esomeprazole) 40mg", note: "Tự mua uống khi đau bụng dữ dội" },
      { date: "10-04-2026", drug: "Maalox", note: "Uống sau khi ăn đồ chua cay" }
    ],
    selfMedWarning: "Lạm dụng Esomeprazole tự mua có thể làm lu mờ triệu chứng viêm loét dạ dày tiến triển hoặc K dạ dày."
  },
  {
    id: "a002",
    time: "10:30 - 11:00",
    patientName: "Nguyễn Văn An",
    patientCode: "P002",
    isLoyal: true,
    reason: "Kiểm tra chỉ số đường huyết tuần tự",
    status: "Tái khám",
    phone: "0901234567",
    selfMedHistory: [
      { date: "28-05-2026", drug: "Glucophage (Metformin) 850mg", note: "Tự ý tăng liều từ 500mg lên 850mg vì thấy đường huyết cao" }
    ],
    selfMedWarning: "Tự ý thay đổi liều dùng Metformin mà không xét nghiệm chức năng thận định kỳ làm tăng nguy cơ nhiễm toan acid lactic cực kỳ nguy hiểm."
  },
  {
    id: "a003",
    time: "11:15 - 11:45",
    patientName: "Phạm Thị Lan",
    patientCode: "P004",
    isLoyal: false,
    reason: "Đau họng, ho khan kéo dài 4 ngày",
    status: "Đã xác nhận",
    phone: "0911222333"
  },
  {
    id: "a004",
    time: "13:30 - 14:00",
    patientName: "Lê Minh Châu",
    patientCode: "P005",
    isLoyal: false,
    reason: "Mất ngủ kéo dài, căng thẳng thần kinh",
    status: "Chờ khám",
    phone: "0933445566"
  },
  {
    id: "a005",
    time: "14:30 - 15:00",
    patientName: "Trần Thị Bình",
    patientCode: "P003",
    isLoyal: true,
    reason: "Huyết áp bất ổn định kèm nhức đầu",
    status: "Đã xác nhận",
    phone: "0909876543",
    selfMedHistory: [
      { date: "02-06-2026", drug: "Amlodipine 5mg", note: "Mượn thuốc huyết áp của hàng xóm uống khi thấy đau đầu" }
    ],
    selfMedWarning: "Tự mua và dùng thuốc hạ áp vô tội vạ mà không đo huyết áp kiểm chứng có thể gây hạ huyết áp tư thế đứng nguy hại."
  }
];

export default function DoctorAppointments() {
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(initialAppointments);
  const [filterLoyalOnly, setFilterLoyalOnly] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>("a001");
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  
  // Reschedule state
  const [newTime, setNewTime] = useState("09:30 - 10:00");
  // Cancel state
  const [cancelReason, setCancelReason] = useState("");

  const selectedAppointment = appointmentsList.find(a => a.id === selectedPatientId);

  const filteredAppointments = appointmentsList.filter(a => {
    if (filterLoyalOnly && !a.isLoyal) return false;
    return true;
  });

  const handleReschedule = (id: string) => {
    setAppointmentsList(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, time: newTime, status: "Đã đổi lịch" };
      }
      return a;
    }));
    setShowRescheduleModal(null);
    toast.success("Đổi giờ hẹn thành công sang " + newTime, {
      description: "Bệnh nhân đã nhận được thông báo SMS tự động.",
    });
  };

  const handleCancel = (id: string) => {
    setAppointmentsList(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: "Đã hủy" };
      }
      return a;
    }));
    setShowCancelModal(null);
    toast.error("Đã hủy lịch khám", {
      description: `Lý do: ${cancelReason || "Theo yêu cầu hệ thống"}`,
    });
    setCancelReason("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý lịch hẹn bệnh nhân"
        description="Theo dõi danh sách đặt lịch trong ngày, rà soát lịch sử sử dụng thuốc tự phát của bệnh nhân thân thiết và quản lý thay đổi thời gian khám."
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        
        {/* LEFT COLUMN: List & Filters */}
        <SectionCard 
          title="Danh sách lịch hẹn trong ngày" 
          description="Click chọn một bệnh nhân để xem chi tiết tiền sử và cảnh báo liên quan."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFilterLoyalOnly(!filterLoyalOnly)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold border transition-all ${
                  filterLoyalOnly 
                    ? "bg-[#FFF7E8] text-[#C77805] border-[#FDE7B8] shadow-sm"
                    : "bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                Bộ lọc: Bệnh nhân thân thiết
              </button>
            </div>
          }
        >
          <div className="space-y-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app) => {
                const isSelected = selectedPatientId === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedPatientId(app.id)}
                    className={`group relative flex flex-col gap-4 rounded-2xl border p-4 transition-all duration-200 cursor-pointer md:flex-row md:items-center ${
                      isSelected 
                        ? "border-[#2F80ED] bg-[#EAF3FF]/80 shadow-md shadow-blue-500/5"
                        : "border-[#E2E8F0] bg-white hover:border-slate-350 hover:bg-[#F2F7FB]/50"
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] shadow-sm ring-1 ring-[#CFE3FF]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold text-[#1E293B]">{app.time}</span>
                        <StatusBadge tone={
                          app.status === "Chờ khám" ? "amber" :
                          app.status === "Đã xác nhận" ? "green" :
                          app.status === "Tái khám" ? "violet" :
                          app.status === "Đã đổi lịch" ? "blue" : "rose"
                        }>
                          {app.status}
                        </StatusBadge>
                        {app.isLoyal && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF3FF] px-2 py-0.5 text-[10px] font-black text-blue-600 ring-1 ring-[#CFE3FF]">
                            <Star className="h-2.5 w-2.5 fill-blue-600" /> THÂN THIẾT
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-extrabold text-[#2D4A86]">
                        {app.patientName} <span className="text-[#94A3B8] font-bold">· {app.patientCode}</span>
                      </p>
                      <p className="mt-1 text-xs text-[#64748B] font-medium truncate">{app.reason}</p>
                    </div>

                    {/* Reschedule & Cancel actions */}
                    {app.status !== "Đã hủy" && (
                      <div className="flex items-center gap-2 self-end md:self-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowRescheduleModal(app.id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                          title="Đổi giờ hẹn"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCancelModal(app.id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                          title="Hủy hẹn"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm font-bold text-slate-400">
                Không tìm thấy lịch hẹn phù hợp.
              </div>
            )}
          </div>
        </SectionCard>

        {/* RIGHT COLUMN: Detail and self-medication warnings */}
        <div className="space-y-6">
          <SectionCard title="Chi tiết Lịch hẹn & Sinh hiệu">
            {selectedAppointment ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                      {selectedAppointment.patientName.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#1E293B] text-base">{selectedAppointment.patientName}</h3>
                      <p className="text-xs font-bold text-slate-400">Mã bệnh nhân: {selectedAppointment.patientCode} | SĐT: {selectedAppointment.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-800">Lý do khám:</span> {selectedAppointment.reason}
                  </div>
                </div>

                {/* Loyal patient section with self-medication details */}
                {selectedAppointment.isLoyal ? (
                  <div className="space-y-4">
                    {/* Warning card */}
                    {selectedAppointment.selfMedWarning && (
                      <div className="rounded-2xl border border-[#FDE7B8] bg-[#FFF7E8]/80 p-4 shadow-sm animate-pulse-subtle">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">Cảnh báo thói quen tự mua thuốc</h4>
                            <p className="mt-1 text-xs font-semibold leading-relaxed text-amber-700">
                              {selectedAppointment.selfMedWarning}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Drug history */}
                    {selectedAppointment.selfMedHistory && selectedAppointment.selfMedHistory.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-extrabold text-slate-650 flex items-center gap-1.5 uppercase tracking-wide">
                          <Info className="h-3.5 w-3.5 text-blue-500" />
                          Lịch sử dùng thuốc tự phát
                        </h4>
                        <div className="space-y-2">
                          {selectedAppointment.selfMedHistory.map((history, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                <span>Thời gian tự uống: {history.date}</span>
                                <span className="rounded bg-rose-50 px-1.5 py-0.5 font-bold text-rose-600 ring-1 ring-rose-100">Tự kê đơn</span>
                              </div>
                              <p className="mt-1.5 text-xs font-extrabold text-slate-800">{history.drug}</p>
                              <p className="mt-1 text-xs font-medium text-slate-500 leading-normal">
                                <span className="font-semibold text-slate-700">Ghi chú lâm sàng:</span> "{history.note}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                    <Info className="h-8 w-8 text-slate-350 mx-auto" />
                    <p className="mt-2 text-xs font-bold text-slate-400 leading-relaxed">
                      Bệnh nhân vãng lai hoặc chưa có hồ sơ theo dõi đặc biệt tại hệ thống.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-sm font-bold text-slate-450">
                Vui lòng chọn lịch hẹn bên trái để xem chi tiết.
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      {/* Modal: Reschedule */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              Công cụ đổi giờ khám
            </h3>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Điều chỉnh khung giờ khám bệnh. Hệ thống tự động đồng bộ ứng dụng và gửi tin nhắn SMS báo bệnh nhân.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-extrabold uppercase text-slate-400">Khung giờ mới</label>
                <select 
                  value={newTime} 
                  onChange={(e) => setNewTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="09:30 - 10:00">09:30 - 10:00 (Khả dụng)</option>
                  <option value="10:00 - 10:30">10:00 - 10:30 (Khả dụng)</option>
                  <option value="11:45 - 12:15">11:45 - 12:15 (Khả dụng)</option>
                  <option value="15:00 - 15:30">15:00 - 15:30 (Khả dụng)</option>
                  <option value="16:00 - 16:30">16:00 - 16:30 (Khả dụng)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <ActionButton variant="secondary" onClick={() => setShowRescheduleModal(null)}>Hủy bỏ</ActionButton>
              <ActionButton onClick={() => handleReschedule(showRescheduleModal)}>Lưu thay đổi</ActionButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cancel Appointment */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-rose-700 flex items-center gap-2">
              <Ban className="h-5 w-5 text-rose-600" />
              Công cụ hủy lịch hẹn
            </h3>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Hủy bỏ lịch hẹn này của bệnh nhân. Vui lòng nhập lý do hủy chi tiết.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-extrabold uppercase text-slate-400">Lý do hủy lịch</label>
                <textarea
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Bác sĩ bận lịch phẫu thuật đột xuất, Bệnh nhân xin dời sang ngày khác..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <ActionButton variant="secondary" onClick={() => setShowCancelModal(null)}>Hủy bỏ</ActionButton>
              <button
                type="button"
                onClick={() => handleCancel(showCancelModal)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition bg-rose-600 text-white hover:bg-rose-700"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
