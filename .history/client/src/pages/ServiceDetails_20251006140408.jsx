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

  // Fetch subcategories and hero data
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
            title: data.title || "Appliance Repair",
            image: data.image || "",
          });
        } else {
          setHeroData({
            title: "Appliance Repair",
            image: "",
          });
        }
      } catch (err) {
        setHeroData({
          title: "Appliance Repair",
          image: "",
        });
      }
    };

    if (id) {
      fetchSubcategories();
      fetchHeroData();
      setSelectedSubcategoryId(null);
      setServices([]);
      setErrorServices(null);
      setCasualLabour([]); // Reset casual labour data
    }
  }, [id]);

  // Fetch services for a subcategory
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
      setErrorServices(
        err.message || "Something went wrong while fetching services."
      );
    } finally {
      setIsLoadingServices(false);
    }
  };

  // Fetch casual labour data (Team or Individual)
  const fetchCasualLabour = async (type) => {
    try {
      setIsLoadingCasualLabour(true);
      setErrorCasualLabour(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `HTTP error! Status: ${res.status}`);
      }
      setCasualLabour(data);
    } catch (err) {
      setErrorCasualLabour(
        err.message || "Something went wrong while fetching casual labour."
      );
    } finally {
      setIsLoadingCasualLabour(false);
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
    fetchServices(subcategoryId);
  };

  // Fetch service detail(s)
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
      setServiceDetail(Array.isArray(data) ? data : data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(
        err.message || "Something went wrong while fetching service detail."
      );
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  // Handle Casual Labour Type Selection (Team/Individual)
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
              {heroData.title || "Appliance Repair"}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src={heroData.image || repairMan}
              alt={heroData.title || "Appliance Repair"}
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
        {!isLoadingSubcategories && subcategories.length === 0 && (
          <div>No subcategories found.</div>
        )}

        <div className="flex flex-col sm:flex-row justify-start gap-6 sm:gap-10 mb-8 px-6 md:px-16">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              onClick={() => handleSubcategoryClick(sub._id)}
              className={`relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden cursor-pointer shadow-md border-2 transition-colors ${
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
        <section>
          <h3 className="text-xl font-semibold mb-4">Casual Labour</h3>
          <div className="flex gap-4 mb-8">
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

          {isLoadingCasualLabour && <p>Loading casual labour...</p>}
          {errorCasualLabour && <p className="text-red-500">{errorCasualLabour}</p>}
          {!isLoadingCasualLabour && casualLabour.length === 0 && !errorCasualLabour && (
            <p>No casual labour found.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {casualLabour.map((labour) => (
              <div
                key={labour._id}
                className="p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={labour.image || repairMan}
                  alt={labour.name}
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <p className="font-semibold">{labour.name}</p>
                <p className="text-sm text-gray-600">{labour.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <h3 className="text-xl font-semibold mb-4 mt-8">Services</h3>
        {isLoadingServices && <p>Loading services...</p>}
        {errorServices && <p className="text-red-500">{errorServices}</p>}
        {!isLoadingServices && services.length === 0 && !errorServices && (
          <p>No services found.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => fetchServiceDetail(service._id)}
              className="p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition"
            >
              <img
                src={service.image || repairMan}
                alt={service.title}
                className="w-full h-24 object-cover rounded-lg mb-4"
              />
              <p className="font-semibold">{service.title}</p>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
