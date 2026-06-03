import { ReportPage } from "../shared/standard-pages";

export default function ExpertReports() {
  return (
    <ReportPage
      title="Báo cáo UIUX"
      description="Theo dõi chất lượng trải nghiệm theo luồng tư vấn, đặt lịch và hồ sơ sức khỏe."
      rows={[
        { title: "Tỉ lệ hoàn tất tư vấn", description: "82% người dùng hoàn tất luồng chatbot ban đầu.", badge: "Tốt", tone: "green" },
        { title: "Rời luồng đặt lịch", description: "18% rời ở bước chọn thời gian.", badge: "Cần tối ưu", tone: "amber" },
        { title: "Khả năng đọc cảnh báo", description: "Cảnh báo y tế cần ngắn hơn và nổi bật hơn.", badge: "Ưu tiên", tone: "rose" },
      ]}
    />
  );
}
