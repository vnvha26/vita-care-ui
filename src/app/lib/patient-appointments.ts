export type PatientAppointmentStatus = "Chờ khám" | "Chờ xác nhận" | "Đã xác nhận" | "Đã đổi lịch";

export type PatientAppointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  clinic: string;
  address: string;
  status: PatientAppointmentStatus;
  reason: string;
  note: string;
  price?: string;
  isOverdue?: boolean;
};

export const demoPatientAppointments: PatientAppointment[] = [
  {
    id: "a001",
    title: "Tái khám nội tổng quát",
    date: "12/06/2026",
    time: "09:00 - 10:00",
    doctor: "BS. Nguyễn Văn B",
    specialty: "Nội tổng quát",
    clinic: "VitaCare Trung tâm",
    address: "Q.1, TP.HCM",
    status: "Chờ xác nhận",
    reason: "Theo dõi đau thượng vị và tình trạng ợ chua sau ăn.",
    note: "Mang theo đơn thuốc cũ, đến trước giờ khám 15 phút để xác nhận thông tin.",
    price: "250.000 VND",
  },
  {
    id: "a002",
    title: "Khám tiêu hóa",
    date: "20/04/2026",
    time: "15:30 - 16:00",
    doctor: "BS. Trần Thị B",
    specialty: "Tiêu hóa",
    clinic: "Phòng khám Đa khoa TW1",
    address: "Q.3, TP.HCM",
    status: "Đã xác nhận",
    reason: "Đánh giá đau dạ dày, trào ngược và chế độ ăn.",
    note: "Không dùng cà phê trước buổi khám, ghi lại các món ăn dễ làm đau bụng.",
    price: "220.000 VND",
    isOverdue: true,
  },
  {
    id: "a003",
    title: "Tư vấn kết quả xét nghiệm",
    date: "02/04/2026",
    time: "10:00 - 10:30",
    doctor: "BS. Lê Minh C",
    specialty: "Nội tổng quát",
    clinic: "Tư vấn trực tuyến",
    address: "Cuộc gọi video trong ứng dụng",
    status: "Đã đổi lịch",
    reason: "Bác sĩ giải thích kết quả xét nghiệm máu và chỉ số men gan.",
    note: "Kiểm tra kết nối mạng trước 5 phút, chuẩn bị câu hỏi cần tư vấn.",
    price: "250.000 VND",
    isOverdue: true,
  },
];

let temporaryPatientAppointments: PatientAppointment[] = [];
const legacyAppointmentStorageKey = "patient-booking-request-demo";

function clearLegacyAppointmentStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(legacyAppointmentStorageKey);
}

export function addTemporaryPatientAppointment(appointment: PatientAppointment) {
  clearLegacyAppointmentStorage();
  temporaryPatientAppointments = [
    appointment,
    ...temporaryPatientAppointments.filter((item) => item.id !== appointment.id),
  ];
}

export function getPatientAppointments() {
  clearLegacyAppointmentStorage();
  return [
    ...temporaryPatientAppointments,
    ...demoPatientAppointments.filter(
      (appointment) => !temporaryPatientAppointments.some((item) => item.id === appointment.id)
    ),
  ];
}

export function getLatestTemporaryPatientAppointment() {
  clearLegacyAppointmentStorage();
  return temporaryPatientAppointments[0] ?? null;
}

export function getUpcomingPatientAppointment() {
  return getPatientAppointments()[0] ?? null;
}
