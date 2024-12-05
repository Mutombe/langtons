import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PaintRoller, Home, Brush, 
  CheckCircle, Clock, Shield, 
  Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colors, generateGradient, getRandomPaintSplash } from '../utils/colors';

const serviceDetails = [
  {
    id: 'interior',
    icon: PaintRoller,
    color: colors.primary,
    title: 'Interior Painting',
    shortDescription: 'Transform living spaces with expert techniques',
    description: 'Our interior painting service goes beyond simple color application. We provide a comprehensive transformation of your living spaces, focusing on quality, precision, and aesthetic excellence.',
    details: [
      'Professional color consultation',
      'Comprehensive surface preparation',
      'Premium paint application',
      'Minimal disruption to your lifestyle'
    ],
    benefits: [
      { icon: CheckCircle, text: 'Guaranteed quality finish', color: colors.accent.start },
      { icon: Clock, text: 'Efficient and timely service', color: colors.accent.start },
      { icon: Shield, text: 'Long-lasting protection', color: colors.accent.start }
    ],
    estimatedTime: '3-5 days',
    complexity: 'Moderate',
    backgroundImage: "/painting.webp"
  },
  {
    id: 'exterior',
    icon: Home,
    color: colors.secondary,
    title: 'Exterior Painting',
    shortDescription: 'Protect and beautify your home\'s exterior',
    description: 'Our exterior painting solutions provide comprehensive protection and aesthetic enhancement, using advanced techniques and weather-resistant materials.',
    details: [
      'Thorough surface preparation',
      'Weather-resistant paint selection',
      'Comprehensive home protection',
      'Enhanced curb appeal'
    ],
    benefits: [
      { icon: CheckCircle, text: 'UV and weather protection', color: colors.accent.start },
      { icon: Clock, text: 'Quick and efficient process', color: colors.accent.start },
      { icon: Shield, text: 'Increased property value', color: colors.accent.start }
    ],
    estimatedTime: '5-7 days',
    complexity: 'High',
    backgroundImage: "/p8.jpg"
  },
  {
    id: 'decorative',
    icon: Brush,
    color: colors.accent,
    title: 'Decorative Finishes',
    shortDescription: 'Add unique textures and artistic touches',
    description: 'Our decorative finishes service brings your walls to life with innovative techniques, custom designs, and artistic transformations.',
    details: [
      'Advanced textured wall designs',
      'Specialty painting techniques',
      'Precision color matching',
      'Artistic wall transformations'
    ],
    benefits: [
      { icon: CheckCircle, text: 'Unique design solutions', color: colors.accent.start },
      { icon: Clock, text: 'Creative consultation', color: colors.accent.start },
      { icon: Shield, text: 'Personalized aesthetic', color: colors.accent.start }
    ],
    estimatedTime: '2-4 days',
    complexity: 'Advanced',
    backgroundImage: "/painting.webp"
  }
];

const ServiceProcessSteps = ({ service }) => {
  const processSteps = [
    { title: 'Consultation', description: 'Discuss your vision and requirements' },
    { title: 'Preparation', description: 'Protect and prime surfaces' },
    { title: 'Priming', description: 'Apply professional-grade primer' },
    { title: 'Painting', description: 'Expert color application' },
    { title: 'Finishing', description: 'Final touches and cleanup' }
  ];

  return (
    <div className="py-16 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg ">
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our {service.title} Process
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.2,
              type: 'spring',
              stiffness: 200
            }}
            className="flex flex-col items-center text-center"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-bold"
              style={{ 
                background: generateGradient(colors.accent, '45deg', 0.8),
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}
            >
              {index + 1}
            </div>
            <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(serviceDetails[0]);
  const [backgroundColors, setBackgroundColors] = useState([]);

  // Dynamic background color generation
  useEffect(() => {
    const colors = Array(5).fill(0).map(() => getRandomPaintSplash(0.1));
    setBackgroundColors(colors);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden py-10"
      style={{
        background: `linear-gradient(
          135deg, 
          ${colors.background.start}80, 
          ${colors.background.end}80
        )`
      }}
    >
      {/* Dynamic Background Paint Splashes */}
      {backgroundColors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Selection Sidebar */}
          <div className="space-y-4">
            {serviceDetails.map((service) => (
              <motion.div
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`
                  cursor-pointer p-4 rounded-lg transition-all 
                  ${activeService.id === service.id 
                    ? 'bg-white shadow-lg scale-105' 
                    : 'hover:bg-white/50'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center">
                  <service.icon 
                    color={service.color.start} 
                    size={40} 
                    className="mr-4" 
                  />
                  <div>
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.shortDescription}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Service Details */}
          <div className="md:col-span-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Blended Background Image */}
                <div 
                  className="absolute inset-0 z-0 rounded-xl overflow-hidden"
                  style={{ 
                    backgroundImage: `url(${activeService.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 20,
                    filter: 'grayscale(50%)'
                  }}
                />

                <div 
                  className="relative z-10 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <activeService.icon 
                      color={activeService.color.start} 
                      size={64} 
                      className="mr-6" 
                    />
                    <div>
                      <h2 className="text-4xl font-bold">{activeService.title}</h2>
                      <p className="text-gray-600">{activeService.shortDescription}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{activeService.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">Key Details</h4>
                      <ul className="space-y-2">
                        {activeService.details.map((detail, index) => (
                          <li 
                            key={index} 
                            className="flex items-center"
                          >
                            <Star 
                              size={16} 
                              color={activeService.color.start} 
                              className="mr-2" 
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Benefits</h4>
                      {activeService.benefits.map((benefit, index) => (
                        <div 
                          key={index} 
                          className="flex items-center mb-2"
                        >
                          <benefit.icon 
                            size={20} 
                            color={benefit.color} 
                            className="mr-2" 
                          />
                          {benefit.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="font-semibold">Estimated Time</p>
                      <p>{activeService.estimatedTime}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="font-semibold">Complexity</p>
                      <p>{activeService.complexity}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Process Steps Component */}
        <div className="mt-12">
          <ServiceProcessSteps service={activeService} />
        </div>
      </div>

      {/* CTA Section */}
      <section 
        className="py-16 relative overflow-hidden"
        style={{ 
          background: generateGradient(colors.primary, '135deg', 0.9) 
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Transform Your Space Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Ready to bring your vision to life? Book a free consultation now!
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="text-secondary-foreground border-white hover:bg-white hover:text-secondary-foreground"
            >
              Schedule Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;