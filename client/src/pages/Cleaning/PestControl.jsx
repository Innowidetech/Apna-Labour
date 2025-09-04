import React, { useState } from "react";

// Hero & Images
import pestHero from "../../assets/pestHero.png"; 
import termiteImg from "../../assets/termite.png";
import cockroachImg from "../../assets/cockroach.png";
import mosquitoImg from "../../assets/mosquito.png";
import bedbugImg from "../../assets/bedbug.png";
import rodentImg from "../../assets/rodent.png";

// Service Images
import pest1 from "../../assets/pest1.png";
import pest2 from "../../assets/pest2.png";
import pest3 from "../../assets/pest3.png";
import pest4 from "../../assets/pest4.png";

const services = [
  { id: 1, name: "Cockroach Control", price: "₹799", discount: "20% Off" },
  { id: 2, name: "Termite Treatment", price: "₹2499", discount: "25% Off" },
  { id: 3, name: "Mosquito Fogging", price: "₹1199", discount: "15% Off" },
  { id: 4, name: "Bed Bug Treatment", price: "₹1499", discount: "10% Off" },
];

const pestControlServices = [
  { id: 1, name: "Rodent Control", price: "₹999", rating: "4.8", reviews: "560", img: pest1 },
  { id: 2, name: "Ant Control", price: "₹699", rating: "4.7", reviews: "430", img: pest2 },
  { id: 3, name: "Termite Drilling Treatment", price: "₹2999", rating: "4.9", reviews: "320", img: pest3 },
  { id: 4, name: "General Pest Control (Full Home)", price: "₹1999", rating: "4.9", reviews: "800", img: pest4 },
];

const PestControl = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [quantities, setQuantities] = useState({});

  const categories = [
    { id: 1, name: "Cockroach", img: cockroachImg },
    { id: 2, name: "Termite", img: termiteImg },
    { id: 3, name: "Mosquito", img: mosquitoImg },
    { id: 4, name: "Bed Bugs", img: bedbugImg },
    { id: 5, name: "Rodent", img: rodentImg },
  ];

  const handleQuantity = (id, type) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      if (type === "increase") return { ...prev, [id]: currentQty + 1 };
      if (type === "decrease" && currentQty > 0) return { ...prev, [id]: currentQty - 1 };
      return prev;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800">Pest Control Services</h2>
            <p className="text-gray-600 mt-2">
              Safe & effective pest treatments for your home and office.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={pestHero} alt="Pest Control" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className="cursor-pointer p-4 flex flex-col items-center"
            >
              <img src={item.img} alt={item.name} className="w-44 h-32 object-contain p-4 border border-gray-300" />
              <p className="mt-3 font-medium text-[#2C5F2D] text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pest Control Services */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Popular Pest Control</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pestControlServices.map((service) => (
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
                  <a href="#" className="text-green-600 text-sm font-medium hover:underline">
                    View details
                  </a>
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
            <h3 className="text-2xl font-bold mb-1">{selectedService.name} Control</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.8 (3k+ bookings)</p>
            <h4 className="text-lg font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-4 border rounded-xl shadow-sm hover:shadow-md flex flex-col items-center text-center">
                  <h5 className="font-medium text-gray-700">{srv.name}</h5>
                  <p className="text-lg font-bold text-[#2C5F2D] mt-2">{srv.price}</p>
                  <p className="text-green-600 text-sm">{srv.discount}</p>
                  <button className="mt-3 px-4 py-2 bg-[#2C5F2D] text-white text-sm rounded-lg hover:bg-green-700">
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

export default PestControl;
