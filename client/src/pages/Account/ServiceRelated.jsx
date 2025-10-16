// src/pages/Account/HelpCenter/ServiceRelated.jsx
import React, { useEffect, useState } from "react";

const ServiceRelated = () => {
  const [helpData, setHelpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchHelpData = async () => {
      try {
        const response = await fetch(
          "https://apnalabour.onrender.com/api/customer/get-help-center/Service Related"
        );
        const data = await response.json();
        console.log("Service Related API:", data);
        setHelpData(data?.data || null);
      } catch (error) {
        console.error("Error fetching help data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading Help Topics...
      </div>
    );
  }

  if (!helpData || !Array.isArray(helpData.accordions)) {
    return (
      <div className="text-center py-10 text-gray-600">
        No Service Related topics available.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {helpData.heading}
      </h2>

      <div className="space-y-4">
        {helpData.accordions.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span className="text-xl text-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="p-4 bg-white border-t text-gray-700 whitespace-pre-line">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRelated;
