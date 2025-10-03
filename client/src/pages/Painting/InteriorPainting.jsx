// src/pages/Painting/InteriorPainting.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import workerImg from "../../assets/painting-man.png"; // hero image
import wallImg from "../../assets/wallpainting.jpg";
import roomImg from "../../assets/roompainting.png";
import ceilingImg from "../../assets/ceiling.jpg";
import interiorImg from "../../assets/interiorImg.jpg";
import exteriorImg from "../../assets/exteriorImg.jpg";
import smallHouseImg from "../../assets/smallHouse.jpg";
import puttyWorkImg from "../../assets/wallputty.jpeg";
import apartmentImg from "../../assets/apartment.jpg";

const InteriorPainting = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Painting Services
  const exploreServices = [
    {
      id: 1,
      name: "Full Home Painting",
      img: interiorImg,
      path: "/painting/interior", // 👈 route to interior page
    },
    {
      id: 2,
      name: "Walls and Rooms Painting",
      img: exteriorImg,
      path: "/painting/wallspainting", // 👈 route to exterior page
    },
  ];

  // ✅ Interior Painting Services
  const services = [
    {
      id: 1,
      title: "Wall Painting",
      price: "₹499",
      rating: "★★★★☆",
      description: "High-quality wall painting with professional finish.",
      img: wallImg,
      options: [
        { name: "1 Room Wall Painting", price: "₹499" },
        { name: "2 Room Wall Painting", price: "₹899" },
      ],
    },
    {
      id: 2,
      title: "Room Painting",
      price: "₹1499",
      rating: "★★★★★",
      description: "Complete room painting with walls + ceiling.",
      img: roomImg,
      options: [
        { name: "1 BHK Room Painting", price: "₹1499" },
        { name: "2 BHK Room Painting", price: "₹2499" },
      ],
    },
    {
      id: 3,
      title: "Ceiling Painting",
      price: "₹799",
      rating: "★★★☆☆",
      description: "Smooth ceiling painting with premium paints.",
      img: ceilingImg,
      options: [
        { name: "Single Room Ceiling", price: "₹799" },
        { name: "Full Home Ceiling", price: "₹1999" },
      ],
    },
  ];

   // ✅ Extra Installations
  const installations = [
    {
      id: 1,
      title: "Small House Exterior Painting",
      price: "₹4,999",
      rating: "★★★★☆",
      description: "Perfect for small homes up to 500 sq. ft. with weatherproof paints.",
      img: smallHouseImg,
      options: [
        { name: "Standard Exterior Emulsion", price: "₹4,999" },
        { name: "Weatherproof Exterior Paint", price: "₹6,499" },
      ],
    },
    {
      id: 2,
      title: "Wall Putty Work",
      price: "₹399",
      rating: "★★★☆☆",
      description: "Smooth surface preparation with high-quality wall putty.",
      img: puttyWorkImg,
      options: [
        { name: "Single Room Putty Work", price: "₹399" },
        { name: "Full House Putty Work", price: "₹1,499" },
      ],
    },
    {
      id: 3,
      title: "Apartment Exterior Painting",
      price: "₹7,999",
      rating: "★★★★★",
      description: "Best for apartments up to 1000 sq. ft. with premium finish.",
      img: apartmentImg,
      options: [
        { name: "Standard Emulsion", price: "₹7,999" },
        { name: "Premium Weatherproof", price: "₹10,999" },
      ],
    },
  ];


  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-16 flex justify-between items-center">
        <div className="pl-4 md:pl-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Full Home Painting
          </h2>
          <p className="mt-2 text-gray-600">Home / Painting</p>
        </div>
        <img
          src={workerImg}
          alt="Worker"
          className="w-72 md:w-96 lg:w-[28rem] object-contain pr-4 md:pr-8"
        />
      </section>

      {/* 🔹 Explore Painting Services */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Painting Services</h3>
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

      {/* 🔹 Services */}
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

     
      {/* 🔹 Installations */}
<section className="py-10 px-6 md:px-16">
  <h3 className="text-xl font-semibold mb-6">Installations</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  <p className="text-sm text-gray-500 mt-1">{inst.description}</p>

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


      {/* 🔹 View Details Modal */}
   {/* View Details Modal */}
{selectedService && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
      
      {/* Close Button */}
      <button
        onClick={() => setSelectedService(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={selectedService.img}
        alt={selectedService.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800">
        {selectedService.title}
      </h3>

      {/* Rating */}
      <p className="text-sm text-yellow-500">
        ⭐ {selectedService.rating}
      </p>

      {/* Description */}
      <p className="mt-2 text-gray-600">{selectedService.description}</p>

      {/* Price */}
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

        <h3 className="mt-4 font-semibold text-gray-800">Select a service</h3>
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

export default InteriorPainting;
