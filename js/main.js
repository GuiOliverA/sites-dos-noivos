const header = document.querySelector('.site-header');
const nav = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

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

const toggleHeaderState = () => {
    if (!header) {
        return;
    }

    header.classList.toggle('site-header--scrolled', window.scrollY > 12);
};

toggleHeaderState();
window.addEventListener('scroll', toggleHeaderState, { passive: true });

const setActiveNavItem = (sectionId) => {
    navItems.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isActive);
    });
};

const navObserver = new IntersectionObserver(
    (entries) => {
        const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
            setActiveNavItem(visibleSection.target.id);
        }
    },
    {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-35% 0px -45% 0px'
    }
);

sections.forEach((section) => navObserver.observe(section));

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

const initGiftPixInteraction = () => {
    const giftsSection = document.querySelector('#presentes.section-gifts');
    const pixCard = document.querySelector('#pix-card');
    const backdrop = document.querySelector('#gifts-backdrop');
    const closeButton = document.querySelector('#pix-close');
    const copyButton = document.querySelector('#copy-pix-key');
    const keyText = document.querySelector('#pix-key-text');
    const feedback = document.querySelector('#pix-copy-feedback');
    const pixToast = document.querySelector('#pix-toast');
    const pixToastIcon = document.querySelector('#pix-toast-icon');
    const pixToastTitle = document.querySelector('#pix-toast-title');
    const pixToastSub = document.querySelector('#pix-toast-sub');
    let toastTimeoutId;

    if (!giftsSection || !pixCard || !backdrop || !closeButton || !copyButton || !keyText || !feedback) {
        return;
    }

    const setOpen = (isOpen) => {
        giftsSection.classList.toggle('pix-open', isOpen);
        pixCard.setAttribute('aria-expanded', String(isOpen));
    };

    const showPixToast = (isSuccess) => {
        if (!pixToast || !pixToastIcon || !pixToastTitle || !pixToastSub) {
            return;
        }

        if (isSuccess) {
            pixToastIcon.textContent = '✓';
            pixToastIcon.style.background = '#e6f4ec';
            pixToastIcon.style.color = '#1f6b38';
            pixToastTitle.textContent = 'Chave PIX copiada com sucesso!🥂';
            pixToastSub.textContent = 'Cole no app do seu banco para concluir.';
        } else {
            pixToastIcon.textContent = '!';
            pixToastIcon.style.background = '#fdeaea';
            pixToastIcon.style.color = '#a32d2d';
            pixToastTitle.textContent = 'Nao foi possivel copiar a chave PIX.';
            pixToastSub.textContent = 'Tente novamente em alguns segundos.';
        }

        pixToast.classList.add('pix-toast--visible');
        window.clearTimeout(toastTimeoutId);
        toastTimeoutId = window.setTimeout(() => {
            pixToast.classList.remove('pix-toast--visible');
        }, 2800);
    };

    pixCard.addEventListener('click', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest('.pix-copy-btn')) {
            return;
        }
        setOpen(true);
    });

    pixCard.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(true);
        }
    });

    backdrop.addEventListener('click', () => setOpen(false));
    closeButton.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && giftsSection.classList.contains('pix-open')) {
            setOpen(false);
        }
    });

    copyButton.addEventListener('click', async () => {
        const pixKey = keyText.textContent?.trim() ?? '';
        if (!pixKey) {
            feedback.textContent = 'Chave PIX indisponivel no momento.';
            showPixToast(false);
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(pixKey);
            } else {
                const input = document.createElement('textarea');
                input.value = pixKey;
                input.setAttribute('readonly', '');
                input.style.position = 'absolute';
                input.style.left = '-9999px';
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                input.remove();
            }
            feedback.textContent = 'Chave PIX copiada com sucesso.';
            showPixToast(true);
        } catch (error) {
            feedback.textContent = 'Nao foi possivel copiar. Tente novamente.';
            showPixToast(false);
        }
    });
};

initGiftPixInteraction();
