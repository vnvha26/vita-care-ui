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
  vitals: { temp: string; bp: string; spo2: string; hr: string; isAbnormal: boolean };
  tests: { name: string; result: string; normalRange: string; status: "Bình thường" | "Bất thường" | "Nguy cơ" }[];
  history: { id: string; date: string; diagnosis: string; treatment: string; doctor: string; notes: string }[];
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
    vitals: { temp: "38.9 °C", bp: "145/95 mmHg", spo2: "94%", hr: "105 bpm", isAbnormal: true },
    tests: [
      { name: "Xét nghiệm tế bào máu (CBC)", result: "Bạch cầu tăng 12.5 G/L", normalRange: "4.0 - 10.0 G/L", status: "Bất thường" },
      { name: "Định lượng CRP (C-Reactive Protein)", result: "15.2 mg/L", normalRange: "< 5.0 mg/L", status: "Bất thường" },
      { name: "Điện tâm đồ (ECG)", result: "Nhịp xoang nhanh 105 chu kỳ/phút", normalRange: "60-100 bpm", status: "Nguy cơ" }
    ],
    history: [
      {
        id: "2",
        date: "02-06-2026",
        diagnosis: "Viêm dạ dày trào ngược dịch vị / K21",
        treatment: "Khám lâm sàng, kê đơn giảm tiết acid dịch vị.",
        doctor: "Bs. Huy",
        notes: "Kê đơn thuốc PPI và Gaviscon, bệnh nhân có thói quen tự mua thuốc uống khi đau."
      },
      {
        id: "1",
        date: "15-04-2026",
        diagnosis: "Viêm họng cấp ho nhiều",
        treatment: "Súc họng nước muối ấm, uống siro ho thảo dược.",
        doctor: "Bs. Huy",
        notes: "Điều trị triệu chứng, súc họng nước muối."
      }
    ]
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
    vitals: { temp: "36.5 °C", bp: "120/80 mmHg", spo2: "98%", hr: "72 bpm", isAbnormal: false },
    tests: [
      { name: "Glucose đói", result: "8.1 mmol/L", normalRange: "3.9 - 6.1 mmol/L", status: "Bất thường" },
      { name: "HbA1c", result: "7.8%", normalRange: "4.0 - 5.6%", status: "Bất thường" }
    ],
    history: [
      {
        id: "2",
        date: "18-05-2026",
        diagnosis: "Đái tháo đường Type 2 / E11",
        treatment: "Điều chỉnh liều thuốc, theo dõi đường huyết sau ăn.",
        doctor: "Bs. Huy",
        notes: "Dặn dò chế độ ăn kiêng tinh bột, duy trì đi bộ."
      }
    ]
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
    vitals: { temp: "39.5 °C", bp: "152/100 mmHg", spo2: "92%", hr: "112 bpm", isAbnormal: true },
    tests: [
      { name: "Tổng phân tích nước tiểu", result: "Protein niệu (+)", normalRange: "Âm tính", status: "Bất thường" },
      { name: "Định lượng Creatinine", result: "95 umol/L", normalRange: "44 - 88 umol/L", status: "Bất thường" }
    ],
    history: [
      {
        id: "1",
        date: "26-05-2026",
        diagnosis: "Cao huyết áp độ 1 / I10",
        treatment: "Theo dõi huyết áp tại nhà, giảm muối trong khẩu phần.",
        doctor: "Bs. Huy",
        notes: "Bệnh nhân tự ý uống Amlodipine mượn của hàng xóm khi thấy nhức đầu."
      }
    ]
  }
];
