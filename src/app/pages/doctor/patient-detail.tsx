import { ListPage } from "../shared/standard-pages";

export default function PatientDetail() {
  return (
    <ListPage
      title="Chi tiết bệnh nhân"
      description="Tổng hợp nhanh triệu chứng, lịch sử khám và chỉ định gần nhất."
      rows={[
        { title: "Thông tin chung", description: "Nguyễn Văn An · 45 tuổi · Tiểu đường type 2", badge: "Đang điều trị", tone: "blue" },
        { title: "Lần khám gần nhất", description: "Đường huyết sau ăn cao, cần theo dõi sát.", badge: "05/06", tone: "amber" },
        { title: "Kế hoạch", description: "Điều chỉnh liều thuốc và tái khám sau 2 tuần.", badge: "Đã lập", tone: "green" },
      ]}
    />
  );
}

