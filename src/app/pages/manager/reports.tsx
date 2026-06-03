import { ReportPage } from "../shared/standard-pages";

export default function ManagerReports() {
  return (
    <ReportPage
      title="Báo cáo tổng hợp"
      description="Theo dõi hiệu suất vận hành, lịch hẹn, phản hồi và dữ liệu chatbot."
      rows={[
        { title: "Lịch hẹn hoàn tất", description: "86% lịch hẹn được xác nhận và hoàn tất đúng giờ.", badge: "Tốt", tone: "green" },
        { title: "Nhu cầu chuyên khoa", description: "Nội tổng quát và thần kinh tăng trong tuần này.", badge: "Tăng", tone: "blue" },
        { title: "Cảnh báo vận hành", description: "3 khung giờ có nguy cơ quá tải cần điều phối.", badge: "Theo dõi", tone: "amber" },
      ]}
    />
  );
}
