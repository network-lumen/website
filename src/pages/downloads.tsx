import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useMemo, useState } from 'react'

const GITHUB_REPO = 'network-lumen/browser'
const GITHUB_RELEASES_LATEST_URL = `https://github.com/${GITHUB_REPO}/releases/latest`
const GITHUB_API_RELEASES_LATEST_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`

type GithubReleaseAsset = {
  name: string
  browser_download_url: string
  size: number
}

type GithubLatestRelease = {
  tag_name: string
  html_url: string
  assets: GithubReleaseAsset[]
}

function safeString(input: unknown) {
  return typeof input === 'string' ? input : ''
}

function safeNumber(input: unknown) {
  const n = typeof input === 'number' ? input : Number(input)
  return Number.isFinite(n) ? n : 0
}

function normalizeRelease(input: any): GithubLatestRelease {
  const assetsRaw = Array.isArray(input?.assets) ? input.assets : []
  const assets: GithubReleaseAsset[] = assetsRaw
    .map(
      (a: any): GithubReleaseAsset => ({
      name: safeString(a?.name),
      browser_download_url: safeString(a?.browser_download_url),
      size: safeNumber(a?.size),
      }),
    )
    .filter((a: GithubReleaseAsset) => a.name && a.browser_download_url)

  return {
    tag_name: safeString(input?.tag_name),
    html_url: safeString(input?.html_url) || GITHUB_RELEASES_LATEST_URL,
    assets,
  }
}

function findAsset(assets: GithubReleaseAsset[], re: RegExp) {
  return assets.find((a) => re.test(a.name)) || null
}

function formatSize(bytes: number) {
  const b = safeNumber(bytes)
  if (!b) return ''
  const mb = b / 1024 / 1024
  if (mb < 1024) return `${mb.toFixed(0)} MB`
  const gb = mb / 1024
  return `${gb.toFixed(1)} GB`
}

const CACHE_KEY = 'lumen_downloads_latest_release_v1'
const CACHE_TTL_MS = 30 * 60 * 1000

function loadCachedRelease(): GithubLatestRelease | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const ts = safeNumber(parsed?.ts)
    if (!ts || Date.now() - ts > CACHE_TTL_MS) return null
    return normalizeRelease(parsed?.data)
  } catch {
    return null
  }
}

function saveCachedRelease(release: GithubLatestRelease) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data: release }),
    )
  } catch {
    // ignore
  }
}

export default function Downloads() {
  const [latest, setLatest] = useState<GithubLatestRelease | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    const cached = loadCachedRelease()
    if (cached) setLatest(cached)

    const controller = new AbortController()
    fetch(GITHUB_API_RELEASES_LATEST_URL, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`http_${res.status}`)
        return res.json()
      })
      .then((json) => {
        const normalized = normalizeRelease(json)
        setLatest(normalized)
        saveCachedRelease(normalized)
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        if (cached) return
        setLoadError(String(err?.message || err || 'fetch_failed'))
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const assets = latest?.assets || []
  const downloadLinks = useMemo(() => {
    return {
      windowsX64: findAsset(assets, /Lumen-Browser-Setup-.*-windows-x64\.exe$/i),
      linuxX64: findAsset(assets, /Lumen-Browser-.*-linux-x64\.AppImage$/i),
      macArm64: findAsset(assets, /Lumen-Browser-.*-mac-arm64\.dmg$/i),
      macX64: findAsset(assets, /Lumen-Browser-.*-mac-x64\.dmg$/i),
      sha256sums: findAsset(assets, /^SHA256SUMS\.txt$/i),
    }
  }, [assets])

  const latestTag = latest?.tag_name || ''
  const latestUrl = latest?.html_url || GITHUB_RELEASES_LATEST_URL

  return (
    <Layout>
      <Head>
        <title>Download Beta - Lumen Network</title>
        <meta
          name="description"
          content="Download the Lumen Browser beta for Windows, macOS, and Linux."
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
                  Beta Download
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5">
                Download Lumen Browser (Beta)
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                {latestTag ? (
                  <>
                    Latest release:{' '}
                    <span className="text-white font-black">{latestTag}</span>{' '}
                    — available for Windows, macOS, and Linux.
                  </>
                ) : (
                  <>Windows, macOS and Linux are available.</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary download */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                      Windows (x64)
                    </h2>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                      Installer for 64-bit Windows. This is a beta build.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Windows 10/11 (64-bit)',
                    'Installer (.exe)',
                    'Auto-updates: Yes',
                    'macOS & Linux: Yes',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3"
                    >
                      <svg
                        className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={downloadLinks.windowsX64?.browser_download_url || latestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-2xl font-black text-base shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all"
                  >
                    Download for Windows
                    {downloadLinks.windowsX64?.size
                      ? ` (${formatSize(downloadLinks.windowsX64.size)})`
                      : ''}
                    <svg
                      className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 3v12m0 0l4-4m-4 4l-4-4m8 6H8"
                      />
                    </svg>
                  </a>
                  {downloadLinks.sha256sums?.browser_download_url ? (
                    <a
                      href={downloadLinks.sha256sums.browser_download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-900 rounded-2xl font-black text-base shadow-sm hover:shadow transition-all"
                    >
                      Checksums (SHA256)
                    </a>
                  ) : null}
                </div>
                {loadError ? (
                  <div className="mt-4 text-sm text-slate-500">
                    Could not fetch latest release automatically ({loadError}).{' '}
                    <a
                      href={latestUrl}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open GitHub releases
                    </a>
                    .
                  </div>
                ) : null}
              </div>

              <div className="mt-8 bg-gradient-to-br from-slate-950 to-slate-900 rounded-3xl p-7 sm:p-10 border border-slate-800">
                <h3 className="text-xl font-black text-white mb-2">Other platforms</h3>
                <p className="text-slate-400 mb-6">
                  Downloads are pulled from the latest GitHub release. Other architectures are coming soon.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Linux (x64)',
                      detail: downloadLinks.linuxX64?.size
                        ? `AppImage • ${formatSize(downloadLinks.linuxX64.size)}`
                        : 'AppImage',
                      url: downloadLinks.linuxX64?.browser_download_url || null,
                      available: !!downloadLinks.linuxX64,
                    },
                    {
                      title: 'macOS (Apple Silicon)',
                      detail: downloadLinks.macArm64?.size
                        ? `DMG • ${formatSize(downloadLinks.macArm64.size)}`
                        : 'DMG',
                      url: downloadLinks.macArm64?.browser_download_url || null,
                      available: !!downloadLinks.macArm64,
                    },
                    {
                      title: 'macOS (Intel)',
                      detail: downloadLinks.macX64?.size
                        ? `DMG • ${formatSize(downloadLinks.macX64.size)}`
                        : 'DMG',
                      url: downloadLinks.macX64?.browser_download_url || null,
                      available: !!downloadLinks.macX64,
                    },
                    { title: 'Windows (arm64)', detail: 'Coming soon', url: null, available: false },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-white font-bold">{item.title}</div>
                        <div className="text-slate-400 text-sm">{item.detail}</div>
                      </div>
                      {item.available && item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 text-xs font-black uppercase tracking-widest hover:bg-cyan-500/30 transition-colors"
                        >
                          Download
                        </a>
                      ) : (
                        <div className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-black uppercase tracking-widest">
                          Soon
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-slate-400">
                  Prefer GitHub?{' '}
                  <a
                    href={latestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-white"
                  >
                    Open latest release
                  </a>
                  .
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-3">Need help?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-cyan-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-slate-700">
                        If Windows warns about unknown publisher, confirm you trust{' '}
                        <span className="font-semibold">github.com/{GITHUB_REPO}</span>.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-slate-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-slate-700">
                        Report issues on Discord so we can improve the beta experience.
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://github.com/network-lumen/browser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-white font-black">Follow Development</div>
                      <div className="text-slate-400 text-sm mt-1">
                        GitHub: network-lumen/browser
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 4h6m0 0v6m0-6L10 14"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 20h14a1 1 0 001-1V10"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  )
}
