import { useState } from "react";
import { Link } from "react-router";
import { ClipboardCheck, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, SectionCard, StatusBadge } from "../../components/layout/role-page";

const expertCases = [
  {
    id: "CASE-001",
    patientName: "Nguyễn Minh Anh",
    symptoms: "Sốt cao, đau họng, mệt mỏi",
    aiDiagnosis: "Nghi ngờ viêm họng cấp hoặc cúm mùa",
    priority: "Cao",
    status: "Chờ đánh giá",
    createdAt: "03-06-2026 08:15",
    tone: "rose" as const,
  },
  {
    id: "CASE-002",
    patientName: "Trần Thu Hà",
    symptoms: "Đau bụng âm ỉ, buồn nôn",
    aiDiagnosis: "Có thể liên quan rối loạn tiêu hóa",
    priority: "Trung bình",
    status: "Đang đánh giá",
    createdAt: "03-06-2026 09:40",
    tone: "amber" as const,
  },
  {
    id: "CASE-003",
    patientName: "Lê Quốc Bảo",
    symptoms: "Đau đầu, chóng mặt",
    aiDiagnosis: "Cần theo dõi huyết áp và nghỉ ngơi",
    priority: "Thấp",
    status: "Đã hoàn thành",
    createdAt: "02-06-2026 18:20",
    tone: "green" as const,
  },
];

export default function ExpertCases() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Chờ đánh giá");
  const [priorityFilter, setPriorityFilter] = useState("Tất cả mức độ");

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold text-[#1E293B]">Ca đánh giá</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
          Kiểm duyệt các hội thoại hoặc ca tư vấn AI cần bổ sung phản hồi chuyên môn.
        </p>
      </section>

      <SectionCard>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input className="h-12 w-full rounded-full border border-[#E2E8F0] pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Tìm theo tên bệnh nhân, triệu chứng, mã ca..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <select className="h-12 rounded-full border border-[#E2E8F0] px-4 text-sm font-bold text-[#64748B] outline-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>Chờ đánh giá</option>
            <option>Đang đánh giá</option>
            <option>Đã hoàn thành</option>
          </select>
          <select className="h-12 rounded-full border border-[#E2E8F0] px-4 text-sm font-bold text-[#64748B] outline-none" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option>Tất cả mức độ</option>
            <option>Cao</option>
            <option>Trung bình</option>
            <option>Thấp</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard title="Danh sách ca cần kiểm duyệt" actions={<ActionButton variant="secondary" icon={<Filter className="h-4 w-4" />} onClick={() => toast.info("Tính năng lọc nâng cao đang được phát triển")}>Lọc nâng cao</ActionButton>}>
        <div className="space-y-3">
          {expertCases.map((item) => (
            <DataRow
              key={item.id}
              title={`${item.id} · ${item.patientName}`}
              description={`${item.symptoms} · AI: ${item.aiDiagnosis} · ${item.createdAt}`}
              icon={<ClipboardCheck className="h-5 w-5" />}
              meta={
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={item.tone}>{item.priority}</StatusBadge>
                  <StatusBadge tone="blue">{item.status}</StatusBadge>
                </div>
              }
              actions={
                <Link to="/expert/cases/case-001">
                  <ActionButton>Xem chi tiết</ActionButton>
                </Link>
              }
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
