import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  // Sample data for portfolio projects
  const projects = [
    {
      id: 1,
      title: "Cinematic Travel Film",
      description: "A breathtaking visual journey through Southeast Asia",
      thumbnailUrl: "https://images.unsplash.com/photo-1517207461578-9e869eeefea2?w=800&auto=format&fit=crop",
      videoUrl: "https://example.com/video1"
    },
    {
      id: 2,
      title: "Corporate Brand Video",
      description: "Sleek promotional content for a tech startup",
      thumbnailUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop",
      videoUrl: "https://example.com/video2"
    },
    {
      id: 3,
      title: "Wedding Highlight",
      description: "Emotional storytelling capturing a special day",
      thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
      videoUrl: "https://example.com/video3"
    },
    {
      id: 4,
      title: "Music Video Production",
      description: "Creative visuals for an independent artist",
      thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop",
      videoUrl: "https://example.com/video4"
    },
    {
      id: 5,
      title: "Documentary Short",
      description: "Impactful storytelling on environmental conservation",
      thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
      videoUrl: "https://example.com/video5"
    }
  ];
  
  // Sample data for shorts
  const shorts = [
    {
      id: 1,
      title: "Coffee House",
      thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop",
      duration: "0:30"
    },
    {
      id: 2,
      title: "City Lights",
      thumbnailUrl: "https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=400&auto=format&fit=crop",
      duration: "0:45"
    },
    {
      id: 3,
      title: "Sunrise Timelapse",
      thumbnailUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&auto=format&fit=crop",
      duration: "0:20"
    },
    {
      id: 4,
      title: "Ocean Waves",
      thumbnailUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&auto=format&fit=crop",
      duration: "0:38"
    },
    {
      id: 5,
      title: "Street Food",
      thumbnailUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&auto=format&fit=crop",
      duration: "0:28"
    },
    {
      id: 6,
      title: "Night Market",
      thumbnailUrl: "https://images.unsplash.com/photo-1534484982464-49a9eec7b949?w=400&auto=format&fit=crop",
      duration: "0:42"
    },
    {
      id: 7,
      title: "Misty Mountains",
      thumbnailUrl: "https://images.unsplash.com/photo-1574950578143-858c6fc58922?w=400&auto=format&fit=crop",
      duration: "0:24"
    }
  ];

  // Sample testimonials for infinite scroll
  const testimonials = [
    {
      id: 1,
      text: "Jane's editing skills transformed our raw footage into a compelling story that exceeded our expectations.",
      author: "John Smith",
      title: "Film Director",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      text: "Working with Jane was a fantastic experience. She has an incredible eye for detail and knows exactly how to capture the right emotion in every frame.",
      author: "Sarah Johnson",
      title: "Marketing Director",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      text: "The corporate video Jane created for our company perfectly encapsulated our brand message. Our clients love it!",
      author: "Michael Chen",
      title: "CEO, TechVision",
      avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 4,
      text: "Jane's ability to craft a narrative through video editing is unmatched. She delivered our documentary with incredible professionalism and creativity.",
      author: "Lisa Rodriguez",
      title: "Producer",
      avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 5,
      text: "Our wedding video was absolutely magical. Jane captured all the special moments and emotions of our day perfectly.",
      author: "David & Emma Wilson",
      title: "Newlyweds",
      avatarUrl: "https://randomuser.me/api/portraits/men/79.jpg"
    },
    {
      id: 6,
      text: "Jane's talent for visual storytelling helped our brand reach new audiences. The product video she created drove our best sales quarter ever.",
      author: "Alex Thompson",
      title: "Brand Manager",
      avatarUrl: "https://randomuser.me/api/portraits/women/56.jpg"
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentShort, setCurrentShort] = useState(3); // Center on index 3 (middle item)
  const [darkMode, setDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const sliderRef = useRef(null);
  const shortsSliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  
  // Scroll to portfolio section when "View Portfolio" is clicked
  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('.portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Scroll to contact section when "Contact Me" is clicked
  const scrollToContact = () => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Scroll to booking section when "Book a Consultation" is clicked
  const scrollToBooking = () => {
    const bookingSection = document.querySelector('.booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Shorts slider navigation
  const nextShort = () => {
    setCurrentShort((prev) => (prev === shorts.length - 1 ? 0 : prev + 1));
  };

  const prevShort = () => {
    setCurrentShort((prev) => (prev === 0 ? shorts.length - 1 : prev - 1));
  };

  const handleShortClick = (index) => {
    setCurrentShort(index);
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Handle touch events for main slider
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  // Handle touch events for shorts slider
  const handleShortsTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleShortsTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleShortsTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextShort();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevShort();
    }
  };
  
  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server here
    // For demonstration purposes, we'll just show a success message
    setBookingSubmitted(true);
    
    // Reset form (in a real application)
    e.target.reset();
    
    // After 5 seconds, hide the success message
    setTimeout(() => {
      setBookingSubmitted(false);
    }, 5000);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="theme-toggle-button">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <header className="hero hero-parallax">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-container">
            <h1>Jane Doe</h1>
            <h2>Cinematic Video Editor</h2>
            <p>Transforming moments into cinematic experiences</p>
            <div className="hero-buttons">
              <button className="cta-button" onClick={scrollToPortfolio}>View Portfolio</button>
              <button className="cta-button secondary" onClick={scrollToContact}>Contact Me</button>
              <button className="cta-button accent" onClick={scrollToBooking}>Book Now</button>
            </div>
          </div>
          <div className="hero-video-reel">
            <div className="video-snippet">
              <div className="play-icon-large">▶</div>
            </div>
          </div>
        </div>
      </header>

      <section className="about-section">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate video editor with over 8 years of experience creating compelling 
                visual narratives across various formats. My work focuses on capturing emotion and 
                telling authentic stories through thoughtful editing, color grading, and sound design.
              </p>
              <p>
                Working with brands, filmmakers, and artists worldwide, I bring technical expertise 
                and creative vision to every project. My editing approach combines rhythm, pacing, and 
                visual flow to create engaging content that resonates with audiences.
              </p>
            </div>
            <div className="skills">
              <h3>Technical Skills</h3>
              <ul>
                <li>Adobe Premiere Pro</li>
                <li>Final Cut Pro</li>
                <li>DaVinci Resolve</li>
                <li>After Effects</li>
                <li>Color Grading</li>
                <li>Sound Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="container">
          <h2>Portfolio</h2>
          <div 
            className="slider-container"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="slides-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="slider-content">
                    <div className="slider-image">
                      <img src={project.thumbnailUrl} alt={project.title} />
                      <div className="overlay">
                        <div className="play-icon">▶</div>
                      </div>
                    </div>
                    <div className="slider-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="slider-arrow prev" onClick={prevSlide}>❮</button>
            <button className="slider-arrow next" onClick={nextSlide}>❯</button>
            <div className="slider-dots">
              {projects.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="shorts-section">
        <div className="container">
          <h2>Shorts Collection</h2>
          <p className="section-subtitle">Quick, eye-catching videos optimized for social media</p>
          <div 
            className="shorts-slider-container"
            ref={shortsSliderRef}
            onTouchStart={handleShortsTouchStart}
            onTouchMove={handleShortsTouchMove}
            onTouchEnd={handleShortsTouchEnd}
          >
            <div 
              className="shorts-wrapper" 
              style={{ 
                transform: `translateX(calc(-${currentShort * (
                  windowWidth <= 480 ? 80 :
                  windowWidth <= 576 ? 70 :
                  windowWidth <= 768 ? 50 :
                  windowWidth <= 992 ? 33.33 :
                  windowWidth <= 1200 ? 25 : 20
                )}% + ${
                  windowWidth <= 480 ? 10 :
                  windowWidth <= 576 ? 15 :
                  windowWidth <= 768 ? 25 :
                  windowWidth <= 992 ? 33.33 :
                  windowWidth <= 1200 ? 37.5 : 40
                }%))`
              }}
            >
              {shorts.map((short, index) => (
                <div 
                  key={short.id}
                  className={`short-item ${index === currentShort ? 'active' : ''}`}
                  onClick={() => handleShortClick(index)}
                >
                  <div className="short-thumbnail">
                    <img src={short.thumbnailUrl} alt={short.title} />
                    <div className="short-duration">{short.duration}</div>
                    <div className="short-overlay">
                      <div className="short-play">▶</div>
                    </div>
                  </div>
                  <div className="short-title">{short.title}</div>
                </div>
              ))}
            </div>
            <button className="shorts-arrow prev" onClick={prevShort}>❮</button>
            <button className="shorts-arrow next" onClick={nextShort}>❯</button>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setSelectedProject(null)}>×</span>
            <h2>{selectedProject.title}</h2>
            <div className="video-container">
              {/* In a real implementation, this would be an actual video player */}
              <div className="video-placeholder">
                <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} />
                <div className="play-button">▶</div>
              </div>
            </div>
            <p>{selectedProject.description}</p>
          </div>
        </div>
      )}

      <section className="services-section">
        <div className="container">
          <h2>Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Video Editing</h3>
              <p>Professional editing with attention to pacing, storytelling, and visual flow.</p>
            </div>
            <div className="service-card">
              <h3>Color Grading</h3>
              <p>Enhancing visual aesthetics with professional color correction and stylized looks.</p>
            </div>
            <div className="service-card">
              <h3>Sound Design</h3>
              <p>Creating immersive audio experiences with sound effects and music selection.</p>
            </div>
            <div className="service-card">
              <h3>Motion Graphics</h3>
              <p>Adding dynamic elements and animations to elevate your visual content.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>Client Testimonials</h2>
          <p className="section-subtitle">What my clients are saying</p>
        </div>
        <div className="testimonials-horizontal-scroll">
          <div className="testimonials-track">
            {/* First set of testimonials */}
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={`original-${testimonial.id}`}>
                <div className="testimonial-content">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatarUrl} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-text">
                    <p>"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={`duplicate-${testimonial.id}`}>
                <div className="testimonial-content">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatarUrl} alt={testimonial.author} />
                  </div>
                  <div className="testimonial-text">
                    <p>"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-section">
        <div className="container">
          <h2>Book a Consultation</h2>
          <p className="section-subtitle">Let's discuss your project and how we can bring your vision to life</p>
          <div className="booking-container">
            <div className="booking-info">
              <h3>How It Works</h3>
              <ul className="booking-steps">
                <li>
                  <span className="step-number">1</span>
                  <div className="step-content">
                    <h4>Schedule a Call</h4>
                    <p>Fill out the form with your project details and preferred contact time</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <div className="step-content">
                    <h4>Project Discussion</h4>
                    <p>We'll discuss your vision, requirements, and timeline</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <div className="step-content">
                    <h4>Custom Proposal</h4>
                    <p>Receive a tailored proposal with timeline and pricing options</p>
                  </div>
                </li>
              </ul>
            </div>
            {bookingSubmitted ? (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your consultation request has been submitted successfully. I'll be in touch with you shortly to discuss your project in detail.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Your email" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" placeholder="Your phone number" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="project-type">Project Type</label>
                    <select id="project-type" required defaultValue="">
                      <option value="" disabled>Select project type</option>
                      <option value="wedding">Wedding Video</option>
                      <option value="corporate">Corporate Video</option>
                      <option value="documentary">Documentary</option>
                      <option value="music">Music Video</option>
                      <option value="commercial">Commercial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="project-details">Project Details</label>
                  <textarea id="project-details" placeholder="Tell me more about your project" rows="4" required></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget" defaultValue="">
                      <option value="" disabled>Select budget range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-3000">$1,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="over-10000">Over $10,000</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="deadline">Project Deadline</label>
                    <input type="date" id="deadline" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="preferred-time">Preferred Contact Time</label>
                  <div className="time-slots">
                    <div className="time-slot">
                      <input type="radio" id="morning" name="contact-time" value="morning" />
                      <label htmlFor="morning">Morning</label>
                    </div>
                    <div className="time-slot">
                      <input type="radio" id="afternoon" name="contact-time" value="afternoon" />
                      <label htmlFor="afternoon">Afternoon</label>
                    </div>
                    <div className="time-slot">
                      <input type="radio" id="evening" name="contact-time" value="evening" />
                      <label htmlFor="evening">Evening</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="booking-button">Schedule Consultation</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-container">
            <div className="contact-info">
              <p>Ready to bring your vision to life? Contact me to discuss your next project.</p>
              <p>Email: jane.doe@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <div className="social-links">
                <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://vimeo.com" className="social-icon" target="_blank" rel="noopener noreferrer">Vimeo</a>
                <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Your message"></textarea>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2025 Jane Doe | Video Editor Portfolio</p>
        </div>
      </footer>
    </div>
  );
}

export default App;