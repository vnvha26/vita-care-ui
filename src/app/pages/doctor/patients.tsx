import { ListPage, commonRows } from "../shared/standard-pages";

export default function DoctorPatients() {
  return (
    <ListPage
      title="Danh sách bệnh nhân"
      description="Quản lý bệnh nhân đang khám, tái khám và các ca cần theo dõi."
      actionLabel="Thêm ghi chú"
      rows={commonRows.clinical}
    />
  );
}
