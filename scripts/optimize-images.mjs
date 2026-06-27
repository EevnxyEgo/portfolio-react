// Build-time image optimization: resize + WebP-compress the real project screenshots
// from .raw-images/ into public/work/. Run with `npm run images`.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const RAW = '.raw-images'
const OUT = 'public/work'
const MAX_WIDTH = 1400
const QUALITY = 80

const images = [
  'reel-home',
  'reel-detail',
  'reel-seats',
  'reel-eticket',
  'react-playground-home',
  'react-playground-module',
]

await mkdir(OUT, { recursive: true })

let total = 0
for (const name of images) {
  const input = path.join(RAW, `${name}.png`)
  if (!existsSync(input)) {
    console.warn('skip (missing):', input)
    continue
  }
  const output = path.join(OUT, `${name}.webp`)
  const info = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output)
  total += info.size
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`)
}
console.log(`total: ${Math.round(total / 1024)}KB across ${images.length} images`)
