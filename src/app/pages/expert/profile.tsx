import { Mail, Phone, Award, Calendar, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

export default function ExpertProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-500 mt-1">Quản lý thông tin tài khoản</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">NTL</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold text-gray-900">TS. Nguyễn Thị Lan</h3>
              <p className="text-sm text-gray-500">Chuyên gia</p>
              <Badge variant="active" className="mt-2">Đang hoạt động</Badge>
              
              <div className="mt-6 w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>ntl@clinic.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>0912345678</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>Tiến sĩ Y khoa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Tham gia: 10/11/2023</span>
                </div>
              </div>

              <Button className="w-full mt-6">Cập nhật ảnh đại diện</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật thông tin chuyên gia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <Input defaultValue="Nguyễn Thị Lan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Học vị
                </label>
                <Input defaultValue="Tiến sĩ" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input type="email" defaultValue="ntl@clinic.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <Input defaultValue="0912345678" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chuyên khoa
              </label>
              <Input defaultValue="Tim mạch, Nội khoa" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kinh nghiệm
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                defaultValue="15 năm kinh nghiệm trong lĩnh vực Tim mạch và Nội khoa. Từng công tác tại Bệnh viện Trung ương và nhiều cơ sở y tế lớn."
              />
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
          <CardTitle>Thống kê cá nhân</CardTitle>
          <CardDescription>Tổng quan hoạt động của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-semibold text-blue-600">264</p>
              <p className="text-sm text-gray-500 mt-1">Tổng ca đánh giá</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-green-600">248</p>
              <p className="text-sm text-gray-500 mt-1">Đã hoàn thành</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-orange-600">2.5h</p>
              <p className="text-sm text-gray-500 mt-1">Thời gian TB</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-purple-600">4.8/5</p>
              <p className="text-sm text-gray-500 mt-1">Đánh giá</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
