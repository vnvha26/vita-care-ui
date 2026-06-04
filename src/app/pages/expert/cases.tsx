import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { mockCases } from "../../lib/mock-data";

export default function ExpertCases() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCases = mockCases.filter(case_ =>
    case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Danh sách ca đánh giá</h1>
          <p className="text-gray-500 mt-1">Quản lý và đánh giá các ca bệnh</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tất cả ca đánh giá</CardTitle>
              <CardDescription>Tổng số {mockCases.length} ca</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm theo tên bệnh nhân hoặc mã ca..."
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
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Chẩn đoán</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id}>
                  <TableCell className="font-medium">{case_.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900">{case_.patientName}</p>
                  </TableCell>
                  <TableCell>{case_.doctorName}</TableCell>
                  <TableCell>{case_.submittedDate}</TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-700 max-w-xs truncate">{case_.diagnosis}</p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        case_.priority === "high" ? "danger" : 
                        case_.priority === "medium" ? "warning" : 
                        "secondary"
                      }
                    >
                      {case_.priority === "high" ? "Cao" : 
                       case_.priority === "medium" ? "Trung bình" : 
                       "Thấp"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        case_.status === "pending" ? "pending" : 
                        case_.status === "in_review" ? "warning" : 
                        "completed"
                      }
                    >
                      {case_.status === "pending" ? "Chờ xử lý" : 
                       case_.status === "in_review" ? "Đang đánh giá" : 
                       "Hoàn thành"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/expert/cases/${case_.id}`}>
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
