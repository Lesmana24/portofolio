import React from 'react';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-[85vh] pt-32 pb-20 flex items-center bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-7">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#ea580c]"></span>
            <span>Terbuka untuk Pekerjaan & Collaborations</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-5">
            Lesmana Adhi Kusuma: <br />
            <span className="text-orange-500 italic font-serif">Menjembatani Kode & Solusi Dunia Nyata</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl font-semibold text-orange-400/90 mb-5">
            Software Engineer & Mahasiswa Teknik Informatika
          </p>

          {/* Personal Story Description */}
          <p className="text-lg text-zinc-400 leading-relaxed mb-9 max-w-2xl">
            Mahasiswa Teknik Informatika yang menemukan kesenangan dalam memecahkan masalah kompleks. 
            Saya tidak hanya menulis kode; saya suka membangun alat yang benar-benar membantu manusia 
            dalam kehidupan sehari-hari.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg shadow-orange-600/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Jelajahi Proyek Saya</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-500/10 text-zinc-200 hover:text-orange-400 font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Mari Ngobrol</span>
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-6 border-t border-dashed border-zinc-800 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Fokus Utama:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">React.js</span>
              <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">Laravel</span>
              <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">Node.js</span>
              <span className="px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">IoT & AI Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
