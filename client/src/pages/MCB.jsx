import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Images
import workerImg from "../assets/electrician.png";
import fanImg from "../assets/fan.webp";
import lightImg from "../assets/light.jpg";
import wiringImg from "../assets/wiring.webp";
import doorbellImg from "../assets/doorbell.jpg";
import mcbImg from "../assets/Product.jpg";
import appliencesImg from "../assets/appliences.jpg";
import socketImg from "../assets/wiring.webp";

// MCB specific images
import mcbRepairImg from "../assets/Product.jpg"; 
import fuseReplacementImg from "../assets/Product.jpg"; 
import mcbInstallationImg from "../assets/Product.jpg"; 

const MCB = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);

  const categories = [
    { name: "Switch & Socket", img: socketImg, route: "/switchsocket" },
    { name: "Fan", img: fanImg, route: "/fan" },
    { name: "Light", img: lightImg, route: "/light" },
    { name: "Doorbell & Security", img: doorbellImg, route: "/doorbell" },
    { name: "Wiring", img: wiringImg, route: "/wiring" },
    { name: "MCB/fuse", img: mcbImg, route: "/mcb" },
    { name: "Appliances", img: appliencesImg, route: "/appliances" },
  ];

  const services = [
    {
      id: 1,
      title: "MCB Repair",
      price: "₹249",
      rating: "★★★★☆",
      description: "Repair faulty MCBs safely and quickly.",
      img: mcbRepairImg,
      options: [
        { name: "Single MCB", price: "₹249" },
        { name: "Double MCB", price: "₹349" },
      ],
    },
    {
      id: 2,
      title: "Fuse Replacement",
      price: "₹149",
      rating: "★★★★☆",
      description: "Replace blown fuses to restore electricity safely.",
      img: fuseReplacementImg,
      options: [
        { name: "Single fuse", price: "₹149" },
        { name: "Set of fuses", price: "₹249" },
      ],
    },
  ];

  const installation = [
    {
      id: 3,
      title: "New MCB Installation",
      price: "₹499",
      rating: "★★★★☆",
      description: "Install new MCBs with safety checks.",
      img: mcbInstallationImg,
      options: [
        { name: "Single MCB", price: "₹499" },
        { name: "Double MCB", price: "₹799" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              MCB & Fuse
            </h2>
            <p className="mt-2 text-gray-600">Repair & Installation Services</p>
          </div>
          <img src={workerImg} alt="Electrician" className="w-40 md:w-56" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Electrician Services</h3>
        <div className="flex gap-8 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(cat.route)}
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-28 h-28 border rounded-lg p-2 bg-white flex items-center justify-center shadow-sm hover:shadow-md">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="mt-3 text-base font-semibold text-[#023E8A]">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Services</h3>
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

      {/* Installation */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Installation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {installation.map((inst) => (
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
              <p className="text-sm text-gray-600">starts at {inst.price}</p>
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

      {/* View Details Modal */}
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
          </div>
        </div>
      )}

      {/* Book Modal */}
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
                {bookingService.rating} <span className="ml-2">(11.0K bookings)</span>
              </p>
              <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
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
                onClick={() => {
                  setBookingService(null);
                  navigate("/viewcart"); // ✅ Navigate to View Cart page
                }}
                className="bg-[#023E8A] text-white px-6 py-2 rounded-md hover:bg-blue-900"
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

export default MCB;
