import { ChatPage, commonRows } from "../shared/standard-pages";

export default function ExpertChat() {
  return (
    <ChatPage
      title="Chat trao đổi"
      description="Trao đổi với bác sĩ và đội quản lý về ca đánh giá, dữ liệu và cải tiến giao diện."
      contacts={[
        { title: "BS. Nguyễn Văn A", description: "Cần góp ý cho ca tiểu đường type 2.", badge: "Bác sĩ", tone: "blue" },
        { title: "Quản lý phòng khám", description: "Xin nhận xét luồng đặt lịch.", badge: "Quản lý", tone: "violet" },
        { title: "Nguyễn Văn Tuấn", description: "Góp ý về chatbot tư vấn.", badge: "Người dùng", tone: "green" },
      ]}
      currentName="BS. Nguyễn Văn A"
      messages={commonRows.clinical}
    />
  );
}

