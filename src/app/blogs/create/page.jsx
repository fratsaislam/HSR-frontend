"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import "md-editor-rt/lib/style.css";
import axiosInstance from "@/utils/axiosInstance"; // adjust path if needed
import { useAuth } from "../../../utils/useAuth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar"

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
    <div className="overflow-x-hidden">
      <div className="pt-20">
        <Navbar/>
      </div>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Back to Blog</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3 mb-4 overflow-x-auto">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 whitespace-nowrap">
                NEW POST
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sm text-slate-500 whitespace-nowrap">Hotel Content Management</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Create New Post</h1>
            <p className="text-slate-600 text-sm sm:text-base">Share your hotel insights and expertise</p>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150 text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-150 text-sm sm:text-base"
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
                  
                  {/* Preview Image */}
                  {thumbnail && (
                    <div className="relative w-full h-48 sm:h-64 mb-4 bg-white border border-slate-200 rounded-md overflow-hidden">
                      <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          PREVIEW
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="flex items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-slate-300 rounded-md hover:border-slate-400 transition-colors duration-150 bg-slate-50">
                      <div className="text-center px-4">
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-xs sm:text-sm font-medium text-slate-600">
                          {thumbnail ? 'Click to change image' : 'Click to upload featured image'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  {thumbnail && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium text-green-800">Image selected: </span>
                          <span className="text-sm text-green-700 break-all">{thumbnail.name}</span>
                        </div>
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
                    <div className="w-full overflow-x-auto">
                      <MdEditor
                        modelValue={body}
                        onChange={setBody}
                        onUploadImg={uploadImage}
                        language="en-US"
                        previewTheme="github"
                        style={{ 
                          height: "400px",
                          minWidth: "100%"
                        }}
                        toolbarsExclude={['sub', 'sup', 'codeRow', 'code', 'table', 'mermaid', 'katex', 'revoke', 'next', 'save', 'htmlPreview', 'github', 'catalog']}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Use Markdown syntax for formatting. Preview available in the right panel.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-6 border-t border-slate-200 space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors duration-150 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-slate-900 border border-transparent rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 order-1 sm:order-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Publish Post
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-slate-500">
              Your post will be published immediately and visible to all visitors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;