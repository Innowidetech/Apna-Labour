import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchProfile, clearProfile } from "../redux/accountSlice";

const Account = () => {
  const dispatch = useDispatch();

  // Use shallowEqual to prevent unnecessary rerenders
  const { profile, loading, error } = useSelector(
    (state) => ({
      profile: state.account?.profile,
      loading: state.account?.loading,
      error: state.account?.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

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
        width={120}
      />
      <div>
        <h3>Address</h3>
        <p>{profile.address?.buildingName}</p>
        <p>{profile.address?.HNo}, {profile.address?.area}</p>
        <p>{profile.address?.landmark}</p>
        <p>{profile.address?.townCity}, {profile.address?.state}</p>
        <p>Pincode: {profile.address?.pincode}</p>
      </div>
    </div>
  );
};

export default Account;
