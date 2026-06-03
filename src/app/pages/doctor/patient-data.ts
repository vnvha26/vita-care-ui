export type PatientRecord = {
  id: string;
  code: string;
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  insurance: string;
  address: string;
  bloodType: string;
  height: string;
  weight: string;
  bmi: string;
  notes: string;
  symptoms: string[];
  tests: { name: string; result: string }[];
  history: { id: string; date: string; diagnosis: string; treatment: string; doctor: string }[];
};

export const patientRecords: PatientRecord[] = [
  {
    id: "p001",
    code: "P001",
    name: "Đỗ Minh Tú",
    birthDate: "12-04-1995",
    gender: "Nam",
    email: "tu.do@gmail.com",
    phone: "0987654321",
    insurance: "GD4019929831",
    address: "Ba Đình, Hà Nội",
    bloodType: "A",
    height: "172 cm",
    weight: "68 kg",
    bmi: "23.0 (Bình thường)",
    notes: "Dị ứng Penicillin. Tiền sử tăng huyết áp nhẹ.",
    symptoms: ["Đau bụng vùng thượng vị âm ỉ kéo dài", "Ợ chua hơi nóng rát họng sau ăn"],
    tests: [
      { name: "Test nhanh Cúm A/B", result: "Âm tính" },
      { name: "Test nhanh Covid-19", result: "Âm tính" },
    ],
    history: [
      {
        id: "2",
        date: "12-04-2026",
        diagnosis: "Đau dạ dày nhẹ",
        treatment: "Khám lâm sàng, kê đơn giảm tiết acid dịch vị.",
        doctor: "Bs. Huy",
      },
      {
        id: "1",
        date: "10-02-2026",
        diagnosis: "Viêm họng cấp",
        treatment: "Súc họng nước muối ấm, uống siro ho thảo dược.",
        doctor: "Bs. Huy",
      },
    ],
  },
  {
    id: "p002",
    code: "P002",
    name: "Nguyễn Văn An",
    birthDate: "04-09-1981",
    gender: "Nam",
    email: "an.nguyen@gmail.com",
    phone: "0901234567",
    insurance: "GD3099128420",
    address: "Quận 7, TP.HCM",
    bloodType: "O",
    height: "168 cm",
    weight: "73 kg",
    bmi: "25.9 (Thừa cân)",
    notes: "Tiền sử tiểu đường type 2, đang dùng Metformin.",
    symptoms: ["Khát nước nhiều về đêm", "Đường huyết sau ăn tăng"],
    tests: [
      { name: "HbA1c", result: "7.8%" },
      { name: "Đường huyết đói", result: "8.1 mmol/L" },
    ],
    history: [
      {
        id: "2",
        date: "05-05-2026",
        diagnosis: "Tiểu đường type 2",
        treatment: "Điều chỉnh liều thuốc, theo dõi đường huyết sau ăn.",
        doctor: "Bs. Huy",
      },
      {
        id: "1",
        date: "18-03-2026",
        diagnosis: "Rối loạn mỡ máu",
        treatment: "Tư vấn chế độ ăn và vận động 30 phút mỗi ngày.",
        doctor: "Bs. Huy",
      },
    ],
  },
  {
    id: "p003",
    code: "P003",
    name: "Trần Thị Bình",
    birthDate: "22-11-1990",
    gender: "Nữ",
    email: "binh.tran@gmail.com",
    phone: "0909876543",
    insurance: "GD2018827112",
    address: "Cầu Giấy, Hà Nội",
    bloodType: "B",
    height: "158 cm",
    weight: "55 kg",
    bmi: "22.0 (Bình thường)",
    notes: "Theo dõi tăng huyết áp độ 1.",
    symptoms: ["Đau đầu nhẹ buổi sáng", "Huyết áp dao động 135/85 - 145/90"],
    tests: [
      { name: "Điện tim", result: "Bình thường" },
      { name: "Chức năng thận", result: "Trong giới hạn" },
    ],
    history: [
      {
        id: "1",
        date: "06-05-2026",
        diagnosis: "Cao huyết áp độ 1",
        treatment: "Theo dõi huyết áp tại nhà, giảm muối trong khẩu phần.",
        doctor: "Bs. Huy",
      },
    ],
  },
];
