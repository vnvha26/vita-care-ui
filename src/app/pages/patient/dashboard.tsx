import { Link } from "react-router";
import { mockAppointments, mockNotifications } from "../../lib/mock-data";

export default function PatientDashboard() {
  const upcomingAppointments = mockAppointments.filter((a) => a.status === "pending");
  const unreadNotifications = mockNotifications.filter((n) => !n.read);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-gray-600 mt-1">Chào mừng trở lại, Nguyễn Văn An</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-3">📅</div>
          <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
          <div className="text-blue-100 mt-1">Lịch hẹn sắp tới</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-3">📋</div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-green-100 mt-1">Hồ sơ khám bệnh</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="text-3xl mb-3">🔔</div>
          <div className="text-3xl font-bold">{unreadNotifications.length}</div>
          <div className="text-orange-100 mt-1">Thông báo mới</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Lịch hẹn sắp tới</h2>
            <Link
              to="/patient/appointments"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-600 mt-1">{appointment.type}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    Chờ khám
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>📅</span>
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🕐</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <Link
                  to={`/patient/appointments/${appointment.id}`}
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                >
                  Xem chi tiết →
                </Link>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📅</div>
                <p>Chưa có lịch hẹn nào</p>
                <Link
                  to="/patient/book"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Đặt lịch khám
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Thông báo</h2>
            <Link
              to="/patient/notifications"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="space-y-3">
            {mockNotifications.slice(0, 4).map((notification) => (
              <div
                key={notification.id}
                className={`border border-gray-200 rounded-lg p-4 ${
                  !notification.read ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {notification.type === "appointment" && "📅"}
                    {notification.type === "medication" && "💊"}
                    {notification.type === "result" && "📋"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {notification.date} • {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Cần tư vấn sức khỏe?</h2>
            <p className="text-blue-100">
              Đặt lịch khám ngay để được bác sĩ tư vấn chuyên môn
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/patient/book"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              📅 Đặt lịch ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
