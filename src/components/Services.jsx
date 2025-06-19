"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Shield, Clock, Headphones, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Shield,
      title: 'High Class Security',
      description: 'Advanced security systems and professional staff',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      hoverBg: 'group-hover:bg-blue-100'
    },
    {
      id: 2,
      icon: Clock,
      title: '24 Hours Room Service',
      description: 'Round-the-clock service for your comfort',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      hoverBg: 'group-hover:bg-pink-100'
    },
    {
      id: 3,
      icon: Headphones,
      title: 'Conference Room',
      description: 'Modern facilities for business meetings',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      hoverBg: 'group-hover:bg-purple-100'
    },
    {
      id: 4,
      icon: Map,
      title: 'Tourist Guide Support',
      description: 'Expert local guidance and recommendations',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      hoverBg: 'group-hover:bg-rose-100'
    }
  ];

  const itemRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  const router = useRouter();

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
      { threshold: 0.3 }
    );

    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-[528px] flex items-center" id="service">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/service.jpg"
          alt="Hotel Services Background"
          fill
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSI1MjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2NjI2NiIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjNzU3MTc1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNTI0ZTUyIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkaWVudCkiLz48L3N2Zz4="
          quality={85}
          priority={false}
        />
        {/* Enhanced Background overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/30 z-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Mobile: Center card, Desktop: Right positioned */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg lg:mr-8 xl:mr-12">
            {/* Smaller Card with glassmorphism effect */}
            <div className="relative px-4 sm:px-5 lg:px-6 py-5 sm:py-6 lg:py-7 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Subtle gradient overlay on card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              {/* Compact Header */}
              <div className="relative text-center lg:text-left mb-4 sm:mb-5">
                <p className="relative inline-block mb-1.5 sm:mb-2 font-semibold tracking-[0.2em] text-xs text-gray-700 uppercase after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-3 after:-translate-y-1/2 after:h-0.5 after:w-10 sm:after:w-12 after:bg-gradient-to-r after:from-pink-500 after:to-pink-600 lg:after:block after:hidden">
                  SERVICES
                </p>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight text-gray-900 mb-1.5">
                  Strive Only For
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    The Best.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto lg:mx-0">
                  Experience premium hospitality services
                </p>
              </div>

              {/* Compact Services List */}
              <div className="relative space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      ref={el => itemRefs.current[index] = el}
                      data-index={index}
                      className={`group relative flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                        visibleItems.includes(index)
                          ? 'animate-fade-in-right'
                          : 'opacity-0 translate-x-8'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Background hover effect */}
                      <div className="absolute inset-0 bg-white/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Compact Icon */}
                      <div className="relative flex-shrink-0">
                        <div className={`relative p-2 sm:p-2.5 ${service.iconColor} ${service.bgColor} ${service.hoverBg} rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md group-hover:shadow-lg`}>
                          <IconComponent size={14} className="sm:w-4 sm:h-4" />
                          {/* Subtle glow effect */}
                          <div className={`absolute inset-0 ${service.bgColor} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg`}></div>
                        </div>
                      </div>

                      {/* Compact Content */}
                      <div className="relative flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300 mb-0.5">
                          {service.title}
                        </h3>
                        <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                    </div>
                  );
                })}
              </div>

              {/* Compact CTA Button */}
              <div className="relative text-center lg:text-left">
                <button className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden group" onClick={()=>router.push("/service")}>
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative">Learn More</span>
                  {/* Arrow animation */}
                  <svg className="relative w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Services;