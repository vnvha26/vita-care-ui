import { ListPage } from "../shared/standard-pages";
import { getLatestTemporaryPatientAppointment } from "../../lib/patient-appointments";

export default function PatientNotifications() {
  const latestAppointment = getLatestTemporaryPatientAppointment();
  const appointmentRows = latestAppointment
    ? [
        {
          title: "Yêu cầu đặt lịch đã được gửi",
          description: `${latestAppointment.doctor} · ${latestAppointment.specialty} · ${latestAppointment.date}, ${latestAppointment.time}. Trạng thái: ${latestAppointment.status}.`,
          badge: "Mới",
          tone: "blue" as const,
        },
      ]
    : [];

  return (
    <ListPage
      title="Thông báo"
      description="Các nhắc nhở liên quan đến lịch khám, thuốc và kết quả khám bệnh."
      rows={[
        ...appointmentRows,
        { title: "Nhắc lịch khám", description: "Bạn có lịch khám với BS. Nguyễn Văn B vào 09:00 ngày mai.", badge: "Chưa đọc", tone: "amber" },
        { title: "Nhắc uống thuốc", description: "Đã đến giờ uống Amoxicillin 500mg.", badge: "12:00", tone: "blue" },
        { title: "Kết quả khám có sẵn", description: "Kết quả xét nghiệm máu đã được cập nhật.", badge: "Mới", tone: "green" },
      ]}
    />
  );
}

