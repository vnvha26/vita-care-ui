import { useState } from "react";

const histories = [
  {
    title: "Đau đầu, buồn nôn",
    meta: "Hôm nay · Nguy cơ trung bình · Đã lưu",
    detail:
      "Người dùng báo đau đầu vùng trán, buồn nôn nhẹ, mệt mỏi. Mức độ đau 6/10. Không sốt, không nhìn mờ, không yếu tay chân.",
    result:
      "Nguy cơ trung bình. Khuyến nghị nghỉ ngơi, uống đủ nước, theo dõi trong 24 giờ và đi khám nếu triệu chứng tăng nặng.",
  },
  {
    title: "Ho, đau họng",
    meta: "Hôm qua · Nguy cơ thấp · Gợi ý chăm sóc tại nhà",
    detail: "Ho nhẹ, đau họng, không sốt cao, không khó thở.",
    result: "Nguy cơ thấp. Uống đủ nước, nghỉ ngơi, theo dõi thêm.",
  },
  {
    title: "Đau bụng nhẹ",
    meta: "12/05/2026 · Nguy cơ thấp · Đã xem",
    detail: "Đau bụng nhẹ sau ăn, không nôn, không sốt.",
    result: "Theo dõi chế độ ăn, tránh đồ cay nóng.",
  },
];

export default function PatientConsultationHistory() {
  const [selected, setSelected] = useState(histories[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lịch sử tư vấn</h1>
        <p className="mt-1 text-gray-600">Xem lại các phiên tư vấn sức khỏe với chatbot.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <section className="space-y-3">
          {histories.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelected(item)}
              className={`w-full rounded-2xl border p-5 text-left transition ${
                selected.title === item.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.meta}</p>
            </button>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết phiên tư vấn</h2>
            <p className="mt-1 text-gray-600">{selected.title}</p>
            <span className="mt-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
              Nguy cơ trung bình
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
              <h3 className="font-bold text-gray-900">Thông tin người dùng đã nhập</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{selected.detail}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
              <h3 className="font-bold text-gray-900">Kết quả đánh giá nguy cơ</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{selected.result}</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
              <h3 className="font-bold text-gray-900">Gợi ý tiếp theo</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Theo dõi mức độ triệu chứng, nhiệt độ cơ thể và các dấu hiệu bất thường khác.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}