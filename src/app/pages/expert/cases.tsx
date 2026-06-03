import { ListPage, commonRows } from "../shared/standard-pages";

export default function ExpertCases() {
  return (
    <ListPage
      title="Danh sách ca đánh giá"
      description="Ưu tiên các ca cần phản hồi nhanh và các điểm nghẽn trải nghiệm cần xử lý."
      actionLabel="Tạo đánh giá"
      rows={commonRows.clinical}
    />
  );
}
