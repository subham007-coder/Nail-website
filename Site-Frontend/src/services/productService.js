import { apiRequest } from "../utils/api";

// Fetch products from /v1/products/store
// When category is provided, backend returns products array filtered by category
// When category is empty, backend returns popularProducts/discountedProducts
export async function fetchStoreProducts({ category = "", title = "", slug = "" } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (title) params.set("title", title);
  if (slug) params.set("slug", slug);

  const query = params.toString();
  const path = `/products/store${query ? `?${query}` : ""}`;
  return apiRequest(path, { method: "GET" });
}