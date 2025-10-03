// src/pages/MenSalon/Ayurveda.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menImg from "../../assets/mensalon.png"; // hero image
import ayurvedaImg from "../../assets/massage.jpg";
import spaImg from "../../assets/facial.jpg";
import detoxImg from "../../assets/menicure.jpg";
import stressImg from "../../assets/pedicure.jpg";
import rejuvenationImg from "../../assets/salon.jpg";
import ayurveda from "../../assets/ayurveda.jpg";
import massageImg from "../../assets/massage.jpg";

const Ayurveda = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Services
  const exploreServices = [
    { id: 1, name: "Ayurveda", img: ayurveda, path: "/mensalon/ayurveda" },
    { id: 2, name: "Massage", img: massageImg, path: "/mensalon/massage" },
  ];

  // ✅ Ayurveda Therapies
  const ayurvedaTherapies = [
    {
      id: 1,
      title: "Shirodhara",
      price: "₹1999",
      rating: "★★★★☆",
      description:
        "Continuous oil therapy on forehead to relieve stress and enhance focus.",
      img: spaImg,
      options: [
        { name: "Basic Shirodhara", price: "₹1999" },
        { name: "Luxury Shirodhara", price: "₹2499" },
      ],
    },
    {
      id: 2,
      title: "Detox Therapy",
      price: "₹1299",
      rating: "★★★★☆",
      description:
        "Ayurvedic cleansing therapy that removes toxins and improves digestion.",
      img: detoxImg,
      options: [
        { name: "Basic Detox", price: "₹1299" },
        { name: "Advanced Detox", price: "₹1799" },
      ],
    },
    {
      id: 3,
      title: "Anti-Stress Therapy",
      price: "₹999",
      rating: "★★★★★",
      description:
        "Special herbal therapy to reduce anxiety, tension and fatigue.",
      img: stressImg,
      options: [
        { name: "Basic Anti-Stress", price: "₹999" },
        { name: "Deluxe Anti-Stress", price: "₹1499" },
      ],
    },
    {
      id: 4,
      title: "Rejuvenation Therapy",
      price: "₹2499",
      rating: "★★★★★",
      description:
        "Complete revitalization using herbal oils for glowing skin and energy.",
      img: rejuvenationImg,
      options: [
        { name: "Basic Rejuvenation", price: "₹2499" },
        { name: "Luxury Rejuvenation", price: "₹2999" },
      ],
    },
  ];

  // ✅ Body Relaxing Massages
  const bodyRelaxingServices = [
    {
      id: 5,
      title: "Abhyangam (Full Body Massage)",
      price: "₹1499",
      rating: "★★★★★",
      description:
        "Traditional warm oil massage that detoxifies and improves blood circulation.",
      img: ayurvedaImg,
      options: [
        { name: "Basic Abhyangam", price: "₹1499" },
        { name: "Luxury Abhyangam", price: "₹1999" },
      ],
    },
    {
      id: 6,
      title: "Herbal Oil Massage",
      price: "₹1799",
      rating: "★★★★☆",
      description:
        "Massage using special herbal oils for relaxation & pain relief.",
      img: massageImg,
      options: [
        { name: "Basic Herbal Massage", price: "₹1799" },
        { name: "Luxury Herbal Massage", price: "₹2299" },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-8 md:py-12 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center min-h-[220px]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              MEN SALON & AYURVEDA
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Traditional ayurvedic therapies & body relaxing massages for
              stress relief & wellness.
            </p>
          </div>
          <img
            src={menImg}
            alt="Ayurveda"
            className="w-40 md:w-56 object-contain"
          />
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

      {/* 🔹 Ayurveda Therapies */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Ayurveda Therapies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ayurvedaTherapies.map((srv) => (
            <ServiceCard
              key={srv.id}
              srv={srv}
              setSelectedService={setSelectedService}
              setBookingService={setBookingService}
            />
          ))}
        </div>
      </section>

      {/* 🔹 Body Relaxing Massages */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Body Relaxing Massages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bodyRelaxingServices.map((srv) => (
            <ServiceCard
              key={srv.id}
              srv={srv}
              setSelectedService={setSelectedService}
              setBookingService={setBookingService}
            />
          ))}
        </div>
      </section>

      {/* 🔹 Modals (reuse) */}
      {selectedService && (
        <DetailsModal
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
      {bookingService && (
        <BookingModal
          bookingService={bookingService}
          setBookingService={setBookingService}
          navigate={navigate}
        />
      )}
    </div>
  );
};

/* 🔹 Reusable Components */
const ServiceCard = ({ srv, setSelectedService, setBookingService }) => (
  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
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
);

const DetailsModal = ({ selectedService, setSelectedService }) => (
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
);

const BookingModal = ({ bookingService, setBookingService, navigate }) => (
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
          {bookingService.rating} <span className="ml-2">(2K+ bookings)</span>
        </p>
        <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
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
);

export default Ayurveda;
