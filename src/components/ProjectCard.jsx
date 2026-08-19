import React, { useState } from 'react';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="flex flex-col justify-between h-full bg-zinc-950 border border-zinc-800 hover:border-orange-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/5 group">
      {/* Top Header & Media Container */}
      <div>
        {/* Aspect Video Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
          {project.isDualImage ? (
            <div className="grid grid-cols-2 gap-0.5 h-full w-full">
              <div className="relative h-full w-full">
                <img
                  src={project.image1}
                  alt={project.title}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/80 text-[10px] px-2 py-0.5 rounded text-zinc-300 font-medium backdrop-blur-sm">
                  {project.badge1 || 'IoT Hardware'}
                </span>
              </div>
              <div className="relative h-full w-full">
                <img
                  src={project.image2}
                  alt={project.title}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/80 text-[10px] px-2 py-0.5 rounded text-zinc-300 font-medium backdrop-blur-sm">
                  {project.badge2 || 'AI Doctor'}
                </span>
              </div>
            </div>
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <span className="project-badge">
            {project.badge}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col">
          <h3 className="font-serif text-xl font-bold mb-3 text-zinc-100 group-hover:text-orange-400 transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Story Block Container with Expandable Technical Details */}
          <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800/80 mb-3 text-xs space-y-2.5">
            <div>
              <span className="font-bold text-orange-400 block mb-0.5">Masalah & Latar Belakang:</span>
              <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
            </div>

            {/* Expandable Technical Details */}
            {isExpanded && (
              <div className="pt-2.5 mt-2.5 border-t border-zinc-800/60 space-y-2.5 animate-fadeIn">
                <div>
                  <span className="font-bold text-orange-400 block mb-0.5">Tantangan Unik:</span>
                  <p className="text-zinc-300 leading-relaxed">{project.challenge}</p>
                </div>
                <div>
                  <span className="font-bold text-orange-400 block mb-0.5">Dampak & Solusi Teknis:</span>
                  <p className="text-zinc-300 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            )}

            {/* Toggle Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-medium text-orange-500 hover:text-orange-400 hover:underline mt-2 inline-flex items-center gap-1 focus:outline-none cursor-pointer transition-colors"
            >
              {isExpanded ? '▲ Sembunyikan Detail' : '▼ Baca Selengkapnya'}
            </button>
          </div>

          {/* Personal Quote */}
          <blockquote className="text-xs italic text-zinc-400 border-l-2 border-orange-500 pl-3 my-2">
            "{project.quote}"
          </blockquote>
        </div>
      </div>

      {/* Bottom Pinned Footer */}
      <div className="p-6 pt-0 mt-auto flex flex-col">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        {/* Link Button */}
        <div className="pt-3 border-t border-zinc-800/80">
          <a
            href={project.link}
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
  );
}
