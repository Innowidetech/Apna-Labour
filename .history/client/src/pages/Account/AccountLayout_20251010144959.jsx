// src/pages/Account/AccountLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";
import { useSelector } from "react-redux";

const AccountLayout = () => {
  const accountData = useSelector((state) => state.account?.accountData || {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AccountSidebar displayData={accountData} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
