import React from "react";
import { Link } from "react-router-dom";

// Example assets
import workerImg from "../assets/worker.png"; // right-side hero image
import switchSocketImg from "../assets/wiring.webp";
import fanImg from "../assets/fan.webp";
import lightImg from "../assets/light.jpg";
import doorbellImg from "../assets/doorbell.jpg";
import wireImg from "../assets/wire.webp";
import mcbImg from "../assets/Product.jpg";
import appliancesImg from "../assets/appliences.jpg";

import service1 from "../assets/socket-repair.webp";
import service2 from "../assets/fan-repair.png";
import service3 from "../assets/light-repair.jpg";
import service4 from "../assets/gyser.jpg";
import service5 from "../assets/appliences.jpg";

const SwitchSocket = () => {
  const services = [
    {
      id: 1,
      title: "Switch/socket repair & replace",
      price: "₹149",
      rating: "★★★★☆",
      img: service1,
    },
    {
      id: 2,
      title: "Switchboard repair & replace",
      price: "₹199",
      rating: "★★★☆☆",
      img: service2,
    },
    {
      id: 3,
      title: "Plug replacement",
      price: "₹99",
      rating: "★★★★★",
      img: service3,
    },
    {
      id: 4,
      title: "Inverter installation",
      price: "₹1199",
      rating: "★★★★☆",
      img: service4,
    },
    {
      id: 5,
      title: "MCB/fuse replacement",
      price: "₹249",
      rating: "★★★★☆",
      img: service5,
    },
  ];

  const installations = [
    {
      id: 6,
      title: "Switch board installation",
      price: "₹149",
      rating: "★★★★☆",
      img: service2,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-8 px-6 md:px-16 flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Switch & Socket
          </h2>
          <p className="mt-2 text-gray-600">Home / Appliance Repair</p>
        </div>
        <img src={workerImg} alt="Worker" className="w-40 md:w-56" />
      </section>

      {/* Category Selector */}
      <section className="py-6 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Electrician Services</h3>
        <div className="flex gap-6 overflow-x-auto pb-4">
          <Link to="/switch-socket" className="text-blue-600 font-medium text-sm text-center">
            <img
              src={switchSocketImg}
              alt="Switch & Socket"
              className="w-16 h-16 object-contain mx-auto mb-1"
            />
            Switch & Socket
          </Link>
          <Link to="/fan" className="text-gray-700 text-sm text-center">
            <img src={fanImg} alt="Fan" className="w-16 h-16 object-contain mx-auto mb-1" />
            Fan
          </Link>
          <Link to="/light" className="text-gray-700 text-sm text-center">
            <img src={lightImg} alt="Light" className="w-16 h-16 object-contain mx-auto mb-1" />
            Light
          </Link>
          <Link to="/doorbell" className="text-gray-700 text-sm text-center">
            <img src={doorbellImg} alt="Doorbell" className="w-16 h-16 object-contain mx-auto mb-1" />
            Doorbell & Security
          </Link>
          <Link to="/wiring" className="text-gray-700 text-sm text-center">
            <img src={wireImg} alt="Wiring" className="w-16 h-16 object-contain mx-auto mb-1" />
            Wiring
          </Link>
          <Link to="/mcb" className="text-gray-700 text-sm text-center">
            <img src={mcbImg} alt="MCB" className="w-16 h-16 object-contain mx-auto mb-1" />
            MCB/fuse
          </Link>
          <Link to="/appliances" className="text-gray-700 text-sm text-center">
            <img src={appliancesImg} alt="Appliances" className="w-16 h-16 object-contain mx-auto mb-1" />
            Appliances
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
                <Link
                  to={`/service/${srv.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details
                </Link>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
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
                <Link
                  to={`/service/${inst.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SwitchSocket;
