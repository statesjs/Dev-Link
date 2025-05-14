
import { apiFetch } from "./fetcher";

export function loginUser(credentials) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function registerUser(data) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getCurrentUser() {
  return apiFetch("/auth/me");
}
