import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import repairMan from "../assets/repairMan.png";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams(); // Category ID
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState({ title: "", image: "" });
  const [subcategories, setSubcategories] = useState([]);
  const [casualLabour, setCasualLabour] = useState([]);
  const [activeType, setActiveType] = useState("Team");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);

  const [error, setError] = useState(null);

  // Booking modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLabourId, setSelectedLabourId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [duration, setDuration] = useState(0);

  // Modal for service details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoadingServiceDetail, setIsLoadingServiceDetail] = useState(false);
  const [errorServiceDetail, setErrorServiceDetail] = useState(null);

  // Fetch hero data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/hero/${id}`
        );
        const data = await res.json();
        if (res.ok) {
          setHeroData(data.hero || {});
        } else {
          // Default fallback for casual labour
          setHeroData({
            title: "Casual Labour",
            image:
              "https://res.cloudinary.com/dmlts9lbp/image/upload/v1728213145/hero/labour.jpg",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch hero data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, [id]);

  // Fetch subcategories for normal services
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/subcategories/${id}`
        );
        const data = await res.json();
        if (res.ok) {
          setSubcategories(data.subcategories || []);
        } else {
          setSubcategories([]);
        }
      } catch (err) {
        console.error(err);
        setSubcategories([]);
      }
    };

    if (id !== "68da0dc93dd4c3ca03a6f274") {
      fetchSubcategories();
    }
  }, [id]);

  // Fetch casual labour data (Team / Individual)
  const fetchCasualLabour = async (type) => {
    try {
      setIsLoadingCasualLabour(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();
      if (res.ok) {
        setCasualLabour(data.labourers || []);
      } else {
        setCasualLabour([]);
      }
    } catch (err) {
      console.error(err);
      setCasualLabour([]);
    } finally {
      setIsLoadingCasualLabour(false);
    }
  };

  useEffect(() => {
    if (id === "68da0dc93dd4c3ca03a6f274") {
      fetchCasualLabour(activeType);
    }
  }, [id, activeType]);

  // Function to calculate duration
  const calculateDays = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    const diff = (endD - startD) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  };

  useEffect(() => {
    if (startDate && endDate) {
      setDuration(calculateDays(startDate, endDate));
    }
  }, [startDate, endDate]);

  // Handle booking API call
  const handleBooking = async () => {
    if (!selectedLabourId || !startDate || !endDate) {
      alert("Please fill all fields before booking.");
      return;
    }

    try {
      setIsBookingLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login first.");
        setIsBookingLoading(false);
        return;
      }

      const payload = {
        labourer: selectedLabourId,
        startDate,
        endDate,
        duration,
      };

      console.log("Booking payload:", payload);

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/labour-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Booking response:", data);

      if (res.ok) {
        alert("Booking confirmed successfully!");
        setIsBookingModalOpen(false);
        setStartDate("");
        setEndDate("");
        setDuration(0);
      } else {
        alert(data.message || "Booking failed. Please check your input.");
      }
    } catch (err) {
      console.error(err);
      alert("Error while booking. Try again later.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[250px] sm:h-[350px] mb-8">
        <img
          src={heroData.image || repairMan}
          alt={heroData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-5xl font-bold">
            {heroData.title}
          </h1>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4">
        {/* Normal Service Cards */}
        {id !== "68da0dc93dd4c3ca03a6f274" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subcategories.length > 0 ? (
              subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="border rounded-2xl shadow-md hover:shadow-lg transition-all bg-white p-4 cursor-pointer"
                  onClick={() => navigate(`/service/${sub._id}`)}
                >
                  <img
                    src={sub.image || repairMan}
                    alt={sub.name}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold">{sub.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No data found.
              </p>
            )}
          </div>
        )}

        {/* Casual Labour Section */}
        {id === "68da0dc93dd4c3ca03a6f274" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="flex gap-4 bg-gray-100 p-2 rounded-full">
                {["Team", "Individual"].map((type) => (
                  <button
                    key={type}
                    className={`px-6 py-2 rounded-full font-medium ${
                      activeType === type
                        ? "bg-[#003049] text-white"
                        : "bg-transparent text-gray-700"
                    }`}
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {isLoadingCasualLabour ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : casualLabour.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {casualLabour.map((labour) => (
                  <div
                    key={labour._id}
                    className="border rounded-2xl shadow-md hover:shadow-lg transition-all bg-white p-4 relative"
                  >
                    {/* Distance */}
                    <div className="absolute top-3 right-4 flex items-center gap-1 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-blue-600" />
                      <span>{labour.distance || "N/A"}</span>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center mb-3">
                      <img
                        src={labour.image || repairMan}
                        alt={labour.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-lg font-semibold text-center">
                      {labour.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {labour.skill || "General Labour"}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {labour.experience || "2+ years exp"}
                    </p>

                    <p className="text-center text-lg font-bold mb-2">
                      ₹{labour.cost || 150}/day
                    </p>

                    <div className="flex justify-center items-center gap-1 mb-1">
                      <span className="text-yellow-400 text-lg">★★★★☆</span>
                      <span className="text-sm text-gray-700">
                        {labour.averageRating || 4.6} (
                        {labour.totalReviews || 128})
                      </span>
                    </div>

                    <p className="text-green-600 text-sm text-center mb-4">
                      ●{" "}
                      {labour.isAvailable
                        ? "Available Today"
                        : "Not Available"}
                    </p>

                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition"
                        onClick={() => {
                          setSelectedLabourId(labour._id);
                          setIsBookingModalOpen(true);
                        }}
                      >
                        Book Now
                      </button>
                      <button className="text-blue-700 text-sm underline">
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No labourers found.</p>
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center text-[#003049]">
              Book Labour
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Total Duration */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Total Duration
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 bg-gray-100"
                  value={duration > 0 ? `${duration} Days` : ""}
                  readOnly
                />
              </div>

              <button
                className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition disabled:bg-gray-400"
                onClick={handleBooking}
                disabled={isBookingLoading}
              >
                {isBookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
