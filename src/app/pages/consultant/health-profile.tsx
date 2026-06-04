export default function PatientHealthProfile() {
  const personalInfo = [
    ["Họ và tên", "Nguyễn Văn Tuấn"],
    ["Tuổi", "30"],
    ["Giới tính", "Nam"],
    ["Nghề nghiệp", "Lập trình viên"],
    ["Chiều cao", "172 cm"],
    ["Cân nặng", "72 kg"],
    ["Thói quen", "Ít vận động"],
    ["Giấc ngủ", "Không ổn định"],
  ];

  const medicalGroups = [
    ["Bệnh nền", ["Chưa ghi nhận", "Hay đau đầu khi căng thẳng"]],
    ["Dị ứng", ["Chưa có thông tin"]],
    ["Thuốc đang dùng", ["Không dùng thuốc thường xuyên"]],
    ["Ghi chú sức khỏe", ["Thường xuyên ngồi lâu", "Áp lực công việc cao"]],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ sức khỏe</h1>
        <p className="mt-1 text-gray-600">
          Thông tin này giúp chatbot đặt câu hỏi phù hợp và đánh giá nguy cơ an toàn hơn.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {personalInfo.map(([label, value]) => (
              <div key={label}>
                <label className="text-sm font-semibold text-gray-700">{label}</label>
                <div className="mt-2 rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-gray-900">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Bệnh nền, dị ứng và thuốc</h2>
          <div className="mt-5 space-y-4">
            {medicalGroups.map(([title, items]) => (
              <div key={title as string} className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                <h3 className="font-bold text-gray-900">{title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(items as string[]).map((item) => (
                    <span key={item} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Cập nhật hồ sơ
          </button>
        </section>
      </div>
    </div>
  );
}