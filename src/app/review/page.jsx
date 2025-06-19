"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useUserDetails } from "@/utils/getUserDetails";
import Navbar from "../../components/Navbar";
import { Trash2, Star, Calendar, User, ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  
  const { user, loading: userLoading } = useUserDetails();
  const router = useRouter();

  const fetchReviews = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/review/all-reviews?page=${pageNum}`);
      setReviews(res.data.data);
      setTotalPages(res.data.totalPages);
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

    setDeletingId(_id);
    try {
      await axiosInstance.delete("/review/delete-review", {
        data: { _id },
      });

      setReviews((prev) => prev.filter((r) => r._id !== _id));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleCreateReview = () => {
    router.push("/review/create");
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? "text-amber-400 fill-amber-400" 
                : "text-gray-300 fill-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating}/5
        </span>
      </div>
    );
  };

  const DeleteButton = ({ reviewId, isDeleting }) => (
    <button
      onClick={() => handleDelete(reviewId)}
      disabled={isDeleting}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 
                 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 border border-red-200 hover:border-red-300"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );

  const ReviewCard = ({ review }) => (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg 
                    transition-all duration-300 hover:border-gray-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 
                          rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {review.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(review.date).toLocaleDateString("en-CA")}
            </div>
          </div>
        </div>
        
        {user && (
          <DeleteButton 
            reviewId={review._id} 
            isDeleting={deletingId === review._id} 
          />
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.stars} />
      </div>

      {/* Review Body */}
      <p className="text-gray-700 leading-relaxed">
        {review.body}
      </p>
    </div>
  );

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
      <p className="text-gray-600 font-medium">Loading reviews...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Star className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-xl font-medium text-gray-900 mb-2">No reviews found.</p>
      <p className="text-gray-600">Check back later for new reviews!</p>
    </div>
  );

  const PaginationButton = ({ onClick, disabled, children, variant = 'default' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                 ${variant === 'primary' 
                   ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300' 
                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
                 } disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );

  return (
    <div className="roboto-en min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="pt-20">
        <Navbar />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover what our customers are saying about their experiences
          </p>
          <button
            onClick={handleCreateReview}
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white 
                       font-medium rounded-lg hover:bg-pink-700 transition-colors duration-200
                       shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create Review
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : reviews.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Reviews Grid */}
            <div className="space-y-6 mb-12">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <PaginationButton
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </PaginationButton>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200
                                 ${page === i + 1
                                   ? 'bg-blue-600 text-white shadow-lg'
                                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                 }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <PaginationButton
                  onClick={handleNext}
                  disabled={page === totalPages}
                  variant="primary"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </PaginationButton>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;