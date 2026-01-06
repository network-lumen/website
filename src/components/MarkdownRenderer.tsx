import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeHighlight,
        ]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-black mb-6 mt-12 text-slate-900 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-black mb-6 mt-12 text-slate-900 pb-3 border-b-2 border-gradient-to-r from-primary-500 to-accent-500" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-bold mb-4 mt-8 text-slate-900" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-bold mb-3 mt-6 text-slate-900" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-6 text-slate-700 leading-relaxed text-base" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a 
              className="text-primary-600 hover:text-primary-700 font-medium underline decoration-primary-200 hover:decoration-primary-400 transition-all"
              target={props.href?.startsWith('http') ? '_blank' : undefined}
              rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code 
                className="px-2 py-1 bg-slate-100 text-primary-700 rounded-md text-sm font-mono font-semibold border border-slate-200"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ node, ...props }) => (
            <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-2xl shadow-slate-900/50 border border-slate-800" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote 
              className="border-l-4 border-primary-500 pl-6 py-4 my-6 bg-gradient-to-r from-primary-50 to-transparent text-slate-700 italic rounded-r-xl"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-none mb-6 space-y-3 text-slate-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-6 space-y-3 text-slate-700" {...props} />
          ),
          li: ({ node, children, ...props }) => (
            <li className="flex items-start gap-3" {...props}>
              <span className="inline-flex items-center justify-center w-1.5 h-1.5 bg-primary-500 rounded-full mt-2.5 flex-shrink-0"></span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 shadow-lg">
              <table className="min-w-full divide-y divide-slate-200" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="bg-white divide-y divide-slate-100" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-slate-50 transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-6 py-4 text-sm text-slate-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
