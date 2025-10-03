// // src/routes/userRoutes.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "../pages/Home";
// import ApplianceRepair from "../pages/Appliance/ApplianceRepair";
// import AirConditioner from "../pages/Appliance/AirConditioner";
// import AirCooler from "../pages/Appliance/AirCooler";
// import Geyser from "../pages/Appliance/Geyser";
// import CleaningPestControl from "../pages/Cleaning/CleaningPestControl";
// import DeepCleaning from "../pages/Cleaning/DeepCleaning";
// import BedBugControl from "../pages/Cleaning/BedBugControl";
// import FullHomeCleaning from "../pages/Cleaning/FullHomeCleaning";

// import SofaCleaning from "../pages/Cleaning/SofaCleaning";
// import WashingMachine from "../pages/Appliance/WashingMachin";
// import Television from "../pages/Appliance/Television";
// import Laptop from "../pages/Appliance/Laptop";
// import Chimney from "../pages/Appliance/Chimney";
// import Microwave from "../pages/Appliance/Microwave";
// import Refrigerator from "../pages/Appliance/Refrigerator";
// import Stove from "../pages/Appliance/Stove";
// import WaterPurifier from "../pages/Appliance/WaterPurifier";
// import KitchenCleaning from "../pages/Cleaning/Kitchen-Cleaning";
// import CockroachControl from "../pages/Cleaning/CockroachControl";
// import TermiteTreatment from "../pages/Cleaning/TermiteTreatment";

// import PlumberCarpenter from "../pages/Plumber/PlumberCarpenter";
// import Bathroom from "../pages/Plumber/Bathroom";
// import Toilet from "../pages/Plumber/Toilet";
// import Water from "../pages/Plumber/Water";
// import KitchenStorage from "../pages/Plumber/KitchenStorage";
// import BathroomFixture from "../pages/Plumber/BathroomFixture";
// import DoorWindows from "../pages/Plumber/DoorWindows";
// import FurnitureRepair from "../pages/Plumber/FurnitureRepair";
// import ClothHanger from "../pages/Plumber/ClothHanger";


// import WomensSalon from "../pages/Salon/WomensSalon";
// import Grooming from "../pages/Salon/Grooming";
// import Hair from "../pages/Salon/Hair";
// import MakeupDraping from "../pages/Salon/MakeupDraping";
// import Spa from "../pages/Salon/Spa";

// const appRoutes = [
//   { path: "/", element: <Home /> },
//   { path: "/appliance-repair", element: <ApplianceRepair /> },
//   { path: "/air-conditioner", element: <AirConditioner /> },
//   { path: "/air-cooler", element: <AirCooler /> },
//   { path: "/geyser", element: <Geyser /> },
//   { path: "/washing-machine", element: <WashingMachine /> },
//   { path: "/television", element: <Television /> },
//   { path: "/laptop", element: <Laptop /> },
//   { path: "/chimney", element: <Chimney /> },
//   { path: "/microwave", element: <Microwave /> },
//   { path: "/refrigerator", element: <Refrigerator /> },
//   { path: "/stove", element: <Stove /> },
//   { path: "/water-purifier", element: <WaterPurifier /> },
//   { path: "/cleaning-pest", element: <CleaningPestControl /> },
//   { path: "/deep-cleaning", element: <DeepCleaning /> },

//   { path: "/full-home-cleaning", element: <FullHomeCleaning /> },
//   { path: "/sofa-cleaning", element: <SofaCleaning /> },
//   { path: "/kitchen-cleaning", element: <KitchenCleaning /> },
//   { path: "/cockroach-control", element: <CockroachControl /> },
//   { path: "/termite-treatment", element: <TermiteTreatment /> },
//   { path: "/bedbug-control", element: <BedBugControl /> },

//   { path: "/plumber-carpenter", element: <PlumberCarpenter /> },
//   { path: "/bathroom", element: <Bathroom /> },
//   { path: "/toilet", element: <Toilet /> },
//   { path: "/water", element: <Water /> },
//   { path: "/kitchen-storage", element: <KitchenStorage /> },
//   { path: "/bathroom-fixture", element: <BathroomFixture /> },
//   { path: "/door-windows", element: <DoorWindows /> },
//   { path: "/furniture-repair", element: <FurnitureRepair /> },
//   { path: "/cloth-hanger", element: <ClothHanger /> },


//   { path: "/womens-salon", element: <WomensSalon /> },
//   { path: "/grooming", element: <Grooming /> },
//   { path: "/hair", element: <Hair /> },
//   { path: "/makeup-draping", element: <MakeupDraping /> },
//   { path: "/spa", element: <Spa /> },


// ];

// export default appRoutes;


import React from "react";
import Home from "../pages/Home";
import ModalServicePage from "../pages/ModalServicePage";


// Dynamic service details page
import ServiceDetails from "../pages/ServiceDetails";

const appRoutes = [
  { path: "/", element: <Home /> },

  // Dynamic route for service details
{ path: "/service/:id", element: <ServiceDetails /> },
{ path: "/services/:id", element: <ModalServicePage /> },




];

export default appRoutes;
