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
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "", //set to empty
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
      await updateResource(id, { title, body, link });
      navigate("/profile");
    } catch (err) {
      alert("Update failed");
      console.error(err);
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
        Save Changes
      </Button>
    </Box>
  );
}
