import { Bot, Database, Pill, Star } from "lucide-react";
import { DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

export default function ExpertDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold">Chào Nguyễn Văn D</h1>
        <p className="mt-2 text-sm font-medium text-[#64748B]">Trung tâm kiểm soát chất lượng AI y tế.</p>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng số bệnh" value="12" helper="Xem chi tiết danh sách bệnh" tone="blue" icon={<Database className="h-5 w-5" />} />
        <StatCard label="Tổng số thuốc" value="10" helper="Xem chi tiết danh mục thuốc" tone="green" icon={<Pill className="h-5 w-5" />} />
        <StatCard label="Tổng số kịch bản" value="3" helper="Xem chi tiết kịch bản chatbot" tone="violet" icon={<Bot className="h-5 w-5" />} />
        <StatCard label="Đánh giá cần duyệt" value="3" helper="Xem chi tiết đánh giá AI" tone="amber" icon={<Star className="h-5 w-5" />} />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <SectionCard title="Hoạt động gần đây">
          <div className="space-y-3">
            <DataRow title="Chỉnh sửa thuốc" description="05-05-2026 - 08:23" icon={<Pill className="h-5 w-5" />} />
            <DataRow title="Thêm thuốc" description="05-05-2026 - 08:20" icon={<Pill className="h-5 w-5" />} />
            <DataRow title="Chỉnh sửa kịch bản" description="04-05-2026 - 16:17" icon={<Bot className="h-5 w-5" />} />
          </div>
        </SectionCard>
        <SectionCard title="Hội thoại bị đánh giá thấp">
          <div className="space-y-3">
            {[
              ["Nguyễn Văn A", "Triệu chứng sốt, đau họng", "2 sao"],
              ["Nguyễn Minh C", "Tra cứu đơn thuốc cũ", "2 sao"],
              ["Nguyễn Minh D", "Dị ứng da", "3 sao"],
            ].map(([name, symptom, rating]) => (
              <DataRow key={name} title={name} description={symptom} meta={<StatusBadge tone="rose">{rating}</StatusBadge>} icon={<Star className="h-5 w-5" />} />
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
