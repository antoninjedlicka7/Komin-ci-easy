document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Setting current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const icon = mobileMenuBtn.querySelector('i');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Scroll Reveal Animations utilizing Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once revealed
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger active class on hero elements immediately so they animate on page load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal-up');
        heroElements.forEach(el => el.classList.add('active'));
    }, 100);

    // 5. Contact Form Simulation (Prevent default and show message)
    const contactForm = document.getElementById('contactForm');
    const formMsg = document.getElementById('form-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real scenario, this is where AJAX/fetch call would happen.
            // For now, let's simulate a success message after a brief timeout.
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Odesílám...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                formMsg.textContent = 'Vaše zpráva byla úspěšně odeslána. Brzy se vám ozveme.';
                formMsg.className = 'form-message success';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMsg.style.display = 'none';
                    formMsg.className = 'form-message';
                }, 5000);
            }, 1000);
        });
    }
});
