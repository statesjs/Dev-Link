import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResource } from "../api/resources";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function CreateResourcePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResource({ title, body, link });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5">Create Resource</Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Body"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <TextField
        label="Link (optional)"
        fullWidth
        margin="normal"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button variant="contained" type="submit" fullWidth>
        Create
      </Button>
    </Box>
  );
}
