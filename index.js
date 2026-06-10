// ============================
// NAVIGATION
// ============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const allNavLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navOverlay.addEventListener('click', () => {
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Close mobile nav on link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
function highlightNavLink() {
  const scrollY = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}
window.addEventListener('scroll', highlightNavLink);

// ============================
// TYPING EFFECT
// ============================
const typingElement = document.getElementById('typingText');
const titles = [
  'Principal Specialist, IT Development',
  'Java & Spring Boot Expert',
  'Microservices Architect',
  'Cloud & AWS Specialist',
  'AI-Powered Developer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    typingElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typingElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentTitle.length) {
    typingSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typingSpeed = 400; // Pause before next word
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ============================
// SCROLL REVEAL ANIMATIONS
// ============================
const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

function reveal() {
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ============================
// COUNTER ANIMATION
// ============================
const statValues = document.querySelectorAll('.hero-stat-value[data-count]');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  statValues.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-count'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (isDecimal) {
        stat.textContent = current.toFixed(1) + '+';
      } else {
        stat.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
      }
    }, 16);
  });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateCounters, 800);
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================
// PARALLAX ON FLOATING ICONS
// ============================
const floatingIcons = document.querySelectorAll('.floating-icon');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function parallaxIcons() {
  floatingIcons.forEach((icon, index) => {
    const speed = (index + 1) * 5;
    const x = mouseX * speed;
    const y = mouseY * speed;
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(parallaxIcons);
}

parallaxIcons();

// ============================
// SKILL TAG HOVER TILT
// ============================
document.querySelectorAll('.skill-category').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================
// ACHIEVEMENT CARDS COUNT-UP
// ============================
const achievementValues = document.querySelectorAll('.achievement-value');
const achievementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const target = parseInt(text);
      if (isNaN(target)) return;

      const suffix = text.replace(/[0-9]/g, '');
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 16);

      achievementObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

achievementValues.forEach(val => achievementObserver.observe(val));

// ============================
// CURSOR GLOW EFFECT
// ============================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.06), transparent 70%);
  pointer-events: none;
  z-index: -1;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

console.log('%c👋 Hey there! Thanks for checking out the code.', 'color: #38bdf8; font-size: 14px; font-weight: bold;');
console.log('%c📧 Contact: roshan.sonone2011@gmail.com', 'color: #818cf8; font-size: 12px;');
