import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  colors,
  generateGradient,
  getRandomPaintSplash,
} from "../utils/colors";
import { Link } from "react-router-dom";
import {
  Brush,
  PaintRoller,
  Star,
  Award,
  CheckCircle,
  Target,
  Layers,
    Sparkles,
    PaintBucket, Palette, Quote, MapPin
} from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [backgroundParticles, setBackgroundParticles] = useState([]);

  // Responsive and particle background setup
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);

    // Generate dynamic background particles
    const particleCount = isMobile ? 15 : 30;
    const newParticles = Array.from({ length: particleCount }, (_, index) => ({
      id: index,
      size: Math.random() * (isMobile ? 40 : 80) + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      color: colors.primary.start,
      delay: Math.random() * 2
    }));

    setBackgroundParticles(newParticles);

    return () => window.removeEventListener('resize', checkMobileView);
  }, [isMobile]);

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1], 
              opacity: [0, particle.opacity, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 5,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        ))}
      </div>

      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 blur-sm"
        style={{
          backgroundImage: `url('/p8.jpg')`,
            backgroundBlendMode: 'multiply',
          backdropFilter: 'blur(10px)'
        }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: generateGradient(colors.background, '135deg', 0.7)
        }}
      />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent tracking-tight"
            style={{ 
              backgroundImage: generateGradient(colors.primary),
              WebkitBackgroundClip: 'text'
            }}
          >
            Transforming Spaces Through Color
          </h1>
          <p className="text-base md:text-xl mb-8 text-gray-800 max-w-2xl mx-auto">
            Professional painting services that bring your vision to life with precision and creativity
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="w-full md:w-auto group"
              style={{ 
                background: generateGradient(colors.secondary),
                backgroundSize: '200% auto'
              }}
              variant="default"
            >
              <PaintBucket className="mr-2 group-hover:rotate-12 transition-transform" />
              Get a Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto group"
            >
              <Palette className="mr-2 group-hover:scale-110 transition-transform" />
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};



const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      quote: "The team's incredible attention to detail completely transformed our home. From the initial consultation to the final reveal, they listened carefully to our vision and brought it to life with stunning precision. Every room now feels both personal and professionally designed.",
      location: "Waterfalls,Harare",
      profession: "House",
      image: "/user2.png.crdownload"
    },
    {
      name: "Michael Rodriguez",
      quote: "As a busy professional, I was impressed by their punctuality and professionalism. They not only completed the project on time but also delivered work that was truly breathtaking. The creative solutions they proposed solved design challenges I didn't even realize existed.",
      location: "Belverdere, Harare",
      profession: "School",
      image: "/user2.png.crdownload"
    },
    {
      name: "Emily Chen",
      quote: "Their creative approach went far beyond my expectations. They didn't just redesign my space; they reimagined how I could live in it. The thoughtful use of color, texture, and space has completely changed my relationship with my home environment.",
      location: "Gweru, Zimbabwe",
      profession: "Offices",
      image: "/user2.png.crdownload"
    }
  ];

  return (
    <section className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex"
            >
              <Card className="h-full hover:shadow-lg transition-all w-full">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <Quote className="text-gray-300 mb-4" size={40} />
                    <p className=" mb-4 text-lg"><small>"{testimonial.quote}"</small></p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin size={14} className="mr-1 inline" />
                        {testimonial.location}
                      </p>
                      <p className="text-xs text-gray-500">{testimonial.profession}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Placeholder logos (replace with actual logos)
const paintCompanyLogos = [
  { name: "Sherwin-Williams", src: "/api/placeholder/150/100?text=SW" },
  { name: "Benjamin Moore", src: "/api/placeholder/150/100?text=BM" },
  { name: "Behr", src: "/api/placeholder/150/100?text=BEHR" },
  { name: "Valspar", src: "/api/placeholder/150/100?text=VLS" },
  { name: "PPG", src: "/api/placeholder/150/100?text=PPG" },
  { name: "Dunn-Edwards", src: "/api/placeholder/150/100?text=DE" }
];

const PaintingProcess = () => {
  // Utility function to generate gradient (assuming it's defined elsewhere)
  const generateGradient = (color, angle = "45deg", opacity = 1) => {
    return `linear-gradient(${angle}, ${color}80, ${color}50)`;
  };

  const paintingSteps = [
    {
      icon: <Target size={32} />,
      title: "Consultation",
      description: "Understanding your vision and requirements",
      backgroundImage: "/p1.webp"
    },
    {
      icon: <Layers size={32} />,
      title: "Planning",
      description: "Detailed project mapping and color selection",
      backgroundImage: "/p2.jpg"
    },
    {
      icon: <Brush size={32} />,
      title: "Preparation",
      description: "Surface preparation and priming",
      backgroundImage: "/p3.webp"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Execution",
      description: "Precise and professional painting",
      backgroundImage: "/p4.jpg"
    }
  ];

  const services = [
    {
      icon: <Brush size={32} />,
      title: "Interior Painting",
      description: "Transform your indoor spaces with premium finishes",
      backgroundImage: "/p5.jpg"
    },
    {
      icon: <PaintRoller size={32} />,
      title: "Exterior Painting",
      description: "Protect and beautify your property's exterior",
      backgroundImage: "/p6.jpg"
    },
    {
      icon: <Palette size={32} />,
      title: "Custom Finishes",
      description: "Unique textures and decorative painting solutions",
      backgroundImage: "/p7.jpg"
    }
  ];

  return (
    <>
      {/* Painting Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Painting Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {paintingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-white rounded-lg shadow-md overflow-hidden relative"
              >
                {/* Blended Background Image */}
                <div 
                  className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${step.backgroundImage})`,
                    backgroundBlendMode: 'multiply'
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full"
                    style={{
                      background: generateGradient("#007bff", "45deg", 0.8)
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Professional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-all overflow-hidden">
                  {/* Blended Background Image */}
                  <div 
                    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${service.backgroundImage})`,
                      backgroundBlendMode: 'multiply'
                    }}
                  />
                  <CardHeader className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: generateGradient("#007bff") }}
                    >
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Paint Company Logos Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Trusted Paint Partners
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-center">
            {paintCompanyLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="max-h-20 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PaintingProcess;


export const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax effect for paint stripes
  const stripeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Paint stripe backgrounds
  const paintStripes = [
    { color: colors.paintSplash[0], height: "15vh" },
    { color: colors.paintSplash[1], height: "20vh" },
    { color: colors.paintSplash[2], height: "25vh" },
    { color: colors.paintSplash[3], height: "15vh" },
    { color: colors.paintSplash[4], height: "25vh" },
  ];

  const PaintTextureOverlay = () => {
    const [splashes, setSplashes] = useState([]);

    useEffect(() => {
      const generateSplashes = () => {
        const splashCount = 10;
        const newSplashes = Array.from({ length: splashCount }, () => ({
          color: getRandomPaintSplash(0.2),
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 200 + 50}px`,
          rotation: `${Math.random() * 360}deg`,
        }));
        setSplashes(newSplashes);
      };

      generateSplashes();
    }, []);

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {splashes.map((splash, index) => (
          <div
            key={index}
            className="absolute opacity-20 blur-md"
            style={{
              left: splash.left,
              top: splash.top,
              width: splash.size,
              height: splash.size,
              backgroundColor: splash.color,
              transform: `rotate(${splash.rotation})`,
              borderRadius: "50%",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Paint Stripes Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div style={{ y: stripeY }}>
          {paintStripes.map((stripe, index) => (
            <div
              key={index}
              className="w-full transform -skew-y-6"
              style={{
                height: stripe.height,
                backgroundColor: stripe.color,
                opacity: 0.1,
                marginTop: `-${index * 2}vh`,
              }}
            />
          ))}
        </motion.div>
      </div>
      {/* Hero Section */}
    
          <HeroSection />
      

      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <Testimonials/>
      </section>

      {/* Our Process Section */}
    <PaintingProcess />
    </div>
  );
};
