# Báo cáo kiểm thử UIUX - Role người cần khám bệnh (bệnh nhân)

Phạm vi kiểm thử tập trung vào luồng người bệnh nhân: trang tổng quan, tư vấn sức khỏe, đặt lịch khám, lịch hẹn, hồ sơ khám bệnh và dữ liệu y tế cá nhân. Nhìn chung, giao diện có nền tảng thiết kế khá đồng nhất, nhưng vẫn còn một số điểm gây nhiễu khi người dùng cần đi nhanh đến hành động khám hoặc tư vấn.

## 1. PHẦN MỘT: GIAO DIỆN (LAYOUT & VISUAL ARCHITECTURE)

### Các điểm nghẽn và Lỗi thiết kế giao diện
- Hệ giao diện dùng cùng một ngôn ngữ màu xanh - trắng trên hầu hết màn hình, tạo cảm giác sạch sẽ nhưng cũng làm giảm mức độ phân biệt giữa các khối nội dung quan trọng. Trên [dashboard bệnh nhân](../src/app/pages/patient/dashboard.tsx), hero card, stat card và thẻ tư vấn AI đều có trọng lượng thị giác gần tương đương.
- Một số màn hình có quá nhiều lớp thông tin trong cùng một khung nhìn, đặc biệt là [đặt lịch khám](../src/app/pages/patient/book.tsx) và [tư vấn sức khỏe](../src/app/pages/patient/consultation.tsx). Người dùng phải quét qua nhiều panel, danh sách và summary box trước khi chạm được hành động chính.
- Thanh bên và thanh trên cố định giúp điều hướng rõ ràng, nhưng ở không gian dọc hẹp sẽ làm vùng nội dung chính bị co lại. Điều này dễ gây cảm giác màn hình bị chia nhỏ, nhất là khi đi vào các màn có nhiều form và danh sách.
- Trang đăng nhập và đăng ký của bệnh nhân dùng một phong cách tách biệt khá mạnh so với hệ chính: nền gradient xanh nhạt, icon emoji và hệ nút mặc định. Sự lệch pha này khiến trải nghiệm từ landing sang khu vực bệnh nhân chưa thật liền mạch.

### Điểm sáng thiết kế giao diện
- Bố cục tổng thể có cấu trúc tốt: sidebar trái, topbar trên, vùng nội dung chính ở giữa. Cách chia khối này giúp bệnh nhân luôn biết mình đang ở đâu và quay lại luồng chính rất nhanh.
- Các thẻ nội dung bo góc lớn, nhiều khoảng đệm và đổ bóng nhẹ tạo cảm giác thân thiện, phù hợp ngữ cảnh chăm sóc sức khỏe. Giao diện không bị nặng như dashboard nghiệp vụ.
- Menu của bệnh nhân được tinh gọn đúng nhu cầu thực tế: Trang chủ, Tư vấn sức khỏe, Lịch khám, Lịch sử khám, Dữ liệu y tế. Việc rút bớt mục thừa giúp giảm tải nhận thức ngay từ điều hướng.
- Topbar của role bệnh nhân đã bỏ thanh tìm kiếm, nhờ đó khu vực đầu trang gọn hơn và tránh làm người dùng phân tán khi mục tiêu chính thường là tra cứu nhanh hoặc đặt lịch.

## 2. PHẦN HAI: CÁC NÚT BẤM VÀ DI CHUỘT (INTERACTIONS & MICRO-INTERACTIONS)

### Các lỗi tương tác, nhận diện và phản hồi nút bấm
- Nhiều nút CTA quan trọng cùng dùng phong cách nút xanh bo tròn, ví dụ như Hỏi AI ngay, Bắt đầu tư vấn ngay, Đặt lịch mới, Tư vấn chuyên sâu. Khi đặt cạnh nhau, mức ưu tiên giữa các hành động không thật sự rõ, nhất là với người lần đầu vào hệ thống.
- Ở màn [tư vấn sức khỏe](../src/app/pages/patient/consultation.tsx), người dùng phải xử lý đồng thời chuyển chế độ AI/bác sĩ, chọn phiên chat, nhập tin nhắn và mở menu đính kèm. Đây là một chuỗi tương tác dày, dễ gây cảm giác quá tải nếu người bệnh đang cần thao tác nhanh.
- Luồng [đặt lịch khám](../src/app/pages/patient/book.tsx) có nhiều lựa chọn phụ thuộc lẫn nhau: chuyên khoa, phòng khám, bác sĩ, ngày, giờ, hình thức khám. Dù logic tự cập nhật khá tốt, giao diện chưa nhấn mạnh rõ bước nào là bắt buộc và bước nào là gợi ý.
- Nút gửi yêu cầu đặt lịch trong phần tóm tắt lịch hẹn chưa cho cảm giác phản hồi đủ mạnh nếu xét như một luồng hoàn tất giao dịch. Với người bệnh, đây là điểm cuối rất quan trọng nên cần tín hiệu xác nhận rõ hơn sau click.
- Một số màn form như đăng nhập, đăng ký vẫn dùng tương tác mức cơ bản, thiếu các trạng thái vi mô như loading, success, error hiển thị trực tiếp trong layout chính. Điều này làm các bước thao tác chưa tạo cảm giác được “dẫn dắt” trọn vẹn.

### Điểm sáng tương tác đã tốt
- Sidebar có trạng thái active rõ ràng và có thể thu gọn, giúp bệnh nhân vừa nhìn nhanh được mục hiện tại vừa mở rộng không gian nội dung khi cần.
- Các danh sách lịch hẹn và hồ sơ khám cho phép mở rộng chi tiết ngay tại chỗ bằng nút Chi tiết / Ẩn chi tiết, rất phù hợp với nhu cầu xem nhanh rồi mới đào sâu.
- Màn tư vấn có các chip triệu chứng nhanh, hỗ trợ gửi ý định phổ biến chỉ bằng một lần chạm. Đây là micro-interaction tốt cho nhóm người bệnh không muốn nhập nhiều.
- Trong đặt lịch khám, trạng thái chọn của chuyên khoa, phòng khám, bác sĩ và khung giờ đều được phản hồi bằng nền và viền nổi bật. Cách phản hồi này đủ trực quan để người dùng hiểu ngay mình đã chọn gì.
- Trên màn hồ sơ khám bệnh, ô tìm kiếm và badge trạng thái giúp lọc thông tin nhanh, còn lịch sử tư vấn đã lưu lại tạo cảm giác hệ thống có ghi nhận tiến trình chăm sóc liên tục.

## 3. PHẦN BA: TẦM NHÌN VÀ SỰ CHÚ Ý (VISUAL HIERARCHY & ATTENTION PATTERN)

### Điểm gây phân tán và Xung đột tiêu điểm thị giác
- Ở dashboard, tiêu điểm bị chia cho nhiều thành phần có độ nổi gần nhau: lời chào, ô nhập triệu chứng, điểm sức khỏe, khối AI, hoạt động gần đây và lịch hẹn sắp tới. Người dùng không luôn nhìn thấy một “điểm hành động số một” thật rõ.
- Màu nhấn xanh xuất hiện quá dày ở nền, tiêu đề phụ, badge, icon, nút và selected state. Khi mọi thứ đều có màu nhấn, thị giác khó xác định đâu là tín hiệu quan trọng nhất.
- Một số màn hình dùng summary panel ở cạnh phải với nhiều khối cảnh báo/khuyến nghị, ví dụ trong [tư vấn sức khỏe](../src/app/pages/patient/consultation.tsx). Khối này hữu ích, nhưng nếu nhìn tổng thể thì nó cạnh tranh trực tiếp với vùng chat chính.
- Ở [hồ sơ khám bệnh](../src/app/pages/patient/medical-records.tsx), bảng xét nghiệm có chiều ngang khá lớn và gây thêm một lớp đọc nữa sau khi người dùng đã xem qua thẻ chẩn đoán. Điều này làm nhịp tiếp nhận thông tin chậm hơn trên màn nhỏ.

### Điểm xuất sắc về điều hướng tiêu điểm nhìn
- Hero đầu trang của dashboard đi thẳng vào hành động cốt lõi của bệnh nhân: nhập triệu chứng và hỏi AI. Đây là điểm đúng nhất về mặt ưu tiên vì khớp với nhu cầu ban đầu của người cần khám.
- Các trạng thái chọn trên booking dùng nền xanh nhạt hoặc xanh ngọc để neo mắt vào lựa chọn hiện tại. Người dùng có thể quét rất nhanh mà không cần đọc lại toàn bộ danh sách.
- Badge trạng thái như Chờ khám, Đã xác nhận, Mới, Cần xem tạo nhịp đọc theo dạng quét dọc. Điều này đặc biệt tốt với các danh sách lịch hẹn và hồ sơ y tế có nhiều dữ liệu lặp.
- Dùng khối thông tin tách lớp trên nền trắng hoặc nền pastel giúp mắt dễ phân biệt giữa dữ liệu chính và ghi chú phụ. Nhờ đó, dù có nhiều nội dung, hệ thống vẫn giữ được khả năng đọc lướt khá tốt.
- Các biểu tượng theo ngữ nghĩa như lịch, bác sĩ, hồ sơ, thuốc và cảnh báo được đặt đúng vị trí, hỗ trợ người bệnh nắm nội dung nhanh hơn văn bản thuần túy.
