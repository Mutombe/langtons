import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Brush, Menu, X } from "lucide-react";
import {
  colors,
  generateGradient,
  getRandomPaintSplash,
} from "../utils/colors";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  const menuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      style={{
        background: generateGradient(colors.primary, "135deg"),
        color: "white",
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Brush color="white" size={32} />
          <Link to="/" className="text-2xl font-bold text-white">
            Langton's Touch
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-white transition-all ${
                isActive(link.path) 
                  ? 'font-bold border-2 border-white rounded-md px-1 scale-105' 
                  : 'hover:text-opacity-80'
              }`}
              style={{
                textShadow: `0 0 10px ${getRandomPaintSplash()}`,
                position: "relative",
                transformOrigin: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-gradient-to-b from-blue-600 to-blue-800 md:hidden"
              style={{
                zIndex: 100,
                top: "64px",
                background: generateGradient(
                  {
                    start: colors.primary.start,
                    end: colors.primary.end,
                  },
                  "135deg"
                ),
              }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-3xl text-white transition-all ${
                        isActive(link.path) 
                          ? 'font-bold border-2 border-white  rounded-md px-1 scale-110' 
                          : 'hover:text-opacity-80'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;