import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    country: "India",
    city: "",
    zipCode: "",
    shippingOption: "Standard",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const nameParts = (user.name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
      setForm((f) => ({
        ...f,
        firstName,
        lastName,
        email: user.email || "",
        address: user.address || "",
        contact: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const subtotal = getCartTotal();
  const shippingCost = 0; // COD only, free shipping (adjust later if needed)
  const discount = 0;
  const total = subtotal + shippingCost - discount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return;
    setSubmitting(true);
    setError("");
    try {
      // Normalize cart for backend stock deduction: include _id and quantity
      const cart = cartItems.map((item) => ({
        _id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
      }));

      const userDetails = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        contact: form.contact,
        email: form.email,
        address: form.address,
        country: form.country,
        city: form.city,
        zipCode: form.zipCode,
      };

      const orderInfo = {
        user_info: userDetails,
        shippingOption: form.shippingOption,
        paymentMethod: "Cash", // COD
        cart,
        subTotal: subtotal,
        shippingCost,
        discount,
        total,
        // status omitted to use backend default "Pending"
      };

      const order = await apiRequest("/order/add", {
        method: "POST",
        body: JSON.stringify(orderInfo),
      });

      // Navigate to order details page
      clearCart();
      navigate(`/order/${order._id}`);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-[#FDF8F5]">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">Your cart is empty</h2>
          <Link to="/shop" className="text-pink-600 hover:underline">Continue Shopping</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      <div className="bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 text-center">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        {/* Shipping form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Details</h2>
          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contact</label>
                <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Country</label>
                <input name="country" value={form.country} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                <input name="zipCode" value={form.zipCode} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Shipping Option</label>
                <select name="shippingOption" value={form.shippingOption} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                  <option value="Standard">Standard (Free)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                <input value="Cash on Delivery" readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-pink-600 text-white mt-4 px-8 py-3 rounded-xl hover:bg-pink-700 transition-colors font-medium">
              {submitting ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-soft h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>₹{discount}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-medium text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
            <ul className="space-y-3 max-h-64 overflow-auto pr-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm text-gray-900">₹{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;