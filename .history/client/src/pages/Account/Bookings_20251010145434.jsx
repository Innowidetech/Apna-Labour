// src/pages/account/Bookings.jsx
import React from "react";
import AccountSidebar from "./AccountSidebar"; // ✅ Import Sidebar

const Bookings = () => {
  return (
    <div>
         <AccountSidebar />
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      <p>Here is where all your bookings will show.</p>
    </div>
  );
};

export default Bookings;
