import React, { useState } from "react";
import { X } from "lucide-react";
import plumberImg from "../assets/plumber.png";
import service1 from "../assets/tap.jpg"; 
import service2 from "../assets/bath.jpg";
import service3 from "../assets/basin.jpg";
import service4 from "../assets/tank.jpg";
import service5 from "../assets/drain.jpg";
import service6 from "../assets/toilet.jpg";

// Sub-service images for modal
import tapRepair from "../assets/tap.jpg";
import tapInstall from "../assets/tap.jpg";
import basinRepair from "../assets/basin.jpg";
import basinInstall from "../assets/basin.jpg";

// Carpenter service images
import carpenter1 from "../assets/cupboard.jpg";
import carpenter2 from "../assets/furniture.jpg";
import carpenter3 from "../assets/window.jpg";
import carpenter4 from "../assets/kitchen.jpg";
import carpenter5 from "../assets/door.jpg";
import carpenter6 from "../assets/hanger.jpg";
import carpenter7 from "../assets/mirror.jpg";
import carpenter8 from "../assets/shelve.jpg";

const PlumCarpenter = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Main services
  const plumbingServices = [
    { id: 1, name: "Tap & Mixer", img: service1 },
    { id: 2, name: "Bath & Shower", img: service2 },
    { id: 3, name: "Basin & Sink", img: service3 },
    { id: 4, name: "Water Tank Cleaning", img: service4 },
    { id: 5, name: "Drain Cleaning", img: service5 },
    { id: 6, name: "Toilet Repair", img: service6 },
  ];

  const carpenterServices = [
    { id: 1, name: "Cupboard & Drawer", img: carpenter1 },
    { id: 2, name: "Furniture Repair", img: carpenter2 },
    { id: 3, name: "Window & Curtaina", img: carpenter3 },
    { id: 4, name: "Kitchen Fitting", img: carpenter4 },
    { id: 4, name: "Wooden Door", img: carpenter5 },
    { id: 4, name: "Clothes Hanger", img: carpenter6 },
    { id: 4, name: "Bath Fittings & Mirror", img: carpenter7 },
    { id: 4, name: "Shelve & Decor ", img: carpenter8 },
  ];

  // Sub-services for modal
  const subServicesMap = {
    "Tap & Mixer": [
      { id: 1, name: "Tap Repair", price: "₹149", rating: "4.7", reviews: "1.2k", img: tapRepair },
      { id: 2, name: "Mixer Installation", price: "₹199", rating: "4.8", reviews: "980", img: tapInstall },
    ],
    "Basin & Sink": [
      { id: 1, name: "Leakage Fix", price: "₹249", rating: "4.6", reviews: "900", img: basinRepair },
      { id: 2, name: "New Basin Install", price: "₹399", rating: "4.9", reviews: "500", img: basinInstall },
    ],
    "Bath & Shower": [
      { id: 1, name: "Shower Installation", price: "₹299", rating: "4.8", reviews: "780", img: service2 },
      { id: 2, name: "Shower Repair", price: "₹199", rating: "4.6", reviews: "1.1k", img: service2 },
    ],
    "Water Tank Cleaning": [
      { id: 1, name: "Small Tank Cleaning", price: "₹499", rating: "4.5", reviews: "600", img: service4 },
      { id: 2, name: "Large Tank Cleaning", price: "₹799", rating: "4.7", reviews: "350", img: service4 },
    ],
    "Drain Cleaning": [
      { id: 1, name: "Kitchen Drain", price: "₹299", rating: "4.5", reviews: "1.2k", img: service5 },
      { id: 2, name: "Bathroom Drain", price: "₹399", rating: "4.7", reviews: "900", img: service5 },
    ],
    "Toilet Repair": [
      { id: 1, name: "Toilet Unclogging", price: "₹299", rating: "4.8", reviews: "1.5k", img: service6 },
      { id: 2, name: "Toilet Replacement", price: "₹899", rating: "4.9", reviews: "700", img: service6 },
    ],
  };

  const options = subServicesMap[selectedService?.name] || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                PLUMBING & CARPENTRY SERVICES
              </h2>
              <p className="mt-2 text-gray-600">
                Reliable home and office plumbing and carpentry repair & installation services.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-20">
            <img
              src={plumberImg}
              alt="Plumbing & Carpentry"
              className="w-[300px] md:w-[400px] lg:w-[450px]"
            />
          </div>
        </div>
      </section>

      {/* Plumbing Services Section */}
      <section className="py-12 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Plumbing Services
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {plumbingServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`flex flex-col items-center border rounded-lg p-4 hover:shadow-md transition cursor-pointer ${
                selectedService?.id === service.id ? "border-[#023E8A]" : ""
              }`}
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-24 h-24 object-contain"
              />
              <p className="mt-3 text-gray-700 font-medium">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carpenter Services Section */}
      <section className="py-12 px-6 md:px-16 bg-[#F9FAFB]">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 text-left">
          Carpenter Services
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {carpenterServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center border rounded-lg p-4 hover:shadow-md transition"
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-24 h-24 object-contain"
              />
              <p className="mt-3 text-gray-700 font-medium">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Plumbing Services */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h3 className="text-xl font-bold mb-2">{selectedService.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Choose a service below</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((srv) => (
                <div
                  key={srv.id}
                  className="border rounded-lg p-4 hover:shadow-md flex flex-col items-center"
                >
                  <img
                    src={srv.img}
                    alt={srv.name}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <h4 className="text-sm font-semibold">{srv.name}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="ml-1 text-gray-500">({srv.reviews})</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    starts at {srv.price}
                  </p>
                  <button className="mt-3 px-3 py-1 text-sm bg-[#023E8A] text-white rounded-md hover:bg-[#0353a4]">
                    View details
                  </button>
                </div>
              ))}
              {options.length === 0 && (
                <p className="text-sm text-gray-500 col-span-2">
                  No sub-services available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlumCarpenter;
