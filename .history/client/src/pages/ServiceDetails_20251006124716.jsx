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

  const [isCasualLabour, setIsCasualLabour] = useState(false);

  // Fetch subcategories / hero
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setIsLoadingSubcategories(true);
        setErrorSubcategories(null);

        // If casual labour
        if (id === "casual-labour") {
          setIsCasualLabour(true);
          setSubcategories([
            { _id: "Team", title: "Team", image: repairMan },
            { _id: "Individual", title: "Individual", image: repairMan },
          ]);
        } else {
          setIsCasualLabour(false);
          const res = await fetch(
            `https://apnalabour.onrender.com/api/customer/categories/subcategories/${id}`
          );
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          const data = await res.json();
          setSubcategories(data);
        }
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
      setErrorServices(null);
    }
  }, [id]);

  // Fetch services / labourers
  const fetchServices = async (subcategoryId) => {
    try {
      setIsLoadingServices(true);
      setErrorServices(null);
      setServices([]);

      if (isCasualLabour) {
        // Casual labour API
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/labourers/type/${subcategoryId}`
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || `HTTP error! Status: ${res.status}`);

        if (!Array.isArray(data) || data.length === 0) {
          setErrorServices(`No ${subcategoryId} labourers found.`);
        } else {
          setServices(data); // store Team or Individual labourers
        }
      } else {
        // Normal subcategory services
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/subcategories/appliances/${subcategoryId}`
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || `HTTP error! Status: ${res.status}`);
        if (!Array.isArray(data) || data.length === 0) {
          setErrorServices("No services found for this subcategory.");
        } else {
          setServices(data);
        }
      }
    } catch (err) {
      setErrorServices(
        err.message || "Something went wrong while fetching services."
      );
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

      if (isCasualLabour) {
        // Casual labour: show clicked labourer in modal
        const labourer = services.find((s) => s._id === serviceId);
        if (labourer) setServiceDetail(labourer);
        setIsModalOpen(true);
      } else {
        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/appliances/services/${serviceId}`
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || `HTTP error! Status: ${res.status}`);
        setServiceDetail(Array.isArray(data) ? data : data);
        setIsModalOpen(true);
      }
    } catch (err) {
      setErrorServiceDetail(
        err.message || "Something went wrong while fetching service detail."
      );
    } finally {
      setIsLoadingServiceDetail(false);
    }
  };

  return (
    <>
      {/* Hero */}
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

      {/* Subcategories / Team/Individual */}
      <div className="px-6 md:px-16 py-6">
        <h2 className="text-2xl font-bold mb-6">
          {isCasualLabour ? "Choose Type" : "Subcategories"}
        </h2>

        {isLoadingSubcategories && <div>Loading...</div>}
        {errorSubcategories && (
          <div className="text-red-500">{errorSubcategories}</div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-8">
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
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1">
                {sub.title}
              </div>
            </div>
          ))}
        </div>

        {/* Services / Labourers */}
        {selectedSubcategoryId && (
          <section>
            <h3 className="text-xl font-semibold mb-4">
              {isCasualLabour
                ? `${selectedSubcategoryId} Labourers`
                : "Services"}
            </h3>

            {isLoadingServices && <p>Loading...</p>}
            {errorServices && <p className="text-red-500">{errorServices}</p>}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {services.map((service) => (
                <div
                  key={service._id || service.id}
                  className="p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition"
                  onClick={() => fetchServiceDetail(service._id)}
                >
                  <img
                    src={service.image || repairMan}
                    alt={service.name || service.title || service.type}
                    className="w-20 h-20 object-contain mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium">
                    {service.name || service.title || service.type}
                  </p>
                  {service.price && (
                    <p className="text-blue-600 font-semibold">₹{service.price}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal */}
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
                <h2 className="text-lg font-bold mb-2">
                  {serviceDetail.name || serviceDetail.title || serviceDetail.type}
                </h2>
                {serviceDetail.image && (
                  <img
                    src={serviceDetail.image}
                    alt={serviceDetail.name}
                    className="w-full h-32 object-contain mb-2 cursor-pointer"
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
