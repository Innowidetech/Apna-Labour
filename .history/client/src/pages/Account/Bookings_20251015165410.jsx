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

  // Review modal state
  const [reviewBookingId, setReviewBookingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (filter) {
      dispatch(fetchFilteredBookings(filter));
    } else {
      dispatch(fetchBookings());
    }
  }, [dispatch, filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleCancelClick = (bookingId) => setSelectedBookingId(bookingId);

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

  const handleReviewSubmit = () => {
    if (!reviewBookingId) return;
    dispatch(addReview({ unitId: reviewBookingId, rating, feedback }))
      .unwrap()
      .then(() => {
        setReviewBookingId(null);
        setRating(5);
        setFeedback("");
        dispatch(fetchBookings());
      });
  };

  const upcoming =
    apiUpcoming && apiUpcoming.length > 0
      ? apiUpcoming
      : bookings.filter((b) => ["Confirmed", "Pending"].includes(b.status));

  const past =
    apiPast && apiPast.length > 0
      ? apiPast
      : bookings.filter((b) => b.status === "Completed");

  const allBookings = [...upcoming, ...past];
  const years = Array.from(
    new Set(allBookings.map((b) => new Date(b.bookingDate).getFullYear()))
  ).sort((a, b) => b - a);

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

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <AccountSidebar />

      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-medium text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="last30">Last 30 Days</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Bookings
          </h3>
          {upcoming.length > 0 ? (
            upcoming.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancelClick}
              />
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
              <BookingCard
                key={booking._id}
                booking={booking}
                onReview={() => setReviewBookingId(booking._id)}
              />
            ))
          ) : (
            <p className="text-gray-500">No past bookings.</p>
          )}
        </div>

        {/* Cancel Modal */}
        {selectedBookingId && (
          <Modal
            title="Cancel Booking"
            onClose={() => {
              setSelectedBookingId(null);
              setCancelReason("");
            }}
            onConfirm={handleCancelConfirm}
            loading={cancelLoading}
            error={cancelError}
            message={cancelMessage}
          >
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation"
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Modal>
        )}

        {/* Review Modal */}
        {reviewBookingId && (
          <Modal
            title="Submit Review"
            onClose={() => {
              setReviewBookingId(null);
              setRating(5);
              setFeedback("");
            }}
            onConfirm={handleReviewSubmit}
            loading={reviewLoading}
            error={reviewError}
            message={reviewMessage}
            confirmText="Submit Review"
          >
            <label className="block mb-2 font-medium text-gray-700">
              Rating:
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

// Reusable modal component
const Modal = ({ title, onClose, onConfirm, loading, error, message, children, confirmText }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Close
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : confirmText || "Confirm"}
        </button>
      </div>
    </div>
  </div>
);

const BookingCard = ({ booking, onCancel, onReview }) => {
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
        <div className="mt-3 md:mt-0 flex items-center gap-3">
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
          {["Confirmed", "Pending"].includes(booking.status) && onCancel && (
            <button
              onClick={() => onCancel(booking._id)}
              className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Cancel
            </button>
          )}
          {booking.status === "Completed" && onReview && (
            <button
              onClick={() => onReview(booking._id)}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Review
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {booking.items?.map((item) => (
          <div
            key={item._id || item.id || item.title} // ✅ unique key
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
