"use client";
import { useEffect, useState } from "react";
import axiosPlain from "@/utils/axiosPlain" // adjust path if needed
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "../globals.css"

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Send 1-based page to match backend logic
        const res = await axiosPlain.get(`/blog/all-blogs?page=${page + 1}`);
        
        // Debug logging
        console.log('API Response:', res.data);
        console.log('Frontend page (0-based):', page);
        console.log('Sent to backend (1-based):', page + 1);
        console.log('Posts received:', res.data.data?.length || 0);
        console.log('Total pages:', res.data.totalPages);
        console.log('Total blogs:', res.data.totalBlogs);
        
        setPosts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Debug effect to log posts when they change
  useEffect(() => {
    console.log('Posts state updated:', posts.length, 'posts');
  }, [posts]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="roboto-en">
      <div className="pt-20">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
        
        {/* Debug info */}
        <div className="text-center mb-4 text-sm text-gray-600">
          Page {page + 1} of {totalPages} | Showing {posts.length} posts
          {loading && <span className="ml-2 text-blue-600">Loading...</span>}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={false} // Changed to false for better performance
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {post.description}
                </p>
                <Link
                  href={`/blogs/${post._id}`}
                  className="text-pink-600 hover:underline font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no posts */}
        {!loading && posts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No posts found for this page.
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={page === 0 || loading}
            className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-pink-700 transition"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1 || loading}
            className="px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-pink-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;