export type PatientConversationStatus = "active" | "unread" | "archived";

export interface PatientChatMessage {
  sender: "patient" | "contact";
  text: string;
  time: string;
}

export interface PatientConversation {
  id: string;
  name: string;
  role: "clinic" | "doctor";
  roleName: string;
  preview: string;
  status: PatientConversationStatus;
  lastAt: string;
  messages: PatientChatMessage[];
}

export const patientConversations: PatientConversation[] = [
  {
    id: "c1",
    name: "Phòng khám Đa khoa Quốc tế VitaCare",
    role: "clinic",
    roleName: "Phòng khám liên kết",
    preview: "Chào anh A, phòng khám đã nhận yêu cầu đặt lịch. Anh muốn khám ca sáng hay ca chiều ngày mai ạ?",
    status: "unread",
    lastAt: "14:15",
    messages: [
      { sender: "contact", text: "Chào anh Nguyễn Văn A, tôi là lễ tân tại Phòng khám VitaCare. Chúng tôi đã nhận được yêu cầu đặt lịch từ Trợ lý AI.", time: "14:10" },
      { sender: "contact", text: "Anh muốn đăng ký khám ca sáng hay ca chiều ngày mai ạ? Hiện tại các bác sĩ Nội khoa đều có lịch rảnh.", time: "14:15" },
    ],
  },
  {
    id: "c2",
    name: "Nha khoa Thẩm mỹ Công nghệ cao Paris",
    role: "clinic",
    roleName: "Phòng khám liên kết",
    preview: "Cảm ơn anh đã phản hồi. Hẹn gặp anh vào 9:00 sáng mai ạ.",
    status: "active",
    lastAt: "10:30",
    messages: [
      { sender: "patient", text: "Chào phòng khám, tôi muốn đặt lịch cạo vôi răng và kiểm tra định kỳ.", time: "10:20" },
      { sender: "contact", text: "Dạ vâng, nha khoa Paris có lịch trống lúc 9:00 sáng mai ạ. Anh có sắp xếp qua được giờ đó không?", time: "10:25" },
      { sender: "patient", text: "Được nhé, tôi sẽ qua đúng giờ.", time: "10:28" },
      { sender: "contact", text: "Cảm ơn anh đã phản hồi. Hẹn gặp anh vào 9:00 sáng mai ạ.", time: "10:30" },
    ],
  },
  {
    id: "d1",
    name: "BS. Nguyễn Khám Bệnh",
    role: "doctor",
    roleName: "Bác sĩ chuyên khoa Nội",
    preview: "Kết quả siêu âm của em bình thường, uống thuốc đúng liều nhé.",
    status: "active",
    lastAt: "Hôm qua",
    messages: [
      { sender: "patient", text: "Thưa bác sĩ, em đã uống hết đơn thuốc dạ dày 5 ngày rồi ạ.", time: "Hôm qua" },
      { sender: "contact", text: "Em còn cảm giác ợ chua hay đau tức ngực sau khi ăn không?", time: "Hôm qua" },
      { sender: "patient", text: "Dạ giảm nhiều rồi bác sĩ, chỉ còn hơi đầy bụng nhẹ thôi ạ.", time: "Hôm qua" },
      { sender: "contact", text: "Tốt lắm. Kết quả siêu âm dạ dày trước đó của em bình thường. Em uống hết số thuốc còn lại đúng liều nhé.", time: "Hôm qua" },
    ],
  },
  {
    id: "d2",
    name: "BS. Trần Hay Hỏi",
    role: "doctor",
    roleName: "Bác sĩ chuyên khoa Nhi",
    preview: "Nếu bé hết sốt và chơi ngoan thì yên tâm theo dõi tiếp được.",
    status: "archived",
    lastAt: "25/05",
    messages: [
      { sender: "patient", text: "Chào bác sĩ, bé nhà em sốt 38 độ từ tối qua, có ho húng hắng.", time: "25/05" },
      { sender: "contact", text: "Bé có bú tốt không em? Có bị nôn trớ hay phát ban gì không?", time: "25/05" },
      { sender: "patient", text: "Bé vẫn ăn chơi bình thường ạ, không bị nôn.", time: "25/05" },
      { sender: "contact", text: "Nếu bé hết sốt và chơi ngoan thì yên tâm theo dõi tiếp được. Cho bé uống nhiều nước và lau mát người nhé.", time: "25/05" },
    ],
  },
];

let temporaryPatientConversations: PatientConversation[] = [];

export function addTemporaryPatientConversation(conversation: PatientConversation) {
  temporaryPatientConversations = [
    conversation,
    ...temporaryPatientConversations.filter((item) => item.id !== conversation.id),
  ];
}

export function getPatientConversations() {
  return [
    ...temporaryPatientConversations,
    ...patientConversations.filter(
      (conversation) => !temporaryPatientConversations.some((item) => item.id === conversation.id)
    ),
  ];
}

export function getLatestTemporaryPatientConversation() {
  return temporaryPatientConversations[0] ?? null;
}
