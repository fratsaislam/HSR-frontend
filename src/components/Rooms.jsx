"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Heart, Palette, Shield } from 'lucide-react';

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      image: '/assets/room-1.jpg',
      title: 'Deluxe Ocean View',
      description: 'Bask in luxury with breathtaking ocean views from your private suite.',
      price: '$299/night'
    },
    {
      id: 2,
      image: '/assets/room-2.jpg',
      title: 'Executive Cityscape Room',
      description: 'Experience urban elegance and modern comfort in the heart of the city.',
      price: '$199/night'
    },
    {
      id: 3,
      image: '/assets/room-3.jpg',
      title: 'Family Garden Retreat',
      description: 'Spacious and inviting, perfect for creating cherished memories with loved ones.',
      price: '$249/night'
    }
  ];

  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleItems(prev => [...new Set([...prev, parseInt(index)])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="text-center lg:text-left mb-8 sm:mb-12 lg:mb-16">
        <p className="relative inline-block mb-3 sm:mb-4 font-medium tracking-widest text-sm sm:text-base text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-12 sm:after:w-16 after:bg-pink-600 lg:after:block after:hidden">
          OUR LIVING ROOM
        </p>
        <h2 className="max-w-none lg:max-w-[600px] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-gray-900 px-4 sm:px-0">
          The Most Memorable Rest Time Starts Here.
        </h2>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            ref={el => itemRefs.current[index] = el}
            data-index={index}
            className={`group bg-white overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 ${
              visibleItems.includes(index)
                ? 'animate-fade-in-up'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img 
                src={room.image} 
                alt={room.title}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              
              {/* Action Buttons */}
              <div className="absolute right-3 sm:right-4 bottom-3 sm:bottom-4 flex items-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl cursor-pointer text-pink-500 hover:text-pink-600 hover:bg-white transition-all duration-200 transform hover:scale-110">
                  <Heart size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl cursor-pointer text-purple-500 hover:text-purple-600 hover:bg-white transition-all duration-200 transform hover:scale-110">
                  <Palette size={16} className="sm:w-5 sm:h-5" />
                </button>
                <button className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl cursor-pointer text-blue-500 hover:text-blue-600 hover:bg-white transition-all duration-200 transform hover:scale-110">
                  <Shield size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Price Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="px-3 py-1 sm:px-4 sm:py-2 bg-pink-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg">
                  {room.price}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-200">
                {room.title}
              </h4>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                {room.description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2">
                <div className="text-center sm:text-left">
                  <span className="text-xs sm:text-sm text-gray-500 block sm:inline">Starting from </span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900 block sm:inline">{room.price}</span>
                </div>
                
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white bg-pink-600 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button - Mobile */}
      <div className="text-center mt-8 sm:mt-12 lg:hidden">
        <button className="px-6 py-3 text-pink-600 border-2 border-pink-600 rounded-lg font-medium hover:bg-pink-600 hover:text-white transition-all duration-300">
          View All Rooms
        </button>
      </div>
    </section>
  );
};

export default Rooms;
