import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState } from 'react'

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'blockchain-data', title: 'Blockchain Data' },
    { id: 'browser-gateway', title: 'Browser & Gateway' },
    { id: 'what-we-dont-collect', title: 'What We Don\'t Collect' },
    { id: 'data-protection', title: 'Data Protection' },
    { id: 'your-rights', title: 'Your Privacy Rights' },
    { id: 'contact', title: 'Contact Us' },
  ]

  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Lumen Network</title>
        <meta name="description" content="Lumen Network Privacy Policy - How we protect your data" />
      </Head>

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-6">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">Privacy Policy</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                Your Privacy Matters
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                We respect your privacy and are committed to protecting your data in our decentralized ecosystem
              </p>
              <p className="text-sm text-slate-500">Last updated: January 6, 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-slate-600 hover:text-cyan-600 py-2 border-l-2 border-transparent hover:border-cyan-600 pl-4 transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">

              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 mb-3">Introduction</h2>
                      <p className="text-slate-700 leading-relaxed text-lg">
                        Lumen Network respects your privacy. As a decentralized protocol, we minimize data collection. This policy explains what minimal information we process and how we protect it.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Blockchain Data */}
              <section id="blockchain-data" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Blockchain Data</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Public & Permanent</h3>
                      <p className="text-slate-600 leading-relaxed">
                        All blockchain transactions are <span className="text-blue-600 font-semibold">permanently public</span> and cannot be deleted:
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700">Wallet addresses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700">Transaction amounts and timestamps</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700">Validator voting records</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm text-yellow-800">
                        <strong className="font-semibold">Important:</strong> Once on the blockchain, this data is permanent and visible to everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Browser & Gateway */}
              <section id="browser-gateway" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Browser & Gateway Data</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No Telemetry by Default</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Lumen Browser is local-first and does not send usage analytics to us. CID retrieval, IPFS activity, and gateway interactions happen between your device and the networks/services you choose.
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-900">Local IPFS (Kubo)</span>
                      </div>
                      <p className="text-xs text-slate-600">May keep local logs/metrics on your machine (not sent to us).</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        <span className="text-sm font-semibold text-slate-900">Gateways</span>
                      </div>
                      <p className="text-xs text-slate-600">Run by independent providers and may have their own access logs.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-800">
                        <strong className="font-semibold">We do NOT track:</strong> Your browsing history, IP addresses, or personal identifiers.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What We Don't Collect */}
              <section id="what-we-dont-collect" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">What We Don't Collect</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Personal Information</h3>
                        <p className="text-sm text-slate-600">No names, emails, or phone numbers</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Browsing History</h3>
                        <p className="text-sm text-slate-600">No tracking of websites you visit</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Private Keys</h3>
                        <p className="text-sm text-slate-600">Never share these with anyone!</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Tracking Cookies</h3>
                        <p className="text-sm text-slate-600">No cookies or tracking pixels</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Protection */}
              <section id="data-protection" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Data Protection</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Your Responsibility</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                        <span className="text-slate-700">Secure your private keys - we cannot recover them</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                        <span className="text-slate-700">Use hardware wallets for large amounts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                        <span className="text-slate-700">Verify addresses and gateway endpoints before sending funds</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Our Measures</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-700">Post-quantum Kyber encryption for browser ↔ gateway sessions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-700">No central database storing credentials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-700">Open-source code for transparency</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Your Privacy Rights */}
              <section id="your-rights" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Your Privacy Rights</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <p className="text-slate-600 mb-6">Depending on your jurisdiction, you may have the following rights:</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Right to Access
                      </h3>
                      <p className="text-sm text-slate-600">Request data we hold about you (limited to off-chain systems)</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Right to Deletion
                      </h3>
                      <p className="text-sm text-slate-600">Delete off-chain data (blockchain data is immutable)</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Right to Portability
                      </h3>
                      <p className="text-sm text-slate-600">Export your data in standard formats</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-sm text-yellow-800">
                      <strong className="font-semibold">Important:</strong> Blockchain data CANNOT be deleted due to its decentralized, immutable nature.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="mb-12">
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-black mb-4">Questions?</h2>
                  <p className="text-cyan-100 mb-6">
                    If you have questions about this Privacy Policy, please contact us through:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="https://github.com/network-lumen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-cyan-200">Code</div>
                        <div className="font-semibold">GitHub</div>
                      </div>
                    </a>
                    <a href="https://discord.gg/DwK6V9shKc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 71 55">
                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-cyan-200">Chat</div>
                        <div className="font-semibold">Discord</div>
                      </div>
                    </a>
                    <a href="https://t.me/+HBWh_cUJCrZiODE0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 496 512">
                        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-cyan-200">Community</div>
                        <div className="font-semibold">Telegram</div>
                      </div>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
