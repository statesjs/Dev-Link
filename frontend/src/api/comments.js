import { apiFetch } from "./fetcher";

// CREATE comment
export const createComment = (data) =>
  apiFetch("/comments", {
    method: "POST",
    body: JSON.stringify(data),
  });

// GET all comments for a specific resource
export const getCommentsByResource = (resourceId) =>
  apiFetch(`/comments/resource/${resourceId}`);

// UPDATE/EDIT comment
export const updateComment = (id, data) =>
  apiFetch(`/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

// DELETE comment
export const deleteComment = (id) =>
  apiFetch(`/comments/${id}`, { method: "DELETE" });
