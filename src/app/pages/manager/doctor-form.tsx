import { FormPage } from "../shared/standard-pages";

export default function DoctorForm() {
  return (
    <FormPage
      title="Thông tin bác sĩ"
      description="Tạo hoặc cập nhật hồ sơ bác sĩ, chuyên khoa và lịch làm việc."
      fields={["Họ và tên", "Chuyên khoa", "Số chứng chỉ", "Email", "Số điện thoại", "Giá khám"]}
      sideRows={[
        { title: "Lịch làm việc", description: "Cần thiết lập sau khi tạo hồ sơ.", badge: "Bước tiếp", tone: "blue" },
        { title: "Kiểm duyệt", description: "Hồ sơ cần được quản lý xác nhận.", badge: "Bắt buộc", tone: "amber" },
      ]}
    />
  );
}
