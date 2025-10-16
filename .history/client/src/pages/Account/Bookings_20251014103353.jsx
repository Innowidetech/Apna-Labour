import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar"; // ✅ Sidebar imported

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

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

  if (!bookings?.length)
    return (
      <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
        <AccountSidebar />
        <div className="flex-1 flex justify-center items-center text-gray-500 text-lg">
          No bookings found.
        </div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* ✅ Sidebar */}
      <AccountSidebar />

      {/* ✅ Main Bookings Section */}
      <div className="flex-1 p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h2>

        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 border-b pb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Booking ID:{" "}
                    <span className="text-blue-600">{booking.bookingId}</span>
                  </h3>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    | Time: {booking.timeSlot}
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
                {booking.items?.map((item) => {
                  const unit = item?.unit || {};
                  const imageUrl =
                    unit.image ||
                    "https://via.placeholder.com/80x80.png?text=No+Image";

                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          alt={unit.title || "Service"}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {unit.title || "Unknown Service"}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ₹{unit.price || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-right font-semibold text-gray-700">
                        ₹{item.price?.toFixed(2) || "0.00"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{booking.subtotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{booking.tax?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tip:</span>
                  <span>₹{booking.tip?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 mt-1">
                  <span>Total:</span>
                  <span>₹{booking.totalAmount?.toFixed(2) || "0.00"}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500 border-t pt-3 flex-wrap gap-2">
                <span>
                  Payment Method:{" "}
                  <span className="font-medium text-gray-700">
                    {booking.paymentMethod || "N/A"}
                  </span>
                </span>
                <span>
                  Booked At:{" "}
                  {new Date(booking.bookedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
