import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUsers, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import repairMan from "../assets/repairMan.png";

const ServiceDetails = () => {
  const { id } = useParams();

  const [heroData, setHeroData] = useState({ title: "", image: "" });
  const [subcategories, setSubcategories] = useState([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(true);
  const [errorSubcategories, setErrorSubcategories] = useState(null);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [errorServices, setErrorServices] = useState(null);

  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoadingServiceDetail, setIsLoadingServiceDetail] = useState(false);
  const [errorServiceDetail, setErrorServiceDetail] = useState(null);

  // Casual Labour States
  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);
  const [activeLabourType, setActiveLabourType] = useState(null);

  // Booking Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLabourId, setSelectedLabourId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDuration, setTotalDuration] = useState("");

  const CASUAL_LABOUR_ID = "68da0dc89c8011d8aab4845a";
  const isCasualLabourService = id === CASUAL_LABOUR_ID;

  // Fetch subcategories + hero
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setIsLoadingSubcategories(true);
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/categories/subcategories/${id}`
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setSubcategories(data);
      } catch (err) {
        setErrorSubcategories(err.message || "Something went wrong");
      } finally {
        setIsLoadingSubcategories(false);
      }
    };

    const fetchHero = async () => {
      try {
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/hero/${id}`
        );
        const data = await res.json();
        if (res.ok) {
          setHeroData({
            title: data.title || "Service",
            image: data.image || "",
          });
        } else {
          setHeroData({ title: "Service", image: "" });
        }
      } catch {
        setHeroData({ title: "Service", image: "" });
      }
    };

    if (id) {
      fetchHero();
      if (!isCasualLabourService) fetchSubcategories();
      else {
        setSubcategories([]);
        setIsLoadingSubcategories(false);
      }

      setSelectedSubcategoryId(null);
      setServices([]);
      setCasualLabour([]);
      setErrorCasualLabour(null);
      setActiveLabourType(null);
    }
  }, [id, isCasualLabourService]);

  // Fetch services
  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setErrorServices(err.message || "Error fetching services.");
    } finally {
      setIsLoadingServices(false);
    }
  };

  // Service detail modal
  const fetchServiceDetail = async (serviceId) => {
    try {
      setIsLoadingServiceDetail(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setServiceDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(err.message || "Error fetching service details.");
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  // Fetch casual labourers
  const fetchCasualLabour = async (type) => {
    try {
      setIsLoadingCasualLabour(true);
      setErrorCasualLabour(null);
      setCasualLabour([]);
      setActiveLabourType(type);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setCasualLabour(data.labourers || []);
    } catch (err) {
      setErrorCasualLabour(err.message || "Error fetching casual labour.");
    } finally {
      setIsLoadingCasualLabour(false);
    }
  };

  // Handle booking modal open
  const openBookingModal = (labourId) => {
    setSelectedLabourId(labourId);
    setIsBookingModalOpen(true);
  };

  // Calculate total days
  useEffect(() => {
    if (startDate && endDate) {
      const diff =
        (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) + 1;
      setTotalDuration(diff > 0 ? diff : "");
    } else setTotalDuration("");
  }, [startDate, endDate]);

  // Handle booking API
  const handleBooking = async () => {
    if (!selectedLabourId || !startDate || !endDate) {
      alert("Please select all fields before booking.");
      return;
    }

    try {
      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/labour-booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            labourer: selectedLabourId,
            startDate,
            endDate,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Booking confirmed successfully!");
        setIsBookingModalOpen(false);
        setStartDate("");
        setEndDate("");
      } else {
        alert(data.message || "Booking failed.");
      }
    } catch (err) {
      alert("Error booking labour. Please try again.");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#EDF2FB] py-4 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {heroData.title || "Service"}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src={heroData.image || repairMan}
              alt={heroData.title}
              className="max-w-xs md:max-w-sm lg:max-w-md max-h-56 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Casual Labour Buttons */}
      {isCasualLabourService && (
        <div className="flex justify-between items-center mt-4 px-6 md:px-16">
          <div className="relative w-1/2 max-w-sm">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaMapMarkerAlt />
            </span>
            <input
              type="text"
              placeholder="Search Nearby Location"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-colors ${
                activeLabourType === "Team"
                  ? "bg-[#003049] text-white border-[#003049]"
                  : "bg-white text-[#003049] border-[#003049]"
              }`}
              onClick={() => fetchCasualLabour("Team")}
            >
              <FaUsers /> Request Team
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-colors ${
                activeLabourType === "Individual"
                  ? "bg-[#003049] text-white border-[#003049]"
                  : "bg-white text-[#003049] border-[#003049]"
              }`}
              onClick={() => fetchCasualLabour("Individual")}
            >
              <FaUser /> Request Individual
            </button>
          </div>
        </div>
      )}

      {/* Labour Cards */}
      <div className="px-6 md:px-16 py-6">
        {!isLoadingCasualLabour && casualLabour.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {casualLabour.map((labour) => (
              <div
                key={labour._id}
                className="border rounded-2xl shadow-md hover:shadow-lg transition-all bg-white p-4 relative"
              >
                <div className="absolute top-3 right-4 flex items-center gap-1 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>{labour.distance || "N/A"}</span>
                </div>
                <div className="flex justify-center mb-3">
                  <img
                    src={labour.image || repairMan}
                    alt={labour.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {labour.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {labour.skill || "Lifting, Packing"}
                </p>
                <p className="text-sm text-gray-500 text-center mb-2">
                  {labour.experience || "5+ years exp"}
                </p>
                <p className="text-center text-lg font-bold mb-2">
                  ₹{labour.cost || 150}/day
                </p>
                <div className="flex justify-center items-center gap-1 mb-1">
                  <span className="text-yellow-400 text-lg">★★★★☆</span>
                  <span className="text-sm text-gray-700">
                    {labour.averageRating || 4.6} ({labour.totalReviews || 128})
                  </span>
                </div>
                <p className="text-green-600 text-sm text-center mb-4">
                  ● {labour.isAvailable ? "Available Today" : "Not Available"}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => openBookingModal(labour._id)}
                    className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition"
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
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsBookingModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              When should we send our Casual Labour?
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Select your preferred duration
            </p>

            <div className="border rounded-lg p-4 mb-4">
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
              <label className="block text-sm font-medium mb-1">
                Total Duration (days)
              </label>
              <input
                type="text"
                value={totalDuration}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

            <button
              onClick={handleBooking}
              className="bg-[#003049] text-white py-2 rounded-lg w-full hover:bg-[#00243a] transition"
            >
              Book
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
