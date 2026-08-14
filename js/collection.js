(function() {
  "use strict";

  // ===== LOADING SCREEN =====
  document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (loadingText) loadingText.textContent = "Ready!";
        
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = 'auto';
          const loaderVideo = document.getElementById('loader-video');
          if (loaderVideo) loaderVideo.pause();
        }, 500);
      }
      if (progressBar) progressBar.style.width = progress + '%';
    }, 200);
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
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    const navIcon = hamburger.querySelector('i');
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('active');
      if (navIcon) {
        navIcon.classList.toggle('fa-bars');
        navIcon.classList.toggle('fa-times');
      }
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (navIcon) {
          navIcon.classList.add('fa-bars');
          navIcon.classList.remove('fa-times');
        }
      });
    });
  }

  // ===== PRODUCT DATA =====
  const products = [
    { id: 1, title: 'Chitahela Original T-shirt', category: 'tshirts', price: 200, originalPrice: 280, image: '../../rsc/b2.jpeg', badge: 'New', images: ['../../rsc/b1.jpeg', '../../rsc/b2.jpeg'] },
    { id: 2, title: 'Chitahela Deluxe T-shirt', category: 'tshirts', price: 350, originalPrice: 400, image: '../../rsc/a2.jpeg', badge: 'Bestseller', images: ['../../rsc/a1.jpeg', '../../rsc/a2.jpeg'] },
    { id: 3, title: 'Urban Hoodie', category: 'hoodies', price: 400, originalPrice: null, image: '../../rsc/sample3.jpeg', badge: 'Limited', images: ['../../rsc/sample3.jpeg'] },
    { id: 4, title: 'Signature Cap', category: 'accessories', price: 150, originalPrice: null, image: '../../rsc/cap.jpeg', badge: 'Sale', images: ['../../rsc/cap.jpeg'] },
    { id: 5, title: 'Executive Business Suit', category: 'suits', price: 1300, originalPrice: null, image: '../../rsc/suit2.jpeg', badge: 'Premium', images: ['../../rsc/suit2.jpeg'] },
    { id: 6, title: 'Luxury Evening Suit', category: 'suits', price: 1300, originalPrice: null, image: '../../rsc/suit3.jpeg', badge: 'Exclusive', images: ['../../rsc/suit3.jpeg'] },
    { id: 7, title: 'Contemporary Slim Fit', category: 'suits', price: 1300, originalPrice: null, image: '../../rsc/suit4.jpeg', badge: 'Trending', images: ['../../rsc/suit4.jpeg'] },
    { id: 8, title: 'Classic Double-Breasted', category: 'suits', price: 1300, originalPrice: null, image: '../../rsc/suit5.jpeg', badge: 'Classic', images: ['../../rsc/suit5.jpeg'] },
    { id: 9, title: 'Custom Hoodies', category: 'custom', price: 400, originalPrice: null, image: '../../rsc/design 3.png', badge: 'Custom', images: ['../../rsc/design 3.png'] },
    { id: 10, title: 'Custom T-Shirts', category: 'custom', price: 200, originalPrice: null, image: '../../rsc/design 1.png', badge: 'Custom', images: ['../../rsc/design 1.png'] },
    { id: 11, title: 'Bulk Orders', category: 'custom', price: null, originalPrice: null, image: '../../rsc/design 4.png', badge: 'Bulk', images: ['../../rsc/design 4.png'] },
    { id: 12, title: 'Original T-Shirt', category: 'tshirts', price: 200, originalPrice: null, image: '../../rsc/ai1.png', badge: 'New', images: ['../../rsc/ai1.png'] },
    { id: 13, title: 'Deluxe T-Shirt', category: 'tshirts', price: 350, originalPrice: null, image: '../../rsc/ai2.png', badge: 'Popular', images: ['../../rsc/ai2.png'] },
    { id: 14, title: 'Female Hoodie', category: 'hoodies', price: 400, originalPrice: null, image: '../../rsc/ai3.png', badge: 'Women', images: ['../../rsc/ai3.png'] },
    { id: 15, title: 'Ladies Tracksuits', category: 'custom', price: 600, originalPrice: null, image: '../../rsc/ai4.png', badge: 'Women', images: ['../../rsc/ai4.png'] },
    { id: 16, title: 'Custom Hoodie', category: 'hoodies', price: 400, originalPrice: null, image: '../../rsc/ai5.png', badge: 'Custom', images: ['../../rsc/ai5.png'] },
    { id: 17, title: 'Modern Hoodie', category: 'hoodies', price: 400, originalPrice: null, image: '../../rsc/ai6.png', badge: 'Modern', images: ['../../rsc/ai6.png'] },
    { id: 18, title: 'Chitahela Tracksuits', category: 'custom', price: 600, originalPrice: null, image: '../../rsc/ai7.png', badge: 'Premium', images: ['../../rsc/ai7.png'] }
  ];

  // ===== RENDER PRODUCTS =====
  const productGrid = document.getElementById('productGrid');

  if (productGrid) {
    products.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'product-card show';
      card.setAttribute('data-category', product.category);
      
      const priceHTML = product.price !== null ? 
        `<div class="product-price">
          <span class="current-price">R${product.price}</span>
          ${product.originalPrice ? `<span class="original-price">R${product.originalPrice}</span>` : ''}
        </div>` :
        `<div class="product-price">
          <span class="current-price">Custom Quote</span>
        </div>`;
      
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}" class="product-image" id="product-img-${index}">
          <div class="product-badge">${product.badge}</div>
          <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.title}" data-price="${product.price || 0}" data-image="${product.image}">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button class="quick-view-btn" data-id="${product.id}">
            <i class="fas fa-eye"></i> Quick View
          </button>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          <h3 class="product-title">${product.title}</h3>
          <div class="product-rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
            <span>(24)</span>
          </div>
          ${priceHTML}
        </div>
        <div class="product-actions">
          <a href="mailto:chitahelaza@gmail.com?subject=Inquiry about ${product.title}" class="action-btn">Send Email</a>
          <a href="https://wa.me/27602130149?text=Hello! I'm interested in the ${product.title}." class="action-btn">WhatsApp</a>
        </div>
      `;
      
      productGrid.appendChild(card);

      // Image rotation for products with multiple images
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

  // ===== COLLECTION FILTERING =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('show'), 10);
          } else {
            if (card.getAttribute('data-category') === filterValue) {
              card.style.display = 'block';
              setTimeout(() => card.classList.add('show'), 10);
            } else {
              card.classList.remove('show');
              setTimeout(() => { card.style.display = 'none'; }, 300);
            }
          }
        });
      });
    });
  }

  // ===== SHOPPING CART =====
  const cartIcon = document.getElementById('cartIcon');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const continueShopping = document.getElementById('continueShopping');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  let cart = [];

  if (cartIcon && cartSidebar) {
    cartIcon.addEventListener('click', () => cartSidebar.classList.add('active'));
  }
  if (closeCart) {
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
  }
  if (continueShopping) {
    continueShopping.addEventListener('click', () => cartSidebar.classList.remove('active'));
  }

  // Add to cart buttons (event delegation)
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      const image = btn.getAttribute('data-image');
      
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }
      
      updateCart();
      showToast(`${name} added to cart!`);
    }
  });

  function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
      if (cartItems) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
      }
    } else {
      if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">R${item.price} x ${item.quantity}</div>
            </div>
            <button class="remove-item" data-id="${item.id}">
              <i class="fas fa-trash"></i>
            </button>
          `;
          cartItems.appendChild(cartItem);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
            showToast('Item removed from cart');
          });
        });
      }
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `R${total}`;
  }

  function showToast(message) {
    if (toastMessage) toastMessage.textContent = message;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
      }
      
      let orderSummary = "Hello! I would like to order the following items:\n\n";
      let total = 0;
      cart.forEach(item => {
        orderSummary += `${item.name} - R${item.price} x ${item.quantity} = R${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
      });
      orderSummary += `\nTotal: R${total}`;
      orderSummary += "\n\nPlease let me know about availability and payment options.";
      
      const encodedMessage = encodeURIComponent(orderSummary);
      window.open(`https://wa.me/27602130149?text=${encodedMessage}`, '_blank');
      
      cart = [];
      updateCart();
      if (cartSidebar) cartSidebar.classList.remove('active');
    });
  }

  // ===== QUICK VIEW MODAL =====
  const quickViewModal = document.getElementById('quickViewModal');
  const closeModal = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.quick-view-btn');
    if (btn) {
      const id = parseInt(btn.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      
      if (product) {
        const priceDisplay = product.price !== null ? `R${product.price}` : 'Custom Quote';
        if (modalContent) {
          modalContent.innerHTML = `
            <div style="display: flex; flex-direction: column; padding: 30px;">
              <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 280px;">
                  <img src="${product.image}" alt="${product.title}" style="width: 100%; border-radius: 10px;">
                </div>
                <div style="flex: 1; min-width: 280px;">
                  <p style="color: var(--gray); text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem;">${product.category}</p>
                  <h2 style="font-size: 2rem; margin: 10px 0; color: var(--primary);">${product.title}</h2>
                  <div style="font-size: 1.8rem; color: var(--secondary); font-weight: 700; margin: 15px 0;">${priceDisplay}</div>
                  <p style="margin-bottom: 25px; color: var(--text); font-weight: 300;">Premium quality streetwear with unique designs. Made from high-quality materials for comfort and durability.</p>
                  <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="mailto:chitahelaza@gmail.com?subject=Inquiry about ${product.title}" class="btn" style="flex: 1; text-align: center;">Send Email</a>
                    <a href="https://wa.me/27602130149?text=Hello! I'm interested in the ${product.title}." class="btn btn-outline" style="flex: 1; text-align: center;">WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
        if (quickViewModal) {
          quickViewModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    }
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (quickViewModal) quickViewModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickViewModal && quickViewModal.classList.contains('active')) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

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

  // ===== LOGO ROTATION =====
  const logos = document.querySelectorAll('.rotating-logo');
  let currentLogoIndex = 0;
  setInterval(() => {
    logos.forEach(l => l.classList.remove('active'));
    currentLogoIndex = (currentLogoIndex + 1) % logos.length;
    logos[currentLogoIndex].classList.add('active');
  }, 3000);

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card').forEach(el => observer.observe(el));

})();