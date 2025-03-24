import { useState, useRef, useEffect } from 'react';
import { Menu, Phone, Mail, MapPin, Instagram, X, ArrowRight } from 'lucide-react';

// Project data
const projects = [
  {
    id: 1,
    title: "Azure Heights Tower",
    image: "https://unsplash.com/photos/a-tall-building-with-balconies-and-balconies-on-the-balconies-rEgt1jzRHeU",
    location: "New York",
    description: "A 50-story luxury residential tower featuring sustainable design elements and panoramic city views. The building incorporates smart home technology and vertical gardens throughout its facade."
  },
  {
    id: 2,
    title: "Eco Garden Complex",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
    location: "Singapore",
    description: "An innovative mixed-use development that seamlessly blends nature with architecture. Features include rainwater harvesting systems and solar-powered common areas."
  },
  {
    id: 3,
    title: "Crystal Plaza",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920",
    location: "Dubai",
    description: "A modern commercial complex with a distinctive crystalline facade that adapts to desert climate. The building maximizes natural light while minimizing heat gain."
  },
  {
    id: 4,
    title: "Urban Oasis",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1920",
    location: "London",
    description: "A revolutionary urban development combining residential spaces with public parks. The project emphasizes community living and environmental sustainability."
  },
  {
    id: 5,
    title: "Harmony Residences",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1920",
    location: "Tokyo",
    description: "A minimalist residential complex that pays homage to traditional Japanese architecture while incorporating modern amenities and earthquake-resistant design."
  }
];

function App() {
  const [activeProject, setActiveProject] = useState(0);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && window.innerWidth > 768) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        cursorRef.current.style.transform = `translate(${e.clientX - 25}px, ${e.clientY - 25}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Custom Cursor - Hidden on Mobile */}
      <div 
        ref={cursorRef}
        className="fixed w-12 h-12 bg-white rounded-full mix-blend-difference pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-8 py-6 flex justify-between items-center text-white bg-transparent animate-wavy-bounce">
        <h1 className="text-2xl font-bold tracking-wide">HaloArchitect</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
        <a
          href="../home/src/main.tsx"
          className="relative group transition-colors duration-300"
        >
          <span className="hover:text-gray-300 transition-colors">Home</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a
          href="#"
          className="relative group transition-colors duration-300"
        >
          <span className="hover:text-gray-300 transition-colors">Projects</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a
          href="#services"
          className="relative group transition-colors duration-300"
        >
          <span className="hover:text-gray-300 transition-colors">Services</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a
          href="#team"
          className="relative group transition-colors duration-300"
        >
          <span className="hover:text-gray-300 transition-colors">Team</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a
          href="#contact"
          className="relative group transition-colors duration-300"
        >
          <span className="hover:text-gray-300 transition-colors">Contact</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>

        </div>

        {/* Mobile Menu Button */}
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
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${projects[activeProject].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Project List */}
      <div className="absolute left-0 top-0 h-full w-full md:w-1/3 flex items-center">
        <div className="pl-4 md:pl-8 space-y-4 md:space-y-8 mt-20 md:mt-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`cursor-pointer transition-all duration-300 ${
                index === activeProject ? 'translate-x-2 md:translate-x-4' : ''
              }`}
              onMouseEnter={() => setActiveProject(index)}
              onClick={() => setActiveProject(index)}
            >
              <h2 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${
                index === activeProject ? 'text-white' : 'text-gray-500'
              }`}>
                {project.title}
              </h2>
              <p className={`text-xs md:text-sm transition-colors duration-300 ${
                index === activeProject ? 'text-white' : 'text-gray-600'
              }`}>
                {project.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="hidden md:block absolute right-8 top-1/2 transform -translate-y-1/2 max-w-md text-white z-10">
        <h3 className="text-3xl font-bold mb-4">{projects[activeProject].title}</h3>
        <p className="text-gray-300 mb-6">{projects[activeProject].description}</p>
        <a 
          href="#" 
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
        >
          Explore Project <ArrowRight size={20} />
        </a>
      </div>

      {/* Contact Info */}
      <div className="hidden md:block absolute right-8 bottom-8 text-white">
        <div className="flex space-x-4 text-sm">
          <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2">
            <Phone size={16} /> +1 234 567 890
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2">
            <Mail size={16} /> contact@haloarchitect.com
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2">
            <MapPin size={16} /> New York, USA
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2">
            <Instagram size={16} /> @haloarchitect
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
