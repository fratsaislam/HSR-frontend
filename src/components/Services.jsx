"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Clock, Headphones, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Shield,
      title: 'High Class Security',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-400'
    },
    {
      id: 2,
      icon: Clock,
      title: '24 Hours Room Service',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-400'
    },
    {
      id: 3,
      icon: Headphones,
      title: 'Conference Room',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-400'
    },
    {
      id: 4,
      icon: Map,
      title: 'Tourist Guide Support',
      bgColor: 'bg-rose-100',
      iconColor: 'text-rose-400'
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
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[528px] flex items-center"
      style={{ backgroundImage: "url('/assets/service.jpg')" }}
      id="service"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl lg:mr-8 xl:mr-16">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="text-center lg:text-left mb-4 sm:mb-6">
                <p className="relative inline-block mb-2 sm:mb-3 font-medium tracking-widest text-xs sm:text-sm text-gray-900 after:absolute after:content-[''] after:top-1/2 after:left-full after:ml-4 after:-translate-y-1/2 after:h-0.5 after:w-12 sm:after:w-16 after:bg-pink-600 lg:after:block after:hidden">
                  SERVICES
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-gray-900">
                  Strive Only For The Best.
                </h2>
              </div>

              {/* Services List */}
              <ul className="space-y-3 sm:space-y-4 lg:space-y-5">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <li
                      key={service.id}
                      ref={el => itemRefs.current[index] = el}
                      data-index={index}
                      className={`group flex items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg font-medium text-gray-900 transition-all duration-300 ${
                        visibleItems.includes(index)
                          ? 'animate-fade-in-right'
                          : 'opacity-0 translate-x-8'
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <span
                        className={`flex-shrink-0 p-2 sm:p-2.5 lg:p-3 ${service.iconColor} ${service.bgColor} rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </span>
                      <span className="group-hover:text-pink-600 transition-colors duration-300">
                        {service.title}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              <div className="mt-4 sm:mt-6 lg:mt-8 text-center lg:text-left">
                <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white bg-pink-600 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" onClick={ () => router.push("/service") }>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
