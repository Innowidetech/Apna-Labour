import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { profile, loading, error } = account;

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
      <img
        src={profile.image || profile.picture || 'https://via.placeholder.com/150'}
        alt={profile.name}
        style={{ width: 150, height: 150, borderRadius: '50%' }}
      />
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phoneNumber}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <h3>Address:</h3>
      <p>{profile.address?.HNo}, {profile.address?.buildingName}</p>
      <p>{profile.address?.street}, {profile.address?.area}</p>
      <p>{profile.address?.townCity} - {profile.address?.pincode}</p>
      <p>{profile.address?.state}</p>
    </div>
  );
};

export default Account;
