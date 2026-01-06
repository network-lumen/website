import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Lumen Network - Decentralized Internet Stack</title>
        <meta name="description" content="A complete decentralized internet infrastructure combining a native browser, IPFS gateways, and a Cosmos-SDK blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-20 pb-20 sm:pb-32">
          {/* Lumen Logo */}
          <div className={`mb-6 sm:mb-8 flex justify-center transition-all duration-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <img 
              src="/logo.png" 
              alt="Lumen Network Logo" 
              className="lumen-logo w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </div>
          
          <div className={`mb-4 sm:mb-6 transition-all duration-500 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-xl sm:text-2xl lg:text-3xl font-black text-cyan-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Lumen Network</span>
          </div>
          
          <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 mb-8 sm:mb-12 transition-all duration-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold text-cyan-300">Browser • Gateways • Blockchain</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 tracking-tight transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="block text-white mb-1 sm:mb-2">
              The Decentralized
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Internet Stack
            </span>
          </h1>

          <p className={`text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Complete internet infrastructure combining a native browser, IPFS gateways, and Cosmos-SDK blockchain for truly decentralized web access
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Link href="/docs" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2">
              Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="https://github.com/network-lumen" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm text-white rounded-xl font-bold text-sm sm:text-base border border-slate-600 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <Link href="/community" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm text-white rounded-xl font-bold text-sm sm:text-base border border-slate-600 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Community
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`mt-12 sm:mt-16 lg:mt-20 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Explore</span>
            <div className="flex flex-col items-center animate-bounce">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-cyan-100 border border-cyan-200 rounded-full mb-4 sm:mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cyan-600"></span>
              <span className="text-xs font-black text-cyan-900 uppercase tracking-widest">The Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-4 sm:mb-6 px-4">
              Three Pillars of Decentralization
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              A complete infrastructure for accessing, distributing, and securing web content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Browser Card */}
            <div className={`group relative bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '100ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">Native Browser</h3>
                <p className="text-cyan-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Direct access to on-chain state, IPFS content, and network gateways without centralized intermediaries.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['No DNS dependencies', 'Direct IPFS integration', 'Built-in wallet', 'On-chain verification'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="https://github.com/network-lumen/browser" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                  View Browser
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Gateways Card */}
            <div className={`group relative bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">Gateway Network</h3>
                <p className="text-indigo-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Lightweight IPFS pinning and content delivery agents distributed across the network for redundant storage.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['Distributed pinning', 'Content delivery', 'Automatic replication', 'Gateway incentives'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <svg className="w-5 h-5 text-indigo-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="https://github.com/network-lumen/gateway-agent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                  Gateway Agent
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Blockchain Card */}
            <div className={`group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 md:col-span-2 lg:col-span-1 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3">Cosmos Blockchain</h3>
                <p className="text-slate-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Custom Cosmos-SDK chain with tax logic, gasless transactions, and post-quantum cryptography ready validation.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['Gasless transactions', 'Tax logic built-in', 'PQC-ready security'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-white">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <a href="https://github.com/network-lumen/blockchain" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                  Blockchain Core
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Lumen Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-4 sm:mb-6">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">Benefits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 px-4">
              Why Choose Lumen?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              True decentralization requires more than just blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">No Single Point of Failure</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Distributed architecture ensures content remains accessible even if individual nodes go offline
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">Censorship Resistant</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Content is stored on IPFS and accessed through decentralized gateways, immune to censorship
              </p>
            </div>

            <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">Cryptographically Verified</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Every piece of content is verified on-chain, ensuring authenticity and integrity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20"></div>
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-cyan-100 border border-cyan-200 rounded-full mb-4 sm:mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-600"></span>
            <span className="text-xs font-black text-cyan-900 uppercase tracking-widest">Get Involved</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-4 sm:mb-6 px-4">
            Join the Movement
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Experience a truly open and censorship-resistant internet built on decentralized infrastructure
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/docs" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2">
              Read Documentation
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="https://github.com/network-lumen" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-cyan-500 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Explore GitHub
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
