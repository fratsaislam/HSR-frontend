"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosPlain from "../../../utils/axiosPlain";
import { MdPreview } from "md-editor-rt";
import Image from "next/image";
import "md-editor-rt/lib/preview.css";
import Navbar from "@/components/Navbar";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!post) return <div className="text-center py-10 text-red-600">Post not found.</div>;

  return (
    <div className="roboto-en">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md shadow-md">
              <Navbar />
      </div>
      <div className="max-w-4xl mx-auto py-10 px-4">
          
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.description}</p>

        {post.thumbnail && (
          <div className="relative w-full h-96 mb-8 rounded overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover rounded"
              priority
            />
          </div>
        )}

        <div className="prose max-w-none">
          <MdPreview modelValue={post.body} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
