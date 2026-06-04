import { FormPage } from "../shared/standard-pages";

export default function ExpertProfile() {
  return (
    <FormPage
      title="Hồ sơ chuyên gia"
      description="Quản lý thông tin chuyên môn, lĩnh vực đánh giá và kênh liên hệ."
      fields={["Họ và tên", "Chuyên môn", "Email", "Số điện thoại", "Đơn vị", "Lĩnh vực phụ trách"]}
      sideRows={[
        { title: "Trạng thái", description: "Đang nhận ca đánh giá mới.", badge: "Hoạt động", tone: "green" },
        { title: "Phạm vi", description: "Chatbot, đặt lịch, hồ sơ sức khỏe.", badge: "UIUX", tone: "violet" },
      ]}
    />
  );
}
