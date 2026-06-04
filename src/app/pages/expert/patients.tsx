import { useState } from "react";
import { Activity, CalendarDays, FileText, Search, UserRound } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, PageHeader, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

const patients = [
  {
    id: "BN-001",
    name: "Nguyễn Văn A",
    age: "32 tuổi",
    condition: "Sốt cao, đau họng",
    last: "05-06-2026",
    risk: "Cần theo dõi",
  },
  {
    id: "BN-002",
    name: "Nguyễn Văn B",
    age: "45 tuổi",
    condition: "Đau bụng âm ỉ",
    last: "04-06-2026",
    risk: "Ổn định",
  },
  {
    id: "BN-003",
    name: "Nguyễn Văn C",
    age: "28 tuổi",
    condition: "Dị ứng da",
    last: "03-06-2026",
    risk: "Ưu tiên",
  },
];

export default function ExpertPatients() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("Tất cả mức rủi ro");

  return (
    <div>
      <PageHeader
        title="Quản lý bệnh nhân"
        description="Xem dữ liệu bệnh nhân liên quan đến ca AI cần kiểm duyệt, không thay thế hồ sơ bệnh án của bác sĩ."
        actions={<ActionButton variant="secondary" onClick={() => toast.info("Đang hiển thị dữ liệu kiểm duyệt")}>Chỉ xem dữ liệu kiểm duyệt</ActionButton>}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label="Bệnh nhân liên quan" value="36" helper="Trong các ca AI tháng này" tone="blue" icon={<UserRound className="h-5 w-5" />} />
        <StatCard label="Ca cần theo dõi" value="9" helper="Có dấu hiệu rủi ro hoặc phản hồi thấp" tone="amber" icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Đã chuyển bác sĩ" value="14" helper="Có lịch khám hoặc tư vấn chuyên sâu" tone="green" icon={<CalendarDays className="h-5 w-5" />} />
      </div>

      <SectionCard className="mt-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] pl-11 pr-4 text-sm outline-none focus:border-[#2F80ED]"
              placeholder="Tìm bệnh nhân, mã ca, triệu chứng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select className="h-12 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1E293B]" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option>Tất cả mức rủi ro</option>
            <option>Ưu tiên</option>
            <option>Cần theo dõi</option>
            <option>Ổn định</option>
          </select>
        </div>
      </SectionCard>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard title="Danh sách bệnh nhân" description="Các hồ sơ xuất hiện trong hàng chờ kiểm duyệt AI.">
          <div className="space-y-3">
            {patients.map((patient) => (
              <DataRow
                key={patient.id}
                title={`${patient.id} - ${patient.name}`}
                description={`${patient.age}. Triệu chứng gần nhất: ${patient.condition}. Cập nhật: ${patient.last}.`}
                icon={<UserRound className="h-5 w-5" />}
                meta={<StatusBadge tone={patient.risk === "Ưu tiên" ? "rose" : patient.risk === "Cần theo dõi" ? "amber" : "green"}>{patient.risk}</StatusBadge>}
                actions={<ActionButton variant="secondary" onClick={() => toast.info(`Đang xem hồ sơ ${patient.id}`)}>Xem hồ sơ</ActionButton>}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quyền truy cập">
          <div className="space-y-3">
            <DataRow title="Dữ liệu được ẩn bớt" description="Chuyên gia chỉ xem thông tin cần thiết cho kiểm duyệt AI." icon={<FileText className="h-5 w-5" />} />
            <DataRow title="Không kê đơn" description="Vai trò này chỉ góp ý chất lượng phản hồi AI." icon={<FileText className="h-5 w-5" />} />
            <div className="rounded-2xl bg-[#EAF3FF] p-4 text-sm leading-6 text-[#1C64D1]">
              <p className="font-extrabold">Ghi chú</p>
              <p className="mt-1">Khi phát hiện dấu hiệu nặng, chuyên gia gắn cờ để bác sĩ hoặc quản lý xử lý tiếp.</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
