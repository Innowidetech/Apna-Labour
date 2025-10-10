import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, clearProfile } from './accountSlice';

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

  const {
    name,
    email,
    phoneNumber,
    role,
    gender,
    image,
    address: {
      HNo,
      area,
      buildingName,
      landmark,
      pincode,
      state,
      street,
      townCity,
    } = {},
  } = profile;

  return (
    <div>
      <h1>Customer Profile</h1>
      {image && <img src={image} alt={name} style={{ width: 150, borderRadius: '50%' }} />}
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phoneNumber}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Gender:</strong> {gender}</p>
      <h3>Address</h3>
      <p>{HNo}, {buildingName}, {street}</p>
      <p>{area}, {townCity}, {state} - {pincode}</p>
      <p><em>{landmark}</em></p>
    </div>
  );
};

export default Account;
