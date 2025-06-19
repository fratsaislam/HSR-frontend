"use client"
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const About = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    [leftRef.current, rightRef.current].forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image Section */}
        <div
          ref={leftRef}
          data-animation="fade-in-left"
          className=""
        >
          <div className="relative max-w-md sm:max-w-lg lg:max-w-none mx-auto h-64 sm:h-80 lg:h-96">
            <Image
              src="/assets/about.jpg"
              alt="Vacation"
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>

        {/* Text Section */}
        <div
          ref={rightRef}
          data-animation="fade-in-up"
          className="space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          <p className="relative inline-block mb-2 font-medium tracking-widest text-sm sm:text-base text-gray-900">
            ABOUT US
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight text-gray-900">
            The Best Holidays Start Here!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            With a focus on quality accommodations, personalized experiences, and
            seamless booking, our platform is dedicated to ensuring that every
            traveler embarks on their dream holiday with confidence and
            excitement.
          </p>
          <div className="pt-2">
            <button 
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-white bg-pink-600 rounded-lg font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
              onClick={() => router.push("/about")}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;