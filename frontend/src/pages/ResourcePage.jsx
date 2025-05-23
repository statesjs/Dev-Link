import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourceById } from "../api/resources";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Paper,
  Divider,
  TextField,
  Button,
} from "@mui/material";

import {
  getCommentsByResource,
  createComment,
  updateComment,
  deleteComment,
} from "../api/comments";
import { useAuth } from "../context/AuthContext";

export default function ResourcePage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedBody, setEditedBody] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getResourceById(id)
      .then((data) => {
        setResource(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load resource:", err.message);
        setLoading(false);
      });

    getCommentsByResource(id)
      .then(setComments)
      .catch((err) => console.error("Failed to load comments:", err.message));
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await createComment({ body: newComment, resource: id });
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment");
      console.error(err);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const updated = await updateComment(commentId, { body: editedBody });
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, body: updated.body } : c
        )
      );
      setEditingCommentId(null);
      setEditedBody("");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!resource) {
    return <Typography>Resource not found.</Typography>;
  }

  return (
    <Box padding={4} maxWidth="800px" margin="0 auto">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {resource.title}
        </Typography>

        <Box
          className="resource-body"
          dangerouslySetInnerHTML={{ __html: resource.body }}
        />

        <Typography variant="subtitle2" color="text.secondary">
          Posted by: {resource.author?.username || "Unknown"}
        </Typography>

        {resource.link && (
          <Box mt={2}>
            <Link
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Original Resource
            </Link>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments
        </Typography>

        {user && (
          <Box component="form" onSubmit={handleSubmitComment} sx={{ mb: 3 }}>
            <TextField
              label="Write a comment"
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </Box>
        )}

        {comments.length === 0 ? (
          <Typography>No comments yet.</Typography>
        ) : (
          comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
                backgroundColor: "#fafafa",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {comment.user?.username || "Unknown"} •{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>

              {editingCommentId === comment._id ? (
                <>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                  />
                  <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdateComment(comment._id)}
                      disabled={!editedBody.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setEditingCommentId(null);
                        setEditedBody("");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography sx={{ mt: 1 }}>{comment.body}</Typography>
                  {user?._id === comment.user._id && (
                    <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditedBody(comment.body);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
}
