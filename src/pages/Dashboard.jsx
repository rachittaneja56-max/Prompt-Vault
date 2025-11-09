import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="flex  min-h-screen bg-slate-900 text-white text-2xl font-semibold">
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>
      <main className="ml-64 p-6 grow">
         <Outlet/>
      </main>
      
    </div>
  );
}

export default DashboardPage;
