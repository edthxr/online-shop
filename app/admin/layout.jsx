"use client";

import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-7 bg-[#f5f5f5] min-h-screen">{children}</main>
      </div>
    </div>
  );
}