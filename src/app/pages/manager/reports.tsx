import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, Users, Activity } from "lucide-react";

const monthlyGrowth = [
  { month: "T1", users: 45, patients: 280, cases: 320 },
  { month: "T2", users: 52, patients: 315, cases: 385 },
  { month: "T3", users: 58, patients: 350, cases: 420 },
  { month: "T4", users: 61, patients: 405, cases: 480 },
  { month: "T5", users: 68, patients: 450, cases: 520 },
];

const clinicActivity = [
  { clinic: "PK TW1", cases: 156 },
  { clinic: "PK TW2", cases: 124 },
  { clinic: "PK Tim mạch", cases: 98 },
  { clinic: "PK Nội TH", cases: 52 },
];

export default function ManagerReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Báo cáo tổng hợp</h1>
          <p className="text-gray-500 mt-1">Phân tích và thống kê toàn hệ thống</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tăng trưởng người dùng</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">+23</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              So với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng ca khám</CardTitle>
            <Activity className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">1,625</div>
            <p className="text-xs text-gray-500 mt-2">5 tháng qua</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">96%</div>
            <p className="text-xs text-green-600 mt-2">+2% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tăng trưởng theo tháng</CardTitle>
          <CardDescription>Người dùng, bệnh nhân và ca khám</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyGrowth}>
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
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Người dùng" />
              <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} name="Bệnh nhân" />
              <Line type="monotone" dataKey="cases" stroke="#8b5cf6" strokeWidth={2} name="Ca khám" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hoạt động theo phòng khám</CardTitle>
          <CardDescription>Số ca khám theo từng phòng khám</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clinicActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="clinic" stroke="#9ca3af" />
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
    </div>
  );
}
