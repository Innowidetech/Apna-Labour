import { StrictMode } from "react";
import React from "react"; 
import { createRoot } from "react-dom/client"; 
import "./index.css";
import App from "./App.jsx";

// ✅ Import Redux
import { Provider } from "react-redux";
import store from "../src/redux/Appliance/store";  // <-- default import here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap your entire app with Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

