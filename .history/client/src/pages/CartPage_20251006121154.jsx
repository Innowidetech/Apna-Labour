import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCart,
  removeItem,
  loginUser,
  verifyOtp,
  saveAddress,
  bookSlot,
  setStep,
  setUserId,
} from '../features/cart/cartSlice'; // adjust the path accordingly

const CartPage = () => {
  const location = useLocation();
  const initialCart = location.state?.cartData || null;

  const dispatch = useDispatch();

  // Local states
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [emailMobile, setEmailMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [slotModalOpen, setSlotModalOpen] = useState(false);

  const [addressData, setAddressData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    'address.HNo': '',
    'address.street': '',
    'address.area': '',
    'address.landmark': '',
    'address.townCity': '',
    'address.pincode': '',
    'address.state': '',
  });

  // Redux state
  const {
    cartItems,
    totalPrice,
    loading,
    error,
    userId,
    step,
    addressSaved,
    slotBooked,
    bookingLoading,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!initialCart) {
      dispatch(fetchCart());
    }
  }, [initialCart, dispatch]);

  useEffect(() => {
    if (initialCart) {
      // Set initial cart from location state
      // This is local state in your original code,
      // but now handled inside Redux slice state (cartItems)
      // So we can dispatch some action if needed or just ignore here
    }
  }, [initialCart]);

  // Handlers

  const handleDelete = (unitId) => {
    dispatch(removeItem(unitId))
      .unwrap()
      .then(() => {
        toast.success('Item removed successfully');
        dispatch(fetchCart());
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleAdd = () => {
    toast.info('Add functionality not implemented yet');
  };

  const handleLogin = () => {
    if (!emailMobile.trim()) {
      toast.error('Please enter your mobile number');
      return;
    }
    dispatch(loginUser(emailMobile))
      .unwrap()
      .then(() => toast.success('OTP sent successfully!'))
      .catch((err) => toast.error(err));
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }
    dispatch(verifyOtp({ userId, otp }))
      .unwrap()
      .then(() => {
        toast.success('OTP verified, login successful!');
        dispatch(fetchCart());
      })
      .catch((err) => toast.error(err));
  };

  const handleAddressSubmit = () => {
    dispatch(saveAddress(addressData))
      .unwrap()
      .then(() => {
        toast.success('Address saved successfully!');
        setAddressModalOpen(false);
      })
      .catch((err) => toast.error(err));
  };

  const handleBookSlot = async () => {
    if (!slotDate || !slotTime) {
      toast.error('Please select date and time slot');
      return;
    }

    dispatch(bookSlot({ slotDate, slotTime }))
      .unwrap()
      .then(() => {
        toast.success('Slot booked successfully!');
        setSlotModalOpen(false);
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row p-4 lg:p-10 relative">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center pt-10 pb-6 px-4 lg:px-10">
        <h1 className="text-2xl font-cursive mb-6">Apna Labour</h1>

        {!showLoginForm ? (
          <div className="p-2 w-full max-w-xl text-left flex items-center gap-2 flex-wrap border border-gray-200 rounded-lg">
            <p className="mb-0 text-base flex-1">
              Login to book the service from your existing bag.
            </p>
            <button
              className="bg-black text-white px-4 py-2 rounded-md"
              onClick={() => setShowLoginForm(true)}
            >
              LOGIN NOW
            </button>
          </div>
        ) : (
          <div className="p-6 w-full max-w-sm">
            {step === 'login' && (
              <>
                <h2 className="text-lg mb-6 text-left">Login / Signup</h2>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={emailMobile}
                  onChange={(e) => setEmailMobile(e.target.value)}
                  className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                />
                <p className="text-sm mt-4">
                  By Continuing you’ve agree to the Terms of Services & Privacy Policy.
                </p>
                <button
                  className="bg-black text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleLogin}
                >
                  Send OTP
                </button>
              </>
            )}

            {step === 'otp' && (
              <>
                <h2 className="text-lg mb-6 text-left">Verify OTP</h2>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                  className="bg-black text-white px-4 py-2 rounded-md w-full mt-4"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

            {step === 'next' && (
              <>
                <h2 className="text-lg mb-6 text-left">Complete Booking</h2>
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={() => setAddressModalOpen(true)}
                  >
                    Register Address
                  </button>

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setSlotModalOpen(true)}
                  >
                    📅 Book Slot
                  </button>

                  {addressSaved && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">
                      Proceed to Payment
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 px-4 lg:px-10">
        <h1 className="text-2xl font-bold mb-6">Your Bag</h1>

        {loading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          <>
            <div className="flex flex-col gap-6 max-w-3xl overflow-y-auto max-h-[75vh]">
              {cartItems.map((item) => (
                <div
                  key={item.unit?.id || item.unit}
                  className="flex gap-3 border border-gray-300 rounded-lg p-4"
                >
                  <img
                    src={
                      item.service?.image ||
                      'https://cdn-icons-png.flaticon.com/512/4328/4328171.png'
                    }
                    alt="Service"
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-bold">{item.service?.name || 'Unnamed Service'}</h3>
                    <p className="text-gray-600 text-sm">
                      Duration: {item.unit?.duration || 'N/A'} mins
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price: ₹{item.price || '0'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Unit: {item.unit?.name || 'N/A'}
                    </p>
                    <button
                      onClick={() => handleDelete(item.unit?.id || item.unit)}
                      className="text-red-600 underline text-sm w-max"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 max-w-3xl border-t pt-6">
              <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
              <button
                onClick={handleAdd}
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Add More
              </button>
            </div>
          </>
        )}
      </div>

      {/* Address Modal */}
      {addressModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setAddressModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl mb-6">Add Address</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddressSubmit();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={addressData.name}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={addressData.phoneNumber}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={addressData.email}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="House No"
                value={addressData['address.HNo']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.HNo': e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Street"
                value={addressData['address.street']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.street': e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Area"
                value={addressData['address.area']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.area': e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Landmark"
                value={addressData['address.landmark']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.landmark': e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Town/City"
                value={addressData['address.townCity']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.townCity': e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={addressData['address.pincode']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.pincode': e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="State"
                value={addressData['address.state']}
                onChange={(e) =>
                  setAddressData((prev) => ({ ...prev, 'address.state': e.target.value }))
                }
                required
              />

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slot Modal */}
      {slotModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSlotModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl mb-6">Book Slot</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookSlot();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="date"
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                required
              />
              <select
                value={slotTime}
                onChange={(e) => setSlotTime(e.target.value)}
                required
              >
                <option value="">Select time slot</option>
                <option value="9AM - 12PM">9AM - 12PM</option>
                <option value="12PM - 3PM">12PM - 3PM</option>
                <option value="3PM - 6PM">3PM - 6PM</option>
              </select>

              <button
                type="submit"
                className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
                  bookingLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Book Slot'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CartPage;
