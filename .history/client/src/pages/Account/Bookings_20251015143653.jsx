import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, fetchFilteredBookings } from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, upcoming: apiUpcoming, past: apiPast, loading, error } =
    useSelector((state) => state.bookings);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      dispatch(fetchFilteredBookings(filter));
    } else {
      dispatch(fetchBookings());
    }
  }, [dispatch, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
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

  // Use API-provided upcoming/past if available, otherwise split bookings
  const upcoming =
    apiUpcoming && apiUpcoming.length > 0
      ? apiUpcoming
      : bookings.filter((b) => ["Confirmed", "Pending"].includes(b.status));

  const past =
    apiPast && apiPast.length > 0
      ? apiPast
      : bookings.filter((b) => !["Confirmed", "Pending"].includes(b.status));

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <AccountSidebar />

      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="mr-4 font-medium text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="last30">Last 30 Days</option>
            <option value={new Date().getFullYear().toString()}>
              {new Date().getFullYear()}
            </option>
          </select>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Bookings
          </h3>
          {upcoming.length > 0 ? (
            upcoming.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming bookings.</p>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Past Bookings
          </h3>
          {past.length > 0 ? (
            past.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <p className="text-gray-500">No past bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  const total = booking.items?.reduce((sum, i) => sum + (i.price || 0), 0) || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 border-b pb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Booking ID: <span className="text-blue-600">{booking._id}</span>
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

      <div className="space-y-4">
        {booking.items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image || "https://placehold.co/80x80?text=No+Image"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg border"
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

      <div className="mt-4 border-t pt-3 text-sm text-gray-600">
        <div className="flex justify-between font-semibold text-gray-800 mt-1">
          <span>Total Amount:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
