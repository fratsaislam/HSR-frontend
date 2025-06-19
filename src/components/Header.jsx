"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "./Navbar"; // adjust path if needed

const Header = () => {
  const textRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const elements = [textRef.current, titleRef.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => {
      if (el) {
        el.classList.add("header-fade-in-up");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar - Independent from header */}
      <Navbar />
      
      {/* Header Section */}
      <header className="relative max-h-screen overflow-hidden" id="home">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/header.jpg"
            alt="Hotel Header Background"
            fill
            priority
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0YTQ1NGIiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzY2NWY2NSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzQ3NDI0NyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PC9zdmc+"
            quality={85}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 pt-40 pb-60 text-center">
          <p ref={textRef} className="header-fade-in-up mb-4 text-xl text-white">
            Simple - Unique - Friendly
          </p>
          <h1
            ref={titleRef}
            className="header-fade-in-up text-4xl md:text-6xl font-medium leading-tight text-white"
          >
            Make Yourself At Home
            <br />
            In Our <span className="text-pink-400">Hotel</span>.
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;