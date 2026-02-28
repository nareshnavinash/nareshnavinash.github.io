const res = await fetch('/data/resume.json')
const resume = await res.json()

// Layout config is 3D-world-specific (slot positions, alignment)
const layoutConfig = [
    { key: 'x', align: 'right', slotIndex: 0 },
    { key: 'medium', align: 'right', slotIndex: 1 },
    { key: 'npm', align: 'right', slotIndex: 2 },
    { key: 'mail', align: 'right', slotIndex: 3 },
    { key: 'pypi', align: 'left', slotIndex: 4 },
    { key: 'github', align: 'left', slotIndex: 5 },
    { key: 'linkedin', align: 'left', slotIndex: 6 },
    { key: 'contact', align: 'left', slotIndex: 7 }
]

const socialMap = {
    x: { name: 'X', url: resume.social.x.url },
    medium: { name: 'Medium', url: resume.social.medium.url },
    npm: { name: 'npm', url: resume.social.npm.url },
    mail: { name: 'Mail', url: `mailto:${resume.personal.email}` },
    pypi: { name: 'PyPI', url: resume.social.pypi.url },
    github: { name: 'GitHub', url: resume.social.github.url },
    linkedin: { name: 'LinkedIn', url: resume.social.linkedin.url },
    contact: { name: 'Contact', modal: 'discord' }
}

export default layoutConfig.map((slot) => {
    const social = socialMap[slot.key]
    return { ...social, align: slot.align, slotIndex: slot.slotIndex }
})
