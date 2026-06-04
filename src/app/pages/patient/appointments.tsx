import { Link } from "react-router";
import { mockAppointments } from "../../lib/mock-data";
import { useState } from "react";

export default function PatientAppointments() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");

  const filteredAppointments =
    filter === "all"
      ? mockAppointments
      : mockAppointments.filter((a) => a.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Chờ khám</span>;
      case "completed":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Hoàn thành</span>;
      case "cancelled":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">Đã hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lịch khám của tôi</h1>
          <p className="text-gray-600 mt-1">Quản lý các lịch hẹn của bạn</p>
        </div>
        <Link
          to="/patient/book"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + Đặt lịch mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tất cả ({mockAppointments.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Chờ khám ({mockAppointments.filter((a) => a.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Hoàn thành ({mockAppointments.filter((a) => a.status === "completed").length})
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded-lg ${
              filter === "cancelled"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Đã hủy ({mockAppointments.filter((a) => a.status === "cancelled").length})
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📅
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.type}
                    </h3>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <p className="text-gray-600 mt-1">Mã lịch hẹn: {appointment.id}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>👨‍⚕️</span>
                      <span>Bác sĩ khám: BS. Nguyễn Văn A</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📅</span>
                      <span>Ngày: {appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>🕐</span>
                      <span>Giờ: {appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📍</span>
                      <span>Phòng khám Đa khoa TW1</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/patient/appointments/${appointment.id}`}
                  className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Xem chi tiết
                </Link>
                {appointment.status === "pending" && (
                  <>
                    <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Đổi lịch
                    </button>
                    <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                      Hủy lịch
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có lịch khám</h3>
          <p className="text-gray-600 mb-6">Đặt lịch khám ngay để được tư vấn sức khỏe</p>
          <Link
            to="/patient/book"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Đặt lịch khám
          </Link>
        </div>
      )}
    </div>
  );
}
