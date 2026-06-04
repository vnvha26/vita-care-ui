import { useState } from "react";
import { Search, Filter, Activity, UserPlus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const activityLogs = [
  { id: "L001", icon: UserPlus, color: "text-blue-600 bg-blue-100", user: "Admin", action: "Thêm người dùng mới", details: "BS. Phạm Văn E - Bác sĩ", time: "2026-05-07 14:30", type: "create" },
  { id: "L002", icon: Edit, color: "text-green-600 bg-green-100", user: "Quản lý", action: "Cập nhật phòng khám", details: "PK Đa khoa TW1 - Thay đổi địa chỉ", time: "2026-05-07 13:15", type: "update" },
  { id: "L003", icon: Activity, color: "text-purple-600 bg-purple-100", user: "System", action: "Backup dữ liệu", details: "Backup tự động hàng ngày", time: "2026-05-07 02:00", type: "system" },
  { id: "L004", icon: Trash2, color: "text-red-600 bg-red-100", user: "Admin", action: "Xóa tài khoản", details: "BS. Trần Văn X - Nghỉ việc", time: "2026-05-06 16:45", type: "delete" },
  { id: "L005", icon: Edit, color: "text-green-600 bg-green-100", user: "Quản lý", action: "Cập nhật phân quyền", details: "Thay đổi quyền cho vai trò Bác sĩ", time: "2026-05-06 11:20", type: "update" },
  { id: "L006", icon: UserPlus, color: "text-blue-600 bg-blue-100", user: "Admin", action: "Thêm phòng khám", details: "Phòng khám Nhi khoa Trung ương", time: "2026-05-05 09:30", type: "create" },
];

export default function ManagerLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLogs = activityLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Nhật ký hệ thống</h1>
        <p className="text-gray-500 mt-1">Theo dõi các hoạt động trong hệ thống</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{activityLogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tạo mới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">
              {activityLogs.filter(l => l.type === "create").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cập nhật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              {activityLogs.filter(l => l.type === "update").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Xóa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-red-600">
              {activityLogs.filter(l => l.type === "delete").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch sử hoạt động</CardTitle>
              <CardDescription>Danh sách các hành động gần đây</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm hoạt động..."
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
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${log.color}`}>
                  <log.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <Badge variant={
                      log.type === "create" ? "default" : 
                      log.type === "update" ? "success" : 
                      log.type === "delete" ? "danger" : "secondary"
                    }>
                      {log.type === "create" ? "Tạo mới" : 
                       log.type === "update" ? "Cập nhật" : 
                       log.type === "delete" ? "Xóa" : "Hệ thống"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{log.details}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>Bởi: {log.user}</span>
                    <span>•</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
