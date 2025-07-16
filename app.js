document.addEventListener("DOMContentLoaded", () => {
            // Typed.js animation
            var typed = new Typed('#element', {
                strings: ['MERN Developer', 'Cloud Engineer', 'DevOps Engineer', 'Cloud Architect!'],
                typeSpeed: 60,
                backSpeed: 20,
                showCursor: false
            });

            // Hamburger menu toggle
            window.toggleMenu = function() {
                const navLinks = document.getElementById("navLinks");
                const menuIcon = document.getElementById("menu-icon");
                navLinks.classList.toggle("show");
                menuIcon.classList.toggle("active");
            };

            // Close menu when any nav link is clicked (on mobile)
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    document.getElementById("navLinks").classList.remove("show");
                    document.getElementById("menu-icon").classList.remove("active");
                });
            });

            // AOS Init
            AOS.init();
           
        });