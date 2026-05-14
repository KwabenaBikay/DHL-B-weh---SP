/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* * CPANEL DEPLOYMENT:
 * This application is built as a Single Page Application (SPA).
 * To deploy to cPanel:
 * 1. Run 'npm run build' to generate the 'dist' folder.
 * 2. Upload the contents of the 'dist' folder to your 'public_html' directory.
 * 3. Ensure you have a .htaccess file to handle SPA routing if you use multiple routes (not needed for this one-pager).
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  MapPin,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Truck,
  Users,
  Play,
  ArrowUp,
  ChevronDown,
  Smartphone,
  Banknote,
  Award,
  Search,
  Plane,
  Globe,
  Camera,
  MoveHorizontal,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Payment', href: '#payment' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Operating Hours', href: '#hours' },
  { label: 'Contact', href: '#contact' },
  { label: 'Staff', href: '#staff' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('sender');
  const [showToTop, setShowToTop] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');

  // State for the Accordion Gallery
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [galleryDirection, setGalleryDirection] = useState(1); // Added for ping-pong sweep

  // NEW: State for the FAQ Section
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      window.open(`https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${encodeURIComponent(trackingNumber.trim())}`, '_blank', 'noopener,noreferrer');
    }
  };

  const heroImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
    "/images/hero-5.jpg",
    "/images/hero-6.jpg",
    "/images/hero-7.jpg",
  ];

  // Now using your local images 1 through 10
  const galleryImages = [
    { url: "/images/image1.jpg", caption: "Shipment Processing" },
    { url: "/images/image2.jpg", caption: "Inspection" },
    { url: "/images/image3.jpg", caption: "Packaging" },
    { url: "/images/image4.jpg", caption: "Shipment Processing" },
    { url: "/images/image5.jpg", caption: "Processing" },
    { url: "/images/image6.jpg", caption: "Customer Details" },
    { url: "/images/image7.jpg", caption: "Packaging" },
    { url: "/images/image8.jpg", caption: "Packaging" },
    { url: "/images/image9.jpg", caption: "Location" },
    { url: "/images/image10.jpg", caption: "Packaging" }
  ];

  // Pre-filled FAQ Data
  const faqs = [
    {
      question: "What items are strictly prohibited from shipping?",
      answer: "For safety and legal reasons, we cannot ship hazardous materials, explosives, flammable liquids, live animals, perishable foods, or cash. Please contact our front desk if you are unsure about a specific item."
    },
    {
      question: "How do I track my DHL package?",
      answer: "You can track your package in real-time using the tracking bar at the top of this website. Simply enter your 10-digit DHL tracking number (Waybill) and click 'Track'."
    },
    {
      question: "Do I need to bring my own packaging?",
      answer: "No, you don't! We provide official DHL express packaging (flyers, boxes, and tubes) free of charge for all express shipments processed at our Kasoa Service Point."
    },
    {
      question: "What documents are required to pick up a package?",
      answer: "You must present a valid, government-issued photo ID (such as a Ghana Card or Passport) and your official tracking number. If sending a proxy, they must bring their ID and the receiver's original ID."
    },
    {
      question: "How fast is DHL Express International?",
      answer: "Most international express shipments reach their global destinations within 2 to 4 business days, depending on customs clearance in the destination country."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Gallery Auto-Play useEffect (Ping-Pong Sweep logic)
  useEffect(() => {
    if (isGalleryHovered) return;
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => {
        if (prev >= galleryImages.length - 1) {
          setGalleryDirection(-1);
          return prev - 1;
        } else if (prev <= 0) {
          setGalleryDirection(1);
          return prev + 1;
        } else {
          return prev + galleryDirection;
        }
      });
    }, 4000); // Switches every 4 seconds
    return () => clearInterval(interval);
  }, [isGalleryHovered, galleryDirection, galleryImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      <nav
        // Shrunk navbar height by reducing padding (py-1 when scrolled, py-2 when at top)
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-dhl-yellow border-b border-black/5 ${scrolled ? 'shadow-xl py-1' : 'py-2'
          }`}
      >
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Desktop Image Logo Section - Sizes remain huge */}
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center group transition-transform hover:scale-105 gap-4">
                <img src="/images/dhl-logo.jpg" alt="DHL" className="h-12 md:h-16 w-auto object-contain" />
                <div className="h-10 md:h-14 w-[2px] bg-black/20 mx-1"></div>
                <img src="/images/bweh-logo.png" alt="BWEH" className="h-14 md:h-20 w-auto object-contain" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-wide text-black hover:text-dhl-red transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dhl-red transition-all group-hover:w-full"></span>
                </a>
              ))}
              <a href="#services" className="dhl-button bg-black text-white py-2 px-5 text-sm hover:bg-dhl-red shadow-none rounded-none">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-black"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-white z-[60] flex flex-col p-8"
            >
              {/* Mobile Menu Image Logo */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <img src="/images/dhl-logo.jpg" alt="DHL" className="h-12 w-auto object-contain" />
                  <div className="h-10 w-[2px] bg-gray-300 mx-2"></div>
                  <img src="/images/bweh-logo.png" alt="BWEH" className="h-16 w-auto object-contain" />
                </div>
                <button onClick={toggleMenu} className="p-2">
                  <X size={32} className="text-dhl-red" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-2xl font-bold uppercase text-gray-800 hover:text-dhl-red transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#services"
                  onClick={toggleMenu}
                  className="dhl-button text-xl mt-4 rounded-none shadow-none"
                >
                  Ship Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Lighter Background Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10 transition-colors duration-1000"></div>

        {/* Carousel Background */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${img})`,
                opacity: i === heroIndex ? 1 : 0
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-30 w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center justify-center text-center"
          >
            {/* 1. Kasoa Service Point - Scaled Up */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-md rounded-none text-dhl-yellow font-bold uppercase tracking-widest text-base md:text-xl mb-10 border border-white/20 shadow-lg">
              <MapPin size={24} /> Kasoa Service Point
            </div>

            {/* 2. Official DHL.com Style Tracking Bar */}
            <div className="w-full max-w-3xl mx-auto mb-12">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row w-full shadow-2xl rounded-none">
                <div className="flex-1 bg-white relative">
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number(s)"
                    className="w-full h-12 md:h-14 px-4 md:px-6 outline-none text-base md:text-lg text-gray-900 font-medium placeholder-gray-400 rounded-none border-2 border-transparent focus:border-dhl-yellow transition-colors"
                  />
                </div>
                <button type="submit" className="bg-dhl-red text-white font-extrabold uppercase tracking-wide px-8 h-12 md:h-14 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-base md:text-lg rounded-none">
                  Track <ChevronRight size={20} />
                </button>
              </form>
            </div>

            {/* 3. Old Style Hero Text - EXPRESS SHIPPING on one line */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 font-black leading-[1.1] tracking-tighter drop-shadow-2xl">
              EXPRESS SHIPPING <br />
              <span className="text-dhl-yellow italic"> FROM <span className="text-white">KASOA</span> TO THE WORLD. </span>
            </h1>

            {/* 4. Subtext and Buttons - Centered with Restored Horizontal Red Line */}
            <div className="max-w-2xl mx-auto flex flex-col items-center text-center mb-10">
              <div className="w-20 h-1.5 bg-dhl-red mb-6 rounded-full shadow-lg"></div>
              <p className="text-lg md:text-xl text-white/95 font-medium drop-shadow-md">
                Bweh Logistics brings the full power of DHL to your neighborhood. Scale your business globally with our expert shipment handling.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 mb-32">
              <a href="#services" className="dhl-button px-10 py-5 h-16 uppercase min-w-[200px] shadow-2xl rounded-none">
                Start Shipping
              </a>
              <a href="#video" className="bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white hover:text-black transition-all px-10 py-5 h-16 flex items-center justify-center font-bold uppercase min-w-[200px] gap-3 rounded-none shadow-2xl">
                <Play size={18} fill="currentColor" /> Find Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Stat Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-20 right-4 md:right-10 z-20 hidden md:block"
        >
          <div className="bg-white p-7 shadow-2xl border-l-[6px] border-dhl-yellow w-80">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Real-time update</p>
            <h4 className="text-gray-900 font-bold text-xl mb-1 italic">Daily Courier Departure</h4>
            <div className="flex items-center gap-2 text-dhl-red font-bold text-base md:text-lg">
              <Clock size={18} />
              <span>4:30 PM (Mon-Fri)</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>

        {/* DHL Stripe at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-2 dhl-gradient z-10 pointer-events-none"></div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-12 lg:py-16 bg-bweh-blue overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <span className="text-dhl-yellow font-bold uppercase tracking-widest text-xs">Visual Tour</span>
              <h2 className="text-4xl md:text-6xl text-white mt-4 mb-8 leading-tight font-black">
                Find Us <br />With Ease
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                We've prepared a comprehensive video guide to show you our facility and provide clear visual directions to our office, ensuring you don't get lost or confused.
              </p>
              <ul className="space-y-4 mb-10">
                {['Facility Walkthrough', 'Visual Landmark Guide', 'Security Protocols', 'Step-by-Step Directions'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <div className="w-5 h-5 rounded-full bg-dhl-red flex items-center justify-center">
                      <ChevronRight size={12} className="text-white" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="dhl-button uppercase tracking-widest text-sm py-4 px-8 rounded-none shadow-none inline-block">
                View on Map
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-gray-900 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(255,204,0,0.15)] group lg:col-span-8 w-full"
            >
              <video
                src="/images/dhl-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover relative z-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Watermarks Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] text-gray-900">
          <Package className="absolute top-[10%] left-[5%] w-32 h-32 rotate-12" />
          <Plane className="absolute top-[40%] left-[80%] w-48 h-48 -rotate-12" />
          <Truck className="absolute top-[80%] left-[15%] w-40 h-40 -rotate-6" />
          <Globe className="absolute top-[20%] left-[60%] w-56 h-56 rotate-45" />
          <MapPin className="absolute top-[70%] left-[50%] w-24 h-24 rotate-12" />
          <Package className="absolute top-[30%] left-[90%] w-20 h-20 -rotate-45" />
          <Truck className="absolute top-[5%] left-[40%] w-24 h-24 rotate-6" />
        </div>

        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Text Side */}
            <div className="lg:col-span-7 xl:col-span-8">
              <h2 className="text-4xl md:text-5xl mb-8 font-black">
                About Us
              </h2>
              <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-6 leading-relaxed">
                DHL is right here in Kasoa, bringing world-class express shipping closer to the people. We are your direct link to the world, making international logistics fast, reliable, and incredibly accessible.
              </p>
              <p className="text-xl md:text-2xl text-gray-800 font-semibold leading-relaxed">
                Our mission is to simplify the shipping process for you. Whether you're sending a gift abroad or receiving important business documents, our team at Bweh ensures that every package is handled with the precision and care that the DHL brand is famous for.
              </p>
            </div>

            {/* Stats Side */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center items-center md:items-start lg:items-center gap-12 lg:gap-16 border-t lg:border-t-0 lg:border-l border-gray-100 pt-10 lg:pt-0 lg:pl-10">
              <div className="flex flex-col items-center text-center group">
                <Award className="text-dhl-red mb-3 group-hover:scale-110 transition-transform duration-300" size={48} />
                <h3 className="font-display font-black text-5xl md:text-6xl mb-2 text-gray-900 tracking-tighter">99.9%</h3>
                <p className="text-base md:text-lg text-gray-600 uppercase font-black tracking-widest mt-1">On-Time Delivery</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <MapPin className="text-bweh-blue mb-3 group-hover:scale-110 transition-transform duration-300" size={48} />
                <h3 className="font-display font-black text-4xl md:text-5xl mb-2 text-gray-900 tracking-tight mt-1">Local Focus</h3>
                <p className="text-base md:text-lg text-gray-600 uppercase font-black tracking-widest mt-1">Community Experts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPANDING ACCORDION GALLERY SECTION */}
      <section id="gallery" className="py-12 md:py-16 bg-bweh-blue overflow-hidden relative">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-10 flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-dhl-yellow font-bold uppercase tracking-widest text-xs md:text-sm mb-2 md:mb-4">Operations</h2>
            <h3 className="text-3xl md:text-5xl text-white font-black uppercase tracking-tighter">Gallery</h3>
          </div>
          <div className="hidden md:flex items-center gap-3 text-white/70 uppercase text-xs font-bold tracking-[0.3em]">
            <Camera size={20} /> Hover to explore
          </div>
        </div>

        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div
            className="flex flex-col md:flex-row w-full h-[500px] md:h-[400px] gap-1 md:gap-4"
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
            onTouchStart={() => setIsGalleryHovered(true)}
            onTouchEnd={() => setIsGalleryHovered(false)}
          >
            {galleryImages.map((image, index) => {
              const isActive = index === activeGalleryIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveGalleryIndex(index)}
                  onMouseEnter={() => setActiveGalleryIndex(index)}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-sm ${isActive ? 'flex-[10] md:flex-[8]' : 'flex-[1]'
                    } min-h-[30px] md:min-h-0 md:min-w-[60px] lg:min-w-[80px] border-t-[3px] md:border-t-0 md:border-l-[4px] ${isActive ? 'border-dhl-red' : 'border-transparent'}`}
                >
                  {/* Image Background */}
                  <img
                    src={image.url}
                    alt={image.caption}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isActive ? 'grayscale-0 opacity-100 scale-100' : 'grayscale opacity-50 scale-110'
                      }`}
                  />

                  {/* Active State Overlay & Text */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20">
                      <p className="text-dhl-yellow text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2">{`Photo 0${index + 1}`}</p>
                      <p className="text-white text-lg md:text-3xl font-black uppercase tracking-tight whitespace-nowrap">{image.caption}</p>
                    </div>
                  </div>

                  {/* Inactive State Vertical Text */}
                  <div className={`absolute inset-0 flex items-center md:items-end justify-center md:pb-8 transition-opacity duration-500 delay-200 ${isActive ? 'opacity-0 hidden' : 'opacity-100'}`}>
                    <span className="text-white/80 font-bold tracking-widest uppercase md:origin-bottom md:-rotate-90 whitespace-nowrap text-[10px] md:text-sm">
                      {image.caption}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-red-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-dhl-yellow/5 rounded-full -mr-32 -mt-32"></div>
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900 font-black">Our Services</h2>
            <div className="w-24 h-1 bg-dhl-red mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Shipment Processing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dhl-card p-10 flex flex-col h-full bg-white relative overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-dhl-yellow/10 rotate-45 -mr-16 -mt-16"></div>

              <div className="w-16 h-16 bg-dhl-yellow flex items-center justify-center mb-8 shadow-inner">
                <Package size={32} className="text-black" />
              </div>
              <h3 className="text-3xl mb-6 font-black uppercase tracking-tighter">Shipment Processing</h3>
              <p className="text-gray-600 mb-8 font-medium">
                Reach international markets in 2-3 business days. We provide end-to-end processing using high-speed DHL systems.
              </p>

              <div className="space-y-4 flex-grow">
                {/* Accordion 1: Sender */}
                <div className="border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('sender')}
                    className={`w-full flex items-center justify-between p-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeAccordion === 'sender' ? 'bg-dhl-red text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck size={18} />
                      <span>Sender Requirements</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeAccordion === 'sender' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'sender' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white"
                      >
                        <ul className="p-5 space-y-3 text-sm text-gray-700 font-medium">
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Full Name (Official)</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Residential Address</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Active Phone Number</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Ghana Card / Valid Passport</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Receiver */}
                <div className="border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('receiver')}
                    className={`w-full flex items-center justify-between p-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeAccordion === 'receiver' ? 'bg-dhl-red text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Users size={18} />
                      <span>Receiver Information</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeAccordion === 'receiver' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'receiver' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white"
                      >
                        <ul className="p-5 space-y-3 text-sm text-gray-700 font-medium">
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Full Legal Name</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Accurate Delivery Address</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Local Contact Number</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-dhl-red" /> Zip / Postal Code</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3 text-gray-400">
                <Truck size={18} />
                <span className="italic text-xs font-bold uppercase tracking-wider">Scheduled Courier Pickup: Daily</span>
              </div>
            </motion.div>

            {/* Package Pickup Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="dhl-card p-10 flex flex-col h-full bg-white relative overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-bweh-blue/10 rotate-45 -mr-16 -mt-16"></div>

              <div className="w-16 h-16 bg-bweh-blue flex items-center justify-center mb-8 shadow-inner">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-3xl mb-6 font-black uppercase tracking-tighter">Package Collection</h3>
              <p className="text-gray-600 mb-8 font-medium">
                Pick up your global arrivals from our secure hub. Multi-layered verification for your security.
              </p>

              <div className="space-y-4 flex-grow">
                {/* Accordion: Self Pickup */}
                <div className="border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('self_pickup')}
                    className={`w-full flex items-center justify-between p-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeAccordion === 'self_pickup' ? 'bg-bweh-blue text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} />
                      <span>Self-Pickup Protocol</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeAccordion === 'self_pickup' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'self_pickup' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white"
                      >
                        <ul className="p-5 space-y-3 text-sm text-gray-700 font-medium">
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-bweh-blue" /> Original Valid ID (Card or Passport)</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-bweh-blue" /> Your Active Tracking Number</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Proxy Pickup */}
                <div className="border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion('proxy_pickup')}
                    className={`w-full flex items-center justify-between p-4 font-bold uppercase text-xs tracking-widest transition-colors ${activeAccordion === 'proxy_pickup' ? 'bg-bweh-blue text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Users size={18} />
                      <span>Proxy Collection</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeAccordion === 'proxy_pickup' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === 'proxy_pickup' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white"
                      >
                        <ul className="p-5 space-y-3 text-sm text-gray-700 font-medium">
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-bweh-blue" /> The Package Owner's ID</li>
                          <li className="flex items-center gap-3"><ChevronRight size={14} className="text-bweh-blue" /> Your Own Valid ID</li>
                          <li className="pt-2 text-xs italic text-gray-500 flex items-start gap-2">
                            <span className="font-bold text-dhl-red">Note:</span> Both IDs must be verified and signed in the secure custody log.
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-bweh-blue flex items-center justify-center overflow-hidden"><Truck size={14} className="text-white" /></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-dhl-yellow flex items-center justify-center overflow-hidden"><Package size={14} className="text-black" /></div>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center">Secure Custody System</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-24 bg-dhl-yellow border-t border-gray-100">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-gray-900 font-bold uppercase tracking-widest text-sm">Transactions</span>
              <h2 className="text-5xl md:text-6xl mt-2 mb-6 font-black uppercase tracking-tighter text-black">Flexible Payment</h2>
              <p className="text-gray-800 mb-8 max-w-md text-xl md:text-2xl leading-relaxed font-medium">
                We ensure your payment process is as seamless as your shipment. We accept multiple robust options to fit your preference.
              </p>
            </div>
            <div className="lg:col-span-7 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: MoMo */}
              <div className="relative overflow-hidden rounded-sm shadow-xl bg-white border border-gray-100 group hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="p-8 relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center mb-6 shadow-md shadow-gray-200">
                    <Smartphone size={20} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">Mobile Money</h4>
                  <p className="text-gray-500 text-sm mb-4 font-medium">Instant, secure transfers from your wallet.</p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-sm border border-gray-100">
                      <div className="w-10 h-10 rounded-sm bg-[#ffcc00] flex items-center justify-center text-[#000] font-black text-[10px] uppercase shadow-sm">MTN</div>
                      <span className="font-bold text-sm text-gray-800">MTN Mobile Money</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-sm border border-gray-100">
                      <div className="w-10 h-10 rounded-sm bg-[#e00000] flex items-center justify-center text-white font-black text-[10px] uppercase shadow-sm">TEL</div>
                      <span className="font-bold text-sm text-gray-800">Telecel Cash</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-sm border border-gray-100">
                      <div className="w-10 h-10 rounded-sm bg-[#003da5] flex items-center justify-center text-white font-black text-[10px] uppercase shadow-sm border-2 border-[#e31837]">AT</div>
                      <span className="font-bold text-sm text-gray-800">AT Money</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Cash */}
              <div className="relative overflow-hidden rounded-sm shadow-xl bg-white border border-gray-100 group hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply" style={{ backgroundImage: "url('/images/ghana_cedis.png')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent"></div>

                <div className="p-8 relative z-10 flex flex-col h-full text-gray-900">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center mb-6 shadow-md shadow-gray-200">
                    <Banknote size={20} />
                  </div>
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tight text-gray-900">Physical Cash</h4>
                  <p className="text-gray-600 text-sm mb-8 font-medium">Over the counter transactions at our desk.</p>

                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex flex-col">
                      <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Currency</div>
                      <div className="text-5xl font-black text-gray-900 drop-shadow-sm">GHS</div>
                    </div>
                    <div className="w-12 h-12 bg-dhl-yellow rounded-sm flex items-center justify-center shadow-md text-black group-hover:animate-bounce">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FAQ SECTION */}
      <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-200">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-dhl-red font-bold uppercase tracking-widest text-sm">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl mt-2 mb-4 text-gray-900 font-black uppercase tracking-tighter">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-dhl-yellow mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 shadow-sm rounded-none overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group hover:bg-gray-50 transition-colors"
                >
                  <span className={`font-black text-lg md:text-xl transition-colors ${activeFaq === index ? 'text-dhl-red' : 'text-gray-900 group-hover:text-dhl-red'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors shrink-0 ml-4 ${activeFaq === index ? 'border-dhl-red bg-dhl-red text-white' : 'border-gray-300 text-gray-400 group-hover:border-dhl-red group-hover:text-dhl-red'}`}>
                    {activeFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-gray-600 font-medium text-base md:text-lg leading-relaxed border-t border-gray-100 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours Section */}
      <section id="hours" className="py-24 bg-white relative overflow-hidden">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Text & Hours Side */}
            <div className="lg:col-span-5">
              <span className="text-dhl-yellow font-bold uppercase tracking-widest text-sm">Always On Time</span>
              <h2 className="text-5xl md:text-6xl mt-2 mb-8 font-black uppercase tracking-tighter text-gray-900">Operating Hours</h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                We respect your time. Our facility operates on a strict, reliable schedule so you always know exactly when you can reach us.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 p-6 rounded-sm shadow-sm flex items-center justify-between group hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-bweh-blue text-white rounded-full flex items-center justify-center shadow-inner">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl md:text-2xl">Mon - Fri</h4>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Business Days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-black text-gray-900">8:30 AM</div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900">5:00 PM</div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-6 rounded-sm shadow-sm flex items-center justify-between group hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-bweh-blue text-white rounded-full flex items-center justify-center shadow-inner">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl md:text-2xl">Saturday</h4>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Weekend Service</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-black text-gray-900">9:00 AM</div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900">2:00 PM</div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 p-6 rounded-sm flex items-center justify-between opacity-90 group hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-bweh-blue text-white rounded-full flex items-center justify-center shadow-inner">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl md:text-2xl">Sunday</h4>
                      <p className="text-sm font-bold text-red-500 uppercase tracking-widest mt-1">Closed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-black text-dhl-red uppercase tracking-widest">Rest Day</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-7 h-full w-full">
              <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-sm overflow-hidden shadow-2xl group">
                <img
                  src="/images/office_clock.png"
                  alt="Modern Office Clock"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section id="staff" className="py-24 bg-white border-t border-gray-100">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-center text-center mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl mt-2 font-black uppercase tracking-tighter text-center w-full">Meet Our Dedicated Team</h2>
              <p className="text-gray-500 max-w-md mx-auto mt-4">Professional, certified, and ready to assist you with any logistic challenge.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-12">
            {[
              { name: "Albert Ennin-Adjei", title: "Shipping & Logistics Specialist", img: "/images/albert.jpg" },
              { name: "Emmauel Paa Nii Clottey", title: "Shipping & Logistics Specialist", img: null }
            ].map((staff, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative transition-all duration-500 shadow-xl border border-gray-100 rounded-sm">
                  {staff.img ? (
                    <img src={staff.img} alt={staff.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <UserCheck size={64} className="text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bweh-blue/90 via-bweh-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-white/90 text-sm font-medium">{staff.title}</p>
                  </div>
                </div>
                <h4 className="text-xl mb-1 font-bold text-center text-gray-900">{staff.name}</h4>
                <p className="text-dhl-red text-sm uppercase tracking-wider font-bold text-center">{staff.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section & Map */}
      <section id="contact" className="bg-bweh-blue py-16 md:py-24 text-white relative">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-4">
              <h2 className="text-4xl md:text-5xl mb-10">Get In Touch</h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center mt-1">
                    <MapPin className="text-dhl-yellow" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Visit Our Office</h4>
                    <p className="text-gray-300 mb-3 leading-relaxed text-base">
                      Kasoa Second Bus Stop, Adjacent Ernest Chemist<br />
                      Kasoa,Ghana
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=DHL+Service+Point+Kasoa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dhl-yellow font-bold uppercase text-sm flex items-center gap-2 hover:underline tracking-wide"
                    >
                      Open in Google Maps <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center mt-1">
                    <Phone className="text-dhl-yellow" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Call Us</h4>
                    <p className="text-gray-300 text-base mb-1">+233 55 360 7172</p>
                    <p className="text-gray-300 text-base">+233 50 772 3415</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center mt-1">
                    <Mail className="text-dhl-yellow" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Email Contact</h4>
                    <p className="text-gray-300 text-base">optimaltravelandcharterservice@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Handles */}
              <div className="mt-10 pt-10 border-t border-white/10">
                <h4 className="font-bold uppercase text-sm tracking-widest mb-5 text-gray-400">Connect With Us</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Facebook, hoverClass: 'hover:bg-[#1877F2]' },
                    { Icon: Twitter, hoverClass: 'hover:bg-[#1DA1F2]' },
                    { Icon: Instagram, hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]' },
                    { Icon: Linkedin, hoverClass: 'hover:bg-[#0A66C2]' }
                  ].map(({ Icon, hoverClass }, i) => (
                    <a key={i} href="#" className={`w-12 h-12 rounded-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-transparent hover:text-white ${hoverClass}`}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 w-full">
              {/* Map Container */}
              <div className="bg-gray-800 w-full aspect-video rounded-sm overflow-hidden border border-white/10 relative shadow-[0_0_50px_rgba(255,204,0,0.05)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d15347.221665236526!2d-0.44080484999999997!3d5.5300720000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0xfdfbb9fac676db9%3A0x3f6b1da20e6340bc!2sDHL%20KASOA%20SERVICE%20POINT%20(B-WEH%20LTD)%2C%20second%20bus%20stop%2C%20Kasoa!3m2!1d5.535730099999999!2d-0.4196509!5e1!3m2!1sen!2sgh!4v1777469393401!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DHL-Bweh Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700 absolute inset-0"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dhl-yellow text-gray-900 pt-16 pb-8">
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              {/* Footer Image Logo */}
              <div className="flex items-center gap-4 mb-8">
                <img src="/images/dhl-logo.jpg" alt="DHL" className="h-16 w-auto object-contain" />
                <div className="h-12 w-[2px] bg-black/20 mx-2"></div>
                <img src="/images/bweh-logo.png" alt="BWEH" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-gray-900 font-bold text-base leading-relaxed mb-6">
                Providing world-class DHL experience at your doorstep. Fast, secure, and always reliable.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, hoverClass: 'hover:bg-[#1877F2] hover:text-white' },
                  { Icon: Twitter, hoverClass: 'hover:bg-[#1DA1F2] hover:text-white' },
                  { Icon: Instagram, hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white' },
                  { Icon: Linkedin, hoverClass: 'hover:bg-[#0A66C2] hover:text-white' }
                ].map(({ Icon, hoverClass }, i) => (
                  <a key={i} href="#" className={`w-8 h-8 rounded-sm bg-black/5 flex items-center justify-center transition-all duration-300 text-black ${hoverClass}`}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-base md:text-lg uppercase tracking-widest mb-6 border-b border-black/10 pb-2 text-black">Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-900 font-bold hover:text-dhl-red transition-colors text-base flex items-center gap-2">
                      <ChevronRight size={14} className="text-black" /> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-base md:text-lg uppercase tracking-widest mb-6 border-b border-black/10 pb-2 text-black">Daily Pickup</h4>
              <div className="p-4 bg-black/5 border border-black/10 rounded-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={20} className="text-dhl-red" />
                  <span className="text-sm font-black uppercase text-black">Pickup Cut-off</span>
                </div>
                <p className="text-3xl font-black text-black mb-1">4:30 PM</p>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-widest italic mt-2">All processed items depart then.</p>
              </div>
            </div>

            <div>
              <h4 className="font-black text-base md:text-lg uppercase tracking-widest mb-6 border-b border-black/10 pb-2 text-black">Support</h4>
              <div className="space-y-4">
                <a href="tel:+233" className="flex items-center gap-3 text-gray-900 font-bold hover:text-dhl-red transition-colors">
                  <Phone size={16} className="text-dhl-red" />
                  <span className="text-base font-bold text-gray-900">+233 553607172</span>
                </a>
                <a href="mailto:optimaltravelandcharterservice@gmail.com" className="flex items-center gap-3 text-gray-900 font-bold hover:text-dhl-red transition-colors">
                  <Mail size={16} className="text-dhl-red" />
                  <span className="text-base font-bold text-gray-900">optimaltravelandcharterservice@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-900 font-bold text-sm md:text-base text-center md:text-left">
              © {new Date().getFullYear()} DHL Service Point Kasoa.
            </p>
            <div className="flex gap-4">
              <span className="text-black font-black uppercase text-xs tracking-widest cursor-pointer hover:underline">Privacy Policy</span>
              <span className="text-black font-black uppercase text-xs tracking-widest cursor-pointer hover:underline">Terms of Trade</span>
            </div>
          </div>
        </div>
      </footer>
      {/* FLOATING WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/233553607172"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="fixed bottom-8 left-4 md:left-8 z-[60] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center hover:scale-110 transition-transform origin-bottom-left"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Chat"
          className="w-full h-full drop-shadow-[0_4px_10px_rgba(37,211,102,0.4)]"
        />
      </motion.a>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-dhl-red text-white flex items-center justify-center rounded-none shadow-2xl hover:bg-black transition-all hover:scale-110 active:scale-95 group"
          >
            <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}