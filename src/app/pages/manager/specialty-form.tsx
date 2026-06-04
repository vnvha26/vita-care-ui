import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Save, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const specialties = [
  { id: "SP001", name: "Tim mạch", doctorCount: 8, patientCount: 234, status: "active", description: "Chuyên khoa về tim và hệ tuần hoàn máu." },
  { id: "SP002", name: "Nội tổng hợp", doctorCount: 12, patientCount: 456, status: "active", description: "Chuyên khoa nội khoa tổng quát." },
  { id: "SP003", name: "Tiểu đường", doctorCount: 6, patientCount: 189, status: "active", description: "Chuyên điều trị bệnh tiểu đường và rối loạn nội tiết." },
  { id: "SP004", name: "Hô hấp", doctorCount: 5, patientCount: 167, status: "active", description: "Chuyên khoa về bệnh lý đường hô hấp." },
  { id: "SP005", name: "Thần kinh", doctorCount: 4, patientCount: 98, status: "active", description: "Chuyên điều trị các bệnh lý hệ thần kinh." },
  { id: "SP006", name: "Da liễu", doctorCount: 3, patientCount: 76, status: "inactive", description: "Chuyên điều trị các bệnh về da, tóc và móng." },
];

export default function SpecialtyForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined && id !== "new";

  const existing = isEdit ? specialties.find((s) => s.id === id) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    code: existing?.id ?? "",
    status: existing?.status ?? "active",
    description: existing?.description ?? "",
    requireCertification: "true",
    averageSessionDuration: "30",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/manager/specialties");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(isEdit ? `/manager/specialties/${id}` : "/manager/specialties")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa chuyên khoa" : "Thêm chuyên khoa mới"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? `Cập nhật thông tin: ${existing?.name}` : "Điền thông tin chuyên khoa mới"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Thông tin chuyên khoa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên chuyên khoa *</Label>
                <Input
                  id="name"
                  placeholder="VD: Nội tim mạch"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Mã chuyên khoa *</Label>
                <Input
                  id="code"
                  placeholder="VD: SP007"
                  value={form.code}
                  onChange={(e) => set("code", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={form.status} onValueChange={(v) => set("status", v)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Ngưng hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Mô tả về chuyên khoa, phạm vi điều trị..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cấu hình chuyên khoa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avgDuration">Thời gian khám TB (phút)</Label>
                <Input
                  id="avgDuration"
                  type="number"
                  min="10"
                  max="120"
                  value={form.averageSessionDuration}
                  onChange={(e) => set("averageSessionDuration", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification">Yêu cầu chứng chỉ hành nghề</Label>
                <Select value={form.requireCertification} onValueChange={(v) => set("requireCertification", v)}>
                  <SelectTrigger id="certification">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Có</SelectItem>
                    <SelectItem value="false">Không</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nhóm chuyên khoa</Label>
                <Select defaultValue="noi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noi">Nội khoa</SelectItem>
                    <SelectItem value="ngoai">Ngoại khoa</SelectItem>
                    <SelectItem value="san">Sản phụ khoa</SelectItem>
                    <SelectItem value="nhi">Nhi khoa</SelectItem>
                    <SelectItem value="mat">Mắt</SelectItem>
                    <SelectItem value="rang">Răng hàm mặt</SelectItem>
                    <SelectItem value="tai">Tai mũi họng</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Phí khám ban đầu (VNĐ)</Label>
                <Input type="number" placeholder="VD: 200000" defaultValue="200000" />
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700 font-medium">Lưu ý</p>
                <p className="text-sm text-blue-600 mt-1">
                  Sau khi tạo chuyên khoa, bạn có thể phân bổ bác sĩ và thiết lập lịch khám trong trang chi tiết.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEdit ? `/manager/specialties/${id}` : "/manager/specialties")}
          >
            Hủy
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? "Lưu thay đổi" : "Tạo chuyên khoa"}
          </Button>
        </div>
      </form>
    </div>
  );
}
