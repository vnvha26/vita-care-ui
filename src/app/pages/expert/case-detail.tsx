import { ClipboardCheck, FileText, Send, UserRound } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, SectionCard, StatusBadge } from "../../components/layout/role-page";

export default function ExpertCaseDetail() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E293B]">Chi tiết ca đánh giá CASE-001</h1>
            <p className="mt-2 text-sm text-[#64748B]">Nguyễn Minh Anh · Sốt cao, đau họng, mệt mỏi · 03-06-2026 08:15</p>
          </div>
          <div className="flex gap-2">
            <StatusBadge tone="rose">Cao</StatusBadge>
            <StatusBadge tone="amber">Chờ đánh giá</StatusBadge>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <SectionCard title="Thông tin ca bệnh">
            <div className="grid gap-3 md:grid-cols-2">
              <DataRow title="Mã ca" description="CASE-001" icon={<ClipboardCheck className="h-5 w-5" />} />
              <DataRow title="Trạng thái" description="Chờ đánh giá" icon={<ClipboardCheck className="h-5 w-5" />} />
              <DataRow title="Mức ưu tiên" description="Cao" icon={<ClipboardCheck className="h-5 w-5" />} />
              <DataRow title="Thời gian tạo" description="03-06-2026 08:15" icon={<ClipboardCheck className="h-5 w-5" />} />
            </div>
          </SectionCard>

          <SectionCard title="Thông tin bệnh nhân">
            <div className="grid gap-3 md:grid-cols-2">
              <DataRow title="Họ tên" description="Nguyễn Minh Anh" icon={<UserRound className="h-5 w-5" />} />
              <DataRow title="Tuổi / giới tính" description="24 · Nam" icon={<UserRound className="h-5 w-5" />} />
              <DataRow title="Số điện thoại" description="0912 345 678" icon={<UserRound className="h-5 w-5" />} />
              <DataRow title="Tiền sử" description="Không ghi nhận bệnh nền" icon={<UserRound className="h-5 w-5" />} />
            </div>
          </SectionCard>

          <SectionCard title="Triệu chứng và phân tích AI">
            <div className="space-y-3">
              <DataRow title="Triệu chứng đã ghi nhận" description="Sốt, đau họng, ho, mệt mỏi" icon={<FileText className="h-5 w-5" />} />
              <DataRow title="Chẩn đoán AI ban đầu" description="Nghi ngờ viêm họng cấp hoặc cúm mùa. AI tự tin 72%." icon={<FileText className="h-5 w-5" />} />
              <DataRow title="Khuyến nghị AI" description="Theo dõi thêm 24h, uống đủ nước, đặt lịch nếu sốt kéo dài." icon={<FileText className="h-5 w-5" />} />
              <DataRow title="Dữ liệu đính kèm" description="Ghi chú người dùng, không có file xét nghiệm." icon={<FileText className="h-5 w-5" />} />
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-5">
          <SectionCard title="Phản hồi chuyên môn">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Nhập phản hồi chuyên môn</span>
                <textarea className="mt-2 min-h-36 w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Nhận xét về phản hồi AI, hướng xử trí, cảnh báo cần bổ sung..." />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Mức ưu tiên</span>
                <select className="mt-2 h-12 w-full rounded-full border border-[#E2E8F0] px-4 text-sm outline-none">
                  <option>Cao</option>
                  <option>Trung bình</option>
                  <option>Thấp</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#1E293B]">Trạng thái xử lý</span>
                <select className="mt-2 h-12 w-full rounded-full border border-[#E2E8F0] px-4 text-sm outline-none">
                  <option>Chờ tiếp nhận</option>
                  <option>Đang xử lý</option>
                  <option>Đã đóng</option>
                </select>
              </label>
              <div className="flex flex-wrap gap-3">
                <ActionButton variant="secondary" onClick={() => toast.info("Đã lưu nháp phản hồi")}>Lưu nháp</ActionButton>
                <ActionButton icon={<Send className="h-4 w-4" />} onClick={() => toast.success("Phản hồi chuyên môn đã được gửi")}>Gửi phản hồi</ActionButton>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Lịch sử phản hồi">
            <div className="space-y-3">
              <DataRow title="Phản hồi AI" description="Gợi ý theo dõi thêm và đặt lịch nếu triệu chứng kéo dài." />
              <DataRow title="Phản hồi bác sĩ" description="Chưa có bác sĩ tham gia ca này." />
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
