import React, { useEffect, useState } from "react";
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
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/services" className="block hover:text-gray-300">
                Services
              </Link>
              <Link to="/portfolio" className="block hover:text-gray-300">
                Portfolio
              </Link>
              <Link to="/about" className="block hover:text-gray-300">
                About Us
              </Link>
              <Link to="/contact" className="block hover:text-gray-300">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact Info</h4>
            <p className="text-sm">
              <strong>Phone </strong> 077 400 4714
              <br />
              <strong>Email </strong> magic@langtontouch.com
              <br />
              <strong>Address </strong> 23 Bishop Gaul Ave, Harare
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-blue-400">
                Facebook
              </Link>
              <Link to="#" className="hover:text-pink-400">
                Instagram
              </Link>
              <Link to="#" className="hover:text-blue-500">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p className="text-sm">
            © {new Date().getFullYear()} Langton's Touch. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
