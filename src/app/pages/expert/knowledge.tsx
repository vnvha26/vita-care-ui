import { useState } from "react";
import { BookOpen, Bot, FilePlus2, Pill, Search, ShieldCheck } from "lucide-react";
import { ActionButton, DataRow, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type KnowledgeTab = "disease" | "medicine" | "script";

const knowledgeMap: Record<KnowledgeTab, { title: string; description: string; status: string; tone: "blue" | "green" | "amber" }[]> = {
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

export default function ExpertKnowledge() {
  const [tab, setTab] = useState<KnowledgeTab>("disease");
  const items = knowledgeMap[tab];

  return (
    <div>
      <PageHeader
        title="Quản lý tri thức"
        description="Kiểm duyệt dữ liệu bệnh, thuốc và kịch bản chatbot dùng cho phản hồi AI."
        actions={<ActionButton icon={<FilePlus2 className="h-4 w-4" />}>Thêm nội dung</ActionButton>}
      />

      <SectionCard>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_420px]">
          <label className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-[#F7FAFC] pl-11 pr-4 text-sm outline-none focus:border-[#2F80ED]"
              placeholder="Tìm bệnh, thuốc, kịch bản..."
            />
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F2F7FB] p-1">
            {[
              ["disease", "Bệnh"],
              ["medicine", "Thuốc"],
              ["script", "Kịch bản"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value as KnowledgeTab)}
                className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                  tab === value ? "bg-white text-[#1C64D1] shadow-sm" : "text-[#64748B]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <SectionCard title="Danh sách tri thức" description="Nội dung được AI sử dụng khi tư vấn ban đầu.">
          <div className="space-y-3">
            {items.map((item) => (
              <DataRow
                key={item.title}
                title={item.title}
                description={item.description}
                icon={tab === "medicine" ? <Pill className="h-5 w-5" /> : tab === "script" ? <Bot className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                meta={<StatusBadge tone={item.tone}>{item.status}</StatusBadge>}
                actions={
                  <>
                    <ActionButton variant="secondary">Chỉnh sửa</ActionButton>
                    <ActionButton variant="ghost">Lịch sử</ActionButton>
                  </>
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
    </div>
  );
}
