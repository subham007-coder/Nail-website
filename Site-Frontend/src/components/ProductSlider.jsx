import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FiHeart, FiEye, FiShoppingCart, FiStar } from "react-icons/fi";
import { adminApiRequest } from "../utils/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartAnimation from "./shop/CartAnimation";
import QuickView from "./shop/QuickView";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fallbackProducts = [
  {
    id: 1,
    name: "Classic French Press On Nails",
    price: 699,
    salePrice: 299,
    images: {
      default:
        "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_82386175-a9f3-4a7e-b574-99979d66cf9a.webp?v=1699124940&width=533",
      hover:
        "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_2_d28a6844-4386-4286-84a0-284ef960047e.webp?v=1699124940&width=720",
    },
  },
];

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProducts, setHoveredProducts] = useState(new Set());
  const [animatingProduct, setAnimatingProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addToCart, cartAnimation } = useCart();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await adminApiRequest("/v1/products/show");
  //       setProducts(data.products || []);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       setError("Failed to load products");
  //       setProducts(fallbackProducts);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await adminApiRequest("/v1/products/show");

        // handle both cases: array or { products: [] }
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleMouseEnter = (productId) => {
    setHoveredProducts((prev) => new Set([...prev, productId]));
  };

  const handleMouseLeave = (productId) => {
    setHoveredProducts((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(productId);
      return newSet;
    });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAnimatingProduct(product);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Products</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Products</h2>
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Products</h2>
        <div className="bg-gray-100 p-4 rounded-lg">No products available</div>
      </div>
    );
  }

  return (
    <div className="site-container mx-auto px-4 py-4 relative">
      {/* Cart Animation */}
      {animatingProduct && (
        <CartAnimation
          product={animatingProduct}
          onAnimationComplete={() => setAnimatingProduct(null)}
        />
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={{
            id:
              quickViewProduct.slug ||
              quickViewProduct._id ||
              quickViewProduct.id,
            name: quickViewProduct.title?.en || quickViewProduct.name || "",
            image:
              Array.isArray(quickViewProduct.image) &&
              quickViewProduct.image.length
                ? quickViewProduct.image[0]
                : quickViewProduct.image || "",
            price:
              quickViewProduct.prices?.price ?? quickViewProduct.price ?? 0,
            originalPrice:
              quickViewProduct.prices?.originalPrice ??
              quickViewProduct.prices?.compareAtPrice ??
              null,
            oldPrice: quickViewProduct.prices?.originalPrice ?? null,
            percentOff: quickViewProduct.prices?.discount ?? 0,
            categoryName:
              typeof quickViewProduct?.category?.name === "object"
                ? quickViewProduct?.category?.name?.en ||
                  quickViewProduct?.category?.name?.default ||
                  ""
                : quickViewProduct?.category?.name || "",
            isNew: !!quickViewProduct?.isNew,
          }}
          isOpen={true}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <h2
        className="text-2xl md:text-3xl font-bold mb-6"
        data-animation="fade-up"
      >
        French Press on Nails
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 8 }, // Better for small phones
          480: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 2.2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        grabCursor={true}
        className="product-slider bg-[#F5E6DA] rounded-xl p-4"
      >
        {products.map((product) => {
          const productId = product._id || product.id;
          const title = product.title?.en || product.name || "Product";
          const description =
            product.description?.en || product.description || "description";
          const shortDescription =
            product.shortDescription?.en ||
            product.shortDescription ||
            "Short Description";
          const stock = product.stock?.en || product.stock || "In stock";
          const originalPrice =
            product.prices?.originalPrice || product.price || 0;
          const salePrice = product.prices?.price || product.salePrice || 0;
          const discount = product.prices?.discount || 0;

          let mainImage, hoverImage;
          if (product.image && product.image.length > 0) {
            mainImage = product.image[0].replace(/\s+/g, "").replace(/`/g, "");
            hoverImage =
              product.image.length > 1
                ? product.image[1].replace(/\s+/g, "").replace(/`/g, "")
                : mainImage;
          } else if (product.images) {
            mainImage = product.images.default;
            hoverImage = product.images.hover;
          } else {
            mainImage = "https://via.placeholder.com/300";
            hoverImage = "https://via.placeholder.com/300";
          }

          return (
            <SwiperSlide key={productId} className="pb-2">
              <div
                className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                onMouseEnter={() => handleMouseEnter(productId)}
                onMouseLeave={() => handleMouseLeave(productId)}
                onClick={() =>
                  navigate(`/shop/${product.slug || product._id || product.id}`)
                }
              >
                <div className="relative aspect-[4/3] overflow-hidden p-4">
                  <img
                    src={
                      hoveredProducts.has(productId) ? hoverImage : mainImage
                    }
                    alt={title}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:flex">
                    <button className="p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-pink-600 hover:text-white transition">
                      <FiHeart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-pink-600 hover:text-white transition"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e, product);
                      }}
                      className="p-2 bg-white/80 backdrop-blur rounded-full shadow hover:bg-pink-600 hover:text-white transition"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
                    {shortDescription}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Only {stock} left!
                  </p>

                    {/* Product price */}
                  {/* <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-base font-bold text-pink-600">
                      ₹{salePrice}
                    </span>
                    {originalPrice > salePrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{originalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                       ₹{discount} OFF
                      </span>
                    )}
                  </div> */}

                  {/* Product price */}
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="text-base font-bold text-pink-600">
                      ₹{salePrice.toFixed(2)}
                    </span>
                    {originalPrice > salePrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{originalPrice.toFixed(2)}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                        ₹{discount.toFixed(2)} OFF
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(e, product);
                    }}
                    className="mt-3 w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
