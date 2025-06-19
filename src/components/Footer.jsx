"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const quickLinks = [
    'Browse Destinations',
    'Special Offers & Packages',
    'Room Types & Amenities',
    'Customer Reviews & Ratings',
    'Travel Tips & Guides'
  ];

  const services = [
    'Concierge Assistance',
    'Flexible Booking Options',
    'Airport Transfers',
    'Wellness & Recreation'
  ];

  const socialIcons = [
    { name: 'facebook', src: '/assets/facebook.png' },
    { name: 'instagram', src: '/assets/instagram.png' },
    { name: 'youtube', src: '/assets/youtube.png' },
    { name: 'twitter', src: '/assets/twitter.png' }
  ];

  const router = useRouter();
  
  return (
    <footer className="bg-[#0c0a09]" id="contact">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 sm:gap-8">
          {/* Company Info */}
          <div>
            <div className="max-w-[120px] mb-8">
              <a href="#home">
                <img src="/assets/logo.png" alt="logo" className="w-full" />
              </a>
            </div>
            
            <p className="max-w-[600px] mb-8 text-gray-500">
              Discover a world of comfort, luxury, and adventure as you explore
              our curated selection of hotels, making every moment of your getaway
              truly extraordinary.
            </p>
            
            <button className="px-6 py-3 text-white bg-pink-600 rounded-md font-medium hover:bg-pink-700 transition-colors duration-300" onClick={() => router.push("/reservation")}>
              Book Now
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 text-xl font-medium text-white">
              QUICK LINKS
            </h4>
            
            <ul className="grid gap-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-8 text-xl font-medium text-white">
              OUR SERVICES
            </h4>
            
            <ul className="grid gap-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-8 text-xl font-medium text-white">
              CONTACT US
            </h4>
            
            <ul className="grid gap-4 mb-8">
              <li>
                <a 
                  href="mailto:intasrain@gmail.com" 
                  className="text-gray-500 hover:text-white transition-colors duration-300"
                >
                  intasrain@gmail.com
                </a>
              </li>
            </ul>
            
            <div className="flex items-center gap-4 flex-wrap">
              {socialIcons.map((social) => (
                <a key={social.name} href="#" className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <img 
                    src={social.src} 
                    alt={social.name} 
                    className="max-w-[25px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-4 text-sm text-gray-500 text-center">
        Copyright © 2023 Web Design Mastery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;