import Head from 'next/head'
import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import { explorers, endpoints, tools } from '@/data/community'

export default function Community() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('RPC')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [isTesting, setIsTesting] = useState<Record<string, boolean>>({})

  const testNode = async (url: string, type: string) => {
    if (type !== 'RPC') return

    setIsTesting(prev => ({ ...prev, [url]: true }))
    setTestResults(prev => ({ ...prev, [url]: null })) // Reset result

    try {
      const response = await fetch(`${url}/status`)
      const data = await response.json()
      
      if (data.result) {
        setTestResults(prev => ({
          ...prev,
          [url]: {
            earliest: data.result.sync_info.earliest_block_height,
            latest: data.result.sync_info.latest_block_height,
            tx_index: data.result.node_info?.other?.tx_index || 'unknown',
            voting_power: data.result.validator_info?.voting_power || '0',
            is_validator: parseInt(data.result.validator_info?.voting_power || '0') > 0,
            network: data.result.node_info?.network,
            ok: true
          }
        }))
      }
    } catch (error) {
      console.error(error)
      setTestResults(prev => ({ ...prev, [url]: { ok: false, error: 'Connection Failed / CORS' } }))
    } finally {
      setIsTesting(prev => ({ ...prev, [url]: false }))
    }
  }

  const clearResult = (url: string) => {
    setTestResults(prev => {
      const newResults = { ...prev }
      delete newResults[url]
      return newResults
    })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const platforms = [
    {
      name: 'Discord',
      description: 'Real-time chat & support',
      link: 'https://discord.gg/DwK6V9shKc',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      name: 'Telegram',
      description: 'Global community',
      link: 'https://t.me/+HBWh_cUJCrZiODE0',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'GitHub',
      description: 'Code & contribute',
      link: 'https://github.com/network-lumen/',
      color: 'from-slate-700 to-slate-900',
    },
    {
      name: 'Website',
      description: 'Official resources',
      link: 'https://lumen-network.org',
      color: 'from-primary-500 to-accent-600',
    },
  ]

  return (
    <Layout>
      <Head>
        <title>Community - Lumen Network</title>
        <meta name="description" content="Join the Lumen Network global community" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent-500/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className={`mb-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-400"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-300 to-primary-300 bg-clip-text text-transparent">
                Join the Lumen community
              </span>
            </div>

            <h1 className={`text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block text-white mb-4">Global</span>
              <span className="block bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 bg-clip-text text-transparent">
                Community
              </span>
            </h1>

            <p className={`mt-8 text-xl sm:text-2xl leading-relaxed text-slate-300 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Connect with developers, validators, and blockchain enthusiasts building the future together
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          {/* Platform Cards */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Connect{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  With Us
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose your preferred platform to connect with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, i) => (
                <a
                  key={i}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl perspective-1000"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="relative p-8 text-white">
                    <div className="w-16 h-16 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      {platform.name === 'Discord' && (
                        <svg viewBox="0 0 71 55" fill="currentColor" className="w-full h-full">
                          <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                        </svg>
                      )}
                      {platform.name === 'Telegram' && (
                        <svg viewBox="0 0 496 512" fill="currentColor" className="w-full h-full">
                          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/>
                        </svg>
                      )}
                      {platform.name === 'GitHub' && (
                        <svg viewBox="0 0 496 512" fill="currentColor" className="w-full h-full">
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                        </svg>
                      )}
                      {platform.name === 'Website' && (
                        <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
                          <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="text-2xl font-black mb-2">{platform.name}</h3>
                    <p className="text-white/80 mb-4 text-sm">{platform.description}</p>
                    {/* Arrow Icon */}
                    <div className="absolute top-8 right-8 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Documentation Links */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Official{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h2>
              <p className="text-xl text-slate-600">
                Comprehensive guides and resources from the community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a
                href="https://utsa.gitbook.io/services/mainnet/lumen"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-10 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-primary-300 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-6">📖</div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">UTSA Services Guide</h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Complete mainnet setup and configuration guide from UTSA
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary-600 font-bold group/link">
                    Read Documentation
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>

              <a
                href="https://docs.astrostake.xyz/lumen/cheat-sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-10 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-accent-300 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/10 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-500/5 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-6">⚡</div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Astrostake Cheat Sheet</h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Quick reference and commands for Lumen Network operations
                  </p>
                  <div className="inline-flex items-center gap-2 text-accent-600 font-bold group/link">
                    View Cheat Sheet
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Community Tools */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Community{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Tools
                </span>
              </h2>
              <p className="text-xl text-slate-600">
                Useful tools built and maintained by the community
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-accent-300 transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 mb-5 bg-gradient-to-br from-accent-100 to-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.832L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 13L9 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-accent-600 font-medium text-sm">
                    <span>Open Tool</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Network Explorers */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Network{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Explorers
                </span>
              </h2>
              <p className="text-xl text-slate-600">
                Track and explore Lumen Network blockchain activity
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {explorers.map((explorer, i) => (
                <a
                  key={i}
                  href={explorer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 mb-5 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{explorer.name}</h3>
                  <div className="flex items-center gap-2 text-primary-600 font-medium text-sm">
                    <span>View Explorer</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Network Endpoints */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-slate-900 mb-6">
                Network{' '}
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Endpoints
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Connect to Lumen Network through multiple providers
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Tabs */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.name}
                    onClick={() => setActiveTab(endpoint.name)}
                    className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      activeTab === endpoint.name
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                        : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    {endpoint.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.name}
                  className={`transition-all duration-500 ${
                    activeTab === endpoint.name ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-xl">
                    <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-200">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-black text-slate-900 mb-2">{endpoint.name}</h3>
                        <p className="text-slate-600">{endpoint.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {endpoint.items.map((item, j) => (
                        <div key={j} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-slate-100 transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-bold uppercase">
                                  {item.provider}
                                </span>
                                {testResults[item.url]?.ok && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">
                                    Active
                                  </span>
                                )}
                              </div>
                              <code className="text-base text-slate-900 font-mono break-all block">{item.url}</code>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Test Button */}
                              {activeTab === 'RPC' && (
                                <>
                                  {testResults[item.url] ? (
                                    <button
                                      onClick={() => clearResult(item.url)}
                                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-500 border-2 border-slate-200 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      Clear
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => testNode(item.url, activeTab)}
                                      disabled={isTesting[item.url]}
                                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                        isTesting[item.url] 
                                          ? 'bg-slate-200 text-slate-400 cursor-wait' 
                                          : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-600'
                                      }`}
                                    >
                                      {isTesting[item.url] ? (
                                        <>
                                          <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                          Testing...
                                        </>
                                      ) : (
                                        <>
                                          ⚡ Test
                                        </>
                                      )}
                                    </button>
                                  )}
                                </>
                              )}

                              {/* Copy Button */}
                              <button
                                onClick={() => copyToClipboard(item.url)}
                                className="flex-shrink-0 w-10 h-10 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                                title="Copy to clipboard"
                              >
                                {copiedUrl === item.url ? (
                                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* RESULT PANEL */}
                          {testResults[item.url] && testResults[item.url].ok && (
                            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2">
                              <div>
                                <div className="text-xs text-slate-500 font-medium mb-1">Block Height</div>
                                <div className="text-sm font-mono font-bold text-slate-800">
                                  {parseInt(testResults[item.url].latest).toLocaleString()}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  Earliest: {parseInt(testResults[item.url].earliest).toLocaleString()}
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-xs text-slate-500 font-medium mb-1">Tx Index</div>
                                <div className={`text-sm font-bold uppercase ${
                                  testResults[item.url].tx_index === 'on' ? 'text-green-600' : 'text-red-500'
                                }`}>
                                  {testResults[item.url].tx_index}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs text-slate-500 font-medium mb-1">Validator Node?</div>
                                <div className={`text-sm font-bold ${
                                  testResults[item.url].is_validator ? 'text-primary-600' : 'text-slate-600'
                                }`}>
                                  {testResults[item.url].is_validator ? 'YES' : 'NO'}
                                </div>
                              </div>

                              {testResults[item.url].is_validator && (
                                <div>
                                  <div className="text-xs text-slate-500 font-medium mb-1">Voting Power</div>
                                  <div className="text-sm font-mono font-bold text-slate-800">
                                    {parseInt(testResults[item.url].voting_power).toLocaleString()}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* ERROR MESSAGE */}
                          {testResults[item.url] && !testResults[item.url].ok && (
                            <div className="mt-3 text-xs text-red-500 font-medium px-2 py-1 bg-red-50 rounded">
                              Failed to fetch status. Possibly CORS restricted by the node.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Start Contributing Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're a developer, validator, or enthusiast, there's a place for you in our community
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://github.com/network-lumen/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              View on GitHub
            </a>
            <a
              href="https://discord.gg/DwK6V9shKc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
