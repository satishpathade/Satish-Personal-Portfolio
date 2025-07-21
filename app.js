document.addEventListener("DOMContentLoaded", () => {
    // Typed.js animation
    var typed = new Typed('#element', {
        strings: ['MERN Developer', 'Cloud Engineer', 'DevOps Engineer', 'Cloud Architect!'],
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
