import { Shield, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const permissions = [
  { id: "view_patients", name: "Xem danh s�ch b?nh nh�n", doctor: true, expert: false, manager: true },
  { id: "edit_patients", name: "Ch?nh s?a th�ng tin b?nh nh�n", doctor: true, expert: false, manager: true },
  { id: "view_cases", name: "Xem ca d�nh gi�", doctor: true, expert: true, manager: true },
  { id: "review_cases", name: "��nh gi� ca b?nh", doctor: false, expert: true, manager: false },
  { id: "manage_users", name: "Qu?n l� ngu?i d�ng", doctor: false, expert: false, manager: true },
  { id: "manage_clinics", name: "Qu?n l� ph�ng kh�m", doctor: false, expert: false, manager: true },
  { id: "view_reports", name: "Xem b�o c�o", doctor: true, expert: true, manager: true },
  { id: "export_data", name: "Xu?t d? li?u", doctor: false, expert: true, manager: true },
  { id: "system_settings", name: "C�i d?t h? th?ng", doctor: false, expert: false, manager: true },
];

export default function ManagerPermissions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Qu?n l� ph�n quy?n</h1>
        <p className="text-gray-500 mt-1">C?u h�nh quy?n truy c?p theo vai tr�</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ma tr?n ph�n quy?n</CardTitle>
          <CardDescription>Qu?n l� quy?n truy c?p cho t?ng vai tr�</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-gray-700">Quy?n</th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>B�c si</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span>Chuy�n gia</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span>Qu?n l�</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{perm.name}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.doctor && (
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.expert && (
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center">
                        {perm.manager && (
                          <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-purple-600" />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 mt-6">
            <Button>Luu thay d?i</Button>
            <Button variant="outline">Kh�i ph?c m?c d?nh</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              B�c si
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quy?n co b?n:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Qu?n l� b?nh nh�n
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Nh?p li?u kh�m b?nh
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Chat v?i chuy�n gia
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Chuy�n gia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quy?n co b?n:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                ��nh gi� ca b?nh
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Ph?n h?i chuy�n m�n
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Xem b�o c�o
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Qu?n l�
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Quy?n qu?n tr?:</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                To�n quy?n h? th?ng
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Qu?n l� ngu?i d�ng
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                C?u h�nh h? th?ng
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
