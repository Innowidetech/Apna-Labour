import React from "react";
import { useNavigate } from "react-router-dom";

// Images
import workerImg from "../assets/electrician.png"; // hero worker image
import fanImg from "../assets/fan.webp";
import lightImg from "../assets/light.jpg";
import wiringImg from "../assets/wiring.webp";
import doorbellImg from "../assets/doorbell.jpg";
import mcbImg from "../assets/Product.jpg";
import appliencesImg from "../assets/appliences.jpg";
import socketImg from "../assets/wiring.webp"; // same as Light page

// Wiring service images
import wiringRepairImg from "../assets/wire-repair.jpg"; 
import wiringReplaceImg from "../assets/wire-repair.jpg"; 
import wiringInstallImg from "../assets/wire-repair.jpg"; 

const Wiring = () => {
  const navigate = useNavigate();

  // Categories (same as Light page)
  const categories = [
    { name: "Switch & Socket", img: socketImg, route: "/switchsocket" },
    { name: "Fan", img: fanImg, route: "/fan" },
    { name: "Light", img: lightImg, route: "/light" },
    { name: "Doorbell & Security", img: doorbellImg, route: "/doorbell" },
    { name: "Wiring", img: wiringImg, route: "/wiring" },
    { name: "MCB/fuse", img: mcbImg, route: "/mcb" },
    { name: "Appliances", img: appliencesImg, route: "/appliances" },
  ];

  // Wiring services
  const services = [
    {
      id: 1,
      name: "Wiring Repair",
      price: "starts at ₹199",
      img: wiringRepairImg,
    },
    {
      id: 2,
      name: "Wiring Replacement",
      price: "starts at ₹499",
      img: wiringReplaceImg,
    },
  ];

  // Installation services
  const installation = [
    {
      id: 3,
      name: "New Wiring Installation",
      price: "starts at ₹1499",
      img: wiringInstallImg,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Wiring
            </h2>
            <p className="mt-2 text-gray-600">Repair & Installation Services</p>
          </div>
          <img src={workerImg} alt="Electrician" className="w-40 md:w-56" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Electrician Services</h3>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(cat.route)}
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-16 h-16 object-contain border rounded-lg p-2 bg-white"
              />
              <p className="mt-2 text-sm font-medium text-[#023E8A]">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-6 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={srv.img}
                alt={srv.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h4 className="font-semibold text-gray-800">{srv.name}</h4>
              <p className="text-gray-500 text-sm">{srv.price}</p>
              <button className="mt-3 bg-[#023E8A] text-white px-4 py-2 rounded-lg">
                Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section className="py-6 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Installation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {installation.map((srv) => (
            <div
              key={srv.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={srv.img}
                alt={srv.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h4 className="font-semibold text-gray-800">{srv.name}</h4>
              <p className="text-gray-500 text-sm">{srv.price}</p>
              <button className="mt-3 bg-[#023E8A] text-white px-4 py-2 rounded-lg">
                View details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Wiring;
