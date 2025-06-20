'use client';
import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import axiosPlain from '@/utils/axiosPlain.js';
import Navbar from '@/components/Navbar';

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
    <div className="min-h-screen bg-white lg:h-screen lg:overflow-hidden roboto-en">
      {/* Navbar */}
      <div className='pt-20'>
       <Navbar />
      </div>
      
      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:h-[calc(100vh-5rem)]">
        <div className="max-w-7xl mx-auto lg:h-full">
          {/* Compact Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-light text-gray-900 mb-2">Contact Us</h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Our team is here to assist you with any inquiries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:h-[calc(100%-6rem)]">
            {/* Contact Information - Compact */}
            <div className="lg:col-span-1 space-y-3 lg:overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-900 font-medium text-sm">+213 0795150298</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <p className="text-gray-900 font-medium text-sm">instasrain@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Address</h3>
                    <p className="text-gray-900 font-medium text-sm">Tiaaroussine, Djaafra, Bordj Bou Arreridj</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Response Time</h3>
                    <p className="text-gray-900 font-medium text-sm">Within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Compact */}
            <div className="lg:col-span-2 lg:overflow-y-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:h-full">
                <div className="mb-4">
                  <h2 className="text-xl font-light text-gray-900 mb-1">Send Us a Message</h2>
                  <p className="text-gray-600 text-sm">We'll get back to you as soon as possible.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-sm"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors text-sm"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors resize-none text-sm"
                      placeholder="Please tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-pink-600/90 backdrop-blur-sm text-white py-2.5 px-4 rounded-md font-medium  transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                  {status && (
                    <p className="text-center text-sm text-gray-600">{status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;