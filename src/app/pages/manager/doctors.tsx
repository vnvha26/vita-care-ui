import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Plus, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const doctors = [
  { id: "D001", name: "BS. Nguyễn Văn A", specialty: "Tim mạch", patients: 45, rating: 4.8, status: "active" },
  { id: "D002", name: "BS. Trần Văn B", specialty: "Nội tổng hợp", patients: 38, rating: 4.6, status: "active" },
  { id: "D003", name: "BS. Lê Thị C", specialty: "Tiểu đường", patients: 52, rating: 4.9, status: "active" },
  { id: "D004", name: "BS. Phạm Đức D", specialty: "Hô hấp", patients: 29, rating: 4.5, status: "active" },
  { id: "D005", name: "BS. Hoàng Thị E", specialty: "Thần kinh", patients: 31, rating: 4.7, status: "inactive" },
];

export default function ManagerDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Quản lý thông tin bác sĩ</h1>
          <p className="text-gray-500 mt-1">Quản lý hồ sơ và thông tin bác sĩ</p>
        </div>
        <Button onClick={() => navigate("/manager/doctors/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm bác sĩ
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{doctors.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              {doctors.filter(d => d.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">
              {doctors.reduce((sum, d) => sum + d.patients, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đánh giá TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600">
              {(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách bác sĩ</CardTitle>
              <CardDescription>Thông tin chi tiết về đội ngũ bác sĩ</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm theo tên hoặc chuyên khoa..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                  </TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>
                    <Badge variant="default">{doctor.patients}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={doctor.status === "active" ? "active" : "inactive"}>
                      {doctor.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/manager/doctors/${doctor.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/manager/doctors/${doctor.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
