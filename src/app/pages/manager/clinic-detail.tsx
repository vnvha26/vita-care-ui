import { ListPage } from "../shared/standard-pages";

export default function ClinicDetail() {
  return (
    <ListPage
      title="Thông tin phòng khám"
      description="Tổng hợp hồ sơ phòng khám, năng lực tiếp nhận và trạng thái vận hành."
      actionLabel="Cập nhật"
      rows={[
        { title: "Phòng khám Đa khoa TW1", description: "123 Nguyễn Văn Linh, Q.7, TP.HCM · 12 bác sĩ · 342 bệnh nhân", badge: "Hoạt động", tone: "green" },
        { title: "Chuyên khoa chính", description: "Tim mạch, tiêu hóa, thần kinh, da liễu và nội tổng quát.", badge: "5 khoa", tone: "blue" },
        { title: "Năng lực tiếp nhận", description: "42 lịch/ngày, có hỗ trợ tư vấn trực tuyến.", badge: "Tốt", tone: "green" },
      ]}
    />
  );
}

