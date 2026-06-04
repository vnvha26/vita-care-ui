import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/layout";
import DoctorDashboard from "./pages/doctor/dashboard";
import DoctorPatients from "./pages/doctor/patients";
import PatientDetail from "./pages/doctor/patient-detail";
import DoctorExamination from "./pages/doctor/examination";
import DoctorChat from "./pages/doctor/chat";
import DoctorFeedback from "./pages/doctor/feedback";
import DoctorProfile from "./pages/doctor/profile";
import ExpertDashboard from "./pages/expert/dashboard";
import ExpertCases from "./pages/expert/cases";
import ExpertCaseDetail from "./pages/expert/case-detail";
import ExpertChat from "./pages/expert/chat";
import ExpertReports from "./pages/expert/reports";
import ExpertProfile from "./pages/expert/profile";
import ManagerChatbot from "./pages/manager/chatbot";
import ManagerClinics from "./pages/manager/clinics";
import ClinicDetail from "./pages/manager/clinic-detail";
import ClinicForm from "./pages/manager/clinic-form";
import ManagerSpecialties from "./pages/manager/specialties";
import SpecialtyDetail from "./pages/manager/specialty-detail";
import SpecialtyForm from "./pages/manager/specialty-form";
import ManagerDoctors from "./pages/manager/doctors";
import DoctorDetail from "./pages/manager/doctor-detail";
import DoctorForm from "./pages/manager/doctor-form";
import ManagerChat from "./pages/manager/manager-chat";
import ManagerCases from "./pages/manager/manager-cases";
import ManagerAIData from "./pages/manager/ai-data";
import ManagerReports from "./pages/manager/reports";
import PatientHome from "./pages/patient/home";
import PatientLogin from "./pages/patient/login";
import PatientRegister from "./pages/patient/register";
import PatientDoctors from "./pages/patient/doctors";
import PatientDashboard from "./pages/patient/dashboard";
import PatientAppointments from "./pages/patient/appointments";
import PatientBook from "./pages/patient/book";
import PatientMedicalRecords from "./pages/patient/medical-records";
import PatientNotifications from "./pages/patient/notifications";
import PatientProfile from "./pages/patient/profile";

function RoleSwitcher() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">NHÓM 4</h1>
          <p className="text-gray-500 mt-2">Hệ thống quản lý phòng khám đa vai trò</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5 max-w-7xl">
          <a
            href="/patient/home"
            className="block p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-pink-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-xl font-semibold text-gray-900">Người cần tư vấn</h2>
            <p className="text-sm text-gray-500 mt-2">Chưa đăng nhập</p>
          </a>
          <a
            href="/patient/dashboard"
            className="block p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-pink-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">🧑‍🦱</div>
            <h2 className="text-xl font-semibold text-gray-900">Bệnh nhân</h2>
            <p className="text-sm text-gray-500 mt-2">Đã đăng nhập</p>
          </a>
          <a
            href="/doctor"
            className="block p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <h2 className="text-xl font-semibold text-gray-900">Bác sĩ</h2>
            <p className="text-sm text-gray-500 mt-2">Quản lý bệnh nhân</p>
          </a>
          <a
            href="/expert"
            className="block p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-green-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h2 className="text-xl font-semibold text-gray-900">Chuyên gia</h2>
            <p className="text-sm text-gray-500 mt-2">Tư vấn chuyên môn</p>
          </a>
          <a
            href="/manager"
            className="block p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-purple-500 hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-4">👨‍💼</div>
            <h2 className="text-xl font-semibold text-gray-900">Quản lý</h2>
            <p className="text-sm text-gray-500 mt-2">Quản trị hệ thống</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleSwitcher />,
  },
  {
    path: "/patient/home",
    element: <PatientHome />,
  },
  {
    path: "/patient/login",
    element: <PatientLogin />,
  },
  {
    path: "/patient/register",
    element: <PatientRegister />,
  },
  {
    path: "/patient/doctors",
    element: <PatientDoctors />,
  },
  {
    path: "/patient",
    element: <Layout role="patient" userName="Nguyễn Văn An" userRole="Bệnh nhân" />,
    children: [
      { path: "dashboard", element: <PatientDashboard /> },
      { path: "appointments", element: <PatientAppointments /> },
      { path: "book", element: <PatientBook /> },
      { path: "medical-records", element: <PatientMedicalRecords /> },
      { path: "notifications", element: <PatientNotifications /> },
      { path: "profile", element: <PatientProfile /> },
    ],
  },
  {
    path: "/doctor",
    element: <Layout role="doctor" userName="BS. Nguyễn Văn A" userRole="Bác sĩ" />,
    children: [
      { index: true, element: <DoctorDashboard /> },
      { path: "patients", element: <DoctorPatients /> },
      { path: "patients/:id", element: <PatientDetail /> },
      { path: "examination", element: <DoctorExamination /> },
      { path: "chat", element: <DoctorChat /> },
      { path: "feedback", element: <DoctorFeedback /> },
      { path: "profile", element: <DoctorProfile /> },
    ],
  },
  {
    path: "/expert",
    element: <Layout role="expert" userName="TS. Nguyễn Thị Lan" userRole="Chuyên gia" />,
    children: [
      { index: true, element: <ExpertDashboard /> },
      { path: "cases", element: <ExpertCases /> },
      { path: "cases/:id", element: <ExpertCaseDetail /> },
      { path: "chat", element: <ExpertChat /> },
      { path: "reports", element: <ExpertReports /> },
      { path: "profile", element: <ExpertProfile /> },
    ],
  },
  {
    path: "/manager",
    element: <Layout role="manager" userName="Nguyễn Quản Lý" userRole="Quản lý hệ thống" />,
    children: [
      { index: true, element: <ManagerChatbot /> },
      { path: "clinics", element: <ManagerClinics /> },
      { path: "clinics/new", element: <ClinicForm /> },
      { path: "clinics/:id", element: <ClinicDetail /> },
      { path: "clinics/:id/edit", element: <ClinicForm /> },
      { path: "specialties", element: <ManagerSpecialties /> },
      { path: "specialties/new", element: <SpecialtyForm /> },
      { path: "specialties/:id", element: <SpecialtyDetail /> },
      { path: "specialties/:id/edit", element: <SpecialtyForm /> },
      { path: "doctors", element: <ManagerDoctors /> },
      { path: "doctors/new", element: <DoctorForm /> },
      { path: "doctors/:id", element: <DoctorDetail /> },
      { path: "doctors/:id/edit", element: <DoctorForm /> },
      { path: "chat", element: <ManagerChat /> },
      { path: "cases", element: <ManagerCases /> },
      { path: "ai-data", element: <ManagerAIData /> },
      { path: "reports", element: <ManagerReports /> },
    ],
  },
]);
