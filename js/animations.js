// Función para manejar las animaciones de scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
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

function createScrollAnimations() {
    // Elementos a animar
    const sections = document.querySelectorAll('section');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    // Añadir clases iniciales
    const elementsToAnimate = [
        ...sections,
        ...projectCards,
        ...skillCards,
        ...certificationCards
    ];
    
    elementsToAnimate.forEach(element => {
        element.classList.add('hidden');
    });

    // Crear el observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Desconectar el observer después de mostrar el elemento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos
    elementsToAnimate.forEach(element => observer.observe(element));
}

// Animaciones específicas para diferentes secciones
function initializeSpecificAnimations() {

    // Animación para las tarjetas de proyectos
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('hidden');
        if (index % 2 === 0) {
            card.classList.add('slide-left');
        } else {
            card.classList.add('slide-right');
        }
    });

    // Animación para las tarjetas de habilidades
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Animación para el navbar en scroll
function initializeNavbarAnimation() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll hacia abajo
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll hacia arriba
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Inicializar todas las animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    createScrollAnimations();
    initializeSpecificAnimations();
    initializeNavbarAnimation();
});