import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  fetchFilteredBookings,
  cancelBooking,
<<<<<<< HEAD
  addReview, // ✅ Import review thunk
} from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar";
=======
} from "../../redux/bookingSlice";

>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66

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
<<<<<<< HEAD
    reviewLoading,
    reviewError,
    reviewMessage,
=======
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
  } = useSelector((state) => state.bookings);

  const [filter, setFilter] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);

<<<<<<< HEAD
  // ✅ Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (filter) dispatch(fetchFilteredBookings(filter));
    else dispatch(fetchBookings());
  }, [dispatch, filter]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleCancelClick = (bookingId) => setSelectedBookingId(bookingId);
=======
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
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66

  const handleCancelConfirm = () => {
    if (!cancelReason || !selectedBookingId) return;
    dispatch(cancelBooking({ id: selectedBookingId, reason: cancelReason }))
      .unwrap()
      .then(() => {
        setCancelReason("");
        setSelectedBookingId(null);
<<<<<<< HEAD
        dispatch(fetchBookings());
      });
  };

  // ✅ Handle review submission
  const handleSubmitReview = () => {
    if (!selectedUnitId || !rating) return;
    dispatch(addReview({ unitId: selectedUnitId, rating, feedback }))
      .unwrap()
      .then(() => {
        setShowReviewModal(false);
        setRating(0);
        setFeedback("");
        setSelectedUnitId(null);
        dispatch(fetchBookings()); // Refresh bookings
=======
        dispatch(fetchBookings()); // Refresh bookings after cancel
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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

<<<<<<< HEAD
  const upcoming =
    apiUpcoming?.length > 0
=======
  // Use API-provided upcoming/past if available, otherwise split bookings
  const upcoming =
    apiUpcoming && apiUpcoming.length > 0
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
      ? apiUpcoming
      : bookings.filter((b) => ["Confirmed", "Pending"].includes(b.status));

  const past =
<<<<<<< HEAD
    apiPast?.length > 0
      ? apiPast
      : bookings.filter((b) => !["Confirmed", "Pending"].includes(b.status));

  const allBookings = [...upcoming, ...past];
  const years = Array.from(
    new Set(allBookings.map((b) => new Date(b.bookingDate).getFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <AccountSidebar />
=======
    apiPast && apiPast.length > 0
      ? apiPast
      : bookings.filter((b) => !["Confirmed", "Pending"].includes(b.status));

  // Extract all years from bookings for dynamic year filter
  const allBookings = [...upcoming, ...past];
  const years = Array.from(
    new Set(allBookings.map((b) => new Date(b.bookingDate).getFullYear()))
  ).sort((a, b) => b - a); // descending order

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
     
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66

      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h2>

<<<<<<< HEAD
        {/* Filter */}
=======
        {/* Filter Dropdown */}
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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

<<<<<<< HEAD
        {/* Upcoming */}
=======
        {/* Upcoming Bookings */}
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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
<<<<<<< HEAD
                onReview={(unitId) => {
                  setSelectedUnitId(unitId);
                  setShowReviewModal(true);
                }}
=======
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
              />
            ))
          ) : (
            <p className="text-gray-500">No upcoming bookings.</p>
          )}
        </div>

<<<<<<< HEAD
        {/* Past */}
=======
        {/* Past Bookings */}
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Past Bookings
          </h3>
          {past.length > 0 ? (
            past.map((booking) => (
<<<<<<< HEAD
              <BookingCard
                key={booking._id}
                booking={booking}
                onReview={(unitId) => {
                  setSelectedUnitId(unitId);
                  setShowReviewModal(true);
                }}
              />
=======
              <BookingCard key={booking._id} booking={booking} />
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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
<<<<<<< HEAD

        {/* ✅ Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Rate & Review
              </h3>

              {/* Stars */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl transition ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {reviewError && (
                <p className="text-red-600 text-sm mb-2">{reviewError}</p>
              )}
              {reviewMessage && (
                <p className="text-green-600 text-sm mb-2">{reviewMessage}</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setRating(0);
                    setFeedback("");
                    setSelectedUnitId(null);
                  }}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        )}
=======
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
      </div>
    </div>
  );
};

<<<<<<< HEAD
// ✅ BookingCard: now shows "Rate & Review" on each item
const BookingCard = ({ booking, onCancel, onReview }) => {
=======
const BookingCard = ({ booking, onCancel }) => {
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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
<<<<<<< HEAD

=======
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
          {["Confirmed", "Pending"].includes(booking.status) && onCancel && (
            <button
              onClick={() => onCancel(booking._id)}
              className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Items */}
      <div className="space-y-4">
        {booking.items?.map((item, index) => (
          <div
            key={`${booking._id}-${index}`}
            className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
=======
      <div className="space-y-4">
        {booking.items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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
<<<<<<< HEAD

            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <div className="text-right font-semibold text-gray-700">
                ₹{item.price?.toFixed(2)}
              </div>

              {/* ✅ Rate & Review per item */}
              {booking.status === "Completed" && onReview && (
                <button
                  onClick={() => onReview(item.unitId)}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Rate & Review
                </button>
              )}
=======
            <div className="text-right font-semibold text-gray-700">
              ₹{item.price?.toFixed(2)}
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
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

<<<<<<< HEAD
export default Bookings;
=======
export default Bookings ;
>>>>>>> dfc4e7ea4fc70c2e442bf52a722f1f259e044b66
