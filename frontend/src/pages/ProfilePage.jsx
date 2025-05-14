import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getResources, deleteResource } from "../api/resources";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userResources, setUserResources] = useState([]);

  useEffect(() => {
    if (!user) return;

    getResources()
      .then((resources) => {
        const filtered = resources.filter(
          (res) => res.author?._id === user._id
        );
        setUserResources(filtered);
      })
      .catch((err) =>
        console.error("Error loading user resources:", err.message)
      );
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    try {
      await deleteResource(id);
      setUserResources(userResources.filter((r) => r._id !== id));
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (!user) return <Typography>Loading profile...</Typography>;

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        {user.username}'s Profile
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Email: {user.email}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Your Resources
      </Typography>

      {userResources.length === 0 ? (
        <Typography>No resources posted yet.</Typography>
      ) : (
        userResources.map((resource) => (
          <Card key={resource._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{resource.title}</Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1 }}
                dangerouslySetInnerHTML={{
                  __html: resource.body.slice(0, 200) + "...",
                }}
              />

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleEdit(resource._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(resource._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
