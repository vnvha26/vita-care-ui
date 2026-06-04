import { BarChart3, CheckCircle2, Clock, Download, LineChart, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, PageHeader, SectionCard, StatCard, StatusBadge } from "../../components/layout/role-page";

const monthlyCases = [
  { month: "T1", value: 38 },
  { month: "T2", value: 52 },
  { month: "T3", value: 46 },
  { month: "T4", value: 61 },
  { month: "T5", value: 74 },
  { month: "T6", value: 82 },
];

const specialties = [
  ["Hô hấp", "32%", "bg-[#2F80ED]"],
  ["Tiêu hóa", "24%", "bg-[#27C3A2]"],
  ["Da liễu", "18%", "bg-[#F59E0B]"],
  ["Nhi khoa", "14%", "bg-[#8B7CF6]"],
];

export default function ExpertReports() {
  return (
    <div>
      <PageHeader
        title="Báo cáo & phân tích"
        description="Theo dõi chất lượng phản hồi AI, tốc độ kiểm duyệt và xu hướng các ca cần chuyên gia đánh giá."
        actions={
          <>
            <ActionButton variant="secondary" onClick={() => toast.info("Đang chuyển tháng báo cáo")}>Tháng 6, 2026</ActionButton>
            <ActionButton icon={<Download className="h-4 w-4" />} onClick={() => toast.success("Đang tải báo cáo...")}>Xuất báo cáo</ActionButton>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng ca đánh giá" value="128" helper="+18 ca so với tháng trước" tone="blue" icon={<BarChart3 className="h-5 w-5" />} />
        <StatCard label="Tỷ lệ hoàn thành" value="82%" helper="105 ca đã xử lý" tone="green" icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Thời gian TB" value="18 phút" helper="Nhanh hơn 6 phút" tone="amber" icon={<Clock className="h-5 w-5" />} />
        <StatCard label="Đánh giá AI" value="4.2/5" helper="Từ phản hồi người dùng" tone="violet" icon={<Star className="h-5 w-5" />} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.8fr)]">
        <SectionCard title="Xu hướng ca kiểm duyệt" description="Số lượng ca AI cần chuyên gia xác minh theo tháng.">
          <div className="flex h-72 items-end gap-4 rounded-[22px] bg-[#F7FAFC] p-5">
            {monthlyCases.map((item) => (
              <div key={item.month} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="relative flex flex-1 items-end">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-[#2F80ED] to-[#27C3A2]"
                    style={{ height: `${item.value}%` }}
                    aria-label={`${item.month}: ${item.value} ca`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-extrabold text-[#1E293B]">{item.value}</p>
                  <p className="text-xs font-semibold text-[#64748B]">{item.month}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Phân bố chuyên khoa" description="Nhóm triệu chứng thường cần kiểm duyệt.">
          <div className="space-y-4">
            {specialties.map(([label, value, color]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span className="text-[#1E293B]">{label}</span>
                  <span className="text-[#64748B]">{value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#F2F7FB]">
                  <div className={`h-full rounded-full ${color}`} style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard title="Ca có rủi ro cao" description="Các ca cần ưu tiên kiểm tra trong ngày.">
          <div className="space-y-3">
            {[
              ["CASE-001", "Nguyễn Văn A", "Sốt cao, đau họng", "Cao"],
              ["CASE-008", "Nguyễn Văn C", "Đau ngực, khó thở", "Khẩn"],
              ["CASE-012", "Nguyễn Văn D", "Phản ứng thuốc", "Cao"],
            ].map(([code, name, symptom, priority]) => (
              <DataRow
                key={code}
                title={`${code} - ${name}`}
                description={symptom}
                icon={<LineChart className="h-5 w-5" />}
                meta={<StatusBadge tone={priority === "Khẩn" ? "rose" : "amber"}>{priority}</StatusBadge>}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Hiệu suất chuyên gia" description="Tóm tắt mức độ xử lý và phản hồi trong kỳ.">
          <div className="space-y-3">
            {[
              ["Nguyễn Văn D", "48 ca hoàn thành", "4.6/5"],
              ["Nguyễn Văn C", "32 ca hoàn thành", "4.4/5"],
              ["Nguyễn Văn B", "25 ca hoàn thành", "4.3/5"],
            ].map(([name, count, rating]) => (
              <DataRow
                key={name}
                title={name}
                description={count}
                icon={<TrendingUp className="h-5 w-5" />}
                actions={<StatusBadge tone="green">{rating}</StatusBadge>}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
