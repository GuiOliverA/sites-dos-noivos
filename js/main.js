const header = document.querySelector('.site-header');
const nav = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const revealElements = document.querySelectorAll('.reveal');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('nav-open');
    });
}

const closeMenu = () => {
    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
};

anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        const offset = header ? header.offsetHeight - 2 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
        closeMenu();
    });
});

if (navLinks) {
    navLinks.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
            closeMenu();
        }
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));
