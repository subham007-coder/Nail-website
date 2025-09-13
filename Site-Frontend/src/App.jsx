import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthRequiredRoute from "./components/auth/AuthRequiredRoute";
import ScrollToTop from "./components/ScrollToTop";

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
          </ScrollProvider>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
