"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosPlain from "../../../utils/axiosPlain";
import { MdPreview } from "md-editor-rt";
import Image from "next/image";
import "md-editor-rt/lib/preview.css";
import Navbar from "@/components/Navbar";
import { useUserDetails } from "@/utils/getUserDetails";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useUserDetails();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosPlain.post('/blog/get-blog', { _id: id });
        setPost(res.data.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axiosInstance.delete(`/blog/delete-blog`, {
          data: { _id: id },
        });
        // Redirect or show success message
        window.history.back();
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="roboto-en min-h-screen bg-slate-50">
        <div className="pt-20">
          <Navbar />
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-600 text-sm font-medium">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="roboto-en min-h-screen bg-slate-50">
        <div className="pt-20">
          <Navbar />
        </div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white border border-slate-200 rounded-lg p-8 max-w-md mx-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Post Not Found</h2>
            <p className="text-slate-600 text-sm">This content is no longer available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="roboto-en min-h-screen bg-slate-50">
      <div className="pt-20">
        <Navbar />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Admin Controls */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                HOTEL INSIGHTS
              </span>
              <span className="text-slate-400">•</span>
              <time className="text-sm text-slate-500">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </div>

          {/* Admin Dropdown */}
          {user && (
            <div className="relative ml-6">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {router.push(`${id}/edit`)}}
                      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Post
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="mb-10">
            <div className="relative w-full h-[400px] bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-8 md:p-12">
            <div className="prose prose-lg prose-slate max-w-none 
              prose-headings:text-slate-900 prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-8 prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-2
              prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6
              prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-5
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-slate-900 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-slate-900 prose-pre:rounded-md prose-pre:p-4
              prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
              prose-ul:space-y-1 prose-ol:space-y-1
              prose-li:text-slate-700
              prose-img:rounded-md prose-img:border prose-img:border-slate-200
              prose-hr:border-slate-200
              prose-table:border-collapse prose-table:border prose-table:border-slate-200
              prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2
              prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-2
            ">
              <MdPreview modelValue={post.body} />
            </div>
          </div>
        </article>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span>Published by Hotel Management</span>
              <span>•</span>
              <span>Professional Insights</span>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors duration-150">
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;