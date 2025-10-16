// src/layouts/AccountLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";

const AccountLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AccountSidebar />
      <div className="flex-1 p-6">
        <Outlet /> {/* This is where nested page components will render */}
      </div>
    </div>
  );
};

export default AccountLayout;
