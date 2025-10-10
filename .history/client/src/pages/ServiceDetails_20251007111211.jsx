import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers, FaUser, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import repairMan from "../assets/repairMan.png";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Booking modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Labourers (Team or Individual)
  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);

  // Track which casual labour button is active
  const [activeLabourType, setActiveLabourType] = useState(null);

  // Casual Labour category ID
  const CASUAL_LABOUR_ID = "68da0dc89c8011d8aab4845a";
  const isCasualLabourService = id === CASUAL_LABOUR_ID;

  // Fetch subcategories and hero data
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
      if (!isCasualLabourService) {
        fetchSubcategories();
      } else {
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

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    fetchServices(subcategoryId);
  };

  // Fetch service detail
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

  // Fetch labourers
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

  // Handle Booking
  const handleBooking = () => {
    if (!selectedLabour || !startDate || !endDate) {
      alert("Please fill all fields before booking.");
      return;
    }

    const newItem = {
      labourer: selectedLabour,
      startDate,
      endDate,
      duration,
      additionalDetails,
    };

    const existingCart = JSON.parse(localStorage.getItem("labourCart")) || [];
    localStorage.setItem(
      "labourCart",
      JSON.stringify([...existingCart, newItem])
    );

    alert("Labour added to cart successfully!");

    // Reset modal
    setIsBookingModalOpen(false);
    setStartDate("");
    setEndDate("");
    setDuration(0);
    setAdditionalDetails("");

    // Navigate to Labour Cart page
    navigate("/labour-cart");
  };

  // Update duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1, 0);
      setDuration(diffDays);
    } else {
      setDuration(0);
    }
  }, [startDate, endDate]);

  return (
    <>
      {/* Hero Section */}
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

      {/* Casual Labour Section Header */}
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
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-colors duration-300 ${
                activeLabourType === "Team"
                  ? "bg-[#003049] text-white border-[#003049]"
                  : "bg-white text-[#003049] border-[#003049]"
              }`}
              onClick={() => fetchCasualLabour("Team")}
            >
              <FaUsers />
              Request Team
            </button>
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-colors duration-300 ${
                activeLabourType === "Individual"
                  ? "bg-[#003049] text-white border-[#003049]"
                  : "bg-white text-[#003049] border-[#003049]"
              }`}
              onClick={() => fetchCasualLabour("Individual")}
            >
              <FaUser />
              Request Individual
            </button>
          </div>
        </div>
      )}

      <div className="px-6 md:px-16 py-6">
        {/* Subcategories Section */}
        {!isCasualLabourService && (
          <>
            <h2 className="text-2xl font-bold mb-6">Subcategories</h2>
            {isLoadingSubcategories && <div>Loading subcategories...</div>}
            {errorSubcategories && (
              <div className="text-red-500">{errorSubcategories}</div>
            )}
            {!isLoadingSubcategories && subcategories.length === 0 && (
              <div>No subcategories found.</div>
            )}
            <div className="flex flex-wrap gap-6 mb-8">
              {subcategories.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => handleSubcategoryClick(sub._id)}
                  className={`w-full sm:w-1/2 md:w-1/3 h-44 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 transition-colors ${
                    selectedSubcategoryId === sub._id
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={sub.image || repairMan}
                    alt={sub.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Casual Labour Cards */}
        {isCasualLabourService && (
          <>
            {isLoadingCasualLabour && <p>Loading labourers...</p>}
            {errorCasualLabour && (
              <p className="text-red-500">{errorCasualLabour}</p>
            )}

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
                        {labour.averageRating || 4.6} (
                        {labour.totalReviews || 128})
                      </span>
                    </div>
                    <p className="text-green-600 text-sm text-center mb-4">
                      ●{" "}
                      {labour.isAvailable ? "Available Today" : "Not Available"}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <button
                        className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition"
                        onClick={() => {
                          setSelectedLabour(labour);
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
            )}

            {!isLoadingCasualLabour &&
              casualLabour.length === 0 &&
              !errorCasualLabour && (
                <p>No labourers found for selected type.</p>
              )}
          </>
        )}

        {/* Services Section */}
        {!isCasualLabourService && selectedSubcategoryId && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            {isLoadingServices && <p>Loading services...</p>}
            {errorServices && <p className="text-red-500">{errorServices}</p>}
            {!isLoadingServices &&
              services.length === 0 &&
              !errorServices && <p>No services found.</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="p-4 border rounded-lg text-center hover:shadow-md transition cursor-pointer"
                  onClick={() => fetchServiceDetail(service._id)}
                >
                  <img
                    src={service.image || repairMan}
                    alt={service.title}
                    className="w-20 h-20 object-contain mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium">{service.title}</p>
                  {service.price && (
                    <p className="text-blue-600 font-semibold">
                      ₹{service.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedLabour && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsBookingModalOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedLabour.image || repairMan}
                alt={selectedLabour.name}
                className="w-24 h-24 rounded-full border mb-3"
              />
              <h2 className="text-lg font-bold">{selectedLabour.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {selectedLabour.skill || "General Labour"}
              </p>
              <p className="text-blue-700 font-semibold mb-4">
                ₹{selectedLabour.cost || 150}/day
              </p>

              <div className="w-full mb-4">
                <label className="block text-gray-700 text-sm mb-1">
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

              <div className="w-full mb-4">
                <label className="block text-gray-700 text-sm mb-1">
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

              <div className="w-full mb-4">
                <label className="block text-gray-700 text-sm mb-1">
                  Total Duration (days)
                </label>
                <input
                  type="text"
                  value={duration}
                  readOnly
                  className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                />
              </div>

              <div className="w-full mb-6">
                <label className="block text-gray-700 text-sm mb-1">
                  Additional Details
                </label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Enter any special instructions..."
                />
              </div>

              <button
                className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition disabled:bg-gray-400"
                onClick={handleBooking}
              >
                Add to Labour Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {isModalOpen && serviceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-4xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            {isLoadingServiceDetail && <p>Loading...</p>}
            {errorServiceDetail && (
              <p className="text-red-500">{errorServiceDetail}</p>
            )}
            {!isLoadingServiceDetail && !errorServiceDetail && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {serviceDetail.title}
                </h2>
                <img
                  src={serviceDetail.image || repairMan}
                  alt={serviceDetail.title}
                  className="w-full max-h-60 object-contain mb-4"
                />
                <p className="text-gray-600">{serviceDetail.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
