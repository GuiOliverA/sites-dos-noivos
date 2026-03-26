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
