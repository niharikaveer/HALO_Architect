import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [showControls, setShowControls] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const text = "HALO ARCHITECT";

  const videos = [
    "https://cdn.pixabay.com/video/2022/09/15/131375-750216820_large.mp4",
    "https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4",
    "https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=175&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/371577441.hd.mp4?s=53afd18117ce7eaf5b5562c8c0500e8dde853661&profile_id=175&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/403274453.hd.mp4?s=99b7d410e2e752c7f45054260ae7f8aca7b4fa3f&profile_id=175&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/384761655.hd.mp4?s=0df2c3e4b19f9f522dccdb7044d131c69b60b47f&profile_id=175&oauth2_token_id=57447761"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, (text.length * 150) + 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleMouseEnter = () => setCursorVariant('hover');
  const handleMouseLeave = () => setCursorVariant('default');

  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "2px solid white",
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16
    },
    hover: {
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      x: cursorPosition.x - 32,
      y: cursorPosition.y - 32
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-8 py-6 flex justify-between items-center text-white bg-transparent animate-wavy-bounce">
        <h1 className="text-2xl font-bold tracking-wide">HaloArchitect</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['Projects', 'About', 'Services', 'Team', 'Contact'].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="relative group transition-colors duration-300"
            >
              <span className="hover:text-gray-300 transition-colors">{item}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-30 transition-transform duration-500 ease-in-out transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-white text-2xl animate-fade-in">
          {['Projects', 'About', 'Services', 'Team', 'Contact'].map((item, idx) => (
            <a 
              key={idx}
              href="#" 
              className="hover:text-gray-300 transition-all duration-300 transform hover:scale-105"
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setIsMenuOpen(false)} // Closes menu on click
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Background & Videos */}
      <div className="absolute inset-0 z-0 bg-black" />
      {showContent && (
        <div className="absolute inset-0 z-0">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentVideoIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
            </div>
          ))}
        </div>
      )}

      {/* Video Controls */}
      {showContent && (
        <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={prevVideo}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/30 hover:text-white/80 p-2 rounded-full bg-black/10 hover:bg-black/30 transition-all duration-300 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextVideo}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/30 hover:text-white/80 p-2 rounded-full bg-black/10 hover:bg-black/30 transition-all duration-300 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Animated text */}
        <div 
          className={`flex-1 flex items-center 
            ${showContent 
              ? 'justify-start pl-4 sm:pl-6 md:pl-12 lg:pl-20' 
              : 'justify-center'
            } 
            transition-all duration-1000`}
        >
          <div className="flex flex-wrap max-w-full">
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-wider"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Description (only on desktop) */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block absolute bottom-[170px] left-24 transform -translate-y-1 max-w-md"
          >
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Revolutionizing architectural design through cutting-edge AI technology. 
              We blend creativity with artificial intelligence to create spaces that 
              inspire, innovate, and transform the way we live and work.
            </p>
          </motion.div>
        )}

        {/* Video carousel indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 z-20 px-4">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentVideoIndex === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
