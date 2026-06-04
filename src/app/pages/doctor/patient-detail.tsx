import { useParams } from "react-router";
import { Calendar, FileText, Upload, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockPatients, mockAppointments, mockFeedbacks } from "../../lib/mock-data";

export default function PatientDetail() {
  const { id } = useParams();
  const patient = mockPatients.find(p => p.id === id);
  
  if (!patient) {
    return <div>Không tìm thấy bệnh nhân</div>;
  }

  const patientAppointments = mockAppointments.filter(a => a.patientId === id);
  const patientFeedbacks = mockFeedbacks.filter(f => f.patientName === patient.name);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/doctor/patients">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900">{patient.name}</h1>
          <p className="text-gray-500 mt-1">Mã bệnh nhân: {patient.id}</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Đặt lịch hẹn
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Tuổi</p>
              <p className="font-medium text-gray-900">{patient.age} tuổi</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Giới tính</p>
              <p className="font-medium text-gray-900">{patient.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="font-medium text-gray-900">{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lần khám cuối</p>
              <p className="font-medium text-gray-900">{patient.lastVisit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trạng thái</p>
              <Badge variant={patient.status === "active" ? "active" : "inactive"}>
                {patient.status === "active" ? "Đang điều trị" : "Không hoạt động"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chẩn đoán hiện tại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="font-medium text-blue-900">{patient.diagnosis || "Chưa có chẩn đoán"}</p>
              <p className="text-sm text-blue-700 mt-2">
                Cập nhật lần cuối: {patient.lastVisit}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-semibold text-gray-900">{patientAppointments.length}</p>
                <p className="text-sm text-gray-500 mt-1">Lịch hẹn</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-semibold text-gray-900">8</p>
                <p className="text-sm text-gray-500 mt-1">Lần khám</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-50">
                <p className="text-2xl font-semibold text-gray-900">{patientFeedbacks.length}</p>
                <p className="text-sm text-gray-500 mt-1">Phản hồi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Lịch sử khám</TabsTrigger>
              <TabsTrigger value="data">Dữ liệu nhập liệu</TabsTrigger>
              <TabsTrigger value="files">File đính kèm</TabsTrigger>
              <TabsTrigger value="feedback">Phản hồi chuyên gia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="space-y-4 mt-6">
              {patientAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.type}</p>
                      <p className="text-sm text-gray-500">{appointment.date} - {appointment.time}</p>
                    </div>
                  </div>
                  <Badge variant={appointment.status === "completed" ? "completed" : "pending"}>
                    {appointment.status === "completed" ? "Đã khám" : "Chờ khám"}
                  </Badge>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="data" className="mt-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900">Đường huyết lúc đói</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">145 mg/dL</p>
                  <p className="text-sm text-gray-500 mt-1">Ngày {patient.lastVisit}</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900">Huyết áp</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">130/85 mmHg</p>
                  <p className="text-sm text-gray-500 mt-1">Ngày {patient.lastVisit}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <FileText className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Kết quả xét nghiệm máu.pdf</p>
                      <p className="text-sm text-gray-500">Tải lên ngày 2026-05-03</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Tải xuống</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <FileText className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Siêu âm tim.pdf</p>
                      <p className="text-sm text-gray-500">Tải lên ngày 2026-04-28</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Tải xuống</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Tải lên file mới
              </Button>
            </TabsContent>
            
            <TabsContent value="feedback" className="mt-6">
              <div className="space-y-4">
                {patientFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        <p className="font-medium text-gray-900">{feedback.expertName}</p>
                      </div>
                      <Badge variant={feedback.status === "urgent" ? "urgent" : "completed"}>
                        {feedback.status === "urgent" ? "Khẩn cấp" : "Đã xử lý"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{feedback.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{feedback.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
