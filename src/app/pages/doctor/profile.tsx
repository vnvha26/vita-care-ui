import { User, Mail, Phone, Building2, Calendar, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

export default function DoctorProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-500 mt-1">Quản lý thông tin tài khoản của bạn</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">NVA</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold text-gray-900">BS. Nguyễn Văn A</h3>
              <p className="text-sm text-gray-500">Bác sĩ</p>
              <Badge variant="active" className="mt-2">Đang hoạt động</Badge>
              
              <div className="mt-6 w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>nva@clinic.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>0901234567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>Phòng khám Đa khoa TW1</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Tham gia: 15/01/2024</span>
                </div>
              </div>

              <Button className="w-full mt-6">Cập nhật ảnh đại diện</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <Input defaultValue="Nguyễn Văn A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chức danh
                </label>
                <Input defaultValue="Bác sĩ" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input type="email" defaultValue="nva@clinic.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <Input defaultValue="0901234567" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phòng khám
              </label>
              <Input defaultValue="Phòng khám Đa khoa TW1" disabled />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chuyên môn
              </label>
              <Input defaultValue="Nội tổng hợp, Tiểu đường" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Lưu thay đổi</Button>
              <Button variant="outline">Hủy bỏ</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
          <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu hiện tại
            </label>
            <Input type="password" placeholder="Nhập mật khẩu hiện tại" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu mới
            </label>
            <Input type="password" placeholder="Nhập mật khẩu mới" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu mới
            </label>
            <Input type="password" placeholder="Nhập lại mật khẩu mới" />
          </div>
          <Button>
            <Lock className="h-4 w-4 mr-2" />
            Đổi mật khẩu
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>Quản lý cách bạn nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email thông báo</p>
              <p className="text-sm text-gray-500">Nhận email về lịch hẹn và phản hồi mới</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Thông báo khẩn cấp</p>
              <p className="text-sm text-gray-500">Nhận thông báo ngay lập tức về ca khẩn cấp</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Báo cáo tuần</p>
              <p className="text-sm text-gray-500">Nhận báo cáo tổng hợp hàng tuần</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
