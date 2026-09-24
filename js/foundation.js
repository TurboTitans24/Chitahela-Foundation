// foundation.js
(function() {
  "use strict";

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  const percentLabel = document.getElementById('loaderPercent');
  let startTime = performance.now();
  const DURATION = 5000;

  function updateLoader() {
    const elapsed = performance.now() - startTime;
    let pct = Math.min((elapsed / DURATION) * 100, 100);
    if (progress) progress.style.width = pct + '%';
    if (percentLabel) percentLabel.textContent = Math.floor(pct) + '%';
    if (pct < 100) {
      requestAnimationFrame(updateLoader);
    } else {
      setTimeout(function() {
        if (loader) loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        const loaderVideo = document.getElementById('loader-video');
        if (loaderVideo) loaderVideo.pause();
      }, 400);
    }
  }
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(updateLoader);

  // ---- THEME TOGGLE (Dark / Purple) ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');
  let currentTheme = 'dark';

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'purple');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeLabel) themeLabel.textContent = 'Purple';
        currentTheme = 'purple';
      } else if (currentTheme === 'purple') {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeLabel) themeLabel.textContent = 'Dark';
        currentTheme = 'dark';
      }
    });
  }

  // ---- MOTION LOGO ----
  const logoSlides = document.querySelectorAll('.logo-slide');
  let logoIndex = 0;

  function rotateLogo() {
    logoSlides.forEach(function(s) {
      s.classList.remove('active');
    });
    logoIndex = (logoIndex + 1) % logoSlides.length;
    logoSlides[logoIndex].classList.add('active');
  }
  if (logoSlides.length > 0) {
    setInterval(rotateLogo, 3000);
  }

  // ---- MOBILE NAV ----
  const hamburger = document.getElementById('hamburgerToggle');
  const nav = document.getElementById('foundationNav');
  const icon = hamburger ? hamburger.querySelector('i') : null;

  if (hamburger && nav && icon) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    document.querySelectorAll('.foundation-nav a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    document.addEventListener('click', function(e) {
      const header = document.querySelector('.foundation-header');
      if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // ---- GALLERY ----
  const galleryGrid = document.getElementById('galleryGrid');
  const photoNames = [];
  for (var i = 1; i <= 15; i++) {
    photoNames.push('hela' + i + '.jpeg');
  }

  if (galleryGrid) {
    photoNames.forEach(function(name, index) {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = '../rsc/foundation/' + name;
      img.alt = 'Foundation moment ' + (index + 1);
      img.loading = 'lazy';

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = '<span><i class="fas fa-camera"></i>  ' + (index + 1) + '</span>';

      item.appendChild(img);
      item.appendChild(overlay);
      galleryGrid.appendChild(item);
    });
  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = this.getAttribute('href');
      if (target === '#') return;
      const element = document.querySelector(target);
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- ENSURE VIDEOS PLAY ----
  document.querySelectorAll('.impact-card video, #contact-video').forEach(function(video) {
    video.play().catch(function() {});
  });

  // ---- CONTACT VIDEO VISIBILITY ----
  const contactVideo = document.getElementById('contact-video');
  const contactSection = document.getElementById('contact');

  if (contactVideo && contactSection) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          contactVideo.play().catch(function() {});
        }
      });
    }, { threshold: 0.3 });

    observer.observe(contactSection);
  }

  // ============================================================
  // NEW: DONATION MODAL
  // ============================================================
  const donateBtn = document.getElementById('donateBtn');
  const donationModal = document.getElementById('donationModal');
  const closeModalBtn = document.getElementById('closeDonationModal');
  const thanksBtn = document.getElementById('donationThanksBtn');

  function openDonationModal(e) {
    if (e) e.preventDefault();
    if (donationModal) {
      donationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDonationModal() {
    if (donationModal) {
      donationModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (donateBtn) {
    donateBtn.addEventListener('click', openDonationModal);
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeDonationModal);
  }
  if (thanksBtn) {
    thanksBtn.addEventListener('click', closeDonationModal);
  }
  // Close on backdrop click
  if (donationModal) {
    donationModal.addEventListener('click', function(e) {
      if (e.target === donationModal) {
        closeDonationModal();
      }
    });
  }
  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && donationModal && donationModal.classList.contains('active')) {
      closeDonationModal();
    }
  });

  // ============================================================
  // NEW: AUTO-TYPING TEXT FOR VOLUNTEER & PARTNER BUTTONS
  // ============================================================
  /**
   * Typewriter that writes then deletes text, preserving button size.
   * When text is cleared, a zero-width space keeps the element height stable.
   */
  function createTypewriter(element, phrases, options) {
    if (!element) return;
    const opts = Object.assign({
      typeSpeed: 70,
      deleteSpeed: 40,
      pauseAfterType: 2200, // ms to wait after full phrase
      pauseAfterDelete: 600 // ms to wait after deletion before next phrase
    }, options || {});

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      const displayText = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      // Use a zero-width space when empty to preserve layout height
      element.textContent = displayText.length === 0 ? '\u200B' : displayText;

      if (!isDeleting) {
        charIndex++;
        if (charIndex > currentPhrase.length) {
          // Finished typing the whole phrase
          isDeleting = true;
          setTimeout(typeLoop, opts.pauseAfterType);
          return;
        }
        setTimeout(typeLoop, opts.typeSpeed);
      } else {
        charIndex--;
        if (charIndex < 0) {
          // Finished deleting
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          setTimeout(typeLoop, opts.pauseAfterDelete);
          return;
        }
        setTimeout(typeLoop, opts.deleteSpeed);
      }
    }

    // Start with zero-width space to maintain initial height
    element.textContent = '\u200B';
    typeLoop();
  }

  // Apply to Volunteer button
  const volunteerBtn = document.getElementById('volunteerBtn');
  if (volunteerBtn) {
    createTypewriter(volunteerBtn, ['Join Us', 'Volunteer Now', 'Be the Change', 'Lend a Hand'], {
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseAfterType: 2000,
      pauseAfterDelete: 500
    });
  }

  // Apply to Partner button
  const partnerBtn = document.getElementById('partnerBtn');
  if (partnerBtn) {
    createTypewriter(partnerBtn, ['Partner With Us', 'Collaborate', 'Build Together', 'Make an Impact'], {
      typeSpeed: 80,
      deleteSpeed: 50,
      pauseAfterType: 2000,
      pauseAfterDelete: 500
    });
  }

})();