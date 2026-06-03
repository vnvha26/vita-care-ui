import { ChatPage, commonRows } from "../shared/standard-pages";

export default function ManagerChat() {
  return (
    <ChatPage
      title="Messenger phòng khám"
      description="Trao đổi với người dùng, bác sĩ và chuyên gia trong cùng một luồng điều phối."
      contacts={[
        { title: "Nguyễn Văn Tuấn", description: "Muốn đặt lịch khám nội tổng quát.", badge: "Khách vãng lai", tone: "violet" },
        { title: "BS. Nguyễn Văn A", description: "Cần đổi lịch chiều nay.", badge: "Bác sĩ", tone: "blue" },
        { title: "TS. Nguyễn Thị Lan", description: "Gửi báo cáo UIUX mới.", badge: "Chuyên gia", tone: "green" },
      ]}
      currentName="Nguyễn Văn Tuấn"
      messages={commonRows.operations}
    />
  );
}

