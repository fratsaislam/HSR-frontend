"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import getEmailFromToken from "@/utils/getEmailFromToken";
import Navbar from "../../components/Navbar";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  const fetchReviews = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/review/all-reviews?page=${pageNum}`);
      setReviews(res.data.data);
      setTotalPages(res.data.totalPages);

      const email = getEmailFromToken();
      setAdminEmail(email);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const handleDelete = async (_id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await axiosInstance.delete("/review/delete-review", {
        data: { _id },
      });

      setReviews((prev) => prev.filter((r) => r._id !== _id));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review.");
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="roboto-en">
      <div className="bg-pink-600 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Title + Add Review */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Reviews</h1>
          <button
            onClick={() => router.push("/review/create")}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors duration-300"
          >
            Add Review
          </button>
        </div>

        {/* Loading, Empty, or Reviews */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-600">No reviews found.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold">{review.name}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(review.date).toLocaleDateString("en-CA")}
                </p>

                {/* Stars */}
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < review.stars ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="mb-2 text-gray-800">{review.body}</p>

                {/* Admin Delete */}
                {adminEmail && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
