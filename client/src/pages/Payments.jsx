import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Banknote,
  Landmark,
  Smartphone,
  CheckCircle,
} from "lucide-react";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice = 0, bookingId } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [verified, setVerified] = useState(false);

  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Mock UPI verification
  const handleVerify = () => {
    if (!upiId.trim()) {
      alert("Please enter a valid UPI ID");
      return;
    }
    setVerified(true);
  };

  // ✅ Create payment order from backend
  const createOrder = async () => {
    try {
      const response = await fetch(
        "https://apnalabour.onrender.com/api/payment/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Order creation failed");
      return data.order;
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Unable to create payment order. Please try again.");
    }
  };

  // ✅ Verify payment
  const verifyPayment = async (paymentData) => {
    try {
      const response = await fetch(
        "https://apnalabour.onrender.com/api/payment/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("✅ Payment Successful!");
        navigate("/");
      } else {
        alert("❌ Payment verification failed!");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  // ✅ Razorpay handler
  const handlePayment = async () => {
    if (selectedMethod === "upi" && !verified) {
      alert("Please verify your UPI ID first!");
      return;
    }

    const order = await createOrder();
    if (!order) return;

    const options = {
      key: "rzp_test_YourKeyHere", // replace with your real Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Apna Labour",
      description: "Service Payment",
      order_id: order.id,
      handler: async function (response) {
        const paymentData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };
        await verifyPayment(paymentData);
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#003049" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* LEFT SIDE - Payment Methods */}
      <div className="w-full lg:w-1/2 bg-white border-r p-6">
        <img
          src="/logo.png"
          alt="Apna Labour"
          className="h-8 mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <h2 className="text-xl font-semibold mb-2">Complete Payment</h2>
        <p className="text-gray-600 mb-6">
          Amount to Pay <span className="font-semibold">₹{totalPrice}</span>
        </p>

        <div className="flex flex-col gap-3">
          {[
            { id: "upi", icon: Smartphone, label: "UPI" },
            { id: "card", icon: CreditCard, label: "Credit/Debit/ATM Card" },
            { id: "netbanking", icon: Landmark, label: "Net Banking" },
            { id: "cash", icon: Banknote, label: "Pay After Service" },
          ].map(({ id, icon: Icon, label }) => (
            <div
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                selectedMethod === id
                  ? "border-[#003049] bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={22}
                  className={
                    selectedMethod === id
                      ? "text-[#003049]"
                      : "text-gray-500"
                  }
                />
                <p className="font-medium">{label}</p>
              </div>
              {selectedMethod === id && (
                <CheckCircle className="text-[#003049]" size={18} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Payment Box */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col items-center justify-start">
        <div className="bg-white border rounded-xl shadow-sm w-full max-w-md p-6">
          {selectedMethod === "upi" && (
            <>
              <label className="flex items-center gap-2 font-medium mb-3">
                <input type="radio" checked readOnly />
                Add UPI ID
              </label>

              <label className="text-sm text-gray-600 mb-1">UPI ID</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your UPI ID"
                  className="border rounded-md px-3 py-2 w-full"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <button
                  className="bg-[#003049] text-white px-4 py-2 rounded-md"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              </div>

              <button
                disabled={!verified}
                className={`mt-6 w-full py-2 rounded-md text-white font-semibold ${
                  verified
                    ? "bg-[#003049] hover:bg-[#002b4c]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handlePayment}
              >
                PAY ₹{totalPrice}
              </button>
            </>
          )}

          {selectedMethod === "cash" && (
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                You can pay after the service is completed.
              </p>
              <button
                className="bg-[#003049] text-white px-6 py-2 rounded-md hover:bg-[#002b4c]"
                onClick={() => alert("Booking confirmed! Pay after service.")}
              >
                Confirm Booking
              </button>
            </div>
          )}

          {selectedMethod === "card" && (
            <div className="text-center text-gray-600">
              <p className="mb-4">Card payment coming soon...</p>
            </div>
          )}

          {selectedMethod === "netbanking" && (
            <div className="text-center text-gray-600">
              <p className="mb-4">Net Banking payment coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
