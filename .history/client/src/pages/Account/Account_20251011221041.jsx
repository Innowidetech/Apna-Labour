import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerProfile } from "../../redux/";

const Account = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Account</h2>
      {profile && (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
};

export default Account;
