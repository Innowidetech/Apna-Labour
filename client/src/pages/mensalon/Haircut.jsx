// src/pages/MenSalon/Haircut.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImg from "../../assets/mensalon.png"; // hero image
import haircutImg from "../../assets/salon.jpg";
import beardImg from "../../assets/hairspa.jpg";
import stylingImg from "../../assets/hair.jpg";
import premiumCutImg from "../../assets/beard2.jpg";
import colourImg from "../../assets/beard3.jpg";
import menicureImg from "../../assets/menicure.jpg";
import facialImg from "../../assets/facial.jpg";
import beardshapingImg from "../../assets/beard4.jpg";


const Haircut = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Haircut Services
  const exploreServices = [
    {
      id: 1,
      name: "Hair & Beard",
      img: haircutImg,
      path: "/mensalon/haircut",
    },
    {
      id: 2,
      name: "Detan & facial",
      img: facialImg,
      path: "/mensalon/detan",
    },
     {
      id: 3,
      name: "Menicure & pedicure",
      img: menicureImg,
      path: "/mensalon/menicure",
    },
  ];

  // ✅ Haircut Services
  const services = [
    {
      id: 1,
      title: "Classic Haircut",
      price: "₹299",
      rating: "★★★★☆",
      description: "Professional classic haircut with expert stylists.",
      img: haircutImg,
      options: [
        { name: "Basic Haircut", price: "₹299" },
        { name: "Trendy Haircut", price: "₹399" },
      ],
    },
    {
      id: 2,
      title: "Hair Spa",
      price: "₹199",
      rating: "★★★★★",
      description: "Perfect beard grooming & styling for sharp looks.",
      img: beardImg,
      options: [
        { name: "Beard Trim", price: "₹199" },
        { name: "Luxury Beard Styling", price: "₹399" },
      ],
    },
    {
      id: 3,
      title: "Hair Styling",
      price: "₹499",
      rating: "★★★★☆",
      description: "Trendy hairstyling with premium products.",
      img: stylingImg,
      options: [
        { name: "Casual Styling", price: "₹499" },
        { name: "Party Styling", price: "₹799" },
      ],
    },
  ];

  // ✅ Extra Services / Installations
  const installations = [
    {
      id: 1,
      title: "Beard Styling",
      price: "₹699",
      rating: "★★★★★",
      description: "Luxury haircut with head wash & styling included.",
      img: premiumCutImg,
      options: [
        { name: "Premium Cut", price: "₹699" },
        { name: "Premium + Styling", price: "₹999" },
      ],
    },
    {
    id: 2,
    title: "Beard Shaping & Styling",
    price: "₹799",
    rating: "★★★★★",
    description: "Expert shaping and styling for your desired beard style.",
    img: beardshapingImg ,
    options: [
      { name: "Shaping Only", price: "₹799" },
      { name: "Shaping + Styling Oil", price: "₹999" },
    ],
  },
   {
    id: 3,
    title: "Beard Coloring",
    price: "₹999",
    rating: "★★★★☆",
    description: "Professional beard coloring to hide grays or change style.",
    img: colourImg,
    options: [
      { name: "Basic Coloring", price: "₹999" },
      { name: "Advanced Coloring & Care", price: "₹1299" },
    ],
  },
  ];

  return (
    <div className="w-full">
     {/* 🔹 Hero Section */}
<section className="bg-[#EDF2FB] py-8 md:py-12 px-6 md:px-16">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[220px]">
    {/* Left Content */}
    <div className="text-center md:text-left mb-6 md:mb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        MEN SALON & GROOMING
      </h2>
      <p className="mt-2 text-gray-600 text-sm md:text-base">
        Professional salon & grooming services at home.
      </p>
    </div>

    {/* Right Image */}
    <img
      src={menImg}
      alt="Men Salon"
      className="w-40 md:w-56 object-contain"
    />
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
        <h3 className="text-xl font-semibold mb-6"> Hair Services</h3>
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
        <h3 className="text-xl font-semibold mb-6">Beard Services</h3>
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
                {bookingService.rating} <span className="ml-2">(5K+ bookings)</span>
              </p>
              <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
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
                    <p className="font-medium text-blue-600 mt-2">{opt.name}</p>
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

export default Haircut;
