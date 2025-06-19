"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = ["about", "service", "explore", "contact"];

  // Function to handle navigation item clicks
  const handleNavClick = (item) => {
    if (pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(item);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home with hash
      router.push(`/#${item}`);
    }
  };

  return (
    <nav className="w-full z-50 md:bg-transparent bg-pink-600 backdrop-blur-sm ">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="max-w-[120px] h-[60px] flex items-center">
          <a href="#" className="text-white font-bold text-xl">
            <Image 
              src="/assets/logo.png" 
              alt="Logo" 
              width={120}
              height={60}
              className="max-h-[60px] w-auto"
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlZGQ5ZTgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmMmU5ZWYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPjwvc3ZnPg=="
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 cursor-pointer">
            <li className="hidden md:flex items-center gap-8 cursor-pointer">
              <button
                onClick={() => router.push("/")}
                className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300"
              >
                Home
              </button>
            </li>
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNavClick(item)}
                className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300 capitalize"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            </li>
          ))}
          <li className="hidden md:flex items-center gap-8 cursor-pointer">
            <button
              onClick={() => router.push("/blogs")}
              className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300"
            >
              News
            </button>
            <button
              onClick={() => router.push("/review")}
              className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300"
            >
              Review
            </button>
            <button
              onClick={() => router.push("/contactus")}
              className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300"
            >
              Contact Us
            </button>
            <button
              onClick={() => router.push("/gallery")}
              className="relative text-white transition-colors duration-300 hover:after:w-full after:absolute after:content-[''] after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-pink-300 after:transition-all after:duration-300"
            >
              Gallery
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={toggleMenu}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <button className="hidden md:block px-6 py-3 text-white bg-pink-700 rounded-md font-medium hover:bg-pink-800 transition-colors duration-300" onClick={() => router.push("/reservation")}>
          Book Now
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-700/95 backdrop-blur-sm">
          <ul onClick={closeMenu}>
            <li>
              <button
                onClick={() => {
                  router.push("/");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300"
              >
                Home
              </button>
            </li>
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    handleNavClick(item);
                    closeMenu();
                  }}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300 capitalize"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  router.push("/blogs");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300"
              >
                News
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push("/review");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300"
              >
                Review
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push("/contactus");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  router.push("/gallery");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-pink-800 transition-colors duration-300"
              >
                Gallery
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  router.push("/reservation");
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 text-white bg-pink-600 hover:bg-pink-800 transition-colors duration-300"
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;