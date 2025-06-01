import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Slider from 'react-slick';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// --- Custom InView Hook (for scroll animations) ---
function useInView(options) {
  const ref = React.useRef();
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options && options.once) {
          observer.disconnect();
        }
      } else if (!options || !options.once) {
        setInView(false);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView];
}


export default function Portfolio() {
  const [projectMode, setProjectMode] = useState({});
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const toggleMode = (id) => {
    setProjectMode((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // --- UPDATED Projects Data with new additions ---
  const projects = [
    {
      id: 'ecom',
      title: "E-commerce Website",
      stack: "Node.js, MongoDB, JWT, OAuth",
      overview: "T-shirt selling platform with secure authentication and streamlined admin panel.",
      details:
        "Developed a scalable e-commerce platform featuring robust user authentication (JWT, OTP, Google OAuth), secure product management with variants, and a comprehensive admin dashboard for order tracking. Integrated MongoDB Atlas with CI/CD practices across Vercel and Render.",
    },
    {
      id: 'captain',
      title: "Captain LLM",
      stack: "Whisper, LangChain, Local LLMs",
      overview: "Offline voice assistant enabling touch-free desktop automation.",
      details:
        "Engineered a hands-free local AI assistant utilizing open-source LLMs. Integrated wake-word detection along with Whisper-based transcription and a seamless LangChain processing pipeline to execute diverse desktop tasks via voice commands.",
    },
    {
      id: 'medihelp',
      title: "MediHelp",
      stack: "YOLO, OpenCV, Regex, Gemini",
      overview: "AI-driven platform for intelligent analysis of medical images and text.",
      details:
        "Built an advanced image analysis tool leveraging YOLO for object detection, OpenCV for processing, and Regex for text extraction. Enhanced with a Google Gemini-powered chatbot integration for interactive and insightful medical image analysis.",
    },
    {
      id: 'disaster',
      title: "Disaster Management System",
      stack: "Firebase, ESP32, Arduino",
      overview: "Remote surveillance and automation system for emergency scenarios.",
      details:
        "Designed a cloud-controlled 4-wheel chassis for remote area surveillance using ESP32 for Wi-Fi connectivity and Arduino Uno for motor control. Integrated real-time data synchronization via Google Firebase and automated video recording on detecting predefined events.",
    },
    { // --- NEW PROJECT: AgroMitra ---
      id: 'agromitra',
      title: "AgroMitra",
      stack: "PHP, Python",
      overview: "A farmer assistance system providing daily updates and recommendations.",
      details:
        "Developed a system using PHP for the web interface and Python for backend logic to assist farmers with daily updates on subsidies and crop prices, along with intelligent fertilizer recommendations to enhance agricultural productivity.",
    },
    { // --- NEW PROJECT: VARP Project ---
      id: 'varp',
      title: "VARP Project",
      stack: "Python, SQL",
      overview: "Comprehensive hotel management system with reservation and valet parking.",
      details:
        "Built a full-featured hotel management system handling reservations, valet parking, user registration, verification, login, and automated bill production based on menu items and other services, utilizing Python for logic and SQL for database management.",
    },
    { // --- NEW PROJECT: Java Quiz System ---
      id: 'java-quiz',
      title: "Java Quiz System",
      stack: "Java (GUI, JDBC)",
      overview: "An efficient Java-based quiz management system.",
      details:
        "Designed and implemented a Java quiz system with a graphical user interface (GUI) and JDBC integration for seamless database connectivity. This system provides efficient management for quizzes and streamlined operations.",
    },
    { // --- NEW PROJECT: COAWeb ---
      id: 'coaweb',
      title: "COAWeb",
      stack: "HTML, CSS, JavaScript, Three.js (Implied for 3D)", // Add relevant web tech
      overview: "A web-based 3D model of the 8086 microprocessor.",
      details:
        "Created a dedicated website showcasing a detailed 3D interactive model of the 8086 microprocessor, providing an immersive educational experience about computer architecture. (Note: Implies use of a 3D library like Three.js for interactive models.)",
    },
  ];

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "College Connect at Purple Technologies",
      period: "January 2025 - March 2025",
      location: "Andra Pradesh",
      description:
        "Built a full-stack web application for efficient college event and club management using Node.js, Express.js, and MongoDB. Engineered RESTful API endpoints and deployed the multi-service system by leveraging robust CI/CD practices on Vercel and Render.",
    },
  ];

  const education = [
    {
      degree: "Bachelors CSE-Core",
      institution: "VIT-AP University, Amaravati",
      period: "2027",
      details: "Graduated in the top 20% with an 8.82 CGPA.",
    },
    {
      degree: "PCMCE",
      institution: "Vydehi School of Excellence, Bengaluru",
      period: "2023",
      details: "Scored 85.6%, earning a Gold accolade at the Model United Nations conference.",
    },
  ];

  const certifications = [
    {
      title: "Cloud Computing",
      issuer: "BlackBucks",
      period: "2025",
      details:
        "Gained hands-on experience with AWS EC2 and S3 by deploying a static portfolio website and applied Docker for containerization in a Java application.",
    },
    {
      title: "TechNov Certification",
      issuer: "VIT-AP",
      period: "2024",
      details:
        "Secured a top-3 finish in a 24-hour hackathon among 100+ teams and received an internship offer from Purple Technologies.",
    },
    {
      title: "Google Developer Groups",
      issuer: "VIT-AP",
      period: "2024",
      details:
        "Selected for the Web and App development track and contributed to open-source projects for enhanced community impact.",
    },
  ];

  // Skills Data for Radar Chart (with proficiency)
  const skillProficiency = {
    "Python": 5, "C": 3, "C++": 3, "Java": 3, "JavaScript": 5,
    "React.js": 5, "Node.js": 5, "MongoDB": 5, "Whisper": 3,
    "LangChain": 3, "YOLO": 3, "OpenCV": 3, "kotlin":0,
    "REST APIs": 4,"CI/CD": 4, "Firebase": 5,
    "MySQL": 5, "PostgreSQL": 4, "GitHub": 4, "PHP": 2, "SQL": 5 // Added new skills
  };

  const radarChartData = {
    labels: Object.keys(skillProficiency),
    datasets: [
      {
        label: 'Proficiency (1-5)',
        data: Object.values(skillProficiency),
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
        pointLabels: {
          color: theme === 'dark' ? '#fff' : '#333',
          font: {
            size: 12,
          },
        },
        ticks: {
          beginAtZero: true,
          max: 5,
          stepSize: 1,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.r !== null) {
              label += context.parsed.r;
            }
            return label;
          }
        }
      },
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // console.log(container);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#888",
      },
      links: {
        color: "#888",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };


  return (
    <div className={`bg-gradient-to-br min-h-screen font-sans ${theme === 'dark' ? 'from-gray-950 to-black text-white' : 'from-gray-100 to-white text-gray-800'}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-3 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 shadow-lg z-50 hover:scale-110 transition-transform duration-200"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-transparent"
          >
            Vrishank Raina
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 dark:text-gray-600 leading-relaxed">
            Innovative Full-Stack Developer & AI/ML Engineer building intelligent web applications and advanced AI systems.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="mailto:vrishankraina@gmail.com"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-600 transition-transform duration-300 transform hover:scale-110"
            >
              <Mail size={28} />
            </a>
            <a
              href="https://github.com/hmm183"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-600 transition-transform duration-300 transform hover:scale-110"
            >
              <Github size={28} />
            </a>
            <a
              href="https://linkedin.com/in/vrishank-raina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-600 transition-transform duration-300 transform hover:scale-110"
            >
              <Linkedin size={28} />
            </a>
          </div>
          <button
            className="mt-8 px-6 py-3 border border-blue-500 text-blue-300 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-semibold text-lg"
            onClick={() => window.open('/resume.pdf')}
          >
            Download Resume
          </button>
        </motion.section>

        {/* Experience Section - Added hover interactivity */}
        <motion.section
          className="mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-300 dark:text-blue-600 mb-8 text-center">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-800 rounded-xl p-6 shadow-xl
                hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer"> {/* Added hover effects */}
                <h3 className="text-2xl font-bold">{exp.role}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-600 italic">
                  {exp.company} | {exp.period} | {exp.location}
                </p>
                <p className="mt-4 text-gray-200 dark:text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section - Carousel, card interactivity already there */}
        <motion.section
          className="mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-300 dark:text-blue-600 mb-8 text-center">Projects</h2>
          <Slider {...sliderSettings}>
            {projects.map((proj) => (
              <div key={proj.id} className="p-4">
                <div
                  className="bg-gray-900 border border-gray-700 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-800 rounded-xl p-6 shadow-xl min-h-[300px] flex flex-col justify-between
                  hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer" // Added hover effects to cards
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-600 italic mb-3">{proj.stack}</p>
                    <p className="text-gray-200 dark:text-gray-700 leading-relaxed">
                      {projectMode[proj.id] ? proj.details : proj.overview}
                    </p>
                  </div>
                  <button
                    className="mt-4 text-sm text-blue-400 hover:underline hover:text-blue-300 dark:hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => toggleMode(proj.id)}
                  >
                    {projectMode[proj.id] ? "Less Info" : "More Info"}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </motion.section>

        {/* Education Section - Added hover interactivity */}
        <motion.section
          className="mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-300 dark:text-green-600 mb-8 text-center">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-800 rounded-xl p-6 shadow-xl
                hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer"> {/* Added hover effects */}
                <h3 className="text-2xl font-bold">{edu.degree}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-600 italic">
                  {edu.institution} | {edu.period}
                </p>
                <p className="mt-4 text-gray-200 dark:text-gray-700">{edu.details}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section - Added hover interactivity */}
        <motion.section
          className="mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 dark:text-yellow-600 mb-8 text-center">Certifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-800 rounded-xl p-6 shadow-xl min-h-[220px] flex flex-col justify-between
                hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out cursor-pointer"> {/* Added hover effects */}
                <div>
                  <h3 className="text-xl font-bold">{cert.title}</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-600 italic">
                    {cert.issuer} | {cert.period}
                  </p>
                  <p className="mt-4 text-gray-200 dark:text-gray-700">{cert.details}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section - Radar Chart and Hover for Skill Boxes */}
        <motion.section
          className="mb-16"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-300 dark:text-green-600 text-center mb-8">Skills</h2>
          <div className="bg-gray-900 border border-gray-700 dark:bg-gray-100 dark:border-gray-300 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center text-white dark:text-gray-800">Skill Proficiency Radar</h3>
            <div className="chart-container">
              <Radar data={radarChartData} options={radarChartOptions} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 dark:text-gray-700 mt-6">
              {Object.keys(skillProficiency).map((skill, index) => (
                <span key={index} className="skill-item p-2 bg-gray-800 dark:bg-gray-200 dark:text-gray-700 rounded-md text-center
                  hover:scale-105 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transform transition-all duration-200 ease-in-out cursor-default"> {/* Added hover effects to skill boxes */}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center text-gray-500 dark:text-gray-400 text-sm py-4 border-t border-gray-800 dark:border-gray-300"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          Built by Vrishank Raina — 2025
        </motion.footer>
      </div>
    </div>
  );
}
