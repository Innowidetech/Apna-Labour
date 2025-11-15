// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Edit2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder, verifyPayment } from "../redux/paymentOrderSlice";
// import { unwrapResult } from "@reduxjs/toolkit";

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { profileData } = location.state || {};
//   console.log("Received in checkout:", profileData);

//   const [profile, setProfile] = useState(profileData || null);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { verifySuccess } = useSelector((state) => state.paymentOrder);

//   useEffect(() => {
//     if (!profileData) {
//       toast.info("Redirecting back to cart...");
//       navigate("/cart");
//     }
//   }, [profileData, navigate]);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login first!");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(
//         "https://apnalabour.onrender.com/api/customer/profile",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

//       setProfile(data.profile || data);
//     } catch (err) {
//       toast.error(err.message || "Failed to fetch profile.");
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem("token");
//       const guestId = localStorage.getItem("guestId");

//       const res = await fetch(
//         "https://apnalabour.onrender.com/api/customer/cart",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             ...(guestId && { "x-guest-id": guestId }),
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

//       if (data.guestId) localStorage.setItem("guestId", data.guestId);

//       const items = Array.isArray(data.items) ? data.items : [];
//       setCartItems(items);

//       const total = items.reduce((acc, i) => acc + (Number(i.price) || 0), 0);
//       setTotalPrice(total);
//     } catch (err) {
//       setError(err.message || "Failed to fetch cart items.");
//       toast.error(err.message || "Failed to fetch cart items.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//     fetchCart();
//   }, []);

//   const user = profile || {};
//   const address = profile?.address || {};
//   const booking = profileData?.booking || {};

//   // ✅ Use backend tax/tip/total if available
//   const tax = booking?.tax ?? 0;
//   const tip = booking?.tip ?? 0;
//   const backendTotal = booking?.totalAmount ?? totalPrice + tax + tip;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       if (document.getElementById("razorpay-script")) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.id = "razorpay-script";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     if (!backendTotal || backendTotal <= 0) {
//       toast.error("Invalid amount.");
//       return;
//     }

//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       toast.error("Failed to load Razorpay SDK.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Please login to continue.");
//         navigate("/login");
//         return;
//       }

//       if (!booking?.bookingId) {
//         toast.error("Booking ID missing. Please try again.");
//         return;
//       }

//       // ✅ Pass backend total amount
//       const placeAction = await dispatch(
//         placeOrder({ bookingId: booking.bookingId, amount: backendTotal })
//       );
//       const placeResult = unwrapResult(placeAction);

//       const serverOrder = placeResult?.order || placeResult?.data || placeResult;
//       const orderId =
//         serverOrder?.id || serverOrder?.orderId || serverOrder?.order_id;
//       const amount = serverOrder?.amount || Math.round(backendTotal * 100);
//       const currency = serverOrder?.currency || "INR";

//       if (!orderId) {
//         toast.error("Invalid order data received from server.");
//         return;
//       }

//       const options = {
//         key: "rzp_test_N2JZTugUiv8bEs",
//         amount,
//         currency,
//         name: "Apna Labour",
//         description: "Service Payment",
//         order_id: orderId,
//        handler: async (response) => {
//   try {
//     const verifyPayload = {
//       orderId: response.razorpay_order_id,
//       paymentId: response.razorpay_payment_id,
//       signature: response.razorpay_signature,
//       bookingId: booking.bookingId,
//     };

//     const verifyAction = await dispatch(verifyPayment(verifyPayload));
//     unwrapResult(verifyAction);

//     // ✅ Show clear success notification
//     toast.success("🎉 Payment Successful! Thank you for your order.", {
//       position: "top-center",
//       autoClose: 4000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });

//     // ✅ Navigate after a short delay so user sees the toast
//     setTimeout(() => {
//       navigate("/success", {
//         state: { booking, totalAmount: backendTotal, paymentSuccess: true },
//       });
//     }, 1500);
//   } catch (verifyErr) {
//     const message =
//       verifyErr?.message ||
//       verifyErr?.data?.message ||
//       "Payment verification failed.";
//     toast.error(message);
//   }
// },

//         prefill: {
//           name: user?.name || "User",
//           email: user?.email || "",
//           contact: user?.mobileNumber || "",
//         },
//         theme: { color: "#003049" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       const message =
//         err?.message ||
//         (err?.data && err.data.message) ||
//         "Payment failed. Try again.";
//       toast.error(message);
//     }
//   };

//   useEffect(() => {
//     if (verifySuccess) {
//       navigate("/success", { state: { booking, totalAmount: backendTotal } });
//     }
//   }, [verifySuccess]); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 gap-8">
//       {/* LEFT SIDE */}
//       <div className="w-full lg:w-1/2 space-y-4">
//         <div>
//           <p className="text-gray-600 text-sm">
//             Booking No:{" "}
//             <span className="font-semibold">#{booking?.bookingId || "—"}</span>
//           </p>
//           <h1 className="text-xl font-semibold mt-1">
//             Thank You {user?.name ? user.name.split(" ")[0] : "Customer"}!
//           </h1>
//         </div>

//         <div className="border rounded-lg p-4">
//           <p className="font-medium">Service Updates</p>
//           <p className="text-gray-500 text-sm">
//             You will receive service updates via email & SMS.
//           </p>
//         </div>

//         <div className="border rounded-lg p-4 flex items-center gap-3">
//           <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
//             👤
//           </div>
//           <div>
//             <p className="font-medium">{user?.name || "Customer"}</p>
//             <p className="text-sm text-gray-500">Account holder</p>
//           </div>
//         </div>

//         {/* Contact / Address / Slot */}
//         <div className="border rounded-md overflow-hidden w-full max-w-xl bg-white">
//           {/* Contact */}
//           <div className="flex justify-between items-start border-b px-5 py-3">
//             <p className="text-sm text-gray-500 w-1/4">Contact</p>
//             <div className="flex-1 flex justify-between">
//               <p className="text-gray-800 text-sm font-medium">
//                 {user?.phoneNumber || "+91XXXXXXXXXX"}
//               </p>
//               <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
//             </div>
//           </div>

//           {/* Address */}
//           <div className="flex justify-between items-start border-b px-5 py-3">
//             <p className="text-sm text-gray-500 w-1/4">Address</p>
//             <div className="flex-1 flex justify-between">
//               <div className="text-gray-800 text-sm font-medium leading-tight space-y-0.5">
//                 {address?.HNo && <p>{address.HNo}</p>}
//                 {address?.area && <p>{address.area}</p>}
//                 {address?.landmark && <p>{address.landmark}</p>}
//                 {(address?.townCity || address?.state) && (
//                   <p>
//                     {address.townCity || ""}
//                     {address.state ? `, ${address.state}` : ""}
//                   </p>
//                 )}
//                 {address?.pincode && <p>{address.pincode}</p>}
//               </div>
//               <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
//             </div>
//           </div>

//           {/* Slot */}
//           <div className="flex justify-between items-start px-5 py-3">
//             <p className="text-sm text-gray-500 w-1/4">Slot</p>
//             <div className="flex-1 flex justify-between">
//               <div className="text-gray-800 text-sm font-medium leading-tight space-y-0.5">
//                 <p>{booking?.date || "Thu, Jun 12"}</p>
//                 <p>{booking?.time || "12:00 PM"}</p>
//               </div>
//               <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-full lg:w-1/2 space-y-4">
//         <div className="border rounded-lg p-4">
//           <p className="font-medium flex items-center gap-2">
//             <span role="img" aria-label="lock">
//               🔒
//             </span>{" "}
//             Your Order Summary
//           </p>
//           <div className="mt-3 space-y-2">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex justify-between text-sm">
//                 <span>{item.unit?.title || "Service"}</span>
//                 <span>₹{item.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ FIXED Payment Summary */}
//         <div className="border rounded-lg p-4 space-y-2">
//           <p className="font-semibold">Payment Summary</p>
//           <div className="flex justify-between text-sm">
//             <span>Item Total</span>
//             <span>₹{totalPrice.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Taxes & Fee</span>
//             <span>₹{tax}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Service Tip</span>
//             <span>₹{tip}</span>
//           </div>
//           <hr />
//           <div className="flex justify-between font-semibold">
//             <span>Total Amount</span>
//             <span>₹{backendTotal}</span>
//           </div>
//           <button
//             className="w-full bg-[#003049] text-white py-2 rounded-md mt-3 hover:bg-[#00263b]"
//             onClick={handlePayment}
//           >
//             PAY NOW
//           </button>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, verifyPayment } from "../redux/paymentOrderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profileData } = location.state || {};
  const [profile, setProfile] = useState(profileData || null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { verifySuccess } = useSelector((state) => state.paymentOrder);

  useEffect(() => {
    if (!profileData) {
      toast.info("Redirecting back to cart...");
      navigate("/cart");
    }
  }, [profileData, navigate]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
      setProfile(data.profile || data);
    } catch (err) {
      toast.error(err.message || "Failed to fetch profile.");
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      const res = await fetch(
        "https://apnalabour.onrender.com/api/customer/cart",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(guestId && { "x-guest-id": guestId }),
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);

      if (data.guestId) localStorage.setItem("guestId", data.guestId);

      const items = Array.isArray(data.items) ? data.items : [];
      setCartItems(items);
      const total = items.reduce((acc, i) => acc + (Number(i.price) || 0), 0);
      setTotalPrice(total);
    } catch (err) {
      setError(err.message || "Failed to fetch cart items.");
      toast.error(err.message || "Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchCart();
  }, []);

  const user = profile || {};
  const address = profile?.address || {};
 const booking = location.state?.profileData?.booking
             || location.state?.booking
             || {};


  const tax = booking?.tax ?? 0;
  const tip = booking?.tip ?? 0;
  const backendTotal = booking?.totalAmount ?? totalPrice + tax + tip;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!backendTotal || backendTotal <= 0) {
      toast.error("Invalid amount.");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue.");
        navigate("/login");
        return;
      }

      if (!booking?.bookingId) {
        toast.error("Booking ID missing. Please try again.");
        return;
      }

      // ✅ Create Razorpay order
      const placeAction = await dispatch(
        placeOrder({ bookingId: booking.bookingId, amount: backendTotal })
      );
      const placeResult = unwrapResult(placeAction);
      const serverOrder = placeResult?.order || placeResult?.data || placeResult;

      const orderId =
        serverOrder?.id || serverOrder?.orderId || serverOrder?.order_id;
      const amount = serverOrder?.amount || Math.round(backendTotal * 100);
      const currency = serverOrder?.currency || "INR";

      if (!orderId) {
        toast.error("Invalid order data received from server.");
        return;
      }

      const options = {
        key: "rzp_test_N2JZTugUiv8bEs",
        amount,
        currency,
        name: "Apna Labour",
        description: "Service Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyPayload = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bookingId: booking.bookingId,
            };

            const verifyAction = await dispatch(verifyPayment(verifyPayload));
            const verifyResult = unwrapResult(verifyAction);

            console.log("✅ Payment verification backend response:", verifyResult);

            toast.success(
              verifyResult?.message ||
                "🎉 Payment Successful! Thank you for your order.",
              {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              }
            );

            // ❌ Removed navigate — stay on same page
          } catch (verifyErr) {
            console.error("❌ Payment verification error:", verifyErr);
            const message =
              verifyErr?.message ||
              verifyErr?.data?.message ||
              "Payment verification failed.";
            toast.error(message);
          }
        },
        prefill: {
          name: user?.name || "User",
          email: user?.email || "",
          contact: user?.mobileNumber || "",
        },
        theme: { color: "#003049" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const message =
        err?.message ||
        (err?.data && err.data.message) ||
        "Payment failed. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 gap-8">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div>
          <p className="text-gray-600 text-sm">
            Booking No:{" "}
            <span className="font-semibold">#{booking?.bookingId || "—"}</span>
          </p>
          <h1 className="text-xl font-semibold mt-1">
            Thank You {user?.name ? user.name.split(" ")[0] : "Customer"}!
          </h1>
        </div>

        <div className="border rounded-lg p-4">
          <p className="font-medium">Service Updates</p>
          <p className="text-gray-500 text-sm">
            You will receive service updates via email & SMS.
          </p>
        </div>

        <div className="border rounded-lg p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="font-medium">{user?.name || "Customer"}</p>
            <p className="text-sm text-gray-500">Account holder</p>
          </div>
        </div>

        {/* Contact / Address / Slot */}
        <div className="border rounded-md overflow-hidden w-full max-w-xl bg-white">
          {/* Contact */}
          <div className="flex justify-between items-start border-b px-5 py-3">
            <p className="text-sm text-gray-500 w-1/4">Contact</p>
            <div className="flex-1 flex justify-between">
              <p className="text-gray-800 text-sm font-medium">
                {user?.phoneNumber || "+91XXXXXXXXXX"}
              </p>
              <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Address */}
          <div className="flex justify-between items-start border-b px-5 py-3">
            <p className="text-sm text-gray-500 w-1/4">Address</p>
            <div className="flex-1 flex justify-between">
              <div className="text-gray-800 text-sm font-medium leading-tight space-y-0.5">
                {address?.HNo && <p>{address.HNo}</p>}
                {address?.area && <p>{address.area}</p>}
                {address?.landmark && <p>{address.landmark}</p>}
                {(address?.townCity || address?.state) && (
                  <p>
                    {address.townCity || ""}
                    {address.state ? `, ${address.state}` : ""}
                  </p>
                )}
                {address?.pincode && <p>{address.pincode}</p>}
              </div>
              <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

         {/* Slot */}
<div className="flex justify-between items-start px-5 py-3">
  <p className="text-sm text-gray-500 w-1/4">Slot</p>
  <div className="flex-1 flex justify-between">
    <div className="text-gray-800 text-sm font-medium leading-tight space-y-0.5">
     <p>
  {booking?.bookingDate
    ? new Date(booking.bookingDate).toDateString()
    : "No date selected"}
</p>

<p>{booking?.timeSlot || "No time selected"}</p>

    </div>
    <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
  </div>
</div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="border rounded-lg p-4">
          <p className="font-medium flex items-center gap-2">
            <span role="img" aria-label="lock">🔒</span> Your Order Summary
          </p>
          <div className="mt-3 space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.unit?.title || "Service"}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border rounded-lg p-4 space-y-2">
          <p className="font-semibold">Payment Summary</p>
          <div className="flex justify-between text-sm">
            <span>Item Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes & Fee</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service Tip</span>
            <span>₹{tip}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>₹{backendTotal}</span>
          </div>
          <button
            className="w-full bg-[#003049] text-white py-2 rounded-md mt-3 hover:bg-[#00263b]"
            onClick={handlePayment}
          >
            PAY NOW
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Checkout;
