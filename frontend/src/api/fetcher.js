const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("API error response:", error); // test, delete
    throw new Error(error.message || "API error");
  }
  console.log("API call with token:", token);

  return res.json();
}
