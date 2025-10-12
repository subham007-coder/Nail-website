import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBanner from "../components/AnimatedBanner";

function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />
      
      {/* Banner Section */}
      <AnimatedBanner title="Return & Refund Policy" subtitle="If you are not satisfied with your purchase, please read our return and refund policy carefully." />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Return & Refund Policy</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-soft">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6">
            🔄 Return & Refund Policy
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Effective Date: September 3, 2025
          </p>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              At <strong>ArLashes</strong>, we want you to be happy with your
              purchase. Please read our return and refund policy carefully:
            </p>

            <h3 className="text-lg font-semibold text-gray-900">
              1) Eligibility for Returns
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Products can be returned only if they are damaged, defective, or
                incorrect at the time of delivery.
              </li>
              <li>
                Products must be unused, unopened, and in their original
                packaging.
              </li>
              <li>
                Returns must be requested within <strong>48 hours</strong> of
                delivery with proper evidence (photo/video proof).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              2) Non-Returnable Items
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                For hygiene and safety reasons, certain products (e.g., false
                eyelashes, lash glue, cosmetics, or any opened beauty items) are
                not eligible for return unless they are defective or wrong
                items.
              </li>
              <li>
                Gift cards, sale items, or promotional products are
                non-returnable.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              3) Return Process
            </h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                Contact our customer support within 48 hours of receiving your
                order at:
                <br />
                📧 <strong>arlashesindia@gmail.com</strong>
                <br />
                📞 <strong>+91 9064471421</strong>
              </li>
              <li>
                Provide order details and evidence (photos/videos of the issue).
              </li>
              <li>
                Once approved, you will receive instructions on how to return
                the item.
              </li>
              <li>
                Products must be shipped back in secure packaging to prevent
                damage during transit.
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-900">4) Refunds</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                After inspection, if your return is approved, your refund will
                be processed within 7–10 business days.
              </li>
              <li>Refunds will be issued to your original payment method.</li>
              <li>
                Shipping charges are non-refundable, unless the return is due to
                our error (wrong or defective product).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              5) Replacements
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If stock is available, you may choose a replacement instead of a
                refund.
              </li>
              <li>
                If the product is out of stock, you will receive a refund.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              6) Return Shipping Costs
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If the return is due to a mistake by <strong>ArLashes</strong>{" "}
                (wrong/defective/damaged product), we will bear the return
                shipping cost.
              </li>
              <li>
                If the return is due to customer reasons (change of mind, wrong
                order placed), the customer must bear the return shipping cost.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              7) Order Cancellations
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Orders can be canceled within <strong>1 hour</strong> of placing
                the order by contacting customer support.
              </li>
              <li>Once shipped, an order cannot be canceled.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900">
              8) Contact Us
            </h3>
            <p>
              For any questions regarding returns or refunds, reach us at:
              <br />
              📧 <strong>arlashesindia@gmail.com</strong>
              <br />
              📞 <strong>+91 9064471421</strong>
              <br />
              🕑 <strong>Monday – Saturday, 10:00 AM – 7:00 PM</strong>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ReturnPolicy;
