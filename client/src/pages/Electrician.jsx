import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import electricianImg from "../assets/electrician.png";

// Example images
import wiringImg from "../assets/wiring.webp";
import fanImg from "../assets/fan.webp";
import lightImg from "../assets/light.jpg";
import wireImg from "../assets/wire.webp";
import doorbellImg from "../assets/doorbell.jpg";
import mcbImg from "../assets/Product.jpg";
import gyser from "../assets/gyser.jpg";
import otherappliences from "../assets/appliences.jpg";

import socketRepairImg from "../assets/socket-repair.webp";
import socketInstallImg from "../assets/socket-install.webp";
import fanRepairImg from "../assets/fan-repair.png";
import lightRepairImg from "../assets/light-repair.jpg";
import wireRepairImg from "../assets/wire-repair.jpg";

const Electrician = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate(); // ✅ hook for navigation

  // Services under "Home Repairs"
  const repairServices = [
    { id: 1, name: "Switch & Socket", img: wiringImg },
    { id: 2, name: "Fan", img: fanImg },
    { id: 3, name: "Light", img: lightImg },
    { id: 4, name: "Wiring", img: wireImg },
    { id: 5, name: "Doorbell & Security", img: doorbellImg },
    { id: 6, name: "MCB/fuse", img: mcbImg },
  ];

  // Services under "Home Installation"
  const installationServices = [
    { id: 101, name: "Geyser", img: gyser },
    { id: 102, name: "Other Appliances", img: otherappliences },
  ];

  // Sub-services for modal
const subServicesMap = {
  "Switch & Socket": [
    { id: 1, name: "Socket Repair", price: "₹149", img: socketRepairImg, route: "/switchsocket" },
    { id: 2, name: "Socket Installation", price: "₹199", img: socketInstallImg, route: "/switchsocket" },
  ],
  Fan: [
    { id: 1, name: "Fan Repair", price: "₹249", img: fanRepairImg, route: "/fan" },
    { id: 2, name: "Fan Installation", price: "₹299", img: fanRepairImg, route: "/fan" },
  ],
  Light: [
    { id: 1, name: "Light Repair", price: "₹99", img: lightRepairImg, route: "/light" },
    { id: 2, name: "Light Installation", price: "₹149", img: lightRepairImg, route: "/light" },
  ],
  Wiring: [
    { id: 1, name: "New Internal Wiring", price: "₹199", img: wireRepairImg, route: "/wiring" },
    { id: 2, name: "New External Wiring", price: "₹249", img: wireRepairImg, route: "/wiring" },
  ],
  "Doorbell & Security": [
    { id: 1, name: "Regular Doorbell", price: "₹199", img: lightRepairImg, route: "/doorbell" },
    { id: 2, name: "Video Doorbell", price: "₹399", img: lightRepairImg, route: "/doorbell" },
  ],
  "MCB/fuse": [
    { id: 1, name: "Fuse Repair", price: "₹149", img: lightRepairImg, route: "/mcb" },
    { id: 2, name: "Fuse Replacement", price: "₹249", img: lightRepairImg, route: "/mcb" },
  ],
  Geyser: [
    { id: 1, name: "Geyser Installation", price: "₹499", img: gyser, route: "/gyser" },
    { id: 2, name: "Geyser Repair", price: "₹299", img: gyser, route: "/gyser" },
  ],
  "Other Appliances": [
    { id: 1, name: "Fridge Installation", price: "₹699", img: otherappliences, route: "/appliances" },
    { id: 2, name: "Washing Machine Repair", price: "₹499", img: otherappliences, route: "/appliances" },
  ],
};


  const options = subServicesMap[selectedService?.name] || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">ELECTRICIAN</h2>
            <p className="mt-2 text-gray-600">Reliable repair & installation services.</p>
          </div>
          <img src={electricianImg} alt="Electrician" className="w-40 md:w-56" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Book by category</h3>
        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={() =>
              setSelectedCategory(selectedCategory === "repairs" ? null : "repairs")
            }
            className="cursor-pointer relative rounded-lg overflow-hidden shadow-md"
          >
            <img src={lightImg} alt="Repairs" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">
              HOME REPAIRS
            </div>
          </div>
          <div
            onClick={() =>
              setSelectedCategory(selectedCategory === "installation" ? null : "installation")
            }
            className="cursor-pointer relative rounded-lg overflow-hidden shadow-md"
          >
            <img src={gyser} alt="Installation" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">
              HOME INSTALLATION
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      {selectedCategory === "repairs" && (
        <section className="py-10 px-6 md:px-16">
          <h3 className="text-xl font-semibold mb-6">Explore Electrician Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {repairServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="cursor-pointer p-4 flex flex-col items-center border rounded-md hover:shadow-lg"
              >
                <img src={srv.img} alt={srv.name} className="w-24 h-24 object-contain" />
                <p className="mt-2 font-medium text-[#023E8A]">{srv.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Installation Services */}
      {selectedCategory === "installation" && (
        <section className="py-10 px-6 md:px-16">
          <h3 className="text-xl font-semibold mb-6">Explore Installation Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {installationServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="cursor-pointer p-4 flex flex-col items-center border rounded-md hover:shadow-lg"
              >
                <img src={srv.img} alt={srv.name} className="w-24 h-24 object-contain" />
                <p className="mt-2 font-medium text-[#023E8A]">{srv.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">{selectedService.name}</h3>
            <p className="text-sm text-gray-500 mb-4">Choose a service</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() =>
                    sub.route ? navigate(sub.route) : navigate(`/service/${sub.id}`)
                  } // ✅ If route exists → go there, else fallback
                  className="border p-4 rounded-lg text-center cursor-pointer hover:shadow-md"
                >
                  <img src={sub.img} alt={sub.name} className="w-16 h-16 mx-auto mb-2" />
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-gray-600">{sub.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      )}

      
    </div>
  );
};

export default Electrician;
