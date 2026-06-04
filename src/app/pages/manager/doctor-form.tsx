import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Save, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const doctors = [
  { id: "D001", name: "BS. Nguyễn Văn A", specialty: "Tim mạch", clinic: "PK Đa khoa TW1", phone: "0901 234 567", email: "nguyenvana@pkdktw1.vn", experience: "12", degree: "Thạc sĩ Y khoa", status: "active", bio: "Bác sĩ chuyên khoa tim mạch với hơn 12 năm kinh nghiệm." },
  { id: "D002", name: "BS. Trần Văn B", specialty: "Nội tổng hợp", clinic: "PK Đa khoa TW2", phone: "0902 345 678", email: "tranvanb@pkdktw2.vn", experience: "8", degree: "Bác sĩ Y khoa", status: "active", bio: "Chuyên gia nội khoa." },
  { id: "D003", name: "BS. Lê Thị C", specialty: "Tiểu đường", clinic: "PK Tim mạch", phone: "0903 456 789", email: "lethic@pktm.vn", experience: "15", degree: "Tiến sĩ Y khoa", status: "active", bio: "Chuyên gia hàng đầu về điều trị tiểu đường." },
  { id: "D004", name: "BS. Phạm Đức D", specialty: "Hô hấp", clinic: "PK Nội TH", phone: "0904 567 890", email: "phamducd@pknth.vn", experience: "7", degree: "Bác sĩ Y khoa", status: "active", bio: "Bác sĩ chuyên điều trị bệnh lý hô hấp." },
  { id: "D005", name: "BS. Hoàng Thị E", specialty: "Thần kinh", clinic: "PK Đa khoa TW1", phone: "0905 678 901", email: "hoangthie@pkdktw1.vn", experience: "10", degree: "Thạc sĩ Y khoa", status: "inactive", bio: "Chuyên gia thần kinh." },
];

export default function DoctorForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined && id !== "new";

  const existing = isEdit ? doctors.find((d) => d.id === id) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    specialty: existing?.specialty ?? "",
    clinic: existing?.clinic ?? "",
    phone: existing?.phone ?? "",
    email: existing?.email ?? "",
    experience: existing?.experience ?? "",
    degree: existing?.degree ?? "Bác sĩ Y khoa",
    status: existing?.status ?? "active",
    bio: existing?.bio ?? "",
    licenseNumber: existing ? `BS-2015-${existing.id}` : "",
    licenseExpiry: "31/12/2027",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/manager/doctors");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(isEdit ? `/manager/doctors/${id}` : "/manager/doctors")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? `Cập nhật hồ sơ: ${existing?.name}` : "Điền thông tin bác sĩ mới vào hệ thống"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-blue-600" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  placeholder="VD: BS. Nguyễn Thị X"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">Bằng cấp *</Label>
                <Select value={form.degree} onValueChange={(v) => set("degree", v)}>
                  <SelectTrigger id="degree">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bác sĩ Y khoa">Bác sĩ Y khoa</SelectItem>
                    <SelectItem value="Thạc sĩ Y khoa">Thạc sĩ Y khoa</SelectItem>
                    <SelectItem value="Tiến sĩ Y khoa">Tiến sĩ Y khoa</SelectItem>
                    <SelectItem value="Phó Giáo sư">Phó Giáo sư</SelectItem>
                    <SelectItem value="Giáo sư">Giáo sư</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  placeholder="VD: 0901 234 567"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="VD: bacsi@phongkham.vn"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="60"
                  placeholder="VD: 10"
                  value={form.experience}
                  onChange={(e) => set("experience", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu bản thân</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  placeholder="Mô tả ngắn về kinh nghiệm và chuyên môn..."
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân công công tác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Chuyên khoa *</Label>
                  <Select value={form.specialty} onValueChange={(v) => set("specialty", v)}>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Chọn chuyên khoa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tim mạch">Tim mạch</SelectItem>
                      <SelectItem value="Nội tổng hợp">Nội tổng hợp</SelectItem>
                      <SelectItem value="Tiểu đường">Tiểu đường</SelectItem>
                      <SelectItem value="Hô hấp">Hô hấp</SelectItem>
                      <SelectItem value="Thần kinh">Thần kinh</SelectItem>
                      <SelectItem value="Da liễu">Da liễu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic">Phòng khám *</Label>
                  <Select value={form.clinic} onValueChange={(v) => set("clinic", v)}>
                    <SelectTrigger id="clinic">
                      <SelectValue placeholder="Chọn phòng khám" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PK Đa khoa TW1">PK Đa khoa TW1</SelectItem>
                      <SelectItem value="PK Đa khoa TW2">PK Đa khoa TW2</SelectItem>
                      <SelectItem value="PK Tim mạch">PK Tim mạch</SelectItem>
                      <SelectItem value="PK Nội TH">PK Nội TH</SelectItem>
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
                      <SelectItem value="active">Đang làm việc</SelectItem>
                      <SelectItem value="inactive">Ngưng làm việc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chứng chỉ hành nghề</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Số chứng chỉ</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="VD: BS-2020-001"
                    value={form.licenseNumber}
                    onChange={(e) => set("licenseNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">Ngày hết hạn</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value="2027-12-31"
                    onChange={(e) => set("licenseExpiry", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEdit ? `/manager/doctors/${id}` : "/manager/doctors")}
          >
            Hủy
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? "Lưu thay đổi" : "Thêm bác sĩ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
