# Báo cáo kiểm thử UIUX - Role người cần tư vấn (không cần đăng nhập)

Phạm vi kiểm thử tập trung vào luồng người cần tư vấn: trang Landing, trang chat tư vấn AI (guest), modal đăng nhập, trang đăng nhập và trang đăng ký. Đây là nhóm người dùng chưa có tài khoản, thao tác ngay khi vào web, nên mọi rào cản nhỏ cũng ảnh hưởng trực tiếp đến tỷ lệ chuyển đổi từ guest sang user đăng ký.

## 1. PHẦN MỘT: GIAO DIỆN (LAYOUT & VISUAL ARCHITECTURE)

### Các điểm nghẽn và Lỗi thiết kế giao diện

- Trang [Landing](../src/app/routes.tsx) và trang [Guest Chat](../src/app/pages/guest/chat.tsx) dùng hai cấu trúc layout hoàn toàn khác nhau: Landing không có sidebar, Guest Chat có sidebar cố định bên trái. Khi người dùng click "Bắt đầu tư vấn miễn phí" từ Landing sang Guest Chat, sự chuyển đổi bố cục đột ngột tạo cảm giác như nhảy sang một ứng dụng khác, phá vỡ tính liền mạch của onboarding đầu tiên.

- Sidebar trên [Guest Chat](../src/app/pages/guest/chat.tsx) hiển thị các mục bị khóa (Trang chủ, Lịch khám, Lịch sử khám, Dữ liệu y tế) với icon khóa nhỏ (h-3.5 w-3.5). Mặc dù ý tưởng "gợi mở tính năng" hợp lý, nhưng việc chiếm diện tích sidebar bằng 4 mục không thể dùng lại không cung cấp giá trị thực tế cho guest, mà chỉ làm tăng độ dài menu mà không tạo được tương tác hữu ích.

- Navigation bar trên Landing (`<nav className="hidden">`) đang bị ẩn hoàn toàn, khiến người dùng không thể điều hướng trực tiếp đến phần Giới thiệu, Dịch vụ hay Trải nghiệm AI từ thanh header. Điều này làm giảm khả năng khám phá các giá trị cốt lõi của nền tảng ngay từ first impression.

- Hai trang [đăng nhập](../src/app/pages/patient/login.tsx) và [đăng ký](../src/app/pages/patient/register.tsx) dùng phong cách thiết kế tách biệt hoàn toàn so với hệ chính: nền gradient `from-blue-50 to-indigo-100`, icon emoji 🏥, nút `rounded-lg`, font `text-gray-600`. Trong khi toàn bộ hệ VitaCare dùng `rounded-[24px]`, màu brand `#2F80ED`/`#27C3A2`, icon Lucide. Sự lệch pha này rất rõ ràng khi người dùng đi từ Landing → Đăng nhập/Đăng ký, tạo cảm giác thiếu chuyên nghiệp và không đồng nhất thương hiệu.

- Nút "Đăng ký" trên Landing chỉ hiển thị từ `sm:inline-flex` trở lên, nghĩa là trên mobile (viewport < 640px) người dùng chỉ thấy nút "Đăng nhập", mất hoàn toàn điểm chốt đăng ký trên thiết bị phổ biến nhất của nhóm người dùng mới.

- Guest Chat có sidebar ẩn trên mobile (`hidden md:flex`), nhưng không cung cấp bất kỳ cơ chế điều hướng thay thế nào (hamburger menu, drawer, v.v.). Người dùng mobile chỉ thấy vùng chat mà không biết các tính năng khác nằm ở đâu hay cách quay lại trang chủ.

### Điểm sáng thiết kế giao diện

- Landing page có hero section thiết kế rất tốt: tiêu đề lớn (text-5xl → text-[56px]), subtitle rõ ràng, và ngay lập tức đưa ra hai hành động chính (Bắt đầu tư vấn miễn phí + Đặt lịch với bác sĩ). Thứ tự ưu tiên hành động đúng với tâm lý người cần tư vấn: muốn thử trước, rồi mới cam kết.

- Khối chat preview trên Landing mô phỏng trực tiếp trải nghiệm AI chat, giúp người dùng hình dung ngay sản phẩm mà không cần click vào đâu. Đây là một thiết kế "show, don't tell" rất hiệu quả để tăng chuyển đổi.

- Phần số liệu thống kê (15,000+ bệnh nhân, 50+ bác sĩ, 99.8% phản hồi, 24/7) trên nền #1E293B tạo độ tương phản mạnh, vừa đáng tin cậy vừa không chiếm quá nhiều không gian. Dùng tone xanh pastel (#CFE3FF) cho số liệu giữ được cảm giác y tế, nhẹ nhàng.

- Hệ thống màu trên Guest Chat rất nhất quán: xanh dương (#2F80ED) cho brand/CTA, xanh ngọc (#27C3A2/#E8FFF9) cho trạng thái tích cực, vàng (#FFF7E8/#C77805) cho cảnh báo mức trung bình, đỏ nhạt (#FFECEC/#D42D2D) cho cảnh báo quan trọng. Mỗi màu mang một ngữ nghĩa rõ ràng, đặc biệt quan trọng khi người dùng đang lo lắng về sức khỏe.

- Cấu trúc hai cột trên Guest Chat (vùng chat bên trái, thông tin phụ bên phải) tách bạch rõ giữa hành động chính và thông tin hỗ trợ, giúp người dùng tập trung vào việc mô tả triệu chứng mà vẫn thấy được kết quả phân tích ngay cạnh.

- Header trên Landing dùng sticky top-4 với backdrop-blur, tạo cảm giác hiện đại và luôn cho phép người dùng quay lại đăng nhập bất cứ lúc nào mà không cần scroll lên đầu trang.

## 2. PHẦN HAI: CÁC NÚT BẤM VÀ DI CHUỘT (INTERACTIONS & MICRO-INTERACTIONS)

### Các lỗi tương tác, nhận diện và phản hồi nút bấm

- Nút "Đặt lịch với bác sĩ" trên Landing (`onClick={() => setShowLogin(true)}`) mở modal đăng nhập, nhưng người dùng chỉ muốn đặt lịch, không muốn đăng nhập. Sự kỳ vọng không khớp này có thể gây thất vọng: người dùng click nút "đặt lịch" nhưng bị chuyển sang form đăng nhập mà không có lời giải thích trước. Nên có tooltip hoặc inline text cho biết hành động này cần đăng nhập.

- Nút "Đăng nhập" trong sidebar Guest Chat và nút "Đăng ký" trên Landing điều hướng đến hai modal/trang khác nhau nhưng dùng cùng kiểu visual (nút xanh bo tròn). Người dùng mới khó phân biệt đâu là modal đăng nhập nhanh (trên Guest Chat) và đâu là trang đăng nhập đầy đủ, gây nhầm lẫn về luồng mong đợi.

- Nút Mic (microphone) trên Guest Chat không có chức năng thực tế - chỉ là icon hiển thị tĩnh, ẩn trên mobile (`hidden sm:flex`). Một nút không hoạt động trên giao diện chat với người dùng đang cần tư vấn sức khỏe tạo cảm giác sản phẩm chưa hoàn thiện, đặc biệt khi micro là tính năng rất kỳ vọng trong bối cảnh người bệnh có thể không tiện gõ chữ.

- Nút Paperclip (đính kèm) trên Guest Chat mở placeholder không có logic thực tế. Người dùng có thể kỳ vọng gửi ảnh kết quả khám hoặc đơn thuốc cũ nhưng không được, và cũng không có tooltip hay visual hint cho biết đây là tính năng chưa triển khai.

- AI response trên Guest Chat luôn trả lời giống nhau bất kể input ("Tôi đã ghi nhận triệu chứng. Bạn có thể cho biết triệu chứng bắt đầu từ khi nào..."). Thiếu phản hồi ngữ cảnh khiến người dùng cảm giác như đang chat với script cố định, không phải AI thực. Đây là rủi ro lớn vì giá trị cốt lõi của nền tảng là "AI tư vấn sức khỏe".

- Quick symptoms chips (Sốt, Đau đầu, Buồn nôn, Chóng mặt, Đau họng, Ho) trên Guest Chat đều trả về cùng một câu trả lời AI, khiến người dùng thử 2-3 chip rồi nhận ra không có sự khác biệt, giảm niềm tin vào khả năng phân tích của hệ thống.

- Modal đăng nhập (cả trên Landing và Guest Chat) có input email/password `readOnly` với dữ liệu mẫu hardcode. Người dùng mới không thể nhập thông tin thật, tạo ấn tượng đây là bản demo không dùng được thật, làm giảm động lực đăng ký tài khoản thực.

- Link "Quên mật khẩu?" trên trang đăng nhập là thẻ `<a href="#">` chết, không dẫn đến bất kỳ flow khôi phục nào. Tương tự, "Điều khoản dịch vụ" và "Chính sách bảo mật" trên trang đăng ký cũng là `<a href="#">`. Đây là những link kỳ vọng cao từ người dùng mới, và khi click vào không có gì xảy ra, nó phá vỡ niềm tin ngay từ bước onboarding.

- Nút "Ghi nhớ đăng nhập" (checkbox) trên trang đăng nhập không liên kết với logic lưu session nào. Người dùng tick nhưng không thấy hiệu quả, gây bối rối.

- Nút quay lại ("← Quay lại trang chủ") trên trang đăng nhập điều hướng đến `/patient/home`, nhưng route này redirect về `/` (Landing). Dù kết quả cuối cùng đúng, nhưng luồng redirect qua中间 bước không cần thiết và có thể gây flash nội dung.

- Trên trang đăng ký, validation chỉ kiểm tra "Mật khẩu xác nhận không khớp" bằng `alert()`. Các trường bắt buộc khác (email format, số điện thoại format, độ dài mật khẩu) không có validation cụ thể, và khi submit thành công thì redirect thẳng đến dashboard mà không có thông báo tạo tài khoản thành công.

### Điểm sáng tương tác đã tốt

- Quick symptoms chips trên Guest Chat là một micro-interaction rất tốt: người dùng chỉ cần một lần chạm để bắt đầu cuộc trò chuyện, giảm rào cản cho người chưa biết diễn tả triệu chứng bằng văn bản. Chip có hover state (`hover:bg-[#F2F7FB]`) và gửi tin nhắn ngay lập tức.

- Enter key gửi tin nhắn trên Guest Chat (`onKeyDown={(event) => event.key === "Enter" && sendMessage()}`) là tương tác quen thuộc và đúng kỳ vọng cho input chat, giúp người dùng không cần di chuột đến nút Send.

- Modal đăng nhập trên Guest Chat và Landing đều có nút đóng (X) rõ ràng ở góc trên phải, có hover state và aria-label. Người dùng có thể thoát nhanh mà không bị khóa trong modal.

- Nút "Đăng nhập ngay" trên modal có role selector (Bệnh nhân, Bác sĩ, Quản lý, Chuyên gia) dạng toggle tab, cho phép nhanh chóng chuyển đổi vai trò mà không cần load lại trang. Selected state rõ ràng (bg-white + shadow-sm) giúp người dùng biết mình đang chọn gì.

- Link "Quay lại trang chủ" trên trang đăng ký dùng text đơn giản ← Quay lại trang chủ, dễ hiểu với người dùng Việt Nam không quen thuật ngữ UI.

- Trang đăng ký có checkbox đồng ý điều khoản được đặt ngay trước nút submit và có thuộc tính `required`, đảm bảo người dùng không bỏ qua bước này. Vị trí đặt hợp lý theo flow tự nhiên của form.

## 3. PHẦN BA: TẦM NHÌN VÀ SỰ CHÚ Ý (VISUAL HIERARCHY & ATTENTION PATTERN)

### Điểm gây phân tán và Xung đột tiêu điểm thị giác

- Trên Landing page, hai nút CTA cạnh nhau ("Bắt đầu tư vấn miễn phí" và "Đặt lịch với bác sĩ") có trọng lượng thị giác gần như tương đương: nút đầu tiên là filled blue, nút thứ hai là outlined white-with-border. Tuy nhiên, nút "Bắt đầu tư vấn miễn phí" dẫn đến trải nghiệm thực (Guest Chat), còn "Đặt lịch với bác sĩ" dẫn đến modal đăng nhập. Khi cả hai nút đều thu hút mắt như nhau, người dùng dễ click vào nút không đúng kỳ vọng.

- Trên Guest Chat, sidebar trái và aside phải (Patient Insight + Hỗ trợ tiếp theo) tạo ra hai vùng phân tán bên cạnh vùng chat trung tâm. Đặc biệt aside phải có nhiều block màu sắc khác nhau (xanh nhạt, vàng, xanh ngọc, đỏ nhạt), khiến mắt liên tục bị kéo ra khỏi vùng chat chính. Với người đang mô tả triệu chứng, sự phân tán này không lý tưởng.

- Khối "Patient Insight" trên Guest Chat dùng tiêu đề tiếng Anh trong khi toàn bộ giao diện là tiếng Việt. Sự đột ngột về ngôn ngữ tạo một điểm gián đoạn nhận thức nhỏ nhưng đáng kể, nhất là với người dùng không rành tiếng Anh.

- Trang đăng nhập dùng icon emoji 🏥 (text-5xl) làm tiêu điểm thị giác đầu tiên, chiếm diện tích rất lớn. Đây không phải biểu tượng thương hiệu VitaCare (ShieldCheck), tạo sự đứt gãy với hệ icon Lucide sử dụng trên toàn bộ hệ thống. Emoji cũng không render đồng nhất trên các nền tảng, có thể trông khác nhau trên Android, iOS, Windows.

- Màu brand trên modal đăng nhập ở Guest Chat (`#5B7FF0`/`#5FC8AA`) khác với màu brand trên Landing modal (`#2F80ED`/`#27C3A2`). Cùng một ứng dụng, cùng một loại modal, nhưng hai bảng màu khác nhau gây nhầm lẫn về nhận diện thương hiệu, đặc biệt khi người dùng đã quen với màu #2F80ED trên Landing rồi mở modal trên Guest Chat thấy #5B7FF0.

- Phần thống kê trên Landing (15,000+, 50+, 99.8%, 24/7) đặt ngay dưới hero section trên nền tối. Dù nội dung giá trị, vị trí này tạo ra hai vùng "đen" cạnh nhau (nền gradient hero → nền #1E293B) khiến mắt cần thích nghi liên tục giữa sáng và tối, gây mệt mỏi thị giác nhanh.

### Điểm xuất sắc về điều hướng tiêu điểm nhìn

- Hero section trên Landing đặt tiêu điểm thị giác đúng vị trí: tiêu đề cực lớn → subtitle → CTA buttons, theo mô hình F-pattern tự nhiên. Người dùng mới đọc được giá trị cốt lõi (tư vấn AI + kết nối bác sĩ) trong chưa tới 3 giây, rất phù hợp cho nhóm người cần tư vấn thường có attention span ngắn.

- Gradient header trên Landing (`from-[#2F80ED] to-[#27C3A2]`) trên chat preview tạo một điểm neo thị giác mạnh, hướng mắt người dùng vào khung chat mô phỏng trước khi đọc CTA. Đây là cách dùng màu rất thông minh để "show the product" ngay trên landing.

- Khối cảnh báo đỏ nhạt trên Guest Chat ("Kết quả tư vấn AI chỉ mang tính tham khảo, không thay thế chẩn đoán của bác sĩ") dùng tone #FFECEC/#D42D2D nổi bật trên nền trắng, thu hút sự chú ý đúng mức cho một thông tin quan trọng về an toàn y tế. Vị trí đặt trong aside phải cũng không can thiệp vào vùng chat chính.

- Badge "Tư vấn sức khỏe" trên sidebar Guest Chat có nền gradient `from-[#EAF3FF] to-[#E8FFF9]` và font-bold, tạo trạng thái active rất rõ so với các mục bị khóa (màu xám #94A3B8). Người dùng ngay lập tức biết mình đang ở đâu trong menu.

- Onboarding flow trên Landing có nhịp thị giác tốt: hero sáng → thống kê tối → cuối trang. Sự xen kẽ sáng/tối tạo nhịp đọc cuốn hút và giúp người dùng tiến qua trang mà không bị nhàm chán.

- Breadcrumb header trên Guest Chat ("Trang chủ / Tư vấn sức khỏe") dùng hai cấp độ: nút Trang chủ là pill shape trên nền #F2F7FB, text sau dấu "/" là font-bold #1C64D1. Cách phân cấp này vừa cho biết vị trí hiện tại vừa cung cấp nút quay lại nhanh, rất phù hợp cho người dùng có thể đã lỡ vào và cần định hướng lại.
