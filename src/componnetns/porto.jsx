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

const certificates = [
    {
      title: "Fundamental Networking",
      issuer: "LEPKom UG",
      date: "February 2022"
    },
    {
      title: "Fundamental Desktop Programming",
      issuer: "LEPKom UG",
      date: "August 2022"
    },
    {
      title: "Local Area Network Using Cisco Router",
      issuer: "LEPKom UG",
      date: "February 2023"
    },
    {
      title: "Building Website using HTML5",
      issuer: "LEPKom UG",
      date: "May 2023"
    },
    {
      title: "Java Programming for Beginner",
      issuer: "LEPKom UG",
      date: "August 2023"
    },
    {
      title: "Wide Area Network Using Cisco Router for Intermediate",
      issuer: "LEPKom UG",
      date: "February 2024"
    },
    {
      title: "Java for Intermediate",
      issuer: "LEPKom UG",
      date: "August 2024"
    },
    {
      title: "Non-Fungible Token (NFT) Development in Web3 Era",
      issuer: "MySkill (Kampus Merdeka Program)",
      date: "2024"
    },
    {
      title: "Member Certificate of KPPS",
      issuer: "Presidential and Vice Presidential Election",
      date: "February 2024"
    },
    {
      title: "Figma Tools",
      issuer: "MySkill",
      date: "2024"
    },
    {
      title: "Introduction to Figma",
      issuer: "MySkill",
      date: "2024"
    },
    {
      title: "Introduction to Looker Data Studio",
      issuer: "MySkill",
      date: "2024"
    },
    {
      title: "Internet Introduction",
      issuer: "MySkill",
      date: "2024"
    },
    {
      title: "Building Website Using HTML5",
      issuer: "FIKTI Learning",
      date: "May 2023"
    },
    {
      title: "Data Preparation for Business Processes",
      issuer: "MySkill",
      date: "September 2024"
    },
    {
      title: "Creating Business Intelligence",
      issuer: "MySkill",
      date: "May 2025 (In progress)"
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
          <div className="about-content">
            <div className="about-text">
              <p>
                An enthusiastic and committed 8th-semester Information Systems student from Gunadarma University (GPA: 3.57/4.00), 
                with hands-on experience in software development. Skilled in creating responsive and user-friendly web and mobile 
                applications using modern technologies.
              </p>
              <p>
                Capable of working collaboratively across departments, maintaining well-structured code quality, 
                and efficiently delivering digital projects on time.
              </p>
              <div className="education-info">
                <h4>Education</h4>
                <div className="education-item">
                  <h5>Bachelor of Information Systems</h5>
                  <p>Gunadarma University, 2021 - Present (Expected: 2025)</p>
                  <p>GPA: 3.57/4.00</p>
                </div>
              </div>
            </div>
            <div className="about-skills">
              <h4>Core Competencies</h4>
              <ul>
                <li>Technical Leadership</li>
                <li>Analytical Thinking</li>
                <li>Agile Development</li>
                <li>Quality Assurance</li>
                <li>Client Collaboration</li>
              </ul>
              <h4>Soft Skills</h4>
              <ul>
                <li>Effective Communication</li>
                <li>Team Collaboration</li>
                <li>Time Management</li>
                <li>Creativity</li>
                <li>Empathy</li>
              </ul>
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
              <div className="timeline-date">Feb 2024 - Jun 2024</div>
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
              <div className="timeline-date">Jun 2024 - Present</div>
              <div className="timeline-content">
                <h3>Karang Taruna</h3>
                <p>
                  Active member contributing to youth social initiatives, community service, and event coordination.
                </p>
              </div>
            </div>
            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-date">Jun 2024 - Jun 2024</div>
              <div className="timeline-content">
                <h3>Event Crew – Provalliant</h3>
                <p>
                  Collaborated with the event organizer team at Provalliant to support the planning and execution 
                  of multiple large-scale public events. Handled logistics setup, managed guest reception, ensured 
                  stage and equipment readiness, and provided on-site assistance.
                </p>
              </div>
            </div>
            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-date">Feb 2024</div>
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
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/rental.jpg)' }}></div>
              <div className="project-info">
                <h3>Car Rental Website</h3>
                <p>
                  Developed a car rental website using React.js for the frontend, Node.js and Express.js 
                  for the backend, and integrated a secure payment gateway.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Express</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/Pawon.jpg)' }}></div>
              <div className="project-info">
                <h3>E-Commerce Website for Pavon Sekar Food Store</h3>
                <p>
                  Built a food e-commerce website with product listings, ordering system, and admin dashboard 
                  using PHP and JavaScript.
                </p>
                <div className="project-tech">
                  <span>PHP</span>
                  <span>JavaScript</span>
                  <span>MySQL</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/padang%20benerang.png)' }}></div>
              <div className="project-info">
                <h3>Restaurant Padang Benerang Food Ordering Website</h3>
                <p>
                  Developed a food ordering website for Restaurant Padang Benerang using PHP and other 
                  supporting technologies, allowing customers to view menus and place orders online.
                </p>
                <div className="project-tech">
                  <span>PHP</span>
                  <span>HTML/CSS</span>
                  <span>JavaScript</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/NFT.jpg)' }}></div>
              <div className="project-info">
                <h3>NFT Creation</h3>
                <p>
                  Designed and published Non-Fungible Tokens (NFTs) as part of a Web3 project, including 
                  asset design and deployment on blockchain platforms.
                </p>
                <div className="project-tech">
                  <span>Web3</span>
                  <span>Blockchain</span>
                  <span>NFT</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/porto.png)' }}></div>
              <div className="project-info">
                <h3>Personal Portfolio Website</h3>
                <p>
                  Built using React.js to showcase certificates, personal information, and contact details.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-image" style={{ backgroundImage: 'url(/kodok.jpg)' }}></div>
              <div className="project-info">
                <h3>Generated 2D Animation</h3>
                <p>
                  Developed code-generated 2D animations for interactive visual exploration and experimentation.
                </p>
                <div className="project-tech">
                  <span>JavaScript</span>
                  <span>Canvas</span>
                  <span>Animation</span>
                </div>
              </div>
            </div>
          </div>
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
                  <span>Java</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>JavaScript</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>PHP</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>HTML5/CSS3</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>SQL</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Python</span>
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
                  <span>React.js</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Node.js</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Express.js</span>
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
                  <span>Git/GitHub</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>MySQL</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>VS Code</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Postman</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Laragon</span>
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
                  <span>Blender</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Adobe Illustrator</span>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Figma</span>
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
      <div key={index} className="certificate-card fade-in" style={{ animationDelay: `${index * 0.08}s` }}>
        <div className="certificate-icon">
          <span className="medal-icon">🏅</span>
        </div>
        <div className="certificate-content">
          <h3>{cert.title}</h3>
          <p className="certificate-issuer">{cert.issuer}</p>
          <p className="certificate-date">{cert.date}</p>
        </div>
      </div>
    ))}
  </div>
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