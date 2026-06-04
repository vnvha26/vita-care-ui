import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, CheckCircle2, Clock } from "lucide-react";

const monthlyData = [
  { month: "T1", cases: 45 },
  { month: "T2", cases: 52 },
  { month: "T3", cases: 48 },
  { month: "T4", cases: 61 },
  { month: "T5", cases: 58 },
];

const responseTimeData = [
  { week: "Tuần 1", hours: 2.8 },
  { week: "Tuần 2", hours: 2.5 },
  { week: "Tuần 3", hours: 2.2 },
  { week: "Tuần 4", hours: 2.5 },
];

const specialtyData = [
  { name: "Tim mạch", value: 35, color: "#3b82f6" },
  { name: "Tiểu đường", value: 28, color: "#10b981" },
  { name: "Hô hấp", value: 22, color: "#f59e0b" },
  { name: "Khác", value: 15, color: "#6b7280" },
];

export default function ExpertReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Báo cáo thống kê</h1>
        <p className="text-gray-500 mt-1">Phân tích hiệu suất và hoạt động</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng ca đánh giá
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">264</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15% so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tỷ lệ hoàn thành
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">94%</div>
            <p className="text-xs text-gray-500 mt-2">
              Trong vòng 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Thời gian TB
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">2.5h</div>
            <p className="text-xs text-green-600 mt-2">
              Giảm 0.3h so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đánh giá TB
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">4.8/5</div>
            <p className="text-xs text-gray-500 mt-2">
              Từ bác sĩ
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Số lượng ca theo tháng</CardTitle>
            <CardDescription>5 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="cases" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thời gian phản hồi trung bình</CardTitle>
            <CardDescription>Theo tuần (giờ)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phân bố theo chuyên khoa</CardTitle>
          <CardDescription>Số lượng ca theo lĩnh vực</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specialtyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {specialtyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top bác sĩ tư vấn</CardTitle>
            <CardDescription>Bác sĩ gửi ca nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "BS. Nguyễn Văn A", cases: 28, clinic: "PK Đa khoa TW1" },
                { name: "BS. Trần Văn B", cases: 24, clinic: "PK Đa khoa TW2" },
                { name: "BS. Lê Thị C", cases: 19, clinic: "PK Tim mạch" },
                { name: "BS. Phạm Đức D", cases: 16, clinic: "PK Nội tổng hợp" },
              ].map((doctor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.clinic}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{doctor.cases}</p>
                    <p className="text-xs text-gray-500">ca</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo ngày</CardTitle>
            <CardDescription>Tuần này</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Thứ 2", completed: 8, pending: 2 },
                { day: "Thứ 3", completed: 12, pending: 1 },
                { day: "Thứ 4", completed: 6, pending: 0 },
                { day: "Thứ 5", completed: 15, pending: 3 },
                { day: "Thứ 6", completed: 10, pending: 2 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{item.day}</p>
                  <div className="flex gap-4">
                    <div className="text-sm">
                      <span className="text-green-600 font-medium">{item.completed}</span>
                      <span className="text-gray-500"> hoàn thành</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-orange-600 font-medium">{item.pending}</span>
                      <span className="text-gray-500"> chờ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
