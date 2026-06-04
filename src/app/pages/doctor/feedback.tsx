import { ListPage } from "../shared/standard-pages";

export default function DoctorFeedback() {
  return (
    <ListPage
      title="Phản hồi chuyên gia"
      description="Theo dõi các nhận xét chuyên môn và đề xuất điều trị từ chuyên gia."
      rows={[
        { title: "Ca tiểu đường type 2", description: "Khuyến nghị điều chỉnh liều insulin và theo dõi đường huyết sau ăn.", badge: "Hoàn tất", tone: "green" },
        { title: "Ca cao huyết áp", description: "Cần làm thêm xét nghiệm chức năng thận.", badge: "Chờ bổ sung", tone: "amber" },
        { title: "Ca đau ngực cấp", description: "Cần nhập viện để theo dõi sát.", badge: "Khẩn", tone: "rose" },
      ]}
    />
  );
}
