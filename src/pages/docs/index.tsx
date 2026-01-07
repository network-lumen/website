import Head from 'next/head'
import { GetStaticProps } from 'next'
import Layout from '@/components/Layout'
import Sidebar from '@/components/Sidebar'
import { getAllDocs, getDocsByCategory, Doc } from '@/lib/markdown'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface DocsIndexProps {
  allDocs: Doc[]
  categories: Record<string, Doc[]>
}

export default function DocsIndex({ allDocs, categories }: DocsIndexProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const quickStartCards = [
    {
      icon: '🚀',
      title: 'Quick Start',
      description: 'Get up and running in minutes with our comprehensive getting started guide',
      href: '/docs/getting-started',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: '⚙️',
      title: 'Technical',
      description: 'Dive deep into architecture, consensus, and blockchain specifications',
      href: '/docs/technical',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: '🛡️',
      title: 'Validators',
      description: 'Learn how to run and operate a validator node on Lumen Network',
      href: '/docs/validators',
      color: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <Layout>
      <Head>
        <title>Documentation - Lumen Network</title>
        <meta name="description" content="Lumen Network comprehensive documentation and guides" />
      </Head>

      <div className="flex">
        <Sidebar docs={allDocs} />
        
        <div className="flex-1 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <article className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
            {/* Header */}
            <header className={`mb-20 transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
                <div className="relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200 shadow-lg">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-lg shadow-cyan-500/50"></span>
                  </span>
                  <span className="text-base font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-wider uppercase">Developer Hub</span>
                </div>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black mb-10 leading-tight">
                <span className="block text-slate-900 mb-2">Documentation</span>
                <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                  Center
                </span>
              </h1>

              <p className="text-2xl text-slate-600 leading-relaxed max-w-4xl">
                Everything you need to build, deploy, and scale on Lumen Network. From beginner guides to advanced technical specifications.
              </p>
            </header>

            {/* Quick Start Cards */}
            <div className={`mb-24 transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="text-4xl font-black text-slate-900 mb-12">Quick Start</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {quickStartCards.map((card, i) => (
                  <Link
                    key={i}
                    href={card.href}
                    prefetch={false}
                    className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-95 group-hover:opacity-100 transition-opacity`}></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Content */}
                    <div className="relative p-8 text-white min-h-[280px] flex flex-col">
                      <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-black mb-3">{card.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed flex-1">
                        {card.description}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 text-white font-bold group/link">
                        <span>Get Started</span>
                        <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Documentation Categories */}
            <div className={`space-y-16 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {Object.entries(categories).map(([category, docs]) => (
                <div key={category}>
                  <h2 className="text-4xl font-black text-slate-900 mb-8 capitalize">
                    {category}
                    <span className="ml-3 text-primary-600">({docs.length})</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/docs/${doc.slug}`}
                        prefetch={false}
                        className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1"
                      >
                        {/* Gradient Accent */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* Glow Effect on Hover */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                              {doc.title}
                            </h3>
                            <svg className="w-6 h-6 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>

                          <p className="text-slate-600 leading-relaxed mb-4">
                            {doc.description}
                          </p>

                          <div className="flex items-center gap-3 text-sm">
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium capitalize">
                              {doc.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className={`mt-24 p-12 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <h2 className="text-4xl font-black mb-6">Need Help?</h2>
                  <p className="text-xl text-blue-100 mb-10 max-w-3xl leading-relaxed">
                    Can't find what you're looking for? Join our community or check out these resources
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                      href="https://discord.gg/DwK6V9shKc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-4xl mb-4">💬</div>
                      <h3 className="text-xl font-bold mb-2">Discord</h3>
                      <p className="text-blue-100 text-sm mb-4">Chat with the community</p>
                      <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group/link">
                        Join Now
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>

                    <a
                      href="https://github.com/network-lumen/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-4xl mb-4">⚡</div>
                      <h3 className="text-xl font-bold mb-2">GitHub</h3>
                      <p className="text-blue-100 text-sm mb-4">Browse source code</p>
                      <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group/link">
                        View Repos
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>

                    <a
                      href="https://lumen-network.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-4xl mb-4">🌐</div>
                      <h3 className="text-xl font-bold mb-2">Official Site</h3>
                      <p className="text-blue-100 text-sm mb-4">Visit main website</p>
                      <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group/link">
                        Learn More
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allDocs = getAllDocs()
  const categories = getDocsByCategory()

  return {
    props: {
      allDocs,
      categories,
    },
  }
}
