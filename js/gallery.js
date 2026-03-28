const initGalleryCarousel = () => {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    if (!items.length) return;

    const carousel = document.createElement('div');
    carousel.className = 'carousel carousel--gallery';

    const viewport = document.createElement('div');
    viewport.className = 'carousel-viewport';

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-arrow carousel-arrow--prev';
    prevButton.type = 'button';
    prevButton.setAttribute('aria-label', 'Foto anterior');
    prevButton.textContent = '‹';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-arrow carousel-arrow--next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Próxima foto');
    nextButton.textContent = '›';

    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    const parent = grid.parentElement;
    if (!parent) return;

    parent.insertBefore(carousel, grid);
    carousel.appendChild(prevButton);
    carousel.appendChild(viewport);
    viewport.appendChild(grid);
    carousel.appendChild(nextButton);
    carousel.appendChild(dots);

    grid.classList.add('carousel-track');

    let currentIndex = 0;
    let touchStartX = 0;

    const goTo = (index) => {
        const total = items.length;
        currentIndex = (index + total) % total;
        grid.style.transform = `translateX(-${currentIndex * 100}%)`;

        dotButtons.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
            dot.setAttribute('aria-current', dotIndex === currentIndex ? 'true' : 'false');
        });
    };

    const dotButtons = items.map((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Ir para foto ${index + 1}`);
        dot.addEventListener('click', () => goTo(index));
        dots.appendChild(dot);
        return dot;
    });

    prevButton.addEventListener('click', () => goTo(currentIndex - 1));
    nextButton.addEventListener('click', () => goTo(currentIndex + 1));

    viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) < 35) return;
        if (deltaX < 0) {
            goTo(currentIndex + 1);
            return;
        }
        goTo(currentIndex - 1);
    }, { passive: true });

    goTo(0);
};

initGalleryCarousel();

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

const closeLightbox = () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
};

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        if (!lightbox || !lightboxImage || !lightboxCaption) {
            return;
        }

        const fullImage = item.getAttribute('data-full');
        const caption = item.getAttribute('data-caption') || '';

        if (!fullImage) {
            return;
        }

        lightboxImage.src = fullImage;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
