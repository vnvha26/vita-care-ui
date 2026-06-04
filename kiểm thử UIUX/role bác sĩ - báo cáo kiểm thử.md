# Báo cáo kiểm thử UIUX - Role bác sĩ

Phạm vi kiểm thử tập trung vào luồng bác sĩ: dashboard tổng quan, quản lý lịch khám, hồ sơ bệnh án, chi tiết bệnh nhân, tin nhắn, tra cứu thuốc, hồ sơ bác sĩ. Đây là vai trò chuyên môn lâm sàng, cần đọc nhiều dữ liệu y tế đồng thời và ra quyết định nhanh, nên mọi điểm nghẽn giao diện đều ảnh hưởng trực tiếp đến tốc độ và chất lượng khám chữa bệnh.

## 1. PHẦN MỘT: GIAO DIỆN (LAYOUT & VISUAL ARCHITECTURE)

### Các điểm nghẽn và Lỗi thiết kế giao diện

- Màn [dashboard bác sĩ](../src/app/pages/doctor/dashboard.tsx) có hero card chỉ chứa lời chào và mô tả ngắn, nhưng không có CTA dẫn đến hành động chính. Khác với dashboard chuyên gia (có nút "Mở ca đánh giá") hay bệnh nhân (có ô nhập triệu chứng + nút "Hỏi AI ngay"), dashboard bác sĩ không có điểm hành động nào trên hero card. Bác sĩ vào hệ thống, đọc chào hỏi, rồi phải tự tìm xuống dưới để thao tác.

- Timeline lịch khám trên dashboard dùng DataRow mở rộng inline (PatientSummary). Khi mở chi tiết một bệnh nhân, khối mở rộng chiếm toàn bộ chiều rộng cột trái, đẩy các lịch khám phía sau xuống rất xa. Với 6 lịch khám trong ngày, nếu bác sĩ mở chi tiết lịch số 1 thì phải cuộn xa mới thấy lịch số 2-6. Không có accordion giới hạn chiều cao, nên PatientSummary mở rộng không kiểm soát được độ dài.

- Màn [quản lý lịch khám](../src/app/pages/doctor/examination.tsx) có lịch tháng (30 ô ngày) đặt trong SectionCard cột phải (420px). Mỗi ô ngày là `min-h-16` trong grid 7 cột, nên trên viewport rộng vừa phải, các ô ngày rất nhỏ và khó chạm chính xác trên màn hình cảm ứng. Hiện cũng không có indicator ngày hôm nay (không highlight mặc định ngày 03/06), bác sĩ phải nhớ ngày hiện tại để chọn.

- Lịch tháng hardcode cho tháng 06/2026 (`calendarDays = Array.from({ length: 30 })`). Không có header chọn tháng/năm, không có nút chuyển tháng trước/sau. Bác sĩ không thể xem lịch tháng 07 hay quay lại tháng 05 — giao diện bị khóa ở một tháng duy nhất.

- Bảng hồ sơ bệnh án trên [danh sách bệnh nhân](../src/app/pages/doctor/patients.tsx) có `min-w-[820px]`, bắt buộc scroll ngang trên màn hẹp. Khi mở rộng chi tiết inline (PatientInlineDetail), khối mở rộng lại có nhiều lớp grid lồng nhau (8 Info items → ghi chú → triệu chứng + xét nghiệm → lịch sử khám), tạo ra một vùng nội dung cực kỳ dài chèn giữa các dòng bảng, phá vỡ cấu trúc bảng gốc.

- Bảng lịch sử khám & điều trị trên [chi tiết bệnh nhân](../src/app/pages/doctor/patient-detail.tsx) dùng `min-w-[900px]`, lại gây scroll ngang trên màn vừa. Cột "Phác đồ điều trị / Kê đơn thuốc" thường chứa nội dung dài (mô tả phác đồ chi tiết), dễ bị cắt cụt khi bảng bị giới hạn chiều ngang.

- Avatar bệnh nhân (UserRound icon) dùng nền `bg-[#F4D5EB] text-[#D33C87]` (hồng đậm) trên cả dashboard PatientSummary và patient-detail. Màu hồng này khác biệt hoàn toàn với palette xanh-xanh ngọc của toàn hệ thống, tạo sự đột ngột thị giác không cần thiết. Màu hồng cũng gợi giới tính nữ, có thể gây khó chịu khi đại diện cho bệnh nhân nam.

- Sidebar bác sĩ có mục "Quản lý lịch hẹn" và "Hồ sơ bệnh án" cùng link đến `/doctor/patients` (xem [sidebar.tsx](../src/app/components/layout/sidebar.tsx) dòng 48-49). Hai mục khác tên nhưng cùng đích đến, gây nhầm lẫn khi bác sĩ click "Quản lý lịch hẹn" nhưng lại thấy trang hồ sơ bệnh án thay vì giao diện lịch hẹn riêng.

- Sidebar mục "Tin nhắn" link đến `/doctor/chat` và "Hồ sơ bệnh án" link đến `/doctor/patients`, nhưng mục "Tra cứu thuốc" link đến `/doctor/feedback`. URL `/feedback` không phản ánh ngữ nghĩa "tra cứu thuốc", gây khó khăn nếu bác sĩ cần nhớ URL trực tiếp hoặc bookmark.

### Điểm sáng thiết kế giao diện

- Dashboard bác sĩ có cấu trúc thông tin rất phù hợp với thực tế lâm sàng: 4 StatCard (lịch khám hôm nay, lịch cần duyệt, tin nhắn mới, tỉ lệ hoàn thành) cung cấp ngay bức tranh tổng quan buổi làm việc, rồi Timeline lịch khám bên trái chi tiết hơn, Tin nhắn mới bên phải gợi nhắc trả lời bệnh nhân.

- PatientSummary mở rộng trên dashboard là một thiết kế tốt: bác sĩ có thể xem nhanh hồ sơ bệnh nhân ngay trong context timeline lịch khám mà không cần chuyển trang. Layout `[220px_1fr]` với avatar bên trái và thông tin bên phải giúp bác sĩ quét nhanh dữ liệu cơ bản (ngày sinh, BMI, nhóm máu, ghi chú dị ứng) — đúng những thông tin cần nhất trước khi khám.

- Layout hai cột trên [quản lý lịch khám](../src/app/pages/doctor/examination.tsx) (danh sách lịch bên trái, lịch tháng bên phải) cho phép bác sĩ vừa chọn ngày xem lịch vừa thấy ngay kết quả lọc bên trái. Ngày có lịch khám được đánh dấu bằng pill "N lịch" màu xanh ngọc trên nền trắng, ngày trống thì xám nhạt — đủ trực quan để bác sĩ nhận biết ngày nào bận rộn.

- Màn [tra cứu thuốc](../src/app/pages/doctor/feedback.tsx) có layout master-detail: danh sách thuốc bên trái, chi tiết thuốc bên phải. Khi bác sĩ chọn thuốc khác, panel chi tiết cập nhật ngay — không cần chuyển trang. Cách này rất phù hợp với nhu cầu tham khảo nhanh trong lúc khám.

- Chi tiết thuốc được chia thành các block ngữ nghĩa rõ ràng: Liều dùng, Chỉ định, Chống chỉ định, Tác dụng phụ (với icon cảnh báo AlertTriangle), Tương tác, Ghi chú kê đơn. Mỗi block có icon riêng, giúp bác sĩ quét nhanh đến phần cần tham khảo.

- Màn [tin nhắn](../src/app/pages/doctor/chat.tsx) có cấu trúc hai panel (danh sách hội thoại + vùng chat), tương tự ứng dụng nhắn tin quen thuộc. Bác sĩ không cần học lại cách tương tác, chuyển đổi giữa các cuộc trò chuyện rất nhanh.

- [SaveableForm](../src/app/pages/doctor/saveable-form.tsx) dùng cho hồ sơ bác sĩ có localStorage persistence, nghĩa là dữ liệu nhập được giữ lại sau reload. Thông báo "Đã lưu thành công" trên nền xanh ngọc (#E8FFF9) cho phản hồi trực quan ngay sau khi lưu.

## 2. PHẦN HAI: CÁC NÚT BẤM VÀ DI CHUYỂN (INTERACTIONS & MICRO-INTERACTIONS)

### Các lỗi tương tác, nhận diện và phản hồi nút bấm

- Nút "Bắt đầu khám" trên mỗi DataRow trong Timeline dashboard không có handler `onClick`. Đây là nút CTA quan trọng nhất cho bác sĩ — hành động cốt lõi khi bắt đầu phiên khám — nhưng bấm vào không có gì xảy ra. Không có modal, không chuyển trang, không có trạng thái loading. Bác sĩ không thể bắt đầu khám bệnh qua giao diện.

- Input tìm kiếm trên [hồ sơ bệnh án](../src/app/pages/doctor/patients.tsx) không có `value` hay `onChange` handler. Bác sĩ gõ từ khóa nhưng danh sách không lọc, chỉ là input hiển thị tĩnh. Tương tự, input tìm kiếm trên danh sách hội thoại trong [tin nhắn](../src/app/pages/doctor/chat.tsx) cũng không có logic lọc.

- Trên [chi tiết bệnh nhân](../src/app/pages/doctor/patient-detail.tsx), nút "Chẩn đoán và kê đơn" link đến `/doctor/examination` — trang quản lý lịch khám chung, không phải form chẩn đoán/kê đơn riêng cho bệnh nhân đang xem. Bác sĩ click kỳ vọng mở form chẩn đoán cho bệnh nhân cụ thể nhưng lại đến trang lịch khám tổng quát, đứt gãy hoàn toàn luồng lâm sàng.

- Nút "Chấp nhận tư vấn" (paid consultation) trên màn tin nhắn hoạt động tốt (thêm conversation mới vào danh sách), nhưng chỉ hoạt động một lần. Sau khi `consultAccepted = true`, banner biến mất. Nếu có yêu cầu tư vấn trả phí thứ hai, bác sĩ không có cách nhận biết hay chấp nhận vì banner đã bị ẩn vĩnh viễn trong session hiện tại.

- Trên [quản lý lịch khám](../src/app/pages/doctor/examination.tsx), khi bác sĩ chọn ngày không có lịch (ví dụ ngày 1/6), hiển thị "Chưa có lịch khám trong ngày này." trong khung dashed. Tuy hợp lý, nhưng không có gợi ý hành động tiếp theo (chuyển sang ngày có lịch, quay lại hôm nay), khiến bác sĩ phải tự tìm đường trở lại.

- Lịch tháng không highlight ngày hiện tại (hôm nay). Bác sĩ vào trang quản lý lịch khám, phải tự tìm ngày 03 trong 30 ô. Không có visual indicator nào cho biết "bạn đang ở ngày nào hôm nay", gây mất thời gian định vị.

- Select filter trên màn [quản lý lịch khám](../src/app/pages/doctor/examination.tsx) không có (dù trang [ca đánh giá chuyên gia](../src/app/pages/expert/cases.tsx) có select filter cho trạng thái và mức độ). Bác sĩ không thể lọc lịch khám theo trạng thái (Chờ khám, Đã xác nhận, Tái khám) mà phải đọc toàn bộ danh sách.

- Badge BMI trên bảng hồ sơ bệnh án luôn dùng tone "green" bất kể giá trị BMI. BMI 25.9 (Thừa cân) vẫn hiển thị badge xanh, tạo cảm giác bình thường khi thực tế cần chú ý. Không có phân biệt thị giác giữa BMI bình thường và BMI bất thường.

- Màn tra cứu thuốc không có select filter theo nhóm thuốc hay mức nguy cơ, chỉ có input tìm kiếm text. Bác sĩ muốn xem nhanh "tất cả thuốc nguy cơ cao" hoặc "tất cả thuốc nhóm NSAID" phải tự gõ từ khóa, trong khi select filter sẽ nhanh hơn nhiều.

### Điểm sáng tương tác đã tốt

- Màn [tin nhắn](../src/app/pages/doctor/chat.tsx) có đầy đủ state management: `selectedId` chọn conversation, `draft` nhập tin nhắn, `handleSend` gửi tin, `toggleArchive` lưu trữ/bỏ lưu trữ, `acceptPaidConsultation` chấp nhận tư vấn trả phí. Đây là màn duy nhất trong toàn bộ hệ bác sĩ có tương tác thực đầy đủ — gửi tin thật, cập nhật danh sách thật, chuyển trạng thái thật.

- Khi chọn conversation chưa đọc (status "unread"), `handleSelect` tự động chuyển status sang "active" — đúng kỳ vọng: bác sĩ mở tin là đã xem. Badge "Chưa xem" (tone rose) biến mất, được thay bằng badge "Bệnh nhân" (tone blue). Micro-interaction này rất phù hợp ngữ cảnh y tế.

- Enter key gửi tin nhắn (`onKeyDown → event.key === "Enter" → handleSend()`) trên màn tin nhắn, đúng pattern chat quen thuộc. Bác sĩ không cần di chuột đến nút Gửi.

- Accordion mở/đóng chi tiết trên dashboard (Xem hồ sơ / Ẩn hồ sơ) và quản lý lịch khám (Chi tiết / Ẩn chi tiết) đều dùng cùng pattern: `setExpandedId(current => current === id ? null : id)`. Toggle nhất quán giúp bác sĩ hình thành thói quen tương tác nhanh.

- Tab filter trên màn tin nhắn (Tất cả / Chưa xem / Lưu trữ) dùng cùng toggle pattern quen thuộc (rounded-xl trên nền #F2F7FB), hoạt động thực sự — lọc danh sách hội thoại theo trạng thái. Badge số unread trên tab không có nhưng logic lọc đúng.

- Filter tìm kiếm thuốc trên [tra cứu thuốc](../src/app/pages/doctor/feedback.tsx) hoạt động thực sự: `useMemo` lọc drugs theo tên, nhóm thuốc, chỉ định. Bác sĩ gõ "amox" và danh sách ngay lập tức chỉ còn Amoxicillin. Tốc độ phản hồi tốt nhờ filter client-side.

- Khi bác sĩ chọn thuốc trong danh sách (click nút "Chi tiết"), panel chi tiết bên phải cập nhật ngay: tên thuốc, nhóm, form, badge nguy cơ, và toàn bộ block chi tiết. Không cần reload hay chuyển trang — master-detail pattern hoạt động trơn tru.

- Nút "Lưu thay đổi" trên hồ sơ bác sĩ (SaveableForm) thực sự lưu vào localStorage và hiển thị thông báo "Đã lưu thành công" ngay sau đó, kèm timestamp. Đây là micro-interaction phản hồi đầy đủ: hành động → kết quả → xác nhận.

## 3. PHẦN BA: TẦM NHÌN VÀ SỰ CHÚ Ý (VISUAL HIERARCHY & ATTENTION PATTERN)

### Điểm gây phân tán và Xung đột tiêu điểm thị giác

- Dashboard bác sĩ không có điểm hành động số một rõ ràng. Hero card chỉ là lời chào (không CTA), StatCards là thống kê (không click), Timeline là danh sách (cần scroll), Tin nhắn mới là nhắc nhở. Bác sĩ vào dashboard, mắt không bị thu hút vào bất kỳ hành động cụ thể nào. So với dashboard bệnh nhân (ô nhập triệu chứng + nút "Hỏi AI ngay" trên hero) hay chuyên gia (nút "Mở ca đánh giá" trên hero), dashboard bác sĩ thiếu điểm neo hành động.

- Trên Timeline dashboard, mỗi DataRow có hai nút cạnh nhau: "Xem hồ sơ" (secondary, viền xám) và "Bắt đầu khám" (primary, xanh filled). Nút "Bắt đầu khám" đáng lẽ là hành động ưu tiên cao nhất nhưng lại đặt bên cạnh nút "Xem hồ sơ" cùng hàng, khiến mắt phải phân biệt hai nút tương tự trước khi chọn. Đặc biệt khi "Xem hồ sơ" đã mở rộng (chữ đổi thành "Ẩn hồ sơ"), cả hai nút vẫn cạnh nhau, gây nhầm lẫn thứ tự ưu tiên.

- Màn [chi tiết bệnh nhân](../src/app/pages/doctor/patient-detail.tsx) có một SectionCard khổng lồ chứa toàn bộ thông tin: avatar + thông tin cơ bản (6 InfoItem), chỉ số cơ thể (4 MetricItem), ghi chú dị ứng, triệu chứng lâm sàng, kết quả xét nghiệm. Một SectionCard duy nhất với nhiều lớp thông tin khác nhau không có tiêu đề phụ phân tách, tạo cảm giác "bức tường thông tin" khi bác sĩ cần nhanh chóng tìm một mục cụ thể.

- Ghi chú dị ứng trên chi tiết bệnh nhân hiển thị bằng `text-[#EF6155]` (đỏ) ngay trong dòng text "Ghi chú tiền sử & Dị ứng:" — không có nền, không có viền, không có icon cảnh báo. Thông tin quan trọng nhất về an toàn thuốc (dị ứng Penicillin) chỉ là vài chữ đỏ trên nền trắng, rất dễ bị bỏ qua khi quét nhanh, nhất là khi không có block riêng hay alert box.

- Badge "Nguy cơ Cao" (tone rose) trên danh sách thuốc thu hút sự chú ý mạnh nhất trong toàn bộ màn tra cứu thuốc, nhưng 3 trong 7 thuốc đều mang badge "Cao" hoặc "Trung bình". Khi đa số thuốc đều có badge cảnh báo, mắt bị bão hòa và khó phân biệt thuốc nào thực sự cần đặc biệt chú ý.

- Trên màn tin nhắn, banner "Yêu cầu Tư vấn chuyên sâu" ở đầu trang có nền `#EAF3FF`, viền `#CFE3FF` và icon `#2D4A86` — gần như cùng tone với SectionCard thông thường. Một thông báo quan trọng (bệnh nhân đang chờ bác sĩ chấp nhận tư vấn trả phí) lại không đủ nổi bật so với các thành phần khác, đặc biệt khi banner đặt giữa PageHeader và nội dung chat chính.

- Kết quả xét nghiệm trong PatientInlineDetail (bảng bệnh nhân) dùng `text-[#49A95C]` (xanh lá) cho tất cả kết quả. Kết quả bất thường (HbA1c 7.8%, đường huyết đói 8.1 mmol/L) vẫn hiển thị màu xanh — tạo cảm giác bình thường khi thực tế cần chú ý. Không có phân biệt thị giác giữa kết quả bình thường và bất thường.

### Điểm xuất sắc về điều hướng tiêu điểm nhìn

- Timeline lịch khám trên dashboard dùng icon CalendarClock nhất quán cho mỗi mục, giúp bác sĩ nhận diện ngay loại dữ liệu đang xem. DataRow có mô tả triệu chứng rõ ràng ngay trong dòng chính ("Đau bụng vùng thượng vị, ợ chua sau ăn"), cho phép bác sĩ đọc nhanh lý do khám mà không cần mở chi tiết.

- Badge trạng thái trên lịch khám (Chờ khám = amber, Đã xác nhận = green, Tái khám = violet) tạo hệ thống nhận diện nhanh bằng màu. Bác sĩ quét dọc danh sách và ngay lập tức biết lịch nào cần xử lý (amber), lịch nào đã sẵn sàng (green), lịch nào là tái khám (violet).

- Trên tra cứu thuốc, icon AlertTriangle (màu vàng #F59E0B) cho block "Tác dụng phụ thường gặp" tạo điểm dừng thị giác đúng vị trí. Đây là phần bác sĩ cần chú ý nhất khi tham khảo thuốc, và icon cảnh báo thu hút mắt tự nhiên đến đúng nơi.

- Layout master-detail trên tra cứu thuốc: danh sách bên trái để quét và chọn, chi tiết bên phải để đọc sâu. Khi bác sĩ chọn thuốc, dòng đó highlight (`bg-[#EAF3FF] border-[#CFE3FF]`) và panel phải cập nhật — hai vùng thị giác phối hợp nhịp nhàng, không cần chuyển hướng đọc.

- Ghi chú kê đơn trên tra cứu thuốc dùng nền `#F7FAFC` và viền `#CFE3FF` (xanh nhạt), phân biệt nhẹ với các block thông tin khác (viền `#E2E8F0`). Sự khác biệt nhỏ nhưng đủ để bác sĩ nhận biết đây là ghi chú thực hành, không phải thông tin chuẩn y khoa.

- Trên màn tin nhắn, hội thoại chưa đọc có badge "Chưa xem" (tone rose) nổi bật ngay trong danh sách. Bác sĩ nhìn nhanh thấy badge đỏ, biết ngay cần ưu tiên trả lời — đúng mức độ ưu tiên cho tin nhắn bệnh nhân chưa xem trong ngữ cảnh y tế.

- Khối "Yêu cầu đang mở" trên màn tin nhắn (nếu có) và danh sách hội thoại bên trái tạo luồng đọc dọc tự nhiên: quét danh sách → chọn hội thoại → đọc chat ở giữa. Bác sĩ không cần đổi hướng quét ngang-dọc liên tục.
