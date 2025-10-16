import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookingSlice";
import AccountSidebar from "./AccountSidebar";

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
                        src={item.image || "https://placehold.co/80x80?text=No+Image"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) =>
                          (e.target.src =
                            "https://placehold.co/80x80?text=No+Image")
                        }
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {item.title}
                        </h4>
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

              {/* Total (calculated) */}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
