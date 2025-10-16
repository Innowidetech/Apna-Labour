<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import appRoutes from './routes/appRoutes';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66

import appRoutes from "./routes/appRoutes";

<<<<<<< HEAD
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Account from './pages/Account/Account';
import AccountSidebar from './pages/Account/AccountSidebar';
import AccountLayout from "./pages/Account/AccountLayout";
import Bookings from './pages/Account/Bookings';

function Layout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/viewcart'];
=======
import Home from "./pages/Home";
import Casual from "./pages/Casual";
import Electrician from "./pages/Electrician";
import PlumCarpenter from "./pages/PlumCarpenter";
import SwitchSocket from "./pages/SwitchSocket";
import Fan from "./pages/Fan";
import Light from "./pages/Light";
import Wiring from "./pages/Wiring";
import Doorbell from "./pages/Doorbell";
import MCB from "./pages/MCB";
import Gyser from "./pages/Gyser";
import Appliances from "./pages/Appliances";
import Login from "./Auth/Login";
import ViewCart from "./pages/ViewCart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ServicePage from "./pages/ServiceDetails";
import ModalServicePage from "./pages/ModalServicePage";
import FAQ from "./pages/FAQ";
import WorkerZone from "./pages/WorkerZone";
import ContactUs from "./pages/ContactUs";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LabourCart from "./pages/LabourCart";
import TeamLabourCart from "./pages/TeamLabourCart";
import MainAccount from "./pages/Account/MainAccount";

function Layout({ children }) {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/viewcart"];
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? "pt-16" : ""}>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/services/:id" element={<ModalServicePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
<<<<<<< HEAD
          <Route path="/account" element={<Account />} />
          <Route path="/accountsidebar" element={<AccountSidebar />} />
=======
          <Route path="/account/*" element={<MainAccount />} />

>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
          <Route path="/" element={<Home />} />
          <Route path="/casual" element={<Casual />} />
          <Route path="/electrician" element={<Electrician />} />
          <Route path="/plumcarpenter" element={<PlumCarpenter />} />
          <Route path="/switchsocket" element={<SwitchSocket />} />
          <Route path="/fan" element={<Fan />} />
          <Route path="/light" element={<Light />} />
          <Route path="/wiring" element={<Wiring />} />
          <Route path="/mcb" element={<MCB />} />
          <Route path="/gyser" element={<Gyser />} />
          <Route path="/doorbell" element={<Doorbell />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/workerzone" element={<WorkerZone />} />
          <Route path="/contactus" element={<ContactUs />} />
<<<<<<< HEAD
          <Route path="/accountlayout" element={<AccountLayout />} />
          <Route path="/bookings" element={<Bookings />} />
=======
          <Route path="/labour-cart" element={<LabourCart />} />
          <Route path="/team-labour-cart" element={<TeamLabourCart />} />
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
        </Routes>
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
