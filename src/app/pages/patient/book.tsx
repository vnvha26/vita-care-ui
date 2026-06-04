import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { mockDoctors, mockSpecialties } from "../../lib/mock-data";

export default function PatientBook() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const availableTimes = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ];

  const filteredDoctors = selectedSpecialty
    ? mockDoctors.filter((d) => d.specialtyId === selectedSpecialty && d.available)
    : mockDoctors.filter((d) => d.available);

  const handleSubmit = () => {
    alert("Đặt lịch thành công! Bạn sẽ nhận được xác nhận qua email.");
    navigate("/patient/appointments");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Đặt lịch khám</h1>
        <p className="text-gray-600 mt-1">Chọn bác sĩ và thời gian phù hợp với bạn</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {s}
              </div>
              <div
                className={`flex-1 h-1 ${
                  s < 3 ? (step > s ? "bg-blue-600" : "bg-gray-200") : ""
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-600"}>
            Chọn bác sĩ
          </span>
          <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-600"}>
            Chọn thời gian
          </span>
          <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-600"}>
            Xác nhận
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chọn chuyên khoa và bác sĩ</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chuyên khoa</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setSelectedDoctor("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả chuyên khoa</option>
                {mockSpecialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.icon} {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 mb-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDoctor === doctor.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex gap-4">
                    <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                      <p className="text-sm text-blue-600">{doctor.specialtyName}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <span>⭐ {doctor.rating}</span>
                        <span>💼 {doctor.experience} năm KN</span>
                        <span className="font-semibold text-gray-900">
                          {doctor.price.toLocaleString()}đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedDoctor}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chọn ngày và giờ</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ngày khám</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Giờ khám</label>
              <div className="grid grid-cols-4 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do khám (không bắt buộc)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả triệu chứng hoặc lý do khám của bạn..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận thông tin</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Thông tin bác sĩ</h4>
                {mockDoctors
                  .filter((d) => d.id === selectedDoctor)
                  .map((doctor) => (
                    <div key={doctor.id} className="flex gap-4">
                      <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <p className="font-semibold">{doctor.name}</p>
                        <p className="text-sm text-blue-600">{doctor.specialtyName}</p>
                        <p className="text-sm text-gray-600">{doctor.clinicName}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Thời gian</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📅 Ngày:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">🕐 Giờ:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>

              {reason && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Lý do khám</h4>
                  <p className="text-sm text-gray-600">{reason}</p>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Tổng chi phí:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {mockDoctors.find((d) => d.id === selectedDoctor)?.price.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
