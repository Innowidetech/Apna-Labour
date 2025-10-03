import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import teamImg from "../assets/cleaning-team.jpg"; // 👈 replace with your image

const faqs = [
  {
    question: "How can I contact customer support?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "Are the service charges fixed or hourly based?",
    answer:
      "This is the answer text for second FAQ item. Replace this with your own content.",
  },
  {
    question: "What if I am not satisfied with the service – will I get a refund or replacement?",
    answer:
      "This is the answer text for third FAQ item. Replace this with your own content.",
  },
  {
    question: "What type of services are available (cleaning, plumbing, electrician, babysitting, etc.)?",
    answer:
      "This is the answer text for fourth FAQ item. Replace this with your own content.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // first one open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* ---- Top About Us Section ---- */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-stretch p-8">
        {/* Left - Image */}
        <div className="flex">
          <img
            src={teamImg}
            alt="About Us"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Right - About Us Content */}
        <div className="bg-gray-100 rounded-lg p-8 shadow-sm flex flex-col justify-center">
          <p className="text-blue-600 font-medium mb-2 text-right cursor-pointer">
            About Us
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
            Connecting households with <br /> skilled, trusted labour
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            We created Apna Labour with one simple goal to empower skilled
            workers to find flexible, fair, and safe job opportunities right in
            their neighborhood. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      {/* ---- FAQ Section ---- */}
      <div className="max-w-6xl mx-auto p-8">
        <h3 className="text-2xl font-bold mb-8">Frequently Ask Questions</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-xl p-6 cursor-pointer transition hover:shadow-lg ${
                openIndex === index ? "border-l-4 border-green-500" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4
                  className={`font-semibold ${
                    openIndex === index ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h4>
                {openIndex === index ? (
                  <Minus className="text-green-600" />
                ) : (
                  <Plus className="text-gray-500" />
                )}
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
