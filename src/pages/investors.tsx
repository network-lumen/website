import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

const traction = [
  { value: '3M+', label: 'blocks produced' },
  { value: '44', label: 'validators' },
  { value: '15%', label: 'founder voting power' },
  { value: 'Beta', label: 'native browser live' },
]

const stack = [
  {
    title: 'Native browser',
    body: 'A desktop beta that combines wallet, Lumen URLs, on-chain verification, and direct access to decentralized content.',
  },
  {
    title: 'Gateway network',
    body: 'IPFS-aware gateway agents for pinning, retrieval, routing, and content availability without relying on one hosted endpoint.',
  },
  {
    title: 'Cosmos-SDK chain',
    body: 'A dedicated settlement and governance layer for validators, domains, tax logic, incentives, and network parameters.',
  },
  {
    title: 'User-first crypto UX',
    body: 'Gasless transaction flows and post-quantum-ready cryptography are built into the product direction from the start.',
  },
]

const problemPoints = [
  'Browsers, DNS, gateways, wallets, and hosting are still controlled by centralized choke points.',
  'Most decentralized web projects solve only one layer, forcing users back through fragile Web2 access paths.',
  'Consumers need a complete experience, not another protocol that requires specialist tooling.',
]

export default function Investors() {
  return (
    <Layout>
      <Head>
        <title>For Investors - Lumen Network</title>
        <meta
          name="description"
          content="Investor overview for Lumen Network: problem, complete decentralized internet stack, traction, gasless UX, and post-quantum readiness."
        />
      </Head>

      <div className="bg-white">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0">
            <div className="absolute left-8 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-12 right-8 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                    For Investors
                  </span>
                </div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Lumen is building the complete decentralized internet stack.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                  A native browser, IPFS gateway network, and Cosmos-SDK blockchain designed to make decentralized web access usable, verifiable, gasless, and ready for post-quantum security.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/downloads"
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-500 hover:shadow-cyan-500/40"
                  >
                    Try browser beta
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-sm sm:p-6">
                <div className="grid grid-cols-2 gap-3">
                  {traction.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                      <div className="text-3xl font-black text-white sm:text-4xl">{item.value}</div>
                      <div className="mt-2 text-sm font-semibold text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                  <div className="text-sm font-black uppercase tracking-widest text-cyan-200">
                    Current traction
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Live chain activity, validator distribution, capped founder voting power, and a browser beta create an investable foundation beyond protocol theory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-cyan-700">Problem</div>
                <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                  The decentralized web still depends on centralized access.
                </h2>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {problemPoints.map((point) => (
                    <div key={point} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold leading-relaxed text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <div className="text-sm font-black uppercase tracking-widest text-cyan-300">Solution Stack</div>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                One integrated stack for browsing, storage, routing, settlement, and governance.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {stack.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.5-6.5L19 21l-7-3-7 3L3.5 3.5h17z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-cyan-700">Why Now</div>
                <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                  Lumen turns decentralization into a product surface users can actually open.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  The opportunity is not only another chain. It is the combined distribution layer: browser, wallet, domain resolution, content access, gateways, and validator-secured coordination in one system.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    'Browser beta validates the consumer entry point.',
                    'Gasless flows reduce onboarding friction.',
                    'Post-quantum readiness positions security as infrastructure, not an afterthought.',
                    'Founder voting power at 15% supports a more credible governance story.',
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.71-9.29a1 1 0 00-1.42-1.42L9 10.59 7.71 9.29a1 1 0 00-1.42 1.42l2 2a1 1 0 001.42 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold leading-relaxed text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
              See Lumen in action.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              The browser beta is the clearest way to evaluate the product surface behind Lumen's decentralized internet stack.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/downloads"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition-colors hover:bg-slate-800"
              >
                Try browser beta
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-950 transition-colors hover:border-cyan-500"
              >
                Contact the community
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
