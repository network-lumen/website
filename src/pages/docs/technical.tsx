import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const TARGET = '/docs/whitepaper/'

/**
 * The Technical Overview was merged into the white paper.
 *
 * Apache serves a real 301 for this URL (see public/.htaccess). This page is the
 * fallback that keeps the redirect working on hosts without that rewrite, since
 * the site is a static export and can be served from anywhere.
 */
export default function TechnicalRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace(TARGET)
  }, [router])

  return (
    <>
      <Head>
        <title>Technical Overview - Lumen Network</title>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
        <link rel="canonical" href={`https://lumen-browser.com${TARGET}`} />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-cyan-300">Page moved</p>
          <h1 className="mt-4 text-2xl font-black text-white">
            The Technical Overview is now part of the white paper.
          </h1>
          <p className="mt-4 text-sm text-slate-400">Redirecting you now.</p>
          <Link
            href="/docs/whitepaper"
            prefetch={false}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-cyan-500"
          >
            Go to the white paper
          </Link>
        </div>
      </div>
    </>
  )
}
