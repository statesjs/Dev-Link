import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById, updateResource } from "../api/resources";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

export default function EditResourcePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [initialBody, setInitialBody] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
    ],
    content: initialBody,
  });

  useEffect(() => {
    getResourceById(id)
      .then((res) => {
        setTitle(res.title);
        setLink(res.link);
        setInitialBody(res.body);
        if (editor) {
          editor.commands.setContent(res.body);
        }
      })
      .catch((err) => {
        alert("Failed to load resource");
        console.error(err);
        navigate("/profile");
      });
  }, [id, editor, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = editor?.getHTML() || "";

    try {
      await updateResource(id, { title, link, body });
      navigate("/profile");
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 800, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Resource
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Box marginY={2}>
        <Typography variant="subtitle1">Body</Typography>
        <Paper variant="outlined" sx={{ minHeight: 200, p: 2 }}>
          {editor && <EditorContent editor={editor} />}
        </Paper>
      </Box>

      <TextField
        label="Link (optional)"
        fullWidth
        margin="normal"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
}
