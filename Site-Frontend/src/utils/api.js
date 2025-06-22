const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const opts = { ...options };

  // If sending JSON, set headers
  if (
    opts.body &&
    !(opts.body instanceof FormData) &&
    (!opts.headers || !opts.headers['Content-Type'])
  ) {
    opts.headers = { ...(opts.headers || {}), 'Content-Type': 'application/json' };
  }

  const res = await fetch(url, opts);

  // Try to parse JSON, even on error
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || 'API Error');
  }
  return data;
}
