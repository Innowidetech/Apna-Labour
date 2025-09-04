// src/pages/Sanitization.jsx
import React, { useState } from "react";

// Hero Image & Sanitization Images
import heroImg from "../../assets/cleaningHero.png";
import homeImg from "../../assets/fullHome.png";
import officeImg from "../../assets/office.png";
import carImg from "../../assets/car.png";
import bathroomImg from "../../assets/bathroom.png";
import kitchenImg from "../../assets/kitchen.png";

// Service Images
import sanitize1 from "../../assets/sanitize1.png";
import sanitize2 from "../../assets/sanitize2.png";
import sanitize3 from "../../assets/sanitize3.png";

import other1 from "../../assets/otherSanitize1.png";
import other2 from "../../assets/otherSanitize2.png";

const services = [
  { id: 1, name: "Full Home Sanitization", price: "₹1499", discount: "20% Off" },
  { id: 2, name: "Office Sanitization", price: "₹2499", discount: "25% Off" },
  { id: 3, name: "Car Sanitization", price: "₹699", discount: "15% Off" },
  { id: 4, name: "Kitchen Sanitization", price: "₹499", discount: "10% Off" },
];

const popularSanitization = [
  { id: 1, name: "Disinfection Spray", price: "₹899", rating: "4.9", reviews: "1210", img: sanitize1 },
  { id: 2, name: "Antiviral Treatment", price: "₹1299", rating: "4.8", reviews: "980", img: sanitize2 },
  { id: 3, name: "Eco-friendly Sanitization", price: "₹1099", rating: "4.7", reviews: "1135", img: sanitize3 },
];

const otherServices = [
  { id: 1, name: "Bathroom Sanitization", price: "₹399", rating: "4.7", reviews: "642", img: other1 },
  { id: 2, name: "Kitchen Sanitization", price: "₹499", rating: "4.8", reviews: "821", img: other2 },
];

const Sanitization = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [quantities, setQuantities] = useState({});

  const categories = [
    { id: 1, name: "Home", img: homeImg },
    { id: 2, name: "Office", img: officeImg },
    { id: 3, name: "Car", img: carImg },
    { id: 4, name: "Kitchen", img: kitchenImg },
    { id: 5, name: "Bathroom", img: bathroomImg },
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
            <h2 className="text-2xl font-bold text-gray-800">Sanitization Services</h2>
            <p className="text-gray-600 mt-2">
              Keep your home, office, and car germ-free with safe sanitization.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={heroImg} alt="Sanitization" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className="cursor-pointer p-4 flex flex-col items-center"
            >
              <img src={item.img} alt={item.name} className="w-44 h-32 object-contain p-4 border border-gray-300" />
              <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Sanitization Services */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Popular Sanitization Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularSanitization.map((service) => (
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
                    onClick={() => setSelectedService(service)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleQuantity(service.id, "decrease")} className="px-2 py-1 border rounded-lg">-</button>
                    <span>{quantities[service.id] || "01"}</span>
                    <button onClick={() => handleQuantity(service.id, "increase")} className="px-2 py-1 border rounded-lg">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Assistance */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h3 className="text-lg font-semibold mb-1">Other Assistance</h3>
        <p className="text-gray-600 mb-5 text-sm">Quick Sanitization Tasks</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherServices.map((service) => (
            <div key={service.id} className="rounded-lg border border-gray-200 shadow-sm bg-[#86A8E71A] overflow-hidden hover:shadow-md transition">
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
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-blue-600 text-xs font-medium hover:underline block mt-1"
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] md:w-[900px] relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-1">{selectedService.name} Sanitization</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.8 (3.4k bookings)</p>
            <h4 className="text-lg font-semibold mb-3">Select a Package</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-4 border rounded-xl shadow-sm hover:shadow-md flex flex-col items-center text-center">
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

export default Sanitization;
