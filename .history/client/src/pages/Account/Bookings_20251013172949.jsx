// src/pages/account/Bookings.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      <pre>{JSON.stringify(bookings, null, 2)}</pre>
    </div>
  );
};

export default Bookings;
