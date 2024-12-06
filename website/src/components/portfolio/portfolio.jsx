import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Home, 
  PaintRoller, 
  Star 
} from 'lucide-react';
import { Button } from '../ui/button';
import { colors, generateGradient, getRandomPaintSplash } from '../utils/colors';
import { useNavigate } from 'react-router-dom';

const portfolioCategories = [
  { 
    id: 'all', 
    name: 'All Projects', 
    icon: <Palette size={24} /> 
  },
  { 
    id: 'residential', 
    name: 'Residential', 
    icon: <Home size={24} /> 
  },
  { 
    id: 'interior', 
    name: 'Interior', 
    icon: <PaintRoller size={24} /> 
  }
];

const portfolioProjects = [
  { 
    id: 1, 
    title: 'Modern Living Room', 
    category: ['all', 'residential', 'interior'], 
    image: 'painting.webp',
    description: 'A contemporary living space with clean lines and natural light.'
  },
  { 
    id: 2, 
    title: 'Classic Bedroom Makeover', 
    category: ['all', 'residential', 'interior'], 
    image: '/2.jpg',
    description: 'Elegant bedroom transformation with timeless design elements.'
  },
  { 
    id: 3, 
    title: 'Minimalist Home Exterior', 
    category: ['all', 'residential'], 
    image: '/3.jpeg',
    description: 'Sleek exterior design emphasizing simplicity and modern aesthetics.'
  },
  { 
    id: 4, 
    title: 'Artistic Accent Wall', 
    category: ['all', 'interior'], 
    image: '/6.jpg',
    description: 'Creative wall design that serves as a focal point of the room.'
  },
  { 
    id: 5, 
    title: 'Suburban Home Refresh', 
    category: ['all', 'residential'], 
    image: '/6.webp',
    description: 'Complete home renovation bringing new life to a suburban residence.'
  },
  { 
    id: 6, 
    title: 'Industrial Loft Style', 
    category: ['all', 'interior'], 
    image: '/7.webp',
    description: 'Bold interior design capturing the essence of urban industrial aesthetics.'
  }
];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  // Dynamic background color generation
  useEffect(() => {
    const colors = Array(5).fill(0).map(() => getRandomPaintSplash(0.1));
    setBackgroundColors(colors);
  }, []);

  const filteredProjects = portfolioProjects.filter(project => 
    project.category.includes(activeCategory)
  );

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Portfolio of Transformations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of design and painting projects that showcase 
            our commitment to quality, creativity, and client satisfaction.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-8">
          {portfolioCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center space-x-2 mb-2"
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No projects found in this category.
          </div>
        )}

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mr-6"
                  />
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                    <div className="flex items-center">
                      <Star size={20} color={colors.accent.start} className="mr-2" />
                      <span>View Full Project Details</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's discuss how we can transform your space with our expert painting services.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/contact")}
              className="text-secondary-foreground border-white hover:bg-white hover:text-secondary-foreground"
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;