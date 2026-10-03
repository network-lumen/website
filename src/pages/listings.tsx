import Head from 'next/head'
import Layout from '@/components/Layout'
import listings from '@/data/listings.json'

type Listing = {
  name: string
  url: string
  logo?: string
  description?: string
}

type ListingCategory = {
  id: string
  title: string
  description?: string
  items: Listing[]
}

const categories: ListingCategory[] = listings.categories

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function Listings() {
  return (
    <Layout>
      <Head>
        <title>Where to find Lumen - Lumen Network</title>
        <meta
          name="description"
          content="Official list of the trackers, exchanges, explorers and platforms where Lumen (LMN) is listed."
        />
      </Head>

      <div className="bg-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-6">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                  Official Listings
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5">
                Where to find Lumen
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                These are the only official listings of Lumen. If someone contacts you claiming
                otherwise, verify here first.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-12">
          {categories.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{category.title}</h2>
                  {category.description ? (
                    <p className="text-slate-600 mt-1">{category.description}</p>
                  ) : null}
                </div>
                <span className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest">
                  {category.items.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-cyan-500/40 rounded-2xl px-5 py-4 shadow-sm hover:shadow transition-all"
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt=""
                        className="h-11 w-11 flex-shrink-0 rounded-xl object-contain"
                      />
                    ) : (
                      <div className="h-11 w-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white font-black">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-sm text-slate-500 truncate">
                        {item.description || hostname(item.url)}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-cyan-600 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-3xl p-7 sm:p-10 border border-slate-800">
            <h3 className="text-xl font-black text-white mb-2">Listing Lumen on your platform?</h3>
            <p className="text-slate-400">
              Everything you need to integrate LMN (supply endpoints, chain details, logos and
              descriptions) is on the{' '}
              <a href="/docs/trackers/" className="underline text-white">
                Trackers &amp; Listings
              </a>{' '}
              page. Questions:{' '}
              <a href="mailto:contact@lumen-browser.com" className="underline text-white">
                contact@lumen-browser.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
