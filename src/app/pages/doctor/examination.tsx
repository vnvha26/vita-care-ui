import { FormPage } from "../shared/standard-pages";

export default function DoctorExamination() {
  return (
    <FormPage
      title="Nhập liệu khám bệnh"
      description="Ghi nhận triệu chứng, chẩn đoán, đơn thuốc và kế hoạch tái khám."
      fields={["Mã bệnh nhân", "Triệu chứng chính", "Chẩn đoán", "Mức độ ưu tiên", "Đơn thuốc", "Ngày tái khám"]}
      sideTitle="Gợi ý lâm sàng"
      sideRows={[
        { title: "Kiểm tra dấu hiệu cảnh báo", description: "Đau ngực, khó thở, sốt cao hoặc yếu liệt.", badge: "Bắt buộc", tone: "rose" },
        { title: "Gọi chuyên gia", description: "Kích hoạt khi ca vượt phạm vi chuyên môn.", badge: "Tùy chọn", tone: "blue" },
      ]}
    />
  );
}
