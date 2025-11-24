import React, { useState, useEffect, useRef } from 'react';
import './porto.css';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
// Tambahkan import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Card, Row, Col } from 'react-bootstrap';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});

  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

const certificates = [
    {
      title: "Aptitude Test",
      issuer: "LEPKom UG",
      date: "July 23, 2025",
      image: "/certificates/Aptitude Test.png",
      description: "Professional aptitude assessment test demonstrating analytical and problem-solving capabilities."
    },
    {
      title: "Creating Business Intelligence",
      issuer: "MySkill",
      date: "May 27, 2025",
      image: "/certificates/Creating Business Intelligence.png",
      description: "Advanced business intelligence concepts, data analytics, and strategic decision-making tools."
    },
    {
      title: "Data Preparation for Business Processes",
      issuer: "MySkill",
      date: "September 23, 2024",
      image: "/certificates/Data Preparation for Business Processes.png",
      description: "Data management and preparation techniques for business process optimization and analysis."
    },
    {
      title: "JAVA FOR INTERMEDIATE",
      issuer: "LEPKom UG",
      date: "August 19, 2024",
      image: "/certificates/JAVA FOR INTERMEDIATE.png",
      description: "Intermediate Java programming covering advanced OOP concepts, data structures, and design patterns."
    },
    {
      title: "WIDE AREA NETWORK USING CISCO ROUTER FOR INTERMEDIATE",
      issuer: "LEPKom UG",
      date: "February 19, 2024",
      image: "/certificates/WIDE AREA NETWORK USING CISCO ROUTER FOR INTERMEDIATE.png",
      description: "Advanced WAN configuration and management using Cisco routing technologies for intermediate level."
    },
    {
      title: "JAVA PROGRAMMING FOR BEGINNER",
      issuer: "LEPKom UG",
      date: "August 21, 2023",
      image: "/certificates/JAVA PROGRAMMING FOR BEGINNER.png",
      description: "Fundamental Java programming course covering object-oriented concepts, syntax, and basic application development."
    },
    {
      title: "Building Website using HTML 5",
      issuer: "LEPKom UG",
      date: "May 30, 2023",
      image: "/certificates/Building Website using HTML 5.png",
      description: "Modern web development using HTML5, covering semantic markup, multimedia, and responsive design."
    },
    {
      title: "LOCAL AREA NETWORK USING CISCO ROUTER",
      issuer: "LEPKom UG",
      date: "February 20, 2023",
      image: "/certificates/LOCAL AREA NETWORK USING CISCO ROUTER.png",
      description: "Hands-on training in configuring and managing Local Area Networks using Cisco routing equipment."
    },
    {
      title: "FUNDAMENTAL DESKTOP PROGRAMMING",
      issuer: "LEPKom UG",
      date: "August 22, 2022",
      image: "/certificates/FUNDAMENTAL DESKTOP PROGRAMMING.png",
      description: "Introduction to desktop application development, covering basic programming concepts and GUI development."
    },
    {
      title: "FUNDAMENTAL NETWORKING",
      issuer: "LEPKom UG",
      date: "February 21, 2022",
      image: "/certificates/FUNDAMENTAL NETWORKING.png",
      description: "Comprehensive course covering fundamental networking concepts, protocols, and network architecture."
    },
    {
      title: "SERTIFIKAT MAGANG DAN STUDI INDEPENDEN BERSERTIFIKAT",
      issuer: "Kampus Merdeka",
      date: "June 30, 2024",
      image: "/certificates/studi independent.png",
      description: "Official certification for completing the Magang dan Studi Independen Bersertifikat (MSIB) program."
    },
    {
      title: "SERTIFIKAT KEPESERTAAN STUDI INDEPENDEN BERSERTIFIKAT ANGKATAN 6",
      issuer: "Kampus Merdeka",
      date: "June 30, 2024",
      image: "/certificates/stupen 2.png",
      description: "Certificate of participation in the 6th batch of Studi Independen Bersertifikat program."
    },
    {
      title: "INTERNET INTRODUCTION",
      issuer: "MySkill",
      date: "October 24, 2023",
      image: "/certificates/internet connection.png",
      description: "Fundamental concepts of internet technology, protocols, and online communication systems."
    },
    {
      title: "INTRODUCTION TO LOOKER DATA STUDIO",
      issuer: "MySkill",
      date: "October 31, 2023",
      image: "/certificates/introduction looker studio.png",
      description: "Data visualization and business intelligence using Google Looker Data Studio for reporting and analytics."
    },
    {
      title: "INTRODUCTION TO FIGMA",
      issuer: "MySkill",
      date: "October 31, 2023",
      image: "/certificates/introduction figma.png",
      description: "Fundamental course introducing Figma interface, basic design principles, and collaborative features."
    },
    {
      title: "FIGMA TOOLS",
      issuer: "MySkill",
      date: "November 10, 2023",
      image: "/certificates/figmaa tools.png",
      description: "Mastery of Figma design tools, covering interface design, prototyping, and collaborative workflows."
    },
    {
      title: "Building Website Using HTML5",
      issuer: "FIKTI Learning",
      date: "May 30, 2023",
      image: "/certificates/Building Website using HTML 5.png",
      description: "Web development fundamentals using HTML5, covering modern markup and responsive web design principles."
    }
  ];

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const projects = [
    { title: 'Rental HS - Modern Car Rental App', desc: 'Modern car rental application with AI integration for personalized recommendations. Built with TypeScript, React 19, and Vite for optimal performance. Features include AI assistant, smart filtering, and responsive design.', tech: ['TypeScript', 'React 19', 'Vite', 'Framer Motion', 'React Bootstrap', 'OpenRouter API'], images: ['/rental hs1.png', '/rental hs2.png', '/rental hs3.png', '/rental hs4.png', '/rental hs5.png', '/rental hs6.png', '/rental hs7.png', '/rental hs8.png', '/rental hs9.png', '/rental hs10.png'], link: 'https://rental-hs.vercel.app/' },
    { title: 'SYStream Movie App', desc: 'Showcasing "SYStream" - a full-stack, Netflix-inspired movie streaming web app, demonstrating advanced React/TypeScript development capabilities. Built with React 18 and TypeScript for robust architecture. Utilizes Vite for fast build/dev cycles and Tailwind CSS/Bootstrap for UI/UX. Integrates TMDB API for comprehensive movie data. Features custom video player with progress saving and robust error handling. Implements advanced filtering, search, and responsive design.', tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Bootstrap', 'TMDB API'], images: ['/movieku.png'], link: 'https://movieku-nine.vercel.app/' },
    { title: 'CBT (Computer-Based Test) System', desc: 'Developed a full-stack Computer-Based Test (CBT) application using Next.js for the frontend and Laravel for the backend.', tech: ['Next.js','Laravel'], images: ['/cbt 1.png', '/cbt 2.png', '/cbt 3.png','/cbt 4.png', '/cbt 5.png', '/cbt 6.png', '/cbt 7.png', '/cbt 8.png', '/cbt 9.png', '/cbt 10.png', '/cbt 11.png', '/cbt 12.png', '/cbt 13.png'], link: 'https://kelasku-frontend.vercel.app/' },
    { title: 'Multi-Feature Computer Vision Application', desc: 'Developed a comprehensive desktop application using Python with both CLI and GUI interfaces. Integrated various real-time detection modules via webcam, including: Face, Motion, Emotion, Mask, Pose, Hand Gesture, Age & Gender Detection, and Object Detection (YOLO).', tech: ['Python','OpenCV','YOLO'], images: ['/ml.png'], video: '/cv_demo.mp4' },
    { title: 'Point of Sale (POS) System', desc: 'Built a functional web-based POS system using the Laravel framework for efficient sales, product, and transaction report management.', tech: ['Laravel','PHP','MySQL'], images: ['/kasir 1.png', '/kasir 2.png', '/kasir 3.png', '/kasir 4.png', '/kasir 5.png', '/kasir 6.png'] },
    { title: 'Padang Berenang Resto', desc: 'Developed a comprehensive restaurant management system for Padang Berenang Resto featuring order management, menu administration, customer reservations, and sales reporting with modern web technologies.', tech: ['PHP','JavaScript','MySQL','Bootstrap'], images: ['/resto 1.png', '/resto 2.png', '/resto 3.png', '/resto 4.png', '/resto 5.png'] },
    { title: 'Car Rental Website (Full-Stack)', desc: 'Developed a full-stack car rental web application using React.js (frontend) and Node.js/Express.js (backend), featuring a secure payment gateway and booking system integration.', tech: ['React.js','Node.js','Express.js'], images: ['/rental.jpg', '/rental 1.png', '/rental 2.png', '/rental 3.png', '/rental 4.png', '/rental 5.png', '/rental 6.png', '/rental 7.png', '/rental 8.png', '/rental 9.png', '/rental 10.png', '/rental 11.png', '/rental 12.png', '/rental 13.png', '/rental 14.png'] },
    { title: 'E-Commerce Website "Pawon Sekar"', desc: 'Built a food e-commerce website with PHP and JavaScript, designed to increase order efficiency by 30% through an online ordering system and an admin dashboard.', tech: ['PHP','JavaScript','MySQL'], images: ['/Pawon.jpg'] },
    { title: 'Personal Portfolio Website', desc: 'Built using React.js to showcase certificates, personal information, and contact details.', tech: ['React.js','CSS3','JavaScript'], images: ['/porto.png'] },
    { title: 'NFT Creation', desc: 'Designed and published Non-Fungible Tokens (NFTs) as part of a Web3 project, including asset design and deployment on blockchain platforms.', tech: ['Web3','Blockchain','NFT'], images: ['/NFT.jpg'] },
    { title: 'Generated 2D Animation', desc: 'Developed code-generated 2D animations for interactive visual exploration and experimentation.', tech: ['Adobe Illustrator','Canvas','Animation'], images: ['/kodok.jpg'] }
  ];

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setCurrentSlide(0);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const handleCertificateClose = () => setShowCertificateModal(false);

  const handleNextSlide = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentSlide((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const handlePrevSlide = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentSlide((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const handleImageClick = () => {
    handleNextSlide();
  };

  return (
    <div className={`portfolio-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Navigation */}
      <nav
  className={`navbar navbar-expand-lg custom-navbar shadow-sm fixed-top${scrolled ? ' navbar-scrolled' : ''} ${darkMode ? 'navbar-dark' : 'navbar-light'}`}
  style={{ minHeight: 72, padding: 0 }}
>
  <div className="container nav-animated d-flex flex-row align-items-center justify-content-between px-3">
    {/* Brand Centered */}

    {/* Hamburger on right for mobile */}
    <button
      className={`navbar-toggler${menuOpen ? ' open' : ''}`}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mainNavbar"
      aria-controls="mainNavbar"
      aria-expanded={menuOpen ? "true" : "false"}
      aria-label="Toggle navigation"
      onClick={handleMenuToggle}
      style={{ border: 'none', outline: 'none', marginLeft: 'auto' }}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div
      className={`collapse navbar-collapse justify-content-center nav-animated${menuOpen ? ' show' : ''}`}
      id="mainNavbar"
    >
      <ul className="navbar-nav gap-4 py-2"
        style={{ fontSize: '1.15rem', fontWeight: 600 }}>
        {[
          { id: 'home', label: 'Home' },
          { id: 'about', label: 'About' },
          { id: 'experience', label: 'Experience' },
          { id: 'projects', label: 'Projects' },
          { id: 'skills', label: 'Skills' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'contact', label: 'Contact' }
        ].map((item, idx) => (
          <li className="nav-item" key={item.id}
            style={{
              animation: menuOpen
                ? `fadeInNav 0.4s ${0.08 * idx + 0.1}s both`
                : undefined
            }}>
            <a
              className={`nav-link px-3${activeSection === item.id ? ' active' : ''}`}
              href={`#${item.id}`}
              style={{
                borderRadius: 12,
                transition: 'background 0.18s, color 0.18s',
                position: 'relative',
                letterSpacing: '0.5px',
              }}
              onClick={e => {
                e.preventDefault();
                scrollToSection(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</nav>

      {/* Main content */}
      <main>
        {/* Hero section */}
        <section
          id="home"
          className="hero-section aos-section"
          ref={el => (sectionRefs.current['home'] = el)}
          data-aos="fade-in"
        >
            <div className="hero-content">
                <div className="hero-text">
                    <h4>Hello, I'm</h4>
                    <h1>Yoga Krisna Utama</h1>
                    <h3>Information Systems Student & Web Developer</h3>
                    <p>Creating digital experiences with modern technologies and innovative solutions.</p>
                    <div className="hero-buttons">
                        <button
                            className="primary-btn"
                            type="button"
                            onClick={() => scrollToSection('contact')}
                        >
                            Contact Me
                        </button>
                        <button
                            className="secondary-btn"
                            type="button"
                            onClick={() => scrollToSection('projects')}
                        >
                            View Projects
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-container">
                        <div className="glow-effect"></div>
                        <div className="profile-image" style={{ backgroundImage: "url('/yoga.jpg')" }}></div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator" onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>
                <span>Scroll Down</span>
                <div className="arrow-down"></div>
            </div>
        </section>
        <section
          id="about"
          className="about-section aos-section"
          ref={el => (sectionRefs.current['about'] = el)}
          data-aos="fade-up"
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-container">
            {/* Main Introduction Card */}
            <div className="about-main-card">
              <div className="about-header">
                <div className="about-avatar">
                  <img src="/yoga.jpg" alt="Yoga Krisna Utama" />
                </div>
                <div className="about-intro">
                  <h3>Yoga Krisna Utama</h3>
                  <p className="about-role">Information Systems Student & Web Developer</p>
                  <p className="about-summary">
                    An Information Systems graduate from Gunadarma University (GPA: 3.60/4.00) with a deep interest in developing machine learning and computer vision-based applications. Seeking an opportunity to contribute in a Software Engineer role where I can apply my skills in Python, object detection model development, and software engineering to create innovative technological solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="about-card education-card">
              <div className="card-icon">
                <span className="icon-graduation">🎓</span>
              </div>
              <div className="card-content">
                <h4>Education</h4>
                <div className="education-details">
                  <h5>Bachelor of Information Systems</h5>
                  <p className="institution">Gunadarma University</p>
                  <p className="duration">2021 – September 17, 2025</p>
                  <p className="gpa">GPA: 3.60/4.00</p>
                </div>
              </div>
            </div>

            {/* Core Competencies Card */}
            <div className="about-card competencies-card">
              <div className="card-icon">
                <span className="icon-competencies">💡</span>
              </div>
              <div className="card-content">
                <h4>Core Competencies</h4>
                <div className="competencies-grid">
                  <div className="competency-item">
                    <span className="competency-icon">🚀</span>
                    <span>Technical Leadership</span>
                  </div>
                  <div className="competency-item">
                    <span className="competency-icon">🔍</span>
                    <span>Analytical Thinking</span>
                  </div>
                  <div className="competency-item">
                    <span className="competency-icon">⚡</span>
                    <span>Agile Development</span>
                  </div>
                  <div className="competency-item">
                    <span className="competency-icon">✅</span>
                    <span>Quality Assurance</span>
                  </div>
                  <div className="competency-item">
                    <span className="competency-icon">🤝</span>
                    <span>Client Collaboration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills Card */}
            <div className="about-card soft-skills-card">
              <div className="card-icon">
                <span className="icon-soft-skills">🌟</span>
              </div>
              <div className="card-content">
                <h4>Soft Skills</h4>
                <div className="soft-skills-grid">
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">💬</span>
                    <span>Effective Communication</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">👥</span>
                    <span>Team Collaboration</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">⏰</span>
                    <span>Time Management</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">🎨</span>
                    <span>Creativity</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">❤️</span>
                    <span>Empathy</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">🤝</span>
                    <span>Responsibility</span>
                  </div>
                  <div className="soft-skill-item">
                    <span className="soft-skill-icon">🔒</span>
                    <span>Trustworthiness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section
          id="experience"
          className="experience-section aos-section"
          ref={el => (sectionRefs.current['experience'] = el)}
          data-aos="fade-up"
        >
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-date">Feb 16, 2024 - Jun 30, 2024</div>
              <div className="timeline-content">
                <h3>Non-Fungible Token (NFT) Development in Web3 Era</h3>
                <p>
                  Contributed to a Web3-based development project centered on Non-Fungible Tokens (NFTs), 
                  where I conducted technical research, participated in discussions, and developed interactive 
                  features within the app. Collaborated with a multidisciplinary team to implement blockchain 
                  integration and enhance the usability and educational value of NFT-based content for users 
                  in the aquaculture domain.
                </p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-date">Jun 2, 2024 - Jun 26, 2024</div>
              <div className="timeline-content">
                <h3>Event Crew – Provalliant</h3>
                <p>
                  Successfully managed logistics for several large-scale public events with over 1,000 attendees at 3 prominent locations (Dufan, AEON Mall Deltamas, Mall of Indonesia), ensuring a smooth event flow from preparation to completion.
                </p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-date">Jun 8, 2024 - Present</div>
              <div className="timeline-content">
                <h3>Karang Taruna</h3>
                <p>
                  Active member contributing to youth social initiatives, community service, and event coordination.
                </p>
              </div>
            </div>
            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-date">Feb 14 - 15, 2024</div>
              <div className="timeline-content">
                <h3>KPPS Committee Member (Voting Group 2)</h3>
                <p>
                  Participated as an official member in the presidential and vice-presidential election team, 
                  supporting the coordination and execution of the voting process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section
          id="projects"
          className="projects-section aos-section"
          ref={el => (sectionRefs.current['projects'] = el)}
          data-aos="fade-up"
        >
          <h2 className="section-title">Projects</h2>
          <div className="container">
            <Row>
              {projects.map((project, index) => (
                <Col xs={12} md={6} lg={4} key={index} className="mb-4">
                  <Card className="project-card-modern h-100" onClick={() => handleCardClick(project)}>
                    <Card.Img variant="top" src={project.images[0]} alt={project.title} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-center">{project.title}</Card.Title>
                      <Card.Text className="text-muted text-center flex-grow-1">{project.desc.split('.')[0]}.</Card.Text>
                      <div className="tech-badges">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="badge">{tech}</span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="badge">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <Modal show={showModal} onHide={handleClose} centered size="lg" className="modern-modal">
            <Modal.Header closeButton className="border-0 bg-transparent">
              <Modal.Title className="text-center w-100">{selectedProject?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {selectedProject?.video ? (
                <div className="mb-3">
                  <video
                    src={selectedProject.video}
                    controls
                    className="img-fluid rounded-4"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    poster={selectedProject?.images?.[0]}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-muted mt-2">Demo video of the Computer Vision Application</p>
                </div>
              ) : selectedProject?.images && selectedProject.images.length > 1 ? (
                <div className="carousel-container mb-3">
                  <div className="carousel-inner position-relative">
                    {selectedProject.images.map((image, index) => (
                      <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                        <img
                          src={image}
                          alt={`${selectedProject?.title} ${index + 1}`}
                          className="d-block w-100 rounded-4 cursor-pointer"
                          style={{ cursor: 'pointer' }}
                          onClick={handleImageClick}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={handlePrevSlide}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    onClick={handleNextSlide}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                  <div className="carousel-indicators">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={index === currentSlide ? 'active' : ''}
                        aria-current={index === currentSlide ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              ) : (
                <img src={selectedProject?.images[0]} alt={selectedProject?.title} className="img-fluid rounded-4 mb-3" />
              )}
              <p className="mb-3">{selectedProject?.desc}</p>
              <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                {selectedProject?.tech.map((tech, i) => (
                  <span key={i} className="badge bg-primary">{tech}</span>
                ))}
              </div>
              {selectedProject?.link && (
                <div className="text-center">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                  >
                    🌐 View Live Demo
                  </a>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </section>

        {/* Skills section */}
        <section
          id="skills"
          className="skills-section aos-section"
          ref={el => (sectionRefs.current['skills'] = el)}
          data-aos="fade-up"
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skills-category">
              <h3>Programming Languages</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span>Java <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>JavaScript <span className="skill-percentage">90%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>PHP <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>HTML5/CSS3 <span className="skill-percentage">95%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>SQL <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Python <span className="skill-percentage">70%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skills-category">
              <h3>Frameworks & Libraries</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span>React.js <span className="skill-percentage">90%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Node.js <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Express.js <span className="skill-percentage">80%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Laravel <span className="skill-percentage">90%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Ruby on Rails <span className="skill-percentage">70%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skills-category">
              <h3>Computer Vision</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span>OpenCV <span className="skill-percentage">75%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>YOLO <span className="skill-percentage">70%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Face & Emotion Detection <span className="skill-percentage">80%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skills-category">
              <h3>Tools & Technologies</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span>Git/GitHub <span className="skill-percentage">90%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>MySQL <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Vite <span className="skill-percentage">85%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>VS Code <span className="skill-percentage">95%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Postman <span className="skill-percentage">80%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Laragon <span className="skill-percentage">75%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="skills-category">
              <h3>Design Tools</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span>Blender (3D Modeling) <span className="skill-percentage">70%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Adobe Illustrator (Vector Graphics) <span className="skill-percentage">75%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Figma <span className="skill-percentage">80%</span></span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
{/* Certificates Section */}
        <section
          id="certificates"
          className="certificates-section aos-section"
          ref={el => (sectionRefs.current['certificates'] = el)}
          data-aos="fade-up"
        >
  <h2 className="section-title">Certificates</h2>
  <div className="certificates-grid">
    {certificates.map((cert, index) => (
      <div
        key={index}
        className="certificate-image-card fade-in"
        style={{ animationDelay: `${index * 0.08}s` }}
        onClick={() => handleCertificateClick(cert)}
      >
        <div className="certificate-image-container">
          <img
            src={cert.image}
            alt={cert.title}
            className="certificate-image"
            onError={(e) => {
              e.target.src = '/placeholder-certificate.jpg';
            }}
          />
          <div className="certificate-overlay">
            <div className="certificate-info">
              <h4>{cert.title}</h4>
              <p>{cert.issuer}</p>
              <span className="view-details">Click to view details</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Certificate Modal */}
  <Modal show={showCertificateModal} onHide={handleCertificateClose} centered size="xl" className="certificate-modal">
    <Modal.Header closeButton className="border-0 bg-transparent">
      <Modal.Title className="text-center w-100">{selectedCertificate?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <div className="certificate-modal-image">
        <img
          src={selectedCertificate?.image}
          alt={selectedCertificate?.title}
          className="img-fluid rounded-4 mb-4"
          onError={(e) => {
            e.target.src = '/placeholder-certificate.jpg';
          }}
        />
      </div>
      <div className="certificate-modal-details">
        <div className="certificate-meta mb-3">
          <span className="badge bg-primary me-2">{selectedCertificate?.issuer}</span>
          <span className="badge bg-secondary">{selectedCertificate?.date}</span>
        </div>
        <p className="certificate-description">{selectedCertificate?.description}</p>
      </div>
    </Modal.Body>
  </Modal>
</section>

        {/* Contact section */}
        <section
          id="contact"
          className="contact-section aos-section"
          ref={el => (sectionRefs.current['contact'] = el)}
          data-aos="fade-up"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="info-item">
                <span className="info-icon"><MdEmail /></span>
                <span>Yogacode86@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-icon"><MdPhone /></span>
                <span>+6281294743876</span>
              </div>
              <div className="info-item">
                <span className="info-icon"><MdLocationOn /></span>
                <span>North Bekasi, Indonesia</span>
              </div>
              <div className="social-links">
                <a href="https://linkedin.com/in/Yoga-Utama" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleWhatsAppSend}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </section>
      </main>
      {/* ...existing code... */}
    </div>
  );
};

export default App;
