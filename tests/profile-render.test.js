import { describe, it, expect } from 'vitest'
import {
    adaptResume,
    formatMonthYear,
    escapeHtml,
    renderCareerHtml,
    renderCareerProgressHtml,
    renderLeadershipHtml,
    renderLeadershipProgressHtml,
    renderReposHtml,
    renderWritingHtml,
    renderRepoTermRows,
    renderScrollRows,
    renderCertsHtml,
    renderSkillsTerminalHtml,
    renderSkillsTerminalLines
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
                                points: ['Built a credit-based pricing engine.', 'Launched Tavus video interviews.']
                            }
                        ]
                    },
                    {
                        role: 'Lead SDET',
                        date: 'Apr 2022 — Aug 2023',
                        sections: [{ title: 'CI/CD', points: ['5× daily releases.'] }]
                    }
                ]
            },
            {
                company: 'Hopin',
                // no url
                roles: [
                    {
                        role: 'Senior SDET',
                        date: 'Feb 2021 — Mar 2022',
                        // no sections, just headline
                        headline: '45 → 15 min pipelines.'
                    }
                ]
            }
        ]
    },
    skills: {
        categories: [
            { name: 'Languages', items: ['Python', 'TypeScript'] },
            { name: 'AI Stack', items: ['Claude', 'LangFuse'] }
        ]
    },
    leadership: {
        cards: [
            { title: 'AI-Augmented Engineering', description: 'Embed AI everywhere.' },
            { title: 'Team Growth', description: 'Ladders + mentorship.' }
        ]
    },
    openSource: {
        pinnedArticles: [
            {
                title: 'Local LLMs',
                url: 'https://example.com/local',
                date: '2026-04-03T00:00:00.000Z',
                description: 'A post about local LLMs that is reasonably long but will get truncated when too big.',
                tags: ['local LLM', 'AI']
            },
            {
                // duplicate URL to test dedupe
                title: 'Local LLMs v2',
                url: 'https://example.com/local',
                date: '2025-01-01T00:00:00.000Z'
            }
        ],
        recentArticles: [
            {
                title: 'Scope Creep',
                url: 'https://example.com/scope',
                date: '2025-09-01T00:00:00.000Z',
                description: 'A short post.',
                tags: ['project mgmt']
            }
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
                    homepage: 'https://x.github.io/bonsai/'
                },
                {
                    name: 'shelldone',
                    description: 'Terminal notifs',
                    url: 'https://github.com/x/shelldone',
                    language: 'Bash',
                    hasPages: false,
                    homepage: 'https://example.com/ignored-because-no-pages'
                },
                // duplicate by name to test dedupe
                {
                    name: 'bonsai',
                    description: 'dup',
                    url: 'https://github.com/x/bonsai'
                }
            ],
            starred: [
                {
                    name: 'pg-patrol',
                    description: 'Postgres health',
                    url: 'https://github.com/x/pg-patrol'
                    // no topics, no language → tags should be []
                }
            ]
        }
    },
    certifications: {
        items: [
            { name: 'AWS SA', issuer: 'AWS' },
            { name: 'Google PM', issuer: 'Google' }
        ]
    }
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

    it('returns careerCompanies with one entry per unique company, newest first', () => {
        const d = adaptResume(fixture)
        expect(d.careerCompanies).toHaveLength(2)
        expect(d.careerCompanies[0].company).toBe('TestGorilla')
        expect(d.careerCompanies[0].role).toBe('Engineering Manager')
        expect(d.careerCompanies[0].url).toBe('https://testgorilla.com')
        expect(d.careerCompanies[0].roleCount).toBe(2)
        expect(d.careerCompanies[0].summary).toContain('Shipping AI video interviews')
        expect(d.careerCompanies[1].company).toBe('Hopin')
        expect(d.careerCompanies[1].url).toBe('')
        expect(d.careerCompanies[1].roleCount).toBe(1)
    })

    it('careerCompaniesInitialIdx defaults to 0 when nothing is trimmed', () => {
        const d = adaptResume(fixture)
        expect(d.careerCompaniesInitialIdx).toBe(0)
    })

    it('keeps every role in career but trims careerStage to recentCount + tail summary', () => {
        const d = adaptResume({
            career: {
                recentCount: 2,
                tailCard: {
                    role: 'Before that',
                    teaser: 'Earlier chapters',
                    dateLabel: '2019 - 2020'
                },
                positions: [
                    { company: 'Now Co', roles: [{ role: 'Lead', date: 'Jan 2024 - Present' }] },
                    { company: 'Prev Co', roles: [{ role: 'Senior', date: 'Jan 2022 - Dec 2023' }] },
                    { company: 'Old Co', roles: [{ role: 'Early', date: 'Jan 2020 - Dec 2021' }] },
                    { company: 'Older Co', roles: [{ role: 'First', date: 'Jan 2019 - Dec 2019' }] }
                ]
            }
        })
        // career stays full — modal paginates through every role with its own desc.
        expect(d.career).toHaveLength(4)
        expect(d.career.map((c) => c.role)).toEqual(['Lead', 'Senior', 'Early', 'First'])
        expect(d.career.every((c) => !c.isTail)).toBe(true)

        // careerStage drives the visible strip: first N recent roles + one tail summary card.
        expect(d.careerStage).toHaveLength(3)
        expect(d.careerStage[0].role).toBe('Lead')
        expect(d.careerStage[1].role).toBe('Senior')
        const tail = d.careerStage[2]
        expect(tail.isTail).toBe(true)
        expect(tail.targetIdx).toBe(2)
        expect(tail.role).toBe('Before that')
        expect(tail.teaser).toBe('Earlier chapters')
        expect(tail.date).toBe('2019 - 2020')
        expect(tail.co).toContain('Old Co')
        expect(tail.co).toContain('Older Co')
    })

    it('careerStage falls back to the full career list when nothing is trimmed', () => {
        const d = adaptResume(fixture)
        expect(d.careerStage).toBe(d.career)
    })

    it('careerCompaniesInitialIdx points to the first company past the recent-role slice', () => {
        const d = adaptResume({
            career: {
                recentCount: 2,
                positions: [
                    { company: 'A', roles: [{ role: 'r1', date: 'Jan 2024' }] },
                    { company: 'B', roles: [{ role: 'r2', date: 'Jan 2022' }] },
                    { company: 'C', roles: [{ role: 'r3', date: 'Jan 2020' }] },
                    { company: 'D', roles: [{ role: 'r4', date: 'Jan 2018' }] }
                ]
            }
        })
        // recentCount=2 fills companies A+B; first older company is C at index 2.
        expect(d.careerCompaniesInitialIdx).toBe(2)
    })

    it('careerCompanies summary falls back to the first two bullets when the latest role has no headline', () => {
        const d = adaptResume({
            career: {
                positions: [
                    {
                        company: 'NoHeadline Co',
                        roles: [
                            {
                                role: 'Engineer',
                                date: '2024',
                                sections: [
                                    {
                                        title: 'Work',
                                        points: ['Shipped thing A.', 'Shipped thing B.', 'Shipped thing C.']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        })
        expect(d.careerCompanies).toHaveLength(1)
        // First two points joined; third should be truncated out.
        expect(d.careerCompanies[0].summary).toBe('Shipped thing A. Shipped thing B.')
    })

    it('careerCompanies summary is empty when the latest role has no headline and no sections', () => {
        const d = adaptResume({
            career: {
                positions: [{ company: 'Bare Co', roles: [{ role: 'r', date: '2024' }] }]
            }
        })
        expect(d.careerCompanies[0].summary).toBe('')
    })

    it('careerCompanies falls back to role.role when shortRole is missing and drops companies without roles or company name', () => {
        const d = adaptResume({
            career: {
                positions: [
                    { url: 'https://x', roles: [{ role: 'r', date: '2024' }] }, // no company → dropped
                    { company: 'Empty Co', roles: [] }, // empty roles → dropped
                    { company: 'Ghost Co' }, // company set, roles key missing → dropped (covers pos.roles || [])
                    { company: 'Full Co', roles: [{ role: 'Long Role Title', date: '2024' }] }, // no shortRole
                    { company: 'Blank Co', roles: [{ date: '2023' }] } // no shortRole and no role → '' fallback
                ]
            }
        })
        expect(d.careerCompanies.map((c) => c.company)).toEqual(['Full Co', 'Blank Co'])
        expect(d.careerCompanies[0].role).toBe('Long Role Title')
        expect(d.careerCompanies[0].url).toBe('')
        expect(d.careerCompanies[1].role).toBe('')
    })

    it('careerCompaniesInitialIdx handles multi-role companies that straddle the slice', () => {
        const d = adaptResume({
            career: {
                recentCount: 3,
                positions: [
                    {
                        company: 'Multi',
                        roles: [
                            { role: 'r1', date: 'Jan 2024' },
                            { role: 'r2', date: 'Jan 2022' }
                        ]
                    },
                    { company: 'Next', roles: [{ role: 'r3', date: 'Jan 2021' }] },
                    { company: 'Later', roles: [{ role: 'r4', date: 'Jan 2019' }] }
                ]
            }
        })
        // 2 roles at Multi + 1 at Next = 3 recent roles. First older company = Later (idx 2).
        expect(d.careerCompaniesInitialIdx).toBe(2)
    })

    it('does not trim careerStage when recentCount is absent or >= total', () => {
        const noTrim = adaptResume({
            career: {
                positions: [
                    { company: 'A', roles: [{ role: 'r1', date: '2024' }] },
                    { company: 'B', roles: [{ role: 'r2', date: '2022' }] }
                ]
            }
        })
        expect(noTrim.career).toHaveLength(2)
        expect(noTrim.careerStage).toHaveLength(2)
        expect(noTrim.careerStage.some((c) => c.isTail)).toBe(false)

        const equalCount = adaptResume({
            career: {
                recentCount: 2,
                positions: [
                    { company: 'A', roles: [{ role: 'r1', date: '2024' }] },
                    { company: 'B', roles: [{ role: 'r2', date: '2022' }] }
                ]
            }
        })
        expect(equalCount.career).toHaveLength(2)
        expect(equalCount.careerStage).toHaveLength(2)
        expect(equalCount.careerStage.some((c) => c.isTail)).toBe(false)
    })

    it('auto-generates a tail teaser and dateLabel-less card when tailCard config is missing', () => {
        const d = adaptResume({
            career: {
                recentCount: 1,
                positions: [
                    { company: 'Now', roles: [{ role: 'Lead', date: 'Jan 2024' }] },
                    { company: 'X', roles: [{ role: 'r', date: '2020' }] },
                    { company: 'Y', roles: [{ role: 'r', date: '2018' }] }
                ]
            }
        })
        const tail = d.careerStage[1]
        expect(tail.isTail).toBe(true)
        expect(tail.targetIdx).toBe(1)
        expect(tail.role).toBe('Before that')
        expect(tail.teaser).toContain('2 roles')
        expect(tail.teaser).toContain('2 companies')
        expect(tail.date).toBe('')
    })

    it('auto teaser uses singular "company" when only one older company remains', () => {
        const d = adaptResume({
            career: {
                recentCount: 1,
                positions: [
                    { company: 'Now', roles: [{ role: 'Lead', date: '2024' }] },
                    {
                        company: 'Same Co',
                        roles: [
                            { role: 'a', date: '2020' },
                            { role: 'b', date: '2018' }
                        ]
                    }
                ]
            }
        })
        const tail = d.careerStage[1]
        expect(tail.teaser).toContain('2 roles')
        expect(tail.teaser).toContain('1 company')
    })

    it('maps skills and leadership directly', () => {
        const d = adaptResume(fixture)
        expect(d.skills).toEqual([
            { name: 'Languages', items: ['Python', 'TypeScript'] },
            { name: 'AI Stack', items: ['Claude', 'LangFuse'] }
        ])
        expect(d.leadership).toEqual([
            { t: 'AI-Augmented Engineering', d: 'Embed AI everywhere.' },
            { t: 'Team Growth', d: 'Ladders + mentorship.' }
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
                        tags: 'not-array' // non-array → []
                    }
                ]
            }
        })
        expect(d.writing[0].desc.length).toBe(140)
        expect(d.writing[0].tags).toEqual([])
    })

    it('writing filters entries without url and without date defaults to 0', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [{ title: 'no-url' }, { url: 'u-valid', title: 'valid' }]
            }
        })
        expect(d.writing.map((w) => w.title)).toEqual(['valid'])
    })

    it('writing slices to 8 entries', () => {
        const many = Array.from({ length: 12 }, (_, i) => ({
            url: 'u' + i,
            title: 'T' + i,
            date: '2025-01-' + String(i + 1).padStart(2, '0') + 'T00:00:00Z'
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
            openSource: { repos: { recent: [{ description: 'no name' }, { name: 'ok' }] } }
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
            { name: 'Google PM', issuer: 'Google' }
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
                        roles: [{ role: 'R', sections: [{ title: 'S' /* no points */ }] }]
                    }
                ]
            }
        })
        expect(d.career[0].desc).toContain('<h4>S</h4>')
        expect(d.career[0].desc).toContain('<ul></ul>')
    })

    it('career entries with missing fields fall back to empty strings', () => {
        const d = adaptResume({
            career: {
                positions: [
                    {
                        /* no company, url, no roles */
                    },
                    { roles: [{}] } // role with nothing set
                ]
            }
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
            date: '2025-01-' + String(i + 1).padStart(2, '0') + 'T00:00:00Z'
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

    it('splits repos into reposStarred + reposRecent, starred wins when name collides', () => {
        const d = adaptResume(fixture)
        // fixture: starred=[pg-patrol]; recent=[bonsai, shelldone, bonsai-dup]
        expect(d.reposStarred.map((r) => r.name)).toEqual(['pg-patrol'])
        expect(d.reposRecent.map((r) => r.name)).toEqual(['bonsai', 'shelldone'])
        // normalised shape
        const bonsai = d.reposRecent.find((r) => r.name === 'bonsai')
        expect(bonsai.demo).toBe('https://x.github.io/bonsai/')
        expect(bonsai.tags).toEqual(['llm', 'cli', 'local'])
        expect(bonsai.thumbnail).toBe('')
        const pgp = d.reposStarred[0]
        expect(pgp.tags).toEqual([])
        expect(pgp.demo).toBe('')
    })

    it('reposStarred dedupes duplicate names within the starred list itself', () => {
        const d = adaptResume({
            openSource: {
                repos: {
                    starred: [
                        { name: 'same', description: 'first' },
                        { name: 'same', description: 'dup' },
                        { name: 'other', description: 'ok' }
                    ]
                }
            }
        })
        expect(d.reposStarred.map((r) => r.name)).toEqual(['same', 'other'])
        expect(d.reposStarred[0].desc).toBe('first')
    })

    it('repos starred-vs-recent collision: recent entries with the same name as starred are dropped', () => {
        const d = adaptResume({
            openSource: {
                repos: {
                    starred: [{ name: 'dup', description: 'starred', url: 'u1' }],
                    recent: [
                        { name: 'dup', description: 'recent', url: 'u2' },
                        { name: 'fresh', url: 'u3' }
                    ]
                }
            }
        })
        expect(d.reposStarred.map((r) => r.name)).toEqual(['dup'])
        expect(d.reposRecent.map((r) => r.name)).toEqual(['fresh'])
    })

    it('splits articles into articlesPinned + articlesRecent, dropping URLs already pinned from recent', () => {
        const d = adaptResume(fixture)
        // fixture: pinned=[Local LLMs, Local LLMs v2 (dup URL)], recent=[Scope Creep]
        expect(d.articlesPinned.map((a) => a.title)).toEqual(['Local LLMs', 'Local LLMs v2'])
        expect(d.articlesRecent.map((a) => a.title)).toEqual(['Scope Creep'])
        expect(d.articlesPinned[0].desc.length).toBeLessThanOrEqual(280)
        expect(d.articlesPinned[0].thumbnail).toBe('')
    })

    it('articlesRecent skips entries whose URL already appears in pinned', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [{ url: 'u1', title: 'Pinned', date: '2025-01-01' }],
                recentArticles: [
                    { url: 'u1', title: 'Dup', date: '2025-02-01' },
                    { url: 'u2', title: 'New', date: '2025-03-01' }
                ]
            }
        })
        expect(d.articlesPinned.map((a) => a.title)).toEqual(['Pinned'])
        expect(d.articlesRecent.map((a) => a.title)).toEqual(['New'])
    })

    it('totalMediumPosts falls back to articleCount when no openSource.totalMediumPosts', () => {
        const d = adaptResume(fixture)
        expect(d.totalMediumPosts).toBe(d.articleCount)
    })

    it('totalMediumPosts honours openSource.totalMediumPosts when provided', () => {
        const d = adaptResume({ openSource: { totalMediumPosts: 850 } })
        expect(d.totalMediumPosts).toBe(850)
    })

    it('publicRepoCount falls back to repoCount when no openSource.publicRepoCount', () => {
        const d = adaptResume(fixture)
        expect(d.publicRepoCount).toBe(d.repoCount)
    })

    it('publicRepoCount honours openSource.publicRepoCount when provided', () => {
        const d = adaptResume({ openSource: { publicRepoCount: 42 } })
        expect(d.publicRepoCount).toBe(42)
    })

    it('normaliseArticle inside adaptResume handles missing fields', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [{ url: 'u' /* no title, date, description, tags */ }]
            }
        })
        expect(d.articlesPinned).toHaveLength(1)
        const a = d.articlesPinned[0]
        expect(a.title).toBe('')
        expect(a.date).toBe('')
        expect(a.desc).toBe('')
        expect(a.tags).toEqual([])
        expect(a.thumbnail).toBe('')
    })

    it('normaliseRepo inside adaptResume handles missing fields', () => {
        const d = adaptResume({
            openSource: {
                repos: {
                    starred: [{ name: 'bare' /* no description, url, language, topics */ }]
                }
            }
        })
        expect(d.reposStarred).toHaveLength(1)
        const r = d.reposStarred[0]
        expect(r.desc).toBe('')
        expect(r.url).toBe('')
        expect(r.language).toBe('')
        expect(r.tags).toEqual([])
        expect(r.demo).toBe('')
        expect(r.thumbnail).toBe('')
        expect(r.tagline).toBe('')
    })

    it('repos filters out entries without a name in the split arrays too', () => {
        const d = adaptResume({
            openSource: {
                repos: {
                    starred: [{ description: 'no name' }, { name: 'ok', url: 'u' }],
                    recent: [{ name: 'also-ok' }, { description: 'no name' }]
                }
            }
        })
        expect(d.reposStarred.map((r) => r.name)).toEqual(['ok'])
        expect(d.reposRecent.map((r) => r.name)).toEqual(['also-ok'])
    })

    it('articlesPinned filters out entries without a URL', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [{ title: 'no url' }, { url: 'u', title: 'ok' }]
            }
        })
        expect(d.articlesPinned.map((a) => a.title)).toEqual(['ok'])
    })

    it('writing handles missing dates and missing titles', () => {
        const d = adaptResume({
            openSource: {
                pinnedArticles: [
                    { url: 'a' /* no date, no title, no description */ },
                    { url: 'b', date: '2025-06-01T00:00:00Z', title: 'T' },
                    { url: 'c', /* also no date */ title: 'C' }
                ]
            }
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

    it('renderCareerHtml produces a stage-card per role, escapes unsafe content, includes modal button', () => {
        const html = renderCareerHtml(d.career)
        expect(html).toContain('class="stage-card stage-card--career"')
        expect(html).toContain('>01<')
        expect(html).toContain('>03<')
        expect(html).toContain('data-career-idx="0"')
        expect(html).toContain('TestGorilla')
        // no-url variant
        expect(html).toContain('at Hopin')
        expect(html).toContain('Show more')
    })

    it('renderCareerHtml adds data-tail="true" on tail cards, uses the "Before that" CTA label, and omits data-tail elsewhere', () => {
        const html = renderCareerHtml([
            { date: '2024', role: 'Lead', co: 'Now', url: '', teaser: '', desc: '' },
            { date: '2015-2020', role: 'Before that', co: 'A · B', url: '', teaser: '5 roles', desc: '', isTail: true }
        ])
        expect(html).toContain('data-tail="true"')
        expect(html).toContain('Before that <span class="arr">')
        // non-tail card should not include the attr
        const firstCard = html.slice(0, html.indexOf('data-tail'))
        expect(firstCard).not.toContain('data-tail')
    })

    it('renderCareerProgressHtml renders one span per card and marks the first active', () => {
        const prog = renderCareerProgressHtml(d.career)
        expect(prog.split('<span').length - 1).toBe(d.career.length)
        expect(prog).toContain('class="active"')
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

    it('renderRepoTermRows emits one row per repo with prompt, name, tag, show-more button', () => {
        const html = renderRepoTermRows(d.reposRecent, 'recent')
        expect((html.match(/repo-term__row/g) || []).length).toBe(d.reposRecent.length)
        expect(html).toContain('data-kind="recent"')
        expect(html).toContain('data-idx="0"')
        expect(html).toContain('>❯<')
        expect(html).toContain('show more →')
    })

    it('renderRepoTermRows uses language when topics are absent, falls back to "repo" for bare entries', () => {
        const html = renderRepoTermRows(
            [
                { name: 'lang-only', tags: [], language: 'Rust' },
                { name: 'bare', tags: [], language: '' }
            ],
            'starred'
        )
        expect(html).toContain('>Rust<')
        expect(html).toContain('>repo<')
    })

    it('renderScrollRows emits medium link + meta + show-more button per article', () => {
        const html = renderScrollRows(d.articlesPinned, 'pinned')
        expect((html.match(/scroll__row/g) || []).length).toBe(d.articlesPinned.length)
        expect(html).toContain('data-kind="pinned"')
        expect(html).toContain('data-idx="0"')
        expect(html).toContain('class="scroll__title-link"')
        expect(html).toContain('target="_blank"')
        expect(html).toContain('LOCAL LLM')
    })

    it('renderScrollRows renders meta without a trailing separator when there are no tags', () => {
        const html = renderScrollRows([{ url: 'u', title: 't', date: 'Jan 2025', tags: [] }], 'recent')
        expect(html).toContain('Jan 2025')
        expect(html).not.toContain('Jan 2025 · ')
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
