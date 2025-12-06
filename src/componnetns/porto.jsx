import React, { useState, useEffect } from 'react';
import './porto.css';
import { MdHome, MdPerson, MdCode, MdSchool, MdContactMail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Projects Data
  const projects = [
    { title: 'Rental HS - Modern Car Rental App', desc: 'Modern car rental application with AI integration for personalized recommendations. Built with TypeScript, React 19, and Vite for optimal performance. Features AI assistant, smart filtering, and responsive design.', tech: ['React 19', 'TypeScript', 'Vite', 'AI Integration'], images: ['/rental hs1.png', '/rental hs2.png', '/rental hs3.png', '/rental hs4.png', '/rental hs5.png'], link: 'https://rental-hs.vercel.app/' },
    { title: 'Kelasku1 - CBT Exam System', desc: 'Computer-Based Test Platform with mobile-first design. Frontend built with Next.js, TypeScript, and Tailwind CSS. Backend with Laravel and MySQL. Features student dashboard, real-time exam interface, automatic scoring, results via email, and admin panel with JWT authentication.', tech: ['Next.js', 'Laravel', 'MySQL', 'TypeScript', 'JWT'], images: ['/cbt 1.png', '/cbt 2.png', '/cbt 3.png', '/cbt 4.png', '/cbt 5.png', '/cbt 6.png', '/cbt 7.png', '/cbt 8.png', '/cbt 9.png', '/cbt 10.png', '/cbt 11.png', '/cbt 12.png', '/cbt 13.png'], link: 'https://kelasku-frontend.vercel.app/' },
    { title: 'SYStream - Netflix-Inspired Platform', desc: 'Modern film streaming application integrated with TMDB API. Built with React 18, TypeScript, and Vite. Responsive design with custom video player featuring progress tracking and error handling.', tech: ['React 18', 'TypeScript', 'TMDB API', 'Tailwind CSS'], images: ['/movieku.png'], link: 'https://movieku-nine.vercel.app/' },
    { title: 'Multi-Feature Computer Vision Application', desc: 'Desktop application with CLI and GUI interfaces using Python. Integrated real-time detection modules via webcam: Face, Motion, Emotion, Mask, Pose, Hand Gesture, Age & Gender Detection, and YOLO Object Detection.', tech: ['Python', 'OpenCV', 'YOLO', 'Face Detection'], images: ['/ml.png'], video: '/cv_demo.mp4' },
    { title: 'Point of Sale (POS) System', desc: 'Fully functional Laravel-based web POS system with sales processing, inventory management, and real-time employee attendance. Generates comprehensive reports for data-informed business analysis.', tech: ['Laravel', 'PHP', 'MySQL'], images: ['/kasir 1.png', '/kasir 2.png', '/kasir 3.png', '/kasir 4.png', '/kasir 5.png', '/kasir 6.png'] },
    { title: 'Car Rental Website (Full-Stack)', desc: 'Full-stack car rental application using React.js and Node.js/Express.js with secure payment gateway. AI-powered chatbot for 24/7 customer support and pricing recommendation model for optimal rates.', tech: ['React.js', 'Node.js', 'Express.js', 'AI Chatbot'], images: ['/rental 1.png', '/rental 2.png', '/rental 3.png', '/rental 4.png', '/rental 5.png', '/rental 6.png', '/rental 7.png', '/rental 8.png', '/rental 9.png', '/rental 10.png', '/rental 11.png', '/rental 12.png', '/rental 13.png', '/rental 14.png'] },
    { title: 'E-Commerce Website - Pawon Sekar', desc: 'Food e-commerce website built with PHP and JavaScript. Designed to increase order efficiency by 30% through online ordering system and comprehensive admin dashboard.', tech: ['PHP', 'JavaScript', 'Bootstrap'], images: ['/Pawon.jpg'] },
    { title: 'Resto Padang Benerang E-Commerce', desc: 'Full-stack e-commerce system using PHP Native and MySQL with dual roles for customers and admins. Features complete reporting module for sales, inventory, and transactions.', tech: ['PHP', 'MySQL', 'Bootstrap'], images: ['/padang benerang.png', '/resto 1.png', '/resto 2.png', '/resto 3.png', '/resto 4.png', '/resto 5.png'] },
    { title: 'NFT Creation & Publishing', desc: 'Designed and published Non-Fungible Tokens (NFTs) as part of Web3 project. Includes asset design and deployment on blockchain platforms with interactive features.', tech: ['Web3', 'Blockchain', 'NFT'], images: ['/NFT.jpg'] },
    { title: 'Generated 2D Animation', desc: 'Developed code-generated 2D animations using programming for interactive visual exploration and experimentation.', tech: ['JavaScript', 'Canvas API'], images: ['/kodok.jpg'] },
  ];

  // Skills Data
  const skillCategories = [
    { title: 'Frontend', skills: ['React.js', 'React 19', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'] },
    { title: 'Backend', skills: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'Python', 'MySQL', 'SQL', 'Ruby on Rails'] },
    { title: 'AI & CV', skills: ['Python', 'YOLO', 'OpenCV', 'Face Detection', 'Emotion Detection', 'Pose Detection'] },
    { title: 'Tools & Tech', skills: ['Git/GitHub', 'VS Code', 'Vite', 'Postman', 'Laragon', 'Blender', 'Adobe Illustrator'] },
  ];

  // Certificates Data
  const certificates = [
    { title: "Aptitude Test", issuer: "LEPKom UG", date: "July 2025", image: "/certificates/Aptitude Test.png", description: "Professional aptitude assessment test demonstrating analytical and problem-solving capabilities.", type: "Testing" },
    { title: "Creating Business Intelligence", issuer: "MySkill", date: "May 2025", image: "/certificates/Creating Business Intelligence.png", description: "Advanced business intelligence concepts, data analytics, and strategic decision-making tools.", type: "Analytics" },
    { title: "Data Preparation for Business Processes", issuer: "MySkill", date: "September 2024", image: "/certificates/Data Preparation for Business Processes.png", description: "Data management and preparation techniques for business process optimization.", type: "Data" },
    { title: "Java for Intermediate", issuer: "LEPKom UG", date: "August 2024", image: "/certificates/JAVA FOR INTERMEDIATE.png", description: "Intermediate Java programming covering advanced OOP concepts and design patterns.", type: "Programming" },
    { title: "Wide Area Network Using Cisco Router for Intermediate", issuer: "LEPKom UG", date: "February 2024", image: "/certificates/WIDE AREA NETWORK USING CISCO ROUTER FOR INTERMEDIATE.png", description: "Advanced networking concepts using Cisco routers for enterprise infrastructure.", type: "Networking" },
    { title: "Java Programming for Beginner", issuer: "LEPKom UG", date: "August 2023", image: "/certificates/JAVA PROGRAMMING FOR BEGINNER.png", description: "Foundational Java programming covering core concepts and object-oriented principles.", type: "Programming" },
    { title: "Building Website using HTML 5", issuer: "LEPKom UG", date: "May 2023", image: "/certificates/Building Website using HTML 5.png", description: "Modern web development using HTML5 and responsive design principles.", type: "Web Development" },
    { title: "Local Area Network Using Cisco Router", issuer: "LEPKom UG", date: "February 2023", image: "/certificates/LOCAL AREA NETWORK USING CISCO ROUTER.png", description: "LAN setup and configuration using Cisco routing equipment.", type: "Networking" },
    { title: "Fundamental Desktop Programming", issuer: "LEPKom UG", date: "August 2022", image: "/certificates/FUNDAMENTAL DESKTOP PROGRAMMING.png", description: "Basic desktop application development fundamentals and best practices.", type: "Programming" },
    { title: "Fundamental Networking", issuer: "LEPKom UG", date: "N/A", image: "/certificates/FUNDAMENTAL NETWORKING.png", description: "Network fundamentals including protocols, architectures, and communication.", type: "Networking" },
    { title: "Introduction to Figma", issuer: "Self-Learning", date: "2024", image: "/certificates/introduction figma.png", description: "UI/UX design fundamentals using Figma design tool.", type: "Design" },
    { title: "Figma Tools", issuer: "Self-Learning", date: "2024", image: "/certificates/figmaa tools.png", description: "Advanced Figma tools and features for professional design workflows.", type: "Design" },
    { title: "Introduction to Looker Studio", issuer: "Google", date: "2024", image: "/certificates/introduction looker studio.png", description: "Data visualization and business intelligence using Google Looker Studio.", type: "Analytics" },
    { title: "MSIB Certificate", issuer: "Kampus Merdeka", date: "2024", image: "/certificates/studi independent.png", description: "Independent learning program certificate from Kampus Merdeka initiative.", type: "Achievement" },
  ];

  // Initialize Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'certificates', 'contact'];
      const scrollY = window.scrollY + 200;

      sections.forEach(sec => {
        const element = document.getElementById(sec);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(sec);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yogacode86@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCV = () => {
    const fileName = 'CV_Yoga_Krisna_Utama.pdf';
    const link = document.createElement('a');
    link.href = `/${fileName}`;
    link.download = 'CV_Yoga Krisna Utama.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Video Player Component
  const VideoPlayer = ({ src }) => {
    return (
      <video 
        controls
        preload="auto"
        controlsList="nodownload"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#000',
          display: 'block'
        }}
        onError={(e) => {
          console.error('❌ Video failed to load:', src);
          console.error('Error:', e.target?.error);
        }}
        onPlay={() => {
          console.log('▶️ Video playing:', src);
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  };

  return (
    <div className="app-container">
      {/* Background Effects */}
      <div className="noise-overlay"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      {/* --- FLOATING DOCK NAVIGATION --- */}
      <nav className="floating-dock">
        {[
          { id: 'home', icon: <MdHome />, label: 'Home' },
          { id: 'about', icon: <MdPerson />, label: 'About' },
          { id: 'projects', icon: <MdCode />, label: 'Projects' },
          { id: 'skills', icon: <MdSchool />, label: 'Skills' },
          { id: 'contact', icon: <MdContactMail />, label: 'Contact' }
        ].map((item) => (
          <div
            key={item.id}
            className={`dock-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollTo(item.id)}
            role="button"
            tabIndex="0"
            aria-label={item.label}
          >
            {item.icon}
            <span className="dock-tooltip">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* --- HERO SECTION: The Digital Architect --- */}
      <section 
        id="home" 
        className="hero-section relative overflow-hidden py-20"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          setMousePosition({
            x: (clientX - centerX) / 50,
            y: (clientY - centerY) / 50,
          });
        }}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        {/* --- Ambient Background Effects --- */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          {/* Massive Glow Top Left */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)',
            borderRadius: '50%',
            filter: 'blur(120px)'
          }} />
          {/* Secondary Glow Bottom Right */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(100px)'
          }} />
          
          {/* Grid Pattern Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5
          }} />
        </div>

        <Container>
          <Row className="align-items-center g-5">
            
            {/* --- LEFT CONTENT: The Hook --- */}
            <Col lg={7}>
              
              {/* 1. Status Badge (Pulsing) */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                marginBottom: '2rem',
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}>
                <span style={{
                  position: 'relative',
                  display: 'flex',
                  height: '12px',
                  width: '12px'
                }}>
                  <span style={{
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#34d399',
                    opacity: 0.75
                  }} />
                  <span style={{
                    position: 'relative',
                    display: 'flex',
                    borderRadius: '50%',
                    height: '12px',
                    width: '12px',
                    background: '#34d399'
                  }} />
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#6ee7b7',
                  letterSpacing: '0.05em'
                }}>Available for New Opportunities</span>
              </div>

              {/* 2. Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Designing the <br />
                <span style={{
                  background: 'linear-gradient(to right, white, rgba(200, 200, 200, 0.8), rgba(100, 100, 100, 0.6))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Future with</span>
                <span style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Intelligent Systems.
                </span>
              </h1>

              {/* 3. Subtext */}
              <p style={{
                fontSize: '1.125rem',
                color: '#a1a1aa',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '600px'
              }}>
                I am <strong style={{ color: 'white' }}>Yoga Krisna Utama</strong>, an Information Systems graduate from Gunadarma University (GPA: 3.60/4.00) with proven expertise in <span style={{ color: '#60a5fa' }}>Full-Stack Web Development</span> and <span style={{ color: '#a78bfa' }}>AI Integration</span>. Passionate about merging software engineering with machine learning to create intelligent solutions.
              </p>

              {/* 4. Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 10
              }}>
                <button 
                  onClick={() => scrollTo('projects')}
                  style={{
                    padding: '1rem 2rem',
                    background: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '100px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    fontSize: '1rem',
                    position: 'relative',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  className="group"
                >
                  Explore My Work
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.3s' }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleDownloadCV}
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '100px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    position: 'relative',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Download CV
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>

              {/* 5. Quick Stats (Social Proof) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                fontSize: '0.875rem',
                color: '#64748b',
                fontWeight: 500,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  North Bekasi, Indonesia
                </div>
                
              </div>
            </Col>

            {/* --- RIGHT CONTENT: The Holographic Profile --- */}
            <Col lg={5} className="d-none d-lg-block" style={{ position: 'relative' }}>
              {/* Floating Elements (Background) */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 0,
                  opacity: 0.6,
                  transform: `translate(${mousePosition.x * -2}px, ${mousePosition.y * -2}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5" style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '20px',
                  transform: 'rotate(12deg)'
                }}>
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="1.5" style={{
                  position: 'absolute',
                  bottom: '-50px',
                  left: '-20px',
                  transform: 'rotate(-12deg)'
                }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 16 16 12 12 8 8 12 12 16" />
                </svg>
              </div>

              {/* The Glass Card Container with 3D Tilt */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 10,
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                  transition: 'transform 0.1s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{
                  position: 'relative',
                  padding: '8px',
                  borderRadius: '32px',
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(40px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                  
                  {/* Inner Image Frame */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    aspectRatio: '4 / 5'
                  }}>
                    <img 
                      src="/yoga.jpg" 
                      alt="Yoga Krisna Utama" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    
                    {/* Overlay Gradient */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, #050505, rgba(5, 5, 5, 0.5), transparent)',
                      opacity: 0.8
                    }} />

                    {/* Floating Info (Bottom) */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      transform: 'translateY(8px)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(8px)'}
                    >
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'white',
                          marginBottom: '0.25rem'
                        }}>Yoga Krisna Utama</h3>
                        <p style={{
                          color: '#60a5fa',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}>Full-Stack Web Developer</p>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17.77 14.85 18.92 21.95 12 18.27 5.08 21.95 6.23 14.85 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Floating Badge (GPA) - Efek Melayang di luar kartu */}
                <div style={{
                  position: 'absolute',
                  right: '-24px',
                  top: '48px',
                  background: '#0f0f11',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  animation: 'float 4s ease-in-out infinite',
                  zIndex: 20
                }}>
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    color: '#22c55e'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="17" cy="17" r="1" />
                      <circle cx="7" cy="7" r="1" />
                      <circle cx="17" cy="7" r="1" />
                      <circle cx="7" cy="17" r="1" />
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>GPA Score</div>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>3.60 <span style={{ color: '#64748b', fontSize: '0.875rem' }}>/ 4.0</span></div>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- ABOUT SECTION --- */}
        <section id="about" style={{ background: '#0f1419', position: 'relative' }}>
          <Container>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              {/* Status Badge */}
              <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          borderRadius: '100px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          backdropFilter: 'blur(12px)',
          marginBottom: '1rem'
              }}>
          <span style={{
            position: 'relative',
            display: 'flex',
            height: '8px',
            width: '8px'
          }}>
            <span style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#6366f1',
              opacity: 0.75
            }} />
            <span style={{
              position: 'relative',
              display: 'flex',
              borderRadius: '50%',
              height: '8px',
              width: '8px',
              background: '#6366f1'
            }} />
          </span>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#a5b4fc',
            letterSpacing: '0.05em'
          }}>Information Systems Graduate</span>
              </div>

              <h2 className="section-title" style={{ marginBottom: '0' }}>
          About <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span>
              </h2>
              <span style={{ color: '#a1a1aa', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>introduction</span>
            </div>

            <div className="bento-grid" style={{ marginTop: '3rem' }}>
          {/* Main Bio Card */}
            <div className="bento-item glass-card" style={{ gridColumn: 'span 12' }} data-aos="fade-up">
              <h3 className="about-heading">Who Am I?</h3>
              <p className="about-text mt-3">
                A passionate technology enthusiast from Gunadarma University with a 3.60 GPA. I don't just write code—
                I solve real-world problems. My expertise bridges robust backend logic with interactive frontend interfaces,
                enhanced with AI integration. I'm committed to continuous learning and creating digital solutions that matter.
              </p>
            </div>

            {/* GPA KPI Card */}
            <div className="bento-item glass-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }} data-aos="fade-up" data-aos-delay="100">
              <div className="about-stat">
                <div className="about-stat-number">3.6</div>
                <div className="about-stat-label">GPA Score</div>
              </div>
            </div>

            {/* Experience Highlight */}
            <div className="bento-item glass-card" style={{ gridColumn: 'span 4' }} data-aos="fade-up" data-aos-delay="150">
              <h4 className="about-heading">Experience</h4>
              <ul className="list-unstyled about-text mt-3">
                <li className="mb-3"><strong>NFT Development</strong> • Web3 Project</li>
                <li className="mb-3"><strong>Event Management</strong> • Provalliant</li>
                <li><strong>KPPS Officer</strong> • 2024 Election</li>
              </ul>
            </div>

            {/* Core Values / Mindset */}
            <div className="bento-item glass-card" style={{ gridColumn: 'span 4' }} data-aos="fade-up" data-aos-delay="200">
              <h4 className="about-heading">Core Values</h4>
              <div className="d-flex gap-2 flex-wrap mt-3">
                {['User-Centric', 'Clean Code', 'Scalable', 'Learning'].map(tag => (
                  <span key={tag} className="skill-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects">
        <Container>
          {/* Header with GitHub Button */}
          <div className="d-flex justify-content-center align-items-center mb-5 flex-column">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '100px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(12px)',
                marginBottom: '1rem'
              }}>
                <span style={{
                  position: 'relative',
                  display: 'flex',
                  height: '8px',
                  width: '8px'
                }}>
                  <span style={{
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#6366f1',
                    opacity: 0.75
                  }} />
                  <span style={{
                    position: 'relative',
                    display: 'flex',
                    borderRadius: '50%',
                    height: '8px',
                    width: '8px',
                    background: '#6366f1'
                  }} />
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#a5b4fc',
                  letterSpacing: '0.05em'
                }}>Showcase</span>
              </div>
              <h2 className="section-title mb-0">
                Featured <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
              </h2>
            </div>
            <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer" className="github-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V21" />
              </svg>
              View GitHub
            </a>
          </div>

          {/* Projects Grid */}
          <Row className="g-4">
            {projects.map((project, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div 
                  className="project-card glass-card" 
                  onClick={() => handleProjectClick(project)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                  }}
                >
                  
                  {/* Image Area */}
                  <div className="card-image-wrapper">
                    <img src={project.images[0]} alt={project.title} className="project-img" />
                    <div className="img-overlay"></div>
                    
                    {/* Badge */}
                    <div className="project-card-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15.09 8.26H22L17.41 12.04L19.5 18.26L12 14.47L4.5 18.26L6.59 12.04L2 8.26H8.91L12 2Z" />
                      </svg>
                      {project.tech[0]}
                    </div>

                    {/* AI Badge for specific projects */}
                    {(project.title.includes('Rental') || project.title.includes('Computer Vision')) && (
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        background: 'rgba(168, 85, 247, 0.2)',
                        backdropFilter: 'blur(12px)',
                        color: '#c4b5fd',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '6px 12px',
                        borderRadius: '100px',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        zIndex: 10,
                        animation: 'pulse-glow 2s ease-in-out infinite'
                      }}>
                        ✨ AI Powered
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="card-content">
                    <div className="content-header">
                      <h4 className="project-title">{project.title}</h4>
                      <svg className="project-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 7h10v10M7 17L17 7" />
                      </svg>
                    </div>
                    
                    <p className="project-description">{project.desc}</p>
                    
                    <div className="project-tech">
                      {project.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- SKILLS SECTION: TECH ECOSYSTEM --- */}
      <section id="skills">
        <Container>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
            <span style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Expertise
            </span>
            <h2 className="section-title mb-0">
              Technical <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Arsenal</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0', lineHeight: 1.6 }}>
              A comprehensive suite of technologies optimized for scalable web applications and intelligent computer vision systems.
            </p>
          </div>

          {/* Grid */}
          <Row className="g-4" style={{ position: 'relative', zIndex: 2 }}>
            {skillCategories.map((category, idx) => (
              <Col lg={6} key={idx}>
                <div className="skill-category">
                  {/* Header with Icon */}
                  <div className="skill-header">
                    <div className="skill-icon-wrapper">
                      {/* Icon based on category */}
                      {idx === 0 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                          <path d="M12 2l9 5v9c0 5.55-4 10-9 11-5-1-9-5.45-9-11V7l9-5z" />
                          <path d="M9 12l3 3 5-5" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                          <path d="M3 12a9 3 0 0 0 18 0" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                          <circle cx="12" cy="19" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="17" cy="17" r="1" />
                          <circle cx="7" cy="7" r="1" />
                          <circle cx="17" cy="7" r="1" />
                          <circle cx="7" cy="17" r="1" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                          <path d="M12 2v20M2 12h20" />
                          <circle cx="12" cy="12" r="1" />
                          <path d="M7 7h10v10H7z" />
                        </svg>
                      )}
                    </div>
                    <div className="skill-header-text">
                      <h4 className="skill-category-title">{category.title}</h4>
                      <p className="skill-category-desc">{idx === 0 ? 'Building immersive & responsive UIs' : idx === 1 ? 'Scalable logic & secure APIs' : idx === 2 ? 'Computer Vision & Intelligent Systems' : 'DevOps, Version Control & Design'}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="skill-items">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-item">{skill}</span>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- CERTIFICATES SECTION: "The Trust Vault" --- */}
      <section id="certificates">
        <Container>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2 }}>
            <span style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Qualifications
            </span>
            <h2 className="section-title mb-0">
              Certified <span style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Expertise</span>
            </h2>
          </div>

          {/* Certificate Cards Grid */}
          <Row className="g-4" style={{ position: 'relative', zIndex: 2 }}>
            {certificates.map((cert, idx) => (
              <Col lg={4} md={6} key={idx} className="d-flex">
                <div 
                  className="cert-card group w-100"
                  onClick={() => handleCertificateClick(cert)}
                  role="button"
                  tabIndex="0"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Certificate Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-out'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Certificate Info */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#6366f1', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {cert.type}
                    </div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', lineHeight: 1.4, marginBottom: '1rem', transition: 'color 0.3s ease' }} className="cert-title">
                      {cert.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, flexWrap: 'wrap', marginTop: 'auto' }}>
                      <span>{cert.issuer}</span>
                      <span style={{ width: '4px', height: '4px', background: '#475569', borderRadius: '50%' }} />
                      <span>{cert.date}</span>
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- CONTACT SECTION: "The Portal" --- */}
      <section id="contact">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              {/* Premium Glass Panel */}
              <div className="contact-glass-panel">
                {/* Glowing Border Animation */}
                <div className="contact-border-glow"></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, padding: '4rem 2rem' }}>
                  <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    Let's Build Something <br />
                    <span style={{ background: 'linear-gradient(135deg, #60a5fa, #c084fc, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto' }}>
                      Extraordinary.
                    </span>
                  </h2>
                  
                  <p style={{ fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                    Whether it's an AI-integrated platform, a full-stack application, or an innovative Web3 project, 
                    I'm ready to bring your vision to life. Let's create something remarkable together.
                  </p>

                  {/* Main Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <button 
                      onClick={handleCopyEmail}
                      className="contact-btn-primary"
                      style={{
                        background: copied ? '#10b981' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white'
                      }}
                    >
                      {copied ? (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Email Copied!
                        </>
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <path d="M22 6l-10 7L2 6" />
                          </svg>
                          Copy Email Address
                        </>
                      )}
                    </button>

                    <a 
                      href="https://wa.me/6281294743876?text=Hi%20Yoga" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-btn-secondary"
                    >
                      <FaWhatsapp size={20} />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Footer Social Links */}
                  <div className="contact-social-links">
                    {[
                      { 
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        ),
                        href: 'https://linkedin.com/in/yoga-utama',
                        label: 'LinkedIn'
                      },
                      {
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        ),
                        href: 'https://github.com/Babayaga4523',
                        label: 'GitHub'
                      }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon-link"
                      >
                        <div className="social-icon-wrapper">
                          {social.icon}
                        </div>
                        <span className="social-label">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Copyright Footer */}
              <div className="contact-copyright">
                © {new Date().getFullYear()} Yoga Krisna Utama. All rights reserved.
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- PROJECT MODAL: Cinematic Case Study (Modern Premium Design) --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" contentClassName="premium-modal-content" dialogClassName="modal-dialog-custom">
        <div className="project-modal-wrapper">
          {/* Close Button */}
          <button className="modal-close-btn" onClick={() => setShowModal(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {/* HERO SECTION */}
          {selectedProject && (
            <>
              <div className="modal-hero">
                {/* Video or Image */}
                {selectedProject.video ? (
                  <div className="video-container">
                    <VideoPlayer src={selectedProject.video} />
                    <div className="media-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                      Video Demo
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedProject.images?.length > 0 && (
                      <>
                        <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.title} className="hero-media" />
                        
                        {/* Carousel Controls */}
                        {selectedProject.images.length > 1 && (
                          <>
                            <button className="carousel-btn left" onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                              </svg>
                            </button>
                            <button className="carousel-btn right" onClick={() => setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>
                            <div className="carousel-counter">
                              {currentImageIndex + 1} / {selectedProject.images.length}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                
                <div className="hero-overlay" />
                <span className="hero-category-badge">
                  {selectedProject.video ? 'Computer Vision' : 'Web Development'}
                </span>
              </div>

              {/* CONTENT BODY */}
              <div className="modal-body-content">
                <div className="modal-grid">
                  {/* Main Column */}
                  <div className="modal-main">
                    <h2 className="project-headline">{selectedProject.title}</h2>
                    <p className="project-description">{selectedProject.desc}</p>
                    
                    {/* Features Box */}
                    <div className="features-box">
                      <h5 className="section-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Key Features
                      </h5>
                      <ul className="features-list">
                        {['Responsive Design', 'Real-time Processing', 'Secure Architecture', 'Performance Optimized'].map((feat, i) => (
                          <li key={i} className="feature-item">
                            <span className="dot" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar Column */}
                  <div className="modal-sidebar">
                    {/* Tech Stack */}
                    <div className="sidebar-group">
                      <h5 className="section-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                        </svg>
                        Technologies
                      </h5>
                      <div className="tech-cloud">
                        {selectedProject.tech?.map((t, i) => (
                          <span key={i} className="tech-chip">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="sidebar-actions">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn-modal-primary">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          Visit Demo
                        </a>
                      )}
                      <button className="btn-modal-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V21" />
                        </svg>
                        View Source
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* --- CERTIFICATE MODAL: Digital Credential Card --- */}
      <Modal show={showCertificateModal} onHide={() => setShowCertificateModal(false)} centered size="lg" contentClassName="certificate-modal-content">
        <div className="certificate-wrapper">
          
          {/* --- Close Button (Floating) --- */}
          <button onClick={() => setShowCertificateModal(false)} className="cert-close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="certificate-layout">
            
            {/* --- LEFT SIDE: Visual Showcase --- */}
            <div className="cert-visual-section">
              {selectedCertificate && (
                <>
                  <div className="cert-image-container">
                    {/* Glow Effect di belakang gambar */}
                    <div className="cert-glow"></div>
                    <img 
                      src={selectedCertificate.image} 
                      alt={selectedCertificate.title} 
                      className="cert-img" 
                    />
                  </div>
                  
                  {/* Action Bar (Optional) */}
                  <div className="cert-actions">
                    <button className="action-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Verify Credential
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* --- RIGHT SIDE: Data Manifest --- */}
            <div className="cert-info-section">
              
              {selectedCertificate && (
                <>
                  {/* Header: Issuer */}
                  <div className="cert-header">
                    <div className="issuer-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#a78bfa' }}>
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8 14 12 17 16 14" />
                      </svg>
                      <span>{selectedCertificate.issuer}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="cert-title">{selectedCertificate.title}</h2>
                  <p className="cert-desc">{selectedCertificate.description || "Credential verified for proficiency in subject matter."}</p>

                  {/* Metadata Grid */}
                  <div className="cert-meta-grid">
                    {/* Issued Date */}
                    <div className="meta-item">
                      <div className="meta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <div className="meta-label">Issued On</div>
                        <div className="meta-value">{selectedCertificate.date}</div>
                      </div>
                    </div>
                    
                    {/* Credential ID */}
                    <div className="meta-item">
                      <div className="meta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">#</text>
                        </svg>
                      </div>
                      <div>
                        <div className="meta-label">Credential ID</div>
                        <div className="meta-value font-mono">
                          CERT-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Footer */}
                  <div className="cert-footer">
                    <div className="verified-seal">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#10b981' }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 12 15 15 10" />
                      </svg>
                      <div>
                        <div className="seal-title">Authentic Certificate</div>
                        <div className="seal-subtitle">Verified & Authenticated</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;

