import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar"
import Footer from "../src/components/Footer"
import appRoutes from "./routes/appRoutes";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="pt-16">
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
