"use client"
import React, { useState } from 'react';

const Booking = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guest: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    // Handle booking submission here
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-0">
      <form 
        onSubmit={handleSubmit}
        className="px-8 py-8 flex gap-4 items-center justify-center flex-wrap bg-white rounded-xl -translate-y-1/2 shadow-lg"
      >
        <div className="flex-1 min-w-[220px] flex items-center justify-center gap-4">
          <span className="text-3xl text-pink-600">
            <i className="ri-calendar-2-fill"></i>
          </span>
          <div>
            <label htmlFor="check-in" className="block font-medium text-gray-900">CHECK-IN</label>
            <input 
              type="text" 
              id="check-in"
              name="checkIn"
              placeholder="Check In" 
              value={formData.checkIn}
              onChange={handleInputChange}
              className="block w-full max-w-[150px] py-1 text-gray-900 text-sm outline-none border-none placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[220px] flex items-center justify-center gap-4">
          <span className="text-3xl text-pink-600">
            <i className="ri-calendar-2-fill"></i>
          </span>
          <div>
            <label htmlFor="check-out" className="block font-medium text-gray-900">CHECK-OUT</label>
            <input 
              type="text" 
              id="check-out"
              name="checkOut"
              placeholder="Check Out" 
              value={formData.checkOut}
              onChange={handleInputChange}
              className="block w-full max-w-[150px] py-1 text-gray-900 text-sm outline-none border-none placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[220px] flex items-center justify-center gap-4">
          <span className="text-3xl text-pink-600">
            <i className="ri-user-fill"></i>
          </span>
          <div>
            <label htmlFor="guest" className="block font-medium text-gray-900">GUEST</label>
            <input 
              type="text" 
              id="guest"
              name="guest"
              placeholder="Guest" 
              value={formData.guest}
              onChange={handleInputChange}
              className="block w-full max-w-[150px] py-1 text-gray-900 text-sm outline-none border-none placeholder-gray-500"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-[220px] flex items-center justify-center gap-4">
          <button 
            type="submit"
            className="px-6 py-3 text-white bg-pink-600 rounded-md font-medium hover:bg-pink-700 transition-colors duration-300"
          >
            CHECK OUT
          </button>
        </div>
      </form>
    </section>
  );
};

export default Booking;