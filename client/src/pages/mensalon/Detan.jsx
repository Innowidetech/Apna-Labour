// src/pages/MenSalon/Detan.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImg from "../../assets/mensalon.png"; // hero image
import detanImg from "../../assets/detan.jpg"; 
import facialImg from "../../assets/facial.jpg";
import premiumFacialImg from "../../assets/massage.jpg";
import luxuryFacialImg from "../../assets/menicure.jpg";
import menicureImg from "../../assets/menicure.jpg";
import haircutImg from "../../assets/salon.jpg";

const Detan = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();


   // ✅ Explore Haircut Services
  const exploreServices = [
    {
      id: 1,
      name: "Hair & Beard",
      img: haircutImg,
      path: "/mensalon/haircut", // ✅ same page
    },
    {
      id: 2,
      name: "Detan & Facial",
      img: facialImg,
      path: "/mensalon/detan", // ✅ same haircut page
    },
    {
      id: 3,
      name: "Manicure & Pedicure",
      img: menicureImg,
      path: "/mensalon/haircut", // ✅ same haircut page
    },
  ];


  // ✅ Detan / Facial Services
  const services = [
    {
      id: 1,
      title: "Full Face Cleanup with Detan",
      price: "₹399",
      rating: "★★★★☆",
      description: "Removes tan, brightens skin & gives instant glow.",
      img: detanImg,
      options: [
        { name: "Basic Detan", price: "₹399" },
        { name: "Advanced Detan", price: "₹599" },
      ],
    },
    {
      id: 2,
      title: "Hand Detan",
      price: "₹299",
      rating: "★★★☆☆",
      description: "Removes tan from hands, improves skin tone.",
      img: facialImg,
      options: [
        { name: "Hand Detan", price: "₹299" },
        { name: "Hand + Arm Detan", price: "₹499" },
      ],
    },
    {
      id: 3,
      title: "Full Body Detan",
      price: "₹999",
      rating: "★★★★★",
      description: "Complete body detan with skin nourishment.",
      img: premiumFacialImg,
      options: [
        { name: "Basic Full Body", price: "₹999" },
        { name: "Luxury Full Body", price: "₹1499" },
      ],
    },
  ];

  // ✅ Extra Services
  const installations = [
    {
      id: 1,
      title: "Hydrating Facial",
      price: "₹799",
      rating: "★★★★★",
      description: "Deep cleansing facial for glowing skin.",
      img: premiumFacialImg,
      options: [
        { name: "Basic Facial", price: "₹799" },
        { name: "Gold Facial", price: "₹1199" },
      ],
    },
    {
      id: 2,
      title: "Ayurvedic / Herbal Facial",
      price: "₹1499",
      rating: "★★★★☆",
      description: "Relaxing skin spa with premium products.",
      img: luxuryFacialImg,
      options: [
        { name: "Basic Spa", price: "₹1499" },
        { name: "Luxury Spa", price: "₹1999" },
      ],
    },
    {
      id: 3,
      title: "Charcoal Cleanup",
      price: "₹1499",
      rating: "★★★★☆",
      description: "Relaxing skin spa with premium products.",
      img: luxuryFacialImg,
      options: [
        { name: "Basic Spa", price: "₹1499" },
        { name: "Luxury Spa", price: "₹1999" },
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
              DETAN & FACIAL
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Professional detan & facial services at home.
            </p>
          </div>
          <img src={detanImg} alt="Detan" className="w-40 md:w-56 object-contain" />
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

      {/* 🔹 Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Detan Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={srv.img}
                alt={srv.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="text-sm text-yellow-500">{srv.rating}</p>
              <h4 className="font-semibold text-gray-800">{srv.title}</h4>
              <p className="text-sm text-gray-600">starts at {srv.price}</p>
              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => setSelectedService(srv)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details
                </button>
                <button
                  onClick={() => setBookingService(srv)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Extra Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Facial & Spa Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {installations.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={srv.img}
                alt={srv.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="text-sm text-yellow-500">{srv.rating}</p>
              <h4 className="font-semibold text-gray-800">{srv.title}</h4>
              <p className="text-sm text-gray-600">starts at {srv.price}</p>
              <p className="text-sm text-gray-500 mt-1">{srv.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => setSelectedService(srv)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details
                </button>
                <button
                  onClick={() => setBookingService(srv)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
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
            <img
              src={selectedService.img}
              alt={selectedService.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800">
              {selectedService.title}
            </h3>
            <p className="text-sm text-yellow-500">⭐ {selectedService.rating}</p>
            <p className="mt-2 text-gray-600">{selectedService.description}</p>
            <p className="mt-2 text-gray-800 font-semibold">
              Price: {selectedService.price}
            </p>
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
              <h2 className="text-2xl font-bold text-gray-800">
                {bookingService.title}
              </h2>
              <p className="text-gray-600 mt-1">
                {bookingService.rating}{" "}
                <span className="ml-2">(5K+ bookings)</span>
              </p>
              <h3 className="mt-4 font-semibold text-gray-800">
                Select a service
              </h3>
              <p className="text-sm text-gray-500">Choose any service</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {bookingService.options?.map((opt, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 flex flex-col items-center"
                  >
                    <img
                      src={bookingService.img}
                      alt={opt.name}
                      className="w-16 h-16 object-contain"
                    />
                    <p className="font-medium text-blue-600 mt-2">
                      {opt.name}
                    </p>
                    <p className="text-gray-700">{opt.price}</p>
                    <button className="mt-2 bg-blue-200 text-blue-800 px-3 py-1 rounded">
                      Add
                    </button>
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

export default Detan;
