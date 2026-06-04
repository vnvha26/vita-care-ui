import { Bot, CheckCircle2, FileSpreadsheet, Send, UploadCloud } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

const datasets = [
  { name: "Lich_su_kham_Da_Lieu_2025.csv", size: "15.4 MB", date: "15/05/2026", status: "Đã ghi nhớ", tone: "green" as const },
  { name: "Du_lieu_Tieu_hoa_Q1_2026.xlsx", size: "8.1 MB", date: "14/05/2026", status: "Đã ghi nhớ", tone: "green" as const },
  { name: "Ho_so_benh_an_Ho_Hap.csv", size: "12.5 MB", date: "Vừa xong", status: "Đang học...", tone: "amber" as const },
];

export default function ManagerAIData() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dữ liệu lịch sử khám bệnh"
        description="Tải lên lịch sử ca khám thực tế để AI học hỏi cách tư vấn khách hàng."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <section className="rounded-[24px] border-2 border-dashed border-[#D7E3F2] bg-white p-10 text-center shadow-[0_14px_40px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F7FB] text-[#2F80ED]">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-[#1E293B]">Kéo thả file dữ liệu vào đây</h2>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-[#64748B]">
              Hỗ trợ CSV, XLSX. File nên chứa triệu chứng, chẩn đoán, đơn thuốc và kết luận của bác sĩ.
            </p>
            <ActionButton className="mt-6" icon={<UploadCloud className="h-4 w-4" />}>Chọn file từ máy tính</ActionButton>
          </section>

          <SectionCard title="Tập dữ liệu AI đã huấn luyện" actions={<StatusBadge tone="blue">3 tập dữ liệu</StatusBadge>}>
            <div className="space-y-4">
              {datasets.map((dataset) => (
                <div key={dataset.name} className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7FAFC] text-[#2F80ED]">
                    <FileSpreadsheet className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold text-[#1E293B]">{dataset.name}</p>
                    <p className="mt-1 text-sm font-medium text-[#64748B]">{dataset.size} · {dataset.date}</p>
                  </div>
                  <StatusBadge tone={dataset.tone}>{dataset.status}</StatusBadge>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Sandbox kiểm thử" description="Thử hỏi AI bằng dữ liệu đã huấn luyện." className="flex min-h-[680px] flex-col overflow-hidden">
          <div className="flex-1 space-y-4 bg-[#F7FAFC] p-6 -mx-6 -mt-5">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#1C64D1]">
                <Bot className="h-4 w-4" />
                Hệ thống AI
              </div>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">Xin chào! Tôi đã nạp xong các lịch sử ca khám. Hãy thử đặt câu hỏi như một khách hàng nhé.</p>
            </div>

            <div className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-[#2F80ED] px-4 py-3 text-sm leading-6 text-white">
              Dạo này tôi ăn đồ chua hay bị ợ hơi và nóng rát ở ngực, thỉnh thoảng có buồn nôn. Cho hỏi tôi bị gì vậy?
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#1C64D1]">
                <CheckCircle2 className="h-4 w-4" />
                Hệ thống AI
              </div>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Dựa trên <b>482 ca khám tương tự</b>, triệu chứng của bạn rất giống hội chứng <b>trào ngược dạ dày thực quản (GERD)</b>.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#64748B]">
                <li>Tạm ngưng đồ ăn chua cay, nhiều dầu mỡ.</li>
                <li>Không nằm ngay sau khi ăn.</li>
                <li>Nên khám tiêu hóa để kiểm tra mức độ viêm loét.</li>
              </ul>
            </div>
          </div>

          <div className="shrink-0 border-t border-[#E2E8F0] bg-white p-4 -mx-6 -mb-6">
            <div className="flex gap-3">
              <input className="min-w-0 flex-1 rounded-full border border-[#E2E8F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2F80ED]" placeholder="Hỏi AI về tài liệu..." />
              <ActionButton icon={<Send className="h-4 w-4" />}>Gửi</ActionButton>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
