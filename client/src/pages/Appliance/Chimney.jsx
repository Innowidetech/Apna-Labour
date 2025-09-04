// src/pages/Chimney.jsx
import React, { useState } from "react";
import chimneyHero from "../../assets/chimneyHero.png"; 
import stove from "../../assets/stove.png";
import purifier from "../../assets/purifier.png";
import microwaveImg from "../../assets/microwave.png";
import fridgeImg from "../../assets/fridge.png";
import chimneyImg from "../../assets/chimney.png";
import chimneyRepair1 from "../../assets/chimneyRepair.png";
import chimneyRepair2 from "../../assets/chimneyRepair2.png";
import chimneyRepair3 from "../../assets/chimneyRepair3.png";
import chimneyPipeImg from "../../assets/chimneyPipe.png";
import chimneyCleaningImg from "../../assets/chimneyCleaning.png";
import chimneyInstallImg from "../../assets/chimneyInstall.png";
import chimneyUninstallImg from "../../assets/chimneyUninstall.png";

// Services

const kitchenAppliances = [
    { id: 1, name: "Chimney", img: chimneyImg },
    { id: 2, name: "Microwave", img: microwaveImg },
    { id: 3, name: "Refrigerator", img: fridgeImg },
    { id: 4, name: "Stove", img: stove },
    { id: 4, name: "Water Purifier", img: purifier },
  ];

const services = [
  { id: 1, name: "Motor Replacement", img: chimneyImg, price: "₹1299", discount: "10% Off" },
  { id: 2, name: "Switch Panel Repair", img: chimneyImg, price: "₹899", discount: "12% Off" },
  { id: 3, name: "Duct Fix / Leakage", img: chimneyImg, price: "₹1499", discount: "15% Off" },
  { id: 4, name: "General Servicing", img: chimneyImg, price: "₹699", discount: "8% Off" },
];

const repairChimneyServices = [
  { id: 1, name: "Not Sucking Smoke", price: "₹999", rating: "4.8", reviews: "920", img: chimneyRepair1 },
  { id: 2, name: "Noise / Vibration Issue", price: "₹1199", rating: "4.7", reviews: "1050", img: chimneyRepair2 },
  { id: 3, name: "Switches Not Working", price: "₹899", rating: "4.6", reviews: "860", img: chimneyRepair3 },
  { id: 4, name: "Complete Overhaul", price: "₹1999", rating: "4.9", reviews: "1280", img: chimneyRepair1 },
];

const otherServices = [
  { id: 1, name: "Pipe Replacement", price: "₹699", rating: "4.8", reviews: "400", img: chimneyPipeImg },
  { id: 2, name: "Deep Cleaning", price: "₹899", rating: "4.7", reviews: "550", img: chimneyCleaningImg },
];


const installationServices = [
  { id: 1, name: "Chimney Installation", price: "₹1499", rating: "4.9", reviews: "600", img: chimneyInstallImg },
  { id: 2, name: "Chimney Uninstallation", price: "₹799", rating: "4.8", reviews: "450", img: chimneyUninstallImg },
];

const Chimney = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
const openModal = (service) => {
    setSelectedAppliance(service);
  };

  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">Chimney Repair</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={chimneyHero} alt="Chimney Repair" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>
       <section className="py-10 px-6 md:px-16">
            <h3 className="text-xl font-semibold mb-6">Kitchen Appliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {kitchenAppliances.map((item) => (
                <div key={item.id} className="cursor-pointer p-4 flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-36 h-36 object-contain border border-gray-300 p-4 rounded-2xl" />
                  <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </section>
      {/* Diagnosis Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Deep Cleaning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {repairChimneyServices.map((service) => (
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

      {/* Other Services */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Repair</h3>
        <p className="text-gray-600 mb-5 text-sm">Chimney Maintenance</p>
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

      {/* 🔹 Installation / Uninstallation Services */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Installation / Uninstallation</h3>
        <p className="text-gray-600 mb-5 text-sm">Professional chimney setup & removal</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {installationServices.map((service) => (
            <div
              key={service.id}
              className="rounded-lg border border-gray-200 shadow-sm bg-[#E7F1FD] overflow-hidden hover:shadow-md transition"
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

export default Chimney;
