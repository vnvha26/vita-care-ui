import { Calendar, Users, Clock, MessageCircle, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { mockAppointments, mockPatients, mockFeedbacks } from "../../lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const statsData = [
  { name: "T2", patients: 12 },
  { name: "T3", patients: 15 },
  { name: "T4", patients: 8 },
  { name: "T5", patients: 18 },
  { name: "T6", patients: 14 },
  { name: "T7", patients: 10 },
  { name: "CN", patients: 5 },
];

export default function DoctorDashboard() {
  const activePatients = mockPatients.filter(p => p.status === "active").length;
  const todayAppointments = mockAppointments.filter(a => a.status === "pending").length;
  const pendingFeedbacks = mockFeedbacks.filter(f => f.status === "pending" || f.status === "urgent").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Tổng quan hoạt động hôm nay</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Bệnh nhân đang điều trị
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{activePatients}</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Lịch hẹn hôm nay
            </CardTitle>
            <Calendar className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{todayAppointments}</div>
            <p className="text-xs text-gray-500 mt-2">
              2 lịch đã hoàn thành
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Phản hồi chờ xử lý
            </CardTitle>
            <MessageCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{pendingFeedbacks}</div>
            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              1 phản hồi khẩn cấp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Thời gian trung bình
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">25 phút</div>
            <p className="text-xs text-gray-500 mt-2">
              Mỗi ca khám bệnh
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lịch hẹn hôm nay</CardTitle>
            <CardDescription>Danh sách ca khám trong ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.slice(0, 4).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.time}</p>
                    <Badge variant={appointment.status === "completed" ? "success" : "pending"}>
                      {appointment.status === "completed" ? "Đã khám" : "Chờ khám"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Xem tất cả lịch hẹn
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê tuần này</CardTitle>
            <CardDescription>Số lượng bệnh nhân theo ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statsData}>
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
                <Bar dataKey="patients" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phản hồi gần đây</CardTitle>
          <CardDescription>Phản hồi từ chuyên gia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedbacks.map((feedback) => (
              <div key={feedback.id} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{feedback.expertName}</p>
                    <Badge variant={feedback.status === "urgent" ? "urgent" : feedback.status === "completed" ? "completed" : "pending"}>
                      {feedback.status === "urgent" ? "Khẩn cấp" : feedback.status === "completed" ? "Đã xử lý" : "Chờ xử lý"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Bệnh nhân: {feedback.patientName}</p>
                  <p className="text-sm text-gray-700 mt-2">{feedback.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{feedback.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
