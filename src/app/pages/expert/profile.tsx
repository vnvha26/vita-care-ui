import { Award, Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

const fields = [
  ["Họ và tên", "Nguyễn Văn D"],
  ["Vai trò", "Chuyên gia kiểm duyệt AI"],
  ["Chuyên môn", "Nội tổng quát, tư vấn sức khỏe số"],
  ["Email", "expert@vitacare.vn"],
  ["Số điện thoại", "0988 123 456"],
  ["Đơn vị", "Trung tâm kiểm định chất lượng AI"],
];

export default function ExpertProfile() {
  return (
    <div>
      <PageHeader
        title="Hồ sơ cá nhân"
        description="Quản lý thông tin chuyên môn, phạm vi kiểm duyệt và kênh liên hệ của chuyên gia."
        actions={<ActionButton icon={<Save className="h-4 w-4" />} onClick={() => toast.success("Đã lưu thay đổi thành công")}>Lưu thay đổi</ActionButton>}
      />

      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <SectionCard>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#EAF3FF] to-[#E8FFF9] text-[#2F80ED]">
              <UserRound className="h-12 w-12" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-[#1E293B]">Nguyễn Văn D</h2>
            <p className="mt-2 text-sm font-semibold text-[#64748B]">Chuyên gia y tế</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <StatusBadge tone="green">Đang nhận ca</StatusBadge>
              <StatusBadge tone="blue">AI Quality Control</StatusBadge>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <DataRow title="8 năm kinh nghiệm" description="Tư vấn và kiểm duyệt nội dung y tế số" icon={<Award className="h-5 w-5" />} />
            <DataRow title="expert@vitacare.vn" description="Email làm việc" icon={<Mail className="h-5 w-5" />} />
            <DataRow title="0988 123 456" description="Số liên hệ nội bộ" icon={<Phone className="h-5 w-5" />} />
          </div>
        </SectionCard>

        <div className="space-y-5">
          <SectionCard title="Thông tin chuyên môn" description="Các trường đang hiển thị ở dashboard và hồ sơ nội bộ.">
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map(([label, value]) => (
                <label key={label} className="block">
                  <span className="text-sm font-bold text-[#1E293B]">{label}</span>
                  <input
                    value={value}
                    readOnly
                    className="mt-2 h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 text-sm font-semibold text-[#1E293B] outline-none"
                  />
                </label>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Phạm vi phụ trách" description="Những nhóm nội dung chuyên gia có quyền kiểm duyệt.">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["Phản hồi AI ban đầu", "Duyệt độ chính xác và mức ưu tiên."],
                ["Kịch bản hỏi triệu chứng", "Cập nhật câu hỏi khai thác thông tin."],
                ["Tri thức bệnh thường gặp", "Kiểm tra nội dung bệnh và hướng dẫn chăm sóc."],
                ["Hội thoại bị đánh giá thấp", "Phân tích lỗi và đề xuất cải thiện."],
              ].map(([title, desc]) => (
                <DataRow key={title} title={title} description={desc} icon={<ShieldCheck className="h-5 w-5" />} />
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
