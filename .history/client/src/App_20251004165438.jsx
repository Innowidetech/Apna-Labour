import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appRoutes from './routes/appRoutes';
import authReducer from './redux/authSlice';

import Home from './pages/Home';
import Casual from './pages/Casual';
import Electrician from './pages/Electrician';
import PlumCarpenter from './pages/PlumCarpenter';
import SwitchSocket from './pages/SwitchSocket';
import Fan from './pages/Fan';
import Light from './pages/Light';
import Wiring from './pages/Wiring';
import Doorbell from './pages/Doorbell';
import MCB from './pages/MCB';
import Gyser from './pages/Gyser';
import Appliances from './pages/Appliances';
import Login from './Auth/Login';
import ViewCart from './pages/ViewCart';
import CartPage from './pages/CartPage';
import ServicePage from './pages/ServiceDetails';
import ModalServicePage from './pages/ModalServicePage';
import FAQ from './pages/FAQ';
import WorkerZone from './pages/WorkerZone';
import ContactUs from './pages/ContactUs';

// ✅ New Casual Labour Page (Dynamic ID)
import CasualLabourPage from './pages/CasualCasualLabourPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Configure Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

function Layout({ children }) {
  const location = useLocation();

  const noLayoutRoutes = ['/login', '/viewcart'];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? 'pt-16' : ''}>
        <Routes>
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* ✅ Service routes */}
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/services/:id" element={<ModalServicePage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* ✅ Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/casual" element={<Casual />} />
          <Route path="/casual-labour/:id" element={<CasualLabourPage />} /> {/* 👈 NEW PAGE */}
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
        </Routes>
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
