import type { MetadataRoute } from 'next'
import { locales, detailProducts } from '@/content/site' // adjust to where site.ts lives

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.yourcompany.com'

// Paths that exist once per language (no locale prefix here)
const staticPaths = ['', '/products', '/blog', '/contact']

const productPaths = detailProducts.map((p) => `/products/${p.slug}`)

function entry(path: string, priority: number): MetadataRoute.Sitemap {
  // One entry per language, each pointing to all the alternates
  const languages = Object.fromEntries([
    ...locales.map((l) => [l, `${baseUrl}/${l}${path}`]),
    ['x-default', `${baseUrl}/en${path}`],
  ])

  return locales.map((l) => ({
    url: `${baseUrl}/${l}${path}`,
    lastModified: new Date(),
    priority,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const posts = await getPosts()  // your blog data source
  // const postPaths = posts.map((p) => `/blog/${p.slug}`)

  return [
    ...staticPaths.flatMap((p) => entry(p, p === '' ? 1 : 0.7)),
    ...productPaths.flatMap((p) => entry(p, 0.8)),
    // ...postPaths.flatMap((p) => entry(p, 0.6)),
  ]
}