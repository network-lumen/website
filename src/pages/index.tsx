import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Lumen Browser — Download the browser</title>
        <meta name="description" content="Download Lumen and try a browser built for a more direct web experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<main className="relative min-h-screen overflow-hidden bg-black text-white px-4 py-16">
  
  {/* BACKGROUND LAYERS */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-black" />

<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-blue-500/10 blur-[120px]" />
  <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

  {/* CONTENT WRAPPER */}
<div className="relative min-h-screen flex items-center justify-center px-4 py-16">
  
  <div className="w-full max-w-4xl text-center flex flex-col items-center">

    {/* HERO */}
    <div className="mb-14">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
        Download the browser <br /> Start browsing differently
      </h1>

      <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
        Lumen is a browser designed for censorship-resistant web content and permanent links. Install it and try it.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/downloads" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-slate-950 font-semibold hover:bg-cyan-400 transition">
          Download Lumen
        </Link>

        <a href="https://github.com/network-lumen/browser" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-4 text-slate-200 hover:border-cyan-400 hover:text-white transition">
          View on GitHub
        </a>
      </div>
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">Fast setup</p>
        <h2 className="text-xl font-semibold text-white mb-2">Install in seconds</h2>
        <p className="text-slate-400 text-sm">Get the browser, open a link, and start browsing right away</p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">Permanent links</p>
        <h2 className="text-xl font-semibold text-white mb-2">Content that stays reachable</h2>
        <p className="text-slate-400 text-sm">Access content through permanent links designed to keep working over time</p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">Try it now</p>
        <h2 className="text-xl font-semibold text-white mb-2">See it for yourself</h2>
        <p className="text-slate-400 text-sm">The best way to understand Lumen is to use it</p>
      </div>
    </div>

  </div>
</div>
      </main>
    </Layout>
  )
}
