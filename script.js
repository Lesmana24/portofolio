document.addEventListener('DOMContentLoaded', function() {

    // 1. --- FUNGSI MENU HAMBURGER (MOBILE) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Ganti ikon bar ke silang (X)
            const icon = menuToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. --- FUNGSI KLIK LINK (AGAR MENU NUTUP SAAT DIKLIK) ---
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Reset semua active
            allNavLinks.forEach(l => l.classList.remove('active'));
            // Set active ke yang diklik
            e.currentTarget.classList.add('active');

            // Tutup menu mobile jika sedang terbuka
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. --- FUNGSI UPDATE TAHUN FOOTER ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 4. --- FUNGSI SCROLL SPY (DIPERBARUI) ---
    // Logika: Deteksi posisi scroll untuk menentukan link mana yang 'active'
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        // --- PERBAIKAN UTAMA DI SINI ---
        // Cek jika user sudah scroll sampai MENTOK BAWAH halaman
        // (Isi halaman - tinggi layar) ~ posisi scroll saat ini
        if ((window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
            // Hapus semua class active
            allNavLinks.forEach(l => l.classList.remove('active'));
            
            // Paksa link 'Kontak' jadi active
            const contactLink = document.querySelector(".nav-links a[href='#contact']");
            if (contactLink) {
                contactLink.classList.add('active');
            }
            return; // Stop di sini, jangan jalankan logika di bawahnya
        }

        // Logika Normal (Untuk Home, About, Portfolio)
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Angka 100 adalah kompensasi tinggi header agar highlight lebih pas
            const sectionTop = current.offsetTop - 100; 
            const sectionId = current.getAttribute('id');
            
            const link = document.querySelector(`.nav-links a[href*='${sectionId}']`);

            if (link) {
                // Jika posisi scroll ada di dalam area section ini
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // --- FUNGSI TOMBOL SCROLL HORIZONTAL (BARU) ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    // Pastikan elemennya ada sebelum menjalankan fungsi
    if (portfolioGrid && scrollLeftBtn && scrollRightBtn) {
        
        // Jarak scroll sekali klik. 
        // Kita set sekitar 350px (lebar kartu 320px + gap 2rem)
        const scrollAmount = 350;

        // Fungsi untuk mengontrol kapan tombol panah muncul/hilang
        const updateScrollButtons = () => {
            // Jika di tampilan mobile (<= 768px), hapus inline style agar CSS media query bekerja (tersembunyi)
            if (window.innerWidth <= 768) {
                scrollLeftBtn.style.display = '';
                scrollRightBtn.style.display = '';
                return;
            }

            // Cek apakah sudah mentok kiri (dengan toleransi 1px)
            if (portfolioGrid.scrollLeft <= 1) {
                scrollLeftBtn.style.display = 'none';
            } else {
                scrollLeftBtn.style.display = ''; // Kembali ke default CSS (flex)
            }

            // Cek apakah sudah mentok kanan
            // Ditambah 1 karena terkadang scrollWidth memiliki pecahan desimal di browser tertentu
            if (portfolioGrid.scrollLeft >= (portfolioGrid.scrollWidth - portfolioGrid.clientWidth - 1)) {
                scrollRightBtn.style.display = 'none';
            } else {
                scrollRightBtn.style.display = '';
            }
        };

        // Panggil saat halaman pertama kali dimuat
        updateScrollButtons();

        // Panggil saat sedang di-scroll, secara manual maupun dari tombol
        portfolioGrid.addEventListener('scroll', updateScrollButtons);
        
        // Panggil ketika ukuran layar berubah
        window.addEventListener('resize', updateScrollButtons);

        scrollRightBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({
                top: 0,
                left: scrollAmount, // Geser ke kanan
                behavior: 'smooth'  // Efek geser halus
            });
        });

        scrollLeftBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({
                top: 0,
                left: -scrollAmount, // Geser ke kiri (nilai negatif)
                behavior: 'smooth'
            });
        });
    }

});