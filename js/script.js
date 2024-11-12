 // Loader
 window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('fade-out');
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Cerrar menú móvil si está abierto
        navLinks.classList.remove('active');
    });
});

// Botón scroll top
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animación del header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        return;
    }

    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    contactForm.reset();
});

// Animación de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Crear overlay para el menú móvil
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

// Toggle menú móvil
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer click en el overlay
overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Cerrar menú al hacer click en los enlaces
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cambiar estilo del header al hacer scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});