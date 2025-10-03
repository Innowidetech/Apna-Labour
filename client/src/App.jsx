
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";


import Home from './pages/Home';
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
// import Services from './pages/Services';
// import Contact from './pages/Contact';


import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import appRoutes from "./routes/appRoutes";
import ServicePage from "./pages/ServiceDetails";
import ModalServicePage from "./pages/ModalServicePage";
import CartPage from "./pages/CartPage";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/cart"; // 👈 hide on cart page

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
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>

      <AppContent />
      <Navbar />
      <div className="pt-16"> {/* Add padding to offset the fixed navbar */}
        <Routes>
          {/* Option 1: Explicit routes */}
          <Route path="/" element={<Home />} />
          <Route path="/casual-labour" element={<Casual />} />
          <Route path="/electrician" element={<Electrician />} />
          <Route path="/plumcarpenter" element={<PlumCarpenter />} />
          <Route path="/switchsocket" element={<SwitchSocket />} />
          <Route path="/fan" element={<Fan />} />
          <Route path="/light" element={<Light />} />
          <Route path="/wiring" element={<Wiring />} />
          <Route path="/mcb" element={<MCB />} />
          <Route path="/gyser" element={<Gyser />} />
          <Route path="/appliances" element={<Appliances />} />

          {/* Option 2: Use appRoutes array */}
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />

    </Router>
  );
}

export default App;
