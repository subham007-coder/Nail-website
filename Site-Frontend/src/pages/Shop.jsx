import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShopFilters from "../components/shop/ShopFilters";
import ProductGrid from "../components/shop/ProductGrid";
import MobileFilters from "../components/shop/MobileFilters";
import { fetchCategories } from "../services/categoryService";
import slugify from "../utils/slugify";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Shop() {
  const navigate = useNavigate();
  const query = useQuery();

  const [filters, setFilters] = useState({
    availability: [],
    priceRange: [0, 699],
    type: [],
    length: [],
    shape: [],
    occasion: [],
    texture: [],
    color: [],
  });

  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Load categories
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchCategories();
        if (!cancelled) setCategories(Array.isArray(data?.data) ? data.data : data);
      } catch (e) {
        console.error("Failed to load categories", e);
        if (!cancelled) setCategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync from URL: /shop?category=slug&_id=id
  useEffect(() => {
    const qId = query.get("_id") || "";
    const qCat = query.get("category") || "";
    // If both exist, trust _id as active selection
    if (qId) setActiveCategoryId(qId);
    // Optionally, if no id but category exists, try to match by slug
    if (!qId && qCat && categories?.length) {
      const all = categories.flatMap((c) => (Array.isArray(c.children) && c.children.length ? c.children : [c]));
      const match = all.find((c) => slugify(c?.name?.en || c?.name || "") === qCat);
      if (match?._id) setActiveCategoryId(match._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, categories]);

  const handleCategorySelect = (id, name) => {
    setActiveCategoryId(id);
    const slug = slugify(name);
    // Update URL to mirror Next store style
    navigate(`/shop?category=${encodeURIComponent(slug)}&_id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      <Navbar />

      {/* Banner Section */}
      <div className="relative h-[200px] md:h-[250px] overflow-hidden bg-gradient-to-r from-pink-50 to-purple-500">
        {/* Main Gradient Bubbles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full
            bg-gradient-to-r from-pink-300 to-pink-400 opacity-50 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full
            bg-gradient-to-l from-pink-100 to-purple-200 opacity-40 blur-3xl"
        />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/3 w-6 h-6 md:w-10 md:h-10 bg-purple-100 rounded-lg opacity-40 transform rotate-45"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -15, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-4 h-4 md:w-8 md:h-8 border-2 border-pink-200 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 left-1/3 w-5 h-5 md:w-9 md:h-9 bg-purple-100 transform rotate-45 opacity-40"
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 font-serif">
              Shop Press-On Nails
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto font-light">
              Discover our collection of beautiful, handcrafted press-on nails
            </p>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">Shop</span>
          </nav>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-2 sm:px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4 px-2">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl
                     text-gray-600 font-medium flex items-center justify-center
                     hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filter Products
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters: Price Range + Categories */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ShopFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid filters={{ ...filters, categoryId: activeCategoryId }} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategorySelect={handleCategorySelect}
      />

      <Footer />
    </div>
  );
}

export default Shop;