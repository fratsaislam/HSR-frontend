"use client";
import { useEffect, useRef } from "react";
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
    <header
      className="relative max-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/header.jpg')" }}
      id="home"
    >
      <Navbar />

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-40 pb-60 text-center">
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
  );
};

export default Header;
