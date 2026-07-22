import React, { useState, useEffect, useRef, useCallback } from 'react';
import './porto.css';
import {
  FaWhatsapp, FaGithub, FaLinkedin, FaPython, FaJs, FaHtml5, FaCss3Alt,
  FaReact, FaNodeJs, FaLaravel, FaPhp, FaDatabase, FaGitAlt, FaBootstrap, FaFigma, FaDocker, FaCloud
} from 'react-icons/fa';
import { SiPostgresql, SiMysql, SiRubyonrails, SiNextdotjs, SiTailwindcss, SiStreamlit } from 'react-icons/si';

/* ── SKILL ICON MAP ─────────────────────────────────────────── */
const getSkillIcon = (name) => {
  const s = { color: '#818CF8', flexShrink: 0, opacity: 0.95, marginRight: '0.4rem' };
  switch (name) {
    case 'React.js': case 'React 19': return <FaReact style={s} />;
    case 'Python': case 'Python (Pandas)': return <FaPython style={s} />;
    case 'JavaScript': case 'TypeScript': return <FaJs style={s} />;
    case 'HTML5': return <FaHtml5 style={s} />;
    case 'CSS3': return <FaCss3Alt style={s} />;
    case 'Node.js': case 'Node.js / Express.js': return <FaNodeJs style={s} />;
    case 'Laravel': return <FaLaravel style={s} />;
    case 'PHP': return <FaPhp style={s} />;
    case 'MySQL': return <SiMysql style={s} />;
    case 'PostgreSQL': return <SiPostgresql style={s} />;
    case 'Ruby on Rails': return <SiRubyonrails style={s} />;
    case 'Next.js': return <SiNextdotjs style={s} />;
    case 'Tailwind CSS': return <SiTailwindcss style={s} />;
    case 'Streamlit': return <SiStreamlit style={s} />;
    case 'Azure AKS': return <FaCloud style={s} />;
    case 'Docker': return <FaDocker style={s} />;
    case 'Git / GitHub': case 'GitHub': return <FaGithub style={s} />;
    case 'Figma': return <FaFigma style={s} />;
    default: return <FaDatabase style={s} />;
  }
};

/* ── SVG ICONS ──────────────────────────────────────────────── */
const IconArrowOutward = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);
const IconX = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSparkles = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
  </svg>
);

/* ── VIDEO PLAYER ──────────────────────────────────────────── */
const VideoPlayer = ({ src }) => (
  <video controls preload="metadata" controlsList="nodownload" className="w-full h-full object-contain bg-black block">
    <source src={src} type="video/mp4" />
  </video>
);

/* ── NATIVE MODAL ──────────────────────────────────────────── */
const NativeModal = ({ show, onClose, children, maxWidth = 960 }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      setClosing(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!show) return;
    const h = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [show, handleClose]);

  if (!show && !closing) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6
                  bg-black/85 transition-opacity duration-200
                  ${closing ? 'opacity-0' : 'opacity-100'}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog" aria-modal="true"
    >
      <div
        className={`relative bg-[#13131F] border border-violet-500/30 rounded-3xl w-full overflow-hidden shadow-2xl
                    transition-all duration-200 transform
                    ${closing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ maxWidth, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full
                     border border-white/15 bg-black/70 text-white/80 hover:text-white hover:bg-violet-600 transition-all duration-200"
        >
          <IconX />
        </button>
        {children}
      </div>
    </div>
  );
};

/* ── INTERSECTION OBSERVER HOOK ────────────────────────────── */
const useReveal = (dep) => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.05 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
};

/* ── ACCURATE CV DATA ───────────────────────────────────────── */
const EXPERIENCES = [
  {
    role: 'Support Engineer',
    company: 'Teleakses Solusindo',
    period: 'Jun 2026 – Present',
    location: 'Jakarta, Indonesia (On-site)',
    type: 'Full-time',
    points: [
      'Berperan sebagai penghubung teknis (technical liaison) antara solusi otomatisasi berbasis AI (chatbot & voicebot) dengan kebutuhan operasional bisnis klien, memastikan SLA terjamin.',
      'Melakukan Root Cause Analysis (RCA) pada database dan infrastruktur jaringan untuk mengidentifikasi akar masalah sistem serta memberikan rekomendasi perbaikan berkelanjutan.',
      'Memantau performa API dan mengelola insiden real-time menggunakan Azure Kubernetes Service (AKS) dan PostgreSQL, memastikan keandalan sistem komunikasi.',
    ]
  },
  {
    role: 'Human Resources Information System Specialist',
    company: 'PT. BNI Multifinance (Human Capital Division)',
    period: 'Des 2025 – Jun 2026',
    location: 'On-site',
    type: 'Internship (Magang Nasional Bersertifikat Kemnaker RI)',
    points: [
      'Menganalisis proses bisnis evaluasi kompetensi divisi HC, merancang & membangun E-Learning & Assessment Platform (SPA berbasis React.js, Inertia.js, PHP, MySQL) dengan workflow enrollment approval bertingkat & dynamic RBAC.',
      'Merancang struktur database relasional untuk mengelola data pelatihan, materi tes, dan hasil performa karyawan secara aman dan konsisten.',
      'Menganalisis proses payroll manual, mengembangkan Payslip Generator (Python/Streamlit) yang mengotomatisasi ekstraksi data Excel/CSV menjadi PDF slip gaji terenkripsi.',
      'Mendokumentasikan alur sistem dan berkoordinasi dengan tim Human Capital untuk memastikan solusi digital sesuai kebutuhan pengguna akhir.',
    ]
  }
];

const PROJECTS = [
  {
    title: 'Opin — Personal Finance Analytics Platform',
    category: 'Finance / AI Analytics',
    desc: 'Membangun sistem deteksi anomali transaksi keuangan berbasis Z-score dengan ambang batas absolut minimum dan model prediksi saldo akhir bulan. Menggunakan fungsi PostgreSQL atomik untuk agregasi transaksi yang diintegrasikan dengan AI Advisor (GPT-4o-mini) untuk insight finansial otomatis.',
    tech: ['PostgreSQL', 'Python', 'AI (GPT-4o-mini)', 'Financial Analytics'],
    images: ['/opin.png'],
    aiPowered: true,
  },
  {
    title: 'Human Capital E-Learning & Assessment Platform',
    category: 'Enterprise / FullStack',
    desc: 'E-learning & assessment platform terintegrasi untuk divisi Human Capital PT BNI Multifinance. Menggunakan React.js, Inertia.js, PHP, dan MySQL dengan skema workflow approval bertingkat, RBAC dinamis, dan sistem anti-cheat assessment.',
    tech: ['React.js', 'Inertia.js', 'PHP', 'Laravel', 'MySQL'],
    images: ['/elearning1.png', '/elearning2.png', '/elearning3.png', '/elearning4.png', '/elearninng5.png', '/elearning6.png'],
  },
  {
    title: 'Point of Sale (POS) System',
    category: 'Business / Laravel',
    desc: 'Sistem POS berbasis Laravel yang merancang skema pelaporan penjualan, produk terlaris, dan performa staf untuk mendukung analisis dan pengambilan keputusan operasional bisnis retail.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Analytics'],
    images: ['/kasir 1.png', '/kasir 2.png', '/kasir 3.png', '/kasir 4.png', '/kasir 5.png', '/kasir 6.png'],
  },
  {
    title: 'Sistem Informasi Penyewaan Mobil (HS Rent Car)',
    category: 'FullStack / AI',
    desc: 'Fitur rekomendasi harga dinamis berbasis permintaan dan tipe kendaraan (React.js & Express.js) yang diintegrasikan dengan chatbot AI untuk dukungan pelanggan 24/7 (Tugas Akhir Sarjana).',
    tech: ['React.js', 'Express.js', 'Node.js', 'AI Chatbot'],
    images: ['/rental hs1.png', '/rental hs2.png', '/rental hs3.png', '/rental hs4.png', '/rental hs5.png', '/rental hs6.png', '/rental hs7.png', '/rental hs8.png', '/rental hs9.png', '/rental hs10.png', '/rental 1.png', '/rental 2.png'],
    link: 'https://rental-hs.vercel.app/',
    aiPowered: true,
  },
  {
    title: 'Kelasku1 — CBT Platform',
    category: 'EduTech / Next.js',
    desc: 'Platform Computer-Based Test (CBT) dengan analisis alur ujian dan penilaian otomatis. Merancang dashboard siswa, admin panel, dan sistem scoring real-time (Next.js, Laravel, MySQL, Laravel Sanctum).',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'MySQL'],
    images: ['/cbt 5.png', '/cbt 6.png', '/cbt 7.png', '/cbt 8.png', '/cbt 9.png', '/cbt 10.png', '/cbt 1.png', '/cbt 2.png', '/cbt 3.png', '/cbt 4.png', '/cbt 11.png', '/cbt 12.png', '/cbt 13.png'],
    link: 'https://kelasku-frontend.vercel.app/',
  },
  {
    title: 'Resto & Pawon — Restaurant System',
    category: 'Business / FullStack',
    desc: 'Sistem informasi manajemen pemesanan restoran, inventaris bahan baku, dan kasir interaktif untuk operasional kuliner.',
    tech: ['React.js', 'PHP', 'MySQL', 'Order System'],
    images: ['/resto 1.png', '/resto 2.png', '/resto 3.png', '/resto 4.png', '/resto 5.png', '/Pawon.jpg'],
  },
  {
    title: 'Movieku — Entertainment Portal',
    category: 'Web / API Integration',
    desc: 'Portal informasi film dan tayangan hiburan interaktif yang terintegrasi dengan TMDB API untuk eksplorasi sinematik real-time.',
    tech: ['React.js', 'TMDB API', 'Tailwind CSS'],
    images: ['/movieku.png'],
  },
  {
    title: 'Web3 NFT Platform',
    category: 'Web3 / Blockchain',
    desc: 'Platform ekosistem NFT dan Smart Contracts yang dibangun dalam program MSIB Kampus Merdeka Angkatan 6 (MySkill).',
    tech: ['React.js', 'Solidity', 'Web3.js', 'Smart Contracts'],
    images: ['/NFT.jpg'],
  },
  {
    title: 'Multi-Feature Computer Vision Application',
    category: 'AI / Vision',
    desc: 'Aplikasi desktop Python dengan modul OpenCV & YOLO real-time: Face, Emotion, Pose, Gesture, dan YOLO Object Detection.',
    tech: ['Python', 'OpenCV', 'YOLO', 'Face Detection'],
    images: ['/ml.png'],
    video: '/cv_demo.mp4',
    aiPowered: true,
  },
];

const ALL_SKILLS = [
  'SQL', 'PostgreSQL', 'MySQL', 'Python (Pandas)', 'Excel', 'Prisma ORM',
  'Next.js', 'React.js', 'Laravel', 'TypeScript', 'Node.js / Express.js',
  'Ruby on Rails', 'Streamlit', 'Tailwind CSS', 'Docker', 'Azure AKS',
  'Jenkins CI/CD', 'Git / GitHub', 'Postman', 'Figma',
];

const CERTIFICATES = [
  { title: 'Sertifikat Kompetensi Okupasi Data Analyst (BNSP)', issuer: 'BNSP / LSP Universitas Gunadarma', date: 'Valid until Sep 2028', image: '/certificates/sertifikat_data_analyst.png', pdf: '/certificates/sertifikat data_analyst (1)_compressed.pdf', description: 'Sertifikat Kompetensi Nasional BNSP bidang Komputer Okupasi Data Analyst. Unit kompetensi: Pengolahan Data, Validasi Data, & Penyusunan Laporan Analisis.', type: 'BNSP Certified' },
  { title: 'Program Magang Nasional Bersertifikat', issuer: 'Kementerian Ketenagakerjaan RI / PT BNI Multifinance', date: 'Des 2025 – Jun 2026', image: '/certificates/sertifikat_maganghub.png', pdf: '/certificates/sertifikat maganghub (1).pdf', description: 'Sertifikat Resmi Magang Nasional Kemnaker RI di PT BNI Multifinance (Human Capital Division).', type: 'Kemnaker RI' },
  { title: 'MSIB Kampus Merdeka Angkatan 6', issuer: 'Kemendikbudristek RI / MySkill (Future Skill)', date: 'Feb – Jun 2024', image: '/certificates/studi independent.png', description: 'Studi Independen Bersertifikat MSIB Kemendikbudristek: NFT Development in Web3 Era & Future Skills.', type: 'Kemendikbudristek' },
  { title: 'Creating Business Intelligence', issuer: 'Universitas Gunadarma', date: '2025', image: '/certificates/Creating Business Intelligence.png', description: 'Perancangan Business Intelligence, analisis data, dan penyusunan dashboard keputusan operasional.', type: 'Analytics' },
  { title: 'Data Preparation for Business Processes', issuer: 'Universitas Gunadarma', date: '2024', image: '/certificates/Data Preparation for Business Processes.png', description: 'Teknik pengolahan dan validasi data bisnis untuk optimasi proses operasional.', type: 'Data' },
  { title: 'Introduction to Looker Data Studio', issuer: 'MySkill', date: '2023', image: '/certificates/introduction looker studio.png', description: 'Visualisasi data bisnis dan pembuatan laporan interaktif Looker Studio.', type: 'Analytics' },
  { title: 'Figma Fundamentals & Advanced Tools (UI/UX)', issuer: 'MySkill', date: '2023', image: '/certificates/introduction figma.png', description: 'Perancangan UI/UX, wireframing, dan prototyping sistem aplikasi.', type: 'Design' },
  { title: 'Learn SQL', issuer: 'Codecademy', date: '2023', image: '/certificates/Aptitude Test.png', description: 'Sertifikasi manipulasi database relasional dan penguerian SQL tingkat mahir.', type: 'Database' },
];

const NAV_LINKS = [
  { label: 'Experience', href: 'experience' },
  { label: 'Projects',   href: 'projects'   },
  { label: 'Skills',     href: 'skills'     },
  { label: 'About',      href: 'about'      },
  { label: 'Credentials',href: 'certificates'},
  { label: 'Contact',    href: 'contact'    },
];

const SKILLS_ROW_1 = ALL_SKILLS.slice(0, Math.ceil(ALL_SKILLS.length / 2));
const SKILLS_ROW_2 = ALL_SKILLS.slice(Math.ceil(ALL_SKILLS.length / 2));

/* ══════════════════════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT — SYNCHRONIZED WITH ACCURATE CV DATA
══════════════════════════════════════════════════════════════ */
const Portofolio = () => {
  const [activeSection, setActiveSection]     = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal]             = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertModal, setShowCertModal]     = useState(false);
  const [copied, setCopied]                   = useState(false);
  const [activeFilter, setActiveFilter]       = useState('All');
  const certContainerRef = useRef(null);

  useReveal(activeFilter);

  /* ── rAF Scroll Listener ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY + 120;
        for (const id of ['home','experience','projects','skills','about','certificates','contact']) {
          const el = document.getElementById(id);
          if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
            setActiveSection(id); break;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = () => setMobileMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

  /* ── Handlers ── */
  const scrollTo = useCallback((id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project); setCurrentImageIndex(0); setShowModal(true);
  }, []);

  const handleCertificateClick = useCallback((cert) => {
    setSelectedCertificate(cert); setShowCertModal(true);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText('yogacode86@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/CV_Yoga_Krisna_Utama.pdf';
    link.download = 'CV_Yoga Krisna Utama.pdf';
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  }, []);

  const scrollCertificates = useCallback((dir) => {
    const c = certContainerRef.current;
    if (!c) return;
    c.scrollLeft += dir === 'left' ? -(c.clientWidth * 0.8) : c.clientWidth * 0.8;
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">

      {/* Ambient Radial Backgrounds */}
      <div className="mesh-orb-violet top-0 left-1/4 -translate-x-1/2" />
      <div className="mesh-orb-pink top-1/3 right-0" />

      {/* ════════════════════ NAVBAR ════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-[1000] border-b border-white/10 bg-[#0B0F19]/95 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-16 gap-6">

          {/* Brand */}
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}
             className="flex items-center gap-2.5 font-display text-[1.1875rem] font-black tracking-tight text-white no-underline group">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
            <span className="text-gradient-creative">YOGA KRISNA UTAMA</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={`#${l.href}`}
                 onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                 className={`text-[0.875rem] font-semibold transition-all duration-200 no-underline ${activeSection === l.href ? 'text-purple-400 font-bold' : 'text-white/60 hover:text-white'}`}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Resume CTA */}
          <button onClick={handleDownloadCV} aria-label="Download Resume"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full
                             border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[0.875rem] font-semibold
                             hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all duration-200 cursor-pointer">
            <IconDownload /> Download CV
          </button>

          {/* Mobile Hamburger */}
          <button className="lg:hidden flex flex-col gap-[5px] bg-transparent border-0 cursor-pointer p-2 z-10"
                  onClick={() => setMobileMenuOpen(o => !o)}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}>
            {[0,1,2].map(i => (
              <span key={i} className="block w-[22px] h-[2px] bg-white rounded transition-all duration-250" style={{
                transform: i === 0 && mobileMenuOpen ? 'rotate(45deg) translate(5px,5px)'
                         : i === 2 && mobileMenuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: i === 1 && mobileMenuOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div className={`lg:hidden flex flex-col border-t border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
             style={{ background: 'rgba(10,10,15,0.98)' }}
             aria-hidden={!mobileMenuOpen}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={`#${l.href}`}
               onClick={e => { e.preventDefault(); scrollTo(l.href); }}
               className="block px-6 py-3.5 text-[0.9375rem] font-medium text-white/70 border-b border-white/5
                          hover:text-white hover:bg-white/5 transition-all duration-150 no-underline">
              {l.label}
            </a>
          ))}
          <button onClick={handleDownloadCV}
                  className="text-left px-6 py-4 text-[0.9375rem] font-semibold text-purple-400 bg-transparent border-0 cursor-pointer w-full
                             hover:bg-white/5 transition-all duration-150">
            Download CV (PDF)
          </button>
        </div>
      </header>

      <main className="pt-16">

        {/* ════════════════════ HERO SECTION ════════════════════ */}
        <section id="home" className="relative flex flex-col justify-center pt-4 pb-10 md:pt-6 md:pb-14 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">

                {/* Name & Role Headline */}
                <h1 className="font-display font-black text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] tracking-[-0.03em] mb-4">
                  <span className="text-gradient-creative block">
                    Business &amp; System Analyst
                  </span>
                  <span className="block text-[clamp(1.1875rem,2.2vw,1.875rem)] font-bold text-white/70 tracking-tight mt-2">
                    Full-Stack Development &amp; System Architecture Background
                  </span>
                </h1>

                {/* Subtitle / Summary */}
                <p className="text-[1rem] md:text-[1.0625rem] leading-relaxed text-white/70 max-w-[620px] mb-6 font-normal">
                  Information Systems graduate (S1 Gunadarma) experienced in translating business requirements into functional digital systems — from process analysis, ERD &amp; relational database modeling (PostgreSQL/MySQL), to end-to-end full-stack development &amp; AI automation.
                </p>

                {/* Hero CTA Buttons */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600
                                     text-white font-bold text-[0.9375rem] shadow-[0_0_25px_rgba(168,85,247,0.4)]
                                     hover:scale-105 transition-all duration-200 border-0 cursor-pointer"
                          onClick={() => scrollTo('contact')}>
                    Contact Me
                  </button>
                  <button className="px-7 py-3 rounded-full bg-white/5 text-white font-semibold text-[0.9375rem]
                                     border border-white/15 hover:border-purple-400 hover:bg-purple-500/15 hover:text-purple-300
                                     transition-all duration-200 cursor-pointer"
                          onClick={() => scrollTo('experience')}>
                    View Experience ↘
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Showcase Frame (5 cols) */}
              <div className="lg:col-span-5 flex justify-center w-full">
                <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/40 bg-[#161622] max-w-[380px] lg:max-w-[400px] w-full h-[400px] sm:h-[440px] group shadow-[0_0_50px_rgba(139,92,246,0.25)]">
                  
                  {/* Photo Layer with perfect center cropping */}
                  <img src="/yoga.jpg" alt="Yoga Krisna Utama"
                       loading="eager" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-black/20 to-transparent opacity-85" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.75rem] font-bold text-emerald-300 bg-black/80 border border-emerald-500/40 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      BNSP Certified
                    </span>
                  </div>

                  {/* Bottom Floating Info Card */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#12121D]/95 border border-purple-500/30 shadow-xl flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display font-black text-white text-[0.9375rem] leading-tight">Yoga Krisna Utama, S.Kom</div>
                      <div className="text-[0.75rem] font-semibold text-purple-400 mt-0.5">Business &amp; System Analyst</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[0.6875rem] font-bold text-white/50 uppercase">GPA</div>
                      <div className="font-display font-black text-purple-300 text-[1rem]">3.60 / 4.00</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Core Competencies Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { label: 'Core Competency', number: 'Business Analysis', desc: 'Process Analysis & Requirement Gathering', isText: true },
                { label: 'Technical Depth', number: 'System Architecture', desc: 'ERD, Relational DB (SQL/Postgres/MySQL)', isText: true },
                { label: 'Certifications', number: 'BNSP Certified', desc: 'Data Analyst & Predikat Pujian', isText: true },
              ].map((s, i) => (
                <div key={i} className="creative-glass-card p-5 rounded-2xl transition-all duration-250 group">
                  <span className="block text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-1">{s.label}</span>
                  <span className="block font-display font-bold text-white tracking-tight leading-snug mb-1 text-[1.25rem] group-hover:text-purple-300 transition-colors">
                    {s.number}
                  </span>
                  <span className="block text-[0.8125rem] text-white/50">{s.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════ PROFESSIONAL EXPERIENCE SECTION ════════════════════ */}
        <section id="experience" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="reveal mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                               text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                Career History
              </span>
              <h2 className="font-display font-black text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white">
                Professional Experience
              </h2>
            </div>

            {/* Timeline List */}
            <div className="flex flex-col gap-8">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="creative-glass-card p-8 rounded-3xl reveal flex flex-col gap-4">
                  <div className="flex items-start justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[0.75rem] font-bold text-purple-300 uppercase tracking-wider mb-2">
                        {exp.type}
                      </span>
                      <h3 className="font-display font-black text-[1.375rem] text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-[1rem] font-semibold text-purple-400 mt-1">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-right sm:text-right text-left">
                      <div className="text-[0.875rem] font-bold text-white/90 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {exp.period}
                      </div>
                      <div className="text-[0.8125rem] text-white/50 mt-1">
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-[0.9375rem] text-white/70 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════ SELECTED PROJECTS SECTION ════════════════════ */}
        <section id="projects" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">

            {/* Header */}
            <header className="reveal text-center max-w-[680px] mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                               text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                Portfolio Showcase
              </span>
              <h2 className="font-display font-black text-[clamp(2.25rem,4.5vw,3.5rem)] tracking-tight text-white mb-4">
                Selected Projects
              </h2>
              <p className="text-[1.0625rem] text-white/60 leading-relaxed mb-6">
                Real-world platforms and applications built across Business Analysis, Full-Stack Development, and AI Analytics.
              </p>
              <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full
                            border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[0.875rem] font-semibold no-underline
                            hover:bg-purple-600 hover:text-white transition-all duration-200">
                <FaGithub size={15} /> View GitHub Profile
              </a>
            </header>

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2.5 flex-wrap mb-12 reveal">
              {[
                { id: 'All', label: 'All Projects' },
                { id: 'FullStack', label: 'FullStack & Web' },
                { id: 'AI', label: 'AI & Analytics' },
                { id: 'Tools', label: 'Automation & Tools' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2 rounded-full text-[0.875rem] font-semibold transition-all duration-200 cursor-pointer border-0
                             ${activeFilter === tab.id
                               ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                               : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:bg-white/10'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FLAGSHIP SPOTLIGHT SHOWCASE (Project #01: Opin Analytics) */}
            {(activeFilter === 'All' || activeFilter === 'AI') && (
              <div className="mb-12 reveal">
                <div className="rounded-3xl bg-gradient-to-b from-[#181826] to-[#12121D] border border-purple-500/40
                                overflow-hidden group cursor-pointer"
                     onClick={() => handleProjectClick(PROJECTS[0])}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    
                    {/* Left Thumbnail */}
                    <div className="lg:col-span-7 relative overflow-hidden aspect-[16/10] bg-[#1a1a24]">
                      <img src={PROJECTS[0].images[0]} alt={PROJECTS[0].title}
                           loading="lazy"
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                        <span className="px-3.5 py-1.5 rounded-full text-[0.75rem] font-black text-white bg-gradient-to-r from-purple-600 to-fuchsia-600">
                          ★ FEATURED ANALYTICS SYSTEM
                        </span>
                        <span className="px-3 py-1 rounded-full text-[0.75rem] font-semibold text-purple-300 bg-black/80 border border-purple-500/30">
                          {PROJECTS[0].category}
                        </span>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between h-full gap-6">
                      <div>
                        <div className="flex items-center gap-2 text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                          Finance Analytics #01
                        </div>
                        <h3 className="font-display font-black text-[1.5rem] text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors mb-4">
                          {PROJECTS[0].title}
                        </h3>
                        <p className="text-[0.9375rem] text-white/70 leading-relaxed mb-6">
                          {PROJECTS[0].desc}
                        </p>

                        <div className="flex flex-col gap-2.5 mb-6">
                          {['Sistem Deteksi Anomali Transaksi (Z-score Model)', 'Fungsi PostgreSQL Atomik untuk Agregasi Data', 'Integrasi AI Advisor (GPT-4o-mini) Insight'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-[0.875rem] text-white/80">
                              <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 text-[10px] font-bold">✓</span>
                              {feat}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                          {PROJECTS[0].tech.map((t, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[0.75rem] font-semibold text-purple-300">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                          Explore System Details <IconArrowOutward />
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PROJECTS.filter((p, originalIdx) => {
                const cat = p.category.toLowerCase();
                if (activeFilter === 'All') return originalIdx !== 0;
                if (activeFilter === 'FullStack') return cat.includes('fullstack') || cat.includes('laravel') || cat.includes('next.js') || cat.includes('backend') || cat.includes('edutech') || cat.includes('enterprise') || cat.includes('business') || cat.includes('web');
                if (activeFilter === 'AI') return cat.includes('ai') || cat.includes('vision') || cat.includes('analytics') || p.aiPowered === true;
                if (activeFilter === 'Tools') return cat.includes('automation') || cat.includes('python') || cat.includes('barcode') || cat.includes('tool') || cat.includes('web3');
                return true;
              }).map((project, idx) => (
                <div key={idx}
                     className="rounded-3xl creative-glass-card
                                overflow-hidden cursor-pointer group h-full flex flex-col justify-between
                                transition-all duration-300 reveal"
                     onClick={() => handleProjectClick(project)}
                     role="button" tabIndex={0}
                     aria-label={`View ${project.title}`}
                     onKeyDown={e => e.key === 'Enter' && handleProjectClick(project)}>

                  {/* Thumbnail */}
                  <div className="relative overflow-hidden bg-[#181824] aspect-[16/10] w-full flex-shrink-0">
                    <img src={project.images[0]} alt={`${project.title} screenshot`}
                         loading="lazy"
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[0.6875rem] font-bold text-white/70 bg-black/80 border border-white/10">
                        #{String(idx + 2).padStart(2, '0')}
                      </span>
                      {project.aiPowered && (
                        <span className="px-3 py-1 rounded-full text-[0.75rem] font-semibold text-purple-300
                                         bg-black/85 border border-purple-500/40">
                          ✦ AI Powered
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-2">
                        {project.category}
                      </div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display font-bold text-[1.1875rem] text-white tracking-tight leading-snug group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-white/40 group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 flex-shrink-0 mt-1">
                          <IconArrowOutward />
                        </span>
                      </div>
                      <p className="text-[0.875rem] text-white/60 leading-relaxed line-clamp-3">
                        {project.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                      {project.tech.map((t, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full
                                                  bg-white/5 border border-white/10
                                                  text-[0.75rem] font-medium text-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════ SKILLS SECTION ════════════════════ */}
        <section id="skills" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="reveal mb-12 text-center max-w-[640px] mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                               text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                Technical Stack
              </span>
              <h2 className="font-display font-black text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-3">
                Technical Competencies
              </h2>
              <p className="text-[0.9375rem] text-white/60 leading-relaxed">
                Categorized technical stack matching CV specifications across Database &amp; Analysis, System Development, and Infrastructure.
              </p>
            </div>

            {/* Categorized 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal">
              {[
                {
                  title: 'Database & Analysis',
                  badge: 'Data & Modeling',
                  skills: ['SQL', 'PostgreSQL', 'MySQL', 'Python (Pandas)', 'Excel', 'Prisma ORM'],
                },
                {
                  title: 'System Development',
                  badge: 'Full-Stack & Web',
                  skills: ['Next.js', 'React.js', 'Laravel', 'TypeScript', 'Node.js / Express.js', 'Inertia.js', 'Streamlit', 'Ruby on Rails'],
                },
                {
                  title: 'Infrastructure & Tools',
                  badge: 'DevOps & Design',
                  skills: ['Docker', 'Azure AKS', 'Jenkins CI/CD', 'Git / GitHub', 'Postman', 'Figma'],
                },
              ].map((cat, i) => (
                <div key={i} className="creative-glass-card p-6 rounded-3xl flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[0.75rem] font-bold text-purple-300 mb-3">
                      {cat.badge}
                    </span>
                    <h3 className="font-display font-bold text-[1.1875rem] text-white tracking-tight mb-4">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                                  bg-white/5 border border-white/10 text-[0.8125rem] font-semibold text-white/90">
                          {getSkillIcon(s)}{s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Marquee Accent */}
            <div className="rounded-3xl creative-glass-card p-6 overflow-hidden reveal">
              <div className="flex flex-col gap-3 overflow-hidden marquee-mask marquee-container py-1">
                <div className="flex gap-4 w-max animate-marquee-left">
                  {[...SKILLS_ROW_1, ...SKILLS_ROW_1].map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                             bg-white/5 border border-white/10 text-[0.875rem] font-semibold text-white/80">
                      {getSkillIcon(skill)}{skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 w-max animate-marquee-right" aria-hidden="true">
                  {[...SKILLS_ROW_2, ...SKILLS_ROW_2].map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                             bg-white/5 border border-white/10 text-[0.875rem] font-semibold text-white/80">
                      {getSkillIcon(skill)}{skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════ ABOUT & EDUCATION SECTION ════════════════════ */}
        <section id="about" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">

            <div className="reveal mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                               text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                Background &amp; Profile
              </span>
              <h2 className="font-display font-black text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white">
                About &amp; Education
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-6">

              {/* Summary */}
              <div className="col-span-12 lg:col-span-8 rounded-3xl creative-glass-card p-8 reveal flex flex-col justify-center">
                <h3 className="font-display font-black text-[1.375rem] text-white tracking-tight mb-4">
                  Professional Summary
                </h3>
                <p className="text-[1rem] text-white/70 leading-relaxed mb-4">
                  Information Systems graduate (GPA 3.60/4.00, Predikat Pujian) dan BNSP-Certified Data Analyst dengan latar belakang teknis kuat di full-stack development dan sistem HR/Finance. Terbiasa menerjemahkan kebutuhan bisnis menjadi solusi sistem yang fungsional — mulai dari analisis proses, pengolahan dan validasi data, perancangan database relasional, hingga dokumentasi requirement dan workflow approval.
                </p>
                <p className="text-[1rem] text-white/70 leading-relaxed">
                  Memiliki pengalaman langsung melakukan Root Cause Analysis (RCA), troubleshooting sistem, dan menyusun laporan analisis berbasis data untuk mendukung pengambilan keputusan operasional. Mencari peran Business Analyst / System Analyst untuk menjembatani kebutuhan bisnis dengan solusi teknologi yang tepat guna.
                </p>
              </div>

              {/* Education Box */}
              <div className="col-span-12 lg:col-span-4 rounded-3xl creative-glass-card p-8 reveal reveal-delay-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[0.75rem] font-bold text-purple-300 mb-3">
                    Formal Education
                  </span>
                  <h4 className="font-display font-black text-[1.25rem] text-white tracking-tight mb-1">
                    Bachelor of Information Systems
                  </h4>
                  <div className="text-[0.9375rem] font-semibold text-purple-400 mb-3">
                    Universitas Gunadarma (2021 – Sep 2025)
                  </div>
                  <p className="text-[0.875rem] text-white/70 leading-relaxed">
                    <strong>GPA 3.60 / 4.00 (Predikat Pujian)</strong> — Akreditasi Unggul.
                  </p>
                  <p className="text-[0.8125rem] text-white/50 mt-2">
                    Tugas Akhir: Pengembangan Sistem Informasi Penyewaan Mobil Berbasis Point of Sale menggunakan React.js dan Express.js.
                  </p>
                </div>
              </div>

              {/* Core Competencies Checklist */}
              <div className="col-span-12 rounded-3xl creative-glass-card p-8 reveal">
                <h4 className="font-display font-black text-[1.25rem] text-white tracking-tight mb-4">
                  Core Competencies &amp; Technical Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Business Process Analysis & Requirement Gathering',
                    'System Design & Relational Database Modeling (ERD, Prisma, MySQL/PostgreSQL)',
                    'Root Cause Analysis (RCA) & Technical Troubleshooting',
                    'Data Analysis & Reporting (SQL, Python/Pandas, Excel)',
                    'Stakeholder Communication & Technical Documentation',
                    'SDLC Exposure: Requirement → Design → Development → Testing → Deployment (Agile/CI-CD)'
                  ].map((comp, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-[0.875rem] text-white/80">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════ CERTIFICATIONS SECTION ════════════════════ */}
        <section id="certificates" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">

            <div className="reveal mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                               text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                Professional Credentials
              </span>
              <h2 className="font-display font-black text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white">
                Certifications &amp; Certified Programs
              </h2>
            </div>

            <div className="reveal">
              <div ref={certContainerRef}
                   className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                   style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {CERTIFICATES.map((cert, idx) => (
                  <div key={idx}
                       className="flex-none w-[calc(100%-1.5rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1rem)] min-w-[280px]"
                       style={{ scrollSnapAlign: 'start' }}>
                    <div className="rounded-3xl creative-glass-card overflow-hidden cursor-pointer group h-full
                                    transition-all duration-300"
                         onClick={() => handleCertificateClick(cert)}
                         role="button" tabIndex={0}
                         aria-label={`View ${cert.title}`}
                         onKeyDown={e => e.key === 'Enter' && handleCertificateClick(cert)}>
                      <div className="h-44 overflow-hidden bg-[#181824]">
                        <img src={cert.image} alt={cert.title} loading="lazy"
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                             onError={e => { e.target.style.display='none'; }} />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25
                                         text-[0.75rem] font-bold text-purple-300 uppercase tracking-wider mb-3">
                          {cert.type}
                        </span>
                        <h4 className="font-display font-bold text-[1rem] text-white tracking-tight leading-snug mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                          {cert.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[0.8125rem] text-white/50 flex-wrap">
                          <span>{cert.issuer}</span>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-8">
                {['left', 'right'].map(dir => (
                  <button key={dir} onClick={() => scrollCertificates(dir)}
                          aria-label={`${dir === 'left' ? 'Previous' : 'Next'} certificates`}
                          className="flex items-center justify-center w-12 h-12 rounded-full
                                     border border-purple-500/30 bg-purple-500/10 text-purple-300
                                     hover:bg-purple-600 hover:text-white transition-all duration-200 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {dir === 'left'
                        ? <polyline points="15 18 9 12 15 6" />
                        : <polyline points="9 18 15 12 9 6" />}
                    </svg>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════ CONTACT SECTION ════════════════════ */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="max-w-[1280px] mx-auto px-6">
            
            <div className="rounded-3xl bg-gradient-to-b from-[#181828] to-[#12121C] border border-purple-500/40 p-8 sm:p-14 relative overflow-hidden reveal">
              <div className="mesh-orb-violet top-0 right-0" />

              <div className="relative z-10 max-w-[640px]">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25
                                 text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-4">
                  Get in Touch
                </span>
                <h3 className="font-display font-black text-[clamp(2.25rem,4.5vw,3.5rem)] text-white tracking-tight leading-tight mb-4">
                  Let's Connect &amp; <em className="not-italic text-gradient-creative">Collaborate.</em>
                </h3>
                <p className="text-[1.0625rem] text-white/70 leading-relaxed mb-8">
                  Open for Business Analyst, System Analyst, Full-Stack Development, and Data Analytics positions.
                </p>

                <div className="flex gap-4 flex-wrap mb-8">
                  <button onClick={handleCopyEmail}
                          className={`px-8 py-3.5 rounded-full font-bold text-[0.9375rem] transition-all duration-200 cursor-pointer border-0
                                      inline-flex items-center gap-2.5
                                      ${copied
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105'}`}>
                    {copied ? <><IconCheck /> Email Copied (yogacode86@gmail.com)!</> : <><IconMail /> yogacode86@gmail.com</>}
                  </button>
                  <a href="https://wa.me/6281294743876?text=Hi%20Yoga" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                                bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[0.9375rem] no-underline
                                hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-200">
                    <FaWhatsapp size={16} /> +62 812-9474-3876
                  </a>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {[
                    { href: 'https://linkedin.com/in/yoga-utama', label: 'LinkedIn Profile', icon: <FaLinkedin size={16} /> },
                    { href: 'https://github.com/Babayaga4523', label: 'GitHub Repository', icon: <FaGithub size={16} /> },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full no-underline
                                  border border-white/15 bg-white/5 text-white/80 text-[0.875rem] font-semibold
                                  hover:border-purple-400 hover:text-purple-300 transition-all duration-200">
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between flex-wrap gap-6">
          <div className="font-display font-black text-[1.0625rem] text-gradient-creative">YOGA KRISNA UTAMA</div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer"
               className="text-[0.875rem] text-white/50 no-underline hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yoga-utama" target="_blank" rel="noopener noreferrer"
               className="text-[0.875rem] text-white/50 no-underline hover:text-white transition-colors">
              LinkedIn
            </a>
            <button onClick={handleCopyEmail}
                    className="text-[0.875rem] text-white/50 bg-transparent border-0 cursor-pointer p-0 hover:text-white transition-colors">
              Email
            </button>
          </div>
          <div className="text-[0.8125rem] text-white/40">
            © {new Date().getFullYear()} Yoga Krisna Utama. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ════════════════════ PROJECT MODAL (REDESIGNED) ════════════════════ */}
      <NativeModal show={showModal} onClose={() => setShowModal(false)} maxWidth={1040}>
        {selectedProject && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 overflow-hidden bg-[#10101A]" style={{ maxHeight: '90vh' }}>
            
            {/* Left/Top Media Stage (7 cols) */}
            <div className="lg:col-span-7 bg-[#07070D] flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* Media Display Area */}
              <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center bg-[#07070D] overflow-hidden">
                {selectedProject.video ? (
                  <div className="w-full h-full">
                    <VideoPlayer src={selectedProject.video} />
                  </div>
                ) : (
                  <>
                    <img src={selectedProject.images[currentImageIndex]}
                         alt={`${selectedProject.title} preview ${currentImageIndex + 1}`}
                         className="w-full h-full object-contain p-2 transition-all duration-300" />

                    {/* Nav Prev/Next Glass Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button onClick={() => setCurrentImageIndex(p => p === 0 ? selectedProject.images.length - 1 : p - 1)}
                                aria-label="Previous Image"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                                           bg-black/70 border border-white/20 text-white backdrop-blur-md
                                           flex items-center justify-center hover:bg-purple-600 hover:border-purple-400
                                           transition-all duration-200 cursor-pointer z-10 shadow-lg">
                          ‹
                        </button>
                        <button onClick={() => setCurrentImageIndex(p => p === selectedProject.images.length - 1 ? 0 : p + 1)}
                                aria-label="Next Image"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                                           bg-black/70 border border-white/20 text-white backdrop-blur-md
                                           flex items-center justify-center hover:bg-purple-600 hover:border-purple-400
                                           transition-all duration-200 cursor-pointer z-10 shadow-lg">
                          ›
                        </button>
                      </>
                    )}
                  </>
                )}

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[0.75rem] font-bold text-purple-300
                                   bg-black/85 border border-purple-500/40 backdrop-blur-md shadow-md">
                    {selectedProject.category}
                  </span>
                  {selectedProject.aiPowered && (
                    <span className="px-3 py-1 rounded-full text-[0.75rem] font-bold text-fuchsia-300
                                     bg-black/85 border border-fuchsia-500/40 backdrop-blur-md shadow-md">
                      ✦ AI System
                    </span>
                  )}
                </div>

                {/* Image Counter Badge */}
                {!selectedProject.video && selectedProject.images.length > 1 && (
                  <div className="absolute top-4 right-14 z-10">
                    <span className="px-3 py-1 rounded-full text-[0.75rem] font-semibold text-white/80
                                     bg-black/80 border border-white/15 backdrop-blur-md">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Thumbnail Strip */}
              {!selectedProject.video && selectedProject.images.length > 1 && (
                <div className="p-3 bg-[#0A0A12] border-t border-white/10 overflow-x-auto flex items-center gap-2 scrollbar-thin">
                  {selectedProject.images.map((imgSrc, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                            aria-label={`Select screenshot ${idx + 1}`}
                            className={`relative h-14 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 cursor-pointer bg-[#14141F]
                                       ${idx === currentImageIndex ? 'border-purple-500 scale-105 shadow-[0_0_12px_rgba(168,85,247,0.5)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}>
                      <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Right/Bottom Content Details Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto" style={{ maxHeight: '90vh' }}>
              <div className="space-y-6">
                
                {/* Title */}
                <div>
                  <h2 className="font-display font-black text-[1.375rem] sm:text-[1.625rem] text-white tracking-tight leading-snug mb-3">
                    {selectedProject.title}
                  </h2>
                  <p className="text-[0.9375rem] text-white/70 leading-relaxed font-normal">
                    {selectedProject.desc}
                  </p>
                </div>

                <hr className="border-white/10" />

                {/* Tech Stack */}
                <div>
                  <div className="text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                    Technologies Used
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech?.map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[0.8125rem] font-semibold text-purple-300">
                        {getSkillIcon(t)}{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Architecture Highlights */}
                <div>
                  <div className="text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest mb-3">
                    Key Deliverables &amp; Features
                  </div>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {[
                      'Relational Database Modeling & Optimization',
                      'Role-Based Access Control (RBAC) & Workflow Approval',
                      'Interactive Data Analytics & Reporting Module',
                      'Performance Optimized & Responsive UI Interface'
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[0.875rem] text-white/80 font-medium">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-[0.75rem] font-bold flex-shrink-0">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action CTA Buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl no-underline
                                bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[0.875rem] font-bold
                                shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-200">
                    Visit Live Project ↗
                  </a>
                )}
                <a href="https://github.com/Babayaga4523" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl no-underline
                              border border-white/15 bg-white/5 text-white text-[0.875rem] font-semibold
                              hover:border-purple-400 hover:bg-purple-500/15 transition-all duration-200">
                  <FaGithub size={16} /> Source Code
                </a>
              </div>

            </div>

          </div>
        )}
      </NativeModal>

      {/* ════════════════════ CERTIFICATE MODAL ════════════════════ */}
      <NativeModal show={showCertModal} onClose={() => setShowCertModal(false)} maxWidth={680}>
        {selectedCertificate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden" style={{ maxHeight: '90vh' }}>
            <div className="bg-[#181824] flex flex-col justify-between overflow-hidden p-4">
              <div className="relative flex-1 overflow-hidden rounded-xl">
                <img src={selectedCertificate.image} alt={selectedCertificate.title}
                     className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="pt-4">
                <a href={selectedCertificate.pdf || selectedCertificate.image}
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl no-underline
                              bg-purple-500/15 border border-purple-500/30 text-[0.8125rem] font-bold text-purple-300
                              hover:bg-purple-600 hover:text-white transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {selectedCertificate.pdf ? 'View Full Certificate (PDF)' : 'Verify Credential'}
                </a>
              </div>
            </div>

            <div className="overflow-y-auto p-7 flex flex-col justify-between gap-6" style={{ maxHeight: '90vh' }}>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-[0.75rem] font-bold text-purple-300 mb-3">
                  {selectedCertificate.issuer}
                </span>
                <h2 className="font-display font-bold text-[1.25rem] text-white tracking-tight leading-snug mb-3">
                  {selectedCertificate.title}
                </h2>
                <p className="text-[0.875rem] text-white/70 leading-relaxed mb-6">
                  {selectedCertificate.description}
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest w-20">Issued On:</span>
                    <span className="text-[0.875rem] font-medium text-white">{selectedCertificate.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.75rem] font-bold text-purple-400 uppercase tracking-widest w-20">Category:</span>
                    <span className="text-[0.875rem] font-medium text-white">{selectedCertificate.type}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 12 15 15 10" />
                </svg>
                <div>
                  <div className="text-[0.875rem] font-bold text-purple-400">Authentic Credential</div>
                  <div className="text-[0.75rem] text-white/40">Verified &amp; Authenticated</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </NativeModal>

    </div>
  );
};

export default Portofolio;
