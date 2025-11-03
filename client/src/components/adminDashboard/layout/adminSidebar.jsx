import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Briefcase,
  CreditCard,
  BarChart3,
  RotateCcw,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ isMobileOpen, onToggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/admin/dashboard-home" },
    {
      name: "Manage Users",
      icon: <Users size={20} />,
      children: [
        { name: "Customers", path: "/admin/users/customers" },
        { name: "Labours", path: "/admin/users/labours" },
      ],
    },
    { name: "Training Management", icon: <ClipboardList size={20} />, path: "/admin/training" },
    { name: "Service Management", icon: <Briefcase size={20} />, path: "/admin/services" },
    { name: "Bookings & Payments", icon: <CreditCard size={20} />, path: "/admin/bookings" },
    { name: "Reports & Analytics", icon: <BarChart3 size={20} />, path: "/admin/reports" },
    { name: "Refunds", icon: <RotateCcw size={20} />, path: "/admin/refunds" },
    { name: "Queries", icon: <MessageSquare size={20} />, path: "/admin/queries" },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay (background dimmer) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onToggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full bg-[#768ABC] text-white transition-all duration-300 flex flex-col
        ${collapsed ? "w-16" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Collapse Button (Desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-5 bg-white text-gray-600 p-1 rounded-full shadow-md z-10"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Close Button (Mobile only) */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden absolute right-3 top-4 p-2 bg-white/10 hover:bg-white/20 rounded-md"
        >
          <X size={20} />
        </button>

        {/* Logo / Title */}
        <div className="flex items-center justify-center h-16 border-b border-white/20">
          {!collapsed ? (
            <h1 className="text-2xl font-semibold tracking-wide">Apna Labour</h1>
          ) : (
            <h1 className="text-lg font-bold">A</h1>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex flex-col mt-4 space-y-1 overflow-y-auto px-1 pb-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isDropdownOpen =
              openDropdown === item.name ||
              item.children?.some((child) => location.pathname === child.path);

            if (item.children) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => handleDropdown(item.name)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2 mx-1 rounded-md transition-all duration-200 
                    ${
                      isDropdownOpen
                        ? "bg-[#073C64] text-white"
                        : "text-gray-100 hover:bg-[#6C81A8] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      {!collapsed && <span className="text-[15px] font-medium">{item.name}</span>}
                    </div>
                    {!collapsed && (
                      <span>
                        {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Items */}
                  {isDropdownOpen && !collapsed && (
                    <div className="ml-10 mt-1 flex flex-col space-y-1">
                      {item.children.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={onToggleSidebar}
                            className={`px-3 py-1.5 rounded-md text-[14px] transition-all duration-200 ${
                              isSubActive
                                ? "bg-[#073C64] text-white"
                                : "text-gray-100 hover:bg-[#6C81A8] hover:text-white"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onToggleSidebar}
                className={`flex items-center gap-3 px-4 py-2 mx-1 rounded-md transition-all duration-200 
                ${
                  isActive
                    ? "bg-[#073C64] text-white"
                    : "text-gray-100 hover:bg-[#6C81A8] hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {!collapsed && <span className="text-[15px] font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
