# Báo cáo kiểm thử UIUX - Role chuyên gia (kiểm duyệt AI y tế)

Phạm vi kiểm thử tập trung vào luồng chuyên gia: dashboard tổng quan, ca đánh giá, chi tiết ca, chat & yêu cầu, quản lý hội thoại, quản lý tri thức, quản lý bệnh nhân, báo cáo & phân tích, hồ sơ cá nhân. Đây là vai trò chuyên môn cao, cần xử lý nhiều thông tin y tế đồng thời, nên mọi điểm nghẽn giao diện đều ảnh hưởng trực tiếp đến tốc độ và chất lượng kiểm duyệt.

## 1. PHẦN MỘT: GIAO DIỆN (LAYOUT & VISUAL ARCHITECTURE)

### Các điểm nghẽn và Lỗi thiết kế giao diện

- Màn [dashboard chuyên gia](../src/app/pages/expert/dashboard.tsx) chứa quá nhiều khối nội dung trong một trang: hero card, 4 stat cards, review queue, biểu đồ tròn, hoạt động gần đây, điều hướng nhanh — tổng cộng 7 vùng nội dung xếp dọc liên tục. Với chuyên gia cần xử lý ca nhanh, phải quét rất nhiều trước khi chạm được hành động "Mở ca đánh giá", và ngay cả nút đó cũng nằm góc phải hero card, dễ bị bỏ qua khi đọc lướt.

- Màn [chat & yêu cầu](../src/app/pages/expert/chat.tsx) dùng layout 3 cột `[320px_minmax(0,1fr)_340px]`. Trên viewport dưới 1280px (phổ biến với laptop 13"), ba cột chật chội khiến vùng chat trung tâm bị ép rất hẹp. Chuyên gia cần đọc hội thoại y tế dài trong vùng rộng không đủ, dễ dẫn đến scroll ngang hoặc bỏ sót nội dung quan trọng.

- Toàn bộ sidebar chuyên gia (xem [sidebar.tsx](../src/app/components/layout/sidebar.tsx)) có 8 mục điều hướng — nhiều nhất trong các role. Khi sidebar mở rộng, danh sách dài chiếm đáng kể chiều dọc; khi thu gọn (`w-20`), chỉ hiện icon mà chuyên gia cần ghi nhớ ý nghĩa từng biểu tượng. Không có tooltip khi hover trên sidebar thu gọn (chỉ có `title` attribute), nên khả năng nhận diện phụ thuộc hoàn toàn vào ghi nhớ người dùng.

- Trang [chi tiết ca đánh giá](../src/app/pages/expert/case-detail.tsx) xếp 3 SectionCard liên tiếp bên trái (Thông tin ca bệnh → Thông tin bệnh nhân → Triệu chứng và phân tích AI), mỗi card lại dùng grid 2 cột DataRow. Cấu trúc này tạo cảm giác "danh sách thông tin vô tận" khi chuyên gia muốn nhanh chóng xác định triệu chứng chính và phản hồi AI để đưa ra nhận định, thay vì phải đọc qua 12 DataRow trước khi đến form phản hồi bên phải.

- Màn [báo cáo & phân tích](../src/app/pages/expert/reports.tsx) dùng bar chart thủ công (div với `style={{ height: percentage }}`) thay vì thư viện biểu đồ. Biểu đồ không có trục Y, không có label giá trị trên từng cột (chỉ có số dưới cột), không có hover state hay tooltip. Với chuyên gia cần đọc xu hướng, biểu đồ này thiếu độ chi tiết cần thiết để phân tích nhanh.

- Màn [quản lý hội thoại](../src/app/pages/expert/conversations.tsx) có 3 SectionCard xếp dọc (bộ lọc, danh sách hội thoại, người dùng phản hồi nhiều), trong khi SectionCard "Tóm tắt hôm nay" lại nằm cột phải cùng lúc với danh sách hội thoại. Sự phân tán này khiến chuyên gia phải thay đổi hướng quét liên tục giữa dọc và ngang để nắm tổng quan.

- Các màn danh sách ([ca đánh giá](../src/app/pages/expert/cases.tsx), [hội thoại](../src/app/pages/expert/conversations.tsx), [bệnh nhân](../src/app/pages/expert/patients.tsx)) đều không có pagination hay virtual scroll. Dữ liệu hiện tại chỉ có 3 mục mẫu, nhưng khi số ca/hội thoại tăng thực tế, danh sách sẽ kéo dài vô hạn mà không có cách phân trang, gây vấn đề performance và trải nghiệm cuộn rất mệt.

### Điểm sáng thiết kế giao diện

- Hero card trên dashboard chuyên gia có cấu trúc tốt: bên trái là lời chào + mô tả vai trò, bên phải là nút CTA "Mở ca đánh giá". Đối với chuyên gia, hành động đầu tiên cần làm khi vào hệ thống là duyệt ca, nên vị trí và nội dung nút này rất hợp lý.

- Hệ thống 4 StatCard trên dashboard dùng 4 tone khác nhau (amber, blue, green, violet) cho 4 chỉ số, giúp chuyên gia phân biệt nhanh: amber = chờ xử lý, blue = đang xử lý, green = hoàn thành, violet = thời gian. Đây là cách dùng màu ngữ nghĩa rất hiệu quả cho dashboard vận hành.

- Layout hai cột `[minmax(0,1fr)_420px]` trên [chi tiết ca đánh giá](../src/app/pages/expert/case-detail.tsx) tách rõ giữa thông tin ca (trái) và form phản hồi chuyên môn (phải). Chuyên gia có thể vừa đọc dữ liệu vừa nhập nhận định mà không cần chuyển tab hay scroll lên xuống.

- Màn [quản lý tri thức](../src/app/pages/expert/knowledge.tsx) dùng tab 3 nút (Bệnh / Thuốc / Kịch bản) tích hợp ngay trong SectionCard bộ lọc, thay vì để riêng. Cách gộp này tiết kiệm không gian dọc và cho phép chuyên gia chuyển ngữ cảnh nội dung cực nhanh chỉ bằng một click.

- Từng màn đều có thanh bộ lọc (input tìm kiếm + select trạng thái + select mức độ) đặt ngay trên danh sách, giúp chuyên gia thu hẹp phạm vi dữ liệu nhanh. Dạng filter inline này phù hợp hơn modal filter cho người dùng cần quét và hành động liên tục.

- Sidebar chuyên gia có nút thu gọn/mở rộng với chevron icon và `aria-label`, cho phép chuyên gia linh hoạt chuyển đổi giữa cần xem đầy đủ tên mục và cần tối đa không gian nội dung — điều quan trọng khi làm việc với dữ liệu y tế chi tiết.

## 2. PHẦN HAI: CÁC NÚT BẤM VÀ DI CHUYỂN (INTERACTIONS & MICRO-INTERACTIONS)

### Các lỗi tương tác, nhận diện và phản hồi nút bấm

- Tất cả nút "Kiểm duyệt" trên Review Queue dashboard và "Xem chi tiết" trên danh sách ca đều link cứng đến `/expert/cases/case-001`, bất kể đang duyệt ca nào. Chuyên gia click vào CASE-002 hay CASE-003 đều bị đưa đến chi tiết của CASE-001. Đây là lỗi nghiêm trọng khiến toàn bộ luồng kiểm duyệt không hoạt động đúng với dữ liệu nhiều ca.

- Trên [chi tiết ca](../src/app/pages/expert/case-detail.tsx), nút "Lưu nháp" và "Gửi phản hồi" không có handler `onClick`. Chuyên gia nhập xong nhận định nhưng bấm nút không có gì xảy ra — không có lưu, không có thông báo, không có feedback. Đây là điểm gãy quan trọng nhất trong toàn bộ luồng chuyên gia vì hành động cốt lõi (gửi phản hồi chuyên môn) hoàn toàn không hoạt động.

- Tương tự, textarea "Nhập phản hồi chuyên môn", select "Mức ưu tiên" và select "Trạng thái xử lý" trên chi tiết ca đều không có state management (không `value`, không `onChange`). Chuyên gia có thể nhập nhưng dữ liệu không được lưu đi đâu, tạo cảm giác thao tác ảo.

- Input tìm kiếm trên các màn [ca đánh giá](../src/app/pages/expert/cases.tsx), [hội thoại](../src/app/pages/expert/conversations.tsx), [bệnh nhân](../src/app/pages/expert/patients.tsx), [tri thức](../src/app/pages/expert/knowledge.tsx) đều không có `value` hay `onChange` handler. Chuyên gia gõ từ khóa nhưng không có lọc thực tế, chỉ là input hiển thị tĩnh.

- Hai select filter trên màn ca đánh giá và hội thoại cũng không có `value`/`onChange`, nên chuyên gia thay đổi filter nhưng danh sách không phản hồi. Tương tác chọn lọc hoàn toàn ảo.

- Trên [chat chuyên gia](../src/app/pages/expert/chat.tsx), input nhập tin nhắn và nút Send không có state hay handler gửi tin. Chuyên gia không thể trả lời bác sĩ hay người dùng trong giao diện chat, khiến toàn bộ kênh giao tiếp quan trọng này không sử dụng được.

- Nút "Gắn cờ hội thoại" trên quản lý hội thoại và "Tạo ghi chú" trên chat đều là nút không có handler, chỉ hiển thị nhưng không mở modal hay form nào. Chuyên gia kỳ vọng khi bấm sẽ có giao diện gắn cờ hoặc tạo note, nhưng không có gì xảy ra.

- Nút "Lọc nâng cao" trên danh sách ca và "Thêm nội dung" trên quản lý tri thức cũng không có hành động đi kèm. Đây là các CTA quan trọng cho chuyên gia cần mở rộng phạm vi lọc hoặc bổ sung tri thức mới, nhưng click không phản hồi.

- Trên [hồ sơ cá nhân](../src/app/pages/expert/profile.tsx), tất cả input đều `readOnly` và nút "Lưu thay đổi" không có handler. Chuyên gia không thể cập nhật thông tin cá nhân, dù nút gợi ý hành động lưu.

- Nút "Xuất báo cáo" trên màn báo cáo không có handler — chuyên gia không thể tải file báo cáo, dù đây là nhu cầu phổ biến khi cần gửi kết quả kiểm duyệt cho quản lý.

- Danh sách thread trên [chat](../src/app/pages/expert/chat.tsx) không có state `selectedId`. Thread đầu tiên luôn highlight (`index === 0 ? "border-[#CFE3FF] bg-[#EAF3FF]"`), nhưng click vào thread khác không thay đổi trạng thái chọn. Chuyên gia không thể chuyển đổi hội thoại đang xem.

### Điểm sáng tương tác đã tốt

- Tab selector Người dùng / Bác sĩ trên màn chat dùng cùng pattern toggle như toàn hệ (rounded-xl trên nền #F2F7FB, active state bg-white + shadow-sm). Cách triển khai nhất quán này giúp chuyên gia không cần học lại tương tác mới khi chuyển giữa các màn.

- Toggle sidebar thu gọn/mở rộng có animation `transition-all duration-300`, tạo cảm giác mượt mà khi chuyên gia điều chỉnh không gian làm việc. Nút toggle (chevron) luôn hiện ở góc sidebar, dễ tìm.

- StatusBadge trên toàn bộ hệ chuyên gia dùng tone ngữ nghĩa nhất quán: rose = cao/khẩn, amber = trung bình/chờ, green = ổn/hoàn thành, blue = đang xử lý, violet = đặc biệt. Chuyên gia chỉ cần nhìn màu badge đã biết mức độ ưu tiên mà không cần đọc chữ.

- Quick link "Điều hướng nhanh" trên dashboard cung cấp 3 shortcut (Quản lý tri thức, Quản lý hội thoại, Báo cáo) dưới dạng card link có icon và hover state. Đây là micro-interaction tốt giúp chuyên gia nhảy nhanh đến khu vực thường dùng mà không cần sidebar.

- Tab Bệnh / Thuốc / Kịch bản trên quản lý tri thức đổi icon DataRow tương ứng (BookOpen, Pill, Bot). Sự thay đổi icon theo ngữ cảnh giúp chuyên gia nhận diện loại nội dung ngay cả khi quét nhanh, không cần đọc label.

- Select filter trên các màn danh sách dùng `rounded-full` nhất quán với hệ nút, tạo cảm giác đồng nhất thay vì dùng native select mặc định trông khác biệt.

## 3. PHẦN BA: TẦM NHÌN VÀ SỰ CHÚ Ý (VISUAL HIERARCHY & ATTENTION PATTERN)

### Điểm gây phân tán và Xung đột tiêu điểm thị giác

- Dashboard chuyên gia có tới 4 tiêu điểm thị giác cạnh tranh: (1) hero card với nút CTA, (2) 4 StatCard xếp ngang, (3) Review Queue chiếm rộng, (4) biểu đồ tròn đánh giá chatbot. Mỗi khối có trọng lượng thị giác đáng kể (bóng, border, màu nền), khiến mắt chuyên gia phải quét liên tục mà không có một điểm dừng rõ ràng nhất. Biểu đồ tròn `conic-gradient` đặc biệt thu hút mắt nhờ màu sắc mạnh (#EF4444, #F59E0B, #2F80ED, #27C3A2), nhưng thông tin nó cung cấp (rating trung bình 4.2) ít quan trọng hơn Review Queue (các ca cần xử lý ngay).

- Tiêu đề "Review Queue" trên dashboard dùng tiếng Anh, trong khi toàn bộ giao diện khác là tiếng Việt. Sự đột ngột về ngôn ngữ tạo gián đoạn nhận thức, buộc chuyên gia phải chuyển ngữ cảnh đọc. Với vai trò đòi hỏi xử lý nhanh, mọi gián đoạn nhỏ đều cộng dồn.

- Trên màn [chi tiết ca](../src/app/pages/expert/case-detail.tsx), cột trái chứa 12 DataRow với cùng icon lặp lại: ClipboardCheck dùng 4 lần cho "Thông tin ca bệnh", UserRound dùng 4 lần cho "Thông tin bệnh nhân", FileText dùng 4 lần cho "Triệu chứng và phân tích AI". Khi cùng một icon xuất hiện liên tục, nó mất giá trị nhận diện và trở thành noise thị giác, khiến chuyên gia khó phân biệt nhanh loại thông tin đang xem.

- Màn chat 3 cột có 3 SectionCard cạnh tranh: panel thread trái, vùng chat giữa, panel phụ phải. Mỗi panel có tiêu đề, border và nội dung riêng. Khi chuyên gia đang tập trung vào hội thoại ở giữa, hai panel cạnh vẫn thu hút mắt nhờ chuyển động và nội dung, đặc biệt panel "Yêu cầu đang mở" bên phải với nhiều badge màu.

- Trên [báo cáo](../src/app/pages/expert/reports.tsx), bar chart dùng gradient `from-[#2F80ED] to-[#27C3A2]` bắt mắt nhưng lại đặt trên nền `#F7FAFC` — độ tương phản không đủ mạnh để biểu đồ nổi bật như một tiêu điểm. Ngược lại, progress bar phân bố chuyên khoa dùng màu rời (xanh, ngọc, vàng, tím) trên nền xám, lại cạnh tranh chú ý với biểu đồ chính.

- Màn [quản lý bệnh nhân](../src/app/pages/expert/patients.tsx) chỉ có 3 StatCard (thay vì 4 như dashboard), tạo khoảng trống góc phải hàng stat cards trên viewport rộng. Sự thiếu cân đối này khiến mắt bị kéo về bên trái, không đều.

### Điểm xuất sắc về điều hướng tiêu điểm nhìn

- Hero card trên dashboard chuyên gia dùng nền gradient nhẹ `from-[#EAF3FF] to-[#E8FFF9]` kết hợp text tối, tạo điểm khởi đầu vừa đủ nổi mà không cạnh tranh với stat cards hay danh sách bên dưới. Nút CTA "Mở ca đánh giá" màu xanh đậm (#2F80ED) trên nền pastel là điểm neo thị giác rõ nhất toàn trang, đúng với hành động ưu tiên cao nhất của chuyên gia.

- Badge "Cao" (tone rose) trên Review Queue và danh sách ca luôn nổi bật nhất trong hàng loạt badge, nhờ màu đỏ nhạt (#FFECEC/#D42D2D) tự nhiên thu hút sự chú ý. Điều này giúp chuyên gia ngay lập tức nhận diện ca ưu tiên cao mà không cần quét toàn bộ danh sách.

- Layout hai cột trên chi tiết ca đặt form phản hồi bên phải với viền rõ và textarea lớn, tạo "điểm hành động" tách biệt khỏi vùng thông tin đọc bên trái. Chuyên gia biết ngay nơi cần tương tác sau khi đọc xong dữ liệu ca.

- SectionCard "Quy tắc kiểm duyệt" trên quản lý tri thức và "Quyền truy cập" trên quản lý bệnh nhân dùng tone xanh nhạt (#E8FFF9/#EAF3FF) và icon ShieldCheck, tạo cảm giác "hướng dẫn / chính sách" phân biệt rõ với dữ liệu danh sách bên cạnh. Chuyên gia hiểu ngay đây là thông tin quy định, không phải nội dung cần duyệt.

- Bar chart trên báo cáo, dù đơn giản, vẫn đúng nguyên tắc: trục dưới (tháng) → chiều cao cột (giá trị) → gradient từ đậm đến nhạt. Chuyên gia có thể nắm xu hướng tăng (38→52→46→61→74→82) chỉ bằng một lần quét dọc, rất phù hợp cho ai cần kết luận nhanh.

- Khối "Gợi ý ưu tiên" trên quản lý hội thoại dùng nền xanh ngọc (#E8FFF9) với text #148E77, tạo điểm dừng thị giác cuối trang có giá trị hành động. Vị trí cuối flow đọc là đúng nhất cho một lời khuyên về thứ tự ưu tiên xử lý.
