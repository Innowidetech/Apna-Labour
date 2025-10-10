import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.account || {});

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
      <h1>Customer Profile</h1>
      <img src={profile.image} alt="Profile" width="120" height="120" />
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phoneNumber}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <h3>Address:</h3>
      <p>{profile.address.buildingName}, {profile.address.street}</p>
      <p>{profile.address.area}, {profile.address.townCity}</p>
      <p>{profile.address.state} - {profile.address.pincode}</p>
      <p><strong>Landmark:</strong> {profile.address.landmark}</p>
    </div>
  );
};

export default Account;
