// src/pages/Geyser.jsx
import React, { useState } from "react";

// Hero & Appliances
import geyserHero from "../../assets/geyserHero.png";
import acImg from "../../assets/ac.png";
import washingMachineImg from "../../assets/washing.png";
import tvImg from "../../assets/tv.png";
import laptopImg from "../../assets/laptop.png";
import coolerImg from "../../assets/cooler.png";
import geyserImg from "../../assets/geyser.png";

// Geyser Services Images
import geyserRepair1 from "../../assets/geyserRepair1.png";
import geyserRepair2 from "../../assets/geyserRepair2.png";
import geyserRepair3 from "../../assets/geyserRepair3.png";

import geyserPipeImg from "../../assets/geyserPipe.png";
import geyserCleaningImg from "../../assets/geyserCleaning.png";

// Services
const services = [
  { id: 1, name: "Heating Element Replacement", img: geyserImg, price: "₹899", discount: "10% Off" },
  { id: 2, name: "Thermostat Repair", img: geyserImg, price: "₹1099", discount: "12% Off" },
  { id: 3, name: "Tank Leakage Fix", img: geyserImg, price: "₹1499", discount: "15% Off" },
  { id: 4, name: "General Servicing", img: geyserImg, price: "₹599", discount: "8% Off" },
];

const repairGeyserServices = [
  { id: 1, name: "Not Heating Water", price: "₹799", rating: "4.8", reviews: "920", img: geyserRepair1 },
  { id: 2, name: "Water Leakage Issue", price: "₹999", rating: "4.7", reviews: "1050", img: geyserRepair2 },
  { id: 3, name: "Noisy Operation", price: "₹899", rating: "4.6", reviews: "860", img: geyserRepair3 },
  { id: 4, name: "Complete Overhaul", price: "₹1799", rating: "4.9", reviews: "1280", img: geyserRepair1 },
];

const otherServices = [
  { id: 1, name: "Pipe Replacement", price: "₹499", rating: "4.8", reviews: "400", img: geyserPipeImg },
  { id: 2, name: "Deep Cleaning", price: "₹699", rating: "4.7", reviews: "550", img: geyserCleaningImg },
];

const Geyser = () => {
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
            <h2 className="text-2xl font-bold text-gray-800">Geyser Repair</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={geyserHero} alt="Geyser Repair" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
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

      {/* Diagnosis Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Diagnosis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {repairGeyserServices.map((service) => (
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
                    onClick={() => alert("Showing more details for: " + service.name)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => openModal(service)}
                    className="bg-[#023E8A] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#022B5A]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Services */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Additional Services</h3>
        <p className="text-gray-600 mb-5 text-sm">Geyser Maintenance</p>
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
                    onClick={() => alert("Showing more details for: " + service.name)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => openModal(service)}
                    className="bg-[#023E8A] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#022B5A]"
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
            <h3 className="text-2xl font-bold mb-1">{selectedAppliance.name} Services</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.75 (7.2k bookings)</p>
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

export default Geyser;
