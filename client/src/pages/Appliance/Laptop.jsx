// src/pages/Laptop.jsx
import React, { useState } from "react";

// Hero & Appliances
import manImg from "../../assets/laptopHero.png";
import acImg from "../../assets/ac.png";
import washingMachineImg from "../../assets/washing.png";
import tvImg from "../../assets/tv.png";
import laptopImg from "../../assets/laptop.png";
import coolerImg from "../../assets/cooler.png";
import geyserImg from "../../assets/geyser.png";

// Laptop Services Images
import laptopRepaire1 from "../../assets/laptopRepaire1.png";
import laptopRepaire2 from "../../assets/laptopRepaire2.png";
import laptopRepaire3 from "../../assets/laptopRepaire3.png";

import antivirusInstall from "../../assets/antivirusInstall.png";
import laptopRecovery1 from "../../assets/laptopRecovery1.png";

const services = [
  { id: 1, name: "Laptop Screen Replacement", img: laptopImg, price: "₹3999", discount: "10% Off" },
  { id: 2, name: "Laptop Keyboard Repair", img: laptopImg, price: "₹1499", discount: "12% Off" },
  { id: 3, name: "Laptop Battery Replacement", img: laptopImg, price: "₹2499", discount: "15% Off" },
  { id: 4, name: "General Laptop Repair", img: laptopImg, price: "₹999", discount: "8% Off" },
];

const repairLaptopServices = [
  { id: 1, name: "Laptop not turning on", price: "₹799", rating: "4.8", reviews: "1280", img: laptopRepaire1 },
  { id: 2, name: "Overheating issue", price: "₹999", rating: "4.7", reviews: "1570", img: laptopRepaire2 },
  { id: 3, name: "Software installation", price: "₹599", rating: "4.9", reviews: "1865", img: laptopRepaire3 },
  { id: 4, name: "Motherboard repair", price: "₹3499", rating: "4.6", reviews: "920", img: laptopRepaire1 },
];

const otherServices = [
  { id: 1, name: "Antivirus Installation", price: "₹499", rating: "4.8", reviews: "876", img: antivirusInstall },
  { id: 2, name: "Data Recovery", price: "₹1999", rating: "4.7", reviews: "456", img: laptopRecovery1 },
];

const Laptop = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  
  const appliances = [
    { id: 1, name: "AC", img: acImg },
    { id: 2, name: "Washing Machine", img: washingMachineImg },
    { id: 3, name: "Television", img: tvImg },
    { id: 4, name: "Laptop", img: laptopImg },
    { id: 5, name: "Air Cooler", img: coolerImg },
    { id: 6, name: "Geyser", img: geyserImg },
  ];

  

  const openModal = (service) => {
    setSelectedAppliance(service);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">Laptop Repair</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={manImg} alt="Laptop Repair" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>

      {/* Appliances Section */}
      <section className="py-10 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {appliances.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer p-4 flex flex-col items-center"
            >
              <img src={item.img} alt={item.name} className="w-32 h-32 object-contain" />
              <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Laptop Repair Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Diagnosis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {repairLaptopServices.map((service) => (
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
                  <button
                    onClick={() => alert("View details for: " + service.name)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => openModal(service)}
                    className="bg-[#023E8A] text-white text-sm px-4 py-1 rounded-lg hover:bg-[#022B5A]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Assistance */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Repaire</h3>
        <p className="text-gray-600 mb-5 text-sm">Laptop Services</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherServices.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 shadow-sm bg-[#86A8E71A] overflow-hidden hover:shadow-md transition"
            >
              <div className="flex items-center justify-center">
                <img src={service.img} alt={service.name} className="w-full h-28 object-cover" />
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center text-xs text-gray-600">
                  <span className="text-yellow-500 text-sm">★★★★★</span>
                  <span className="ml-1 text-gray-500">({service.reviews})</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-gray-900 truncate">{service.name}</h4>
                <p className="text-xs text-gray-700 mt-1">starts at {service.price}</p>
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => alert("View details for: " + service.name)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => openModal(service)}
                    className="bg-[#023E8A] text-white text-sm px-4 py-1 rounded-lg hover:bg-[#022B5A]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedAppliance && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setSelectedAppliance(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[95%] md:w-[900px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAppliance(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-1">{selectedAppliance.name} Repair</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.76 (11.0k bookings)</p>
            <h4 className="text-lg font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 border rounded-xl shadow-sm hover:shadow-md flex flex-col items-center text-center"
                >
                  <h5 className="font-medium text-gray-700">{srv.name}</h5>
                  <p className="text-lg font-bold text-[#023E8A] mt-2">{srv.price}</p>
                  <p className="text-green-600 text-sm">{srv.discount}</p>
                  <button className="mt-3 px-4 py-2 bg-[#86A8E7] text-white text-sm rounded-lg hover:bg-blue-700">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Laptop;
