import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export interface DocMeta {
  slug: string
  title: string
  description?: string
  order?: number
  category?: string
}

export interface Doc extends DocMeta {
  content: string
}

export function getDocSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }
  return fs.readdirSync(docsDirectory)
}

export function getDocBySlug(slug: string): Doc {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(docsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title || realSlug,
    description: data.description,
    order: data.order,
    category: data.category,
    content,
  }
}

export function getAllDocs(): Doc[] {
  const slugs = getDocSlugs()
  const docs = slugs
    .map((slug) => getDocBySlug(slug))
    .sort((doc1, doc2) => {
      if (doc1.order && doc2.order) {
        return doc1.order - doc2.order
      }
      return doc1.title.localeCompare(doc2.title)
    })
  return docs
}

export function getDocsByCategory(): Record<string, Doc[]> {
  const docs = getAllDocs()
  const categories: Record<string, Doc[]> = {}
  
  docs.forEach((doc) => {
    const category = doc.category || 'General'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(doc)
  })
  
  return categories
}
