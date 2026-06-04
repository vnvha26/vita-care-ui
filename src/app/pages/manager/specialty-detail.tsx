import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Edit, Users, UserCheck, Stethoscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const specialties = [
  { id: "SP001", name: "Tim mạch", doctorCount: 8, patientCount: 234, status: "active", description: "Chuyên khoa về tim và hệ tuần hoàn máu. Điều trị các bệnh tim mạch, cao huyết áp, rối loạn nhịp tim." },
  { id: "SP002", name: "Nội tổng hợp", doctorCount: 12, patientCount: 456, status: "active", description: "Chuyên khoa nội khoa tổng quát, điều trị các bệnh lý nội khoa thông thường." },
  { id: "SP003", name: "Tiểu đường", doctorCount: 6, patientCount: 189, status: "active", description: "Chuyên điều trị bệnh tiểu đường và các rối loạn nội tiết liên quan." },
  { id: "SP004", name: "Hô hấp", doctorCount: 5, patientCount: 167, status: "active", description: "Chuyên khoa về bệnh lý đường hô hấp, phổi và phế quản." },
  { id: "SP005", name: "Thần kinh", doctorCount: 4, patientCount: 98, status: "active", description: "Chuyên điều trị các bệnh lý hệ thần kinh trung ương và ngoại biên." },
  { id: "SP006", name: "Da liễu", doctorCount: 3, patientCount: 76, status: "inactive", description: "Chuyên điều trị các bệnh về da, tóc và móng." },
];

const specialtyDoctors: Record<string, { id: string; name: string; clinic: string; patients: number; rating: number; status: string }[]> = {
  SP001: [
    { id: "D001", name: "BS. Nguyễn Văn A", clinic: "PK Đa khoa TW1", patients: 45, rating: 4.8, status: "active" },
    { id: "D006", name: "BS. Lê Văn F", clinic: "PK Tim mạch", patients: 38, rating: 4.7, status: "active" },
  ],
  SP002: [
    { id: "D002", name: "BS. Trần Văn B", clinic: "PK Đa khoa TW2", patients: 38, rating: 4.6, status: "active" },
  ],
  SP003: [
    { id: "D003", name: "BS. Lê Thị C", clinic: "PK Tiểu đường", patients: 52, rating: 4.9, status: "active" },
  ],
};

export default function SpecialtyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const specialty = specialties.find((s) => s.id === id);
  if (!specialty) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Stethoscope className="h-16 w-16 text-gray-300" />
        <p className="text-gray-500 text-lg">Không tìm thấy chuyên khoa</p>
        <Button variant="outline" onClick={() => navigate("/manager/specialties")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>
    );
  }

  const doctors = specialtyDoctors[id!] ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/manager/specialties")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-gray-900">{specialty.name}</h1>
              <Badge variant={specialty.status === "active" ? "active" : "inactive"}>
                {specialty.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">Mã chuyên khoa: {specialty.id}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/manager/specialties/${specialty.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">{specialty.doctorCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">{specialty.patientCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Phòng khám áp dụng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600">4</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Thông tin chung</TabsTrigger>
          <TabsTrigger value="doctors">Bác sĩ ({specialty.doctorCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chuyên khoa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tên chuyên khoa</p>
                  <p className="font-semibold text-gray-900 text-lg mt-1">{specialty.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mã chuyên khoa</p>
                  <p className="font-medium text-gray-900 mt-1">{specialty.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <Badge variant={specialty.status === "active" ? "active" : "inactive"} className="mt-1">
                    {specialty.status === "active" ? "Đang hoạt động" : "Ngưng hoạt động"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Mô tả</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{specialty.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng bác sĩ</p>
                    <p className="text-2xl font-semibold text-blue-600">{specialty.doctorCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng bệnh nhân</p>
                    <p className="text-2xl font-semibold text-green-600">{specialty.patientCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-50">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bệnh nhân / Bác sĩ</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {Math.round(specialty.patientCount / specialty.doctorCount)}
                    </p>
                  </div>
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
                  <CardTitle>Bác sĩ chuyên khoa {specialty.name}</CardTitle>
                  <CardDescription>Danh sách bác sĩ thuộc chuyên khoa này</CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate("/manager/doctors/new")}>
                  Thêm bác sĩ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {doctors.length === 0 ? (
                <div className="text-center py-12 text-gray-400">Chưa có bác sĩ nào trong chuyên khoa này</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã BS</TableHead>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Phòng khám</TableHead>
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
                        <TableCell>{d.clinic}</TableCell>
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
      </Tabs>
    </div>
  );
}
