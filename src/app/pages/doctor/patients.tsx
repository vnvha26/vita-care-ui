import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { mockPatients } from "../../lib/mock-data";

export default function DoctorPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Danh sách bệnh nhân</h1>
          <p className="text-gray-500 mt-1">Quản lý thông tin bệnh nhân</p>
        </div>
        <Button>+ Thêm bệnh nhân mới</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tất cả bệnh nhân</CardTitle>
              <CardDescription>Tổng số {mockPatients.length} bệnh nhân</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm theo tên hoặc mã bệnh nhân..."
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
                <TableHead>Mã BN</TableHead>
                <TableHead>Họ và tên</TableHead>
                <TableHead>Tuổi</TableHead>
                <TableHead>Giới tính</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Lần khám cuối</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      {patient.diagnosis && (
                        <p className="text-xs text-gray-500">{patient.diagnosis}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        patient.status === "active" ? "active" : 
                        patient.status === "pending" ? "pending" : 
                        "inactive"
                      }
                    >
                      {patient.status === "active" ? "Đang điều trị" : 
                       patient.status === "pending" ? "Chờ khám" : 
                       "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/doctor/patients/${patient.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Chi tiết
                      </Button>
                    </Link>
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
