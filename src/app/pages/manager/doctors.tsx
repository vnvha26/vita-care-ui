import { ListPage } from "../shared/standard-pages";

export default function ManagerDoctors() {
  return (
    <ListPage
      title="Quản lý bác sĩ"
      description="Quản lý hồ sơ bác sĩ, chuyên khoa, lịch làm việc và trạng thái nhận lịch."
      actionLabel="Thêm bác sĩ"
      rows={[
        { title: "BS. Nguyễn Văn A", description: "Tim mạch · 15 năm kinh nghiệm · Đang nhận lịch", badge: "Hoạt động", tone: "green" },
        { title: "BS. Trần Thị B", description: "Tiêu hóa · 12 năm kinh nghiệm · 4 lịch hôm nay", badge: "Bận", tone: "amber" },
        { title: "BS. Lê Văn C", description: "Thần kinh · 20 năm kinh nghiệm · Tạm ngưng nhận lịch", badge: "Tạm nghỉ", tone: "rose" },
      ]}
    />
  );
}

