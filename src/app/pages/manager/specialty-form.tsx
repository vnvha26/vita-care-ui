import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Save, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const specialties = [
  { id: "SP001", name: "Tim m?ch", doctorCount: 8, patientCount: 234, status: "active", description: "Chuy�n khoa v? tim v� h? tu?n ho�n m�u." },
  { id: "SP002", name: "N?i t?ng h?p", doctorCount: 12, patientCount: 456, status: "active", description: "Chuy�n khoa n?i khoa t?ng qu�t." },
  { id: "SP003", name: "Ti?u du?ng", doctorCount: 6, patientCount: 189, status: "active", description: "Chuy�n di?u tr? b?nh ti?u du?ng v� r?i lo?n n?i ti?t." },
  { id: "SP004", name: "H� h?p", doctorCount: 5, patientCount: 167, status: "active", description: "Chuy�n khoa v? b?nh l� du?ng h� h?p." },
  { id: "SP005", name: "Th?n kinh", doctorCount: 4, patientCount: 98, status: "active", description: "Chuy�n di?u tr? c�c b?nh l� h? th?n kinh." },
  { id: "SP006", name: "Da li?u", doctorCount: 3, patientCount: 76, status: "inactive", description: "Chuy�n di?u tr? c�c b?nh v? da, t�c v� m�ng." },
];

export default function SpecialtyForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined && id !== "new";

  const existing = isEdit ? specialties.find((s) => s.id === id) : undefined;

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    code: existing?.id ?? "",
    status: existing?.status ?? "active",
    description: existing?.description ?? "",
    requireCertification: "true",
    averageSessionDuration: "30",
  });

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/manager/specialties");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(isEdit ? `/manager/specialties/${id}` : "/manager/specialties")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {isEdit ? "Ch?nh s?a chuy�n khoa" : "Th�m chuy�n khoa m?i"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? `C?p nh?t th�ng tin: ${existing?.name}` : "�i?n th�ng tin chuy�n khoa m?i"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
                Th�ng tin chuy�n khoa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">T�n chuy�n khoa *</Label>
                <Input
                  id="name"
                  placeholder="VD: N?i tim m?ch"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">M� chuy�n khoa *</Label>
                <Input
                  id="code"
                  placeholder="VD: SP007"
                  value={form.code}
                  onChange={(e) => set("code", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Tr?ng th�i</Label>
                <Select value={form.status} onValueChange={(v) => set("status", v)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ho?t d?ng</SelectItem>
                    <SelectItem value="inactive">Ngung ho?t d?ng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">M� t? *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="M� t? v? chuy�n khoa, ph?m vi di?u tr?..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>C?u h�nh chuy�n khoa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avgDuration">Th?i gian kh�m TB (ph�t)</Label>
                <Input
                  id="avgDuration"
                  type="number"
                  min="10"
                  max="120"
                  value={form.averageSessionDuration}
                  onChange={(e) => set("averageSessionDuration", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification">Y�u c?u ch?ng ch? h�nh ngh?</Label>
                <Select value={form.requireCertification} onValueChange={(v) => set("requireCertification", v)}>
                  <SelectTrigger id="certification">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">C�</SelectItem>
                    <SelectItem value="false">Kh�ng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nh�m chuy�n khoa</Label>
                <Select defaultValue="noi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="noi">N?i khoa</SelectItem>
                    <SelectItem value="ngoai">Ngo?i khoa</SelectItem>
                    <SelectItem value="san">S?n ph? khoa</SelectItem>
                    <SelectItem value="nhi">Nhi khoa</SelectItem>
                    <SelectItem value="mat">M?t</SelectItem>
                    <SelectItem value="rang">Rang h�m m?t</SelectItem>
                    <SelectItem value="tai">Tai mui h?ng</SelectItem>
                    <SelectItem value="other">Kh�c</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ph� kh�m ban d?u (VN�)</Label>
                <Input type="number" placeholder="VD: 200000" defaultValue="200000" />
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700 font-medium">Luu �</p>
                <p className="text-sm text-blue-600 mt-1">
                  Sau khi t?o chuy�n khoa, b?n c� th? ph�n b? b�c si v� thi?t l?p l?ch kh�m trong trang chi ti?t.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEdit ? `/manager/specialties/${id}` : "/manager/specialties")}
          >
            H?y
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEdit ? "Luu thay d?i" : "T?o chuy�n khoa"}
          </Button>
        </div>
      </form>
    </div>
  );
}
