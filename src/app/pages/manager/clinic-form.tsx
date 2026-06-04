import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Save, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { mockClinics } from "../../lib/mock-data";

export default function ClinicForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined && id !== "new";

  const existing = isEdit ? mockClinics.find((c) => c.id === id) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    address: existing?.address ?? "",
    phone: existing?.phone ?? "",
    email: existing ? `contact@${existing.id.toLowerCase()}.vn` : "",
    openTime: "07:00",
    closeTime: "20:00",
    type: "Phòng khám đa khoa",
    status: existing?.status ?? "active",
    description: "Phòng khám được trang bị đầy đủ thiết bị y tế hiện đại.",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/manager/clinics");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(isEdit ? `/manager/clinics/${id}` : "/manager/clinics")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa phòng khám" : "Thêm phòng khám mới"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? `Cập nhật thông tin: ${existing?.name}` : "Điền thông tin phòng khám mới"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên phòng khám *</Label>
                <Input
                  id="name"
                  placeholder="VD: Phòng khám Đa khoa Trung ương"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại cơ sở</Label>
                <Select value={form.type} onValueChange={(v) => set("type", v)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phòng khám đa khoa">Phòng khám đa khoa</SelectItem>
                    <SelectItem value="Phòng khám chuyên khoa">Phòng khám chuyên khoa</SelectItem>
                    <SelectItem value="Bệnh viện">Bệnh viện</SelectItem>
                    <SelectItem value="Trung tâm y tế">Trung tâm y tế</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="openTime">Giờ mở cửa</Label>
                  <Input
                    id="openTime"
                    type="time"
                    value={form.openTime}
                    onChange={(e) => set("openTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closeTime">Giờ đóng cửa</Label>
                  <Input
                    id="closeTime"
                    type="time"
                    value={form.closeTime}
                    onChange={(e) => set("closeTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  rows={3}
                  placeholder="Mô tả về phòng khám..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ *</Label>
                <Textarea
                  id="address"
                  rows={2}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  placeholder="VD: 028 3123 4567"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="VD: contact@phongkham.vn"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input placeholder="VD: https://phongkham.vn" />
              </div>

              <div className="space-y-2">
                <Label>Số giấy phép hoạt động</Label>
                <Input placeholder="VD: GP-2018-001" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEdit ? `/manager/clinics/${id}` : "/manager/clinics")}
          >
            Hủy
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? "Lưu thay đổi" : "Tạo phòng khám"}
          </Button>
        </div>
      </form>
    </div>
  );
}
