import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerProfile, updateCustomerProfile } from "./";

const Account = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.account.profile);
  const loading = useSelector((state) => state.account.loading);
  const error = useSelector((state) => state.account.error);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phoneNumber || "");
      setGender(profile.gender || "");
    }
  }, [profile]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phone);
    formData.append("gender", gender);
    if (imageFile) formData.append("image", imageFile);

    dispatch(updateCustomerProfile(formData)).then(() => setEditMode(false));
  };

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!profile) return <p className="text-gray-500">No profile data found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={profile?.image || "https://via.placeholder.com/150"}
            alt={profile?.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-2">
          {!editMode ? (
            <>
              <div><span className="font-semibold">Name: </span>{profile?.name}</div>
              <div><span className="font-semibold">Email: </span>{profile?.email}</div>
              <div><span className="font-semibold">Phone: </span>{profile?.phoneNumber}</div>
              <div><span className="font-semibold">Gender: </span>{profile?.gender}</div>
              <div><span className="font-semibold">Role: </span>{profile?.role}</div>

              {profile?.address && (
                <div className="mt-2">
                  <span className="font-semibold">Address:</span>
                  <div className="ml-4">
                    <div>{profile.address.HNo}, {profile.address.street}</div>
                    <div>{profile.address.area}, {profile.address.townCity}</div>
                    <div>{profile.address.landmark}</div>
                    <div>{profile.address.state} - {profile.address.pincode}</div>
                  </div>
                </div>
              )}

              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-2">
              <div>
                <label className="font-semibold">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border px-2 py-1 rounded w-full" />
              </div>
              <div>
                <label className="font-semibold">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 rounded w-full" />
              </div>
              <div>
                <label className="font-semibold">Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="border px-2 py-1 rounded w-full" />
              </div>
              <div>
                <label className="font-semibold">Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="border px-2 py-1 rounded w-full">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="font-semibold">Profile Image:</label>
                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              </div>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

