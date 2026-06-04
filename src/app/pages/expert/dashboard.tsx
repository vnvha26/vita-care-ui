import { Link } from "react-router";
import { Activity, ArrowRight, Bot, CheckCircle2, Clock, FileText, Flag, MessageSquareWarning, Star } from "lucide-react";
import { ActionButton, DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

const reviewQueue = [
  ["CASE-001", "Nguyễn Minh Anh", "Sốt cao, đau họng, mệt mỏi", "AI rating: 2 sao", "Cao", "rose"],
  ["CASE-002", "Trần Thu Hà", "Đau bụng âm ỉ, buồn nôn", "Đang đánh giá", "Trung bình", "amber"],
  ["CASE-003", "Lê Quốc Bảo", "Đau đầu, chóng mặt", "Cần theo dõi", "Thấp", "slate"],
] as const;

const activities = [
  ["Duyệt phản hồi AI", "CASE-001 được chuyển sang trạng thái đang xử lý", "08:40"],
  ["Thêm tài liệu y khoa", "Hướng dẫn xử trí sốt cao tại nhà", "08:15"],
  ["Gắn cờ hội thoại lỗi", "CONV-001 có phản hồi AI điểm thấp", "Hôm qua"],
];

export default function ExpertDashboard() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E293B]">Chào Nguyễn Văn D</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#64748B]">
              Trung tâm kiểm soát chất lượng AI y tế. Theo dõi, kiểm duyệt và cải thiện chất lượng tư vấn sức khỏe từ AI.
            </p>
          </div>
          <Link to="/expert/cases">
            <ActionButton icon={<ArrowRight className="h-4 w-4" />}>Mở ca đánh giá</ActionButton>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ca chờ đánh giá" value="12" helper="Cần chuyên gia kiểm duyệt" tone="amber" icon={<MessageSquareWarning className="h-5 w-5" />} />
        <StatCard label="Ca đang xử lý" value="5" helper="Đang được phản hồi" tone="blue" icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Ca đã hoàn thành" value="48" helper="Trong tháng này" tone="green" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Thời gian xử lý TB" value="18 phút" helper="Nhanh hơn 12% so với tuần trước" tone="violet" icon={<Clock className="h-5 w-5" />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <SectionCard title="Review Queue" description="Các ca/hội thoại cần xử lý ngay.">
          <div className="space-y-3">
            {reviewQueue.map(([id, patient, symptoms, aiState, priority, tone]) => (
              <DataRow
                key={id}
                title={`${id} · ${patient}`}
                description={`${symptoms} · ${aiState}`}
                icon={<Flag className="h-5 w-5" />}
                meta={<StatusBadge tone={tone}>{priority}</StatusBadge>}
                actions={
                  <Link to="/expert/cases/case-001">
                    <ActionButton variant="secondary">Kiểm duyệt</ActionButton>
                  </Link>
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tỉ lệ đánh giá phản hồi chatbot">
          <div className="flex flex-col items-center py-4">
            <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#EF4444_0_16%,#F59E0B_16%_34%,#2F80ED_34%_68%,#27C3A2_68%_100%)]">
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                <div className="text-3xl font-extrabold text-[#1E293B]">4.2</div>
                <div className="text-xs font-bold text-[#64748B]">/ 5 điểm TB</div>
              </div>
            </div>
            <div className="mt-5 grid w-full grid-cols-5 gap-2 text-center text-xs font-bold text-[#64748B]">
              {["1★", "2★", "3★", "4★", "5★"].map((item) => (
                <span key={item} className="rounded-full bg-[#F2F7FB] px-2 py-1">{item}</span>
              ))}
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <SectionCard title="Hoạt động gần đây">
          <div className="space-y-3">
            {activities.map(([title, description, time]) => (
              <DataRow key={title} title={title} description={description} icon={<FileText className="h-5 w-5" />} meta={<StatusBadge tone="blue">{time}</StatusBadge>} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Điều hướng nhanh">
          <div className="grid gap-3">
            {[
              ["Quản lý tri thức", "/expert/knowledge", Bot],
              ["Quản lý hội thoại", "/expert/conversations", MessageSquareWarning],
              ["Báo cáo & phân tích", "/expert/reports", Star],
            ].map(([title, href, Icon]) => {
              const TypedIcon = Icon as typeof Bot;
              return (
                <Link key={href as string} to={href as string} className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-sm font-bold text-[#1E293B] hover:bg-[#F7FAFC]">
                  <TypedIcon className="h-5 w-5 text-[#2F80ED]" />
                  {title as string}
                </Link>
              );
            })}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
