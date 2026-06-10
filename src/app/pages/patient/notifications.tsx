import { ListPage } from "../shared/standard-pages";

export default function PatientNotifications() {
  return (
    <ListPage
      title="Thông báo"
      description="Các nhắc nhở liên quan đến lịch khám, thuốc và kết quả khám bệnh."
      rows={[
        { title: "Nhắc lịch khám", description: "Bạn có lịch khám với BS. Nguyễn Văn B vào 09:00 ngày mai.", badge: "Chưa đọc", tone: "amber" },
        { title: "Nhắc uống thuốc", description: "Đã đến giờ uống Amoxicillin 500mg.", badge: "12:00", tone: "blue" },
        { title: "Kết quả khám có sẵn", description: "Kết quả xét nghiệm máu đã được cập nhật.", badge: "Mới", tone: "green" },
      ]}
    />
  );
}

