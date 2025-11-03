import React from "react";
import {
  FileText,
  Database,
  Eye,
  Cookie,
  Lock,
  UserCheck,
  Mail,
  Shield, // ✅ Added privacy policy icon
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Blue Header Section */}
      <div className="bg-[#023E8A] text-white py-10 px-4 text-center">
        {/* Privacy Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-white/20 rounded-full p-3 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-semibold mb-2">Privacy & Policy</h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-200 leading-relaxed">
          Please read our Privacy Policy carefully to understand how we collect,
          use, and protect your personal information when using our services.
        </p>
        <p className="mt-3 text-xs text-gray-300 italic">
          Last updated on 30th May, 2025
        </p>
      </div>

      {/* White Content Section */}
      <div className="max-w-6xl mx-auto bg-[#FFFFFF] shadow-md rounded-xl p-8 my-10 space-y-10">
        {/* Introduction */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Introduction</h2>
          </div>
          <p className="text-base text-gray-900 leading-relaxed">
            Welcome to Apna Labour. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            educational platform and use our services. <br />
            <br />
            By accessing or using our platform, you agree to the collection and
            use of information in accordance with this policy. We are committed
            to protecting your privacy and ensuring your personal information is
            handled responsibly.
          </p>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Data Collection */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Data Collection</h2>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            We collect information you provide directly to us, such as when you:
          </p>
          <ul className="list-disc pl-6 text-base text-gray-900 space-y-1">
            <li>Create an account or enroll in programs</li>
            <li>Submit assignments or participate in discussions</li>
            <li>Contact our support or feedback services</li>
            <li>Subscribe to newsletters or updates</li>
          </ul>
          <p className="text-base text-gray-900 mt-2">
            The types of personal information we may collect include your name,
            email address, educational background, course progress, and any
            other information you choose to provide.
          </p>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Use of Data */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Use of Data</h2>
          </div>
          <p className="text-base text-gray-900 mb-2">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-base text-gray-900 space-y-1">
            <li>Provide, maintain, and improve our educational services</li>
            <li>Process enrollments and track course progress</li>
            <li>Send key information and updates about your account</li>
            <li>Respond to user queries, comments, and feedback requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Comply with legal obligations and protect user rights</li>
          </ul>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Cookies and Tracking */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Cookie className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Cookies and Tracking</h2>
          </div>
          <p className="text-base text-gray-900 mb-2">
            We use cookies and related technologies for educational services to:
          </p>
          <ul className="list-disc pl-6 text-base text-gray-900 space-y-1">
            <li>Provide, maintain, and improve our educational services</li>
            <li>Process enrollments and track course progress</li>
            <li>Send key information and updates about your account</li>
            <li>Respond to user queries, comments, and feedback requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Comply with legal obligations and protect user rights</li>
          </ul>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Third-party Services */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Third-party Services</h2>
          </div>
          <p className="text-base text-gray-900 mb-2">
            We may use third-party services to enhance our educational platform.
            These services have their own privacy policies and may collect
            information such as:
          </p>
          <ul className="list-disc pl-6 text-base text-gray-900 space-y-1">
            <li>Analytics data (to measure platform usage)</li>
            <li>Payment and transaction information</li>
            <li>Communication tools for notifications and delivery</li>
            <li>Video hosting platforms for educational content</li>
          </ul>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Your Rights */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Your Rights</h2>
          </div>
          <p className="text-base text-gray-900 mb-2">
            You have several rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-base text-gray-900 space-y-1">
            <li>Access: Get a copy of the personal information we hold about you</li>
            <li>Correction: Ask us to update any inaccurate or incomplete information</li>
            <li>Deletion: Request the removal of your personal information</li>
            <li>Restriction: Limit how we use your data in certain situations</li>
            <li>Portability: Obtain your data in a structured, commonly used format</li>
            <li>Objection: Object to our processing of your information for certain purposes</li>
          </ul>
          <p className="text-base text-gray-900 mt-2">
            To exercise any of these rights, please contact us using the
            information provided in the Contact Us section below.
          </p>
           <hr className="mt-6 border-t border-gray-300" />
        </section>

        {/* Contact Us */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-blue-900" />
            <h2 className="font-bold text-lg text-black">Contact Us</h2>
          </div>
          <p className="text-base text-gray-900 mb-2">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us:
          </p>
          <p className="text-base text-gray-900">
            Email:{" "}
            <a
              href="mailto:info@apnalabour.com"
              className="text-blue-600 hover:underline"
            >
              info@apnalabour.com
            </a>
            <br />
            Phone: +91 7075541675
            <br />
            Address: 123 Education Street, Learning City, CA 12345
            <br />
            Business Hours: Monday – Friday, 9:00 AM – 5:00 PM EST
            <br />
            We will respond to your inquiry within 30 days of receiving your
            request.
          </p>
           <hr className="mt-6 border-t border-gray-300" />
        </section>
      </div>

     
    </div>
  );
};

export default PrivacyPolicy;
