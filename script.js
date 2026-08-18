document.addEventListener('DOMContentLoaded', function() {

    // 1. --- THEME SWITCHER (DARK / LIGHT MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateGithubWidgetsTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
            updateGithubWidgetsTheme(newTheme);
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

    function updateGithubWidgetsTheme(theme) {
        const streakImg = document.getElementById('github-streak-img');
        const activityImg = document.getElementById('github-activity-img');

        if (streakImg) {
            if (theme === 'dark') {
                streakImg.src = 'https://streak-stats-lake.vercel.app/?user=Lesmana24&theme=highcontrast&hide_border=true&timezone=Asia/Jakarta';
            } else {
                streakImg.src = 'https://streak-stats-lake.vercel.app/?user=Lesmana24&theme=default&hide_border=true&timezone=Asia/Jakarta';
            }
        }

        if (activityImg) {
            if (theme === 'dark') {
                activityImg.src = 'https://github-readme-activity-graph.vercel.app/graph?username=Lesmana24&theme=github-compact&v=2';
            } else {
                activityImg.src = 'https://github-readme-activity-graph.vercel.app/graph?username=Lesmana24&theme=minimal&v=2';
            }
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

    // 3. --- PORTFOLIO CATEGORY FILTERING, SEARCH & HORIZONTAL SCROLL ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const portfolioGrid = document.getElementById('portfolio-grid');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    const searchInput = document.getElementById('portfolio-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const noProjectsFound = document.getElementById('no-projects-found');
    const resetSearchBtn = document.getElementById('reset-search-btn');

    let activeFilterValue = 'all';
    let searchQuery = '';

    function filterProjects() {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const cardTech = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase()).join(' ');
            const cardStory = card.querySelector('.story-accordion')?.textContent.toLowerCase() || '';
            const cardBadge = card.querySelector('.project-badge')?.textContent.toLowerCase() || '';

            const matchesCategory = activeFilterValue === 'all' || cardCategory === activeFilterValue;
            
            const fullContent = `${cardTitle} ${cardTech} ${cardStory} ${cardBadge}`;
            const matchesSearch = searchQuery === '' || fullContent.includes(searchQuery.toLowerCase());

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
            }
        });

        // Toggle Empty State UI
        if (noProjectsFound) {
            if (visibleCount === 0) {
                noProjectsFound.classList.remove('hidden');
                if (portfolioGrid) portfolioGrid.classList.add('hidden');
            } else {
                noProjectsFound.classList.add('hidden');
                if (portfolioGrid) portfolioGrid.classList.remove('hidden');
            }
        }

        // Reset scroll position to beginning
        if (portfolioGrid) {
            portfolioGrid.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }

    // Category Filter Buttons Click
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Avoid resetting active class if reset-search-btn is clicked
            if (btn.id === 'reset-search-btn') return;
            filterButtons.forEach(b => {
                if (b.id !== 'reset-search-btn') b.classList.remove('active');
            });
            btn.classList.add('active');

            activeFilterValue = btn.getAttribute('data-filter');
            filterProjects();
        });
    });

    // Real-Time Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            if (clearSearchBtn) {
                if (searchQuery.length > 0) {
                    clearSearchBtn.classList.remove('hidden');
                } else {
                    clearSearchBtn.classList.add('hidden');
                }
            }
            filterProjects();
        });
    }

    // Clear Search Input Button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchQuery = '';
                clearSearchBtn.classList.add('hidden');
                filterProjects();
                searchInput.focus();
            }
        });
    }

    // Reset Search Button in Empty State
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            activeFilterValue = 'all';
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            filterButtons.forEach(b => {
                if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
                else if (b.id !== 'reset-search-btn') b.classList.remove('active');
            });
            filterProjects();
        });
    }

    // Horizontal Scroll Navigation Buttons
    if (scrollLeftBtn && portfolioGrid) {
        scrollLeftBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }

    if (scrollRightBtn && portfolioGrid) {
        scrollRightBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    // 4. --- PROJECT STORY EXPAND / COLLAPSE TOGGLE ---
    const expandToggleBtns = document.querySelectorAll('.expand-toggle-btn');
    expandToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.previousElementSibling; // .story-text-container
            if (!container) return;

            if (container.classList.contains('line-clamp-4')) {
                container.classList.remove('line-clamp-4');
                this.textContent = '▲ Sembunyikan Detail';
            } else {
                container.classList.add('line-clamp-4');
                this.textContent = '▼ Baca Selengkapnya';
            }
        });
    });

    // 5. --- COPY EMAIL WITH TOAST ---
    const copyEmailCard = document.getElementById('copy-email-card');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (copyEmailCard) {
        copyEmailCard.addEventListener('click', () => {
            const email = 'lesmanaadhik@gmail.com';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email berhasil disalin ke clipboard!');
                }).catch(() => {
                    showToast('Email: lesmanaadhik@gmail.com');
                });
            } else {
                showToast('Email: lesmanaadhik@gmail.com');
            }
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