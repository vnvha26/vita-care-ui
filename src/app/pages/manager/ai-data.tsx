import { useState } from "react";
import { Database, Upload, Download, RefreshCw, CheckCircle2, Brain, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const appointmentData = {
  totalRecords: 1245,
  lastUpdated: "2026-05-07 10:30",
  status: "synced",
  categories: [
    { name: "Lịch hẹn định kỳ", count: 456, accuracy: 94 },
    { name: "Khám cấp cứu", count: 189, accuracy: 88 },
    { name: "Tái khám", count: 600, accuracy: 96 },
  ],
};

const recommendationData = {
  totalRecords: 2890,
  lastUpdated: "2026-05-07 09:15",
  status: "synced",
  categories: [
    { name: "Khuyến nghị thuốc", count: 1234, accuracy: 92 },
    { name: "Khuyến nghị xét nghiệm", count: 876, accuracy: 89 },
    { name: "Khuyến nghị chế độ", count: 780, accuracy: 95 },
  ],
};

const aiSpecialties = [
  {
    id: "SP001",
    name: "Tim mạch",
    enabled: true,
    confidence: 95,
    symptoms: ["Đau ngực", "Khó thở", "Tim đập nhanh", "Huyết áp cao"],
    caseCount: 234,
    description: "AI có thể gợi ý chuyên khoa tim mạch dựa trên triệu chứng về đau ngực, rối loạn nhịp tim, và các vấn đề huyết áp"
  },
  {
    id: "SP002",
    name: "Tiểu đường - Nội tiết",
    enabled: true,
    confidence: 92,
    symptoms: ["Đái nhiều", "Khát nước", "Mệt mỏi", "Sụt cân"],
    caseCount: 189,
    description: "Gợi ý dựa trên các triệu chứng liên quan đến đường huyết, cân nặng bất thường, và rối loạn chuyển hóa"
  },
  {
    id: "SP003",
    name: "Hô hấp",
    enabled: true,
    confidence: 88,
    symptoms: ["Ho", "Khó thở", "Đau họng", "Sốt"],
    caseCount: 167,
    description: "Phát hiện các vấn đề về đường hô hấp, hen suyễn, viêm phổi dựa trên triệu chứng hô hấp"
  },
  {
    id: "SP004",
    name: "Tiêu hóa",
    enabled: true,
    confidence: 85,
    symptoms: ["Đau bụng", "Tiêu chảy", "Buồn nôn", "Khó tiêu"],
    caseCount: 143,
    description: "Nhận diện các bệnh lý tiêu hóa từ triệu chứng đau bụng, rối loạn tiêu hóa"
  },
  {
    id: "SP005",
    name: "Thần kinh",
    enabled: true,
    confidence: 90,
    symptoms: ["Đau đầu", "Chóng mặt", "Tê liệt", "Mất ngủ"],
    caseCount: 98,
    description: "Phát hiện các rối loạn thần kinh, đau đầu mãn tính, và vấn đề về giấc ngủ"
  },
  {
    id: "SP006",
    name: "Da liễu",
    enabled: false,
    confidence: 78,
    symptoms: ["Ngứa", "Phát ban", "Mụn", "Nấm"],
    caseCount: 76,
    description: "Chưa đủ dữ liệu để đưa ra gợi ý chính xác - cần thêm ca bệnh"
  },
];

const pastCases = [
  {
    id: "PC001",
    patientAge: 45,
    gender: "Nam",
    symptoms: "Đau ngực, khó thở, tim đập nhanh",
    aiSuggestion: "Tim mạch",
    actualDiagnosis: "Tim mạch",
    doctorConfirmed: true,
    outcome: "Chẩn đoán chính xác - Hẹp động mạch vành",
    confidence: 96,
    date: "2026-04-15"
  },
  {
    id: "PC002",
    patientAge: 52,
    gender: "Nữ",
    symptoms: "Đái nhiều, khát nước, mệt mỏi",
    aiSuggestion: "Tiểu đường - Nội tiết",
    actualDiagnosis: "Tiểu đường - Nội tiết",
    doctorConfirmed: true,
    outcome: "Chẩn đoán chính xác - Tiểu đường type 2",
    confidence: 94,
    date: "2026-04-20"
  },
  {
    id: "PC003",
    patientAge: 28,
    gender: "Nữ",
    symptoms: "Ho, khó thở, đau họng",
    aiSuggestion: "Hô hấp",
    actualDiagnosis: "Hô hấp",
    doctorConfirmed: true,
    outcome: "Chẩn đoán chính xác - Viêm phế quản",
    confidence: 89,
    date: "2026-05-02"
  },
  {
    id: "PC004",
    patientAge: 38,
    gender: "Nam",
    symptoms: "Đau bụng, tiêu chảy, buồn nôn",
    aiSuggestion: "Tiêu hóa",
    actualDiagnosis: "Tiêu hóa",
    doctorConfirmed: true,
    outcome: "Chẩn đoán chính xác - Viêm dạ dày cấp",
    confidence: 87,
    date: "2026-05-05"
  },
  {
    id: "PC005",
    patientAge: 34,
    gender: "Nữ",
    symptoms: "Đau đầu mãn tính, chóng mặt",
    aiSuggestion: "Thần kinh",
    actualDiagnosis: "Thần kinh",
    doctorConfirmed: true,
    outcome: "Chẩn đoán chính xác - Đau nửa đầu",
    confidence: 91,
    date: "2026-05-06"
  },
  {
    id: "PC006",
    patientAge: 29,
    gender: "Nam",
    symptoms: "Ngứa, phát ban, mụn",
    aiSuggestion: "Da liễu",
    actualDiagnosis: "Dị ứng - Miễn dịch",
    doctorConfirmed: false,
    outcome: "Gợi ý sai - Thực tế là dị ứng thực phẩm",
    confidence: 72,
    date: "2026-04-28"
  },
];

export default function ManagerAIData() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Quản lý dữ liệu AI</h1>
          <p className="text-gray-500 mt-1">Quản lý dữ liệu cho tính năng đặt lịch và khuyến nghị của AI</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Đang đồng bộ..." : "Đồng bộ"}
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Tải lên dữ liệu
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tổng dữ liệu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">4,135</div>
            <p className="text-xs text-gray-500 mt-1">bản ghi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Độ chính xác TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">92.3%</div>
            <p className="text-xs text-gray-500 mt-1">Mô hình AI</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cập nhật cuối</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900">Hôm nay</div>
            <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Trạng thái</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-600">Đã đồng bộ</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="specialties">
        <TabsList>
          <TabsTrigger value="specialties">Chuyên khoa AI gợi ý</TabsTrigger>
          <TabsTrigger value="pastcases">Ca bệnh lịch sử</TabsTrigger>
          <TabsTrigger value="appointments">Dữ liệu đặt lịch</TabsTrigger>
          <TabsTrigger value="recommendations">Dữ liệu khuyến nghị</TabsTrigger>
          <TabsTrigger value="training">Huấn luyện mô hình</TabsTrigger>
        </TabsList>

        <TabsContent value="specialties" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    Chuyên khoa AI có thể gợi ý
                  </CardTitle>
                  <CardDescription>Quản lý các chuyên khoa mà AI có thể đề xuất cho người dùng</CardDescription>
                </div>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Cập nhật mô hình
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSpecialties.map((specialty) => (
                  <Card key={specialty.id} className={!specialty.enabled ? "opacity-60" : ""}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{specialty.name}</h3>
                            <Badge variant={specialty.enabled ? "active" : "inactive"}>
                              {specialty.enabled ? "Đang hoạt động" : "Tắt"}
                            </Badge>
                            <Badge variant={specialty.confidence >= 90 ? "success" : specialty.confidence >= 80 ? "warning" : "danger"}>
                              {specialty.confidence}% độ tin cậy
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{specialty.description}</p>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Triệu chứng nhận diện:</p>
                              <div className="flex flex-wrap gap-1">
                                {specialty.symptoms.map((symptom, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-2">Dữ liệu huấn luyện:</p>
                              <p className="text-sm font-medium text-gray-900">{specialty.caseCount} ca bệnh</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant={specialty.enabled ? "outline" : "default"}
                            size="sm"
                          >
                            {specialty.enabled ? "Tắt" : "Bật"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Chi tiết
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-500">Độ chính xác gợi ý:</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                specialty.confidence >= 90 ? "bg-green-600" :
                                specialty.confidence >= 80 ? "bg-yellow-600" : "bg-red-600"
                              }`}
                              style={{ width: `${specialty.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">{specialty.confidence}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pastcases" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Ca bệnh lịch sử
                  </CardTitle>
                  <CardDescription>Mô tả các ca bệnh đã được AI phân tích và xác nhận</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất báo cáo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Tổng ca đã phân tích</p>
                  <p className="text-2xl font-semibold text-green-700">{pastCases.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Gợi ý chính xác</p>
                  <p className="text-2xl font-semibold text-blue-700">
                    {pastCases.filter(c => c.doctorConfirmed).length}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Độ chính xác TB</p>
                  <p className="text-2xl font-semibold text-purple-700">
                    {((pastCases.filter(c => c.doctorConfirmed).length / pastCases.length) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã ca</TableHead>
                    <TableHead>BN</TableHead>
                    <TableHead>Triệu chứng</TableHead>
                    <TableHead>AI gợi ý</TableHead>
                    <TableHead>Chẩn đoán thực tế</TableHead>
                    <TableHead>Độ tin cậy</TableHead>
                    <TableHead>Kết quả</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell className="font-medium">{case_.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-900">{case_.gender}, {case_.patientAge}t</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-700 max-w-xs">{case_.symptoms}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{case_.aiSuggestion}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={case_.doctorConfirmed ? "success" : "warning"}>
                          {case_.actualDiagnosis}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                case_.confidence >= 90 ? "bg-green-600" :
                                case_.confidence >= 80 ? "bg-yellow-600" : "bg-red-600"
                              }`}
                              style={{ width: `${case_.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{case_.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={case_.doctorConfirmed ? "success" : "danger"}>
                          {case_.doctorConfirmed ? "✓ Chính xác" : "✗ Sai"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">{case_.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-gray-900">Chi tiết ca bệnh nổi bật:</h4>
                {pastCases.slice(0, 3).map((case_) => (
                  <div key={case_.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{case_.id} - {case_.gender}, {case_.patientAge} tuổi</p>
                        <p className="text-sm text-gray-500">{case_.date}</p>
                      </div>
                      <Badge variant={case_.doctorConfirmed ? "success" : "danger"}>
                        {case_.doctorConfirmed ? "✓ Chính xác" : "✗ Sai"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2"><strong>Triệu chứng:</strong> {case_.symptoms}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>AI đề xuất:</strong> {case_.aiSuggestion} ({case_.confidence}% độ tin cậy)
                    </p>
                    <p className="text-sm text-gray-700"><strong>Kết quả:</strong> {case_.outcome}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Phân tích ca sai</h4>
                <p className="text-sm text-yellow-800">
                  Ca bệnh PC006 cho thấy AI nhầm lẫn giữa Da liễu và Dị ứng - Miễn dịch.
                  Cần bổ sung thêm dữ liệu về các triệu chứng dị ứng để cải thiện độ chính xác.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dữ liệu đặt lịch hẹn</CardTitle>
                  <CardDescription>Dữ liệu để AI gợi ý lịch hẹn phù hợp</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất dữ liệu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="text-sm text-gray-500">Tổng số bản ghi</p>
                    <p className="text-2xl font-semibold text-gray-900">{appointmentData.totalRecords}</p>
                  </div>
                  <Badge variant="success">Đã xác thực</Badge>
                </div>

                <div className="space-y-3">
                  {appointmentData.categories.map((cat, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{cat.name}</p>
                        <Badge variant="default">{cat.count} mẫu</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${cat.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{cat.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Thêm dữ liệu mới
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Làm mới
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dữ liệu khuyến nghị</CardTitle>
                  <CardDescription>Dữ liệu để AI đưa ra khuyến nghị điều trị</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Xuất dữ liệu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <p className="text-sm text-gray-500">Tổng số bản ghi</p>
                    <p className="text-2xl font-semibold text-gray-900">{recommendationData.totalRecords}</p>
                  </div>
                  <Badge variant="success">Đã xác thực</Badge>
                </div>

                <div className="space-y-3">
                  {recommendationData.categories.map((cat, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{cat.name}</p>
                        <Badge variant="default">{cat.count} mẫu</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${cat.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{cat.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Thêm dữ liệu mới
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Làm mới
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Huấn luyện mô hình AI</CardTitle>
              <CardDescription>Quản lý quá trình huấn luyện và cập nhật mô hình</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-gray-500 mb-1">Phiên bản hiện tại</p>
                  <p className="text-xl font-semibold text-gray-900">v2.3.1</p>
                  <p className="text-xs text-gray-400 mt-1">Cập nhật: 2026-04-15</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <p className="text-sm text-gray-500 mb-1">Huấn luyện gần nhất</p>
                  <p className="text-xl font-semibold text-gray-900">15 ngày trước</p>
                  <p className="text-xs text-gray-400 mt-1">Độ chính xác: 92.3%</p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Lịch huấn luyện tự động</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Mô hình được huấn luyện lại tự động mỗi 30 ngày hoặc khi có 500+ dữ liệu mới
                </p>
                <div className="flex items-center gap-3">
                  <Button>Huấn luyện ngay</Button>
                  <Button variant="outline">Cấu hình lịch</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Lịch sử huấn luyện</h4>
                {[
                  { version: "v2.3.1", date: "2026-04-15", accuracy: 92.3, status: "success" },
                  { version: "v2.3.0", date: "2026-03-12", accuracy: 91.8, status: "success" },
                  { version: "v2.2.9", date: "2026-02-08", accuracy: 90.5, status: "success" },
                ].map((train, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-gray-900">{train.version}</p>
                      <p className="text-sm text-gray-500">{train.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{train.accuracy}%</p>
                      <Badge variant="success" className="mt-1">Thành công</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
