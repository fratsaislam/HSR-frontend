"use client";
import { useState } from "react";
import axiosPlain from "@/utils/axiosPlain";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Star, User, Calendar, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import "../../globals.css"

const InputField = ({ icon: Icon, label, type, name, value, onChange, required = true, rows }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">
      <Icon className="w-4 h-4 inline mr-2" />
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition-all duration-200 resize-none
                   placeholder-gray-400 text-gray-700 bg-white shadow-sm
                   hover:border-gray-400"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition-all duration-200
                   placeholder-gray-400 text-gray-700 bg-white shadow-sm
                   hover:border-gray-400"
        placeholder={type === 'date' ? '' : `Enter your ${label.toLowerCase()}...`}
      />
    )}
  </div>
);

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: "",
    body: "",
    date: "",
    stars: 0,
  });
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, stars: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, body, date, stars } = form;
    if (!name || !body || !date || stars < 1) {
      alert("All fields including a star rating are required.");
      return;
    }
    try {
      setSubmitting(true);
      await axiosPlain.post("/review/create-review", form);
      setSubmitted(true);
      setForm({ name: "", body: "", date: "", stars: 0 });
      setTimeout(() => {
        router.push("/review");
      }, 2000);
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("There was an error submitting your review.");
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="space-y-2 roboto-en">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        <Star className="w-4 h-4 inline mr-2" />
        Rating
      </label>
      <div className="flex gap-2 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className={`text-3xl transition-all duration-200 hover:scale-110 ${
              form.stars >= star 
                ? "text-amber-400 drop-shadow-sm" 
                : "text-gray-300 hover:text-amber-200"
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600 font-medium">
          {form.stars > 0 ? `${form.stars}/5` : "Select rating"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 roboto-en">
      <div className="pt-20">
        <Navbar />
      </div>
      
      <div className="max-w-2xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full 
                          flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Leave a Review
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            Share your experience and help others make informed decisions
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-8">
            {/* Name Field */}
            <InputField
              icon={User}
              label="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            {/* Date Field */}
            <InputField
              icon={Calendar}
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />

            {/* Review Body */}
            <InputField
              icon={MessageSquare}
              label="Review"
              type="textarea"
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={5}
            />

            {/* Star Rating */}
            <StarRating />

            {/* Submit Button */}
            <div className="pt-4">
              {submitted ? (
                <div className="w-full py-4 px-6 bg-green-50 border border-green-200 rounded-xl
                               flex items-center justify-center gap-3 text-green-700 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  Review submitted successfully! Redirecting...
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-purple-600 
                             text-white font-semibold rounded-xl shadow-lg
                             hover:from-pink-700 hover:to-purple-700 
                             transform hover:scale-[1.02] transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                             flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Review
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your review will be visible to other customers after submission
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;