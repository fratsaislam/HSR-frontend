"use client";

import React, { useState } from "react";
import axiosPlain from "../../utils/axiosPlain";
import COUNTRY_CODES from "../../utils/countryCodes";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

/* ---------- 58 Algerian wilayas ---------- */
const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
  "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam",
  "Touggourt", "Djanet", "El M'Ghair", "El Menia"
];

const ReservationForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    wilaya: "",
    countryCode: "+213",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, date, wilaya, countryCode } = form;

    if (!name || !phone || !date || !wilaya) {
      alert("All fields are required.");
      return;
    }

    // Normalize phone number
    let formattedPhone = phone.trim();
    if (/^0\d{9}$/.test(formattedPhone)) {
      formattedPhone = `${countryCode}${formattedPhone.slice(1)}`;
    } else if (/^\d{9}$/.test(formattedPhone)) {
      formattedPhone = `${countryCode}${formattedPhone}`;
    }

    try {
      setSubmitting(true);
      await axiosPlain.post("/reserv/create-reserv", {
        name,
        phone: formattedPhone,
        date,
        wilaya,
      });
      alert("Reservation submitted successfully!");
      setForm({
        name: "",
        phone: "",
        date: "",
        wilaya: "",
        countryCode: "+213",
      });
      router.push("/");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was a problem submitting your reservation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="roboto-en">
      <div className="bg-pink-600 backdrop-blur-md shadow-md">
        <Navbar/>
      </div>
      <div className="max-w-lg mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Reservation Form</h1>
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

          {/* Phone with country code dropdown */}
          <div>
            <label className="block font-medium">Phone</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="w-1/3 border p-2 rounded bg-white"
              >
                {COUNTRY_CODES.map(({ name, code }) => (
                  <option key={`${code}-${name}`} value={code}>
                    {name} ({code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-2/3 border p-2 rounded"
                required
              />
            </div>

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

          {/* Wilaya dropdown */}
          <div>
            <label className="block font-medium">Wilaya</label>
            <select
              name="wilaya"
              value={form.wilaya}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white"
              required
            >
              <option value="" disabled>
                -- Select Wilaya --
              </option>
              {WILAYAS.map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {submitting ? "Submitting..." : "Submit Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
