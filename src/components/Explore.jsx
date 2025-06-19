"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import axiosPlain from '@/utils/axiosPlain';
import Link from 'next/link';

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axiosPlain.get("/blog/all-blogs");
        setBlogs(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getCurrentBlogs = () => {
    return blogs.slice(currentIndex, currentIndex + blogsPerPage);
  };

  const canGoNext = () => {
    return currentIndex + blogsPerPage < blogs.length;
  };

  const canGoPrev = () => {
    return currentIndex > 0;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setCurrentIndex(prev => prev + blogsPerPage);
    }
  };

  const handlePrev = () => {
    if (canGoPrev()) {
      setCurrentIndex(prev => Math.max(0, prev - blogsPerPage));
    }
  };

  

  if (loading) {
    return (
      <section className="py-20" id="explore">
        <div className="text-center mb-16">
          <p className="relative inline-block mb-2 font-medium tracking-widest text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-16 after:bg-pink-600">
            EXPLORE
          </p>
          <h2 className="max-w-[600px] mx-auto mb-4 text-4xl font-semibold leading-tight text-gray-900">
            What's New Today.
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20" id="explore">
        <div className="text-center mb-16">
          <p className="relative inline-block mb-2 font-medium tracking-widest text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-16 after:bg-pink-600">
            EXPLORE
          </p>
          <h2 className="max-w-[600px] mx-auto mb-4 text-4xl font-semibold leading-tight text-gray-900">
            What's New Today.
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const currentBlogs = getCurrentBlogs();
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentPage = Math.floor(currentIndex / blogsPerPage) + 1;

  return (
    <section className="py-20" id="explore">
      <div className="text-center mb-16">
        <p className="relative inline-block mb-2 font-medium tracking-widest text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-16 after:bg-pink-600">
          EXPLORE
        </p>
        <h2 className="max-w-[600px] mx-auto mb-4 text-4xl font-semibold leading-tight text-gray-900">
          What's New Today.
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Blog Grid */}
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentBlogs.map((blog) => (
              <Link href={`/blogs/${blog._id}`} key={blog._id}>
                <div
                  
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={currentIndex === 0} // Prioritize first page images
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="mb-3 text-xl font-semibold leading-tight text-gray-900 line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="mb-4 text-gray-600 line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>
                    <button className="w-full sm:w-auto px-6 py-3 text-pink-600 bg-white border border-pink-600 rounded-md font-medium hover:text-white hover:bg-pink-600 transition-colors duration-300">
                      Read More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        {/* Pagination Controls */}
        {blogs.length > blogsPerPage && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev()}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                canGoPrev()
                  ? 'text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white'
                  : 'text-gray-400 border border-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                canGoNext()
                  ? 'text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white'
                  : 'text-gray-400 border border-gray-300 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {/* Blog Count Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {currentIndex + 1}-{Math.min(currentIndex + blogsPerPage, blogs.length)} of {blogs.length} articles
          </p>
        </div>
      </div>
    </section>
  );
};

export default Explore;