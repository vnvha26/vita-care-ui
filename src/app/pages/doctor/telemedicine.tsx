import { useState, useEffect } from "react";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Check, X, Clipboard, Activity, Image as ImageIcon, CheckCircle, ShieldAlert, Award, FileText } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { toast } from "sonner";

type TelemedAppointment = {
  id: string;
  patientName: string;
  patientCode: string;
  time: string;
  reason: string;
  status: "Chờ duyệt" | "Đã duyệt" | "Đang gọi" | "Hoàn thành";
  vitals: { temp: string; bp: string; spo2: string; hr: string };
  injuryImage: string;
  verification: {
    insuranceValid: boolean | null;
    identityVerified: boolean | null;
    symptomMatch: boolean | null;
  };
};

const initialTelemeds: TelemedAppointment[] = [
  {
    id: "t001",
    patientName: "Phạm Thị Lan",
    patientCode: "P004",
    time: "15:00 - 15:30",
    reason: "Phát ban đỏ ngứa bất thường ở cánh tay kèm sốt nhẹ 37.8 độ",
    status: "Chờ duyệt",
    vitals: { temp: "37.8 °C", bp: "125/80 mmHg", spo2: "98%", hr: "88 bpm" },
    injuryImage: "/skin_rash.png",
    verification: {
      insuranceValid: null,
      identityVerified: null,
      symptomMatch: null
    }
  },
  {
    id: "t002",
    patientName: "Lê Minh Châu",
    patientCode: "P005",
    time: "16:00 - 16:30",
    reason: "Tư vấn kết quả điện tâm đồ và điều chỉnh thuốc an thần",
    status: "Chờ duyệt",
    vitals: { temp: "36.5 °C", bp: "118/75 mmHg", spo2: "99%", hr: "62 bpm" },
    injuryImage: "",
    verification: {
      insuranceValid: true,
      identityVerified: true,
      symptomMatch: true
    }
  }
];

export default function DoctorTelemedicine() {
  const [telemeds, setTelemeds] = useState<TelemedAppointment[]>(initialTelemeds);
  const [selectedId, setSelectedId] = useState<string>("t001");
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [medicalNotes, setMedicalNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const activeApp = telemeds.find(t => t.id === selectedId) || telemeds[0];

  // Video call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const formatDuration = (sec: number) => {
    const min = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${String(min).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
  };

  const handleVerify = (field: "insuranceValid" | "identityVerified" | "symptomMatch", value: boolean) => {
    setTelemeds(prev => prev.map(t => {
      if (t.id === selectedId) {
        return {
          ...t,
          verification: {
            ...t.verification,
            [field]: value
          }
        };
      }
      return t;
    }));
    toast.success("Cập nhật thẩm định đầu vào", {
      description: `Đã xác nhận ${field === "insuranceValid" ? "BHYT hợp lệ" : field === "identityVerified" ? "Định danh trùng khớp" : "Triệu chứng thống nhất"}`,
    });
  };

  const handleApproveAppointment = () => {
    setTelemeds(prev => prev.map(t => {
      if (t.id === selectedId) {
        return { ...t, status: "Đã duyệt" };
      }
      return t;
    }));
    toast.success("Phê duyệt ca hẹn thành công", {
      description: `Ca khám của ${activeApp.patientName} sẵn sàng bắt đầu kết nối.`,
    });
  };

  const handleStartCall = () => {
    if (activeApp.status === "Chờ duyệt") {
      toast.error("Vui lòng phê duyệt ca hẹn trước khi bắt đầu cuộc gọi!");
      return;
    }
    setCallActive(true);
    setTelemeds(prev => prev.map(t => {
      if (t.id === selectedId) {
        return { ...t, status: "Đang gọi" };
      }
      return t;
    }));
    toast.success("Đang kết nối cuộc gọi video y khoa...", {
      description: "Đường truyền bảo mật E2E đã được thiết lập.",
    });
  };

  const handleEndCall = () => {
    setCallActive(false);
    setTelemeds(prev => prev.map(t => {
      if (t.id === selectedId) {
        return { ...t, status: "Hoàn thành" };
      }
      return t;
    }));
    toast.error("Cuộc gọi đã kết thúc", {
      description: `Thời lượng cuộc gọi: ${formatDuration(callDuration)}`,
    });
  };

  const handleSaveNotes = () => {
    if (!medicalNotes.trim()) return;
    setSavedNotes(prev => [...prev, medicalNotes.trim()]);
    setMedicalNotes("");
    toast.success("Đã ghi chú trực tiếp vào bệnh án điện tử", {
      description: "Hồ sơ của bệnh nhân đã được đồng bộ tự động.",
    });
  };

  const allVerified = activeApp && activeApp.verification.insuranceValid && activeApp.verification.identityVerified && activeApp.verification.symptomMatch;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Phòng khám trực tuyến (Telemedicine)"
        description="Quản lý và thực hiện các ca khám từ xa qua nền tảng Video Call độ phân giải cao kết hợp bộ thẩm định dữ liệu đầu vào."
      />

      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        
        {/* LEFT COLUMN: Queue & Verification */}
        <div className="space-y-6">
          
          {/* Telemed Queue */}
          <SectionCard title="Danh sách ca hẹn chờ duyệt">
            <div className="space-y-3">
              {telemeds.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    if (!callActive) setSelectedId(t.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedId === t.id
                      ? "border-blue-500 bg-blue-50/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-350"
                  } ${callActive ? "pointer-events-none opacity-60" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#1E293B]">{t.time}</span>
                    <StatusBadge tone={
                      t.status === "Chờ duyệt" ? "amber" :
                      t.status === "Đã duyệt" ? "blue" :
                      t.status === "Đang gọi" ? "green" : "slate"
                    }>
                      {t.status}
                    </StatusBadge>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold text-[#2D4A86]">{t.patientName}</h3>
                  <p className="mt-1 text-xs text-slate-400 font-bold">Mã: {t.patientCode}</p>
                  <p className="mt-1 text-xs text-slate-500 font-medium line-clamp-2">Lý do: {t.reason}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Verification Suite */}
          <SectionCard title="Bộ thẩm định dữ liệu đầu vào">
            {activeApp ? (
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500">
                  Rà soát thông tin do AI kiểm tra & dữ liệu bệnh nhân tự khai trước khi duyệt khám:
                </p>

                <div className="space-y-3">
                  {/* Insurance validation */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-250 bg-slate-50/50">
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">Thẩm định Bảo hiểm Y tế</p>
                      <p className="text-[10px] font-bold text-slate-400">Đối chiếu mã số BHXH/BHYT</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleVerify("insuranceValid", true)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.insuranceValid === true ? "bg-emerald-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerify("insuranceValid", false)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.insuranceValid === false ? "bg-rose-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Identity verification */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-250 bg-slate-50/50">
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">Xác thực danh tính bệnh nhân</p>
                      <p className="text-[10px] font-bold text-slate-400">Nhận diện khuôn mặt eKYC</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleVerify("identityVerified", true)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.identityVerified === true ? "bg-emerald-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerify("identityVerified", false)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.identityVerified === false ? "bg-rose-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Symptom consistency */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-250 bg-slate-50/50">
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">Thống nhất triệu chứng lâm sàng</p>
                      <p className="text-[10px] font-bold text-slate-400">AI so khớp mô tả hội thoại</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleVerify("symptomMatch", true)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.symptomMatch === true ? "bg-emerald-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerify("symptomMatch", false)}
                        className={`h-7 w-7 rounded-lg flex items-center justify-center transition ${
                          activeApp.verification.symptomMatch === false ? "bg-rose-500 text-white" : "bg-white border border-slate-250 text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Approve Button */}
                {activeApp.status === "Chờ duyệt" && (
                  <button
                    type="button"
                    onClick={handleApproveAppointment}
                    disabled={!allVerified}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      allVerified
                        ? "bg-[#2F80ED] text-white hover:bg-[#1C64D1]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Phê duyệt ca hẹn (Duyệt ca khám)
                  </button>
                )}
              </div>
            ) : null}
          </SectionCard>
        </div>

        {/* RIGHT COLUMN: Video Call & Diagnostic Panel */}
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          
          {/* Main Video Screen */}
          <SectionCard 
            title={`Cuộc gọi khám từ xa: ${activeApp?.patientName}`} 
            description={callActive ? `Đang kết nối trực tiếp · ${formatDuration(callDuration)}` : "Đường truyền y khoa bảo mật cao (HIPAA Compliant)"}
          >
            <div className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden shadow-inner flex flex-col items-center justify-center">
              
              {callActive ? (
                <>
                  {/* Patient simulated stream (represents video call placeholder) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                    <div className="text-center space-y-3">
                      <div className="h-20 w-20 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-2xl font-black border border-blue-500/35 mx-auto animate-pulse">
                        {activeApp.patientName.split(" ").slice(-1)[0][0]}
                      </div>
                      <p className="text-white font-extrabold text-base">{activeApp.patientName}</p>
                      <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                        Đang truyền dữ liệu video 1080p
                      </p>
                    </div>
                  </div>

                  {/* Doctor local camera stream overlay */}
                  {cameraActive && (
                    <div className="absolute top-4 right-4 h-24 w-36 rounded-2xl bg-slate-800 border-2 border-white/20 shadow-md flex items-center justify-center overflow-hidden">
                      <div className="text-center text-[10px] text-white font-bold">Bác sĩ (Bạn)</div>
                    </div>
                  )}

                  {/* Control panel HUD */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 z-20">
                    <button
                      type="button"
                      onClick={() => setMicActive(!micActive)}
                      className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                        micActive ? "bg-white/10 text-white hover:bg-white/25" : "bg-rose-600 text-white hover:bg-rose-700"
                      }`}
                    >
                      {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraActive(!cameraActive)}
                      className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                        cameraActive ? "bg-white/10 text-white hover:bg-white/25" : "bg-rose-600 text-white hover:bg-rose-700"
                      }`}
                    >
                      {cameraActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleEndCall}
                      className="h-9 w-9 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-all"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4 p-6">
                  <div className="h-16 w-16 bg-blue-100/50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Video className="h-8 w-8" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-400">Cuộc gọi chưa được kích hoạt</h3>
                  <button
                    type="button"
                    onClick={handleStartCall}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] hover:shadow-lg px-6 text-sm font-extrabold text-white transition cursor-pointer"
                  >
                    Bắt đầu khám trực tuyến
                  </button>
                </div>
              )}
            </div>

            {/* Vitals overview self-declared */}
            <div className="mt-4">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                Chỉ số sinh hiệu tự khai (Patient Self-Declared Vitals)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Thân nhiệt</p>
                  <p className="mt-1 text-sm font-black text-[#EF6155]">{activeApp?.vitals.temp}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Huyết áp</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{activeApp?.vitals.bp}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Chỉ số SpO2</p>
                  <p className="mt-1 text-sm font-black text-emerald-600">{activeApp?.vitals.spo2}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Nhịp tim</p>
                  <p className="mt-1 text-sm font-black text-blue-600">{activeApp?.vitals.hr}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Injury photo & live notepad sidebar */}
          <div className="space-y-6">
            
            {/* Injury Image Viewer */}
            <SectionCard title="Hình ảnh tổn thương thực tế">
              {activeApp?.injuryImage ? (
                <div className="space-y-3">
                  <div className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 max-h-[170px] flex items-center justify-center shadow-xs">
                    <img 
                      src={activeApp.injuryImage} 
                      alt="Tổn thương da" 
                      className="object-cover w-full h-full max-h-[175px]" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[10px] font-extrabold bg-blue-600 px-3 py-1 rounded-full shadow">Xem toàn màn hình</span>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                    <span className="font-extrabold text-slate-705">Mô tả ảnh chụp:</span> Vùng da cánh tay phát ban đỏ dạng sần, ranh giới rõ, ngứa rát tăng khi tiếp xúc xà phòng.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-center">
                  <ImageIcon className="h-6 w-6 text-slate-300 mx-auto" />
                  <p className="mt-2 text-xs font-bold text-slate-400">Bệnh nhân không tải lên hình ảnh tổn thương.</p>
                </div>
              )}
            </SectionCard>

            {/* Live Medical Notes Panel */}
            <SectionCard title="Khung ghi chú y khoa trực tiếp">
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder="Ghi nhận triệu chứng lâm sàng phát ban dạng sần, kê đơn thuốc chống dị ứng Fexofenadine 180mg..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="w-full py-2 bg-[#2D4A86] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Lưu chẩn đoán nhanh
                </button>

                {savedNotes.length > 0 && (
                  <div className="mt-3 border-t border-slate-100 pt-3 space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Đã ghi chép:</p>
                    <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                      {savedNotes.map((note, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-2 text-[11px] font-medium text-slate-600 border border-slate-150 leading-relaxed">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

        </div>

      </div>
    </div>
  );
}
