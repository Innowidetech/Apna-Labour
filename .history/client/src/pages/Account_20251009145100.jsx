import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.account || {});

  useEffect(() => {
    dispatch(fetchProfile());

    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      {/* Render more fields as needed */}
      <img src={profile.image || 'default-avatar.png'} alt={`${profile.name} profile`} />
      {/* Render address etc. */}
    </div>
  );
};

export default Account;
