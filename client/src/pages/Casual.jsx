// src/pages/Casual.jsx
import React, { useState } from "react";
import { MapPin, Star, X } from "lucide-react";
import worker1 from "../assets/worker.png";
import worker2 from "../assets/worker2.png";

const teams = [
  {
    id: 1,
    teamName: "TEAM A",
    leader: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    members: 20,
    price: "₹95/per labor",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
  {
    id: 2,
    teamName: "TEAM B",
    leader: "Ravi Kumar",
    skills: "Lifting, Packing",
    experience: "5+ years exp",
    members: 20,
    price: "₹95/per labor",
    rating: 4.6,
    reviews: 128,
    availability: "Available Today",
    available: true,
    distance: "6.2Km",
    image: worker2,
  },
];

// Sample laborers data
const laborers = [
  { id: 1, name: "Rakesh Chandra", language: "Hindi/Telugu", exp: "2 Years" },
  { id: 2, name: "Lina Tina", language: "Hindi", exp: "6 Months" },
  { id: 3, name: "Sri Narayan Rao", language: "Hindi/Telugu", exp: "1 Year" },
  { id: 4, name: "Heba Nawab", language: "Telugu", exp: "5 Years" },
  { id: 5, name: "Subhash Banerjee", language: "Hindi/Telugu", exp: "3 Years" },
  { id: 6, name: "Renuka Goud", language: "Hindi/Telugu", exp: "1 Year" },
  { id: 7, name: "Akash Jamin Par", language: "Hindi", exp: "2 Years" },
  { id: 8, name: "Somwar Kumar", language: "Hindi/Telugu", exp: "10 Years" },
  { id: 9, name: "Taruna Chakrabedi", language: "Hindi/Telugu", exp: "8 Years" },
  { id: 10, name: "Shubham Ghibela", language: "Telugu", exp: "1 Year" },
];

const Casual = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedLaborer, setSelectedLaborer] = useState(null);
  const [viewMode, setViewMode] = useState("team"); // "team" | "individual"

  return (
    <div className="w-full">
      {/* Banner */}
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

      {/* Search + Actions */}
      <section className="w-full px-6 md:px-12 mt-6">
        <div className="text-sm text-gray-500 text-right mb-4">
          Home / <span className="font-medium text-gray-700">Casual Laborer</span> / Request{" "}
          {viewMode === "team" ? "Team" : "Individual"}
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* LEFT SIDE (Search) */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search nearby location"
                className="outline-none text-sm flex-1"
              />
            </div>
          </div>

          {/* RIGHT SIDE (Buttons) */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("individual")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 font-medium transition ${
                viewMode === "individual"
                  ? "bg-[#04395E] text-white"
                  : "bg-white text-[#04395E] border-gray-300"
              }`}
            >
              Request Individual
            </button>
            <button
              onClick={() => setViewMode("team")}
              className={`flex items-center gap-2 border rounded-md px-4 py-2 font-medium transition ${
                viewMode === "team"
                  ? "bg-[#04395E] text-white"
                  : "bg-white text-[#04395E] border-gray-300"
              }`}
            >
              Request Team
            </button>
          </div>
        </div>
      </section>

      {/* Teams or Individuals Grid */}
      <section className="w-full px-6 md:px-12 mt-8">
        {viewMode === "team" ? (
          <>
            <h3 className="font-semibold text-lg mb-4">Choose Your Helper Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition relative"
                >
                  {/* Distance */}
                  <p className="absolute top-3 right-3 text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {team.distance}
                  </p>

                  <div className="flex items-start gap-4">
                    <img
                      src={team.image}
                      alt={team.teamName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#04395E]">{team.teamName}</h3>
                      <p className="text-sm font-medium">{team.leader}</p>
                      <p className="text-sm text-gray-600">{team.skills}</p>
                      <p className="text-sm text-gray-500">{team.experience}</p>
                      <p className="text-sm text-gray-600">{team.members} laborers</p>
                      <p className="font-semibold text-gray-900 mt-1">{team.price}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-1 text-yellow-500">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                    <span className="text-gray-600 text-sm ml-2">
                      {team.rating} ({team.reviews})
                    </span>
                  </div>

                  {/* Availability */}
                  <p
                    className={`mt-2 text-sm font-medium ${
                      team.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {team.availability}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-[#04395E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#032c47] transition">
                      Request a Team
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeam(team);
                        setShowModal(true);
                      }}
                      className="text-[#04395E] text-sm font-medium hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-lg mb-4">Choose Your Individual Helper</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {laborers.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition relative"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={worker1}
                      alt={lab.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#04395E]">{lab.name}</h3>
                      <p className="text-sm text-gray-600">{lab.language}</p>
                      <p className="text-sm text-gray-500">{lab.exp}</p>
                      <p className="font-semibold text-gray-900 mt-1">₹150/day</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <p className="mt-2 text-sm font-medium text-green-600">
                    Available Today
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-[#04395E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#032c47] transition">
                      Book Now
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLaborer(lab);
                        setShowModal(true);
                      }}
                      className="text-[#04395E] text-sm font-medium hover:underline"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Modal */}
      {showModal && (selectedTeam || selectedLaborer) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close */}
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedTeam(null);
                setSelectedLaborer(null);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedTeam ? selectedTeam.image : worker1}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-xl font-bold text-[#04395E]">
                  {selectedTeam ? selectedTeam.leader : selectedLaborer.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-gray-700">4.6</span>
                  <span className="text-sm text-gray-500">(128)</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Location:</span> Hyderabad</p>
              <p><span className="font-semibold">Services:</span> Lifting & Loading, Packaging</p>
              <p><span className="font-semibold">Available:</span> Monday to Saturday</p>
              <p><span className="font-semibold">Experience:</span> 6 years</p>
              <p><span className="font-semibold">Languages:</span> Hindi & Telugu</p>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">About our workers</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Skilled & Verified Professionals</li>
                <li>Punctual, Reliable & Hardworking</li>
                <li>Flexible Services, Tailored to Your Needs</li>
              </ul>
            </div>

            {/* Ratings & Reviews */}
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">Ratings & Reviews</h3>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#04395E]">4.3</span>
                <div className="flex-1">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center text-sm text-gray-600">
                      <span className="w-4">{star}</span>
                      <div className="flex-1 mx-2 bg-gray-200 h-2 rounded">
                        <div className="bg-green-500 h-2 rounded w-[70%]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="mt-6 space-y-4">
              <div className="border-b pb-3">
                <p className="text-sm font-medium">A J (thatguy87)</p>
                <p className="text-xs text-gray-500">23 July 2025</p>
                <p className="text-sm text-gray-600 mt-1">
                  Left the floor unclean with shoe marks all over, used newspaper did not throw in dustbin. Rude behavior saying it's not their job.
                </p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm font-medium">Manas Deep</p>
                <p className="text-xs text-gray-500">22 July 2025</p>
                <p className="text-sm text-gray-600 mt-1">
                  The poster tried to highlight issue in one of the AC installed and was trying to charge us 1000/-...
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Kumbharan</p>
                <p className="text-xs text-gray-500">21 July 2025</p>
                <p className="text-sm text-gray-600 mt-1">
                  I recently had AC installed and was extremely impressed with the service...
                </p>
              </div>
            </div>

            {/* Show More */}
            <div className="mt-4 flex justify-center">
              <button className="text-sm font-medium text-[#04395E] hover:underline">
                Show More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Casual;
