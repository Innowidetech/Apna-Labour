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

  // 🔹 New states for Casual Labour
  const [labourers, setLabourers] = useState([]);
  const [isLoadingLabourers, setIsLoadingLabourers] = useState(false);
  const [errorLabourers, setErrorLabourers] = useState(null);
  const [labourType, setLabourType] = useState(null); // "Team" or "Individual"

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
      setLabourers([]);
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

  // 🔹 Fetch Casual Labour (Team / Individual)
  const fetchLabourers = async (type) => {
    try {
      setIsLoadingLabourers(true);
      setErrorLabourers(null);
      setLabourers([]);
      setLabourType(type);
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labourers/type/${type}`
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || `HTTP error! Status: ${res.status}`);
      if (Array.isArray(data) && data.length === 0) {
        setErrorLabourers("No labourers found for this type.");
      } else {
        setLabourers(data);
      }
    } catch (err) {
      setErrorLabourers(
        err.message || "Something went wrong while fetching labourers."
      );
    } finally {
      setIsLoadingLabourers(false);
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
              alt={heroData.title || "Appliance Repair"}
              className="max-w-xs md:max-w-sm lg:max-w-md self-end object-contain"
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

        {/* Services Section */}
        {selectedSubcategoryId && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Services</h3>

            {isLoadingServices && (
              <p className="text-gray-500">Loading services...</p>
            )}
            {errorServices && <p className="text-red-500">{errorServices}</p>}
            {!isLoadingServices && services.length === 0 && !errorServices && (
              <p>No services found.</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {services.map((service) => (
                <div
                  key={service._id || service.id}
                  className="p-4 border rounded-lg text-center cursor-pointer hover:shadow-md transition"
                  onClick={() => fetchServiceDetail(service._id)}
                >
                  <img
                    src={service.image || repairMan}
                    alt={service.title || service.name}
                    className="w-20 h-20 object-contain mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium">
                    {service.title || service.name}
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

        {/* 🔹 Casual Labour Section */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Casual Labour</h3>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => fetchLabourers("Team")}
              className={`px-4 py-2 rounded-md ${
                labourType === "Team" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => fetchLabourers("Individual")}
              className={`px-4 py-2 rounded-md ${
                labourType === "Individual"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Individual
            </button>
          </div>

          {isLoadingLabourers && <p>Loading labourers...</p>}
          {errorLabourers && <p className="text-red-500">{errorLabourers}</p>}
          {!isLoadingLabourers &&
            labourers.length === 0 &&
            !errorLabourers && <p>No labourers found.</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {labourers.map((labour) => (
              <div
                key={labour._id}
                className="p-4 border rounded-lg shadow hover:shadow-md transition text-center"
              >
                <img
                  src={labour.image || repairMan}
                  alt={labour.name}
                  className="w-24 h-24 mx-auto object-contain"
                />
                <h4 className="mt-2 font-semibold">{labour.name}</h4>
                {labour.price && (
                  <p className="text-blue-600 font-semibold">
                    ₹{labour.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal for service detail(s) */}
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
              <>
                {Array.isArray(serviceDetail) ? (
                  <div className="flex space-x-6 overflow-x-auto py-2">
                    {serviceDetail.map((item) => (
                      <div
                        key={item._id}
                        className="flex-shrink-0 w-64 p-4 border rounded-lg shadow hover:shadow-lg transition"
                      >
                        <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-contain mb-2 cursor-pointer"
                            onClick={() => navigate(`/services/${item._id}`)}
                          />
                        )}

                        {item.description && (
                          <p className="text-gray-700 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-64 p-4 border rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-2">
                      {serviceDetail.title}
                    </h2>
                    {serviceDetail.image && (
                      <img
                        src={serviceDetail.image}
                        alt={serviceDetail.title}
                        className="w-full h-32 object-contain mb-2 cursor-pointer"
                        onClick={() =>
                          navigate(`/services/${serviceDetail._id}`)
                        }
                      />
                    )}
                    {serviceDetail.createdAt && (
                      <p className="text-gray-500 text-sm mb-1">
                        Created:{" "}
                        {new Date(serviceDetail.createdAt).toLocaleString()}
                      </p>
                    )}
                    {serviceDetail.updatedAt && (
                      <p className="text-gray-500 text-sm mb-1">
                        Updated:{" "}
                        {new Date(serviceDetail.updatedAt).toLocaleString()}
                      </p>
                    )}
                    {serviceDetail.description && (
                      <p className="text-gray-700 mt-1">
                        {serviceDetail.description}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetails;
