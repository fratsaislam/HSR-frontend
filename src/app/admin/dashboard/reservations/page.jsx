"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchReservations = async (pageNum) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/reserv/all-reserv?page=${pageNum}`);
      setReservations(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;

    try {
      await axiosInstance.delete("/reserv/delete-reserv", {
        data: { _id: id },
      });

      // Refetch current page
      fetchReservations(page);
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      alert("Could not delete reservation.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Reservations</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-red-600">No reservations found.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((resv) => (
            <div
              key={resv._id}
              className="border p-4 rounded shadow hover:shadow-lg transition relative"
            >
              <h2 className="font-semibold text-lg">{resv.name}</h2>
              <p><strong>Phone:</strong> {resv.phone}</p>
              <p><strong>Date:</strong> {new Date(resv.date).toLocaleDateString("en-CA")}</p>
              <p><strong>Wilaya:</strong> {resv.wilaya}</p>
              <button
                onClick={() => handleDelete(resv._id)}
                className="absolute top-4 right-4 text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

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
  );
};

export default ReservationsPage;
