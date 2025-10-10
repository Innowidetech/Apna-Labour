import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  // New states for casual labour
  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);

  // Fetch subcategories & hero data
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
      } catch (err) {
        setHeroData({ title: "Service", image: "" });
      }
    };

    if (id) {
      fetchSubcategories();
      fetchHero();
      setSelectedSubcategoryId(null);
      setServices([]);
      setCasualLabour([]);
      setErrorCasualLabour(null);
    }
  }, [id]);

  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error!`);
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

  const fetchServiceDetail = async (serviceId) => {
    try {
      setIsLoadingServiceDetail(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error`);
      setServiceDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(
        err.message || "Error fetching service details."
      );
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  // ✅ Fixed function: fetches labourers based on "Team" or "Individual"
  const fetchCasualLabour = async (type) => {
    try {
      setIsLoadingCasualLabour(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || `HTTP error`);
      setCasualLabour(data.labourers || []);
    } catch (err) {
      setErrorCasualLabour(err.message || "Error fetching casual labour.");
    } finally {
      setIsLoadingCasualLabour(false);
    }
  };

  const handleCasualLabourClick = (type) => {
    fetchCasualLabour(type);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
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
              className="max-w-xs md:max-w-sm lg:max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      <div className="px-6 md:px-16 py-6">
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

        {/* Casual Labour Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Casual Labour</h3>
          <div className="flex gap-4 mb-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => handleCasualLabourClick("Team")}
            >
              Team
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => handleCasualLabourClick("Individual")}
            >
              Individual
            </button>
          </div>

          {isLoadingCasualLabour && <p>Loading labourers...</p>}
          {errorCasualLabour && (
            <p className="text-red-500">{errorCasualLabour}</p>
          )}

          {!isLoadingCasualLabour && casualLabour.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {casualLabour.map((labour) => (
                <div
                  key={labour._id}
                  className="p-4 border rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={labour.image || repairMan}
                    alt={labour.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg font-bold">{labour.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Skill: {labour.skill}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Cost: ₹{labour.cost || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Rating: ⭐ {labour.averageRating} ({labour.totalReviews} reviews)
                  </p>
                  <p className="text-sm text-gray-500">📞 {labour.mobileNumber}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Services Section */}
        {selectedSubcategoryId && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Services</h3>

            {isLoadingServices && <p>Loading services...</p>}
            {errorServices && <p className="text-red-500">{errorServices}</p>}
            {!isLoadingServices && services.length === 0 && !errorServices && (
              <p>No services found.</p>
            )}

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
                  <p className="mt-2 text-sm font-medium">
                    {service.title}
                  </p>
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

      {/* Modal for service detail */}
      {isModalOpen && serviceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-4xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
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
