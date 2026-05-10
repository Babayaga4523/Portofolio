import { useState, useEffect } from 'react';
import './elegant.css';
import './PremiumModal.css';
import './CertificateModal.css';
import { FaWhatsapp } from 'react-icons/fa';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModernNavbar from './ModernNavbar';

const ElegantPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const projects = [
    { title: 'Rental HS - Modern Car Rental App', desc: 'Modern car rental application with AI integration for personalized recommendations. Built with TypeScript, React 19, and Vite for optimal performance.', tech: ['React 19', 'TypeScript', 'Vite', 'AI Integration'], images: ['/rental hs1.png', '/rental hs2.png', '/rental hs3.png', '/rental hs4.png', '/rental hs5.png'], link: 'https://rental-hs.vercel.app/' },
    { title: 'Kelasku1 - CBT Exam System', desc: 'Computer-Based Test Platform with mobile-first design. Frontend built with Next.js, TypeScript, and Tailwind CSS. Backend with Laravel and MySQL.', tech: ['Next.js', 'Laravel', 'MySQL', 'TypeScript', 'JWT'], images: ['/cbt 1.png', '/cbt 2.png', '/cbt 3.png', '/cbt 4.png', '/cbt 5.png', '/cbt 6.png', '/cbt 7.png', '/cbt 8.png', '/cbt 9.png', '/cbt 10.png', '/cbt 11.png', '/cbt 12.png', '/cbt 13.png'], link: 'https://kelasku-frontend.vercel.app/' },
    { title: 'SYStream - Netflix-Inspired Platform', desc: 'Modern film streaming application integrated with TMDB API. Built with React 18, TypeScript, and Vite.', tech: ['React 18', 'TypeScript', 'TMDB API', 'Tailwind CSS'], images: ['/movieku.png'], link: 'https://movieku-nine.vercel.app/' },
    { title: 'Multi-Feature Computer Vision Application', desc: 'Desktop application with CLI and GUI interfaces using Python. Integrated real-time detection modules via webcam.', tech: ['Python', 'OpenCV', 'YOLO', 'Face Detection'], images: ['/ml.png'], video: '/cv_demo.mp4' },
    { title: 'Point of Sale (POS) System', desc: 'Fully functional Laravel-based web POS system with sales processing, inventory management, and real-time employee attendance.', tech: ['Laravel', 'PHP', 'MySQL'], images: ['/kasir 1.png', '/kasir 2.png', '/kasir 3.png', '/kasir 4.png', '/kasir 5.png', '/kasir 6.png'] },
    { title: 'Car Rental Website (Full-Stack)', desc: 'Full-stack car rental application using React.js and Node.js/Express.js with secure payment gateway and AI-powered chatbot.', tech: ['React.js', 'Node.js', 'Express.js', 'AI Chatbot'], images: ['/rental 1.png', '/rental 2.png', '/rental 3.png', '/rental 4.png', '/rental 5.png', '/rental 6.png', '/rental 7.png', '/rental 8.png', '/rental 9.png', '/rental 10.png', '/rental 11.png', '/rental 12.png', '/rental 13.png', '/rental 14.png'] },
    { title: 'E-Commerce Website - Pawon Sekar', desc: 'Food e-commerce website built with PHP and JavaScript. Designed to increase order efficiency by 30%.', tech: ['PHP', 'JavaScript', 'Bootstrap'], images: ['/Pawon.jpg'] },
    { title: 'Resto Padang Benerang E-Commerce', desc: 'Full-stack e-commerce system using PHP Native and MySQL with dual roles for customers and admins.', tech: ['PHP', 'MySQL', 'Bootstrap'], images: ['/padang benerang.png', '/resto 1.png', '/resto 2.png', '/resto 3.png', '/resto 4.png', '/resto 5.png'] },
    { title: 'NFT Creation & Publishing', desc: 'Designed and published Non-Fungible Tokens (NFTs) as part of Web3 project.', tech: ['Web3', 'Blockchain', 'NFT'], images: ['/NFT.jpg'] },
    { title: 'Generated 2D Animation', desc: 'Developed code-generated 2D animations using programming for interactive visual exploration.', tech: ['JavaScript', 'Canvas API'], images: ['/kodok.jpg'] },
  ];

  const skillCategories = [
    { title: 'Frontend', skills: ['React.js', 'React 19', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'] },
    { title: 'Backend', skills: ['Node.js', 'Express.js', 'Laravel', 'PHP', 'Python', 'MySQL', 'SQL', 'Ruby on Rails'] },
    { title: 'AI & CV', skills: ['Python', 'YOLO', 'OpenCV', 'Face Detection', 'Emotion Detection', 'Pose Detection'] },
    { title: 'Tools & Tech', skills: ['Git/GitHub', 'VS Code', 'Vite', 'Postman', 'Laragon', 'Blender', 'Adobe Illustrator'] },
  ];

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

  const VideoPlayer = ({ src }) => {
    return (
      <video 
        controls
        preload="auto"
        controlsList="nodownload"
        style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    );
  };

  return (
    <div className="elegant-app">
      {/* Modern Navbar with Framer Motion */}
      <ModernNavbar />

      {/* --- HERO SECTION --- */}
      <section id="home" className="elegant-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7} className="hero-content">
              <div className="hero-kicker">
                <span className="kicker-line"></span>
                <span className="kicker-text">Available for New Opportunities</span>
              </div>
              
              <h1 className="hero-title">
                Crafting Digital
                <span className="hero-accent"> Experiences</span>
                <br />with Purpose.
              </h1>
              
              <p className="hero-subtitle">
                I am <strong>Yoga Krisna Utama</strong>, an Information Systems graduate from Gunadarma University 
                with a <span className="highlight">3.60 GPA</span>. Specializing in full-stack web development 
                and AI integration, I build solutions that bridge robust engineering with intelligent design.
              </p>

              <div className="hero-actions">
                <button className="btn-primary-elegant" onClick={() => scrollTo('projects')}>
                  View My Work
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <button className="btn-secondary-elegant" onClick={handleDownloadCV}>
                  Download CV
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>

              <div className="hero-meta">
                <div className="meta-item">
                  <span className="meta-number">10+</span>
                  <span className="meta-label">Projects Built</span>
                </div>
                <div className="meta-divider"></div>
                <div className="meta-item">
                  <span className="meta-number">3.60</span>
                  <span className="meta-label">GPA Score</span>
                </div>
                <div className="meta-divider"></div>
                <div className="meta-item">
                  <span className="meta-number">14+</span>
                  <span className="meta-label">Certificates</span>
                </div>
              </div>
            </Col>

            <Col lg={5} className="hero-image-col">
              <div className="hero-image-frame">
                <div className="image-frame-border"></div>
                <img src="/yoga.jpg" alt="Yoga Krisna Utama" className="hero-image" />
                <div className="hero-image-badge">
                  <span className="badge-dot"></span>
                  <span className="badge-text">Full-Stack Developer</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="elegant-section about-section">
        <Container>
          <div className="section-header">
            <span className="section-overline">About Me</span>
            <h2 className="section-heading">Behind the Code</h2>
            <p className="section-desc">
              A passionate technologist committed to building impactful digital solutions.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={8}>
              <div className="elegant-card about-bio">
                <h3 className="card-title">Who Am I?</h3>
                <p className="card-text">
                  A passionate technology enthusiast from Gunadarma University with a 3.60 GPA. 
                  I do not just write code, I solve real-world problems. My expertise bridges robust 
                  backend logic with interactive frontend interfaces, enhanced with AI integration. 
                  I am committed to continuous learning and creating digital solutions that matter.
                </p>
                <div className="card-divider"></div>
                <div className="experience-list">
                  <div className="exp-item">
                    <span className="exp-dot"></span>
                    <div>
                      <strong>NFT Development</strong>
                      <span className="exp-detail">Web3 Project</span>
                    </div>
                  </div>
                  <div className="exp-item">
                    <span className="exp-dot"></span>
                    <div>
                      <strong>Event Management</strong>
                      <span className="exp-detail">Provalliant</span>
                    </div>
                  </div>
                  <div className="exp-item">
                    <span className="exp-dot"></span>
                    <div>
                      <strong>KPPS Officer</strong>
                      <span className="exp-detail">2024 Election</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="elegant-card about-stats">
                <div className="stat-block">
                  <span className="stat-number">3.60</span>
                  <span className="stat-label">GPA Score</span>
                </div>
                <div className="stat-divider"></div>
                <div className="value-tags">
                  {['User-Centric', 'Clean Code', 'Scalable', 'Learning'].map(tag => (
                    <span key={tag} className="value-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="elegant-section projects-section">
        <Container>
          <div className="section-header projects-header">
            <div>
              <span className="section-overline">Portfolio</span>
              <h2 className="section-heading">Featured Projects</h2>
              <p className="section-desc">
                A curated selection of work spanning web applications, AI systems, and creative technology.
              </p>
            </div>
            <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer" className="github-link-elegant">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub
            </a>
          </div>

          <Row className="g-4">
            {projects.map((project, idx) => (
              <Col lg={4} md={6} key={idx}>
                <div 
                  className="project-card-elegant" 
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="project-image-wrapper">
                    <img src={project.images[0]} alt={project.title} className="project-image" />
                    <div className="project-image-overlay"></div>
                    <div className="project-tech-badge">
                      {project.tech[0]}
                    </div>
                    {(project.title.includes('Rental') || project.title.includes('Computer Vision')) && (
                      <div className="ai-badge">
                        AI Powered
                      </div>
                    )}
                    <div className="project-arrow-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 7h10v10M7 17L17 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="project-content">
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-tech-list">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="project-tech-item">{t}</span>
                      ))}
                      {project.tech.length > 3 && <span className="project-tech-more">+{project.tech.length - 3}</span>}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="elegant-section skills-section">
        <Container>
          <div className="section-header">
            <span className="section-overline">Expertise</span>
            <h2 className="section-heading">Technical Proficiency</h2>
            <p className="section-desc">
              A comprehensive toolkit for building scalable applications and intelligent systems.
            </p>
          </div>

          <Row className="g-4">
            {skillCategories.map((category, idx) => (
              <Col lg={6} key={idx}>
                <div className="elegant-card skill-card">
                  <div className="skill-header-elegant">
                    <div className="skill-icon-elegant">
                      {idx === 0 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                          <path d="M3 12a9 3 0 0 0 18 0" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                      )}
                      {idx === 3 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="skill-category-title">{category.title}</h4>
                      <p className="skill-category-desc">
                        {idx === 0 ? 'Immersive & responsive interfaces' : idx === 1 ? 'Scalable logic & secure APIs' : idx === 2 ? 'Intelligent systems & vision' : 'DevOps, design & workflow'}
                      </p>
                    </div>
                  </div>
                  <div className="skill-tags-elegant">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-tag-elegant">{skill}</span>
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- CERTIFICATES SECTION --- */}
      <section id="certificates" className="elegant-section certificates-section">
        <Container>
          <div className="section-header">
            <span className="section-overline">Qualifications</span>
            <h2 className="section-heading">Certified Expertise</h2>
            <p className="section-desc">
              Professional certifications validating technical competency and continuous growth.
            </p>
          </div>

          <Row className="g-4">
            {certificates.map((cert, idx) => (
              <Col lg={4} md={6} key={idx} className="d-flex">
                <div 
                  className="cert-card-elegant w-100"
                  onClick={() => handleCertificateClick(cert)}
                  role="button"
                  tabIndex="0"
                >
                  <div className="cert-image-wrapper-elegant">
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="cert-image-elegant"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="cert-content-elegant">
                    <span className="cert-type">{cert.type}</span>
                    <h4 className="cert-title-elegant">{cert.title}</h4>
                    <div className="cert-meta">
                      <span>{cert.issuer}</span>
                      <span className="cert-meta-dot"></span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="elegant-section contact-section">
        <Container>
          <div className="contact-panel">
            <div className="contact-content">
              <span className="section-overline light">Get in Touch</span>
              <h2 className="contact-heading">
                Let's Build Something
                <br />
                <span className="contact-accent">Remarkable.</span>
              </h2>
              <p className="contact-desc">
                Whether it is an AI-integrated platform, a full-stack application, or an innovative Web3 project, 
                I am ready to bring your vision to life.
              </p>

              <div className="contact-actions">
                <button 
                  onClick={handleCopyEmail}
                  className={`btn-contact-primary ${copied ? 'copied' : ''}`}
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
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Copy Email Address
                    </>
                  )}
                </button>

                <a 
                  href="https://wa.me/6281294743876?text=Hi%20Yoga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-contact-secondary"
                >
                  <FaWhatsapp size={20} />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="contact-socials">
                <a href="https://linkedin.com/in/yoga-utama" target="_blank" rel="noopener noreferrer" className="social-link-elegant">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer" className="social-link-elegant">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="footer-elegant">
            <span className="footer-brand">Yoga Krisna Utama</span>
            <span className="footer-copy">{new Date().getFullYear()} All rights reserved.</span>
          </div>
        </Container>
      </section>

      {/* --- PROJECT MODAL --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" dialogClassName="premium-modal-dialog" contentClassName="premium-modal-content">
        <div className="glass-container">
          <button className="close-trigger" onClick={() => setShowModal(false)} aria-label="Close modal">
            <span className="sr-only">Close modal</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {selectedProject && (
            <div className="pm-layout">
              <div className="pm-media-section">
                <div className="media-wrapper">
                  {selectedProject.video ? (
                    <div className="video-responsive">
                      <VideoPlayer src={selectedProject.video} />
                    </div>
                  ) : selectedProject.images?.length > 0 ? (
                    <>
                      <div className="image-stage">
                        <img 
                          src={selectedProject.images[currentImageIndex]} 
                          alt={`${selectedProject.title} - slide ${currentImageIndex + 1}`}
                          className="carousel-image"
                        />
                        <div className="image-overlay-gradient"></div>
                      </div>
                      {selectedProject.images.length > 1 && (
                        <div className="media-controls">
                          <button 
                            className="nav-arrow left" 
                            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                            aria-label="Previous image"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                          </button>
                          <div className="dots-indicator">
                            {selectedProject.images.map((_, idx) => (
                              <span 
                                key={idx} 
                                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(idx)}
                                role="button"
                                tabIndex="0"
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                          <button 
                            className="nav-arrow right" 
                            onClick={() => setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                            aria-label="Next image"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </>
                  ) : null}
                  <div className="category-pill">
                    {selectedProject.video ? 'Computer Vision' : 'Web Development'}
                  </div>
                </div>
              </div>

              <div className="pm-content-section">
                <div className="content-inner">
                  <header className="pm-header">
                    <h2 className="pm-title">{selectedProject.title}</h2>
                    <p className="pm-desc">{selectedProject.desc}</p>
                  </header>

                  <hr className="pm-divider" />

                  <div className="pm-grid-details">
                    <div className="detail-block">
                      <h4 className="block-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Key Features
                      </h4>
                      <ul className="feature-grid">
                        {['Responsive Design', 'Real-time Processing', 'Secure Architecture', 'Performance Optimized'].map((feat, i) => (
                          <li key={i} className="feature-chip">
                            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-block">
                      <h4 className="block-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}>
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Technology Stack
                      </h4>
                      <div className="tech-flow">
                        {selectedProject.tech?.map((t, i) => (
                          <span key={i} className="tech-badge">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pm-actions">
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-premium primary"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Visit Live Project
                      </a>
                    )}
                    <button className="btn-premium secondary" onClick={() => window.open('https://github.com/Babayaga4523', '_blank')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V21" />
                      </svg>
                      View on GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* --- CERTIFICATE MODAL --- */}
      <Modal show={showCertificateModal} onHide={() => setShowCertificateModal(false)} centered size="lg" contentClassName="certificate-modal-content">
        <div className="certificate-wrapper">
          <button onClick={() => setShowCertificateModal(false)} className="cert-close-btn" aria-label="Close certificate modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="certificate-layout">
            <div className="cert-visual-section">
              {selectedCertificate && (
                <>
                  <div className="cert-image-container">
                    <div className="cert-glow"></div>
                    <img 
                      src={selectedCertificate.image} 
                      alt={selectedCertificate.title} 
                      className="cert-img" 
                    />
                  </div>
                  <div className="cert-actions">
                    <button className="action-pill" onClick={() => window.open(selectedCertificate.image, '_blank')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      View Full Size
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="cert-info-section">
              {selectedCertificate && (
                <>
                  <div className="cert-header">
                    <div className="issuer-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#a78bfa' }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>{selectedCertificate.issuer}</span>
                    </div>
                  </div>

                  <h2 className="cert-title">{selectedCertificate.title}</h2>
                  <p className="cert-desc">{selectedCertificate.description || "Credential verified for proficiency in subject matter."}</p>

                  <div className="cert-meta-grid">
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
                    
                    <div className="meta-item">
                      <div className="meta-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <div className="meta-label">Category</div>
                        <div className="meta-value">{selectedCertificate.type}</div>
                      </div>
                    </div>
                  </div>

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

export default ElegantPortfolio;
