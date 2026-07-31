import React, { useState } from 'react';

const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-zinc-900 border-y border-zinc-800 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Karya & Rekam Proyek</h2>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full mb-3"></div>
          <p className="text-zinc-400">Kisah di balik tantangan teknis, solusi arsitektur, dan dampak nyata yang telah dibangun.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {[
            { id: 'all', label: 'Semua Cerita Proyek' },
            { id: 'web', label: 'Web Application' },
            { id: 'ai-iot', label: 'AI & IoT Systems' },
            { id: 'ecommerce', label: 'E-Commerce' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                  : 'border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(p => (
            <article
              key={p.id}
              className="bg-zinc-950 border border-zinc-800 hover:border-orange-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Media Container */}
              <div className="relative h-52 overflow-hidden bg-zinc-900">
                {p.isDualImage ? (
                  <div className="grid grid-cols-2 gap-0.5 h-full">
                    <div className="relative">
                      <img src={p.image1} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-[10px] px-2 py-0.5 rounded text-zinc-300">IoT Hardware</span>
                    </div>
                    <div className="relative">
                      <img src={p.image2} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-2 left-2 bg-black/80 text-[10px] px-2 py-0.5 rounded text-zinc-300">AI Doctor</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <span className="absolute top-3 right-3 bg-zinc-950/90 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {p.badge}
                </span>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold mb-4 text-zinc-100 group-hover:text-orange-400 transition-colors">
                  {p.title}
                </h3>

                {/* 4-Point Story Block */}
                <div className="space-y-3 bg-zinc-900/90 p-4 rounded-xl border border-zinc-800/80 mb-4 text-xs">
                  <div>
                    <span className="font-bold text-orange-400 block mb-0.5">Masalah & Latar Belakang:</span>
                    <p className="text-zinc-300 leading-relaxed">{p.problem}</p>
                  </div>
                  <div>
                    <span className="font-bold text-orange-400 block mb-0.5">Tantangan Unik:</span>
                    <p className="text-zinc-300 leading-relaxed">{p.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-orange-400 block mb-0.5">Dampak/Hasil:</span>
                    <p className="text-zinc-300 leading-relaxed">{p.impact}</p>
                  </div>
                </div>

                {/* Personal Quote */}
                <blockquote className="text-xs italic text-zinc-400 border-l-2 border-orange-500 pl-3 mb-5">
                  "{p.quote}"
                </blockquote>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="mt-auto pt-4 border-t border-zinc-800/80">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-all hover:gap-3"
                  >
                    <span>Jelajahi Kode / Aplikasi</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
