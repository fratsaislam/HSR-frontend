"use client";

import { useState } from "react";
import axiosPlain from "@/utils/axiosPlain";
import { useRouter } from "next/navigation";

const ReviewForm = () => {
  const [form, setForm] = useState({
    name: "",
    body: "",
    date: "",
    stars: 0,
  });

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

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
      alert("Review submitted!");
      setForm({ name: "", body: "", date: "", stars: 0 });
      router.push("/review")
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("There was an error submitting your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Leave a Review</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Body */}
        <div>
          <label className="block font-medium">Review</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        {/* Stars */}
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                className={`text-3xl cursor-pointer transition ${
                  form.stars >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
