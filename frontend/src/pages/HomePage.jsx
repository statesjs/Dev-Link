// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { getResources } from "../api/resources";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

function HomePage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources()
      .then(setResources)
      .catch((err) => console.error("Error loading resources:", err.message));
  }, []);

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        DevLink Resources
      </Typography>

      {resources.length === 0 ? (
        <Typography>No resources found.</Typography>
      ) : (
        resources.map((resource) => (
          <Card key={resource._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{resource.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {resource.body?.slice(0, 100)}...
              </Typography>
              {resource.link && (
                <Button
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 1 }}
                >
                  Visit
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default HomePage;
