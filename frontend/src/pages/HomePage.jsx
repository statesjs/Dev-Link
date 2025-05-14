import React, { useEffect, useState } from "react";
import { getResources } from "../api/resources";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

// 
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

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
          <Card key={resource._id} className="resource-card" sx={{ mb: 3 }}>
            <CardContent>
              <Link
                to={`/resource/${resource._id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" color="primary">
                  {resource.title}
                </Typography>
              </Link>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                Posted by: {resource.author?.username || "Unknown"} on{" "}
                {new Date(resource.createdAt).toLocaleDateString()}
              </Typography>

              <Box sx={{ mt: 1 }}>
                {stripHtml(resource.body).slice(0, 200)}...
              </Box>

              {resource.link && (
                <Button
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 2 }}
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
