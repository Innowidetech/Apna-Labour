import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import repairMan from "../assets/repairMan.png";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hero + subcategories + services
  const [heroData, setHeroData] = useState({ title: "", image: "" });
  const [subcategories, setSubcategories] = useState([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [errorSubcategories, setErrorSubcategories] = useState(null);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [errorServices, setErrorServices] = useState(null);

  // Service detail modal
  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoadingServiceDetail, setIsLoadingServiceDetail] = useState(false);
  const [errorServiceDetail, setErrorServiceDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Casual labour states
  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);
  const [activeLabourType, setActiveLabourType] = useState(null);

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

  // Labour details modal
  const [labourDetails, setLabourDetails] = useState(null);
  const [isLabourDetailsModalOpen, setIsLabourDetailsModalOpen] =
    useState(false);
  const [isLoadingLabourDetails, setIsLoadingLabourDetails] = useState(false);
  const [errorLabourDetails, setErrorLabourDetails] = useState(null);

  // Toasts
  const [showToast, setShowToast] = useState(false);
  const [showTeamToast, setShowTeamToast] = useState(false);

  // Casual Labour category ID (match your app)
  const CASUAL_LABOUR_ID = "68da0dc89c8011d8aab4845a";
  const isCasualLabourService = id === CASUAL_LABOUR_ID;

  // Reset / initial loads when id changes
  useEffect(() => {
    setHeroData({ title: "", image: "" });
    setSubcategories([]);
    setSelectedSubcategoryId(null);
    setServices([]);
    setServiceDetail(null);
    setCasualLabour([]);
    setActiveLabourType(null);
    setErrorSubcategories(null);
    setErrorServices(null);
    setErrorServiceDetail(null);
    setErrorCasualLabour(null);

    // fetch hero
    fetchHero();

    // fetch subcategories only if NOT casual labour category
    if (!isCasualLabourService) {
      fetchSubcategories();
    } else {
      // clear subcategory loading state
      setIsLoadingSubcategories(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch hero
  const fetchHero = async () => {
    try {
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/hero/${id}`
      );
      const data = await res.json();
      setHeroData({
        title: data?.title || "Service",
        image: data?.image || "",
      });
    } catch (err) {
      setHeroData({ title: "Service", image: "" });
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      setIsLoadingSubcategories(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/categories/subcategories/${id}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorSubcategories(err.message || "Failed to fetch subcategories");
      setSubcategories([]);
    } finally {
      setIsLoadingSubcategories(false);
    }
  };

  // Fetch services by subcategory
  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      setErrorServices(null);
      setServices([]);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorServices(err.message || "Failed to fetch services");
      setServices([]);
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
      setErrorServiceDetail(null);
      setServiceDetail(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setServiceDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(err.message || "Failed to fetch service detail");
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  // Fetch casual labour list
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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.labourers || [];
      setCasualLabour(list);
    } catch (err) {
      setErrorCasualLabour(err.message || "Failed to fetch labourers");
      setCasualLabour([]);
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setLabourDetails(data);
      setIsLabourDetailsModalOpen(true);
    } catch (err) {
      setErrorLabourDetails(err.message || "Failed to fetch labour details");
    } finally {
      setIsLoadingLabourDetails(false);
    }
  };

  // ✅ Handle Individual (Casual Labour) Booking
  const handleBooking = async () => {
    if (!selectedLabour || !startDate || !endDate) {
      alert("Please fill all fields before booking.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    if (!userId) {
      alert("No user ID found. Please log in again.");
      return;
    }

    const bookingData = {
      labourer: selectedLabour._id,
      startDate,
      endDate,
      UserId: userId,
    };

    console.log("📦 Sending Individual booking data:", bookingData);

    try {
      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/labour-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();
      console.log("✅ Individual Booking API Response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Booking failed");
      }

      alert("✅ Casual Labour Booking successful!");

      localStorage.setItem(
        "labourCart",
        JSON.stringify([
          {
            bookingId: data.booking._id,
            labourer: selectedLabour,
            startDate,
            endDate,
            duration,
            costBreakdown: data.costBreakdown,
          },
        ])
      );

      navigate("/labour-cart");
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert(`Booking failed: ${err.message}`);
    }
  };

  // ✅ Handle Team Booking
  const handleTeamBooking = async () => {
    if (
      !selectedTeam ||
      !teamStartDate ||
      !teamEndDate ||
      !teamNumberOfWorkers ||
      !teamWorkLocation ||
      !teamPurpose
    ) {
      alert("Please fill all fields before booking the team.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    if (!userId) {
      alert("No user ID found. Please log in again.");
      return;
    }

    const bookingData = {
      labourer: selectedTeam._id,
      startDate: teamStartDate,
      endDate: teamEndDate,
      UserId: userId,
      numberOfWorkers: teamNumberOfWorkers,
      workLocation: teamWorkLocation,
      purpose: teamPurpose,
    };

    console.log("📦 Sending Team booking data:", bookingData);

    try {
      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/labour-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();
      console.log("✅ Team Booking API Response:", data);

      if (!res.ok || !data.success)
        throw new Error(data.message || "Booking failed");

      alert("✅ Team Booking successful!");

      localStorage.setItem(
        "labourCart",
        JSON.stringify([
          {
            bookingId: data.booking._id,
            labourType: "Team",
            leaderName:
              selectedTeam?.teamLeaderName || selectedTeam?.name || "N/A",
            leaderPhone:
              selectedTeam?.mobileNumber || selectedTeam?.phone || "N/A",
            workLocation: teamWorkLocation,
            purpose: teamPurpose,
            numberOfWorkers: teamNumberOfWorkers,
            startDate: teamStartDate,
            endDate: teamEndDate,
            costBreakdown: data.costBreakdown,
            team: selectedTeam,
          },
        ])
      );

      navigate("/labour-cart");
    } catch (err) {
      console.error("❌ Team Booking failed:", err);
      alert(`Team Booking failed: ${err.message}`);
    }
  };

  // Duration calculators
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

      {/* If casual labour category, show casual UI; otherwise show subcategories -> services */}
      {isCasualLabourService ? (
        <>
          {/* Casual Labour: search + buttons */}
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
                <FaUsers /> Request Team
              </button>

              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 border transition-colors duration-300 ${
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

          {/* Casual Labour grid */}
          <div className="px-6 md:px-16 py-6">
            {isLoadingCasualLabour && <p>Loading labour...</p>}
            {errorCasualLabour && <p className="text-red-500">{errorCasualLabour}</p>}
            {!isLoadingCasualLabour && casualLabour.length === 0 && activeLabourType && (
              <p>No {activeLabourType} found.</p>
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

                    <h3 className="text-lg font-semibold text-center">{labour.name}</h3>
                    <p className="text-sm text-gray-600 text-center">{labour.skill || "Lifting, Packing"}</p>
                    <p className="text-sm text-gray-500 text-center mb-2">{labour.experience || "5+ years exp"}</p>

                    <p className="text-center text-lg font-bold mb-2">₹{labour.cost || 150}</p>
=======
                    <p className="text-center text-lg font-bold mb-2">₹{labour.cost || 150}/day</p>
>>>>>>> db3cdf6efc71169646f00d545ae526b8023342a8
                    <p className="text-green-600 text-sm text-center mb-4">● {labour.isAvailable ? "Available Today" : "Not Available"}</p>

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
        </>
      ) : (
        <>
          {/* Regular Services flow: subcategories -> services */}
          <div className="px-6 md:px-16 py-6">
            <h2 className="text-2xl font-bold mb-6">Subcategories</h2>

            {isLoadingSubcategories ? (
              <div>Loading subcategories...</div>
            ) : errorSubcategories ? (
              <div className="text-red-500">{errorSubcategories}</div>
            ) : subcategories.length === 0 ? (
              <div>No subcategories found.</div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-start gap-6 sm:gap-10 mb-8 px-6 md:px-16">
                {subcategories.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => handleSubcategoryClick(sub._id)}
                    className={`relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 transition-colors ${
                      selectedSubcategoryId === sub._id ? "border-blue-600" : "border-transparent"
                    }`}
                  >
                    <img src={sub.image || repairMan} alt={sub.title || sub.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Services for selected subcategory */}
            {selectedSubcategoryId && (
              <>
                <h3 className="text-xl font-semibold mb-4">Services</h3>

                {isLoadingServices ? (
                  <p className="text-gray-500">Loading services...</p>
                ) : errorServices ? (
                  <p className="text-red-500">{errorServices}</p>
                ) : services.length === 0 ? (
                  <p>No services found.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {services.map((service) => (
                      <div
                        key={service._id || service.id}
                        className="p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition"
                        onClick={() => fetchServiceDetail(service._id || service.id)}
                      >
                        <img src={service.image || repairMan} alt={service.title || service.name} className="w-20 h-20 object-contain mx-auto" />
                        <p className="mt-2 text-sm font-medium">{service.title || service.name}</p>
                        {service.price && <p className="text-blue-600 font-semibold">₹{service.price}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Labour Details Modal */}
      {isLabourDetailsModalOpen && labourDetails && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={() => setIsLabourDetailsModalOpen(false)}>✕</button>

            {isLoadingLabourDetails ? (
              <p>Loading...</p>
            ) : errorLabourDetails ? (
              <p className="text-red-500">{errorLabourDetails}</p>
            ) : (
              <div className="flex flex-col items-center">
                <img src={labourDetails?.image || repairMan} alt={labourDetails?.subject || "Labourer"} className="w-24 h-24 rounded-full border mb-2 object-cover" />
                <h2 className="text-lg font-bold">{labourDetails?.subject || "Worker"}</h2>
                <p className="text-sm text-gray-500 mb-1">Skill: {labourDetails?.skill || "N/A"}</p>
                <p className="text-sm text-gray-500 mb-1">Experience: {labourDetails?.experience || "Not specified"}</p>
                <p className="text-sm text-gray-500 mb-1">Cost per day: ₹{labourDetails?.cost ?? "N/A"}</p>
                <p className="text-sm text-gray-500 mb-1">Availability: {labourDetails?.isAvailable ? "Available Today" : "Not Available"}</p>
                <p className="text-sm text-gray-500 mb-1">Location: {labourDetails?.address || labourDetails?.serviceCity || "N/A"}</p>
                <p className="text-sm text-gray-500 mb-1">Training: {labourDetails?.trainingStatus || "N/A"}</p>
                <p className="text-sm text-gray-500 mb-2">Rating: {labourDetails?.averageRating ?? 0} ({labourDetails?.totalReviews ?? 0} reviews)</p>

                {labourDetails?.reviews?.length > 0 ? (
                  <div className="w-full mt-2">
                    <h3 className="font-semibold mb-1">Reviews:</h3>
                    <ul className="space-y-2">
                      {labourDetails.reviews.map((r, idx) => (
                        <li key={idx} className="border-b pb-1">
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

      {/* Team Booking Modal */}
      {isTeamBookingModalOpen && selectedTeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={() => setIsTeamBookingModalOpen(false)}>✕</button>

            <div className="flex flex-col items-center">
              <img src={selectedTeam.image || repairMan} alt={selectedTeam.name} className="w-20 h-20 rounded-full border mb-2" />
              <h2 className="text-lg font-bold">{selectedTeam.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{selectedTeam.skill || "General Labour Team"}</p>
              <p className="text-blue-700 font-semibold mb-3">₹{selectedTeam.cost || 500}/day</p>

              <label className="block text-sm mb-1 w-full">Start Date</label>
              <input type="date" value={teamStartDate} onChange={(e) => setTeamStartDate(e.target.value)} className="w-full mb-2 border rounded-lg px-3 py-2" />

              <label className="block text-sm mb-1 w-full">End Date</label>
              <input type="date" value={teamEndDate} onChange={(e) => setTeamEndDate(e.target.value)} className="w-full mb-2 border rounded-lg px-3 py-2" />

              <label className="block text-sm mb-1 w-full">Number of Workers</label>
              <input type="number" value={teamNumberOfWorkers} onChange={(e) => setTeamNumberOfWorkers(e.target.value)} className="w-full mb-2 border rounded-lg px-3 py-2" placeholder="Enter number of workers" />

              <label className="block text-sm mb-1 w-full">Work Location</label>
              <input type="text" value={teamWorkLocation} onChange={(e) => setTeamWorkLocation(e.target.value)} className="w-full mb-2 border rounded-lg px-3 py-2" placeholder="Enter work location" />

              <label className="block text-sm mb-1 w-full">Purpose</label>
              <input type="text" value={teamPurpose} onChange={(e) => setTeamPurpose(e.target.value)} className="w-full mb-2 border rounded-lg px-3 py-2" placeholder="Purpose of work" />

              <label className="block text-sm mb-1 w-full">Total Duration (days)</label>
              <input type="text" readOnly value={teamDuration} className="w-full mb-4 border rounded-lg px-3 py-2 bg-gray-100" />

              <button className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition" onClick={handleTeamBooking}>Add to Team Labour Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Booking Modal */}
      {isBookingModalOpen && selectedLabour && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white p-5 rounded-2xl shadow-xl w-11/12 max-w-md relative max-h-[85vh] overflow-y-auto">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={() => setIsBookingModalOpen(false)}>✕</button>

            <div className="flex flex-col items-center">
              <img src={selectedLabour.image || repairMan} alt={selectedLabour.name} className="w-20 h-20 rounded-full border mb-2" />
              <h2 className="text-lg font-bold">{selectedLabour.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{selectedLabour.skill || "General Labour"}</p>
              <p className="text-blue-700 font-semibold mb-3">₹{selectedLabour.cost || 150}/day</p>

              <div className="w-full mb-3">
                <label className="block text-gray-700 text-sm mb-1">Start Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="date" className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
              </div>

              <div className="w-full mb-3">
                <label className="block text-gray-700 text-sm mb-1">End Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="date" className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="w-full mb-4">
                <label className="block text-gray-700 text-sm mb-1">Total Duration (days)</label>
                <input type="text" value={duration} readOnly className="w-full border rounded-lg px-4 py-2 bg-gray-100" />
              </div>

              <button className="bg-[#003049] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00243a] transition" onClick={handleBooking}>Add to Labour Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal (appliances/service detail) */}
      {isModalOpen && serviceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-5xl relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>✕</button>

            {isLoadingServiceDetail ? (
              <p>Loading...</p>
            ) : errorServiceDetail ? (
              <p className="text-red-500">{errorServiceDetail}</p>
            ) : Array.isArray(serviceDetail) ? (
              <div className="flex space-x-6 overflow-x-auto py-2">
                {serviceDetail.map((item) => (
                  <div key={item._id} className="flex-shrink-0 w-64 p-4 border rounded-lg shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                    {item.image && <img src={item.image} alt={item.title} className="w-full h-32 object-contain mb-2 cursor-pointer" onClick={() => navigate(`/services/${item._id}`)} />}
                    {item.description && <p className="text-gray-700 mt-1">{item.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-64 p-4 border rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2">{serviceDetail.title}</h2>
                {serviceDetail.image && <img src={serviceDetail.image} alt={serviceDetail.title} className="w-full h-32 object-contain mb-2 cursor-pointer" onClick={() => navigate(`/services/${serviceDetail._id}`)} />}
                {serviceDetail.description && <p className="text-gray-700 mt-1">{serviceDetail.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;