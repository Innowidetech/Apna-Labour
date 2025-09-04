// src/routes/userRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ApplianceRepair from "../pages/Appliance/ApplianceRepair";
import AirConditioner from "../pages/Appliance/AirConditioner";
import AirCooler from "../pages/Appliance/AirCooler";
import Geyser from "../pages/Appliance/Geyser";
import CleaningPestControl from "../pages/Cleaning/CleaningPestControl";
import DeepCleaning from "../pages/Cleaning/DeepCleaning";
import PestControl from "../pages/Cleaning/PestControl";
import Sanitization from "../pages/Cleaning/Sanitization";
import LeatherSofa from "../pages/Cleaning/LeatherSofa";
import SofaCleaning from "../pages/Cleaning/SofaCleaning";
import WashingMachine from "../pages/Appliance/WashingMachin";
import Television from "../pages/Appliance/Television";
import Laptop from "../pages/Appliance/Laptop";
import Chimney from "../pages/Appliance/Chimney";
import Microwave from "../pages/Appliance/Microwave";
import Refrigerator from "../pages/Appliance/Refrigerator";
import Stove from "../pages/Appliance/Stove";
import WaterPurifier from "../pages/Appliance/WaterPurifier";

const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/appliance-repair", element: <ApplianceRepair /> },
  { path: "/air-conditioner", element: <AirConditioner /> },
  { path: "/air-cooler", element: <AirCooler /> },
  { path: "/geyser", element: <Geyser /> },
  { path: "/washing-machine", element: <WashingMachine /> },
  { path: "/television", element: <Television /> },
  { path: "/laptop", element: <Laptop /> },
  { path: "/chimney", element: <Chimney /> },
  { path: "/microwave", element: <Microwave /> },
  { path: "/refrigerator", element: <Refrigerator /> },
  { path: "/stove", element: <Stove /> },
  { path: "/water-purifier", element: <WaterPurifier /> },
  { path: "/cleaning-pest", element: <CleaningPestControl /> },
  { path: "/deep-cleaning", element: <DeepCleaning /> },
  { path: "/pest-control", element: <PestControl /> },
  { path: "/sanitization", element: <Sanitization /> },
  { path: "/leather-sofa", element: <LeatherSofa /> },
  { path: "/sofa-cleaning", element: <SofaCleaning /> },
];

export default appRoutes;