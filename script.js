document.addEventListener('DOMContentLoaded', function() {

    // 1. --- THEME SWITCHER (DARK / LIGHT MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', 'Ubah ke Mode Terang');
        } else {
            icon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', 'Ubah ke Mode Gelap');
        }
    }

    // 2. --- MOBILE HAMBURGER MENU ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile nav when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });

    // 3. --- PORTFOLIO CATEGORY FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                }
            });

            // Update scroll buttons visibility after filter change
            if (typeof updateScrollButtons === 'function') {
                setTimeout(updateScrollButtons, 100);
            }
        });
    });

    // 4. --- PORTFOLIO HORIZONTAL SCROLL ARROWS ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    const updateScrollButtons = () => {
        if (!portfolioGrid || !scrollLeftBtn || !scrollRightBtn) return;
        if (window.innerWidth <= 768) return;

        const maxScroll = portfolioGrid.scrollWidth - portfolioGrid.clientWidth;
        scrollLeftBtn.style.opacity = portfolioGrid.scrollLeft <= 5 ? '0.3' : '1';
        scrollLeftBtn.style.pointerEvents = portfolioGrid.scrollLeft <= 5 ? 'none' : 'auto';

        scrollRightBtn.style.opacity = portfolioGrid.scrollLeft >= maxScroll - 5 ? '0.3' : '1';
        scrollRightBtn.style.pointerEvents = portfolioGrid.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
    };

    if (portfolioGrid && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 360;

        scrollRightBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        scrollLeftBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        portfolioGrid.addEventListener('scroll', updateScrollButtons);
        window.addEventListener('resize', updateScrollButtons);
        updateScrollButtons();
    }

    // 5. --- COPY EMAIL WITH TOAST ---
    const copyEmailCard = document.getElementById('copy-email-card');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (copyEmailCard) {
        copyEmailCard.addEventListener('click', () => {
            const email = 'lesmanaadhik@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email berhasil disalin ke clipboard!');
            }).catch(() => {
                showToast('Email: lesmanaadhik@gmail.com');
            });
        });
    }

    function showToast(msg) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 6. --- SCROLL SPY & BACK TO TOP BUTTON ---
    const sections = document.querySelectorAll('section[id]');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        // Scroll spy
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*='${sectionId}']`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });

        // Back to top button toggle
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. --- UPDATE FOOTER YEAR ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});