import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, '..', 'static', 'career')

const WIDTH = 240
const HEIGHT = 60

// Map: existing GLTF texture name → Naresh's career entry
// The GLTF model has 6 stone slabs referencing these texture names
const careers = [
  { filename: 'careerFreelancer', company: 'Cognizant', role: 'Programmer Analyst', color: '#5390ff' },
  { filename: 'careerHetic', company: 'Freshworks', role: 'Software Engineer', color: '#ff8039' },
  { filename: 'careerImmersiveGarden', company: 'WeInvest', role: 'Senior SDET', color: '#b65fff' },
  { filename: 'careerIRLTeacher', company: 'Vue.ai', role: 'Lead SDET', color: '#a2ffab' },
  { filename: 'careerOnlineTeacher', company: 'Hopin', role: 'Senior SDET', color: '#5390ff' },
  { filename: 'careerUzik', company: 'TestGorilla', role: 'Lead SDET → EM', color: '#ff8039' },
]

for (const career of careers) {
  // Create SVG text label
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="transparent"/>
      <text x="${WIDTH / 2}" y="24" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="bold"
            fill="white">${career.company}</text>
      <text x="${WIDTH / 2}" y="46" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="12"
            fill="#cccccc">${career.role}</text>
    </svg>`

  const outputPath = path.join(outputDir, `${career.filename}.png`)

  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .png()
    .toFile(outputPath)

  console.log(`Created ${career.filename}.png`)
}

console.log('Done!')
