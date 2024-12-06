import React from "react";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Github,
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Dribbble,
  MessageCircle,
  Send
} from "lucide-react";
import { colors, generateGradient } from "../utils/colors";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="relative overflow-hidden">
      <footer
        className="bg-gray-900 text-white py-12"
        style={{
          background: generateGradient(
            {
              start: colors.primary.start,
              end: colors.primary.end,
            },
            "135deg"
          ),
        }}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Langton's Touch</h3>
            <p className="text-sm text-gray-300">
              Transforming spaces with artistic precision and magical
              creativity.
            </p>
            <div className="mt-4 flex space-x-3">
              <Heart size={20} className="text-red-400" />
              <p className="text-sm">Crafting design magic since 2010</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/services" className="flex items-center space-x-2 hover:text-gray-300">
                <Clock size={16} />
                <span>Services</span>
              </Link>
              <Link to="/portfolio" className="flex items-center space-x-2 hover:text-gray-300">
                <Dribbble size={16} />
                <span>Portfolio</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-2 hover:text-gray-300">
                <MessageCircle size={16} />
                <span>About Us</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-2 hover:text-gray-300">
                <Send size={16} />
                <span>Contact</span>
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-green-400" />
                <a href="tel:+277400471" className="hover:text-green-300">
                  077 400 4714
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:magic@langtontouch.com" className="hover:text-blue-300">
                  magic@langtontouch.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-red-400" />
                <span>23 Bishop Gaul Ave, Harare</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4 items-center">
              <Link 
                to="https://facebook.com/langtontouch" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link 
                to="https://instagram.com/langtontouch" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-pink-400 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link 
                to="https://linkedin.com/company/langtontouch" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                <Linkedin size={24} />
              </Link>
              <Link 
                to="https://twitter.com/langtontouch" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-cyan-400 transition-colors"
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p className="text-sm flex items-center justify-center space-x-2">
            <span>© {new Date().getFullYear()} Langton's Touch.</span>
            <span>All Rights Reserved.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};