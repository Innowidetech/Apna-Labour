import React, { useState } from "react";
import { Search, MapPin, Users, Star, X } from "lucide-react";
import worker1 from "../assets/worker.png";
import worker2 from "../assets/worker2.png";

const workers = [
  {
    id: 1,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
  {
    id: 2,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Booked Today",
    available: false,
    distance: "6.2Km",
    image: worker2,
  },
    {
    id: 3,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
    {
    id: 4,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
    {
    id: 5,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
    {
    id: 6,
    name: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    price: "₹150/day",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
];

const Casual = () => {
  const [showModal, setShowModal] = useState(false);
  const [labourers, setLabourers] = useState("");
const [skill, setSkill] = useState("");
const [location, setLocation] = useState("");
const [purpose, setPurpose] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const days =
  startDate && endDate
    ? Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0;   

  return (
    <div className="w-full">
      {/* Banner Section */}
      <section className="bg-[#F2F7FF] w-full min-h-[250px] flex items-center justify-between px-6 md:px-12 rounded-xl overflow-hidden">
        <div className="flex-1 mt-40">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#04395E]">
            CASUAL LABORER
          </h2>
        </div>
        <div className="flex items-end gap-6 flex-shrink-0">
          <img
            src={worker1}
            alt="Worker carrying bricks"
            className="h-40 sm:h-48 md:h-56 object-contain"
          />
        </div>
      </section>

      {/* Breadcrumb + Filter/Search Section */}
      <section className="w-full px-6 md:px-12 mt-6">
        <div className="text-sm text-gray-500 text-right mb-4">
          Home / <span className="font-medium text-gray-700">Casual Laborer</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search availability"
              className="outline-none text-sm flex-1"
            />
          </div>

          <select className="border rounded-md px-3 py-2 text-sm bg-white shadow-sm">
            <option>Filter by skill</option>
            <option>Lifting Heavy items</option>
            <option>Loading & Unloading</option>
            <option>Packing help</option>
            <option>Digging/ ground work</option>
            <option>Furniture rearrangement</option>
            <option>Cleaning assistance</option>
            <option>Garden work</option>
            <option>Construction site helper</option>
            <option>painting assistant</option>
            <option>Labour for events</option>
          </select>

          <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm flex-1 sm:flex-none">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search nearby distance"
              className="outline-none text-sm flex-1"
            />
          </div>

          {/* Request Team Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border rounded-md px-4 py-2 bg-[#F2F7FF] text-[#04395E] font-medium hover:bg-[#e1f0ff] transition"
          >
            <Users className="w-4 h-4" />
            Request Team
          </button>
        </div>
      </section>

      {/* Workers Grid */}
      <section className="w-full px-6 md:px-12 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{worker.name}</h3>
                  <p className="text-sm text-gray-600">{worker.skills}</p>
                  <p className="text-sm text-gray-500">{worker.experience}</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {worker.price}
                  </p>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {worker.distance}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                  <span className="text-gray-600 text-sm ml-2">
                    {worker.rating} ({worker.reviews})
                  </span>
                </div>
              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  worker.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {worker.availability}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <button className="bg-[#04395E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#032c47] transition">
                  Book Now
                </button>
                <button className="text-[#04395E] text-sm font-medium hover:underline">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    
      {/* Modal Section */}
{showModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] md:w-[600px] relative max-h-[90vh] overflow-y-auto">
      
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Heading */}
      <h2 className="text-xl font-semibold">Request a team</h2>
      <p className="text-sm text-gray-500 mb-4">
        Whether it’s 1 or 20, we’ll get the right team to your doorstep, on time.
      </p>

      {/* Note / Formula */}
      <div className="bg-gray-100 text-xs text-center py-2 px-3 rounded-md border mb-4">
        Labour Charges = Total Labourers × Days × ₹250 <br />
        (Rate per Labour = ₹250)
      </div>

      {/* Form Fields */}
      <input
        type="number"
        placeholder="Enter number of workers"
        value={labourers}
        onChange={(e) => setLabourers(Number(e.target.value))}
        className="w-full border rounded-md px-3 py-2 text-sm mb-3"
      />

      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm mb-3"
      >
        <option>Select skill</option>
        <option>Lifting heavy items</option>
        <option>Loading & unloading</option>
        <option>Packing help</option>
        <option>Digging/ ground work</option>
        <option>Furniture rearrangement</option>
        <option>Cleaning assistance</option>
        <option>Garden work</option>
        <option>Construction site helper</option>
        <option>Painting assistant</option>
        <option>Labour for events</option>
      </select>

      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm mb-3"
      />

      <textarea
        placeholder="Write your purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm mb-3"
      />

      {/* Date Selector */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Date Selector</label>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Auto Calculator */}
      <div className="border-t pt-4 mt-4 text-sm">
        <p className="text-green-600 font-medium mb-2">Auto calculator</p>
        <div className="flex justify-between mb-1">
          <span>Total no.of days</span>
          <span>{days || "--"}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Total no.of Labourers</span>
          <span>{labourers || "--"}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Rate per labour</span>
          <span>₹250</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>{days && labourers ? `₹${labourers * days * 250}` : "--"}</span>
        </div>
      </div>

      {/* Pay Now Button (Disabled by default) */}
      <button
        disabled={!days || !labourers}
        className="w-full mt-5 py-2 rounded-md bg-gray-300 text-gray-600 font-medium cursor-not-allowed disabled:opacity-70"
      >
        Pay Now
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Casual;
