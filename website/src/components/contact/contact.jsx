import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Send,
  Star
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { colors, generateGradient, getRandomPaintSplash } from '../utils/colors';
import { useNavigate } from 'react-router-dom';

// Custom Leaflet marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: '/api/placeholder/32/32',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check for mobile screen size
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Dynamic background color generation
  useEffect(() => {
    const colors = Array(5).fill(0).map(() => getRandomPaintSplash(0.1));
    setBackgroundColors(colors);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    toast.success('Thank you! We will contact you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  // Company location coordinates
  const companyLocation = [40.7128, -74.0060]; // New York City coordinates as an example

  return (
    <div 
      className="min-h-screen relative overflow-hidden py-16"
      style={{
        background: `linear-gradient(
          135deg, 
          ${colors.background.start}80, 
          ${colors.background.end}80
        )`
      }}
    >
      {/* Dynamic Background Paint Splashes - Mobile Optimized */}
      {backgroundColors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-xl opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${isMobile ? Math.random() * 150 + 50 : Math.random() * 300 + 100}px`,
            height: `${isMobile ? Math.random() * 150 + 50 : Math.random() * 300 + 100}px`,
            backgroundColor: color,
            zIndex: 1
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10 py-46">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Contact Langton's Touch
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Have a question or ready to transform your space? Reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form - Mobile-First Layout */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">Select a Service</option>
                  <option value="interior">Interior Painting</option>
                  <option value="exterior">Exterior Painting</option>
                  <option value="decorative">Decorative Finishes</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-2 md:p-3 border rounded min-h-[100px] md:min-h-[150px] text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <Button 
                type="submit" 
                className="w-full text-sm md:text-base"
                variant="default"
              >
                <Send className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information and Map - Mobile-First Layout */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Contact Details - Stacked on Mobile */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
                Contact Details
              </h2>
              <div className="space-y-3 md:space-y-4">
                {[
                  { 
                    icon: MapPin, 
                    text: '23 Bishop Gaul Ave, Harare',
                    label: 'Address'
                  },
                  { 
                    icon: Phone, 
                    text: "077 400 4714",
                    label: 'Phone'
                  },
                  { 
                    icon: Mail, 
                    text: 'contact@langtonstouch.com',
                    label: 'Email'
                  },
                  { 
                    icon: Clock, 
                    text: 'Mon-Fri: 8am - 6pm, Sat: 9am - 2pm',
                    label: 'Hours'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 bg-gray-100 p-2 md:p-3 rounded-lg"
                  >
                    <item.icon 
                      color={colors.primary.start} 
                      size={20} 
                      className="flex-shrink-0" 
                    />
                    <div>
                      <p className="font-semibold text-xs md:text-sm text-gray-600">
                        {item.label}
                      </p>
                      <p className="text-xs md:text-base text-gray-800">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map - Responsive */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
              <MapContainer
                center={companyLocation}
                zoom={isMobile ? 12 : 13}
                scrollWheelZoom={false}
                style={{ 
                  height: isMobile ? '250px' : '400px', 
                  width: '100%' 
                }}
                className="z-10"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker 
                  position={companyLocation} 
                  icon={customMarkerIcon}
                >
                  <Popup>
                    Langton's Touch<br />
                    Painting Services HQ
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section - Mobile Optimized */}
      <section 
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ 
          background: generateGradient(colors.primary, '135deg', 0.9) 
        }}
      >
        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">
              Transform Your Space Today
            </h2>
            <p className="text-sm md:text-xl mb-6 md:mb-8 text-white/90 px-2">
              Our team is ready to bring your vision to life.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/contact")}
              variant="outline"
              className="text-sm md:text-base text-secondary-foreground border-white hover:bg-white hover:text-secondary-foreground"
            >
              <Star className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Book Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;