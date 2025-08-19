// Function to handle opening WhatsApp links
function abrirWhatsApp(tipo) {
    let url;
    if (tipo === 'geral') {
        url = 'https://wa.me/35999902059?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.';
    } else if (tipo === 'duvidas') {
        url = 'https://wa.me/35999902059?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida.';
    }
    window.open(url, '_blank');
}

// Mobile menu toggle
document.getElementById('mobile-menu').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-menu').classList.toggle('active');
});

// Add 'active' class to nav links on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add 'scrolled' class to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});