import { Flag, MessageSquareText, Search, Star, UserRound, X, AlertTriangle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

interface Conversation {
  id: string;
  user: string;
  topic: string;
  rating: string;
  status: string;
  time: string;
  note: string;
  messages: { from: string; text: string; time: string }[];
}

const conversationsData: Conversation[] = [
  {
    id: "CONV-001",
    user: "Nguyễn Văn A",
    topic: "Sốt cao, đau họng",
    rating: "2 sao",
    status: "Cần xem lại",
    time: "05-06-2026 08:15",
    note: "Người dùng phản hồi AI hỏi thiếu triệu chứng khó thở.",
    messages: [
      { from: "user", text: "Tôi bị sốt cao 2 ngày, đau họng, mệt mỏi lắm.", time: "08:00" },
      { from: "ai", text: "Bạn đã sử dụng thuốc gì chưa? Có triệu chứng khác không?", time: "08:01" },
      { from: "user", text: "Chưa uống gì. Không có triệu chứng khác.", time: "08:05" },
      { from: "ai", text: "Bạn nên theo dõi thêm, uống nhiều nước và nghỉ ngơi.", time: "08:06" },
      { from: "user", text: "Tôi không thấy đỡ hơn, có cần đi khám không?", time: "08:10" },
    ],
  },
  {
    id: "CONV-002",
    user: "Nguyễn Văn B",
    topic: "Đau bụng âm ỉ",
    rating: "3 sao",
    status: "Đang phân tích",
    time: "05-06-2026 09:40",
    note: "Luồng tư vấn dài, cần rút gọn câu hỏi theo nhánh tiêu hóa.",
    messages: [
      { from: "user", text: "Tôi bị đau bụng âm ỉ vùng bụng trên, buồn nôn.", time: "09:30" },
      { from: "ai", text: "Bạn bị đau sau khi ăn không? Có ợ chua không?", time: "09:31" },
      { from: "user", text: "Có, nhất là sau khi ăn no. Và hay ợ chua.", time: "09:33" },
    ],
  },
  {
    id: "CONV-003",
    user: "Nguyễn Văn C",
    topic: "Dị ứng da",
    rating: "1 sao",
    status: "Ưu tiên",
    time: "05-06-2026 14:15",
    note: "AI chưa cảnh báo khi người dùng mô tả sưng môi.",
    messages: [
      { from: "user", text: "Tôi bị nổi mẩn đỏ ngứa khắp tay, môi hơi sưng lên.", time: "14:00" },
      { from: "ai", text: "Bạn có tiếp xúc với chất gì lạ không? Có tiền sử dị ứng?", time: "14:01" },
      { from: "user", text: "Em không biết. Trước đó ăn hải sản. Môi em hơi sưng.", time: "14:05" },
    ],
  },
];

export default function ExpertConversations() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [sortBy, setSortBy] = useState("Đánh giá thấp");
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [flagged, setFlagged] = useState<Set<string>>(new Set(["CONV-003"]));
  const [analysisNote, setAnalysisNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const filtered = conversationsData.filter((c) => {
    const matchSearch =
      !search ||
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase()) ||
      c.note.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "Tất cả trạng thái" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleFlag = (id: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      toast.success(next.has(id) ? `Đã gắn cờ ${id}` : `Đã bỏ gắn cờ ${id}`);
      return next;
    });
  };

  const saveNote = () => {
    if (!selected) return;
    setSavingNote(true);
    setTimeout(() => {
      setSavingNote(false);
      toast.success(`Đã lưu ghi chú cho ${selected.id}`);
    }, 600);
  };

  const openDetail = (conv: Conversation) => {
    setSelected(conv);
    setAnalysisNote(conv.note);
  };

  return (
    <div>
      <PageHeader
        title="Quản lý hội thoại"
        description="Theo dõi các hội thoại AI bị đánh giá thấp, bị gắn cờ hoặc cần chuyên gia phân tích lại."
        actions={
          <ActionButton
            icon={<Flag className="h-4 w-4" />}
            onClick={() => toast.info("Chọn một hội thoại để gắn cờ")}
          >
            Gắn cờ hội thoại
          </ActionButton>
        }
      />

      <SectionCard>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] pl-11 pr-4 text-sm outline-none focus:border-[#2F80ED]"
              placeholder="Tìm hội thoại, người dùng, triệu chứng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <select
            className="h-12 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1E293B] outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Tất cả trạng thái</option>
            <option>Cần xem lại</option>
            <option>Đang phân tích</option>
            <option>Đã xử lý</option>
          </select>
          <select
            className="h-12 rounded-2xl border border-[#E2E8F0] bg-white px-4 text-sm font-semibold text-[#1E293B] outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Đánh giá thấp</option>
            <option>Bị gắn cờ</option>
            <option>Mới nhất</option>
          </select>
        </div>
      </SectionCard>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <SectionCard title="Danh sách hội thoại" description={`${filtered.length} hội thoại`}>
          <div className="space-y-3">
            {filtered.length === 0 && (
              <p className="text-center text-sm text-[#64748B] py-8">Không tìm thấy hội thoại phù hợp.</p>
            )}
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className={`cursor-pointer rounded-[18px] border p-4 transition ${
                  selected?.id === item.id
                    ? "border-[#CFE3FF] bg-[#EAF3FF]"
                    : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#2F80ED]">
                    <MessageSquareText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-[#1E293B]">{item.id} · {item.user}</h3>
                      {flagged.has(item.id) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-500">
                          <Flag className="h-3 w-3" /> Gắn cờ
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#64748B]">{item.topic}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <StatusBadge tone={item.status === "Ưu tiên" ? "rose" : "amber"}>{item.status}</StatusBadge>
                      <StatusBadge tone="slate">{item.time}</StatusBadge>
                      <StatusBadge tone="violet">{item.rating}</StatusBadge>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleFlag(item.id); }}
                    className={`shrink-0 rounded-full p-2 transition ${
                      flagged.has(item.id) ? "text-red-500 bg-red-50" : "text-[#94A3B8] hover:bg-[#F2F7FB]"
                    }`}
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={selected ? `Chi tiết: ${selected.id}` : "Chọn hội thoại"} description={selected ? selected.topic : "Bấm vào một hội thoại để xem chi tiết"}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquareText className="h-12 w-12 text-[#E2E8F0] mb-3" />
              <p className="text-sm font-medium text-[#64748B]">Chưa chọn hội thoại nào</p>
              <p className="text-xs text-[#94A3B8] mt-1">Bấm vào danh sách bên trái để xem chi tiết</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone={selected.status === "Ưu tiên" ? "rose" : selected.status === "Đang phân tích" ? "amber" : "blue"}>{selected.status}</StatusBadge>
                <StatusBadge tone="violet">{selected.rating}</StatusBadge>
                <StatusBadge tone="slate">{selected.time}</StatusBadge>
              </div>

              <div className="rounded-2xl bg-[#F2F7FB] p-4">
                <p className="text-xs font-bold text-[#64748B] mb-2">GHI CHÚ VẤN ĐỀ</p>
                <p className="text-sm text-[#1E293B] leading-relaxed">{selected.note}</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-[#64748B]">LỊCH SỬ HỘI THOẠI</p>
                {selected.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] rounded-[16px] px-4 py-3 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-white border border-[#E2E8F0] text-[#1E293B]"
                        : msg.from === "ai"
                        ? "bg-[#EAF3FF] text-[#1C64D1]"
                        : "bg-[#E8FFF9] text-[#148E77]"
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`mt-1 text-xs font-semibold ${msg.from === "ai" ? "text-[#94A3B8]" : "text-[#94A3B8]"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selected.rating === "1 sao" || selected.rating === "2 sao" ? (
                <div className="rounded-2xl bg-red-50 border border-red-100 p-4 flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-red-600">Hội thoại đánh giá thấp</p>
                    <p className="text-xs text-red-500 mt-0.5">Cần chuyên gia phân tích và đề xuất cải thiện cho AI.</p>
                  </div>
                </div>
              ) : null}

              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-2">GHI CHÚ PHÂN TÍCH</label>
                <textarea
                  className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 py-3 text-sm outline-none focus:border-[#2F80ED] resize-none"
                  rows={4}
                  placeholder="Nhập ghi chú phân tích chất lượng phản hồi AI..."
                  value={analysisNote}
                  onChange={(e) => setAnalysisNote(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <ActionButton
                  variant="secondary"
                  icon={<ThumbsDown className="h-4 w-4" />}
                  onClick={() => toast.warning("Đã đánh dấu phản hồi AI chưa đạt")}
                >
                  Phản hồi kém
                </ActionButton>
                <ActionButton
                  icon={<ThumbsUp className="h-4 w-4" />}
                  onClick={saveNote}
                >
                  {savingNote ? "Đang lưu..." : "Lưu phân tích"}
                </ActionButton>
              </div>
            </div>
          )}
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
