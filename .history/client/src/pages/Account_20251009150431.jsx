import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '.';

const Account = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    // Fetch profile when component mounts
    dispatch(fetchProfile());

    // Optional: clear profile on unmount
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  if (!profile) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>Customer Profile</h1>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      {/* Render other profile fields as needed */}
    </div>
  );
};

export default Account;
