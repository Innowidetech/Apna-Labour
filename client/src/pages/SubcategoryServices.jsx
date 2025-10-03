// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const SubcategoryServices = () => {
//   const { id } = useParams(); // subcategory id
//   const [services, setServices] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         console.log("Fetching services for subcategory/appliance ID:", id);
//         const res = await fetch(`https://apnalabour.onrender.com/api/customer/subcategories/appliances/${id}`);
//         const data = await res.json();
//         console.log("API response:", data);

//         if (!res.ok) {
//           // If API returns error message, use that in error
//           throw new Error(data.message || `HTTP error! Status: ${res.status}`);
//         }

//         if (Array.isArray(data) && data.length === 0) {
//           setError('No services found for this subcategory.');
//         } else {
//           setServices(data);
//         }
//       } catch (err) {
//         console.error('Error fetching services:', err);
//         setError(err.message || 'Something went wrong while fetching services.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchServices();
//     }
//   }, [id]);

//   if (isLoading) return <div>Loading services...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (services.length === 0) return <div>No services found.</div>;

//   return (
//     <div>
//       <h2>Services for this Subcategory:</h2>
//       <ul>
//         {services.map((service) => (
//           <li key={service._id || service.id}>
//             {service.name || service.title} - ₹{service.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SubcategoryServices;
