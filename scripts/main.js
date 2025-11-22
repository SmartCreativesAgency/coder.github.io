// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Magnetic button effect
    document.querySelectorAll('.magnetic').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            button.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Typewriter effect
    const typewriterTexts = ['Full Stack Developer', 'UI/UX Designer', 'Graphic Designer'];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.type-text');
    const cursorElement = document.querySelector('.type-cursor');

    function typeWriter() {
        const currentText = typewriterTexts[currentTextIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        // Speed up when deleting
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            // Pause at end of text
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });

    // Simple contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this to a server
                // For GitHub Pages, you can use Formspree or Netlify Forms
                
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    this.reset();
                }, 3000);
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effect to project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
