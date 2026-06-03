import { ListPage } from "../shared/standard-pages";

export default function ManagerAIData() {
  return (
    <ListPage
      title="Quản lý dữ liệu AI"
      description="Kiểm duyệt câu hỏi, nhãn triệu chứng và dữ liệu gợi ý cho chatbot."
      actionLabel="Thêm dữ liệu"
      rows={[
        { title: "Câu hỏi triệu chứng đau đầu", description: "Cần gắn nhãn chuyên khoa nội tổng quát và thần kinh.", badge: "Chờ duyệt", tone: "amber" },
        { title: "Kịch bản đặt lịch", description: "Gợi ý bác sĩ theo nguy cơ trung bình.", badge: "Đang dùng", tone: "green" },
        { title: "Cảnh báo y tế", description: "Bộ quy tắc chuyển tuyến khi có dấu hiệu nguy hiểm.", badge: "Quan trọng", tone: "rose" },
      ]}
    />
  );
}
