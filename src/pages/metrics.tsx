import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '@/components/Layout'

const REST_PROVIDERS = [
  { name: 'Cosmos Directory', url: 'https://rest.cosmos.directory/lumen' },
  { name: 'ChainTools', url: 'https://api.lumen.chaintools.tech' },
  { name: 'Node9x', url: 'https://lumen-api.node9x.com' },
  { name: 'MekongLabs', url: 'https://lumen-mainnet-api.mekonglabs.com' },
]

const GITHUB_REPOS = [
  'network-lumen/blockchain',
  'network-lumen/browser',
  'network-lumen/integrations',
  'network-lumen/gateway-agent',
  'network-lumen/validator-kit',
]

const VALIDATOR_OPERATOR = 'lmnvaloper1rx9rkupw6j9rtvktx5dwpgxvzmwun680fjpct4'
const VALIDATOR_ACCOUNT = 'lmn1rx9rkupw6j9rtvktx5dwpgxvzmwun6805qgezt'
const FETCH_TIMEOUT_MS = 5500

type NetworkMetrics = {
  blockHeight: number
  activeValidators: number
  totalSupply: number
  source: string
}

type ValidatorMetrics = {
  status: string
  tokens: number
  commission: number
  source: string
}

type GatewayStatus = {
  name: string
  url: string
  online: boolean
  height?: number
  latencyMs?: number
}

type GithubMetrics = {
  stars: number
  repos: number
}

type DashboardState = {
  network: NetworkMetrics | null
  validator: ValidatorMetrics | null
  gateways: GatewayStatus[]
  github: GithubMetrics | null
  loading: boolean
  updatedAt: string | null
}

const initialState: DashboardState = {
  network: null,
  validator: null,
  gateways: [],
  github: null,
  loading: true,
  updatedAt: null,
}

function timeoutSignal() {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  return { signal: controller.signal, clear: () => window.clearTimeout(timer) }
}

async function fetchJson<T>(url: string): Promise<T> {
  const timeout = timeoutSignal()

  try {
    const response = await fetch(url, {
      signal: timeout.signal,
      headers: { accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    return (await response.json()) as T
  } finally {
    timeout.clear()
  }
}

async function fetchFromAnyRest<T>(path: string): Promise<{ data: T; source: string }> {
  let lastError: unknown = null

  for (const provider of REST_PROVIDERS) {
    try {
      const data = await fetchJson<T>(`${provider.url}${path}`)
      return { data, source: provider.name }
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('No REST provider responded')
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value)
}

function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPercent(value: number) {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value * 100)}%`
}

function formatStatus(status: string) {
  return status.replace('BOND_STATUS_', '').toLowerCase()
}

function MetricCard({
  label,
  value,
  detail,
  live = false,
  accent = 'cyan',
}: {
  label: string
  value: string
  detail: string
  live?: boolean
  accent?: 'cyan' | 'emerald' | 'amber' | 'violet' | 'slate'
}) {
  const accentClasses = {
    amber: 'text-amber-200 border-amber-300/30 bg-amber-300/10',
    cyan: 'text-cyan-200 border-cyan-300/30 bg-cyan-300/10',
    emerald: 'text-emerald-200 border-emerald-300/30 bg-emerald-300/10',
    slate: 'text-slate-200 border-white/10 bg-white/[0.04]',
    violet: 'text-violet-200 border-violet-300/30 bg-violet-300/10',
  }[accent]

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</div>
        <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${accentClasses}`}>
          {live ? 'Live' : 'Manual'}
        </span>
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">{value}</div>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-400">{detail}</p>
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

export default function Metrics() {
  const [state, setState] = useState<DashboardState>(initialState)

  useEffect(() => {
    let cancelled = false

    async function loadMetrics() {
      const [latestBlock, validators, supply, validator, gateways, githubRepos] = await Promise.allSettled([
        fetchFromAnyRest<{ block: { header: { height: string } } }>('/cosmos/base/tendermint/v1beta1/blocks/latest'),
        fetchFromAnyRest<{ validators: unknown[] }>('/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200'),
        fetchFromAnyRest<{ amount: { amount: string } }>('/cosmos/bank/v1beta1/supply/by_denom?denom=ulmn'),
        fetchFromAnyRest<{ validator: { status: string; tokens: string; commission: { commission_rates: { rate: string } } } }>(
          `/cosmos/staking/v1beta1/validators/${VALIDATOR_OPERATOR}`,
        ),
        Promise.all(
          REST_PROVIDERS.map(async (provider) => {
            const startedAt = performance.now()

            try {
              const data = await fetchJson<{ block: { header: { height: string } } }>(
                `${provider.url}/cosmos/base/tendermint/v1beta1/blocks/latest`,
              )

              return {
                name: provider.name,
                url: provider.url,
                online: true,
                height: Number(data.block.header.height),
                latencyMs: Math.round(performance.now() - startedAt),
              }
            } catch {
              return {
                name: provider.name,
                url: provider.url,
                online: false,
                latencyMs: Math.round(performance.now() - startedAt),
              }
            }
          }),
        ),
        Promise.allSettled(
          GITHUB_REPOS.map((repo) =>
            fetchJson<{ stargazers_count: number }>(`https://api.github.com/repos/${repo}`),
          ),
        ),
      ])

      if (cancelled) return

      const blockResult = latestBlock.status === 'fulfilled' ? latestBlock.value : null
      const validatorsResult = validators.status === 'fulfilled' ? validators.value : null
      const supplyResult = supply.status === 'fulfilled' ? supply.value : null
      const validatorResult = validator.status === 'fulfilled' ? validator.value : null
      const gatewayResult = gateways.status === 'fulfilled' ? gateways.value : []
      const githubResult = githubRepos.status === 'fulfilled' ? githubRepos.value : []
      const githubSuccesses = githubResult.filter((result) => result.status === 'fulfilled')

      setState({
        network:
          blockResult && validatorsResult && supplyResult
            ? {
                blockHeight: Number(blockResult.data.block.header.height),
                activeValidators: validatorsResult.data.validators.length,
                totalSupply: Number(supplyResult.data.amount.amount) / 1_000_000,
                source: blockResult.source,
              }
            : null,
        validator: validatorResult
          ? {
              status: validatorResult.data.validator.status,
              tokens: Number(validatorResult.data.validator.tokens) / 1_000_000,
              commission: Number(validatorResult.data.validator.commission.commission_rates.rate),
              source: validatorResult.source,
            }
          : null,
        gateways: gatewayResult,
        github:
          githubSuccesses.length > 0
            ? {
                repos: githubSuccesses.length,
                stars: githubSuccesses.reduce((total, result) => {
                  if (result.status !== 'fulfilled') return total
                  return total + result.value.stargazers_count
                }, 0),
              }
            : null,
        loading: false,
        updatedAt: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      })
    }

    loadMetrics().catch(() => {
      if (!cancelled) {
        setState((current) => ({ ...current, loading: false, updatedAt: new Date().toLocaleString('en-US') }))
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const onlineGateways = useMemo(
    () => state.gateways.filter((gateway) => gateway.online).length,
    [state.gateways],
  )

  return (
    <Layout>
      <Head>
        <title>Metrics Dashboard - Lumen Network</title>
        <meta
          name="description"
          content="Live and manual Lumen Network metrics for blocks, validators, public gateways, GitHub activity, product traction and validator profile."
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
                  <span className={`h-2 w-2 rounded-full ${state.loading ? 'bg-amber-300' : 'bg-emerald-300'}`} />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                    Metrics Dashboard
                  </span>
                </div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Lumen traction, live network health and investor-grade signals.
                </h1>
                <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-300">
                  Live data is pulled from public Lumen REST providers and GitHub. Product and market metrics are labeled manually when there is no reliable public feed yet.
                </p>
              </div>

              <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">Last updated</div>
                <div className="mt-2 text-lg font-black text-white">{state.updatedAt ?? 'Loading...'}</div>
                <div className="mt-4 text-xs font-bold text-slate-500">Primary source: public REST fallback</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionTitle
            eyebrow="Live Network Metrics"
            title="Chain and infrastructure health"
            body="These values update in the browser from public endpoints. If one provider is down, the dashboard keeps trying the next one."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Blocks produced"
              value={state.network ? formatCompact(state.network.blockHeight) : state.loading ? 'Loading' : 'Unavailable'}
              detail={state.network ? `Height ${formatNumber(state.network.blockHeight)} via ${state.network.source}.` : 'Public REST providers did not respond.'}
              live
              accent="cyan"
            />
            <MetricCard
              label="Active validators"
              value={state.network ? `${state.network.activeValidators}` : state.loading ? 'Loading' : 'Unavailable'}
              detail="Bonded validators currently securing the Lumen chain."
              live
              accent="emerald"
            />
            <MetricCard
              label="Public gateways"
              value={state.gateways.length > 0 ? `${onlineGateways}/${state.gateways.length}` : state.loading ? 'Loading' : 'Unavailable'}
              detail="REST gateway endpoints responding to latest block checks."
              live
              accent="amber"
            />
            <MetricCard
              label="GitHub stars"
              value={state.github ? `${state.github.stars}` : state.loading ? 'Loading' : 'Unavailable'}
              detail={state.github ? `Aggregated across ${state.github.repos} public repositories.` : 'GitHub API did not respond.'}
              live
              accent="violet"
            />
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <SectionTitle
                eyebrow="Validator Profile"
                title="Validator-3 profile"
                body="Your validator is shown as a first-class operating signal: bonded status, real stake and commission pulled from chain state."
              />
              <div className="rounded-md border border-white/10 bg-[#0d111b] p-5">
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">Operator address</div>
                <div className="mt-3 break-all font-mono text-sm font-bold text-cyan-200">{VALIDATOR_OPERATOR}</div>
                <div className="mt-5 text-xs font-black uppercase tracking-widest text-slate-500">Account address</div>
                <div className="mt-3 break-all font-mono text-sm font-bold text-slate-300">{VALIDATOR_ACCOUNT}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:self-end">
              <MetricCard
                label="Status"
                value={state.validator ? formatStatus(state.validator.status) : state.loading ? 'Loading' : 'Unavailable'}
                detail={state.validator ? `Live from ${state.validator.source}.` : 'Validator endpoint did not respond.'}
                live
                accent="emerald"
              />
              <MetricCard
                label="Bonded tokens"
                value={state.validator ? `${formatNumber(state.validator.tokens, 2)} LMN` : state.loading ? 'Loading' : 'Unavailable'}
                detail="Validator stake currently bonded on-chain."
                live
                accent="cyan"
              />
              <MetricCard
                label="Commission"
                value={state.validator ? formatPercent(state.validator.commission) : state.loading ? 'Loading' : 'Unavailable'}
                detail="Current validator commission rate."
                live
                accent="amber"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionTitle
            eyebrow="Product & Market Signals"
            title="Clear labels for non-public metrics"
            body="Not every investor metric should be faked as live. DAU and DEX liquidity stay manual until there is a trusted analytics or DEX feed."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Browser DAU"
              value="Private beta"
              detail="No public DAU analytics feed is connected yet."
              accent="slate"
            />
            <MetricCard
              label="LMN DEX TVL"
              value="Feed pending"
              detail="Waiting for a reliable public LMN pool source before displaying TVL."
              accent="slate"
            />
            <MetricCard
              label="LMN DEX volume"
              value="Feed pending"
              detail="24h volume should be wired only after the target DEX/pair is confirmed."
              accent="slate"
            />
            <MetricCard
              label="Product status"
              value="Browser beta"
              detail="Native browser, wallet flow, gasless chain and PQC direction are active product signals."
              accent="emerald"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Gateway Health</div>
                  <h3 className="mt-2 text-2xl font-black text-white">Public REST providers</h3>
                </div>
                <div className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-sm font-black text-emerald-200">
                  {onlineGateways} online
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {REST_PROVIDERS.map((provider) => {
                  const status = state.gateways.find((gateway) => gateway.name === provider.name)

                  return (
                    <div key={provider.name} className="rounded-md border border-white/10 bg-[#0d111b] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-black text-white">{provider.name}</div>
                        <span className={`h-2.5 w-2.5 rounded-full ${status?.online ? 'bg-emerald-300' : 'bg-rose-300'}`} />
                      </div>
                      <div className="mt-3 break-all font-mono text-xs font-semibold text-slate-500">{provider.url}</div>
                      <div className="mt-4 text-sm font-bold text-slate-300">
                        {status?.online
                          ? `Height ${formatNumber(status.height ?? 0)} - ${status.latencyMs}ms`
                          : state.loading
                            ? 'Checking...'
                            : 'No response'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-[#0d111b] p-5">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">Data policy</div>
              <h3 className="mt-2 text-2xl font-black text-white">Live where verifiable. Manual where honest.</h3>
              <div className="mt-6 space-y-4">
                {[
                  ['Live', 'Blocks, validators, supply, gateway health, validator profile and GitHub stars.'],
                  ['Manual', 'Browser DAU, DEX TVL and DEX volume until analytics and market feeds are confirmed.'],
                  ['Next', 'Wire DAU from product telemetry and DEX metrics from the confirmed LMN pool.'],
                ].map(([label, body]) => (
                  <div key={label} className="grid grid-cols-[72px_1fr] gap-4 border-t border-white/10 pt-4">
                    <div className="text-sm font-black text-cyan-200">{label}</div>
                    <div className="text-sm font-semibold leading-relaxed text-slate-400">{body}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold leading-relaxed text-cyan-100">
                Total supply is live right now: {state.network ? `${formatNumber(state.network.totalSupply, 2)} LMN` : state.loading ? 'loading...' : 'unavailable'}.
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
