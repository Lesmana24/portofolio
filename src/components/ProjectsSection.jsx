import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'SIMRS Billing — Sistem Informasi Manajemen Rumah Sakit',
    category: 'web',
    badge: 'Enterprise Web App',
    image: '/images/simrs-billing.png',
    problem: 'Sistem penagihan rumah sakit (SIMRS) konvensional yang lambat, berisiko kesalahan kalkulasi desimal keuangan, serta rawan klaim ganda dan transaksi kasir tanpa otorisasi.',
    challenge: 'Mengembangkan monorepo enterprise Full-Stack (Backend Go/Gin & Frontend React 19/Vite 6) dengan otorisasi 2FA kasir, proteksi transaksi idempoten (X-Idempotency-Key), matematika presisi desimal (shopspring/decimal), serta integrasi ImageKit API.',
    impact: 'Kalkulasi tagihan medis presisi 100%, verifikasi klaim BPJS & asuransi swasta terstruktur, audit trail real-time aktivitas kasir, dan portal mandiri pasien.',
    quote: 'Menghadirkan presisi keuangan dan keandalan sistem berstandar enterprise pada operasional rumah sakit.',
    tech: ['Go (Golang)', 'Gin', 'React 19', 'PostgreSQL', 'GORM', 'Tailwind CSS', 'ImageKit API'],
    link: 'https://github.com/Lesmana24/simrs-billing'
  },
  {
    id: 2,
    title: 'Sistem Informasi & Kasir Bunga Jondo Tani',
    category: 'web',
    badge: 'Web Application',
    image: '/images/imageKios.png',
    problem: 'Pencatatan inventaris dan transaksi kasir kios bunga lokal yang sebelumnya manual, rawan kesalahan hitung dan stok selisih.',
    challenge: 'Merancang arsitektur API modular terpisah antara Frontend React dan Backend Express untuk kalkulasi kasir instan tanpa deadlock data stok.',
    impact: 'Transaksi kasir 3x lebih cepat dan pencatatan stok bunga terdistribusi terpantau akurat.',
    quote: 'Perangkat lunak terbaik adalah yang langsung mempermudah operasional bisnis lokal di sekitar kita.',
    tech: ['React.js', 'Node.js', 'Express', 'REST API'],
    link: 'https://github.com/Lesmana24/Sistem-Informasi-Manajemen-Inventaris-dan-Kasir'
  },
  {
    id: 3,
    title: 'Awan Laundry — Manajemen Operasional',
    category: 'web',
    badge: 'Operational Web App',
    image: '/images/image1.png',
    problem: 'Manajemen antrean cucian dan operasional harian usaha laundry yang rawan acak-acakan saat volume pesanan tinggi.',
    challenge: 'Merancang skema database relational MySQL efisien untuk melacak status pesanan (cuci, jemur, setrika, siap ambil) serta beban pengeluaran bahan.',
    impact: 'Sistem pemesanan dan pencatatan operasional menjadi terstruktur transparan.',
    quote: 'Menghadirkan keteraturan dan efisiensi sistem pada operasional UMKM laundry.',
    tech: ['PHP', 'HTML5', 'CSS3', 'MySQL'],
    link: 'https://github.com/Lesmana24/Proyek-1'
  },
  {
    id: 4,
    title: 'OLERICURE — Smart Garden IoT & Plant AI Doctor',
    category: 'ai-iot',
    badge: 'IoT & AI Systems',
    isDualImage: true,
    image1: '/images/image2.png',
    image2: '/images/image2_diagnosis.png',
    problem: 'Pemborosan air pada sistem irigasi konvensional dan keterlambatan petani dalam mengidentifikasi penyakit daun tanaman hortikultura.',
    challenge: 'Mengintegrasikan sinyal sensor ESP32 via MQTT secara uninterrupted, dilanjutkan klasifikasi gambar daun menggunakan MobileNetV2 dan Groq LLM.',
    impact: 'Penyiraman otomatis presisi sesuai tingkat kelembapan tanah & diagnosis penyakit daun cepat dalam hitungan detik.',
    quote: 'Ketika sinyal perangkat keras dan model kecerdasan buatan menyatu untuk merawat tanaman.',
    tech: ['Laravel 12', 'Flutter', 'ESP32 / MQTT', 'MobileNetV2', 'Groq LLM'],
    link: 'https://github.com/Lesmana24/Proyek3-Website'
  },
  {
    id: 5,
    title: 'Ecommerce TokoSaya — Full-Stack Platform',
    category: 'ecommerce',
    badge: 'E-Commerce Platform',
    image: '/images/image4.png',
    problem: 'Kebutuhan platform toko digital mandiri yang aman dengan alur belanja mulus dari pencarian produk hingga admin dashboard.',
    challenge: 'Menangani otentikasi role multi-tier (pelanggan vs admin), pengelolaan keranjang belanja dinamis, dan sinkronisasi pesanan.',
    impact: 'Aplikasi e-commerce responsif dengan otentikasi pengguna aman dan panel inventaris produk terkontrol penuh.',
    quote: 'Membangun alur belanja digital yang cepat, aman, dan dapat diandalkan dari hulu ke hilir.',
    tech: ['Laravel', 'MySQL', 'Blade', 'Bootstrap'],
    link: 'https://github.com/Lesmana24/Ecommerce-TokoSaya'
  },
  {
    id: 6,
    title: 'Scientific Calculator Web Application',
    category: 'web',
    badge: 'Web Interactive Tool',
    image: '/images/image3.png',
    problem: 'Kebutuhan alat kalkulator ilmiah berbasis browser yang dapat beroperasi tanpa ketergantungan koneksi server backend.',
    challenge: 'Menangani pengolahan ekspresi matematika ilmiah rumit (trigonometri, kalkulus dasar) secara murni di client-side JavaScript.',
    impact: 'Perhitungan matematis instan, responsif, dan ultra-ringan tanpa overhead jaringan.',
    quote: 'Keindahan sintaksis client-side yang memproses matematika ilmiah rumit secara instan.',
    tech: ['JavaScript (ES6)', 'HTML5', 'CSS3'],
    link: 'https://kalkulator-ilmiah.netlify.app/'
  }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      p.title.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q) ||
      p.tech.some(t => t.toLowerCase().includes(q)) ||
      p.problem.toLowerCase().includes(q) ||
      p.challenge.toLowerCase().includes(q) ||
      p.impact.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 border-y border-zinc-800 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Karya & Rekam Proyek</h2>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full mb-3"></div>
          <p className="text-zinc-400">Kisah di balik tantangan teknis, solusi arsitektur, dan dampak nyata yang telah dibangun.</p>
        </div>

        {/* Controls Bar: Search, Filters & Scroll Nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek atau teknologi..."
              className="w-full pl-10 pr-9 py-2 rounded-full bg-zinc-950 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {[
              { id: 'all', label: 'Semua Cerita Proyek' },
              { id: 'web', label: 'Web Application' },
              { id: 'ai-iot', label: 'AI & IoT Systems' },
              { id: 'ecommerce', label: 'E-Commerce' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                    : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Scroll Nav Buttons */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-orange-600 hover:border-orange-600 flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Scroll left"
              title="Geser Kiri"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-orange-600 hover:border-orange-600 flex items-center justify-center transition-all cursor-pointer shadow-md"
              aria-label="Scroll right"
              title="Geser Kanan"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects Horizontal Scroll Container or Empty State */}
        {filteredProjects.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex flex-nowrap overflow-x-auto gap-7 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-zinc-800"
          >
            {filteredProjects.map(p => (
              <div key={p.id} className="w-[320px] sm:w-[380px] flex-shrink-0 snap-start flex flex-col">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-zinc-950/60 border border-dashed border-zinc-800 rounded-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-1">Proyek Tidak Ditemukan</h3>
            <p className="text-sm text-zinc-400 mb-5 max-w-sm mx-auto">Tidak ada proyek yang cocok dengan kata kunci atau filter pencarian Anda.</p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
