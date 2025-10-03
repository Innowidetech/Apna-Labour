// src/pages/Painting/ExternalWaterproofing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import workerImg from "../../assets/painting-man.png"; // hero image
import wallImg from "../../assets/exteriorImg.jpg";
import terrace from "../../assets/terrace.jpg";
import building from "../../assets/building.jpg";
import interiorImg from "../../assets/interior.png";
import roofImg from "../../assets/exterior.jpg";

const ExternalWaterproofing = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Services
  const exploreServices = [
    {
      id: 1,
      name: "Interior Waterproofing",
      img: interiorImg,
      path: "/painting/waterproofing",
    },
    {
      id: 2,
      name: "Exterior Waterproofing",
      img: roofImg,
      path: "/painting/externalwaterproofing",
    },
  ];

  // ✅ External Waterproofing Services
  const services = [
    {
      id: 1,
      title: "External Wall Waterproofing",
      price: "₹2499",
      rating: "★★★★☆",
      description: "Protect outer walls from heavy rain, seepage, and cracks.",
      img: wallImg,
      options: [
        { name: "Small House Walls", price: "₹2499" },
        { name: "Full Building Walls", price: "₹4999" },
      ],
    },
    {
      id: 2,
      title: "Terrace & Roof Waterproofing",
      price: "₹3499",
      rating: "★★★★★",
      description: "High-quality terrace and roof waterproofing to prevent leaks.",
      img: terrace,
      options: [
        { name: "Small Terrace", price: "₹3499" },
        { name: "Large Terrace", price: "₹5999" },
      ],
    },
    {
      id: 3,
      title: "Building Waterproofing",
      price: "₹9999",
      rating: "★★★★☆",
      description: "Complete waterproofing for apartments, offices, and complexes.",
      img: building,
      options: [
        { name: "Small Building", price: "₹9999" },
        { name: "Large Complex", price: "₹19999" },
      ],
    },
  ];

  // ✅ Extra Installations
  const installations = [
    {
      id: 1,
      title: "Protective Exterior Coating",
      price: "₹1499",
      rating: "★★★★☆",
      description: "Extra protective coating to safeguard your exterior walls.",
      img: wallImg,
      options: [
        { name: "Single Wall", price: "₹1499" },
        { name: "Full House Walls", price: "₹2999" },
      ],
    },
    {
      id: 2,
      title: "Crack Filling & Sealing",
      price: "₹799",
      rating: "★★★☆☆",
      description: "Professional crack filling and sealing for long-lasting waterproofing.",
      img: terrace,
      options: [
        { name: "Minor Cracks", price: "₹799" },
        { name: "Major Cracks", price: "₹1499" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-16 flex justify-between items-center">
        <div className="pl-4 md:pl-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            External Waterproofing
          </h2>
          <p className="mt-2 text-gray-600">Home / Waterproofing</p>
        </div>
        <img
          src={workerImg}
          alt="Worker"
          className="w-72 md:w-96 lg:w-[28rem] object-contain pr-4 md:pr-8"
        />
      </section>

      {/* 🔹 Explore Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Services</h3>
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
        <h3 className="text-xl font-semibold mb-6">
          External Waterproofing Services
        </h3>
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

      {/* 🔹 Installations */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Installations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {installations.map((inst) => (
            <div
              key={inst.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={inst.img}
                alt={inst.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="text-sm text-yellow-500">{inst.rating}</p>
              <h4 className="font-semibold text-gray-800">{inst.title}</h4>
              <p className="text-sm text-gray-600">{inst.description}</p>
              <p className="text-sm text-gray-600 mt-1">starts at {inst.price}</p>
              <div className="mt-3 flex justify-between items-center">
                <button
                  onClick={() => setSelectedService(inst)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details
                </button>
                <button
                  onClick={() => setBookingService(inst)}
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
            <p className="text-sm text-yellow-500">{selectedService.rating}</p>
            <p className="mt-2 text-gray-600">{selectedService.description}</p>
            <p className="mt-2 text-gray-800 font-semibold">
              Price: {selectedService.price}
            </p>
            {selectedService.options && (
              <ul className="mt-3 space-y-2">
                {selectedService.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-1 text-sm"
                  >
                    <span>{opt.name}</span>
                    <span className="font-medium">{opt.price}</span>
                  </li>
                ))}
              </ul>
            )}
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
                <span className="ml-2">(11.0K bookings)</span>
              </p>
              <h3 className="mt-4 font-semibold text-gray-800">
                Select a service
              </h3>
              <p className="text-sm text-gray-500">Choose any services</p>
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

export default ExternalWaterproofing;
