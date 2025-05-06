import Sidebar from "@/components/Common/Sidebar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
