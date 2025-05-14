import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResource } from "../api/resources";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";

export default function CreateResourcePage() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = editor?.getHTML() || "";
    try {
      const res = await createResource({ title, body, link });
      console.log("Resource created:", res);
      navigate("/");
    } catch (err) {
      console.error("Create failed:", err);
      alert(err.message);
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Create Resource
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

        <Paper
          variant="outlined"
          sx={{
            height: "75vh",
            display: "flex",
            flexDirection: "column",
            p: 2,
            overflow: "hidden",
          }}
        >
          {editor && (
            <>
              <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Button
                  variant={editor.isActive("bold") ? "contained" : "outlined"}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  Bold
                </Button>
                <Button
                  variant={editor.isActive("italic") ? "contained" : "outlined"}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  Italic
                </Button>
                <Button
                  variant={
                    editor.isActive({ textAlign: "center" })
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  Center
                </Button>
                <Button
                  variant={
                    editor.isActive("heading", { level: 1 })
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  H1
                </Button>
                <Button
                  variant={
                    editor.isActive("heading", { level: 2 })
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                </Button>
                <Button
                  variant={
                    editor.isActive("bulletList") ? "contained" : "outlined"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  Bullet List
                </Button>
                <Button
                  variant={
                    editor.isActive("orderedList") ? "contained" : "outlined"
                  }
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  Numbered List
                </Button>
                <Button
                  variant={
                    editor.isActive("codeBlock") ? "contained" : "outlined"
                  }
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  Code
                </Button>
                <Button variant="outlined" onClick={addImage}>
                  Insert Image
                </Button>
              </Box>

              <EditorContent
                editor={editor}
                style={{ flex: 1, overflowY: "auto" }}
              />
            </>
          )}
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
        Create
      </Button>
    </Box>
  );
}
