import { ListPage } from "../shared/standard-pages";

export default function ExpertCaseDetail() {
  return (
    <ListPage
      title="Chi tiết ca đánh giá"
      description="Tổng hợp bối cảnh, dữ liệu đầu vào và khuyến nghị cho bác sĩ hoặc đội vận hành."
      rows={[
        { title: "Bối cảnh", description: "Người dùng mô tả triệu chứng chưa đầy đủ, cần chatbot hỏi thêm theo từng bước.", badge: "UIUX", tone: "violet" },
        { title: "Vấn đề", description: "Nút đặt lịch chưa đủ nổi bật sau khi có kết quả nguy cơ trung bình.", badge: "Cần sửa", tone: "amber" },
        { title: "Khuyến nghị", description: "Đưa CTA đặt lịch vào vùng gợi ý tiếp theo và giữ nội dung cảnh báo ngắn gọn.", badge: "Ưu tiên", tone: "blue" },
      ]}
    />
  );
}
