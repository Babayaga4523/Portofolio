import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ModernNavbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function ModernNavbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Auto-detect active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const currentScrollY = window.scrollY + 200;

      sections.forEach((sec) => {
        const element = document.getElementById(sec);
        if (
          element &&
          currentScrollY >= element.offsetTop &&
          currentScrollY < element.offsetTop + element.offsetHeight
        ) {
          setActive(sec.charAt(0).toUpperCase() + sec.slice(1));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const scrollTo = (href) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="modern-navbar">
        <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
          {/* Logo */}
          <button
            className="navbar-logo"
            onClick={() => {
              scrollTo("#home");
              setActive("Home");
            }}
          >
            Yoga Krisna <span className="navbar-logo-dot">●</span>
          </button>

          {/* Nav Links */}
          <ul className="navbar-links">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <button
                  className="navbar-link"
                  onClick={() => {
                    scrollTo(item.href);
                    setActive(item.label);
                  }}
                >
                  <div
                    className={`navbar-link-content ${
                      active === item.label ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className="navbar-cta"
            onClick={() => {
              scrollTo("#contact");
              setActive("Contact");
            }}
          >
            Hire Me →
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="mobile-navbar">
        {/* Logo pill */}
        <div className="mobile-logo-pill">
          <button
            className="mobile-logo"
            onClick={() => {
              scrollTo("#home");
              setActive("Home");
            }}
          >
            Yoga Krisna <span className="navbar-logo-dot">●</span>
          </button>
        </div>

        {/* Spacer */}
        <div className="mobile-spacer" />

        {/* Hamburger button */}
        <button
          className="mobile-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger-line ${menuOpen ? "open-1" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${menuOpen ? "open-2" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${menuOpen ? "open-3" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ul className="mobile-menu-list">
              {NAV_LINKS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    className="mobile-menu-item"
                    onClick={() => {
                      scrollTo(item.href);
                      setActive(item.label);
                      setMenuOpen(false);
                    }}
                  >
                    <div
                      className={`mobile-menu-link ${
                        active === item.label ? "active" : ""
                      }`}
                    >
                      {item.label}
                      {active === item.label && (
                        <span className="mobile-menu-dot" />
                      )}
                    </div>
                  </button>
                </motion.li>
              ))}

              {/* Hire Me button */}
              <li className="mobile-menu-cta-wrapper">
                <button
                  className="mobile-menu-cta"
                  onClick={() => {
                    scrollTo("#contact");
                    setActive("Contact");
                    setMenuOpen(false);
                  }}
                >
                  Hire Me →
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
