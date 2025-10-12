import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBanner from "../components/AnimatedBanner";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <AnimatedBanner title="Privacy Policy" subtitle="We respect your privacy. This Privacy Policy explains how we collect, use, and protect your information." />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Main Privacy Policy Content */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-soft">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6">
          🔒 Privacy Policy
          </h2>
          <p className="text-sm text-gray-500 mb-8">Effective Date: September 3, 2025</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              At <strong>ArLashes</strong>, we respect your privacy. This Privacy Policy
              explains how we collect, use, and protect your information.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">1. Information We Collect</h3>
            <p>
              Personal details such as your name, phone number, email, and shipping address
              when you place an order.
            </p>
            <p>
              Technical details such as browser data or cookies when you use our website.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h3>
            <p>• To process and deliver your orders.</p>
            <p>• To communicate with you regarding order updates and customer support.</p>
            <p>• To improve our website and services.</p>

            <h3 className="text-lg font-semibold text-gray-900">3. Information Sharing</h3>
            <p>
              We do not sell your personal information to third parties. Information may be
              shared only with trusted service providers (e.g., courier or payment gateways)
              for order fulfillment.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">4. Data Security</h3>
            <p>
              We use appropriate technical and organizational measures to safeguard your
              personal data.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">5. Cookies</h3>
            <p>
              Our website may use cookies to enhance your browsing experience. You may disable
              cookies from your browser settings, but some features of the website may not
              function properly.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">6. Your Rights</h3>
            <p>
              You may request to update, correct, or delete your personal information from our
              system.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">7. Changes to Policy</h3>
            <p>
              ArLashes may update this Privacy Policy from time to time. Updated policies will
              be published on this page.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">8. Contact Us</h3>
            <p className="space-y-1">
              📧 <strong>Email:</strong> arlashesindia@gmail.com <br />
              📞 <strong>Phone/WhatsApp:</strong> +91 9064471421 <br />
              🕑 <strong>Working Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
