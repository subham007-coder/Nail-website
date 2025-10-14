import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment"; 
import ScrollProvider from "./components/ScrollProvider";
import EntryPopup from "./components/EntryPopup";
import FloatingBar from "./components/FlotingBar";
import Tutorial from "./pages/Tutorial";
import Shop from "./pages/Shop";
import Wishlist from "./pages/cart-and-wishlist/Wishlist";
import Cart from "./pages/cart-and-wishlist/Cart";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ThankYou from "./pages/ThankYou";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRequiredRoute from "./components/auth/AuthRequiredRoute";
import ScrollToTop from "./components/ScrollToTop";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollProvider>
            <ScrollToTop />
            <div className="App">
              <EntryPopup />
              <FloatingBar />
              <Routes>
                {/* Authentication routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/forget-password/:token" element={<ResetPassword />} />

                {/* Public browsing routes - no authentication required */}
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetails />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/return" element={<ReturnPolicy />} />
                {/* Checkout */}
                <Route
                  path="/checkout"
                  element={
                    <AuthRequiredRoute>
                      <Checkout />
                    </AuthRequiredRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <AuthRequiredRoute>
                      <OrderDetails />
                    </AuthRequiredRoute>
                  }
                />
                <Route
                  path="/thank-you"
                  element={
                    <AuthRequiredRoute>
                      <ThankYou />
                    </AuthRequiredRoute>
                  }
                />

                {/* User-specific routes - authentication required */}
                <Route
                  path="/wishlist"
                  element={
                    <AuthRequiredRoute>
                      <Wishlist />
                    </AuthRequiredRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <AuthRequiredRoute>
                      <Cart />
                    </AuthRequiredRoute>
                  }
                />

                <Route
                  path="/account"
                  element={
                    <AuthRequiredRoute>
                      <Account />
                    </AuthRequiredRoute>
                  }
                />
              </Routes>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastStyle={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </ScrollProvider>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
