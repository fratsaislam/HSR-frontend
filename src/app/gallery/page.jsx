"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Heart, Eye, Download, ChevronLeft, ChevronRight, MapPin, Home, TreePine, Camera, Filter } from 'lucide-react';
import axiosPlain from '@/utils/axiosPlain';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
// Replace with your actual backend URL
const API_BASE_URL = 'http://localhost:5000'; // Update this to your backend URL

const HotelGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGallery, setTotalGallery] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  // Intersection Observer for animations
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
  }, [galleryItems]);

  // Fetch gallery data from your backend
  const fetchGalleryData = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosPlain.get(`/gallery/all-gallery?page=${page}`);
      console.log(response.data.data)
      
      const data = response.data;
      
      
    
        console.log(data.data)
        setGalleryItems(data.data);
        setTotalPages(data.totalPages);
        setTotalGallery(data.totalGallery);
        setCurrentPage(data.currentPage + 1); // Convert back to 1-based
        setHasNextPage(data.hasNextPage);
        setHasPrevPage(data.hasPrevPage);
        
        // Reset visible items for new page
        setVisibleItems([]);
      
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      setError('Failed to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData(currentPage);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchGalleryData(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Since your backend doesn't have categories, we'll filter based on keywords in title/description
  const getItemCategory = (item) => {
    return item.place;
  };

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => getItemCategory(item) === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Handle retry on error
  const handleRetry = () => {
    fetchGalleryData(currentPage);
  };

  return (
    <div className='roboto-en'>
      <div className="bg-pink-600 backdrop-blur-md shadow-md">
          <Navbar />
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center lg:text-left mb-8 sm:mb-12 lg:mb-16">
          <p className="relative inline-block mb-3 sm:mb-4 font-medium tracking-widest text-sm sm:text-base text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-12 sm:after:w-16 after:bg-pink-600 lg:after:block after:hidden">
            HOTEL GALLERY
          </p>
          <h2 className="max-w-none lg:max-w-[600px] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-gray-900 px-4 sm:px-0 mb-4">
            Discover Our Beautiful Spaces
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl lg:max-w-none">
            Explore the stunning interior and exterior spaces that make our hotel a perfect destination for your stay.
          </p>
          {totalGallery > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {totalGallery} beautiful spaces to explore
            </p>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 sm:mb-12">
          {[
            { key: 'all', label: 'All Spaces', icon: Camera },
            { key: 'interior', label: 'Interior', icon: Home },
            { key: 'exterior', label: 'Exterior', icon: TreePine }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === key
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300 hover:text-pink-600'
              }`}
            >
              <Icon size={18} />
              {label}
              {key !== 'all' && (
                <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {galleryItems.filter(item => getItemCategory(item) === key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="ml-4 text-gray-600">Loading gallery...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-600">
              {activeFilter === 'all' ? 'No images found in gallery.' : `No ${activeFilter} images found.`}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  visibleItems.includes(index)
                    ? 'animate-fade-in-up'
                    : 'opacity-0 translate-y-12'
                } ${
                  index === 0 || index === 3 || index === 6 || index === 9 
                    ? 'md:col-span-2 aspect-[21/9]' 
                    : 'aspect-[4/3]'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => openLightbox(item)}
              >
                {/* Main Image */}
                <Image 
                  src={item.thumbnail} 
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/assets/placeholder-image.jpg'; // Add a fallback image
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                        getItemCategory(item) === 'interior' ? 'bg-blue-500/80' : 'bg-green-500/80'
                      }`}>
                        {getItemCategory(item) === 'interior' ? 'Interior' : 'Exterior'}
                      </span>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <MapPin size={12} />
                        <span>{item.place}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.description}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(item);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200 text-sm font-medium"
                      >
                        <Eye size={16} />
                        View Full
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 hover:text-pink-300 transition-all duration-200"
                      >
                        <Heart size={16} />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 hover:text-blue-300 transition-all duration-200"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/50 rounded-xl sm:rounded-2xl transition-all duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 sm:mt-16">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • {totalGallery} total images
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!hasPrevPage}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  hasPrevPage
                    ? 'text-pink-600 border-2 border-pink-600 hover:bg-pink-600 hover:text-white'
                    : 'text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              
              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                        page === currentPage
                          ? 'bg-pink-600 text-white'
                          : 'text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  hasNextPage
                    ? 'text-pink-600 border-2 border-pink-600 hover:bg-pink-600 hover:text-white'
                    : 'text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            {/* Main Image Container - Fixed positioning */}
            <div className="relative w-full max-w-6xl h-full max-h-[80vh] flex items-center justify-center">
              <Image 
                src={selectedImage.thumbnail} 
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  e.target.src = '/assets/placeholder-image.jpg';
                }}
                priority
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(item => item._id === selectedImage._id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
                  setSelectedImage(filteredItems[prevIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
              >
                <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredItems.findIndex(item => item._id === selectedImage._id);
                  const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
                  setSelectedImage(filteredItems[nextIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 group"
              >
                <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-200 z-10 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform block">✕</span>
            </button>

            {/* Image Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 sm:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                        getItemCategory(selectedImage) === 'interior' ? 'bg-blue-500/80' : 'bg-green-500/80'
                      }`}>
                        {getItemCategory(selectedImage) === 'interior' ? 'Interior' : 'Exterior'}
                      </span>
                      <div className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin size={14} />
                        <span>{selectedImage.place}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                    <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl">{selectedImage.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200">
                      <Heart size={18} />
                      <span className="hidden sm:inline">Like</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200">
                      <Download size={18} />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
                
                {/* Image Counter */}
                <div className="mt-4 text-center">
                  <span className="text-white/60 text-sm">
                    {filteredItems.findIndex(item => item._id === selectedImage._id) + 1} of {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HotelGallery;