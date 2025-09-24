import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaSnapchatGhost } from 'react-icons/fa';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const projects = [
  {
    title: 'Visitors Management System',
    description:
      'Built using Python (Flask), HTML/CSS, and SQLite, the system improves manual visitor logging by digitizing the process, enhancing accountability, and enabling quick access to visitor records.',
    link: 'https://github.com/SultanAlabi/Visitor-Management-System.git',
    repo: 'https://github.com/SultanAlabi/Visitor-Management-System.git',
    tags: ['Flask', 'Python', 'SQLite']
  },
  {
    title: 'Office Check-In System',
    description:
      'Built using Python (Flask) during my internship. Allows secure staff attendance tracking with timestamps. GitHub repo included.',
    link: 'https://github.com/SultanAlabi/Office_Check_In.git',
    repo: 'https://github.com/SultanAlabi/Office_Check_In.git',
    tags: ['Flask', 'Python']
  },
  {
    title: 'Personal Portfolio',
    description:
      'My personal portfolio, proudly built using React, showcasing my projects and demonstrating my proficiency in modern web development.',
    link: 'https://portfolio-sultan-projects.vercel.app',
    repo: 'https://github.com/SultanAlabi/My-Portfolio',
    tags: ['React', 'CSS', 'Frontend']
  },
  {
    title: 'Document Digitization and Search Tool',
    description: 'Digitize, organize, and search your documents easily—all in one accessible tool.',
    link: 'https://github.com/SultanAlabi/Document-Digitization-and-Search-Tool.git',
    repo: 'https://github.com/SultanAlabi/Document-Digitization-and-Search-Tool.git',
    tags: ['Python', 'OCR']
  },

  {
    title: 'Ministry Asset Inventory System',
    description:
      'A Django web app for tracking and managing government assets, featuring CRUD operations, visual dashboards, and summary reports.',
    link: 'https://github.com/SultanAlabi/Ministry-Asset-Inventory-System.git',
    repo: 'https://github.com/SultanAlabi/Ministry-Asset-Inventory-System.git',
    tags: ['Django', 'Python', 'Postgres']
  },
  {
    title: 'Islamic Tally Counter',
    description:
      'A modern, accessible, and mobile-friendly Islamic tally counter web app built with HTML, CSS, and JavaScript.',
    link: 'https://github.com/SultanAlabi/Islamic-Tally-counter.git',
    repo: 'https://github.com/SultanAlabi/Islamic-Tally-counter.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 

  {
    title: 'To Do List',
    description:
      'A simple, clean, and responsive To-Do List web app built with plain HTML, CSS, and JavaScript. Features adding, editing, deleting, and marking tasks as completed.',
    link: 'https://github.com/SultanAlabi/To-Do-List.git',
    repo: 'https://github.com/SultanAlabi/To-Do-List.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 

  {
    title: 'Quote Generator',
    description: 'A small Node.js CLI that shows random quotes, lists them, and lets you add or remove quotes.',
    link: 'https://github.com/SultanAlabi/Quote-Generator.git',
    repo: 'https://github.com/SultanAlabi/Quote-Generator.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 

   {
    title: 'Rock Paper Scissors',
    description: 'A minimal, accessible Rock–Paper–Scissors web app using plain HTML, CSS and JavaScript.',
    link: 'https://github.com/SultanAlabi/RockPaperScissors.git',
    repo: 'https://github.com/SultanAlabi/RockPaperScissors.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 

   {
    title: 'Countdown Timer',
    description: 'A minimal, interactive countdown timer built with plain HTML, CSS and JavaScript. Includes start/pause/reset controls, quick presets, and a visual progress bar.',
    link: 'https://github.com/SultanAlabi/Countdown-Timer.git',
    repo: 'https://github.com/SultanAlabi/Countdown-Timer.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 

   {
    title: 'Typing Speed Test',
    description: 'Typing Speed Test is a simple web app that measures your typing speed and accuracy over a set time period. Built with HTML, CSS, and JavaScript.',
    link: 'https://github.com/SultanAlabi/Typing-Speed-Test.git',
    repo: 'https://github.com/SultanAlabi/Typing-Speed-Test.git',
    tags: ['HTML', 'CSS', 'JavaScript']
  }, 
  // ... add more projects here
];

export default function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isThemeFading, setIsThemeFading] = useState(false);
  const fadeDuration = 350; // ms
  const fadeTimerRef = React.useRef(null);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  const allTags = useMemo(() => {
    const s = new Set();
    projects.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedTag !== 'All' && !(p.tags || []).includes(selectedTag)) return false;
      if (searchTerm && !(`${p.title} ${p.description} ${(p.tags || []).join(' ')}`.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      return true;
    });
  }, [selectedTag, searchTerm]);

  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [selectedTag, searchTerm]);

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % Math.max(1, filteredProjects.length));
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + Math.max(1, filteredProjects.length)) % Math.max(1, filteredProjects.length));
  };

  const handleToggle = () => {
    // Start fade overlay, toggle theme, then remove overlay after duration
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setIsThemeFading(true);
    setDarkMode((prev) => !prev);
    fadeTimerRef.current = setTimeout(() => {
      setIsThemeFading(false);
      fadeTimerRef.current = null;
    }, fadeDuration);
  };

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const visibleProject = filteredProjects.length ? filteredProjects[currentProjectIndex % filteredProjects.length] : null;

  return (
    <div className={`App${darkMode ? ' dark' : ''}${isThemeFading ? ' theme-fade' : ''}`}>
      <header className="App-header">
        <div className="header-controls">
          <a className="resume-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
            Download Resume
          </a>
          <button className="theme-toggle" onClick={handleToggle} aria-label="Toggle dark mode">
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>

        <h1>Alabi Abdulhameed Ayomikun</h1>
        <p>Web Developer | Cybersecurity Enthusiast | Programmer</p>
      </header>

      <nav className="main-nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <section id="about" className="About">
          <h2>About Me</h2>
          <p>
            I'm Abdulhameed (Ayomikun) Alabi, a Computer Science undergraduate at Fountain University and current intern at the Lagos State
            Ministry of Physical Planning and Urban Development. I'm passionate about web development, cybersecurity, and database management,
            with experience building solutions using Python, Flask, HTML/CSS, and SQLite. Driven by faith and a hunger for innovation, I enjoy creating
            tech that solves real-world problems while continuously growing my skills and impact
          </p>
        </section>

        <section id="projects" className="Projects">
          <h2>Projects</h2>

          <div className="project-filters">
            <div className="tag-buttons">
              {allTags.map((t) => (
                <button key={t} className={`tag-btn ${selectedTag === t ? 'active' : ''}`} onClick={() => setSelectedTag(t)}>
                  {t}
                </button>
              ))}
            </div>
            <input className="project-search" placeholder="Search projects or tags" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="project-carousel" onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)}>
            <button className="carousel-nav prev" onClick={handlePrevProject} aria-label="Previous project">‹</button>

            {visibleProject ? (
              <div
                key={currentProjectIndex}
                className="project-tile"
                onClick={() => setSelectedProject(visibleProject)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(visibleProject)}
              >
                <h3>{visibleProject.title}</h3>
                <p>{visibleProject.description}</p>
                <div className="project-meta">{(visibleProject.tags || []).map((tg) => (
                  <span key={tg} className="tag">{tg}</span>
                ))}</div>
                <a href={visibleProject.link} target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
            ) : (
              <div className="project-tile empty">
                <p>No projects match your filters.</p>
              </div>
            )}

            <button className="carousel-nav next" onClick={handleNextProject} aria-label="Next project">›</button>
          </div>
        </section>

        <section id="skills" className="Skills">
          <h2>Skills</h2>
          <h3>Programming Languages & Tools</h3>
          <ul>
            <li>Python (Flask)</li>
            <li>JavaScript (ES6+)</li>
            <li>HTML & CSS</li>
            <li>SQL / SQLite</li>
            <li>Git & GitHub</li>
            <li>Visual Studio Code</li>
          </ul>
          <h3>Web Development</h3>
          <ul>
            <li>Responsive Web Design</li>
            <li>React.js (Beginner Level)</li>
            <li>Front-End Development</li>
            <li>API Integration</li>
            <li>Flask Web Apps</li>
          </ul>
        </section>

        <section id="contact" className="Contact">
          <h2>Contact Me</h2>
          <div className="contact-icons">
            <a href="mailto:alabisultan28@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <MdEmail size={28} />
              <span className="tooltip">Email</span>
            </a>
            <a href="https://github.com/SultanAlabi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={28} />
              <span className="tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/abdulhameed-alabi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={28} />
              <span className="tooltip">LinkedIn</span>
            </a>
            <a href="https://snapchat.com/t/jjSTm7LQ" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <FaSnapchatGhost size={28} />
              <span className="tooltip">Snapchat</span>
            </a>
          </div>

          <div style={{ marginTop: 18 }}>
            <ContactForm />
          </div>
        </section>

        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      </main>

      <footer>
        <p>© 2025 Abdulhameed (Ayomikun) Alabi. All rights reserved.</p>
      </footer>
    </div>
  );
}

