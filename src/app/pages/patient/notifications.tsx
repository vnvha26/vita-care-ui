import { Link } from "react-router";
import { mockNotifications } from "../../lib/mock-data";

export default function PatientNotifications() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thông báo</h1>
          <p className="text-gray-600 mt-1">Nhận nhắc lịch khám và lịch uống thuốc</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${
              !notification.read ? "border-l-4 border-blue-600" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {notification.type === "appointment" && "📅"}
                {notification.type === "medication" && "💊"}
                {notification.type === "result" && "📋"}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-700 mt-1">{notification.content}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {notification.date} • {notification.time}
                    </div>
                  </div>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>

                {notification.type === "appointment" && (
                  <Link
                    to="/patient/appointments"
                    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                  >
                    Xem chi tiết lịch hẹn →
                  </Link>
                )}
                {notification.type === "result" && (
                  <Link
                    to="/patient/medical-records"
                    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                  >
                    Xem kết quả khám →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có thông báo</h3>
          <p className="text-gray-600">Các thông báo quan trọng sẽ xuất hiện ở đây</p>
        </div>
      )}
    </div>
  );
}
