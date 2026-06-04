import { FormPage } from "../shared/standard-pages";

export default function ClinicForm() {
  return (
    <FormPage
      title="Đăng ký thông tin phòng khám"
      description="Cập nhật thông tin pháp lý, địa chỉ, chuyên khoa và năng lực tiếp nhận."
      fields={["Tên phòng khám", "Địa chỉ", "Số điện thoại", "Email", "Giấy phép", "Chuyên khoa"]}
      sideRows={[
        { title: "Thông tin bắt buộc", description: "Tên, địa chỉ, giấy phép và số điện thoại.", badge: "Bắt buộc", tone: "rose" },
        { title: "Dữ liệu AI", description: "Thông tin chuyên khoa giúp chatbot gợi ý chính xác hơn.", badge: "Khuyến nghị", tone: "blue" },
      ]}
    />
  );
}
