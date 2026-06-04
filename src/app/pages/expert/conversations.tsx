import { Flag, MessageSquareText, Search, Star, UserRound } from "lucide-react";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

const conversations = [
  {
    id: "CONV-001",
    user: "Nguyễn Văn A",
    topic: "Sốt cao, đau họng",
    rating: "2 sao",
    status: "Cần xem lại",
    time: "05-06-2026 08:15",
    note: "Người dùng phản hồi AI hỏi thiếu triệu chứng khó thở.",
  },
  {
    id: "CONV-002",
    user: "Nguyễn Văn B",
    topic: "Đau bụng âm ỉ",
    rating: "3 sao",
    status: "Đang phân tích",
    time: "05-06-2026 09:40",
    note: "Luồng tư vấn dài, cần rút gọn câu hỏi theo nhánh tiêu hóa.",
  },
  {
    id: "CONV-003",
    user: "Nguyễn Văn C",
    topic: "Dị ứng da",
    rating: "1 sao",
    status: "Ưu tiên",
    time: "05-06-2026 14:15",
    note: "AI chưa cảnh báo khi người dùng mô tả sưng môi.",
  },
];

export default function ExpertConversations() {
  return (
    <div>
      <PageHeader
        title="Quản lý hội thoại"
        description="Theo dõi các hội thoại AI bị đánh giá thấp, bị gắn cờ hoặc cần chuyên gia phân tích lại."
        actions={<ActionButton icon={<Flag className="h-4 w-4" />}>Gắn cờ hội thoại</ActionButton>}
      />

      <SectionCard>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] pl-11 pr-4 text-sm outline-none focus:border-[#2F80ED]"
              placeholder="Tìm hội thoại, người dùng, triệu chứng..."
            />
          </label>
          <select className="h-12 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1E293B]">
            <option>Tất cả trạng thái</option>
            <option>Cần xem lại</option>
            <option>Đang phân tích</option>
            <option>Đã xử lý</option>
          </select>
          <select className="h-12 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1E293B]">
            <option>Đánh giá thấp</option>
            <option>Bị gắn cờ</option>
            <option>Mới nhất</option>
          </select>
        </div>
      </SectionCard>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <SectionCard title="Danh sách hội thoại" description="Các hội thoại cần chuyên gia kiểm tra chất lượng phản hồi.">
          <div className="space-y-3">
            {conversations.map((item) => (
              <DataRow
                key={item.id}
                title={`${item.id} - ${item.user}`}
                description={`${item.topic}. ${item.note}`}
                icon={<MessageSquareText className="h-5 w-5" />}
                meta={
                  <>
                    <StatusBadge tone={item.status === "Ưu tiên" ? "rose" : "amber"}>{item.status}</StatusBadge>
                    <StatusBadge tone="slate">{item.time}</StatusBadge>
                  </>
                }
                actions={
                  <>
                    <StatusBadge tone="violet">{item.rating}</StatusBadge>
                    <ActionButton variant="secondary">Xem chi tiết</ActionButton>
                  </>
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tóm tắt hôm nay">
          <div className="space-y-3">
            {[
              ["12 hội thoại", "Cần chuyên gia phân tích"],
              ["5 hội thoại", "Đánh giá 1-2 sao"],
              ["3 hội thoại", "Có cảnh báo y tế nhạy cảm"],
            ].map(([title, desc]) => (
              <DataRow key={title} title={title} description={desc} icon={<Star className="h-5 w-5" />} />
            ))}
            <div className="rounded-2xl bg-[#E8FFF9] p-4 text-sm leading-6 text-[#148E77]">
              <p className="font-extrabold">Gợi ý ưu tiên</p>
              <p className="mt-1">Xử lý trước hội thoại có dấu hiệu cấp cứu hoặc phản hồi người dùng dưới 2 sao.</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Người dùng phản hồi nhiều" className="mt-5">
        <div className="grid gap-3 md:grid-cols-3">
          {["Nguyễn Văn A", "Nguyễn Văn B", "Nguyễn Văn C"].map((name, index) => (
            <DataRow
              key={name}
              title={name}
              description={`${index + 2} hội thoại cần kiểm tra`}
              icon={<UserRound className="h-5 w-5" />}
              meta={<StatusBadge tone={index === 0 ? "rose" : "blue"}>{index === 0 ? "Ưu tiên" : "Theo dõi"}</StatusBadge>}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
