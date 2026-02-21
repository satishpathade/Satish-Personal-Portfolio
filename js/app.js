document.addEventListener("DOMContentLoaded", () => {
    // Typed.js animation
    var typed = new Typed('#element', {
        strings: ['DevOps Engineer', 'AWS Cloud Engineer'],
        typeSpeed: 60,
        backSpeed: 20,
        showCursor: false
    });

    // AOS Init
    AOS.init();
});

const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = mobileMenu.querySelectorAll('a');

// Toggle menu on hamburger click
menuIcon.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');

  if (mobileMenu.classList.contains('show')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
    document.body.style.overflow = 'hidden';
  } else {
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
  }
});

// Hide menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
  });
});

// ✅ Hide menu when clicked outside
document.addEventListener('click', (event) => {
  const clickedInsideMenu = mobileMenu.contains(event.target);
  const clickedMenuIcon = menuIcon.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuIcon && mobileMenu.classList.contains('show')) {
    mobileMenu.classList.remove('show');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    document.body.style.overflow = 'auto';
  }
});

// PROJECT MODALS
document.addEventListener('DOMContentLoaded', () => {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeTriggers = document.querySelectorAll('[data-close-modal]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const selector = trigger.getAttribute('data-modal-target');
      const modal = document.querySelector(selector);
      if (modal) modal.classList.add('show');
    });
  });

  closeTriggers.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.project-modal');
      if (modal) modal.classList.remove('show');
    });
  });

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.project-modal.show')
        .forEach(m => m.classList.remove('show'));
    }
  });

// Project filters: primary (all/cloud/devops) + secondary DevOps tools (jenkins/terraform/docker)
const filterButtons = document.querySelectorAll('.work-filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const devopsFilters = document.getElementById('devopsFilters');
const devopsButtons = devopsFilters ? devopsFilters.querySelectorAll('.devops-filter-btn') : [];

function updateGridLayout() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  const visibleCards = Array.from(projectCards).filter((card) => card.style.display !== 'none');
  if (visibleCards.length === 1) {
    grid.classList.add('single-layout');
  } else {
    grid.classList.remove('single-layout');
  }
}

function showAllProjects() {
    projectCards.forEach((card) => {
      card.style.display = '';
      card.classList.remove('is-hidden');
    });
  }

  function applyPrimaryFilter(filter) {
    // clear devops button active state on primary change
    devopsButtons.forEach((b) => b.classList.remove('active'));

    if (filter === 'all') {
      if (devopsFilters) devopsFilters.classList.remove('is-active');
      showAllProjects();
      updateGridLayout();
      return;
    }

    if (filter === 'cloud') {
      if (devopsFilters) devopsFilters.classList.remove('is-active');
      projectCards.forEach((card) => {
        const category = (card.dataset.category || '').toLowerCase();
        const show = category === 'cloud';
        if (show) {
          card.style.display = '';
          card.classList.remove('is-hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('is-hidden');
        }
      });
      updateGridLayout();
      return;
    }

    if (filter === 'devops') {
      if (devopsFilters) devopsFilters.classList.add('is-active');
      // show all DevOps-related projects (cloud/tools) until a specific tool is selected
      projectCards.forEach((card) => {
        const category = (card.dataset.category || '').toLowerCase();
        const tools = (card.dataset.tools || '').toLowerCase().split(/\s+/).filter(Boolean);
        const isDevOps = category === 'cloud' || tools.length > 0;
        if (isDevOps) {
          card.style.display = '';
          card.classList.remove('is-hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('is-hidden');
        }
      });
      updateGridLayout();
      return;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = (btn.dataset.filter || '').toLowerCase();

      // active state on primary buttons
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      applyPrimaryFilter(filter);
    });
  });

  // Secondary DevOps tool filters (active only when DevOps primary filter is selected)
  devopsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tool = (btn.dataset.tool || '').toLowerCase();

      // keep DevOps as active primary filter
      filterButtons.forEach((b) => {
        if ((b.dataset.filter || '').toLowerCase() === 'devops') {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      // active state on devops tool buttons
      devopsButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const tools = (card.dataset.tools || '').toLowerCase().split(/\s+/).filter(Boolean);
        const show = tools.includes(tool);
        if (show) {
          card.style.display = '';
          card.classList.remove('is-hidden');
        } else {
          card.style.display = 'none';
          card.classList.add('is-hidden');
        }
      });
      updateGridLayout();
    });
  });
});
