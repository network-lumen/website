import Head from 'next/head'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import Layout from '@/components/Layout'

const REST_PROVIDERS = [
  { name: 'ChainTools', url: 'https://api.lumen.chaintools.tech' },
  { name: 'MekongLabs', url: 'https://lumen-mainnet-api.mekonglabs.com' },
  { name: 'Cosmos Directory', url: 'https://rest.cosmos.directory/lumen' },
]

const OSMOSIS_SQS = 'https://sqs.osmosis.zone'
const OSMOSIS_POOL_ID = 3416
const OSMOSIS_LMN_DENOM = 'ibc/88DBE57372690630D2DD9779C247479CE124E777C5D695FA90699F3140CEC59F'
const BEEZEE_REST = 'https://rest.getbze.com'
const BEEZEE_MARKET =
  'ibc/693DDB2D9B4260D67C8136C22D837F37488E0FBD81857D8E9C6022332EA26E33/ibc/6490A7EAB61059BFC1CDDEB05917DD70BDF3A611654162A1A47DB930D40D8AF4'
// Same-origin PHP proxy (public/api/tokpie.php): Tokpie's API sends no CORS header.
const TOKPIE_PROXY = '/api/tokpie.php'
const GITHUB_RELEASES = 'https://api.github.com/repos/network-lumen/browser/releases?per_page=100'

const LINKS = {
  tokpie: 'https://tokpie.com/view_exchange/LMN-USDT/',
  osmosis: `https://app.osmosis.zone/assets/${OSMOSIS_LMN_DENOM}`,
  beezee: `https://dex.getbze.com/exchange/market?id=${BEEZEE_MARKET}`,
  explorer: 'https://explorer.chaintools.tech/lumen',
  github: 'https://github.com/network-lumen/browser/releases',
}

const FETCH_TIMEOUT_MS = 8000
const REFRESH_MS = 60_000
const ULMN = 1_000_000
// Block-time sample used to derive daily issuance and the halving ETA.
const BLOCK_TIME_SAMPLE = 1000

// undefined = still loading, null = every source failed.
type Loadable<T> = T | null | undefined

type TokenomicsParams = {
  tx_tax_rate: string
  initial_reward_per_block_lumn: string
  halving_interval_blocks: string
  supply_cap_lumn: string
  min_send_ulmn: string
  delegate_fee_ulmn: string
  redelegate_fee_ulmn: string
  transfer_fee_ulmn: string
  set_withdraw_addr_fee_ulmn: string
}

type ChainMetrics = {
  source: string
  height: number
  blockTime: number | null
  totalSupply: number
  bonded: number
  communityPool: number
  activeValidators: number
  maxValidators: number
  unbondingDays: number
  accounts: number | null
  proposals: number | null
  params: TokenomicsParams
}

type TokpieTicker = {
  last: number | null
  change: string | null
  volumeLmn: number
  volumeUsdt: number
  high: number | null
  low: number | null
  bid: number | null
  ask: number | null
}

type OsmosisPool = { price: number; liquidityUsd: number; lmnInPool: number }
type BeezeeTrade = { price: number; executedAt: number; trades: number }

type GithubReleases = { latestTag: string; publishedAt: string; downloads: number; releases: number }

type Ecosystem = {
  gatewaysActive: number
  gatewaysTotal: number
  contractsActive: number
  contractsTotal: number
  domains: number | null
}

type ProviderStatus = { name: string; url: string; online: boolean; height?: number; latencyMs: number }

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(url, { signal: controller.signal, headers: { accept: 'application/json' } })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return (await response.json()) as T
  } finally {
    window.clearTimeout(timer)
  }
}

async function fetchFromAnyRest<T>(path: string): Promise<{ data: T; source: string }> {
  let lastError: unknown = null

  for (const provider of REST_PROVIDERS) {
    try {
      return { data: await fetchJson<T>(`${provider.url}${path}`), source: provider.name }
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('No REST provider responded')
}

async function settledValue<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise
  } catch {
    return null
  }
}

function toNumber(input: unknown): number | null {
  const n = typeof input === 'number' ? input : Number(input)
  return input === null || input === undefined || input === '' || !Number.isFinite(n) ? null : n
}

async function loadChain(): Promise<ChainMetrics> {
  const latest = await fetchFromAnyRest<{ block: { header: { height: string; time: string } } }>(
    '/cosmos/base/tendermint/v1beta1/blocks/latest',
  )
  const height = Number(latest.data.block.header.height)

  const [past, supply, pool, community, staking, validators, params, accounts, proposals] = await Promise.all([
    settledValue(
      fetchFromAnyRest<{ block: { header: { time: string } } }>(
        `/cosmos/base/tendermint/v1beta1/blocks/${height - BLOCK_TIME_SAMPLE}`,
      ),
    ),
    fetchFromAnyRest<{ amount: { amount: string } }>('/cosmos/bank/v1beta1/supply/by_denom?denom=ulmn'),
    fetchFromAnyRest<{ pool: { bonded_tokens: string } }>('/cosmos/staking/v1beta1/pool'),
    fetchFromAnyRest<{ pool: { denom: string; amount: string }[] }>('/cosmos/distribution/v1beta1/community_pool'),
    fetchFromAnyRest<{ params: { max_validators: number; unbonding_time: string } }>('/cosmos/staking/v1beta1/params'),
    fetchFromAnyRest<{ validators: unknown[] }>(
      '/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200',
    ),
    fetchFromAnyRest<{ params: TokenomicsParams }>('/lumen/tokenomics/v1/params'),
    settledValue(
      fetchFromAnyRest<{ pagination: { total: string } }>(
        '/cosmos/auth/v1beta1/accounts?pagination.limit=1&pagination.count_total=true',
      ),
    ),
    settledValue(
      fetchFromAnyRest<{ proposals: { id: string }[] }>('/cosmos/gov/v1/proposals?pagination.limit=1&pagination.reverse=true'),
    ),
  ])

  const latestTime = Date.parse(latest.data.block.header.time)
  const pastTime = past ? Date.parse(past.data.block.header.time) : NaN
  const blockTime = Number.isFinite(pastTime) ? (latestTime - pastTime) / 1000 / BLOCK_TIME_SAMPLE : null

  const communityUlmn = community.data.pool.find((coin) => coin.denom === 'ulmn')?.amount ?? '0'

  return {
    source: latest.source,
    height,
    blockTime,
    totalSupply: Number(supply.data.amount.amount) / ULMN,
    bonded: Number(pool.data.pool.bonded_tokens) / ULMN,
    communityPool: Number(communityUlmn) / ULMN,
    activeValidators: validators.data.validators.length,
    maxValidators: staking.data.params.max_validators,
    unbondingDays: Math.round(parseInt(staking.data.params.unbonding_time, 10) / 86400),
    accounts: toNumber(accounts?.data.pagination.total),
    proposals: toNumber(proposals?.data.proposals[0]?.id),
    params: params.data.params,
  }
}

async function loadTokpie(): Promise<TokpieTicker> {
  const t = await fetchJson<Record<string, unknown>>(TOKPIE_PROXY)
  if (!t || t.error) throw new Error('tokpie_unavailable')

  return {
    last: toNumber(t.last),
    change: typeof t.percentChange === 'string' ? t.percentChange : null,
    volumeLmn: toNumber(t.baseVolume) ?? 0,
    volumeUsdt: toNumber(t.quoteVolume) ?? 0,
    high: toNumber(t.high24hr),
    low: toNumber(t.low24hr),
    bid: toNumber(t.highestBid),
    ask: toNumber(t.lowestAsk),
  }
}

async function loadOsmosis(): Promise<OsmosisPool> {
  const [prices, pools] = await Promise.all([
    fetchJson<Record<string, Record<string, string>>>(`${OSMOSIS_SQS}/tokens/prices?base=${OSMOSIS_LMN_DENOM}`),
    fetchJson<{ liquidity_cap: string; balances: { denom: string; amount: string }[] }[]>(
      `${OSMOSIS_SQS}/pools?IDs=${OSMOSIS_POOL_ID}`,
    ),
  ])

  const price = toNumber(Object.values(prices[OSMOSIS_LMN_DENOM] ?? {})[0])
  if (price === null) throw new Error('osmosis_price_unavailable')

  const pool = pools[0]
  const lmnInPool = pool?.balances.find((b) => b.denom === OSMOSIS_LMN_DENOM)?.amount

  return {
    price,
    liquidityUsd: toNumber(pool?.liquidity_cap) ?? 0,
    lmnInPool: (toNumber(lmnInPool) ?? 0) / ULMN,
  }
}

async function loadBeezee(): Promise<BeezeeTrade> {
  const history = await fetchJson<{ list: { price: string; executed_at: string }[] }>(
    `${BEEZEE_REST}/bze/tradebin/market_history?market=${encodeURIComponent(BEEZEE_MARKET)}&pagination.limit=500`,
  )

  const trades = history.list ?? []
  const latest = trades.reduce<{ price: string; executed_at: string } | null>(
    (best, trade) => (!best || Number(trade.executed_at) > Number(best.executed_at) ? trade : best),
    null,
  )
  if (!latest) throw new Error('beezee_no_trades')

  return { price: Number(latest.price), executedAt: Number(latest.executed_at) * 1000, trades: trades.length }
}

async function loadGithub(): Promise<GithubReleases> {
  const releases = await fetchJson<
    { tag_name: string; published_at: string; draft: boolean; assets: { name: string; download_count: number }[] }[]
  >(GITHUB_RELEASES)

  const published = releases.filter((release) => !release.draft)
  if (published.length === 0) throw new Error('no_releases')

  // Signatures, checksums and certificates are not installs.
  const downloads = published
    .flatMap((release) => release.assets)
    .filter((asset) => !/\.(asc|txt|cer|sig|sha256)$/i.test(asset.name))
    .reduce((sum, asset) => sum + asset.download_count, 0)

  return {
    latestTag: published[0].tag_name,
    publishedAt: published[0].published_at,
    downloads,
    releases: published.length,
  }
}

async function loadEcosystem(): Promise<Ecosystem> {
  const [gateways, contracts, domains] = await Promise.all([
    fetchFromAnyRest<{ gateways: { active: boolean }[] }>('/lumen/gateway/v1/gateways?pagination.limit=1000'),
    fetchFromAnyRest<{ contracts: { status: string }[] }>('/lumen/gateway/v1/contracts?pagination.limit=5000'),
    settledValue(
      fetchFromAnyRest<{ pagination: { total: string } }>('/lumen/dns/v1/domain?pagination.limit=1&pagination.count_total=true'),
    ),
  ])

  return {
    gatewaysActive: gateways.data.gateways.filter((g) => g.active).length,
    gatewaysTotal: gateways.data.gateways.length,
    contractsActive: contracts.data.contracts.filter((c) => c.status === 'CONTRACT_STATUS_ACTIVE').length,
    contractsTotal: contracts.data.contracts.length,
    domains: toNumber(domains?.data.pagination.total),
  }
}

async function loadProviders(): Promise<ProviderStatus[]> {
  return Promise.all(
    REST_PROVIDERS.map(async (provider) => {
      const startedAt = performance.now()
      try {
        const data = await fetchJson<{ block: { header: { height: string } } }>(
          `${provider.url}/cosmos/base/tendermint/v1beta1/blocks/latest`,
        )
        return {
          ...provider,
          online: true,
          height: Number(data.block.header.height),
          latencyMs: Math.round(performance.now() - startedAt),
        }
      } catch {
        return { ...provider, online: false, latencyMs: Math.round(performance.now() - startedAt) }
      }
    }),
  )
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value)
}

function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
}

function formatPercent(ratio: number, digits = 1) {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(ratio * 100)}%`
}

function formatUsd(value: number) {
  if (value !== 0 && Math.abs(value) < 1) {
    return `$${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 4 }).format(value)}`
  }
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`
}

function formatLmn(ulmn: string | number) {
  return `${formatNumber(Number(ulmn) / ULMN, 6)} LMN`
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString('en-US', { dateStyle: 'medium' })
}

function placeholder<T>(value: Loadable<T>) {
  return value === undefined ? 'Loading' : 'Unavailable'
}

type Accent = 'cyan' | 'emerald' | 'amber' | 'violet' | 'slate'

const ACCENTS: Record<Accent, string> = {
  amber: 'text-amber-200 border-amber-300/30 bg-amber-300/10',
  cyan: 'text-cyan-200 border-cyan-300/30 bg-cyan-300/10',
  emerald: 'text-emerald-200 border-emerald-300/30 bg-emerald-300/10',
  slate: 'text-slate-200 border-white/10 bg-white/[0.04]',
  violet: 'text-violet-200 border-violet-300/30 bg-violet-300/10',
}

function MetricCard({
  label,
  value,
  detail,
  source,
  accent = 'cyan',
  children,
}: {
  label: string
  value: string
  detail?: ReactNode
  source?: string
  accent?: Accent
  children?: ReactNode
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</div>
        {source ? (
          <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${ACCENTS[accent]}`}>
            {source}
          </span>
        ) : null}
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</div>
      {children}
      {detail ? <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-400">{detail}</p> : null}
    </div>
  )
}

function ProgressBar({ ratio }: { ratio: number }) {
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
        style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%` }}
      />
    </div>
  )
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base font-medium leading-relaxed text-slate-400">{body}</p>
    </div>
  )
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline-offset-4 hover:underline">
      {children}
    </a>
  )
}

export default function Metrics() {
  const [chain, setChain] = useState<Loadable<ChainMetrics>>(undefined)
  const [tokpie, setTokpie] = useState<Loadable<TokpieTicker>>(undefined)
  const [osmosis, setOsmosis] = useState<Loadable<OsmosisPool>>(undefined)
  const [beezee, setBeezee] = useState<Loadable<BeezeeTrade>>(undefined)
  const [github, setGithub] = useState<Loadable<GithubReleases>>(undefined)
  const [ecosystem, setEcosystem] = useState<Loadable<Ecosystem>>(undefined)
  const [providers, setProviders] = useState<ProviderStatus[]>([])
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async (includeSlow: boolean) => {
    setRefreshing(true)

    // Each source fills its own section as soon as it answers. A refresh keeps the
    // previous value on failure instead of blanking a section that already loaded.
    const keep = <T,>(set: (fn: (current: Loadable<T>) => Loadable<T>) => void) => () =>
      set((current) => (current === undefined ? null : current))

    const jobs: Promise<unknown>[] = [
      loadChain().then(setChain, keep(setChain)),
      loadTokpie().then(setTokpie, keep(setTokpie)),
      loadOsmosis().then(setOsmosis, keep(setOsmosis)),
      loadBeezee().then(setBeezee, keep(setBeezee)),
      loadProviders().then(setProviders),
    ]
    if (includeSlow) {
      // Release counts and ecosystem registries move slowly; GitHub's anonymous
      // API also allows only 60 requests per hour per visitor.
      jobs.push(loadGithub().then(setGithub, keep(setGithub)))
      jobs.push(loadEcosystem().then(setEcosystem, keep(setEcosystem)))
    }

    await Promise.allSettled(jobs)
    setUpdatedAt(new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' }))
    setRefreshing(false)
  }, [])

  useEffect(() => {
    refresh(true)
    const timer = window.setInterval(() => refresh(false), REFRESH_MS)
    return () => window.clearInterval(timer)
  }, [refresh])

  // Reference price: the CEX USDT pair when it has a last trade, otherwise the Osmosis pool.
  const reference =
    tokpie?.last != null
      ? { price: tokpie.last, source: 'Tokpie' }
      : osmosis
        ? { price: osmosis.price, source: 'Osmosis' }
        : null
  // Still loading while a source that could supply the price has not answered yet.
  const referenceState: Loadable<typeof reference> =
    reference ?? (tokpie === undefined || osmosis === undefined ? undefined : null)
  const marketCapState = chain === undefined || referenceState === undefined ? undefined : null

  const params = chain?.params
  const cap = params ? Number(params.supply_cap_lumn) : null
  const halvingInterval = params ? Number(params.halving_interval_blocks) : null
  const epoch = chain && halvingInterval ? Math.floor(chain.height / halvingInterval) : null
  const blockReward = params && epoch !== null ? Number(params.initial_reward_per_block_lumn) / 2 ** epoch : null
  const nextHalvingHeight = halvingInterval && epoch !== null ? (epoch + 1) * halvingInterval : null
  const blocksToHalving = chain && nextHalvingHeight ? nextHalvingHeight - chain.height : null
  const halvingEta =
    blocksToHalving !== null && chain?.blockTime ? Date.now() + blocksToHalving * chain.blockTime * 1000 : null
  const dailyIssuance = blockReward !== null && chain?.blockTime ? (blockReward * 86400) / chain.blockTime : null

  const onlineProviders = providers.filter((p) => p.online).length

  return (
    <Layout>
      <Head>
        <title>Metrics - Lumen Network</title>
        <meta
          name="description"
          content="Live Lumen (LMN) metrics: price, market cap, supply, staking, halving, fees, validators, IPFS gateways, domains and browser downloads."
        />
      </Head>

      <div className="bg-[#080b12] text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-[#080b12]">
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
            <div className="absolute right-12 top-28 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2">
                  <span className={`h-2 w-2 rounded-full ${refreshing ? 'bg-amber-300' : 'bg-emerald-300'}`} />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-200">Live Metrics</span>
                </div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Lumen in numbers.
                </h1>
                <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-300">
                  Market, supply, staking, fees and ecosystem figures, read live from the Lumen chain, the markets
                  where LMN trades and GitHub. Nothing on this page is entered by hand.
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">Last updated</div>
                <div className="mt-2 text-lg font-black text-white">{updatedAt ?? 'Loading...'}</div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-500">Auto-refresh every 60s</span>
                  <button
                    type="button"
                    onClick={() => refresh(true)}
                    disabled={refreshing}
                    className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-200 transition-colors hover:bg-cyan-300/20 disabled:opacity-50"
                  >
                    {refreshing ? 'Refreshing' : 'Refresh'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionTitle
            eyebrow="Market"
            title="LMN price and markets"
            body="Market cap uses the total supply, since every LMN in existence is circulating. Fully diluted value uses the 63,072,000 LMN hard cap."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Price"
              value={reference ? formatUsd(reference.price) : placeholder(referenceState)}
              detail={reference ? `Last price on ${reference.source}.` : 'No market source responded.'}
              source={reference?.source}
              accent="emerald"
            />
            <MetricCard
              label="Market cap"
              value={reference && chain ? formatUsd(reference.price * chain.totalSupply) : placeholder(marketCapState)}
              detail="Price × total supply."
              source="Computed"
              accent="emerald"
            />
            <MetricCard
              label="Fully diluted value"
              value={reference && cap ? formatUsd(reference.price * cap) : placeholder(marketCapState)}
              detail="Price × max supply."
              source="Computed"
              accent="emerald"
            />
            <MetricCard
              label="24h volume"
              value={tokpie ? formatUsd(tokpie.volumeUsdt) : placeholder(tokpie)}
              detail={tokpie ? `${formatNumber(tokpie.volumeLmn)} LMN traded on Tokpie.` : 'Tokpie LMN/USDT.'}
              source="Tokpie"
              accent="emerald"
            />
          </div>

          <div className="mt-6 overflow-x-auto rounded-md border border-white/10 bg-white/[0.04]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-slate-500">
                  <th className="px-5 py-4">Market</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-semibold text-slate-300">
                <tr>
                  <td className="px-5 py-4 font-black text-white">
                    <ExternalLink href={LINKS.tokpie}>Tokpie</ExternalLink>
                  </td>
                  <td className="px-5 py-4">CEX · LMN/USDT</td>
                  <td className="px-5 py-4 text-white">{tokpie?.last != null ? formatUsd(tokpie.last) : placeholder(tokpie)}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {tokpie
                      ? [
                          tokpie.change ? `24h ${tokpie.change}` : null,
                          tokpie.high != null && tokpie.low != null
                            ? `range ${formatUsd(tokpie.low)} – ${formatUsd(tokpie.high)}`
                            : null,
                          tokpie.bid != null && tokpie.ask != null
                            ? `bid ${formatUsd(tokpie.bid)} / ask ${formatUsd(tokpie.ask)}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')
                      : '—'}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-black text-white">
                    <ExternalLink href={LINKS.osmosis}>Osmosis</ExternalLink>
                  </td>
                  <td className="px-5 py-4">DEX · pool #{OSMOSIS_POOL_ID}</td>
                  <td className="px-5 py-4 text-white">{osmosis ? formatUsd(osmosis.price) : placeholder(osmosis)}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {osmosis
                      ? `liquidity ${formatUsd(osmosis.liquidityUsd)} · ${formatNumber(osmosis.lmnInPool)} LMN in pool`
                      : '—'}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-black text-white">
                    <ExternalLink href={LINKS.beezee}>BeeZee DEX</ExternalLink>
                  </td>
                  <td className="px-5 py-4">DEX · LMN/USDC order book</td>
                  <td className="px-5 py-4 text-white">{beezee ? formatUsd(beezee.price) : placeholder(beezee)}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {beezee ? `last trade ${formatDate(beezee.executedAt)} · ${beezee.trades} trades in total` : '—'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Supply */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <SectionTitle
            eyebrow="Supply & Staking"
            title="Tokenomics, live from chain state"
            body="No pre-mine, no team or investor allocation. Apart from a 2 LMN genesis allocation, every LMN was issued as a block reward, and the cap and halving schedule are locked at genesis."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total supply"
              value={chain ? `${formatNumber(chain.totalSupply)} LMN` : placeholder(chain)}
              detail="Also the circulating supply."
              source="Chain"
            />
            <MetricCard
              label="Max supply"
              value={cap ? `${formatNumber(cap)} LMN` : placeholder(chain)}
              detail={chain && cap ? `${formatPercent(chain.totalSupply / cap, 2)} issued so far.` : 'Hard cap, genesis-locked.'}
              source="Chain"
            >
              {chain && cap ? <ProgressBar ratio={chain.totalSupply / cap} /> : null}
            </MetricCard>
            <MetricCard
              label="Staked"
              value={chain ? `${formatCompact(chain.bonded)} LMN` : placeholder(chain)}
              detail={chain ? `${formatPercent(chain.bonded / chain.totalSupply)} of supply is bonded to validators.` : undefined}
              source="Chain"
            >
              {chain ? <ProgressBar ratio={chain.bonded / chain.totalSupply} /> : null}
            </MetricCard>
            <MetricCard
              label="Community pool"
              value={chain ? `${formatNumber(chain.communityPool)} LMN` : placeholder(chain)}
              detail={
                chain
                  ? `Spent only by DAO vote. Supply excluding the pool: ${formatNumber(chain.totalSupply - chain.communityPool)} LMN.`
                  : undefined
              }
              source="Chain"
            />
            <MetricCard
              label="Block reward"
              value={blockReward !== null ? `${formatNumber(blockReward, 6)} LMN` : placeholder(chain)}
              detail="Per block, halving on a fixed block schedule."
              source="Chain"
              accent="violet"
            />
            <MetricCard
              label="Daily issuance"
              value={dailyIssuance !== null ? `${formatNumber(dailyIssuance)} LMN` : placeholder(chain)}
              detail={chain?.blockTime ? `At the measured ${chain.blockTime.toFixed(2)}s block time.` : undefined}
              source="Computed"
              accent="violet"
            />
            <MetricCard
              label="Next halving"
              value={halvingEta ? formatDate(halvingEta) : placeholder(chain)}
              detail={
                nextHalvingHeight && blocksToHalving !== null
                  ? `At block ${formatNumber(nextHalvingHeight)}, ${formatNumber(blocksToHalving)} blocks from now. Estimated from the current block time.`
                  : undefined
              }
              source="Computed"
              accent="violet"
            />
            <MetricCard
              label="Halving interval"
              value={halvingInterval ? `${formatCompact(halvingInterval)} blocks` : placeholder(chain)}
              detail={
                halvingInterval && chain?.blockTime
                  ? `About ${formatNumber((halvingInterval * chain.blockTime) / 31_557_600, 1)} years per epoch.`
                  : undefined
              }
              source="Chain"
              accent="violet"
            />
          </div>
        </section>

        {/* Network */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <SectionTitle
            eyebrow="Network"
            title="Chain activity and governance"
            body="CometBFT proof of stake, governed on-chain by validators and their delegators."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Block height"
              value={chain ? formatNumber(chain.height) : placeholder(chain)}
              detail={chain ? `Read via ${chain.source}.` : undefined}
              source="Chain"
            />
            <MetricCard
              label="Block time"
              value={chain?.blockTime ? `${chain.blockTime.toFixed(2)}s` : placeholder(chain)}
              detail={`Average over the last ${formatNumber(BLOCK_TIME_SAMPLE)} blocks.`}
              source="Computed"
            />
            <MetricCard
              label="Active validators"
              value={chain ? `${chain.activeValidators} / ${chain.maxValidators}` : placeholder(chain)}
              detail={chain ? `Unbonding period: ${chain.unbondingDays} days.` : undefined}
              source="Chain"
              accent="emerald"
            />
            <MetricCard
              label="Accounts"
              value={chain?.accounts != null ? formatNumber(chain.accounts) : placeholder(chain && chain.accounts)}
              detail="Addresses with on-chain state."
              source="Chain"
              accent="emerald"
            />
            <MetricCard
              label="Governance proposals"
              value={chain?.proposals != null ? formatNumber(chain.proposals) : placeholder(chain && chain.proposals)}
              detail="Submitted since genesis. 67% quorum, 75% threshold to pass."
              source="Chain"
              accent="amber"
            />
          </div>
        </section>

        {/* Fees */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <SectionTitle
            eyebrow="Fees"
            title="No gas, small fixed fees"
            body="Transactions carry a zero gas fee. Spam is priced with flat per-message fees, paid to the community pool and set by DAO vote."
          />

          <div className="overflow-x-auto rounded-md border border-white/10 bg-white/[0.04]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-slate-500">
                  <th className="px-5 py-4">Fee</th>
                  <th className="px-5 py-4">Current value</th>
                  <th className="px-5 py-4">Applies to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-semibold text-slate-300">
                {(
                  [
                    ['Transfer fee', params?.transfer_fee_ulmn, 'Each send, multi-send output and IBC transfer'],
                    ['Delegate fee', params?.delegate_fee_ulmn, 'Staking LMN to a validator'],
                    ['Redelegate fee', params?.redelegate_fee_ulmn, 'Moving stake between validators'],
                    ['Withdraw address fee', params?.set_withdraw_addr_fee_ulmn, 'Setting a rewards withdraw address'],
                    ['Minimum transfer', params?.min_send_ulmn, 'Smallest amount a transfer may carry'],
                  ] as [string, string | undefined, string][]
                ).map(([name, ulmn, appliesTo]) => (
                  <tr key={name}>
                    <td className="px-5 py-4 font-black text-white">{name}</td>
                    <td className="px-5 py-4 text-cyan-200">{ulmn !== undefined ? formatLmn(ulmn) : placeholder(chain)}</td>
                    <td className="px-5 py-4 text-slate-400">{appliesTo}</td>
                  </tr>
                ))}
                <tr>
                  <td className="px-5 py-4 font-black text-white">Transfer tax</td>
                  <td className="px-5 py-4 text-cyan-200">
                    {params ? formatPercent(Number(params.tx_tax_rate), 2) : placeholder(chain)}
                  </td>
                  <td className="px-5 py-4 text-slate-400">Percentage of the amount sent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ecosystem */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <SectionTitle
            eyebrow="Ecosystem"
            title="Gateways, domains and the browser"
            body="Usage of the Lumen stack: IPFS gateways and storage contracts registered on-chain, .lmn domains, and Lumen Browser downloads from GitHub releases."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="IPFS gateways"
              value={ecosystem ? `${ecosystem.gatewaysActive} active` : placeholder(ecosystem)}
              detail={ecosystem ? `${ecosystem.gatewaysTotal} registered on-chain.` : undefined}
              source="Chain"
              accent="amber"
            />
            <MetricCard
              label="Storage contracts"
              value={ecosystem ? `${ecosystem.contractsActive} active` : placeholder(ecosystem)}
              detail={ecosystem ? `${ecosystem.contractsTotal} signed with gateways since launch.` : undefined}
              source="Chain"
              accent="amber"
            />
            <MetricCard
              label="Domains"
              value={ecosystem?.domains != null ? formatNumber(ecosystem.domains) : placeholder(ecosystem && ecosystem.domains)}
              detail="Names registered on Lumen DNS."
              source="Chain"
              accent="amber"
            />
            <MetricCard
              label="Browser downloads"
              value={github ? formatNumber(github.downloads) : placeholder(github)}
              detail={
                github ? (
                  <>
                    Across {github.releases} releases. Latest:{' '}
                    <ExternalLink href={LINKS.github}>{github.latestTag}</ExternalLink> ({formatDate(Date.parse(github.publishedAt))}).
                  </>
                ) : undefined
              }
              source="GitHub"
              accent="amber"
            />
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Infrastructure</div>
                  <h3 className="mt-2 text-2xl font-black text-white">Public REST endpoints</h3>
                </div>
                <div className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm font-black text-emerald-200">
                  {providers.length ? `${onlineProviders}/${providers.length} online` : 'Checking'}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {REST_PROVIDERS.map((provider) => {
                  const status = providers.find((p) => p.name === provider.name)

                  return (
                    <div key={provider.name} className="rounded-md border border-white/10 bg-[#0d111b] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-black text-white">{provider.name}</div>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${status ? (status.online ? 'bg-emerald-300' : 'bg-rose-300') : 'bg-amber-300'}`}
                        />
                      </div>
                      <div className="mt-3 break-all font-mono text-xs font-semibold text-slate-500">{provider.url}</div>
                      <div className="mt-4 text-sm font-bold text-slate-300">
                        {status
                          ? status.online
                            ? `Height ${formatNumber(status.height ?? 0)} · ${status.latencyMs}ms`
                            : 'No response'
                          : 'Checking...'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-[#0d111b] p-5">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">Data sources</div>
              <h3 className="mt-2 text-2xl font-black text-white">Everything is verifiable</h3>
              <div className="mt-6 space-y-4">
                {(
                  [
                    ['Chain', 'Lumen REST API, with fallback across the providers on the left.'],
                    ['Tokpie', 'Public LMN/USDT ticker.'],
                    ['Osmosis', `Osmosis SQS: LMN price and pool #${OSMOSIS_POOL_ID} liquidity.`],
                    ['BeeZee', 'BeeZee chain REST: LMN/USDC trade history.'],
                    ['GitHub', 'network-lumen/browser release download counts.'],
                    ['Computed', 'Derived from the values above; formula shown on each card.'],
                  ] as [string, string][]
                ).map(([label, body]) => (
                  <div key={label} className="grid grid-cols-[88px_1fr] gap-4 border-t border-white/10 pt-4">
                    <div className="text-sm font-black text-cyan-200">{label}</div>
                    <div className="text-sm font-semibold leading-relaxed text-slate-400">{body}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold leading-relaxed text-cyan-100">
                Listing LMN? Integration details and supply endpoints are on the{' '}
                <a href="/docs/trackers/" className="underline">
                  Trackers &amp; Listings
                </a>{' '}
                page. Browse the chain on the <ExternalLink href={LINKS.explorer}>explorer</ExternalLink>.
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
