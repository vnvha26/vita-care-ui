import { mockMedicalRecords } from "../../lib/mock-data";

export default function PatientMedicalRecords() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ khám bệnh</h1>
        <p className="text-gray-600 mt-1">Xem lại kết quả khám và đơn thuốc</p>
      </div>

      <div className="grid gap-6">
        {mockMedicalRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📋
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Phiếu khám bệnh #{record.id}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{record.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👨‍⚕️</span>
                      <span>{record.doctorName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                📥 Tải xuống PDF
              </button>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Chẩn đoán</h4>
                <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  {record.diagnosis}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Đơn thuốc</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <ul className="space-y-2">
                    {record.prescription.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">💊</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Ghi chú của bác sĩ</h4>
                <p className="text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
                  {record.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockMedicalRecords.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có hồ sơ khám bệnh</h3>
          <p className="text-gray-600">Các kết quả khám sẽ xuất hiện ở đây</p>
        </div>
      )}
    </div>
  );
}
