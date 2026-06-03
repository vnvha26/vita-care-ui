import { ChatPage, commonRows } from "../shared/standard-pages";

export default function DoctorChat() {
  return (
    <ChatPage
      title="Chat tư vấn"
      description="Trao đổi với chuyên gia, đồng nghiệp và bệnh nhân trong cùng một giao diện."
      contacts={[
        { title: "TS. Nguyễn Thị Lan", description: "Cần xem thêm xét nghiệm chức năng thận.", badge: "Chuyên gia", tone: "violet" },
        { title: "Nguyễn Văn An", description: "Bác sĩ ơi, em muốn hỏi về đơn thuốc.", badge: "Bệnh nhân", tone: "blue" },
        { title: "BS. Lê Thị C", description: "Case này cần thêm ý kiến.", badge: "Đồng nghiệp", tone: "green" },
      ]}
      currentName="TS. Nguyễn Thị Lan"
      messages={commonRows.clinical}
    />
  );
}

