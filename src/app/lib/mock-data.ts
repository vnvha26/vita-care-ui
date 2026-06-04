export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  lastVisit: string;
  diagnosis?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: "pending" | "completed" | "cancelled";
  type: string;
}

export interface Feedback {
  id: string;
  caseId: string;
  patientName: string;
  expertName: string;
  date: string;
  status: "pending" | "completed" | "urgent";
  content: string;
  priority: "low" | "medium" | "high";
}

export interface CaseReview {
  id: string;
  patientName: string;
  doctorName: string;
  submittedDate: string;
  status: "pending" | "in_review" | "completed";
  priority: "low" | "medium" | "high";
  diagnosis: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "expert" | "manager";
  status: "active" | "inactive";
  joinedDate: string;
  clinic?: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "active" | "inactive";
  doctorCount: number;
  patientCount: number;
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Nguyễn Văn An",
    age: 45,
    gender: "Nam",
    phone: "0901234567",
    status: "active",
    lastVisit: "2026-05-05",
    diagnosis: "Tiểu đường type 2",
  },
  {
    id: "P002",
    name: "Trần Thị Bình",
    age: 32,
    gender: "Nữ",
    phone: "0909876543",
    status: "active",
    lastVisit: "2026-05-06",
    diagnosis: "Cao huyết áp",
  },
  {
    id: "P003",
    name: "Lê Minh Châu",
    age: 28,
    gender: "Nữ",
    phone: "0912345678",
    status: "pending",
    lastVisit: "2026-05-07",
  },
  {
    id: "P004",
    name: "Phạm Đức Duy",
    age: 52,
    gender: "Nam",
    phone: "0987654321",
    status: "active",
    lastVisit: "2026-05-04",
    diagnosis: "Viêm khớp",
  },
  {
    id: "P005",
    name: "Hoàng Thị Em",
    age: 39,
    gender: "Nữ",
    phone: "0934567890",
    status: "inactive",
    lastVisit: "2026-04-28",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Nguyễn Văn An",
    date: "2026-05-07",
    time: "09:00",
    status: "pending",
    type: "Tái khám",
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Trần Thị Bình",
    date: "2026-05-07",
    time: "10:30",
    status: "pending",
    type: "Khám mới",
  },
  {
    id: "A003",
    patientId: "P003",
    patientName: "Lê Minh Châu",
    date: "2026-05-07",
    time: "14:00",
    status: "completed",
    type: "Khám mới",
  },
  {
    id: "A004",
    patientId: "P004",
    patientName: "Phạm Đức Duy",
    date: "2026-05-08",
    time: "09:30",
    status: "pending",
    type: "Tái khám",
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: "F001",
    caseId: "C001",
    patientName: "Nguyễn Văn An",
    expertName: "TS. Nguyễn Thị Lan",
    date: "2026-05-06",
    status: "completed",
    content: "Khuyến nghị điều chỉnh liều insulin và theo dõi đường huyết...",
    priority: "high",
  },
  {
    id: "F002",
    caseId: "C002",
    patientName: "Trần Thị Bình",
    expertName: "PGS. TS. Trần Văn Nam",
    date: "2026-05-05",
    status: "pending",
    content: "Cần làm thêm xét nghiệm chức năng thận...",
    priority: "medium",
  },
  {
    id: "F003",
    caseId: "C003",
    patientName: "Lê Minh Châu",
    expertName: "TS. Nguyễn Thị Lan",
    date: "2026-05-07",
    status: "urgent",
    content: "Cần nhập viện ngay để theo dõi sát...",
    priority: "high",
  },
];

export const mockCases: CaseReview[] = [
  {
    id: "C001",
    patientName: "Nguyễn Văn An",
    doctorName: "BS. Nguyễn Văn A",
    submittedDate: "2026-05-05",
    status: "completed",
    priority: "high",
    diagnosis: "Tiểu đường type 2, cần điều chỉnh thuốc",
  },
  {
    id: "C002",
    patientName: "Trần Thị Bình",
    doctorName: "BS. Trần Văn B",
    submittedDate: "2026-05-06",
    status: "in_review",
    priority: "medium",
    diagnosis: "Cao huyết áp độ 2",
  },
  {
    id: "C003",
    patientName: "Lê Minh Châu",
    doctorName: "BS. Lê Thị C",
    submittedDate: "2026-05-07",
    status: "pending",
    priority: "high",
    diagnosis: "Đau ngực cấp, nghi ngờ tim mạch",
  },
  {
    id: "C004",
    patientName: "Phạm Đức Duy",
    doctorName: "BS. Nguyễn Văn A",
    submittedDate: "2026-05-04",
    status: "completed",
    priority: "low",
    diagnosis: "Viêm khớp mãn tính",
  },
];

export const mockUsers: User[] = [
  {
    id: "U001",
    name: "BS. Nguyễn Văn A",
    email: "nva@clinic.com",
    role: "doctor",
    status: "active",
    joinedDate: "2024-01-15",
    clinic: "Phòng khám Đa khoa TW1",
  },
  {
    id: "U002",
    name: "BS. Trần Văn B",
    email: "tvb@clinic.com",
    role: "doctor",
    status: "active",
    joinedDate: "2024-03-20",
    clinic: "Phòng khám Đa khoa TW2",
  },
  {
    id: "U003",
    name: "TS. Nguyễn Thị Lan",
    email: "ntl@clinic.com",
    role: "expert",
    status: "active",
    joinedDate: "2023-11-10",
  },
  {
    id: "U004",
    name: "PGS. TS. Trần Văn Nam",
    email: "tvn@clinic.com",
    role: "expert",
    status: "active",
    joinedDate: "2023-09-05",
  },
  {
    id: "U005",
    name: "Nguyễn Quản Lý",
    email: "manager@clinic.com",
    role: "manager",
    status: "active",
    joinedDate: "2023-06-01",
  },
];

export const mockClinics: Clinic[] = [
  {
    id: "CL001",
    name: "Phòng khám Đa khoa TW1",
    address: "123 Nguyễn Văn Linh, Q.7, TP.HCM",
    phone: "028-12345678",
    status: "active",
    doctorCount: 12,
    patientCount: 342,
  },
  {
    id: "CL002",
    name: "Phòng khám Đa khoa TW2",
    address: "456 Lê Văn Việt, Q.9, TP.HCM",
    phone: "028-87654321",
    status: "active",
    doctorCount: 8,
    patientCount: 218,
  },
  {
    id: "CL003",
    name: "Phòng khám Chuyên khoa Tim mạch",
    address: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
    phone: "028-11223344",
    status: "active",
    doctorCount: 5,
    patientCount: 156,
  },
  {
    id: "CL004",
    name: "Phòng khám Nội tổng hợp",
    address: "321 Hoàng Văn Thụ, Q.Tân Bình, TP.HCM",
    phone: "028-99887766",
    status: "inactive",
    doctorCount: 3,
    patientCount: 78,
  },
];

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export const mockMessages: Message[] = [
  {
    id: "M001",
    senderId: "U003",
    senderName: "TS. Nguyễn Thị Lan",
    content: "Chào bác sĩ, tôi đã xem qua hồ sơ bệnh nhân Nguyễn Văn An.",
    timestamp: "2026-05-07 09:15",
    isCurrentUser: false,
  },
  {
    id: "M002",
    senderId: "U001",
    senderName: "BS. Nguyễn Văn A",
    content: "Chào chuyên gia, cảm ơn anh đã xem. Có nhận xét gì về liều thuốc hiện tại không?",
    timestamp: "2026-05-07 09:17",
    isCurrentUser: true,
  },
  {
    id: "M003",
    senderId: "U003",
    senderName: "TS. Nguyễn Thị Lan",
    content: "Tôi nghĩ nên tăng liều insulin lên 20 đơn vị và theo dõi đường huyết sau ăn chặt chẽ hơn.",
    timestamp: "2026-05-07 09:20",
    isCurrentUser: false,
  },
];

export interface Specialty {
  id: string;
  name: string;
  description: string;
  doctorCount: number;
  icon: string;
}

export const mockSpecialties: Specialty[] = [
  {
    id: "SP001",
    name: "Tim mạch",
    description: "Chuyên khoa về các bệnh lý tim mạch, cao huyết áp, nhồi máu cơ tim",
    doctorCount: 15,
    icon: "❤️",
  },
  {
    id: "SP002",
    name: "Tiêu hóa",
    description: "Chuyên khoa về đường tiêu hóa, dạ dày, ruột, gan mật",
    doctorCount: 12,
    icon: "🫀",
  },
  {
    id: "SP003",
    name: "Thần kinh",
    description: "Chuyên khoa về hệ thần kinh, đau đầu, parkinson, tai biến mạch máu não",
    doctorCount: 10,
    icon: "🧠",
  },
  {
    id: "SP004",
    name: "Da liễu",
    description: "Chuyên khoa về các bệnh lý da, mụn, viêm da, nấm da",
    doctorCount: 8,
    icon: "🩺",
  },
  {
    id: "SP005",
    name: "Nội tổng quát",
    description: "Khám và điều trị các bệnh lý nội khoa thông thường",
    doctorCount: 20,
    icon: "🏥",
  },
];

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  clinicId: string;
  clinicName: string;
  experience: number;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  available: boolean;
}

export const mockDoctors: Doctor[] = [
  {
    id: "D001",
    name: "BS. Nguyễn Văn A",
    specialtyId: "SP001",
    specialtyName: "Tim mạch",
    clinicId: "CL001",
    clinicName: "Phòng khám Đa khoa TW1",
    experience: 15,
    rating: 4.8,
    reviewCount: 234,
    price: 300000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
    available: true,
  },
  {
    id: "D002",
    name: "BS. Trần Thị B",
    specialtyId: "SP002",
    specialtyName: "Tiêu hóa",
    clinicId: "CL001",
    clinicName: "Phòng khám Đa khoa TW1",
    experience: 12,
    rating: 4.9,
    reviewCount: 189,
    price: 350000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2",
    available: true,
  },
  {
    id: "D003",
    name: "BS. Lê Văn C",
    specialtyId: "SP003",
    specialtyName: "Thần kinh",
    clinicId: "CL002",
    clinicName: "Phòng khám Đa khoa TW2",
    experience: 20,
    rating: 4.7,
    reviewCount: 312,
    price: 400000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor3",
    available: false,
  },
  {
    id: "D004",
    name: "BS. Phạm Thị D",
    specialtyId: "SP004",
    specialtyName: "Da liễu",
    clinicId: "CL002",
    clinicName: "Phòng khám Đa khoa TW2",
    experience: 8,
    rating: 4.6,
    reviewCount: 156,
    price: 250000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor4",
    available: true,
  },
  {
    id: "D005",
    name: "BS. Hoàng Văn E",
    specialtyId: "SP005",
    specialtyName: "Nội tổng quát",
    clinicId: "CL003",
    clinicName: "Phòng khám Chuyên khoa Tim mạch",
    experience: 10,
    rating: 4.8,
    reviewCount: 201,
    price: 280000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor5",
    available: true,
  },
];

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
}

export interface Notification {
  id: string;
  type: "appointment" | "medication" | "result";
  title: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
}

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "MR001",
    date: "2026-05-15",
    doctorName: "BS. Nguyễn Văn A",
    diagnosis: "Viêm họng cấp",
    prescription: ["Amoxicillin 500mg - 3 lần/ngày", "Paracetamol 500mg - khi sốt"],
    notes: "Uống nhiều nước, nghỉ ngơi đầy đủ. Tái khám sau 5 ngày nếu không thuyên giảm.",
  },
  {
    id: "MR002",
    date: "2026-04-20",
    doctorName: "BS. Trần Thị B",
    diagnosis: "Đau dạ dày",
    prescription: ["Omeprazole 20mg - 2 lần/ngày", "Gaviscon - sau mỗi bữa ăn"],
    notes: "Ăn uống điều độ, tránh thức ăn cay nóng.",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    type: "appointment",
    title: "Nhắc lịch khám",
    content: "Bạn có lịch khám với BS. Nguyễn Văn A vào 09:00 ngày mai",
    date: "2026-05-28",
    time: "08:00",
    read: false,
  },
  {
    id: "N002",
    type: "medication",
    title: "Nhắc uống thuốc",
    content: "Đã đến giờ uống Amoxicillin 500mg",
    date: "2026-05-28",
    time: "12:00",
    read: true,
  },
  {
    id: "N003",
    type: "result",
    title: "Kết quả khám có sẵn",
    content: "Kết quả xét nghiệm máu của bạn đã sẵn sàng",
    date: "2026-05-27",
    time: "14:30",
    read: false,
  },
];
