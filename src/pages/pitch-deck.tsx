import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

type VisualType =
  | 'cover'
  | 'traction'
  | 'problem'
  | 'stack'
  | 'moats'
  | 'token'
  | 'roadmap'
  | 'market'
  | 'governance'
  | 'ask'
  | 'thanks'

type DeckSlide = {
  number: string
  eyebrow: string
  title: string
  takeaway: string
  bullets: string[]
  visual: VisualType
  accent: string
}

const slides: DeckSlide[] = [
  {
    number: '01',
    eyebrow: 'Cover / Hook',
    title: 'The browser layer for a decentralized internet',
    takeaway: 'LumenStack turns decentralized infrastructure into a product people can actually open.',
    bullets: [
      'Native browser, wallet, gateway network and Cosmos chain in one stack',
      'Built for censorship-resistant access and verifiable content',
      'Designed for mainstream crypto UX, not protocol-only adoption',
    ],
    visual: 'cover',
    accent: 'cyan',
  },
  {
    number: '02',
    eyebrow: 'Current Traction',
    title: 'Execution is already visible on-chain and in product',
    takeaway: 'The network is live, validators are operating, and the browser beta creates a real distribution wedge.',
    bullets: [
      '2.5M+ blocks produced',
      '40+ validators securing the network',
      'Founder voting power ~15%',
      'Native browser beta shipped',
      'Public GitHub ecosystem across browser, blockchain, SDK and gateways',
    ],
    visual: 'traction',
    accent: 'emerald',
  },
  {
    number: '03',
    eyebrow: 'The Problem',
    title: 'Web3 still enters through Web2 choke points',
    takeaway: 'The protocols may be decentralized, but the user journey is still controlled by centralized doors.',
    bullets: [
      'Web still depends on centralized DNS, browsers, hosting and app stores',
      'Decentralized apps route back through centralized gateways',
      'Crypto UX is still too technical for mainstream users',
      'Infrastructure is fragmented across tools users never asked for',
    ],
    visual: 'problem',
    accent: 'rose',
  },
  {
    number: '04',
    eyebrow: 'The Solution - Full Stack',
    title: 'Lumen owns the full access path',
    takeaway: 'The product is the stack: browser, wallet, gateways and chain reinforce each other.',
    bullets: [
      'Native browser for decentralized web access',
      'IPFS gateway network for content availability',
      'Cosmos-SDK blockchain for settlement, domains, governance',
      'Embedded wallet and gasless flows reduce onboarding friction',
    ],
    visual: 'stack',
    accent: 'sky',
  },
  {
    number: '05',
    eyebrow: 'Technology Differentiators',
    title: 'A moat built across every layer of the user path',
    takeaway: 'Lumen is hard to copy because the edge is architectural, not a single feature.',
    bullets: [
      'Post-quantum-ready dual-signing for future-proof security',
      'Gasless transaction flows for Web2-level onboarding',
      'Native browser distribution instead of extension-only UX',
      'IPFS gateway agents tied to network incentives',
      'On-chain verification for domains, routing and integrity',
    ],
    visual: 'moats',
    accent: 'amber',
  },
  {
    number: '06',
    eyebrow: 'Tokenomics & Utility $LMN',
    title: '$LMN is the coordination asset for decentralized access',
    takeaway: 'The token has utility where the network has work: security, gateways, domains and governance.',
    bullets: [
      'Secures the chain through validator staking',
      'Coordinates gateway incentives and content availability',
      'Powers domains, routing parameters and network governance',
      'Steers emissions, fees, grants and protocol priorities',
    ],
    visual: 'token',
    accent: 'violet',
  },
  {
    number: '07',
    eyebrow: 'Roadmap 2026',
    title: '2026 converts infrastructure into distribution',
    takeaway: 'The next phase is product polish, gateway scale, developer adoption and market access.',
    bullets: [
      'Q1: Harden browser beta, wallet UX and release pipeline',
      'Q2: Expand gateway operators and reliability metrics',
      'Q3: Ship developer tooling, SDKs and domain workflows',
      'Q4: Drive ecosystem growth and exchange readiness',
    ],
    visual: 'roadmap',
    accent: 'cyan',
  },
  {
    number: '08',
    eyebrow: 'Market & Opportunity',
    title: 'Every decentralized network needs an access layer',
    takeaway: 'Lumen is the user-facing gateway into Web3 infrastructure.',
    bullets: [
      'Web3 access is still fragmented',
      'DePIN and storage need distribution',
      'Wallet UX needs native context',
    ],
    visual: 'market',
    accent: 'emerald',
  },
  {
    number: '09',
    eyebrow: 'Governance & Team',
    title: 'Lean execution with a credible decentralization path',
    takeaway: 'The founder retains focus, while the validator base keeps the network from being a single-operator project.',
    bullets: [
      'Founder voting power ~15%',
      '40+ validators, already decentralized',
      'Engineering-led execution across browser, chain and gateways',
      'Open community for validators, builders and early users',
    ],
    visual: 'governance',
    accent: 'sky',
  },
  {
    number: '10',
    eyebrow: 'The Ask',
    title: 'Raising $200k-$500k to turn beta into momentum',
    takeaway: 'Capital goes directly into the product and distribution bottlenecks that unlock the next stage.',
    bullets: [
      'Use of funds: browser dev, security, infrastructure, marketing',
      'Priorities: product polish, gateway growth and strategic partnerships',
      'Goal: stronger traction, clearer metrics and broader market access',
    ],
    visual: 'ask',
    accent: 'amber',
  },
  {
    number: '11',
    eyebrow: 'Thank You',
    title: 'Invest in the access layer of the decentralized internet',
    takeaway: 'Lumen is building the browser-native path into Web3 infrastructure.',
    bullets: [
      'Live chain + validators + browser beta',
      'Full-stack infrastructure roadmap',
      'Seeking aligned crypto, infrastructure and DePIN investors',
    ],
    visual: 'thanks',
    accent: 'cyan',
  },
]

const accentStyles: Record<string, { text: string; bg: string; border: string; soft: string }> = {
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-400',
    border: 'border-amber-300/40',
    soft: 'bg-amber-300/10',
  },
  cyan: {
    text: 'text-cyan-300',
    bg: 'bg-cyan-400',
    border: 'border-cyan-300/40',
    soft: 'bg-cyan-300/10',
  },
  emerald: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-400',
    border: 'border-emerald-300/40',
    soft: 'bg-emerald-300/10',
  },
  rose: {
    text: 'text-rose-300',
    bg: 'bg-rose-400',
    border: 'border-rose-300/40',
    soft: 'bg-rose-300/10',
  },
  sky: {
    text: 'text-sky-300',
    bg: 'bg-sky-400',
    border: 'border-sky-300/40',
    soft: 'bg-sky-300/10',
  },
  violet: {
    text: 'text-violet-300',
    bg: 'bg-violet-400',
    border: 'border-violet-300/40',
    soft: 'bg-violet-300/10',
  },
}

function ShellBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-md border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/25 ${className}`}>
      {children}
    </div>
  )
}

function Node({
  label,
  detail,
  accent = 'cyan',
  centered = false,
}: {
  label: string
  detail?: string
  accent?: string
  centered?: boolean
}) {
  const styles = accentStyles[accent]

  return (
    <div className={`rounded-md border ${styles.border} ${styles.soft} px-4 py-3 ${centered ? 'text-center' : ''}`}>
      <div className={`text-sm font-black ${styles.text}`}>{label}</div>
      {detail ? <div className="mt-1 text-xs font-semibold text-slate-400">{detail}</div> : null}
    </div>
  )
}

function Arrow() {
  return <div className="h-px flex-1 bg-white/20" />
}

function CoverVisual() {
  const nodes = [
    { label: 'Native Browser', x: 'left-6 top-8', accent: 'cyan' },
    { label: 'Wallet UX', x: 'right-6 top-10', accent: 'emerald' },
    { label: 'IPFS Gateways', x: 'left-10 bottom-12', accent: 'amber' },
    { label: 'Lumen Chain', x: 'right-8 bottom-10', accent: 'violet' },
  ]

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-md border border-white/10 bg-slate-950">
      <div className="absolute inset-6 rounded-md border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-md border border-cyan-300/40 bg-cyan-300/10 p-4 text-center shadow-2xl shadow-cyan-500/10">
        <img src="/logo.png" alt="Lumen Network" className="mx-auto h-14 w-14 rounded-full object-contain" />
        <div className="mt-3 text-sm font-black text-white">LumenStack</div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200">Access Layer</div>
      </div>
      <svg className="absolute inset-0 h-full w-full text-white/20" viewBox="0 0 500 340" fill="none">
        <path d="M95 70L250 170L405 76M102 270L250 170L400 268M95 70L102 270M405 76L400 268" stroke="currentColor" strokeWidth="2" />
      </svg>
      {nodes.map((node) => (
        <div key={node.label} className={`absolute ${node.x}`}>
          <Node label={node.label} accent={node.accent} />
        </div>
      ))}
    </div>
  )
}

function TractionVisual() {
  const metrics = [
    ['2.5M+', 'blocks'],
    ['40+', 'validators'],
    ['~15%', 'founder VP'],
    ['Beta', 'browser'],
  ]

  return (
    <div className="grid h-full min-h-[320px] grid-rows-[1fr_auto] gap-4">
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(([value, label], index) => (
          <ShellBox key={label} className="p-5">
            <div className={index === 1 ? 'text-4xl font-black text-emerald-300' : 'text-4xl font-black text-white'}>
              {value}
            </div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest text-slate-400">{label}</div>
          </ShellBox>
        ))}
      </div>
      <ShellBox className="p-4">
        <div className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">Progression</div>
        <div className="flex items-center gap-2">
          {['Chain live', 'Validators', 'GitHub stack', 'Browser beta'].map((item, index) => (
            <div key={item} className="flex flex-1 items-center gap-2">
              <div className="min-w-0 flex-1 rounded-md bg-slate-800 px-3 py-2 text-center text-xs font-black text-slate-200">
                {item}
              </div>
              {index < 3 ? <Arrow /> : null}
            </div>
          ))}
        </div>
      </ShellBox>
    </div>
  )
}

function ProblemVisual() {
  return (
    <div className="flex h-full min-h-[320px] flex-col justify-center gap-4">
      {[
        ['User', 'Default browser'],
        ['dApp', 'Centralized gateway'],
        ['Content', 'Hosting / app store'],
        ['Identity', 'DNS dependency'],
      ].map(([left, right]) => (
        <div key={left} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <Node label={left} accent="rose" />
          <div className="h-px w-12 bg-rose-300/40" />
          <Node label={right} detail="choke point" accent="rose" />
        </div>
      ))}
    </div>
  )
}

function StackVisual() {
  return (
    <ShellBox className="flex h-full min-h-[320px] flex-col items-center justify-center p-5">
      <div className="grid w-full max-w-md grid-cols-1 gap-3">
        {[
          ['User', 'opens one product'],
          ['Native Browser', 'wallet + Lumen URLs'],
          ['Gateway Network', 'content availability'],
          ['Lumen Chain', 'domains + incentives'],
          ['IPFS Content', 'verifiable storage'],
        ].map(([label, detail], index) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-full">
              <Node label={label} detail={detail} accent={index % 2 === 0 ? 'sky' : 'cyan'} centered />
            </div>
            {index < 4 ? <div className="text-xl font-black text-slate-500">↓</div> : null}
          </div>
        ))}
      </div>
    </ShellBox>
  )
}

function MoatsVisual() {
  const moats = [
    ['PQC', 'future-proof signing'],
    ['Gasless', 'consumer onboarding'],
    ['Browser', 'owned distribution'],
    ['Gateways', 'incentivized access'],
    ['On-chain', 'verified routing'],
  ]

  return (
    <div className="grid h-full min-h-[320px] grid-cols-2 gap-3">
      {moats.map(([label, detail], index) => (
        <ShellBox key={label} className={index === 4 ? 'col-span-2 p-5' : 'p-5'}>
          <div className="text-lg font-black text-amber-300">{label}</div>
          <div className="mt-2 text-sm font-semibold text-slate-300">{detail}</div>
        </ShellBox>
      ))}
    </div>
  )
}

function TokenVisual() {
  return (
    <div className="relative h-full min-h-[320px] rounded-md border border-white/10 bg-slate-950 p-6">
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-violet-200/70 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.35),rgba(167,139,250,0.22)_34%,rgba(15,23,42,0.96)_72%)] text-base font-black text-white shadow-2xl shadow-violet-500/30 ring-8 ring-violet-300/10">
        $LMN
      </div>
      <div className="grid h-full grid-cols-2 gap-4">
        <Node label="Validators" detail="staking + security" accent="violet" />
        <Node label="Gateways" detail="availability incentives" accent="emerald" />
        <Node label="Domains" detail="names + routing parameters" accent="cyan" />
        <Node label="Governance" detail="emissions + grants" accent="amber" />
      </div>
    </div>
  )
}

function RoadmapVisual() {
  const quarters = [
    ['Q1', 'Product hardening', 'Browser + wallet'],
    ['Q2', 'Network expansion', 'Gateway operators'],
    ['Q3', 'Developer adoption', 'SDKs + domains'],
    ['Q4', 'Market access', 'Growth + liquidity'],
  ]

  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <div className="grid w-full max-w-lg grid-cols-1 gap-3">
        {quarters.map(([q, title, detail]) => (
          <ShellBox key={q} className="p-4">
            <div className="grid grid-cols-[56px_1fr] items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md border border-cyan-300/40 bg-cyan-300/10 text-sm font-black text-cyan-200">
                {q}
              </div>
              <div>
                <div className="text-lg font-black text-white">{title}</div>
                <div className="mt-1 text-sm font-semibold text-slate-400">{detail}</div>
              </div>
            </div>
          </ShellBox>
        ))}
      </div>
    </div>
  )
}

function MarketVisual() {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-md border border-white/10 bg-slate-950 p-6">
      <svg className="absolute inset-0 z-0 h-full w-full text-white/18" viewBox="0 0 520 340" fill="none">
        <path d="M96 58L260 170M424 58L260 170M96 282L260 170M424 282L260 170" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald-300/50 bg-[radial-gradient(circle_at_35%_25%,rgba(52,211,153,0.24),#0f172a_58%,#020617_100%)] text-center shadow-2xl shadow-emerald-500/20">
        <div>
          <div className="text-2xl font-black text-white">Lumen</div>
          <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">Access Layer</div>
        </div>
      </div>

      <div className="absolute left-8 top-8 z-10">
        <Node label="Web3 apps" accent="cyan" />
      </div>
      <div className="absolute right-8 top-8 z-10">
        <Node label="DePIN" accent="emerald" />
      </div>
      <div className="absolute bottom-8 left-8 z-10">
        <Node label="Storage" accent="amber" />
      </div>
      <div className="absolute bottom-8 right-8 z-10">
        <Node label="Wallets" accent="violet" />
      </div>
    </div>
  )
}

function GovernanceVisual() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <ShellBox className="flex min-h-[300px] w-full max-w-2xl flex-col justify-between p-6">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500">Voting power profile</div>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-400">Founder VP</div>
              <div className="mt-1 text-5xl font-black text-sky-300">~15%</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-400">Network validators</div>
              <div className="mt-1 text-5xl font-black text-white">40+</div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>Founder</span>
            <span>Distributed validator set</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[15%] bg-sky-300" />
          </div>
        </div>
      </ShellBox>
    </div>
  )
}

function AskVisual() {
  return (
    <div className="grid h-full min-h-[320px] grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1fr]">
      <ShellBox className="grid place-items-center p-6">
        <div className="relative h-48 w-48 rounded-full bg-[conic-gradient(#fbbf24_0_45%,#38bdf8_45%_70%,#34d399_70%_90%,#a78bfa_90%_100%)]">
          <div className="absolute inset-8 grid place-items-center rounded-full bg-slate-950 text-center">
            <div>
              <div className="text-2xl font-black text-white">$200k</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">to</div>
              <div className="text-2xl font-black text-white">$500k</div>
            </div>
          </div>
        </div>
      </ShellBox>
      <div className="grid gap-3">
        {[
          ['45%', 'Browser dev', 'amber'],
          ['25%', 'Security + infra', 'sky'],
          ['20%', 'Marketing + growth', 'emerald'],
          ['10%', 'Operations', 'violet'],
        ].map(([value, label, accent]) => (
          <Node key={label} label={`${value} ${label}`} accent={accent} />
        ))}
      </div>
    </div>
  )
}

function ThanksVisual() {
  return (
    <ShellBox className="grid h-full min-h-[320px] place-items-center p-8 text-center">
      <img src="/logo.png" alt="Lumen Network" className="h-24 w-24 rounded-full object-contain" />
      <div>
        <div className="mt-6 text-3xl font-black text-white">Lumen Network</div>
        <div className="mt-3 text-sm font-bold text-slate-300">The browser-native access layer for Web3 infrastructure.</div>
        <div className="mt-4 text-sm font-bold text-cyan-300">github.com/network-lumen</div>
      </div>
    </ShellBox>
  )
}

function SlideVisual({ type }: { type: VisualType }) {
  switch (type) {
    case 'cover':
      return <CoverVisual />
    case 'traction':
      return <TractionVisual />
    case 'problem':
      return <ProblemVisual />
    case 'stack':
      return <StackVisual />
    case 'moats':
      return <MoatsVisual />
    case 'token':
      return <TokenVisual />
    case 'roadmap':
      return <RoadmapVisual />
    case 'market':
      return <MarketVisual />
    case 'governance':
      return <GovernanceVisual />
    case 'ask':
      return <AskVisual />
    case 'thanks':
      return <ThanksVisual />
  }
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(slides.length - 1, index)))
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCurrentSlide((index) => Math.max(0, index - 1))
      }
      if (event.key === 'ArrowRight') {
        setCurrentSlide((index) => Math.min(slides.length - 1, index + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const current = slides[currentSlide]

  return (
    <Layout>
      <Head>
        <title>Pitch Deck - Lumen Network</title>
        <meta
          name="description"
          content="LumenStack investor pitch deck: traction, problem, full-stack solution, technology, tokenomics, roadmap, market, governance and ask."
        />
      </Head>

      <div className="pitch-deck-page bg-[#080b12] text-white">
        <section className="border-b border-white/10 bg-[#080b12]">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
                    Investor Pitch Deck
                  </span>
                </div>
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  LumenStack: the decentralized internet stack.
                </h1>
              </div>

              <div className="deck-toolbar flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/investors"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition-colors hover:border-cyan-300/60"
                >
                  Investor page
                </Link>
              </div>
            </div>

            <div className="deck-toolbar mt-8 flex gap-2 overflow-x-auto pb-2">
              {slides.map((slide, index) => (
                <a
                  key={slide.number}
                  href="#deck"
                  onClick={(event) => {
                    event.preventDefault()
                    goToSlide(index)
                  }}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-xs font-black transition-colors ${
                    index === currentSlide
                      ? 'border-cyan-300/60 bg-cyan-300/15 text-white'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40 hover:text-white'
                  }`}
                >
                  {slide.number}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="deck" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="deck-toolbar mb-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition-colors hover:border-cyan-300/50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Previous
            </button>
            <div className="text-sm font-black uppercase tracking-widest text-slate-400">
              {current.number} / {slides.length.toString().padStart(2, '0')}
            </div>
            <button
              type="button"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition-colors hover:border-cyan-300/50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Next
            </button>
          </div>

          <div className="overflow-hidden rounded-md">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => {
                const styles = accentStyles[slide.accent]

                return (
                  <article
                    key={slide.number}
                    id={`slide-${slide.number}`}
                    className="deck-slide w-full flex-none overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.08),transparent_32%),#0d111b] shadow-2xl shadow-black/30"
                  >
                    <div className="grid min-h-[640px] grid-cols-1 lg:aspect-[16/9] lg:min-h-0 lg:grid-cols-[0.92fr_1.08fr]">
                      <div className="flex flex-col justify-between border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                        <div>
                          <div className="mb-8 flex items-center justify-between gap-4">
                            <div className={`text-xs font-black uppercase tracking-[0.24em] ${styles.text}`}>
                              Slide {slide.number}
                            </div>
                            <div className={`h-2 w-16 rounded-full ${styles.bg}`} />
                          </div>

                          <div className="mb-4 text-sm font-black uppercase tracking-widest text-slate-500">
                            {slide.eyebrow}
                          </div>
                          <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {slide.title}
                          </h2>
                          <div className={`mt-6 rounded-md border ${styles.border} ${styles.soft} p-4`}>
                            <div className={`text-xs font-black uppercase tracking-widest ${styles.text}`}>
                              Investment thesis
                            </div>
                            <p className="mt-2 text-sm font-bold leading-relaxed text-slate-100">
                              {slide.takeaway}
                            </p>
                          </div>
                        </div>

                        <ul className="mt-10 space-y-4">
                          {slide.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3 text-base font-semibold leading-relaxed text-slate-200">
                              <span className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${styles.bg}`} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#090d15] p-5 sm:p-8">
                        <SlideVisual type={slide.visual} />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <style jsx global>{`
          @media print {
            header,
            footer,
            .deck-toolbar {
              display: none !important;
            }

            body {
              background: #080b12 !important;
            }

            .pitch-deck-page {
              background: #080b12 !important;
            }

            .deck-slide {
              break-after: page;
              page-break-after: always;
              border: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}
