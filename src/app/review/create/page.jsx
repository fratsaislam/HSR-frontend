"use client";
import { useState } from "react";
import axiosPlain from "@/utils/axiosPlain";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Star, User, Calendar, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import "../../globals.css";

const InputField = ({ icon: Icon, label, type, name, value, onChange, required = true, rows }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-800 mb-1">
      <Icon className="w-4 h-4 inline mr-2 text-gray-500" />
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 
                   focus:border-pink-500 transition-all duration-200 resize-none
                   placeholder-gray-400 text-gray-800 bg-white shadow-sm"
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 
                   focus:border-pink-500 transition-all duration-200
                   placeholder-gray-400 text-gray-800 bg-white shadow-sm"
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
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800 mb-1 roboto-en">
        <Star className="w-4 h-4 inline mr-2 text-gray-500" />
        Rating
      </label>
      <div className="flex gap-2 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            className={`text-2xl transition-transform duration-150 hover:scale-110 ${
              form.stars >= star
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600 font-medium">
          {form.stars > 0 ? `${form.stars}/5` : "No rating yet"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 roboto-en">
      <div className="pt-20">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-indigo-600 rounded-full 
                          flex items-center justify-center mx-auto mb-5 shadow-md">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Leave a Review
          </h1>
          <p className="text-md text-gray-600 max-w-md mx-auto">
            Your feedback helps us grow and improve our services.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              icon={User}
              label="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <InputField
              icon={Calendar}
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <InputField
              icon={MessageSquare}
              label="Review"
              type="textarea"
              name="body"
              value={form.body}
              onChange={handleChange}
              rows={5}
            />
            <StarRating />

            {submitted ? (
              <div className="w-full py-3 px-4 bg-green-100 border border-green-300 rounded-lg
                             flex items-center justify-center text-green-700 font-medium gap-2">
                <CheckCircle className="w-5 h-5" />
                Submitted! Redirecting...
              </div>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 bg-pink-600 text-white font-semibold rounded-lg shadow
                           hover:bg-pink-700 transition-all duration-200
                           flex items-center justify-center gap-2
                           disabled:opacity-60 disabled:cursor-not-allowed"
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
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Once submitted, your review may be publicly visible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
