import { SaveableForm } from "./saveable-form";

export default function DoctorExamination() {
  return (
    <SaveableForm
      storageKey="doctor-examination"
      title="Nhập liệu khám bệnh"
      description="Ghi nhận triệu chứng, chẩn đoán, đơn thuốc và kế hoạch tái khám."
      fields={["Mã bệnh nhân", "Triệu chứng chính", "Chẩn đoán", "Mức độ ưu tiên", "Đơn thuốc", "Ngày tái khám"]}
      initialValues={{
        "Mã bệnh nhân": "P001",
        "Triệu chứng chính": "Đau bụng vùng thượng vị, ợ chua sau ăn",
        "Chẩn đoán": "Đau dạ dày nhẹ",
        "Mức độ ưu tiên": "Theo dõi",
        "Đơn thuốc": "Omeprazole 20mg, Gaviscon sau bữa ăn",
        "Ngày tái khám": "26-04-2026",
      }}
      notePlaceholder="Phác đồ điều trị / lời dặn bệnh nhân"
      sideTitle="Gợi ý lâm sàng"
      sideRows={[
        {
          title: "Kiểm tra dấu hiệu cảnh báo",
          description: "Đau ngực, khó thở, sốt cao hoặc yếu liệt cần xử trí ngay.",
          badge: "Bắt buộc",
          tone: "rose",
        },
        {
          title: "Gọi chuyên gia",
          description: "Kích hoạt khi ca vượt phạm vi chuyên môn hoặc cần hội chẩn.",
          badge: "Tùy chọn",
          tone: "blue",
        },
        {
          title: "Lưu hồ sơ",
          description: "Sau khi bấm lưu, nội dung được giữ lại để tiếp tục chỉnh sửa.",
          badge: "Đã bật",
          tone: "green",
        },
      ]}
    />
  );
}
