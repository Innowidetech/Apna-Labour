import React, { useState } from "react";
// Hero & Appliances

import acImg from "../../assets/ac.png";
import washingMachineImg from "../../assets/washing.png";
import tvImg from "../../assets/tv.png";
import laptopImg from "../../assets/laptop.png";
import coolerImg from "../../assets/cooler.png";
import geyserImg from "../../assets/geyser.png";
// Image imports
import manImg from "../../assets/television.png";
import repair1 from "../../assets/repair-1.png";
import repair2 from "../../assets/repair-2.png";
import tvRepair from "../../assets/tv-repair.png";
import installImg from "../../assets/other3.png";
import uninstallImg from "../../assets/other4.png";

// Services for modal popup
const tvServices = [
  { id: 1, name: "Screen Replacement", img: manImg, price: "₹2499", discount: "10% Off" },
  { id: 2, name: "Panel Repair", img: manImg, price: "₹1799", discount: "12% Off" },
  { id: 3, name: "Sound Issue Fix", img: manImg, price: "₹1299", discount: "8% Off" },
  { id: 4, name: "Power Supply Repair", img: manImg, price: "₹1599", discount: "15% Off" },
  { id: 5, name: "Picture Quality Adjustment", img: manImg, price: "₹999", discount: "11% Off" },
  { id: 6, name: "Motherboard Replacement", img: manImg, price: "₹2999", discount: "10% Off" },
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
  { id: 1, name: "Screen Flickering Repair", price: "₹1999", rating: "4.8", reviews: "3843", img: repair1 },
  { id: 2, name: "No Sound Fix", price: "₹1599", rating: "4.7", reviews: "3214", img: repair2 },
  { id: 3, name: "Panel Replacement", price: "₹2499", rating: "4.6", reviews: "2104", img: tvRepair },
  { id: 4, name: "Remote Control Troubleshooting", price: "₹899", rating: "4.6", reviews: "1732", img: repair1 },
  { id: 5, name: "Power Button Repair", price: "₹799", rating: "4.7", reviews: "2904", img: repair2 },
];

// Installation / Uninstallation services
const installServices = [
  { id: 1, name: "TV Installation", price: "₹699", rating: "4.8", reviews: "4200", img: installImg },
  { id: 2, name: "TV Uninstallation", price: "₹399", rating: "4.7", reviews: "3400", img: uninstallImg },
];

const Television = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const openModal = (service) => {
    setSelectedAppliance(service);
  };
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  

  const sortedServices = [...tvServices].sort((a, b) => {
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
            <h2 className="text-2xl font-bold text-gray-800">Television</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={manImg} alt="Television" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
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
        <h3 className="text-xl font-semibold mb-8">Check-up</h3>
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

            <h4 className="text-lg font-semibold mb-3">Choose Service:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden hover:shadow-md transition"
                >
                  <div className="flex items-center justify-center p-4">
                    <img src={service.img} alt={service.name} className="h-40 object-contain" />
                  </div>
                  <div className="px-4 py-3">
                    <h4 className="mt-1 text-sm font-semibold text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-700 mt-1">{service.price}</p>
                    <p className="text-sm text-gray-600 mt-1">{service.discount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Television;
