import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HelpCenter = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Refund modal states
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundForm, setRefundForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    message: "",
  });
  const [refundLoading, setRefundLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const res = await fetch("https://apnalabour.onrender.com/api/customer/bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingClick = async (bookingId) => {
    try {
      setSelectedBooking(bookingId);
      setLoadingDetails(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/details/${bookingId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch booking details");

      const data = await res.json();
      setBookingDetails(data.booking);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load booking details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-blue-500";
      case "refund completed":
        return "text-amber-500";
      case "canceled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleRefundChange = (e) => {
    const { name, value } = e.target;
    setRefundForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRefundSubmit = async () => {
    if (
      !refundForm.bankName ||
      !refundForm.accountNumber ||
      !refundForm.accountHolderName ||
      !refundForm.ifscCode ||
      !refundForm.message
    ) {
      toast.error("Please fill all fields before submitting.", { position: "top-center" });
      return;
    }

    try {
      setRefundLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/refund/create/${selectedBooking}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: refundForm.message,
            refund: {
              mode: "bank_transfer",
              bankDetails: {
                bankName: refundForm.bankName,
                accountNumber: refundForm.accountNumber,
                accountHolderName: refundForm.accountHolderName,
                ifscCode: refundForm.ifscCode,
              },
            },
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit refund request");

      toast.success("Refund request submitted successfully!", { position: "top-center" });
      setShowRefundModal(false);
      setRefundForm({
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to submit refund request.", { position: "top-center" });
    } finally {
      setRefundLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading bookings...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  // If booking clicked, show booking details
  if (selectedBooking && bookingDetails) {
    const { invoiceDetails } = bookingDetails;
    const serviceItem = invoiceDetails?.items?.[0] || {};

    return (
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen relative">
        <ToastContainer />
        <button
          onClick={() => {
            setSelectedBooking(null);
            setBookingDetails(null);
          }}
          className="mb-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to My Bookings
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Which service are you experiencing an issue with?
        </h2>

        {/* Top Section: Service & Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Box - Service Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Service Details</h3>
            <p className="text-gray-700 font-medium text-base mb-2">
              {serviceItem.title || "Service Name"}
            </p>
            <p className="text-gray-600 mb-2">₹{serviceItem.price || 0}</p>
            <p className="text-gray-700">
              Order Confirmed:{" "}
              {bookingDetails?.orderConfirmedDate
                ? new Date(bookingDetails.orderConfirmedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
            <p className="text-gray-700 mt-1">
              Service Completed:{" "}
              {bookingDetails?.serviceCompletedDate
                ? new Date(bookingDetails.serviceCompletedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Pending"}
            </p>
          </div>

          {/* Right Box - Delivery Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Delivery Details</h3>
            <p className="text-gray-700 mb-2">
              {bookingDetails?.customerAddress || "Address not available"}
            </p>
            <p className="text-gray-700">
              {bookingDetails?.customerName || "User Name"} <br />
              {bookingDetails?.customerMobile || "Contact Number"}
            </p>
          </div>
        </div>

        {/* Bottom Box: Image + Rating + Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left - Image & Rating */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <img
              src={serviceItem.image}
              alt="service"
              className="w-40 h-40 object-cover rounded-lg border mb-4"
            />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </div>
          </div>

          {/* Right - Payment Summary */}
          <div className="w-full md:w-2/3">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Payment Summary</h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex justify-between">
                <span>Booking Charges:</span>
                <span>₹{invoiceDetails?.summary?.subtotal || 0}</span>
              </p>
              <p className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>₹{invoiceDetails?.summary?.tax || 0}</span>
              </p>
              <p className="flex justify-between">
                <span>Tip:</span>
                <span>₹{invoiceDetails?.summary?.tip || 0}</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>₹{invoiceDetails?.summary?.totalAmount || 0}</span>
              </p>
              <p className="flex justify-between font-semibold text-blue-600">
                <span>Amount to Pay:</span>
                <span>₹{invoiceDetails?.summary?.totalAmount || 0}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowRefundModal(true)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition"
              >
                Request Refund
              </button>
              <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition">
                Download Invoice
              </button>
            </div>
          </div>
        </div>

       {/* Refund Modal */}
{showRefundModal && (
  <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50 p-3">
    <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] animate-fadeIn overflow-y-auto max-h-[90vh]">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-center">
        Service Details
      </h2>
      <p className="text-gray-600 mb-4 text-xs sm:text-sm text-center leading-relaxed">
        Please fill out the details below to request a refund for your booking.
      </p>

      <div className="space-y-3">
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={refundForm.bankName}
          onChange={handleRefundChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={refundForm.accountNumber}
          onChange={handleRefundChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={refundForm.accountHolderName}
          onChange={handleRefundChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={refundForm.ifscCode}
          onChange={handleRefundChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={refundForm.message}
          onChange={handleRefundChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm h-20 sm:h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <p className="text-yellow-700 text-[10px] sm:text-xs bg-yellow-100 p-2 sm:p-3 rounded-md">
          ⚠️ Note: Refunds are only eligible if your request meets our refund policy.
          Please make sure your details are accurate. All refund requests are subject
          to review.
        </p>

        <div className="flex justify-end gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={() => setShowRefundModal(false)}
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 text-xs sm:text-sm transition"
          >
            Cancel
          </button>
          <button
            onClick={handleRefundSubmit}
            disabled={refundLoading}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 text-xs sm:text-sm transition"
          >
            {refundLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    );
  }

  // Default: Bookings list
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Which service are you experiencing an issue with?
        </h2>
      </div>

      <div className="grid grid-cols-12 font-semibold text-gray-700 border-b pb-2 mb-4">
        <div className="col-span-6 md:col-span-6">Service Detail</div>
        <div className="col-span-3 md:col-span-3 text-center">Amount</div>
        <div className="col-span-3 md:col-span-3 text-right">Status</div>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          bookings.map((booking, index) => (
            <div
              key={booking._id || index}
              onClick={() => handleBookingClick(booking._id)}
              className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start md:items-center gap-3 w-full md:w-1/2">
                <img
                  src={booking.items?.[0]?.image}
                  alt={booking.items?.[0]?.title}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    {booking.items?.[0]?.title || "Service Name"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {booking.items?.length}
                  </p>
                </div>
              </div>

              <div className="text-center w-full md:w-1/4">
                <p className="font-semibold text-gray-800 text-base">
                  ₹{booking.items?.[0]?.price || 0}
                </p>
              </div>

              <div className="w-full md:w-1/4 text-right">
                <p className={`font-semibold ${getStatusColor(booking.status)}`}>
                  {booking.status === "Confirmed"
                    ? `Pending Service on ${new Date(
                        booking.bookingDate
                      ).toLocaleDateString("en-GB", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : booking.status}
                </p>
                <button className="mt-1 text-blue-600 font-medium flex items-center gap-1 justify-end text-sm hover:underline">
                  <FaStar className="text-blue-600" /> Rate & Review service
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
