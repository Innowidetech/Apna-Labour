import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  fetchFilteredBookings,
} from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  const [filter, setFilter] = useState("all");

  // ✅ Fetch all bookings on mount
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // ✅ Filter change handler
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === "all") {
      dispatch(fetchBookings());
    } else {
      dispatch(fetchFilteredBookings(value));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600">
        Loading bookings...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-10">
        Error: {error}
      </div>
    );

  if (
    !bookings?.length &&
    !bookings?.upcoming?.length &&
    !bookings?.past?.length
  )
    return (
      <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
        <AccountSidebar />
        <div className="flex-1 flex flex-col justify-center items-center text-gray-500 text-lg">
          <div className="mb-4">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            >
              <option value="all">All Bookings</option>
              <option value="last30">Last 30 Days</option>
              <option value="2025">Year 2025</option>
              <option value="2024">Year 2024</option>
              <option value="2023">Year 2023</option>
            </select>
          </div>
          No bookings found.
        </div>
      </div>
    );

  const renderBookingCard = (booking) => (
    <div
      key={booking._id}
      className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 border-b pb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Booking ID:{" "}
            <span className="text-blue-600">{booking._id}</span>
          </h3>
          <p className="text-sm text-gray-500">
            Date:{" "}
            {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === "Completed"
                ? "bg-green-100 text-green-700"
                : booking.status === "Confirmed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {booking.items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  item.image || "https://placehold.co/80x80?text=No+Image"
                }
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg border"
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/80x80?text=No+Image")
                }
              />
              <div>
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">
                  Price: ₹{item.price?.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right font-semibold text-gray-700">
              ₹{item.price?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 border-t pt-3 text-sm text-gray-600">
        <div className="flex justify-between font-semibold text-gray-800 mt-1">
          <span>Total Amount:</span>
          <span>
            ₹
            {booking.items
              ?.reduce((sum, i) => sum + (i.price || 0), 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <AccountSidebar />

      {/* Main Section */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            My Bookings
          </h2>

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
          >
            <option value="all">All Bookings</option>
            <option value="last30">Last 30 Days</option>
            <option value="2025">Year 2025</option>
            <option value="2024">Year 2024</option>
            <option value="2023">Year 2023</option>
          </select>
        </div>

        {/* ✅ Upcoming Bookings */}
        {bookings?.upcoming?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Upcoming Bookings
            </h3>
            <div className="grid gap-6">
              {bookings.upcoming.map(renderBookingCard)}
            </div>
          </div>
        )}

        {/* ✅ Past Bookings */}
        {bookings?.past?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Past Bookings
            </h3>
            <div className="grid gap-6">
              {bookings.past.map(renderBookingCard)}
            </div>
          </div>
        )}

        {/* ✅ Default Bookings */}
        {Array.isArray(bookings) && bookings.length > 0 && (
          <div className="grid gap-6">{bookings.map(renderBookingCard)}</div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
