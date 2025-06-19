import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Services from '../components/Services';
import Banner from '../components/Banner';
import Explore from '../components/Explore';
import Footer from '../components/Footer';
import "./globals.css"

const App = () => {
  return (
    <div className="font-['Poppins'] scroll-smooth">
      <Header />
      <About />
      <Rooms />
      <Services />
      <Banner />
      <Explore />
      <Footer />
    </div>
  );
};

export default App;