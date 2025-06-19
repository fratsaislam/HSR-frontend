"use client"
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "@/components/Navbar"

const Services = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeService, setActiveService] = useState(0);
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

  const services = [
    {
      id: 1,
      title: "Luxury Accommodations",
      subtitle: "Premium Hotels & Resorts",
      description: "Experience the finest accommodations handpicked for their exceptional service, stunning locations, and world-class amenities. From boutique hotels to luxury resorts.",
      features: ["5-Star Properties", "Exclusive Suites", "Concierge Service", "Spa & Wellness"],
      image: "/assets/room-1.jpg",
      gradient: "from-blue-600 to-purple-600",
      icon: "🏨"
    },
    {
      id: 2,
      title: "Adventure Tours",
      subtitle: "Thrilling Experiences",
      description: "Embark on heart-pumping adventures with our carefully curated tours. From mountain climbing to deep-sea diving, create memories that last a lifetime.",
      features: ["Expert Guides", "Safety Equipment", "Small Groups", "All Skill Levels"],
      image: "/assets/room-1.jpg",
      gradient: "from-green-600 to-teal-600",
      icon: "🏔️"
    },
    {
      id: 3,
      title: "Cultural Immersion",
      subtitle: "Authentic Local Experiences",
      description: "Dive deep into local cultures with authentic experiences, traditional cuisine, and meaningful connections with local communities.",
      features: ["Local Guides", "Traditional Cuisine", "Cultural Workshops", "Community Visits"],
      image: "/assets/room-1.jpg",
      gradient: "from-orange-600 to-pink-600",
      icon: "🎭"
    },
    {
      id: 4,
      title: "Wellness Retreats",
      subtitle: "Mind, Body & Soul",
      description: "Rejuvenate your spirit with our wellness-focused retreats featuring yoga, meditation, spa treatments, and holistic healing practices.",
      features: ["Yoga Sessions", "Spa Treatments", "Meditation", "Healthy Cuisine"],
      image: "/assets/room-1.jpg",
      gradient: "from-purple-600 to-pink-600",
      icon: "🧘‍♀️"
    },
    {
      id: 5,
      title: "Family Adventures",
      subtitle: "Creating Family Memories",
      description: "Special family-focused experiences designed to create lasting bonds and unforgettable memories for all ages, from toddlers to grandparents.",
      features: ["Kid-Friendly Activities", "Family Suites", "Educational Tours", "Entertainment"],
      image: "/assets/room-1.jpg",
      gradient: "from-yellow-600 to-orange-600",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      id: 6,
      title: "Business Travel",
      subtitle: "Professional Excellence",
      description: "Streamlined business travel solutions with premium accommodations, meeting facilities, and concierge services for the modern professional.",
      features: ["Meeting Rooms", "Fast WiFi", "Airport Transfers", "24/7 Support"],
      image: "/assets/room-1.jpg",
      gradient: "from-gray-700 to-blue-600",
      icon: "💼"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We start with understanding your travel dreams, preferences, and requirements through a detailed consultation.",
      image: "/assets/room-1.jpg"
    },
    {
      step: "02",
      title: "Planning",
      description: "Our experts craft a personalized itinerary that perfectly matches your vision and budget.",
      image: "/assets/room-1.jpg"
    },
    {
      step: "03",
      title: "Booking",
      description: "We handle all reservations, confirmations, and arrangements so you can focus on the excitement.",
      image: "/assets/room-1.jpg"
    },
    {
      step: "04",
      title: "Experience",
      description: "Enjoy your perfectly planned journey with 24/7 support throughout your entire trip.",
      image: "/assets/room-1.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 roboto-en">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md shadow-md">
            <Navbar />
        </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"></div>
        
        <div 
          id="hero"
          ref={setRef('hero')}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
            isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-8 shadow-lg">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Extraordinary
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Experiences</span>
              <br />
              Await You
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              From luxury accommodations to thrilling adventures, we offer a comprehensive range of services 
              designed to make your travel dreams come true
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Explore Services
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="services-header"
            ref={setRef('services-header')}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['services-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Premium Travel Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of travel services, each designed to exceed your expectations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={`service-${index}`}
                ref={setRef(`service-${index}`)}
                className={`group relative rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${
                  isVisible[`service-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${index * 150}ms`}}
              >
                {/* Background Image */}
                <div className="relative h-[500px] lg:h-[520px] overflow-hidden rounded-3xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Stronger gradient overlay for better text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-50 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>

                {/* Content Overlay - positioned within the card bounds */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                  <div className="mb-4">
                    <span className="text-3xl lg:text-4xl mb-3 block drop-shadow-lg">{service.icon}</span>
                    <p className="text-sm lg:text-base font-semibold mb-2 text-white/95 drop-shadow-sm">{service.subtitle}</p>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 drop-shadow-lg leading-tight">{service.title}</h3>
                    <p className="text-sm lg:text-base text-white/95 leading-relaxed mb-4 drop-shadow-sm line-clamp-3">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/25 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium text-white drop-shadow-sm border border-white/20"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-3 py-1 bg-white/25 backdrop-blur-sm rounded-full text-xs lg:text-sm font-medium text-white drop-shadow-sm border border-white/20">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <button className="px-6 py-3 bg-white/25 backdrop-blur-md text-white font-semibold text-sm lg:text-base rounded-lg hover:bg-white/35 transition-all duration-300 group-hover:scale-105 border border-white/30 drop-shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="process-header"
            ref={setRef('process-header')}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['process-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold rounded-full mb-6">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Your Journey to Perfect Travel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven 4-step process ensures every detail is perfect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                id={`step-${index}`}
                ref={setRef(`step-${index}`)}
                className={`group text-center transition-all duration-1000 ${
                  isVisible[`step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                {/* Step Image */}
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-2xl group-hover:shadow-pink-500/25 transition-all duration-500">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Process Flow Line */}
          <div className="hidden lg:block relative mt-16">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 opacity-50"></div>
            <div className="flex justify-between items-center">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div 
              id="features-content"
              ref={setRef('features-content')}
              className={`transition-all duration-1000 ${
                isVisible['features-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-6">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
                Experience the Difference
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: "🎯", title: "Personalized Service", desc: "Every detail tailored to your preferences" },
                  { icon: "🏆", title: "Award-Winning Team", desc: "Industry experts with years of experience" },
                  { icon: "🌍", title: "Global Network", desc: "Trusted partners in destinations worldwide" },
                  { icon: "🛡️", title: "24/7 Support", desc: "Round-the-clock assistance wherever you are" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Images Grid */}
            <div 
              id="features-images"
              ref={setRef('features-images')}
              className={`transition-all duration-1000 delay-300 ${
                isVisible['features-images'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/assets/room-1.jpg"
                    alt="Our team"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                  <img
                    src="/assets/room-1.jpg"
                    alt="24/7 Support"
                    className="w-full h-32 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="/assets/room-1.jpg"
                    alt="Awards"
                    className="w-full h-32 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                  <img
                    src="/assets/room-1.jpg"
                    alt="Global network"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="cta"
            ref={setRef('cta')}
            className={`transition-all duration-1000 ${
              isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Begin Your Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Let our experts craft the perfect travel experience just for you. Your dream vacation is just one click away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group px-10 py-5 bg-white text-purple-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center gap-3">
                  Get Started Today
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;