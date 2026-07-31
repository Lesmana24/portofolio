import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Cerita & Perjalanan</h2>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full mb-3"></div>
          <p className="text-zinc-400">Mengenal lebih dekat sosok di balik baris kode dan logika aplikasi.</p>
        </div>

        {/* Asymmetric Layout with Sticky Left Profile Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Profile Column — Sticky Desktop Viewport */}
          <div className="lg:col-span-4 md:sticky md:top-24 h-fit">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 group">
              <img
                src="/images/profil.png"
                alt="Lesmana Adhi Kusuma"
                className="w-full h-[380px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
                <span className="block font-serif text-2xl font-bold text-orange-500">5+</span>
                <span className="text-xs text-zinc-400 font-medium">Karya Berdampak</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
                <span className="block font-serif text-2xl font-bold text-orange-500">AI & IoT</span>
                <span className="text-xs text-zinc-400 font-medium">Sensors & Vision</span>
              </div>
            </div>
          </div>

          {/* Right Story & Narrative Column */}
          <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-zinc-100">
                Halo! Saya Lesmana.
              </h3>

              <div className="space-y-5 text-zinc-300 leading-relaxed text-base">
                <p>
                  Perjalanan saya di dunia teknologi bermula dari rasa penasaran sederhana:{' '}
                  <em className="text-zinc-200">"Bagaimana cara membuat sesuatu dari layar komputer yang bisa menyelesaikan masalah nyata di sekitarku?"</em>{' '}
                  Bagi saya, coding bukan sekadar merangkai sintaksis, melainkan seni menyusun solusi yang intuitif dan bermanfaat bagi orang lain.
                </p>

                <p>
                  Sebagai mahasiswa Teknik Informatika, saya sering menghadapi berbagai tantangan logika rumit—mulai dari mengelola arsitektur database kasir yang padat, merancang alur transaksi laundry yang rapi, hingga menghubungkan sensor hardware IoT di lahan pertanian dengan kecerdasan buatan AI.
                </p>

                <div className="p-5 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 text-zinc-200 font-medium my-4">
                  "Saya suka mengubah ide menjadi aplikasi web fungsional menggunakan ekosistem <strong>React & Node.js</strong>. 
                  Untuk backend yang tangguh, <strong>Laravel</strong> sering menjadi pilihan utama. Di luar browser, saya antusias bereksperimen 
                  dengan <strong>ESP32, MQTT</strong>, serta integrasi <strong>Computer Vision & LLM</strong>."
                </div>
              </div>
            </div>

            {/* Organic Skill Badges */}
            <div className="pt-8 border-t border-zinc-800">
              <h4 className="font-semibold text-orange-400 mb-6 flex items-center gap-2">
                <span>Alat & Ekosistem Teknologi</span>
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
                  <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Frontend UI</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono text-xs font-semibold">React.js</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">JavaScript (ES6+)</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">HTML5 & CSS3</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
                  <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Backend & Database</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono text-xs font-semibold">Laravel</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">Node.js / Express</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">PHP</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">MySQL</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5">
                  <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Hardware AI & Mobile</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono text-xs font-semibold">ESP32 & IoT</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">MQTT Protocol</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">MobileNetV2 (Vision)</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">Groq LLM</span>
                    <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs">Flutter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
