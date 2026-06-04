const symptoms = [
  {
    time: "Hôm nay",
    title: "Đau đầu, buồn nôn",
    content: "Mức độ đau 6/10, mệt mỏi, chưa ghi nhận dấu hiệu nguy hiểm.",
    badge: "Nguy cơ trung bình",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    time: "Hôm qua",
    title: "Ho, đau họng",
    content: "Triệu chứng nhẹ, không sốt cao, được gợi ý chăm sóc tại nhà.",
    badge: "Nguy cơ thấp",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    time: "3 ngày trước",
    title: "Mệt mỏi kéo dài",
    content: "Chatbot yêu cầu bổ sung thời gian ngủ, mức độ căng thẳng và bệnh nền.",
    badge: "Cần bổ sung",
    badgeClass: "bg-red-100 text-red-700",
  },
];

const checklist = [
  "Mức độ đau đầu tăng hay giảm?",
  "Có sốt, nôn nhiều hoặc nhìn mờ không?",
  "Đã nghỉ ngơi và uống đủ nước chưa?",
  "Có cần đặt lịch khám không?",
];

export default function PatientSymptomTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Theo dõi triệu chứng</h1>
        <p className="mt-1 text-gray-600">
          Cập nhật thay đổi triệu chứng theo thời gian để chatbot đánh giá chính xác hơn.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Dòng thời gian triệu chứng</h2>

          <div className="mt-6 space-y-5">
            {symptoms.map((item) => (
              <div key={item.title} className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <div className="pt-4 text-sm font-semibold text-gray-500">{item.time}</div>
                <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.content}</p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Nhắc theo dõi</h2>
          <p className="mt-2 text-sm text-gray-600">Các dấu hiệu cần cập nhật trong 24 giờ tới.</p>

          <div className="mt-5 space-y-3">
            {checklist.map((item) => (
              <label key={item} className="flex gap-3 rounded-xl border border-gray-200 bg-slate-50 p-3 text-sm text-gray-700">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-indigo-600" />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <button className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Cập nhật triệu chứng
          </button>
        </aside>
      </div>
    </div>
  );
}