// Slugify utility matching the store app behavior
// - Lowercase
// - Replace non-alphanumeric characters with hyphen
// - Trim leading/trailing hyphens
export default function slugify(value = "") {
  try {
    const text = String(value || "");
    return text
      .toLowerCase()
      .replace(/[^A-Z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return "";
  }
}