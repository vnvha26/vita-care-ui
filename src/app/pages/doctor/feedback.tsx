import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, ClipboardList, Pill, Search, ShieldCheck, Stethoscope } from "lucide-react";
import { ActionButton, PageHeader, SectionCard, StatusBadge } from "../../components/layout/role-page";

type Tone = "blue" | "green" | "amber" | "rose" | "violet" | "slate";

type Drug = {
  id: string;
  name: string;
  group: string;
  form: string;
  dose: string;
  indication: string;
  contraindication: string;
  sideEffects: string[];
  interactions: string[];
  note: string;
  risk: "Thấp" | "Trung bình" | "Cao";
  tone: Tone;
};

const drugs: Drug[] = [
  {
    id: "omeprazole",
    name: "Omeprazole 20mg",
    group: "Ức chế bơm proton",
    form: "Viên nang",
    dose: "Uống 1 viên trước ăn sáng 30 phút, 1 lần/ngày.",
    indication: "Trào ngược dạ dày thực quản, viêm loét dạ dày tá tràng, đau thượng vị liên quan tăng tiết acid.",
    contraindication: "Quá mẫn với omeprazole hoặc các thuốc cùng nhóm PPI.",
    sideEffects: ["Đầy bụng, buồn nôn", "Đau đầu", "Tiêu chảy hoặc táo bón"],
    interactions: ["Có thể giảm hiệu quả clopidogrel", "Thận trọng khi dùng cùng warfarin hoặc diazepam"],
    note: "Không tự kéo dài điều trị quá lâu nếu chưa đánh giá lại triệu chứng và nguy cơ thiếu vi chất.",
    risk: "Trung bình",
    tone: "amber",
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin 500mg",
    group: "Kháng sinh beta-lactam",
    form: "Viên nang",
    dose: "Uống 1 viên mỗi 8 giờ sau ăn, tùy chỉ định nhiễm khuẩn.",
    indication: "Nhiễm khuẩn hô hấp, tai mũi họng, tiết niệu hoặc da mô mềm do vi khuẩn nhạy cảm.",
    contraindication: "Dị ứng penicillin, tiền sử phản vệ với beta-lactam.",
    sideEffects: ["Phát ban", "Tiêu chảy", "Buồn nôn"],
    interactions: ["Allopurinol làm tăng nguy cơ phát ban", "Có thể ảnh hưởng INR khi dùng cùng warfarin"],
    note: "Cần hỏi kỹ tiền sử dị ứng trước khi kê. Không dùng cho nhiễm virus đơn thuần.",
    risk: "Cao",
    tone: "rose",
  },
  {
    id: "paracetamol",
    name: "Paracetamol 500mg",
    group: "Giảm đau, hạ sốt",
    form: "Viên nén",
    dose: "Uống 1 viên khi sốt hoặc đau, cách nhau tối thiểu 4-6 giờ. Không vượt quá liều tối đa/ngày.",
    indication: "Sốt, đau đầu, đau cơ, đau họng, đau nhẹ đến vừa.",
    contraindication: "Suy gan nặng, quá mẫn với paracetamol.",
    sideEffects: ["Hiếm gặp dị ứng da", "Tăng men gan khi quá liều", "Buồn nôn nhẹ"],
    interactions: ["Rượu làm tăng nguy cơ độc gan", "Thận trọng khi dùng cùng thuốc chống đông đường uống"],
    note: "Kiểm tra các thuốc phối hợp để tránh trùng hoạt chất paracetamol.",
    risk: "Trung bình",
    tone: "amber",
  },
  {
    id: "metformin",
    name: "Metformin 500mg",
    group: "Điều trị đái tháo đường",
    form: "Viên nén",
    dose: "Uống sau ăn, thường bắt đầu 500mg x 1-2 lần/ngày rồi chỉnh theo đáp ứng.",
    indication: "Đái tháo đường type 2, đặc biệt ở người thừa cân hoặc kháng insulin.",
    contraindication: "Suy thận nặng, nhiễm toan chuyển hóa, mất nước nặng hoặc thiếu oxy mô.",
    sideEffects: ["Đầy bụng", "Tiêu chảy", "Buồn nôn", "Hiếm gặp nhiễm toan lactic"],
    interactions: ["Cản quang iod có thể tăng nguy cơ suy thận cấp", "Rượu làm tăng nguy cơ nhiễm toan lactic"],
    note: "Nên đánh giá eGFR trước điều trị và theo dõi định kỳ.",
    risk: "Cao",
    tone: "rose",
  },
  {
    id: "amlodipine",
    name: "Amlodipine 5mg",
    group: "Chẹn kênh canxi",
    form: "Viên nén",
    dose: "Uống 1 viên/ngày, có thể dùng cùng hoặc không cùng thức ăn.",
    indication: "Tăng huyết áp, đau thắt ngực ổn định.",
    contraindication: "Hạ huyết áp nặng, sốc tim, quá mẫn với amlodipine.",
    sideEffects: ["Phù mắt cá chân", "Đỏ bừng mặt", "Chóng mặt", "Hồi hộp"],
    interactions: ["Thận trọng với thuốc ức chế CYP3A4 mạnh", "Có thể tăng tác dụng hạ áp khi dùng cùng thuốc hạ áp khác"],
    note: "Theo dõi phù ngoại biên và huyết áp tại nhà trong giai đoạn chỉnh liều.",
    risk: "Trung bình",
    tone: "amber",
  },
  {
    id: "cetirizine",
    name: "Cetirizine 10mg",
    group: "Kháng histamine",
    form: "Viên nén",
    dose: "Uống 1 viên/ngày, ưu tiên buổi tối nếu gây buồn ngủ.",
    indication: "Viêm mũi dị ứng, mày đay, ngứa do dị ứng.",
    contraindication: "Quá mẫn với cetirizine hoặc hydroxyzine, suy thận nặng cần chỉnh liều.",
    sideEffects: ["Buồn ngủ", "Khô miệng", "Mệt mỏi nhẹ"],
    interactions: ["Rượu và thuốc an thần làm tăng buồn ngủ", "Thận trọng khi lái xe hoặc vận hành máy"],
    note: "Ít gây buồn ngủ hơn thế hệ cũ nhưng vẫn cần cảnh báo bệnh nhân.",
    risk: "Thấp",
    tone: "green",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen 400mg",
    group: "NSAID",
    form: "Viên nén",
    dose: "Uống sau ăn khi đau hoặc viêm, dùng liều thấp nhất trong thời gian ngắn nhất.",
    indication: "Đau cơ xương khớp, đau răng, đau bụng kinh, viêm nhẹ.",
    contraindication: "Loét dạ dày tiến triển, suy thận nặng, dị ứng NSAID, 3 tháng cuối thai kỳ.",
    sideEffects: ["Đau dạ dày", "Tăng nguy cơ xuất huyết tiêu hóa", "Giữ nước, tăng huyết áp"],
    interactions: ["Tăng nguy cơ chảy máu khi dùng cùng thuốc chống đông", "Giảm tác dụng một số thuốc hạ áp"],
    note: "Không phù hợp với bệnh nhân có tiền sử loét dạ dày hoặc bệnh thận chưa kiểm soát.",
    risk: "Cao",
    tone: "rose",
  },
];

export default function DoctorFeedback() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(drugs[0].id);
  const selectedDrug = drugs.find((drug) => drug.id === selectedId) ?? drugs[0];

  const filteredDrugs = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return drugs;

    return drugs.filter((drug) => {
      return (
        drug.name.toLowerCase().includes(keyword) ||
        drug.group.toLowerCase().includes(keyword) ||
        drug.indication.toLowerCase().includes(keyword)
      );
    });
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Tra cứu thuốc"
        description="Tìm nhanh thông tin thuốc, liều dùng tham khảo, chống chỉ định, tác dụng phụ và tương tác cần lưu ý."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <SectionCard
          title="Danh mục thuốc"
          actions={
            <div className="flex h-11 min-w-[280px] items-center gap-2 rounded-2xl border border-[#E2E8F0] px-3 text-[#64748B]">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                placeholder="Tìm tên thuốc, nhóm thuốc..."
              />
            </div>
          }
        >
          <div className="space-y-3">
            {filteredDrugs.map((drug) => (
              <div
                key={drug.id}
                className={`flex flex-col gap-4 rounded-[18px] border p-4 transition sm:flex-row sm:items-center ${
                  selectedDrug.id === drug.id ? "border-[#CFE3FF] bg-[#EAF3FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F2F7FB]"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F80ED] ring-1 ring-[#CFE3FF]">
                  <Pill className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-[#1E293B]">{drug.name}</h3>
                    <StatusBadge tone={drug.tone}>Nguy cơ {drug.risk}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#2D4A86]">{drug.group}</p>
                  <p className="mt-1 text-sm leading-6 text-[#64748B]">{drug.indication}</p>
                </div>
                <ActionButton variant="secondary" onClick={() => setSelectedId(drug.id)}>
                  Chi tiết
                </ActionButton>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={selectedDrug.name}
          description={`${selectedDrug.group} · ${selectedDrug.form}`}
          actions={<StatusBadge tone={selectedDrug.tone}>Nguy cơ {selectedDrug.risk}</StatusBadge>}
        >
          <div className="space-y-4">
            <DetailBlock icon={<ClipboardList className="h-5 w-5" />} title="Liều dùng tham khảo" content={selectedDrug.dose} />
            <DetailBlock icon={<Stethoscope className="h-5 w-5" />} title="Chỉ định" content={selectedDrug.indication} />
            <DetailBlock icon={<ShieldCheck className="h-5 w-5" />} title="Chống chỉ định" content={selectedDrug.contraindication} />

            <div className="rounded-2xl border border-[#E2E8F0] p-4">
              <h3 className="flex items-center gap-2 font-extrabold text-[#1E293B]">
                <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
                Tác dụng phụ thường gặp
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-6 text-[#64748B]">
                {selectedDrug.sideEffects.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] p-4">
              <h3 className="font-extrabold text-[#1E293B]">Tương tác cần lưu ý</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-6 text-[#64748B]">
                {selectedDrug.interactions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#CFE3FF] bg-[#F7FAFC] p-4">
              <p className="text-sm font-extrabold text-[#1E293B]">Ghi chú kê đơn</p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{selectedDrug.note}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function DetailBlock({ icon, title, content }: { icon: ReactNode; title: string; content: string }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] p-4">
      <h3 className="flex items-center gap-2 font-extrabold text-[#1E293B]">
        <span className="text-[#2F80ED]">{icon}</span>
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-6 text-[#64748B]">{content}</p>
    </div>
  );
}
