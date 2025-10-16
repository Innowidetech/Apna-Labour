import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";

import Account from "./Account";
import Bookings from "./Bookings";
import Payments from "./Payments";
import MyRatingsReviews from "./MyRatingsReviews";
import Notifications from "./Notifications";
import HelpCenter from "./HelpCenter";
import ServiceRelated from "./ServiceRelated";
import RefundsRelated from "./RefundsRelated";
import CancellationRelated from "./CancellationRelated";

const MainAccount = () => {
  const [activeMenu, setActiveMenu] = useState("My Account");

  const renderContent = () => {
    switch (activeMenu) {
      case "My Account":
        return <Account />;
      case "My Bookings":
        return <Bookings />;
      case "Payments":
        return <Payments />;
      case "My rating & reviews":
        return <MyRatingsReviews />;
      case "Help Center":
        return <HelpCenter />;
      case "Service related":
        return <ServiceRelated />;
      case "Refunds related":
        return <RefundsRelated />;
      case "Cancellation related":
        return <CancellationRelated />;
      case "All notification":
        return <Notifications />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AccountSidebar
        activeMenu={activeMenu}
        handleMenuClick={setActiveMenu}
      />
      <div className="flex-1 bg-white shadow-md p-4 md:p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainAccount;
