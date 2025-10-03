import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
    </Router>
  );
}

export default App;
