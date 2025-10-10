import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import repairMan from "../assets/repairMan.png";

const ServiceDetails = () => {
  const { id } = useParams(); // Category ID
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

  const [casualLabour, setCasualLabour] = useState([]);
  const [isLoadingCasualLabour, setIsLoadingCasualLabour] = useState(false);
  const [errorCasualLabour, setErrorCasualLabour] = useState(null);

  // ✅ Get user data and token from localStorage
  const token = localStorage.getItem("token");
  const customerProfile = JSON.parse(localStorage.getItem("user")); // Assuming it's stored like this
  const customerAddress = customerProfile?.address;

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setIsLoadingSubcategories(true);
        setErrorSubcategories(null);
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

    const fetchHeroData = async () => {
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
          setHeroData({
            title: "Service",
            image: "",
          });
        }
      } catch (err) {
        setHeroData({ title: "Service", image: "" });
      }
    };

    if (id) {
      fetchSubcategories();
      fetchHeroData();
      setSelectedSubcategoryId(null);
      setServices([]);
      setErrorServices(null);
      setCasualLabour([]);
      setErrorCasualLabour(null);
    }
  }, [id]);

  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      setErrorServices(null);
      setServices([]);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || `HTTP error! Status: ${res.status}`);
      if (Array.isArray(data) && data.length === 0) {
        setErrorServices("No services found for this subcategory.");
      } else {
        setServices(data);
      }
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
      setErrorServiceDetail(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || `HTTP error! Status: ${res.status}`);
      setServiceDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(
        err.message || "Error fetching service detail."
      );
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  // ✅ Fetch casual labour — only if address exists and token is available
  const fetchCasualLabour = async (type) => {
    if (!token) {
      alert("Please login to continue.");
      navigate("/login");
      return;
    }

    if (!customerAddress) {
      alert("Please update your address in profile before booking labour.");
      navigate("/profile");
      return;
    }

    try {
      setIsLoadingCasualLabour(true);
      setErrorCasualLabour(null);
      setCasualLabour([]);

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ token passed
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch labourers");

      setCasualLabour(data);
    } catch (err) {
      setErrorCasualLabour(err.message || "Error fetching labourers.");
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
              alt={heroData.title || "Service"}
              className="max-w-xs md:max-w-sm lg:max-w-md self-end object-contain"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="px-6 md:px-16 py-6">
        <h2 className="text-2xl font-bold mb-6">Subcategories</h2>

        {isLoadingSubcategories && <div>Loading subcategories...</div>}
        {errorSubcategories && (
          <div className="text-red-500">{errorSubcategories}</div>
        )}
        <div className="flex flex-wrap gap-6 mb-8">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              onClick={() => handleSubcategoryClick(sub._id)}
              className={`w-full sm:w-1/3 md:w-1/4 h-44 cursor-pointer rounded-xl overflow-hidden shadow-md border-2 transition-colors ${
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
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Casual Labour</h3>
          <div className="flex gap-4 mb-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleCasualLabourClick("Team")}
            >
              Team
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleCasualLabourClick("Individual")}
            >
              Individual
            </button>
          </div>

          {isLoadingCasualLabour && <p>Loading labourers...</p>}
          {errorCasualLabour && (
            <p className="text-red-500">{errorCasualLabour}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {casualLabour.map((labour) => (
              <div
                key={labour._id}
                className="p-4 border rounded-lg text-center cursor-pointer hover:shadow"
              >
                <img
                  src={labour.image || repairMan}
                  alt={labour.name}
                  className="w-full h-24 object-cover mb-2"
                />
                <p className="font-semibold">{labour.name}</p>
                <p className="text-sm text-gray-600">{labour.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        {selectedSubcategoryId && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            {isLoadingServices && <p>Loading services...</p>}
            {errorServices && <p className="text-red-500">{errorServices}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="p-4 border rounded-lg text-center cursor-pointer"
                  onClick={() => fetchServiceDetail(service._id)}
                >
                  <img
                    src={service.image || repairMan}
                    alt={service.title}
                    className="w-full h-20 object-contain mb-2"
                  />
                  <p className="font-medium">{service.title}</p>
                  <p className="text-blue-600">₹{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {isModalOpen && serviceDetail && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{serviceDetail.title}</h2>
            <img
              src={serviceDetail.image}
              alt={serviceDetail.title}
              className="w-full h-48 object-contain mb-4"
            />
            <p>{serviceDetail.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
