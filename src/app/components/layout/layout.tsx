import { Outlet } from "react-router";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface LayoutProps {
  role: "doctor" | "expert" | "manager" | "patient";
  userName: string;
  userRole: string;
}

export function Layout({ role, userName, userRole }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar userName={userName} userRole={userRole} notifications={5} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
