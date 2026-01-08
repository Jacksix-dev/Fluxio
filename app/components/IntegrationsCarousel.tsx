// components/IntegrationsCarousel.tsx
"use client"

import React from "react"
import { FileSpreadsheet, Instagram, Send } from "lucide-react"

type Integration = {
  name: string
  icon: React.ReactNode
}

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 shadow-lg shadow-black/30 flex items-center justify-center">
      {children}
    </div>
  )
}

// Simple inline icons to match the “outlined/cyan” style from the screenshot
function GoogleDriveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8l4 7-4 7H8L4 10l4-7Z" />
      <path d="M10 7h4" />
      <path d="M8 17h8" />
    </svg>
  )
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.2c2.2 0 3.9 1.3 4.6 3.2 1.9.2 3.4 1.8 3.4 3.8 0 1.1-.4 2.1-1.2 2.8.3 2.1-.8 4.1-2.8 4.9-.7 1.9-2.5 3.2-4.6 3.2-1.3 0-2.5-.5-3.4-1.3-2.1.3-4.1-.8-4.9-2.8C1.2 17.3.7 16.3.7 15.2c0-2 1.5-3.6 3.4-3.8C4.8 9.5 6.6 8.2 8.8 8.2c.8-1.4 2-2.2 3.2-2.2Z" opacity=".35" />
      <path d="M9.2 8.6 12 7l2.8 1.6v3.2L12 13.4 9.2 11.8V8.6Z" />
      <path d="M14.8 8.6 17.3 10v3.2L14.8 14.6" />
      <path d="M9.2 14.6 6.7 13.2V10l2.5-1.4" />
      <path d="M12 13.4v3.4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.7a7.7 7.7 0 0 1-11.6 6.6L4 19l.8-4.2A7.7 7.7 0 1 1 20 11.7Z" />
      <path d="M9.2 9.3c.3-.4.7-.4 1.1-.2l.7.4c.3.2.5.6.3 1l-.3.7c-.1.3 0 .6.2.8.5.6 1.3 1.4 2.2 1.9.3.2.6.2.9 0l.6-.4c.3-.2.8-.2 1.1 0l.7.5c.3.2.4.6.2 1-.4.7-1.2 1.2-2 1.2-2.8 0-6.1-3.1-6.1-5.9 0-.8.3-1.5.7-2Z" />
    </svg>
  )
}

const integrations: Integration[] = [
  { name: "Google Sheets", icon: <FileSpreadsheet className="w-10 h-10" /> },
  { name: "Google Drive", icon: <GoogleDriveIcon /> },
  { name: "OpenAI", icon: <OpenAIIcon /> },
  { name: "Telegram", icon: <Send className="w-10 h-10" /> },
  { name: "Instagram", icon: <Instagram className="w-10 h-10" /> },
  { name: "WhatsApp", icon: <WhatsAppIcon /> },
]

export default function IntegrationsCarousel() {
  // Duplicate for seamless loop
  const loop = [...integrations, ...integrations]

  return (
    <div className="relative">
      {/* soft edge fades (like the screenshot) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#001845] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#001845] to-transparent z-10" />

      <div className="overflow-hidden px-6 md:px-10 py-8 md:py-10">
        <div className="marquee inline-flex w-max items-center gap-8 will-change-transform">
          {loop.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="w-[240px] h-[170px] rounded-3xl bg-[#00186A]/70 border border-white/10 shadow-xl shadow-black/30 flex flex-col items-center justify-center gap-4"
              aria-hidden={idx >= integrations.length}
            >
              <IconTile>
                <div className="text-[#00B4D8]">{item.icon}</div>
              </IconTile>
              <div className="text-[#CAF0F8] font-semibold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS (no Tailwind config needed) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          animation: marquee 26s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}