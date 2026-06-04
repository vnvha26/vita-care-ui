import { useState } from "react";
import { BookOpen, Bot, FilePlus2, Pill, Search, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

type KnowledgeTab = "disease" | "medicine" | "script";

interface KnowledgeItem {
  title: string;
  description: string;
  status: string;
  tone: "blue" | "green" | "amber";
}

const knowledgeData: Record<KnowledgeTab, KnowledgeItem[]> = {
  disease: [
    { title: "Cúm A / H5N1", description: "Triệu chứng, mức nguy cơ, hướng dẫn khi cần đi khám.", status: "Đã duyệt", tone: "green" },
    { title: "Sốt xuất huyết", description: "Dấu hiệu cảnh báo, chăm sóc tại nhà, mốc cần xét nghiệm.", status: "Cần cập nhật", tone: "amber" },
    { title: "Viêm họng cấp", description: "Phân biệt triệu chứng thông thường và dấu hiệu nặng.", status: "Đã duyệt", tone: "green" },
  ],
  medicine: [
    { title: "Paracetamol", description: "Liều dùng tham khảo, cảnh báo quá liều, nhóm cần thận trọng.", status: "Đã duyệt", tone: "green" },
    { title: "Ibuprofen", description: "Chống chỉ định, tương tác thuốc, lưu ý với bệnh dạ dày.", status: "Cần cập nhật", tone: "amber" },
    { title: "Cetirizine", description: "Tư vấn dị ứng, tác dụng phụ và cảnh báo lái xe.", status: "Bản nháp", tone: "blue" },
  ],
  script: [
    { title: "Kịch bản sốt cao", description: "Câu hỏi về thời gian sốt, nhiệt độ, co giật, khó thở.", status: "Đang thử nghiệm", tone: "blue" },
    { title: "Kịch bản đau bụng", description: "Vị trí đau, cường độ, nôn, tiêu chảy, dấu hiệu cấp cứu.", status: "Cần duyệt", tone: "amber" },
    { title: "Kịch bản dị ứng", description: "Mẩn đỏ, sưng môi, khó thở, thuốc đã dùng.", status: "Đã duyệt", tone: "green" },
  ],
};

const statusOptions = ["Bản nháp", "Cần duyệt", "Đang thử nghiệm", "Cần cập nhật", "Đã duyệt"];
const tabLabels: Record<KnowledgeTab, string> = { disease: "Bệnh", medicine: "Thuốc", script: "Kịch bản" };

export default function ExpertKnowledge() {
  const [tab, setTab] = useState<KnowledgeTab>("disease");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(knowledgeData);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const openEdit = (item: KnowledgeItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditStatus(item.status);
  };

  const closeEdit = () => {
    setEditingItem(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("");
  };

  const saveEdit = () => {
    if (!editingItem) return;
    const key = tab as KnowledgeTab;
    setItems((prev) => ({
      ...prev,
      [key]: prev[key].map((i) =>
        i.title === editingItem.title
          ? { ...i, title: editTitle, description: editDescription, status: editStatus }
          : i
      ),
    }));
    toast.success("Đã lưu thay đổi");
    closeEdit();
  };

  const openAdd = () => {
    setEditingItem(null);
    setEditTitle("");
    setEditDescription(tab === "medicine" ? "" : "");
    setEditStatus("Bản nháp");
  };

  const saveAdd = () => {
    if (!editTitle.trim()) {
      toast.error("Vui lòng nhập tên nội dung");
      return;
    }
    const key = tab as KnowledgeTab;
    setItems((prev) => ({
      ...prev,
      [key]: [...prev[key], { title: editTitle, description: editDescription, status: editStatus, tone: "blue" as const }],
    }));
    toast.success("Đã thêm nội dung mới");
    closeEdit();
  };

  const displayed = items[tab].filter((i) =>
    !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Quản lý tri thức"
        description="Kiểm duyệt dữ liệu bệnh, thuốc và kịch bản chatbot dùng cho phản hồi AI."
        actions={<ActionButton icon={<FilePlus2 className="h-4 w-4" />} onClick={openAdd}>Thêm nội dung</ActionButton>}
      />

      <SectionCard>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_420px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] pl-11 pr-4 text-sm outline-none focus:border-[#2F80ED]"
              placeholder={`Tìm ${tabLabels[tab].toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            {(["disease", "medicine", "script"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  tab === value ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"
                }`}
              >
                {tabLabels[value]}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <SectionCard title="Danh sách tri thức" description={`${displayed.length} nội dung`}>
          <div className="space-y-3">
            {displayed.length === 0 && (
              <p className="text-center text-sm text-[#64748B] py-8">Không tìm thấy kết quả phù hợp.</p>
            )}
            {displayed.map((item) => (
              <DataRow
                key={item.title}
                title={item.title}
                description={item.description}
                icon={tab === "medicine" ? <Pill className="h-5 w-5" /> : tab === "script" ? <Bot className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                meta={<StatusBadge tone={item.tone}>{item.status}</StatusBadge>}
                actions={
                  <ActionButton variant="secondary" onClick={() => openEdit(item)}>Chỉnh sửa</ActionButton>
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quy tắc kiểm duyệt">
          <div className="space-y-3">
            {[
              ["Không chẩn đoán chắc chắn", "AI chỉ phân tích ban đầu và khuyến nghị đi khám khi cần."],
              ["Ưu tiên dấu hiệu nặng", "Khó thở, đau ngực, co giật, mất ý thức phải được cảnh báo rõ."],
              ["Ngôn ngữ dễ hiểu", "Nội dung ngắn, không dùng thuật ngữ khó nếu không cần."],
            ].map(([title, desc]) => (
              <DataRow key={title} title={title} description={desc} icon={<ShieldCheck className="h-5 w-5" />} />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Edit / Add Dialog */}
      <Dialog open={!!editingItem || (editingItem === null && editTitle !== "")} onOpenChange={(open) => { if (!open) closeEdit(); }}>
        <DialogContent className="bg-white rounded-[24px] border-[#E2E8F0] p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-[#EAF3FF] to-[#E8FFF9] px-6 py-5 border-b border-[#E2E8F0]">
            <DialogTitle className="text-2xl font-extrabold text-[#1E293B]">
              {editingItem ? `Chỉnh sửa: ${editingItem.title}` : `Thêm ${tabLabels[tab].toLowerCase()} mới`}
            </DialogTitle>
            <DialogDescription className="text-[#64748B]">
              Cập nhật nội dung kiến thức cho AI sử dụng trong tư vấn.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">Tên nội dung</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder={`Nhập tên ${tabLabels[tab].toLowerCase()}...`}
                className="h-12 rounded-2xl border-[#E2E8F0] bg-[#F7FAFC] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">Mô tả</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Nhập mô tả chi tiết..."
                rows={5}
                className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 py-3 text-sm outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1E293B] mb-2">Trạng thái</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] px-4 text-sm font-semibold text-[#1E293B] outline-none focus:border-[#2F80ED]"
              >
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <DialogFooter className="px-6 pb-5 flex gap-3">
            <button
              type="button"
              onClick={closeEdit}
              className="px-5 py-2.5 rounded-full border border-[#E2E8F0] text-sm font-bold text-[#64748B] hover:bg-[#F2F7FB] transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={editingItem ? saveEdit : saveAdd}
              className="px-5 py-2.5 rounded-full bg-[#2F80ED] text-sm font-bold text-white hover:bg-[#1C64D1] transition shadow-md"
            >
              {editingItem ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
