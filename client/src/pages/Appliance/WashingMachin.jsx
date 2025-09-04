import React, { useState } from "react";

// Image imports
import manImg from "../../assets/washingHero.png";
import washingDrum from "../../assets/washingDrum.png";
import washingWaterLeak from "../../assets/washingWaterLeak.png";
import washingrepaire from "../../assets/washingrepaire.png";
import washingInstall from "../../assets/washingInstall.png";
import washingUninstall from "../../assets/washingUninstall.png";
// Hero & Appliances

import acImg from "../../assets/ac.png";
import washingMachineImg from "../../assets/washing.png";
import tvImg from "../../assets/tv.png";
import laptopImg from "../../assets/laptop.png";
import coolerImg from "../../assets/cooler.png";
import geyserImg from "../../assets/geyser.png";

// Services for modal popup
const wmServices = [
  { id: 1, name: "Front Load Service", img: manImg, price: "₹699", discount: "10% Off" },
  { id: 2, name: "Top Load Service", img: manImg, price: "₹599", discount: "12% Off" },
  { id: 3, name: "Drum Cleaning", img: manImg, price: "₹499", discount: "8% Off" },
  { id: 4, name: "Motor Replacement", img: manImg, price: "₹1499", discount: "15% Off" },
  { id: 5, name: "Full Body Cleaning", img: manImg, price: "₹799", discount: "11% Off" },
  { id: 6, name: "Drain Pump Replacement", img: manImg, price: "₹999", discount: "10% Off" },
];

  const appliances = [
    { id: 1, name: "AC", img: acImg },
    { id: 2, name: "Washing Machine", img: washingMachineImg },
    { id: 3, name: "Television", img: tvImg },
    { id: 4, name: "Laptop", img: laptopImg },
    { id: 5, name: "Air Cooler", img: coolerImg },
    { id: 6, name: "Geyser", img: geyserImg },
  ];


// Repair services section
const repairServices = [
  { id: 1, name: "Drum Noise Repair", price: "₹499", rating: "4.8", reviews: "2843", img: washingDrum },
  { id: 2, name: "Water Leakage Fix", price: "₹699", rating: "4.7", reviews: "2114", img: washingWaterLeak},
  { id: 3, name: "Control Panel Repair", price: "₹899", rating: "4.6", reviews: "1987", img: washingrepaire },
  { id: 4, name: "Spin Cycle Malfunction", price: "₹799", rating: "4.6", reviews: "1732", img:washingDrum },
  { id: 5, name: "Power Issue Troubleshooting", price: "₹649", rating: "4.7", reviews: "1904", img: washingWaterLeak},
];

// Installation / Uninstallation services
const installServices = [
  { id: 1, name: "Washing Machine Installation", price: "₹499", rating: "4.8", reviews: "3200", img: washingInstall },
  { id: 2, name: "Washing Machine Uninstallation", price: "₹299", rating: "4.7", reviews: "2450", img: washingUninstall},
];

const WashingMachine = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
const openModal = (service) => {
    setSelectedAppliance(service);
  };
  const [selectedServiceId, setSelectedServiceId] = useState(null);



  const sortedServices = [...wmServices].sort((a, b) => {
    if (a.id === selectedServiceId) return -1;
    if (b.id === selectedServiceId) return 1;
    return 0;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">Washing Machine</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={manImg} alt="Washing Machine" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
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
      {/* Repair Services Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Repair Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {repairServices.map((service) => (
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

      {/* Installation/Uninstallation Services */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Installation & Uninstallation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {installServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 shadow-sm bg-[#86A8E71A] overflow-hidden hover:shadow-md transition"
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

      {/* Choose Service Button */}
      

      {/* Modal Popup */}
      {selectedAppliance && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] md:w-[900px] relative">
            <button
              onClick={() => setSelectedAppliance(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-1">{selectedAppliance.name} Services</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.76 (9.3k bookings)</p>

            <h4 className="text-lg font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedServices.map((srv) => (
                <div
                  key={srv.id}
                  className={`p-4 border rounded-xl shadow-sm hover:shadow-md flex flex-col items-center text-center ${
                    srv.id === selectedServiceId ? "bg-blue-50 border-blue-500" : ""
                  }`}
                >
                  <img src={srv.img} alt={srv.name} className="h-20 object-contain mb-2" />
                  <h5 className="font-medium text-gray-700">{srv.name}</h5>
                  <p className="text-lg font-bold text-[#023E8A] mt-2">{srv.price}</p>
                  <p className="text-green-600 text-sm">{srv.discount}</p>
                  <button
                    className="mt-3 px-4 py-2 bg-[#86A8E7] text-white text-sm rounded-lg hover:bg-blue-700"
                    onClick={() => setSelectedServiceId(srv.id)}
                  >
                    {srv.id === selectedServiceId ? "Selected" : "Add"}
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

export default WashingMachine;

