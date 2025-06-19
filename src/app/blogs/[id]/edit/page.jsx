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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-600 text-sm font-medium">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-150"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Back to Post</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
              EDITING
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-sm text-slate-500">Hotel Content Management</span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Post</h1>
          <p className="text-slate-600">Update your hotel content and insights</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Title Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150"
                  placeholder="Enter a compelling title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150"
                  placeholder="Brief description of your post..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* Thumbnail Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Featured Image
                </label>
                
                {/* Current/Preview Image */}
                {(currentThumbnail || newThumbnail) && (
                  <div className="relative w-full h-64 mb-4 bg-white border border-slate-200 rounded-md overflow-hidden">
                    <Image
                      src={newThumbnail ? URL.createObjectURL(newThumbnail) : currentThumbnail}
                      alt={newThumbnail ? "New thumbnail preview" : "Current thumbnail"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                        newThumbnail 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {newThumbnail ? 'NEW IMAGE' : 'CURRENT'}
                      </span>
                    </div>
                  </div>
                )}

                {/* File Upload */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-md hover:border-slate-400 transition-colors duration-150 bg-slate-50">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm font-medium text-slate-600">
                        {newThumbnail ? 'Click to change image' : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {newThumbnail && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">New image selected: </span>
                      <span className="text-sm text-green-700">{newThumbnail.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Body Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Content
                </label>
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <MdEditor
                    modelValue={body}
                    onChange={setBody}
                    language="en-US"
                    previewTheme="github"
                    style={{ height: "500px" }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Use Markdown syntax for formatting. Preview available in the right panel.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-slate-900 border border-transparent rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Changes will be published immediately after saving
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditPost;