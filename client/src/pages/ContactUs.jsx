import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import contactImg from "../assets/contactus.png";
import { submitContact, registerWorker, fetchCategories } from "../redux/contactSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.contact);

  const [subject, setSubject] = useState("general-enquiry");
  const [registrationType, setRegistrationType] = useState("");

  // Common fields
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // Worker fields
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [serviceCity, setServiceCity] = useState("");
  const [address, setAddress] = useState("");

  const skills = [
    "Lifting heavy items",
    "Loading & unloading",
    "Packing help",
    "Digging/ ground work",
    "Furniture rearrangement",
    "Cleaning assistance",
    "Garden work",
    "Construction site helper",
    "Painting assistant",
    "Labour for events",
  ];

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (subject === "worker-signup") {
        // validation
        if (!registrationType) {
          toast.error("Please select a registration type.");
          return;
        }

        if (registrationType === "Professional" && !category) {
          toast.error("Please select a category.");
          return;
        }

        if ((registrationType === "Individual" || registrationType === "Team") && !skill) {
          toast.error("Please select a skill.");
          return;
        }

        const payload = {
          name,
          email,
          mobileNumber,
          registrationType,
          subject: "Worker sign up",
          message,
          address,
          serviceCity,
        };

        if (registrationType === "Professional") {
          payload.category = category;
        } else {
          payload.skill = skill;
        }

        const result = await dispatch(registerWorker(payload));

        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Worker registered successfully!");
          resetForm();
        } else {
          toast.error(result.payload?.message || "Worker registration failed. Please try again.");
        }
      } else {
        const subjectMap = {
          "general-enquiry": "General Enquiry",
          "account-billing": "Account & billing enquiry",
          feedback: "Feedback",
        };

        const payload = {
          subject: subjectMap[subject],
          message,
          name,
          email,
          mobileNumber,
        };

        const result = await dispatch(submitContact(payload));
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Message sent successfully!");
          resetForm();
        } else {
          toast.error("Failed to send message. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const resetForm = () => {
    setMessage("");
    setName("");
    setEmail("");
    setMobileNumber("");
    setCategory("");
    setSkill("");
    setServiceCity("");
    setAddress("");
    setRegistrationType("");
    setSubject("general-enquiry");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-4 md:px-10 py-10">
      {/* Left Section */}
      <div className="flex-1 flex justify-center mb-10 md:mb-0">
        <img
          src={contactImg}
          alt="Contact illustration"
          className="w-[80%] h-auto object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-[#EAF0FB] rounded-xl shadow p-6 md:p-10 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          How may we serve you?
        </h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Looking for help, have a question, request or an idea to share? We’re
          here & ready to listen!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ===== Registration Type (conditionally visible above Subject) ===== */}
          {subject === "worker-signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Your Registration Type
              </label>
              <div className="flex gap-2">
                {["Professional", "Individual", "Team"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => {
                      setRegistrationType(type);
                      setCategory("");
                      setSkill("");
                    }}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium border ${
                      registrationType === type
                        ? "bg-[#86A8E7] text-white border-[#043B7A]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subject Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setRegistrationType("");
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="general-enquiry">General Enquiry</option>
              <option value="worker-signup">Worker Sign-Up</option>
              <option value="account-billing">Account & Billing Enquiry</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          {/* ======== GENERAL ENQUIRY FORM ======== */}
          {subject !== "worker-signup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Name + Mobile */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </>
          )}

          {/* ======== WORKER SIGN-UP FORM ======== */}
          {subject === "worker-signup" && (
            <>
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Category or Skill */}
              {registrationType === "Professional" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose a category<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Choose a category</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(registrationType === "Individual" || registrationType === "Team") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select your skill<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select a skill</option>
                    {skills.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Service City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service City
                </label>
                <input
                  type="text"
                  value={serviceCity}
                  onChange={(e) => setServiceCity(e.target.value)}
                  placeholder="Enter service city"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email + Mobile */}
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#043B7A] hover:bg-[#052f63]"
              } text-white px-8 py-2 rounded-md font-medium shadow transition-all`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default ContactUs;
