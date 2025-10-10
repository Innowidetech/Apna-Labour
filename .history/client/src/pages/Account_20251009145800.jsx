import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, clearProfile } from "../redux/accountSlice";

const Account = () => {
  const dispatch = useDispatch();

  // Get token and account state
  const token = useSelector((state) => state.auth?.token);
  const { profile, loading, error } = useSelector((state) => state.account || {});

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch, token]);

  if (!token) return <p>Please login to view your profile.</p>;
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phoneNumber}</p>
      <p>Role: {profile.role}</p>
      <img
        src={profile.image || "default-avatar.png"}
        alt={`${profile.name} profile`}
        width={150}
      />
      <div>
        <h3>Address:</h3>
        <p>
          {profile.address?.HNo}, {profile.address?.buildingName}, {profile.address?.area}
        </p>
        <p>
          {profile.address?.townCity}, {profile.address?.state} - {profile.address?.pincode}
        </p>
        <p>Landmark: {profile.address?.landmark}</p>
      </div>
    </div>
  );
};

export default Account;
