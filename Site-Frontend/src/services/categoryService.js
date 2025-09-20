import { apiRequest } from "../utils/api";

// Fetch categories from /v1/category
export async function fetchCategories() {
  // apiRequest automatically prefixes /v1
  return apiRequest("/category", { method: "GET" });
}