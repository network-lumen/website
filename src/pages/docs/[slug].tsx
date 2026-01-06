import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '@/components/Layout'
import Sidebar from '@/components/Sidebar'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { getAllDocs, getDocBySlug, Doc } from '@/lib/markdown'

interface DocPageProps {
  doc: Doc
  allDocs: Doc[]
}

export default function DocPage({ doc, allDocs }: DocPageProps) {
  return (
    <Layout>
      <Head>
        <title>{`${doc.title} - Lumen Documentation`}</title>
        <meta name="description" content={doc.description || doc.title} />
      </Head>

      <div className="flex">
        <Sidebar docs={allDocs} currentSlug={doc.slug} />
        
        <div className="flex-1 bg-gradient-to-b from-slate-50 to-white">
          <article className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm">
              <a href="/" className="text-slate-600 hover:text-primary-600 transition-colors">Home</a>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <a href="/docs" className="text-slate-600 hover:text-primary-600 transition-colors">Documentation</a>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-900 font-medium">{doc.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              {doc.category && (
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full">
                  <span className="text-sm font-bold text-primary-700 tracking-wider uppercase">{doc.category}</span>
                </div>
              )}
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                {doc.title}
              </h1>
              {doc.description && (
                <p className="text-xl text-slate-600 leading-relaxed">{doc.description}</p>
              )}
              
              {/* Metadata */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>5 min read</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-primary-400 to-transparent rounded-full"></div>
              <div className="pl-8">
                <MarkdownRenderer content={doc.content} />
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <a
                  href="/docs"
                  className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 text-slate-600 group-hover:text-primary-600 group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium text-slate-900 group-hover:text-primary-600 transition-colors">Back to Docs</span>
                </a>
                <a
                  href="/community"
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl hover:shadow-2xl hover:shadow-primary-500/50 transition-all hover:scale-105"
                >
                  <span className="font-medium">Get Help</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = getAllDocs()
  
  return {
    paths: docs.map((doc) => ({
      params: { slug: doc.slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const doc = getDocBySlug(params?.slug as string)
  const allDocs = getAllDocs()

  return {
    props: {
      doc,
      allDocs,
    },
  }
}
