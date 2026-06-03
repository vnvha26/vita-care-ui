import { FormPage } from "../shared/standard-pages";

export default function ManagerSchedule() {
  return (
    <FormPage
      title="Giờ làm việc"
      description="Thiết lập khung giờ khám, lịch nghỉ và năng lực tiếp nhận của từng chuyên khoa."
      fields={["Chuyên khoa", "Bác sĩ", "Ngày làm việc", "Giờ bắt đầu", "Giờ kết thúc", "Số slot"]}
      sideRows={[
        { title: "Khung giờ cao điểm", description: "08:30 - 10:30 có nhu cầu cao nhất.", badge: "Gợi ý", tone: "blue" },
        { title: "Quá tải", description: "Thần kinh đang vượt 90% công suất.", badge: "Cảnh báo", tone: "rose" },
      ]}
    />
  );
}
