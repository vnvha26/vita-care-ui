import { useState } from "react";
import { Upload, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function DoctorExamination() {
  const [formData, setFormData] = useState({
    patientId: "",
    bloodPressure: "",
    bloodSugar: "",
    temperature: "",
    weight: "",
    height: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting examination data:", formData);
    alert("Đã gửi dữ liệu khám bệnh thành công!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Nhập liệu khám bệnh</h1>
        <p className="text-gray-500 mt-1">Ghi nhận thông tin khám và điều trị</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thông tin khám bệnh</CardTitle>
            <CardDescription>Nhập đầy đủ thông tin bệnh nhân và kết quả khám</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã bệnh nhân <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Nhập mã bệnh nhân hoặc tìm kiếm..."
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Huyết áp (mmHg)
                </label>
                <Input
                  placeholder="120/80"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đường huyết (mg/dL)
                </label>
                <Input
                  placeholder="100"
                  value={formData.bloodSugar}
                  onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhiệt độ (°C)
                </label>
                <Input
                  placeholder="36.5"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cân nặng (kg)
                </label>
                <Input
                  placeholder="65"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chiều cao (cm)
                </label>
                <Input
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chẩn đoán <span className="text-red-500">*</span>
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Nhập chẩn đoán bệnh..."
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đơn thuốc
              </label>
              <textarea
                className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Nhập thông tin đơn thuốc..."
                value={formData.prescription}
                onChange={(e) => handleInputChange("prescription", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú thêm
              </label>
              <textarea
                className="flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                placeholder="Ghi chú bổ sung..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File đính kèm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Kéo thả file hoặc click để chọn</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (tối đa 10MB)</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg">
                  <span className="text-green-700">xet-nghiem.pdf</span>
                  <button className="text-red-600 hover:text-red-700">Xóa</button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Lưu và gửi đánh giá
              </Button>
              <Button variant="outline" className="w-full">
                Lưu nháp
              </Button>
              <Button variant="ghost" className="w-full">
                Hủy bỏ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gợi ý</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">1</Badge>
                <p>Nhập đầy đủ thông số sinh hiệu quan trọng</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">2</Badge>
                <p>Chẩn đoán cần rõ ràng, chi tiết</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">3</Badge>
                <p>Đính kèm kết quả xét nghiệm nếu có</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
