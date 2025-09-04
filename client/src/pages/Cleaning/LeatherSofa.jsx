import React, { useState } from "react";

// Images
import manImg from "../../assets/cleaningHero.png";
import sofaImg from "../../assets/sofa.png";

// Leather Sofa Service Images
import leather1 from "../../assets/leather1.png";
import leather2 from "../../assets/leather2.png";
import leather3 from "../../assets/leather3.png";

// Other Services (optional)
import other1 from "../../assets/otherClean1.png";
import other2 from "../../assets/otherClean2.png";

// Modal Service Options
const modalServices = [
  { id: 1, name: "Leather Sofa Cleaning - 3 Seater", price: "₹999", discount: "15% Off" },
  { id: 2, name: "Leather Sofa Conditioning - 5 Seater", price: "₹1499", discount: "20% Off" },
  { id: 3, name: "Stain & Odor Removal", price: "₹799", discount: "10% Off" },
];

const leatherServices = [
  {
    id: 1,
    name: "Full Leather Sofa Cleaning",
    price: "₹999",
    rating: "4.9",
    reviews: "1120",
    img: leather1,
  },
  {
    id: 2,
    name: "Leather Sofa Deep Conditioning",
    price: "₹1299",
    rating: "4.8",
    reviews: "890",
    img: leather2,
  },
  {
    id: 3,
    name: "Stain & Odor Removal",
    price: "₹799",
    rating: "4.7",
    reviews: "765",
    img: leather3,
  },
];

const otherServices = [
  { id: 1, name: "Balcony Cleaning", price: "₹299", rating: "4.7", reviews: "526", img: other1 },
  { id: 2, name: "Window Cleaning", price: "₹399", rating: "4.8", reviews: "763", img: other2 },
];

const LeatherSofa = () => {
  const [quantities, setQuantities] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  const appliances = [
    { id: 1, name: "Leather Sofa", img: sofaImg },
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
            <h2 className="text-2xl font-bold text-gray-800">Leather Sofa Cleaning</h2>
            <p className="text-gray-600 mt-2">
              Premium cleaning and conditioning services for leather sofas.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={manImg} alt="Leather Sofa Cleaning" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>

      {/* Appliances Section */}
      <section className="py-10 px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {appliances.map((item) => (
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

      {/* Leather Services Section */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Our Leather Sofa Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {leatherServices.map((service) => (
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
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View details</a>
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
        <p className="text-gray-600 mb-5 text-sm">Quick Cleaning Tasks</p>
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
                <a href="#" className="text-blue-600 text-xs font-medium hover:underline block mt-1">View details</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] md:w-[900px] relative">
            <button onClick={() => setSelectedService(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
            <h3 className="text-2xl font-bold mb-1">{selectedService.name} Cleaning</h3>
            <p className="text-sm text-gray-500 mb-4">⭐ 4.8 (2.1k bookings)</p>
            <h4 className="text-lg font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {modalServices.map((srv) => (
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

export default LeatherSofa;
