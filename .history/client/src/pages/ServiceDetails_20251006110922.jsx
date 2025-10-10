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

  // 👇 New states for Casual Labour
  const [labours, setLabours] = useState([]);
  const [isLoadingLabours, setIsLoadingLabours] = useState(false);
  const [errorLabours, setErrorLabours] = useState(null);
  const [labourType, setLabourType] = useState("Individual"); // Toggle between Individual / Team

  const [serviceDetail, setServiceDetail] = useState(null);
  const [isLoadingServiceDetail, setIsLoadingServiceDetail] = useState(false);
  const [errorServiceDetail, setErrorServiceDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setHeroData({ title: "Appliance Repair", image: "" });
        }
      } catch (err) {
        setHeroData({ title: "Appliance Repair", image: "" });
      }
    };

    if (id) {
      fetchSubcategories();
      fetchHeroData();
      setSelectedSubcategoryId(null);
      setServices([]);
      setLabours([]);
    }
  }, [id]);

  // Fetch appliances/services
  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      setErrorServices(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error! ${res.status}`);
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorServices(err.message);
    } finally {
      setIsLoadingServices(false);
    }
  };

  // 👇 New: Fetch casual labour data
  const fetchCasualLabour = async (type) => {
    try {
      setIsLoadingLabours(true);
      setErrorLabours(null);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error! ${res.status}`);
      setLabours(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorLabours(err.message || "Something went wrong while fetching labour.");
    } finally {
      setIsLoadingLabours(false);
    }
  };

  // Fetch labour when labourType changes
  useEffect(() => {
    if (selectedSubcategoryId && heroData.title.toLowerCase().includes("labour")) {
      fetchCasualLabour(labourType);
    }
  }, [labourType]);

  // Subcategory click handler
  const handleSubcategoryClick = (subcategoryId, subTitle) => {
    setSelectedSubcategoryId(subcategoryId);
    setServices([]);
    setLabours([]);
    if (subTitle?.toLowerCase().includes("labour")) {
      fetchCasualLabour("Individual"); // Default
    } else {
      fetchServices(subcategoryId);
    }
  };

  // Service detail fetch
  const fetchServiceDetail = async (serviceId) => {
    try {
      setIsLoadingServiceDetail(true);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP error! ${res.status}`);
      setServiceDetail(data);
      setIsModalOpen(true);
    } catch (err) {
      setErrorServiceDetail(err.message);
    } finally {
      setIsLoadingServiceDetail(false);
    }
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
              alt={heroData.title}
              className="max-w-xs md:max-w-sm lg:max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <div className="px-6 md:px-16 py-6">
        <h2 className="text-2xl font-bold mb-6">Subcategories</h2>

        {isLoadingSubcategories && <p>Loading subcategories...</p>}
        {errorSubcategories && <p className="text-red-500">{errorSubcategories}</p>}

        <div className="flex flex-wrap gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              onClick={() => handleSubcategoryClick(sub._id, sub.title)}
              className={`w-48 h-40 border-2 rounded-xl cursor-pointer overflow-hidden shadow-md ${
                selectedSubcategoryId === sub._id
                  ? "border-blue-600"
                  : "border-gray-200"
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

        {/* Appliance Services */}
        {services.length > 0 && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  onClick={() => fetchServiceDetail(service._id)}
                  className="p-4 border rounded-lg text-center hover:shadow-md cursor-pointer"
                >
                  <img
                    src={service.image || repairMan}
                    alt={service.title}
                    className="w-20 h-20 mx-auto object-contain"
                  />
                  <p className="mt-2 font-medium">{service.title}</p>
                  {service.price && (
                    <p className="text-blue-600 font-semibold">₹{service.price}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Casual Labour Section */}
        {labours.length > 0 && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Casual Labour</h3>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-6">
              {["Individual", "Team"].map((type) => (
                <button
                  key={type}
                  onClick={() => setLabourType(type)}
                  className={`px-4 py-2 rounded-lg border ${
                    labourType === type
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {isLoadingLabours && <p>Loading {labourType} labourers...</p>}
            {errorLabours && <p className="text-red-500">{errorLabours}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {labours.map((labour) => (
                <div
                  key={labour._id}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                >
                  <img
                    src={labour.photo || repairMan}
                    alt={labour.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-center">{labour.name}</h3>
                  <p className="text-gray-500 text-center">{labour.type}</p>
                  {labour.skills && (
                    <p className="text-sm text-gray-600 mt-2">
                      Skills: {labour.skills.join(", ")}
                    </p>
                  )}
                  {labour.experience && (
                    <p className="text-sm text-gray-600 mt-1">
                      Experience: {labour.experience} years
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Service Detail Modal */}
      {isModalOpen && serviceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-5xl relative">
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
              <div className="w-64 p-4 border rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2">{serviceDetail.title}</h2>
                {serviceDetail.image && (
                  <img
                    src={serviceDetail.image}
                    alt={serviceDetail.title}
                    className="w-full h-32 object-contain mb-2 cursor-pointer"
                    onClick={() => navigate(`/services/${serviceDetail._id}`)}
                  />
                )}
                {serviceDetail.description && (
                  <p className="text-gray-700 mt-1">{serviceDetail.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
