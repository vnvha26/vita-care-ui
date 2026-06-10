import { useState } from "react";
import { Stethoscope, ClipboardList, BookOpen, Key, Bell, CheckCircle, Plus, Trash2, ArrowRight, UserCheck } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { toast } from "sonner";

type PatientQueue = {
  id: string;
  code: string;
  name: string;
  reason: string;
  age: number;
  gender: string;
};

type Medicine = {
  name: string;
  qty: string;
  dosage: string;
  instruction: string;
};

type Template = {
  id: string;
  title: string;
  diagnosis: string;
  medicines: Medicine[];
  instructions: string;
};

const initialQueue: PatientQueue[] = [
  { id: "q1", code: "P001", name: "Đỗ Minh Tú", reason: "Đau thượng vị cấp, ợ chua nhiều", age: 31, gender: "Nam" },
  { id: "q2", code: "P002", name: "Nguyễn Văn An", reason: "Kiểm tra đường huyết & chỉ số HbA1c", age: 45, gender: "Nam" },
  { id: "q3", code: "P003", name: "Trần Thị Bình", reason: "Huyết áp dao động kèm nhức đầu", age: 36, gender: "Nữ" }
];

const prescriptionTemplates: Template[] = [
  {
    id: "t1",
    title: "Viêm loét dạ dày - Trào ngược thực quản",
    diagnosis: "Viêm dạ dày trào ngược dịch vị / K21",
    medicines: [
      { name: "Nexium (Esomeprazole) 40mg", qty: "30 viên", dosage: "Uống 1 viên trước ăn sáng 30 phút", instruction: "Hạn chế đồ chua cay, chất kích thích." },
      { name: "Gaviscon Suspension", qty: "30 gói", dosage: "Uống 1 gói sau ăn 1 tiếng và trước khi đi ngủ", instruction: "Không uống nước ngay sau khi dùng." }
    ],
    instructions: "Ăn đúng giờ, không bỏ bữa, tránh lo lắng căng thẳng."
  },
  {
    id: "t2",
    title: "Tăng huyết áp vô căn",
    diagnosis: "Tăng huyết áp vô căn độ 1 / I10",
    medicines: [
      { name: "Amlodipine 5mg", qty: "30 viên", dosage: "Uống 1 viên vào lúc 8h sáng hàng ngày", instruction: "Đo huyết áp hàng ngày tại nhà." },
      { name: "Concor (Bisoprolol) 2.5mg", qty: "30 viên", dosage: "Uống 1 viên vào buổi sáng", instruction: "Theo dõi nhịp tim." }
    ],
    instructions: "Ăn nhạt (giảm muối), tăng cường tập thể dục nhẹ nhàng 30 phút mỗi ngày."
  },
  {
    id: "t3",
    title: "Đái tháo đường Type 2",
    diagnosis: "Đái tháo đường không phụ thuộc insulin / E11",
    medicines: [
      { name: "Glucophage (Metformin) 850mg", qty: "60 viên", dosage: "Uống 1 viên sau ăn sáng và 1 viên sau ăn tối", instruction: "Uống nhiều nước trong ngày." },
      { name: "Diamicron MR 60mg", qty: "30 viên", dosage: "Uống 1 viên vào đầu bữa ăn sáng", instruction: "Đo đường huyết đói định kỳ." }
    ],
    instructions: "Hạn chế tinh bột tinh chế, đồ ngọt, tăng rau xanh."
  }
];

export default function DoctorExamination() {
  const [queue, setQueue] = useState<PatientQueue[]>(initialQueue);
  const [activePatientId, setActivePatientId] = useState<string>("q1");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [instructions, setInstructions] = useState("");
  const [followUpDays, setFollowUpDays] = useState(14);
  const [autoSmsReminder, setAutoSmsReminder] = useState(true);

  // Digital Signature Modal
  const [showSignModal, setShowSignModal] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signedSuccess, setSignedSuccess] = useState(false);

  const activePatient = queue.find(p => p.id === activePatientId) || queue[0];

  const applyTemplate = (tpl: Template) => {
    setDiagnosis(tpl.diagnosis);
    setMedicines(tpl.medicines);
    setInstructions(tpl.instructions);
    toast.success(`Đã áp dụng mẫu đơn: ${tpl.title}`, {
      description: "Có thể chỉnh sửa thêm liều lượng và thuốc.",
    });
  };

  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      { name: "", qty: "", dosage: "", instruction: "" }
    ]);
  };

  const handleUpdateMedicine = (index: number, field: keyof Medicine, value: string) => {
    setMedicines(prev => prev.map((med, idx) => {
      if (idx === index) {
        return { ...med, [field]: value };
      }
      return med;
    }));
  };

  const handleRemoveMedicine = (index: number) => {
    setMedicines(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleDigitalSign = () => {
    if (!diagnosis.trim() || medicines.length === 0) {
      toast.error("Vui lòng chẩn đoán và kê ít nhất một loại thuốc trước khi ký số!");
      return;
    }
    setShowSignModal(true);
    setIsSigning(true);
    setSignedSuccess(false);

    // Simulate cryptographic signing
    setTimeout(() => {
      setIsSigning(false);
      setSignedSuccess(true);
      toast.success("Ký số đơn thuốc thành công!", {
        description: "Đơn thuốc đã được mã hóa bằng chứng thư số USB Token SHA-256.",
      });
    }, 2000);
  };

  const handleFinishExamination = () => {
    // Remove patient from queue
    setQueue(prev => prev.filter(p => p.id !== activePatientId));
    // Reset form
    setDiagnosis("");
    setMedicines([]);
    setInstructions("");
    setShowSignModal(false);
    
    if (queue.length > 1) {
      const nextP = queue.find(p => p.id !== activePatientId);
      if (nextP) setActivePatientId(nextP.id);
    } else {
      setActivePatientId("");
    }

    toast.success(`Đã hoàn thành ca khám cho ${activePatient.name}`, {
      description: `Đơn thuốc đã được phát hành và gửi tự động tới nhà thuốc phòng khám.`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý Khám bệnh & Kê đơn"
        description="Tiếp đón bệnh nhân đang chờ khám, áp dụng nhanh kho đơn thuốc mẫu, nhập đơn thuốc điện tử ký số và cấu hình dặn dò nhắc lịch."
      />

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        
        {/* LEFT PANEL: Current waiting queue */}
        <SectionCard title="Hàng chờ ca khám hiện tại" description="Chọn bệnh nhân tiếp theo để tiến hành khám lâm sàng.">
          <div className="space-y-3">
            {queue.length > 0 ? (
              queue.map((p) => {
                const isActive = activePatientId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePatientId(p.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? "border-[#2F80ED] bg-[#EAF3FF]/80 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-400">Ca chờ khám</span>
                      <StatusBadge tone="blue">Mã: {p.code}</StatusBadge>
                    </div>
                    <h3 className="mt-2 text-sm font-extrabold text-slate-800">{p.name}</h3>
                    <p className="mt-1 text-xs text-slate-400 font-bold">{p.age} tuổi · Giới tính {p.gender}</p>
                    <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">Lý do:</span> {p.reason}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm font-bold text-slate-400">
                Hôm nay đã hoàn thành hết các ca chờ khám!
              </div>
            )}
          </div>
        </SectionCard>

        {/* RIGHT PANEL: Examination & Prescription Form */}
        <div className="space-y-6">
          {activePatientId ? (
            <>
              {/* Patient Profile Summary banner */}
              <div className="rounded-[24px] border border-[#CFE3FF] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-white text-[#2F80ED] rounded-2xl flex items-center justify-center shadow-xs ring-1 ring-[#CFE3FF]">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg">Đang chẩn đoán: {activePatient.name}</h3>
                    <p className="text-xs font-bold text-slate-500">Mã bệnh nhân: {activePatient.code} | Giới tính: {activePatient.gender} | Tuổi: {activePatient.age}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/50 shadow-xs">
                  <UserCheck className="h-4 w-4 text-[#27C3A2]" />
                  Đang ghi nhận chẩn đoán y tế
                </div>
              </div>

              {/* Template Repository */}
              <SectionCard 
                title="Kho đơn thuốc mẫu (Templates)" 
                description="Chọn nhanh phác đồ mẫu để điền tự động chẩn đoán và đơn thuốc tương ứng."
                actions={<BookOpen className="h-5 w-5 text-blue-500" />}
              >
                <div className="flex flex-wrap gap-2.5">
                  {prescriptionTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => applyTemplate(tpl)}
                      className="rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 px-4 py-2.5 text-xs font-extrabold text-slate-700 transition shadow-xs text-left"
                    >
                      {tpl.title}
                    </button>
                  ))}
                </div>
              </SectionCard>

              {/* Clinical & Prescription Form */}
              <SectionCard title="Giao diện kê đơn & chẩn đoán lâm sàng">
                <div className="space-y-4">
                  {/* Diagnosis */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-450 block">Chẩn đoán xác định bệnh (Mã ICD-10)</label>
                    <input
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Ví dụ: Viêm dạ dày trào ngược dịch vị / K21"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Medicines table */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-extrabold uppercase text-slate-450">Danh mục thuốc điều trị</label>
                      <button
                        type="button"
                        onClick={handleAddMedicine}
                        className="text-xs font-extrabold text-blue-600 flex items-center gap-1 hover:underline"
                      >
                        <Plus className="h-3.5 w-3.5" /> Thêm thuốc
                      </button>
                    </div>

                    <div className="space-y-3">
                      {medicines.map((med, idx) => (
                        <div key={idx} className="grid gap-3 sm:grid-cols-[1.5fr_0.8fr_2fr_1.5fr_auto] items-end rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                          <div>
                            <span className="text-[10px] font-black text-slate-400 block mb-1">TÊN THUỐC</span>
                            <input
                              value={med.name}
                              onChange={(e) => handleUpdateMedicine(idx, "name", e.target.value)}
                              placeholder="Nexium 40mg..."
                              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-800"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-slate-400 block mb-1">SỐ LƯỢNG</span>
                            <input
                              value={med.qty}
                              onChange={(e) => handleUpdateMedicine(idx, "qty", e.target.value)}
                              placeholder="30 viên..."
                              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-800"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-slate-400 block mb-1">LIỀU DÙNG (CÁCH DÙNG)</span>
                            <input
                              value={med.dosage}
                              onChange={(e) => handleUpdateMedicine(idx, "dosage", e.target.value)}
                              placeholder="Uống 1 viên trước ăn sáng..."
                              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-black text-slate-400 block mb-1">GHI CHÚ HƯỚNG DẪN</span>
                            <input
                              value={med.instruction}
                              onChange={(e) => handleUpdateMedicine(idx, "instruction", e.target.value)}
                              placeholder="Kiêng rượu bia..."
                              className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-850"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMedicine(idx)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 mb-[1px]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {medicines.length === 0 && (
                        <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs font-bold text-slate-400">
                          Chưa có thuốc nào trong đơn. Ấn "Thêm thuốc" hoặc chọn "Đơn thuốc mẫu" phía trên.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor Notes / Auto instructions */}
                  <div>
                    <label className="text-xs font-extrabold uppercase text-slate-450 block">Lời dặn bác sĩ</label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Lời dặn chi tiết về chế độ dinh dưỡng, vận động..."
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 placeholder:text-slate-450 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Auto instruction and scheduling setup */}
              <SectionCard title="Cấu hình tự động dặn dò & Nhắc lịch khám">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase text-slate-450 block">Nhắc lịch tái khám tự động (ngày)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="3"
                        max="60"
                        value={followUpDays}
                        onChange={(e) => setFollowUpDays(Number(e.target.value))}
                        className="flex-1 accent-blue-600"
                      />
                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                        Sau {followUpDays} ngày
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">Tự động dặn dò qua Zalo/SMS</p>
                      <p className="text-[10px] font-bold text-slate-400">Hệ thống nhắc giờ uống thuốc hàng ngày</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoSmsReminder(!autoSmsReminder)}
                      className={`h-6 w-11 rounded-full p-0.5 transition-all duration-300 ${
                        autoSmsReminder ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                        autoSmsReminder ? "translate-x-5" : ""
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5 flex justify-end gap-3">
                  <ActionButton onClick={handleDigitalSign} icon={<Key className="h-4 w-4" />}>
                    Ký số & Phát hành đơn thuốc
                  </ActionButton>
                </div>
              </SectionCard>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-400 bg-white">
              Vui lòng chọn một bệnh nhân ở hàng chờ bên trái để bắt đầu khám bệnh.
            </div>
          )}
        </div>
      </div>

      {/* Digital Signature Cryptography Simulation Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              {isSigning ? (
                <>
                  <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" />
                  <h3 className="text-lg font-black text-slate-800">Đang khởi tạo chữ ký số điện tử...</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Đang thiết lập kết nối mã hóa bảo mật với chứng thư số Quốc gia VNPT-CA. Vui lòng giữ thiết bị kết nối.
                  </p>
                </>
              ) : (
                <>
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="h-9 w-9" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800">Ký số đơn thuốc hoàn tất!</h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Bệnh án và đơn thuốc điện tử đã được ký đóng dấu bảo mật điện tử thành công. Mã Hash: <span className="font-mono text-blue-600">SHA256:d81e3a9f02c...</span>
                  </p>
                  
                  <div className="mt-6 border-t border-slate-100 pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleFinishExamination}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-[#27C3A2] px-6 text-sm font-extrabold text-white shadow-md hover:scale-[1.01] hover:shadow-lg transition cursor-pointer"
                    >
                      Hoàn thành ca khám và Phát hành đơn
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
