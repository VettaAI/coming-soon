"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Brain, LineChart, Users, Sparkles, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const taglines = [
  "Vetta. Talent meets intelligence.",
  "Automated hiring, human results.",
  "Let agents Vetta your best."
];

const features = [
  {
    title: "AI-Powered Matching",
    description: "Smart algorithms that understand both job requirements and candidate qualifications.",
    icon: <Brain className="h-6 w-6" />,
    highlight: "98% Match Accuracy",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200"
  },
  {
    title: "Automated Communication",
    description: "Intelligent handling of candidate interactions and updates.",
    icon: <Bot className="h-6 w-6" />,
    highlight: "24/7 Engagement",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    title: "Smart Analytics",
    description: "Data-driven insights into your hiring process.",
    icon: <LineChart className="h-6 w-6" />,
    highlight: "Real-time Insights",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    borderColor: "border-green-200"
  },
  {
    title: "Team Collaboration",
    description: "Seamless coordination between hiring teams.",
    icon: <Users className="h-6 w-6" />,
    highlight: "Unified Platform",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200"
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Enhanced parallax effects
  const leftPatternY = useTransform(scrollY, [0, 1000], [0, 300]);
  const rightPatternY = useTransform(scrollY, [0, 1000], [0, -300]);
  const patternScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update cursor position with smooth animation
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px)`;
    }
  }, [cursorPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };

  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = containerRef.current?.querySelector('section:nth-child(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovering ? 'active' : ''}`}
      />
      <motion.div 
        className="scroll-progress"
        style={{ scaleX }}
      />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative" ref={containerRef}>
        {/* Decorative Elements */}
        <div className="side-line side-line-left" />
        <div className="side-line side-line-right" />
        
        <motion.div 
          className="side-pattern side-pattern-left"
          style={{ y: leftPatternY, scale: patternScale }}
        />
        <motion.div 
          className="side-pattern side-pattern-right"
          style={{ y: rightPatternY, scale: patternScale }}
        />
        
        <div className="dots-pattern top-20 left-20" />
        <div className="dots-pattern bottom-20 right-20" />

        <section className="py-20 px-4 relative min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
                className="mb-8 inline-block hover-glow"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Coming Soon
                </span>
              </motion.div>
              
              <div className="min-h-[160px] sm:min-h-[160px] relative flex items-center justify-center py-6 sm:py-8">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentTaglineIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 gradient-text leading-relaxed absolute inset-0 flex items-center justify-center px-4"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {taglines[currentTaglineIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Tagline Indicators */}
              <div className="flex justify-center gap-2 mt-4 mb-8">
                {taglines.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTaglineIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors hover-glow ${
                      index === currentTaglineIndex
                        ? "bg-primary-500"
                        : "bg-primary-200"
                    }`}
                    aria-label={`Switch to tagline ${index + 1}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  />
                ))}
              </div>

              <motion.p 
                className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1], delay: 0.4 }}
              >
                We&apos;re building the next generation of AI-powered recruitment software. 
                Join our waitlist to be among the first to experience the future of hiring.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1], delay: 0.6 }}
                className="max-w-md mx-auto w-full px-4 sm:px-0"
              >
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover-glow"
                    required
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  />
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-primary-500 text-white px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-lg hover:bg-primary-600 transition-all duration-300 flex items-center justify-center hover-glow"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Join Waitlist <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </form>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 mt-2 text-xs sm:text-sm"
                  >
                    Thanks! We&apos;ll keep you updated on our progress.
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                onClick={scrollToNextSection}
                className="mt-8 sm:mt-16 inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 hover:text-primary-600 transition-colors"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Scroll to learn more
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Core Features Preview */}
        <section className="py-20 relative reveal-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span 
                className="text-primary-600 font-semibold mb-2 block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                What We&apos;re Building
              </motion.span>
              <motion.h2 
                className="text-4xl font-bold text-gray-900 gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Core Features
              </motion.h2>
              <motion.p
                className="text-gray-600 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Experience the next generation of recruitment technology
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl p-8 ${feature.bgColor} hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
                    <div className="absolute right-0 bottom-0 w-32 h-32 transform translate-x-16 translate-y-16 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`${feature.iconBg} ${feature.iconColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${feature.iconColor} ${feature.bgColor} mb-4`}>
                      {feature.highlight}
                    </span>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {feature.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-8 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowRight className={`h-5 w-5 ${feature.iconColor}`} />
                    </div>
                  </div>

                  {/* Border Gradient */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-gradient-br group-hover:from-white/50 group-hover:to-transparent rounded-2xl transition-all duration-500" />
                </motion.div>
              ))}
            </div>
        </div>
        </section>

        {/* Development Status */}
        <section className="py-20 bg-gray-50 relative reveal-on-scroll">
          <div className="dots-pattern top-10 left-10 opacity-30" />
          <div className="dots-pattern bottom-10 right-10 opacity-30" />
          
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <motion.h2 
              className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 gradient-text"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              Current Development Status
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-600 mb-8"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              We&apos;re actively developing Vetta with a focus on creating a powerful, 
              intuitive platform that leverages the latest in AI technology. Our team is 
              working hard to bring you a tool that will revolutionize how you handle recruitment.
            </motion.p>
            <motion.div 
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary-600 hover-glow px-4 py-2 rounded-full"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              In Active Development
            </motion.div>
          </div>
        </section>
    </div>
    </>
  );
}
