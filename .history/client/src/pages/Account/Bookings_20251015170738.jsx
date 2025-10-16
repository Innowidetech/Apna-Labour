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
  const [reviewModal, setReviewModal] = useState({
    open: false,
    bookingId: null,
    itemId: null,
    rating: 0,
    feedback: "",
  });

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

  const openReviewModal = (bookingId, itemId) => {
    if (!itemId) return;
    setReviewModal({ open: true, bookingId, itemId, rating: 0, feedback: "" });
  };

  const submitReview = () => {
    const { itemId, rating, feedback } = reviewModal;
    if (!itemId) return alert("Item ID missing");
    if (rating === 0) return alert("Please select a rating");

    dispatch(addReview({ unitId: itemId, rating, feedback }))
      .unwrap()
      .then(() => {
        setReviewModal({ open: false, bookingId: null, itemId: null, rating: 0, feedback: "" });
        dispatch(fetchBookings());
        alert("Review submitted successfully!");
      })
      .catch((err) => alert("Failed to submit review: " + err));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600">
        Loading bookings...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-10">Error: {error}</div>
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
        <BookingList bookings={upcoming} onCancel={handleCancelClick} openReviewModal={openReviewModal} title="Upcoming Bookings" />

        {/* Past Bookings */}
        <BookingList bookings={past} openReviewModal={openReviewModal} title="Past Bookings" />

        {/* Cancel Modal */}
        {selectedBookingId && (
          <Modal title="Cancel Booking" onClose={() => { setSelectedBookingId(null); setCancelReason(""); }}>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation"
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {cancelError && <p className="text-red-600 text-sm mb-2">{cancelError}</p>}
            {cancelMessage && <p className="text-green-600 text-sm mb-2">{cancelMessage}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelConfirm}
                disabled={cancelLoading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </Modal>
        )}

        {/* Review Modal */}
        {reviewModal.open && (
          <Modal title="Submit Review" onClose={() => setReviewModal({ open: false, bookingId: null, itemId: null, rating: 0, feedback: "" })}>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={star <= reviewModal.rating}
                  onClick={() => setReviewModal({ ...reviewModal, rating: star })}
                />
              ))}
            </div>
            <textarea
              value={reviewModal.feedback}
              onChange={(e) => setReviewModal({ ...reviewModal, feedback: e.target.value })}
              placeholder="Write your review..."
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {reviewError && <p className="text-red-600 text-sm mb-2">{reviewError}</p>}
            {reviewMessage && <p className="text-green-600 text-sm mb-2">{reviewMessage}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={submitReview}
                disabled={reviewLoading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

const BookingList = ({ bookings, onCancel, openReviewModal, title }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
    {bookings.length > 0 ? (
      bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onCancel={onCancel} openReviewModal={openReviewModal} />
      ))
    ) : (
      <p className="text-gray-500">No {title.toLowerCase()}.</p>
    )}
  </div>
);

const BookingCard = ({ booking, onCancel, openReviewModal }) => {
  const total = booking.items?.reduce((sum, i) => sum + (i.price || 0), 0) || 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 border-b pb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Booking ID: <span className="text-blue-600">{booking._id}</span>
          </h3>
          <p className="text-sm text-gray-500">
            Date: {new Date(booking.bookingDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
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
            <button onClick={() => onCancel(booking._id)} className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {booking.items?.map((item, index) => (
          <div key={item._id || index} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition">
            <div className="flex items-center gap-3">
              <img src={item.image || "https://placehold.co/80x80?text=No+Image"} alt={item.title} className="w-16 h-16 object-cover rounded-lg border" />
              <div>
                <h4 className="font-medium text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">Price: ₹{item.price?.toFixed(2)}</p>
                {booking.status === "Completed" && openReviewModal && (
                  <button
                    onClick={() => openReviewModal(booking._id, item._id)}
                    className="mt-2 px-2 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
            <div className="text-right font-semibold text-gray-700">₹{item.price?.toFixed(2)}</div>
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

// Modal wrapper
const Modal = ({ children, title, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
      </div>
      {children}
    </div>
  </div>
);

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className={`w-6 h-6 cursor-pointer ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.067 9.385c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
  </svg>
);

export default Bookings;
