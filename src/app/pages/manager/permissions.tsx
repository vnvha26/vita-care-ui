import { Shield, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const permissions = [
  { id: "view_patients", name: "Xem danh sách bệnh nhân", doctor: true, expert: false, manager: true },
  { id: "edit_patients", name: "Chỉnh sửa thông tin bệnh nhân", doctor: true, expert: false, manager: true },
  { id: "view_cases", name: "Xem ca đánh giá", doctor: true, expert: true, manager: true },
  { id: "review_cases", name: "Đánh giá ca bệnh", doctor: false, expert: true, manager: false },
  { id: "manage_users", name: "Quản lý người dùng", doctor: false, expert: false, manager: true },
  { id: "manage_clinics", name: "Quản lý phòng khám", doctor: false, expert: false, manager: true },
  { id: "view_reports", name: "Xem báo cáo", doctor: true, expert: true, manager: true },
  { id: "export_data", name: "Xuất dữ liệu", doctor: false, expert: true, manager: true },
  { id: "system_settings", name: "Cài đặt hệ thống", doctor: false, expert: false, manager: true },
];

export default function ManagerPermissions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Quản lý phân quyền</h1>
        <p className="text-gray-500 mt-1">Cấu hình quyền truy cập theo vai trò</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ma trận phân quyền</CardTitle>
          <CardDescription>Quản lý quyền truy cập cho từng vai trò</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-700">Quyền</th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Bác sĩ</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span>Chuyên gia</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span>Quản lý</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{perm.name}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.doctor && (
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.expert && (
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.manager && (
                          <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-purple-600" />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-6">
            <Button>Lưu thay đổi</Button>
            <Button variant="outline">Khôi phục mặc định</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Bác sĩ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quyền cơ bản:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Quản lý bệnh nhân
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Nhập liệu khám bệnh
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Chat với chuyên gia
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Chuyên gia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quyền cơ bản:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Đánh giá ca bệnh
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Phản hồi chuyên môn
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Xem báo cáo
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Quản lý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quyền quản trị:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Toàn quyền hệ thống
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Quản lý người dùng
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Cấu hình hệ thống
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
