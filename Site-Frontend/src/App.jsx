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
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollProvider>
            <div className="App">
              <EntryPopup />
              <FloatingBar />
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <Contact />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/appointment"
                  element={
                    <ProtectedRoute>
                      <Appointment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tutorial"
                  element={
                    <ProtectedRoute>
                      <Tutorial />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/shop"
                  element={
                    <ProtectedRoute>
                      <Shop />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/shop/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetails />
                    </ProtectedRoute>
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
