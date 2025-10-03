import React from "react";
import contactImg from "../assets/contactus.png"; // 👈 replace with your image

const ContactUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        
        {/* Left Box - Image */}
        <div className="flex-1 rounded-xl flex justify-center items-center p-6">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-[80%] h-auto object-contain"
          />
        </div>

        {/* Right Box - Form */}
        <div className="flex-1 bg-[#86A8E733] rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">How may we serve you?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Looking for help, have a question, request or an idea to share? We’re here & ready to listen!
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              />
            </div>

          {/* Subject */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Subject
  </label>
  <select
    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
    defaultValue=""
  >
    <option value="" disabled>
      Select a subject
    </option>
    <option value="general-enquiry">General Enquiry</option>
    <option value="worker-signup">Worker Sign-Up</option>
    <option value="account-billing">Account & Billing Enquiry</option>
    <option value="feedback">Feedback</option>
  </select>
</div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              ></textarea>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
