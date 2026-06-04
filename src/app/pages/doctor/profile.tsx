import { FormPage } from "../shared/standard-pages";

export default function DoctorProfile() {
  return (
    <FormPage
      title="Hồ sơ bác sĩ"
      description="Cập nhật thông tin chuyên môn, lịch làm việc và kênh liên hệ."
      fields={["Họ và tên", "Chuyên khoa", "Số chứng chỉ", "Email", "Số điện thoại", "Phòng khám"]}
      sideRows={[
        { title: "Trạng thái", description: "Đang nhận lịch khám mới.", badge: "Hoạt động", tone: "green" },
        { title: "Đánh giá", description: "4.8/5 từ người bệnh.", badge: "Tốt", tone: "blue" },
      ]}
    />
  );
}
