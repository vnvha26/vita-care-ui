import { ListPage } from "../shared/standard-pages";

export default function PatientDoctors() {
  return (
    <ListPage
      title="Tìm bác sĩ"
      description="Tìm kiếm bác sĩ theo chuyên khoa, phòng khám, chi phí và trạng thái lịch trống."
      actionLabel="Lọc bác sĩ"
      rows={[
        { title: "BS. Nguyễn Văn A", description: "Tim mạch · 15 năm kinh nghiệm · Phòng khám Đa khoa TW1", badge: "Có lịch", tone: "green" },
        { title: "BS. Trần Thị B", description: "Tiêu hóa · 12 năm kinh nghiệm · Phòng khám Đa khoa TW1", badge: "Gợi ý", tone: "blue" },
        { title: "BS. Lê Văn C", description: "Thần kinh · 20 năm kinh nghiệm · Phòng khám Đa khoa TW2", badge: "Hết lịch", tone: "rose" },
      ]}
    />
  );
}

