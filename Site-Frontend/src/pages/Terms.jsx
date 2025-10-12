import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBanner from "../components/AnimatedBanner";

function Terms() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <AnimatedBanner title="Terms & Conditions" subtitle="By accessing and using our website, you agree to the following Terms & Conditions." />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      {/* Main Terms Content */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-soft">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6">
            📜 Terms & Conditions
          </h2>
          <p className="text-sm text-gray-500 mb-8">Effective Date: September 3, 2025</p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Welcome to <strong>ArLashes</strong>. By accessing and using our website,
              you agree to the following Terms & Conditions:
            </p>

            <h3 className="text-lg font-semibold text-gray-900">1. Eligibility</h3>
            <p>
              You must be at least 18 years old or have parental/guardian consent to make
              purchases from our website.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">2. Product Information</h3>
            <p>
              We strive to provide accurate product descriptions, pricing, and availability.
              However, errors may occasionally occur. In case of any error, ArLashes reserves
              the right to correct it and update or cancel your order if necessary.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">3. Orders & Payments</h3>
            <p>
              All orders must be placed through our official website. Payments must be made
              using the available methods at checkout. We reserve the right to cancel any
              order if fraud, misuse, or incorrect details are suspected.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">4. Shipping & Delivery</h3>
            <p>
              All orders will be shipped as per our <span className="text-pink-600 font-medium cursor-pointer">Shipping Policy</span>.
              Delivery timelines are estimates and may vary due to courier delays or unforeseen events.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">5. Returns & Refunds</h3>
            <p>
              Returns and refunds will be handled as per our Return Policy (to be published separately).
            </p>

            <h3 className="text-lg font-semibold text-gray-900">6. User Conduct</h3>
            <p>
              You agree not to misuse our website (e.g., by submitting false information,
              attempting to hack, or violating applicable laws).
            </p>

            <h3 className="text-lg font-semibold text-gray-900">7. Intellectual Property</h3>
            <p>
              All text, images, and content on this website are the property of ArLashes.
              Copying, reproduction, or distribution without permission is strictly prohibited.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">8. Limitation of Liability</h3>
            <p>
              ArLashes will not be responsible for delays, damages, or losses caused by third-party
              courier services. We are not liable for any indirect, incidental, or consequential damages.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">9. Changes to Terms</h3>
            <p>
              ArLashes may update these Terms & Conditions at any time. Changes will be effective once
              published on this page.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;
