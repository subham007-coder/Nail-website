import React, { useEffect, useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../utils/api";
import { getLengthQuantityBreakdown, sortLengths } from "../utils/cartUtils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutInner() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

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
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // "Cash" | "Card"

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
      // Normalize cart for backend stock deduction: include _id, quantity, and variant info
      const cart = cartItems.map((item) => ({
        _id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
        selectedLength: item.selectedLength,
        selectedCurl: item.selectedCurl,
        selectedColor: item.selectedColor,
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
        paymentMethod,
        cart,
        subTotal: subtotal,
        shippingCost,
        discount,
        total,
        // status omitted to use backend default "Pending"
      };

      if (paymentMethod === "Card") {
        if (!stripe || !elements) {
          throw new Error("Stripe not initialized");
        }

        // Create a PaymentMethod on client
        const pmResult = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.contact,
          },
        });
        if (pmResult.error || !pmResult.paymentMethod) {
          throw new Error(pmResult.error?.message || "Failed to create payment method");
        }

        // Create Payment Intent on server
        const paymentIntent = await apiRequest("/order/create-payment-intent", {
          method: "POST",
          body: JSON.stringify({ total, cardInfo: pmResult.paymentMethod, email: userDetails.email }),
        });

        // Confirm card payment
        const confirmRes = await stripe.confirmCardPayment(paymentIntent?.client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
        if (confirmRes.error) {
          throw new Error(confirmRes.error.message || "Payment confirmation failed");
        }

        // Save order only after successful payment confirmation
        const order = await apiRequest("/order/add", {
          method: "POST",
          body: JSON.stringify({ ...orderInfo, cardInfo: paymentIntent }),
        });

        clearCart();
        toast.success("Order placed successfully! Payment completed.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(`/thank-you?orderId=${order._id}`);
      } else {
        // Cash on Delivery (existing flow)
        const order = await apiRequest("/order/add", {
          method: "POST",
          body: JSON.stringify(orderInfo),
        });
        clearCart();
        toast.success("Order placed successfully! We'll contact you soon.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(`/thank-you?orderId=${order._id}`);
      }
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
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contact</label>
                <input name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Country</label>
                <input name="country" value={form.country} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input name="city" value={form.city} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                <input name="zipCode" value={form.zipCode} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Shipping Option</label>
                <select name="shippingOption" value={form.shippingOption} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 border-gray-300">
                  <option value="Standard">Standard (Free)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash"
                      checked={paymentMethod === "Cash"}
                      onChange={() => setPaymentMethod("Cash")}
                    />
                    Cash on Delivery
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                    />
                    Credit/Debit Card
                  </label>
                </div>
                {paymentMethod === "Card" && (
                  <div className="mt-3 p-3 border rounded-lg">
                    <CardElement />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-pink-600 text-white mt-4 px-8 py-3 rounded-xl hover:bg-pink-700 transition-colors font-medium">
              {submitting ? "Processing..." : paymentMethod === "Card" ? "Pay & Place Order" : "Place Order (COD)"}
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
                <li key={`${item.id}-${item.selectedLength}-${item.selectedCurl}-${item.selectedColor}`} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <div className="text-gray-500 text-xs space-y-1">
                      <p>Qty: {item.quantity}</p>
                      {item.selectedLength && <p>Length: {item.selectedLength}</p>}
                      {item.selectedCurl && <p>Curl: {item.selectedCurl}</p>}
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    </div>
                  </div>
                  <div className="text-sm text-gray-900">₹{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* MM Length Breakdown */}
          {/* {(() => {
            const lengthBreakdown = getLengthQuantityBreakdown(cartItems);
            const lengths = Object.keys(lengthBreakdown);
            
            if (lengths.length > 0) {
              return (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Length Breakdown</h3>
                  <div className="space-y-2">
                    {sortLengths(lengths).map((length) => (
                      <div key={length} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{length}</span>
                        <span className="font-medium text-gray-900">{lengthBreakdown[length]} pieces</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-gray-900">Total Pieces</span>
                        <span className="text-gray-900">
                          {Object.values(lengthBreakdown).reduce((sum, qty) => sum + qty, 0)} pieces
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()} */}

        </div>
      </div>

      <Footer />
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInner />
    </Elements>
  );
}

export default Checkout;