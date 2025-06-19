"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Organized navigation structure
  const mainNavItems = [
    { name: "Home", action: () => router.push("/") },
    { name: "About", section: "about" },
    { name: "Service", section: "service" },
    { name: "Explore", section: "explore" },
    { name: "Contact", section: "contact" },
  ];

  const secondaryNavItems = [
    { name: "News", path: "/blogs" },
    { name: "Review", path: "/review" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact us", path: "/contactus"}
  ];

  // Function to handle navigation item clicks
  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.section) {
      if (pathname === "/") {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/#${item.section}`);
      }
    } else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-pink-600/90 backdrop-blur-sm'
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="/" 
                className="flex items-center space-x-2 group"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="/assets/logo.png" 
                    alt="Logo" 
                    className="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {mainNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-pink-600 hover:bg-pink-50' 
                      : 'text-white hover:text-pink-100 hover:bg-white/20'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
              ))}
              
              {/* Divider */}
              <div className={`h-6 w-px mx-4 ${isScrolled ? 'bg-gray-300' : 'bg-white/40'}`}></div>
              
              {secondaryNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-pink-600 hover:bg-pink-50' 
                      : 'text-white hover:text-pink-100 hover:bg-white/20'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
              ))}
            </div>

            {/* CTA Button & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* CTA Button */}
              <button 
                onClick={() => router.push("/reservation")}
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Now
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 relative z-[10000] ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 relative z-[9998] ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100`}>
          <div className="px-4 py-2 space-y-1">
            {/* Main Navigation Items */}
            <div className="space-y-1">
              {mainNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleNavClick(item);
                    closeMenu();
                  }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Secondary Navigation Items */}
            <div className="space-y-1">
              {secondaryNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleNavClick(item);
                    closeMenu();
                  }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Contact Us Link */}
            <button
              onClick={() => {
                router.push("/contactus");
                closeMenu();
              }}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
            >
              Contact Us
            </button>

            {/* Mobile CTA Button */}
            <div className="pt-4 pb-2">
              <button 
                onClick={() => {
                  router.push("/reservation");
                  closeMenu();
                }}
                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997] lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;