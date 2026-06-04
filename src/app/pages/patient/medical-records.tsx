import { ListPage } from "../shared/standard-pages";

export default function PatientMedicalRecords() {
  return (
    <ListPage
      title="Hồ sơ khám bệnh"
      description="Xem lại chẩn đoán, đơn thuốc, ghi chú của bác sĩ và kết quả xét nghiệm."
      rows={[
        { title: "Phiếu khám MR001", description: "Viêm họng cấp, Amoxicillin 500mg, tái khám nếu không giảm sau 5 ngày.", badge: "Mới", tone: "blue" },
        { title: "Phiếu khám MR002", description: "Đau dạ dày, Omeprazole 20mg, điều chỉnh chế độ ăn.", badge: "Đã xem", tone: "green" },
        { title: "Xét nghiệm máu", description: "Kết quả đã sẵn sàng, cần bác sĩ giải thích thêm.", badge: "Cần xem", tone: "amber" },
      ]}
    />
  );
}
