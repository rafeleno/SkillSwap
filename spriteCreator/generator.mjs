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

export async function generateSprite() {
  const config = {
    inputDir: process.env.SVG_SPRITE_INPUT || path.join(__dirname, '../src/assets/svg'),
  }
  let svgFiles;

  try {
    svgFiles = await getSVGFiles(config.inputDir);
  }
  catch (err) {
    console.error('SVG sprite generation error:', err)
    process.exitCode = 1
  }

  if (svgFiles.length === 0) {
    console.warn('No SVG files found in', config.inputDir)
    return
  }

  let sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n`;

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

    const viewBox = svgContent.match(/viewBox=".+"/)[0];

    sprite += `  <symbol id="icon-${symbolId}" fill="none" ${viewBox} >\n`
    sprite += `    ${innerContent}\n`
    sprite += `  </symbol>\n`
  }

  sprite += `</svg>`;

  sprite = sprite
    .replace(/^[fill="none"]fill=".+"/g, 'fill="inherit"')
    .replace(/stroke=".+"/g, 'stroke="currentColor"');

  return sprite;
}