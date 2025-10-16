import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, fetchFilteredBookings } from "../../redux/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookings, upcoming, past, loading, error } = useSelector(
    (state) => state.bookings
  );

  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (value === "all") {
      dispatch(fetchBookings());
    } else {
      dispatch(fetchFilteredBookings(value));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          My Bookings
        </h2>

        <select
          value={filterValue}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 text-gray-700"
        >
          <option value="all">All Bookings</option>
          <option value="2025">Current Year (2025)</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading bookings...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-center text-red-500 mt-10">{error}</p>
      )}

      {/* ✅ Upcoming Bookings Section */}
      {!loading && upcoming?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Upcoming Bookings
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <p className="font-semibold text-gray-800">
                  {booking.serviceName}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span
                    className={`${
                      booking.status === "completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    } font-medium`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Past Bookings Section */}
      {!loading && past?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Past Bookings
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <p className="font-semibold text-gray-800">
                  {booking.serviceName}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span
                    className={`${
                      booking.status === "cancelled"
                        ? "text-red-600"
                        : "text-gray-700"
                    } font-medium`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Regular All Bookings Section (if no upcoming/past data) */}
      {!loading && bookings?.length > 0 && upcoming?.length === 0 && past?.length === 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            All Bookings
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
              >
                <p className="font-semibold text-gray-800">
                  {booking.serviceName}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span
                    className={`${
                      booking.status === "completed"
                        ? "text-green-600"
                        : "text-gray-700"
                    } font-medium`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Bookings Found */}
      {!loading &&
        !error &&
        bookings.length === 0 &&
        upcoming.length === 0 &&
        past.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No bookings found for this filter.
          </p>
        )}
    </div>
  );
};

export default BookingsPage;
