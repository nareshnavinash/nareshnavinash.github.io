import * as THREE from 'three/webgpu'

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
║ I'm Naresh Sekar, an Engineering Manager building at the intersection of AI and quality.
╚═══════════════════════╝

╔═ Connect ═════════════╗
║ Mail     ⇒ nareshnavinash@gmail.com
║ LinkedIn ⇒ https://www.linkedin.com/in/nareshnavinash/
║ GitHub   ⇒ https://github.com/nareshnavinash
║ Medium   ⇒ https://medium.com/@nareshnavinash
║ npm      ⇒ https://www.npmjs.com/~nareshnavinash
║ PyPI     ⇒ https://pypi.org/user/nareshnavinash/
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
    pipe: 'color: #D66FFF; font: 400 1em monospace;',
}
let currentStyle = null
for(let i = 0; i < text.length; i++)
{
    const char = text[i]

    const style = char.match(/[╔║═╗╚╝╔╝]/) ? 'pipe' : 'letter'
    if(style !== currentStyle)
    {
        currentStyle = style
        finalText += '%c'

        finalStyles.push(stylesSet[currentStyle])
    }
    finalText += char
}

export default [finalText, ...finalStyles]
