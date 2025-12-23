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

});