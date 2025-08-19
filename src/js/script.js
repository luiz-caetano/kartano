// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Previne scroll quando menu está aberto
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

function abrirWhatsApp(tipo) {
  const numero = "5535999902059"; 
  let mensagem = "";
  
  if (tipo === 'geral') {
    mensagem = "Olá! Gostaria de saber mais sobre os serviços da Kartano.";
  } else if (tipo === 'duvidas') {
    mensagem = "Olá! Tenho algumas dúvidas sobre os serviços da Kartano.";
  }
  
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Ajuste para navbar fixa
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Animação ao scroll - Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll('.motivo, .plano, .projeto-card, .depoimento-card');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Loading effect para imagens
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores antigos
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
});

// Typing effect para o hero (opcional)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Counter animation para estatísticas (se quiser adicionar)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start < target) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Form validation (para quando houver formulário)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    const errorElement = input.nextElementSibling;
    
    if (!input.value.trim()) {
      input.classList.add('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = 'Este campo é obrigatório';
      }
      isValid = false;
    } else {
      input.classList.remove('error');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
      }
    }
    
    // Validação de email
    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.classList.add('error');
        if (errorElement && errorElement.classList.contains('error-message')) {
          errorElement.textContent = 'Digite um email válido';
        }
        isValid = false;
      }
    }
  });
  
  return isValid;
}



// Performance: Debounce para scroll
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Aplica debounce ao scroll
const debouncedScroll = debounce(() => {
  // Suas funções de scroll aqui
}, 10);

window.addEventListener('scroll', debouncedScroll);