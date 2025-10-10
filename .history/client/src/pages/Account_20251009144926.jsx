import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, clearProfile } from '../redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.account);

  if (!account) {
    return <div>Loading...</div>;
  }

  const { profile, loading, error } = account;

  useEffect(() => {
    dispatch(fetchProfile());
    return () => dispatch(clearProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  const { name, email, phoneNumber, role, gender, image, address } = profile;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Profile Details</h1>
      {image && (
        <img
          src={image}
          alt={`${name}'s profile`}
          style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
        />
      )}
      <h2>{name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phoneNumber}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Gender:</strong> {gender}</p>

      <h3>Address</h3>
      {address ? (
        <div style={{ lineHeight: 1.5 }}>
          <p>{address.HNo}, {address.buildingName}</p>
          <p>{address.street}, {address.area}</p>
          <p>{address.townCity}, {address.state} - {address.pincode}</p>
          <p><em>Landmark: {address.landmark}</em></p>
        </div>
      ) : (
        <p>No address information.</p>
      )}
    </div>
  );
};

export default Account;
