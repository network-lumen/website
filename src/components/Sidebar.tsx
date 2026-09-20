import Link from 'next/link'
import { Doc } from '@/lib/markdown'

interface SidebarProps {
  docs: Doc[]
  currentSlug?: string
}

export default function Sidebar({ docs, currentSlug }: SidebarProps) {
  const categories: Record<string, Doc[]> = {}

  docs.forEach((doc) => {
    const category = doc.category || 'General'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(doc)
  })

  const nav = (
    <div className="space-y-8">
      {Object.entries(categories).map(([category, categoryDocs]) => (
        <div key={category} className="animate-fade-in">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full"></div>
            {category}
          </h3>
          <ul className="space-y-1">
            {categoryDocs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${doc.slug}`}
                  prefetch={false}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    currentSlug === doc.slug
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentSlug === doc.slug
                      ? 'bg-white'
                      : 'bg-slate-300 group-hover:bg-primary-500'
                  }`}></span>
                  <span className="flex-1 truncate">{doc.title}</span>
                  {currentSlug === doc.slug && (
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  return (
    <aside className="w-full flex-shrink-0 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white lg:w-72 lg:border-b-0 lg:border-r">
      {/* Mobile / tablet: collapsible menu */}
      <details className="group lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-sm font-bold uppercase tracking-wider text-slate-700 sm:px-6">
          <span className="flex items-center gap-2">
            <div className="h-4 w-1 rounded-full bg-gradient-to-b from-primary-500 to-primary-700"></div>
            Documentation menu
          </span>
          <svg className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <nav className="px-4 pb-6 sm:px-6">{nav}</nav>
      </details>

      {/* Desktop: sticky sidebar */}
      <nav className="sticky top-[var(--header-h)] hidden max-h-[calc(100vh-var(--header-h))] overflow-y-auto p-6 lg:block">
        {nav}
      </nav>
    </aside>
  )
}
