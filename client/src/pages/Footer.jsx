// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logo.jpg"; // Import your logo image here

const Footer = () => {
  return (
    <footer className="bg-[#1D1845E5] text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          <img src={logo} alt="Apna Labour" className="h-10 mb-4" />
          <p className="text-gray-300 text-sm leading-relaxed">
            We created Apna Labour with one simple goal to empower skilled
            workers to find flexible, fair, and safe job opportunities right in
            their neighborhood.
          </p>
        </div>

        {/* Help Section */}
        <div>
          <h4 className="font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Contact Us</li>
            <li>Frequent Asked Questions</li>
            <li>Services Near Your Location</li>
            <li>Cancellations</li>
          </ul>
        </div>

        {/* For Helpers Section */}
        <div>
          <h4 className="font-semibold mb-3">For Helpers</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Register As A Service Provider</li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h4 className="font-semibold mb-3">Top Categories</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Appliance Repair</li>
            <li>Cleaning & Pest Control</li>
            <li>Electrician</li>
            <li>Plumber & Carpenter</li>
            <li>Painting & Waterproofing</li>
            <li>Women Salon</li>
            <li>Men Salon</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
