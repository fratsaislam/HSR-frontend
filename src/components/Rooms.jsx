"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Heart, Palette, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      image: '/assets/room-1.jpg',
      title: 'Deluxe Ocean View',
      description: 'Bask in luxury with breathtaking ocean views from your private suite.'
    },
    {
      id: 2,
      image: '/assets/room-1.jpg',
      title: 'Executive Cityscape Room',
      description: 'Experience urban elegance and modern comfort in the heart of the city.'
    },
    {
      id: 3,
      image: '/assets/room-1.jpg',
      title: 'Family Garden Retreat',
      description: 'Spacious and inviting, perfect for creating cherished memories with loved ones.'
    }
  ];

  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    // Fallback: Make all items visible after a short delay if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      setVisibleItems([0, 1, 2]);
    }, 1000);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleItems(prev => [...new Set([...prev, parseInt(index)])]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
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

      {/* Rooms Grid - Mobile: side by side scrollable, Desktop: 3 column grid */}
      <div className="block sm:hidden">
        {/* Mobile Layout - Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              ref={el => itemRefs.current[index] = el}
              data-index={index}
              className={`group bg-white overflow-hidden rounded-xl shadow-lg flex-shrink-0 w-72 snap-start transform transition-all duration-700 ${
                isMounted && (visibleItems.includes(index) || !visibleItems.length)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-30 translate-y-4'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.alt = 'Image not found';
                  }}
                />
                
                {/* Action Buttons */}
                <div className="absolute right-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl text-pink-500 hover:text-pink-600 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                    <Heart size={16} />
                  </button>
                  <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl text-purple-500 hover:text-purple-600 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                    <Palette size={16} />
                  </button>
                  <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl text-blue-500 hover:text-blue-600 transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                    <Shield size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                  {room.title}
                </h4>
                
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {room.description}
                </p>
                
                <button className="w-full px-4 py-2.5 text-sm text-white bg-pink-600 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-98 shadow-md hover:shadow-lg" onClick={()=> router.push("/gallery")}>
                  Explore Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - 3 column grid */}
      <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            ref={el => itemRefs.current[index] = el}
            data-index={index}
            className={`group bg-white overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-700 ${
              isMounted && (visibleItems.includes(index) || !visibleItems.length)
                ? 'opacity-100 translate-y-0'
                : 'opacity-30 translate-y-8'
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
              <img 
                src={room.image} 
                alt={room.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.alt = 'Image not found';
                }}
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
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-200">
                {room.title}
              </h4>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                {room.description}
              </p>
              
              <div className="pt-2">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white bg-pink-600 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" onClick={()=> router.push("/gallery")}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button - Shows on all devices */}
      <div className="text-center mt-8 sm:mt-12 lg:mt-16">
        <button 
          className="px-8 py-3 sm:px-10 sm:py-4 text-pink-600 border-2 border-pink-600 rounded-lg font-medium hover:bg-pink-600 hover:text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 text-sm sm:text-base"
          onClick={() => router.push("/gallery")}
        >
          View All Rooms
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Rooms;