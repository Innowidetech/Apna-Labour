import React, { useEffect, useState } from "react";

const CancellationRelated = () => {
  const [helpData, setHelpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await fetch(
          "https://apnalabour.onrender.com/api/customer/get-help-center/Cancellation%20related"
        );
        const data = await response.json();

        if (response.ok) {
          setHelpData(data?.data ? [data.data] : []); // Wrap in array for consistency
        } else {
          setError(data?.message || "Failed to load help content.");
        }
      } catch (err) {
        setError("Something went wrong while fetching help data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHelpData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading help content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-center font-medium">
        {error}
      </div>
    );
  }

  if (!helpData || helpData.length === 0) {
    return (
      <div className="p-6 text-gray-500 text-center">
        No help articles available under Cancellation Related.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {helpData[0]?.heading || "Cancellation Related Help"}
      </h1>

      <div className="space-y-4">
        {helpData[0]?.accordions?.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationRelated;
