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
    <div className="flex h-screen overflow-hidden bg-[#F7FAFC] font-sans text-[#1E293B]">
      <Sidebar role={role} userName={userName} />

      <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Topbar role={role} userName={userName} userRole={userRole} notifications={5} />
        <main className="min-h-0 min-w-0 flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
