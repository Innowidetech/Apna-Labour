import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./layout/AdminSidebar";
import DashboardHeader from "./layout/DashboardHeader";
import DashboardHome from "./DashboardHome";

const MainDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (hidden on small screens when toggled off) */}
      <div
        className={`fixed lg:static z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader onToggleSidebar={handleToggleSidebar} />

        {/* Page Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route index element={<Navigate to="dashboard-home" replace />} />
            <Route path="dashboard-home" element={<DashboardHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
