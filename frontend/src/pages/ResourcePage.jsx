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
} from "@mui/material";

export default function ResourcePage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResourceById(id)
      .then((data) => {
        console.log("test delte later, data:", data);
        setResource(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load resource:", err.message);
        setLoading(false);
      });
  }, [id]);

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
          sx={{ mb: 2 }}
          dangerouslySetInnerHTML={{ __html: resource.body }}
        />

        {resource.author && resource.author.username ? (
          <Typography variant="subtitle2" color="text.secondary">
            Posted by: {resource.author.username}
          </Typography>
        ) : (
          <Typography variant="subtitle2" color="text.secondary">
            Posted by: Unknown
          </Typography>
        )}

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

        <Typography variant="h6">Comments</Typography>
        {resource.comments?.length > 0 ? (
          resource.comments.map((comment, idx) => (
            <Typography key={idx} variant="body2" sx={{ mt: 1 }}>
              • {comment}
            </Typography>
          ))
        ) : (
          <Typography>No comments yet.</Typography>
        )}
      </Paper>
    </Box>
  );
}
