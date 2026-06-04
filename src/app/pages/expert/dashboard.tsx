import { ClipboardList, CheckCircle2, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { mockCases } from "../../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const weeklyData = [
  { name: "T2", cases: 8 },
  { name: "T3", cases: 12 },
  { name: "T4", cases: 6 },
  { name: "T5", cases: 15 },
  { name: "T6", cases: 10 },
  { name: "T7", cases: 7 },
  { name: "CN", cases: 3 },
];

const priorityData = [
  { name: "Cao", value: 5, color: "#ef4444" },
  { name: "Trung bình", value: 8, color: "#f59e0b" },
  { name: "Thấp", value: 4, color: "#10b981" },
];

export default function ExpertDashboard() {
  const pendingCases = mockCases.filter(c => c.status === "pending").length;
  const inReviewCases = mockCases.filter(c => c.status === "in_review").length;
  const completedCases = mockCases.filter(c => c.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-white via-emerald-50 to-teal-50 p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            <ClipboardList className="h-3.5 w-3.5" />
            Trung tâm tư vấn chuyên gia
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard Chuyên gia</h1>
          <p className="max-w-3xl text-gray-600">Theo dõi ca đánh giá, hàng chờ tư vấn và nhịp trao đổi với bác sĩ/người dùng trong một giao diện tổng quan.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ca chờ đánh giá
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{pendingCases}</div>
            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Cần xử lý trong hôm nay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đang đánh giá
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{inReviewCases}</div>
            <p className="text-xs text-gray-500 mt-2">
              Đang trong quá trình xử lý
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đã hoàn thành
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{completedCases}</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +20% so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Thời gian TB
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">2.5h</div>
            <p className="text-xs text-gray-500 mt-2">
              Mỗi ca đánh giá
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-emerald-100 bg-emerald-50/50">
          <CardHeader>
            <CardTitle>Người dùng chờ tư vấn</CardTitle>
            <CardDescription>Người cần khám bệnh và người cần tư vấn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">Nguyễn Văn An</p>
                <p className="text-sm text-gray-500">Giải thích kết quả xét nghiệm</p>
              </div>
              <Badge variant="danger">Cao</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">Lê Minh Châu</p>
                <p className="text-sm text-gray-500">Cần xác nhận bước tái khám</p>
              </div>
              <Badge variant="warning">Đang chờ</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardHeader>
            <CardTitle>Trao đổi với bác sĩ</CardTitle>
            <CardDescription>Ca cần phản hồi chuyên môn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">BS. Nguyễn Văn A</p>
                <p className="text-sm text-gray-500">Đề nghị rà soát liều insulin</p>
              </div>
              <Badge variant="active">Online</Badge>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">BS. Trần Văn B</p>
                <p className="text-sm text-gray-500">Nhờ xem lại hướng xử lý</p>
              </div>
              <Badge variant="secondary">Hôm qua</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 bg-white">
          <CardHeader>
            <CardTitle>Hành động nhanh</CardTitle>
            <CardDescription>Nhảy vào tác vụ chính trong một lần bấm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">Mở chat tư vấn</Button>
            <Button variant="outline" className="w-full justify-start">Xem hàng chờ yêu cầu</Button>
            <Button variant="outline" className="w-full justify-start">Chốt ca đã hoàn tất</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ca cần đánh giá khẩn cấp</CardTitle>
            <CardDescription>Ưu tiên cao, cần xử lý ngay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCases.filter(c => c.priority === "high").map((case_) => (
                <div key={case_.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-5 w-5 text-red-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{case_.patientName}</p>
                      <p className="text-sm text-gray-500">{case_.diagnosis}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      case_.status === "pending" ? "pending" : 
                      case_.status === "in_review" ? "warning" : "completed"
                    }>
                      {case_.status === "pending" ? "Chờ xử lý" : 
                       case_.status === "in_review" ? "Đang đánh giá" : "Hoàn thành"}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">{case_.submittedDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Xem tất cả ca khẩn cấp
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bố mức độ ưu tiên</CardTitle>
            <CardDescription>Số lượng ca theo mức độ</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thống kê tuần này</CardTitle>
          <CardDescription>Số lượng ca đánh giá theo ngày</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="cases" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
