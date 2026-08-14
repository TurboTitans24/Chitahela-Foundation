(function() {
  "use strict";

  // ===== LOADING SCREEN =====
  document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('loadingProgress');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = 'auto';
          const loaderVideo = document.getElementById('loader-video');
          if (loaderVideo) loaderVideo.pause();
        }, 500);
      }
      progressBar.style.width = Math.min(progress, 100) + '%';
    }, 150);
  });

  // ===== MOTION LOGO =====
  const logoSlides = document.querySelectorAll('.logo-slide');
  let logoIndex = 0;
  setInterval(() => {
    logoSlides.forEach(s => s.classList.remove('active'));
    logoIndex = (logoIndex + 1) % logoSlides.length;
    logoSlides[logoIndex].classList.add('active');
  }, 3000);

  // ===== HEADER SCROLL =====
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navIcon = hamburger ? hamburger.querySelector('i') : null;

  if (hamburger && nav && navIcon) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('active');
      navIcon.classList.toggle('fa-bars');
      navIcon.classList.toggle('fa-times');
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        navIcon.classList.add('fa-bars');
        navIcon.classList.remove('fa-times');
      });
    });
  }

  // ===== PRODUCT DATA =====
  const products = [
    {
      id: 1,
      title: 'Chitahela Original T-shirt',
      category: 'T-Shirts',
      price: 200,
      originalPrice: 280,
      image: '../rsc/b2.jpeg',
      badge: 'New',
      badgeType: 'new',
      images: ['../rsc/b1.jpeg', '../rsc/b2.jpeg']
    },
    {
      id: 2,
      title: 'Chitahela Deluxe T-shirt',
      category: 'T-Shirts',
      price: 350,
      originalPrice: 400,
      image: '../rsc/a2.jpeg',
      badge: 'Bestseller',
      badgeType: 'bestseller',
      images: ['../rsc/a1.jpeg', '../rsc/a2.jpeg']
    },
    {
      id: 3,
      title: 'Urban Hoodie',
      category: 'Hoodies',
      price: 400,
      originalPrice: null,
      image: '../rsc/sample3.jpeg',
      badge: 'Limited',
      badgeType: 'limited',
      images: ['../rsc/sample3.jpeg']
    },
    {
      id: 4,
      title: 'Signature Cap',
      category: 'Accessories',
      price: 150,
      originalPrice: null,
      image: '../rsc/cap.jpeg',
      badge: 'Sale',
      badgeType: 'sale',
      images: ['../rsc/cap.jpeg']
    }
  ];

  // ===== RENDER PRODUCTS =====
  const productGrid = document.getElementById('productGrid');

  if (productGrid) {
    products.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      
      let badgeClass = '';
      if (product.badgeType === 'sale') badgeClass = 'sale';
      else if (product.badgeType === 'limited') badgeClass = 'sold-out';
      
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}" class="product-image" id="product-img-${index}">
          <div class="product-badge ${badgeClass}">${product.badge}</div>
          <button class="quick-view-btn" data-id="${product.id}"><i class="fas fa-eye"></i> Quick View</button>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
            <span>(24)</span>
          </div>
          <div class="product-price">
            <span class="current-price">R${product.price}</span>
            ${product.originalPrice ? `<span class="original-price">R${product.originalPrice}</span>` : ''}
          </div>
          <div class="product-actions">
            <a href="mailto:chitahelaza@gmail.com?subject=Inquiry about ${product.title}" class="action-btn primary">Inquire</a>
            <a href="https://wa.me/27602130149?text=Hello! I'm interested in the ${product.title}." class="action-btn outline">WhatsApp</a>
          </div>
        </div>
      `;
      
      productGrid.appendChild(card);

      // Image rotation
      if (product.images && product.images.length > 1) {
        const img = document.getElementById(`product-img-${index}`);
        if (img) {
          let imgIndex = 0;
          setInterval(() => {
            imgIndex = (imgIndex + 1) % product.images.length;
            img.style.opacity = 0;
            setTimeout(() => {
              img.src = product.images[imgIndex];
              img.style.opacity = 1;
            }, 200);
          }, 3000 + index * 1000);
        }
      }
    });
  }

  // ===== COLLECTIONS DATA =====
  const collections = [
    { title: 'Original T-Shirt', price: 'R200', image: '../rsc/ai1.png' },
    { title: 'Deluxe T-Shirt', price: 'R350', image: '../rsc/ai2.png' },
    { title: 'Female Hoodie', price: 'R400', image: '../rsc/ai3.png' },
    { title: 'Ladies Tracksuit', price: 'R600', image: '../rsc/ai4.png' },
    { title: 'Custom Hoodie', price: 'R400', image: '../rsc/ai5.png' },
    { title: 'Modern Hoodie', price: 'R400', image: '../rsc/ai6.png' },
    { title: 'Chitahela Tracksuit', price: 'R600', image: '../rsc/ai7.png' }
  ];

  const collectionsGrid = document.getElementById('collectionsGrid');
  if (collectionsGrid) {
    collections.forEach(col => {
      const card = document.createElement('div');
      card.className = 'collection-card';
      card.innerHTML = `
        <div class="collection-image">
          <img src="${col.image}" alt="${col.title}">
        </div>
        <div class="collection-info">
          <h3>${col.title}</h3>
          <div class="price">${col.price}</div>
        </div>
      `;
      collectionsGrid.appendChild(card);
    });
  }

  // ===== SUITS DATA =====
  const suits = [
    {
      title: 'Executive Business Suit',
      description: 'Crafted from premium Italian wool, this suit offers impeccable fit and timeless elegance.',
      price: 'R1300',
      image: '../rsc/suit2.jpeg',
      badge: 'Premium',
      features: ['Perfect for black-tie events', 'Available in multiple colors']
    },
    {
      title: 'Luxury Evening Suit',
      description: 'Make a statement at formal events with this sophisticated evening suit featuring subtle satin detailing.',
      price: 'R1300',
      image: '../rsc/suit3.jpeg',
      badge: 'Luxury',
      features: ['Midnight black premium fabric', 'Slim fit design']
    },
    {
      title: 'Chitahela Slim Fit',
      description: 'Modern slim-fit design with attention to detail that offers both comfort and style.',
      price: 'R1300',
      image: '../rsc/suit4.jpeg',
      badge: 'Modern',
      features: ['Modern slim-fit cut', 'Functional buttons']
    },
    {
      title: 'Classic Double-Breasted',
      description: 'Timeless design that exudes confidence and sophistication for the distinguished gentleman.',
      price: 'R1300',
      image: '../rsc/suit5.jpeg',
      badge: 'Classic',
      features: ['High-quality stretch fabric', 'Available in various colors']
    }
  ];

  const suitsGrid = document.getElementById('suitsGrid');
  if (suitsGrid) {
    suits.forEach(suit => {
      const card = document.createElement('div');
      card.className = 'suit-card';
      
      let featuresHTML = suit.features.map(f => 
        `<li><i class="fas fa-check"></i> ${f}</li>`
      ).join('');
      
      card.innerHTML = `
        <div class="suit-image-container">
          <img src="${suit.image}" alt="${suit.title}" class="suit-image">
          <div class="suit-badge">${suit.badge}</div>
        </div>
        <div class="suit-info">
          <h3 class="suit-title">${suit.title}</h3>
          <p class="suit-description">${suit.description}</p>
          <div class="suit-price">${suit.price}</div>
          <ul class="suit-features">${featuresHTML}</ul>
          <div class="suit-actions">
            <a href="https://wa.me/27602130149?text=Hello! I'm interested in the ${suit.title}." class="suit-btn primary">WhatsApp</a>
            <a href="mailto:chitahelaza@gmail.com?subject=Inquiry about ${suit.title}" class="suit-btn outline">Email</a>
          </div>
        </div>
      `;
      suitsGrid.appendChild(card);
    });
  }

  // ===== CAROUSEL =====
  const dots = document.querySelectorAll('.carousel-dot');
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  if (dots.length && slides.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }, 5000);
  }

  // ===== QUICK VIEW MODAL =====
  const modal = document.getElementById('quickViewModal');
  const closeModal = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');

  if (modal && closeModal && modalContent) {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('quick-view-btn') || e.target.closest('.quick-view-btn')) {
        const btn = e.target.closest('.quick-view-btn');
        const id = parseInt(btn.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) {
          modalContent.innerHTML = `
            <div style="display: flex; flex-direction: column; padding: 30px;">
              <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 280px;">
                  <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 10px;">
                </div>
                <div style="flex: 1; min-width: 280px;">
                  <p style="color: var(--gray); text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem;">${product.category}</p>
                  <h2 style="font-size: 2rem; margin: 10px 0; color: var(--primary);">${product.title}</h2>
                  <div style="font-size: 1.8rem; color: var(--secondary); font-weight: 700; margin: 15px 0;">R${product.price}</div>
                  <p style="margin-bottom: 25px; color: var(--text); font-weight: 300;">Premium quality streetwear with unique designs. Made from high-quality materials for comfort and durability.</p>
                  <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="mailto:chitahelaza@gmail.com?subject=Inquiry about ${product.title}" class="btn" style="flex: 1; text-align: center;">Send Email</a>
                    <a href="https://wa.me/27602130149?text=Hello! I'm interested in the ${product.title}." class="btn btn-outline" style="flex: 1; text-align: center;">WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          `;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ===== NEWSLETTER =====
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      alert(`🎉 Thank you for subscribing with ${email}! You'll receive exclusive offers and updates.`);
      this.reset();
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .stat-item, .collection-card, .suit-card, .contact-card, .design-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== CART COUNTER =====
  let cartCount = 0;
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      cartCount = (cartCount + 1) % 10;
      const countEl = this.querySelector('.cart-count');
      if (countEl) {
        countEl.textContent = cartCount;
        countEl.style.display = cartCount > 0 ? 'block' : 'none';
      }
    });
  }

  // ===== ENSURE VIDEO PLAYS =====
  document.querySelectorAll('.video-container video').forEach(video => {
    video.play().catch(() => {});
  });

  console.log('🛍️ Chitahela Clothing Premium Streetwear Since 2016');

})();