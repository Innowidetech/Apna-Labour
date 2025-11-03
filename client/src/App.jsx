import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import appRoutes from "./routes/appRoutes";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import your PrivateRoute
import AdminLogin from "./Auth/AdminLogin";
import ForgotPassword from "./Auth/ForgotPassword";
import MainAccount from "./pages/Account/MainAccount";

// Admin Dashboard
import MainDashboard from "./components/adminDashboard/MainDashboard"; // ✅ admin main dashboard

// Other Pages
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
import Payments from "./pages/Payments";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ServicePage from "./pages/ServiceDetails";
import ModalServicePage from "./pages/ModalServicePage";
import FAQ from "./pages/FAQ";
import WorkerZone from "./pages/WorkerZone";
import ContactUs from "./pages/ContactUs";
import LabourCart from "./pages/LabourCart";
import TeamLabourCart from "./pages/TeamLabourCart";
import Verification from "./Auth/Verification";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// ✅ Layout Component
function Layout({ children }) {
  const location = useLocation();
  const noLayoutRoutes = [
    "/login",
    "/viewcart",
    "/contactus",
    "/admin-login",
    "/admin",
  ];

  const hideLayout = noLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? "pt-16" : ""}>
        <Routes>
          {/* ✅ Admin Protected Routes */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <MainDashboard />
              </PrivateRoute>
            }
          />

          {/* ✅ Public Routes */}
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route path="/" element={<Home />} />
          <Route path="/casual" element={<Casual />} />
          <Route path="/electrician" element={<Electrician />} />
          <Route path="/plumcarpenter" element={<PlumCarpenter />} />
          <Route path="/switchsocket" element={<SwitchSocket />} />
          <Route path="/fan" element={<Fan />} />
          <Route path="/light" element={<Light />} />
          <Route path="/wiring" element={<Wiring />} />
          <Route path="/doorbell" element={<Doorbell />} />
          <Route path="/mcb" element={<MCB />} />
          <Route path="/gyser" element={<Gyser />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/workerzone" element={<WorkerZone />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/services/:id" element={<ModalServicePage />} />

          {/* ✅ Account Section */}
          <Route path="/account/*" element={<MainAccount />} />

          {/* ✅ Labour */}
          <Route path="/labour-cart" element={<LabourCart />} />
          <Route path="/team-labour-cart" element={<TeamLabourCart />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

// ✅ Main App Component
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
