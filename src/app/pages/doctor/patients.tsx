import { useState } from "react";
import { Search, FileText, Activity, AlertCircle, Clock, BarChart2, User, ChevronRight, HeartPulse, ShieldAlert } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import { Link } from "react-router";
import { patientRecords, type PatientRecord } from "./patient-data";

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("p001");
  const [activeTab, setActiveTab] = useState<"general" | "vitals" | "timeline" | "tests">("vitals");

  const filteredPatients = patientRecords.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPatient = patientRecords.find(p => p.id === selectedPatientId) || patientRecords[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trung tâm dữ liệu lâm sàng"
        description="Tra cứu thông minh hồ sơ y khoa tích hợp, rà soát cảnh báo sinh hiệu khẩn cấp, dòng thời gian bệnh lý và kết quả xét nghiệm."
      />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        
        {/* LEFT COLUMN: Smart Search & Patient List */}
        <SectionCard title="Tìm kiếm hồ sơ bệnh nhân">
          {/* Smart Search Bar */}
          <div className="relative flex h-11 w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-[#64748B] focus-within:ring-2 focus-within:ring-blue-500/10 mb-4 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-xs font-semibold outline-none text-slate-800 placeholder:text-slate-400" 
              placeholder="Nhập tên hoặc mã bệnh nhân (Ví dụ: P001)" 
            />
          </div>

          {/* Patient Directory */}
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => {
                const isSelected = selectedPatientId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#2F80ED] bg-[#EAF3FF]/80 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-800">{p.name}</h4>
                      <p className="mt-1 text-[10px] font-bold text-slate-400">Mã: {p.code} · {p.phone}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.vitals.isAbnormal && (
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" title="Sinh hiệu bất thường" />
                      )}
                      <ChevronRight className="h-4 w-4 text-slate-450" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs font-bold text-slate-400">
                Không tìm thấy bệnh nhân nào.
              </div>
            )}
          </div>
        </SectionCard>

        {/* RIGHT COLUMN: Blue Integrated Record Dashboard */}
        {selectedPatient ? (
          <div className="rounded-[24px] border border-blue-200 bg-gradient-to-b from-[#F2F7FB] to-white p-6 shadow-[0_14px_40px_rgba(37,99,235,0.04)] space-y-6">
            
            {/* Header / Info Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/10">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-800">{selectedPatient.name}</h2>
                  <p className="text-xs font-bold text-slate-400">Mã HS: {selectedPatient.code} | Nhóm máu: {selectedPatient.bloodType} | {selectedPatient.gender} · {selectedPatient.birthDate}</p>
                </div>
              </div>

              {/* Action route to detail */}
              <Link to={`/doctor/patients/${selectedPatient.id}`}>
                <ActionButton variant="secondary">Hồ sơ đầy đủ</ActionButton>
              </Link>
            </div>

            {/* Blue Dashboard Tab controls */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("vitals")}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 px-4 ${
                  activeTab === "vitals"
                    ? "border-blue-600 text-blue-650"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Sinh hiệu & Cảnh báo đỏ
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 px-4 ${
                  activeTab === "general"
                    ? "border-blue-600 text-blue-650"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Thông tin hành chính
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("timeline")}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 px-4 ${
                  activeTab === "timeline"
                    ? "border-blue-600 text-blue-650"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Dòng thời gian bệnh án
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tests")}
                className={`pb-3 text-xs font-extrabold transition-all border-b-2 px-4 ${
                  activeTab === "tests"
                    ? "border-blue-600 text-blue-650"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Kết quả xét nghiệm
              </button>
            </div>

            {/* Tab contents */}
            <div className="min-h-[250px] animate-in fade-in duration-200">
              
              {/* Tab 1: Vitals & Abnormal alerts */}
              {activeTab === "vitals" && (
                <div className="space-y-5">
                  {/* Red Alert card for abnormal vitals */}
                  {selectedPatient.vitals.isAbnormal && (
                    <div className="rounded-2xl border border-rose-250 bg-rose-50/50 p-4 shadow-sm flex items-start gap-3 border-l-4 border-l-rose-600">
                      <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0" />
                      <div>
                        <h4 className="text-xs font-black text-rose-700 uppercase tracking-wide">Cảnh báo đỏ sinh hiệu bất thường</h4>
                        <p className="mt-1 text-xs font-bold leading-relaxed text-rose-600">
                          Bệnh nhân ghi nhận chỉ số vượt ngưỡng an toàn lâm sàng (Huyết áp tâm thu &gt; 140 mmHg hoặc Thân nhiệt &gt; 38.5 °C). Yêu cầu bác sĩ rà soát kỹ đơn thuốc và chỉ định kiểm tra điện tâm đồ hoặc hạ sốt khẩn cấp.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Vitals grid */}
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className={`rounded-2xl border p-4 text-center bg-white ${Number(selectedPatient.vitals.temp.split(" ")[0]) >= 38.5 ? "border-rose-300 ring-2 ring-rose-500/10" : "border-slate-200"}`}>
                      <HeartPulse className="h-5 w-5 text-rose-500 mx-auto" />
                      <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase">Thân nhiệt</p>
                      <p className={`mt-1 text-sm font-black ${Number(selectedPatient.vitals.temp.split(" ")[0]) >= 38.5 ? "text-rose-600" : "text-slate-800"}`}>{selectedPatient.vitals.temp}</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center bg-white ${selectedPatient.vitals.bp.startsWith("14") || selectedPatient.vitals.bp.startsWith("15") ? "border-rose-300 ring-2 ring-rose-500/10" : "border-slate-200"}`}>
                      <Activity className="h-5 w-5 text-blue-500 mx-auto" />
                      <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase">Huyết áp</p>
                      <p className={`mt-1 text-sm font-black ${selectedPatient.vitals.bp.startsWith("14") || selectedPatient.vitals.bp.startsWith("15") ? "text-rose-600" : "text-slate-800"}`}>{selectedPatient.vitals.bp}</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center bg-white ${Number(selectedPatient.vitals.spo2.split("%")[0]) < 95 ? "border-rose-300 ring-2 ring-rose-500/10" : "border-slate-200"}`}>
                      <Activity className="h-5 w-5 text-emerald-500 mx-auto" />
                      <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase">Chỉ số SpO2</p>
                      <p className={`mt-1 text-sm font-black ${Number(selectedPatient.vitals.spo2.split("%")[0]) < 95 ? "text-rose-600" : "text-slate-800"}`}>{selectedPatient.vitals.spo2}</p>
                    </div>

                    <div className={`rounded-2xl border p-4 text-center bg-white ${Number(selectedPatient.vitals.hr.split(" ")[0]) > 100 ? "border-rose-300 ring-2 ring-rose-500/10" : "border-slate-200"}`}>
                      <Activity className="h-5 w-5 text-indigo-500 mx-auto" />
                      <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase">Nhịp tim</p>
                      <p className={`mt-1 text-sm font-black ${Number(selectedPatient.vitals.hr.split(" ")[0]) > 100 ? "text-rose-600" : "text-slate-800"}`}>{selectedPatient.vitals.hr}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: General Admin Information */}
              {activeTab === "general" && (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase">Bảo hiểm y tế</span>
                    <span className="mt-1 block text-xs font-bold text-slate-800">{selectedPatient.insurance}</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase">Số điện thoại</span>
                    <span className="mt-1 block text-xs font-bold text-slate-800">{selectedPatient.phone}</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase">Email liên hệ</span>
                    <span className="mt-1 block text-xs font-bold text-slate-800">{selectedPatient.email}</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase">Chiều cao / Cân nặng</span>
                    <span className="mt-1 block text-xs font-bold text-slate-800">{selectedPatient.height} / {selectedPatient.weight}</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                    <span className="text-[10px] font-black text-slate-400 block uppercase">Nhóm máu</span>
                    <span className="mt-1 block text-xs font-bold text-slate-800">Máu {selectedPatient.bloodType}</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Timeline bệnh án */}
              {activeTab === "timeline" && (
                <div className="relative border-l-2 border-blue-100 ml-3.5 pl-6 space-y-5">
                  {selectedPatient.history.map((h, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white shadow-sm">
                        <Clock className="h-2.5 w-2.5 text-white" />
                      </span>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#2F80ED]">{h.date}</span>
                          <span className="text-[10px] font-bold text-slate-400">BS. điều trị: {h.doctor}</span>
                        </div>
                        <h4 className="mt-1.5 text-xs font-extrabold text-slate-800">{h.diagnosis}</h4>
                        <p className="mt-1.5 text-xs font-medium text-slate-500 leading-relaxed">
                          <span className="font-bold text-slate-705">Ghi chú điều trị:</span> "{h.notes}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Lab Test results */}
              {activeTab === "tests" && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead className="bg-slate-50 text-slate-550 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-2.5 font-bold">Loại xét nghiệm</th>
                          <th className="px-4 py-2.5 font-bold">Kết quả phân tích</th>
                          <th className="px-4 py-2.5 font-bold">Khoảng tham chiếu chuẩn</th>
                          <th className="px-4 py-2.5 text-right font-bold">Đánh giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPatient.tests.map((t, index) => (
                          <tr key={index} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-4 py-3 font-bold text-slate-800">{t.name}</td>
                            <td className="px-4 py-3 font-extrabold text-blue-650">{t.result}</td>
                            <td className="px-4 py-3 font-medium text-slate-500">{t.normalRange}</td>
                            <td className="px-4 py-3 text-right">
                              <StatusBadge tone={t.status === "Bất thường" ? "rose" : t.status === "Nguy cơ" ? "amber" : "green"}>
                                {t.status}
                              </StatusBadge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-400 bg-white">
            Vui lòng chọn một bệnh nhân ở danh mục bên trái để hiển thị hồ sơ tích hợp.
          </div>
        )}
      </div>
    </div>
  );
}
