// src/App.jsx
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/nav/nav';
//import Footer from './components/Footer';
import { HomePage } from './components/home/home';
import { Footer } from './components/footer/footer';
import ServicesPage from './components/service/service';
import PortfolioPage from './components/portfolio/portfolio';
import ContactPage from './components/contact/contact';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <ScrollToTop />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;