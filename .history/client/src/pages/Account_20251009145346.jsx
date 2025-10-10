import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();

  // Safely access account slice
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
      <p>Phone: {profile.phoneNumber}</p>
      <p>Role: {profile.role}</p>
      <img 
        src={profile.image || 'default-avatar.png'} 
        alt={`${profile.name} profile`} 
        style={{ width: '150px', borderRadius: '50%' }}
      />
      <h3>Address:</h3>
      <p>{profile.address?.buildingName}, {profile.address?.street}, {profile.address?.townCity}</p>
      <p>{profile.address?.area}, {profile.address?.state} - {profile.address?.pincode}</p>
      <p>Landmark: {profile.address?.landmark}</p>
    </div>
  );
};

export default Account;
