const res = await fetch('/data/resume.json')
const resume = await res.json()

const entries = []

// GitHub repos — starred
const starredRepos = (resume.openSource.repos && resume.openSource.repos.starred) || []
starredRepos.forEach((repo, i) => {
    const stars = repo.stars ? '  \u2605 ' + repo.stars : ''
    entries.push({
        title: repo.name,
        url: repo.url,
        image: 'gh-starred-' + i,
        imageMini: 'gh-starred-' + i + '-mini',
        content: {
            title: repo.name,
            subtitle: (repo.language || '') + stars,
            header: repo.name,
            subheader: (repo.language || '') + '  |' + stars + '  |  GitHub',
            section: 'Most Starred',
            points: [repo.description || ''].concat((repo.topics || []).slice(0, 4).map((t) => '#' + t))
        }
    })
})

// GitHub repos — recent
const recentRepos = (resume.openSource.repos && resume.openSource.repos.recent) || []
recentRepos.forEach((repo, i) => {
    const stars = repo.stars ? '  \u2605 ' + repo.stars : ''
    entries.push({
        title: repo.name,
        url: repo.url,
        image: 'gh-recent-' + i,
        imageMini: 'gh-recent-' + i + '-mini',
        content: {
            title: repo.name,
            subtitle: (repo.language || '') + stars,
            header: repo.name,
            subheader: (repo.language || '') + '  |' + stars + '  |  GitHub',
            section: 'Recent Projects',
            points: [repo.description || ''].concat((repo.topics || []).slice(0, 4).map((t) => '#' + t))
        }
    })
})

// Medium articles — pinned
const pinnedArticles = resume.openSource.pinnedArticles || []
pinnedArticles.forEach((article, i) => {
    const dateStr = article.date
        ? new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
          })
        : ''
    entries.push({
        title: article.title,
        url: article.url,
        image: 'med-pinned-' + i,
        imageMini: 'med-pinned-' + i + '-mini',
        content: {
            title: article.title,
            subtitle: dateStr,
            header: article.title,
            subheader: dateStr + '  |  Medium',
            section: 'Pinned Article',
            points: [article.description || ''].concat((article.tags || []).slice(0, 4).map((t) => '#' + t))
        }
    })
})

// Medium articles — recent
const recentArticles = resume.openSource.recentArticles || []
recentArticles.forEach((article, i) => {
    const dateStr = article.date
        ? new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
          })
        : ''
    entries.push({
        title: article.title,
        url: article.url,
        image: 'med-recent-' + i,
        imageMini: 'med-recent-' + i + '-mini',
        content: {
            title: article.title,
            subtitle: dateStr,
            header: article.title,
            subheader: dateStr + '  |  Medium',
            section: 'Latest Article',
            points: [article.description || ''].concat((article.tags || []).slice(0, 4).map((t) => '#' + t))
        }
    })
})

export default entries
