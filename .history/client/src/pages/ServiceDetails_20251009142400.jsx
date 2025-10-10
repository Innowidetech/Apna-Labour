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

  // Booking modal states (Individual)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);

  // Team booking modal states
  const [isTeamBookingModalOpen, setIsTeamBookingModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamStartDate, setTeamStartDate] = useState("");
  const [teamEndDate, setTeamEndDate] = useState("");
  const [teamNumberOfWorkers, setTeamNumberOfWorkers] = useState("");
  const [teamWorkLocation, setTeamWorkLocation] = useState("");
  const [teamPurpose, setTeamPurpose] = useState("");
  const [teamDuration, setTeamDuration] = useState(0);

  // Labourers (Team or Individual)
  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);

  // Track which casual labour button is active
  const [activeLabourType, setActiveLabourType] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [showTeamToast, setShowTeamToast] = useState(false);

  // Labour Details Modal
  const [labourDetails, setLabourDetails] = useState(null);
  const [isLabourDetailsModalOpen, setIsLabourDetailsModalOpen] = useState(false);
  const [isLoadingLabourDetails, setIsLoadingLabourDetails] = useState(false);
  const [errorLabourDetails, setErrorLabourDetails] = useState(null);

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

  // Fetch specific labour details
  const fetchLabourDetails = async (labourId) => {
    try {
      setIsLoadingLabourDetails(true);
      setErrorLabourDetails(null);
      setLabourDetails(null);

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/specific-labourerDetails/${labourId}`
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setLabourDetails(data);
      setIsLabourDetailsModalOpen(true);
    } catch (err) {
      setErrorLabourDetails(err.message || "Error fetching labour details.");
    } finally {
      setIsLoadingLabourDetails(false);
    }
  };

  // Individual Booking
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
      location: "",
    };

    localStorage.setItem("labourCart", JSON.stringify([newItem]));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setIsBookingModalOpen(false);
    setStartDate("");
    setEndDate("");
    setDuration(0);

    navigate("/labour-cart");
  };

  // Team Booking
  const handleTeamBooking = () => {
    if (
      !selectedTeam ||
      !teamStartDate ||
      !teamEndDate ||
      !teamNumberOfWorkers ||
      !teamWorkLocation ||
      !teamPurpose
    ) {
      alert("Please fill all fields before booking team.");
      return;
    }

    const newTeamItem = {
      labourer: selectedTeam,
      startDate: teamStartDate,
      endDate: teamEndDate,
      numberOfWorkers: teamNumberOfWorkers,
      workLocation: teamWorkLocation,
      purpose: teamPurpose,
      duration: teamDuration,
    };

    localStorage.setItem("teamLabourCart", JSON.stringify([newTeamItem]));

    setShowTeamToast(true);
    setTimeout(() => setShowTeamToast(false), 3000);

    setIsTeamBookingModalOpen(false);
    setTeamStartDate("");
    setTeamEndDate("");
    setTeamDuration(0);
    setTeamNumberOfWorkers("");
    setTeamWorkLocation("");
    setTeamPurpose("");

    navigate("/team-labour-cart");
  };

  // Duration for individual and team
  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diff = e - s;
      const d = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1, 0);
      setDuration(d);
    } else {
      setDuration(0);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (teamStartDate && teamEndDate) {
      const s = new Date(teamStartDate);
      const e = new Date(teamEndDate);
      const diff = e - s;
      const d = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1, 0);
      setTeamDuration(d);
    } else {
      setTeamDuration(0);
    }
  }, [teamStartDate, teamEndDate]);

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

      {/* Toasts */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Labour added to cart successfully!
        </div>
      )}
      {showTeamToast && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Team added to cart successfully!
        </div>
      )}

      {/* Buttons for Team & Individual */}
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

      {/* Labour cards (shared) */}
      <div className="px-6 md:px-16 py-6">
        {isCasualLabourService &&
          !isLoadingCasualLabour &&
          casualLabour.length > 0 && (
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
                  <p className="text-green-600 text-sm text-center mb-4">
                    ● {labour.isAvailable ? "Available Today" : "Not Available"}
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition"
                      onClick={() => {
                        if (activeLabourType === "Team") {
                          setSelectedTeam(labour);
                          setIsTeamBookingModalOpen(true);
                        } else {
                          setSelectedLabour(labour);
                          setIsBookingModalOpen(true);
                        }
                      }}
                    >
                      Book Now
                    </button>
                    <button
                      className="text-blue-700 text-sm underline"
                      onClick={() => fetchLabourDetails(labour._id)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>

    {/* Labour Details Modal */}
{isLabourDetailsModalOpen && labourDetails && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        onClick={() => setIsLabourDetailsModalOpen(false)}
      >
        ✕
      </button>

      {isLoadingLabourDetails ? (
        <p>Loading...</p>
      ) : errorLabourDetails ? (
        <p className="text-red-500">{errorLabourDetails}</p>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={labourDetails?.image || repairMan}
            alt={labourDetails?.subject || "Labourer"}
            className="w-24 h-24 rounded-full border mb-2 object-cover"
          />
          <h2 className="text-lg font-bold">{labourDetails?.subject || "Worker"}</h2>
          <p className="text-sm text-gray-500 mb-1">
            Skill: {labourDetails?.skill || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Experience: {labourDetails?.experience || "Not specified"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Cost per day: ₹{labourDetails?.cost ?? "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Availability: {labourDetails?.isAvailable ? "Available Today" : "Not Available"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Location: {labourDetails?.address || labourDetails?.serviceCity || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Training: {labourDetails?.trainingStatus || "N/A"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Rating: {labourDetails?.averageRating ?? 0} ({labourDetails?.totalReviews ?? 0} reviews)
          </p>

          {/* Reviews */}
          {labourDetails?.reviews?.length > 0 ? (
            <div className="w-full mt-2">
              <h3 className="font-semibold mb-1">Reviews:</h3>
              <ul className="space-y-2">
                {labourDetails.reviews.map((r) => (
                  <li key={r.id} className="border-b pb-1">
                    <p className="text-sm font-medium">{r.user}</p>
                    <p className="text-sm text-yellow-500">Rating: {r.rating} ⭐</p>
                    <p className="text-sm text-gray-700">{r.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  </div>
)}
{/* Labour Details Modal */}
{isLabourDetailsModalOpen && labourDetails && (
  
    <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-2xl relative max-h-[90vh] overflow-y-auto p-6">
      {/* Top row: Name + Close */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{labourDetails?.subject || "Worker"}</h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setIsLabourDetailsModalOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Second row: Image left, info right */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-shrink-0">
          <img
            src={labourDetails?.image || repairMan}
            alt={labourDetails?.subject || "Labourer"}
            className="w-32 h-32 rounded-full border-2 object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1">
          <p><span className="font-semibold">Skill:</span> {labourDetails?.skill || "N/A"}</p>
          <p><span className="font-semibold">Experience:</span> {labourDetails?.experience || "Not specified"}</p>
          <p><span className="font-semibold">Cost per day:</span> ₹{labourDetails?.cost ?? "N/A"}</p>
          <p className={labourDetails?.isAvailable ? "text-green-600" : "text-red-500"}>
            {labourDetails?.isAvailable ? "Available Today" : "Not Available"}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-4 text-yellow-500 text-lg">
        {"⭐".repeat(Math.round(labourDetails?.averageRating || 0))}
        <span className="text-gray-500 text-sm ml-2">
          ({labourDetails?.averageRating ?? 0} / {labourDetails?.totalReviews ?? 0})
        </span>
      </div>

      {/* About Our Workers */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">About Our Workers</h3>
        <p className="text-gray-600 text-sm">
          {labourDetails?.aboutWorker || "Our workers are trained and reliable professionals."}
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mb-2">
        <h3 className="font-semibold mb-2">Reviews</h3>
        {labourDetails?.reviews?.length > 0 ? (
          <ul className="space-y-3 max-h-48 overflow-y-auto">
            {labourDetails.reviews.map((r, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-sm font-medium">{r.user}</p>
                <p className="text-sm text-yellow-500">Rating: {r.rating} ⭐</p>
                <p className="text-sm text-gray-700">{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  </div>
)}


      {/* Team Booking Modal */}
      {isTeamBookingModalOpen && selectedTeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setIsTeamBookingModalOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedTeam.image || repairMan}
                alt={selectedTeam.name}
                className="w-20 h-20 rounded-full border mb-2"
              />
              <h2 className="text-lg font-bold">{selectedTeam.name}</h2>
              <p className="text-sm text-gray-500 mb-1">
                {selectedTeam.skill || "General Labour Team"}
              </p>
              <p className="text-blue-700 font-semibold mb-3">
                ₹{selectedTeam.cost || 500}/day
              </p>

              {/* Inputs */}
              <label className="block text-sm mb-1 w-full">Start Date</label>
              <input
                type="date"
                value={teamStartDate}
                onChange={(e) => setTeamStartDate(e.target.value)}
                className="w-full mb-2 border rounded-lg px-3 py-2"
              />

              <label className="block text-sm mb-1 w-full">End Date</label>
              <input
                type="date"
                value={teamEndDate}
                onChange={(e) => setTeamEndDate(e.target.value)}
                className="w-full mb-2 border rounded-lg px-3 py-2"
              />

              <label className="block text-sm mb-1 w-full">Number of Workers</label>
              <input
                type="number"
                value={teamNumberOfWorkers}
                onChange={(e) => setTeamNumberOfWorkers(e.target.value)}
                className="w-full mb-2 border rounded-lg px-3 py-2"
                placeholder="Enter number of workers"
              />

              <label className="block text-sm mb-1 w-full">Work Location</label>
              <input
                type="text"
                value={teamWorkLocation}
                onChange={(e) => setTeamWorkLocation(e.target.value)}
                className="w-full mb-2 border rounded-lg px-3 py-2"
                placeholder="Enter work location"
              />

              <label className="block text-sm mb-1 w-full">Purpose</label>
              <input
                type="text"
                value={teamPurpose}
                onChange={(e) => setTeamPurpose(e.target.value)}
                className="w-full mb-2 border rounded-lg px-3 py-2"
                placeholder="Purpose of work"
              />

              <label className="block text-sm mb-1 w-full">
                Total Duration (days)
              </label>
              <input
                type="text"
                readOnly
                value={teamDuration}
                className="w-full mb-4 border rounded-lg px-3 py-2 bg-gray-100"
              />

              <button
                className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition"
                onClick={handleTeamBooking}
              >
                Add to Team Labour Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Booking Modal remains same */}
      {isBookingModalOpen && selectedLabour && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
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
                className="w-20 h-20 rounded-full border mb-2"
              />
              <h2 className="text-lg font-bold">{selectedLabour.name}</h2>
              <p className="text-sm text-gray-500 mb-1">
                {selectedLabour.skill || "General Labour"}
              </p>
              <p className="text-blue-700 font-semibold mb-3">
                ₹{selectedLabour.cost || 150}/day
              </p>

              <div className="w-full mb-3">
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

              <div className="w-full mb-3">
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
    </>
  );
};

export default ServiceDetails;
