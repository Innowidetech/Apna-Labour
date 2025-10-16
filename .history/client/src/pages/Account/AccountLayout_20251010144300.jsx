// src/pages/Account/AccountLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import { useSelector } from "react-redux";

const AccountLayout = () => {
  const accountData = useSelector((state) => state.account?.accountData);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AccountSidebar displayData={accountData} />
      <div className="flex-1 p-4">
        <Outlet /> {/* Renders nested account pages here */}
      </div>
    </div>
  );
};

export default AccountLayout;
