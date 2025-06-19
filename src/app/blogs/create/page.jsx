"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import "md-editor-rt/lib/style.css";
import axiosInstance from "@/utils/axiosInstance"; // adjust path if needed
import { useAuth } from "../../../utils/useAuth";
import { useRouter } from "next/navigation";

// Dynamic import to avoid hydration issues in Next.js
const MdEditor = dynamic(() => import('md-editor-rt').then((mod) => mod.MdEditor), { ssr: false });

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  const router = useRouter();

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Handle image upload for the markdown editor
  const uploadImage = async (files) => {
    const urls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance('/api/upload', {
        formData,
      });
      const data = await response.json();
      urls.push(data.url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !body || !thumbnail) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("body", body);
    formData.append("thumbnail", thumbnail);

    try {
      setSubmitting(true);
      const res = await axiosInstance.post("/blog/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post submitted successfully!");
      console.log(res.data);
      
      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setBody("");
      setThumbnail(null);
      router.push("/blogs")
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Body (Markdown)</label>
          <MdEditor
            modelValue={body}
            onChange={setBody}
            onUploadImg={uploadImage}
            language="en-US"
            previewTheme="github"
            style={{ height: "400px" }}
            toolbarsExclude={['sub', 'sup', 'codeRow', 'code', 'table', 'mermaid', 'katex', 'revoke', 'next', 'save', 'htmlPreview', 'github', 'catalog']}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          {submitting ? "Submitting..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;