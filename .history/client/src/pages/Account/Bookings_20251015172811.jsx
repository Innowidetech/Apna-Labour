import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  fetchFilteredBookings,
  cancelBooking,
  addReview,
} from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar";

const Bookings = () => {
  const dispatch = useDispatch();
  const {
    bookings,
    upcoming: apiUpcoming,
    past: apiPast,
    loading,
    error,
    cancelLoading,
    cancelError,
    cancelMessage,
    reviewLoading,
    reviewError,
    reviewMessage,
  } = useSelector((state) => state.bookings);

  const [filter, setFilter] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

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

  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  const handleCancelConfirm = () => {
    if (!cancelReason || !selectedBookingId) return;
    dispatch(cancelBooking({ id: selectedBookingId, reason: cancelReason }))
      .unwrap()
      .then(() => {
        setCancelReason("");
        setSelectedBookingId(null);
        dispatch(fetchBookings());
      });
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

  const upcoming =
    apiUpcoming && apiUpcoming.length > 0
      ? apiUpcoming
      : bookings.filter((b) => ["Confirmed", "Pending"].includes(b.status));

  const past =
    apiPast && apiPast.length > 0
      ? apiPast
      : bookings.filter((b) => !["Confirmed", "Pending"].includes(b.status));

  const allBookings = [...upcoming, ...past];
  const years = Array.from(
    new Set(allBookings.map((b) => new Date(b.bookingDate).getFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <AccountSidebar />

      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium text-gray-600">Filter by status:</label>
          <select
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-md"
            value={filter}
          >
            <option value="">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Booking List */}
        <div className="space-y-4">
          {years.map((year) => (
            <div key={year}>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">{year}</h3>
              <div className="space-y-3">
                {allBookings
                  .filter((booking) => new Date(booking.bookingDate).getFullYear() === year)
                  .map((booking) => (
                    <div key={booking._id} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{booking.title}</span>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => handleCancelClick(booking._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Cancel
                        </button>

                        {reviewLoading && (
                          <span className="text-blue-500">Submitting Review...</span>
                        )}

                        {reviewError && (
                          <p className="text-red-600 text-sm mb-2">{reviewError}</p>
                        )}

                        {reviewMessage && (
                          <p className="text-green-600 text-sm mb-2">{reviewMessage}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
