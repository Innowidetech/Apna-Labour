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
import Painting from "../pages/Painting/Painting";
import InteriorPainting from "../pages/Painting/InteriorPainting";
import WallsPainting from "../pages/Painting/WallsPainting";
import Waterproofing from "../pages/Painting/Waterproofing";
import ExternalWaterproofing from "../pages/Painting/ExternalWaterproofing";
import MenHome from "../pages/mensalon/menhome";
import Haircut from "../pages/MenSalon/Haircut";
import Detan from "../pages/mensalon/Detan";
import Menicure from "../pages/mensalon/Menicure";
import Ayurveda from "../pages/mensalon/Ayurveda";
import Massage from "../pages/mensalon/Massage";


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
  { path: "/painting", element: <Painting /> },
  { path: "/painting/interior", element: <InteriorPainting /> },
  { path: "/painting/wallspainting", element: <WallsPainting /> },
   { path: "/painting/waterproofing", element: <Waterproofing /> },
    { path: "/painting/externalwaterproofing", element: <ExternalWaterproofing /> },
   { path: "/menhome", element: <MenHome /> },
    { path: "/mensalon/haircut", element: <Haircut /> },
     { path: "/mensalon/detan", element: <Detan /> },
  { path: "/mensalon/menicure", element: <Menicure /> },
  { path: "/mensalon/ayurveda", element: <Ayurveda /> },
   { path: "/mensalon/massage", element: <Massage /> },

];

export default appRoutes;