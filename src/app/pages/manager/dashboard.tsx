import { Users, Building2, Activity, TrendingUp, UserCheck, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { mockUsers, mockClinics } from "../../lib/mock-data";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const growthData = [
  { month: "T1", users: 45, cases: 320 },
  { month: "T2", users: 52, cases: 385 },
  { month: "T3", users: 58, cases: 420 },
  { month: "T4", users: 61, cases: 480 },
  { month: "T5", users: 68, cases: 520 },
];

const clinicPerformance = [
  { name: "PK TW1", patients: 342, doctors: 12 },
  { name: "PK TW2", patients: 218, doctors: 8 },
  { name: "PK Tim m?ch", patients: 156, doctors: 5 },
  { name: "PK N?i TH", patients: 78, doctors: 3 },
];

export default function ManagerDashboard() {
  const totalUsers = mockUsers.length;
  const activeClinics = mockClinics.filter(c => c.status === "active").length;
  const totalDoctors = mockUsers.filter(u => u.role === "doctor").length;
  const totalExperts = mockUsers.filter(u => u.role === "expert").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard Qu?n l�</h1>
        <p className="text-gray-500 mt-1">T?ng quan h? th?ng chu?i ph�ng kh�m</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              T?ng ngu?i d�ng
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{totalUsers}</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8 ngu?i m?i th�ng n�y
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ph�ng kh�m ho?t d?ng
            </CardTitle>
            <Building2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{activeClinics}</div>
            <p className="text-xs text-gray-500 mt-2">
              Tr�n t?ng s? {mockClinics.length} ph�ng kh�m
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              B�c si
            </CardTitle>
            <UserCheck className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{totalDoctors}</div>
            <p className="text-xs text-gray-500 mt-2">
              �ang ho?t d?ng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Chuy�n gia
            </CardTitle>
            <FileText className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{totalExperts}</div>
            <p className="text-xs text-gray-500 mt-2">
              �ang ho?t d?ng
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tang tru?ng h? th?ng</CardTitle>
            <CardDescription>Ngu?i d�ng v� ca kh�m theo th�ng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="cases" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hi?u su?t ph�ng kh�m</CardTitle>
            <CardDescription>S? b?nh nh�n v� b�c si</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clinicPerformance}>
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
                <Bar dataKey="doctors" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ho?t d?ng g?n d�y</CardTitle>
          <CardDescription>C�c s? ki?n quan tr?ng trong h? th?ng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: UserCheck, color: "text-blue-600 bg-blue-100", title: "T�i kho?n m?i", desc: "BS. Ph?m Van E d� du?c th�m v�o PK TW1", time: "2 gi? tru?c" },
              { icon: Building2, color: "text-green-600 bg-green-100", title: "Ph�ng kh�m m?i", desc: "Ph�ng kh�m N?i t?ng h?p d� du?c k�ch ho?t", time: "5 gi? tru?c" },
              { icon: Activity, color: "text-purple-600 bg-purple-100", title: "C?p nh?t h? th?ng", desc: "Module b�o c�o d� du?c n�ng c?p l�n v2.1", time: "1 ng�y tru?c" },
              { icon: FileText, color: "text-orange-600 bg-orange-100", title: "B�o c�o th�ng", desc: "B�o c�o th�ng 4 d� du?c t?o t? d?ng", time: "2 ng�y tru?c" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ph�n ph?i vai tr�</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                <span className="text-sm text-gray-700">B�c si</span>
              </div>
              <span className="font-medium text-gray-900">{totalDoctors}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-gray-700">Chuy�n gia</span>
              </div>
              <span className="font-medium text-gray-900">{totalExperts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                <span className="text-sm text-gray-700">Qu?n l�</span>
              </div>
              <span className="font-medium text-gray-900">1</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tr?ng th�i h? th?ng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Server Status</span>
              <Badge variant="active">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Database</span>
              <Badge variant="active">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">API Response</span>
              <Badge variant="success">Fast (45ms)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>H�nh d?ng nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-2 border-b border-gray-100">
              + Th�m ngu?i d�ng m?i
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-2 border-b border-gray-100">
              + Th�m ph�ng kh�m
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-2">
              Xu?t b�o c�o
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
