import { useParams, Link } from "react-router";
import { ArrowLeft, FileText, Upload, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockCases } from "../../lib/mock-data";
import { useState } from "react";

export default function ExpertCaseDetail() {
  const { id } = useParams();
  const case_ = mockCases.find(c => c.id === id);
  const [feedback, setFeedback] = useState("");
  const [priority, setPriority] = useState("medium");
  
  if (!case_) {
    return <div>Không tìm thấy ca bệnh</div>;
  }

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback:", { feedback, priority });
    alert("Đã gửi phản hồi thành công!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/expert/cases">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-900">Chi tiết ca đánh giá</h1>
          <p className="text-gray-500 mt-1">Mã ca: {case_.id}</p>
        </div>
        <Button variant="outline">
          Đánh dấu hoàn thành
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin ca bệnh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Bệnh nhân</p>
              <p className="font-medium text-gray-900">{case_.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bác sĩ điều trị</p>
              <p className="font-medium text-gray-900">{case_.doctorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày gửi</p>
              <p className="font-medium text-gray-900">{case_.submittedDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mức độ ưu tiên</p>
              <Badge variant={
                case_.priority === "high" ? "danger" : 
                case_.priority === "medium" ? "warning" : "secondary"
              }>
                {case_.priority === "high" ? "Cao" : 
                 case_.priority === "medium" ? "Trung bình" : "Thấp"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trạng thái</p>
              <Badge variant={
                case_.status === "pending" ? "pending" : 
                case_.status === "in_review" ? "warning" : "completed"
              }>
                {case_.status === "pending" ? "Chờ xử lý" : 
                 case_.status === "in_review" ? "Đang đánh giá" : "Hoàn thành"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chẩn đoán từ bác sĩ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-gray-900">{case_.diagnosis}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="data">
            <TabsList>
              <TabsTrigger value="data">Dữ liệu bác sĩ nhập</TabsTrigger>
              <TabsTrigger value="files">File đính kèm</TabsTrigger>
              <TabsTrigger value="history">Lịch sử phản hồi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="data" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-500">Huyết áp</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">130/85 mmHg</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-500">Đường huyết</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">145 mg/dL</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-500">Nhiệt độ</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">37.2 °C</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-500">Cân nặng</h4>
                  <p className="text-2xl font-semibold text-blue-600 mt-2">68 kg</p>
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
                      <p className="font-medium text-gray-900">Kết quả xét nghiệm.pdf</p>
                      <p className="text-sm text-gray-500">Tải lên ngày {case_.submittedDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Tải xuống</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <p className="text-sm text-gray-500">Chưa có phản hồi nào cho ca này</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phản hồi chuyên môn</CardTitle>
          <CardDescription>Gửi đánh giá và khuyến nghị cho bác sĩ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mức độ ưu tiên phản hồi
            </label>
            <div className="flex gap-2">
              <Button
                variant={priority === "low" ? "default" : "outline"}
                onClick={() => setPriority("low")}
              >
                Thấp
              </Button>
              <Button
                variant={priority === "medium" ? "default" : "outline"}
                onClick={() => setPriority("medium")}
              >
                Trung bình
              </Button>
              <Button
                variant={priority === "high" ? "default" : "outline"}
                onClick={() => setPriority("high")}
              >
                Cao
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung phản hồi <span className="text-red-500">*</span>
            </label>
            <textarea
              className="flex min-h-[200px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              placeholder="Nhập đánh giá chuyên môn và khuyến nghị điều trị..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Đính kèm tài liệu tham khảo (tùy chọn)</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmitFeedback}>
              <Send className="h-4 w-4 mr-2" />
              Gửi phản hồi
            </Button>
            <Button variant="outline">Lưu nháp</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
