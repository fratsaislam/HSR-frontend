"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";

const AdminGalleryDashboard = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", place: "" });
  const [thumbnail, setThumbnail] = useState(null);

  const fetchGallery = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/gallery/all-gallery?page=${pageNum}`);
      setGallery(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(page);
  }, [page]);

  const handleDelete = async (_id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await axiosInstance.delete("/gallery/delete-gallery", {
        data: { _id }, // ✅ important!
      });
      setGallery((prev) => prev.filter((item) => item._id !== _id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.place || !thumbnail) {
      return alert("All fields and thumbnail are required.");
    }
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("place", form.place);
    formData.append("thumbnail", thumbnail);

    try {
      await axiosInstance.post("/gallery/create-gallery", formData);
      setForm({ title: "", description: "", place: "" });
      setThumbnail(null);
      fetchGallery(page);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Gallery Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="border p-4 mb-8 rounded shadow space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleFormChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleFormChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <div>
            <label className="block font-medium mb-1">Place</label>
            <select
                name="place"
                value={form.place}
                onChange={handleFormChange}
                className="w-full border p-2 rounded bg-white"
                required
            >
                <option value="" disabled>
                -- Select Place --
                </option>
                <option value="exterior">Exterior</option>
                <option value="interior">Interior</option>
            </select>
        </div>

        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Image
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <div
            key={item._id}
            className="border p-2 rounded shadow relative"
          >
            <Image
              width={400}
              height={192}
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-48 object-cover rounded"
              priority={false}
            />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.place}</p>
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminGalleryDashboard;
