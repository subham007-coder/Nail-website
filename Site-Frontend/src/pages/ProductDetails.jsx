// dsubh\Desktop\Nail Site\Site-Frontend\src\pages\ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiTruck, FiShield, FiRepeat, FiAward, FiStar } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductHeader from "../components/product-details/ProductHeader";
import ProductImages from "../components/product-details/ProductImages";
import ProductInfo from "../components/product-details/ProductInfo";
import RelatedProducts from "../components/product-details/RelatedProducts";
import { fetchStoreProducts } from "../services/productService";

function ProductDetails() {
  const { id } = useParams(); // treat as slug
  const [activeTab, setActiveTab] = useState("description");
  // const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchStoreProducts({ slug: id });
        const p =
          Array.isArray(data?.products) && data.products.length
            ? data.products[0]
            : null;

        // Normalize main product
        const normalized = p
          ? {
              id: p?.slug || p?._id || p?.id,
              name:
                typeof p?.title === "object"
                  ? p?.title?.en || p?.title?.default || ""
                  : p?.title || p?.name || "",
              category:
                (typeof p?.category?.name === "object"
                  ? p?.category?.name?.en || p?.category?.name?.default
                  : p?.category?.name) || "",
              price: p?.prices?.price ?? p?.price ?? 0,
              oldPrice:
                p?.prices?.originalPrice ?? p?.prices?.compareAtPrice ?? null,
              originalPrice:
                p?.prices?.originalPrice ?? p?.prices?.compareAtPrice ?? null,
              percentOff: p?.prices?.discount ?? 0,
              description:
                typeof p?.description === "object"
                  ? p?.description?.en || p?.description?.default || ""
                  : p?.description || "",
              longDescription:
                typeof p?.description === "object"
                  ? p?.description?.en || p?.description?.default || ""
                  : p?.description || "",
              shortDescription:
                typeof p?.shortDescription === "object"
                  ? p?.shortDescription?.en ||
                    p?.shortDescription?.default ||
                    ""
                  : p?.shortDescription || "",

              images: (() => {
                const arr = Array.isArray(p?.image)
                  ? p.image.filter(Boolean)
                  : p?.image
                  ? [p.image]
                  : [];
                return arr.length
                  ? arr
                  : [
                      "https://nailknack.com/cdn/shop/files/AnyConv.com__Untitleddesign_1_e0aced8b-e2a2-407b-9cd1-89d6d6d38697.webp?v=1699194525&width=360",
                    ];
              })(),
              colors: Array.isArray(p?.colors) ? p.colors : undefined,
              rating: Number.isFinite(p?.rating) ? p.rating : 4.5,
              reviewCount: Number.isFinite(p?.reviewCount) ? p.reviewCount : 0,
              details: Array.isArray(p?.details) ? p.details : [],
              specifications:
                typeof p?.specifications === "object" &&
                p?.specifications !== null
                  ? p.specifications
                  : {},
            }
          : null;

        // Normalize related products for ProductCard
        const related = Array.isArray(data?.relatedProducts)
          ? data.relatedProducts.map((rp) => ({
              id: rp?.slug || rp?._id || rp?.id,
              name:
                typeof rp?.title === "object"
                  ? rp?.title?.en || rp?.title?.default || ""
                  : rp?.title || rp?.name || "",
              description:
                typeof rp?.description === "object"
                  ? rp?.description?.en || rp?.description?.default || ""
                  : rp?.description || "",
              price: rp?.prices?.price ?? rp?.price ?? 0,
              shortDescription:
                typeof rp?.shortDescription === "object"
                  ? rp?.shortDescription?.en || rp?.shortDescription?.default || ""
                  : rp?.shortDescription || "",
              originalPrice:
                rp?.prices?.originalPrice ?? rp?.prices?.compareAtPrice ?? null,
              percentOff: rp?.prices?.discount ?? 0,
              image:
                Array.isArray(rp?.image) && rp.image.length
                  ? rp.image[0]
                  : rp?.image || "",
              category: rp?.category || {},
              categoryName:
                typeof rp?.category?.name === "object"
                  ? rp?.category?.name?.en || rp?.category?.name?.default || ""
                  : rp?.category?.name || "",
              isNew: !!rp?.isNew,
              isPopular: !!rp?.isPopular,
              oldPrice: rp?.prices?.originalPrice ?? null,
            }))
          : [];

        if (!cancelled) {
          setProduct(normalized);
          setRelatedProducts(related);
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load product");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.longDescription}
              </p>

              {/* <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Key Benefits</h4>
                <ul className="space-y-2">
                  {(product.benefits || []).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            {/* <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Specifications</h3>
              <div className="grid gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 text-sm border-b border-gray-100 py-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        );

      // case 'features':
      //   return (
      //     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      //       <div className="space-y-6">
      //         <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
      //         <div className="grid gap-6">
      //           {[
      //             {
      //               title: "Professional Grade Materials",
      //               description: "Made with high-quality ABS plastic for durability and natural look",
      //               icon: "🌟"
      //             },
      //             {
      //               title: "Easy Application",
      //               description: "No salon visit needed - apply at home in minutes",
      //               icon: "⚡"
      //             },
      //             {
      //               title: "Long-Lasting Wear",
      //               description: "Stays perfect for up to 2 weeks with proper care",
      //               icon: "⏳"
      //             },
      //             {
      //               title: "Reusable Design",
      //               description: "Can be reused multiple times with proper care and maintenance",
      //               icon: "♻️"
      //             }
      //           ].map((feature, index) => (
      //             <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
      //               <span className="text-2xl">{feature.icon}</span>
      //               <div>
      //                 <h4 className="font-medium text-gray-900">{feature.title}</h4>
      //                 <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
      //               </div>
      //             </div>
      //           ))}
      //         </div>
      //       </div>

      //       <div className="space-y-6">
      //         <h3 className="text-lg font-medium text-gray-900">What's Included</h3>
      //         <ul className="space-y-4">
      //           {[
      //             "24 press-on nails in 12 sizes",
      //             "Professional nail file",
      //             "Cuticle stick",
      //             "Nail prep pad",
      //             "Strong nail adhesive",
      //             "Detailed instruction manual",
      //             "Storage case"
      //           ].map((item, index) => (
      //             <li key={index} className="flex items-center gap-3 text-gray-600">
      //               <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      //               </svg>
      //               {item}
      //             </li>
      //           ))}
      //         </ul>
      //       </div>
      //     </div>
      //   );

      case "reviews":
        return (
          <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-medium text-gray-900">
                Customer Reviews
              </h3>
              <button
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 
                transition-colors text-sm font-medium"
              >
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  rating: 5,
                  date: "2 weeks ago",
                  comment:
                    "These nails are amazing! They look so natural and lasted for 2 full weeks. Will definitely buy again.",
                  verified: true,
                },
                {
                  name: "Emma Thompson",
                  rating: 4,
                  date: "1 month ago",
                  comment:
                    "Great quality and beautiful design. Would give 5 stars but took some practice to apply correctly.",
                  verified: true,
                },
                {
                  name: "Lisa Chen",
                  rating: 5,
                  date: "2 months ago",
                  comment:
                    "Perfect for special occasions! Got so many compliments on these.",
                  verified: true,
                },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {review.name}
                      </span>
                      {review.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="flex gap-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="text-pink-600 font-medium hover:text-pink-700 text-sm">
                Load More Reviews
              </button>
            </div>
          </div>
        );
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center">
  //       <div className="text-gray-500">Loading product...</div>
  //     </div>
  //   );
  // }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error || "Product not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <ProductHeader category={product.category} name={product.name} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/shop" className="text-gray-600 hover:text-pink-600">
              Shop
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-600">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Features Section */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FiTruck />,
              title: "Free Shipping",
              desc: "On orders above ₹499",
            },
            {
              icon: <FiShield />,
              title: "Secure Payments",
              desc: "100% secure checkout",
            },
            {
              icon: <FiRepeat />,
              title: "Easy Returns",
              desc: "7-day return policy",
            },
            {
              icon: <FiAward />,
              title: "Quality Promise",
              desc: "Authentic products",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl"
            >
              <span className="text-2xl text-pink-600 mb-2">{item.icon}</span>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Product Details Tabs */}
        <div className="mt-4">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {[
                { id: "description", label: "Description" },
                // { id: 'features', label: 'Features' },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors
                    ${
                      activeTab === tab.id
                        ? "border-pink-600 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">{renderTabContent()}</div>
        </div>

        {/* Customer Reviews Summary */}
        <div className="mt-4 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Customer Reviews
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-4xl font-medium text-gray-900">
                  {product.rating}
                </div>
                <div>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(star)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetails;
