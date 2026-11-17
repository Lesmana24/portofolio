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

            const matchesCategory = activeFilterValue === 'all' || 
                                    cardCategory === activeFilterValue || 
                                    (cardCategory && cardCategory.split(' ').includes(activeFilterValue));
            
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
            if (typeof window.updateCard3DTransforms === 'function') {
                setTimeout(window.updateCard3DTransforms, 60);
            }
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

    // 8. --- MULTI-TIERED LIVING TELEMETRY CANVAS ENGINE ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        let beacons = [];
        let telemetryPulses = [];
        let techGlyphs = [];
        let shockwaves = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationFrameId = null;
        let isTabActive = true;

        const glyphTokens = ['< / >', '{ }', 'λ', '01', 'IoT', 'AI', '0x', '++', '=>', '::'];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initEngine();
        }

        window.addEventListener('resize', () => {
            clearTimeout(window._resizeTimer);
            window._resizeTimer = setTimeout(resizeCanvas, 150);
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Click / Touch Shockwave interaction
        window.addEventListener('click', (e) => {
            // Ignore clicks on buttons/links to preserve click feel
            if (e.target.closest('button, a, input, select, textarea')) return;
            spawnShockwave(e.clientX, e.clientY);
        });

        function spawnShockwave(x, y) {
            shockwaves.push({
                x,
                y,
                radius: 4,
                maxRadius: Math.min(width * 0.2, 160),
                alpha: 0.45
            });
        }

        // Pause animation when tab is inactive to save battery & CPU
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
            if (isTabActive) {
                animateCanvas();
            } else if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });

        function getThemeColors() {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            if (currentTheme === 'dark') {
                return {
                    particle: 'rgba(234, 88, 12, 0.45)',
                    line: 'rgba(234, 88, 12, ',
                    mouseLine: 'rgba(251, 146, 60, ',
                    beaconCore: 'rgba(234, 88, 12, 0.85)',
                    beaconRing: 'rgba(249, 115, 22, ',
                    pulseHead: 'rgba(255, 255, 255, 0.95)',
                    pulseTail: 'rgba(234, 88, 12, ',
                    glyphColor: 'rgba(251, 146, 60, ',
                    shockwaveColor: 'rgba(234, 88, 12, '
                };
            } else {
                return {
                    particle: 'rgba(194, 65, 12, 0.35)',
                    line: 'rgba(194, 65, 12, ',
                    mouseLine: 'rgba(194, 65, 12, ',
                    beaconCore: 'rgba(194, 65, 12, 0.8)',
                    beaconRing: 'rgba(194, 65, 12, ',
                    pulseHead: 'rgba(194, 65, 12, 0.95)',
                    pulseTail: 'rgba(194, 65, 12, ',
                    glyphColor: 'rgba(194, 65, 12, ',
                    shockwaveColor: 'rgba(194, 65, 12, '
                };
            }
        }

        // 1. Constellation Particle Node
        class Particle {
            constructor(isBeacon = false) {
                this.isBeacon = isBeacon;
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = isBeacon ? (Math.random() * 1.5 + 2.8) : (Math.random() * 1.6 + 0.8);
                this.vx = (Math.random() - 0.5) * (isBeacon ? 0.25 : 0.42);
                this.vy = (Math.random() - 0.5) * (isBeacon ? 0.25 : 0.42);
                this.alpha = Math.random() * 0.4 + 0.2;
                this.pulseSpeed = Math.random() * 0.01 + 0.006;
                this.pulseDir = Math.random() > 0.5 ? 1 : -1;

                // Beacon Sonar Ripple Properties
                if (isBeacon) {
                    this.sonarRadius = 0;
                    this.maxSonar = Math.random() * 15 + 32;
                    this.sonarSpeed = Math.random() * 0.35 + 0.35;
                }
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges smoothly
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Pulse alpha
                this.alpha += this.pulseSpeed * this.pulseDir;
                if (this.alpha > 0.8 || this.alpha < 0.15) {
                    this.pulseDir *= -1;
                }

                // Update sonar ring if beacon
                if (this.isBeacon) {
                    this.sonarRadius += this.sonarSpeed;
                    if (this.sonarRadius > this.maxSonar) {
                        this.sonarRadius = 0;
                    }
                }
            }

            draw(colors) {
                if (this.isBeacon) {
                    // Draw outer expanding sonar ring
                    const sonarAlpha = (1 - this.sonarRadius / this.maxSonar) * 0.38;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.sonarRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = colors.beaconRing + sonarAlpha + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Inner bright core
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = colors.beaconCore;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = colors.particle;
                    ctx.fill();
                }
            }
        }

        // 2. Drifting Code & Hardware Glyphs
        class TechGlyph {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.token = glyphTokens[Math.floor(Math.random() * glyphTokens.length)];
                this.x = Math.random() * width;
                this.y = initial ? (Math.random() * height) : (height + 20);
                this.vy = -(Math.random() * 0.25 + 0.15);
                this.vx = (Math.random() - 0.5) * 0.15;
                this.alpha = Math.random() * 0.12 + 0.08;
                this.targetAlpha = this.alpha;
            }

            update() {
                this.y += this.vy;
                this.x += this.vx;
                if (this.y < -30 || this.x < -30 || this.x > width + 30) {
                    this.reset(false);
                }
            }

            draw(colors) {
                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.fillStyle = colors.glyphColor + this.alpha + ')';
                ctx.fillText(this.token, this.x, this.y);
            }
        }

        // 3. Telemetry Signal Pulses (Data Packets traveling along lines)
        class TelemetryPulse {
            constructor(p1, p2) {
                this.p1 = p1;
                this.p2 = p2;
                this.progress = 0;
                this.speed = Math.random() * 0.015 + 0.01;
                this.isDead = false;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.isDead = true;
                }
            }

            draw(colors) {
                const currentX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
                const currentY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;

                // Head spark
                ctx.beginPath();
                ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = colors.pulseHead;
                ctx.fill();

                // Fading tail
                const tailProgress = Math.max(0, this.progress - 0.18);
                const tailX = this.p1.x + (this.p2.x - this.p1.x) * tailProgress;
                const tailY = this.p1.y + (this.p2.y - this.p1.y) * tailProgress;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(currentX, currentY);
                ctx.strokeStyle = colors.pulseTail + '0.7)';
                ctx.lineWidth = 1.6;
                ctx.stroke();
            }
        }

        function initEngine() {
            particles = [];
            techGlyphs = [];
            telemetryPulses = [];
            shockwaves = [];

            // Scale particle density with screen area (30 to 75 particles)
            const count = Math.min(Math.max(Math.floor((width * height) / 20000), 28), 75);
            const beaconCount = Math.min(Math.max(Math.floor(count / 12), 3), 5);

            for (let i = 0; i < count; i++) {
                const isBeacon = i < beaconCount;
                particles.push(new Particle(isBeacon));
            }

            // Spawn 6 to 8 tech glyphs
            const glyphCount = Math.min(Math.max(Math.floor(width / 220), 5), 8);
            for (let i = 0; i < glyphCount; i++) {
                techGlyphs.push(new TechGlyph());
            }
        }

        let frameCounter = 0;

        function animateCanvas() {
            if (!isTabActive) return;

            ctx.clearRect(0, 0, width, height);
            const colors = getThemeColors();
            const maxDistance = 125;
            frameCounter++;

            // 1. Process Shockwaves
            for (let s = shockwaves.length - 1; s >= 0; s--) {
                const sw = shockwaves[s];
                sw.radius += 3.5;
                sw.alpha *= 0.95;

                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.strokeStyle = colors.shockwaveColor + sw.alpha + ')';
                ctx.lineWidth = 1.4;
                ctx.stroke();

                // Push nearby particles gently outwards
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - sw.x;
                    const dy = p.y - sw.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < sw.radius + 15 && dist > sw.radius - 25 && dist > 1) {
                        const pushForce = 0.8 * (1 - dist / sw.maxRadius);
                        p.x += (dx / dist) * pushForce;
                        p.y += (dy / dist) * pushForce;
                    }
                }

                if (sw.alpha < 0.02 || sw.radius >= sw.maxRadius) {
                    shockwaves.splice(s, 1);
                }
            }

            // 2. Draw & Update Floating Tech Glyphs
            for (let g = 0; g < techGlyphs.length; g++) {
                techGlyphs[g].update();
                techGlyphs[g].draw(colors);
            }

            // 3. Connect Constellation Mesh & Candidate Links for Pulses
            let candidatePairs = [];

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(colors);

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

                        if (telemetryPulses.length < 4 && Math.random() < 0.05) {
                            candidatePairs.push([particles[i], particles[j]]);
                        }
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

            // 4. Randomly launch new Telemetry Pulses along connected lines
            if (candidatePairs.length > 0 && telemetryPulses.length < 3 && frameCounter % 40 === 0) {
                const pair = candidatePairs[Math.floor(Math.random() * candidatePairs.length)];
                telemetryPulses.push(new TelemetryPulse(pair[0], pair[1]));
            }

            // 5. Update & Draw Telemetry Pulses
            for (let p = telemetryPulses.length - 1; p >= 0; p--) {
                telemetryPulses[p].update();
                telemetryPulses[p].draw(colors);
                if (telemetryPulses[p].isDead) {
                    telemetryPulses.splice(p, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animateCanvas);
        }

        resizeCanvas();
        animateCanvas();
    }

    // 9. --- INTERACTIVE 3D SCROLL-DRIVEN WEBGL TECH CORE (THREE.JS) ---
    function initHero3DCore() {
        if (typeof THREE === 'undefined') return;
        const canvas3d = document.getElementById('hero-3d-canvas');
        const wrapper3d = document.getElementById('hero-3d-wrapper');
        if (!canvas3d || !wrapper3d) return;

        // Check reduced motion preference
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 5.2);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas3d,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // Group container for all 3D artifacts
        const coreGroup = new THREE.Group();
        scene.add(coreGroup);

        // 1. Geodesic Icosahedron Wireframe Outer Shell
        const outerGeo = new THREE.IcosahedronGeometry(1.5, 1);
        const wireframeGeo = new THREE.WireframeGeometry(outerGeo);
        const wireframeMat = new THREE.LineBasicMaterial({
            color: 0xea580c,
            transparent: true,
            opacity: 0.75
        });
        const outerWire = new THREE.LineSegments(wireframeGeo, wireframeMat);
        coreGroup.add(outerWire);

        // 2. Translucent Inner Octahedron Core with Emissive Pulse
        const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
        const innerMat = new THREE.MeshPhongMaterial({
            color: 0xf97316,
            emissive: 0xc2410c,
            emissiveIntensity: 0.45,
            shininess: 90,
            transparent: true,
            opacity: 0.7,
            flatShading: true
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        coreGroup.add(innerMesh);

        // 3. Cybernetic Dual Orbital Rings
        const ring1Geo = new THREE.TorusGeometry(2.0, 0.016, 16, 80);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.5 });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        ring1.rotation.y = Math.PI / 6;
        coreGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(2.25, 0.012, 16, 80);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = -Math.PI / 4;
        ring2.rotation.z = Math.PI / 5;
        coreGroup.add(ring2);

        // 4. Floating Orbital Particles
        const particleCount = 60;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const radius = 1.6 + Math.random() * 1.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i * 3 + 2] = radius * Math.cos(phi);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xfdba74,
            size: 0.045,
            transparent: true,
            opacity: 0.75
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        coreGroup.add(particles);

        // 5. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xea580c, 2.5, 12);
        pointLight1.position.set(4, 4, 4);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x38bdf8, 1.8, 10);
        pointLight2.position.set(-4, -3, 3);
        scene.add(pointLight2);

        // Responsive Sizing
        function resize3D() {
            const width = wrapper3d.clientWidth;
            const height = wrapper3d.clientHeight;
            if (width === 0 || height === 0) return;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        }
        resize3D();
        window.addEventListener('resize', resize3D);

        // Scroll Velocity & Progress Reactor
        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        let scrollVelocity = 0;
        let targetScrollRotY = 0;
        let targetScrollRotX = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            const deltaY = currentScrollY - lastScrollY;
            scrollVelocity = deltaY * 0.0035;
            targetScrollRotY = currentScrollY * 0.0022;
            targetScrollRotX = Math.sin(currentScrollY * 0.0015) * 0.35;
            lastScrollY = currentScrollY;
        }, { passive: true });

        // Interactive Pointer Drag-to-Rotate
        let isDragging = false;
        let previousPointerX = 0;
        let previousPointerY = 0;
        let dragRotX = 0;
        let dragRotY = 0;
        let dragVelX = 0;
        let dragVelY = 0;

        wrapper3d.addEventListener('pointerdown', (e) => {
            isDragging = true;
            previousPointerX = e.clientX;
            previousPointerY = e.clientY;
            wrapper3d.setPointerCapture(e.pointerId);
        });

        wrapper3d.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousPointerX;
            const deltaY = e.clientY - previousPointerY;
            dragVelX = deltaX * 0.008;
            dragVelY = deltaY * 0.008;
            dragRotY += dragVelX;
            dragRotX += dragVelY;
            previousPointerX = e.clientX;
            previousPointerY = e.clientY;
        });

        const stopDrag = (e) => {
            if (isDragging) {
                isDragging = false;
                try {
                    wrapper3d.releasePointerCapture(e.pointerId);
                } catch (err) {}
            }
        };
        wrapper3d.addEventListener('pointerup', stopDrag);
        wrapper3d.addEventListener('pointercancel', stopDrag);

        // Visibility Observer: Pause when not in viewport to save 100% GPU
        let isVisible = true;
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            observer.observe(wrapper3d);
        }

        // Render Loop
        let frameCount = 0;
        function animate3D() {
            requestAnimationFrame(animate3D);
            if (!isVisible || document.hidden) return;

            frameCount++;
            const time = frameCount * 0.015;

            // Idle continuous floating rotation
            outerWire.rotation.y += 0.005;
            outerWire.rotation.x += 0.0025;
            innerMesh.rotation.y -= 0.008;
            innerMesh.rotation.z += 0.004;
            ring1.rotation.z += 0.007;
            ring2.rotation.z -= 0.005;
            particles.rotation.y += 0.002;

            // Damping drag inertia
            if (!isDragging) {
                dragVelX *= 0.94;
                dragVelY *= 0.94;
                dragRotY += dragVelX;
                dragRotX += dragVelY;
            }

            // Scroll velocity damping
            scrollVelocity *= 0.92;

            // Smooth interpolation to target rotation
            const targetX = targetScrollRotX + dragRotX;
            const targetY = targetScrollRotY + dragRotY + (scrollVelocity * 2);

            coreGroup.rotation.x += (targetX - coreGroup.rotation.x) * 0.08;
            coreGroup.rotation.y += (targetY - coreGroup.rotation.y) * 0.08;

            // Organic levitation bobbing
            coreGroup.position.y = Math.sin(time) * 0.12;

            // Emissive core pulse
            innerMat.emissiveIntensity = 0.35 + Math.sin(time * 2) * 0.2;

            renderer.render(scene, camera);
        }
        animate3D();
    }

    // 10. --- 3D SPATIAL SCROLL & CARD TILT ENGINE (PORTFOLIO SHOWCASE) ---
    function initPortfolio3DEngine() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;

        // Ensure each card has a specular glare overlay
        const cards = grid.querySelectorAll('.storytelling-card');
        cards.forEach(card => {
            if (!card.querySelector('.card-glare')) {
                const glare = document.createElement('div');
                glare.className = 'card-glare';
                card.appendChild(glare);
            }
        });

        // Track active hovered card to pause scroll transform while tilting
        let hoveredCard = null;

        // 3D Spatial Perspective Transformation on Horizontal Scroll
        window.updateCard3DTransforms = function() {
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }

            const gridRect = grid.getBoundingClientRect();
            const gridCenter = gridRect.left + gridRect.width / 2;

            const visibleCards = grid.querySelectorAll('.storytelling-card:not(.hidden)');
            visibleCards.forEach(card => {
                if (card === hoveredCard) return; // Allow mouse tilt to take precedence

                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const normalizedDist = (cardCenter - gridCenter) / (gridRect.width / 2);
                const clampedDist = Math.max(-1.5, Math.min(1.5, normalizedDist));

                // Transform parameters
                const rotY = clampedDist * -14; // degrees
                const transZ = -Math.abs(clampedDist) * 55; // pixels depth
                const scale = Math.max(0.92, 1 - Math.abs(clampedDist) * 0.07);

                card.style.transform = `perspective(1200px) rotateY(${rotY.toFixed(2)}deg) translateZ(${transZ.toFixed(1)}px) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1)`;
            });
        };

        // Scroll listener with requestAnimationFrame throttling
        let isScrollTicking = false;
        grid.addEventListener('scroll', () => {
            if (!isScrollTicking) {
                requestAnimationFrame(() => {
                    window.updateCard3DTransforms();
                    isScrollTicking = false;
                });
                isScrollTicking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            window.updateCard3DTransforms();
        }, { passive: true });

        // Initial perspective calculation
        setTimeout(window.updateCard3DTransforms, 100);

        // Mousewheel Horizontal Scroll Conversion
        grid.addEventListener('wheel', (e) => {
            // Only hijack if dominant scroll is vertical (standard mousewheel)
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                grid.scrollBy({
                    left: e.deltaY * 1.35,
                    behavior: 'auto'
                });
            }
        }, { passive: false });

        // Momentum Drag-to-Scroll for Mouse / Trackpad
        let isPointerDown = false;
        let startX = 0;
        let scrollStartLeft = 0;
        let lastMoveX = 0;
        let dragVelocity = 0;
        let momentumAnimId = null;

        grid.addEventListener('mousedown', (e) => {
            // Don't drag if clicking buttons, links, or inputs
            if (e.target.closest('a, button, input, textarea')) return;
            isPointerDown = true;
            grid.classList.add('is-dragging');
            startX = e.pageX - grid.offsetLeft;
            scrollStartLeft = grid.scrollLeft;
            lastMoveX = e.pageX;
            dragVelocity = 0;
            if (momentumAnimId) cancelAnimationFrame(momentumAnimId);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isPointerDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 1.25;
            grid.scrollLeft = scrollStartLeft - walk;
            dragVelocity = e.pageX - lastMoveX;
            lastMoveX = e.pageX;
        });

        const endPointerDrag = () => {
            if (!isPointerDown) return;
            isPointerDown = false;
            grid.classList.remove('is-dragging');

            // Apply smooth momentum
            function stepMomentum() {
                if (Math.abs(dragVelocity) > 0.5) {
                    grid.scrollLeft -= dragVelocity;
                    dragVelocity *= 0.92;
                    momentumAnimId = requestAnimationFrame(stepMomentum);
                }
            }
            stepMomentum();
        };

        window.addEventListener('mouseup', endPointerDrag);

        // 3D Gyroscopic Card Tilt on Hover
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                hoveredCard = card;
            });

            card.addEventListener('mousemove', (e) => {
                if (isPointerDown) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const pctX = ((x / rect.width) * 100).toFixed(1);
                const pctY = ((y / rect.height) * 100).toFixed(1);
                card.style.setProperty('--glare-x', `${pctX}%`);
                card.style.setProperty('--glare-y', `${pctY}%`);

                // Gyroscope tilt angles (-8 to +8 degrees)
                const rotX = (((y - rect.height / 2) / (rect.height / 2)) * -8).toFixed(2);
                const rotY = (((x - rect.width / 2) / (rect.width / 2)) * 8).toFixed(2);

                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px) scale3d(1.02, 1.02, 1)`;
            });

            card.addEventListener('mouseleave', () => {
                hoveredCard = null;
                // Revert smoothly to spatial scroll position
                window.updateCard3DTransforms();
            });
        });
    }

    // Initialize 3D Engines
    initHero3DCore();
    initPortfolio3DEngine();

});