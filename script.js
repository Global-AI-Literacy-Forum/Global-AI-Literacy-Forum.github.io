document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? '×' : '☰';
            // Prevent body scroll when mobile menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Close mobile menu if clicking outside of it or on a link
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        const isNavLink = event.target.closest('.nav-menu a'); // Check if click is on a nav link

        if (navMenu.classList.contains('active')) {
             if (!isClickInsideNav && !isClickOnToggle || isNavLink) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '☰';
                document.body.style.overflow = ''; // Restore scroll
             }
        }
    });


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Determine animation type from class list
                    let animationClass = 'visible'; // Default visibility trigger
                    if (entry.target.classList.contains('fade-in-up')) animationClass = 'visible';
                    if (entry.target.classList.contains('fade-in-left')) animationClass = 'visible';
                    if (entry.target.classList.contains('fade-in-right')) animationClass = 'visible';
                    if (entry.target.classList.contains('fade-in')) animationClass = 'visible';

                    // Add delay if specified
                    const delay = entry.target.style.getPropertyValue('--delay');
                    if(delay) {
                        entry.target.style.transitionDelay = delay;
                    }

                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: trigger slightly before element fully enters viewport
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
             let animationClass = 'visible'; // Directly make visible if no observer
             if (el.classList.contains('fade-in-up')) animationClass = 'visible';
             if (el.classList.contains('fade-in-left')) animationClass = 'visible';
             if (el.classList.contains('fade-in-right')) animationClass = 'visible';
             if (el.classList.contains('fade-in')) animationClass = 'visible';
            el.classList.add(animationClass);
        });
    }

});