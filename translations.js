/**
 * Bilingual Translation Dictionary (Indonesian & English)
 * Portfolio: Lesmana Adhi Kusuma
 */

const translations = {
    id: {
        meta: {
            title: "Lesmana Adhi Kusuma — Menjembatani Kode & Solusi Dunia Nyata",
            description: "Portofolio Lesmana Adhi Kusuma — Mahasiswa Teknik Informatika & Software Engineer yang berfokus pada aplikasi Web, AI, dan IoT dengan pendekatan personal."
        },
        nav: {
            logo_aria: "Beranda Lesmana",
            home: "Home",
            about: "Tentang Saya",
            portfolio: "Portofolio",
            contact: "Kontak",
            theme_dark: "Ubah ke Mode Gelap",
            theme_light: "Ubah ke Mode Terang",
            theme_aria: "Ubah Mode Gelap/Terang",
            menu_aria: "Buka Menu Navigasi",
            lang_toggle_title: "Switch to English",
            lang_toggle_aria: "Ganti bahasa ke Bahasa Inggris"
        },
        hero: {
            title: `Lesmana Adhi Kusuma: <br><span class="highlight-text">Menjembatani Kode & Solusi Dunia Nyata</span>`,
            subtitle: "Software Engineer & Mahasiswa Teknik Informatika",
            description: "Mahasiswa Teknik Informatika yang menemukan kesenangan dalam memecahkan masalah kompleks. Saya tidak hanya menulis kode; saya suka membangun alat yang benar-benar membantu manusia dalam kehidupan sehari-hari.",
            cta_projects: `<i class="fas fa-compass"></i> Jelajahi Proyek Saya`,
            cta_contact: `<i class="fas fa-coffee"></i> Mari Ngobrol`,
            focus_label: "Fokus Eksplorasi:"
        },
        about: {
            section_title: "Cerita & Perjalanan",
            section_subtitle: "Mengenal lebih dekat sosok di balik baris kode dan logika aplikasi.",
            img_alt: "Foto Profil Lesmana Adhi Kusuma",
            stat_projects_num: "6+ Proyek",
            stat_projects_lbl: "Full-Stack & Enterprise",
            stat_ai_num: "AI & Smart IoT",
            stat_ai_lbl: "ESP32, Vision AI & LLM",
            heading: "Halo! Saya Lesmana.",
            bio_1: `Perjalanan saya di dunia teknologi bermula dari rasa penasaran sederhana: <em>"Bagaimana cara membuat sesuatu dari layar komputer yang bisa menyelesaikan masalah nyata di sekitarku?"</em> Bagi saya, coding bukan sekadar merangkai sintaksis, melainkan seni menyusun solusi yang intuitif dan bermanfaat bagi orang lain.`,
            bio_2: `Sebagai mahasiswa Teknik Informatika, saya sering menghadapi berbagai tantangan logika rumit—mulai dari mengelola arsitektur database kasir yang padat, merancang alur transaksi laundry yang rapi, hingga menghubungkan sensor hardware IoT di lahan pertanian dengan kecerdasan buatan AI.`,
            bio_3: `<i class="fas fa-quote-left quote-icon"></i> Saya suka mengubah ide menjadi aplikasi web fungsional menggunakan ekosistem <strong>React & Node.js</strong>. Untuk backend yang tangguh dan terstruktur, <strong>Laravel</strong> dan <strong>Go (Golang)</strong> sering menjadi senjata utama saya. Di luar browser, saya antusias bereksperimen dengan mikrokontroler <strong>ESP32</strong>, protokol <strong>MQTT</strong>, serta implementasi <strong>Computer Vision & LLM</strong>.`,
            skills_title: `<i class="fas fa-layer-group"></i> Alat & Ekosistem Teknologi`,
            group_frontend: "Frontend UI",
            group_backend: "Backend & Database",
            group_hardware: "Hardware AI & Mobile",
            group_workflow: "Developer Workflow",
            github_title: `<i class="fab fa-github"></i> Aktivitas & Konsistensi Coding`,
            streak_alt: "Statistik Streak GitHub Lesmana"
        },
        portfolio: {
            section_title: "Karya & Rekam Proyek",
            section_subtitle: "Kisah di balik tantangan teknis, solusi arsitektur, dan dampak nyata yang telah dibangun.",
            search_placeholder: "Cari proyek atau teknologi (React, Go, IoT)...",
            search_aria: "Cari Proyek",
            clear_search_title: "Hapus Pencarian",
            filter_all: "Semua Cerita Proyek",
            filter_web: "Web Application",
            filter_ai_iot: "AI & IoT Systems",
            filter_ecommerce: "E-Commerce",
            scroll_left: "Geser Kiri",
            scroll_right: "Geser Kanan",
            story_label_problem: `<i class="fas fa-exclamation-circle"></i> Masalah & Latar Belakang`,
            story_label_challenge: `<i class="fas fa-puzzle-piece"></i> Tantangan Unik`,
            story_label_impact: `<i class="fas fa-chart-line"></i> Dampak & Solusi Teknis`,
            btn_expand_more: "▼ Baca Selengkapnya",
            btn_expand_less: "▲ Sembunyikan Detail",
            btn_repo: `<span>Jelajahi Kode Repositori</span> <i class="fab fa-github"></i>`,
            btn_demo: `<span>Uji Coba Aplikasi</span> <i class="fas fa-external-link-alt"></i>`,
            no_projects_title: "Proyek Tidak Ditemukan",
            no_projects_desc: "Tidak ada proyek yang sesuai dengan kata kunci atau filter pencarian Anda.",
            btn_reset_search: `<i class="fas fa-redo"></i> Reset Pencarian`
        },
        projects: {
            simrs_billing: {
                title: "SIMRS Billing — Sistem Informasi Manajemen Rumah Sakit",
                badge: "Enterprise Web App",
                problem: "Sistem penagihan rumah sakit (SIMRS) konvensional yang lambat, berisiko kesalahan kalkulasi desimal keuangan, serta rawan klaim ganda dan transaksi kasir tanpa otorisasi.",
                challenge: "Mengembangkan monorepo enterprise Full-Stack (Backend Go/Gin & Frontend React 19/Vite 6) dengan otorisasi 2FA kasir, proteksi transaksi idempoten (X-Idempotency-Key), matematika presisi desimal (shopspring/decimal), serta integrasi ImageKit API.",
                impact: "Kalkulasi tagihan medis presisi 100%, verifikasi klaim BPJS & asuransi swasta terstruktur, audit trail real-time aktivitas kasir, dan portal mandiri pasien.",
                quote: `"Menghadirkan presisi keuangan dan keandalan sistem berstandar enterprise pada operasional rumah sakit."`
            },
            simrs_fefo: {
                title: "SIMRS FEFO — Manajemen Stok & Kedaluwarsa Obat Rumah Sakit",
                badge_pharmacy: `<i class="fas fa-chart-line"></i> Dashboard Farmasi`,
                badge_fefo: `<i class="fas fa-bolt"></i> Engine FEFO`,
                problem: "Risiko obat kedaluwarsa terpakai pada operasional rumah sakit dan kerugian finansial akibat penumpukan stok expired, serta potensi human-error petugas farmasi saat memilih batch obat secara manual.",
                challenge: "Mengembangkan sistem Full-Stack (Backend Go/Gin & Frontend React 19/Vite 8) dengan transaksi atomik database (SELECT FOR UPDATE) untuk mencegah race condition pemotongan stok, serta engine simulasi live FEFO (First Expired, First Out) secara real-time.",
                impact: "Otomatisasi pemotongan stok berurutan berdasarkan expired date terdekat, proteksi mutasi stok ganda secara konkuren, indikator visual status expired (Aman, Mendekati, Kadaluwarsa), dan UI glassmorphism modern dual-theme.",
                quote: `"Memastikan keselamatan pasien dan efisiensi farmasi melalui otomatisasi pemotongan stok obat berbasis tanggal kedaluwarsa terdekat."`
            },
            kios_bunga: {
                title: "Sistem Informasi & Kasir Bunga Jondo Tani",
                badge: "Web Application",
                problem: "Pencatatan inventaris dan transaksi kasir kios bunga lokal yang sebelumnya masih manual, memicu ketidakcocokan stok tanaman hias dan antrean pembayaran yang lambat.",
                challenge: "Merancang arsitektur API modular terpisah antara Frontend React dan Backend Express untuk memastikan kalkulasi transaksi instan tanpa resiko kehabisan stok bersamaan.",
                impact: "Proses transaksi kasir menjadi 3x lebih cepat dengan pemantauan stok bunga terpusat real-time.",
                quote: `"Perangkat lunak terbaik adalah yang langsung mempermudah urusan operasional lokal di sekitar kita."`
            },
            awan_laundry: {
                title: "Awan Laundry — Manajemen Operasional",
                badge: "Operational Web App",
                problem: "Manajemen antrean cucian dan operasional harian usaha laundry yang rawan acak-acakan saat volume pesanan tinggi.",
                challenge: "Merancang skema database relational MySQL yang efisien untuk melacak status pengerjaan (cuci, jemur, setrika, siap ambil) serta beban pengeluaran bahan harian.",
                impact: "Sistem pemesanan dan pencatatan operasional menjadi terstruktur transparan dan meminimalkan kesalahan riwayat pesanan pelanggan.",
                quote: `"Menghadirkan keteraturan dan efisiensi sistem pada operasional UMKM laundry."`
            },
            olericure: {
                title: "OLERICURE — Smart Garden IoT & Plant AI Doctor",
                badge_iot: `<i class="fas fa-microchip"></i> Hardware Irigasi IoT`,
                badge_ai: `<i class="fas fa-brain"></i> Diagnosis AI Plant Doctor`,
                problem: "Pemborosan air pada sistem irigasi konvensional dan keterlambatan petani kota dalam mengidentifikasi serangan patogen daun tanaman hortikultura.",
                challenge: "Mengintegrasikan sinyal sensor ESP32 via MQTT secara uninterrupted, dilanjutkan klasifikasi gambar daun menggunakan MobileNetV2 dan Groq LLM untuk memberikan dosis penanganan tepat.",
                impact: "Penyiraman otomatis presisi sesuai tingkat kelembapan tanah & hasil diagnosis penyakit tanaman cepat dalam hitungan detik.",
                quote: `"Ketika sinyal perangkat keras dan model kecerdasan buatan menyatu untuk merawat tanaman."`
            },
            tokosaya: {
                title: "Ecommerce TokoSaya — Full-Stack Platform",
                badge: "E-Commerce Platform",
                problem: "Kebutuhan platform toko digital mandiri yang aman dengan alur belanja yang mulus dari pencarian produk hingga admin dashboard management.",
                challenge: "Menangani otentikasi role multi-tier (pelanggan vs admin), pengelolaan keranjang belanja dinamis, dan sinkronisasi pesanan tanpa membebankan server.",
                impact: "Aplikasi e-commerce responsif dengan otentikasi pengguna aman dan panel pengelolaan inventaris produk yang mudah digunakan.",
                quote: `"Membangun alur belanja digital yang cepat, aman, dan dapat diandalkan dari hulu ke hilir."`
            },
            kalkulator: {
                title: "Scientific Calculator Web Application",
                badge: "Web Interactive Tool",
                problem: "Kebutuhan alat kalkulator ilmiah berbasis browser yang dapat beroperasi tanpa ketergantungan koneksi server backend.",
                challenge: "Menangani pengolahan ekspresi matematika ilmiah rumit (trigonometri, kalkulus dasar, tata urutan kurung) secara murni di JavaScript client-side.",
                impact: "Perhitungan matematis instan, responsif, dan ultra-ringan tanpa overhead jaringan.",
                quote: `"Keindahan sintaksis client-side yang memproses matematika ilmiah rumit secara instan."`
            }
        },
        contact: {
            section_title: "Mari Terhubung & Berdiskusi",
            section_subtitle: "Tertarik berkolaborasi? Punya ide proyek gila? Atau hanya ingin ngopi online? Silakan hubungi saya melalui media mana pun di bawah.",
            email_card_title: "Klik untuk menyalin email Lesmana",
            email_label: "Email Saya",
            copy_btn_aria: "Salin Alamat Email",
            toast_success: "Email berhasil disalin ke clipboard!",
            toast_fallback: "Email: lesmanaadhik@gmail.com",
            linkedin_label: "LinkedIn",
            github_label: "GitHub Repositories",
            instagram_label: "Instagram Personal"
        },
        footer: {
            rights: "Hak Cipta Dilindungi.",
            subtext: "Terima kasih sudah mampir! Dibangun dengan bangga & dedikasi oleh Lesmana",
            back_to_top_title: "Kembali ke atas",
            back_to_top_aria: "Kembali ke atas"
        }
    },

    en: {
        meta: {
            title: "Lesmana Adhi Kusuma — Bridging Code & Real-World Solutions",
            description: "Portfolio of Lesmana Adhi Kusuma — Informatics Engineering Student & Software Engineer focused on Web, AI, and IoT solutions with a personal touch."
        },
        nav: {
            logo_aria: "Lesmana's Home",
            home: "Home",
            about: "About Me",
            portfolio: "Portfolio",
            contact: "Contact",
            theme_dark: "Switch to Dark Mode",
            theme_light: "Switch to Light Mode",
            theme_aria: "Toggle Dark/Light Mode",
            menu_aria: "Toggle Navigation Menu",
            lang_toggle_title: "Ubah ke Bahasa Indonesia",
            lang_toggle_aria: "Switch language to Indonesian"
        },
        hero: {
            title: `Lesmana Adhi Kusuma: <br><span class="highlight-text">Bridging Code & Real-World Solutions</span>`,
            subtitle: "Software Engineer & Informatics Engineering Student",
            description: "Informatics Engineering student who thrives on tackling complex challenges. I don't just write code; I love crafting tools that genuinely empower people in their everyday lives.",
            cta_projects: `<i class="fas fa-compass"></i> Explore My Projects`,
            cta_contact: `<i class="fas fa-coffee"></i> Let's Talk`,
            focus_label: "Core Focus:"
        },
        about: {
            section_title: "Story & Journey",
            section_subtitle: "Getting to know the person behind the lines of code and application logic.",
            img_alt: "Profile photo of Lesmana Adhi Kusuma",
            stat_projects_num: "6+ Projects",
            stat_projects_lbl: "Full-Stack & Enterprise",
            stat_ai_num: "AI & Smart IoT",
            stat_ai_lbl: "ESP32, Vision AI & LLM",
            heading: "Hello! I'm Lesmana.",
            bio_1: `My journey in technology began with a simple spark of curiosity: <em>"How can I build something from a computer screen that solves real-world problems around me?"</em> To me, coding is far more than typing syntax—it's the craft of engineering intuitive, impactful solutions for people.`,
            bio_2: `As an Informatics Engineering student, I frequently tackle intricate challenges—from architecting high-volume cashier databases and structuring streamlined laundry transaction workflows, to linking agricultural IoT hardware sensors with computer vision AI.`,
            bio_3: `<i class="fas fa-quote-left quote-icon"></i> I love transforming ideas into functional web experiences using the <strong>React & Node.js</strong> ecosystem. For resilient, scalable backends, <strong>Laravel</strong> and <strong>Go (Golang)</strong> are my primary tools of choice. Beyond the browser, I am deeply fascinated by exploring <strong>ESP32</strong> microcontrollers, <strong>MQTT</strong> protocols, and <strong>Computer Vision & LLM</strong> integrations.`,
            skills_title: `<i class="fas fa-layer-group"></i> Tools & Tech Ecosystem`,
            group_frontend: "Frontend UI",
            group_backend: "Backend & Database",
            group_hardware: "Hardware AI & Mobile",
            group_workflow: "Developer Workflow",
            github_title: `<i class="fab fa-github"></i> Coding Activity & Consistency`,
            streak_alt: "Lesmana's GitHub Streak Stats"
        },
        portfolio: {
            section_title: "Featured Projects & Works",
            section_subtitle: "Stories behind technical hurdles, architectural decisions, and real-world impact delivered.",
            search_placeholder: "Search projects or tech stack (React, Go, IoT)...",
            search_aria: "Search Projects",
            clear_search_title: "Clear Search",
            filter_all: "All Project Stories",
            filter_web: "Web Application",
            filter_ai_iot: "AI & IoT Systems",
            filter_ecommerce: "E-Commerce",
            scroll_left: "Scroll Left",
            scroll_right: "Scroll Right",
            story_label_problem: `<i class="fas fa-exclamation-circle"></i> Problem & Background`,
            story_label_challenge: `<i class="fas fa-puzzle-piece"></i> Unique Challenges`,
            story_label_impact: `<i class="fas fa-chart-line"></i> Impact & Technical Solutions`,
            btn_expand_more: "▼ Read More",
            btn_expand_less: "▲ Hide Details",
            btn_repo: `<span>Explore Repository</span> <i class="fab fa-github"></i>`,
            btn_demo: `<span>Try Live Demo</span> <i class="fas fa-external-link-alt"></i>`,
            no_projects_title: "No Projects Found",
            no_projects_desc: "No projects matched your keyword or filter criteria.",
            btn_reset_search: `<i class="fas fa-redo"></i> Reset Search`
        },
        projects: {
            simrs_billing: {
                title: "SIMRS Billing — Hospital Information Management System",
                badge: "Enterprise Web App",
                problem: "Conventional hospital billing systems often struggle with latency, financial decimal inaccuracies, duplicate claim submissions, and unauthorized cashier actions.",
                challenge: "Developing a full-stack enterprise monorepo (Go/Gin Backend & React 19/Vite 6 Frontend) featuring cashier 2FA authorization, idempotent transaction safeguards (X-Idempotency-Key), exact arbitrary-precision decimal mathematics (shopspring/decimal), and ImageKit API integration.",
                impact: "100% precision in medical billing calculations, structured verification for national & private insurance claims, real-time audit trails for cashier activities, and a patient self-service portal.",
                quote: `"Delivering financial precision and enterprise-grade reliability to mission-critical hospital operations."`
            },
            simrs_fefo: {
                title: "SIMRS FEFO — Hospital Pharmacy Inventory & Expiry Management",
                badge_pharmacy: `<i class="fas fa-chart-line"></i> Pharmacy Dashboard`,
                badge_fefo: `<i class="fas fa-bolt"></i> FEFO Engine`,
                problem: "Risks of dispensing expired medications in hospital care, financial loss from expired stock pileup, and potential human errors during manual medicine batch selection.",
                challenge: "Engineering a full-stack system (Go/Gin Backend & React 19/Vite Frontend) with atomic database transactions (SELECT FOR UPDATE) to prevent race conditions during inventory deductions, paired with a real-time live FEFO (First Expired, First Out) simulation engine.",
                impact: "Automated stock deduction prioritized by nearest expiration date, concurrent double-mutation protection, visual status indicators (Safe, Nearing, Expired), and a modern dual-theme glassmorphic UI.",
                quote: `"Safeguarding patient safety and elevating pharmacy efficiency through automated near-expiry stock deduction."`
            },
            kios_bunga: {
                title: "Jondo Tani Flower Kiosk — POS & Inventory System",
                badge: "Web Application",
                problem: "Manual inventory records and paper receipts at a local flower nursery caused stock discrepancies of ornamental plants and slow checkout lines.",
                challenge: "Designing a modular API architecture decoupling React frontend and Express backend to guarantee instantaneous transaction calculation without simultaneous out-of-stock collisions.",
                impact: "Cashier transaction throughput increased by 3x with centralized, real-time ornamental plant inventory tracking.",
                quote: `"The best software is the one that directly streamlines local everyday operations around us."`
            },
            awan_laundry: {
                title: "Awan Laundry — Operations Management Platform",
                badge: "Operational Web App",
                problem: "Managing laundry queues and daily operational tracking for a laundromat business that previously suffered from disorder during peak order volumes.",
                challenge: "Designing an efficient relational MySQL schema to track multi-stage progress (wash, dry, iron, ready for pickup) alongside daily detergent and supply expense logging.",
                impact: "Operations and order processing became transparently structured, virtually eliminating misplaced clothes or order history mismatches.",
                quote: `"Bringing order and systematic efficiency to small-and-medium laundry business workflows."`
            },
            olericure: {
                title: "OLERICURE — Smart Garden IoT & Plant AI Doctor",
                badge_iot: `<i class="fas fa-microchip"></i> IoT Irrigation Hardware`,
                badge_ai: `<i class="fas fa-brain"></i> Plant Doctor AI Diagnosis`,
                problem: "Excessive water wastage in conventional irrigation and delayed disease detection by urban farmers facing leaf pathogen infections in horticulture.",
                challenge: "Integrating continuous telemetry from ESP32 sensors via MQTT, paired with leaf disease classification powered by MobileNetV2 and Groq LLM to prescribe precise treatment dosages.",
                impact: "Precision automated watering calibrated to soil moisture levels & accurate crop disease diagnosis generated in seconds.",
                quote: `"Where hardware telemetry and artificial intelligence harmonize to nurture living crops."`
            },
            tokosaya: {
                title: "TokoSaya Ecommerce — Full-Stack Platform",
                badge: "E-Commerce Platform",
                problem: "The need for an independent, secure digital storefront with frictionless user purchasing flows from product discovery to admin order dispatching.",
                challenge: "Handling multi-tier role-based access control (customers vs admins), dynamic cart management, and seamless order synchronization without server overhead.",
                impact: "Responsive e-commerce application equipped with secure user authentication and an intuitive product catalog management panel.",
                quote: `"Building a fast, safe, and dependable digital shopping journey from end to end."`
            },
            kalkulator: {
                title: "Scientific Calculator Web Application",
                badge: "Web Interactive Tool",
                problem: "The requirement for a browser-native scientific calculator capable of running fully client-side without backend dependencies.",
                challenge: "Handling complex scientific mathematical expressions (trigonometry, exponentiation, operator precedence and parenthesis nesting) purely in client-side JavaScript.",
                impact: "Instantaneous, responsive, and ultra-lightweight mathematical computing with zero network overhead.",
                quote: `"The elegance of client-side logic processing intricate scientific math instantaneously."`
            }
        },
        contact: {
            section_title: "Let's Connect & Collaborate",
            section_subtitle: "Interested in collaborating, pitching an idea, or just having a virtual coffee chat? Feel free to reach out via any channel below.",
            email_card_title: "Click to copy Lesmana's email",
            email_label: "My Email",
            copy_btn_aria: "Copy Email Address",
            toast_success: "Email copied to clipboard successfully!",
            toast_fallback: "Email: lesmanaadhik@gmail.com",
            linkedin_label: "LinkedIn",
            github_label: "GitHub Repositories",
            instagram_label: "Personal Instagram"
        },
        footer: {
            rights: "All Rights Reserved.",
            subtext: "Thank you for stopping by! Crafted with passion & pride by Lesmana",
            back_to_top_title: "Back to top",
            back_to_top_aria: "Back to top"
        }
    }
};
