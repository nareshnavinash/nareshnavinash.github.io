import { describe, it, expect } from 'vitest'
import {
    adaptResume,
    formatMonthYear,
    escapeHtml,
    renderCareerHtml,
    renderLeadershipHtml,
    renderLeadershipProgressHtml,
    renderReposHtml,
    renderWritingHtml,
    renderCertsHtml,
    renderSkillsTerminalHtml,
    renderSkillsTerminalLines,
} from '../js/profile-render.js'

const fixture = {
    personal: { name: 'Naresh Sekar', firstName: 'Naresh' },
    site: { hero: { greetingPrefix: 'Hey, ' } },
    career: {
        positions: [
            {
                company: 'TestGorilla',
                url: 'https://testgorilla.com',
                roles: [
                    {
                        role: 'Engineering Manager',
                        shortRole: 'Engineering Manager',
                        date: 'Aug 2023 — Present',
                        headline: 'Shipping AI video interviews.',
                        sections: [
                            {
                                title: 'AI Product',
                                points: ['Built a credit-based pricing engine.', 'Launched Tavus video interviews.'],
                            },
                        ],
                    },
                    {
                        role: 'Lead SDET',
                        date: 'Apr 2022 — Aug 2023',
                        sections: [{ title: 'CI/CD', points: ['5× daily releases.'] }],
                    },
                ],
            },
            {
                company: 'Hopin',
                // no url
                roles: [
                    {
                        role: 'Senior SDET',
                        date: 'Feb 2021 — Mar 2022',
                        // no sections, just headline
                        headline: '45 → 15 min pipelines.',
                    },
                ],
            },
        ],
    },
    skills: {
        categories: [
            { name: 'Languages', items: ['Python', 'TypeScript'] },
            { name: 'AI Stack', items: ['Claude', 'LangFuse'] },
        ],
    },
    leadership: {
        cards: [
            { title: 'AI-Augmented Engineering', description: 'Embed AI everywhere.' },
            { title: 'Team Growth', description: 'Ladders + mentorship.' },
        ],
    },
    openSource: {
        pinnedArticles: [
            {
                title: 'Local LLMs',
                url: 'https://example.com/local',
                date: '2026-04-03T00:00:00.000Z',
                description: 'A post about local LLMs that is reasonably long but will get truncated when too big.',
                tags: ['local LLM', 'AI'],
            },
            {
                // duplicate URL to test dedupe
                title: 'Local LLMs v2',
                url: 'https://example.com/local',
                date: '2025-01-01T00:00:00.000Z',
            },
        ],
        recentArticles: [
            {
                title: 'Scope Creep',
                url: 'https://example.com/scope',
                date: '2025-09-01T00:00:00.000Z',
                description: 'A short post.',
                tags: ['project mgmt'],
            },
        ],
        repos: {
            recent: [
                {
                    name: 'bonsai',
                    description: '1-bit LLM CLI',
                    url: 'https://github.com/x/bonsai',
                    language: 'Go',
                    topics: ['llm', 'cli', 'local'],
                    hasPages: true,
                    homepage: 'https://x.github.io/bonsai/',
                },
                {
                    name: 'shelldone',
                    description: 'Terminal notifs',
                    url: 'https://github.com/x/shelldone',
                    language: 'Bash',
                    hasPages: false,
                    homepage: 'https://example.com/ignored-because-no-pages',
                },
                // duplicate by name to test dedupe
                {
                    name: 'bonsai',
                    description: 'dup',
                    url: 'https://github.com/x/bonsai',
                },
            ],
            starred: [
                {
                    name: 'pg-patrol',
                    description: 'Postgres health',
                    url: 'https://github.com/x/pg-patrol',
                    // no topics, no language → tags should be []
                },
            ],
        },
    },
    certifications: {
        items: [
            { name: 'AWS SA', issuer: 'AWS' },
            { name: 'Google PM', issuer: 'Google' },
        ],
    },
}

describe('formatMonthYear', () => {
    it('returns "" for null/empty', () => {
        expect(formatMonthYear(null)).toBe('')
        expect(formatMonthYear('')).toBe('')
    })
    it('formats a valid ISO string as "Mon YYYY"', () => {
        expect(formatMonthYear('2026-04-03T00:00:00.000Z')).toMatch(/(Mar|Apr) 2026/)
    })
    it('returns the original string when unparseable', () => {
        expect(formatMonthYear('not-a-date')).toBe('not-a-date')
    })
})

describe('escapeHtml', () => {
    it('returns "" for null/undefined', () => {
        expect(escapeHtml(null)).toBe('')
        expect(escapeHtml(undefined)).toBe('')
    })
    it('escapes &, <, >, "', () => {
        expect(escapeHtml('<a href="x">&y</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;y&lt;/a&gt;')
    })
    it('coerces non-string values', () => {
        expect(escapeHtml(42)).toBe('42')
    })
    it('returns plain text unchanged', () => {
        expect(escapeHtml('plain text')).toBe('plain text')
    })
    it('handles empty string', () => {
        expect(escapeHtml('')).toBe('')
    })
})

describe('adaptResume', () => {
    it('returns empty arrays for null / {}', () => {
        const empty = adaptResume(null)
        expect(empty.career).toEqual([])
        expect(empty.skills).toEqual([])
        expect(empty.leadership).toEqual([])
        expect(empty.writing).toEqual([])
        expect(empty.repos).toEqual([])
        expect(empty.certs).toEqual([])
        expect(empty.suggestions.length).toBeGreaterThan(0) // default suggestions
        expect(empty.personal).toEqual({})
        expect(empty.site).toEqual({})

        const alsoEmpty = adaptResume({})
        expect(alsoEmpty.career).toEqual([])
    })

    it('flattens career positions into role entries', () => {
        const d = adaptResume(fixture)
        expect(d.career).toHaveLength(3)
        expect(d.career[0].co).toBe('TestGorilla')
        expect(d.career[0].role).toBe('Engineering Manager')
        expect(d.career[0].url).toBe('https://testgorilla.com')
        expect(d.career[0].teaser).toBe('Shipping AI video interviews.')
        expect(d.career[0].desc).toContain('<h4>AI Product</h4>')
        expect(d.career[0].desc).toContain('<li>Built a credit-based pricing engine.</li>')
        // role with sections but no headline: teaser falls back to first point
        expect(d.career[1].teaser).toBe('5× daily releases.')
        // role with only headline and no sections: desc falls back to escaped headline
        expect(d.career[2].co).toBe('Hopin')
        expect(d.career[2].url).toBe('')
        expect(d.career[2].desc).toBe('45 → 15 min pipelines.')
    })

    it('maps skills and leadership directly', () => {
        const d = adaptResume(fixture)
        expect(d.skills).toEqual([
            { name: 'Languages', items: ['Python', 'TypeScript'] },
            { name: 'AI Stack', items: ['Claude', 'LangFuse'] },
        ])
        expect(d.leadership).toEqual([
            { t: 'AI-Augmented Engineering', d: 'Embed AI everywhere.' },
            { t: 'Team Growth', d: 'Ladders + mentorship.' },
        ])
    })

    it('skills entry with missing/non-array items becomes empty array', () => {
        const d = adaptResume({ skills: { categories: [{ name: 'X' }] } })
        expect(d.skills[0].items).toEqual([])
    })

    it('handles leadership cards with missing title/description', () => {
        const d = adaptResume({ leadership: { cards: [{}] } })
        expect(d.leadership).toEqual([{ t: '', d: '' }])
    })

    it('de-duplicates writing by URL and sorts by date desc', () => {
        const d = adaptResume(fixture)
        expect(d.writing).toHaveLength(2)
        expect(d.writing[0].title).toBe('Local LLMs')
        expect(d.writing[1].title).toBe('Scope Creep')
        expect(d.writing[0].tags).toEqual(['local LLM', 'AI'])
    })

    it('writing truncates description and coerces missing fields', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [
                    {
                        url: 'u1',
                        date: '2025-01-01',
                        title: 'T',
                        description: 'x'.repeat(200),
                        tags: 'not-array', // non-array → []
                    },
                ],
            },
        })
        expect(d.writing[0].desc.length).toBe(140)
        expect(d.writing[0].tags).toEqual([])
    })

    it('writing filters entries without url and without date defaults to 0', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [
                    { title: 'no-url' },
                    { url: 'u-valid', title: 'valid' },
                ],
            },
        })
        expect(d.writing.map((w) => w.title)).toEqual(['valid'])
    })

    it('writing slices to 8 entries', () => {
        const many = Array.from({ length: 12 }, (_, i) => ({
            url: 'u' + i,
            title: 'T' + i,
            date: '2025-01-' + String(i + 1).padStart(2, '0') + 'T00:00:00Z',
        }))
        const d = adaptResume({ openSource: { pinnedArticles: many } })
        expect(d.writing).toHaveLength(8)
    })

    it('repos de-duplicate by name, use topics when present, language otherwise, and demo requires hasPages', () => {
        const d = adaptResume(fixture)
        expect(d.repos).toHaveLength(3)

        const bonsai = d.repos.find((r) => r.name === 'bonsai')
        expect(bonsai.tags).toEqual(['llm', 'cli', 'local'])
        expect(bonsai.demo).toBe('https://x.github.io/bonsai/')

        const shelldone = d.repos.find((r) => r.name === 'shelldone')
        expect(shelldone.tags).toEqual(['Bash'])
        expect(shelldone.demo).toBeUndefined()

        const pgp = d.repos.find((r) => r.name === 'pg-patrol')
        expect(pgp.tags).toEqual([])
        expect(pgp.demo).toBeUndefined()
    })

    it('repos filters entries without name', () => {
        const d = adaptResume({
            openSource: { repos: { recent: [{ description: 'no name' }, { name: 'ok' }] } },
        })
        expect(d.repos).toHaveLength(1)
        expect(d.repos[0].name).toBe('ok')
    })

    it('repos slices to 6 entries', () => {
        const many = Array.from({ length: 10 }, (_, i) => ({ name: 'repo' + i, url: 'u' }))
        const d = adaptResume({ openSource: { repos: { recent: many } } })
        expect(d.repos).toHaveLength(6)
    })

    it('maps certifications.items → {name, issuer}', () => {
        const d = adaptResume(fixture)
        expect(d.certs).toEqual([
            { name: 'AWS SA', issuer: 'AWS' },
            { name: 'Google PM', issuer: 'Google' },
        ])
    })

    it('uses site.ask.suggestions when provided', () => {
        const d = adaptResume({ site: { ask: { suggestions: ['q1', 'q2'] } } })
        expect(d.suggestions).toEqual(['q1', 'q2'])
    })

    it('career section with no points still renders the section wrapper', () => {
        const d = adaptResume({
            career: {
                positions: [
                    {
                        company: 'X',
                        roles: [{ role: 'R', sections: [{ title: 'S' /* no points */ }] }],
                    },
                ],
            },
        })
        expect(d.career[0].desc).toContain('<h4>S</h4>')
        expect(d.career[0].desc).toContain('<ul></ul>')
    })

    it('career entries with missing fields fall back to empty strings', () => {
        const d = adaptResume({
            career: {
                positions: [
                    { /* no company, url, no roles */ },
                    { roles: [{}] }, // role with nothing set
                ],
            },
        })
        // first position has no roles → contributes nothing
        expect(d.career).toHaveLength(1)
        const empty = d.career[0]
        expect(empty.date).toBe('')
        expect(empty.role).toBe('')
        expect(empty.co).toBe('')
        expect(empty.url).toBe('')
        expect(empty.teaser).toBe('')
        expect(empty.desc).toBe('')
    })

    it('articleCount is the unique URL count (not the sliced writing length)', () => {
        const many = Array.from({ length: 12 }, (_, i) => ({
            url: 'u' + i,
            title: 'T' + i,
            date: '2025-01-' + String(i + 1).padStart(2, '0') + 'T00:00:00Z',
        }))
        const d = adaptResume({ openSource: { pinnedArticles: many } })
        expect(d.writing).toHaveLength(8)
        expect(d.articleCount).toBe(12)
    })

    it('articleCount dedupes across pinned + recent', () => {
        const d = adaptResume(fixture)
        // fixture has: Local LLMs (pinned), Local LLMs v2 (pinned, dup URL), Scope Creep (recent)
        expect(d.articleCount).toBe(2)
    })

    it('repoCount is the unique-by-name count (not the sliced repos length)', () => {
        const many = Array.from({ length: 10 }, (_, i) => ({ name: 'repo' + i, url: 'u' }))
        const d = adaptResume({ openSource: { repos: { recent: many } } })
        expect(d.repos).toHaveLength(6)
        expect(d.repoCount).toBe(10)
    })

    it('repoCount dedupes across recent + starred', () => {
        const d = adaptResume(fixture)
        // fixture: bonsai, shelldone, bonsai-dup, pg-patrol → 3 unique
        expect(d.repoCount).toBe(3)
    })

    it('writing handles missing dates and missing titles', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [
                    { url: 'a', /* no date, no title, no description */ },
                    { url: 'b', date: '2025-06-01T00:00:00Z', title: 'T' },
                    { url: 'c', /* also no date */ title: 'C' },
                ],
            },
        })
        expect(d.writing).toHaveLength(3)
        // Dated one sorts first; both undated entries fall back to timestamp 0.
        expect(d.writing[0].url).toBe('b')
        const undated = d.writing.find((w) => w.url === 'a')
        expect(undated.title).toBe('')
        expect(undated.desc).toBe('')
    })
})

describe('HTML render helpers', () => {
    const d = adaptResume(fixture)

    it('renderCareerHtml produces a card per role, escapes unsafe content, includes modal button', () => {
        const html = renderCareerHtml(d.career)
        expect(html).toContain('class="career-item"')
        expect(html).toContain('Chapter 01')
        expect(html).toContain('Chapter 03')
        expect(html).toContain('data-career-idx="0"')
        expect(html).toContain('TestGorilla')
        // no-url variant
        expect(html).toContain('at Hopin')
    })

    it('renderLeadershipHtml and renderLeadershipProgressHtml match the count and mark first active', () => {
        const html = renderLeadershipHtml(d.leadership)
        expect((html.match(/lead-stage-card__num/g) || []).length).toBe(2)
        expect(html).toContain('AI-Augmented Engineering')

        const prog = renderLeadershipProgressHtml(d.leadership)
        expect(prog.split('<span').length - 1).toBe(2)
        expect(prog).toContain('class="active"')
    })

    it('renderReposHtml renders source + demo only when present', () => {
        const html = renderReposHtml(d.repos)
        expect((html.match(/source ↗/g) || []).length).toBe(3)
        expect((html.match(/demo ↗/g) || []).length).toBe(1) // only bonsai has pages
    })

    it('renderWritingHtml renders uppercase tag and stagger style', () => {
        const html = renderWritingHtml(d.writing)
        expect(html).toContain('--stagger: 0ms')
        expect(html).toContain('--stagger: 80ms')
        expect(html).toContain('LOCAL LLM')
    })

    it('renderWritingHtml handles empty tags array', () => {
        const html = renderWritingHtml([{ date: 'Jan 2025', url: 'u', title: 't', desc: 'd', tags: [] }])
        expect(html).toContain('class="writing-row__tag">')
    })

    it('renderCertsHtml produces a doubled track for seamless marquee', () => {
        const html = renderCertsHtml(d.certs)
        expect((html.match(/cert-pill__name/g) || []).length).toBe(4) // 2 certs × 2 passes
    })

    it('renderSkillsTerminalLines structure', () => {
        const lines = renderSkillsTerminalLines(d.skills)
        expect(lines[0].k).toBe('cmd')
        expect(lines[2].text).toBe('# 11+ years. Teams grown. One toolkit.')
        expect(lines.some((l) => l.k === 'key' && l.text === '[ai_stack]')).toBe(true)
        expect(lines[lines.length - 1].cursor).toBe(true)
    })

    it('renderSkillsTerminalHtml wraps each line in a div', () => {
        const html = renderSkillsTerminalHtml(d.skills)
        expect(html).toContain('term-line--cmd')
        expect(html).toContain('term-line--key')
        expect(html).toContain('term-line--val')
        expect(html).toContain('term-line--blank')
    })
})
