import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Edit, MapPin, Phone, Mail, Clock, Users, UserCheck, Building2, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { mockClinics } from "../../lib/mock-data";

const clinicDoctors: Record<string, { id: string; name: string; specialty: string; patients: number; rating: number; status: string }[]> = {
  "clinic-1": [
    { id: "D001", name: "BS. Nguyễn Văn A", specialty: "Tim mạch", patients: 45, rating: 4.8, status: "active" },
    { id: "D005", name: "BS. Hoàng Thị E", specialty: "Thần kinh", patients: 31, rating: 4.7, status: "inactive" },
  ],
  "clinic-2": [
    { id: "D002", name: "BS. Trần Văn B", specialty: "Nội tổng hợp", patients: 38, rating: 4.6, status: "active" },
  ],
  "clinic-3": [
    { id: "D003", name: "BS. Lê Thị C", specialty: "Tiểu đường", patients: 52, rating: 4.9, status: "active" },
  ],
  "clinic-4": [
    { id: "D004", name: "BS. Phạm Đức D", specialty: "Hô hấp", patients: 29, rating: 4.5, status: "active" },
  ],
};

export default function ClinicDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const clinic = mockClinics.find((c) => c.id === id);
  if (!clinic) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Building2 className="h-16 w-16 text-gray-300" />
        <p className="text-gray-500 text-lg">Không tìm thấy phòng khám</p>
        <Button variant="outline" onClick={() => navigate("/manager/clinics")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>
    );
  }

  const doctors = clinicDoctors[id!] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/manager/clinics")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-gray-900">{clinic.name}</h1>
              <Badge variant={clinic.status === "active" ? "active" : "inactive"}>
                {clinic.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">Mã phòng khám: {clinic.id}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/manager/clinics/${clinic.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">{clinic.doctorCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">{clinic.patientCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Chuyên khoa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đánh giá TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <div className="text-3xl font-semibold text-yellow-600">4.7</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Thông tin chung</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ ({doctors.length})</TabsTrigger>
          <TabsTrigger value="specialties">Chuyên khoa</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="font-medium text-gray-900">{clinic.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Điện thoại</p>
                    <p className="font-medium text-gray-900">{clinic.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">contact@{clinic.id.toLowerCase()}.vn</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Giờ hoạt động</p>
                    <p className="font-medium text-gray-900">07:00 – 20:00 (Thứ 2 – Chủ Nhật)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thông tin hoạt động</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserCheck className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <Badge variant={clinic.status === "active" ? "active" : "inactive"} className="mt-1">
                      {clinic.status === "active" ? "Đang hoạt động" : "Ngưng hoạt động"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Loại cơ sở</p>
                    <p className="font-medium text-gray-900">Phòng khám đa khoa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Năm thành lập</p>
                    <p className="font-medium text-gray-900">2018</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mô tả</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Phòng khám được trang bị đầy đủ thiết bị y tế hiện đại, đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm, cam kết mang lại dịch vụ y tế chất lượng cao.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Danh sách bác sĩ</CardTitle>
                  <CardDescription>Bác sĩ đang công tác tại {clinic.name}</CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate("/manager/doctors/new")}>
                  Thêm bác sĩ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {doctors.length === 0 ? (
                <div className="text-center py-12 text-gray-400">Chưa có bác sĩ nào</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã BS</TableHead>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Chuyên khoa</TableHead>
                      <TableHead>Bệnh nhân</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.id}</TableCell>
                        <TableCell className="font-medium text-gray-900">{d.name}</TableCell>
                        <TableCell>{d.specialty}</TableCell>
                        <TableCell>{d.patients}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{d.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={d.status === "active" ? "active" : "inactive"}>
                            {d.status === "active" ? "Hoạt động" : "Ngưng"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/manager/doctors/${d.id}`)}>
                            Xem
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chuyên khoa hiện có</CardTitle>
              <CardDescription>Các chuyên khoa đang triển khai tại {clinic.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {["Tim mạch", "Nội tổng hợp", "Tiểu đường", "Hô hấp", "Thần kinh"].map((sp) => (
                  <div key={sp} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{sp}</span>
                    </div>
                    <Badge variant="active">Hoạt động</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
