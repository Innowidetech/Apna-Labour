// src/pages/LabourCart.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  placeOrder,
  resetPaymentOrderState,
  verifyPayment,
} from "../redux/paymentOrderSlice";
import { fetchAccountProfile } from "../redux/accountSlice";
import { useNavigate } from "react-router-dom"; // ✅ Added
import { CheckCircle, Lock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const LabourCart = () => {
  const [cartItem, setCartItem] = useState(null);
  const [costBreakdown, setCostBreakdown] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Added navigation hook

  const { accountData } = useSelector((state) => state.account);
  const { loading, error, success } = useSelector(
    (state) => state.paymentOrder
  );

  // ✅ Fetch user profile on load
  useEffect(() => {
    dispatch(fetchAccountProfile());
  }, [dispatch]);

  // ✅ Load cart data
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("labourCart")) ||
      JSON.parse(localStorage.getItem("teamCart")) ||
      [];
    const bookingData = saved[0];

    if (bookingData) {
      if (bookingData.booking && bookingData.costBreakdown) {
        setCartItem(bookingData.booking);
        setCostBreakdown(bookingData.costBreakdown);
      } else {
        setCartItem(bookingData);
        if (bookingData.costBreakdown) {
          setCostBreakdown(bookingData.costBreakdown);
        } else if (bookingData.bookingId) {
          fetchCostBreakdown(bookingData.bookingId);
        }
      }
    }
  }, []);

  // ✅ Fetch cost breakdown from backend if missing
  const fetchCostBreakdown = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/labour-booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("📦 Cost Breakdown Fetched:", data);
      if (data?.costBreakdown) {
        setCostBreakdown(data.costBreakdown);
      }
    } catch (err) {
      console.error("❌ Failed to fetch cost breakdown:", err);
      toast.error("Failed to fetch cost breakdown.");
    }
  };

 const handlePayment = async () => {
  if (!cartItem) {
    toast.error("No labour booking found.");
    return;
  }

  const bookingId = cartItem?.bookingId || cartItem?._id;
  if (!bookingId) {
    toast.error("Booking ID missing. Please book again.");
    return;
  }

  try {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    // Create order on backend
    const resultAction = await dispatch(placeOrder({ bookingId }));
    if (!placeOrder.fulfilled.match(resultAction)) {
      console.error("❌ placeOrder failed:", resultAction.payload);
      toast.error(
        resultAction.payload?.message ||
          resultAction.payload?.error ||
          "Failed to create payment order."
      );
      return;
    }

    const data = resultAction.payload;
    console.log("✅ Order created:", data);

    const orderId = data.order?.id || data.id || data.orderId;
    const amount =
      data.amount ||
      data.order?.amount ||
      (costBreakdown?.totalAmount ?? cartItem.totalCost ?? 0) * 100;

    if (!orderId) {
      toast.error("Order ID missing. Cannot proceed with payment.");
      return;
    }

    const options = {
      key: "rzp_test_N2JZTugUiv8bEs", // your Razorpay key
      amount,
      currency: "INR",
      name: "Apna Labour",
      description: "Labour Booking Payment",
      image: `${window.location.origin}/repairMan.png`,
      order_id: orderId,
      handler: async function (response) {
        try {
          console.log("🪙 Payment successful:", response);
          toast.success("Payment successful!");

          const payload = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            bookingId,
          };

          console.log("📤 Verifying payment with payload:", payload);

          const verifyRes = await dispatch(verifyPayment(payload));

          console.log("✅ Verify Payment response:", verifyRes);

          if (verifyPayment.fulfilled.match(verifyRes)) {
            toast.success("✅ Payment verified successfully!");
            setTimeout(() => {
              dispatch(resetPaymentOrderState());
              // navigate("/orders");
            }, 1500);
          } else {
            toast.error("⚠️ Payment verification failed!");
            console.error("Verification failed:", verifyRes.payload);
          }
        } catch (err) {
          console.error("❌ Payment verification error:", err);
          toast.error("Error verifying payment.");
        }
      },
      prefill: {
        name: accountData?.name || "Customer",
        email: accountData?.email || "customer@example.com",
        contact: accountData?.phoneNumber || "9999999999",
      },
      theme: { color: "#003049" },
      modal: { ondismiss: () => toast.info("Payment cancelled.") },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      toast.error("Payment failed. Please try again.");
      console.error("❌ Payment failed:", response.error);
    });
  } catch (err) {
    console.error("Payment error:", err);
    toast.error("Error during payment. Please try again.");
  }
};

  // ✅ Guard for empty cart — prevents blank page
  if (!cartItem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <p>No labour or team booking yet.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }

  // ✅ Extract booking details
  const booking = cartItem.booking || cartItem;
  const totalDays = costBreakdown?.totalDays ?? 1;
  const totalLabours = costBreakdown?.totalLabours ?? 1;
  const bookingCharge = costBreakdown?.bookingCharge ?? 0;
  const tax = costBreakdown?.tax ?? 0;
  const totalAmount =
    costBreakdown?.totalAmount ?? booking?.totalCost ?? cartItem?.totalCost ?? 0;

  const isTeamBooking = !!cartItem.team || cartItem.labourType === "Team";

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="flex-1 p-6 md:p-10 border-r border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-8 font-serif">
          Apna Labour
        </h1>

        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="text-green-600 w-6 h-6" />
          <p className="text-gray-700 text-sm">
            Booking No: <span className="font-medium">#{cartItem.bookingId}</span>
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Thank You {accountData?.name || cartItem.customerName || "User"}!
        </h2>

        <div className="border rounded-xl p-5 shadow-sm bg-white max-w-xl">
          <h3 className="text-lg font-semibold mb-4">
            {isTeamBooking ? "Team Booking Preview" : "Labour Booking Preview"}
          </h3>

          <div className="flex flex-col sm:flex-row gap-5">
            <img
              src={
                isTeamBooking
                  ? cartItem.team?.image || "/repairMan.png"
                  : cartItem.labourer?.image || "/repairMan.png"
              }
              alt={
                isTeamBooking
                  ? cartItem.team?.teamName || "Team"
                  : cartItem.labourer?.name || "Labour"
              }
              className="w-28 h-28 object-cover rounded-lg border"
            />

            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Date:</span>&nbsp;
                {cartItem.startDate}
              </p>
              <p>
                <span className="font-medium">Duration:</span>&nbsp;
                {totalDays} days
              </p>

              {isTeamBooking ? (
                <>
                  <p>
                    <span className="font-medium">Team Leader Name:</span>&nbsp;
                    {booking.leaderName || cartItem.leaderName || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Leader Phone:</span>&nbsp;
                    {booking.leaderPhone || cartItem.leaderPhone || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Work Location:</span>&nbsp;
                    {booking.workLocation || cartItem.workLocation || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Purpose:</span>&nbsp;
                    {booking.purpose || cartItem.purpose || "N/A"}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-medium">Labour Name:</span>&nbsp;
                    {cartItem.labourer?.name}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>&nbsp;
                    {cartItem.labourer?.mobileNumber}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 p-6 md:p-10 flex flex-col items-center bg-[#CECECE26]">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="text-gray-800 w-5 h-5" />
          <h2 className="text-lg font-semibold">Your Order Summary</h2>
        </div>

        <div className="border rounded-xl p-6 shadow-sm w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Payment Summary</h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Total days</span>
            <span>{totalDays}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Total labours</span>
            <span>{totalLabours}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Booking charge</span>
            <span>₹{bookingCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between font-semibold text-sm mb-2">
            <span>Total amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#003049] hover:bg-blue-800"
            } text-white py-2 rounded-md font-medium transition`}
          >
            {loading ? "Processing..." : "Pay NOW"}
          </button>

          {/* ✅ SAFE ERROR DISPLAY */}
          {error && (
            <p className="text-red-600 text-sm text-center mt-3">
              {typeof error === "string"
                ? error
                : error?.message || error?.error || "Something went wrong"}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center mt-3">
              Order created successfully!
            </p>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default LabourCart;
