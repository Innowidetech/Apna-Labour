// src/pages/AirConditioner.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import manImg from "../assets/air.png"; 
import acImg from "../assets/ac.png"; 
import washingMachineImg from "../assets/washing.png";
import tvImg from "../assets/tv.png";
import laptopImg from "../assets/laptop.png";
import coolerImg from "../assets/cooler.png";
import geyserImg from "../assets/geyser.png";

import repair1 from "../assets/ac1.png";
import repair2 from "../assets/repair1.png";
import repair3 from "../assets/repair2.png";

import other1 from "../assets/other1.png";
import other2 from "../assets/other2.jpg";
import other3 from "../assets/other3.png";
import other4 from "../assets/other4.png";

const services = [
  { id: 1, name: "AC Service", img: acImg, price: "₹2736", discount: "17% Off" },
  { id: 2, name: "AC Gas Refill", img: acImg, price: "₹2736", discount: "17% Off" },
  { id: 3, name: "AC Installation", img: acImg, price: "₹2736", discount: "17% Off" },
  { id: 4, name: "AC Repair", img: acImg, price: "₹2736", discount: "17% Off" },
];

const repairGasServices = [
  { id: 1, name: "Regular ceiling fan installation", price: "₹149", rating: "4.8", reviews: "3826", img: repair1 },
  { id: 2, name: "AC noise/smell repair", price: "₹499", rating: "4.8", reviews: "4908", img: repair2 },
  { id: 3, name: "AC water leakage repair", price: "₹599", rating: "4.8", reviews: "4908", img: repair2 },
  { id: 4, name: "Gas refill & check-up", price: "₹2599", rating: "4.8", reviews: "4908", img: repair3 },
];

const otherServices = [
  { id: 1, name: "Foam jet service", price: "₹449", rating: "4.8", reviews: "3263", img: other1 },
  { id: 2, name: "Lite AC service", price: "₹499", rating: "4.8", reviews: "3263", img: other2 },
];

const AirConditioner = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [quantities, setQuantities] = useState({});

  const location = useLocation();

  // refs for sections
  const repairRef = useRef(null);
  const otherRef = useRef(null);
  const installRef = useRef(null);

  useEffect(() => {
    if (location.state?.section) {
      const section = location.state.section.toLowerCase();
      if (section.includes("repair") || section.includes("gas")) {
        repairRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (section.includes("installation")) {
        installRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (section.includes("service")) {
        otherRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  const appliances = [
    { id: 1, name: "AC", img: acImg },
    { id: 2, name: "Washing Machine", img: washingMachineImg },
    { id: 3, name: "Television", img: tvImg },
    { id: 4, name: "Laptop", img: laptopImg },
    { id: 5, name: "Air Cooler", img: coolerImg },
    { id: 6, name: "Geyser", img: geyserImg },
  ];

  const handleQuantity = (id, type) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      if (type === "increase") {
        return { ...prev, [id]: currentQty + 1 };
      } else if (type === "decrease" && currentQty > 0) {
        return { ...prev, [id]: currentQty - 1 };
      }
      return prev;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">Air Conditioner</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img
              src={manImg}
              alt="Appliance Repair"
              className="max-w-xs md:max-w-sm lg:max-w-md self-end"
            />
          </div>
        </div>
      </section>

      {/* Appliances Section */}
      <section className="py-10 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {appliances.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAppliance(item)}
              className="cursor-pointer p-4 flex flex-col items-center"
            >
              <img src={item.img} alt={item.name} className="w-32 h-32 object-contain" />
              <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Repair & Gas Refill Section */}
      <section ref={repairRef} className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Repair & Gas Refill</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {repairGasServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden hover:shadow-md transition"
            >
              <div className="flex items-center justify-center p-4">
                <img src={service.img} alt={service.name} className="h-40 object-contain" />
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-1 text-gray-500">({service.reviews})</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-gray-900">{service.name}</h4>
                <p className="text-sm text-gray-700 mt-1">starts at {service.price}</p>
                <div className="mt-3 flex justify-between items-center">
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                    View details
                  </a>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantity(service.id, "decrease")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      -
                    </button>
                    <span>{quantities[service.id] || "01"}</span>
                    <button
                      onClick={() => handleQuantity(service.id, "increase")}
                      className="px-2 py-1 border rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Assistance Section */}
      <section ref={otherRef} className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Other Assistance</h3>
        <p className="text-gray-600 mb-5 text-sm">Service</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherServices.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 shadow-sm bg-[#86A8E71A] overflow-hidden hover:shadow-md transition"
            >
              <div className="flex items-center justify-center">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-28 object-cover"
                />
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center text-xs text-gray-600">
                  <span className="text-yellow-500 text-sm">★★★★★</span>
                  <span className="ml-1 text-gray-500">({service.reviews})</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-gray-900 truncate">
                  {service.name}
                </h4>
                <p className="text-xs text-gray-700 mt-1">starts at {service.price}</p>
                <a
                  href="#"
                  className="text-blue-600 text-xs font-medium hover:underline block mt-1"
                >
                  View details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Installation/Deinstallation Section */}
      <section ref={installRef} className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-6">Installation/Deinstallation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { id: 1, name: "Split AC installation", price: "₹1699", reviews: "3826", rating: "4.5", img: other3 },
            { id: 2, name: "Window AC installation", price: "₹1099", reviews: "3826", rating: "4.5", img: other4 },
            { id: 3, name: "Window AC deinstallation", price: "₹699", reviews: "3826", rating: "4.5", img: other4 },
            { id: 4, name: "Split AC deinstallation", price: "₹899", reviews: "3826", rating: "4.5", img: other3 },
          ].map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 shadow-sm bg-[#86A8E71A] overflow-hidden hover:shadow-md transition"
            >
              <div className="flex items-center justify-center">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-1 text-gray-500">({service.reviews})</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-gray-900">{service.name}</h4>
                <p className="text-sm text-gray-700 mt-1">starts at {service.price}</p>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:underline block mt-1"
                >
                  View details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AirConditioner;
