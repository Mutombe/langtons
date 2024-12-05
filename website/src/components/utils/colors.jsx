// src/utils/colors.js
export const colors = {
    // Core Brand Colors
    primary: {
      start: '#2E3192',     // Royal Blue
      end: '#1BFFFF',       // Electric Cyan
    },
    secondary: {
      start: '#FF416C',     // Vibrant Pink
      end: '#FF4B2B',       // Coral Orange
    },
    accent: {
      start: '#4776E6',     // Electric Blue
      end: '#8E54E9',       // Royal Purple
    },
    background: {
      start: '#FFFFFF',     // Pure White
      end: '#F8F9FA',       // Soft Gray
    },
    text: {
      primary: '#2C3E50',   // Deep Navy
      secondary: '#34495E'   // Slate Gray
    },
    // Paint Palette
    paintSplash: [
      '#FF6B6B',            // Coral Red
      '#4ECDC4',            // Turquoise
      '#45B7D1',            // Ocean Blue
      '#96E6A1',            // Fresh Green
      '#D4A5A5',            // Dusty Rose
      '#FFE66D'             // Sunshine Yellow
    ]
  };
  
  // Enhanced gradient generator with opacity support
  export const generateGradient = (colorObj, angle = '145deg', opacity = 1) => 
    `linear-gradient(${angle}, ${colorObj.start}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, 
     ${colorObj.end}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`;
  
  // Paint splash effect generator
  export const generatePaintSplash = (color, size = '100px', opacity = 0.7) => ({
    background: color,
    width: size,
    height: size,
    opacity: opacity,
    borderRadius: '50%',
    filter: 'blur(10px)',
    transform: 'rotate(random(360deg))'
  });
  
  // Random paint splash color with optional opacity
  export const getRandomPaintSplash = (opacity = 1) => {
    const color = colors.paintSplash[Math.floor(Math.random() * colors.paintSplash.length)];
    return opacity === 1 ? color : `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };
  
  // Generate complementary paint colors
  export const getComplementaryColors = (baseColor) => {
    // Implementation of color theory to generate complementary colors
    // This is a simplified version - you might want to use a color library for more accurate results
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return {
      complement: `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`,
      lighter: `#${Math.min(255, r + 50).toString(16).padStart(2, '0')}${Math.min(255, g + 50).toString(16).padStart(2, '0')}${Math.min(255, b + 50).toString(16).padStart(2, '0')}`,
      darker: `#${Math.max(0, r - 50).toString(16).padStart(2, '0')}${Math.max(0, g - 50).toString(16).padStart(2, '0')}${Math.max(0, b - 50).toString(16).padStart(2, '0')}`
    };
  };