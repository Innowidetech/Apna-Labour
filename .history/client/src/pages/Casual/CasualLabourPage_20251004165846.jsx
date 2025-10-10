import React, { useEffect, useState } from "react";
import axios from "axios";

const CasualLabour = () => {
  const [labourers, setLabourers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Team"); // Default Team
  const [search, setSearch] = useState("");

  // Fetch API data
  const fetchLabourers = async (labourType) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${labourType}`
      );
      setLabourers(res.data || []);
    } catch (err) {
      console.error("Error fetching labourers:", err);
      setLabourers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabourers(type);
  }, [type]);

  // Filter search
  const filteredLabourers = labourers.filter((lab) =>
    lab.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Casual Labour ({type})
      </h1>

      {/* Type Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setType("Team")}
          className={`px-4 py-2 rounded-lg font-medium ${
            type === "Team"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-600"
          }`}
        >
          Team
        </button>
        <button
          onClick={() => setType("Individual")}
          className={`px-4 py-2 rounded-lg font-medium ${
            type === "Individual"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-600"
          }`}
        >
          Individual
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded-lg px-4 py-2 w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredLabourers.length === 0 ? (
        <p className="text-center text-gray-500">No labourers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredLabourers.map((lab) => (
            <div
              key={lab._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={lab.photo || "https://via.placeholder.com/150"}
                alt={lab.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{lab.name}</h2>
              <p className="text-sm text-gray-600">Exp: {lab.experience} yrs</p>
              <p className="text-sm text-gray-600">
                Skills: {lab.skills?.join(", ")}
              </p>
              <p className="text-sm text-gray-800 font-medium mt-2">
                Rate: ₹{lab.rate}/day
              </p>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CasualLabour;
