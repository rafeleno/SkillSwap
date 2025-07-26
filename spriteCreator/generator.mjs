import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function getSVGFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getSVGFiles(res) : res
  }))
  return files.flat().filter(file => path.extname(file).toLowerCase() === '.svg')
}

async function generateSprite() {
  const config = {
    inputDir: process.env.SVG_SPRITE_INPUT || path.join(__dirname, '../src/assets/svg'),
    outputFile: process.env.SVG_SPRITE_OUTPUT || path.join(__dirname, '../dist/sprites.svg'),
  }

  try {
    const svgFiles = await getSVGFiles(config.inputDir)

    if (svgFiles.length === 0) {
      console.warn('No SVG files found in', config.inputDir)
      return
    }

    let sprite = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
`

    for (const filePath of svgFiles) {
      const svgContent = await fs.readFile(filePath, 'utf8')

      const relativePath = path.relative(config.inputDir, filePath)
      const symbolId = relativePath
        .replace(/\.svg$/i, '')
        .replace(/.+\\/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()

      const innerContent = svgContent
        .replace(/<svg[^>]*>/i, '')
        .replace(/<\/svg>/i, '')
        .trim()

      sprite += `  <symbol id="icon-${symbolId}" viewBox="0 0 24 24" >\n`
      sprite += `    ${innerContent}\n`
      sprite += `  </symbol>\n`
    }

    sprite += `</svg>`;

    sprite = sprite
      .replace(/fill=".+"/g, 'fill="inherit"')
      .replace(/stroke=".+"/g, 'stroke="currentColor"');

    await fs.mkdir(path.dirname(config.outputFile), { recursive: true })
    await fs.writeFile(config.outputFile, sprite);
  }
  catch (err) {
    console.error('SVG sprite generation error:', err)
    process.exitCode = 1
  }
}

if (process.env.SVG_SPRITE_ONCE) {
  generateSprite()
}
else {
  async function Chokidar() {
    const chokidar = await import('chokidar')
    const config = {
      inputDir: process.env.SVG_SPRITE_INPUT || path.join(__dirname, '../src/assets/svg'),
    }

    const watcher = chokidar.default(config.inputDir, {
      ignored: /(^|[/\\])\../,
      persistent: true,
      ignoreInitial: true,
      depth: 99,
    })

    watcher
      .on('add', generateSprite)
      .on('unlink', generateSprite)
      .on('error', error => console.error('SVG watcher error:', error))
  }

  Chokidar();
}
