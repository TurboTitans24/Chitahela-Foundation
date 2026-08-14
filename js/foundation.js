(function() {
  "use strict";

  // ---- MAIN VIDEO TOGGLE (pause/play) ----
  const video = document.getElementById('bg-video');
  let videoPlaying = true;

  // Create toggle button dynamically if it doesn't exist
  let toggleBtn = document.getElementById('videoToggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'video-toggle';
    toggleBtn.id = 'videoToggle';
    toggleBtn.setAttribute('aria-label', 'Toggle background video');
    toggleBtn.innerHTML = '<i class="fas fa-video" id="toggleIcon"></i> <span id="toggleLabel">Pause</span>';
    document.body.appendChild(toggleBtn);

    // Add styles for the toggle button (if not already in CSS)
    const style = document.createElement('style');
    style.textContent = `
      .video-toggle {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 999;
        background: rgba(11, 10, 10, 0.75);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: var(--gold);
        padding: 12px 18px;
        border-radius: 40px;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
      }
      .video-toggle:hover {
        background: var(--gold);
        color: var(--deep);
        transform: scale(1.05);
        border-color: var(--gold);
      }
      .video-toggle i {
        font-size: 1.1rem;
      }
      @media (max-width: 768px) {
        .video-toggle {
          bottom: 24px;
          left: auto;
          right: 20px;
          padding: 10px 14px;
          font-size: 0.65rem;
          gap: 6px;
          border-radius: 30px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const toggleIcon = document.getElementById('toggleIcon');
  const toggleLabel = document.getElementById('toggleLabel');

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

  // If video fails, still show toggle
  video.addEventListener('error', function() {
    video.classList.add('hidden');
    toggleIcon.className = 'fas fa-play';
    toggleLabel.textContent = 'Play';
    videoPlaying = false;
  });

  // ---- MOBILE NAV TOGGLE ----
  const hamburger = document.getElementById('hamburgerToggle');
  const nav = document.getElementById('foundationNav');
  const icon = hamburger ? hamburger.querySelector('i') : null;

  if (hamburger && nav && icon) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('active');
      icon.className = nav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });

    document.querySelectorAll('.foundation-nav a').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        icon.className = 'fas fa-bars';
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function(e) {
      const header = document.querySelector('.foundation-header');
      if (!header.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        icon.className = 'fas fa-bars';
      }
    });
  }

  // ---- NAV CLICK: BACK TO PORTAL ----
  const portalLink = document.getElementById('portalLink');
  if (portalLink) {
    portalLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '../index.html';
    });
  }

})();