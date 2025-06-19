"use client"
import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({...prev, [entry.target.id]: true}));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (ref) => {
    sectionRefs.current[id] = ref;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 roboto-en">
       <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md shadow-md">
         <Navbar/>
       </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div 
          id="hero"
          ref={setRef('hero')}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
              ABOUT OUR COMPANY
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Crafting Dream
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Vacations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where extraordinary journeys begin and unforgettable memories are made
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <div 
              id="image-section"
              ref={setRef('image-section')}
              className={`transition-all duration-1000 delay-200 ${
                isVisible['image-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src="/assets/about.jpg"
                    alt="Beautiful vacation destination"
                    className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full opacity-70 animate-bounce"></div>
              </div>
            </div>

            {/* Content Section */}
            <div 
              id="content-section"
              ref={setRef('content-section')}
              className={`transition-all duration-1000 delay-400 ${
                isVisible['content-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="space-y-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
                    OUR STORY
                  </span>
                  <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    The Best Holidays Start Here!
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  With a passion for creating extraordinary travel experiences, we've dedicated ourselves to 
                  transforming the way people discover and book their dream vacations. Our journey began with 
                  a simple belief: every traveler deserves exceptional service and unforgettable memories.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  From hand-picked accommodations to personalized itineraries, we focus on quality, 
                  authenticity, and seamless experiences that exceed expectations at every turn.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-2">
                      Discover More
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                    Our Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="stats"
            ref={setRef('stats')}
            className={`transition-all duration-1000 delay-200 ${
              isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {[
                { number: '10K+', label: 'Happy Travelers' },
                { number: '50+', label: 'Destinations' },
                { number: '95%', label: 'Satisfaction Rate' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-bold">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="values-header"
            ref={setRef('values-header')}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['values-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold rounded-full mb-6">
              OUR VALUES
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence drives everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Personalized Experiences',
                description: 'Every journey is tailored to your unique preferences and dreams, ensuring a truly personal adventure.'
              },
              {
                icon: '✨',
                title: 'Quality Assurance',
                description: 'We handpick every accommodation and experience to guarantee the highest standards of excellence.'
              },
              {
                icon: '🤝',
                title: 'Trusted Partnership',
                description: 'Building lasting relationships through transparency, reliability, and exceptional customer service.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                id={`value-${index}`}
                ref={setRef(`value-${index}`)}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="cta"
            ref={setRef('cta')}
            className={`transition-all duration-1000 ${
              isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us help you create memories that will last a lifetime
            </p>
            <button className="group px-10 py-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                Start Planning
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;