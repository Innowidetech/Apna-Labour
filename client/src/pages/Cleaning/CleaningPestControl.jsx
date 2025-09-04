// src/pages/CleaningPestControl.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// Hero
import cleaningHero from "../../assets/cleaningHero.png";
import technician from "../../assets/technician.png";

// Categories
import homeCleaning from "../../assets/homeCleaning.png";
import sofaCleaning from "../../assets/sofaCleaning.png";
import carpetCleaning from "../../assets/carpetCleaning.png";
import kitchenCleaning from "../../assets/kitchenCleaning.png";
import bathroomCleaning from "../../assets/bathroomCleaning.png";
import pestControl from "../../assets/pestControl.png";

// Services
import deepCleaning from "../../assets/deepCleaning.png";
import pestService from "../../assets/pestService.png";
import sanitization from "../../assets/sanitization.png";

// Demanding services
import cockroach from "../../assets/cockroach.png";
import termite from "../../assets/termite.png";
import bedbug from "../../assets/bedbug.png";
import bathroom from "../../assets/bathroom.png";
import kitchen from "../../assets/kitchen.png";
import sofa from "../../assets/sofa.png"; // ✅ FIXED: This was missing
import carpet from "../../assets/carpet.png";
import fullHome from "../../assets/fullHome.png";

// company images
import company1 from "../../assets/company1.png";
import company2 from "../../assets/company2.png";
import company3 from "../../assets/company3.png";
import company4 from "../../assets/company4.png";
import company5 from "../../assets/company5.png";
import company6 from "../../assets/company6.png";
import company7 from "../../assets/company7.png";
import company8 from "../../assets/company8.png";

const CleaningPestControl = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Home Cleaning", img: homeCleaning },
    { id: 2, name: "Sofa Cleaning", img: sofaCleaning },
    { id: 3, name: "Carpet Cleaning", img: carpetCleaning },
    { id: 4, name: "Kitchen Cleaning", img: kitchenCleaning },
    { id: 5, name: "Bathroom Cleaning", img: bathroomCleaning },
    { id: 6, name: "Pest Control", img: pestControl },
  ];

  const categoryServices = {
    1: [
      { id: 1, name: "Deep Cleaning", img: deepCleaning, path: "/deep-cleaning" },
      { id: 1, name: "Pest Control", img: deepCleaning, path: "/pest-control" },
      { id: 3, name: "Sanitization", img: sanitization, path: "/sanitization" },
    ],
    2: [
      { id: 4, name: "Leather Sofa Care", img: sofa, path: "/leather-sofa" },
      { id: 5, name: "Sofa Shampoo", img: sofa, path: "/sofa-cleaning" },
    ],
    3: [
      { id: 6, name: "Carpet Deep Clean", img: carpet, path: "/carpet-cleaning" },
    ],
    4: [
      { id: 7, name: "Kitchen Deep Clean", img: kitchen, path: "/kitchen-cleaning" },
    ],
    5: [
      { id: 8, name: "Bathroom Deep Clean", img: bathroom, path: "/bathroom-cleaning" },
    ],
    6: [
      { id: 2, name: "Pest Control", img: pestService, path: "/pest-control" },
      { id: 9, name: "Termite Treatment", img: termite, path: "/termite-treatment" },
    ],
  };

  const demandingServices = [
    { id: 1, name: "Cockroach Control", price: "₹499", rating: "4.9", reviews: "2.1k", img: cockroach },
    { id: 2, name: "Termite Treatment", price: "₹899", rating: "4.7", reviews: "1.4k", img: termite },
    { id: 3, name: "Bed Bug Control", price: "₹699", rating: "4.8", reviews: "1.9k", img: bedbug },
    { id: 4, name: "Bathroom Deep Cleaning", price: "₹499", rating: "4.8", reviews: "3.2k", img: bathroom },
    { id: 5, name: "Kitchen Cleaning", price: "₹799", rating: "4.9", reviews: "2.6k", img: kitchen },
    { id: 6, name: "Sofa Shampoo Cleaning", price: "₹599", rating: "4.7", reviews: "2.3k", img: sofa },
    { id: 7, name: "Carpet Deep Cleaning", price: "₹899", rating: "4.8", reviews: "1.2k", img: carpet },
    { id: 8, name: "Full Home Deep Cleaning", price: "₹2499", rating: "4.9", reviews: "4.8k", img: fullHome },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 text-left flex flex-col justify-end">
            <h2 className="text-2xl font-bold text-gray-800">CLEANING & PEST CONTROL</h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end items-end">
            <img src={cleaningHero} alt="Cleaning & Pest Control" className="max-w-xs md:max-w-sm lg:max-w-md self-end" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Choose a Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCategory(item)}
              className="cursor-pointer p-4 flex flex-col items-center"
            >
              <img src={item.img} alt={item.name} className="w-44 h-32 object-contain p-4 border border-gray-300" />
              <p className="mt-3 font-medium text-[#023E8A] text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Most Demanding Services */}
      <section className="py-12 px-6 md:px-16 bg-white">
        <h3 className="text-xl font-semibold mb-8">Most Demanding Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {demandingServices.map((service) => (
            <div
              key={service.id}
              className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition"
            >
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
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Selection Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedCategory.name}</h3>
            <p className="text-sm text-gray-500 mb-4">4.8 ★ (8.5k bookings)</p>
            <h4 className="text-md font-semibold mb-3">Select a Service</h4>
            <div className="grid grid-cols-3 gap-4">
              {categoryServices[selectedCategory.id]?.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => navigate(srv.path)}
                  className="cursor-pointer p-3 border rounded-lg flex flex-col items-center hover:shadow-md"
                >
                  <img src={srv.img} alt={srv.name} className="w-16 h-16 object-contain" />
                  <p className="mt-2 text-sm font-medium text-center">{srv.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
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

export default CleaningPestControl;
