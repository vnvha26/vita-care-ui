import { SaveableForm } from "./saveable-form";

export default function DoctorProfile() {
  return (
    <SaveableForm
      storageKey="doctor-profile"
      title="Hồ sơ bác sĩ"
      description="Cập nhật thông tin chuyên môn, lịch làm việc và kênh liên hệ."
      fields={["Họ và tên", "Chuyên khoa", "Số chứng chỉ", "Email", "Số điện thoại", "Phòng khám"]}
      initialValues={{
        "Họ và tên": "Bs. Nguyễn Văn B",
        "Chuyên khoa": "Nội tổng quát",
        "Số chứng chỉ": "CCHN-2026-001",
        Email: "doctor@vitacare.vn",
        "Số điện thoại": "0901122334",
        "Phòng khám": "VitaCare AI Clinic",
      }}
      notePlaceholder="Mô tả kinh nghiệm, khung giờ làm việc hoặc ghi chú liên hệ"
      sideTitle="Thông tin hỗ trợ"
      sideRows={[
        { title: "Trạng thái", description: "Đang nhận lịch khám mới.", badge: "Hoạt động", tone: "green" },
        { title: "Đánh giá", description: "4.8/5 từ người bệnh.", badge: "Tốt", tone: "blue" },
        { title: "Cập nhật hồ sơ", description: "Thông tin đã lưu sẽ được giữ lại trên trình duyệt.", badge: "Tự động", tone: "violet" },
      ]}
    />
  );
}
