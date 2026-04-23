import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sitemapPath = resolve(__dirname, '..', 'static', 'sitemap.xml')
const today = new Date().toISOString().split('T')[0]

const xml = readFileSync(sitemapPath, 'utf-8')
const updated = xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`)
writeFileSync(sitemapPath, updated)

console.log(`sitemap.xml: updated lastmod to ${today}`)
