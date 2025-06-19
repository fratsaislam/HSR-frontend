"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axiosInstance from "@/utils/axiosInstance";
import "md-editor-rt/lib/style.css";
import Image from "next/image"
import { useAuth } from "@/utils/useAuth";

// Dynamically import MdEditor to avoid SSR issues
const MdEditor = dynamic(() => import("md-editor-rt").then((mod) => mod.MdEditor), { ssr: false });

const EditPost = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [oldTitle, setOldTitle] = useState("");

  // Fetch blog post on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.post("/blog/get-blog", { _id: id });
        const post = res.data.data;
        setTitle(post.title);
        setDescription(post.description);
        setBody(post.body);
        setCurrentThumbnail(post.thumbnail);
        setOldTitle(post.title);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        alert("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleThumbnailChange = (e) => {
    setNewThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (newThumbnail) {
        // Use multipart endpoint when uploading new thumbnail
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("body", body);
        formData.append("thumbnail", newThumbnail);

        await axiosInstance.patch(`/blog/edit-blog?oldTitle=${oldTitle}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Use JSON endpoint when keeping existing thumbnail
        const requestData = {
          title: title,
          description: description,
          body: body,
          thumbnail: currentThumbnail // Send as string URL
        };

        await axiosInstance.patch(`/blog/edit-blog-no-file?oldTitle=${oldTitle}`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      alert("Blog updated successfully!");
      router.push(`/blogs/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
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
          <label className="block font-medium">
            {newThumbnail ? "New Thumbnail Preview" : "Current Thumbnail"}
          </label>
          {(currentThumbnail || newThumbnail) && (
            <div className="relative w-full h-64 mb-2 rounded overflow-hidden">
                <Image
                src={newThumbnail ? URL.createObjectURL(newThumbnail) : currentThumbnail}
                alt={newThumbnail ? "New thumbnail preview" : "Current thumbnail"}
                fill
                className="object-cover"
                />
            </div>
          )}
          {newThumbnail && (
            <p className="text-sm text-green-600 mb-2">✓ New thumbnail selected: {newThumbnail.name}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            {newThumbnail ? "Select a different file to change again" : "Select a file to change thumbnail"}
          </p>
        </div>
        <div>
          <label className="block font-medium mb-2">Body (Markdown)</label>
          <MdEditor
            modelValue={body}
            onChange={setBody}
            language="en-US"
            previewTheme="github"
            style={{ height: "400px" }}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          {submitting ? "Saving..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;