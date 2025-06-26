import './App.css';
import { useState, useEffect } from 'react';

function getInitialTheme() {
  // Check localStorage first
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  // Otherwise, use system preference
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const projects = [
  {
    title: 'Visitors Management System',
    description: 'Developed a web-based Visitors Management System during my internship at the Lagos State Ministry of Physical Planning and Urban Development. The system allows for secure and efficient registration of visitors, tracks their check-in/check-out times, and stores visit details in a structured database. Built using Python (Flask), HTML/CSS, and SQLite, the system improves manual visitor logging by digitizing the process, enhancing accountability, and enabling quick access to visitor records.',
    link: 'https://github.com/SultanAlabi/Visitor-Management-System.git'
  },
  {
    title: 'Office Check-In System',
    description: 'Built using Python (Flask) during my internship. Allows secure staff attendance tracking with timestamps. GitHub repo included.',
    link: 'https://github.com/SultanAlabi/Office_Check_In.git'
  },
  // ... add more projects here
];

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    // Listen for system theme changes
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

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}>
      <header className="App-header">
        <button className="theme-toggle" onClick={handleToggle} aria-label="Toggle dark mode">
          {darkMode ? '🌙' : '☀️'}
        </button>
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
          <p>I'm Abdulhameed (Ayomikun) Alabi, a Computer Science undergraduate at Fountain University and current intern at the Lagos State Ministry of Physical Planning and Urban Development. I'm passionate about web development, cybersecurity, and database management, with experience building solutions using Python, Flask, HTML/CSS, and SQLite. Driven by faith and a hunger for innovation, I enjoy creating tech that solves real-world problems while continuously growing my skills and impact</p>
        </section>

        <section id="projects" className="Projects">
          <h2>Projects</h2>
          <div
            className="project-carousel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <button className="carousel-nav prev" onClick={handlePrevProject} aria-label="Previous project">‹</button>
            <div key={currentProjectIndex} className="project-tile">
              <h3>{currentProject.title}</h3>
              <p>{currentProject.description}</p>
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer">View Project</a>
            </div>
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
              📧
              <span className="tooltip">Email</span>
            </a>
            <a href="https://github.com/SultanAlabi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <span role="img" aria-label="GitHub">🐙</span>
              <span className="tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/abdulhameed-alabi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <span role="img" aria-label="LinkedIn">💼</span>
              <span className="tooltip">LinkedIn</span>
            </a>
            <a href="https://snapchat.com/t/jjSTm7LQ" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <span role="img" aria-label="Snapchat">👻</span>
              <span className="tooltip">Snapchat</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 Abdulhameed (Ayomikun) Alabi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
