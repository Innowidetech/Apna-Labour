import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../redux/notificationSlice";
import { X } from "lucide-react"; // delete icon
// import EmptyInbox from "../../assets/empty-inbox.png"; // 🖼️ add your image path here

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  // 🕒 Function to calculate "x days ago"
  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  // 🔘 Handle single notification mark as read
  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  // ✅ Handle mark all as read
  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  // ❌ Handle delete notification
  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          Notifications
        </h2>
        {safeNotifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-blue-700 text-sm font-medium hover:underline"
          >
            Mark as all read
          </button>
        )}
      </div>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* 📨 Empty inbox view */}
      {!loading && safeNotifications.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          {/* <img
            src={EmptyInbox}
            alt="Inbox is clear"
            className="w-28 h-28 mb-4"
          /> */}
          <h3 className="text-lg font-semibold text-gray-800">
            Inbox is clear!
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            You don’t have any new notifications.
          </p>
          <button className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition">
            Explore Services
          </button>
        </div>
      )}

      {/* Notification List */}
      {!loading && safeNotifications.length > 0 && (
        <div className="space-y-3">
          {safeNotifications.map((item, index) => (
            <div
              key={item._id || index}
              className={`relative flex justify-between items-start p-4 rounded-xl shadow-sm border transition ${
                item.isRead ? "bg-gray-50" : "bg-white"
              }`}
            >
              {/* Left side (message) */}
              <div className="flex-1 pr-6">
                <p className="text-gray-800 text-sm md:text-base">
                  {item.title && (
                    <span className="font-semibold">{item.title} </span>
                  )}
                  {item.message || ""}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {getTimeAgo(item.date)}
                </p>
              </div>

              {/* Right side (dot + delete) */}
              <div className="flex flex-col items-end gap-2">
                {!item.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(item._id)}
                    className="w-3 h-3 rounded-full bg-red-600 hover:bg-red-700"
                    title="Mark as read"
                  ></button>
                )}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Delete notification"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
