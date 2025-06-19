"use client";

import React, { useState } from "react";
import axiosPlain from "../../utils/axiosPlain";
import COUNTRY_CODES from "../../utils/countryCodes";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Phone, User, CheckCircle, AlertCircle } from "lucide-react";

/* ---------- 58 Algerian wilayas ---------- */
const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa",
  "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", "In Guezzam",
  "Touggourt", "Djanet", "El M'Ghair", "El Menia"
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, date, wilaya, countryCode } = form;

    if (!name || !phone || !date || !wilaya) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
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
      
      setShowSuccess(true);
      setForm({
        name: "",
        phone: "",
        date: "",
        wilaya: "",
        countryCode: "+213",
      });
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
      
    } catch (error) {
      console.error("Submission failed:", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="roboto-en min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
      <div className="pt-20">
        <Navbar/>
      </div>
      
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hotel Reservation
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Book your stay with us. Fill out the form below and we'll confirm your reservation shortly.
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Reservation submitted successfully!</p>
                <p className="text-green-600 text-sm">Redirecting you to the homepage...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Please fill in all required fields</p>
                <p className="text-red-600 text-sm">Make sure all information is complete and try again.</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 text-gray-500" />
                  Phone Number
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="col-span-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                    className="col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              {/* Wilaya Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Wilaya
                </label>
                <select
                  name="wilaya"
                  value={form.wilaya}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  <option value="" disabled>
                    Select your wilaya
                  </option>
                  {WILAYAS.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>
                      {wilaya}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || showSuccess}
                  className="w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-pink-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Reservation...
                    </div>
                  ) : showSuccess ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Reservation Confirmed
                    </div>
                  ) : (
                    "Submit Reservation"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              By submitting this form, you agree to our reservation terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;