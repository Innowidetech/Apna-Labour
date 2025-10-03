// src/pages/ModalServicePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import repairMan from "../assets/repairMan.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState({ title: "", image: "" });
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalService, setModalService] = useState(null);
  const [units, setUnits] = useState([]);
  const [unitLoading, setUnitLoading] = useState(false);
  const [unitError, setUnitError] = useState(null);

  // Track loading state for each unit being added to cart
  const [cartLoadingIds, setCartLoadingIds] = useState(new Set());
  const [cartError, setCartError] = useState(null);

  // Fetch services and hero data when `id` changes
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `https://apnalabour.onrender.com/api/customer/services/specific-services/${id}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
        setServices(Array.isArray(data) ? data : [data]);
      } catch (err) {
        const msg = err.message || "Something went wrong fetching services.";
        setError(msg);
        toast.error(msg);
      } finally {
        setIsLoading(false);
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
            title: data.title || "Our Services",
            image: data.image || "",
          });
        } else {
          setHeroData({ title: "Our Services", image: "" });
        }
      } catch {
        setHeroData({ title: "Our Services", image: "" });
      }
    };

    if (id) {
      fetchServices();
      fetchHeroData();
    }
  }, [id]);

  // Group services by section (or fallback “Services”)
  const grouped = services.reduce((acc, item) => {
    const key = item.section || "Services";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Star rating component
  const StarRating = ({ rating }) => {
    const r = Math.round(rating || 0);
    return (
      <span>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < r ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  // Open booking modal and fetch units
  const handleBook = async (srv) => {
    setModalService(srv);
    setShowModal(true);
    setUnits([]);
    setUnitError(null);
    setUnitLoading(true);

    try {
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/specific-services/units/${srv._id}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
      setUnits(Array.isArray(data) ? data : [data]);
    } catch (err) {
      const msg = err.message || "Something went wrong fetching units.";
      setUnitError(msg);
      toast.error(msg);
    } finally {
      setUnitLoading(false);
    }
  };

  // ---- Add to Cart API integration ----
 const handleAddToCart = async (unit) => {
  setCartLoadingIds((prev) => new Set(prev).add(unit._id));
  setCartError(null);

  try {
    const guestId = localStorage.getItem("guestId");
    const token = localStorage.getItem("token"); // JWT if logged in

    const res = await fetch(
      `https://apnalabour.onrender.com/api/customer/cart/${unit._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(guestId ? { "x-guest-id": guestId } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ quantity: 1 }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

    // ✅ If server returns a guestId and we don't already have one, save it
    if (data.guestId && !localStorage.getItem("guestId")) {
      localStorage.setItem("guestId", data.guestId);
    }

    toast.success(`✅ ${unit.title || unit.count} added to cart.`);
  } catch (err) {
    const msg = err.message || "Failed to add item to cart.";
    setCartError(msg);
    toast.error(msg);
  } finally {
    setCartLoadingIds((prev) => {
      const next = new Set(prev);
      next.delete(unit._id);
      return next;
    });
  }
};

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#EDF2FB] py-6 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {heroData.title || "Our Services"}
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src={heroData.image || repairMan}
              alt={heroData.title || "Services"}
              className="max-w-xs md:max-w-sm lg:max-w-md self-end object-contain"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-8">
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {isLoading && <p>Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading &&
          Object.keys(grouped).map((section) => (
            <div key={section} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {grouped[section].map((srv) => (
                  <div
                    key={srv._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg p-3 border border-gray-200 flex flex-col"
                  >
                    <img
                      src={srv.image || repairMan}
                      alt={srv.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">{srv.title}</h3>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center space-x-1">
                        <StarRating rating={srv.averageRating} />
                        <span className="text-gray-500 ml-1">
                          ({srv.totalReviews || 0})
                        </span>
                      </div>
                      <span className="text-gray-700">
                        starts at ₹{srv.startingPrice}
                      </span>
                    </div>
                    <div className="mt-auto flex justify-between text-sm">
                      <button
                        onClick={() => navigate(`/service-details/${srv._id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View details
                      </button>
                      <button
                        onClick={() => handleBook(srv)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {/* ---------- Modal ---------- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl p-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              <h3 className="text-2xl font-semibold text-gray-800">
                {modalService?.title}
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">
                  {modalService?.averageRating || 0}
                </span>{" "}
                ({modalService?.totalReviews || 0} bookings)
              </p>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Select a service
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  You can choose any one of the services
                </p>

                {unitLoading && <p>Loading options...</p>}
                {unitError && <p className="text-red-500">{unitError}</p>}

                {!unitLoading && !unitError && (
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {units.map((u) => {
                      const discountedPrice =
                        u.price -
                        (u.price * (u.discountedPercentage || 0)) / 100;

                      const isAdding = cartLoadingIds.has(u._id);

                      return (
                        <div
                          key={u._id}
                          className="min-w-[160px] border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm bg-white"
                        >
                          <img
                            src={u.image}
                            alt={u.title}
                            className="w-20 h-20 object-contain mb-2"
                          />
                          <h5 className="font-semibold text-sm">
                            {u.title || `${u.count} AC`}
                          </h5>

                          <div className="text-lg font-bold text-gray-800">
                            ₹{Math.round(discountedPrice)}
                            {u.discountedPercentage > 0 && (
                              <span className="line-through text-gray-400 text-sm ml-1">
                                ₹{u.price}
                              </span>
                            )}
                          </div>

                          {u.discountedPercentage > 0 && (
                            <p className="text-green-600 text-sm">
                              {u.discountedPercentage}% off
                            </p>
                          )}

                          <button
                            disabled={isAdding}
                            className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                            onClick={() => handleAddToCart(u)}
                          >
                            {isAdding ? "Adding..." : "Add"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {cartError && (
                  <p className="text-red-500 mt-2 text-sm">{cartError}</p>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ModalServicePage;
