// src/pages/MenSalon/Massage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/massage.jpg"; 
import massageImg from "../../assets/massage.jpg";
import theropyImg from "../../assets/theropy.jpg";
import luxuryImg from "../../assets/facial.jpg";
import ayurveda from "../../assets/ayurveda.jpg";

const Massage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Services
  const exploreServices = [
    {
      id: 1,
      name: "Ayurveda",
      img: ayurveda,
      path: "/mensalon/ayurveda",
    },
    {
      id: 2,
      name: "Massage",
      img: massageImg,
      path: "/mensalon/massage",
    },
  ];

  // ✅ Head Massage Services
  const headMassageServices = [
    {
      id: 1,
      title: "Classic Head Massage",
      price: "₹599",
      rating: "★★★★☆",
      description:
        "Traditional scalp massage for relaxation & hair health.",
      img: massageImg,
      options: [
        { name: "With Oil", price: "₹699" },
        { name: "Without Oil", price: "₹599" },
      ],
    },
    {
      id: 2,
      title: "Hot Oil Head Massage",
      price: "₹799",
      rating: "★★★★★",
      description:
        "Warm oil massage for stress relief & dandruff control.",
      img: theropyImg,
      options: [
        { name: "Coconut Oil Massage", price: "₹799" },
        { name: "Ayurvedic Oil Massage", price: "₹999" },
      ],
    },
    {
      id: 3,
      title: "Head, Neck & Shoulder Massage",
      price: "₹999",
      rating: "★★★★★",
      description:
        "Relieves stiffness & relaxes upper body muscles.",
      img: luxuryImg,
      options: [
        { name: "Quick Session (20 mins)", price: "₹699" },
        { name: "Full Session (40 mins)", price: "₹999" },
      ],
    },
  ];

  // ✅ Full Body Massage Services
  const fullBodyMassageServices = [
    {
      id: 1,
      title: "Swedish Full Body Massage",
      price: "₹1999",
      rating: "★★★★★",
      description: "Gentle, relaxing strokes for stress relief & relaxation.",
      img: massageImg,
      options: [
        { name: "Classic Swedish Massage", price: "₹1999" },
        { name: "Luxury Swedish Massage", price: "₹2499" },
      ],
    },
    {
      id: 2,
      title: "Deep Tissue Massage",
      price: "₹2299",
      rating: "★★★★★",
      description: "Strong pressure to relieve muscle stiffness & chronic pain.",
      img: theropyImg,
      options: [
        { name: "Back Therapy Massage", price: "₹999" },
        { name: "Full Body Therapy Massage", price: "₹2299" },
      ],
    },
    {
      id: 3,
      title: "Thai Full Body Massage",
      price: "₹2499",
      rating: "★★★★★",
      description: "Traditional Thai massage with stretching & pressure points.",
      img: luxuryImg,
      options: [
        { name: "Traditional Thai Massage", price: "₹2499" },
        { name: "Herbal Thai Massage", price: "₹2999" },
      ],
    },
    {
      id: 4,
      title: "Aromatherapy Massage",
      price: "₹2499",
      rating: "★★★★★",
      description: "Massage with essential oils for body relaxation & mood boost.",
      img: luxuryImg,
      options: [
        { name: "Essential Oil Massage", price: "₹2499" },
        { name: "Luxury Aroma Therapy", price: "₹2999" },
      ],
    },
  ];

  // 🔹 Card Renderer (reuse for head & body)
  const renderServiceCards = (services) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );

  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-8 md:py-12 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[220px]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              MEN SALON & GROOMING
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Professional massage & therapy services at home.
            </p>
          </div>
          <img src={heroImg} alt="Massage" className="w-40 md:w-56 object-contain" />
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

      {/* 🔹 Head Massage Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Head Massage Services</h3>
        {renderServiceCards(headMassageServices)}
      </section>

      {/* 🔹 Full Body Massage Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Full Body Massage Services</h3>
        {renderServiceCards(fullBodyMassageServices)}
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
                {bookingService.rating}{" "}
                <span className="ml-2">(2K+ bookings)</span>
              </p>
              <h3 className="mt-4 font-semibold text-gray-800">
                Select a service
              </h3>
              <p className="text-sm text-gray-500">Choose any option</p>
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

export default Massage;
