// document.getElementById("contactForm").addEventListener("submit", function(e) {
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const message = document.getElementById("message").value.trim();

//     if (!name || !email || !message) {
//         alert("Please fill in all fields before submitting.");
//         e.preventDefault();
//     } else {
//         alert("Thank you, " + name + "! Your message has been sent.");
//     }
// });

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animate skill bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Project modal functionality
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

const projectDetails = {
    ecommerce: {
        title: 'E-Commerce Platform',
        description: 'A comprehensive e-commerce solution built with modern web technologies. This platform includes user authentication, product catalog management, shopping cart functionality, order processing, and secure payment integration with Stripe.',
        features: [
            'User registration and authentication system',
            'Product catalog with search and filtering',
            'Shopping cart and wishlist functionality',
            'Secure checkout process with Stripe integration',
            'Order tracking and history',
            'Admin dashboard for inventory management',
            'Responsive design for all devices',
            'Email notifications for orders'
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT', 'Tailwind CSS'],
        challenges: 'One of the main challenges was implementing a robust inventory management system that could handle concurrent orders and prevent overselling. I solved this by implementing database transactions and real-time inventory updates.',
        github: 'https://github.com/alexjohnson/ecommerce-platform',
        demo: 'https://ecommerce-demo.alexjohnson.dev'
    },
    taskmanager: {
        title: 'Task Management App',
        description: 'A collaborative task management application designed for teams to organize projects, assign tasks, and track progress in real-time. Built with Vue.js and Socket.io for seamless real-time collaboration.',
        features: [
            'Real-time collaboration with Socket.io',
            'Project and task organization with drag-and-drop',
            'Team member assignments and notifications',
            'Progress tracking with visual indicators',
            'File attachments and comments',
            'Time tracking and reporting',
            'Custom project templates',
            'Mobile-responsive interface'
        ],
        technologies: ['Vue.js', 'Socket.io', 'Express', 'PostgreSQL', 'JWT', 'Multer', 'Chart.js'],
        challenges: 'The biggest challenge was ensuring real-time synchronization across multiple users without conflicts. I implemented operational transformation techniques and conflict resolution algorithms.',
        github: 'https://github.com/alexjohnson/task-manager',
        demo: 'https://taskmanager-demo.alexjohnson.dev'
    },
    weather: {
        title: 'Weather Analytics Dashboard',
        description: 'A comprehensive weather dashboard that provides current weather conditions, forecasts, and historical data visualization. Features interactive charts and location-based weather tracking.',
        features: [
            'Current weather conditions for any location',
            '7-day weather forecast with hourly details',
            'Interactive weather maps and radar',
            'Historical weather data visualization',
            'Weather alerts and notifications',
            'Multiple location tracking',
            'Data export functionality',
            'Responsive design with dark/light themes'
        ],
        technologies: ['JavaScript', 'Chart.js', 'OpenWeatherMap API', 'Mapbox GL', 'CSS Grid', 'Local Storage'],
        challenges: 'Managing and visualizing large amounts of weather data efficiently while maintaining smooth user interactions. I implemented data caching strategies and progressive loading.',
        github: 'https://github.com/alexjohnson/weather-dashboard',
        demo: 'https://weather-demo.alexjohnson.dev'
    },
    portfolio: {
        title: 'Portfolio Website',
        description: 'This very website you\'re viewing! A responsive portfolio built with vanilla HTML, CSS, and JavaScript, featuring smooth animations, interactive elements, and modern design principles.',
        features: [
            'Fully responsive design without frameworks',
            'Smooth scroll animations and transitions',
            'Interactive contact form with validation',
            'Project showcase with modal displays',
            'Mobile-first approach',
            'Optimized performance and accessibility',
            'Cross-browser compatibility',
            'SEO-friendly structure'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Intersection Observer API', 'CSS Grid & Flexbox'],
        challenges: 'Creating complex animations and interactions using only vanilla JavaScript while maintaining performance across all devices. I used modern web APIs and optimized animation techniques.',
        github: 'https://github.com/alexjohnson/portfolio-website',
        demo: 'https://alexjohnson.dev'
    }
};

// Open modal when project card is clicked
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectKey = card.getAttribute('data-project');
        const project = projectDetails[projectKey];
        
        if (project) {
            modalBody.innerHTML = `
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${project.title}</h2>
                <p style="margin-bottom: 1.5rem; color: var(--text-light);">${project.description}</p>
                
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">Key Features</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
                </ul>
                
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                    ${project.technologies.map(tech => `<span style="background: var(--bg-light); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.9rem;">${tech}</span>`).join('')}
                </div>
                
                <h3 style="color: var(--text-dark); margin-bottom: 1rem;">Technical Challenges</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-light);">${project.challenges}</p>
                
                <div style="display: flex; gap: 1rem;">
                    <a href="${project.demo}" target="_blank" style="background: var(--primary-color); color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.5rem; font-weight: bold;">View Demo</a>
                    <a href="${project.github}" target="_blank" style="background: var(--text-dark); color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.5rem; font-weight: bold;">View Code</a>
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form validation and submission
const contactForm = document.getElementById('contact-form');
const formGroups = contactForm.querySelectorAll('.form-group');

// Real-time validation
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    input.addEventListener('blur', () => {
        validateField(group, input);
    });
    
    input.addEventListener('input', () => {
        if (group.classList.contains('error')) {
            validateField(group, input);
        }
    });
});

function validateField(group, input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Name validation (at least 2 characters)
    if (input.name === 'name' && value && value.length < 2) {
        isValid = false;
    }
    
    // Message validation (at least 10 characters)
    if (input.name === 'message' && value && value.length < 10) {
        isValid = false;
        group.querySelector('.error-message').textContent = 'Message must be at least 10 characters long';
    }
    
    if (isValid) {
        group.classList.remove('error');
    } else {
        group.classList.add('error');
    }
    
    return isValid;
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    
    // Validate all fields
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!validateField(group, input)) {
            isFormValid = false;
        }
    });
    
    if (isFormValid) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Show success message
                alert('Thank you for your message! I\'ll get back to you soon.');
            }, 2000);
        }, 1500);
    }
});

// Add loading animation for better UX
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);