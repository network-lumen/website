import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState } from 'react'

export default function Terms() {
  const [activeSection, setActiveSection] = useState('')

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'what-you-can-do', title: 'Permitted Use' },
    { id: 'what-you-cannot-do', title: 'Prohibited Activities' },
    { id: 'your-responsibilities', title: 'Your Responsibilities' },
    { id: 'warranties', title: 'No Warranties' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'validators', title: 'For Validators' },
    { id: 'contact', title: 'Contact' },
  ]

  return (
    <Layout>
      <Head>
        <title>Terms of Service - Lumen Network</title>
        <meta name="description" content="Lumen Network Terms of Service - Legal terms and conditions" />
      </Head>

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-6">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-xs font-black text-red-300 uppercase tracking-widest">Legal Agreement</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                Please read these terms carefully before using Lumen Network
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
              {/* Important Notice */}
              <section id="acceptance" className="mb-12">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 mb-2">IMPORTANT - READ CAREFULLY</h2>
                      <p className="text-slate-700 leading-relaxed font-semibold mb-3">
                        By using Lumen Network (browser, gateways, blockchain), you accept these terms. If you disagree, DO NOT use our services.
                      </p>
                      <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
                        <p className="text-sm text-yellow-800 font-bold">
                          ⚡ All blockchain transactions are FINAL and IRREVERSIBLE. Lost keys = lost funds forever.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* What You Can Do */}
              <section id="what-you-can-do" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">What You Can Do</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Use Lumen Browser to access decentralized websites',
                      'Send and receive tokens on the blockchain',
                      'Run validators and earn staking rewards',
                      'Access IPFS content through our gateways',
                      'Participate in network governance and voting',
                      'Build dApps and integrations on Lumen Network',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* What You Cannot Do */}
              <section id="what-you-cannot-do" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">What You CANNOT Do</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Use for illegal activities (money laundering, fraud, terrorism)',
                      'Attack or hack the network (DDoS, exploits, consensus manipulation)',
                      'Trade illegal goods or services',
                      'Spam transactions or abuse resources',
                      'Impersonate Lumen Network or team members',
                      'Violate intellectual property rights',
                      'Distribute malware or viruses',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Your Responsibilities */}
              <section id="your-responsibilities" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Your Responsibilities</h2>
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-8">
                  <p className="text-lg font-bold text-slate-900 mb-4">YOU are responsible for:</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-1">Private Key Security</h3>
                      <p className="text-sm text-slate-600">Keep them secret. Never share. Use hardware wallets.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-1">Transaction Verification</h3>
                      <p className="text-sm text-slate-600">Double-check addresses before sending. Mistakes are permanent.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-1">Legal Compliance</h3>
                      <p className="text-sm text-slate-600">Follow your local laws regarding cryptocurrency use.</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <h3 className="font-bold text-slate-900 mb-1">Due Diligence</h3>
                      <p className="text-sm text-slate-600">Research third-party sites/apps before interacting. We don't audit third-party code.</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                    <p className="font-bold text-red-900 mb-2">⚠️ WE CANNOT HELP IF YOU:</p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Lose your private keys or seed phrase</li>
                      <li>• Send funds to the wrong address</li>
                      <li>• Get scammed by a fake website/dApp</li>
                      <li>• Fall victim to phishing attacks</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* No Warranties */}
              <section id="warranties" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">NO WARRANTIES - Use At Your Own Risk</h2>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <p className="text-lg text-slate-700 mb-4">
                    Lumen Network is provided <span className="font-bold">"AS IS"</span> and <span className="font-bold">"AS AVAILABLE"</span> with <span className="text-red-600 font-bold">ZERO WARRANTIES</span>.
                  </p>
                  <p className="font-semibold text-slate-900 mb-3">We do NOT guarantee:</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '100% uptime or error-free service',
                      'Transaction success or speed',
                      'Third-party app security (audit them yourself!)',
                      'Protection from bugs, hacks, or exploits',
                      'Value stability of tokens',
                      'Recovery of lost funds or keys',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span className="text-slate-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-800">
                      🚫 Third-party sites, apps, and wallets are NOT endorsed or verified by us.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">ZERO LIABILITY</h2>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8">
                  <p className="text-lg font-bold text-slate-900 mb-4">
                    Lumen Network and its contributors are <span className="text-red-600">NOT LIABLE</span> for ANY losses:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {[
                      { icon: '💸', text: 'Lost or stolen cryptocurrency' },
                      { icon: '🔑', text: 'Lost private keys or passwords' },
                      { icon: '⚠️', text: 'Network downtime or congestion' },
                      { icon: '🌐', text: 'IPFS gateway failures' },
                      { icon: '💥', text: 'Blockchain forks or reorgs' },
                      { icon: '📉', text: 'Token price fluctuations' },
                      { icon: '🎭', text: 'Phishing or social engineering attacks' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700">
                        <span>{item.icon}</span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
                    <p className="text-sm text-yellow-900 font-bold">
                      Maximum liability (if any): $0 USD. Use at your own risk.
                    </p>
                  </div>
                </div>
              </section>

              {/* For Validators */}
              <section id="validators" className="mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-6">For Validators & Node Operators</h2>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8">
                  <p className="font-semibold text-cyan-900 mb-4">Additional requirements if you run infrastructure:</p>
                  <div className="space-y-3">
                    {[
                      { title: 'Uptime', desc: 'Maintain 95%+ availability or risk slashing' },
                      { title: 'Updates', desc: 'Upgrade software promptly (monitor Discord/GitHub)' },
                      { title: 'Security', desc: 'Secure your validator keys with HSM/cold storage' },
                      { title: 'Governance', desc: 'Vote on proposals (abstaining = accepting outcome)' },
                      { title: 'Slashing', desc: 'You accept risk of losing stake for downtime/misbehavior' },
                      { title: 'Parameters', desc: 'Rewards and parameters are protocol-defined and can change via governance' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-lg">
                        <span className="font-bold text-slate-900">{item.title}:</span> <span className="text-slate-600 text-sm">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Running a validator is technically demanding. Don't stake funds you can't afford to lose.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="mb-12">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-black mb-4">Questions About These Terms?</h2>
                  <p className="text-slate-300 mb-6">
                    Join our community or review our open-source code:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="https://github.com/network-lumen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Code</div>
                        <div className="font-semibold">GitHub</div>
                      </div>
                    </a>
                    <a href="https://discord.gg/DwK6V9shKc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 71 55">
                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Chat</div>
                        <div className="font-semibold">Discord</div>
                      </div>
                    </a>
                    <a href="https://t.me/+HBWh_cUJCrZiODE0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 496 512">
                        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Community</div>
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
