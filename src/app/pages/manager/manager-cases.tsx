import { useState } from "react";
import { Search, Filter, Eye, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const cases = [
  { id: "C001", patient: "Nguyễn Văn An", doctor: "BS. Nguyễn Văn A", expert: "TS. Nguyễn Thị Lan", date: "2026-05-05", specialty: "Tim mạch", status: "completed" },
  { id: "C002", patient: "Trần Thị Bình", doctor: "BS. Trần Văn B", expert: "PGS. TS. Trần Văn Nam", date: "2026-05-06", specialty: "Nội tổng hợp", status: "in_review" },
  { id: "C003", patient: "Lê Minh Châu", doctor: "BS. Lê Thị C", expert: "TS. Nguyễn Thị Lan", date: "2026-05-07", specialty: "Tiểu đường", status: "completed" },
  { id: "C004", patient: "Phạm Đức Duy", doctor: "BS. Nguyễn Văn A", expert: null, date: "2026-05-07", specialty: "Hô hấp", status: "pending" },
];

export default function ManagerCases() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = cases.filter(c =>
    c.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Quản lý ca bệnh</h1>
          <p className="text-gray-500 mt-1">Theo dõi và quản lý lịch sử ca bệnh</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất dữ liệu
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng ca bệnh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              {cases.filter(c => c.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đang xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">
              {cases.filter(c => c.status === "in_review").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Chờ xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-orange-600">
              {cases.filter(c => c.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch sử ca bệnh</CardTitle>
              <CardDescription>Quản lý và tra cứu ca bệnh đã xử lý</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm theo mã ca hoặc bệnh nhân..."
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
                <TableHead>Mã ca</TableHead>
                <TableHead>Bệnh nhân</TableHead>
                <TableHead>Bác sĩ</TableHead>
                <TableHead>Chuyên gia</TableHead>
                <TableHead>Ngày khám</TableHead>
                <TableHead>Chuyên khoa</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.id}</TableCell>
                  <TableCell>{case_.patient}</TableCell>
                  <TableCell>{case_.doctor}</TableCell>
                  <TableCell>{case_.expert || "-"}</TableCell>
                  <TableCell>{case_.date}</TableCell>
                  <TableCell>{case_.specialty}</TableCell>
                  <TableCell>
                    <Badge variant={
                      case_.status === "completed" ? "completed" :
                      case_.status === "in_review" ? "warning" : "pending"
                    }>
                      {case_.status === "completed" ? "Hoàn thành" :
                       case_.status === "in_review" ? "Đang xử lý" : "Chờ xử lý"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
