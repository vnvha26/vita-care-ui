import { useState, useEffect } from "react";
import { Activity, ShieldAlert, Users, Network, TrendingUp, AlertOctagon, HelpCircle, Map, Zap, Check, ArrowRight } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";
import { toast } from "sonner";

type BranchStatus = {
  id: string;
  name: string;
  loadPercentage: number;
  waitingPatients: number;
  activeDoctors: number;
  status: "Bình thường" | "Cảnh báo" | "Quá tải";
};

type DepartmentLoad = {
  name: string;
  doctors: { name: string; status: "Đang khám" | "Sẵn sàng" | "Nghỉ ca" }[];
};

export default function DoctorOperational() {
  // Simulate active branches
  const [branches, setBranches] = useState<BranchStatus[]>([
    { id: "b1", name: "VitaCare Ba Đình", loadPercentage: 92, waitingPatients: 45, activeDoctors: 6, status: "Quá tải" },
    { id: "b2", name: "VitaCare Cầu Giấy", loadPercentage: 65, waitingPatients: 18, activeDoctors: 8, status: "Bình thường" },
    { id: "b3", name: "VitaCare Quận 7 (TP.HCM)", loadPercentage: 88, waitingPatients: 37, activeDoctors: 5, status: "Cảnh báo" },
    { id: "b4", name: "VitaCare Hoàn Kiếm", loadPercentage: 40, waitingPatients: 7, activeDoctors: 4, status: "Bình thường" }
  ]);

  // Doctor roster by department
  const [departments, setDepartments] = useState<Record<string, DepartmentLoad>>({
    "Nội Tổng Quát": {
      name: "Nội Tổng Quát",
      doctors: [
        { name: "BS. Nguyễn Văn A", status: "Đang khám" },
        { name: "BS. Hoàng Gia Hân", status: "Sẵn sàng" },
        { name: "BS. Trần Văn Hùng", status: "Nghỉ ca" }
      ]
    },
    "Nhi Khoa": {
      name: "Nhi Khoa",
      doctors: [
        { name: "BS. Phạm Thị Lan", status: "Đang khám" },
        { name: "BS. Vũ Hoàng Nam", status: "Sẵn sàng" }
      ]
    },
    "Tim Mạch": {
      name: "Tim Mạch",
      doctors: [
        { name: "BS. Nguyễn Thị Lan", status: "Đang khám" },
        { name: "BS. Đỗ Minh Tú", status: "Sẵn sàng" }
      ]
    }
  });

  const [selectedBranch, setSelectedBranch] = useState<string>("b1");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("BS. Hoàng Gia Hân");
  const [selectedDept, setSelectedDept] = useState<string>("Nội Tổng Quát");
  const [targetBranch, setTargetBranch] = useState<string>("b1");
  const [isRotating, setIsRotating] = useState(false);

  // Periodically fluctuate load for real-time dashboard feeling
  useEffect(() => {
    const timer = setInterval(() => {
      setBranches(prev => prev.map(b => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const nextLoad = Math.max(20, Math.min(100, b.loadPercentage + change));
        const nextWaiting = Math.max(0, b.waitingPatients + (change > 0 ? 1 : -1));
        
        let nextStatus: BranchStatus["status"] = "Bình thường";
        if (nextLoad >= 90) nextStatus = "Quá tải";
        else if (nextLoad >= 80) nextStatus = "Cảnh báo";

        return {
          ...b,
          loadPercentage: nextLoad,
          waitingPatients: nextWaiting,
          status: nextStatus
        };
      }));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleRotation = () => {
    if (!selectedDoctor) return;
    setIsRotating(true);
    
    setTimeout(() => {
      // 1. Move doctor out of current department list
      setDepartments(prev => {
        const updated = { ...prev };
        updated[selectedDept].doctors = updated[selectedDept].doctors.filter(d => d.name !== selectedDoctor);
        return updated;
      });

      // 2. Reduce target branch load percentage
      setBranches(prev => prev.map(b => {
        if (b.id === targetBranch) {
          const nextLoad = Math.max(40, b.loadPercentage - 15);
          const nextStatus = nextLoad >= 90 ? "Quá tải" : nextLoad >= 80 ? "Cảnh báo" : "Bình thường";
          return {
            ...b,
            loadPercentage: nextLoad,
            activeDoctors: b.activeDoctors + 1,
            waitingPatients: Math.max(0, b.waitingPatients - 5),
            status: nextStatus
          };
        }
        return b;
      }));

      setIsRotating(false);
      toast.success("Luân chuyển nhân sự thông minh thành công!", {
        description: `Đã luân chuyển ${selectedDoctor} về chi nhánh mục tiêu để giải tỏa quá tải.`,
      });
    }, 1200);
  };

  const currentOverloaded = branches.filter(b => b.status === "Quá tải");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Giám sát & Điều phối vận hành"
        description="Theo dõi lưu lượng bệnh nhân trực tiếp toàn hệ thống và điều chuyển bác sĩ hỗ trợ các điểm nóng quá tải."
      />

      {/* Real-time stats row */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng ca khám hiện tại" value="107" helper="Cập nhật 5s trước" tone="blue" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Thời gian chờ trung bình" value="22 phút" helper="Tăng 4p so với hôm qua" tone="amber" icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard 
          label="Chi nhánh quá tải" 
          value={`${currentOverloaded.length}`} 
          helper={currentOverloaded.length > 0 ? "Cần điều phối khẩn cấp" : "Hệ thống ổn định"} 
          tone={currentOverloaded.length > 0 ? "rose" : "green"} 
          icon={<ShieldAlert className="h-5 w-5" />} 
        />
        <StatCard label="Hiệu suất điều động AI" value="94%" helper="Khuyến nghị tự động" tone="violet" icon={<Network className="h-5 w-5" />} />
      </div>

      {/* Overload Alarm Center & Resource Allocator Map */}
      <div className="grid gap-6 xl:grid-cols-1.2fr_0.8fr">
        
        {/* Branch Alarm Dashboard */}
        <SectionCard 
          title="Trung tâm báo động quá tải chi nhánh" 
          description="Hệ thống tự động phát tín hiệu báo động khi lưu lượng phòng chờ vượt quá 90% công suất hoạt động."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {branches.map((b) => {
              const isOverloaded = b.status === "Quá tải";
              const isWarning = b.status === "Cảnh báo";
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBranch(b.id)}
                  className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 cursor-pointer ${
                    selectedBranch === b.id 
                      ? "border-blue-500 bg-blue-50/20 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  } ${isOverloaded ? "ring-2 ring-rose-500/50 shadow-lg shadow-rose-500/5" : ""}`}
                >
                  {/* Alarm pulsing top light */}
                  {isOverloaded && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-600 to-rose-500 animate-pulse" />
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#1E293B] text-sm md:text-base">{b.name}</h3>
                    <StatusBadge tone={isOverloaded ? "rose" : isWarning ? "amber" : "green"}>
                      {b.status === "Quá tải" ? "BÁO ĐỘNG" : b.status === "Cảnh báo" ? "CẢNH BÁO" : "ỔN ĐỊNH"}
                    </StatusBadge>
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Load bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>Hiệu suất phòng khám</span>
                        <span className={isOverloaded ? "text-rose-600" : isWarning ? "text-amber-600" : "text-emerald-600"}>
                          {b.loadPercentage}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isOverloaded ? "bg-rose-500 animate-pulse" : isWarning ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${b.loadPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats inside branch card */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="rounded-xl bg-slate-50 p-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Hàng chờ đợi</p>
                        <p className="mt-1 text-sm font-extrabold text-slate-800">{b.waitingPatients} ca</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Bác sĩ trực</p>
                        <p className="mt-1 text-sm font-extrabold text-slate-800">{b.activeDoctors} BS</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Doctor Resource Allocation Map */}
        <SectionCard 
          title="Bản đồ phân bổ nguồn lực bác sĩ" 
          description="Danh sách các khoa phòng ban chuyên môn hiện tại và bác sĩ trực hỗ trợ."
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-blue-50/50 p-3 border border-blue-100 text-xs font-bold text-blue-800 flex items-center gap-2">
              <Map className="h-4 w-4" /> Bác sĩ ở trạng thái "Sẵn sàng" có thể điều chuyển ngay.
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {Object.values(departments).map((dept) => (
                <div key={dept.name} className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <h4 className="text-xs font-black text-slate-700 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                    <span>KHOA: {dept.name}</span>
                    <span className="text-[10px] font-bold text-slate-400">{dept.doctors.length} bác sĩ</span>
                  </h4>
                  <div className="mt-2 space-y-2">
                    {dept.doctors.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-800">{doc.name}</span>
                        <StatusBadge tone={doc.status === "Sẵn sàng" ? "green" : doc.status === "Đang khám" ? "blue" : "slate"}>
                          {doc.status}
                        </StatusBadge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Smart Rotation Tools */}
      <SectionCard 
        title="Công cụ luân chuyển nhân sự thông minh" 
        description="Bảng điều phối khẩn cấp ứng dụng AI khuyến nghị tự động điểm đi và điểm đến."
      >
        <div className="grid gap-6 md:grid-cols-3 items-end">
          {/* Select Doctor to Rotate */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-slate-450 block">1. Chọn bác sĩ sẵn sàng</label>
            <div className="flex flex-col gap-2">
              <select 
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  const firstDoc = departments[e.target.value].doctors.find(d => d.status === "Sẵn sàng")?.name || "";
                  setSelectedDoctor(firstDoc);
                }}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 focus:outline-none"
              >
                {Object.keys(departments).map(k => (
                  <option key={k} value={k}>Khoa {k}</option>
                ))}
              </select>
              <select 
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 focus:outline-none"
              >
                {departments[selectedDept].doctors.filter(d => d.status === "Sẵn sàng").map(d => (
                  <option key={d.name} value={d.name}>{d.name} (Khả dụng)</option>
                ))}
                {departments[selectedDept].doctors.filter(d => d.status === "Sẵn sàng").length === 0 && (
                  <option value="">Không có BS khả dụng</option>
                )}
              </select>
            </div>
          </div>

          {/* Action transfer arrow indicator */}
          <div className="flex flex-col items-center justify-center p-3 text-slate-400">
            <span className="text-[10px] font-black tracking-widest text-[#27C3A2] uppercase flex items-center gap-1 mb-1">
              <Zap className="h-3 w-3 fill-current animate-bounce" /> Đề xuất bởi AI
            </span>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="block text-xs font-bold text-slate-600">Điểm đi</span>
                <span className="text-[10px] font-medium text-slate-400">Khoa {selectedDept}</span>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />
              <div className="text-center">
                <span className="block text-xs font-bold text-slate-600">Điểm đến</span>
                <span className="text-[10px] font-medium text-slate-400">{branches.find(b => b.id === targetBranch)?.name}</span>
              </div>
            </div>
          </div>

          {/* Target Branch selection & Dispatch trigger */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase text-slate-450 block">2. Chi nhánh nhận điều động</label>
            <div className="flex gap-2">
              <select 
                value={targetBranch}
                onChange={(e) => setTargetBranch(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-800 focus:outline-none"
              >
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.loadPercentage}%)</option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleRotation}
                disabled={isRotating || !selectedDoctor}
                className="rounded-xl bg-[#2F80ED] hover:bg-[#1C64D1] text-white px-5 text-xs font-bold flex items-center gap-2 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isRotating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Kích hoạt
              </button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
