(function() {
  "use strict";

  // ---- LOADER (6 seconds) ----
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  const percentLabel = document.getElementById('loaderPercent');
  let startTime = performance.now();
  const DURATION = 6000; // 6 seconds

  function updateLoader() {
    const elapsed = performance.now() - startTime;
    let pct = Math.min((elapsed / DURATION) * 100, 100);
    progress.style.width = pct + '%';
    percentLabel.textContent = Math.floor(pct) + '%';
    if (pct < 100) {
      requestAnimationFrame(updateLoader);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Pause loader video after it's hidden
        const loaderVideo = document.getElementById('loader-video');
        if (loaderVideo) {
          loaderVideo.pause();
        }
      }, 400);
    }
  }
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(updateLoader);

  // ---- MAIN VIDEO TOGGLE (pause/play) ----
  const video = document.getElementById('bg-video');
  const toggleBtn = document.getElementById('videoToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  const toggleLabel = document.getElementById('toggleLabel');

  let videoPlaying = true;

  function toggleVideo() {
    if (videoPlaying) {
      video.pause();
      video.classList.add('hidden');
      toggleIcon.className = 'fas fa-play';
      toggleLabel.textContent = 'Play';
      videoPlaying = false;
    } else {
      video.play().catch(() => {});
      video.classList.remove('hidden');
      toggleIcon.className = 'fas fa-video';
      toggleLabel.textContent = 'Pause';
      videoPlaying = true;
    }
  }

  toggleBtn.addEventListener('click', toggleVideo);

  // if video fails, still show toggle
  video.addEventListener('error', function() {
    video.classList.add('hidden');
    toggleIcon.className = 'fas fa-play';
    toggleLabel.textContent = 'Play';
    videoPlaying = false;
  });

  // ---- MOBILE NAV TOGGLE ----
  const hamburger = document.getElementById('hamburgerToggle');
  const nav = document.getElementById('portalNav');
  const icon = hamburger.querySelector('i');

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
    icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
  });

  document.querySelectorAll('.portal-nav a').forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      icon.className = 'fas fa-bars';
    });
  });

  // close nav on outside click
  document.addEventListener('click', function(e) {
    const header = document.querySelector('.portal-header');
    if (!header.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      icon.className = 'fas fa-bars';
    }
  });

  // ---- CARD & NAV CLICKS (production redirects) ----
  const foundationCard = document.getElementById('cardFoundation');
  const clothingCard = document.getElementById('cardClothing');
  const foundationLink = document.getElementById('foundationLink');
  const clothingLink = document.getElementById('clothingLink');

  function goToFoundation(e) {
    if (e) e.preventDefault();
    window.location.href = 'page-foundation/';
  }

  function goToClothing(e) {
    if (e) e.preventDefault();
    window.location.href = 'page-clothing/';
  }

  foundationCard.addEventListener('click', goToFoundation);
  clothingCard.addEventListener('click', goToClothing);
  foundationLink.addEventListener('click', goToFoundation);
  clothingLink.addEventListener('click', goToClothing);

})();