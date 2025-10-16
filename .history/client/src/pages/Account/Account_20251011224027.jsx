import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerProfile } from "../../redux/accountSlice";

const Account = () => {
  const dispatch = useDispatch();

  // ✅ Directly select the slice from Redux store
  const { profile, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p className="text-gray-500">No profile data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={profile.image || "https://via.placeholder.com/150"}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-2">
          <div>
            <span className="font-semibold">Name: </span>
            {profile.name}
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            {profile.email}
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            {profile.phoneNumber}
          </div>
          <div>
            <span className="font-semibold">Gender: </span>
            {profile.gender}
          </div>
          <div>
            <span className="font-semibold">Role: </span>
            {profile.role}
          </div>

          {/* Nested Address */}
          {profile.address && (
            <div className="mt-2">
              <span className="font-semibold">Address:</span>
              <div className="ml-4">
                <div>{profile.address.HNo}, {profile.address.street}</div>
                <div>{profile.address.area}, {profile.address.townCity}</div>
                <div>{profile.address.landmark}</div>
                <div>{profile.address.state} - {profile.address.pincode}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
