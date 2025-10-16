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
    reviewMessage,
    reviewError,
  } = useSelector((state) => state.bookings);

  const [filter, setFilter] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [review, setReview] = useState(""); // for review text
  const [rating, setRating] = useState(0); // for rating

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
        dispatch(fetchBookings()); // Refresh bookings after cancel
      });
  };

  const handleReviewSubmit = (bookingId) => {
    if (!review || rating === 0) return; // Ensure both review and rating are provided
    dispatch(addReview({ unitId: bookingId, rating, feedback: review }))
      .unwrap()
      .then(() => {
        setReview(""); // Clear review text
        setRating(0); // Reset rating
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Bookings</h2>

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
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Bookings</h3>
          {upcoming.length > 0 ? (
            upcoming.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancelClick}
                onReviewSubmit={handleReviewSubmit}
                review={review}
                setReview={setReview}
                rating={rating}
                setRating={setRating}
                reviewError={reviewError} // Pass reviewError
                reviewMessage={reviewMessage} // Pass reviewMessage
              />
            ))
          ) : (
            <p className="text-gray-500">No upcoming bookings.</p>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Past Bookings</h3>
          {past.length > 0 ? (
            past.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onReviewSubmit={handleReviewSubmit}
                review={review}
                setReview={setReview}
                rating={rating}
                setRating={setRating}
                reviewError={reviewError} // Pass reviewError
                reviewMessage={reviewMessage} // Pass reviewMessage
              />
            ))
          ) : (
            <p className="text-gray-500">No past bookings.</p>
          )}
        </div>

        {/* Cancel Modal */}
        {selectedBookingId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Cancel Booking
              </h3>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation"
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {cancelError && (
                <p className="text-red-600 text-sm mb-2">{cancelError}</p>
              )}
              {cancelMessage && (
                <p className="text-green-600 text-sm mb-2">{cancelMessage}</p>
              )}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedBookingId(null);
                    setCancelReason("");
                  }}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={handleCancelConfirm}
                  disabled={cancelLoading}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({
  booking,
  onCancel,
  onReviewSubmit,
  review,
  setReview,
  rating,
  setRating,
  reviewError,
  reviewMessage,
}) => {
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
                : booking.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {booking.status}
          </span>
          {booking.status === "Completed" && (
            <button
              onClick={() => onCancel(booking._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-3">
          <div className="text-sm font-semibold text-gray-700">Items:</div>
          <div className="text-sm font-semibold text-gray-700">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        {/* Items */}
        {booking.items?.map((item) => (
          <div key={item._id} className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-gray-700">{item.name}</div>
              <div className="text-sm text-gray-500">x{item.quantity}</div>
            </div>
            <div className="text-sm text-gray-600">${item.price}</div>
          </div>
        ))}

        {/* Rating & Review Section */}
        {booking.status === "Completed" && (
          <div className="mt-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a review..."
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex items-center gap-3 mb-4">
              <label className="text-gray-700">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {reviewError && (
              <p className="text-red-600 text-sm mb-2">{reviewError}</p>
            )}
            {reviewMessage && (
              <p className="text-green-600 text-sm mb-2">{reviewMessage}</p>
            )}
            <button
              onClick={() => onReviewSubmit(booking._id)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 w-full"
              disabled={reviewLoading}
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
