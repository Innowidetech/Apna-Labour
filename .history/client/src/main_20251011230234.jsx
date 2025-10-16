import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

// ✅ Import Redux
import { Provider } from "react-redux";
import store from "../src/redux/"// ✅ correct import


const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
