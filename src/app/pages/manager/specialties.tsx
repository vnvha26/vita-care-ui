import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const specialties = [
  { id: "SP001", name: "Tim mạch", doctorCount: 8, patientCount: 234, status: "active" },
  { id: "SP002", name: "Nội tổng hợp", doctorCount: 12, patientCount: 456, status: "active" },
  { id: "SP003", name: "Tiểu đường", doctorCount: 6, patientCount: 189, status: "active" },
  { id: "SP004", name: "Hô hấp", doctorCount: 5, patientCount: 167, status: "active" },
  { id: "SP005", name: "Thần kinh", doctorCount: 4, patientCount: 98, status: "active" },
  { id: "SP006", name: "Da liễu", doctorCount: 3, patientCount: 76, status: "inactive" },
];

export default function ManagerSpecialties() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredSpecialties = specialties.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Quản lý chuyên khoa</h1>
          <p className="text-gray-500 mt-1">Quản lý các chuyên khoa trong hệ thống</p>
        </div>
        <Button onClick={() => navigate("/manager/specialties/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm chuyên khoa
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng chuyên khoa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{specialties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              {specialties.filter(s => s.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">
              {specialties.reduce((sum, s) => sum + s.doctorCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600">
              {specialties.reduce((sum, s) => sum + s.patientCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách chuyên khoa</CardTitle>
              <CardDescription>Quản lý và cấu hình chuyên khoa</CardDescription>
            </div>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm chuyên khoa..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã CK</TableHead>
                <TableHead>Tên chuyên khoa</TableHead>
                <TableHead>Số bác sĩ</TableHead>
                <TableHead>Số bệnh nhân</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialties.map((specialty) => (
                <TableRow key={specialty.id}>
                  <TableCell className="font-medium">{specialty.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{specialty.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{specialty.doctorCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{specialty.patientCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={specialty.status === "active" ? "active" : "inactive"}>
                      {specialty.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/manager/specialties/${specialty.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/manager/specialties/${specialty.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
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
