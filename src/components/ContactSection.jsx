import React, { useState } from 'react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lesmanaadhik@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 text-zinc-100 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3">Mari Terhubung & Berdiskusi</h2>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full mb-4"></div>
          <p className="text-zinc-400 leading-relaxed">
            Tertarik berkolaborasi? Punya ide proyek gila? Atau hanya ingin ngopi online? 
            Silakan hubungi saya melalui saluran mana pun di bawah.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Copy Email Card */}
          <div
            onClick={handleCopyEmail}
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">
              ✉️
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-zinc-500">Email (Klik Salin)</span>
              <span className="block text-sm font-semibold text-zinc-200 truncate">lesmanaadhik@gmail.com</span>
            </div>
          </div>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/lesmana-adhi-kusuma"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">
              💼
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-zinc-500">LinkedIn</span>
              <span className="block text-sm font-semibold text-zinc-200 truncate">lesmana-adhi-kusuma</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Lesmana24"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">
              🐙
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-zinc-500">GitHub</span>
              <span className="block text-sm font-semibold text-zinc-200 truncate">Lesmana24</span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/lesmana.ak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-xl shrink-0">
              📷
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-zinc-500">Instagram</span>
              <span className="block text-sm font-semibold text-zinc-200 truncate">@lesmana.ak</span>
            </div>
          </a>
        </div>
      </div>

      {/* Copy Toast */}
      {copied && (
        <div className="fixed bottom-8 right-8 bg-zinc-900 border border-orange-500 text-zinc-100 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3">
          <span className="text-orange-400">✓</span>
          <span className="text-sm font-medium">Email berhasil disalin ke clipboard!</span>
        </div>
      )}
    </section>
  );
}
