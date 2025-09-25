import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../utils/api";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await apiRequest(`/order/${id}`);
        setOrder(data);
      } catch (err) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : !order ? (
          <div className="text-center py-16">Order not found</div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-serif text-gray-900">Order #{order.invoice}</h1>
              <Link to="/" className="text-pink-600 hover:underline">Continue Shopping</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Items</h2>
                <ul className="divide-y">
                  {order.cart?.map((item, idx) => (
                    <li key={idx} className="py-3 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm text-gray-900">₹{(item.price || 0) * (item.quantity || 0)}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
                  <div className="mt-2 text-sm space-y-2">
                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{order.subTotal}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{order.shippingCost}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Discount</span><span>₹{order.discount || 0}</span></div>
                    <div className="border-t pt-2 flex justify-between text-gray-900 font-medium"><span>Total</span><span>₹{order.total}</span></div>
                  </div>
                </div>
                <div className="text-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping To</h2>
                  <p className="text-gray-700 mt-1">{order.user_info?.name}</p>
                  <p className="text-gray-500">{order.user_info?.address}</p>
                  <p className="text-gray-500">{order.user_info?.city}, {order.user_info?.country} {order.user_info?.zipCode}</p>
                  <p className="text-gray-500">Phone: {order.user_info?.contact}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Payment Method: <span className="font-medium">{order.paymentMethod}</span></p>
                  <p className="text-gray-600">Status: <span className="font-medium">{order.status}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default OrderDetails;