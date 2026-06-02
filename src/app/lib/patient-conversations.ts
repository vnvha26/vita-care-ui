export type PatientConversationStatus = "active" | "unread" | "archived";

export interface PatientChatMessage {
  sender: "patient" | "contact";
  text: string;
  time: string;
}

export interface PatientConversation {
  id: string;
  name: string;
  role: "clinic" | "doctor" | "bot";
  roleName: string;
  preview: string;
  status: PatientConversationStatus;
  lastAt: string;
  messages: PatientChatMessage[];
}

export const patientConversations: PatientConversation[] = [
  {
    id: "ai-1",
    name: "Tư vấn sốt và đau họng",
    role: "bot",
    roleName: "Trợ lý AI sức khỏe",
    preview: "AI khuyến nghị theo dõi nhiệt độ, uống đủ nước và đặt lịch nếu sốt kéo dài trên 3 ngày.",
    status: "active",
    lastAt: "Hôm nay, 14:56",
    messages: [
      { sender: "contact", text: "Xin chào Nguyễn Văn A, tôi là trợ lý sức khỏe AI của VitaCare. Bạn đang gặp triệu chứng gì hôm nay?", time: "14:51" },
      { sender: "patient", text: "Tôi bị sốt và đau họng từ tối qua.", time: "14:52" },
      { sender: "contact", text: "Bạn cho tôi biết nhiệt độ cao nhất, có ho, khó thở hoặc đau ngực không để đánh giá mức độ ưu tiên.", time: "14:53" },
      { sender: "patient", text: "Tôi sốt 38.2 độ, hơi ho, không khó thở.", time: "14:54" },
      { sender: "contact", text: "Bạn nên uống đủ nước, nghỉ ngơi, theo dõi nhiệt độ. Nếu sốt trên 39 độ, khó thở, lơ mơ hoặc kéo dài quá 3 ngày, hãy đặt lịch khám sớm.", time: "14:56" },
    ],
  },
  {
    id: "ai-2",
    name: "Tư vấn đau bụng âm ỉ",
    role: "bot",
    roleName: "Trợ lý AI sức khỏe",
    preview: "AI gợi ý theo dõi triệu chứng tiêu hóa và đặt lịch khám nếu đau tăng hoặc kèm nôn, sốt.",
    status: "active",
    lastAt: "Hôm qua",
    messages: [
      { sender: "contact", text: "Bạn hãy mô tả vị trí đau bụng, thời gian xuất hiện và các dấu hiệu đi kèm.", time: "Hôm qua" },
      { sender: "patient", text: "Tôi đau âm ỉ vùng thượng vị, hơi buồn nôn sau khi ăn.", time: "Hôm qua" },
      { sender: "contact", text: "Triệu chứng có thể liên quan tiêu hóa. Bạn nên ăn mềm, tránh đồ cay chua, không tự dùng kháng sinh. Nếu đau dữ dội, nôn liên tục hoặc đi ngoài ra máu, cần đi khám ngay.", time: "Hôm qua" },
    ],
  },
  {
    id: "ai-3",
    name: "Tìm phòng khám phù hợp",
    role: "bot",
    roleName: "Trợ lý AI đặt lịch",
    preview: "AI đã gợi ý phòng khám liên kết phù hợp với nhu cầu khám nội tổng quát.",
    status: "active",
    lastAt: "28/05",
    messages: [
      { sender: "patient", text: "Tôi muốn tìm phòng khám nội tổng quát gần khu Cầu Giấy.", time: "28/05" },
      { sender: "contact", text: "Tôi ghi nhận nhu cầu khám nội tổng quát. Bạn có thể ưu tiên Phòng khám Đa khoa Quốc tế VitaCare hoặc các phòng khám liên kết có lịch trống trong ngày.", time: "28/05" },
    ],
  },
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
