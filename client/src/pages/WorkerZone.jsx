import React, { useState } from "react";
import { UserPlus, ShieldCheck, GraduationCap, Briefcase, Wallet } from "lucide-react"; // 👈 icons
import workerImg from "../assets/workerzone.png";
import bgPattern from "../assets/workerzone1.png";
import iconSchedule from "../assets/icon-schedule.png";
import iconPayment from "../assets/icon-payment.png";
import iconClients from "../assets/icon-clients.png";

const WorkerZone = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Section */}
      <main className="flex flex-1 bg-blue-50 flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <img
            src={workerImg}
            alt="worker"
            className="h-[300px] w-auto md:h-[350px] lg:h-[400px]"
          />
        </div>

        {/* Right Section - Login Card */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-center text-blue-600">
              Let’s get started with Apna Labour
            </h2>
            <p className="text-sm text-gray-600 text-center mt-1">
              Please Log in To Continue
            </p>

            {/* Mobile Input */}
            <div className="mt-4">
              <label className="text-sm font-medium">Mobile number</label>
              <div className="flex mt-1">
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile number"
                  className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 rounded-r-md">
                  Send
                </button>
              </div>
            </div>

            {/* OTP Input */}
            <div className="mt-4">
              <label className="text-sm font-medium">OTP</label>
              <div className="flex justify-between mt-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-10 h-10 border rounded text-center focus:outline-none"
                  />
                ))}
              </div>
              <button className="text-xs text-blue-600 mt-1 underline">
                Resend
              </button>
            </div>

            {/* Login Button */}
            <button className="w-full mt-6 bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800">
              Login
            </button>
          </div>
        </div>
      </main>

      {/* Skills Section */}
      <section
        className="relative py-16 px-6 text-center text-white"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold">
            Your skills. Your schedule. Your way.
          </h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed">
            Find trusted home service jobs nearby that fit your lifestyle. Join
            us and enjoy the flexibility and freedom to earn on your terms.
          </p>
        </div>
      </section>

      {/* Why Our Workers Love Us */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Our Workers Love Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <img src={iconSchedule} alt="schedule" className="h-12 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-center">
                Flexible Schedule
              </h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Work how, when, and where you want. Offer services in 50+
                categories and set a flexible schedule and work area.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <img src={iconPayment} alt="payment" className="h-12 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-center">
                Get Paid Without Delays
              </h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Get paid directly to your bank or wallet — fast and on time.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <img src={iconClients} alt="clients" className="h-12 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-center">
                Connect with Local Clients
              </h3>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Expand your reach and grow your business. We connect you with
                local clients and give you tools to market yourself — so you can
                focus on what you do best.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* ✅ How It Works */}
<section className="py-16 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
      How It Works
    </h2>

    <div className="relative flex justify-between items-start">
      {[
        { icon: <UserPlus size={28} className="text-blue-600" />, text: "Sign Up" },
        { icon: <ShieldCheck size={28} className="text-blue-600" />, text: "Get Verified" },
        { icon: <GraduationCap size={28} className="text-blue-600" />, text: "Get Trained" },
        { icon: <Briefcase size={28} className="text-blue-600" />, text: "Start Working" },
        { icon: <Wallet size={28} className="text-blue-600" />, text: "Get Paid" },
      ].map((step, idx) => (
        <div
          key={idx}
          className="flex-1 flex flex-col items-center text-center relative"
        >
          {/* Arc + Circle */}
          <div className="relative">
            <div className="w-20 h-10 rounded-t-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200">
              {step.icon}
            </div>
          </div>

          {/* Label */}
          <p className="mt-6 font-semibold text-sm md:text-base">{step.text}</p>

          {/* Dot below text */}
          <span className="mt-6 w-4 h-4 bg-purple-600 rounded-full relative z-10"></span>
        </div>
      ))}

      {/* ✅ Dashed line across bottom */}
      <div className="absolute bottom-1 left-0 w-full border-t-2 border-dashed border-gray-300"></div>
    </div>
  </div>
</section>

    </div>
  );
};

export default WorkerZone;
