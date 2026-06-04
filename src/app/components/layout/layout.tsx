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
    <div className="flex h-screen bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-purple-50/80">
      <Sidebar role={role} />
      
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className="absolute top-0 w-full z-40">
          <Topbar userName={userName} userRole={userRole} notifications={5} />
        </div>
        
        <main className="flex-1 overflow-y-auto p-6 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
