// src/pages/Painting/WallPainting.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import workerImg from "../../assets/painting-man.png"; // hero image

// Example Explore Services images
import interiorImg from "../../assets/interiorImg.jpg";
import wallImg from "../../assets/interiorImg.jpg";
import singleWallImg from "../../assets/wallpainting.jpg";
import doubleWallImg from "../../assets/livingroom.jpg";
import textureWallImg from "../../assets/balcony.jpg";
import cabinetImg from "../../assets/cabinet.jpg";
import exteriorImg from "../../assets/exteriorImg.jpg";
import furnished from "../../assets/furnished.jpg";
import unfurnished from "../../assets/unfurnished.jpg";

const WallsPainting = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const navigate = useNavigate();

  // ✅ Explore Painting Services
  const exploreServices = [
    { id: 1, name: "Full Home Painting", img: interiorImg, path: "/painting/interior" },
    { id: 2, name: "Walls and Rooms Painting", img: exteriorImg, path: "/painting/wallspainting" },
  ];

  // ✅ Wall Painting Services
  const services = [
    {
      id: 1,
      title: " Walls Painting",
      price: "₹299",
      rating: "★★★★☆",
      description: "Professional painting for a single wall with smooth finish.",
      img: singleWallImg,
      options: [
        { name: "Small Wall", price: "₹299" },
        { name: "Large Wall", price: "₹499" },
      ],
    },
    {
      id: 2,
      title: "Livingroom and bedroom painting",
      price: "₹599",
      rating: "★★★★★",
      description: "Get two walls painted with premium paints for long-lasting finish.",
      img: doubleWallImg,
      options: [
        { name: "Standard Size (2 Walls)", price: "₹599" },
        { name: "Large Size (2 Walls)", price: "₹899" },
      ],
    },
    {
      id: 3,
      title: "Kitchen, bathroom & balcony",
      price: "₹1499",
      rating: "★★★★☆",
      description: "Beautiful wall textures to add luxury and uniqueness to your home.",
      img: textureWallImg,
      options: [
        { name: "Single Wall Texture", price: "₹1499" },
        { name: "Full Room Texture", price: "₹3499" },
      ],
    },
      {
      id: 4,
      title: "Doors, grills & cabinets",
      price: "₹1499",
      rating: "★★★★☆",
      description: "Beautiful wall textures to add luxury and uniqueness to your home.",
      img: cabinetImg,
      options: [
        { name: "Single Wall Texture", price: "₹1499" },
        { name: "Full Room Texture", price: "₹3499" },
      ],
    },
  ];

 
 // ✅ Extra Installations
const installations = [
  {
    id: 1,
    title: "Furnished Full Home Painting",
    price: "₹199",
    rating: "★★★★☆",
    description: "Quick and professional painting service for furnished homes.",
    img: furnished,
    options: [
      { name: "1 BHK", price: "₹199" },
      { name: "2 BHK", price: "₹399" },
    ],
  },
  {
    id: 2,
    title: "Unfurnished Full Home Painting",
    price: "₹399",
    rating: "★★★★★",
    description: "Affordable and long-lasting painting for unfurnished homes.",
    img: unfurnished,
    options: [
      { name: "2 BHK", price: "₹399" },
      { name: "3 BHK", price: "₹699" },
    ],
  },
];


  return (
    <div className="w-full">
      {/* 🔹 Hero Section */}
      <section className="bg-[#EDF2FB] py-16 flex justify-between items-center">
        <div className="pl-4 md:pl-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Walls and Rooms Painting
          </h2>
          <p className="mt-2 text-gray-600">Home / Painting</p>
        </div>
        <img
          src={workerImg}
          alt="Worker"
          className="w-72 md:w-96 lg:w-[28rem] object-contain pr-4 md:pr-8"
        />
      </section>

      {/* 🔹 Explore Services Section */}
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-xl font-semibold mb-6">Explore Painting Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exploreServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => navigate(srv.path)}
              className="cursor-pointer p-4 flex flex-col items-center border rounded-md hover:shadow-lg"
            >
              <img
                src={srv.img}
                alt={srv.name}
                className="w-24 h-24 object-contain"
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

      {/* Service Image */}
      <img
        src={selectedService.img}
        alt={selectedService.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Title & Rating */}
      <h3 className="text-lg font-bold text-gray-800">
        {selectedService.title}
      </h3>
      <p className="text-sm text-yellow-500">{selectedService.rating}</p>

      {/* Description */}
      <p className="mt-2 text-gray-600">{selectedService.description}</p>

      {/* Price */}
      <p className="mt-2 text-gray-800 font-semibold">
        Price: {selectedService.price}
      </p>

      {/* Options (if available) */}
      {selectedService.options && (
        <ul className="mt-3 space-y-2">
          {selectedService.options.map((opt, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center border-b pb-1 text-sm"
            >
              <span>{opt.name}</span>
              <span className="font-medium">{opt.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}

  
   {/* 🔹 Booking Modal */}
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
            setBookingService(null); // close modal
            navigate("/viewcart");   // ✅ go to cart page
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

export default WallsPainting;
