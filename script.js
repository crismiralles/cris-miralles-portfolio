// ============================================================
// PORTFOLIO JAVASCRIPT
// ============================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================================
  // SKILLS FILTER FUNCTIONALITY
  // ============================================================
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Track active filters (all active by default)
  let activeFilters = new Set(['ux', 'ui', 'tools']);
  
  // Function to update visible skills
  const updateSkillsVisibility = () => {
    skillItems.forEach(skill => {
      const category = skill.getAttribute('data-category');
      
      // Show skill if its category is active
      if (activeFilters.has(category)) {
        skill.classList.remove('hidden');
      } else {
        skill.classList.add('hidden');
      }
    });
    
    // Update filter button states
    filterButtons.forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      if (activeFilters.has(filter)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };
  
  // Add click handlers to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Toggle filter
      if (activeFilters.has(filter)) {
        activeFilters.delete(filter);
      } else {
        activeFilters.add(filter);
      }
      
      // Update visibility
      updateSkillsVisibility();
      
      // Analytics tracking
      console.log(`Filter toggled: ${filter}, Active filters:`, Array.from(activeFilters));
    });
  });
  
  // Keyboard support for filter buttons
  filterButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
      if (e.key === 'ArrowRight' && index < filterButtons.length - 1) {
        e.preventDefault();
        filterButtons[index + 1].focus();
      }
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        filterButtons[index - 1].focus();
      }
    });
  });
  
  
  // ============================================================
  // SMOOTH SCROLL FOR NAVIGATION LINKS
  // ============================================================
  
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 20;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Add smooth scrolling to all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScroll(target);
      
      // Update URL without jumping
      history.pushState(null, null, target);
    });
  });

  
  // ============================================================
  // BACK TO TOP BUTTON
  // ============================================================
  
  const backToTopButton = document.getElementById('backToTop');
  
  // Show/hide button based on scroll position
  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTopButton.style.display = 'flex';
      backToTopButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.transition = 'opacity 0.3s, transform 0.3s';
        backToTopButton.style.opacity = '1';
      }, 10);
    } else {
      backToTopButton.style.opacity = '0';
      setTimeout(() => {
        backToTopButton.style.display = 'flex';
      }, 300);
    }
  };
  
  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Listen to scroll events
  window.addEventListener('scroll', toggleBackToTop);
  
  
  // ============================================================
  // ACTIVE NAVIGATION STATE
  // ============================================================
  
  const sections = document.querySelectorAll('section[id], article[id]');
  const navLinks = document.querySelectorAll('.toc-links a');
  
  const setActiveNav = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', setActiveNav);
  
  
  // ============================================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  // ============================================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  
  
  // ============================================================
  // LOGO PILL CLICK HANDLER
  // ============================================================
  
  const logoPill = document.querySelector('.logo-pill');
  logoPill.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  
  // ============================================================
  // PROJECT TAGS HOVER EFFECT
  // ============================================================
  
  const projectTags = document.querySelectorAll('.project-tag');
  projectTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  
  // ============================================================
  // FOOTER LINKS ANALYTICS (Optional)
  // ============================================================
  
  const footerLinks = document.querySelectorAll('.footer-info-item, .linkedin-badge');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const linkText = this.textContent.trim();
      console.log(`Footer link clicked: ${linkText}`);
      
      // Here you could add analytics tracking like Google Analytics
      // Example: gtag('event', 'click', { 'event_category': 'footer', 'event_label': linkText });
    });
  });
  
  
  // ============================================================
  // KEYBOARD NAVIGATION ENHANCEMENT
  // ============================================================
  
  // Add keyboard navigation for TOC links
  const tocLinks = document.querySelectorAll('.toc-links a');
  tocLinks.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && index < tocLinks.length - 1) {
        e.preventDefault();
        tocLinks[index + 1].focus();
      }
      if (e.key === 'ArrowUp' && index > 0) {
        e.preventDefault();
        tocLinks[index - 1].focus();
      }
    });
  });
  
  
  // ============================================================
  // PARALLAX EFFECT ON HERO (Optional)
  // ============================================================
  
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = `${1 - (scrolled / heroHeight) * 0.5}`;
    }
  });
  
  
  // ============================================================
  // COPY EMAIL TO CLIPBOARD
  // ============================================================
  
  const emailLink = document.querySelector('a[href^="mailto"]');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      const email = this.getAttribute('href').replace('mailto:', '');
      
      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        // Show feedback
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Email copied!';
        
        setTimeout(() => {
          this.querySelector('span').textContent = originalText;
        }, 2000);
      }).catch(() => {
        // Fallback: open email client
        window.location.href = this.getAttribute('href');
      });
    });
  }
  
  
  // ============================================================
  // THEME TOGGLE (Optional feature for future)
  // ============================================================
  
  // Uncomment this if you want to add a dark/light mode toggle
  /*
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌙';
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  document.body.appendChild(themeToggle);
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
  */
  
  
  // ============================================================
  // CONSOLE MESSAGE (Portfolio Easter Egg)
  // ============================================================
  
  console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #0f27d9;');
  console.log('%cLooks like you\'re curious about the code!', 'font-size: 14px; color: #555;');
  console.log('%cFeel free to reach out if you want to chat about design or development.', 'font-size: 14px; color: #555;');
  console.log('%c🔗 a@gmail.com', 'font-size: 14px; color: #0f27d9; font-weight: bold;');
  
});


// ============================================================
// UTILITY FUNCTIONS
// ============================================================

// Debounce function for performance optimization
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}


// ============================================================
// PERFORMANCE MONITORING (Development only)
// ============================================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    if ('performance' in window) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page load time: ${pageLoadTime}ms`);
    }
  });
}
