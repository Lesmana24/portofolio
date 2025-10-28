document.addEventListener('DOMContentLoaded', function() {

    // --- FUNGSI UNTUK MENU HAMBURGER (MOBILE) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        // Toggle class 'active' untuk menampilkan/menyembunyikan menu
        navLinks.classList.toggle('active');
        
        // Ganti ikon hamburger (garis) menjadi ikon 'X' saat menu terbuka
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- FUNGSI UNTUK 'ACTIVE' LINK PADA NAVIGASI ---
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Hapus class 'active' dari semua link
            allNavLinks.forEach(l => l.classList.remove('active'));
            
            // Tambahkan class 'active' ke link yang baru diklik
            e.currentTarget.classList.add('active');

            // Sembunyikan menu mobile setelah link diklik
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Kembalikan ikon ke hamburger
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- FUNGSI UNTUK MEMPERBARUI TAHUN DI FOOTER ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- FUNGSI 'ACTIVE' LINK SAAT SCROLL (OPSIONAL TAPI BAGUS) ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Diberi offset 71px (header-height + 1px) agar lebih akurat
            const sectionTop = current.offsetTop - 71; 
            const sectionId = current.getAttribute('id');
            
            const link = document.querySelector(`.nav-links a[href*='${sectionId}']`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Hapus active dari semua link dulu
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    // Tambahkan active ke link yang sesuai
                    link.classList.add('active');
                } else {
                    // Ini opsional, bisa juga dihapus jika tidak ingin menghapus active
                    // link.classList.remove('active'); 
                }
            }
        });
    });

});