// Generate the favicon from the real Bricolage Grotesque "A" glyph (exact vector paths).
// The Bricolage static TTF is fetched into .raw-images/fonts/ (see README) since the npm
// package only ships woff2, which opentype.js can't parse.
// Outputs: public/favicon.svg, public/apple-touch-icon.png, public/favicon-32.png.
import fs from 'node:fs'
import opentype from 'opentype.js'
import sharp from 'sharp'

const FONT = '.raw-images/fonts/bricolage.ttf'
const JADE = '#34d399' // signal accent — favicon ground
const DARK = '#14120d' // warm base — the letter
const BOX = 100
const CAP_TARGET = 60 // cap height as % of the 100-unit box

const font = opentype.parse(fs.readFileSync(FONT))
const glyph = font.charToGlyph('A')

// Size the glyph so its cap height hits the target, then center its bounding box in the box.
const probe = glyph.getPath(0, 0, 100).getBoundingBox()
const fontSize = (100 * CAP_TARGET) / (probe.y2 - probe.y1)
const path = glyph.getPath(0, 0, fontSize)
const bb = path.getBoundingBox()
const tx = BOX / 2 - (bb.x1 + bb.x2) / 2
const ty = BOX / 2 - (bb.y1 + bb.y2) / 2
const d = path.toPathData(2)

const svg = (rx) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}" role="img" aria-label="Arsenius Audley">
  <rect width="${BOX}" height="${BOX}" rx="${rx}" fill="${JADE}"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})"><path d="${d}" fill="${DARK}"/></g>
</svg>
`

const rounded = svg(22) // browser tab — iOS-style squircle radius
const square = svg(0) // apple-touch — iOS applies its own mask

fs.writeFileSync('public/favicon.svg', rounded)
await sharp(Buffer.from(square)).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(rounded)).resize(32, 32).png().toFile('public/favicon-32.png')

console.log(`favicon.svg + apple-touch-icon.png (180) + favicon-32.png written`)
console.log(`glyph: fontSize ${fontSize.toFixed(1)}, translate (${tx.toFixed(1)}, ${ty.toFixed(1)})`)
