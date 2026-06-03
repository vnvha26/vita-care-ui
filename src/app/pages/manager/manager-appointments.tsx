import { ListPage } from "../shared/standard-pages";

export default function ManagerAppointments() {
  return (
    <ListPage
      title="Tiếp nhận lịch hẹn"
      description="Duyệt, điều phối và theo dõi lịch hẹn từ chatbot, bệnh nhân và quầy tiếp nhận."
      actionLabel="Tạo lịch"
      rows={[
        { title: "Nguyễn Văn Tuấn", description: "Đau đầu, buồn nôn · Gợi ý nội tổng quát · 10:00", badge: "AI gợi ý", tone: "violet" },
        { title: "Trần Thị Bình", description: "Khám tiêu hóa · 14:00 · Chờ xác nhận", badge: "Chờ duyệt", tone: "amber" },
        { title: "Lê Minh Châu", description: "Đau ngực · Chuyển ưu tiên cao", badge: "Khẩn", tone: "rose" },
      ]}
    />
  );
}

