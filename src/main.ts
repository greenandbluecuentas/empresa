// Green & Blue - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    for (const link of mobileNavLinks) {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    }
  }

  // Header scroll effect
  const header = document.querySelector('.header') as HTMLElement | null;

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  for (const link of anchorLinks) {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.pillar-card, .company-card, .ecosystem-feature, .stat-item'
  );

  for (const el of animatedElements) {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  }

  // Counter animation for stats
  const animateCounter = (element: Element) => {
    const text = element.textContent || '';
    const isPercentage = text.includes('%');
    const hasPlus = text.includes('+');
    const numericValue = Number.parseInt(text.replace(/[^0-9]/g, ''), 10);

    if (Number.isNaN(numericValue)) return;

    let currentValue = 0;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    const stepDuration = duration / steps;

    const updateCounter = () => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        element.textContent = `${numericValue}${hasPlus ? '+' : ''}${isPercentage ? '%' : ''}`;
      } else {
        element.textContent = `${Math.floor(currentValue)}${hasPlus ? '+' : ''}${isPercentage ? '%' : ''}`;
        setTimeout(updateCounter, stepDuration);
      }
    };

    updateCounter();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        for (const num of statNumbers) {
          animateCounter(num);
        }
        statsObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Add CSS for scroll animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .header.scrolled {
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    }

    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `;
  document.head.appendChild(style);
});
