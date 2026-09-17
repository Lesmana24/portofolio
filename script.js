document.addEventListener('DOMContentLoaded', function() {

    const htmlElement = document.documentElement;

    // --- LANGUAGE SWITCHER / i18n INITIALIZATION ---
    let currentLang = localStorage.getItem('portfolio-lang') || 'id';
    const langBtns = document.querySelectorAll('.lang-btn');

    function getNestedTranslation(obj, path) {
        if (!obj || !path) return null;
        return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
    }

    function setLanguage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        currentLang = lang;
        htmlElement.setAttribute('lang', lang);
        localStorage.setItem('portfolio-lang', lang);

        const dict = translations[lang];

        // 1. Document Title & Meta Description
        if (dict.meta) {
            if (dict.meta.title) document.title = dict.meta.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && dict.meta.description) metaDesc.setAttribute('content', dict.meta.description);
        }

        // 2. data-i18n (plain text)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.textContent = val;
            }
        });

        // 3. data-i18n-html (HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.innerHTML = val;
            }
        });

        // 4. data-i18n-placeholder (input placeholders)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.setAttribute('placeholder', val);
            }
        });

        // 5. data-i18n-title (tooltip titles)
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.setAttribute('title', val);
            }
        });

        // 6. data-i18n-aria (accessibility labels)
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.setAttribute('aria-label', val);
            }
        });

        // 7. data-i18n-alt (image alts)
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            const val = getNestedTranslation(dict, key);
            if (val !== null && val !== undefined) {
                el.setAttribute('alt', val);
            }
        });

        // 8. Update language switcher buttons active status
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 9. Update theme toggle title with current language
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        updateThemeIcon(currentTheme);

        // 10. Update accordion toggle buttons text according to open state
        document.querySelectorAll('.expand-toggle-btn').forEach(btn => {
            const accordion = btn.closest('.story-accordion');
            const details = accordion ? accordion.querySelector('.story-details') : null;
            if (details && details.classList.contains('is-open')) {
                btn.textContent = dict.portfolio.btn_expand_less;
            } else {
                btn.textContent = dict.portfolio.btn_expand_more;
            }
        });

        // 11. Refresh project filter/search index if active
        if (typeof filterProjects === 'function') {
            filterProjects();
        }
    }

    // Language switcher click events
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && targetLang !== currentLang) {
                setLanguage(targetLang);
            }
        });
    });

    // 1. --- THEME SWITCHER (DARK / LIGHT MODE) ---
    const themeToggleBtn = document.getElementById('theme-toggle');

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
        const navDict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang].nav : null;
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', navDict ? navDict.theme_light : 'Ubah ke Mode Terang');
        } else {
            icon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', navDict ? navDict.theme_dark : 'Ubah ke Mode Gelap');
        }
    }

    function updateGithubWidgetsTheme(theme) {
        const streakImg = document.getElementById('github-streak-img');

        if (streakImg) {
            if (theme === 'dark') {
                streakImg.src = 'https://streak-stats-lake.vercel.app/?user=Lesmana24&theme=highcontrast&hide_border=true&timezone=Asia/Jakarta';
            } else {
                streakImg.src = 'https://streak-stats-lake.vercel.app/?user=Lesmana24&theme=default&hide_border=true&timezone=Asia/Jakarta';
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

    // Initialize Language on page load
    setLanguage(currentLang);

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
            const accordion = this.closest('.story-accordion');
            if (!accordion) return;

            const details = accordion.querySelector('.story-details');
            if (!details) return;

            const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang].portfolio : null;
            const moreText = dict ? dict.btn_expand_more : '▼ Baca Selengkapnya';
            const lessText = dict ? dict.btn_expand_less : '▲ Sembunyikan Detail';

            if (details.classList.contains('is-open')) {
                details.classList.remove('is-open');
                this.textContent = moreText;
            } else {
                details.classList.add('is-open');
                this.textContent = lessText;
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
            const dict = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang].contact : null;
            const successMsg = dict ? dict.toast_success : 'Email berhasil disalin ke clipboard!';
            const fallbackMsg = dict ? dict.toast_fallback : 'Email: lesmanaadhik@gmail.com';

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast(successMsg);
                }).catch(() => {
                    showToast(fallbackMsg);
                });
            } else {
                showToast(fallbackMsg);
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

    // 8. --- INTERACTIVE CONSTELLATION CANVAS BACKGROUND ENGINE ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        let mouse = { x: null, y: null, radius: 140 };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function getThemeColors() {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            if (currentTheme === 'dark') {
                return {
                    particle: 'rgba(234, 88, 12, 0.45)',
                    line: 'rgba(234, 88, 12, ',
                    mouseLine: 'rgba(251, 146, 60, '
                };
            } else {
                return {
                    particle: 'rgba(194, 65, 12, 0.35)',
                    line: 'rgba(194, 65, 12, ',
                    mouseLine: 'rgba(194, 65, 12, '
                };
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 1.8 + 0.8;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.alpha = Math.random() * 0.5 + 0.2;
                this.pulseSpeed = Math.random() * 0.01 + 0.005;
                this.pulseDir = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Pulse alpha
                this.alpha += this.pulseSpeed * this.pulseDir;
                if (this.alpha > 0.75 || this.alpha < 0.15) {
                    this.pulseDir *= -1;
                }
            }

            draw(colors) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = colors.particle;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            // Scale particle density proportionally to screen size
            const count = Math.min(Math.max(Math.floor((width * height) / 18000), 30), 85);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            const colors = getThemeColors();
            const maxDistance = 125;

            // Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(colors);

                // Connect particles close to each other
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = colors.line + alpha + ')';
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }

                // Connect mouse cursor to nearby particles
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = colors.mouseLine + alpha + ')';
                        ctx.lineWidth = 0.95;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }

        resizeCanvas();
        animateCanvas();
    }

});