import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface NavItem {
  title: string
  href: string
  external?: boolean
}

interface Venue {
  name: string
  description: string
  href: string
  logo: string
}

const dexVenues: Venue[] = [
  {
    name: 'Osmosis',
    description: 'Largest Cosmos DEX',
    href: 'https://app.osmosis.zone/assets/ibc/88DBE57372690630D2DD9779C247479CE124E777C5D695FA90699F3140CEC59F',
    logo: '/venues/osmosis.svg',
  },
  {
    name: 'BeeZee DEX',
    description: 'Order book DEX',
    href: 'https://dex.getbze.com/exchange/market?id=ibc/693DDB2D9B4260D67C8136C22D837F37488E0FBD81857D8E9C6022332EA26E33/ibc/6490A7EAB61059BFC1CDDEB05917DD70BDF3A611654162A1A47DB930D40D8AF4',
    logo: '/venues/beezee.svg',
  },
]

const cexVenues: Venue[] = []

const navigation: NavItem[] = [
  { title: 'Docs', href: '/docs' },
  { title: 'White Paper', href: '/docs/whitepaper' },
  { title: 'Metrics', href: '/metrics' },
  { title: 'GitHub', href: 'https://github.com/network-lumen/', external: true },
  { title: 'Community', href: '/community' },
]

const LUMEN_WEB_STORE_URL = 'https://chromewebstore.google.com/detail/lumen-wallet/lfinoahnjndcbgjjfnaefcmpaglglbph'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [buyOpen, setBuyOpen] = useState(false)
  const [mobileBuyOpen, setMobileBuyOpen] = useState(false)
  const buyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!buyOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (buyRef.current && !buyRef.current.contains(event.target as Node)) {
        setBuyOpen(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBuyOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [buyOpen])

  const handleOpenWallet = () => {
    if (typeof window === 'undefined') return
    window.open(LUMEN_WEB_STORE_URL, '_blank', 'noopener,noreferrer')
    setMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-slate-800' 
        : 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-900'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-[var(--header-h)] w-full items-center justify-between">
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
                  Lumen
                </div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Decentralized Web</div>
              </div>
            </Link>
          </div>
          
          <div className="hidden xl:flex xl:items-center xl:gap-2">
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
            <div className="relative ml-2" ref={buyRef}>
              <button
                type="button"
                onClick={() => setBuyOpen(!buyOpen)}
                aria-haspopup="true"
                aria-expanded={buyOpen}
                className={`flex items-center gap-1.5 px-5 py-2 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/40 hover:scale-105 ${
                  buyOpen ? 'shadow-emerald-500/40 scale-105' : ''
                }`}
              >
                Buy $LMN
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${buyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {buyOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 origin-top-right rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-2 animate-scale-in">
                  <div className="flex items-center gap-2 px-3 pt-2 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">CEX</span>
                    <span className="h-px flex-1 bg-slate-800"></span>
                  </div>
                  {cexVenues.length > 0 ? (
                    cexVenues.map((venue) => (
                      <a
                        key={venue.name}
                        href={venue.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setBuyOpen(false)}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors"
                      >
                        <img src={venue.logo} alt="" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-white">{venue.name}</span>
                          <span className="block text-xs text-slate-400">{venue.description}</span>
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))
                  ) : (
                    <div className="mx-1 px-3 py-3 rounded-xl border border-dashed border-slate-700 bg-slate-800/30 text-center">
                      <p className="text-xs font-bold text-slate-400">Coming soon</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">No centralized listing yet</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 px-3 pt-3 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">DEX</span>
                    <span className="h-px flex-1 bg-slate-800"></span>
                  </div>
                  {dexVenues.map((venue) => (
                    <a
                      key={venue.name}
                      href={venue.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setBuyOpen(false)}
                      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors"
                    >
                      <img src={venue.logo} alt="" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">{venue.name}</span>
                        <span className="block text-xs text-slate-400">{venue.description}</span>
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleOpenWallet}
              className="ml-2 px-5 py-2 text-sm font-extrabold text-cyan-200 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Get Wallet Extension
            </button>
            <Link
              href="/downloads"
              prefetch={false}
              className="ml-2 px-5 py-2 text-sm font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Download Browser
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
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
          <div className="xl:hidden pb-4 animate-slide-down">
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
              <button
                type="button"
                onClick={() => setMobileBuyOpen(!mobileBuyOpen)}
                aria-expanded={mobileBuyOpen}
                className="flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200 mt-2"
              >
                Buy $LMN
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileBuyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileBuyOpen && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2 animate-slide-down">
                  <div className="flex items-center gap-2 px-2 pt-1 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">CEX</span>
                    <span className="h-px flex-1 bg-slate-800"></span>
                  </div>
                  <div className="px-3 py-3 rounded-lg border border-dashed border-slate-700 bg-slate-800/30 text-center">
                    <p className="text-xs font-bold text-slate-400">Coming soon</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">No centralized listing yet</p>
                  </div>

                  <div className="flex items-center gap-2 px-2 pt-3 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">DEX</span>
                    <span className="h-px flex-1 bg-slate-800"></span>
                  </div>
                  {dexVenues.map((venue) => (
                    <a
                      key={venue.name}
                      href={venue.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <img src={venue.logo} alt="" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">{venue.name}</span>
                        <span className="block text-xs text-slate-400">{venue.description}</span>
                      </span>
                      <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleOpenWallet}
                className="px-5 py-3 text-sm font-extrabold text-cyan-100 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-center mt-2"
              >
                Get Wallet Extension
              </button>
              <Link
                href="/downloads"
                prefetch={false}
                className="px-5 py-3 text-sm font-extrabold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all duration-200 text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download Browser
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
