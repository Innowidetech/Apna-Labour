import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state) => state.account || {});
  const { profile, loading, error } = accountState;

  useEffect(() => {
    console.log('Dispatching fetchProfile...');
    dispatch(fetchProfile());
    return () => dispatch(clearProfile());
  }, [dispatch]);

  console.log('Account state:', accountState);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>Customer Profile</h1>
      <p>Name: {profile.name}</p>
      {/* other fields */}
    </div>
  );
};

export default Account;
