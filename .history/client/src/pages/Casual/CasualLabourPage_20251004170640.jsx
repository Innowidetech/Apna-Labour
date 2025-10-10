import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

const CasualLabour = () => {
  const { id } = useParams();
  const [labourType, setLabourType] = useState("Team");
  const [labourers, setLabourers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLabourers = async (type) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setLabourers(data);
    } catch (err) {
      setError("Something went wrong while fetching labourers.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLabourers(labourType);
  }, [labourType]);

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      {/* Header Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">CASUAL LABOURER</h2>
          <p className="text-gray-500 text-sm mt-1">Home / Casual Labourer / Request {labourType}</p>
        </div>
        <img
          src={workerImg}
          alt="Casual Labour"
          className="w-32 md:w-48 object-contain"
        />
      </section>

      {/* Search + Buttons */}
      <div className="px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 w-full md:w-1/2">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search availability"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search nearby location"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setLabourType("Individual")}
            className={`px-5 py-2 rounded-md font-medium ${
              labourType === "Individual"
                ? "bg-[#002D74] text-white"
                : "bg-white border"
            }`}
          >
            Request Individual
          </button>
          <button
            onClick={() => setLabourType("Team")}
            className={`px-5 py-2 rounded-md font-medium ${
              labourType === "Team"
                ? "bg-[#002D74] text-white"
                : "bg-white border"
            }`}
          >
            Request Team
          </button>
        </div>
      </div>

      {/* Helper Section */}
      <div className="px-6 md:px-16">
        <h3 className="text-lg font-semibold mb-4">
          Choose Your Helper {labourType}
        </h3>

        {isLoading && <p>Loading {labourType}...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {labourers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.image || workerImg}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <h4 className="font-semibold text-base">{item.teamName || item.name}</h4>
              <p className="text-sm text-gray-600">{item.skills?.join(", ") || "Lifting, Packing"}</p>
              <p className="text-xs text-gray-500">{item.experience || "5+ years exp"}</p>
              <p className="font-medium mt-1">
                ₹{item.price || "295"}/per {labourType === "Team" ? "labour" : "day"}
              </p>
              <p className="text-green-600 text-xs font-medium mt-1">
                Available Today
              </p>
              <div className="flex justify-between items-center gap-3 mt-3">
                <button className="bg-[#002D74] text-white px-3 py-1.5 rounded-md text-sm">
                  Request a {labourType}
                </button>
                <button className="text-[#002D74] text-sm underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        <div className="text-center mt-6">
          <button className="text-[#002D74] font-medium text-sm underline">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CasualLabour;
