// Função para abrir WhatsApp com diferentes mensagens
function abrirWhatsApp(tipo) {
    let mensagem = '';
    
    switch(tipo) {
        case 'geral':
            mensagem = 'Olá! Vi seu site e gostaria de solicitar um orçamento para criar meu website. Pode me ajudar?';
            break;
        case 'sobre':
            mensagem = 'Olá Luiz! Vi sua apresentação no site e gostaria de conversar sobre criar um website para minha empresa.';
            break;
        case 'projeto':
            mensagem = 'Olá! Quero que meu projeto seja o próximo na sua galeria. Pode me passar um orçamento?';
            break;
        case 'landing':
            mensagem = 'Olá! Tenho interesse no plano Landing Page. Pode me enviar mais detalhes e o valor?';
            break;
        case 'completo':
            mensagem = 'Olá! Quero o plano Website Completo. Pode me passar todas as informações?';
            break;
        case 'ecommerce':
            mensagem = 'Olá! Preciso de um e-commerce para minha loja. Pode me ajudar?';
            break;
        case 'oferta':
            mensagem = 'Olá! Vi a oferta especial no seu site. Quero aproveitar o desconto! Pode me ajudar?';
            break;
        case 'duvidas':
            mensagem = 'Olá! Tenho algumas dúvidas sobre os serviços. Pode me esclarecer?';
            break;
        default:
            mensagem = 'Olá! Vi seu site e gostaria de mais informações sobre seus serviços.';
    }
    
    const numeroWhatsApp = '35999902059';
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    // Analytics tracking (se necessário)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            event_category: 'contact',
            event_label: tipo
        });
    }
    
    window.open(url, '_blank');
}

// Toggle do menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Navegação suave e indicação da seção ativa
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar com efeito de scroll
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Event listeners para scroll
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbar();
    
    // Lazy loading de imagens (se necessário)
    lazyLoadImages();
});

// Navegação suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Altura da navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Timer para a seção de urgência
function initTimer() {
    // Define uma data final (30 dias a partir de agora como exemplo)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const diasElement = document.getElementById('dias');
        const horasElement = document.getElementById('horas');
        const minutosElement = document.getElementById('minutos');
        
        if (diasElement) diasElement.textContent = days.toString().padStart(2, '0');
        if (horasElement) horasElement.textContent = hours.toString().padStart(2, '0');
        if (minutosElement) minutosElement.textContent = minutes.toString().padStart(2, '0');
        
        if (distance < 0) {
            // Timer expirado - reinicia para mais 30 dias
            endDate.setDate(endDate.getDate() + 30);
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 60000); // Atualiza a cada minuto
}

// Lazy loading de imagens
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Animações ao scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .section-header, .projeto-card, .depoimento-card, .preco-card, .sobre-content'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Validação de formulários (se houver)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Processar formulário
                console.log('Formulário válido');
                // Aqui você pode adicionar o código para enviar o formulário
            }
        });
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--warning-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .error {
        border: 2px solid var(--warning-color) !important;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img[data-src] {
        opacity: 0;
    }
`;

document.head.appendChild(notificationStyles);

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizações de performance
function initPerformanceOptimizations() {
    // Debounce para eventos de scroll
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Tracking de eventos (Google Analytics)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Adicionar tracking aos botões importantes
document.addEventListener('click', function(e) {
    const button = e.target.closest('.cta, .botao-contato, .btn-preco, .floating-whatsapp');
    if (button) {
        const buttonText = button.textContent.trim();
        trackEvent('click', 'button', buttonText);
    }
});

// Função para precarregar imagens importantes
function preloadImages() {
    const importantImages = [
        'assets/img/teste.png',
        'assets/img/eveliny-site.png',
        'assets/img/doctor-site.png',
        'assets/img/orlando-costa.png'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showNotification('🚀 Modo desenvolvedor ativado! Você encontrou o easter egg!', 'success');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        konamiCode = [];
    }
});

// Inicialização quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Kartano Website carregado com sucesso!');
    
    // Inicializar todas as funcionalidades
    initTimer();
    initScrollAnimations();
    initFormValidation();
    initPerformanceOptimizations();
    preloadImages();
    
  
    // Adicionar efeito de typing no hero
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});



// Função para salvar leads (localStorage como backup)
function salvarLead(tipo, timestamp = new Date()) {
    const leads = JSON.parse(localStorage.getItem('kartano_leads') || '[]');
    leads.push({ tipo, timestamp });
    localStorage.setItem('kartano_leads', JSON.stringify(leads));
}

// Interceptar cliques no WhatsApp para salvar leads
const originalAbrirWhatsApp = abrirWhatsApp;
abrirWhatsApp = function(tipo) {
    salvarLead(tipo);
    trackEvent('lead_generation', 'whatsapp', tipo);
    return originalAbrirWhatsApp(tipo);
};


function toggleFaq(element) {
            const faqItem = element.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Se não estava ativo, ativa o clicado
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Função para abrir WhatsApp (você pode adaptar conforme sua função existente)
        function abrirWhatsApp(tipo) {
            let mensagem = 'Olá! Tenho algumas dúvidas sobre landing pages. Pode me esclarecer?';
            const numeroWhatsApp = '35999902059';
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        }

        // Animação ao scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.faq-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });

// Animação ao scroll
const observerFaq = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('.faq-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observerFaq.observe(item);
});


console.log('🎨 Kartano - Criando experiências digitais únicas | Desenvolvido com ❤️ por Luiz');