import { Download, TrendingUp, Users, CalendarCheck } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatCard } from "../../components/layout/role-page";

export default function ManagerReports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Báo cáo tổng hợp"
        description="Phân tích và thống kê toàn hệ thống."
        actions={<ActionButton icon={<Download className="h-4 w-4" />}>Xuất báo cáo</ActionButton>}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Tăng trưởng người dùng" value="+23" helper="So với tháng trước" tone="green" icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label="Tổng ca khám" value="1,625" helper="5 tháng qua" tone="blue" icon={<CalendarCheck className="h-5 w-5" />} />
        <StatCard label="Tỷ lệ hoàn thành" value="96%" helper="+2% so với tháng trước" tone="green" icon={<Users className="h-5 w-5" />} />
      </div>

      <SectionCard title="Tăng trưởng theo tháng" description="Người dùng, bệnh nhân và ca khám">
        <div className="h-[340px] rounded-2xl bg-white p-4">
          <svg viewBox="0 0 900 300" className="h-full w-full" role="img" aria-label="Biểu đồ tăng trưởng theo tháng">
            {[60, 120, 180, 240].map((y) => (
              <line key={y} x1="45" y1={y} x2="870" y2={y} stroke="#E2E8F0" strokeDasharray="4 4" />
            ))}
            <line x1="45" y1="250" x2="870" y2="250" stroke="#94A3B8" />
            <line x1="45" y1="30" x2="45" y2="250" stroke="#94A3B8" />

            <polyline points="80,210 260,205 440,198 620,190 800,182" fill="none" stroke="#2F80ED" strokeWidth="3" />
            <polyline points="80,150 260,138 440,128 620,110 800,92" fill="none" stroke="#27C3A2" strokeWidth="3" />
            <polyline points="80,120 260,95 440,82 620,55 800,36" fill="none" stroke="#8B7CF6" strokeWidth="3" />

            {["T1", "T2", "T3", "T4", "T5"].map((month, index) => (
              <text key={month} x={80 + index * 180} y="276" fill="#94A3B8" fontSize="14" textAnchor="middle">{month}</text>
            ))}
            <text x="62" y="35" fill="#94A3B8" fontSize="13">600</text>
            <text x="62" y="125" fill="#94A3B8" fontSize="13">300</text>
            <text x="62" y="248" fill="#94A3B8" fontSize="13">0</text>
          </svg>
        </div>
      </SectionCard>

      <SectionCard title="Hoạt động theo phòng khám" description="Số ca khám theo từng phòng khám">
        <div className="grid h-[320px] items-end gap-5 rounded-2xl bg-white p-6 sm:grid-cols-4">
          {[
            ["VitaCare Trung tâm", "82%", "bg-[#2F80ED]"],
            ["VitaCare Gia đình", "55%", "bg-[#27C3A2]"],
            ["VitaCare Online", "68%", "bg-[#8B7CF6]"],
            ["Phòng khám vệ tinh", "40%", "bg-[#F59E0B]"],
          ].map(([label, height, color]) => (
            <div key={label} className="flex h-full flex-col justify-end">
              <div className={`rounded-t-2xl ${color}`} style={{ height }} />
              <p className="mt-3 text-center text-sm font-bold text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
