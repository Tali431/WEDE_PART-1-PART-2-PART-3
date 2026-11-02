// myscript.js - COMPLETE FINAL - Old work + Cat Lightbox + Next/Prev
document.addEventListener('DOMContentLoaded', () => {

// ===== AUTO HIGHLIGHT MENU - highlights page you are on =====
const navMenuLinks = document.querySelectorAll('.nav-links a, nav a');
let currentPage = window.location.pathname.split('/').pop();
if (!currentPage || currentPage === '') currentPage = 'index.html';
if (currentPage.includes('?')) currentPage = currentPage.split('?')[0];

navMenuLinks.forEach((link) => {
  link.classList.remove('active');
  const href = link.getAttribute('href') || '';
  // Match: about.html == about.html, or index.html == / or empty
  if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === './' || href === '/' || href === ''))) {
    link.classList.add('active');
  }
  // Also if link is "about.html" and you are on "about.html" - highlight it
  if (href !== '' && currentPage !== 'index.html' && href.includes(currentPage)) {
    link.classList.add('active');
  }
});


  // ===== OLD WORK 1 - MENU / HAMBURGER =====
  const navToggle = document.querySelector('.nav-toggle') || document.querySelector('#nav-toggle') || document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links') || document.querySelector('#nav-links') || document.querySelector('nav ul');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navLinks.classList.toggle('active');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.classList.remove('active');
      });
    });
  }

  // ===== OLD WORK 2 - GALLERY FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn, [data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = (btn.getAttribute('data-filter') || btn.textContent || 'all').trim().toLowerCase();
        galleryItems.forEach((item) => {
          const cat = (item.getAttribute('data-category') || item.textContent || '').toLowerCase();
          if (filter === 'all' || cat.includes(filter)) item.style.display = '';
          else item.style.display = 'none';
        });
      });
    });
  }

  // ===== NEW - CAT LIGHTBOX - NEXT / PREV MUST WORK =====
  const galleryImages = Array.from(document.querySelectorAll('.gallery-item img, .about-page img, .image-card img'));
  const lightbox = document.getElementById('lightbox') || document.querySelector('.lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const nextBtn = document.getElementById('next-btn') || document.querySelector('.lightbox-next');
  const prevBtn = document.getElementById('prev-btn') || document.querySelector('.lightbox-prev');
  const closeBtn = document.getElementById('close') || document.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg || galleryImages.length === 0) return;

  let currentIndex = 0;

  // Get only VISIBLE images - so filter still works, but Next/Prev never breaks
  function getVisibleImages() {
    const visible = galleryImages.filter((img) => {
      const item = img.closest('.gallery-item');
      return !item || item.style.display !== 'none';
    });
    return visible.length > 0 ? visible : galleryImages;
  }

  function openLightbox(index) {
    const list = getVisibleImages();
    currentIndex = index;
    const img = list[currentIndex];
    if (!img) return;
    lightboxImg.src = img.src;
    const item = img.closest('.gallery-item');
    const cap = item ? item.querySelector('figcaption') : null;
    if (lightboxCaption) lightboxCaption.textContent = cap ? cap.textContent : (img.alt || '');
    lightbox.classList.add('active');
    lightbox.classList.add('open');
    lightbox.style.display = 'flex';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.classList.remove('open');
    lightbox.style.display = 'none';
  }

  function showNext() {
    const list = getVisibleImages();
    currentIndex = (currentIndex + 1) % list.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    const list = getVisibleImages();
    currentIndex = (currentIndex - 1 + list.length) % list.length;
    openLightbox(currentIndex);
  }

  // Click image -> open in middle IMMEDIATELY, do NOT go to new page
galleryImages.forEach((img) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const list = getVisibleImages();
    const idx = list.indexOf(img);
    openLightbox(idx === -1 ? 0 : idx);
  });

  // ALSO stop the <a> around the image, if there is one - this is the bug
  const link = img.closest('a');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }
});

  // NEXT / PREV - THIS IS WHAT WAS NOT WORKING BEFORE - NOW FIXED
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Click dark area to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard - Right = next, Left = prev, Esc = close
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    }
  });

});

/* =========================================
   DMR YPD - AUTOMATIC PAGE ANIMATIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const animatedElements = document.querySelectorAll(`

        .page-banner,

        .gallery-section,
        .gallery-item,

        .news-card,
        .page-title,

        .meetings-card,
        .cta-card,
        .events-table-modern,

        .resources-section,
        .resource-card,
        .video-card,

        .contact-card,
        .card-dark-contact,
        .form-card,
        .contact-form-clean,

        .enquiries-form,
        .enq-form,
        .enq-card,
        .enquiry-card,
        .enquiry-info,
        .faq-section details,
        .other-contact

    `);

    // Reveal elements as visitors scroll
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    animatedElements.forEach((element, index) => {

        element.classList.add("reveal-on-scroll");

        // Slight delay creates a smooth sequence
        element.style.transitionDelay =
            `${(index % 4) * 0.12}s`;

        observer.observe(element);

    });

});
