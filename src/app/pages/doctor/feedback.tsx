import { Filter, MessageCircle, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { mockFeedbacks } from "../../lib/mock-data";

export default function DoctorFeedback() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Xem phản hồi</h1>
          <p className="text-gray-500 mt-1">Phản hồi từ chuyên gia về các ca bệnh</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Lọc
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{mockFeedbacks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Chờ xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-orange-600">
              {mockFeedbacks.filter(f => f.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Khẩn cấp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-red-600">
              {mockFeedbacks.filter(f => f.status === "urgent").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phản hồi</CardTitle>
          <CardDescription>Theo dõi và xử lý phản hồi từ chuyên gia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  feedback.status === "urgent" ? "bg-red-100" : 
                  feedback.status === "pending" ? "bg-orange-100" : "bg-green-100"
                }`}>
                  <MessageCircle className={`h-6 w-6 ${
                    feedback.status === "urgent" ? "text-red-700" : 
                    feedback.status === "pending" ? "text-orange-700" : "text-green-700"
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">{feedback.expertName}</p>
                    <Badge variant={
                      feedback.status === "urgent" ? "urgent" : 
                      feedback.status === "pending" ? "pending" : "completed"
                    }>
                      {feedback.status === "urgent" ? "Khẩn cấp" : 
                       feedback.status === "pending" ? "Chờ xử lý" : "Đã xử lý"}
                    </Badge>
                    <Badge variant={
                      feedback.priority === "high" ? "danger" : 
                      feedback.priority === "medium" ? "warning" : "secondary"
                    }>
                      {feedback.priority === "high" ? "Cao" : 
                       feedback.priority === "medium" ? "Trung bình" : "Thấp"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Bệnh nhân: <span className="font-medium text-gray-700">{feedback.patientName}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{feedback.content}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{feedback.date}</p>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Chi tiết
                    </Button>
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
