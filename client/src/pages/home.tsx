import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Particles canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() * 20 + 175 // Teal to cyan range
    });

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));

    // Staggered animation for feature cards
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const featureCards = document.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5');
    featureCards.forEach(card => cardObserver.observe(card));

    return () => {
      observer.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // Smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[var(--dark-bg)] text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className={`loader ${!isLoading ? 'fade-out' : ''}`}>
          <div className="text-center">
            <div className="text-6xl font-bold text-tidal-cyan mb-4 animate-spin-slow">
              <i className="fas fa-code"></i>
            </div>
            <div className="text-2xl font-semibold text-tidal-cyan animate-pulse">
              Tidal Serverside
            </div>
          </div>
        </div>
      )}

      {/* Particles Canvas */}
      <canvas ref={canvasRef} id="particles-canvas" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-tidal-cyan">
              <i className="fas fa-wave-square mr-2"></i>
              Tidal
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-tidal-cyan transition-colors duration-300">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-tidal-cyan transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('features')} className="hover:text-tidal-cyan transition-colors duration-300">Features</button>
              <button onClick={() => scrollToSection('join')} className="hover:text-tidal-cyan transition-colors duration-300">Join</button>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-tidal-cyan"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block hover:text-tidal-cyan transition-colors duration-300">Home</button>
              <button onClick={() => scrollToSection('about')} className="block hover:text-tidal-cyan transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('features')} className="block hover:text-tidal-cyan transition-colors duration-300">Features</button>
              <button onClick={() => scrollToSection('join')} className="block hover:text-tidal-cyan transition-colors duration-300">Join</button>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="fade-in-section">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-tidal-cyan">Tidal Serverside:</span><br />
                Unleash Your <span className="text-tidal-blue">Roblox</span> Experience
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                The ultimate server-side executor for Roblox, built for power and precision.
              </p>
              <button 
                onClick={() => scrollToSection('join')}
                className="inline-block bg-gradient-to-r from-[var(--tidal-teal)] to-[var(--tidal-blue)] px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 pulse-glow"
              >
                <i className="fas fa-rocket mr-2"></i>
                Join the Community
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="fade-in-section">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                What is <span className="text-tidal-cyan">Tidal Serverside?</span>
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="glass-card rounded-2xl p-8 md:p-12 tilt-card">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="text-6xl text-tidal-cyan mb-6">
                        <i className="fas fa-server"></i>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-tidal-blue">Server-Side Excellence</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Tidal Serverside is a cutting-edge Roblox server-side executor designed for running scripts on small games (0-1k players). Built with security and performance in mind, it features a modern, intuitive UI that makes script execution seamless and efficient.
                      </p>
                    </div>
                    <div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-shield-alt text-tidal-cyan"></i>
                          <span>Secure execution environment</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-users text-tidal-cyan"></i>
                          <span>Community-driven development</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-sync text-tidal-cyan"></i>
                          <span>Regular updates and support</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-desktop text-tidal-cyan"></i>
                          <span>Modern, user-friendly interface</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="fade-in-section">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                Why Choose <span className="text-tidal-cyan">Tidal?</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Feature Card 1 */}
                <div className="glass-card rounded-xl p-6 text-center stagger-1 opacity-0 animate-fade-in-up">
                  <div className="text-4xl text-tidal-cyan mb-4">
                    <i className="fas fa-palette"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tidal-blue">Modern UI</h3>
                  <p className="text-gray-300">
                    Clean, intuitive interface designed for ease of use with stunning visual effects and smooth animations.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="glass-card rounded-xl p-6 text-center stagger-2 opacity-0 animate-fade-in-up">
                  <div className="text-4xl text-tidal-cyan mb-4">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tidal-blue">Script Support</h3>
                  <p className="text-gray-300">
                    Execute a wide range of scripts with robust support for various Roblox game environments.
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div className="glass-card rounded-xl p-6 text-center stagger-3 opacity-0 animate-fade-in-up">
                  <div className="text-4xl text-tidal-cyan mb-4">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tidal-blue">Community-Driven</h3>
                  <p className="text-gray-300">
                    Join a thriving community of developers and users sharing scripts, tips, and support.
                  </p>
                </div>

                {/* Feature Card 4 */}
                <div className="glass-card rounded-xl p-6 text-center stagger-4 opacity-0 animate-fade-in-up">
                  <div className="text-4xl text-tidal-cyan mb-4">
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tidal-blue">Regular Updates</h3>
                  <p className="text-gray-300">
                    Stay ahead with frequent updates, new features, and compatibility improvements.
                  </p>
                </div>

                {/* Feature Card 5 */}
                <div className="glass-card rounded-xl p-6 text-center stagger-5 opacity-0 animate-fade-in-up">
                  <div className="text-4xl text-tidal-cyan mb-4">
                    <i className="fas fa-bolt"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tidal-blue">High Performance</h3>
                  <p className="text-gray-300">
                    Optimized for speed and reliability, ensuring smooth execution without lag or crashes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="join" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="fade-in-section">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Join the <span className="text-tidal-cyan">Tidal Community</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                  Connect with fellow developers, access exclusive scripts, get support, and stay updated with the latest features. Your gateway to the ultimate Roblox experience awaits!
                </p>
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                  <div className="text-6xl text-tidal-cyan mb-6">
                    <i className="fab fa-discord"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-tidal-blue">Ready to Get Started?</h3>
                  <a 
                    href="https://discord.gg/serversiding" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-[var(--tidal-teal)] to-[var(--tidal-blue)] px-12 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-all duration-300 tidal-glow"
                  >
                    <i className="fab fa-discord mr-2"></i>
                    Join Discord Server
                  </a>
                  <p className="text-sm text-gray-400 mt-4">
                    Join our Discord community to access exclusive scripts, get support, and connect with fellow developers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 glass-effect">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-tidal-cyan mb-4">
              <i className="fas fa-wave-square mr-2"></i>
              Tidal Serverside
            </div>
            <p className="text-gray-400 mb-4">
              Unleashing the power of Roblox server-side execution
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Tidal Serverside. Built for the community, by the community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
