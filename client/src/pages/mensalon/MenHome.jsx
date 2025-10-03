// src/pages/MenSalon/MenHome.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImg from "../../assets/mensalon.png"; // Hero Image
import haircutImg from "../../assets/salon.jpg";
import theropyImg from "../../assets/theropy.jpg";
import beardImg from "../../assets/beard1.jpg";
import facialImg from "../../assets/facial.jpg";
import hairImg from "../../assets/hair.jpg";
import menicureImg from "../../assets/menicure.jpg";
import ayurvedaImg from "../../assets/ayurveda.jpg";
import massageImg from "../../assets/massage.jpg";




const MenHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("salon");
  const [selectedService, setSelectedService] = useState(null); // for View Details
  const [bookingService, setBookingService] = useState(null); // for Book modal
  const navigate = useNavigate();

  // Categories
  const salonServices = [
    { id: 1, name: "Hair & Beard", img: hairImg },
    { id: 2, name: "Detan & facial", img: facialImg },
    { id: 3, name: "Menicure & pedicure", img: menicureImg },
  ];

  const groomingServices = [
    { id: 3, name: "Ayurveda", img: ayurvedaImg  },
    { id: 4, name: "Massage", img: massageImg },
  ];

  // Sub-services for modal
const subServicesMap = {
  "Hair & Beard": [
    { id: 11, name: "Classic Haircut", price: "₹299", img: haircutImg, route: "/mensalon/haircut" },
    { id: 12, name: "Beard Styling", price: "₹199", img: beardImg, route: "/mensalon/haircut" },
  ],
  "Detan & facial": [
    { id: 13, name: "Detan", price: "₹499", img: facialImg, route: "/mensalon/detan" },
    { id: 14, name: "Facial", price: "₹999", img: facialImg, route: "/mensalon/detan" },
  ],
  "Menicure & pedicure": [
    { id: 15, name: "Hand & Toe care", price: "₹699", img: menicureImg, route: "/mensalon/menicure" },
    { id: 16, name: "Pedicure", price: "₹799", img: menicureImg, route: "/mensalon/menicure" },
  ],
  Ayurveda: [
    { id: 17, name: "Ayurvedic Therapy", price: "₹1499", img: ayurvedaImg, route: "/mensalon/ayurveda" },
    { id: 18, name: "Body Relaxing", price: "₹1499", img: ayurvedaImg, route: "/mensalon/ayurveda" },
  ],
  Massage: [
    { id: 18, name: "Head Massage", price: "₹299", img: massageImg, route: "/mensalon/massage" },
    { id: 19, name: "Full Body Massage", price: "₹1499", img: massageImg, route: "/mensalon/massage" },
  ],
};

  // Most Demanding Services
  const mostDemandingServices = [
    { id: 21, name: "Premium Haircut", price: "₹499", img: haircutImg },
    { id: 22, name: "Luxury Beard Grooming", price: "₹399", img: beardImg },
    { id: 23, name: "Brightening Facial", price: "₹899", img: facialImg },
    { id: 24, name: "Relaxing Body Massage", price: "₹1299", img: massageImg },
  ];

  const options = subServicesMap[selectedService?.name] || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-8 md:py-12 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[220px]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              MEN SALON & GROOMING
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Professional salon & grooming services at home.
            </p>
          </div>
          <img
            src={menImg}
            alt="Men Salon"
            className="w-40 md:w-56 object-contain"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Book by category</h3>
        <div className="grid grid-cols-2 gap-6">
          <div
            onClick={() => setSelectedCategory("salon")}
            className="cursor-pointer relative rounded-lg overflow-hidden shadow-md"
          >
            <img src={haircutImg} alt="Salon" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">
              Salon for Men
            </div>
          </div>
          <div
            onClick={() => setSelectedCategory("grooming")}
            className="cursor-pointer relative rounded-lg overflow-hidden shadow-md"
          >
            <img src={theropyImg} alt="Grooming" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold">
              Theropy
            </div>
          </div>
        </div>
      </section>

      {/* Salon Services */}
      {selectedCategory === "salon" && (
        <section className="py-10 px-6 md:px-16">
          <h3 className="text-xl font-semibold mb-6">Explore Salon Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {salonServices.map((srv) => (
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

      {/* Grooming Services */}
      {selectedCategory === "grooming" && (
        <section className="py-10 px-6 md:px-16">
          <h3 className="text-xl font-semibold mb-6">Explore Grooming Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groomingServices.map((srv) => (
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

      {/* Modal for Categories */}
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
                  }
                  className="border p-4 rounded-lg text-center cursor-pointer hover:shadow-md"
                >
                  <img src={sub.img} alt={sub.name} className="w-20 h-20 mx-auto mb-2 object-cover rounded-md" />
                  <p className="font-medium">{sub.name}</p>
                  {sub.price && (
                    <p className="text-sm text-gray-600">{sub.price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Most Demanding Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Most Demanding Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mostDemandingServices.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-full h-40 object-contain bg-gray-50"
              />
              <div className="p-4">
                <p className="font-semibold text-gray-800">{service.name}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  ⭐⭐⭐⭐⭐ <span className="ml-1">(120)</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  starts at <span className="font-medium">{service.price}</span>
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => setBookingService(service)}
                    className="bg-[#023E8A] text-white px-3 py-1 text-sm rounded-md hover:bg-[#0353A4]"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View Details Modal */}
      {selectedService && mostDemandingServices.includes(selectedService) && (
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
              alt={selectedService.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800">{selectedService.name}</h3>
            <p className="text-sm text-yellow-500">⭐⭐⭐⭐☆</p>
            <p className="mt-2 text-gray-600">High quality {selectedService.name} service.</p>
            <p className="mt-2 text-gray-800 font-semibold">Price: {selectedService.price}</p>
          </div>
        </div>
      )}

      {/* Booking Modal */}
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
              <h2 className="text-2xl font-bold text-gray-800">{bookingService.name}</h2>
              <p className="text-gray-600 mt-1">⭐⭐⭐⭐⭐ <span className="ml-2">(10K+ bookings)</span></p>
              <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-3 flex flex-col items-center">
                  <img src={bookingService.img} alt={bookingService.name} className="w-16 h-16 object-contain" />
                  <p className="font-medium text-blue-600 mt-2">{bookingService.name}</p>
                  <p className="text-gray-700">{bookingService.price}</p>
                  <button className="mt-2 bg-blue-200 text-blue-800 px-3 py-1 rounded">
                    Add
                  </button>
                </div>
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

export default MenHome;
