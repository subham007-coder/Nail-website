import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import slugify from "../../utils/slugify";
import { fetchStoreProducts } from "../../services/productService";

/**
 * ProductGrid
 * - Fetches products from backend using Next store-compatible endpoint (/v1/products/store)
 * - Filters by selected category and price range on the client side for additional constraints
 */
function ProductGrid({ filters }) {
  const activeCategoryId = filters?.categoryId || "";

  // const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState({ products: [], popularProducts: [], discountedProducts: [] });

  // Fetch from API when category changes
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchStoreProducts({ category: activeCategoryId });
        if (!cancelled) setApiData(data || {});
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load products");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [activeCategoryId]);

  // Combine whichever list backend returns given the query
  const baseList = useMemo(() => {
    if (apiData?.products?.length) return apiData.products;
    if (apiData?.popularProducts?.length) return apiData.popularProducts;
    if (apiData?.discountedProducts?.length) return apiData.discountedProducts;
    return [];
  }, [apiData]);

  const filteredProducts = useMemo(() => {
    let items = baseList.map((p) => ({
      id: p.slug || p._id || p.id,
      name:
        typeof p?.title === "object"
          ? p?.title?.en || p?.title?.default || ""
          : p?.title || p?.name || "",
      description:
        typeof p?.description === "object"
          ? p?.description?.en || p?.description?.default || ""
          : p?.description || "",
      price: p?.prices?.price ?? p?.price ?? 0,
      shortDescription:
        typeof p?.shortDescription === "object"
          ? p?.shortDescription?.en || p?.shortDescription?.default || ""
          : p?.shortDescription || "",
      originalPrice: p?.prices?.originalPrice ?? p?.prices?.compareAtPrice ?? null,


      // percentOff: (() => {
      //   // Prefer prices.discount if present
      //   const direct = p?.prices?.discount ?? p?.discount;
      //   if (typeof direct === "number") return direct;
      //   if (typeof direct === "string") {
      //     const parsed = parseFloat(direct);
      //     return Number.isFinite(parsed) ? Math.round(parsed) : 0;
      //   }
      //   // Fallback for combination products: use first variant with discount > 0
      //   if (Array.isArray(p?.variants) && p.variants.length) {
      //     const withDiscount = p.variants.find((v) => {
      //       const d = typeof v?.discount === "string" ? parseFloat(v.discount) : v?.discount;
      //       return Number.isFinite(d) && d > 0;
      //     });
      //     if (withDiscount) {
      //       const parsed = typeof withDiscount.discount === "string" ? parseFloat(withDiscount.discount) : withDiscount.discount;
      //       return Number.isFinite(parsed) ? Math.round(parsed) : 0;
      //     }
      //   }
      //   return 0;
      // })(),

      percentOff: p?.prices?.discount ?? 0,
      
      
      image: Array.isArray(p?.image) && p.image.length ? p.image[0] : p?.image || "",
      category:
        p?.category ||
        (Array.isArray(p?.categories) && p.categories.length
          ? { _id: p.categories[0]?._id || p.categories[0], name: p.categories[0]?.name }
          : {}),
      categoryName:
        typeof p?.category?.name === "object"
          ? p?.category?.name?.en || p?.category?.name?.default || ""
          : p?.category?.name || "",
      isNew: !!p?.isNew,
      isPopular: !!p?.isPopular,
      oldPrice: p?.prices?.originalPrice ?? null,
    }));

    // Backend already filters by category if provided, but keep a defensive check
    if (activeCategoryId) {
      items = items.filter(
        (p) => p?.category?.id === activeCategoryId || p?.category?._id === activeCategoryId
      );
    }

    // Price range filter
    const [minP, maxP] = filters?.priceRange || [0, Infinity];
    items = items.filter((p) => p.price >= minP && p.price <= maxP);

    // Example for type/availability (kept to match structure)
    if (filters?.type?.length) {
      const typeSet = new Set(filters.type.map((t) => slugify(t)));
      items = items.filter((p) => typeSet.has(slugify(p?.category?.name || "")));
    }

    return items;
  }, [baseList, activeCategoryId, filters]);

  const productSections = useMemo(() => {
    return {
      Products: filteredProducts,
    };
  }, [filteredProducts]);

  // if (loading) {
  //   return <div className="text-center text-gray-500 py-10">Loading products...</div>;
  // }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {Object.entries(productSections).map(([category, products]) => (
        <div key={category} className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-serif text-gray-900 px-2"
          >
            {category}
          </motion.h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
