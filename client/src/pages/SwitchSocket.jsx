import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ useNavigate import

// Example assets
import workerImg from "../assets/switch-2.png"; // right-side hero image
import switchSocketImg from "../assets/wiring.webp";
import fanImg from "../assets/fan.webp";
import lightImg from "../assets/light.jpg";
import doorbellImg from "../assets/doorbell.jpg";
import wireImg from "../assets/wire.webp";
import mcbImg from "../assets/Product.jpg";
import appliancesImg from "../assets/appliences.jpg";

import service1 from "../assets/socket-repair.webp";
import service2 from "../assets/switch1.jpg";
import service3 from "../assets/plug.jpg";
import service4 from "../assets/invertor.jpg";
import service5 from "../assets/fuse-1.jpg";

const SwitchSocket = () => {
  const [selectedService, setSelectedService] = useState(null); // for View Details
  const [bookingService, setBookingService] = useState(null); // for Book
   const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Switch/socket repair & replace",
      price: "₹149",
      rating: "★★★★☆",
      description: "Repair or replace faulty switches and sockets with expert help.",
      img: service1,
      options: [
        { name: "Single switch", price: "₹149" },
        { name: "Double switch", price: "₹199" },
      ],
    },
    {
      id: 2,
      title: "Switchboard repair & replace",
      price: "₹199",
      rating: "★★★☆☆",
      description: "Fix or replace damaged switchboards safely and quickly.",
      img: service2,
      options: [
        { name: "2 module board", price: "₹249" },
        { name: "4 module board", price: "₹349" },
      ],
    },
    {
      id: 3,
      title: "Plug replacement",
      price: "₹99",
      rating: "★★★★★",
      description: "Replace old or broken plugs with high-quality ones.",
      img: service3,
      options: [
        { name: "2 pin", price: "₹49" },
        { name: "3 pin", price: "₹59" },
      ],
    },
    {
      id: 4,
      title: "Inverter installation",
      price: "₹1199",
      rating: "★★★★☆",
      description: "Professional installation of inverters at your home.",
      img: service4,
      options: [
        { name: "Basic install", price: "₹1199" },
        { name: "Premium install", price: "₹1499" },
      ],
    },
    {
      id: 5,
      title: "MCB/fuse replacement",
      price: "₹249",
      rating: "★★★★☆",
      description: "Replace faulty MCBs or fuses to restore electricity safely.",
      img: service5,
      options: [
        { name: "Fuse replacement", price: "₹249" },
        { name: "MCB replacement", price: "₹349" },
      ],
    },
  ];

  const installations = [
    {
      id: 6,
      title: "Switch board installation",
      price: "₹149",
      rating: "★★★★☆",
      description: "Install a new switch board with proper safety measures.",
      img: service2,
      options: [
        { name: "Small board", price: "₹149" },
        { name: "Large board", price: "₹249" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-16 flex justify-between items-center">
        {/* Left Heading */}
        <div className="pl-4 md:pl-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Switch & Socket
          </h2>
          <p className="mt-2 text-gray-600">Home / Appliance Repair</p>
        </div>

        {/* Right Image */}
        <img
          src={workerImg}
          alt="Worker"
          className="w-72 md:w-96 lg:w-[28rem] object-contain pr-4 md:pr-8"
        />
      </section>

      {/* Category Selector */}
      <section className="py-6 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">
          Explore Electrician Services
        </h3>
        <div className="flex gap-8 overflow-x-auto pb-4">
          <Link
            to="/switchsocket"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={switchSocketImg}
                alt="Switch & Socket"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              Switch & Socket
            </p>
          </Link>

          <Link
            to="/fan"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={fanImg}
                alt="Fan"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">Fan</p>
          </Link>

          <Link
            to="/light"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={lightImg}
                alt="Light"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              Light
            </p>
          </Link>

          <Link
            to="/doorbell"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={doorbellImg}
                alt="Doorbell"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              Doorbell & Security
            </p>
          </Link>

          <Link
            to="/wiring"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={wireImg}
                alt="Wiring"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              Wiring
            </p>
          </Link>

          <Link
            to="/mcb"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={mcbImg}
                alt="MCB"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              MCB/Fuse
            </p>
          </Link>

          <Link
            to="/appliances"
            className="flex flex-col items-center text-center w-32"
          >
            <div className="w-28 h-28 border rounded-xl flex items-center justify-center bg-white shadow-sm hover:shadow-md">
              <img
                src={appliancesImg}
                alt="Appliances"
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-[#023E8A]">
              Appliances
            </p>
          </Link>
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
            {/* Close Button */}
            <button
              onClick={() => setBookingService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            {/* Modal Content */}
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

              {/* Dynamic Service Options */}
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

            {/* Bottom Button */}
            <div className="border-t px-6 py-4 flex justify-end">
              <button
                className="bg-[#023E8A] text-white px-6 py-2 rounded-md hover:bg-blue-900"
                onClick={() => {
                  setBookingService(null); // modal close
                  navigate("/viewcart"); // ✅ navigate to ViewCart page
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

export default SwitchSocket;
