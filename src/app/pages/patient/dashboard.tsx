import { Link } from "react-router";
import { ArrowRight, Bot, CalendarClock, HeartPulse, Search } from "lucide-react";
import { ActionButton, DataRow, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

const diseases = [
  ["Sốt xuất huyết", "Sốt cao đột ngột, đau đầu, phát ban, chảy máu cam.", "85 ca tuần qua", "Cao", "rose"],
  ["Viêm họng", "Đau rát họng, ho khan, khó nuốt.", "210 ca tuần qua", "Trung bình", "amber"],
  ["Cúm mùa", "Sốt, ho, đau họng, mệt mỏi toàn thân.", "310 ca tuần qua", "Thấp", "slate"],
] as const;

export default function PatientDashboard() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold">Chào Nguyễn Văn A</h1>
              <p className="mt-2 text-sm font-medium text-[#64748B]">Hôm nay bạn cảm thấy thế nào?</p>
              <p className="mt-3 text-sm italic text-[#64748B]">“Sức khỏe là lựa chọn, không phải sự ngẫu nhiên.”</p>
            </div>
            <HeartPulse className="h-14 w-14 shrink-0 text-[#2F80ED]" />
          </div>
          <div className="mt-6 flex max-w-2xl gap-3">
            <input className="h-12 flex-1 rounded-full border border-white bg-white/80 px-5 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Nhập triệu chứng nhanh..." />
            <Link to="/patient/consultation">
              <ActionButton icon={<Search className="h-4 w-4" />}>Hỏi AI ngay</ActionButton>
            </Link>
          </div>
        </div>
        <StatCard label="Điểm theo dõi sức khỏe" value="82/100" helper="Ổn định, nên cập nhật triệu chứng nếu có thay đổi." tone="green" icon={<HeartPulse className="h-5 w-5" />} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <div className="space-y-5">
          <section className="rounded-[24px] bg-gradient-to-r from-[#2F80ED] to-[#1C64D1] p-6 text-white shadow-[0_14px_40px_rgba(47,128,237,0.18)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold">Trợ lý sức khỏe AI</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85">
              Bạn đang gặp các triệu chứng bất thường? Hãy trò chuyện với AI để nhận phân tích ban đầu và gợi ý bước tiếp theo.
            </p>
            <div className="mt-8 flex justify-end">
              <Link to="/patient/consultation" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1C64D1] hover:bg-[#EAF3FF]">
                Bắt đầu tư vấn ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <SectionCard title="Hoạt động gần đây">
            <div className="space-y-3">
              <DataRow title="Tư vấn sức khỏe" description="Triệu chứng: sốt cao, đau đầu, mệt mỏi, đau họng." icon={<Bot className="h-5 w-5" />} />
              <DataRow title="Đặt lịch khám" description="Nguyễn Văn B - Chuyên khoa Nội tổng quát" icon={<CalendarClock className="h-5 w-5" />} meta={<StatusBadge tone="green">Chờ xác nhận</StatusBadge>} />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Dữ liệu y tế: Dịch bệnh & bệnh hay gặp">
            <div className="space-y-3">
              {diseases.map(([name, description, trend, level, tone]) => (
                <div key={name} className="rounded-[18px] border border-[#E2E8F0] bg-[#F7FAFC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold">{name}</h3>
                      <p className="mt-1 text-sm text-[#64748B]">{description}</p>
                      <p className="mt-2 text-xs font-bold text-[#1C64D1]">{trend}</p>
                    </div>
                    <StatusBadge tone={tone}>{level}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Lịch hẹn sắp tới">
            <div className="rounded-[20px] bg-[#EAF3FF] p-5">
              <h3 className="font-extrabold">Nguyễn Văn B</h3>
              <p className="text-sm text-[#64748B]">Nội tổng quát</p>
              <div className="mt-4 space-y-2 text-sm">
                <p>Thời gian: 09:00 - 10:00</p>
                <p>Phí khám: 350.000 VND</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <StatusBadge tone="green">Chờ xác nhận</StatusBadge>
                <ActionButton>Chi tiết hẹn</ActionButton>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>
    </div>
  );
}
