import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 bg-zinc-900 border-t border-zinc-800 text-center text-zinc-400">
      <div className="max-w-6xl mx-auto px-6 space-y-2">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <strong className="text-zinc-200">Lesmana Adhi Kusuma</strong>. Hak Cipta Dilindungi.
        </p>
        <p className="text-xs text-zinc-500 italic">
          Terima kasih sudah mampir! Dibangun dengan bangga & dedikasi oleh Lesmana — manusia biasa yang menyukai baris kode.
        </p>
      </div>
    </footer>
  );
}
