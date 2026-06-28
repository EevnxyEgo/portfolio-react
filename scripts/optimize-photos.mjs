// Optimize the full-resolution portrait photos (kept in .raw-images/, gitignored) into
// small, EXIF-corrected WebP for the site. Run with `npm run photos`.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const RAW = '.raw-images'
const OUT = 'public/photos'
await mkdir(OUT, { recursive: true })

const jobs = [
  { src: 'photo3.jpg', out: 'about.webp', width: 820 }, // full-body editorial portrait
  { src: 'photo2.JPG', out: 'contact.webp', width: 680 }, // confident headshot
  { src: 'photo1.JPG', out: 'home.webp', width: 480 }, // clean headshot
]

let total = 0
for (const j of jobs) {
  const input = path.join(RAW, j.src)
  if (!existsSync(input)) {
    console.warn('skip (missing):', input)
    continue
  }
  const info = await sharp(input)
    .rotate() // apply EXIF orientation so portraits come out upright
    .resize({ width: j.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(OUT, j.out))
  total += info.size
  console.log(`${j.out}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`)
}
console.log(`total: ${Math.round(total / 1024)}KB`)
