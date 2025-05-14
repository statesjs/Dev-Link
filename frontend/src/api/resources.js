import { apiFetch } from "./fetcher";

// GET /resources — Fetch all resources
export function getResources() {
  return apiFetch("/resources");
}

// GET /resources/:id — get single resource by ID
export function getResourceById(id) {
  return apiFetch(`/resources/${id}`);
}

// POST /resources — Create a new resource (auth required)
export function createResource(data) {
  return apiFetch("/resources", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /resources/:id — Update a resource , auth, consider fo rafter capstone
export function updateResource(id, data) {
  return apiFetch(`/resources/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /resources/:id — Delete a resource (auth required)
export function deleteResource(id) {
  return apiFetch(`/resources/${id}`, {
    method: "DELETE",
  });
}
