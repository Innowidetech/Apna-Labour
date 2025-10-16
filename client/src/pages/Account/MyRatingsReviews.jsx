// src/pages/Account/MyRatingsReviews.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyRatingsReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editFeedback, setEditFeedback] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const res = await fetch(
          "https://apnalabour.onrender.com/api/customer/reviews",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (count, editable = false, onChange) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) =>
        i < count ? (
          <FaStar
            key={i}
            className={`cursor-pointer ${editable ? "text-yellow-500" : "text-green-500"}`}
            onClick={() => editable && onChange(i + 1)}
          />
        ) : (
          <FaRegStar
            key={i}
            className={`cursor-pointer ${editable ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => editable && onChange(i + 1)}
          />
        )
      )}
    </div>
  );

  const handleEditClick = (review) => {
    setEditingId(review._id);
    setEditRating(review.rating || 5);
    setEditFeedback(review.feedback || "");
  };

  const handleSave = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/unit/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: editRating,
            feedback: editFeedback,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update review");

      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId ? { ...r, rating: editRating, feedback: editFeedback } : r
        )
      );

      setEditingId(null);
      toast.success("Review updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update review.");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const res = await fetch(
        `https://apnalabour.onrender.com/api/customer/unit/${reviewId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success("Review deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete review.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading reviews...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6">My Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-row bg-[#86A8E70A] rounded-lg shadow-md border p-5 items-center"
            >
              {/* LEFT SIDE: Image + Service Name */}
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  {review.targetId?.image ? (
                    <img
                      src={review.targetId.image}
                      alt={review.targetId.title || "Service"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">No Image</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.targetId?.title || review.targetType}
                </h3>
              </div>

              {/* CENTER: Vertical Line */}
              <div className="h-24 w-px bg-gray-300 mx-6"></div>

              {/* RIGHT SIDE: Feedback + Rating + User + Date + Buttons */}
              <div className="flex flex-col flex-1">
                {editingId === review._id ? (
                  <>
                    <textarea
                      className="border rounded-md p-2 w-full text-sm"
                      value={editFeedback}
                      onChange={(e) => setEditFeedback(e.target.value)}
                    />
                    <div className="mt-2">{renderStars(editRating, true, setEditRating)}</div>
                    <button
                      onClick={() => handleSave(review._id)}
                      className="mt-3 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm w-fit"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700 mb-2">{review.feedback}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <div className="text-gray-500 text-sm mb-3">
                      {review.userId} &nbsp;|&nbsp;
                      {new Date(review.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Buttons side by side */}
                    <div className="flex gap-4">
                      {editingId !== review._id && (
                        <button
                          onClick={() => handleEditClick(review)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default MyRatingsReviews;
