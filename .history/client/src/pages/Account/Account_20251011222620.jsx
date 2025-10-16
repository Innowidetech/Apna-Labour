import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerProfile } from "../../redux/accountSlice";

const Account = () => {
  const dispatch = useDispatch();

  // Safe selector with fallback
  const account = useSelector((state) => state.account || {});
  const { profile, loading, error } = account;

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>

      {loading && (
        <p className="text-gray-500">Loading profile...</p>
      )}

      {error && (
        <p className="text-red-500">Error: {error}</p>
      )}

      {profile ? (
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div>
            <span className="font-semibold">Name: </span>
            {profile.name || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {profile.email || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            {profile.phone || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Address: </span>
            {profile.address || "N/A"}
          </div>
          {/* Add more fields here as needed */}
        </div>
      ) : (
        !loading && <p className="text-gray-500">No profile data found.</p>
      )}
    </div>
  );
};

export default Account;
