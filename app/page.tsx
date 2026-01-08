"use client"

import { ArrowRight, Mail, MessageCircle, Send, Sparkles, Check, Zap, Shield, Users, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const integrations = [
  {
    name: "Instagram",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.49 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: "Gmail",
    icon: <Mail className="w-10 h-10" />,
  },
  {
    name: "Google Sheets",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.44 4.5H4.56A1.06 1.06 0 003.5 5.56v12.88c0 .585.475 1.06 1.06 1.06h14.88c.585 0 1.06-.475 1.06-1.06V5.56c0-.585-.475-1.06-1.06-1.06zm-9.44 13H6.5v-2H10v2zm0-3.5H6.5v-2H10v2zm0-3.5H6.5V8.5H10v2zm7.5 7h-6v-2h6v2zm0-3.5h-6v-2h6v2zm0-3.5h-6V8.5h6v2z" />
      </svg>
    ),
  },
  {
    name: "Excel",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H7.5v3.75zm0-5.25V7.5H7.5v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3z" />
      </svg>
    ),
  },
  {
    name: "Google Drive",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.71 3.5L1.15 15l3.4 5.89L11.11 9.39 7.71 3.5zM8.88 3.5l3.4 5.89 3.4-5.89h-6.8zM16.29 3.5l-3.4 5.89 6.56 11.39 3.4-5.89L16.29 3.5zM4.55 15l3.4 5.89h6.8L11.35 15H4.55z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    icon: (
      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#03045E] via-[#023E8A] to-[#03045E] text-[#CAF0F8] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(0,119,182,0.15),transparent_50%)] pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-xl border-b border-[#023E8A]/50 bg-[#03045E]/80">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Fluxio"
              width={50}
              height={50}
              priority
              className="drop-shadow-[0_0_10px_rgba(72,202,228,0.25)] transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-medium text-[#CAF0F8] leading-none">Fluxio</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#productos"
              className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200"
            >
              Productos
            </Link>
            <Link
              href="#integraciones"
              className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200"
            >
              Integraciones
            </Link>
            <Link
              href="#nosotros"
              className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200"
            >
              Nosotros
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScgGLv9kZjK0mxECxRg5uUz9XZWkiBHlwE9Nae5XLCPpFgxjg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block"
            >
              <button className="px-5 py-2 bg-[#00B4D8] text-[#03045E] text-sm font-medium rounded-full hover:bg-[#48CAE4] transition-all duration-200 shadow-lg shadow-[#00B4D8]/20 hover:shadow-[#00B4D8]/30 hover:scale-105">
                Quiero que me contacten
              </button>
            </a>

            <button
              className="md:hidden p-2 text-[#CAF0F8] hover:text-[#00B4D8] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#03045E]/95 backdrop-blur-xl border-b border-[#023E8A]/50 shadow-xl">
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <Link
                href="#productos"
                className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="#integraciones"
                className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Integraciones
              </Link>
              <Link
                href="#nosotros"
                className="text-sm text-[#ADE8F4] hover:text-[#CAF0F8] transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScgGLv9kZjK0mxECxRg5uUz9XZWkiBHlwE9Nae5XLCPpFgxjg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="w-full px-5 py-2 bg-[#00B4D8] text-[#03045E] text-sm font-medium rounded-full hover:bg-[#48CAE4] transition-all duration-200 shadow-xl shadow-[#00B4D8]/30">
                  Quiero que me contacten
                </button>
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00B4D8]/20 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#00B4D8] rounded-full animate-pulse" />
            <span className="text-sm text-[#CAF0F8]">Ahora con nuevas automatizaciones</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#CAF0F8] mb-6 leading-tight">
            Automatizá tu flujo de trabajo
            <br />
            con IA
          </h1>

          <p className="text-lg md:text-xl text-[#ADE8F4] mb-10 max-w-2xl mx-auto leading-relaxed">
            Creá automatizaciones inteligentes que conecten tus herramientas, procesen datos y ejecuten acciones — todo
            impulsado por IA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/5491140708677?text=${encodeURIComponent("Hola! Quiero cotizar")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#00B4D8] text-[#03045E] font-medium rounded-full hover:bg-[#48CAE4] transition-all duration-200 shadow-xl shadow-[#00B4D8]/30 flex items-center gap-2 group"
            >
              Cotizar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-20" id="integraciones">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-5xl font-medium text-[#CAF0F8] mb-2">Integraciones</h2>
            <p className="text-[#ADE8F4]">Conectamos tus herramientas favoritas</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#023E8A]/50 shadow-2xl shadow-[#00B4D8]/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/20 to-transparent pointer-events-none" />
            <IntegrationsCarousel />
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6" id="productos">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-[#CAF0F8] mb-4">Productos</h2>
            <p className="text-lg text-[#ADE8F4]">Cuatro formas en las que Fluxio lleva automatización a tu negocio.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative bg-[#03045E]/80 backdrop-blur-sm border border-[#023E8A]/50 rounded-2xl p-8 hover:border-[#00B4D8]/50 transition-all duration-200 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=120&fit=crop"
                      alt="Bandeja de entrada con mensajes organizados y etiquetas inteligentes en un escritorio moderno"
                      className="w-full h-24 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-[#CAF0F8] mb-3">
                  Agente de IA para Gmail + Base de conocimiento
                </h3>

                <p className="text-[#ADE8F4] mb-6 leading-relaxed">
                  Automatizá todo, borradores, derivaciones y seguimientos — apoyado en tus documentos internos.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "Base de conocimiento buscable",
                    "Respuestas automáticas + etiquetas inteligentes",
                    "Reglas de escalamiento y aprobaciones",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[#90E0EF]">
                      <Check className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-[#48CAE4] transition-colors duration-200 text-sm font-medium group/link"
                >
                  Explorar agente de Gmail
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group relative bg-[#03045E]/80 backdrop-blur-sm border border-[#023E8A]/50 rounded-2xl p-8 hover:border-[#00B4D8]/50 transition-all duration-200 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=120&fit=crop"
                      alt="Sitio web moderno con widget de chat mostrando conversación en tiempo real"
                      className="w-full h-24 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-[#CAF0F8] mb-3">Agente local en JavaScript</h3>

                <p className="text-[#ADE8F4] mb-6 leading-relaxed">
                  Un agente liviano en tu sitio que responde, califica leads y dispara workflows en tiempo real.
                </p>

                <ul className="space-y-3 mb-6">
                  {["Corre dentro de tu sitio", "Conversaciones con contexto", "Captura y enrutamiento de leads"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#90E0EF]">
                        <Check className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-[#48CAE4] transition-colors duration-200 text-sm font-medium group/link"
                >
                  Ver agente web
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group relative bg-[#03045E]/80 backdrop-blur-sm border border-[#023E8A]/50 rounded-2xl p-8 hover:border-[#00B4D8]/50 transition-all duration-200 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Send className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=120&fit=crop"
                      alt="Panel de email marketing mostrando analíticas de campañas con tasas de apertura y engagement"
                      className="w-full h-24 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-[#CAF0F8] mb-3">Email marketing masivo</h3>

                <p className="text-[#ADE8F4] mb-6 leading-relaxed">
                  Lanzá campañas de alto volumen con personalización, segmentación y controles de entregabilidad.
                </p>

                <ul className="space-y-3 mb-6">
                  {["Segmentos de audiencia", "Personalización con IA", "Analíticas + pruebas A/B"].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[#90E0EF]">
                      <Check className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-[#48CAE4] transition-colors duration-200 text-sm font-medium group/link"
                >
                  Ver marketing
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="group relative bg-[#03045E]/80 backdrop-blur-sm border border-[#023E8A]/50 rounded-2xl p-8 hover:border-[#00B4D8]/50 transition-all duration-200 hover:shadow-xl hover:shadow-[#00B4D8]/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0077B6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=120&fit=crop"
                      alt="Equipo colaborando en una reunión, planificando una solución de IA a medida"
                      className="w-full h-24 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-[#CAF0F8] mb-3">Producto de IA a medida</h3>

                <p className="text-[#ADE8F4] mb-6 leading-relaxed">
                  Contanos qué necesitás — diseñamos y entregamos una automatización o un agente adaptado a tu flujo.
                </p>

                <ul className="space-y-3 mb-6">
                  {["Descubrimiento → prototipo → producción", "Integraciones y seguridad", "Iteración continua"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#90E0EF]">
                        <Check className="w-4 h-4 text-[#00B4D8] flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[#00B4D8] hover:text-[#48CAE4] transition-colors duration-200 text-sm font-medium group/link"
                >
                  Pedir un desarrollo
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-4xl font-medium text-[#CAF0F8] mb-2">100+</div>
              <div className="text-[#90E0EF]">Flujos disponibles</div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-4xl font-medium text-[#CAF0F8] mb-2">24/7</div>
              <div className="text-[#90E0EF]">Soporte</div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-[#00B4D8]" />
              </div>
              <div className="text-4xl font-medium text-[#CAF0F8] mb-2">100%</div>
              <div className="text-[#90E0EF]">Seguridad Garantizada</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-gradient-to-br from-[#0077B6]/20 to-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,180,216,0.1),transparent_70%)] pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-medium text-[#CAF0F8] mb-6">
                ¿Listo para automatizar tu flujo de trabajo?
              </h2>
              <p className="text-lg text-[#ADE8F4] mb-8 max-w-2xl mx-auto">
                Sumate a miles de equipos que ya usan nos eligieron para crear automatizaciones inteligentes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/5491140708677?text=${encodeURIComponent("Hola! Quiero cotizar")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#00B4D8] text-[#03045E] font-medium rounded-full hover:bg-[#48CAE4] transition-all duration-200 shadow-xl shadow-[#00B4D8]/30 flex items-center gap-2 group"
                >
                  Empeza a construir
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#023E8A]/50 py-12 px-6" id="nosotros">
        <div className="container mx-auto max-w-6xl">
          <div className="pt-8 border-t border-[#023E8A]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#90E0EF]">© 2025 Fluxio. Todos los derechos reservados.</p>

            <a
              href="https://github.com/Jacksix-dev/fluxio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#90E0EF] hover:text-[#CAF0F8] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function IntegrationsCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setIsPaused(true)
      return
    }

    const carousel = carouselRef.current
    if (!carousel || isPaused) return

    let scrollPosition = 0
    const scrollSpeed = 1
    let animationFrame: number

    const scroll = () => {
      if (!carousel) return

      scrollPosition += scrollSpeed

      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0
      }

      carousel.scrollLeft = scrollPosition
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPaused])

  const doubledIntegrations = [...integrations, ...integrations]

  return (
    <div
      ref={carouselRef}
      className="relative overflow-x-hidden py-12 px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Integrations carousel"
      tabIndex={0}
    >
      <div className="flex gap-6 w-max">
        {doubledIntegrations.map((integration, index) => (
          <div
            key={`${integration.name}-${index}`}
            className="flex-shrink-0 w-64 bg-[#03045E]/60 backdrop-blur-sm border border-[#00B4D8]/30 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-[#00B4D8]/60 hover:bg-[#03045E]/80 transition-all duration-200 hover:scale-105"
          >
            <div className="w-16 h-16 bg-[#00B4D8]/10 rounded-lg flex items-center justify-center text-[#00B4D8]">
              {integration.icon}
            </div>
            <span className="text-sm font-medium text-[#CAF0F8] text-center">{integration.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
