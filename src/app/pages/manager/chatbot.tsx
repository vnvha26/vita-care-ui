import { Bell, CalendarDays, DollarSign, Star, Users } from "lucide-react";
import { DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

export default function ManagerChatbot() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <h1 className="text-3xl font-extrabold">Chào Nguyễn Văn C</h1>
        <p className="mt-2 text-sm font-medium text-[#64748B]">Tổng quan vận hành phòng khám hôm nay.</p>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng số bệnh nhân" value="11" helper="Xem chi tiết danh sách" tone="violet" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Doanh thu hệ thống" value="4.500.000 VNĐ" helper="Từ các lịch đã xác nhận" tone="green" icon={<DollarSign className="h-5 w-5" />} />
        <StatCard label="Tổng số đánh giá" value="4" helper="Xem phản hồi của người bệnh" tone="amber" icon={<Star className="h-5 w-5" />} />
        <StatCard label="Tổng số lịch hẹn" value="19" helper="Xem chi tiết lịch hẹn khám" tone="rose" icon={<CalendarDays className="h-5 w-5" />} />
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <SectionCard title="Hoạt động gần đây" description="Lượt tương tác hệ thống hằng tháng">
          <div className="flex h-64 items-end justify-center rounded-[20px] bg-[#F7FAFC] p-6">
            <svg viewBox="0 0 520 180" className="h-full w-full max-w-3xl" role="img" aria-label="Biểu đồ hoạt động">
              <path d="M30 140 C80 70 120 110 170 55 S250 140 300 82 S390 120 470 58" fill="none" stroke="#27C3A2" strokeWidth="5" />
              <path d="M30 140 C80 70 120 110 170 55 S250 140 300 82 S390 120 470 58 L470 170 L30 170 Z" fill="#E8FFF9" />
            </svg>
          </div>
        </SectionCard>
        <SectionCard title="Thông báo">
          <div className="space-y-3">
            {[
              ["Có 5 đánh giá chờ phản hồi", "10 phút trước"],
              ["Nguyễn Văn B có 2 lịch trùng", "30 phút trước"],
              ["Bác sĩ C có 2 lịch trùng", "1 giờ trước"],
            ].map(([title, time]) => (
              <DataRow key={title} title={title} description={time} icon={<Bell className="h-5 w-5" />} meta={<StatusBadge tone="amber">Cảnh báo</StatusBadge>} />
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
