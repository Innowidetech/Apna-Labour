// src/pages/MenSalon/Menicure.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImg from "../../assets/pedicure.jpg"; // hero image
import menicureImg from "../../assets/menicure.jpg";
import pedicureImg from "../../assets/pedicure.jpg";
import spaImg from "../../assets/spa.jpg";
import luxuryImg from "../../assets/spa1.jpg";
import facialImg from "../../assets/facial.jpg";
import haircutImg from "../../assets/salon.jpg";

const Menicure = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Services
  const exploreServices = [
    {
      id: 1,
      name: "Hair & Beard",
      img: haircutImg,
      path: "/mensalon/haircut",
    },
    {
      id: 2,
      name: "Detan & Facial",
      img: facialImg,
      path: "/mensalon/detan",
    },
    {
      id: 3,
      name: "Manicure & Pedicure",
      img: menicureImg,
      path: "/mensalon/menicure",
    },
  ];

  // ✅ Manicure Services
  const manicureServices = [
    {
      id: 1,
      title: "Classic Manicure",
      price: "₹499",
      rating: "★★★★☆",
      description: "Hand soak, nail shaping, cuticle care, scrub & massage.",
      img: menicureImg,
      options: [
        { name: "Basic Manicure", price: "₹499" },
        { name: "Luxury Manicure", price: "₹799" },
      ],
    },
    {
      id: 2,
      title: "Spa Manicure",
      price: "₹899",
      rating: "★★★★★",
      description: "Relaxing manicure with massage & hydrating mask.",
      img: spaImg,
      options: [
        { name: "Spa Manicure", price: "₹899" },
        { name: "Deluxe Spa Manicure", price: "₹1299" },
      ],
    },
  ];

  // ✅ Pedicure Services
  const pedicureServices = [
    {
      id: 1,
      title: "Classic Pedicure",
      price: "₹699",
      rating: "★★★★☆",
      description: "Foot soak, nail shaping, scrub, massage & hydration.",
      img: pedicureImg,
      options: [
        { name: "Basic Pedicure", price: "₹699" },
        { name: "Luxury Pedicure", price: "₹999" },
      ],
    },
    {
      id: 2,
      title: "Spa Pedicure",
      price: "₹1199",
      rating: "★★★★★",
      description: "Exfoliation, massage, mask & luxury pedicure experience.",
      img: luxuryImg,
      options: [
        { name: "Spa Pedicure", price: "₹1199" },
        { name: "Deluxe Spa Pedicure", price: "₹1599" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-8 md:py-12 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[220px]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              MEN SALON & GROOMING
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Professional manicure & pedicure services at home.
            </p>
          </div>
          <img src={menImg} alt="Men Salon" className="w-40 md:w-56 object-contain" />
        </div>
      </section>

      {/* 🔹 Explore Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Salon Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {exploreServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate(srv.path)}
              className="cursor-pointer p-4 flex flex-col items-center border rounded-md hover:shadow-lg transition"
            >
              <img
                src={srv.img}
                alt={srv.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <p className="mt-2 font-medium text-[#023E8A]">{srv.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Manicure Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Manicure Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {manicureServices.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img src={srv.img} alt={srv.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <p className="text-sm text-yellow-500">{srv.rating}</p>
              <h4 className="font-semibold text-gray-800">{srv.title}</h4>
              <p className="text-sm text-gray-600">starts at {srv.price}</p>
              <p className="text-sm text-gray-500 mt-1">{srv.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <button onClick={() => setSelectedService(srv)} className="text-blue-600 text-sm font-medium hover:underline">
                  View details
                </button>
                <button onClick={() => setBookingService(srv)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Pedicure Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Pedicure Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pedicureServices.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img src={srv.img} alt={srv.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <p className="text-sm text-yellow-500">{srv.rating}</p>
              <h4 className="font-semibold text-gray-800">{srv.title}</h4>
              <p className="text-sm text-gray-600">starts at {srv.price}</p>
              <p className="text-sm text-gray-500 mt-1">{srv.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <button onClick={() => setSelectedService(srv)} className="text-blue-600 text-sm font-medium hover:underline">
                  View details
                </button>
                <button onClick={() => setBookingService(srv)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 View Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <img src={selectedService.img} alt={selectedService.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-bold text-gray-800">{selectedService.title}</h3>
            <p className="text-sm text-yellow-500">⭐ {selectedService.rating}</p>
            <p className="mt-2 text-gray-600">{selectedService.description}</p>
            <p className="mt-2 text-gray-800 font-semibold">Price: {selectedService.price}</p>
          </div>
        </div>
      )}

      {/* 🔹 Booking Modal */}
      {bookingService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-lg relative">
            <button
              onClick={() => setBookingService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">{bookingService.title}</h2>
              <p className="text-gray-600 mt-1">{bookingService.rating} <span className="ml-2">(2K+ bookings)</span></p>
              <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
              <p className="text-sm text-gray-500">Choose any option</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {bookingService.options?.map((opt, idx) => (
                  <div key={idx} className="border rounded-lg p-3 flex flex-col items-center">
                    <img src={bookingService.img} alt={opt.name} className="w-16 h-16 object-contain" />
                    <p className="font-medium text-blue-600 mt-2">{opt.name}</p>
                    <p className="text-gray-700">{opt.price}</p>
                    <button className="mt-2 bg-blue-200 text-blue-800 px-3 py-1 rounded">Add</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end">
              <button
                className="bg-[#023E8A] text-white px-6 py-2 rounded-md hover:bg-blue-900"
                onClick={() => {
                  setBookingService(null);
                  navigate("/viewcart");
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menicure;
