// src/pages/ApplianceRepair.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import repairMan from "../assets/repairman.png"; 
import acImg from "../assets/ac.png"; 
import washingMachineImg from "../assets/washing.png";
import tvImg from "../assets/tv.png";
import laptopImg from "../assets/laptop.png";
import coolerImg from "../assets/cooler.png";
import geyserImg from "../assets/geyser.png";
import Service from "../assets/ac1.png";
import Serviceimg from "../assets/ac2.png";
import ServiceImg from "../assets/ac3.png";

// Most Demanding Services images
import fan1 from "../assets/fan1.png";
import fan2 from "../assets/fan2.png";
import doorbell from "../assets/doorbell.png";
import washingMachine from "../assets/washing1.png";
import tv from "../assets/tv1.png";
import cooler from "../assets/cooler1.png";
import ac1 from "../assets/ac-1.png";
import ac2 from "../assets/ac-2.png";

const ApplianceRepair = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const appliances = [
    { id: 1, name: "AC", img: acImg },
    { id: 2, name: "Washing Machine", img: washingMachineImg },
    { id: 3, name: "Television", img: tvImg },
    { id: 4, name: "Laptop", img: laptopImg },
    { id: 5, name: "Air Cooler", img: coolerImg },
    { id: 6, name: "Geyser", img: geyserImg },
  ];

  const services = [
    { id: 1, name: "Service", img: Service, path: "/air-conditioner" }, 
    { id: 2, name: "Repair & Gas Refill", img: Serviceimg, path: "/air-conditioner" },
    { id: 3, name: "Installation/Uninstallation", img: ServiceImg, path: "/air-conditioner" },
  ];

  const demandingServices = [
    { id: 1, name: "Regular ceiling fan installation", price: "₹149", rating: "4.8", reviews: "3286", img: fan1 },
    { id: 2, name: "Decorative fan installation", price: "₹199", rating: "4.8", reviews: "3286", img: fan2 },
    { id: 3, name: "Regular doorbell installation", price: "₹99", rating: "4.8", reviews: "3286", img: doorbell },
    { id: 4, name: "Automatic top load machine", price: "₹199", rating: "4.8", reviews: "3286", img: washingMachine },
    { id: 5, name: "TV Check-up", price: "₹249", rating: "4.8", reviews: "3286", img: tv },
    { id: 6, name: "Air cooler service", price: "₹599", rating: "4.8", reviews: "3286", img: cooler },
    { id: 7, name: "Foam jet AC service", price: "₹599", rating: "4.8", reviews: "3286", img: ac1 },
    { id: 8, name: "AC No cooling repair", price: "₹299", rating: "4.8", reviews: "3286", img: ac2 },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">APPLIANCE REPAIR</h2>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img
              src={repairMan}
              alt="Appliance Repair"
              className="max-w-xs md:max-w-sm lg:max-w-md self-end"
            />
          </div>
        </div>
      </section>

      {/* Appliances Section */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Choose an Appliance</h3>
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

      {/* Most Demanding Services Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Most Demanding Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {demandingServices.map((service) => (
            <div
              key={service.id}
              className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition"
            >
              {/* Service Image */}
              <div className="flex items-center justify-center p-4">
                <img
                  src={service.img}
                  alt={service.name}
                  className="h-40 object-contain"
                />
              </div>

              {/* Bottom Content */}
              <div className="bg-[#86A8E71A] px-4 py-3">
                {/* Rating */}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-1 text-gray-500">({service.reviews})</span>
                </div>

                {/* Service Name */}
                <h4 className="mt-1 text-sm font-semibold text-gray-900">
                  {service.name}
                </h4>

                {/* Price + Link */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-700">starts at {service.price}</p>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Service Selection */}
      {selectedAppliance && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedAppliance(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Appliance Title */}
            <h3 className="text-xl font-bold mb-2">{selectedAppliance.name}</h3>
            <p className="text-sm text-gray-500 mb-4">4.7 ★ (11.0k bookings)</p>

            {/* Services */}
            <h4 className="text-md font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-3 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => navigate(srv.path, { state: { section: srv.name } })} 
                  className="cursor-pointer p-3 border rounded-lg flex flex-col items-center hover:shadow-md"
                >
                  <img src={srv.img} alt={srv.name} className="w-16 h-16 object-contain" />
                  <p className="mt-2 text-sm font-medium text-center">{srv.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplianceRepair;
