import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Edit, MapPin, Phone, Upload, Image } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { mockClinics } from "../../lib/mock-data";

export default function ManagerClinics() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredClinics = mockClinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Qu?n l� ph�ng kh�m</h1>
          <p className="text-gray-500 mt-1">Qu?n l� th�ng tin co b?n, chi nh�nh v� h�nh ?nh</p>
        </div>
        <Button onClick={() => navigate("/manager/clinics/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Th�m ph�ng kh�m
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">T?ng ph�ng kh�m</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{mockClinics.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">�ang ho?t d?ng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              {mockClinics.filter(c => c.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">T?ng b�c si</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600">
              {mockClinics.reduce((sum, c) => sum + c.doctorCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Th�ng tin co b?n</TabsTrigger>
          <TabsTrigger value="branches">Chi nh�nh</TabsTrigger>
          <TabsTrigger value="images">H�nh ?nh</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 mt-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="T�m ki?m ph�ng kh�m..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredClinics.map((clinic) => (
              <Card key={clinic.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{clinic.name}</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {clinic.address}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 mt-1">
                          <Phone className="h-4 w-4 shrink-0" />
                          {clinic.phone}
                        </div>
                      </CardDescription>
                    </div>
                    <Badge variant={clinic.status === "active" ? "active" : "inactive"}>
                      {clinic.status === "active" ? "Ho?t d?ng" : "Ngung"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-blue-50">
                      <p className="text-2xl font-semibold text-blue-600">{clinic.doctorCount}</p>
                      <p className="text-sm text-gray-500 mt-1">B�c si</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50">
                      <p className="text-2xl font-semibold text-green-600">{clinic.patientCount}</p>
                      <p className="text-sm text-gray-500 mt-1">B?nh nh�n</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium text-gray-900">contact@{clinic.id.toLowerCase()}.com</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Gi? ho?t d?ng</label>
                      <p className="font-medium text-gray-900">8:00 - 20:00 (T2-CN)</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/manager/clinics/${clinic.id}/edit`)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Ch?nh s?a
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/manager/clinics/${clinic.id}`)}>
                      Chi ti?t
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="branches" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Qu?n l� chi nh�nh</CardTitle>
                  <CardDescription>C�c chi nh�nh c?a h? th?ng ph�ng kh�m</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Th�m chi nh�nh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClinics.map((clinic) => (
                  <div key={clinic.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{clinic.name}</p>
                        <p className="text-sm text-gray-500">{clinic.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={clinic.status === "active" ? "active" : "inactive"}>
                        {clinic.status === "active" ? "Ho?t d?ng" : "Ngung"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Qu?n l� h�nh ?nh</CardTitle>
              <CardDescription>H�nh ?nh ph�ng kh�m v� co s? v?t ch?t</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">T?i l�n h�nh ?nh m?i</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG (t?i da 5MB)</p>
                </div>

                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary">Xem</Button>
                        <Button size="sm" variant="secondary">X�a</Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Ph�ng kh�m TW{i}</p>
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
