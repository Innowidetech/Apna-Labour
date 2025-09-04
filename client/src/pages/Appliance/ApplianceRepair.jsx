// src/pages/ApplianceRepair.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import repairMan from "../../assets/repairman.png";
import acImg from "../../assets/ac.png";
import washingMachineImg from "../../assets/washing.png";
import tvImg from "../../assets/tv.png";
import laptopImg from "../../assets/laptop.png";
import coolerImg from "../../assets/cooler.png";
import geyserImg from "../../assets/geyser.png";
import Service from "../../assets/ac1.png";
import Serviceimg from "../../assets/ac2.png";
import ServiceImg from "../../assets/ac3.png";
import homebutton from "../../assets/homebutton.png"
import kitchenbutton from "../../assets/kitchenbutton.png"
import { X } from "lucide-react";
// Most Demanding Services images
import fan1 from "../../assets/fan1.png";
import fan2 from "../../assets/fan2.png";
import doorbell from "../../assets/doorbell.png";
import washingMachine from "../../assets/washing1.png";
import tv from "../../assets/tv1.png";
import cooler from "../../assets/cooler1.png";
import ac1 from "../../assets/ac-1.png";
import ac2 from "../../assets/ac-2.png";
import technician from "../../assets/technician.png";
// Kitchen Appliances
import chimneyImg from "../../assets/chimney.png";
import microwaveImg from "../../assets/microwave.png";
import fridgeImg from "../../assets/fridge.png";
import dishwasherImg from "../../assets/dishwasher.png";
import company1 from "../../assets/company1.png";
import company2 from "../../assets/company2.png";
import company3 from "../../assets/company3.png";
import company4 from "../../assets/company4.png";
import company5 from "../../assets/company5.png";
import company6 from "../../assets/company6.png";
import company7 from "../../assets/company7.png";
import company8 from "../../assets/company8.png";


// Most Demanding Kitchen Services
import chimneyClean from "../../assets/chimneyClean.png";
import microwaveRepair from "../../assets/microwaveRepair.png";
import fridgeRepair from "../../assets/fridgeRepair.png";
import dishwasherService from "../../assets/dishwasherService.png";
import purifier from "../../assets/purifier.png"
import stove from "../../assets/stove.png"

const ApplianceRepair = () => {
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // ✅ Default category set to "home"
  const [selectedCategory, setSelectedCategory] = useState("home");
  const navigate = useNavigate();

  // Home Appliances
  const appliances = [
    { id: 1, name: "AC", img: acImg },
    { id: 2, name: "Washing Machine", img: washingMachineImg },
    { id: 3, name: "Television", img: tvImg },
    { id: 4, name: "Laptop", img: laptopImg },
    { id: 5, name: "Air Cooler", img: coolerImg },
    { id: 6, name: "Geyser", img: geyserImg },
  ];

  // Kitchen Appliances
  const kitchenAppliances = [
    { id: 1, name: "Chimney", img: chimneyImg },
    { id: 2, name: "Microwave", img: microwaveImg },
    { id: 3, name: "Refrigerator", img: fridgeImg },
    { id: 4, name: "Stove", img: stove },
    { id: 5, name: "Water Purifier", img: purifier },
  ];

  // Most Demanding Home Services
  const demandingServices = [
    { id: 1, name: "Regular ceiling fan installation", price: "₹149", rating: "4.8", reviews: "3286", img: fan1 },
    { id: 2, name: "Decorative fan installation", price: "₹199", rating: "4.8", reviews: "3286", img: fan2 },
    { id: 3, name: "Regular doorbell installation", price: "₹99", rating: "4.8", reviews: "3286", img: doorbell },
    { id: 4, name: "Automatic top load machine", price: "₹199", rating: "4.8", reviews: "3286", img: washingMachine },
    { id: 5, name: "TV Check-up", price: "₹249", rating: "4.8", reviews: "3286", img: tv },
    { id: 6, name: "Air cooler service", price: "₹599", rating: "4.8", reviews: "3286", img: cooler },
    { id: 7, name: "Foam jet AC service", price: "₹599", rating: "4.8", reviews: "3286", img: ac1 },
    { id: 8, name: "AC No cooling repair", price: "₹299", rating: "4.8", reviews: "3286", img: ac2 },
  ];

  // Most Demanding Kitchen Services
  const demandingKitchenServices = [
    { id: 1, name: "Chimney Deep Cleaning", price: "₹499", rating: "4.8", reviews: "2100", img: chimneyClean },
    { id: 2, name: "Microwave Repair", price: "₹299", rating: "4.8", reviews: "3200", img: microwaveRepair },
    { id: 3, name: "Refrigerator Gas Filling", price: "₹699", rating: "4.8", reviews: "1500", img: fridgeRepair },
    { id: 4, name: "Dishwasher Service", price: "₹399", rating: "4.8", reviews: "1800", img: dishwasherService },
  ];

  // 🔑 Services Map (Dynamic for Home & Kitchen)
  const applianceServices = {
    AC: [
      { id: 1, name: "Service", img: Service, path: "/air-conditioner" },
      { id: 2, name: "Repair & Gas Refill", img: Serviceimg, path: "/air-conditioner" },
      { id: 3, name: "Installation/Uninstallation", img: ServiceImg, path: "/air-conditioner" },
    ],
    "Washing Machine": [
      { id: 1, name: "Installation/Uninstallation", img: washingMachine, path: "/washing-machine" },
      { id: 2, name: "Repair", img: washingMachine, path: "/washing-machine" },
    ],
    Television: [
      { id: 1, name: "Check-up", img: tv, path: "/television" },
      { id: 2, name: "Installation/Uninstallation", img: tv, path: "/television" },
    ],
    Laptop: [
      { id: 1, name: "Diagnosis", img: laptopImg, path: "/laptop" },
      { id: 2, name: "Repair", img: laptopImg, path: "/laptop" },
    ],
    "Air Cooler": [
      { id: 1, name: "Service", img: cooler, path: "/air-cooler" },
      { id: 2, name: "Repair", img: cooler, path: "/air-cooler" },
    ],
    Geyser: [
      { id: 1, name: "Service", img: geyserImg, path: "/geyser" },
      { id: 2, name: "Repair", img: geyserImg, path: "/geyser" },
    ],
    Chimney: [
      { id: 1, name: "Deep Cleaning", img: chimneyClean, path: "/chimney" },
      { id: 2, name: "Repair", img: chimneyClean, path: "/chimney" },
      { id: 2, name: "Installation/Uninstallation", img: chimneyClean, path: "/chimney" },
    ],
    Microwave: [
      { id: 1, name: "Repair", img: microwaveRepair, path: "/microwave" },
      { id: 2, name: "Service", img: microwaveRepair, path: "/microwave" },
    ],
    Refrigerator: [
      { id: 1, name: "Gas Filling", img: fridgeRepair, path: "/refrigerator" },
      { id: 2, name: "Repair", img: fridgeRepair, path: "/refrigerator" },
    ],
    Stove: [
      { id: 1, name: "Service", img: dishwasherService, path: "/stove" },
      { id: 2, name: "Repair", img: dishwasherService, path: "/stove" },
    ],
    "Water Purifier": [
  { id: 1, name: "Service", img: dishwasherService, path: "/water-purifier" },
  { id: 2, name: "Repair", img: dishwasherService, path: "/water-purifier" },
],

  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">APPLIANCE REPAIR</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={repairMan} alt="Appliance Repair" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>


      {/* Category Selector */}
      <div className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Book By Category</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-start gap-6 sm:gap-10 py-6 px-6 md:px-16">
        {/* Home Appliances Card */}
        <div
          onClick={() => setSelectedCategory("home")}
          className={`relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 ${selectedCategory === "home" ? "border-blue-600" : "border-transparent"
            }`}
        >
          <img
            src={homebutton}
            alt="Home Appliances"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  flex items-center justify-center">
            <h3 className="text-white font-bold text-lg md:text-xl text-center uppercase">

            </h3>
          </div>
        </div>

        {/* Kitchen Appliances Card */}
        <div
          onClick={() => setSelectedCategory("kitchen")}
          className={`relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 ${selectedCategory === "kitchen" ? "border-blue-600" : "border-transparent"
            }`}
        >
          <img
            src={kitchenbutton}
            alt="Kitchen Appliances"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  flex items-center justify-center">
            <h3 className="text-white font-bold text-lg md:text-xl text-center uppercase">

            </h3>
          </div>
        </div>
      </div>


      {/* Show Home Appliances if selected */}
      {selectedCategory === "home" && (
        <>
          <section className="py-10 px-6 md:px-16">
            <h3 className="text-xl font-semibold mb-6">Home Appliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {appliances.map((item) => (
                <div key={item.id} onClick={() => setSelectedAppliance(item)} className="cursor-pointer p-4 flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-32 h-32 object-contain" />
                  <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 px-6 md:px-16 bg-white">
            <h3 className="text-xl font-semibold mb-8">Most Demanding Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demandingServices.map((service) => (
                <div key={service.id} className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition">
                  <div className="flex items-center justify-center p-4">
                    <img src={service.img} alt={service.name} className="h-40 object-contain" />
                  </div>
                  <div className="bg-[#86A8E71A] px-4 py-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-1 text-gray-500">({service.reviews})</span>
                    </div>
                    <h4 className="mt-1 text-sm font-semibold text-gray-900">{service.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-700">starts at {service.price}</p>
                      <button onClick={() => setSelectedService(service)} className="text-blue-600 text-sm font-medium hover:underline">View details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Show Kitchen Appliances if selected */}
      {selectedCategory === "kitchen" && (
        <>
          <section className="py-10 px-6 md:px-16">
            <h3 className="text-xl font-semibold mb-6">Kitchen Appliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {kitchenAppliances.map((item) => (
                <div key={item.id} onClick={() => setSelectedAppliance(item)} className="cursor-pointer p-4 flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-36 h-36 object-contain border border-gray-300 p-4 rounded-2xl" />
                  <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-12 px-6 md:px-16 bg-white">
            <h3 className="text-xl font-semibold mb-8">Most Demanding Kitchen Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demandingKitchenServices.map((service) => (
                <div key={service.id} className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition">
                  <div className="flex items-center justify-center p-4">
                    <img src={service.img} alt={service.name} className="h-40 object-contain" />
                  </div>
                  <div className="bg-[#86A8E71A] px-4 py-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-500">★★★★☆</span>
                      <span className="ml-1 text-gray-500">({service.reviews})</span>
                    </div>
                    <h4 className="mt-1 text-sm font-semibold text-gray-900">{service.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-700">starts at {service.price}</p>
                      <button onClick={() => setSelectedService(service)} className="text-blue-600 text-sm font-medium hover:underline">View details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Modal for Appliance Services */}
      {selectedAppliance && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
            <button onClick={() => setSelectedAppliance(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black">✕</button>
            <h3 className="text-xl font-bold mb-2">{selectedAppliance.name}</h3>
            <p className="text-sm text-gray-500 mb-4">4.7 ★ (11.0k bookings)</p>
            <h4 className="text-md font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-3 gap-4">
              {(applianceServices[selectedAppliance.name] || []).map((srv) => (
                <div key={srv.id} onClick={() => navigate(srv.path)} className="cursor-pointer p-3 border rounded-lg flex flex-col items-center hover:shadow-md">
                  <img src={srv.img} alt={srv.name} className="w-16 h-16 object-contain" />
                  <p className="mt-2 text-sm font-medium text-center">{srv.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Service Details */}
       {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-800">{selectedService.name}</h2>
            <p className="text-gray-600 text-sm mt-1">
              ⭐ {selectedService.rating} ({selectedService.reviews} bookings)
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">About the service</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><span className="text-blue-500">●</span> Applicable for both split & window types</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">●</span> Deep cleaning of indoor unit</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">●</span> Jet spray cleaning of outdoor unit</li>
              </ul>
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-center gap-4">
              <img src={technician} alt="Technician" className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-semibold text-gray-800">Top Technician</h3>
                <ul className="text-gray-700 text-sm mt-1 space-y-1">
                  <li>✓ Qualified background</li>
                  <li>✓ Trained across all major brands</li>
                  <li>✓ Certified under skill</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">We service all brands</h3>
              <div className="grid grid-cols-4 gap-4">
                {[company1, company2, company3, company4, company5, company6, company7, company8].map((img, i) => (
                  <img key={i} src={img} alt={`Company ${i + 1}`} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">What we'll need from you</h3>
              <div className="flex gap-4 text-sm text-gray-700">
                <div className="px-3 py-2 border rounded-lg bg-gray-50">🪣 2 Buckets</div>
                <div className="px-3 py-2 border rounded-lg bg-gray-50">🔌 Plug Point</div>
                <div className="px-3 py-2 border rounded-lg bg-gray-50">🪜 Ladder/Stool</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Ratings & Reviews</h3>
                <button className="text-blue-600 text-sm hover:underline">→</button>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-3xl font-bold">4.3</span>
                <div className="flex-1">
                  {[80, 60, 40, 20, 10].map((width, i) => (
                    <div key={i} className="h-2 bg-gray-200 rounded-full mb-1">
                      <div className={`h-2 rounded-full w-[${width}%] ${[
                        "bg-green-500", "bg-green-400", "bg-yellow-400", "bg-orange-400", "bg-red-400"
                      ][i]}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Aj</p>
                  <p className="text-gray-600">“The technician was on time and did a good job. AC working fine now.”</p>
                </div>
                <div>
                  <p className="font-medium">Manoj</p>
                  <p className="text-gray-600">“Very professional service, explained the issue clearly. Highly recommended.”</p>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 text-sm border rounded-lg w-full hover:bg-gray-100">
                Show More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplianceRepair;
