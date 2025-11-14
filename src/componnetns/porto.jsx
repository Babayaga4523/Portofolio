import React, { useState, useEffect, useRef } from 'react';
import './porto.css';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
// Tambahkan import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});

  // WhatsApp send handler
  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const whatsappNumber = "6281294743876"; // tanpa +
    const text = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Section highlight
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
      // Shadow effect
      setScrolled(window.scrollY > 10);
    };
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Tambahkan efek animasi saat section aktif
  useEffect(() => {
    if (sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection].classList.remove('section-animate');
      // Trigger reflow for restart animation
      void sectionRefs.current[activeSection].offsetWidth;
      sectionRefs.current[activeSection].classList.add('section-animate');
    }
  }, [activeSection]);

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`portfolio-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Custom cursor */}
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        } ${darkMode ? 'text-white' : 'text-gray-900'}`}
        style={{ minHeight: 72 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18">
          {/* Brand */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              YK
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
            onClick={handleMenuToggle}
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'contact', label: 'Contact' }
            ].map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 transition-all duration-300 ${
            menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="px-6 py-4 space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'certificates', label: 'Certificates' },
                { id: 'contact', label: 'Contact' }
              ].map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                  style={{
                    animation: menuOpen
                      ? `slideInFromLeft 0.4s ${0.08 * idx + 0.1}s both`
                      : undefined
                  }}
                  onClick={e => {
                    e.preventDefault();
                    scrollToSection(item.id);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        {/* Hero section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
          ref={el => (sectionRefs.current['home'] = el)}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-purple-300 rounded-full"></div>
            <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow" style={{animationDelay: '1s'}}></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center lg:text-left animate-slide-up">
                <h4 className="text-lg md:text-xl text-purple-400 font-medium mb-4">Hello, I'm</h4>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Yoga Krisna <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Utama</span>
                </h1>
                <h3 className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
                  Information Systems Student & Software Engineer
                </h3>
                <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
                  An Information Systems graduate from Gunadarma University (GPA: 3.60/4.00) with a deep interest in developing machine learning and computer vision-based applications. Seeking an opportunity to contribute in a Software Engineer role where I can apply my skills in Python, object detection model development, and software engineering to create innovative technological solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact Me
                  </button>
                  <button
                    className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={() => scrollToSection('projects')}
                  >
                    View Projects
                  </button>
                </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 animate-pulse"></div>
                    <div
                      className="absolute inset-8 rounded-full bg-cover bg-center border-4 border-white/20"
                      style={{ backgroundImage: "url('/yoga.jpg')" }}
                    ></div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900 animate-ping"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
            onClick={() => scrollToSection('about')}
          >
            <div className="flex flex-col items-center text-gray-400 group-hover:text-white transition-colors duration-300">
              <span className="text-sm mb-2">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
          ref={el => (sectionRefs.current['about'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  An Information Systems graduate from Gunadarma University (GPA: 3.60/4.00) with a deep interest in developing machine learning and computer vision-based applications. Seeking an opportunity to contribute in a Software Engineer role where I can apply my skills in Python, object detection model development, and software engineering to create innovative technological solutions.
                </p>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Education
                  </h4>
                  <div className="space-y-2">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-white">Bachelor of Information Systems</h5>
                    <p className="text-gray-600 dark:text-gray-400">Gunadarma University, 2021 – September 17, 2025</p>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">GPA: 3.60/4.00</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Core Competencies
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Technical Leadership', 'Analytical Thinking', 'Agile Development', 'Quality Assurance', 'Client Collaboration'].map((skill, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-3 rounded-lg border border-purple-200 dark:border-slate-600">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Soft Skills
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Effective Communication', 'Team Collaboration', 'Time Management', 'Creativity', 'Empathy', 'Responsibility', 'Trustworthiness'].map((skill, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-3 rounded-lg border border-green-200 dark:border-slate-600">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section
          id="experience"
          className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300"
          ref={el => (sectionRefs.current['experience'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

                <div className="space-y-12">
                  {/* Experience Item 1 */}
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">💼</span>
                    </div>
                    <div className="ml-8 bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-600 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Software Engineer Intern</h3>
                          <h4 className="text-lg text-purple-600 dark:text-purple-400 font-medium">PT. Telkom Indonesia</h4>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-600 px-3 py-1 rounded-full mt-2 md:mt-0">July 2024 - September 2024</span>
                      </div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Developed a Computer-Based Test (CBT) system using Python Flask, HTML, CSS, and JavaScript
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Implemented user authentication and session management
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Created responsive UI components for test administration
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Integrated database management for storing test data and results
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Experience Item 2 */}
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">🚀</span>
                    </div>
                    <div className="ml-8 bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-600 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Freelance Developer</h3>
                          <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium">Independent Contractor</h4>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-600 px-3 py-1 rounded-full mt-2 md:mt-0">2023 - Present</span>
                      </div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Developed custom web applications using React.js and Node.js
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Created mobile applications with React Native
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Implemented machine learning models for computer vision projects
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Collaborated with clients to deliver tailored software solutions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section
          id="projects"
          className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
          ref={el => (sectionRefs.current['projects'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Project Card 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-6xl">📊</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Computer-Based Test (CBT) System</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    A comprehensive testing platform built with Python Flask, featuring user authentication,
                    session management, and responsive UI for educational institutions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQLite'].map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      View Demo
                    </button>
                    <button className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Source Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-6xl">🤖</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Computer Vision Application</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    An AI-powered application using YOLOv8 for object detection and image processing,
                    built with Python and OpenCV for real-time analysis.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'NumPy'].map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      View Demo
                    </button>
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Source Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-6xl">💻</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Portfolio Website</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    A responsive personal portfolio website built with React.js, featuring modern design,
                    animations, and optimized performance.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React.js', 'CSS3', 'JavaScript', 'HTML5'].map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      View Live
                    </button>
                    <button className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Source Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-6xl">📱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mobile E-Commerce App</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    A cross-platform mobile application for online shopping, built with React Native
                    and integrated with payment gateways.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React Native', 'JavaScript', 'Firebase', 'Stripe API'].map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      View Demo
                    </button>
                    <button className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                      Source Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section
          id="skills"
          className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300"
          ref={el => (sectionRefs.current['skills'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Programming Languages */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Programming Languages
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Python', level: 90 },
                    { name: 'JavaScript', level: 85 },
                    { name: 'Java', level: 80 },
                    { name: 'PHP', level: 75 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks & Libraries */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Frameworks & Libraries
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'React.js', level: 85 },
                    { name: 'Flask', level: 80 },
                    { name: 'Node.js', level: 75 },
                    { name: 'React Native', level: 70 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Tools & Technologies
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'YOLOv8', level: 85 },
                    { name: 'OpenCV', level: 80 },
                    { name: 'TensorFlow', level: 75 },
                    { name: 'Git', level: 85 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
                {/* Certificates Section */}
        <section
          id="certificates"
          className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
          ref={el => (sectionRefs.current['certificates'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Certificates</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Adobe Illustrator", issuer: "Adobe Certified Associate", year: "2023", icon: "🎨", color: "from-orange-500 to-red-500" },
                { title: "Blockchain Fundamentals", issuer: "IBM", year: "2023", icon: "⛓️", color: "from-blue-500 to-purple-500" },
                { title: "Python Programming", issuer: "Coursera", year: "2023", icon: "🐍", color: "from-green-500 to-blue-500" },
                { title: "React.js Development", issuer: "Udemy", year: "2024", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
                { title: "YOLO Object Detection", issuer: "Roboflow", year: "2024", icon: "👁️", color: "from-purple-500 to-pink-500" },
                { title: "Node.js Backend Development", issuer: "freeCodeCamp", year: "2024", icon: "🟢", color: "from-green-500 to-emerald-500" }
              ].map((cert, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 p-6 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {cert.icon}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{cert.issuer}</p>
                  <div className={`w-full h-1 bg-gradient-to-r ${cert.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section
          id="contact"
          className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300"
          ref={el => (sectionRefs.current['contact'] = el)}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                    Feel free to reach out!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
                      <MdEmail />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300">yogakrisna1705@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
                      <MdPhone />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300">+62 812-3456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-gray-200 dark:border-slate-600">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
                      <MdLocationOn />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                      <p className="text-gray-600 dark:text-gray-300">Jakarta, Indonesia</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/yoga-krisna-utama"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href="https://github.com/yogakrisna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black rounded-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-slate-600">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                <form onSubmit={handleWhatsAppSend} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* ...existing code... */}
    </div>
  );
};

export default App;