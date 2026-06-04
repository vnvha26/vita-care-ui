import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Edit, Phone, Mail, Star, Users, Calendar, Award, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

const doctors = [
  { id: "D001", name: "BS. Nguyễn Văn A", specialty: "Tim mạch", clinic: "PK Đa khoa TW1", patients: 45, rating: 4.8, status: "active", phone: "0901 234 567", email: "nguyenvana@pkdktw1.vn", experience: 12, degree: "Thạc sĩ Y khoa", bio: "Bác sĩ chuyên khoa tim mạch với hơn 12 năm kinh nghiệm điều trị các bệnh lý tim mạch phức tạp." },
  { id: "D002", name: "BS. Trần Văn B", specialty: "Nội tổng hợp", clinic: "PK Đa khoa TW2", patients: 38, rating: 4.6, status: "active", phone: "0902 345 678", email: "tranvanb@pkdktw2.vn", experience: 8, degree: "Bác sĩ Y khoa", bio: "Chuyên gia nội khoa với nhiều năm kinh nghiệm điều trị bệnh lý nội tổng hợp." },
  { id: "D003", name: "BS. Lê Thị C", specialty: "Tiểu đường", clinic: "PK Tim mạch", patients: 52, rating: 4.9, status: "active", phone: "0903 456 789", email: "lethic@pktm.vn", experience: 15, degree: "Tiến sĩ Y khoa", bio: "Chuyên gia hàng đầu về điều trị tiểu đường và rối loạn chuyển hóa." },
  { id: "D004", name: "BS. Phạm Đức D", specialty: "Hô hấp", clinic: "PK Nội TH", patients: 29, rating: 4.5, status: "active", phone: "0904 567 890", email: "phamducd@pknth.vn", experience: 7, degree: "Bác sĩ Y khoa", bio: "Bác sĩ chuyên điều trị bệnh lý hô hấp và phổi." },
  { id: "D005", name: "BS. Hoàng Thị E", specialty: "Thần kinh", clinic: "PK Đa khoa TW1", patients: 31, rating: 4.7, status: "inactive", phone: "0905 678 901", email: "hoangthie@pkdktw1.vn", experience: 10, degree: "Thạc sĩ Y khoa", bio: "Chuyên gia thần kinh với kinh nghiệm điều trị nhiều bệnh lý thần kinh phức tạp." },
];

const recentPatients = [
  { id: "P001", name: "Nguyễn Thị H", age: 55, diagnosis: "Tăng huyết áp", lastVisit: "20/05/2026", status: "stable" },
  { id: "P002", name: "Trần Văn I", age: 62, diagnosis: "Suy tim độ II", lastVisit: "19/05/2026", status: "monitoring" },
  { id: "P003", name: "Lê Thị J", age: 48, diagnosis: "Rối loạn nhịp tim", lastVisit: "18/05/2026", status: "treatment" },
  { id: "P004", name: "Phạm K", age: 71, diagnosis: "Nhồi máu cơ tim cũ", lastVisit: "17/05/2026", status: "stable" },
];

const schedule = [
  { day: "Thứ 2", morning: "07:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Thứ 3", morning: "07:00 – 12:00", afternoon: "–" },
  { day: "Thứ 4", morning: "07:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Thứ 5", morning: "07:00 – 12:00", afternoon: "–" },
  { day: "Thứ 6", morning: "07:00 – 12:00", afternoon: "13:00 – 17:00" },
  { day: "Thứ 7", morning: "07:00 – 11:00", afternoon: "–" },
];

export default function DoctorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Users className="h-16 w-16 text-gray-300" />
        <p className="text-gray-500 text-lg">Không tìm thấy thông tin bác sĩ</p>
        <Button variant="outline" onClick={() => navigate("/manager/doctors")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    stable: "text-green-600 bg-green-50",
    monitoring: "text-yellow-600 bg-yellow-50",
    treatment: "text-blue-600 bg-blue-50",
  };
  const statusLabel: Record<string, string> = {
    stable: "Ổn định",
    monitoring: "Theo dõi",
    treatment: "Điều trị",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/manager/doctors")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-gray-900">{doctor.name}</h1>
              <Badge variant={doctor.status === "active" ? "active" : "inactive"}>
                {doctor.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">{doctor.specialty} · {doctor.clinic}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/manager/doctors/${doctor.id}/edit`)}>
          <Edit className="h-4 w-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">{doctor.patients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Đánh giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <div className="text-3xl font-semibold text-yellow-600">{doctor.rating}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Kinh nghiệm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600">{doctor.experience}
              <span className="text-base font-normal text-gray-500 ml-1">năm</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Lịch hẹn tháng này</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">24</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Hồ sơ cá nhân</TabsTrigger>
          <TabsTrigger value="patients">Bệnh nhân ({doctor.patients})</TabsTrigger>
          <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-2xl font-semibold text-blue-600">
                    {doctor.name.split(" ").pop()?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{doctor.name}</p>
                    <p className="text-gray-500">{doctor.degree}</p>
                    <Badge variant={doctor.status === "active" ? "active" : "inactive"} className="mt-1">
                      {doctor.status === "active" ? "Đang làm việc" : "Ngưng làm việc"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Điện thoại</p>
                      <p className="font-medium text-gray-900">{doctor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{doctor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phòng khám</p>
                      <p className="font-medium text-gray-900">{doctor.clinic}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chuyên môn & Bằng cấp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Chuyên khoa</p>
                  <Badge variant="default" className="mt-1 text-sm px-3 py-1">{doctor.specialty}</Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Bằng cấp cao nhất</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <p className="font-medium text-gray-900">{doctor.degree}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Kinh nghiệm</p>
                  <p className="font-medium text-gray-900 mt-1">{doctor.experience} năm hành nghề</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Giới thiệu</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{doctor.bio}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Chứng chỉ hành nghề</p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100">
                    <Award className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Chứng chỉ hành nghề số: BS-2015-{doctor.id}</p>
                      <p className="text-xs text-green-600">Hạn đến: 31/12/2027</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bệnh nhân đang theo dõi</CardTitle>
                  <CardDescription>Danh sách bệnh nhân gần đây của {doctor.name}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã BN</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Tuổi</TableHead>
                    <TableHead>Chẩn đoán</TableHead>
                    <TableHead>Lần khám gần nhất</TableHead>
                    <TableHead>Tình trạng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPatients.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell className="font-medium text-gray-900">{p.name}</TableCell>
                      <TableCell>{p.age}</TableCell>
                      <TableCell>{p.diagnosis}</TableCell>
                      <TableCell>{p.lastVisit}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[p.status]}`}>
                          {statusLabel[p.status]}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lịch làm việc</CardTitle>
                  <CardDescription>Lịch khám của {doctor.name}</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Chỉnh sửa lịch
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Buổi sáng</TableHead>
                    <TableHead>Buổi chiều</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((s) => (
                    <TableRow key={s.day}>
                      <TableCell className="font-medium text-gray-900">{s.day}</TableCell>
                      <TableCell>
                        {s.morning !== "–" ? (
                          <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-100">{s.morning}</Badge>
                        ) : (
                          <span className="text-gray-400">–</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {s.afternoon !== "–" ? (
                          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">{s.afternoon}</Badge>
                        ) : (
                          <span className="text-gray-400">–</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
