import { ListPage, commonRows } from "../shared/standard-pages";

export default function PatientAppointments() {
  return (
    <ListPage
      title="Lịch khám của tôi"
      description="Quản lý lịch hẹn đã đặt, trạng thái xác nhận và các thay đổi cần xử lý."
      actionLabel="Đặt lịch mới"
      rows={[
        { title: "Tái khám nội tổng quát", description: "09:00 · 07/06/2026 · BS. Nguyễn Văn A", badge: "Chờ khám", tone: "amber" },
        { title: "Khám tiêu hóa", description: "14:00 · 12/06/2026 · BS. Trần Thị B", badge: "Đã xác nhận", tone: "green" },
        ...commonRows.care,
      ]}
    />
  );
}

