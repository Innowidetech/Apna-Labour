import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CasualLabourPage = () => {
  const { id } = useParams();
  const [labourers, setLabourers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabourers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://apnalabour.onrender.com/api/customer/labourers/type/Team`); // or dynamic type
        const data = await res.json();
        setLabourers(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLabourers();
  }, [id]);

  if (loading) return <p>Loading casual labour...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Casual Labour</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labourers.map((labour) => (
          <div key={labour._id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{labour.name}</h3>
            <p>{labour.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasualLabourPage;
