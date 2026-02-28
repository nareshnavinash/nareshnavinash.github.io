import * as THREE from 'three/webgpu'

const res = await fetch('/data/resume.json')
const resume = await res.json()

// ASCII art is decorative and stays hardcoded
const text = `
███╗   ██╗ █████╗ ██████╗ ███████╗███████╗██╗  ██╗██╗███████╗
████╗  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝██║  ██║╚═╝██╔════╝
██╔██╗ ██║███████║██████╔╝█████╗  ███████╗███████║   ███████╗
██║╚██╗██║██╔══██║██╔══██╗██╔══╝  ╚════██║██╔══██║   ╚════██║
██║ ╚████║██║  ██║██║  ██║███████╗███████║██║  ██║   ███████║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚══════╝

██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝

╔═ Intro ═══════════════╗
║ Thank you for visiting my portfolio, you sneaky developer!
║ I'm ${resume.personal.name}, ${resume.personal.bio}.
╚═══════════════════════╝

╔═ Connect ═════════════╗
║ Mail     ⇒ ${resume.personal.email}
║ LinkedIn ⇒ ${resume.social.linkedin.url}
║ GitHub   ⇒ ${resume.social.github.url}
║ Medium   ⇒ ${resume.social.medium.url}
║ npm      ⇒ ${resume.social.npm.url}
║ PyPI     ⇒ ${resume.social.pypi.url}
╚═══════════════════════╝

╔═ Debug ═══════════════╗
║ You can access the debug mode by adding #debug at the end of the URL and reloading.
║ Press [V] to toggle the free camera.
╚═══════════════════════╝

╔═ Credits ═════════════╗
║ This 3D world is based on folio-2025 by Bruno Simon (MIT license).
║ https://github.com/brunosimon/folio-2025
║ Built with Three.js (release: ${THREE.REVISION}), Rapier physics, and Howler.js audio.
║ Music by Kounine (CC0 license) ⇒ https://linktr.ee/Kounine
╚═══════════════════════╝
`
let finalText = ''
let finalStyles = []
const stylesSet = {
    letter: 'color: #ffffff; font: 400 1em monospace;',
    pipe: 'color: #D66FFF; font: 400 1em monospace;'
}
let currentStyle = null
for (let i = 0; i < text.length; i++) {
    const char = text[i]

    const style = char.match(/[╔║═╗╚╝╔╝]/) ? 'pipe' : 'letter'
    if (style !== currentStyle) {
        currentStyle = style
        finalText += '%c'

        finalStyles.push(stylesSet[currentStyle])
    }
    finalText += char
}

export default [finalText, ...finalStyles]
