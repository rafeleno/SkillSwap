import { spawn } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import chokidar from 'chokidar'

export default class SvgSpritePlugin {
  constructor(options = {}) {
    this.options = {
      inputDir: './src/assets/svg',
      outputFile: './dist/sprites.svg',
      watch: true,
      ...options,
    }
    this.watcher = null
  }

  apply(compiler) {
    compiler.hooks.done.tap('SvgSpritePlugin', () => {
      this.generateSprite();
    });

    if (this.options.watch && compiler.options.mode === 'development') {
      this.startWatching(compiler)
      compiler.hooks.watchClose.tap('SvgSpritePlugin', () => {
        this.stopWatching()
      })
    }

  }

  generateSprite() {
    // Используем fileURLToPath для корректного преобразования пути
    const scriptPath = new URL('./generator.mjs', import.meta.url)

    const child = spawn('node', [fileURLToPath(scriptPath)], {
      stdio: 'inherit',
      env: { ...process.env, SVG_SPRITE_ONCE: 'true' },
    })

    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`SVG sprite generation failed with code ${code}`)
      }
    })
  }

  startWatching() {
    this.watcher = chokidar.watch(this.options.inputDir, {
      ignored: /(^|[/\\])\../,
      persistent: true,
      ignoreInitial: true,
    })

    this.watcher
      .on('add', () => this.generateSprite())
      .on('unlink', () => this.generateSprite())
      .on('error', error => console.error('SVG watcher error:', error))
  }

  stopWatching() {
    if (this.watcher) {
      this.watcher.close()
    }
  }
}
