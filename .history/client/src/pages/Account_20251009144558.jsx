import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, clearProfile } from './redux/accountSlice';

const Account = () => {
  const dispatch = useDispatch();

  // Select account slice safely
  const account = useSelector((state) => state.account);

  if (!account) {
    return <div>Loading...</div>;  // avoid destructuring undefined
  }

  const { profile, loading, error } = account;

  useEffect(() => {
    dispatch(fetchProfile());
    return () => dispatch(clearProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      {/* render profile details */}
    </div>
  );
};

export default Account;
