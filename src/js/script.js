// ===================================
// KARTANO - Modern Portfolio JS
// ===================================

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// ===================================
// CUSTOM CURSOR
// ===================================
const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor with GSAP
gsap.ticker.add(() => {
  // Cursor
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * 0.3;
  cursorY += dy * 0.3;
  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

  // Follower
  const dfx = mouseX - followerX;
  const dfy = mouseY - followerY;
  followerX += dfx * 0.15;
  followerY += dfy * 0.15;
  cursorFollower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project__card');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.5)';
    cursorFollower.style.transform += ' scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
  });
});

// Hide cursor on mobile
if (window.innerWidth < 768) {
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
}

// ===================================
// LOADING SCREEN
// ===================================
// window.addEventListener('load', () => {
//   const loadingScreen = document.querySelector('.loading-screen');
  
//   gsap.to('.loading-progress', {
//     width: '100%',
//     duration: 2,
//     ease: 'power2.inOut'
//   });
  
//   setTimeout(() => {
//     gsap.to(loadingScreen, {
//       opacity: 0,
//       duration: 0.5,
//       onComplete: () => {
//         loadingScreen.style.display = 'none';
//         initAnimations();
//       }
//     });
//   }, 2200);
// });

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
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

// Smooth scroll
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// GSAP ANIMATIONS
// ===================================
function initAnimations() {
  // Hero animations
  const heroTimeline = gsap.timeline();
  
  heroTimeline
    .from('.hero__badge', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero__title-line', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero__description', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero__actions .btn', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero__stat', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.6');
  
  // Hero cards animation
  gsap.from('.hero__card', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.hero__visual',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Hero cards parallax
  gsap.to('.hero__card--1', {
    y: -30,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero__card--2', {
    y: -50,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero__card--3', {
    y: -70,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  // Section headers animation
  gsap.utils.toArray('.section__header').forEach(header => {
    gsap.from(header, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Projects animation
  gsap.utils.toArray('.project__card').forEach((card, index) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    });
  });
  
  // Pricing cards animation
  gsap.utils.toArray('.pricing__card').forEach((card, index) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.15
    });
  });
  
  // Testimonials animation
  gsap.utils.toArray('.testimonial__card').forEach((card, index) => {
    gsap.from(card, {
      x: index % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // FAQ animation
  gsap.utils.toArray('.faq__item').forEach((item, index) => {
    gsap.from(item, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    });
  });
  
  // Parallax background gradient
  gsap.to('.hero__gradient', {
    y: 200,
    scale: 1.2,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  // Stats counter animation
  const stats = document.querySelectorAll('.hero__stat-number');
  stats.forEach(stat => {
    const target = stat.textContent;
    const isNumber = /^\d+$/.test(target);
    
    if (isNumber) {
      gsap.from(stat, {
        textContent: 0,
        duration: 2,
        ease: 'power1.inOut',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top center+=200',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });
}

// ===================================
// FAQ ACCORDION
// ===================================
function toggleFaq(button) {
  const faqItem = button.closest('.faq__item');
  const wasActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq__item').forEach(item => {
    item.classList.remove('active');
    const answer = item.querySelector('.faq__answer');
    gsap.to(answer, {
      maxHeight: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    });
  });
  
  // Open clicked item if it wasn't active
  if (!wasActive) {
    faqItem.classList.add('active');
    const answer = faqItem.querySelector('.faq__answer');
    gsap.to(answer, {
      maxHeight: answer.scrollHeight + 'px',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }
}

// ===================================
// WHATSAPP FUNCTION
// ===================================
function abrirWhatsApp(tipo) {
  let mensagem = '';
  
  const mensagens = {
    'geral': 'Olá! Vi seu site e gostaria de solicitar um orçamento para criar meu website. Pode me ajudar?',
    'sobre': 'Olá Luiz! Vi sua apresentação no site e gostaria de conversar sobre criar um website para minha empresa.',
    'projeto': 'Olá! Quero que meu projeto seja o próximo na sua galeria. Pode me passar um orçamento?',
    'landing': 'Olá! Tenho interesse no plano Landing Page. Pode me enviar mais detalhes e o valor?',
    'completo': 'Olá! Quero o plano Website Completo. Pode me passar todas as informações?',
    'ecommerce': 'Olá! Preciso de um e-commerce para minha loja. Pode me ajudar?',
    'oferta': 'Olá! Vi a oferta especial no seu site. Quero aproveitar o desconto! Pode me ajudar?',
    'duvidas': 'Olá! Tenho algumas dúvidas sobre os serviços. Pode me esclarecer?'
  };
  
  mensagem = mensagens[tipo] || mensagens['geral'];
  
  const numeroWhatsApp = '35999902059';
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  
  // Analytics tracking (if available)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label: tipo
    });
  }
  
  window.open(url, '_blank');
}

// Make function globally available
window.abrirWhatsApp = abrirWhatsApp;
window.toggleFaq = toggleFaq;

// ===================================
// INTERSECTION OBSERVER
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ===================================
// PROJECT CARDS TILT EFFECT
// ===================================
const projectCards = document.querySelectorAll('.project__card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===================================
// HERO CARDS MOUSE PARALLAX
// ===================================
const heroVisual = document.querySelector('.hero__visual');
const heroCards = document.querySelectorAll('.hero__card');

if (heroVisual && window.innerWidth > 1024) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    heroCards.forEach((card, index) => {
      const speed = (index + 1) * 10;
      gsap.to(card, {
        x: x * speed,
        y: y * speed,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  heroVisual.addEventListener('mouseleave', () => {
    heroCards.forEach(card => {
      gsap.to(card, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ===================================
// PRICING CARDS HOVER EFFECT
// ===================================
const pricingCards = document.querySelectorAll('.pricing__card');

pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// ===================================
// TESTIMONIAL CARDS ANIMATION
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial__card');

testimonialCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// ===================================
// FLOATING WHATSAPP PULSE
// ===================================
const floatingWhatsapp = document.querySelector('.floating-whatsapp');

gsap.to(floatingWhatsapp, {
  scale: 1.1,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut'
});

// ===================================
// PAGE VISIBILITY
// ===================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    gsap.globalTimeline.pause();
  } else {
    // Resume animations when page is visible
    gsap.globalTimeline.resume();
  }
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
  // Scroll optimizations here
}, 10), { passive: true });

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🎨 Kartano Portfolio', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cDesenvolvido com ❤️ por Luiz Caetano', 'font-size: 14px; color: #a1a1aa;');
console.log('%cVisite: https://www.kartano.com.br', 'font-size: 12px; color: #71717a;');

// ===================================
// ACCESSIBILITY
// ===================================

// Skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#inicio';
skipLink.className = 'skip-to-content';
skipLink.textContent = 'Pular para o conteúdo';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.prepend(skipLink);

// Keyboard navigation for FAQ
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(button);
    }
  });
});

// Focus trap for mobile menu
document.getElementById('mobile-menu').addEventListener('click', () => {
  if (navMenu.classList.contains('active')) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    if (focusableElements.length > 0) {
      setTimeout(() => focusableElements[0].focus(), 100);
    }
  }
});

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===================================
// INITIALIZATION COMPLETE
// ===================================
console.log('✅ Portfolio initialized successfully');