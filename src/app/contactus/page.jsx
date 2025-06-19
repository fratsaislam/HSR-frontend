'use client';

import { useState } from 'react';
import axiosPlain from '@/utils/axiosPlain.js';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    phone: '',
    body: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPlain.post('/contact-us/create-contact', formData);
      if (res.data.success) {
        setStatus('Message sent successfully!');
        setFormData({ title: '', phone: '', body: '' });
      } else {
        setStatus('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone (+213...)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          required
        />
        <textarea
          name="body"
          placeholder="Your message..."
          value={formData.body}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Send Message
        </button>
        {status && <p className="text-center text-sm text-gray-600">{status}</p>}
      </form>
    </div>
  );
};

export default ContactPage;
