import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, clearProfile } from "../redux/accountSlice";
import { createSelector } from "@reduxjs/toolkit";

// Memoized selectors to prevent unnecessary rerenders
const selectAccount = (state) => state.account;

const selectProfile = createSelector(
  selectAccount,
  (account) => account.profile
);

const selectLoading = createSelector(
  selectAccount,
  (account) => account.loading
);

const selectError = createSelector(
  selectAccount,
  (account) => account.error
);

const Account = () => {
  const dispatch = useDispatch();

  // Use memoized selectors to get data
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

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
        width={150}
      />
      <div>
        <h3>Address:</h3>
        <p>
          {profile.address?.HNo}, {profile.address?.buildingName}
        </p>
        <p>
          {profile.address?.area}, {profile.address?.landmark}
        </p>
        <p>
          {profile.address?.townCity}, {profile.address?.state} -{" "}
          {profile.address?.pincode}
        </p>
      </div>
    </div>
  );
};

export default Account;
