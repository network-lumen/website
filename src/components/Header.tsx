import Link from 'next/link'
import { useState, useEffect } from 'react'

interface NavItem {
  title: string
  href: string
  external?: boolean
}

const navigation: NavItem[] = [
  { title: 'Docs', href: '/docs' },
  { title: 'GitHub', href: 'https://github.com/network-lumen/', external: true },
  { title: 'Community', href: '/community' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-slate-800' 
        : 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-900'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <Link href="/" prefetch={false} className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.png" 
                  alt="Lumen Network Logo" 
                  className="lumen-logo w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Lumen Network
                </div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Decentralized Web</div>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:gap-2">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                >
                  {item.title}
                  <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  prefetch={false}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item.title}
                </Link>
              )
            ))}
            <a
              href="https://github.com/network-lumen/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col space-y-2 bg-slate-900/95 backdrop-blur-xl rounded-xl p-4 border border-slate-800">
              {navigation.map((item) => (
                item.external ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all flex items-center justify-between"
                  >
                    <span>{item.title}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href}
                    prefetch={false}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                )
              ))}
              <a
                href="https://github.com/network-lumen/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all duration-200 text-center mt-2"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
